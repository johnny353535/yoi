---
layout: base
group: components
title: Quotation
permalink: components/quotation
---

# Quotation

<p class="intro">Styled block quotes.</p>

## Basic Example

This is how a basic `.quotation` looks like and how you write the markup:

```html
<!-- example -->
<div class="quotation">
    <p>Thus the photons which constitute a ray of light behave like intelligent human beings: out of all possible curves, they always select the one which will take them most quickly to their goal.</p>
    <p>– Max Planck</p>
</div>
```

## Modifiers

### Utilities

All [utility classes](/utilities/) are available to change font sizes, spacing, etc. In the following example, the text-size is increased and the author of the quote is styled differently:

```html
<!-- example -->
<div class="quotation fs-3">
    <p>Thus the photons which constitute a ray of light behave like intelligent human beings: out of all possible curves, they always select the one which will take them most quickly to their goal.</p>
    <p class="c-gray-15 al-r">– Max Planck</p>
</div>
```

In the following example, a quote is combined with an image and wrapped inside the element [.box](/components/box.html):

```html
<!-- example -->
<div class="box">
    <img class="d-blk w-1-1" src="https://source.unsplash.com/dV9ZfzLxaQ4/700x400" alt="" />
    <div class="quotation fs-3 br-0 b-0">
        <p>Thus the photons which constitute a ray of light behave like intelligent human beings: out of all possible curves, they always select the one which will take them most quickly to their goal.</p>
        <p class="c-gray-15 al-r">– Max Planck</p>
    </div>
</div>
```