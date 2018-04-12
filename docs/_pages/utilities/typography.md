---
layout: base
group: utilities
title: Typography
permalink: utilities/typography
srcfiles:
    - typography-base.less
    - typography-interactive.less
    - typography-responsive.less
---

# Typography

<p class="intro">Adds or overrides typographic styling, eg. font size, line height, font weight, …</p>

## Headings

Use heading utilities to apply the styling of [headings]({{ site.github.url }}/components/headings.html) to other text elements.

| `.h1` | `.h2` | `.h3` | `.h4` | `.h5` | `.h6` |

```html
<!-- example -->
<p class="h1 m-b-4">Heading Level 1</p>
<p class="h2 m-b-4">Heading Level 2</p>
<p class="h3 m-b-4">Heading Level 3</p>
<p class="h4 m-b-4">Heading Level 4</p>
<p class="h5 m-b-4">Heading Level 5</p>
<p class="h6">Heading Level 6</p>
```

<p class="hint"><b>Is this bad practice?</b> Heading-tags like <code>&lt;h1&gt;, &lt;h2&gt;, &hellip;</code> have semantic meaning in context to the document. Sometimes you might need another element to visually resemble a heading. Sometimes you need to make a <code>&lt;h3&gt;</code> look like an <code>&lt;h1&gt;</code>. Use the heading utilities for edge case like this. If you really need a headline, always use the proper HTML tag!</p>

## Font Size

You can chose from eleven font size steps where `.fs-0` is zero and `.fs-10` is the largest font size (learn more about [configuring and customizing Yoi]({{ site.github.url }}/start/customizing.html#configuring-and-customizing)).

| `.fs-0` |`.fs-1` | `.fs-2` | `.fs-3` | `.fs-4` | `.fs-5` | `.fs-6` | `.fs-7` | `.fs-8` | `.fs-9` | `.fs-10` |

```html
<!-- example -->
<p class="fs-1 m-b-2">Abc</p>
<p class="fs-2 m-b-2">Abc</p>
<p class="fs-3 m-b-2">Abc</p>
<p class="fs-4 m-b-2">Abc</p>
<p class="fs-5 m-b-2">Abc</p>
<p class="fs-6 m-b-2">Abc</p>
<p class="fs-7 m-b-2">Abc</p>
<p class="fs-8 m-b-2">Abc</p>
<p class="fs-9 m-b-2">Abc</p>
<p class="fs-10 m-b-2">Abc</p>
```

 An addition, `.fs-s` is available for small type and `.fs-xl` and `.fs-xxl` are available for very large type.

```html
<!-- example -->
<p class="fs-s m-b-2">Abc</p>
<p class="fs-xl m-b-2">Abc</p>
<p class="fs-xxl">Abc</p>
````

<p class="hint hint--negative">The utility <code>.fs-0</code> sets the font size to zero.</p>

### Responsive Font Size

| `.only-s--fs-[0–10/s,xl,xxl]` | font size `[0–10/s,xl,xxl]` only at breakpoint `s`       |
| `.m--fs-[0–10/s,xl,xxl]`      | font size `[0–10/s,xl,xxl]` at breakpoint `m` and larger |
| `.only-m--fs-[0–10/s,xl,xxl]` | font size `[0–10/s,xl,xxl]` only at breakpoint `m`       |
| `.l--fs-[0–10/s,xl,xxl]`      | font size `[0–10/s,xl,xxl]` at breakpoint `l` and larger |
| `.only-l--fs-[0–10/s,xl,xxl]` | font size `[0–10/s,xl,xxl]` only at breakpoint `l`       |
| `.xl--fs-[0–10/s,xl,xxl]`     | font size `[0–10/s,xl,xxl]` at breakpoint `xl`           |

<p class="hint hint--negative">The utility <code>.lh-0</code> sets the line height to zero.</p>

## Line Height

You can chose from eleven line heights where `.lh-0` is zero and `.lh-10` is the largest line height (learn more about [configuring and customizing Yoi]({{ site.github.url }}/start/customizing.html#configuring-and-customizing)).

| `.lh-0` |`.lh-1` | `.lh-2` | `.lh-3` | `.lh-4` | `.lh-5` | `.lh-6` | `.lh-7` | `.lh-8` | `.lh-9` | `.lh-10` |

### Responsive Line Height

| `.only-s--lh-[0–10]` | line height `[0–10]` only at breakpoint `s`       |
| `.m--lh-[0–10]`      | line height `[0–10]` at breakpoint `m` and larger |
| `.only-m--lh-[0–10]` | line height `[0–10]` only at breakpoint `m`       |
| `.l--lh-[0–10]`      | line height `[0–10]` at breakpoint `l` and larger |
| `.only-l--lh-[0–10]` | line height `[0–10]` only at breakpoint `l`       |
| `.xl--lh-[0–10]`     | line height `[0–10]` at breakpoint `xl`           |

## Letter Spacing

| `.ls-0` | `.ls-1` | `.ls-2` | `.ls-3` | `.ls-4` |

```html
<!-- example -->
<p class="ls-0">Zero letter spacing</p>
<p class="ls-1">letter spacing factor 1</p>
<p class="ls-2">letter spacing factor 2</p>
<p class="ls-3">letter spacing factor 3</p>
<p class="ls-4">letter spacing factor 4</p>
```

### Responsive Letter Spacing

| `.only-s--ls-[0–4]` | letter spacing `[0–4]` only at breakpoint `s`       |
| `.m--ls-[0–4]`      | letter spacing `[0–4]` at breakpoint `m` and larger |
| `.only-m--ls-[0–4]` | letter spacing `[0–4]` only at breakpoint `m`       |
| `.l--ls-[0–4]`      | letter spacing `[0–4]` at breakpoint `l` and larger |
| `.only-l--ls-[0–4]` | letter spacing `[0–4]` only at breakpoint `l`       |
| `.xl--ls-[0–4]`     | letter spacing `[0–4]` at breakpoint `xl`           |

## Font Family

| `.ff-mono`  | monospace  |
| `.ff-sans`  | sans serif |
| `.ff-serif` | serif      |

```html
<!-- example -->
<p class="ff-mono m-b-2">monospace font</p>
<p class="ff-sans m-b-2">sans-serif font</p>
<p class="ff-serif">serif font</p>
```

## Font Weight

| `.fw-normal` | normal font weight |
| `.fw-bold`   | bold font          |

```html
<!-- example -->
<p class="fw-normal m-b-2">normal</p>
<p class="fw-bold">bold</p>
```

## Font Style

| `.fst-normal` | normal font style |
| `.fst-italic` | italic font style |

```html
<!-- example -->
<p class="fst-normal m-b-2">normal</p>
<p class="fst-italic">italic</p>
```

## Text Transform

| `.tt-capitalize` | capitalized characters |
| `.tt-lowercase`  | lowercase characters   |
| `.tt-none`       | no text transform      |
| `.tt-uppercase`  | uppercase characters   |

```html
<!-- example -->
<p class="tt-capitalize m-b-2">capitalized characters</p>
<p class="tt-lowercase m-b-2">lowercase characters</p>
<p class="tt-none m-b-2">no text transform</p>
<p class="tt-uppercase">uppercase characters</p>
```

## Text Alignment

| `.al-c` | centered text      |
| `.al-l` | left-aligned text  |
| `.al-r` | right-aligned text |

```html
<!-- example -->
<p class="al-c m-b-2">centered text</p>
<p class="al-l m-b-2">left-aligned text</p>
<p class="al-r">right-aligned text</p>
```

### Responsive Text Alignment

| `.only-s--al-[c, l, r]` | text aling `[c, l, r]` only at breakpoint `s`       |
| `.m--al-[c, l, r]`      | text aling `[c, l, r]` at breakpoint `m` and larger |
| `.only-m--al-[c, l, r]` | text aling `[c, l, r]` only at breakpoint `m`       |
| `.l--al-[c, l, r]`      | text aling `[c, l, r]` at breakpoint `l` and larger |
| `.only-l--al-[c, l, r]` | text aling `[c, l, r]` only at breakpoint `l`       |
| `.xl--al-[c, l, r]`     | text aling `[c, l, r]` at breakpoint `xl`           |

## Line Break

Use this utility to control weather a block of text breaks at the end of it’s container.

| `.lbr-none` | no line breaks |

### Responsive Line Break

| `.only-s--lbr-none` | no line breaks only at breakpoint `s`       |
| `.m--lbr-none`      | no line breaks at breakpoint `m` and larger |
| `.only-m--lbr-none` | no line breaks only at breakpoint `m`       |
| `.l--lbr-none`      | no line breaks at breakpoint `l` and larger |
| `.only-l--lbr-none` | no line breaks only at breakpoint `l`       |
| `.xl--lbr-none`     | no line breaks at breakpoint `xl`           |

<p class="hint hint--primary"><b>Finetune your line breaks</b> – you can set individual line breaks (<code>&#x3C;br /&#x3E;</code>) and make them respond to the currently active breakpoint by adding a <a href="utilities/layout.html#responsive-display">responsive display-utility</a> (eg. <code>.m--d-none</code>). Check out the example below:</p>

```html
<!-- example -->
<p>This line will<br class="m--d-none" /> break after the third word when mediaquery/breakpoint »small« is active.</p>
```

## Text Decoration

| `.tdr-none`      | no text decoration |
| `.tdr-underline` | underlined text    |

```html
<!-- example -->
<p class="tdr-none m-b-2">no text decoration</p>
<p class="tdr-underline">underlined text</p>
```

### Interactive Text Decoration

| `hvr--none` | no text decoration on *mouseover* |
| `hvr--none` | underlined text on *mouseover*    |

```html
<!-- example -->
<p class="hvr--tdr-none m-b-2">no text decoration on <i>mouseover</i></p>
<p class="hvr--tdr-underline">underlined text on <i>mouseover</i></p>
```

## List Style

| `.lst-none`   | no bullets     |
| `.lst-square` | square bullets |
| `.lst-circle` | circle bullets |
| `.lst-disc`   | disc bullets   |

```html
<!-- example -->
<ul class="lst-none m-b-4 m-l-4">
    <li>Technetium</li>
    <li>Promethium</li>
    <li>Polonium</li>
</ul>
<ul class="lst-square m-b-4 m-l-4">
    <li>Technetium</li>
    <li>Promethium</li>
    <li>Polonium</li>
</ul>
<ul class="lst-circle m-b-4 m-l-4">
    <li>Technetium</li>
    <li>Promethium</li>
    <li>Polonium</li>
</ul>
<ul class="lst-disc m-l-4">
    <li>Technetium</li>
    <li>Promethium</li>
    <li>Polonium</li>
</ul>
```
