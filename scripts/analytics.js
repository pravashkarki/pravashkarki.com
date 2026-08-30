import { createRL, prompt, confirm, readJSON, readText, writeText, run, PATHS } from "./lib/utils.js";

const GA_ID_REGEX = /^G-[A-Z0-9]+$/;

const GA_SNIPPET = `    {import.meta.env.PROD && analytics.gaMeasurementId && (
      <>
        <script type="text/partytown" src={\`https://www.googletagmanager.com/gtag/js?id=\${analytics.gaMeasurementId}\`}></script>
        <script type="text/partytown" define:vars={{ gaId: analytics.gaMeasurementId }}>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', gaId);
        </script>
      </>
    )}`;

function hasAnalyticsConfig() {
  const content = readText(PATHS.config);
  return content.includes("export const analytics");
}

function getCurrentGaId() {
  const content = readText(PATHS.config);
  const match = content.match(/gaMeasurementId:\s*"([^"]*)"/);
  return match ? match[1] : "";
}

function addAnalyticsToConfig(gaId) {
  let content = readText(PATHS.config);
  if (hasAnalyticsConfig()) {
    content = content.replace(
      /gaMeasurementId:\s*"[^"]*"/,
      `gaMeasurementId: "${gaId}"`,
    );
  } else {
    content += `\nexport const analytics = {\n  gaMeasurementId: "${gaId}",\n};\n`;
  }
  writeText(PATHS.config, content);
}

function addPartytownToAstroConfig() {
  let content = readText(PATHS.astroConfig);
  if (content.includes("partytown")) return;

  // Add import
  const lastImport = content.lastIndexOf("import ");
  const lineEnd = content.indexOf("\n", lastImport);
  content =
    content.slice(0, lineEnd + 1) +
    'import partytown from "@astrojs/partytown";\n' +
    content.slice(lineEnd + 1);

  // Add to integrations
  content = content.replace(
    /integrations:\s*\[([^\]]+)\]/,
    (match, inner) => `integrations: [${inner.trimEnd()}, partytown()]`,
  );

  writeText(PATHS.astroConfig, content);
}

function addGaToBaseLayout() {
  let content = readText(PATHS.baseLayout);

  // Add analytics import if not present
  if (!content.includes("analytics")) {
    content = content.replace(
      'import { site, nav, colors, tokens_ as t } from "../config";',
      'import { site, nav, colors, tokens_ as t, analytics } from "../config";',
    );
  }

  // Add GA snippet before </head> if not present
  if (!content.includes("googletagmanager")) {
    content = content.replace("  </head>", `${GA_SNIPPET}\n  </head>`);
  }

  writeText(PATHS.baseLayout, content);
}

function removeAnalytics() {
  // Remove from config.ts
  let config = readText(PATHS.config);
  config = config.replace(/\nexport const analytics = \{[^}]*\};\n/, "");
  writeText(PATHS.config, config);

  // Remove partytown from astro.config.mjs
  let astroConfig = readText(PATHS.astroConfig);
  astroConfig = astroConfig.replace(
    /import partytown from "@astrojs\/partytown";\n/,
    "",
  );
  astroConfig = astroConfig.replace(/,\s*partytown\(\)/, "");
  writeText(PATHS.astroConfig, astroConfig);

  // Remove from Base.astro
  let layout = readText(PATHS.baseLayout);
  layout = layout.replace(", analytics", "");
  // Remove the GA snippet block (match opening tag through closing )}
  layout = layout.replace(
    /\s*\{import\.meta\.env\.PROD && analytics[\s\S]*?\)\}/,
    "",
  );
  writeText(PATHS.baseLayout, layout);

  console.log("Analytics removed.");
}

async function main() {
  const rl = createRL();

  // Handle --remove flag
  if (process.argv.includes("--remove")) {
    if (!hasAnalyticsConfig()) {
      console.log("No analytics configuration found.");
    } else {
      removeAnalytics();
    }
    rl.close();
    return;
  }

  // Check existing config
  const currentId = getCurrentGaId();
  if (currentId) {
    console.log(`Current GA measurement ID: ${currentId}`);
    if (!(await confirm(rl, "Change it?"))) {
      rl.close();
      return;
    }
  }

  // Prompt for measurement ID
  let gaId;
  while (true) {
    gaId = await prompt(rl, "GA measurement ID (G-XXXXXXXXXX): ");
    if (GA_ID_REGEX.test(gaId)) break;
    console.log("Invalid format. Expected: G-XXXXXXXXXX");
  }

  // Install partytown if needed
  const pkg = readJSON(PATHS.packageJson);
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (!deps["@astrojs/partytown"]) {
    console.log("Installing @astrojs/partytown...");
    run("pnpm add @astrojs/partytown");
  }

  // Modify files
  addAnalyticsToConfig(gaId);
  console.log("Updated config.ts with measurement ID.");

  addPartytownToAstroConfig();
  console.log("Added partytown to astro.config.mjs.");

  addGaToBaseLayout();
  console.log("Added GA snippet to Base.astro.");

  console.log("\nGoogle Analytics configured. It will only load in production builds.");

  rl.close();
}

main();
