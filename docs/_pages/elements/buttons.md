---
layout: base
title: Buttons
permalink: elements/buttons
---

## Buttons
Buttons are very flexible and versatile. They come with many different styles, four different sizes and they may include one or more icons. To try out all possible combinations, use the [buttons kitchensink](/pages/tools/buttons_kitchensink.html).

| Less-File      | [buttons.less]({{ pathToSourceFile }}assets/less/elements/buttons.less)                                                                                                                                                                          |
| Base CSS-Class | `.btn`                                                                                                                                                                                                                                           |
| Modifiers      | `.btn--attention, .btn--clip, .btn--dark, .btn--disabled, .btn--error, .btn--flat, .btn--focus, .btn--large, .btn--light, .btn--medium, .btn--negative, .btn--positive, .btn--rounded, .btn--small, .btn--subtle, .btn--success`                 |

Use `.btn` to render a `<a>`, `<button>`, `<input type="submit">` or `<span>` into a nicely styled button. There is a large list of modifiers. Let’s take a look at the most basic example first:

```html
<button class="btn">A Simple Button</button>
```

### Icons inside Buttons
You can use any [icon](/pages/elements/icons.html) inside any kind of button. You can place them left or right (= first or last in markup) or only use icons and no label text. Some examples:

```html
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
<button class="btn">
    <span class="hidden">Hidden Label Text</span>
    <span class="icon"></span>
</button>
```

You can use **more than one icon** per button. But **this rarely makes much sense**.

```html
<button class="btn">
    <span class="icon"></span>
    <span>Many Icons Left And Right</span>
    <span class="icon"></span>
    <span class="icon"></span>
    <span class="icon"></span>
</button>
```

### `input[type="submit"]` and Other Elements As Button
You may use any `<a>`, `<button>`, `<input type="submit">` or `<span>` as `.btn`. However, every time you want to add [icons](/pages/elements/icons.html), you need a wrapper element around the button label and icon. Some examples:

```html
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

| Size-Modifiers   | `.btn--medium, .btn--large, .btn--small` |
| Color-Modifiers  | `.btn--attention, .btn--dark, .btn--error, .btn--light, .btn--negative, .btn--positive .btn--success` |
| Status-Modifiers | `.btn--active, .btn--disabled, .btn--focus`|
| Other Modifiers  | `.btn--flat, .btn--rounded, .btn--subtle, .btn--clip` |

Buttons come in **four different sizes**: *small*, *(default)*, *medium* and *large*.

```html
<button class="btn btn--small">Small Button</button>
<button class="btn">Button</button>
<button class="btn btn--medium">Medium Button</button>
<button class="btn btn--large">Large Button</button>
```

There are **six different color styles** available – while `.btn--subtle` is a fully transparent button, only showing the button label:

```html
<button class="btn btn--large btn--subtle">Button</button>
<button class="btn btn--large btn--light">Button</button>
<button class="btn btn--large">Button</button>
<button class="btn btn--large btn--dark">Button</button>
<button class="btn btn--large btn--attention">Button</button>
<button class="btn btn--large btn--negative">Button</button>
<button class="btn btn--large btn--positive">Button</button>
```

In addition to the default appearance, buttons can be either ***flat* or *outlined***. Please note: You **cannot combine `.btn--flat` with `.btn--outline`** or either one of these modifiers with `.btn--subtle`.

```html
<button class="btn btn--flat btn--large btn--light">Button</button>
<button class="btn btn--flat btn--large">Button</button>
<button class="btn btn--flat btn--large btn--dark">Button</button>
<button class="btn btn--flat btn--large btn--attention">Button</button>
<button class="btn btn--flat btn--large btn--negative">Button</button>
<button class="btn btn--flat btn--large btn--positive">Button</button>
```

```html
<button class="btn btn--outline btn--large">Button</button>
<button class="btn btn--outline btn--large btn--dark">Button</button>
<button class="btn btn--outline btn--large btn--attention">Button</button>
<button class="btn btn--outline btn--large btn--negative">Button</button>
<button class="btn btn--outline btn--large btn--positive">Button</button>
```

If you combine `.btn--outline` and `.btn--light`, make sure you **put the button against a dark background**.

```html
<button class="btn btn--outline btn--large btn--light">Button</button>
```

All button styles can be combined with .btn--rounded to create **pill-shaped buttons**.

```html
<button class="btn btn--large btn--outline btn--rounded">Button</button>
<button class="btn btn--large btn--flat btn--rounded">Button</button>
<button class="btn btn--large btn--rounded">Button</button>
```

All buttons have **three state-modifiers** which simply reflect the same styling which applies to the corresponding CSS-pseudo-selectors: `.btn--disabled, .btn--active, .btn--focus`.

```html
<button class="btn btn--large btn--active">Active</button>
<button class="btn btn--large btn--disabled">Disabled</button>
<button class="btn btn--large btn--focus">Focused</button>
```

It’s possible to **shorten very long button labels** by adding the modifier `.btn--clip`.

```html
<button class="btn btn--medium w-10 btn--clip">Very Long Button Label Text foo foo bar bar</button>
```

### Try Out Different Combinations
Have a look at the [Buttons Kitchensink](/pages/tools/buttons_kitchensink.html) to try out all possible combinations.