import { defineConfig } from "astro/config";
import { copyMarkdownFiles } from "./src/integrations/copy-markdown";

export default defineConfig({
  site: (await import("./src/config.ts")).site.url,
  integrations: [copyMarkdownFiles()],
});
