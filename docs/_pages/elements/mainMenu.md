---
layout: base
group: elements
title: MainMenu
permalink: elements/mainmenu
---

# MainMenu

<p class="intro">Use this element to create a prominent horizontal menu.</p>

| Styles         | [mainMenu.less]({{ pathToSourceFile }}assets/less/elements/mainMenu.less) |
| Script         | [mainMenu.js]({{ pathToSourceFile }}assets/js/elements/mainMenu.js)       |
| Base CSS-Class | `.mainMenu`                                                               |

## Basic Example

This is how a basic `.mainMenu` looks like and how you write the markup:

```html
<!-- example -->
<div class="mainMenu">
    <ul class="mainMenu__menu">
        <li>
            <a href="#">Alkali Metals</a>
        </li>
        <li>
            <a href="#">Alkaline Earth Metals</a>
        </li>
        <li>
            <a href="#">Actinides</a>
        </li>
    </ul>
</div>
```

## Modifiers

### Stretched Menu Items

Add the modifier `.mainMenu--expanded` to force the menu items to take up all available horizontal space:

```html
<!-- example -->
<div class="mainMenu mainMenu--expand">
    <ul class="mainMenu__menu">
        <li>
            <a href="#">Alkali Metals</a>
        </li>
        <li>
            <a href="#">Alkaline Earth Metals</a>
        </li>
        <li>
            <a href="#">Actinides</a>
        </li>
    </ul>
</div>
```

## Submenus

Use the [popOver element](elements/popover.html) to add submenus:

```html
<!-- example:tabs -->
<div class="mainMenu">
    <ul class="mainMenu__menu">
        <li>
            <a href="#" yoi-popover="target:#subMenu-alkaliMetals; pos:bl; toggleClass:mainMenu--active;">Alkali Metals</a>
        </li>
        <li>
            <a href="#" yoi-popover="target:#subMenu-alkaliEarthMetals; pos:bl; toggleClass:mainMenu--active;">Alkaline Earth Metals</a>
        </li>
        <li>
            <a href="#" yoi-popover="target:#subMenu-actinides; pos:bl; toggleClass:mainMenu--active;">Actinides</a>
        </li>
    </ul>
    <div class="popOver" id="subMenu-alkaliMetals">
       <ul class="linkList linkList--large b-0 w-20">
            <li class="linkList__item">
                <a class="linkList__link" href="#">Lithium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Sodium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Potassium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Rubidium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Caesium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Francium</a>
            </li>
        </ul>
    </div>
    <div class="popOver" id="subMenu-alkaliEarthMetals">
       <ul class="linkList linkList--large b-0 w-20">
            <li class="linkList__item">
                <a class="linkList__link" href="#">Beryllium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Magnesium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Calcium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Strontium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Barium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Eadium</a>
            </li>
        </ul>
    </div>
    <div class="popOver" id="subMenu-actinides">
       <ul class="linkList linkList--large b-0 w-20">
            <li class="linkList__item">
                <a class="linkList__link" href="#">Actinium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Thorium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Protactinium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Uranium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Neptunium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Plutonium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Americium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Curium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Berkelium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Californium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Einsteinium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Fermium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Mendelevium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Nobelium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Lawrencium</a>
            </li>
        </ul>
    </div>
</div>
```

### Submenus and Accordions

Add the [accordion element](elements/accordion.html) to create nicely structured, collapsable submenus:

```html
<!-- example:tabs -->
<div class="mainMenu">
    <ul class="mainMenu__menu">
        <li>
            <a href="#" yoi-popover="target:#subMenu-metals; pos:bl; toggleClass:mainMenu--active;">Metals</a>
        </li>
        <li>
            <a href="#">Other Elements</a>
        </li>
    </ul>
    <div class="popOver" id="subMenu-metals">
        <div class="accordion b-0" yoi-accordion="linked:true;">
            <div class="accordion__section is--open">
                <div class="accordion__header">
                    <h4>Alkali Metals</h4>
                </div>
                <div class="accordion__body">
                   <ul class="linkList linkList--large b-0 w-20">
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Lithium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Sodium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Potassium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Rubidium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Caesium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Francium</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="accordion__section">
                <div class="accordion__header">
                    <h4>Alkaline Earth Metals</h4>
                </div>
                <div class="accordion__body">
                   <ul class="linkList linkList--large b-0 w-20">
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Beryllium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Magnesium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Calcium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Strontium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Barium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Eadium</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="accordion__section">
                <div class="accordion__header">
                    <h4>Actinides</h4>
                </div>
                <div class="accordion__body">
                   <ul class="linkList linkList--large b-0 w-20">
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Actinium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Thorium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Protactinium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Uranium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Neptunium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Plutonium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Americium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Curium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Berkelium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Californium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Einsteinium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Fermium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Mendelevium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Nobelium</a>
                        </li>
                        <li class="linkList__item">
                            <a class="linkList__link" href="#">Lawrencium</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
```
