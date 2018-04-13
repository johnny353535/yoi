---
layout: base
group: components
title: FlipBtns
permalink: components/flipbtns
---

# FlipBtns

<p class="intro">Previous- & next-buttons on the left and right side of their container.</p>
<p class="hint hint--primary"><b>Use Cases:</b> <code>.flipBtns</code> are typically used in combination with the <a href="{{ site.github.url }}/components/slider.html">.slider</a> element.</p>

## Basic Example

This is how a basic `.flipBtns` looks like and how you write the markup:

```html
<!-- example -->
<div class="box h-15 m-lr-5">
    <div class="flipBtns">
        <a class="flipBtns__btnPrev">
            <span class="hidden">Previous</span>
        </a>
        <a class="flipBtns__btnNext">
            <span class="hidden">Next</span>
        </a>
    </div>
</div>
```

## Modifiers

### Position

Use the modifier `.flipBtns--inset` to place the buttons on the inside of their container:

```html
<!-- example -->
<div class="box h-15">
    <div class="flipBtns flipBtns--inset">
        <a class="flipBtns__btnPrev">
            <span class="hidden">Previous</span>
        </a>
        <a class="flipBtns__btnNext">
            <span class="hidden">Next</span>
        </a>
    </div>
</div>
```

### Disabled

Use the global modifier `.is--disabled` on the child elements `.flipBtns__btnPrev` or `.flipBtns__btnNext` to mark them as disabled:

```html
<!-- example -->
<div class="box h-15 m-lr-5">
    <div class="flipBtns">
        <a class="flipBtns__btnPrev is--disabled">
            <span class="hidden">Previous</span>
        </a>
        <a class="flipBtns__btnNext">
            <span class="hidden">Next</span>
        </a>
    </div>
</div>
```
