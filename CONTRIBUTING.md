# Contributing to inkwell

Thanks for your interest. inkwell is intentionally minimal. Contributions should keep it that way.

## Before you start

- Check existing issues to avoid duplicates
- Open an issue first to discuss non-trivial changes
- Bug fixes and typo corrections can go straight to a PR

## What we accept

- Bug fixes
- Accessibility improvements
- Performance improvements
- Documentation improvements
- New color schemes (if well-crafted and distinct from existing ones)

## What we don't accept

- New dependencies (keep the stack minimal)
- CMS integrations
- JavaScript frameworks or component libraries
- Features that add complexity for users who just want to write

## How to contribute

1. Fork the repo
2. Branch from `dev` (not `main`)
3. Make your changes
4. Test: `pnpm build` must pass with no errors
5. Open a PR into `dev`

## PR guidelines

- One feature or fix per PR
- Describe what you changed and why
- If it touches `token.json`, explain the design reasoning
- If it touches `global.css`, no hardcoded values - use CSS variables

## Code style

- Start commit messages with a verb (Add, Fix, Update, Remove)
- Keep it simple
