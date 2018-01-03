---
layout: base
group: components
title: FilterBtns
permalink: components/filterbtns
---

# FilterBtns

<div class="m-t-4 m--pos-tr m--m-4 m--m-t-10">
    <span class="badge badge--negative">incomplete</span>
</div>

<p class="intro">Buttons with different visual states for simple filter tasks.</p>

## Toggleable Filter Buttons

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

## Removeable Filter Buttons

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

## Modifiers

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