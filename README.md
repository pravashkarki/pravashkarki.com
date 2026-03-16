# inkwell

A minimal blog template where Markdown is the source of truth. Write, push, publish.

Every page is available as clean HTML for humans and as raw Markdown for AI crawlers. Append `.md` to any post URL to get the raw Markdown. No CMS, no database, nothing to manage beyond the writing itself.

**Deploy your own inkwell site in one click:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpravashkarki%2Finkwell)

**Note:** Demo posts are AI-generated for layout demonstration only. They are not practical advice of any kind.

## Use this template

1. Fork or clone this repo
2. Edit `token.json` for design (colors, typography, spacing)
3. Edit `src/config.ts` for site identity (name, URL, description)
4. Delete the demo posts in `src/content/posts/` and demo images in `public/images/`, then add your own
5. Connect to Vercel (or any static host) and deploy

## Docs

- [Writing a post](docs/WRITING.md) - how to create posts, frontmatter rules, examples
- [Theming](docs/THEMING.md) - color schemes, OKLCH guide, typography scale, spacing, Figma sync

## Design tokens

All design values live in `token.json`. This file syncs with Figma.

- `scheme` - active color scheme ("warm", "cool", "mono", "forest")
- `color` - OKLCH colors with light and dark variants
- `typography.scale` - sm, md, lg, xl sizes. Change once, updates everywhere
- `spacing` - body padding, max width, gaps, heading margins
- `radii` - border radius values

## Development

```
pnpm install
pnpm dev
```

## Build and deploy

```
pnpm build
pnpm preview
```

Push with `[build]` in the commit message to trigger Vercel:

```
git commit -m "[build] Add new post"
git push
```

Commits without `[build]` are ignored by Vercel.

## Author

[Pravo](https://www.linkedin.com/in/pravasho/)

## License

[MIT](LICENSE)
