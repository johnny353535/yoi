---
layout: base
group: utilities
title: Opacity
permalink: utilities/opacity
srcfiles:
    - op-base.less
    - op-interactive.less
---

# Opacity

<p class="intro">Adds or overrides opacity.</p>

## Opacity

| `.op-opaque`      | full opacity      |
| `.op-transparent` | fully transparent |
| `.op-9`           | opacity at 90%    |
| `.op-8`           | opacity at 80%    |
| `.op-7`           | opacity at 70%    |
| `.op-6`           | opacity at 60%    |
| `.op-5`           | opacity at 50%    |
| `.op-4`           | opacity at 40%    |
| `.op-3`           | opacity at 30%    |
| `.op-2`           | opacity at 20%    |
| `.op-1`           | opacity at 10%    |

## Interactive Opacity

Add the prefix `hvr--` to each opacity utility to apply the styling on *mouseover*:

```html
<!-- example -->
<div class="box p-5 hvr--op-5">mouseover for example</div>
```