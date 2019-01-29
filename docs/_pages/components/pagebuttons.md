---
layout: base
group: components
title: PageButtons
permalink: components/pagebuttons
---

# PageButtons

<p class="intro">Previous- & next-buttons with a page indicator.</p>
<p class="hint"><b>Use Cases:</b> <code>.pageButtons</code> are typically used in combination with the <a href="{{ site.github.url }}/components/slider.html">.slider</a> element.</p>

## Basic Example

This is how a basic `.pageButtons` looks like and how you write the markup:

```html
<!-- example -->
<div class="pageButtons">
    <button class="pageButtons__buttonPrev">
        <span class="hidden">Previous</span>
    </button>
    <span class="pageButtons__indicator">
        <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">10</span>
    </span>
    <button class="pageButtons__buttonNext">
        <span class="hidden">Next</span>
    </button>
</div>
```

Note that the element grows with the content of it’s child-element `.pageButtons__indicator`.

```html
<!-- example:tabs -->
<div class="pageButtons">
    <button class="pageButtons__buttonPrev">
        <span class="hidden">Previous</span>
    </button>
    <span class="pageButtons__indicator">
        <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">1000</span>
    </span>
    <button class="pageButtons__buttonNext">
        <span class="hidden">Next</span>
    </button>
</div>

<div class="pageButtons">
    <button class="pageButtons__buttonPrev">
        <span class="hidden">Previous</span>
    </button>
    <span class="pageButtons__indicator">
        <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">100000000</span>
    </span>
    <button class="pageButtons__buttonNext">
        <span class="hidden">Next</span>
    </button>
</div>
```

If you wish, you may leave out the indicator:

```html
<!-- example:tabs -->
<div class="pageButtons">
    <button class="pageButtons__buttonPrev">
        <span class="hidden">Previous</span>
    </button>
    <button class="pageButtons__buttonNext">
        <span class="hidden">Next</span>
    </button>
</div>
```

## Modifiers

### Position

Use one of the modifiers `.pageButtons--tl, .pageButtons--tr, .pageButtons--br, .pageButtons--bl` to *pin* the element to one of the four corners of it’s container. Plase note: the container must be positioned (eg. `position:relative`) to provide a positioning-reference.

```html
<!-- example:tabs -->
<div class="box h-15 m-b-2">
    <div class="pageButtons pageButtons--tl">
        <button class="pageButtons__buttonPrev">
            <span class="hidden">Previous</span>
        </button>
        <span class="pageButtons__indicator">
            <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">10</span>
        </span>
        <button class="pageButtons__buttonNext">
            <span class="hidden">Next</span>
        </button>
    </div>
</div>

<div class="box h-15 m-b-2">
    <div class="pageButtons pageButtons--tr">
        <button class="pageButtons__buttonPrev">
            <span class="hidden">Previous</span>
        </button>
        <span class="pageButtons__indicator">
            <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">10</span>
        </span>
        <button class="pageButtons__buttonNext">
            <span class="hidden">Next</span>
        </button>
    </div>
</div>

<div class="box h-15 m-b-2">
    <div class="pageButtons pageButtons--br">
        <button class="pageButtons__buttonPrev">
            <span class="hidden">Previous</span>
        </button>
        <span class="pageButtons__indicator">
            <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">10</span>
        </span>
        <button class="pageButtons__buttonNext">
            <span class="hidden">Next</span>
        </button>
    </div>
</div>

<div class="box h-15 m-b-2">
    <div class="pageButtons pageButtons--bl">
        <button class="pageButtons__buttonPrev">
            <span class="hidden">Previous</span>
        </button>
        <span class="pageButtons__indicator">
            <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">10</span>
        </span>
        <button class="pageButtons__buttonNext">
            <span class="hidden">Next</span>
        </button>
    </div>
</div>
```

### Disabled

Use the global modifier `.is--disabled` on the child elements `.pageButtons__buttonPrev` or `.pageButtons__buttonNext` to mark them as disabled:

```html
<!-- example -->
<div class="pageButtons">
    <button class="pageButtons__buttonPrev is--disabled">
        <span class="hidden">Previous</span>
    </button>
    <span class="pageButtons__indicator">
        <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">10</span>
    </span>
    <button class="pageButtons__buttonNext is--disabled">
        <span class="hidden">Next</span>
    </button>
</div>
```
