---
layout: base
group: components
title: Box
permalink: components/box
---

# Box

<p class="intro">A versatile container component.</p>

## Basic Example

This is how a basic `.box` looks like and how you write the markup:

```html
<!-- example -->
<div class="box">
    <h4 class="box__header">Optional Headline</h4>
    <div class="box__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
</div>
```

## Grouping

Each `.box` can have multiple `.box__body` instances:

```html
<!-- example -->
<div class="box">
    <h4 class="box__header">Headline</h4>
    <div class="box__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
    <div class="box__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
</div>
```

Group multiple `.box` instances by wrapping them inside `<div class="boxes">`. You can also nest multiple `.box__body`:

```html
<!-- example -->
<div class="boxes">
    <div class="box">
        <h4 class="box__header">Headline</h4>
        <div class="box__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <div class="box__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
    </div>
    <div class="box">
        <h4 class="box__header">Headline</h4>
        <div class="box__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
    </div>
    <div class="box">
        <h4 class="box__header">Headline</h4>
        <div class="box__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
    </div>
    <div class="box">
        <h4 class="box__header">Headline</h4>
        <div class="box__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
    </div>
</div>
```

## Modification

Create custom `.box` variations with [utilities](utilities/). In the following example, text-, border- and background-color is set to shades of red:

```html
<!-- example -->
<div class="box bc-red-22 c-red-10">
    <h4 class="box__header bg-red-24 bc-red-22">Headline</h4>
    <div class="box__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </div>
</div>
```