---
title: markdown for writers
date: 2026-02-07
description: a plain text format that gets out of your way. everything you need to know in five minutes.
tags: [writing, inkwell]
---

markdown is how you write for the web without touching HTML. it is plain text with a few simple rules. you already know most of them.

## the basics

### headings

use `#` symbols. more symbols, smaller heading:

```
## Section heading
### Subsection
#### Small heading
```

### emphasis

wrap text in asterisks:

- `*italic*` becomes *italic*
- `**bold**` becomes **bold**
- `***bold italic***` becomes ***bold italic***

### links

```
[link text](https://example.com)
```

becomes: [link text](https://example.com)

### images

```
![Alt text describing the image](/images/photo.jpg)
```

always write meaningful alt text. it helps screen readers and shows when images fail to load.

## lists

### unordered

```
- First item
- Second item
- Third item
```

- first item
- second item
- third item

### ordered

```
1. First step
2. Second step
3. Third step
```

1. first step
2. second step
3. third step

## blockquotes

use `>` at the start of a line:

```
> This is a quote.
```

> this is a quote.

add attribution with `<cite>`:

```
> The only way to do great work is to love what you do.
>
> <cite>Steve Jobs</cite>
```

> the only way to do great work is to love what you do.
>
> <cite>Steve Jobs</cite>

## code

inline code uses backticks: `like this`.

code blocks use triple backticks:

````
```
function hello() {
  return "world";
}
```
````

## tables

```
| Left | Center | Right |
|---|:---:|---:|
| A | B | C |
| D | E | F |
```

| left | center | right |
|---|:---:|---:|
| A | B | C |
| D | E | F |

## horizontal rules

three dashes on their own line:

```
---
```

---

## images with captions

for images with captions, use HTML `<figure>`:

```html
<figure>
  <img src="/images/photo.jpg" alt="Description" />
  <figcaption>Photo by <a href="https://unsplash.com/@author" target="_blank" rel="noopener noreferrer">Author</a> on <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a></figcaption>
</figure>
```

---

## why markdown?

- **portable.** plain text works everywhere, forever
- **fast.** no menus, no formatting toolbars, no mouse clicks
- **focused.** you think about words, not styling
- **version controlled.** git tracks every change

you are reading a page written in markdown right now. append `.md` to this URL to see the source.
