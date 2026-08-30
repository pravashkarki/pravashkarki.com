import { unlinkSync } from "fs";
import { createRL, choose, confirm, detectPlatform, run, PATHS } from "./lib/utils.js";
import { generateConfig, deployFlow } from "./deploy.js";

const PLATFORMS = ["vercel", "cloudflare", "netlify"];

const CONFIG_FILES = {
  vercel: PATHS.vercelJson,
  cloudflare: PATHS.wranglerToml,
  netlify: PATHS.netlifyToml,
};

async function main() {
  const rl = createRL();
  const current = detectPlatform();

  if (!current) {
    console.log("No deployment platform detected. Run `pnpm ik:deploy` first.");
    rl.close();
    return;
  }

  console.log(`Current platform: ${current}`);
  const targets = PLATFORMS.filter((p) => p !== current);
  const target = await choose(rl, "Migrate to:", targets);

  // Remove old config
  try {
    unlinkSync(CONFIG_FILES[current]);
    console.log(`Removed ${current} config.`);
  } catch {
    // File might not exist, that's fine
  }

  // Generate new config
  generateConfig(target);

  if (await confirm(rl, `Deploy to ${target} now?`)) {
    try {
      run("pnpm build");
      await deployFlow(rl);
    } catch {
      console.log("Deploy failed. Check the output above.");
    }
  }

  rl.close();
}

main();
