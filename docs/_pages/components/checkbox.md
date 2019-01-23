---
layout: base
group: components
title: Checkbox
permalink: components/checkbox
---

# Checkbox

## Basic Example

This is how a `<input type="checkbox">` looks like and how you write the markup:

```html
<!-- example -->
<input type="checkbox" checked yoi-checkbox />
<input type="checkbox" yoi-checkbox />
<input type="checkbox" disabled yoi-checkbox />
```

## Modifiers

### Validation

Use the modifiers `.is--positive` and `.is--negative` to visualize checkbox validation:

```html
<!-- example:tabs -->
<div>
    <input type="checkbox" class="is--negative" yoi-checkbox />
    <input type="checkbox" class="is--positive" yoi-checkbox />
</div>
```

### Size

Use the modifier `.checkbox--large` to render a large checkbox:

```html
<!-- example:tabs -->
<div>
    <input type="checkbox" class="checkbox--large" checked yoi-checkbox />
    <input type="checkbox" class="checkbox--large" yoi-checkbox />
    <input type="checkbox" class="checkbox--large" disabled yoi-checkbox />
</div>
```