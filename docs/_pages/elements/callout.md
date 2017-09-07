---
layout: base
group: elements
title: Callout
permalink: elements/callout
---

# Callout

<p class="intro">Use this element to emphasize a small portion of text. Superimpose it upon images or banners to make bits of information visually stand out.</p>

| Styles         | [callout.less]({{ pathToSourceFile }}assets/less/elements/callout.less)                                                                           |
| Base CSS-Class | `.callout`                                                                                                                                        |
| Modifiers      | `.callout--large, .callout--rot-l, .callout--rot-r, .callout--dark, .callout--light, .callout--attention, .callout--positive, .callout--negative` |

## Basic Example

The default `.callout` has dark text on light background. This is how it looks and how you write the markup:

```html
<!-- example -->
<p class="callout">
    <span class="callout__body">Super Special Offer!</span>
</p>
```

## Modifiers

Use the `.callout`’s modifier classes to add rotation or to render it in different colors.

### Rotation

Use the modifier class `.callout--rot-l` to rotate to the left, use `.callout--rot-r` to rotate to the right:

```html
<!-- example:tabs -->
<div class="d-inlblk m-r-2">
    <p class="callout callout--rot-l">
        <span class="callout__body">Super Special Offer!</span>
    </p>
</div>
<div class="d-inlblk">
    <p class="callout callout--rot-r">
        <span class="callout__body">Super Special Offer!</span>
    </p>
</div>
```

### Color

Use the color modifier classes `.callout--dark`, `.callout--light`, `.callout--attention`, `.callout--positive` and `.callout--negative` to render `.callout` in different colors:

```html
<!-- example:tabs -->
<div class="d-inlblk m-r-2 m-b-2">
    <p class="callout callout--dark">
        <span class="callout__body">Super Special Offer!</span>
    </p>
</div>
<div class="d-inlblk m-r-2 m-b-2">
    <p class="callout callout--light">
        <span class="callout__body">Super Special Offer!</span>
    </p>
</div>
<div class="d-inlblk m-r-2 m-b-2">
    <p class="callout callout--attention">
        <span class="callout__body">Super Special Offer!</span>
    </p>
</div>
<div class="d-inlblk m-r-2 m-b-2">
    <p class="callout callout--positive">
        <span class="callout__body">Super Special Offer!</span>
    </p>
</div>
<div class="d-inlblk m-r-2 m-b-2">
    <p class="callout callout--negative">
        <span class="callout__body">Super Special Offer!</span>
    </p>
</div>
```

## Custom Styling With Utility Classes

### Shadows

You can use the [shadow utility classes](utilities/styling.html#shadows) in combination with `.callout`:

```html
<!-- example:tabs -->
<div class="d-inlblk m-r-2">
    <p class="callout">
        <span class="callout__body">Super Special Offer!</span>
    </p>
</div>
<div class="d-inlblk m-r-2">
    <p class="callout sh-1">
        <span class="callout__body">Super Special Offer!</span>
    </p>
</div>
<div class="d-inlblk m-r-2">
    <p class="callout sh-2">
        <span class="callout__body">Super Special Offer!</span>
    </p>
</div>
<div class="d-inlblk m-r-2">
    <p class="callout sh-3">
        <span class="callout__body">Super Special Offer!</span>
    </p>
</div>
```

### Size and Custom Colors

Combine [utility classes](utilities/) with `.callout` to create custom stylings:

```html
<!-- example:tabs -->
<div class="d-inlblk m-r-2">
    <p class="callout callout--rot-l bg-blue-23 tc-blue-10 w-15 h-15">
        <span class="callout__body fs-3 lh-4">Large & Blue</span>
    </p>
</div>
<div class="d-inlblk m-r-2">
    <p class="callout callout--rot-r bg-red-15 tc-red-23 w-20 h-20">
        <span class="callout__body fs-4 lh-6">Large & Red</span>
    </p>
</div>
```