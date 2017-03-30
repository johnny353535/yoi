---
layout: base
group: elements
title: Note
permalink: elements/note
---

## Note
Use notes to display system messages, eg. for form validation, status messages (added to cart), and so on. Notes can be *dismissable*, they come in two text sizes and they can contain an icon.

|                |                                                                                                                                                                                                          |
| -              | -                                                                                                                                                                                                        |
| Less-File      | [note.less]({{ pathToSourceFile }}assets/less/elements/note.less)                                                                                                                                        |
| JS-File        | [dismiss.js]({{ pathToSourceFile }}assets/js/modules/dismiss.js)                                                                                                                                         |
| Base CSS-Class | `.note`                                                                                                                                                                                                  |
| Modifiers      | `.note--attention, .note--dark, .note--subtle, .note--error, .note--fullwidth, .note--hasIcon-xxx, .note--large, .note--light, .note--negative, .note--positive, .note--prescription, .note--success` |

### Simple Note

```html
<div class="note">
    <h3 class="note__headline">Headline</h3>
    <div class="note__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
    </div>
</div>
```

### Basic Example
If you wish to make a `.note` *dismissable*, use the `yoi-dismissable` hook to make a close button appear in the upper right corner.

```html
<div class="note note--attention" yoi-dismissable>
    <h3 class="note__headline">Headline</h3>
    <div class="note__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
    </div>
</div>
```

### Large text
Use the modifier `.note--large` to increase the font size.

```html
<div class="note note--large" yoi-dismissable>
    <h3 class="note__headline">Headline</h3>
    <div class="note__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
    </div>
</div>
```

### Icons

```html
<div class="note note--large">
    <span class="icon"></span>
    <div class="note__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
    </div>
</div>

<div class="note note--error note--large">
    <span class="icon"></span>
    <h3 class="note__headline">Headline</h3>
    <div class="note__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
    </div>
</div>

<div class="note note--success note--large">
    <span class="icon"></span>
    <h3 class="note__headline">Headline</h3>
    <div class="note__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
    </div>
</div>
```

### Colors
Notes are available in **different color themes**. Weather you wish to display an error, a success message or just a subtle note, you can choose from the following options:

```html
<div class="note note--large" yoi-dismissable>
    <div class="note__body">
        <p>default styling</p>
    </div>
</div>

<div class="note note--attention note--large" yoi-dismissable>
    <div class="note__body">
        <p>.note--<strong>attention</strong></p>
    </div>
</div>

<div class="note note--dark note--large" yoi-dismissable>
    <div class="note__body">
        <p>.note--<strong>dark</strong></p>
    </div>
</div>

<div class="note note--subtle note--large" yoi-dismissable>
    <div class="note__body">
        <p>.note--<strong>subtle</strong></p>
    </div>
</div>

<div class="note note--error note--large" yoi-dismissable>
    <div class="note__body">
        <p>.note--<strong>error</strong></p>
    </div>
</div>

<div class="note note--negative note--large" yoi-dismissable>
    <div class="note__body">
        <p>.note--<strong>negative</strong></p>
    </div>
</div>

<div class="note note--light note--large" yoi-dismissable>
    <div class="note__body">
        <p>.note--<strong>light</strong></p>
    </div>
</div>

<div class="note note--success note--large" yoi-dismissable>
    <div class="note__body">
        <p>.note--<strong>success</strong></p>
    </div>
</div>

<div class="note note--positive note--large" yoi-dismissable>
    <div class="note__body">
        <p>.note--<strong>positive</strong></p>
    </div>
</div>
```

### Grouped Notes
**Group notes** inside a container element with the css class name `.notes`. For example to group validation messages.

```html
<div class="notes">
    <div class="note note--positive note--large" yoi-dismissable>
        <div class="note__body">
            <p>The first data you supplied is <strong>valid</strong>.</p>
        </div>
    </div>
    <div class="note note--negative note--large" yoi-dismissable>
        <div class="note__body">
            <p>The second data you supplied is <strong>not valid</strong>.</p>
        </div>
    </div>
    <div class="note note--positive note--large" yoi-dismissable>
        <div class="note__body">
            <p>The third data you supplied is <strong>valid</strong>.</p>
        </div>
    </div>
</div>
```

### Notes at Full Viewport Width
Use the modifier class `.note--fullWidth` to display a **note at full viewport width**, with it’s body centered and automatic margin to the left and right. A good example would be the cookie-policy at the very top of a page.

```html
<div id="cookieNote" class="note note--fullwidth note--attention note--large">
    <div class="note__body center">
        <p>This is a note at full vieport width with centered body.</p>
    </div>
</div>
```