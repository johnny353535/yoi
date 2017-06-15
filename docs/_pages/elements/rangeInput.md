---
layout: base
group: elements
title: RangeInput
permalink: elements/rangeinput
---

# RangeInput

Use this element to create a custom range input.

## Basic Example

This is how a basic `.rangeInput` looks like and how you write the markup:

```html
<!-- example -->
<div id="foo" class="rangeInput m-4" yoi-rangeinput></div>
```

## Options

```html
<!-- example -->
<div id="bar" class="rangeInput m-4" yoi-rangeinput></div>
```

## JavaScript-API

...

### set()

...

### reset()

...

### Accessing Data


```html
<!-- example:tabs -->
<div class="ff-mono fs-15">
    <p id="minMonitor">min: 0</p>
    <p id="maxMonitor">max: 100</p>
</div>
<div id="myRangeInput" class="rangeInput m-4" yoi-rangeinput></div>
<script>
    $('#myRangeInput').on('yoi-rangeinput:change', function() {
        $('#minMonitor').text('min = ' + $(this).data().props.min);
        $('#maxMonitor').text('max = ' + $(this).data().props.max);
    });
</script>
```

## Custom Events

:change
:reset

## Fallback

