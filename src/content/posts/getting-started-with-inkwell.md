---
title: getting started with inkwell
date: 2026-03-15
description: set up your own blog in five minutes. no frameworks to learn, no config to wrestle.
tags: [inkwell]
---

inkwell is a blog template for people who want to write, not manage infrastructure. here is how to get it running.

## what you need

- [Node.js](https://nodejs.org) (v18 or later)
- [pnpm](https://pnpm.io) (`npm install -g pnpm`)
- a GitHub account
- a text editor

## step 1: use the template

go to the [inkwell repo](https://github.com/pravashkarki/inkwell) and click **"use this template"**. name your new repo whatever you want. clone it locally:

```
git clone https://github.com/your-name/your-repo.git
cd your-repo
pnpm install
```

## step 2: run setup

```
pnpm ik:setup
```

the wizard asks for your site name and description. everything else is optional. the defaults work out of the box.

if you want to customize further, the wizard lets you pick a color scheme, font stack, and typography sizes. you can always come back and change these later by running `pnpm ik:setup` again.

## step 3: write your first post

```
pnpm ik:new
```

this creates a new post with the right structure. it asks for a title, description, and optional tags. for posts with images, add `--folder` to create a folder-per-post structure.

or create the file manually in `src/content/posts/`:

```markdown
---
title: My First Post
date: 2026-03-15
description: Hello world.
tags: [writing]
---

Your content here. Write in plain Markdown.
```

three fields are required: **title**, **date**, and **description**. everything else is optional.

### optional frontmatter

```yaml
tags: [writing, thinking]       # tag pages generated automatically
draft: true                     # hidden in production, visible in dev
image: /images/cover.jpg        # custom social sharing image
canonicalUrl: https://...       # for cross-posted content
```

## step 4: preview locally

```
pnpm dev
```

open `http://localhost:4321` in your browser. changes reload automatically as you write.

## step 5: deploy

```
pnpm ik:deploy
```

choose your platform: Vercel, Cloudflare Pages, or Netlify. the tool handles the rest.

for git-push deploys, include `[build]` in the commit message:

```
git add .
git commit -m "[build] My first post"
git push
```

commits without `[build]` are ignored. push drafts and work-in-progress without triggering a deploy.

## changing your site later

run `pnpm ik:setup` anytime to change your site name, color scheme, font, or typography. the other tools are available too:

```
pnpm ik:theme         # switch color scheme
pnpm ik:analytics     # add Google Analytics
pnpm ik:migrate       # move to a different deploy platform
```

---

> the best blog setup is the one that gets out of your way and lets you write.

that is inkwell. write, push, publish.
