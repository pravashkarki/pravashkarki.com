import { readdirSync, rmSync, existsSync } from "fs";
import { resolve } from "path";
import {
  createRL,
  prompt,
  choose,
  confirm,
  readJSON,
  writeJSON,
  readText,
  writeText,
  run,
  runCapture,
  PATHS,
} from "./lib/utils.js";
import { switchScheme } from "./theme.js";
import { deployFlow } from "./deploy.js";

const px = (rem) => `${parseFloat(rem) * 16}px`;

const toRem = (v) => {
  v = v.trim();
  if (v.endsWith("px")) return `${parseFloat(v) / 16}rem`;
  if (v.endsWith("rem")) return v;
  return `${parseFloat(v) / 16}rem`;
};

const SETUP_MARKER = resolve(process.cwd(), ".inkwell");

function isFirstRun() {
  return !existsSync(SETUP_MARKER);
}

function markSetupDone() {
  writeText(SETUP_MARKER, "");
}

function readConfig() {
  const content = readText(PATHS.config);
  const get = (key) => {
    const match = content.match(new RegExp(`${key}:\\s*"([^"]*)"`));
    return match ? match[1] : "";
  };
  return {
    name: get("name"),
    title: get("title"),
    description: get("description"),
    url: get("url"),
  };
}

function updateConfigField(key, value) {
  let content = readText(PATHS.config);
  content = content.replace(
    new RegExp(`${key}:\\s*"[^"]*"`),
    `${key}: "${value}"`,
  );
  writeText(PATHS.config, content);
}

function showSettings() {
  const current = readConfig();
  const tokens = readJSON(PATHS.tokenJson);
  const typo = tokens.typography;
  const scale = typo.scale;

  console.log("Current settings:");
  console.log("  Site identity");
  console.log(`    name:        ${current.name}`);
  console.log(`    title:       ${current.title}`);
  console.log(`    description: ${current.description}`);
  console.log(`    url:         ${current.url || "(not set)"}`);
  console.log("  Color scheme:  " + tokens.scheme);
  console.log("  Font stack:    " + typo.fontStack);
  console.log("  Typography");
  console.log(`    body:        ${px(typo.bodySize)}`);
  console.log(`    code:        ${px(typo.codeSize)}`);
  console.log(`    line height: ${typo.lineHeight}`);
  console.log(`    scale:       sm ${px(scale.sm)} / md ${px(scale.md)} / lg ${px(scale.lg)} / xl ${px(scale.xl)}`);
  console.log();
}

function removeDemoContent() {
  let removed = 0;

  if (existsSync(PATHS.posts)) {
    const entries = readdirSync(PATHS.posts);
    for (const entry of entries) {
      rmSync(resolve(PATHS.posts, entry), { recursive: true });
      removed++;
    }
  }

  if (existsSync(PATHS.images)) {
    const entries = readdirSync(PATHS.images);
    for (const entry of entries) {
      rmSync(resolve(PATHS.images, entry), { recursive: true });
      removed++;
    }
  }

  console.log(`Removed ${removed} demo files.`);
}

function createPost(title, description) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const date = new Date().toISOString().slice(0, 10);
  const content = `---
title: ${title}
date: ${date}
description: ${description}
---

Start writing here.
`;
  const filePath = resolve(PATHS.posts, `${slug}.md`);
  writeText(filePath, content);
  console.log(`Created: src/content/posts/${slug}.md`);
}

async function promptRequired(rl, question) {
  while (true) {
    const answer = await prompt(rl, question);
    if (answer) return answer;
    console.log("This field is required.");
  }
}

// Shared actions used by both wizard and menu
async function editSiteIdentity(rl, { required = false } = {}) {
  const c = readConfig();
  const ask = required ? promptRequired : prompt;
  const name = required
    ? await ask(rl, "Site name (required): ")
    : (await prompt(rl, `Site name (${c.name}): `)) || c.name;
  const title = (await prompt(rl, `Site title (${name}): `)) || name;
  const description = required
    ? await ask(rl, "Description (required): ")
    : (await prompt(rl, `Description (${c.description}): `)) || c.description;
  const urlHint = c.url || "set after deploy";
  const urlInput = await prompt(rl, `Site URL (${urlHint}): `);
  const url = urlInput || c.url;
  if (!urlInput && !c.url) {
    console.log("No worries. Your deploy platform will assign a URL. You can set it later with ik:setup.");
  }
  updateConfigField("name", name);
  updateConfigField("title", title);
  updateConfigField("description", description);
  updateConfigField("url", url);
  console.log("Updated site config.");
}

async function editScheme(rl) {
  const t = readJSON(PATHS.tokenJson);
  const schemes = Object.keys(t.color);
  const scheme = await choose(rl, `Color scheme (current: ${t.scheme}):`, schemes);
  switchScheme(scheme);
}

async function editFontStack(rl) {
  const t = readJSON(PATHS.tokenJson);
  const options = [
    "serif",
    "sans",
    "sans+serif (sans headings, serif body)",
    "serif+sans (serif headings, sans body)",
  ];
  const selected = await choose(
    rl,
    `Font stack (current: ${t.typography.fontStack}):`,
    options,
  );
  const fontStack = selected.split(" ")[0];
  t.typography.fontStack = fontStack;
  writeJSON(PATHS.tokenJson, t);
  console.log(`Set font stack to ${fontStack}.`);
}

async function editTypography(rl) {
  const t = readJSON(PATHS.tokenJson);
  const ty = t.typography;

  console.log("Enter values in px (e.g. 18). Press enter to keep current.\n");
  const bodySize = await prompt(rl, `Body text (${px(ty.bodySize)} current): `);
  const codeSize = await prompt(rl, `Code text (${px(ty.codeSize)} current): `);
  const lineHeight = await prompt(rl, `Line height (${ty.lineHeight} current): `);

  if (bodySize) t.typography.bodySize = toRem(bodySize);
  if (codeSize) t.typography.codeSize = toRem(codeSize);
  if (lineHeight) t.typography.lineHeight = lineHeight;

  // Auto-calculate heading scale from body size
  if (bodySize) {
    const base = parseFloat(bodySize);
    t.typography.scale.sm = toRem(String(Math.round(base * 0.78)));
    t.typography.scale.md = toRem(String(Math.round(base * 1.11)));
    t.typography.scale.lg = toRem(String(Math.round(base * 1.33)));
    t.typography.scale.xl = toRem(String(Math.round(base * 1.78)));
    const s = t.typography.scale;
    console.log(`Heading scale: sm ${px(s.sm)} / md ${px(s.md)} / lg ${px(s.lg)} / xl ${px(s.xl)}`);
  }

  writeJSON(PATHS.tokenJson, t);
  console.log("Updated typography.");
}

async function editGitRemote(rl) {
  const remoteUrl = await prompt(rl, "Remote URL: ");
  try {
    runCapture("git remote get-url origin");
    run(`git remote set-url origin ${remoteUrl}`);
    console.log("Updated origin remote.");
  } catch {
    run(`git remote add origin ${remoteUrl}`);
    console.log("Added origin remote.");
  }
}

// First-run wizard
async function wizard(rl) {
  showSettings();

  // Required
  console.log("-- Site identity --");
  await editSiteIdentity(rl, { required: true });
  console.log();

  // Everything else is optional
  if (await confirm(rl, "Configure more settings?")) {
    await settingsMenu(rl, { skipIdentity: true });
  }

  markSetupDone();
  console.log("\nSetup complete. Run `pnpm dev` to start writing.");
}

// Settings menu: pick what to change
async function settingsMenu(rl, { skipIdentity = false } = {}) {
  if (!skipIdentity) {
    showSettings();

    if (!(await confirm(rl, "Change settings?"))) {
      console.log("No changes made.");
      return;
    }
  }

  // Snapshot current state so we can discard changes
  const configSnapshot = readText(PATHS.config);
  const tokensSnapshot = readText(PATHS.tokenJson);

  const MENU = [
    ...(skipIdentity ? [] : ["Site identity"]),
    "Color scheme",
    "Font stack",
    "Typography",
    "Git remote",
    "Remove demo content",
    "Create a post",
    "Deploy",
    "Discard all changes",
    "Done",
  ];

  while (true) {
    const action = await choose(rl, "What would you like to change?", MENU);

    if (action === "Done") break;
    if (action === "Discard all changes") {
      writeText(PATHS.config, configSnapshot);
      writeText(PATHS.tokenJson, tokensSnapshot);
      console.log("All changes discarded. Restored to previous settings.");
      break;
    }
    if (action === "Site identity") await editSiteIdentity(rl);
    if (action === "Color scheme") await editScheme(rl);
    if (action === "Font stack") await editFontStack(rl);
    if (action === "Typography") await editTypography(rl);
    if (action === "Git remote") await editGitRemote(rl);
    if (action === "Remove demo content") {
      if (await confirm(rl, "This will delete all posts and images. Continue?")) {
        removeDemoContent();
      }
    }
    if (action === "Create a post") {
      const postTitle = await prompt(rl, "Post title: ");
      const postDesc = await prompt(rl, "Post description: ");
      createPost(postTitle, postDesc);
    }
    if (action === "Deploy") {
      run("pnpm build");
      await deployFlow(rl);
    }
    console.log();
  }

  console.log("Done.");
}

async function main() {
  const rl = createRL();
  console.log("\ninkwell setup\n");

  if (isFirstRun()) {
    await wizard(rl);
  } else {
    await settingsMenu(rl);
  }

  rl.close();
}

main();
