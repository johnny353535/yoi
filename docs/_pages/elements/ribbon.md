---
layout: base
group: elements
title: Ribbon
permalink: elements/ribbon
---

# Ribbon

Use this element to display to display a 45° rotated ribbon in the the upper left or right corner of any container element.

| Styles         | [ribbon.less]({{ pathToSourceFile }}assets/less/elements/ribbon.less)                                                   |
| Base CSS-Class | `.ribbon`                                                                                                               |
| Modifiers      | `.ribbon--left .ribbon--right, .ribbon--attention, .ribbon--dark, .ribbon--light, .ribbon--negative, .ribbon--positive` |

## Basic Example

This is how a basic `.ribbon` looks like and how you write the markup:

```html
<!-- example -->
<div class="box w-15 h-15 pos-rel ovrfl-hidden">
    <p class="ribbon">
        <span class="ribbon__label">Deal</span>
    </p>
</div>
```

<p class="hint hint--negative"><b>Overflow</b> To display the <code>.ribbon</code> correctly, alsway set it’s container to <code>overflow: hidden;</code>. You may use the <a href="utilities/layout.html">utility class</a> <code>.ovrfl-hidden</code>.</p>
<p class="hint hint--negative"><b>Positioning</b> Always set the container’s position value to a relative or absolute to provide a reference to position the ribbon.</p>
<p class="hint"><b>Character Limit</b> Ribbons are limited to display a **maximum of approx. 15 characters**.</p>

## Modifiers

There are tho types of modfifiers available. `.ribbon--left` and `.ribbon--right` are mandatory for positioning while the other modifiers are optional and only affect the ribbon’s color.

### Position

Use the modifiers `.ribbon--left` and `.ribbon--right` to pin the ribbon to the left or roght upper corner of it’s container. The default layout is left:

```html
<!-- example -->
<!-- default (= left) -->
<div class="box w-15 h-15 pos-rel ovrfl-hidden m-b-2">
    <p class="ribbon">
        <span class="ribbon__label">Left</span>
    </p>
</div>

<!-- left -->
<div class="box w-15 h-15 pos-rel ovrfl-hidden m-b-2">
    <p class="ribbon ribbon--left">
        <span class="ribbon__label">Left</span>
    </p>
</div>

<!-- right -->
<div class="box w-15 h-15 pos-rel ovrfl-hidden m-b-2">
    <p class="ribbon ribbon--right">
        <span class="ribbon__label">Right</span>
    </p>
</div>
```

### Colors

Use the modifiers `.ribbon--attention`, `.ribbon--dark`, `.ribbon--light`, `.ribbon--negative` and `.ribbon--positive` to render the ribbon in different colors:

```html
<!-- example:tabs -->
<div class="box w-15 h-15 pos-rel ovrfl-hidden m-b-2">
    <p class="ribbon ribbon--left ribbon--attention">
        <span class="ribbon__label">Attention</span>
    </p>
</div>
<div class="box w-15 h-15 pos-rel ovrfl-hidden m-b-2">
    <p class="ribbon ribbon--left ribbon--dark">
        <span class="ribbon__label">Dark</span>
    </p>
</div>
<div class="box w-15 h-15 pos-rel ovrfl-hidden m-b-2">
    <p class="ribbon ribbon--left ribbon--light">
        <span class="ribbon__label">Light</span>
    </p>
</div>
<div class="box w-15 h-15 pos-rel ovrfl-hidden m-b-2">
    <p class="ribbon ribbon--left ribbon--negative">
        <span class="ribbon__label">Negative</span>
    </p>
</div>
<div class="box w-15 h-15 pos-rel ovrfl-hidden m-b-2">
    <p class="ribbon ribbon--left ribbon--positive">
        <span class="ribbon__label">Positive</span>
    </p>
</div>
```