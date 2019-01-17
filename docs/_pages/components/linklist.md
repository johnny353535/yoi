---
layout: base
group: components
title: Link List
permalink: components/linklist
status: draft
---

# Link List

<p class="intro">A vertical list of links.</p>

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
