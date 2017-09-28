---
layout: base
group: components
title: Flyout
permalink: components/flyout
---

# Flyout

<p class="intro">Use this component to display a label, pinned to either the left or right side of the screen, which reveals a small panel on click.</p>

<p class="hint hint--error"><b>Use sparely:</b> You should only use one flyout per page and only for important information since the sticky labels on the side of the screen appera rather prominent to the user.</p>
<p class="hint hint--attention"><b>For large screens only:</b> This element was designed for use with large screens, it’s not recommended to use it on small screens.</p>

## Basic Example

This is the markup for a basic `.flyOut` (you should see the rendered result on the left edge of this page):

```html
<!-- example -->
<div id="exampleFlyout" class="flyout" yoi-flyout>
    <h2 class="flyout__handle">Flyout</h2>
    <div class="flyout__body">
        <h3 class="ff-ss">This is an Example Flyout</h3>
        <p class="fs-2 lh-3 m-tb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
        <p class="btns btns--vertical">
            <a href="#" class="btn btn--large">Advanced Chemistry</a>
            <a href="#" class="btn btn--large">Rocket Science</a>
        </p>
    </div>
</div>
```

## Modifiers

Add `.flyout--left` or `.flyout--right` to attach the `.flyout` to the left or right side of the viewport. By default – if you leave out a modifier – a flyout is on the left side.

## NoScript / Fall Back

If JavaScript is not available, the flyout is a simple box and remains at it’s original position in the document.

## Actions

### Flyout.toggle

Toggle (show/hide) a `.flyOut` by using the [action](actions/) `Flyout.toggle`:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Flyout.toggle:#exampleFlyout;">Toggle the FlyOut</button>
```

### Flyout.show

Show a `.flyOut` by using the [action](actions/) `Flyout.show`:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Flyout.show:#exampleFlyout;">Show the FlyOut</button>
```

### Flyout.hide

Hide a `.flyOut` by using the [action](actions/) `Flyout.hide`:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Flyout.hide:#exampleFlyout;">Hide the FlyOut</button>
```

### Custom Events

| event name        | fires when …       |
| ----------------- | ------------------ |
| `yoi-flyout-show` | A flyOut is shown  |
| `yoi-flyout-hide` | A flyOut is hiddem |