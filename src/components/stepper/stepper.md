---
layout: base
group: components
title: Stepper
permalink: components/stepper
---

# Stepper

<p class="intro">An input-field and control-button combo to de- or increase a numeric value.</p>

## Basic Example

This is how a basic `.stepper` looks like and how you write the markup:

```html
<!-- example -->
<div class="stepper" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>
```

### Submit-Button

You can add a submit button to any `.stepper`:

```html
<!-- example -->
<div class="stepper" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <input class="stepper__submit" type="submit" value="Add to Cart" />
</div>
```

## Modifiers

### Large / Touch-friendly

Add the modifier `.stepper--touch` to render a version with larger, *touch-friendly* buttons:

```html
<!-- example -->
<div class="stepper stepper--touch" yoi-stepper>
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
<button class="button button--large val-t m-l-2" yoi-action="Stepper.countUp:#exampleStepper-1;">Count Up</button>
```

### Stepper.countDown

Pick a `.stepper` and decrease the value by 1:

```html
<!-- example:tabs -->
<div id="exampleStepper-2" class="stepper val-t" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="10" />
</div>
<button class="button button--large val-t m-l-2" yoi-action="Stepper.countDown:#exampleStepper-2;">Count Down</button>
```

### Stepper.reset

Pick a `.stepper` and reset it to it’s initial value:

```html
<!-- example:tabs -->
<div id="exampleStepper-3" class="stepper val-t" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="666" />
</div>
<button class="button button--large val-t m-l-2" yoi-action="Stepper.reset:#exampleStepper-3;">Reset</button>
```

### Stepper.clear

Pick a `.stepper` and reset the value to 0:

```html
<!-- example:tabs -->
<div id="exampleStepper-4" class="stepper val-t" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="10" />
</div>
<button class="button button--large val-t m-l-2" yoi-action="Stepper.clear:#exampleStepper-4;">Clear</button>
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
