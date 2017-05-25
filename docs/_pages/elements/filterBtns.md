---
layout: base
group: elements
title: FilterBtns
permalink: elements/filterbtns
---

## FilterBtns
Use this element to display a horizontal list of filter buttons.

| Styles         | [filterBtns.less]({{ pathToSourceFile }}assets/less/elements/filterBtns.less) |
| Script         | [filterBtns.js]({{ pathToSourceFile }}assets/js/elements/filterBtns.js)       |
| Base CSS-Class | `.filterBtns`                                                                 |
| Modifiers      | `.filterBtns--dark, .filterBtns--removeable`                                  |

### Usage

Ideally, each filter button should be a link, pointing to a static page with the pre-rendered, filtered content. However, `.filterBtns` are most likely to be used without page reload with the resulting content being loaded via JavaScript.

### Toggleable Filter Buttons
Button filters can be used in *two different ways*. The *default* logic is a list of individual buttons the user can *toggle between active or inactive state*:

```html
<!-- example -->
<ul class="filterBtns" yoi-filterbtns>
    <li class="filterBtns__btn">
        <a href="#">Hydrogen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Helium</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Lithium</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Beryllium</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Boron</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Carbon</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Nitrogen</a>
    </li>
</ul>
```

### Removeable Filter Buttons
By adding the modifier `.filterBtns--removeable`, the button filters turn into something like a list of removeable tags:

```html
<!-- example -->
<ul class="filterBtns filterBtns--removeable" yoi-filterbtns>
    <li class="filterBtns__btn">
        <a href="#">Oxygen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Fluorine</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Neon</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Sodium</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Magnesium</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Aluminum</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Silicon</a>
    </li>
</ul>
```

### Modifiers
In addition to `.filterBtns--removeable`, a dark styling is available via `.filterBtns--dark`:

```html
<!-- example:tabs -->
<div class="m-b-4">
    <ul class="filterBtns filterBtns--dark" yoi-filterbtns>
        <li class="filterBtns__btn">
            <a href="#">Hydrogen</a>
        </li>
        <li class="filterBtns__btn">
            <a href="#">Helium</a>
        </li>
        <li class="filterBtns__btn">
            <a href="#">Lithium</a>
        </li>
        <li class="filterBtns__btn">
            <a href="#">Beryllium</a>
        </li>
        <li class="filterBtns__btn">
            <a href="#">Boron</a>
        </li>
        <li class="filterBtns__btn">
            <a href="#">Carbon</a>
        </li>
        <li class="filterBtns__btn">
            <a href="#">Nitrogen</a>
        </li>
    </ul>
</div>
<div>
    <ul class="filterBtns filterBtns--dark filterBtns--removeable" yoi-filterbtns>
        <li class="filterBtns__btn">
            <a href="#">Oxygen</a>
        </li>
        <li class="filterBtns__btn">
            <a href="#">Fluorine</a>
        </li>
        <li class="filterBtns__btn">
            <a href="#">Neon</a>
        </li>
        <li class="filterBtns__btn">
            <a href="#">Sodium</a>
        </li>
        <li class="filterBtns__btn">
            <a href="#">Magnesium</a>
        </li>
        <li class="filterBtns__btn">
            <a href="#">Aluminum</a>
        </li>
        <li class="filterBtns__btn">
            <a href="#">Silicon</a>
        </li>
    </ul>
</div>
```