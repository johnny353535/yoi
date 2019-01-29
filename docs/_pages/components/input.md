---
layout: base
group: components
title: Text Input & Textarea
permalink: components/input
---

# Input

## Basic Example

This is how `.input` (on `<input>` and `<textarea>`) look like:

```html
<!-- example -->
<div class="m-b-2">
    <input class="input" type="text" />
</div>
<div>
    <textarea class="input"></textarea>
</div>
```

## Modifiers

### Validation

Use the modifiers `.is--positive` and `.is--negative` to visualize input validation:

```html
<!-- example:tabs -->
<div class="m-b-2">
    <input class="input is--positive" type="text" value="some text" />
</div>
<div>
    <input class="input is--negative" type="text" value="some text" />
</div>
```

### State

Inputs are styled accordingly to their attributes `disabled`, `focus` and `readonly`.

<p class="hint hint--negative">While you could also use modifier classes for styling (<code>.input--disabled, input--focus, .input--readonly</code>) in most cases you should not do so since they only affect styling – not behavior!</p>

```html
<!-- example:tabs -->
<div class="m-b-2">
    <input class="input is--focus" type="text" value="attribute focus" focus />
</div>
<div class="m-b-2">
    <input class="input" type="text" value="attribute disabled" disabled />
</div>
<div>
    <input class="input" type="text" value="attribute readonly" readonly />
</div>
```

### Size

Use the modifiers `.input--large` or `input--small` to create inputs with different sizes:

```html
<!-- example:tabs -->
<div class="m-b-2">
    <input class="input input--small" type="text" value="small textinput" />
</div>
<div class="m-b-2">
    <input class="input" type="text" value="default textinput" />
</div>
<div>
    <input class="input input--large" type="text" value="large textinput" />
</div>
```
