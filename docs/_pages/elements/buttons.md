---
layout: base
group: elements
title: Buttons
permalink: elements/buttons
---

## Buttons
The button element features different types (eg. rounded, flat, …) and four different sizes. A button may include one or more icons.

| Styles         | [buttons.less]({{ pathToSourceFile }}assets/less/elements/buttons.less) |
| Base CSS-Class | `.btn`                                                                  |
| Modifiers      | [see below]({{ page.url }}.html#modifiers)                              |

Use `.btn` to render a `<a>`, `<button>`, `<input type="submit">` or `<span>` into a styled button. You get a large variety by combining the many button-modifiers. This is how you render the most basic button:

```html
<!-- example -->
<button class="btn">Basic Button</button>
```

### Icons inside Buttons
You can use any [icon](elements/icons.html) inside any kind of button. You can place them left or right (= first or last in markup) or only use icons and no label text. Some examples:

```html
<!-- example -->
<button class="btn">
    <span class="icon"></span>
    <span>Icon Left</span>
</button>
<button class="btn">
    <span>Icon Right</span>
    <span class="icon"></span>
</button>
```

If you wish to create an icon-only button, use the css-class `hidden` for the label. Im your markup, make sure to **put the label before the icon**. Icon-only buttons **only work well when you use a single icon**.

```html
<!-- example -->
<button class="btn">
    <span class="hidden">Hidden Label Text</span>
    <span class="icon"></span>
</button>
```

Technically, you can use **more than one icon** per button. But **this rarely makes much sense**.

```html
<!-- example -->
<button class="btn">
    <span class="icon"></span>
    <span>Many Icons Left And Right</span>
    <span class="icon"></span>
    <span class="icon"></span>
    <span class="icon"></span>
</button>
```

### Other HTML-Elements As Button
You may use any `<a>`, `<button>`, `<input type="submit">` or `<span>` as `.btn`. However, every time you want to add [icons](elements/icons.html), you need a wrapper element around the button label and icon. Some examples:

```html
<!-- example -->
<a class="btn m-t-1" href="#">
    <span>a-tag and .btn plus .icon</span>
    <span class="icon"></span>
</a>
<button class="btn m-t-1">
    <span>button-tag and .btn plus .icon</span>
    <span class="icon"></span>
</button>
<span class="btn m-t-1">
    <input type="submit" value="Input-tag and .btn" />
    <span>input-tag and .btn</span>
    <span class="icon"></span>
</span>
<span class="btn m-t-1">
    <span>span-tag and .btn</span>
    <span class="icon"></span>
</span>
```

If you use **icons inside of buttons**, make sure you **always wrap the button label text inside a `<span>`**. If you only use an icon but no label text, you can either discard the text or wrap a hidden label text inside `<span class="hidden">` – but make sure you **place the hidden label text *before* the icon** inside the button markup.

### Modifiers

| Size   | `.btn--medium, .btn--large, .btn--small` |
| Color  | `.btn--attention, .btn--dark, .btn--error, .btn--light, .btn--negative, .btn--positive .btn--success` |
| Type   | `.btn--flat, .btn--rounded, .btn--subtle` |
| State  | `.btn--active, .btn--disabled, .btn--focus`|
| Other  | `.btn--clip` |

<p class="hint hint--attention">Have a look at the <a href="tools/buttons.html">buttons tool</a> to try out all possible combinations.</p>

#### Size
Buttons come in **four different sizes**: *small*, *(default)*, *medium* and *large*.

```html
<!-- example -->
<button class="btn btn--small">Small Button</button>
<button class="btn">(Default) Button</button>
<button class="btn btn--medium">Medium Button</button>
<button class="btn btn--large">Large Button</button>
```

#### Color
There are **six different color styles** available – while `.btn--subtle` is a fully transparent button, only showing the button label:

```html
<!-- example -->
<button class="btn btn--large btn--subtle">Button</button>
<button class="btn btn--large btn--light">Button</button>
<button class="btn btn--large">Button</button>
<button class="btn btn--large btn--dark">Button</button>
<button class="btn btn--large btn--attention">Button</button>
<button class="btn btn--large btn--negative">Button</button>
<button class="btn btn--large btn--positive">Button</button>
```

#### Type
In addition to the default appearance, buttons can be either *flat*, *rounded* or *outlined*.

<p class="hint hint--negative">Please note: You can’t combine <code>.btn--flat</code> with <code>.btn--outline</code> or either one of these modifiers with <code>.btn--subtle</code>.</p>

```html
<!-- example -->
<button class="btn btn--flat btn--large btn--light">Button</button>
<button class="btn btn--flat btn--large">Button</button>
<button class="btn btn--flat btn--large btn--dark">Button</button>
<button class="btn btn--flat btn--large btn--attention">Button</button>
<button class="btn btn--flat btn--large btn--negative">Button</button>
<button class="btn btn--flat btn--large btn--positive">Button</button>
```

```html
<!-- example -->
<button class="btn btn--outline btn--large">Button</button>
<button class="btn btn--outline btn--large btn--dark">Button</button>
<button class="btn btn--outline btn--large btn--attention">Button</button>
<button class="btn btn--outline btn--large btn--negative">Button</button>
<button class="btn btn--outline btn--large btn--positive">Button</button>
```

<p class="hint hint--attention">If you combine <code>.btn--outline</code> and <code>.btn--light</code>, make sure you put the button against a dark background.</p>

```html
<!-- example -->
<div class="p-4 bg-purple-13 br">
    <button class="btn btn--outline btn--large btn--light">Button</button>
</div>
```

All button styles can be combined with `.btn--rounded` to create **pill-shaped buttons**.

```html
<!-- example -->
<button class="btn btn--large btn--outline btn--rounded">Button</button>
<button class="btn btn--large btn--flat btn--rounded">Button</button>
<button class="btn btn--large btn--rounded">Button</button>
```

#### State
All buttons have **three state-modifiers** which simply reflect the same styling which applies to the corresponding CSS-pseudo-selectors: `.btn--disabled, .btn--active, .btn--focus`.

```html
<!-- example -->
<button class="btn btn--large btn--active">Active</button>
<button class="btn btn--large btn--disabled">Disabled</button>
<button class="btn btn--large btn--focus">Focused</button>
```

#### Other Modifiers
It’s possible to **shorten very long button labels** by adding the modifier `.btn--clip`.

```html
<!-- example -->
<button class="btn btn--medium w-10 btn--clip">Very Long Button Label Text foo foo bar bar</button>
```

### Button Groups
Wrap a group of buttons inside a container with the class `.btns`:

```html
<!-- example -->
<div class="btns">
    <button class="btn btn--large">1</button>
    <button class="btn btn--large">2</button>
    <button class="btn btn--large">3</button>
</div>
```

You may also create vertically grouped button blocks by adding the modifier `.btns--vertical`:

```html
<!-- example -->
<div class="btns btns--vertical">
    <button class="btn btn--large">Aluminium</button>
    <button class="btn btn--large">Iron</button>
    <button class="btn btn--large">Lead</button>
</div>
```

### Custom Modification Through Utility-Classes
Use [YOI Utility Classes](utilities/) to override button styles and create custom buttons. Use this option wisely and only for special cases where no standard button style works for you!

```html
<!-- example -->
<button class="btn btn--rounded btn--large br-tl-0 m-r-2">Straight Top Left Corner</button>
<button class="btn btn--large tc-red-15 m-r-2">Red Text Color</button>
<button class="btn btn--large hvr-tc-blue-13 m-r-2">Blue Text Color On Hover</button>
```