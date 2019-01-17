---
layout: base
group: components
title: Hint
permalink: components/hint
---

# Hint

<p class="intro">Emphasized paragraph in four semantic stylings.</p>

## Basic Example

This is how a basic `.hint` looks like and how you write the markup:

```html
<!-- example -->
<p class="hint">This is a hint.</p>
```

## Modifiers

### Colors

Use the modifiers `.hint--primary, .hint--positive, .hint--negative, .hint--attention` to change the colors:

```html
<!-- example -->
<p class="hint m-b-2">This is a neutral hint.</p>
<p class="hint hint--primary m-b-2">This is a hint in <i>primary</i> color.</p>
<p class="hint hint--positive m-b-2">This is a <i>positive</i> hint.</p>
<p class="hint hint--negative m-b-2">This is a <i>negative</i> or <i>emergency</i> hint.</p>
<p class="hint hint--attention m-b-2">This is an <i>important</i> hint.</p>
```

### Utilities

All [utility classes]({{ site.github.url }}/utilities/) are available to change font sizes, spacing, etc.:

```html
<!-- example -->
<p class="hint fs-3">This is a hint with <i>larger text size</i>.</p>
<p class="hint fs-3 m-4">This is a hint with larger text size and <i>additional margins</i>.</p>

```
