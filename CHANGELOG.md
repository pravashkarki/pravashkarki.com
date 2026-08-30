# Changelog

## v2.3.0 - 2026-03-28

### Added
- `pnpm ik:setup` - interactive first-run wizard (site name, theme, font, git remote, demo cleanup, first post, deploy)
- `pnpm ik:theme` - switch color scheme from CLI, with optional build and deploy
- `pnpm ik:deploy` - deploy to Vercel, Cloudflare Pages, or Netlify with auto-detection on rerun
- `pnpm ik:migrate` - move deployment between platforms (cleans old config, generates new)
- `pnpm ik:analytics` - Google Analytics setup with Partytown web worker (production-only, `--remove` to undo)
- Shared CLI utilities in `scripts/lib/` (prompts, file I/O, platform detection, deploy config templates)

## v2.2.0 - 2026-03-27

### Changed
- Body text size from 24px to 18px for comfortable reading
- Line height from 1.5 to 1.6 for better readability at smaller body size
- h3 scale from 18px to 20px so all heading levels are visually distinct
- Content gap from 1rem to 1.25rem for more breathing room between paragraphs
- Token keys `body`/`code` replaced with direct `bodySize`/`codeSize` values in token.json (simpler for non-technical users)
- Heading line-height set to 1.3 (tighter than body for visual contrast)

### Added
- List item spacing (0.25em between consecutive items)
- Letter-spacing on h1 (-0.01em tightening)

### Docs
- Updated THEMING.md to reflect new typography token structure

## v2.1.0 - 2026-03-26

### Added
- `pnpm ik:new` interactive post scaffolder (also accepts args for non-interactive use)
- `--folder` flag for ik:new to create folder-based posts with colocated images
- Folder-per-post support: `posts/my-post/index.md` with images alongside
- Auto-generated OG images (1200x630 PNG) for every post using Satori + Sharp
- Posts without a custom image automatically get a generated social preview
- copy-markdown integration now copies images alongside markdown files

### Changed
- Twitter card type upgrades to `summary_large_image` when OG image is available

### Dependencies
- Added `satori` and `sharp` for OG image generation

## v2.0.0 - 2026-03-26

### Added
- Tags support with optional `tags` array in frontmatter
- Tag listing page at `/tags/` and individual tag pages at `/tags/[tag]/`
- Draft support with `draft: true` in frontmatter (hidden in production, visible in dev)
- Pagination on homepage (10 posts per page)
- Previous/next post navigation at bottom of each post
- Reading time estimate on every post
- 404 page
- Configurable header navigation via `nav` array in `src/config.ts`
- Open Graph meta tags (og:title, og:description, og:url, og:site_name, og:type, og:image)
- Twitter card meta tags (twitter:card, twitter:title, twitter:description, twitter:image)
- Canonical URL on every page
- Optional `image` and `canonicalUrl` fields in frontmatter
- Sitemap via @astrojs/sitemap
- RSS feed at `/rss.xml` via @astrojs/rss with auto-discovery link
- `robots.txt` endpoint pointing to sitemap
- `llms.txt` endpoint for AI discoverability
- `posts.json` API endpoint with structured post metadata

### Changed
- Homepage uses Astro pagination (moved from `index.astro` to `[...page].astro`)
- Content schema expanded: tags, draft, image, canonicalUrl (all optional)
- Post date display now includes reading time inline

## v1.3.1 - 2026-03-16

### Added
- Updating guide (docs/UPDATING.md) for pulling template updates

## v1.3.0 - 2026-03-16

### Added
- Copy-to-clipboard button on code blocks (appears on hover)
- Hot-reload for token.json in dev server via watch-tokens integration

### Fixed
- Code font size now uses typography scale instead of relative em

## v1.2.0 - 2026-03-15

### Added
- Skip-to-content link for keyboard navigation
- Visible focus styles for interactive elements
- `aria-label` on nav landmark
- Footer with quote
- Deploy with Vercel button context line in README

### Changed
- License from Unlicense to MIT
- Line height from 1.3 to 1.5 (WCAG compliant)
- Removed emdash rule from code style guidelines

## v1.1.0 - 2026-03-15

### Added
- Serif/sans-serif font stack choice via `fontStack` in token.json
- Italic styling for blockquotes

### Changed
- Body text size back to lg scale
- Site name to "inkwell"

### Fixed
- THEMING.md body size example now matches default

## v1.0.0 - 2026-03-15

Initial release.

### Added
- Astro-based static site with markdown content collection
- Homepage with post list sorted by date
- .md URL pattern - append .md to any post URL for raw Markdown
- Auto-discovery `<link rel="alternate" type="text/markdown">` tag
- Design tokens in token.json (colors, typography, spacing, radii)
- OKLCH color system with four schemes (warm, cool, mono, forest)
- Typography scale (sm, md, lg, xl) configurable from token.json
- Light/dark mode based on system setting
- Conditional Vercel deploys via [build] in commit message
- Theming guide (docs/THEMING.md)
- Writing guide (docs/WRITING.md)
- MIT license
