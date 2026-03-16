---
title: getting started with inkwell
date: 2026-03-15
description: Set up your own blog in five minutes. No frameworks to learn, no config to wrestle.
---

Inkwell is a blog template for people who want to write, not manage infrastructure. Here is how to get it running.

## What you need

- [Node.js](https://nodejs.org) (v18 or later)
- [pnpm](https://pnpm.io) (`npm install -g pnpm`)
- A GitHub account
- A text editor

## Step 1: Use the template

Go to the [inkwell repo](https://github.com/pravashkarki/inkwell) and click **"Use this template"**. Name your new repo whatever you want. Clone it locally:

```
git clone https://github.com/your-name/your-repo.git
cd your-repo
pnpm install
```

## Step 2: Make it yours

Open `src/config.ts` and change the site identity:

```ts
export const site = {
  name: "Your Name",
  title: "Your Name",
  description: "Your site description.",
  url: "https://yourdomain.com",
};
```

## Step 3: Pick a color scheme

Open `token.json` and set the `scheme` field:

```json
"scheme": "warm"
```

Options: `warm`, `cool`, `mono`, `forest`. Each one comes with **light and dark mode** that follows your system setting automatically.

### Quick comparison

| Scheme | Hue | Mood |
|---|---|---|
| warm | Amber | Cozy, inviting |
| cool | Blue | Clean, professional |
| mono | Neutral | Classic, no color |
| forest | Green | Calm, natural |

## Step 4: Write your first post

Create a file in `src/content/posts/`:

```
src/content/posts/my-first-post.md
```

Add the required frontmatter and write:

```markdown
---
title: My First Post
date: 2026-03-15
description: Hello world.
---

Your content here. Write in plain Markdown.
```

Three fields are required: **title**, **date**, and **description**. The description is used in the HTML meta tag. Keep it under 160 characters.

## Step 5: Preview locally

```
pnpm dev
```

Open `http://localhost:4321` in your browser. Changes reload automatically.

## Step 6: Deploy

Connect your repo to [Vercel](https://vercel.com). It auto-detects the Astro setup. Zero config needed.

Push with `[build]` in the commit message to deploy:

```
git add .
git commit -m "[build] My first post"
git push
```

Commits **without** `[build]` are ignored by Vercel. This lets you push drafts and work-in-progress without triggering a deploy.

---

## What you get

- Every post available as **HTML** and **raw Markdown** (append `.md` to any URL)
- Auto-discovery `<link>` tag so AI crawlers find the Markdown version
- **Light and dark mode** based on the reader's system setting
- All design values in one `token.json` file, syncable with Figma
- Typography scale (`sm`, `md`, `lg`, `xl`) configurable from one place

> The best blog setup is the one that gets out of your way and lets you write.

That is inkwell. Write, push, publish.
