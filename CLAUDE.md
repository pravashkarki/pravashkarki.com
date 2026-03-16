# CLAUDE.md

This file gives an AI assistant everything it needs to understand, maintain, and contribute to this project.

## What this is

**inkwell** - an open source blog template for serious writers. Markdown files are the source of truth. Every page is served as clean HTML for humans and as raw Markdown for AI crawlers. No CMS, no database.

Repo: https://github.com/pravashkarki/inkwell
Author: [Pravo](https://www.linkedin.com/in/pravasho/)
License: MIT

## Stack

- **Astro** - static site generator (markdown-first)
- **Vercel** - hosting, auto-deploys from GitHub
- **Plain CSS** - single stylesheet, no framework
- **pnpm** - package manager
- **OKLCH** - perceptually uniform color system

## Project structure

```
token.json               - design tokens (colors, typography, spacing) - syncs with Figma
CHANGELOG.md             - release history
docs/
  WRITING.md             - how to write posts
  THEMING.md             - color schemes, typography, Figma sync guide
src/
  config.ts              - site identity (name, URL) + reads token.json
  content/
    posts/               - blog posts as .md files
  layouts/
    Base.astro           - shared HTML shell, injects tokens as CSS vars
  pages/
    index.astro          - homepage, lists all posts sorted by date
    posts/
      [...slug].astro    - renders individual post pages
  integrations/
    copy-markdown.ts     - build plugin that copies raw .md files to output
  styles/
    global.css           - layout and structure styles using CSS variables only
public/                  - static assets (images, favicon)
astro.config.mjs         - Astro config, pulls site URL from config.ts
vercel.json              - conditional build: only deploys when commit has [build]
```

## Configuration

Two files to edit:

**`token.json`** - design tokens (shared with Figma):
- `typography.scale` - sm, md, lg, xl sizes. `typography.body` picks which scale to use
- `typography.fontFamily` - serif and sans font stacks. `typography.fontStack` picks which one to use
- `spacing` - body padding, maxWidth, gaps, heading margins
- `radii` - border radius for code and pre blocks
- `scheme` - which color scheme to use ("warm", "cool", "mono", "forest")
- `color` - OKLCH color schemes, each with light/dark variants

**`src/config.ts`** - site identity:
- `site.name` - displayed in the header
- `site.title` - HTML `<title>` on the homepage
- `site.description` - meta description
- `site.url` - canonical site URL

## How tokens flow

`token.json` -> `config.ts` imports it -> `Base.astro` injects all values as CSS custom properties on `:root` -> `global.css` uses `var(--token-name)` everywhere. No hardcoded values in CSS.

Light/dark mode: colors swap automatically via `@media (prefers-color-scheme: dark)`. Typography and spacing stay the same in both modes.

## The .md URL pattern

Every post at `/posts/foo/` also has `/posts/foo.md` serving the raw Markdown source. Two pieces make it work:

1. `src/integrations/copy-markdown.ts` copies source `.md` files into the build output
2. `Base.astro` adds `<link rel="alternate" type="text/markdown" href="/posts/foo.md">` to the HTML head

## Content collection

Defined in `src/content.config.ts`. Uses Astro's glob loader pointed at `src/content/posts/`. Required frontmatter:

```yaml
---
title: string       # required
date: YYYY-MM-DD    # required, coerced to Date
description: string # required, used in meta tag, keep under 160 chars
---
```

## Git workflow

- `main` - stable releases only
- `dev` - active development, features merge here first
- `feature/<name>` or `fix/<name>` - branch from `dev`
- Flow: feature branch -> dev -> main (with tag)

## Versioning

Semver: vMAJOR.MINOR.PATCH
- MAJOR - breaking changes to config/token format
- MINOR - new features that don't break existing setups
- PATCH - bug fixes, doc updates

## Releasing

1. Merge `dev` into `main`
2. Update CHANGELOG.md
3. Tag: `git tag v1.x.x`
4. Push with tags
5. Create GitHub release from tag
6. Deploy with `[build]` in commit message

## Commit conventions

- Start with a verb: Add, Fix, Update, Remove, Move
- Include `[build]` only when Vercel should deploy
- No co-author tags

## Commands

```
pnpm install    # install dependencies
pnpm dev        # local dev server
pnpm build      # production build to dist/
pnpm preview    # preview the production build
```

## Reproducing from scratch

1. Create an empty directory and run `pnpm init`
2. Install Astro: `pnpm add astro`
3. Create `token.json` with typography (scale + body), spacing, radii, scheme, and OKLCH color definitions
4. Create `src/config.ts` with site identity, importing token.json
5. Set up `src/content.config.ts` with a `posts` collection using glob loader
6. Create `Base.astro` that injects all tokens as CSS custom properties and adds `<link rel="alternate" type="text/markdown">`
7. Create `global.css` using only CSS variables - no hardcoded values
8. Create `index.astro` with post list sorted by date
9. Create `[...slug].astro` for individual posts
10. Create `copy-markdown.ts` integration - on `astro:build:done`, copy `.md` files to output
11. Register the integration in `astro.config.mjs`
12. Add `vercel.json` with `ignoreCommand` that checks for `[build]`
13. Push to GitHub, connect to Vercel
