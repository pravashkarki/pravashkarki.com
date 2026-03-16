# Writing Guide

## Creating a post

1. Add a `.md` file to `src/content/posts/`
2. Use lowercase, hyphenated filenames: `my-post-title.md`
3. Every post needs this frontmatter at the top:

```yaml
---
title: Your Post Title
date: 2026-03-15
description: A one-line summary of the post.
---
```

4. Write the body in plain Markdown below the frontmatter
5. Commit and push -include `[build]` in the commit message to trigger a deploy

## Rules

- `title`, `date`, and `description` are required -the build will fail without them
- `date` format is `YYYY-MM-DD`
- `description` is used in the HTML meta tag -keep it under 160 characters
- Do not add `# Title` as the first line -the layout renders the title from frontmatter
- Use `##` for section headings within the post
- Images go in `public/` and are referenced as `/image.png` in Markdown

## Example

File: `src/content/posts/hello-world.md`

```markdown
---
title: Hello World
date: 2026-03-15
description: First post on the new site.
---

This is the first post. Write in plain Markdown.

## A section

More content here.
```
