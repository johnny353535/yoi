---
layout: base
group: components
title: Checkbox
permalink: components/checkbox
---

# Checkbox

## Basic Example

This is how a `.checkbox` looks like:

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
<div class="m-b-2">
    <input type="checkbox" class="is--negative" yoi-checkbox />
    <input type="checkbox" class="is--positive" yoi-checkbox />
</div>
```

### Size

Use the modifier `.checkbox--large` to render a large checkbox:

```html
<!-- example:tabs -->
<div class="m-b-2">
    <input type="checkbox" class="checkbox--large" checked yoi-checkbox />
    <input type="checkbox" class="checkbox--large" yoi-checkbox />
    <input type="checkbox" class="checkbox--large" disabled yoi-checkbox />
</div>
```