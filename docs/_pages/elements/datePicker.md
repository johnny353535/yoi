---
layout: base
group: elements
title: Date Picker
permalink: elements/datepicker
---

## Date Picker
Use this element to provide an easy way to enter dates into input fields.

| Styles         | [datePicker.less]({{ pathToSourceFile }}assets/less/elements/datePicker.less) |
| Script         | [datePicker.js]({{ pathToSourceFile }}assets/js/elements/datePicker.js)       |
| Base CSS-Class | `.datePicker`                                                                 |
| Modifiers      | `-`                                                                           |

<p class="hint hint--negative"><strong>The date picker is designed for use on desktop browsers.</strong> On mobile browsers it makes more sense to use the native input widgets.</p>

### Basic Example
Add the attribute `yoi-datepicker` to any `<input type="date" />` to make it show a date picker on focus:

```html
<!-- example -->
<form>
    <input class="w-20" type="date" yoi-datepicker />
</form>
```

### Set an Initial Date
 By default, the date picker *will start with the current date*. However, you can add a date to the input field via markup:

```html
<!-- example -->
<form>
    <input class="w-20" type="date" yoi-datepicker="year:2010; month:10; day:5;" />
</form>
```
#### Fallback
If you leave out a parameter, the date picker will fall back to the current date. Eg. if you *leave out the year*, the date picker will assume you wish to initialize it with the *current year*. The same goes for month and day.

```html
<!-- example -->
<form>
    <input class="w-20" type="date" yoi-datepicker="month:10; day:10;" />
</form>
```

### Positioning
By default, the date picker appears *below the date input field*. If the available space below the input is too low, the date picker appears *above the input field*. Try it out by scrolling the page so the input filed reaches the bottom of the browser window:

```html
<!-- example:tabs -->
<form>
    <input class="input w-20" type="date" yoi-datepicker />
</form>
```

### Large Input Fields
The date picker works just fine with both *large* input fields.

```html
<!-- example:tabs -->
<form>
    <input class="input--large w-20" type="date" yoi-datepicker />
</form>
```

### JavaScript-API

#### initialize()

On each page load, all correctly formatted `<input type="date"/>` fields marked with `yoi-datepicker` get initialized. However, if you dynamically add a new elements to the page, call this function from your JavaScript to select any `<input type="date" />` and attach a `.datePicker` to it.

```js
YOI.element.DatePicker.initialize()

/**
 *  @param {jQuery dom object} $datepicker
 *  @param {object}            options
 *
 *  Available options:
 *
 *  @option {string} year  - initial year (ISO 8601)  - default: current year
 *  @option {string} month - initial month (ISO 8601) - default: current month
 *  @option {string} day   - initial day (ISO 8601)   - default: current day
 */
```

#### hideAll()

Call this function from your JavaScript to hide all currently visible `.datePicker`-instances.

```js
YOI.element.DatePicker.hideAll()

/**
 *  Hide all visible date pickers.
 *  No additional parameters.
 */
````

#### JavaScript Custom Events

Each `.datePicker` can fire two custom events your script can listen to:

```
yoi-datepicker:show // datePicker was shown
yoi-datepicker:hide // dataPicker was hidden
```