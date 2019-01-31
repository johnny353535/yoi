---
layout: base
group: components
title: Vertical Menu
permalink: components/verticalmenu
status: complete
---

# Vertical Menu

<p class="intro">A simple vertical menu with up to who levels of submenus.</p>

## Basic Example

This is how a basic `.verticalMenu` looks like and how you write the markup:


```html
<!-- example -->
<ul class="verticalMenu">
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Metalloids</a>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Alkali Metals</a>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Other Metals</a>
    </li>
</ul>
```

## Submenus

A `.verticalMenu` instance may have up to two levels of submenus:


```html
<!-- example -->
<ul class="verticalMenu">
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Metalloids</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Boron</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Silicon</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Germanium</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Arsenic</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Antimony</a>
                <ul class="verticalMenu">
                    <li class="verticalMenu__item">
                        <a class="verticalMenu__link" href="#">Classification</a>
                    </li>
                    <li class="verticalMenu__item">
                        <a class="verticalMenu__link" href="#">Information</a>
                        <ul class="verticalMenu">
                            <li class="verticalMenu__item">
                                <a class="verticalMenu__link" href="#">Properties</a>
                            </li>
                            <li class="verticalMenu__item">
                                <a class="verticalMenu__link" href="#">Appearance</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Alkali Metals</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Lithium</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Sodium</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Potassium</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Rubidium</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Cesium</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Francium</a>
            </li>

        </ul>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Other Metals</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Aluminium</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Gallium</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Indium</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Tin</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Thallium</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Lead</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Bismuth</a>
            </li>
        </ul>
    </li>
</ul>
```

<p class="hint hint--primary"><b>Limited Nesting</b> In order to not break the layout, please make sure you only nest up to three levels deep, like in the following example.</p>

## Modifiers

### Active Menu Item

Add the modifier `is--active` to mark an active menu item:

```html
<!-- example -->
<ul class="verticalMenu">
    <li class="verticalMenu__item is--active">
        <a class="verticalMenu__link" href="#">Metalloids</a>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Alkali Metals</a>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Other Metals</a>
    </li>
</ul>
```
