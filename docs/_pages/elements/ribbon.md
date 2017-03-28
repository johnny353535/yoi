---
layout: base
group: elements
title: Ribbon
permalink: elements/ribbon
---

## Ribbon
Use this element to display to display a 45° rotated ribbon in the the upper left or right corner of any container element. Since it is a very prominent element, use it wisely. It’s best suited to display a »Special Offer« badge.

| Less-File      | [ribbon.less]({{ pathToSourceFile }}assets/less/elements/ribbon.less)                     |
| Base CSS-Class | `.ribbon`                                                                                 |
| Modifiers      | `.ribbon--attention, .ribbon--dark, .ribbon--light, .ribbon--negative, .ribbon--positive` |

### Basic Example
Ribbons are limited to display a **maximum of approx. 15 characters**. This limitation is due to poor browser support of CSS level 3 calc() functions. However, make sure your text stays within the limitation.

```html
<div class="box w-15 h-15 pos-rel">
    <p class="ribbon ribbon--left">
        <span class="ribbon__label">Deal</span>
    </p>
</div>

<div class="box w-25 h-25 pos-rel">
    <p class="ribbon ribbon--left">
        <span class="ribbon__label">Last Chance</span>
    </p>
</div>

<div class="box w-30 h-15 pos-rel">
    <p class="ribbon ribbon--left">
        <span class="ribbon__label">Special Offer</span>
    </p>
</div>
```

<p class="hint"><b>Positioning</b> Always set the container’s position value to a relative or absolute to provide a reference to position the ribbon.</p>

### Modifiers
There are tho types of modfifiers available. `.ribbon--left` and `.ribbon--right` are mandatory for positioning while the other modifiers are optional and only affect the ribbon’s color.

```html
<div class="box w-15 h-15 pos-rel">
    <p class="ribbon ribbon--left">
        <span class="ribbon__label">Left</span>
    </p>
</div>

<div class="box w-15 h-15 pos-rel">
    <p class="ribbon ribbon--right">
        <span class="ribbon__label">Right</span>
    </p>
</div>

<div class="box w-15 h-15 pos-rel">
    <p class="ribbon ribbon--left ribbon--attention">
        <span class="ribbon__label">Attention</span>
    </p>
</div>

<div class="box w-15 h-15 pos-rel">
    <p class="ribbon ribbon--left ribbon--dark">
        <span class="ribbon__label">Dark</span>
    </p>
</div>

<div class="box w-15 h-15 pos-rel">
    <p class="ribbon ribbon--left ribbon--light">
        <span class="ribbon__label">Light</span>
    </p>
</div>

<div class="box w-15 h-15 pos-rel">
    <p class="ribbon ribbon--left ribbon--negative">
        <span class="ribbon__label">Negative</span>
    </p>
</div>

<div class="box w-15 h-15 pos-rel">
    <p class="ribbon ribbon--left ribbon--positive">
        <span class="ribbon__label">Positive</span>
    </p>
</div>
```