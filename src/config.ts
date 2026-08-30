// Edit this file for site identity.
// Edit token.json for design tokens (colors, typography, spacing).

import tokens from "../token.json";

export const site = {
  name: "Pravash Karki",
  title: "Pravash Karki · HCI-certified product designer and technology consultant",
  description: "Pravash Karki: HCI-certified product designer and technology consultant. Essays, products, and twenty years of design and technology work.",
  url: "https://pravashkarki.com",
};

export const nav = [
  { label: "Essays", href: "/#essays" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
];

export const tokens_ = tokens;
export const scheme = tokens.scheme as keyof typeof tokens.color;
export const colors = tokens.color[scheme];
