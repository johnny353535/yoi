---
layout: base
group: components
title: Flyout
permalink: components/flyout
---

# Flyout

<p class="intro">A label, pinned to either the left or right side of the screen, which reveals a small panel on click.</p>

## Basic Example

This is the markup for a basic `.flyout` (you should see the rendered result on the left edge of this page):

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

<p class="hint hint--primary"><b>Use sparely:</b> You should only use one flyout per page and only for important information since the sticky labels on the side of the screen appera rather prominent to the user.</p>

## Modifiers

Add `.flyout--left` or `.flyout--right` to attach the `.flyout` to the left or right side of the viewport. By default – if you leave out a modifier – a flyout is on the left side.

## NoScript / Fall Back

If JavaScript is not available, the flyout is a simple box and remains at it’s original position in the document.

## Actions

### Flyout.toggle

Toggle (show/hide) a `.flyout` by using the [action]({{ site.github.url }}/actions/) `Flyout.toggle`:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Flyout.toggle:#exampleFlyout;">Toggle the Flyout</button>
```

### Flyout.show

Show a `.flyout` by using the [action]({{ site.github.url }}/actions/) `Flyout.show`:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Flyout.show:#exampleFlyout;">Show the Flyout</button>
```

### Flyout.hide

Hide a `.flyout` by using the [action]({{ site.github.url }}/actions/) `Flyout.hide`:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Flyout.hide:#exampleFlyout;">Hide the Flyout</button>
```

### Custom Events

| event name        | fires when …       |
| ----------------- | ------------------ |
| `yoi-flyout-show` | A flyout is shown  |
| `yoi-flyout-hide` | A flyout is hiddem |
