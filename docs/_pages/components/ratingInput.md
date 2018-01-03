---
layout: base
group: components
title: RatingInput
permalink: components/ratinginput
---

# RatingInput

<div class="m-t-4 m--pos-tr m--m-4 m--m-t-10">
    <span class="badge badge--negative">incomplete</span>
</div>

<p class="intro">A compact 5-star rating widget.</p>

## Basic Example

This is how a basic `.ratingInput` looks like and how you write the markup:

```html
<!-- example -->
<div class="ratingInput" yoi-ratinginput></div>
```

_Hover_ over the stars and _click_ to set the rating.

<p class="hint hint--negative"><b>For Desktop only:</b> <code>.ratingInput</code> was designed for desktop browsers with a mouse a input device.</p>

## Modifiers

### Size

Use the modifier `.ratingInput--large` to create a large `.ratingInput`:

```html
<!-- example -->
<div class="ratingInput ratingInput--large" yoi-ratinginput></div>
```

### Score

Use the modifiers `.ratingInput--rated-1` to `.ratingInput--rated-5` to an initial rating score:

```html
<!-- example -->
<div class="ratingInput ratingInput--rated-3" yoi-ratinginput></div>
```

### State

.ratinginput--locked

## JavaScript-API

### Attributes

| key    | description                                                                                |
| ------ | ------------------------------------------------------------------------------------------ |
| uid    | The unique identifier for each element - useful to identify submitted data on the backend. |
| locked | Set "true" to "lock" the element and prevent editing.                                      |
| score  | A number between 0 (not rated) and 5 (highest rating score).                               |

### Methods

#### lock()

Pick a `.ratingInput` and “lock” it:

```html
<!-- example:tabs -->
<div id="exampleRatingInput-1" class="ratingInput" yoi-ratinginput></div>
<p>
    <button id="exampleButton-1" class="btn btn--medium m-t-2">Lock</button>
</p>
<script>
    $('#exampleButton-1').on('click', function() {
        YOI.component.RatingInput.lock($('#exampleRatingInput-1'));
    });
</script>
```

#### unlock()

Pick a `.ratingInput` and “unlock” it:

```html
<!-- example:tabs -->
<div id="exampleRatingInput-2" class="ratingInput ratingInput--locked" yoi-ratinginput></div>
<p>
    <button id="exampleButton-2" class="btn btn--medium m-t-2">Unlock</button>
</p>
<script>
    $('#exampleButton-2').on('click', function() {
        YOI.component.RatingInput.unlock($('#exampleRatingInput-2'));
    });
</script>
```

#### set()

Pick a `.ratingInput` and set it to a given score (1–5):

```html
<!-- example:tabs -->
<div id="exampleRatingInput-3" class="ratingInput" yoi-ratinginput></div>
<p>
    <button id="exampleButton-3" class="btn btn--medium m-t-2">Set Score to 3</button>
</p>
<script>
    $('#exampleButton-3').on('click', function() {
        YOI.component.RatingInput.set($('#exampleRatingInput-3'), 3);
    });
</script>
```

### Custom Events

`.ratingInput` fires custom events your script can listen to:

| event name          | fires when …                 |
| ------------------- | ---------------------------- |
| `yoi-rating:lock`   | `.ratingInput` is locked     |
| `yoi-rating:unlock` | `.ratingInput` is unlocked   |
| `yoi-rating:change` | `.ratingInput` score changed |

### Fallback

To provide a usable fallback when JavaScript is not available, write your fallback markup (eg. e `<select>` element) inside the `.ratingInput` element and add the [utility class](utilities/js_fallback.html) `.js-fallback`:

```html
<!-- example -->
<div class="ratingInput" yoi-ratinginput>
    <select class="js-fallback">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
    </select>
</div>
```