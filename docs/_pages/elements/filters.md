---
layout: base
group: elements
title: Filters
permalink: elements/filters
---

## Filters

| Styles         | [filters.less]({{ pathToSourceFile }}assets/less/elements/filters.less) |
| Script         | [filters.js]({{ pathToSourceFile }}assets/js/elements/filters.js)       |
| Base CSS-Class | `.filters`                                                              |
| Modifiers      | `.filters--disabled`                                                    |

### Basic Example

```html
<div class="w-40">
    <div class="filters" yoi-filters yoi-searchdisplay="{{ searchDisplay }}">
        <div class="filters__header">Filtern nach …</div>
        <div class="filterGroup">
            <div class="filterGroup__header">
                <h4>Preis</h4>
            </div>
            <div class="filterGroup__body">
                <div class="filter filter__range">
                    <div class="rangeInput m-tb-4" yoi-rangeinput="min:1; max:100; absMin:1; absMax:100;">
                        <div class="js-fallback">
                            <label for="min">Mindestpreis</label>
                            <input type="text" value="10" name="min" />
                            <label for="max">Höchstpreis</label>
                            <input type="text" value="500" name="max" />
                            <input class="btn" type="submit" value="Anwenden" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="filterGroup filterGroup--collapsed">
            <div class="filterGroup__header">
                <h4>Optionen</h4>
            </div>
            <div class="filterGroup__body">
                <a class="filter filter--single" href="#">
                    Nur Einzelpackungen
                    <span class="filter__counter">2</span>
                </a>
                <a class="filter filter--single" href="#">
                    Nur Kombipackungen
                    <span class="filter__counter">11</span>
                </a>
            </div>
        </div>
        <div class="filterGroup filterGroup--collapsed">
            <div class="filterGroup__header">
                <h4>Darreichungsform</h4>
            </div>
            <div class="filterGroup__body">
                <a class="filter filter--multi" href="#">
                    Augen- und Nasensalbe
                    <span class="filter__counter">2</span>
                </a>
                <a class="filter filter--multi" href="#">
                    Brausetabletten
                    <span class="filter__counter">11</span>
                </a>
                <a class="filter filter--multi" href="#">
                    Granulat
                    <span class="filter__counter">33</span>
                </a>
                <a class="filter filter--multi" href="#">
                    Granulat zur Herstellung einer Suspension zum Einnehmen
                    <span class="filter__counter">888</span>
                </a>
                <a class="filter filter--multi" href="#">
                    Kautabletten
                    <span class="filter__counter">22</span>
                </a>
                <a class="filter filter--multi" href="#">
                    Pulver zur Herstellung einer Infusionslösung
                    <span class="filter__counter">22</span>
                </a>
                <a class="filter filter--multi" href="#">
                    Tabletten
                    <span class="filter__counter">22</span>
                </a>
                <a class="filter filter--multi" href="#">
                    Tabletten magensaftresistent
                    <span class="filter__counter">22</span>
                </a>
                <a class="filter filter--multi" href="#">
                    Überzogene Tabletten
                    <span class="filter__counter">22</span>
                </a>
            </div>
        </div>
        <div class="filterGroup filterGroup--collapsed">
            <div class="filterGroup__header">
                <h4>Hersteller</h4>
            </div>
            <div class="filterGroup__body">
                <a class="filter filter--multi" href="#">
                    Novartis
                    <span class="filter__counter">99</span>
                </a>
                <a class="filter filter--multi" href="#">
                    Ratiopharm
                    <span class="filter__counter">7</span>
                </a>
                <a class="filter filter--multi" href="#">
                    Bayer
                    <span class="filter__counter">13</span>
                </a>
                <a class="filter filter--multi" href="#">
                    Trommsdorf
                    <span class="filter__counter">55</span>
                </a>
            </div>
        </div>
        <div class="filterGroup filterGroup--collapsed">
            <div class="filterGroup__header">
                <h4>Bewertung</h4>
            </div>
            <div class="filterGroup__body">
                <a class="filter filter--multi" href="#">
                    <span class="rating rating--small rating--5">
                        <span class="rating__stars">5 von 5 Sternen</span>
                    </span>
                    <span class="filter__counter">8</span>
                </a>
                <a class="filter filter--multi" href="#">
                    <span class="rating rating--small rating--4">
                        <span class="rating__stars">4 von 5 Sternen</span>
                    </span>
                    <span class="filter__counter">2</span>
                </a>
                <a class="filter filter--multi" href="#">
                    <span class="rating rating--small rating--3">
                        <span class="rating__stars">3 von 5 Sternen</span>
                    </span>
                    <span class="filter__counter">12</span>
                </a>
                <a class="filter filter--multi" href="#">
                    <span class="rating rating--small rating--2">
                        <span class="rating__stars">2 von 5 Sternen</span>
                    </span>
                    <span class="filter__counter">2</span>
                </a>
                <a class="filter filter--multi" href="#">
                    <span class="rating rating--small rating--1">
                        <span class="rating__stars">1 von 5 Sternen</span>
                    </span>
                    <span class="filter__counter">9</span>
                </a>
            </div>
        </div>
    </div>
</div>
<div class="box m-t-4 pos-rel h-30 w-40 p-4" id="#searchDisplay">Search Result</div>
```