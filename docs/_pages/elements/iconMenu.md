---
layout: base
group: elements
title: IconMenu
permalink: elements/iconmenu
---

# IconMenu

<p class="intro">Use this element to create a large vertical menu with large icons.</p>

| Styles         | [iconMenu.less]({{ pathToSourceFile }}assets/less/elements/iconMenu.less) |
| Script         | [iconMenu.js]({{ pathToSourceFile }}assets/js/elements/iconMenu.js)       |
| Base CSS-Class | `.iconMenu`                                                               |

## Basic Example

This is how a basic `.iconMenu` looks like and how you write the markup:

```html
<!-- example -->
<ul class="iconMenu">
    <li class="iconMenu__item">
        <a class="iconMenu__link" href="#">
            <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-016" />
            <span>Documents</span>
        </a>
    </li>
    <li class="iconMenu__item is--active">
        <a class="iconMenu__link" href="#">
            <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-029" />
            <span>Savings</span>
        </a>
    </li>
    <li class="iconMenu__item">
        <a class="iconMenu__link" href="#">
            <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-034" />
            <span>Orders & Shipping</span>
        </a>
    </li>
    <li class="iconMenu__item">
        <a class="iconMenu__link" href="#">
            <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-038" />
            <span>Messages</span>
        </a>
    </li>
</ul>
```