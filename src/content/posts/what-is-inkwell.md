---
title: what is inkwell
date: 2026-03-16
description: a minimal blog template for serious writers. here is what you get.
tags: [inkwell]
---

inkwell is a blog template for people who want to write, not manage infrastructure. you write in markdown, push to GitHub, and your site publishes itself. no CMS, no database, no complexity.

## why inkwell

most blog tools do too much. they come with dashboards, plugins, databases, and configuration that gets in the way of writing. inkwell does the opposite. it gives you a clean writing surface and gets out of the way.

inkwell started as a personal blog. the need was simple: a place to write and publish without friction. over time it became a template that anyone can use to do the same thing.

if you want to write and publish on your own domain with zero overhead, inkwell is for you.

## what you get

### writing
- **markdown posts.** write in any text editor. no special syntax to learn.
- **tags.** organize posts by topic. tag pages are generated automatically.
- **drafts.** mark a post as draft and it stays hidden until you are ready.
- **reading time.** estimated from word count, shown on every post.
- **post navigation.** previous and next links at the bottom of each post.
- **image support.** drop images alongside your post. folder-per-post structure keeps things tidy.
- **pagination.** homepage paginates automatically as your posts grow.

### design
- **four color schemes.** warm, cool, mono, and forest. each with automatic light and dark mode.
- **two font stacks.** serif or sans. or mix them: sans headings with serif body, or the reverse.
- **typography scale.** change the body size and headings scale proportionally.
- **hot reload.** design changes update instantly in the browser during development.

### sharing
- **social cards.** every post renders properly when shared on Twitter, LinkedIn, or anywhere else.
- **auto-generated images.** a 1200x630 preview image is created for each post. no manual work needed.
- **RSS feed.** readers can subscribe at `/rss.xml`.
- **canonical URLs.** set on every page. supports cross-posting without SEO penalties.

### for AI crawlers
- **raw markdown.** every post is available as markdown. append `.md` to any URL.
- **llms.txt.** a site manifest for AI crawlers at `/llms.txt`.
- **posts.json.** structured data for every post at `/posts.json`.

### SEO
- **sitemap.** auto-generated and submitted to search engines.
- **robots.txt.** configured out of the box.
- **semantic HTML.** clean, accessible markup throughout.

## setup tools

inkwell comes with CLI tools so you never have to dig through config files.

- **`pnpm ik:setup`** walks you through site name, colors, font, and deployment.
- **`pnpm ik:new`** creates a new post with the right structure.
- **`pnpm ik:theme`** switches color schemes.
- **`pnpm ik:deploy`** deploys to Vercel, Cloudflare Pages, or Netlify.
- **`pnpm ik:analytics`** adds Google Analytics running in a web worker so it does not slow down your site.

## conditional deploys

only commits with `[build]` in the message trigger a deploy. push drafts and work-in-progress freely without publishing to your live site.

---

write, push, publish. that is inkwell.
