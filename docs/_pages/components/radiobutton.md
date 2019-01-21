---
layout: base
group: components
title: Radio Button
permalink: components/radiobutton
---

# Radio Button

## Basic Example

This is how a `<input type="radio">` looks like:

```html
<!-- example:tabs -->
<input name="example-1" type="radio" checked yoi-radiobutton />
<input name="example-1" type="radio" yoi-radiobutton />
<input name="example-1" type="radio" disabled yoi-radiobutton />
```

## Modifiers

### Validation

Use the modifiers `.is--positive` and `.is--negative` to visualize input validation:

```html
<!-- example:tabs -->
<div>
    <input name="example-2" type="radio" class="is--negative" yoi-radiobutton />
    <input name="example-2" type="radio" class="is--positive" yoi-radiobutton />
</div>
```

### Size

Use the modifier `.radioButton--large` to render a large radio button:

```html
<!-- example:tabs -->
<div class="m-b-2">
    <input name="example-3" type="radio" class="radioButton--large" checked yoi-radiobutton />
    <input name="example-3" type="radio" class="radioButton--large" yoi-radiobutton />
    <input name="example-3" type="radio" class="radioButton--large" disabled yoi-radiobutton />
</div>
```