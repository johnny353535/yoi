---
layout: base
group: behaviors
title: Parallax
permalink: behaviors/parallax
srcfiles:
    - parallax.js
    - ../modules/scrollagent.js
---

# Parallax

<p class="intro">Adds a parallax scrolling effect to an element.</p>

## Basic Example

Add the attribute `yoi-parallax` to an element:

```html
<!-- example -->
<img src="https://source.unsplash.com/wVjd0eWNqI8/240x300" yoi-parallax />
```

## Parameters

| `factor` | Affects the parallax scrolling speed. Use any positive or negative number. The default factor is `8`.                |
| `not`    | `string` or a comma-seperated list of strings - the breakpoints/screen-sizes on which parallax behavior is disabled |

### Factor

The parameter `factor` accepts any positive or negative number. You must write floating numbers with period instead of comma (eg. *1.5*).

<p class="hint hint--primary">Positive numbers let the element scroll with the current scroll direction. Negative numbers let the element scroll against the current scroll direction.</p>
<p class="hint hint--primary">The higher the factor, the more subtle the resulting parallax effect.</p>

```html
<!-- example -->
<div class="h-10">
    <div class="bg-base-22 h-10 op-5 br-all w-1-2 fl-l" yoi-parallax="factor:10;"></div>
    <div class="bg-base-22 h-10 op-5 br-all w-1-2 fl-l" yoi-parallax="factor:-10;"></div>
</div>
```

### Not

Use the parameter `not` to define one or more breakpoints on which you wish to disable the parallax behavior:

```html
<!-- example -->
<div class="bg-base-22 h-10 op-5 br-all" yoi-parallax="center:fade-in; not:small,medium;"></div>
```

## Parallax Background Image

Wrap a parallax element (eg. an image) inside a container element with hidden overflow to create the popular parallax background image effect.

<p class="hint hint--negative">Make sure the container element is set to a fixed hight which is smaller than the parallax element’s hight.</p>

```html
<!-- example -->
<div class="box ofl-hidden" style="height:450px">
    <img src="https://source.unsplash.com/WLUHO9A_xik/700x700" yoi-parallax="factor:4;" />
</div>
```
