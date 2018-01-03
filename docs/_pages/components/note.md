---
layout: base
group: components
title: Note
permalink: components/note
---

# Note

<div class="m-t-4 m--pos-tr m--m-4 m--m-t-10">
    <span class="badge badge--negative">incomplete</span>
</div>

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

## Large text

Use the modifier `.note--large` to increase the font size.

```html
<!-- example -->
<div class="note note--large" yoi-dismiss>
    <h3 class="note__headline">Headline</h3>
    <div class="note__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
    </div>
</div>
```

## Icons

```html
<!-- example -->
<div class="note note--large m-b-2">
    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-024" yoi-icon />
    <h3 class="note__headline">Headline</h3>
    <div class="note__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
    </div>
</div>

<div class="note note--negative note--large m-b-2">
    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-006" yoi-icon />
    <h3 class="note__headline">Headline</h3>
    <div class="note__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
    </div>
</div>

<div class="note note--positive note--large">
    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-011" yoi-icon />
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
<div class="note note--large" yoi-dismiss>
    <div class="note__body">
        <p>default styling</p>
    </div>
</div>

<div class="note note--attention note--large" yoi-dismiss>
    <div class="note__body">
        <p>.note--<strong>attention</strong></p>
    </div>
</div>

<div class="note note--dark note--large" yoi-dismiss>
    <div class="note__body">
        <p>.note--<strong>dark</strong></p>
    </div>
</div>

<div class="note note--subtle note--large" yoi-dismiss>
    <div class="note__body">
        <p>.note--<strong>subtle</strong></p>
    </div>
</div>

<div class="note note--negative note--large" yoi-dismiss>
    <div class="note__body">
        <p>.note--<strong>negative</strong></p>
    </div>
</div>

<div class="note note--light note--large" yoi-dismiss>
    <div class="note__body">
        <p>.note--<strong>light</strong></p>
    </div>
</div>

<div class="note note--positive note--large" yoi-dismiss>
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
    <div class="note note--positive note--large" yoi-dismiss>
        <div class="note__body">
            <p>The first data you supplied is <strong>valid</strong>.</p>
        </div>
    </div>
    <div class="note note--negative note--large" yoi-dismiss>
        <div class="note__body">
            <p>The second data you supplied is <strong>not valid</strong>.</p>
        </div>
    </div>
    <div class="note note--positive note--large" yoi-dismiss>
        <div class="note__body">
            <p>The third data you supplied is <strong>valid</strong>.</p>
        </div>
    </div>
</div>
```