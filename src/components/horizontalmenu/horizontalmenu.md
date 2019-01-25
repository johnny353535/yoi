---
layout: base
group: components
title: HorizontalMenu
permalink: components/horizontalmenu
---

# HorizontalMenu

<p class="intro">A simple horizontal menu.</p>

## Basic Example

This is how a basic `.horizontalMenu` looks like and how you write the markup:

```html
<!-- example -->
<ul class="horizontalMenu">
    <li class="horizontalMenu__item">
        <a class="horizontalMenu__link" href="#">Alkalis</a>
    </li>
    <li class="horizontalMenu__item">
        <a class="horizontalMenu__link" href="#">Actinides</a>
    </li>
</ul>
```

## Modifiers

### Active Menu Item

Mark the active menu item by adding the modifier `.is--active`:

```html
<!-- example -->
<ul class="horizontalMenu">
    <li class="horizontalMenu__item is--active">
        <a class="horizontalMenu__link" href="#">Alkalis</a>
    </li>
    <li class="horizontalMenu__item">
        <a class="horizontalMenu__link" href="#">Actinides</a>
    </li>
</ul>
```

### Stretched Menu Items

Add the modifier `.horizontalMenu--grow` to force the menu items to take up all available horizontal space:

```html
<!-- example -->
<ul class="horizontalMenu horizontalMenu--grow">
    <li class="horizontalMenu__item">
        <a class="horizontalMenu__link" href="#">Alkalis</a>
    </li>
    <li class="horizontalMenu__item">
        <a class="horizontalMenu__link" href="#">Actinides</a>
    </li>
</ul>
```

## Submenus

Use the [popOver component]({{ site.github.url }}/components/popover.html) to add submenus:

```html
<!-- example:tabs -->

<ul class="horizontalMenu">
    <li class="horizontalMenu__item" yoi-popover="target:#subMenu-alkaliMetals; pos:bl; toggleClass:is--active;">
        <a class="horizontalMenu__link" href="#">Alkalis</a>
    </li>
    <li class="horizontalMenu__item" yoi-popover="target:#subMenu-actinides; pos:bl; toggleClass:is--active;">
        <a class="horizontalMenu__link" href="#">Actinides</a>
    </li>
</ul>
<div class="popOver" id="subMenu-alkaliMetals">
    <ul class="verticalMenu">
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Lithium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Sodium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Potassium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Rubidium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Caesium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Francium</a>
        </li>
    </ul>
</div>
<div class="popOver" id="subMenu-actinides">
    <ul class="verticalMenu b-0">
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Actinium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Thorium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Protactinium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Uranium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Neptunium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Plutonium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Americium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Curium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Berkelium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Californium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Einsteinium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Fermium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Mendelevium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Nobelium</a>
        </li>
        <li class="verticalMenu__item fw-normal">
            <a class="verticalMenu__link" href="#">Lawrencium</a>
        </li>
    </ul>
</div>
```

Use the [accordion component]({{ site.github.url }}/components/accordion.html) to create collapsable submenus:

```html
<!-- example:tabs -->
<ul class="horizontalMenu">
    <li class="horizontalMenu__item" yoi-popover="target:#subMenu-metals; pos:bl; toggleClass:is--active;">
        <a class="horizontalMenu__link" href="#">Metals</a>
    </li>
    <li class="horizontalMenu__item">
        <a class="horizontalMenu__link" href="#">Other</a>
    </li>
</ul>
<div class="popOver" id="subMenu-metals">
    <div class="accordion b-0" yoi-accordion="linked:true;">
        <div class="accordion__section is--open">
            <div class="accordion__header">
                <h4>Alkali Metals</h4>
            </div>
            <div class="accordion__body p-0">
                <ul class="verticalMenu b-0">
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Lithium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Sodium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Potassium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Rubidium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Caesium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Francium</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="accordion__section">
            <div class="accordion__header">
                <h4>Alkaline Earth Metals</h4>
            </div>
            <div class="accordion__body p-0">
                <ul class="verticalMenu b-0">
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Beryllium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Magnesium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Calcium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Strontium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Barium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Eadium</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="accordion__section">
            <div class="accordion__header">
                <h4>Actinides</h4>
            </div>
            <div class="accordion__body p-0">
                <ul class="verticalMenu b-0">
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Actinium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Thorium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Protactinium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Uranium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Neptunium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Plutonium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Americium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Curium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Berkelium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Californium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Einsteinium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Fermium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Mendelevium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Nobelium</a>
                    </li>
                    <li class="verticalMenu__item fw-normal">
                        <a class="verticalMenu__link" href="#">Lawrencium</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
```
