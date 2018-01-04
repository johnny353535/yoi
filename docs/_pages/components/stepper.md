---
layout: base
group: components
title: Stepper
permalink: components/stepper
---

# Stepper

<div class="m-t-4 m--pos-tr m--m-4 m--m-t-10">
    <span class="badge">documentation incomplete</span>
</div>

<p class="intro">An input-field and control-button combo to de- or increase a numeric value.</p>

## Basic Example

This is how a basic `.stepper` looks like and how you write the markup:

```html
<!-- example -->
<div class="stepper" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>
```

### Submit-Button and Icons

You can add a submit button to any `.stepper`:

```html
<!-- example -->
<div class="stepper" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <input class="stepper__submit" type="submit" value="Add to Cart" />
</div>
```

You can also add icons:

```html
<!-- example -->
<div class="stepper" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <span class="icon"></span>
    <input class="stepper__submit" type="submit" value="Add to Cart" />
</div>
```

It’s also possible to *hide the label text and only show the icon*. Use the [utility class](utilities/visibility.html) `.is--invisible` on the element `.stepper__submit` to do so:

```html
<!-- example -->
<div class="stepper" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-026" yoi-icon />
    <input class="stepper__submit is--invisible" type="submit" value="Add to Cart" />
</div>
```

## Modifiers

### Light

Add the modifier `.stepper--light` to render a *lighter*, more subtle version:

```html
<!-- example -->
<div class="stepper stepper--light" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>
```

### Large / Touch-friendly

Add the modifier `.stepper--touch` to render a version with larger, *touch-friendly* buttons:

```html
<!-- example -->
<div class="stepper stepper--touch" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>
```

### Combining Modifiers

As you’d expect, you can combine the modifiers to render a *light* and *touch-friendly* stepper:

```html
<!-- example -->
<div class="stepper stepper--light stepper--touch" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>
```

## Actions

### Stepper.countUp

Pick a `.stepper` and increase the value by 1:

```html
<!-- example:tabs -->
<div id="exampleStepper-1" class="stepper val-t" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>
<button class="btn btn--large val-t m-l-2" yoi-action="Stepper.countUp:#exampleStepper-1;">Count Up</button>
```

### Stepper.countDown

Pick a `.stepper` and decrease the value by 1:

```html
<!-- example:tabs -->
<div id="exampleStepper-2" class="stepper val-t" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="10" />
</div>
<button class="btn btn--large val-t m-l-2" yoi-action="Stepper.countDown:#exampleStepper-2;">Count Down</button>
```

### Stepper.reset

Pick a `.stepper` and reset the value to 1:

```html
<!-- example:tabs -->
<div id="exampleStepper-3" class="stepper val-t" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="10" />
</div>
<button class="btn btn--large val-t m-l-2" yoi-action="Stepper.reset:#exampleStepper-3;">Reset</button>
```

### Stepper.clear

Pick a `.stepper` and reset the value to 0:

```html
<!-- example:tabs -->
<div id="exampleStepper-4" class="stepper val-t" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="10" />
</div>
<button class="btn btn--large val-t m-l-2" yoi-action="Stepper.clear:#exampleStepper-4;">Clear</button>
```

### Stepper.setTo

Pick a `.stepper` and set the value to a given input:

```html
<!-- example:tabs -->
<div id="exampleStepper-5" class="stepper val-t" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="10" />
</div>
<button class="btn btn--large val-t m-l-2" yoi-action="Stepper.setTo:#exampleStepper-5, 42;">Set to 42</button>
```

### Custom Events

| event name            | fires when …                          |
| --------------------- | ------------------------------------- |
| `yoi-stepper-up`      | fired by countUp()                    |
| `yoi-stepper-down`    | fired by countDown()                  |
| `yoi-stepper-reset`   | fired by reset()                      |
| `yoi-stepper-clear`   | fired by clear()                      |
| `yoi-stepper-change`  | fired by reset(), clear() and setTo() |
| `yoi-stepper-valid`   | fired by countUp() and countDown()    |
| `yoi-stepper-invalid` | fired by countUp() and countDown()    |

Try the example below and watch the custom events, printed to the [log element](components/log.html):

```html
<!-- example:tabs -->
<div id="myLog" class="log log--light m-b-4" yoi-log>
    <div class="log__body">
        <p>Listening</p>
    </div>
</div>
<div id="myStepper" class="stepper val-t" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>
<div class="btns d-inlineblock val-t m-l-2">
    <button id="exampleButton-6" class="btn btn--large val-t">Reset</button>
    <button id="exampleButton-7" class="btn btn--large val-t">Clear</button>
    <button id="exampleButton-8" class="btn btn--large val-t">Set to 42</button>
</div>
<script>
    $('#myStepper').on('yoi-stepper-up', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-stepper-up');
    });
    $('#myStepper').on('yoi-stepper-down', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-stepper-down');
    });
    $('#myStepper').on('yoi-stepper-reset', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-stepper-reset');
    });
    $('#myStepper').on('yoi-stepper-change', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-stepper-change');
    });
    $('#myStepper').on('yoi-stepper-clear', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-stepper-clear');
    });
    $('#myStepper').on('yoi-stepper-valid', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-stepper-valid');
    });
    $('#myStepper').on('yoi-stepper-invalid', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-stepper-invalid');
    });
    $('#exampleButton-6').on('click', function() {
        YOI.component.Stepper.reset($('#myStepper'));
    });
    $('#exampleButton-7').on('click', function() {
        YOI.component.Stepper.clear($('#myStepper'));
    });
    $('#exampleButton-8').on('click', function() {
        YOI.component.Stepper.setTo($('#myStepper'), 42);
    });
</script>
```
