# Theming Guide

All design decisions live in `token.json`. Change values there, rebuild, done.

## Color scheme

### Picking a scheme

Set `"scheme"` in `token.json` to one of the built-in options:

```json
"scheme": "warm"
```

Options: `warm`, `cool`, `mono`, `forest`

### Creating your own scheme

Add a new entry to the `"color"` object. Each scheme needs `light` and `dark` variants with these six values:

```json
"mytheme": {
  "light": {
    "text": "oklch(0.25 0.01 30)",
    "textMuted": "oklch(0.55 0.01 30)",
    "bg": "oklch(0.97 0.008 30)",
    "link": "oklch(0.25 0.01 30)",
    "border": "oklch(0.92 0.008 30)",
    "codeBg": "oklch(0.94 0.01 30)"
  },
  "dark": {
    "text": "oklch(0.85 0.01 30)",
    "textMuted": "oklch(0.6 0.01 30)",
    "bg": "oklch(0.18 0.01 30)",
    "link": "oklch(0.85 0.01 30)",
    "border": "oklch(0.28 0.01 30)",
    "codeBg": "oklch(0.22 0.01 30)"
  }
}
```

Then set `"scheme": "mytheme"`.

### How OKLCH works

`oklch(L C H)` where:

- **L** (lightness) 0-1. This is what flips between light and dark mode. Light backgrounds use ~0.97, dark backgrounds use ~0.18
- **C** (chroma) 0-0.4. How saturated the color is. Keep this low (0.01-0.03) for muted, readable tones
- **H** (hue) 0-360. The color angle. This is the personality of your scheme

The built-in schemes only differ in hue:
- warm = 70 (amber)
- cool = 260 (blue)
- mono = 0 (neutral gray, zero chroma)
- forest = 145 (green)

To make a new scheme: pick a hue, keep the same lightness and chroma pattern as the built-in schemes, and adjust to taste.

### Tips

- `text` and `link` often share the same value
- Keep `bg` and `codeBg` close in lightness. `codeBg` should be slightly darker in light mode, slightly lighter in dark mode
- `border` sits between `bg` and `text` in lightness
- `textMuted` sits between `text` and `bg` in lightness
- Test both light and dark mode. Toggle your system setting to check

## Font stack

Two built-in font stacks in `token.json`:

```json
"fontFamily": {
  "serif": "\"Iowan Old Style\", \"Palatino Linotype\", Palatino, Georgia, serif",
  "sans": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif"
},
"fontStack": "serif"
```

Set `"fontStack"` to `"serif"` or `"sans"`. You can also add your own stack to the `fontFamily` object and reference it by key.

## Typography scale

Four sizes defined in `token.json`:

```json
"scale": {
  "sm": "0.875rem",
  "md": "1.125rem",
  "lg": "1.5rem",
  "xl": "2rem"
}
```

Where they're used:
- **sm** - dates, metadata
- **md** - h3 headings
- **lg** - body text, h2 headings (set via `"body": "lg"`)
- **xl** - h1 headings

To change the body text size, set `"body"` to any scale key:

```json
"body": "lg"
```

To scale everything up or down, adjust all four values together. Keep the ratios similar.

## Spacing

```json
"spacing": {
  "body": "2rem 1.5rem",
  "maxWidth": "640px",
  "mainTop": "3rem",
  "listGap": "1rem",
  "contentGap": "1rem",
  "headingTopLg": "2rem",
  "headingTopSm": "1.5rem",
  "headingBottom": "0.5rem"
}
```

- `maxWidth` controls the content width. 640px is good for reading
- `body` is the page padding (top/bottom left/right)
- The rest control vertical rhythm between elements

## Syncing with Figma

`token.json` is structured to work with Figma token plugins like Tokens Studio. Export from Figma, replace `token.json`, rebuild. The site picks up all changes automatically.
