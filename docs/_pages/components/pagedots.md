---
layout: base
group: components
title: PageDots
permalink: components/pagedots
status: draft
---

# PageDots

<p class="intro">Previous- & next-buttons with dots as page indicators.</p>
<p class="hint"><b>Use Cases:</b> <code>.pageDots</code> are typically used in combination with the <a href="components/slider.html">.slider</a> element.</p>

## Basic Example

This is how a basic `.pageDots` looks like and how you write the markup:

```html
<!-- example -->
<div class="box bg-gray-22 b-0 p-4">
    <div class="pageDots">
        <a class="pageDots__btnPrev">
            <span class="hidden">Previous</span>
        </a>
        <a class="pageDots__dot is--active">
            <span class="hidden">1</span>
        </a>
        <a class="pageDots__dot">
            <span class="hidden">2</span>
        </a>
        <a class="pageDots__dot">
            <span class="hidden">3</span>
        </a>
        <a class="pageDots__btnNext">
            <span class="hidden">Next</span>
        </a>
    </div>
</div>
```

<p class="hint hint--negative">All examples includes a wrapper element with light or dark gray background for demonstration purpose. The wrapper is not a part of <code>.pageDots</code>.</p>

## Modifiers

### Dark

Add the modifier `.pageDots--dark` to render a dark version:

```html
<!-- example -->
<div class="box bg-gray-22 b-0 p-4">
    <div class="pageDots pageDots--dark">
        <a class="pageDots__btnPrev">
            <span class="hidden">Previous</span>
        </a>
        <a class="pageDots__dot is--active">
            <span class="hidden">1</span>
        </a>
        <a class="pageDots__dot">
            <span class="hidden">2</span>
        </a>
        <a class="pageDots__dot">
            <span class="hidden">3</span>
        </a>
        <a class="pageDots__btnNext">
            <span class="hidden">Next</span>
        </a>
    </div>
</div>
```

### Subtle

The default `.pageDots` background is white. Add the modifier `.pageDots--subtle` to render a tranparent version:

```html
<!-- example -->
<div class="box bg-gray-5 b-0 p-4">
    <div class="pageDots pageDots--subtle">
        <a class="pageDots__btnPrev">
            <span class="hidden">Previous</span>
        </a>
        <a class="pageDots__dot is--active">
            <span class="hidden">1</span>
        </a>
        <a class="pageDots__dot">
            <span class="hidden">2</span>
        </a>
        <a class="pageDots__dot">
            <span class="hidden">3</span>
        </a>
        <a class="pageDots__btnNext">
            <span class="hidden">Next</span>
        </a>
    </div>
</div>
```

### Disabled

Use the global modifier `.is--disabled` on the child elements `.pageDots__btnPrev` or `.pageDots__btnNext` to mark them as disabled:

```html
<!-- example -->
<div class="box bg-gray-22 b-0 p-4">
    <div class="pageDots">
        <a class="pageDots__btnPrev is--disabled">
            <span class="hidden">Previous</span>
        </a>
        <a class="pageDots__dot is--active">
            <span class="hidden">1</span>
        </a>
        <a class="pageDots__dot">
            <span class="hidden">2</span>
        </a>
        <a class="pageDots__dot">
            <span class="hidden">3</span>
        </a>
        <a class="pageDots__btnNext">
            <span class="hidden">Next</span>
        </a>
    </div>
</div>
```
