---
layout: base
group: elements
title: Form
permalink: elements/form
---

# Form

<p class="intro">All text inputs, textareas, checkboxes, radio buttons and selects get custom styling — no additional classnames needed. However, modifiers for state, color and size are available.</p>

| Styles         | [form.less]({{ pathToSourceFile }}assets/less/elements/form.less), [textInputs.less]({{ pathToSourceFile }}assets/less/elements/textInputs.less), [customCheckbox.less]({{ pathToSourceFile }}assets/less/elements/customCheckbox.less), [customRadiobutton.less]({{ pathToSourceFile }}assets/less/elements/customRadiobutton.less), [customSelect.less]({{ pathToSourceFile }}assets/less/elements/customSelect.less) |
| Script         | [customFormElements.js]({{ pathToSourceFile }}assets/js/elements/customFormElements.js)                             |
| Modifiers      | `.input--large, .input--checked, .input--disabled, .input--focus, .input--readonly, .input--success, .input--error` |

## Elements

### Text Input & Textareas

This is how a `<input type="text">` and `<textarea>` looks like:

```html
<!-- example:tabs -->
<div class="w-1-3">
    <div class="m-b-2">
        <input type="text" />
    </div>
    <div>
        <textarea></textarea>
    </div>
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

`<input type="submit">` elements are styled via the [button element](elements/button.html):

```html
<!-- example:tabs -->
<span class="btn">
    <span>Submit</span>
    <input type="submit" value="Submit" />
</span>
```

## Modifiers

### Validation

Use the modifiers `.input--success` and `.input--error` to visualize input validation:

```html
<!-- example:tabs -->
<div class="w-1-3">
    <div class="m-b-2">
        <input class="input--success" type="text" value="some text" />
    </div>
    <div class="m-b-2">
        <input class="input--error" type="text" value="some text" />
    </div>
    <div class="m-b-2">
        <select class="input--success">
            <option>Dysprosium</option>
            <option>Aluminium</option>
            <option>Calcium</option>
        </select>
    </div>
    <div class="m-b-2">
        <select class="input--error">
            <option>Dysprosium</option>
            <option>Aluminium</option>
            <option>Calcium</option>
        </select>
    </div>
    <div class="m-b-2">
        <input type="checkbox" class="input--error" />
        <input type="checkbox" class="input--success" />
    </div>
    <div>
        <input name="example-2" type="radio" class="input--error" />
        <input name="example-2" type="radio" class="input--success" />
    </div>
</div>
```

### State

You can use the modifiers `.input--focus`, `.input--disabled` and `.input--readonly` to add the styling for the corresponding states.

<p class="hint hint--negative"><b>Chose attributes over modifiers</b>: Since the modifiers only affect styling, not behaviour, always us the correct attributes rather than state modifiers.</p>

```html
<!-- example:tabs -->
<div class="w-1-3">
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
</div>
```

### Size

Use the modifier `.input--large` for all interactive form elements to increase size:

```html
<!-- example:tabs -->
<div class="m-b-2 w-1-3">
    <input class="input--large" type="text" value="some text" />
</div>
<div class="m-b-2 w-1-3">
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