---
layout: base
group: elements
title: FilterBtns
permalink: elements/filterbtns
---

## FilterBtns
Use this element to display a horizontal list of filters. Each filter should be a link, pointing to a static page with the pre-rendered, filtered content. However, `.filterBtns` are most likely to be used without page reload with the resulting content being loaded via AJAX.

| Styles         | [filterBtns.less]({{ pathToSourceFile }}assets/less/elements/filterBtns.less) |
| Script         | [filterBtns.js]({{ pathToSourceFile }}assets/js/elements/filterBtns.js)       |
| Base CSS-Class | `.filterBtns`                                                                 |
| Modifiers      | `.filterBtns--dark, .filterBtns--removeable`                                  |

### Toggle Buttons
Button filters can be used in *two different ways*. The *default* logic is a list of individual buttons the user can *toggle between active or inactive state*:

```html
<!-- example -->
<ul class="filterBtns" yoi-filterbtns>
    <li class="filterBtns__btn">
        <a href="#">Kopfschmerzen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Übelkeit</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Schwindelgefühl</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Muskelschmerzen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Herzrasen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Krämpfe</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Reizhusten</a>
    </li>
</ul>
```

### Removeable Buttons
By adding the modifier `.filterBtns--removeable`, the button filters turn into something like a **list of removeable tags**:

```html
<!-- example -->
<ul class="filterBtns filterBtns--removeable" yoi-filterbtns>
    <li class="filterBtns__btn">
        <a href="#">Kopfschmerzen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Übelkeit</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Schwindelgefühl</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Muskelschmerzen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Herzrasen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Krämpfe</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Reizhusten</a>
    </li>
</ul>
```

### Modifiers
In addition to `.filterBtns--removeable`, a **dark styling** is available via `.filterBtns--dark`:

```html
<!-- example -->
<ul class="filterBtns filterBtns--dark" yoi-filterbtns>
    <li class="filterBtns__btn">
        <a href="#">Kopfschmerzen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Übelkeit</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Schwindelgefühl</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Muskelschmerzen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Herzrasen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Krämpfe</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Reizhusten</a>
    </li>
</ul>
<ul class="filterBtns filterBtns--dark filterBtns--removeable" yoi-filterbtns>
    <li class="filterBtns__btn">
        <a href="#">Kopfschmerzen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Übelkeit</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Schwindelgefühl</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Muskelschmerzen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Herzrasen</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Krämpfe</a>
    </li>
    <li class="filterBtns__btn">
        <a href="#">Reizhusten</a>
    </li>
</ul>
```