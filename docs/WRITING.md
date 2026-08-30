# Writing Guide

## Creating a post

The fastest way:

```
pnpm ik:new
```

This prompts for title, description, and tags, then generates the file with correct frontmatter and a slugified filename.

You can also pass arguments directly:

```
pnpm ik:new -- "Post Title" "Short description" "tag1, tag2"
```

### Manual creation

1. Add a `.md` file to `src/content/posts/`
2. Use lowercase, hyphenated filenames: `my-post-title.md`
3. Add the required frontmatter (see below)
4. Write the body in plain Markdown below the frontmatter
5. Commit and push with `[build]` in the commit message to deploy

## Frontmatter

```yaml
---
title: Your Post Title          # required
date: 2026-03-15                # required, YYYY-MM-DD
description: A short summary.   # required, under 160 chars
tags: [writing, thinking]       # optional
draft: true                     # optional, hides from production
image: /images/cover.jpg        # optional, used as OG image
canonicalUrl: https://...       # optional, for cross-posting
---
```

- `title`, `date`, and `description` are required. The build will fail without them.
- `description` is used in the HTML meta tag and social cards. Keep it under 160 characters.
- Do not add `# Title` as the first line. The layout renders the title from frontmatter.
- Use `##` for section headings within the post.

## Tags

Add tags to organize your posts:

```yaml
tags: [writing, productivity]
```

Tags generate pages at `/tags/` (listing) and `/tags/[tag]/` (filtered posts). Tags are shown on the homepage and post pages with a `#` prefix.

## Drafts

Add `draft: true` to keep a post hidden from the live site:

```yaml
draft: true
```

Drafts are visible when running `pnpm dev` locally but excluded from production builds, RSS, sitemap, and all API endpoints.

## Images

### Simple (no images next to the post)

Put images in `public/` and reference them:

```markdown
![Alt text](/images/photo.jpg)
```

### Folder-per-post (images alongside your markdown)

For posts with images, use a folder structure:

```
pnpm ik:new -- --folder
```

This creates:

```
src/content/posts/my-post/
  index.md
```

Drop images in the same folder and reference them with relative paths:

```markdown
![Alt text](./photo.jpg)
```

Both flat files (`my-post.md`) and folder-based posts (`my-post/index.md`) work side by side.

## Social sharing

Every post automatically gets:

- Open Graph meta tags (title, description, image, URL)
- Twitter card meta tags
- An auto-generated 1200x630 OG image showing the post title and site name

To use a custom image instead of the auto-generated one, set the `image` field:

```yaml
image: /images/my-custom-og.jpg
```

## Cross-posting

If you publish the same post on Medium, Dev.to, or other platforms, set the canonical URL to point back to your site:

```yaml
canonicalUrl: https://yourdomain.com/posts/my-post/
```

This tells search engines which version is the original.

## Example

File: `src/content/posts/hello-world.md`

```markdown
---
title: Hello World
date: 2026-03-15
description: First post on the new site.
tags: [personal]
---

This is the first post. Write in plain Markdown.

## A section

More content here.
```
