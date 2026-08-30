# inkwell

a blog template for writers. markdown in, website out. no CMS, no database. write, push, it's live.

every post is served as clean HTML for readers and raw markdown for AI crawlers. append `.md` to any post URL to get the source.

**deploy your own:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpravashkarki%2Finkwell)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/pravashkarki/inkwell)
[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/pravashkarki/inkwell)

or self-host: `pnpm build` and upload the `dist/` folder to any server.

**note:** demo posts are AI-generated for layout demonstration only.

## quick start

```
pnpm install
pnpm ik:setup
```

the setup wizard walks you through site name, color scheme, font, and deployment. or skip it and edit files directly:

```
pnpm dev
```

## CLI tools

```
pnpm ik:new          # create a new post (interactive or with args)
pnpm ik:setup        # first-run wizard or settings menu
pnpm ik:theme        # switch color scheme
pnpm ik:deploy       # deploy via git push, CLI, or self-host (rsync/scp)
pnpm ik:migrate      # move deployment to a different platform
pnpm ik:analytics    # set up Google Analytics (runs via web worker)
```

### create a post

```
pnpm ik:new
```

prompts for title, description, and tags. for posts with images:

```
pnpm ik:new -- --folder
```

### switch theme

```
pnpm ik:theme cool
```

four built-in OKLCH schemes: `warm`, `cool`, `mono`, `forest`. run without args for interactive selection.

### deploy

```
pnpm ik:deploy
```

supports git push, Vercel/Cloudflare/Netlify CLI, and self-host (rsync or scp to your own server). use `pnpm ik:migrate` to switch platforms.

### analytics

```
pnpm ik:analytics
```

adds Google Analytics with Partytown, which runs the tracking script in a web worker instead of the main thread. production builds only. remove with `pnpm ik:analytics --remove`.

## configure

two files to edit (or use `pnpm ik:setup`):

- **`token.json`** - design tokens (colors, typography, spacing). syncs with Figma.
- **`src/config.ts`** - site name, URL, description, and nav links.

### navigation

add header links in `src/config.ts`:

```ts
export const nav = [
  { label: "about", href: "/about" },
  { label: "twitter", href: "https://twitter.com/you", external: true },
];
```

## features

### for writers
- **tags** - optional `tags: [writing, thinking]` in frontmatter. tag pages at `/tags/`
- **drafts** - add `draft: true` to hide a post from production. visible in dev.
- **reading time** - estimated from word count, shown on every post
- **prev/next navigation** - links to adjacent posts at the bottom of each post
- **image colocation** - folder-per-post structure for posts with images
- **pagination** - homepage paginates at 10 posts per page

### for sharing
- **open graph + twitter cards** - every post renders properly when shared on social media
- **auto OG images** - 1200x630 PNG generated for each post. no manual image creation.
- **canonical URLs** - set on every page. optional `canonicalUrl` field for cross-posting.
- **RSS feed** at `/rss.xml`

### for SEO
- **sitemap** - auto-generated via @astrojs/sitemap
- **robots.txt** - points to sitemap
- **semantic HTML** - clean, accessible markup

### for AI
- **raw markdown** - every post available at `/posts/slug.md`
- **llms.txt** - site manifest for AI crawlers at `/llms.txt`
- **posts.json** - structured API at `/posts.json`

### design
- **OKLCH colors** - perceptually uniform, four schemes with light/dark mode
- **theme switcher** - toggle between light, dark, and system preference
- **design tokens** - all values in token.json, injected as CSS custom properties
- **typography scale** - sm, md, lg, xl. serif, sans, or mixed font stacks.
- **hot reload** - token.json changes update instantly in dev

### accessibility
- **WCAG 2.1 AA compliant** - contrast ratios, keyboard navigation, screen reader support
- **skip to content** link
- **focus visible** styles on all interactive elements
- **prefers-reduced-motion** support
- **aria labels** on navigation, theme toggle, and interactive elements

## frontmatter

```yaml
---
title: your post title          # required
date: 2026-03-15                # required
description: a short summary.   # required, under 160 chars
tags: [writing, thinking]       # optional
draft: true                     # optional, hides from production
image: /images/cover.jpg        # optional, used as OG image
canonicalUrl: https://...       # optional, for cross-posting
---
```

only the first three fields are required. everything else is opt-in.

## build and deploy

```
pnpm build
pnpm preview
```

or use the deploy tool:

```
pnpm ik:deploy
```

for git-push deploys, include `[build]` in the commit message:

```
git commit -m "[build] add new post"
git push
```

commits without `[build]` are ignored by the deploy platform.

## docs

- [writing a post](docs/WRITING.md) - creating posts, frontmatter, images, drafts
- [theming](docs/THEMING.md) - color schemes, OKLCH, typography, spacing, Figma sync
- [updating](docs/UPDATING.md) - pulling template updates without losing customizations

## roadmap

see [ROADMAP.md](ROADMAP.md) for planned features.

## author

[Pravo](https://www.linkedin.com/in/pravasho/)

## license

[MIT](LICENSE)
