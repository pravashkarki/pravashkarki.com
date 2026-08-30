import { createInterface } from "readline";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import { resolve } from "path";

const root = resolve(process.cwd());

export const PATHS = {
  tokenJson: resolve(root, "token.json"),
  config: resolve(root, "src/config.ts"),
  astroConfig: resolve(root, "astro.config.mjs"),
  baseLayout: resolve(root, "src/layouts/Base.astro"),
  posts: resolve(root, "src/content/posts"),
  images: resolve(root, "public/images"),
  packageJson: resolve(root, "package.json"),
  vercelJson: resolve(root, "vercel.json"),
  wranglerToml: resolve(root, "wrangler.toml"),
  netlifyToml: resolve(root, "netlify.toml"),
};

export function createRL() {
  return createInterface({ input: process.stdin, output: process.stdout });
}

export function prompt(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

export async function choose(rl, question, options) {
  console.log(`\n${question}`);
  options.forEach((opt, i) => console.log(`  ${i + 1}. ${opt}`));
  while (true) {
    const answer = await prompt(rl, `Choice (1-${options.length}): `);
    const index = parseInt(answer, 10) - 1;
    if (index >= 0 && index < options.length) return options[index];
    console.log("Invalid choice. Try again.");
  }
}

export async function confirm(rl, question) {
  const answer = await prompt(rl, `${question} (y/n): `);
  return answer.toLowerCase() === "y";
}

export function readJSON(filePath) {
  return JSON.parse(readFileSync(filePath, "utf-8"));
}

export function writeJSON(filePath, data) {
  writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

export function readText(filePath) {
  return readFileSync(filePath, "utf-8");
}

export function writeText(filePath, content) {
  writeFileSync(filePath, content);
}

export function run(cmd) {
  execSync(cmd, { stdio: "inherit", cwd: root });
}

export function runCapture(cmd) {
  return execSync(cmd, { encoding: "utf-8", cwd: root }).trim();
}

export function detectPlatform() {
  if (existsSync(PATHS.vercelJson)) return "vercel";
  if (existsSync(PATHS.wranglerToml)) return "cloudflare";
  if (existsSync(PATHS.netlifyToml)) return "netlify";
  return null;
}