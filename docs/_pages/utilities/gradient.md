---
layout: base
group: utilities
title: Gradient
permalink: utilities/gradient
---

# Gradient

<p class="intro">Adds a gradient from semi-transparent black to transparent.</p>

| `.grd-t` | Gradient from top to bottom |
| `.grd-r` | Gradient from right to left |
| `.grd-b` | Gradient from bottom to top |
| `.grd-l` | Gradient from left to right |

```html
<!-- example:tabs -->
<div class="pos-relative d-inlineblock w-10 h-10 m-4 p-2 grd-t">.grd-t</div>
<div class="pos-relative d-inlineblock w-10 h-10 m-4 p-2 grd-r">.grd-r</div>
<div class="pos-relative d-inlineblock w-10 h-10 m-4 p-2 grd-b">.grd-b</div>
<div class="pos-relative d-inlineblock w-10 h-10 m-4 p-2 grd-l">.grd-l</div>
```

## Use Cases

You can use this utility to improve legibility on text overlays. The following example implements `.grd-b`:

```html
<!-- example -->
<div class="br-all tdr-none m-2 pos-relative grd-b sh-4 ofl-hidden" href="#">
    <img class="d-block" src="https://source.unsplash.com/9Z1KRIfpBTM/900x200" />
    <h3 class="p-3 pos-bl w-1-1 z-2 c-white">A nice picture of a plant</h3>
</div>
```
