---
layout: base
group: components
title: Text Input & Textarea
permalink: components/input
---

# Text Input & Textarea

## Basic Example

This is how an `.input` and `.textarea` look like:

```html
<!-- example -->
<div class="m-b-2">
    <input class="input" type="text" />
</div>
<div>
    <textarea class="textarea"></textarea>
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
<div class="m-b-2">
    <input class="input is--negative" type="text" value="some text" />
</div>
```

### State

You can use the modifiers `.is--focus`, `.is--disabled` and `.is--readonly` to add the styling for the corresponding states.

<p class="hint hint--negative"><b>Choose attributes over modifiers</b>: Since the modifiers only affect styling, not behaviour, always use the correct attributes rather than state modifiers.</p>

```html
<!-- example:tabs -->
<div class="m-b-2">
    <input class="input is--focus" type="text" value="modifier .is--focus" />
</div>
<div class="m-b-2">
    <input class="input is--disabled" type="text" value="modifier .is--disabled" />
</div>
<div class="m-b-2">
    <input class="input" type="text" value="attribute disabled" disabled />
</div>
<div class="m-b-2">
    <input class="input is--readonly" type="text" value="modifier .is--readonly" />
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
<div class="m-b-2">
    <input class="input input--large" type="text" value="large textinput" />
</div>
```