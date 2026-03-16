// Edit this file for site identity.
// Edit token.json for design tokens (colors, typography, spacing).

import tokens from "../token.json";

export const site = {
  name: "inkwell",
  title: "inkwell",
  description: "A minimal blog template for serious writers.",
  url: "https://try-inkwell.vercel.app",
};

export const tokens_ = tokens;
export const scheme = tokens.scheme as keyof typeof tokens.color;
export const colors = tokens.color[scheme];
