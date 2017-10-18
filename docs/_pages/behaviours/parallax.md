---
layout: base
group: behaviours
title: Parallax
permalink: behaviours/parallax
---

# Parallax

<p class="intro">Adds a parallax scrolling effect to any element on the page.</p>

## Parameters

| `factor` | Affects the parallax scrolling speed. Can be any positive or negative number. Default is 8. |

## Basic Example

Add the custom atribute `yoi-parallax` to any element to enable the parallax scrolling effect with it’s default factor:

```html
<!-- example -->
<img src="https://source.unsplash.com/wVjd0eWNqI8/270x300" yoi-parallax />
```

### Factor

The factor can be any number. Posive numbers let the element scroll with the current scroll direction, negative numbers let the element scroll against the current scroll direction.

```html
<!-- example -->
<div class="h-10">
    <div class="bg-primary-25 h-10 opacity-5 br w-1-2 fl-l" yoi-parallax="factor:10;"></div>
    <div class="bg-primary-25 h-10 opacity-5 br w-1-2 fl-l" yoi-parallax="factor:-10;"></div>
</div>
```

<p class="hint hint--primary">The higher the factor, the more subtle is the parallax effect. Think of the factor as a throttle power.</p>

### Hidden Overflow

You can wrap a parallax element (eg. an image) inside a container element with hidden overflow to create the popular parallax background image effect. Make sue the container element is set to a fixed hight which is smaller than the parallax element’s hight:

```html
<!-- example -->
<div class="box ovrfl-hidden h-40">
    <img src="https://source.unsplash.com/WLUHO9A_xik/700x700" yoi-parallax="factor:4;" />
</div>
```