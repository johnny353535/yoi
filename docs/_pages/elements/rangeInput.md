---
layout: base
group: elements
title: RangeInput
permalink: elements/rangeinput
---

# RangeInput

<p class="intro">Use this element to create a custom range input.</p>

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

#### set()

Pick a `.rangeInput` and set the range to the provided value:

```js
/*
 * @param {jQuery dom object} $rangeInput - the range input
 * @param {number}            absMin      - absolute min value
 * @param {number}            absMax      - absolute max value
 * @param {number}            min         - min value
 * @param {number}            max         - max value
 */

// example call

YOI.element.RangeInput.set($('#myRangeInput'), 0, 100, 12, 33);
```

#### reset()

Pick a `.rangeInput` and reset the range to absolute min and absolute max values:

```js
/*
 *  @param {jQuery dom object} $rangeInput - the range input
 */

// example call

YOI.element.RangeInput.reset($('#myRangeInput'));
```

#### Accessing Values

To access the current values from a `.rangeInput`, listen to the `yoi-rangeInput-change` event and read the keys `min` and `max` from the `.data().props` object:

```html
<!-- example:tabs -->
<div class="ff-mono fs-15">
    <p id="minMonitor">min: 0</p>
    <p id="maxMonitor">max: 100</p>
</div>
<div id="myRangeInput" class="rangeInput m-4" yoi-rangeinput></div>
<script>
    $('#myRangeInput').on('yoi-rangeinput-change', function() {
        $('#minMonitor').text('min = ' + $(this).data().props.min);
        $('#maxMonitor').text('max = ' + $(this).data().props.max);
    });
</script>
```

### Custom Events

`.rangeInput` fires custom events your script can listen to:

| event name              | fires when …                                          |
| ----------------------- | ----------------------------------------------------- |
| `yoi-rangeinput-change` | knob moved or YOI.element.RangeInput.set() got called |
| `yoi-rangeinput-reset`  | YOI.element.RangeInput.reset() got called             |

## Fallback

To provide a usable interface when JavaScript is not available, place the markup for your fallback (eg. form fields) inside the `.rangeInput` element. Use the [utility](utilities/js_fallback.html) `.js-fallback` to hide the fallback markup when JavaScript is available:

```html
<!-- example -->
<div class="rangeInput" yoi-rangeinput>
    <form class="js-fallback">
        <label>
            Min: <input type="number" value="0" />
        </label>
        <label>
            Max: <input type="number" value="10" />
        </label>
    </form>
</div>
```