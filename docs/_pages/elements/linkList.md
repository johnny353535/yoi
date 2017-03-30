---
layout: base
group: elements
title: Link List
permalink: elements/linklist
---

## Link List
Use this element to create a vertical menu-like list of links. Modifiers add options for different sizes and arrows.

| Less-File      | [linkList.less]({{ pathToSourceFile }}assets/less/elements/linkList.less)                                                                                                                                 |
| Base CSS-Class | `.linkList`                                                                                                                                                                                               |
| Modifiers      | `.is--active, .linkList--large, .linkList--dark, .linkList--arrowsLeft, .linkList--arrowsLeftUp, .linkList--arrowsLeftDown, .linkList--arrowsRight, .linkList--arrowsRightUp, .linkList--arrowsRightDown` |

### Basic Example
It’s recommended to **use an unordered list** with the class name `linkList` to create a link list.

```html
<div class="documentation__block">
    <div class="documentation__example" yoi-printcode="language:markup; print:true;">
        <ul class="linkList">
            <li class="linkList__item">
                <a class="linkList__link" href="#">Oxygen</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Potassium</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Krypton</a>
            </li>
            <li class="linkList__item">
                <a class="linkList__link" href="#">Molybdenum</a>
            </li>
        </ul>
    </div>
</div>
```

### Modifiers
Use the available modifiers to change some link list styles.

#### .linkList--dark
Add this modifier to render a dark link list.

```html
<ul class="linkList linkList--dark">
    <li class="linkList__item">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>
```

#### .is--active
Add this modifier to a `<li class="linkList__item">` element inside the link list to mark it as _selected_.

```html
<ul class="linkList">
    <li class="linkList__item">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item is--active">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>
```

#### Combining Modifiers
Most link list modifiers can be combined. For example it’s possible to produce a large dark link list with arrows pointing to the right. That’s `linkList--dark + linkList--large + linkList--arrowsRight`:

```html
<ul class="linkList linkList--dark linkList--large linkList--arrowsRight">
    <li class="linkList__item">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item is--active">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>
```

#### More Examples

```html
<ul class="linkList">
    <li class="linkList__item linkList__item--active">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>

<ul class="linkList linkList--arrowsRight">
    <li class="linkList__item linkList__item--active">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>

<ul class="linkList linkList--arrowsRightDown">
    <li class="linkList__item linkList__item--active">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>

<ul class="linkList linkList--arrowsRightUp">
    <li class="linkList__item linkList__item--active">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>

<ul class="linkList linkList--arrowsLeft">
    <li class="linkList__item linkList__item--active">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>

<ul class="linkList linkList--arrowsLeftDown">
    <li class="linkList__item linkList__item--active">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>

<ul class="linkList linkList--arrowsLeftUp">
    <li class="linkList__item linkList__item--active">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>

<ul class="linkList linkList--large">
    <li class="linkList__item linkList__item--active">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>

<ul class="linkList linkList--large linkList--arrowsRight">
    <li class="linkList__item linkList__item--active">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>

<ul class="linkList linkList--large linkList--arrowsRightDown">
    <li class="linkList__item linkList__item--active">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>

<ul class="linkList linkList--large linkList--arrowsRightUp">
    <li class="linkList__item linkList__item--active">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>

<ul class="linkList linkList--large linkList--arrowsLeft">
    <li class="linkList__item linkList__item--active">
        <a class="linkList__link" href="#">Oxygen</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Potassium</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Krypton</a>
    </li>
    <li class="linkList__item">
        <a class="linkList__link" href="#">Molybdenum</a>
    </li>
</ul>
```