---
layout: base
group: utilities
title: Shadow
permalink: utilities/shadow
srcfiles:
    - shadow-base.less
    - shadow-interactive.less
---

# Shadow

<p class="intro">Adds or overrides box- and text-shadows.</p>

## Box Shadow

| `.sh-0` | no box-shadow        |
| `.sh-1` | element on z-level 1 |
| `.sh-2` | element on z-level 2 |
| `.sh-3` | element on z-level 3 |
| `.sh-4` | element on z-level 4 |

```html
<!-- example:tabs -->
<div class="w-10 h-10 m-2 p-2 d-inlineblock sh-0">.sh-0</div>
<div class="w-10 h-10 m-2 p-2 d-inlineblock sh-1">.sh-1</div>
<div class="w-10 h-10 m-2 p-2 d-inlineblock sh-2">.sh-2</div>
<div class="w-10 h-10 m-2 p-2 d-inlineblock sh-3">.sh-3</div>
<div class="w-10 h-10 m-2 p-2 d-inlineblock sh-4">.sh-4</div>
```

### Interactive Box Shadow

Add the prefix `hvr:` to each box-shadow utility to apply the styling on *mouseover*:

```html
<!-- example -->
<div class="box p-5 hvr:sh-4">mouseover for example</div>
```

## Text Shadow

| `.tsh-0` | no text-shadow    |
| `.tsh-1` | text on z-level 1 |
| `.tsh-2` | text on z-level 2 |
| `.tsh-3` | text on z-level 3 |
| `.tsh-4` | text on z-level 4 |

```html
<!-- example:tabs -->
<span class="m-4 tsh-0">.tsh-0</span>
<span class="m-4 tsh-1">.tsh-1</span>
<span class="m-4 tsh-2">.tsh-2</span>
<span class="m-4 tsh-3">.tsh-3</span>
<span class="m-4 tsh-4">.tsh-4</span>
```
