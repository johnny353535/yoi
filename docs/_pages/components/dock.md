---
layout: base
group: components
title: Dock
permalink: components/dock
---

# Dock

<p class="intro">An overlay which is <i>docked</i> to the right or left side of the screen and takes up the whole viewport height.</p>

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
<div id="exampleDock" class="dock dock--left" yoi-dock="autohide:true;">
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
    <p class="m-t-2">
        <button class="btn btn--large" yoi-action="Dock.hide:#exampleDock;">Hide Dock</button>
    </p>
</div>
```

## Actions

### Dock.hide

Call this action to hide a `.dock`:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Dock.hide:#exampleDock;">Hide Dock</button>
```
 
### Dock.show

Call this action to show a `.dock`:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Dock.show:#exampleDock;">Show Dock</button>
```

### Custom Events

| event name      | fires when …     |
| --------------- | ---------------- |
| `yoi-dock-show` | Dock is visible. |
| `yoi-dock-hide` | Dock is hidden.  |