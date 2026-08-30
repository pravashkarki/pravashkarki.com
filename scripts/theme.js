import { createRL, choose, confirm, readJSON, writeJSON, PATHS } from "./lib/utils.js";

export function switchScheme(schemeName) {
  const tokens = readJSON(PATHS.tokenJson);
  const schemes = Object.keys(tokens.color);
  if (!schemes.includes(schemeName)) {
    console.log(`Unknown scheme "${schemeName}". Available: ${schemes.join(", ")}`);
    return false;
  }
  tokens.scheme = schemeName;
  writeJSON(PATHS.tokenJson, tokens);
  console.log(`Switched to ${schemeName} scheme.`);
  return true;
}

async function main() {
  const rl = createRL();
  const tokens = readJSON(PATHS.tokenJson);
  const schemes = Object.keys(tokens.color);
  const arg = process.argv[2];

  if (arg) {
    if (!switchScheme(arg)) {
      rl.close();
      process.exit(1);
    }
  } else {
    console.log(`Current scheme: ${tokens.scheme}`);
    const selected = await choose(rl, "Pick a color scheme:", schemes);
    if (selected === tokens.scheme) {
      console.log("Already using that scheme.");
    } else {
      switchScheme(selected);
    }
  }

  if (await confirm(rl, "Build and deploy?")) {
    const { deployFlow } = await import("./deploy.js");
    const { run } = await import("./lib/utils.js");
    run("pnpm build");
    await deployFlow(rl);
  }

  rl.close();
}

const isMain = process.argv[1]?.endsWith("theme.js");
if (isMain) main();
