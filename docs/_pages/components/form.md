---
layout: base
group: components
title: Form
permalink: components/form
---

# Form

<p class="intro">All text inputs, textareas, checkboxes, radio buttons and selects get custom styling — no additional classnames needed. However, modifiers for state, color and size are available.</p>

## Elements

### Text Input & Textareas

This is how a `<input type="text">` and `<textarea>` looks like:

```html
<!-- example:tabs -->
<div class="m-b-2">
    <input type="text" />
</div>
<div>
    <textarea></textarea>
</div>
```

### Selects

This is how a `<select>` looks like:

```html
<!-- example:tabs -->
<select>
    <option>Dysprosium</option>
    <option>Aluminium</option>
    <option>Calcium</option>
</select>
```

### Checkboxes

This is how a `<input type="checkbox">` looks like:

```html
<!-- example:tabs -->
<input type="checkbox" />
<input type="checkbox" />
```

### Radio Buttons

This is how a `<input type="radio">` looks like:

```html
<!-- example:tabs -->
<input name="example-1" type="radio" />
<input name="example-1" type="radio" />
```

### Submit Buttons

`<input type="submit">` elements are styled via the [button element](components/button.html):

```html
<!-- example:tabs -->
<span class="btn">
    <span>Submit</span>
    <input type="submit" value="Submit" />
</span>
```

## Modifiers

### Validation

Use the modifiers `.input--positive` and `.input--negative` to visualize input validation:

```html
<!-- example:tabs -->
<div class="m-b-2">
    <input class="input--positive" type="text" value="some text" />
</div>
<div class="m-b-2">
    <input class="input--negative" type="text" value="some text" />
</div>
<div class="m-b-2">
    <select class="input--positive">
        <option>Dysprosium</option>
        <option>Aluminium</option>
        <option>Calcium</option>
    </select>
</div>
<div class="m-b-2">
    <select class="input--negative">
        <option>Dysprosium</option>
        <option>Aluminium</option>
        <option>Calcium</option>
    </select>
</div>
<div class="m-b-2">
    <input type="checkbox" class="input--negative" />
    <input type="checkbox" class="input--positive" />
</div>
<div>
    <input name="example-2" type="radio" class="input--negative" />
    <input name="example-2" type="radio" class="input--positive" />
</div>
```

### State

You can use the modifiers `.input--focus`, `.input--disabled` and `.input--readonly` to add the styling for the corresponding states.

<p class="hint hint--negative"><b>Chose attributes over modifiers</b>: Since the modifiers only affect styling, not behaviour, always us the correct attributes rather than state modifiers.</p>

```html
<!-- example:tabs -->
<div class="m-b-2">
    <input class="input--focus" type="text" value="modifier .input--focus" />
</div>
<div class="m-b-2">
    <input class="input--disabled" type="text" value="modifier .input--disabled" />
</div>
<div class="m-b-2">
    <input type="text" value="attribute disabled" disabled />
</div>
<div class="m-b-2">
    <input class="input--readonly" type="text" value="modifier .input--readonly" />
</div>
<div>
    <input type="text" value="attribute readonly" readonly />
</div>
```

### Size

Use the modifier `.input--large` for all interactive form elements to increase size:

```html
<!-- example:tabs -->
<div class="m-b-2">
    <input class="input--large" type="text" value="some text" />
</div>
<div class="m-b-2">
    <select class="input--large">
        <option>Dysprosium</option>
        <option>Aluminium</option>
        <option>Calcium</option>
    </select>
</div>
<div class="m-b-2">
    <input type="checkbox" class="input--large" />
    <input type="checkbox" class="input--large" />
</div>
<div class="m-b-2">
    <input name="example-3" type="radio" class="input--large" />
    <input name="example-3" type="radio" class="input--large" />
</div>
```