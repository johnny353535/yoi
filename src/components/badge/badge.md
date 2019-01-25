---
layout: base
group: components
title: Badge
permalink: components/badge
---

# Badge

<p class="intro">Displays small bits of data, eg. one-word labels, counters, etc.</p>

## Modifiers

### Size

Use the modifiers `.badge--small` and `.badge--large` to create badges with different sizes:

```html
<!-- example -->
<span class="badge badge--small">21</span>
<span class="badge">22</span>
<span class="badge badge--large">23</span>
```

### Style

Use the modifier `.badge--rounded` to render pill-shaped badges:

```html
<!-- example -->
<span class="badge badge--small badge--rounded">21</span>
<span class="badge badge--rounded">22</span>
<span class="badge badge--large badge--rounded">23</span>
```

### Colors

All global [color modifiers]({{ site.github.url }}/utilities/color.html) are available for badges.

```html
<!-- example -->
<p class="m-b-1">
    <span class="badge badge--light badge--small badge--rounded">21</span>
    <span class="badge badge--light badge--rounded">22</span>
    <span class="badge badge--light badge--large badge--rounded">23</span>
</p>
<p class="m-b-1">
    <span class="badge badge--small badge--rounded">21</span>
    <span class="badge badge--rounded">22</span>
    <span class="badge badge--large badge--rounded">23</span>
</p>
<p class="m-b-1">
    <span class="badge badge--dark badge--small badge--rounded">21</span>
    <span class="badge badge--dark badge--rounded">22</span>
    <span class="badge badge--dark badge--large badge--rounded">23</span>
</p>
<p class="m-b-1">
    <span class="badge badge--attention badge--small badge--rounded">21</span>
    <span class="badge badge--attention badge--rounded">22</span>
    <span class="badge badge--attention badge--large badge--rounded">23</span>
</p>
<p class="m-b-1">
    <span class="badge badge--negative badge--small badge--rounded">21</span>
    <span class="badge badge--negative badge--rounded">22</span>
    <span class="badge badge--negative badge--large badge--rounded">23</span>
</p>
<p class="m-b-1">
    <span class="badge badge--positive badge--small badge--rounded">21</span>
    <span class="badge badge--positive badge--rounded">22</span>
    <span class="badge badge--positive badge--large badge--rounded">23</span>
</p>
```

### Badge Groups

Visually group badges by wrapping them inside a container with the class `.badges`:

```html
<!-- example -->
<div class="badges">
    <span class="badge badge--large">1</span>
    <span class="badge badge--large badge--negative">2</span>
    <span class="badge badge--large badge--attention">3</span>
</div>
<div class="badges m-t-2">
    <span class="badge badge--large badge--rounded">1</span>
    <span class="badge badge--large badge--rounded badge--negative">2</span>
    <span class="badge badge--large badge--rounded badge--attention">3</span>
</div>
```
