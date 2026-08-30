import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { copyMarkdownFiles } from "./src/integrations/copy-markdown";
import { watchTokens } from "./src/integrations/watch-tokens";

export default defineConfig({
  site: (await import("./src/config.ts")).site.url,
  integrations: [sitemap(), copyMarkdownFiles(), watchTokens()],
});
