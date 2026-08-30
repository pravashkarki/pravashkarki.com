import { readdir, readFile, mkdir, writeFile, stat, copyFile } from "node:fs/promises";
import { join, extname } from "node:path";
import type { AstroIntegration } from "astro";

async function copyDir(srcDir: string, outDir: string) {
  const entries = await readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    const outPath = join(outDir, entry.name);

    if (entry.isDirectory()) {
      // Folder-based post: posts/my-post/index.md
      await mkdir(outPath, { recursive: true });
      await copyDir(srcPath, outPath);
    } else if (entry.name.endsWith(".md")) {
      const content = await readFile(srcPath, "utf-8");
      await writeFile(outPath, content);
    } else {
      // Copy images and other assets alongside markdown
      const ext = extname(entry.name).toLowerCase();
      const assetExts = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp", ".avif", ".ico"];
      if (assetExts.includes(ext)) {
        await copyFile(srcPath, outPath);
      }
    }
  }
}

export function copyMarkdownFiles(): AstroIntegration {
  return {
    name: "copy-markdown",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const contentDir = join(process.cwd(), "src/content/posts");
        const outDir = join(dir.pathname, "posts");

        await mkdir(outDir, { recursive: true });
        await copyDir(contentDir, outDir);
      },
    },
  };
}
