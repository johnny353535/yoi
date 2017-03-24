---
layout: base
title: Stepper
permalink: elements/stepper
---

## Stepper
This element combines a (numeric) input-field with control buttons to de- or increase the input value and an (optional) submit-button. It’s mainly designed to add a certain amount of items to the shopping cart.

| Less-File      | [stepper.less]({{ pathToSourceFile }}assets/less/elements/stepper.less) |
| JS-File        | [stepper.js]({{ pathToSourceFile }}assets/js/elements/stepper.js)       |
| Base CSS-Class | `.stepper`                                                              |
| Modifiers      | `.stepper--light, .stepper--touch`                                      |

### Most Basic Example
The most basic variant of this element is simply a `<div>` with the class name `stepper` and an input element inside with the class name `stepper__input`.

```html
<div class="stepper" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>
``

### Enhanced With JavaScript
Why not use a simple text input instead? Because this element is enhanced via JavaScript. The script injects control buttons (de- or increase the input value) and adds basic input validation. Try entering any non-integer into the input to see the validation in action.

The example below shows the **resulting code after DOM manipulation**:

```html
<div class="stepper" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>
```

### Variations / Modifiers
`stepper` may be used with icons, text labels or any combination of these elements. There a three modifiers available: `stepper--light` (renders a white variant) and `stepper--touch` (renders larger, touch-friendly buttons).

**Click »code«** on the upper right border of the block below **to reveal the code for all examples**.

```html
<div class="stepper" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>

<div class="stepper" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <span class="icon"></span>
    <input class="stepper__submit stepper__submit--hidden" type="submit" value="In den Warenkorb" />
</div>

<div class="stepper" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <input class="stepper__submit" type="submit" value="In den Warenkorb" />
</div>

<div class="stepper" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <span class="icon"></span>
    <input class="stepper__submit" type="submit" value="In den Warenkorb" />
</div>

<div class="stepper stepper--light" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>

<div class="stepper stepper--light" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <span class="icon"></span>
    <input class="stepper__submit stepper__submit--hidden" type="submit" value="In den Warenkorb" />
</div>

<div class="stepper stepper--light" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <input class="stepper__submit" type="submit" value="In den Warenkorb" />
</div>

<div class="stepper stepper--light" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <span class="icon"></span>
    <input class="stepper__submit" type="submit" value="In den Warenkorb" />
</div>

<div class="stepper stepper--touch" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>

<div class="stepper stepper--touch" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <span class="icon"></span>
    <input class="stepper__submit stepper__submit--hidden" type="submit" value="In den Warenkorb" />
</div>

<div class="stepper stepper--touch" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <input class="stepper__submit" type="submit" value="In den Warenkorb" />
</div>

<div class="stepper stepper--touch" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <span class="icon"></span>
    <input class="stepper__submit" type="submit" value="In den Warenkorb" />
</div>

<div class="stepper stepper--touch stepper--light" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
</div>

<div class="stepper stepper--touch stepper--light" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <span class="icon"></span>
    <input class="stepper__submit stepper__submit--hidden" type="submit" value="In den Warenkorb" />
</div>

<div class="stepper stepper--touch stepper--light" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <input class="stepper__submit" type="submit" value="In den Warenkorb" />
</div>

<div class="stepper stepper--touch stepper--light" yoi-stepper>
    <input class="stepper__input" type="text" maxlength="3" value="1" />
    <span class="icon"></span>
    <input class="stepper__submit" type="submit" value="In den Warenkorb" />
</div>
```