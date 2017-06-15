---
layout: base
group: elements
title: Dock
permalink: elements/dock
---

# Dock

Use this element to create an overlay which is docked to the right or left side of the screen and takes up the whole viewport height.

| Styles         | [dock.less]({{ pathToSourceFile }}assets/less/elements/dock.less) |
| Script         | [dock.js]({{ pathToSourceFile }}assets/js/elements/dock.js)       |
| Script Hook    | `yoi-dock`                                                        |
| Base CSS-Class | `.dock`                                                           |
| Modifiers      | `.dock--left, .dock--right`                                       |

## Basic Example

This is the markup for a basic `.dock` (you should see the rendered result on the left edge of this page):

```html
<div class="dock" yoi-dock>
    <p>Some content</p>
</div>
```

## Modifiers

Add `.dock--left` or `.dock--right` to attach the `.dock` to the left or right side of the viewport. By default – if you leave out a modifier – a dock is on the left side. A hidden `.dock` appears on *mouseover* and disappears after a short delay on *mouseout*.

```html
<!-- a dock at the left side of the screen (default) -->
<div class="dock dock--left" yoi-dock>
    <p>Some content</p>
</div>

<!-- a dock at the right side of the screen -->
<div class="dock dock--right" yoi-dock>
    <p>Some content</p>
</div>
```

## Options

`.dock` has an optional autohide feature. It’s disabled by default but it makes most sense to always enable it, for example when you use it as a menu.

The following code example is creating the dock you may actually see on the left side of this page:

```html
<!-- example -->
<div class="dock dock--left" yoi-dock="autohide:true;">
    <h4>Table of Content</h4>
    <ul class="linkList linkList--large b-0 m-t-4">
        <li class="linkList__item">
            <a href="linkList__link">Arsenium</a>
        </li>
        <li class="linkList__item">
            <a href="linkList__link">Lithium</a>
        </li>
        <li class="linkList__item">
            <a href="linkList__link">Californicum</a>
        </li>
        <li class="linkList__item">
            <a href="linkList__link">Plutonium</a>
        </li>
    </ul>
</div>
```

## JavaScript-API

### initialize()

On each page load, all elements marked with `yoi-dock="autohide:true;"` are hidden and initialized. However, if you dynamically add a new elements to the page, call this function from your JavaScript to initialize any other `.dock`.

```js
YOI.element.Dock.initialize()

/**
 *  @param {jQuery dom object} $dock
 *  @param {object}            options
 *
 *  Available options:
 *
 *  @option {bool} autohide - if TRUE, dock is initially hidden
 *                            default: FALSE
 */
```

### hide()

Call this function from your JavaScript to hide all currently visible `.dock`-instances.

```js
YOI.element.Dock.hide()

/**
 *  Hide the dock.
 *
 *  @param {jQuery dom object} $thisDock - the dock
 */
```
 
### show()

Call this function from your JavaScript to show all currently hidden `.dock`-instances.

```
YOI.element.Dock.show()

/**
 *  Show the dock.
 *
 *  @param {jQuery dom object} $thisDock - the dock
 */
```

### Custom Events

Each `.dock` fires custom events your script can listen to:

```js
yoi-dock:show // dock was shown
yoi-dock:hide // dock was hidden
```