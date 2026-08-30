// Edit this file for site identity.
// Edit token.json for design tokens (colors, typography, spacing).

import tokens from "../token.json";

export const site = {
  name: "Pravash Karki",
  title: "Pravash Karki",
  description: "Pravash Karki: product designer and technology consultant in Kathmandu. Founder of LastDoor; maker of Mano, a mental-health app and atlas for Nepal.",
  url: "https://pravashkarki.com",
};

export const nav = [
  { label: "about", href: "/about" },
  { label: "mano app", href: "/app/mano" },
  { label: "mano atlas", href: "https://pcs.pravashkarki.com", external: true },
];

export const tokens_ = tokens;
export const scheme = tokens.scheme as keyof typeof tokens.color;
export const colors = tokens.color[scheme];
