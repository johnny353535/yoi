---
layout: base
group: components
title: Hint
permalink: components/hint
---

# Hint

<p class="intro">Use this component to create emphasized paragraphs in four available different stylings.</p>

## Basic Example

This is how a basic `.hint` looks like and how you write the markup:

```html
<!-- example -->
<p class="hint">This is a hint.</p>
```

## Modifiers

### Colors

Use the modifiers `.hint--positive, .hint--negative, .hint--attention` to change the colors. These colors are so-called [semantic colors](list-of-semantic-colors). Instead of merely being decorative, they actually add meaning:

```html
<!-- example -->
<p class="hint m-b-2">This is a neutral hint.</p>
<p class="hint hint--positive m-b-2">This is a <i>positive</i> hint.</p>
<p class="hint hint--negative m-b-2">This is a <i>negative</i> or <i>emergency</i> hint.</p>
<p class="hint hint--attention m-b-2">This is an <i>important</i> hint.</p>
```

### Utilities

All [utility classes](/utilities/) are available to change font sizes, spacing, etc.:

```html
<!-- example -->
<p class="hint fs-2">This is a hint with <i>larger text size</i>.</p>
<p class="hint fs-2 m-4">This is a hint with larger text size and <i>additional margins</i>.</p>

```