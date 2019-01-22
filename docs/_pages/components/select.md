---
layout: base
group: components
title: Select
permalink: components/select
---

# Select

## Basic Example

This is how a `<select>` looks like and how your write the markup:

```html
<!-- example -->
<select yoi-select>
    <option>Dysprosium</option>
    <option>Aluminium</option>
    <option>Calcium</option>
</select>
```

## Modifiers

### Validation

Use the modifiers `.is--positive` and `.is--negative` to visualize select validation:

```html
<!-- example:tabs -->
<div class="m-b-2">
    <select class="is--positive" yoi-select>
        <option>Dysprosium</option>
        <option>Aluminium</option>
        <option>Calcium</option>
    </select>
</div>
<div class="m-b-2">
    <select class="is--negative" yoi-select>
        <option>Dysprosium</option>
        <option>Aluminium</option>
        <option>Calcium</option>
    </select>
</div>
```

### Size

Use the modifiers `.select--large` or `select--small` to create selects with different sizes:

```html
<!-- example:tabs -->
<div class="m-b-2">
    <select class="select--small" yoi-select>
        <option>Dysprosium</option>
        <option>Aluminium</option>
        <option>Calcium</option>
    </select>
</div>
<div class="m-b-2">
    <select yoi-select>
        <option>Dysprosium</option>
        <option>Aluminium</option>
        <option>Calcium</option>
    </select>
</div>
<div class="m-b-2">
    <select class="select--large" yoi-select>
        <option>Dysprosium</option>
        <option>Aluminium</option>
        <option>Calcium</option>
    </select>
</div>
```