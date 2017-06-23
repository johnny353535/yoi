---
layout: base
group: elements
title: Link List
permalink: elements/linklist
---

# Link List

<p class="intro">Use this element to create a vertical list of links.</p>

| Styles         | [linkList.less]({{ pathToSourceFile }}assets/less/elements/linkList.less)                                                                                                                                 |
| Base CSS-Class | `.linkList`                                                                                                                                                                                               |
| Modifiers      | `.is--active, .linkList--large, .linkList--dark, .linkList--arrowsLeft, .linkList--arrowsLeftUp, .linkList--arrowsLeftDown, .linkList--arrowsRight, .linkList--arrowsRightUp, .linkList--arrowsRightDown` |

## Basic Example

This is how a basic `.linkList` looks like and how you write the markup:

```html
<!-- example -->
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
```

## Modifiers

### Color

Add this modifier to render a dark `.linkList`:

```html
<!-- example -->
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

### Size

Add the modifiers `.linkList--large` to render a large `.linkList`:

```html
<!-- example -->
<ul class="linkList linkList--large">
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

### Arrows

Add the modifiers `.linkList--arrowsLeft, .linkList--arrowsLeftUp, .linkList--arrowsLeftDown, .linkList--arrowsRight, .linkList--arrowsRightUp, .linkList--arrowsRightDown` to add arrows:

```html
<!-- example:tabs -->
<ul class="linkList linkList--arrowsLeft">
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
<ul class="linkList linkList--arrowsLeftUp m-t-2">
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
<ul class="linkList linkList--arrowsLeftDown m-t-2">
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
<ul class="linkList linkList--arrowsRight m-t-2">
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
<ul class="linkList linkList--arrowsRightUp m-t-2">
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
<ul class="linkList linkList--arrowsRightDown m-t-2">
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

### Active List Item

Add this modifier to a `<li class="linkList__item">` element inside the link list to mark it as _selected_:

```html
<!-- example -->
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

### Combining Modifiers

Most link list modifiers can be combined as you’d expect. For example, it is possible to produce a _large dark link list with arrows pointing to the right_:

```html
<!-- example -->
<ul class="linkList linkList--dark linkList--large linkList--arrowsRight">
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