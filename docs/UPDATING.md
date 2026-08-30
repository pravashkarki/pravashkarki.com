# Updating Guide

## Setup (one time)

Add inkwell as a remote:

```
git remote add upstream https://github.com/pravashkarki/inkwell.git
```

## Pulling updates

```
git fetch upstream
git merge upstream/main
```

Your customizations in `token.json` and `src/config.ts` will merge cleanly in most cases since template updates typically change layouts, styles, and integrations.

## If you get a merge conflict

A conflict on `token.json` means the token structure changed (major version). Open the file, keep your values, and adopt the new structure. Check the [changelog](https://github.com/pravashkarki/inkwell/blob/main/CHANGELOG.md) for what changed.

## What's safe to customize

These files are yours. Template updates won't touch them:

- `token.json` - design tokens
- `src/config.ts` - site identity
- `src/content/posts/` - your writing
- `public/` - your images and assets

## What gets updated

These files may change between releases:

- `src/layouts/` - HTML structure
- `src/styles/global.css` - layout and styling
- `src/integrations/` - build plugins
- `astro.config.mjs` - Astro configuration
- `docs/` - documentation
