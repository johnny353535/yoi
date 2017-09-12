---
layout: base
group: components
title: PageBtns
permalink: components/pagebtns
---

# PageBtns

<p class="intro">Use this component to display previous- & next-buttons with a page indicator.</p>

| Styles         | [pageBtns.less]({{ pathToSourceFile }}assets/less/components/flipBtns.less) |
| Base CSS-Class | `.pageBtns`                                                               |
| Modifiers      | `.pageBtns--tl, .pageBtns--tr, .pageBtns--br, .pageBtns--bl`              |

<p class="hint"><b>Use Cases:</b> <code>.pageBtns</code> are typically used in combination with the <a href="components/slider.html">.slider</a> element.</p>

## Basic Example

This is how a basic `.pageBtns` looks like and how you write the markup:

```html
<!-- example -->
<div class="pageBtns">
    <button class="pageBtns__btnPrev">
        <span class="hidden">Previous</span>
    </button>
    <span class="pageBtns__indicator">
        <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">10</span>
    </span>
    <button class="pageBtns__btnNext">
        <span class="hidden">Next</span>
    </button>
</div>
```

Note that the element grows with the content of it’s child-element `.pageBtns__indicator`. 

```html
<!-- example:tabs -->
<div class="pageBtns">
    <button class="pageBtns__btnPrev">
        <span class="hidden">Previous</span>
    </button>
    <span class="pageBtns__indicator">
        <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">1000</span>
    </span>
    <button class="pageBtns__btnNext">
        <span class="hidden">Next</span>
    </button>
</div>

<div class="pageBtns">
    <button class="pageBtns__btnPrev">
        <span class="hidden">Previous</span>
    </button>
    <span class="pageBtns__indicator">
        <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">100000000</span>
    </span>
    <button class="pageBtns__btnNext">
        <span class="hidden">Next</span>
    </button>
</div>
```

If you wish, you may leave out the indicator:

```html
<!-- example:tabs -->
<div class="pageBtns">
    <button class="pageBtns__btnPrev">
        <span class="hidden">Previous</span>
    </button>
    <button class="pageBtns__btnNext">
        <span class="hidden">Next</span>
    </button>
</div>
```

## Modifiers

### Position

Use one of the modifiers `.pageBtns--tl, .pageBtns--tr, .pageBtns--br, .pageBtns--bl` to *pin* the element to one of the four corners of it’s container. Plase note: the container must be positioned (eg. `position:relative`) to provide a positioning-reference.

```html
<!-- example:tabs -->
<div class="box h-15 m-b-2">
    <div class="pageBtns pageBtns--tl">
        <button class="pageBtns__btnPrev">
            <span class="hidden">Previous</span>
        </button>
        <span class="pageBtns__indicator">
            <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">10</span>
        </span>
        <button class="pageBtns__btnNext">
            <span class="hidden">Next</span>
        </button>
    </div>
</div>

<div class="box h-15 m-b-2">
    <div class="pageBtns pageBtns--tr">
        <button class="pageBtns__btnPrev">
            <span class="hidden">Previous</span>
        </button>
        <span class="pageBtns__indicator">
            <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">10</span>
        </span>
        <button class="pageBtns__btnNext">
            <span class="hidden">Next</span>
        </button>
    </div>
</div>

<div class="box h-15 m-b-2">
    <div class="pageBtns pageBtns--br">
        <button class="pageBtns__btnPrev">
            <span class="hidden">Previous</span>
        </button>
        <span class="pageBtns__indicator">
            <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">10</span>
        </span>
        <button class="pageBtns__btnNext">
            <span class="hidden">Next</span>
        </button>
    </div>
</div>

<div class="box h-15 m-b-2">
    <div class="pageBtns pageBtns--bl">
        <button class="pageBtns__btnPrev">
            <span class="hidden">Previous</span>
        </button>
        <span class="pageBtns__indicator">
            <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">10</span>
        </span>
        <button class="pageBtns__btnNext">
            <span class="hidden">Next</span>
        </button>
    </div>
</div>
```

### Disabled

Use the global modifier `.is--disabled` on the child elements `.pageBtns__btnPrev` or `.pageBtns__btnNext` to mark them as disabled:

```html
<!-- example -->
<div class="pageBtns">
    <button class="pageBtns__btnPrev is--disabled">
        <span class="hidden">Previous</span>
    </button>
    <span class="pageBtns__indicator">
        <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">10</span>
    </span>
    <button class="pageBtns__btnNext is--disabled">
        <span class="hidden">Next</span>
    </button>
</div>
```