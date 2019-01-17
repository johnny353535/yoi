---
layout: base
group: components
title: FilterButtons
permalink: components/filterbuttons
---

# FilterButtons

<p class="intro">Buttons with different visual states for simple filter tasks.</p>

## Toggleable Filter Buttons

Button filters can be used in *two different ways*. The *default* logic is a list of individual buttons the user can *toggle between active or inactive state*:

```html
<!-- example -->
<ul class="filterButtons" yoi-filterbuttons>
    <li class="filterButtons__button">
        <a href="#">Hydrogen</a>
    </li>
    <li class="filterButtons__button">
        <a href="#">Helium</a>
    </li>
    <li class="filterButtons__button">
        <a href="#">Lithium</a>
    </li>
    <li class="filterButtons__button">
        <a href="#">Beryllium</a>
    </li>
    <li class="filterButtons__button">
        <a href="#">Boron</a>
    </li>
    <li class="filterButtons__button">
        <a href="#">Carbon</a>
    </li>
    <li class="filterButtons__button">
        <a href="#">Nitrogen</a>
    </li>
</ul>
```

## Removeable Filter Buttons

By adding the modifier `.filterButtons--removeable`, the button filters turn into something like a list of removeable tags:

```html
<!-- example -->
<ul class="filterButtons filterButtons--removeable" yoi-filterbuttons>
    <li class="filterButtons__button">
        <a href="#">Oxygen</a>
    </li>
    <li class="filterButtons__button">
        <a href="#">Fluorine</a>
    </li>
    <li class="filterButtons__button">
        <a href="#">Neon</a>
    </li>
    <li class="filterButtons__button">
        <a href="#">Sodium</a>
    </li>
    <li class="filterButtons__button">
        <a href="#">Magnesium</a>
    </li>
    <li class="filterButtons__button">
        <a href="#">Aluminum</a>
    </li>
    <li class="filterButtons__button">
        <a href="#">Silicon</a>
    </li>
</ul>
```
