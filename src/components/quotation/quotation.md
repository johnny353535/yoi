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

All [utility classes]({{ site.github.url }}/utilities/) are available to change font sizes, spacing, etc. In the following example, the text-size is increased and the author of the quote is styled differently:

```html
<!-- example -->
<div class="quotation fs-3 lh-5">
    <p>Thus the photons which constitute a ray of light behave like intelligent human beings: out of all possible curves, they always select the one which will take them most quickly to their goal.</p>
    <p class="c-gray-15 al-r">– Max Planck</p>
</div>
```

In the following example, a quote is combined with an image and wrapped inside the element [.box]({{ site.github.url }}/components/box.html):

```html
<!-- example -->
<div class="box">
    <img class="d-blk w-1-1" src="https://source.unsplash.com/K52rtkDFdYc/700x400" alt="" />
    <div class="quotation fs-3 lh-5 br-0 b-0">
        <p>Thus the photons which constitute a ray of light behave like intelligent human beings: out of all possible curves, they always select the one which will take them most quickly to their goal.</p>
        <p class="c-gray-15 al-r">– Max Planck</p>
    </div>
</div>
```
