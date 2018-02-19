---
layout: base
group: components
title: Button
permalink: components/button
---

# Button

<p class="intro">Buttons of different styles and sizes.</p>

## Basic Example

Use `.btn` to render a `<a>`, `<button>`, `<input type="submit">` or `<span>` into a styled button. This is how the most basic button looks like and how you write the markup:

```html
<!-- example -->
<button class="btn">Basic Button</button>
```

## Icons & Buttons

You can put any [icon](components/icons.html) inside any kind of button. You can align them to the left or right by writing them first or last in markup:

```html
<!-- example -->
<!-- icon left -->
<button class="btn">
    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-008-s" yoi-icon />
    <span>Icon Left</span>
</button>

<!-- icon right -->
<button class="btn">
    <span>Icon Right</span>
    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-007-s" yoi-icon />
</button>
```

Create an icon-only button by adding `.hidden` to the label:

```html
<!-- example -->
<!-- icon but no label -->
<button class="btn">
    <span class="hidden">Hidden Label Text</span>
    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-006-s" yoi-icon />
</button>
```

<p class="hint hint--negative"><b>Order matters:</b> Make sure to always put the label before the icon in your markup.</p>

## Other HTML-Elements As Button

You can use any `<a>`, `<button>`, `<input type="submit">` or `<span>` as `.btn`. However, every time you want to add [icons](components/icons.html), you need a wrapper element around the button label.

### \<a>

```html
<!-- example -->
<a class="btn m-t-1" href="#">
    <span>Button</span>
    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-011-s" yoi-icon />
</a>
```

### \<button>

```html
<!-- example -->
<button class="btn m-t-1">
    <span>Button</span>
    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-011-s" yoi-icon />
</button>
```

### \<input type="submit">

```html
<!-- example -->
<span class="btn m-t-1">
    <input type="submit" value="Input-tag and .btn" />
    <span>Button</span>
    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-011-s" yoi-icon />
</span>
```

### \<span>

```html
<!-- example -->
<span class="btn m-t-1">
    <span>Button</span>
    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-011-s" yoi-icon />
</span>
```

<p class="hint hint--negative"><b>Wrap the label:</b> If you wish to use icons inside of buttons, make sure you always wrap the button label text inside an extra <code>&lt;span&gt;</code>.</p>

## Modifiers

| Size   | `.btn--medium, .btn--large, .btn--small` |
| Color  | `.btn--attention, .btn--dark, .btn--light, .btn--negative, .btn--positive, .btn--primary` |
| Type   | `.btn--flat, .btn--rounded, .btn--subtle` |
| State  | `.is--active, .is--disabled, .is--focus`|
| Other  | `.btn--clip` |

### Size

Use the modifiers `.btn--medium, .btn--large, .btn--small` to create buttons with different sizes:

```html
<!-- example -->
<button class="btn btn--small">Small Button</button>
<button class="btn">Default Button</button>
<button class="btn btn--medium">Medium Button</button>
<button class="btn btn--large">Large Button</button>
```

### Color

Use the modifiers `.btn--attention, .btn--dark, .btn--light, .btn--negative, .btn--positive, .btn--primary` to create buttons with different colors:

```html
<!-- example -->
<button class="btn btn--large btn--light">Button</button>
<button class="btn btn--large">Button</button>
<button class="btn btn--large btn--primary">Button</button>
<button class="btn btn--large btn--dark">Button</button>
<button class="btn btn--large btn--attention">Button</button>
<button class="btn btn--large btn--negative">Button</button>
<button class="btn btn--large btn--positive">Button</button>
```

### Type

Use the modifiers `.btn--flat, .btn--rounded, .btn--subtle` to create buttons with different styles:

#### Flat

```html
<!-- example -->
<button class="btn btn--flat btn--large btn--light">Button</button>
<button class="btn btn--flat btn--large">Button</button>
<button class="btn btn--flat btn--large btn--primary">Button</button>
<button class="btn btn--flat btn--large btn--dark">Button</button>
<button class="btn btn--flat btn--large btn--attention">Button</button>
<button class="btn btn--flat btn--large btn--negative">Button</button>
<button class="btn btn--flat btn--large btn--positive">Button</button>
```

<p class="hint hint--negative">You can’t combine <code>.btn--flat</code> with <code>.btn--outline</code>.</p>

#### Outline

```html
<!-- example -->
<button class="btn btn--outline btn--large btn--light">Button</button>
<button class="btn btn--outline btn--large">Button</button>
<button class="btn btn--outline btn--large btn--primary">Button</button>
<button class="btn btn--outline btn--large btn--dark">Button</button>
<button class="btn btn--outline btn--large btn--attention">Button</button>
<button class="btn btn--outline btn--large btn--negative">Button</button>
<button class="btn btn--outline btn--large btn--positive">Button</button>
```

If you combine `.btn--outline` and `.btn--light`, make sure you put the button against a dark background:

```html
<!-- example -->
<div class="p-4 bg-gray-10 br">
    <button class="btn btn--outline btn--large btn--light">Button</button>
</div>
```

#### Rounded

All button styles can be combined with `.btn--rounded` to create pill-shaped buttons.

```html
<!-- example -->
<button class="btn btn--large btn--outline btn--rounded">Button</button>
<button class="btn btn--large btn--flat btn--rounded">Button</button>
<button class="btn btn--large btn--rounded">Button</button>
```

#### Subtle

Use the modifiers `.btn--subtle` to create a button that looks like text label but changes the background color on mouseover:

```html
<!-- example -->
<button class="btn btn--large btn--subtle btn--light">Button</button>
<button class="btn btn--large btn--subtle">Button</button>
<button class="btn btn--large btn--subtle btn--primary">Button</button>
<button class="btn btn--large btn--subtle btn--dark">Button</button>
<button class="btn btn--large btn--subtle btn--attention">Button</button>
<button class="btn btn--large btn--subtle btn--negative">Button</button>
<button class="btn btn--large btn--subtle btn--positive">Button</button>
```

If you combine `.btn--subtle` and `.btn--light`, make sure you put the button against a dark background:

```html
<!-- example -->
<div class="p-4 bg-gray-10 br">
    <button class="btn btn--subtle btn--large btn--light">Button</button>
</div>
```

### State

Use the modifiers `.is--disabled, .is--active, .is--focus` to set the different button states (mirroring the CSS-pseudo-selectors `:disabled, :active, :focus`):

```html
<!-- example -->
<button class="btn btn--large is--active">Active</button>
<button class="btn btn--large is--disabled">Disabled</button>
<button class="btn btn--large is--focus">Focused</button>
```

### Truncate Button Labels

It’s possible to chop off very long button labels by adding the modifier `.btn--clip`.

```html
<!-- example -->
<button class="btn btn--medium w-10 btn--clip">Very Long Button Label Text foo foo bar bar</button>
```

## Button Groups

Visually group buttons by wrapping them inside a container with the class `.btns`:

```html
<!-- example -->
<div class="btns">
    <button class="btn btn--large">1</button>
    <button class="btn btn--large">2</button>
    <button class="btn btn--large">3</button>
</div>
```

Create vertically grouped button blocks by adding the modifier `.btns--vertical`:

```html
<!-- example -->
<div class="btns btns--vertical">
    <button class="btn btn--large">Aluminium</button>
    <button class="btn btn--large">Iron</button>
    <button class="btn btn--large">Lead</button>
</div>
```

## Dismiss-Button

Use `.btnDismiss` to add a *dismiss* (or *close*) button. This special button hides it’s label text by default and inherits the [semantic colors](utilities/color.html#semantic-colors) of it’s parent element.

<p class="hint hint--primary">Since the dismiss button is positioned absolutely, it’s parent element needs a position value other than <i>static</i> to privide positioning context.</p>

```html
<!-- example -->
<div class="box w-15 p-4 fs-2 c-negative-12">
    <p>Attention.</p>
    <button class="btnDismiss">Close</button>
</div>
```

## Modification

Use [utilities](utilities/) to override button styles and create custom buttons:

```html
<!-- example -->
<button class="btn btn--rounded btn--large br-tl-0 m-r-2">Straight Top Left Corner</button>
<button class="btn btn--large c-red-15 m-r-2">Red Text Color</button>
<button class="btn btn--large hvr--c-blue-13 m-r-2">Blue Text Color On Hover</button>
```