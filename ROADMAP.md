# roadmap

what's planned for inkwell. focused on making it simpler for writers to set up, customize, and publish.

## planned

### editor templates
- iA Writer template (.iatemplate with frontmatter fields)
- Obsidian template (note template with frontmatter)
- VS Code snippet (inkwell-post scaffolder)

### documentation
- quickstart guide ("blog live in 10 minutes")
- editor guide (Obsidian, iA Writer, Typora, github.dev workflows)
- deploy guide (Vercel, Cloudflare Pages, Netlify, self-host, domain setup)

### optional features (config-driven, off by default)
- comments via Giscus (GitHub Discussions)
- client-side search
- newsletter subscribe form (Buttondown)
- archive page (browse by year)
- post series (multi-part posts with navigation)
- table of contents (auto-generated from headings)
- JSON Feed

## done

### v2.3.0 - setup, design, accessibility
- theme switcher (light/dark/system toggle with localStorage)
- WCAG 2.1 AA compliant contrast across all color schemes
- CSS normalize (replaced aggressive reset)
- semantic HTML (section/article for post list, proper heading hierarchy)
- subtle link underlines (40% opacity)
- mixed font stacks (sans+serif, serif+sans)
- self-host deploy option (rsync/scp to your own server)
- `ik:setup` redesigned: first-run wizard + settings menu, show current values
- `ik:deploy` supports git push, platform CLI, and self-host
- keyboard accessible copy button, prefers-reduced-motion support
- aria-current on active nav links
- demo content rewritten (user-facing features, lowercase style)
- deploy buttons for Vercel, Cloudflare Pages, Netlify in README

### v2.2.0 - typography rules
- body 24px to 18px, line-height 1.6, heading hierarchy fixed
- direct bodySize/codeSize tokens, list spacing, heading line-height

### v2.1.1 - about page
- about page and custom pages support
- about link in header nav

### v2.1.0 - post scaffolder + OG images
- `pnpm ik:new` post scaffolder (interactive + args + --folder)
- image colocation (folder-per-post support)
- auto-generated OG images (Satori + Sharp)

### v2.0.0 - core features
- tags + tag pages, draft support, pagination, prev/next nav
- reading time, 404 page, header nav config
- OG + Twitter meta tags, canonical URLs
- sitemap, RSS, robots.txt, llms.txt, posts.json

### setup tooling
- `pnpm ik:setup` - first-run wizard + settings menu
- `pnpm ik:theme` - switch color scheme
- `pnpm ik:deploy` - deploy to Vercel, Cloudflare Pages, Netlify, or self-host
- `pnpm ik:migrate` - move deployment between platforms
- `pnpm ik:analytics` - Google Analytics with Partytown

## not planned

- custom CMS or admin panel
- database or backend
- user accounts
- social automation
- AI writing tools
- complex CI/CD pipeline

the template stays simple. writers don't need infrastructure.
