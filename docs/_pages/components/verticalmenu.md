---
layout: base
group: components
title: Verticalmenu
permalink: components/verticalmenu
---

# VerticalMenu

<div class="m-t-4 m--pos-tr m--m-t-10">
    <span class="badge badge--medium badge--rounded badge--negative">doc incomplete</span>
</div>

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
<!-- example:tabs -->
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

### Pointers

Add optional pointers to the currently selected (`.is--active`) element. Chose from pointers to the left (`.verticalMenu--pointLeft`) and pointers to the right (`.verticalMenu--pointRight`).

```html
<!-- example:tabs -->
<ul class="verticalMenu verticalMenu--pointLeft">
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Blutzuckermessung</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Kontrolllösungen</a>
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
        </ul>
    </li>
</ul>
```

## Advanced Usage

The following example combines the `.verticalMenu` with the [toggleGroup component](/components/toggleGroup.html) to create a simple, *tab-able* widget.

```html
<!-- example:tabs -->
<div class="box flx">
    <div class="w-1-3">
        <ul class="verticalMenu verticalMenu--pointRight br-0 b-0 b-r">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" yoi-toggle="target:#view-1; group:toggleverticalMenu; activeClassName:is--active;">Lorem</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" yoi-toggle="target:#view-2; group:toggleverticalMenu; activeClassName:is--active;">Ipsum</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" yoi-toggle="target:#view-3; group:toggleverticalMenu; activeClassName:is--active;">Dolor</a>
            </li>
        </ul>
    </div>
    <div class="w-2-3 p-4">
        <div id="view-1">
            <h2>Lorem</h2>
        </div>
        <div id="view-2">
            <h2>Ipsum</h2>
        </div>
        <div id="view-3">
            <h2>Dolor</h2>
        </div>
    </div>
</div>
```