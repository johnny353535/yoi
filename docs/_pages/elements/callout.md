---
layout: base
title: Callout
permalink: elements/callout
---

## Callout
Use this element to render a small portion of text into a prominent circular callout. Superimpose it upon images or banners, for example to make a special offer visually stand out.

| Less-File      | [callout.less]({{ pathToSourceFile }}assets/less/elements/callout.less)                                                                                  |
| Base CSS-Class | `.callout`                                                                                                                                               |
| Modifiers      | `.callout--large, .callout--rot-l, .callout--rot-r, .callout--dark, .callout--attention, .callout--positive, .callout--negative, .callout--prescription` |

### Basic Example
The default `.callout` has dark text on a plain white background. In order to reliably center the text inside – both horizontally and vertically – make sure you wrap the text inside with the `.callout__body` element.

```html
<p class="callout">
    <span class="callout__body">Absolutes Super-Sonderangebot!</span>
</p>
```

### Modifiers
You have a lot of modifiers available to slightly rotate the `.callout` or to render it in different colors.

```html
<p class="callout callout--rot-l">
    <span class="callout__body">Absolutes Super-Sonderangebot!</span>
</p>
<p class="callout callout--rot-r">
    <span class="callout__body">Absolutes Super-Sonderangebot!</span>
</p>
<p class="callout callout--dark">
    <span class="callout__body">Absolutes Super-Sonderangebot!</span>
</p>
<p class="callout callout--attention">
    <span class="callout__body">Absolutes Super-Sonderangebot!</span>
</p>
<p class="callout callout--positive">
    <span class="callout__body">Absolutes Super-Sonderangebot!</span>
</p>
<p class="callout callout--negative">
    <span class="callout__body">Absolutes Super-Sonderangebot!</span>
</p>
<p class="callout callout--prescription">
    <span class="callout__body">Absolutes Super-Sonderangebot!</span>
</p>
```

### Shadows
If you wish, you can use the <a href="pages/css-core/utilities.html">shadow utility classes</a> in combination with this element.

```html
<p class="callout sh-1 m-b-4">
    <span class="callout__body">Absolutes Super-Sonderangebot!</span>
</p>
<p class="callout sh-2 m-b-4">
    <span class="callout__body">Absolutes Super-Sonderangebot!</span>
</p>
<p class="callout sh-3 m-b-4">
    <span class="callout__body">Absolutes Super-Sonderangebot!</span>
</p>
```