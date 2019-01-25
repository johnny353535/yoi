---
layout: base
group: components
title: Button
permalink: components/button
---

# Button

<p class="intro">Buttons of different styles and sizes.</p>

## Basic Example

Use `.button` to render a `<a>`, `<button>`, `<input type="submit">` or `<span>` into a styled button. This is how the most basic button looks like and how you write the markup:

```html
<!-- example -->
<button class="button">Basic Button</button>
```

## Icons & Buttons

You can put any [icon]({{ site.github.url }}/components/icon.html) inside any kind of button. You can align them to the left or right by writing them first or last in markup:

```html
<!-- example -->
<p>
    <!-- icon left -->
    <button class="button">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="15 18 9 12 15 6"></polyline></svg>
        <span>Icon Left</span>
    </button>
    <!-- icon right -->
    <button class="button">
        <span>Icon Right</span>
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
</p>
```

Create an icon-only button by adding `.hidden` to the label:

```html
<!-- example -->
<!-- icon but no label -->
<button class="button">
    <span class="hidden">Hidden Label Text</span>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
</button>
```

<p class="hint hint--negative"><b>Order matters:</b> Make sure to always put the label before the icon in your markup.</p>

## Other HTML-Elements As Button

You can use any `<a>`, `<button>`, `<input type="submit">` or `<span>` as `.button`. However, every time you want to add [icons]({{ site.github.url }}/components/icon.html), you need a wrapper element around the button label.

### \<a>

```html
<!-- example -->
<a class="button m-t-1" href="#">
    <span>Button</span>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="20 6 9 17 4 12"></polyline></svg>
</a>
```

### \<button>

```html
<!-- example -->
<button class="button m-t-1">
    <span>Button</span>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="20 6 9 17 4 12"></polyline></svg>
</button>
```

### \<input type="submit">

```html
<!-- example -->
<span class="button m-t-1">
    <input type="submit" value="Input-tag and .button" />
    <span>Button</span>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="20 6 9 17 4 12"></polyline></svg>
</span>
```

### \<span>

```html
<!-- example -->
<span class="button m-t-1">
    <span>Button</span>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="20 6 9 17 4 12"></polyline></svg>
</span>
```

<p class="hint hint--negative"><b>Wrap the label:</b> If you wish to use icons inside of buttons, make sure you always wrap the button label text inside an extra <code>&lt;span&gt;</code>.</p>

## Modifiers

| Size   | `.button--large, .button--xlarge, .button--small` |
| Color  | `.button--attention, .button--dark, .button--light, .button--negative, .button--positive, .button--primary` |
| Type   | `.button--flat, .button--rounded, .button--subtle` |
| State  | `.is--active, .is--disabled, .is--focus`|
| Other  | `.button--clip` |

### Size

Use the modifiers `.button--small, .button--large, .button--xlarge` to create buttons with different sizes:

```html
<!-- example -->
<button class="button button--small">Small Button</button>
<button class="button">Default Button</button>
<button class="button button--large">Large Button</button>
<button class="button button--xlarge">Extra Large Button</button>
```

### Color

Use the modifiers `.button--attention, .button--dark, .button--light, .button--negative, .button--positive, .button--primary` to create buttons with different colors:

```html
<!-- example -->
<button class="button button--light">Button</button>
<button class="button">Button</button>
<button class="button button--primary">Button</button>
<button class="button button--dark">Button</button>
<button class="button button--attention">Button</button>
<button class="button button--negative">Button</button>
<button class="button button--positive">Button</button>
```

### Type

Use the modifiers `.button--flat, .button--rounded, .button--subtle` to create buttons with different styles:

#### Flat

```html
<!-- example -->
<button class="button button--flat button--light">Button</button>
<button class="button button--flat">Button</button>
<button class="button button--flat button--primary">Button</button>
<button class="button button--flat button--dark">Button</button>
<button class="button button--flat button--attention">Button</button>
<button class="button button--flat button--negative">Button</button>
<button class="button button--flat button--positive">Button</button>
```

<p class="hint hint--negative">You can’t combine <code>.button--flat</code> with <code>.button--outline</code>.</p>

#### Outline

```html
<!-- example -->
<button class="button button--outline button--light">Button</button>
<button class="button button--outline">Button</button>
<button class="button button--outline button--primary">Button</button>
<button class="button button--outline button--dark">Button</button>
<button class="button button--outline button--attention">Button</button>
<button class="button button--outline button--negative">Button</button>
<button class="button button--outline button--positive">Button</button>
```

If you combine `.button--outline` and `.button--light`, make sure you put the button against a dark background:

```html
<!-- example -->
<div class="p-4 bg-gray-10 br">
    <button class="button button--outline button--light">Button</button>
</div>
```

#### Rounded

All button styles can be combined with `.button--rounded` to create pill-shaped buttons.

```html
<!-- example -->
<button class="button button--outline button--rounded">Button</button>
<button class="button button--flat button--rounded">Button</button>
<button class="button button--rounded">Button</button>
```

#### Subtle

Use the modifiers `.button--subtle` to create a button that looks like text label but changes the background color on mouseover:

```html
<!-- example -->
<button class="button button--subtle button--light">Button</button>
<button class="button button--subtle">Button</button>
<button class="button button--subtle button--primary">Button</button>
<button class="button button--subtle button--dark">Button</button>
<button class="button button--subtle button--attention">Button</button>
<button class="button button--subtle button--negative">Button</button>
<button class="button button--subtle button--positive">Button</button>
```

If you combine `.button--subtle` and `.button--light`, make sure you put the button against a dark background:

```html
<!-- example -->
<div class="p-4 bg-gray-10 br">
    <button class="button button--subtle button--light">Button</button>
</div>
```

### State

Use the modifiers `.is--disabled, .is--active, .is--focus` to set the different button states (mirroring the CSS-pseudo-selectors `:disabled, :active, :focus`):

```html
<!-- example -->
<button class="button is--active">Active</button>
<button class="button is--disabled">Disabled</button>
<button class="button is--focus">Focused</button>
```

### Truncate Button Labels

It’s possible to chop off very long button labels by adding the modifier `.button--clip`.

```html
<!-- example -->
<button class="button button--large w-10 button--clip">Very Long Button Label Text foo foo bar bar</button>
```

## Button Groups

Visually group buttons by wrapping them inside a container with the class `.buttons`:

```html
<!-- example -->
<div class="buttons">
    <button class="button">1</button>
    <button class="button">2</button>
    <button class="button">3</button>
</div>
```

Create vertically grouped button blocks by adding the modifier `.buttons--vertical`:

```html
<!-- example -->
<div class="buttons buttons--vertical">
    <button class="button">Aluminium</button>
    <button class="button">Iron</button>
    <button class="button">Lead</button>
</div>
```

## Dismiss-Button

Use `.buttonDismiss` to add a *dismiss* (or *close*) button. This special button hides it’s label text by default and inherits the [semantic colors]({{ site.github.url }}/utilities/color.html#semantic-colors) of it’s parent element.

<p class="hint hint--primary">Since the dismiss button is positioned absolutely, it’s parent element needs a position value other than <i>static</i> to <b>provide positioning context</b>.</p>

```html
<!-- example -->
<div class="box w-15 p-4 fs-2 c-negative-12">
    <p>Attention.</p>
    <button class="buttonDismiss">Close</button>
</div>
```

## Modification

Use [utilities]({{ site.github.url }}/utilities/) to override button styles and create custom buttons:

```html
<!-- example -->
<button class="button button--rounded br-tl-0 m-r-2">Straight Top Left Corner</button>
<button class="button c-red-15 m-r-2">Red Text Color</button>
<button class="button hvr--c-blue-13 m-r-2">Blue Text Color On Hover</button>
```
