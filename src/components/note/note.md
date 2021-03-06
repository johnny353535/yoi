---
layout: base
group: components
title: Note
permalink: components/note
---

# Note

<p class="intro">System messages, eg. form validation, status (added to cart), etc.</p>

## Simple Note

```html
<!-- example -->
<div class="note">
    <h3 class="note__headline">Headline</h3>
    <div class="note__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
    </div>
</div>
```

## Basic Example

If you wish to make a `.note` *dismissable*, use the `yoi-dismiss` attribute to make a close button appear in the upper right corner.

```html
<!-- example -->
<div class="note note--attention" yoi-dismiss>
    <h3 class="note__headline">Headline</h3>
    <div class="note__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
    </div>
</div>
```

## Colors

Notes are available in **different color themes**. Weather you wish to display an error, a success message or just a subtle note, you can choose from the following options:

```html
<!-- example -->
<div class="note m-b-1" yoi-dismiss>
    <div class="note__body">
        <p>default styling</p>
    </div>
</div>

<div class="note note--attention m-b-1" yoi-dismiss>
    <div class="note__body">
        <p>.note--<strong>attention</strong></p>
    </div>
</div>

<div class="note note--dark m-b-1" yoi-dismiss>
    <div class="note__body">
        <p>.note--<strong>dark</strong></p>
    </div>
</div>

<div class="note note--negative m-b-1" yoi-dismiss>
    <div class="note__body">
        <p>.note--<strong>negative</strong></p>
    </div>
</div>

<div class="note note--light m-b-1" yoi-dismiss>
    <div class="note__body">
        <p>.note--<strong>light</strong></p>
    </div>
</div>

<div class="note note--positive m-b-1" yoi-dismiss>
    <div class="note__body">
        <p>.note--<strong>positive</strong></p>
    </div>
</div>
```

## Grouped Notes

**Group notes** inside a container element with the css class name `.notes`. For example to group validation messages.

```html
<!-- example -->
<div class="notes">
    <div class="note note--positive" yoi-dismiss>
        <div class="note__body">
            <p>The first data you supplied is <strong>valid</strong>.</p>
        </div>
    </div>
    <div class="note note--negative" yoi-dismiss>
        <div class="note__body">
            <p>The second data you supplied is <strong>not valid</strong>.</p>
        </div>
    </div>
    <div class="note note--positive" yoi-dismiss>
        <div class="note__body">
            <p>The third data you supplied is <strong>valid</strong>.</p>
        </div>
    </div>
</div>
```
