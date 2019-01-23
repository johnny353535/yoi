---
layout: base
group: components
title: Tabs
permalink: components/tabs
---

# Tabs

<p class="intro">Tab menus and tab panels.</p>

## Basic Example

This is how a basic `.tabs` and `.tabs__menu.` looks and how you write the markup:

```html
<!-- example -->
<div class="tabs" >
    <div class="tabs__menu" yoi-tabs>
        <ul class="tabs__items">
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-1-1-a">Tab #1</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-1-2-a">Tab #2</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-1-3-a">Tab #3</a>
            </li>
        </ul>
    </div>
    <div id="tab-1-1-a" class="tabs__page">
        <p>Tab #1 Content</p>
    </div>
    <div id="tab-1-2-a" class="tabs__page">
        <p>Tab #2 Content</p>
    </div>
    <div id="tab-1-3-a" class="tabs__page">
        <p>Tab #3 Content</p>
    </div>
</div>
```

<p class="hint hint--negative"><b>Use IDs:</b> Make sure to add an id to each <code>.tabs__page</code> that you reference via the <code>.tabs__menu</code>.</p>

### Set the Start Tab

Add the modifier `is--acive` to the menu item you wish to start with:

```html
<!-- example -->
<div class="tabs" >
    <div class="tabs__menu" yoi-tabs>
        <ul class="tabs__items">
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-1-1-b">Tab #1</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-1-2-b">Tab #2</a>
            </li>
            <li class="tabs__item is--active">
                <a class="tabs__link" href="#tab-1-3-b">Tab #3</a>
            </li>
        </ul>
    </div>
    <div id="tab-1-1-b" class="tabs__page">
        <p>Tab #1 Content</p>
    </div>
    <div id="tab-1-2-b" class="tabs__page">
        <p>Tab #2 Content</p>
    </div>
    <div id="tab-1-3-b" class="tabs__page">
        <p>Tab #3 Content</p>
    </div>
</div>
```

## Modifiers

### Grow

Add the modifier `.tabs__menu--grow` to make all tabs take up the same with and use 100% of the available width:

```html
<!-- example -->
<div class="tabs">
    <div class="tabs__menu tabs__menu--grow" yoi-tabs>
        <ul class="tabs__items">
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-1-1-c">Tab #1</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-1-2-c">Tab #2</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-1-3-c">Tab #3</a>
            </li>
        </ul>
    </div>
    <div id="tab-1-1-c" class="tabs__page">
        <p>Tab #1 Content</p>
    </div>
    <div id="tab-1-2-c" class="tabs__page">
        <p>Tab #2 Content</p>
    </div>
    <div id="tab-1-3-c" class="tabs__page">
        <p>Tab #3 Content</p>
    </div>
</div>
```

### Size

Add the modifier `.tabs__menu--large` to create a larger menu:

```html
<!-- example -->
<div class="tabs">
    <div class="tabs__menu tabs__menu--large" yoi-tabs>
        <ul class="tabs__items">
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-2-1">Tab #1</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-2-2">Tab #2</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-2-3">Tab #3</a>
            </li>
        </ul>
    </div>
    <div id="tab-2-1" class="tabs__page">
        <p>Tab #1 Content</p>
    </div>
    <div id="tab-2-2" class="tabs__page">
        <p>Tab #2 Content</p>
    </div>
    <div id="tab-2-3" class="tabs__page">
        <p>Tab #3 Content</p>
    </div>
</div>
```

### Subtle

Use the modifier `.tabs__menu--subtle` to create a less prominent tab menu:

```html
<!-- example -->
<div class="tabs__menu tabs__menu--subtle" yoi-tabs>
    <ul class="tabs__items">
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-7-1">Tab #1</a>
        </li>
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-7-2">Tab #2</a>
        </li>
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-7-3">Tab #3</a>
        </li>
    </ul>
</div>
<div id="tab-7-1" class="tabs__page">
    <p>Tab #1 Content</p>
</div>
<div id="tab-7-2" class="tabs__page">
    <p>Tab #2 Content</p>
</div>
<div id="tab-7-3" class="tabs__page">
    <p>Tab #3 Content</p>
</div>
```

### Arrows

Add the modifier `.tabs__menu--arrows` to the `.tabs__menu` to use an alternative styling with downwards-pointing arrows:

```html
<!-- example -->
<div class="tabs__menu tabs__menu--arrows" yoi-tabs>
    <ul class="tabs__items">
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-3a-1">Tab #1</a>
        </li>
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-3a-2">Tab #2</a>
        </li>
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-3a-3">Tab #3</a>
        </li>
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-3a-4">Tab #4</a>
        </li>
    </ul>
</div>
<div class="tabs__page" id="tab-3a-1">Tab #1 Content</div>
<div class="tabs__page" id="tab-3a-2">Tab #2 Content</div>
<div class="tabs__page" id="tab-3a-3">Tab #3 Content</div>
<div class="tabs__page" id="tab-3a-4">Tab #4 Content</div>
```

## JavaScript-API

### Methods

#### switchTo()

Switch to a tab:

```html
<!-- example -->
<div id="exampleTabs-1" class="tabs">
    <div class="tabs__menu" yoi-tabs>
        <ul class="tabs__items">
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-8-1">Tab #1</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-8-2">Tab #2</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-8-3">Tab #3</a>
            </li>
        </ul>
    </div>
    <div id="tab-8-1" class="tabs__page">
        <p>Tab #1 Content</p>
    </div>
    <div id="tab-8-2" class="tabs__page">
        <p>Tab #2 Content</p>
    </div>
    <div id="tab-8-3" class="tabs__page">
        <p>Tab #3 Content</p>
    </div>
</div>
<button id="exampleButton-1" class="button button--large val-t m-t-2">Switch to tab #2</button>
<script>
    $('#exampleButton-1').on('click', function() {
        YOI.component.Tabs.switchTo('#tab-8-2');
    });
</script>
```

### Events

Each `.tabs__menu` fires a custom event your script can listen to:

```
yoi-tabs:change // the active tabs page changed
```

Try the example below and watch the custom events, printed to the [log element]({{ site.github.url }}/components/log.html):

```html
<!-- example:tabs -->
<div id="myLog" class="log log--light m-b-4" yoi-log>
    <div class="log__body">
        <p>Listening</p>
    </div>
</div>
<div id="exampleTabs-2" class="tabs">
    <div class="tabs__menu" yoi-tabs>
        <ul class="tabs__items">
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-9-1">Tab #1</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-9-2">Tab #2</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-9-3">Tab #3</a>
            </li>
        </ul>
    </div>
    <div id="tab-9-1" class="tabs__page">
        <p>Tab #1 Content</p>
    </div>
    <div id="tab-9-2" class="tabs__page">
        <p>Tab #2 Content</p>
    </div>
    <div id="tab-9-3" class="tabs__page">
        <p>Tab #3 Content</p>
    </div>
</div>
<script>
    $('#exampleTabs-2').on('yoi-tabs:change', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-tabs:change');
    });
</script>
```
