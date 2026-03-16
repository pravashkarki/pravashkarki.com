import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { AstroIntegration } from "astro";

export function copyMarkdownFiles(): AstroIntegration {
  return {
    name: "copy-markdown",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const contentDir = join(process.cwd(), "src/content/posts");
        const outDir = join(dir.pathname, "posts");

        await mkdir(outDir, { recursive: true });

        const files = await readdir(contentDir);
        for (const file of files) {
          if (!file.endsWith(".md")) continue;
          const content = await readFile(join(contentDir, file), "utf-8");
          await writeFile(join(outDir, file), content);
        }
      },
    },
  };
}
