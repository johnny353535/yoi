---
layout: base
group: components
title: FlipButtons
permalink: components/flipbuttons
---

# FlipButtons

<p class="intro">Previous- & next-buttons on the left and right side of their container.</p>
<p class="hint hint--primary"><b>Use Cases:</b> <code>.flipButtons</code> are typically used in combination with the <a href="{{ site.github.url }}/components/slider.html">.slider</a> element.</p>

## Basic Example

This is how a basic `.flipButtons` looks like and how you write the markup:

```html
<!-- example -->
<div class="box h-15 m-lr-5">
    <div class="flipButtons">
        <a class="flipButtons__buttonPrev">
            <span class="hidden">Previous</span>
        </a>
        <a class="flipButtons__buttonNext">
            <span class="hidden">Next</span>
        </a>
    </div>
</div>
```

## Modifiers

### Position

Use the modifier `.flipButtons--inset` to place the buttons on the inside of their container:

```html
<!-- example -->
<div class="box h-15">
    <div class="flipButtons flipButtons--inset">
        <a class="flipButtons__buttonPrev">
            <span class="hidden">Previous</span>
        </a>
        <a class="flipButtons__buttonNext">
            <span class="hidden">Next</span>
        </a>
    </div>
</div>
```

### Disabled

Use the global modifier `.is--disabled` on the child elements `.flipButtons__buttonPrev` or `.flipButtons__buttonNext` to mark them as disabled:

```html
<!-- example -->
<div class="box h-15 m-lr-5">
    <div class="flipButtons">
        <a class="flipButtons__buttonPrev is--disabled">
            <span class="hidden">Previous</span>
        </a>
        <a class="flipButtons__buttonNext">
            <span class="hidden">Next</span>
        </a>
    </div>
</div>
```
