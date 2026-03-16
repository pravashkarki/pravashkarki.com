---
title: what is inkwell
date: 2026-03-16
description: A minimal blog template for serious writers. Here is what you get.
---

Inkwell is a blog template. You write in Markdown, push to GitHub, and your site publishes itself. No CMS, no database, no complexity.

## features

- **Markdown-first.** Your posts are `.md` files. That is it
- **AI-crawler friendly.** Every page is available as raw Markdown. Append `.md` to any URL
- **Light and dark mode.** Follows the reader's system setting automatically
- **Design tokens.** All colors, typography, and spacing in one `token.json` file
- **Figma sync.** Export tokens from Figma, drop into `token.json`, rebuild
- **Conditional deploys.** Only builds when your commit says `[build]`

## four color schemes

Inkwell ships with four schemes. Set `"scheme"` in `token.json` to switch.

| scheme | hue | mood |
|---|---|---|
| **warm** | amber | cozy, inviting |
| **cool** | blue | clean, professional |
| **mono** | neutral | classic, no color |
| **forest** | green | calm, natural |

All schemes use **OKLCH** colors for perceptual uniformity. Each has a light and dark variant.

### how OKLCH works

`oklch(L C H)` where:

- **L** (lightness) flips between light and dark mode
- **C** (chroma) stays low for muted, readable tones
- **H** (hue) sets the personality of the scheme

To create your own scheme, pick a hue angle and follow the pattern in `token.json`. See the [theming guide](https://github.com/pravashkarki/inkwell/blob/main/docs/THEMING.md) for details.

## typography scale

Four sizes defined once, used everywhere:

| token | size | used for |
|---|---|---|
| `sm` | 0.875rem | dates, metadata |
| `md` | 1.125rem | body text, h3 |
| `lg` | 1.5rem | h2 headings |
| `xl` | 2rem | h1 headings |

Change `"body"` in `token.json` to set the base reading size. Change any scale value and it updates across the entire site.

## the .md pattern

> Websites now have a third audience: AI crawlers. Serving clean Markdown versions of every page helps them read content better.

Every post on this site has two versions:

- `/posts/what-is-inkwell/` serves HTML for humans
- `/posts/what-is-inkwell.md` serves raw Markdown for AI crawlers

The HTML includes a `<link rel="alternate" type="text/markdown">` tag so crawlers discover the Markdown version automatically.

---

## get started

1. Use the [template on GitHub](https://github.com/pravashkarki/inkwell)
2. Edit two files: `token.json` for design, `src/config.ts` for identity
3. Write your first post
4. Push and publish

That is it. Write, push, publish.
