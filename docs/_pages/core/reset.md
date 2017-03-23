---
layout: base
title: Reset
permalink: core/reset
---

## Reset & Normalize

We _normalize_ and _reset_ default browser stylings to provide consistent styling across different browsers and devices.

|                |                                                                                               |
| -              | -                                                                                             |
| Less-File      | [normalize.css](https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.css) via CDN |
| Less-File      | [reset.less]({{ pathToSourceFile }}assets/less/core/reset.less)                               |

### Normalize

We use _normalize.css_. From the project’s [official website](https://necolas.github.io/normalize.css/):

> _Normalize.css makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing._

[Learn more about normalize.css](https://necolas.github.io/normalize.css/).

### Reset

Additionally, we use a very small reset stylesheet – mostly to set margin and padding to zero for all block-level elements.