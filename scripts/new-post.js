import { createInterface } from "node:readline/promises";
import { writeFile, access, mkdir } from "node:fs/promises";
import { join } from "node:path";

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));

let title, description, tags;

if (args.length >= 2) {
  // Usage: node scripts/new-post.js "Post title" "Description" "tag1, tag2"
  title = args[0];
  description = args[1];
  tags = args[2] ? args[2].split(",").map((t) => t.trim().toLowerCase()).filter(Boolean) : [];
} else {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  title = (await rl.question("Post title: ")).trim();
  if (!title) {
    console.log("Title is required.");
    process.exit(1);
  }

  description = (await rl.question("Short description (under 160 chars): ")).trim();
  if (!description) {
    console.log("Description is required.");
    process.exit(1);
  }

  const tagsInput = (await rl.question("Tags (comma-separated, or leave empty): ")).trim();
  tags = tagsInput
    ? tagsInput.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
    : [];

  rl.close();
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const today = new Date().toISOString().slice(0, 10);
const tagsLine = tags.length > 0 ? `\ntags: [${tags.join(", ")}]` : "";

const content = `---
title: ${title}
date: ${today}
description: ${description}${tagsLine}
---

`;

const useFolder = process.argv.includes("--folder");
const postsDir = join(process.cwd(), "src/content/posts");

let filePath, displayPath;

if (useFolder) {
  const folderPath = join(postsDir, slug);
  filePath = join(folderPath, "index.md");
  displayPath = `src/content/posts/${slug}/index.md`;
  await mkdir(folderPath, { recursive: true });
} else {
  filePath = join(postsDir, `${slug}.md`);
  displayPath = `src/content/posts/${slug}.md`;
}

try {
  await access(filePath);
  console.log(`\nFile already exists: ${displayPath}`);
  process.exit(1);
} catch {
  // File doesn't exist, good to go
}

await writeFile(filePath, content);
console.log(`\nCreated: ${displayPath}`);
if (useFolder) {
  console.log("Drop images in the same folder and reference them with ![alt](./image.jpg)");
}
console.log("Open the file and start writing below the frontmatter.");
