---
title: markdown for writers
date: 2026-02-07
description: A plain text format that gets out of your way. Everything you need to know in five minutes.
---

Markdown is how you write for the web without touching HTML. It is plain text with a few simple rules. You already know most of them.

## The basics

### Headings

Use `#` symbols. More symbols, smaller heading:

```
## Section heading
### Subsection
#### Small heading
```

### Emphasis

Wrap text in asterisks:

- `*italic*` becomes *italic*
- `**bold**` becomes **bold**
- `***bold italic***` becomes ***bold italic***

### Links

```
[link text](https://example.com)
```

Becomes: [link text](https://example.com)

### Images

```
![Alt text describing the image](/images/photo.jpg)
```

Always write meaningful alt text. It helps screen readers and shows when images fail to load.

## Lists

### Unordered

```
- First item
- Second item
- Third item
```

- First item
- Second item
- Third item

### Ordered

```
1. First step
2. Second step
3. Third step
```

1. First step
2. Second step
3. Third step

## Blockquotes

Use `>` at the start of a line:

```
> This is a quote.
```

> This is a quote.

Add attribution with `<cite>`:

```
> The only way to do great work is to love what you do.
>
> <cite>Steve Jobs</cite>
```

> The only way to do great work is to love what you do.
>
> <cite>Steve Jobs</cite>

## Code

Inline code uses backticks: `like this`.

Code blocks use triple backticks:

````
```
function hello() {
  return "world";
}
```
````

## Tables

```
| Left | Center | Right |
|---|:---:|---:|
| A | B | C |
| D | E | F |
```

| Left | Center | Right |
|---|:---:|---:|
| A | B | C |
| D | E | F |

## Horizontal rules

Three dashes on their own line:

```
---
```

---

## Images with captions

For images with captions, use HTML `<figure>`:

```html
<figure>
  <img src="/images/photo.jpg" alt="Description" />
  <figcaption>Photo by <a href="https://unsplash.com/@author" target="_blank" rel="noopener noreferrer">Author</a> on <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a></figcaption>
</figure>
```

---

## Why Markdown?

- **Portable.** Plain text works everywhere, forever
- **Fast.** No menus, no formatting toolbars, no mouse clicks
- **Focused.** You think about words, not styling
- **Version controlled.** Git tracks every change

You are reading a page written in Markdown right now. Append `.md` to this URL to see the source.
