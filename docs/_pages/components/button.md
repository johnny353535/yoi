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

You can put any [icon]({{ site.github.url }}/components/icon.html) inside any kind of button. You can align them to the left or right by writing them first or last in markup:

```html
<!-- example -->
<p>
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
</p>
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

You can use any `<a>`, `<button>`, `<input type="submit">` or `<span>` as `.btn`. However, every time you want to add [icons]({{ site.github.url }}/components/icon.html), you need a wrapper element around the button label.

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

| Size   | `.btn--large, .btn--xlarge, .btn--small` |
| Color  | `.btn--attention, .btn--dark, .btn--light, .btn--negative, .btn--positive, .btn--primary` |
| Type   | `.btn--flat, .btn--rounded, .btn--subtle` |
| State  | `.is--active, .is--disabled, .is--focus`|
| Other  | `.btn--clip` |

### Size

Use the modifiers `.btn--small, .btn--large, .btn--xlarge` to create buttons with different sizes:

```html
<!-- example -->
<button class="btn btn--small">Small Button</button>
<button class="btn">Default Button</button>
<button class="btn btn--large">Large Button</button>
<button class="btn btn--xlarge">Extra Large Button</button>
```

### Color

Use the modifiers `.btn--attention, .btn--dark, .btn--light, .btn--negative, .btn--positive, .btn--primary` to create buttons with different colors:

```html
<!-- example -->
<button class="btn btn--light">Button</button>
<button class="btn">Button</button>
<button class="btn btn--primary">Button</button>
<button class="btn btn--dark">Button</button>
<button class="btn btn--attention">Button</button>
<button class="btn btn--negative">Button</button>
<button class="btn btn--positive">Button</button>
```

### Type

Use the modifiers `.btn--flat, .btn--rounded, .btn--subtle` to create buttons with different styles:

#### Flat

```html
<!-- example -->
<button class="btn btn--flat btn--light">Button</button>
<button class="btn btn--flat">Button</button>
<button class="btn btn--flat btn--primary">Button</button>
<button class="btn btn--flat btn--dark">Button</button>
<button class="btn btn--flat btn--attention">Button</button>
<button class="btn btn--flat btn--negative">Button</button>
<button class="btn btn--flat btn--positive">Button</button>
```

<p class="hint hint--negative">You can’t combine <code>.btn--flat</code> with <code>.btn--outline</code>.</p>

#### Outline

```html
<!-- example -->
<button class="btn btn--outline btn--light">Button</button>
<button class="btn btn--outline">Button</button>
<button class="btn btn--outline btn--primary">Button</button>
<button class="btn btn--outline btn--dark">Button</button>
<button class="btn btn--outline btn--attention">Button</button>
<button class="btn btn--outline btn--negative">Button</button>
<button class="btn btn--outline btn--positive">Button</button>
```

If you combine `.btn--outline` and `.btn--light`, make sure you put the button against a dark background:

```html
<!-- example -->
<div class="p-4 bg-gray-10 br">
    <button class="btn btn--outline btn--light">Button</button>
</div>
```

#### Rounded

All button styles can be combined with `.btn--rounded` to create pill-shaped buttons.

```html
<!-- example -->
<button class="btn btn--outline btn--rounded">Button</button>
<button class="btn btn--flat btn--rounded">Button</button>
<button class="btn btn--rounded">Button</button>
```

#### Subtle

Use the modifiers `.btn--subtle` to create a button that looks like text label but changes the background color on mouseover:

```html
<!-- example -->
<button class="btn btn--subtle btn--light">Button</button>
<button class="btn btn--subtle">Button</button>
<button class="btn btn--subtle btn--primary">Button</button>
<button class="btn btn--subtle btn--dark">Button</button>
<button class="btn btn--subtle btn--attention">Button</button>
<button class="btn btn--subtle btn--negative">Button</button>
<button class="btn btn--subtle btn--positive">Button</button>
```

If you combine `.btn--subtle` and `.btn--light`, make sure you put the button against a dark background:

```html
<!-- example -->
<div class="p-4 bg-gray-10 br">
    <button class="btn btn--subtle btn--light">Button</button>
</div>
```

### State

Use the modifiers `.is--disabled, .is--active, .is--focus` to set the different button states (mirroring the CSS-pseudo-selectors `:disabled, :active, :focus`):

```html
<!-- example -->
<button class="btn is--active">Active</button>
<button class="btn is--disabled">Disabled</button>
<button class="btn is--focus">Focused</button>
```

### Truncate Button Labels

It’s possible to chop off very long button labels by adding the modifier `.btn--clip`.

```html
<!-- example -->
<button class="btn btn--large w-10 btn--clip">Very Long Button Label Text foo foo bar bar</button>
```

## Button Groups

Visually group buttons by wrapping them inside a container with the class `.btns`:

```html
<!-- example -->
<div class="btns">
    <button class="btn">1</button>
    <button class="btn">2</button>
    <button class="btn">3</button>
</div>
```

Create vertically grouped button blocks by adding the modifier `.btns--vertical`:

```html
<!-- example -->
<div class="btns btns--vertical">
    <button class="btn">Aluminium</button>
    <button class="btn">Iron</button>
    <button class="btn">Lead</button>
</div>
```

## Dismiss-Button

Use `.btnDismiss` to add a *dismiss* (or *close*) button. This special button hides it’s label text by default and inherits the [semantic colors]({{ site.github.url }}/utilities/color.html#semantic-colors) of it’s parent element.

<p class="hint hint--primary">Since the dismiss button is positioned absolutely, it’s parent element needs a position value other than <i>static</i> to <b>provide positioning context</b>.</p>

```html
<!-- example -->
<div class="box w-15 p-4 fs-2 c-negative-12">
    <p>Attention.</p>
    <button class="btnDismiss">Close</button>
</div>
```

## Modification

Use [utilities]({{ site.github.url }}/utilities/) to override button styles and create custom buttons:

```html
<!-- example -->
<button class="btn btn--rounded br-tl-0 m-r-2">Straight Top Left Corner</button>
<button class="btn c-red-15 m-r-2">Red Text Color</button>
<button class="btn hvr--c-blue-13 m-r-2">Blue Text Color On Hover</button>
```
