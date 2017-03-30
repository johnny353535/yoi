---
layout: base
group: elements
title: Box
permalink: elements/box
---

## Box
`.box` is a versatile container. Use it to wrap navigational elements, products or to build asides. Chose from the available variations to achieve different grades of emphasis – some pop out, others appear more subtle.

| Less-File      | [box.less]({{ pathToSourceFile }}assets/less/elements/box.less) |
| Base CSS-Class | `.box`                                                          |
| Modifiers      | `-`                                                             |

### Basic Example

```html
<!-- example -->
<div class="box">
    <h4 class="box__header">Optional Headline</h4>
    <div class="box__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
</div>
```

### Grouping
Each `.box` can have multiple `.box__body`s. This is handy if you wish to group elements inside a single `.box` but only use one `.box__header`. Like this:

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

Sometimes you may wish to group different `.box`es. You can easily do so by wrapping them inside `<div class="boxes">` (notice the plural!). Of course you can also nest multiple bodies:

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