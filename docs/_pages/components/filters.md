---
layout: base
group: components
title: Filters
permalink: components/filters
---

# Filters

<p class="intro">Use this component to display a powerful filter widget.</p>

## Basic Example

This is how your filter widget may look like. Switch to the code-tab to see the markup. This example also contains a [rangeInput element](components/rangeInput.html).

```html
<!-- example:tabs -->
<div class="filters" yoi-filters>
    <div class="filters__header">Filter the result:</div>
    <div class="filterGroup">
        <div class="filterGroup__header">
            <h4>Price</h4>
        </div>
        <div class="filterGroup__body">
            <div class="filter filter__range">
                <div class="rangeInput m-tb-4" yoi-rangeinput="min:1; max:100; absMin:1; absMax:100;">
                    <div class="js-fallback">
                        <label for="min">Min</label>
                        <input type="text" value="10" name="min" />
                        <label for="max">Max</label>
                        <input type="text" value="500" name="max" />
                        <input class="btn" type="submit" value="Apply" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="filterGroup filterGroup--collapsed">
        <div class="filterGroup__header">
            <h4>Options</h4>
        </div>
        <div class="filterGroup__body">
            <a class="filter filter--single" href="#">
                Single packages
                <span class="filter__counter">2</span>
            </a>
            <a class="filter filter--single" href="#">
                Combo packages
                <span class="filter__counter">11</span>
            </a>
        </div>
    </div>
    <div class="filterGroup">
        <div class="filterGroup__header">
            <h4>Ingredients</h4>
        </div>
        <div class="filterGroup__body">
            <a class="filter filter--multi" href="#">
                Acetic anhydride
                <span class="filter__counter">2</span>
            </a>
            <a class="filter filter--multi" href="#">
                Acetone
                <span class="filter__counter">11</span>
            </a>
            <a class="filter filter--multi" href="#">
                Benzyl chloride
                <span class="filter__counter">33</span>
            </a>
            <a class="filter filter--multi" href="#">
                Ethyl ether
                <span class="filter__counter">888</span>
            </a>
            <a class="filter filter--multi" href="#">
                Potassium permanganate
                <span class="filter__counter">22</span>
            </a>
            <a class="filter filter--multi" href="#">
                Toluene
                <span class="filter__counter">22</span>
            </a>
            <a class="filter filter--multi" href="#">
                Sulfuric acid
                <span class="filter__counter">22</span>
            </a>
            <a class="filter filter--multi" href="#">
                Methyl isobutyl ketone
                <span class="filter__counter">22</span>
            </a>
            <a class="filter filter--multi" href="#">
                Sodium permanganate
                <span class="filter__counter">22</span>
            </a>
        </div>
    </div>
    <div class="filterGroup filterGroup--collapsed">
        <div class="filterGroup__header">
            <h4>Rating</h4>
        </div>
        <div class="filterGroup__body">
            <a class="filter filter--multi" href="#">
                <span class="rating rating--small rating--5">
                    <span class="rating__stars">5 out of 5</span>
                </span>
                <span class="filter__counter">8</span>
            </a>
            <a class="filter filter--multi" href="#">
                <span class="rating rating--small rating--4">
                    <span class="rating__stars">4 out of 5</span>
                </span>
                <span class="filter__counter">2</span>
            </a>
            <a class="filter filter--multi" href="#">
                <span class="rating rating--small rating--3">
                    <span class="rating__stars">3 out of 5</span>
                </span>
                <span class="filter__counter">12</span>
            </a>
            <a class="filter filter--multi" href="#">
                <span class="rating rating--small rating--2">
                    <span class="rating__stars">2 out of 5n</span>
                </span>
                <span class="filter__counter">2</span>
            </a>
            <a class="filter filter--multi" href="#">
                <span class="rating rating--small rating--1">
                    <span class="rating__stars">1 out of 5</span>
                </span>
                <span class="filter__counter">9</span>
            </a>
        </div>
    </div>
</div>
```

## Controlling Filter Groups

You can control weather a filter group is **collapsed** or **expanded** on page load. If you wish to close a `.filterGroup` on page load, add the CSS-class `.filterGroup--collapsed` as modifier to your markup. By default, each `.filterGroup` is expanded (open) on page load.

```html
<!-- this filter group is collapsed (closed) on page load -->
<div class="filterGroup filterGroup--collapsed">…</div>

<!-- these filter groups are expanded (open) on page load -->
<div class="filterGroup filterGroup--expanded">…</div>
<div class="filterGroup">…</div>
```

<p class="hint"><b>Hint:</b> The modifier <code>.filterGroup--expanded</code> is only used internally. Simply ignore it.</p>

## Filter Types

You can use two different types of filters, both of them behave slightly different.

### Single-Selection Filters

Use these filters like you would use the HTML-element `<input type="radio">`. These filters get grouped and only one filter of this group can be active at a time.

```html
<!-- example -->
<div class="filters" yoi-filters>
    <div class="filterGroup">
        <div class="filterGroup__body">
            <a class="filter filter--single" href="#">
                Organic Chemicals
                <span class="filter__counter">62</span>
            </a>
            <a class="filter filter--single" href="#">
                Inorganic Chemicals
                <span class="filter__counter">35</span>
            </a>
        </div>
    </div>
</div>
```

### Multiple-Selection Filters

Use these filters like you would use the HTML-element `<input type="checkbox">`. Any number of these filters can be active at the same time.

```html
<!-- example -->
<div class="filters" yoi-filters>
    <div class="filterGroup">
        <div class="filterGroup__body">
            <a class="filter filter--multi" href="#">
                Acetic anhydride
                <span class="filter__counter">2</span>
            </a>
            <a class="filter filter--multi" href="#">
                Acetone
                <span class="filter__counter">11</span>
            </a>
            <a class="filter filter--multi" href="#">
                Benzyl chloride
                <span class="filter__counter">33</span>
            </a>
        </div>
    </div>
</div>
```

## Actions

### Filters.toggle

### Filters.reset

### Custom Events

| event name           | fires when …                                    |
| -------------------- | ----------------------------------------------- |
| `yoi-filters-change` | A filter state changed (active/inactive)        |
| `yoi-filters-update` | After a short delay after the last change fired |
| `yoi-filters-reset`  | After all filters were reset                    |