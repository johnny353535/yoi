---
layout: base
group: components
title: Vertical Menu
permalink: components/verticalmenu
status: draft
---

# Vertical Menu

<p class="intro">A simple vertical menu with up to three levels of sub menus and optional pointers on the right or left side.</p>

## Basic Example

This is how a basic `.verticalMenu` looks like and how you write the markup:


```html
<!-- example -->
<ul class="verticalMenu">
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Kontrolllösungen</a>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Lanzetten</a>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Messgeräte &amp; Zubehör</a>
    </li>
</ul>
```

## Sub Menus

A `.verticalMenu` instance may have up to three levels of nested sub verticalMenus. See the folowing example.

<p class="hint hint--primary"><b>Limited Nesting</b> In order to not break the layout, please make sure you only nest up to three levels deep, like in the following example.</p>

```html
<!-- example -->
<ul class="verticalMenu">
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Blutzuckermessung</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Kontrolllösungen</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Lanzetten</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Messgeräte &amp; Zubehör</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Stechhilfen</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Teststreifen</a>
                <ul class="verticalMenu">
                    <li class="verticalMenu__item">
                        <a class="verticalMenu__link" href="#">kleine Teststreifen</a>
                    </li>
                    <li class="verticalMenu__item">
                        <a class="verticalMenu__link" href="#">große Teststreifen</a>
                        <ul class="verticalMenu">
                            <li class="verticalMenu__item">
                                <a class="verticalMenu__link" href="#">grün</a>
                            </li>
                            <li class="verticalMenu__item">
                                <a class="verticalMenu__link" href="#">blau</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Diabetikerbedarf</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Diabetikervitamine</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Fußpflege</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Hautpflege</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Polyneuropathie</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Süßungsmittel</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Unterzuckerung</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Wundversorgung</a>
            </li>
        </ul>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Insulininjektion</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Desinfektion</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Insulinpens</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Insulinspritzen</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Penkanülen</a>
            </li>
        </ul>
    </li>
</ul>
```

## Modifiers

### Active Menu Item

Add the modifier `is--active` to a `<li class="verticalMenu__item">` or `<a class="verticalMenu__link">` element inside the lmenu to mark it as _selected_:


```html
<!-- example -->
<ul class="verticalMenu">
    <li class="verticalMenu__item is--active">
        <a class="verticalMenu__link" href="#">Kontrolllösungen</a>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Lanzetten</a>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Messgeräte &amp; Zubehör</a>
    </li>
</ul>
```
