---
layout: base
group: elements
title: RangeInput
permalink: elements/rangeinput
---

# RangeInput

Use this element to create a custom range input.

| Styles         | [rangeInput.less]({{ pathToSourceFile }}assets/less/elements/rangeInput.less) |
| Script         | [rangeInput.js]({{ pathToSourceFile }}assets/js/elements/rangeInput.js)       |
| Script Hook    | `yoi-rangeinput`                                                              |
| Base CSS-Class | `.rangeInput`                                                                 |

## Basic Example

This is how a basic `.rangeInput` looks like and how you write the markup:

```html
<!-- example -->
<div id="foo" class="rangeInput m-4" yoi-rangeinput></div>
```

## JavaScript-API

### Hook

The hook `yoi-rangeinput` accepts parameters to control the behaviour. The following options are available:

| key    | description                                                                  |
| ------ | ---------------------------------------------------------------------------- |
| absMin | absolute minimun value                                                       |
| absMax | absolute maximum value                                                       |
| min    | initial minimum value                                                        |
| max    | initial maximum value                                                        |
| unit   | a symbol for the unit (“$”, “mm”, etc.) as postfix for `.rangeInput__label`) |

#### Absolute Min and Max Values

Set the absolute minimum and maximum values with `absMin` and `absMax`:

```html
<!-- example -->
<div id="foo" class="rangeInput m-4" yoi-rangeinput="absMin:20; absMax:80;"></div>
```

#### Initial Min and Max Values

Set the start values for the minimum and maximum threshold:

```html
<!-- example -->
<div id="foo" class="rangeInput m-4" yoi-rangeinput="min:20; max:80;"></div>
```

#### Unit

Set the unit to any (short) string – eg. “€”, “$” or “mm”: 

```html
<!-- example -->
<div id="foo" class="rangeInput m-4" yoi-rangeinput="unit:mm"></div>
```


### Methods

...

#### set()

...

#### reset()

...

#### Accessing Data


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

### Custom Events

:change
:reset

## Fallback

