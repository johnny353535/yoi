---
layout: base
group: components
title: MaxChars
permalink: components/maxchars
---

# MaxChars

<div class="m-t-4 m--pos-tr m--m-4 m--m-t-10">
    <span class="badge">documentation incomplete</span>
</div>

<p class="intro">Limits the maximum characters for a textarea or text input and creates a display of the remaining characters.</p>

## Basic Example

Add the attribute `yoi-maxchars` to a `<input type="text">` or `<textarea>`. The input element (or textarea) must have a maxlength value. Add the css-selector for the element displaying the remaining characters as a parameter. Now the text input and the display element are linked, whenever you type, the display updates the number of remaining characters:

```html
<!-- example -->
<input type="text" maxlength="20" yoi-maxchars="display:#display-1;" />
<p id="display-1" class="m-t-2"></p>
```

## Advanced Examples

This is how a carefully styled textarea with `yoi-maxchars` can look like and how you write the markup:

```html
<!-- example:tabs -->
<textarea class="br-bl-0 br-br-0" rows="" cols="" maxlength="200" yoi-maxchars="display:#display-2; errorClass:c-red-10;"></textarea>
<div class="br-bl br-br b-l b-r b-b p-lr-2 p-tb-1 c-main-12">
    <span class="js-only"><b id="display-2"></b> characters left</span>
    <span class="js-fallback">Only 200 characters allowed</span>
</div>
```

This is how a carefully styled text input with `yoi-maxchars` can look like and how you write the markup:

```html
<!-- example:tabs -->
<div class="w-20">
    <input type="text" class="input--large br-bl-0 br-br-0" maxlength="20" yoi-maxchars="display:#display-3; errorClass:c-red-10;" />
    <div class="br-bl br-br b-l b-r b-b p-lr-2 p-tb-1 c-main-12">
        <span class="js-only"><b id="display-3"></b> characters left</span>
        <span class="js-fallback">Only 200 characters allowed</span>
    </div>
</div>
```

## JavaScript-API

### Attributes

The attribute `yoi-maxchars` accepts the following parameters to control the behaviour:

| key        | description                                                       |
| ---------- | ----------------------------------------------------------------- |
| maxLength  | the maximum allowed input character length                        |
| display    | the DOM-element to display how many characters are left           |
| errorClass | a CSS-className applied to the display if input exceeds maxLength |

#### Character Limit

Set he maximum character limit with the parameter `maxlength`:

```html
<!-- example -->
<input type="text" yoi-maxchars="display:#display-4; maxLength:12;" />
<p class="m-t-2" id="display-4"></p>
```

<p class="hint hint--negative"><b>Hirarchy:</b> The value from the maxlenght-attribute overrides the value from the maxlenght-parameter.</p>

#### Display

Reference any element on the page to display the remaining characters count:

```html
<!-- example -->
<input type="text" maxlength="20" yoi-maxchars="display:#display-5;" />
<p class="badge badge--large m-t-2" id="display-5"></p>
```

#### Error Styling

When the limit is surpassed, this css-class is added to the display element (eg. to add red text color):

```html
<!-- example:tabs -->
<input id="foo" type="text" maxlength="20" yoi-maxchars="display:#display-6; errorClass:c-red-10" />
<p class="m-t-2" id="display-6"></p>
<button class="btn btn--large m-t-2" id="bar">Reset</button>
<script>
    $('#bar').on('click', function() {
        YOI.component.MaxChars.reset($('#foo'));
    });
</script>
```

### Custom Events

`yoi-maxchars` fires custom events your script can listen to:

| event name            | fires when …                            |
| --------------------- | --------------------------------------- |
| `yoi-maxchars:exceed` | the character limit got surpassed       |
| `yoi-maxchars:reset`  | YOI.component.MaxChars.reset() got called |
