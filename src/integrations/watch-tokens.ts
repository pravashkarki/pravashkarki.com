import { resolve } from "node:path";
import type { AstroIntegration } from "astro";

export function watchTokens(): AstroIntegration {
  return {
    name: "watch-tokens",
    hooks: {
      "astro:config:setup": ({ addWatchFile }) => {
        addWatchFile(resolve(process.cwd(), "token.json"));
      },
    },
  };
}
