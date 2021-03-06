---
layout: base
group: components
title: Radio Button
permalink: components/radiobutton
---

# Radio Button

## Basic Example

This is how a `<input type="radio">` looks like and how you write the markup:

```html
<!-- example -->
<input name="example-1" type="radio" checked yoi-radiobutton />
<input name="example-1" type="radio" yoi-radiobutton />
<input name="example-1" type="radio" disabled yoi-radiobutton />
```

## Modifiers

### Validation

Use the modifiers `.is--positive` and `.is--negative` to visualize radiobutton validation:

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
<div>
    <input name="example-3" type="radio" class="radioButton--large" checked yoi-radiobutton />
    <input name="example-3" type="radio" class="radioButton--large" yoi-radiobutton />
    <input name="example-3" type="radio" class="radioButton--large" disabled yoi-radiobutton />
</div>
```