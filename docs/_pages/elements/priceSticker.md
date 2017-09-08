---
layout: base
group: elements
title: PriceSticker
permalink: elements/pricesticker
---

# PriceSticker

<p class="intro">Use this element to display a simple horizontal ruler.</p>

| Styles         | [priceSticker.less]({{ pathToSourceFile }}assets/less/elements/priceSticker.less) |
| Base CSS-Class | `.priceSticker`                                                                   |

## Basic Example

This is how a basic `.priceSticker` looks like and how you write the markup:

```html
<!-- example -->
<div class="priceSticker">
    <p class="priceSticker__content">€ 12,99</p>
</div>
```

## Modifiers

### Rotate Left

Add the modifier `.priceSticker--rotLeft` to rotate it slightly to the left:

```html
<!-- example -->
<div class="priceSticker priceSticker--rotLeft">
    <p class="priceSticker__content">€ 12,99</p>
</div>
```

### Rotate Right

Add the modifier `.priceSticker--rotRight` to rotate it slightly to the right:

```html
<!-- example -->
<div class="priceSticker priceSticker--rotRight">
    <p class="priceSticker__content">€ 12,99</p>
</div>
```