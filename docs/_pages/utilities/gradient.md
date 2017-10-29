---
layout: base
group: utilities
title: Gradient
permalink: utilities/gradient
---

# Gradient

<p class="intro">Adds a gradient from semi-transparent black to transparent.</p>

| `.gradient-t` | Gradient from top to bottom |
| `.gradient-r` | Gradient from right to left |
| `.gradient-b` | Gradient from bottom to top |
| `.gradient-l` | Gradient from left to right |

```html
<!-- example:tabs -->
<div class="pos-relative d-inlineblock w-10 h-10 m-4 p-2 gradient-t">.gradient-t</div>
<div class="pos-relative d-inlineblock w-10 h-10 m-4 p-2 gradient-r">.gradient-r</div>
<div class="pos-relative d-inlineblock w-10 h-10 m-4 p-2 gradient-b">.gradient-b</div>
<div class="pos-relative d-inlineblock w-10 h-10 m-4 p-2 gradient-l">.gradient-l</div>
```

## Use Cases

You can use this utility to improve legibility on text overlays. The following example implements `.gradient-b`:

```html
<!-- example -->
<div class="br-all w-20 tdcr-none m-2 pos-relative gradient-b sh-4 ovrfl-hidden" href="#">
    <img class="d-block" src="https://source.unsplash.com/J1PYZQ07y0o/200x200" />
    <h3 class="p-3 pos-bl w-1-1 z-2 c-white">A Bridge, Fog and Water</h3>
</div>
```
