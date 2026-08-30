export function vercelConfig() {
  return {
    ignoreCommand: "! git log -1 --pretty=%B | grep -q '\\[build\\]'",
  };
}

export function wranglerConfig(siteName) {
  const date = new Date().toISOString().slice(0, 10);
  return `name = "${siteName}"
pages_build_output_dir = "dist"
compatibility_date = "${date}"
`;
}

export function netlifyConfig() {
  return `[build]
  command = "pnpm build"
  publish = "dist"
  ignore = "git log -1 --pretty=%B | grep -q '[build]'"
`;
}
