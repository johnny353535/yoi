---
layout: base
group: behaviors
title: Sticky
permalink: behaviors/sticky
srcfiles:
    - sticky.js
    - ../modules/scrollagent.js
    - ../modules/resizeagent.js
---

# Sticky

<p class="intro">Makes an element <i>stick</i> when scrolled past it’s position on the page.</p>

## Basic Example

Add the Attribute `yoi-sticky` to any element. While scrolling down the page, as soon as the viewport’s top border reaches the element, it becomes *sticky*:

```html
<!-- example -->
<div yoi-sticky="stop:300;">
    <div class="w-6 h-6 bg-primary-15 br-all"></div>
</div>
```

<p class="hint hint--primary">If you provide no additional Parameter, the element sticks as long as the page can be scrolled.</p>

In the example above, `yoi-sticky="stop:300;"` makes the sticky element stick as long as it reaches a position *300px further down from it’s initial position*.

<p class="hint hint--negative"><b>Invalid height:</b> If a sticky element is higher than the browser window, it will no stick!</p>

<p class="hint hint--negative"><b>Invalid styling:</b> Elements with any CSS transformation (eg. <code>transform: translate()</code>) or top/bottom <a href="{{ site.github.url }}/utilities/layout.html#micro-positioning">micro-position utility classes</a> (eg. <code>.pos-t-2</code> or <code>.pos-b-4</code>) do not work with this behavior. However, absolutely or relatively positioned elements are fine.</p>

## Parameters

| `reference`      | `CSS selector` or the keyword `”parent“` - defines a reference element on the page                                                           |
| `start`          | `number` - the *offset* before a sticky element actually *sticks*, the default offset is `0`                                                 |
| `stop`           | `number` - the *offset* after a sticky element no longer *sticks*                                                                            |
| `includePadding` | `string` - `true` (default) or `false`, defines weather to include padding of a parent reference element ([learn more](behaviors/sticky.html#the-keyword-parent)) |
| `not`            | `string` or a comma-seperated list of strings - the breakpoints/screen-sizes on which sticky behavior is disabled                           |

### Reference

#### Defining a Reference Element

Add a CSS-selector as value for the `reference` parameter:

```html
<div yoi-sticky="reference:#id;"></div>
```

Sticky takes the first matching element on the page and references it’s height to define a stop position for the sticky element. The sticky element *sticks* until it’s bottom aligns with the reference element’s bottom.

```html
<!-- example -->
<div class="flx">
    <div class="w-8">
        <div yoi-sticky="reference:#referenceElement-1;">
            <div class="w-6 h-6 bg-primary-15 m-r-4 br-all"></div>
        </div>
    </div>
    <div class="w-1-3">
        <div class="bg-base-24 br-all h-40 w-10 p-1" id="referenceElement-1"></div>
    </div>
</div>
```

<p class="hint hint--primary"><b>What Is a Valid Reference Element?</b> A valid reference element is any element on the page which is top-aligned with the sticky element and taller than the sticky element.</p>

#### The Keyword *Parent*

Use `reference:parent;` to turn the sticky element’s surrounding element (= *parent element*) into it’s reference element. The sticky element sticks *inside it’s parent element* until the sticky element’s bottom reaches the parent element’s bottom.

Notice how the parent element’s padding is included into the calculation:

```html
<!-- example -->
<div class="br-all bg-base-24 h-30 p-4">
    <div yoi-sticky="reference:parent;">
        <div class="w-6 h-6 bg-primary-15 br-all"></div>
    </div>
</div>
```

If you wish to exclude the parent element’s padding, add the key/value `includePadding:false`:

```html
<!-- example -->
<div class="br-all bg-base-24 h-30 p-4">
    <div yoi-sticky="reference:parent;includePadding:false;">
        <div class="w-6 h-6 bg-primary-15 br-all"></div>
    </div>
</div>
```

### Start & Stop

If you don’t define values for the parameters `start` and `stop`, the sticky element will start to stick as soon as it reaches the upper viewport border. It will stick as long as the page can be scrolled. Provide values for the `start` and `stop` parameters to control this behavior.

The element in the following example starts to stick at 30px distance and sticks for 100px:

```html
<!-- example -->
<div yoi-sticky="start:30px; stop:100;">
    <div class="w-6 h-6 bg-primary-15 br-all"></div>
</div>
```

#### Start

`start` defines the offset to the upper viewport border. For example: Add `start:30;` to make the element start to stick when it is scrolled 30px below the upper viewport border:

```html
<div yoi-sticky="start:30;"></div>
```

#### Stop

`stop` defines the distance between the sticky element’s initial top position and the position when it stops sticking. For example: Add `stop:300` to make the sticky element stick for a distance of 100px while scrolling:

```html
<div yoi-sticky="stop:100;"></div>
```

#### Default Values

The default value for `start` is `0`. The default value for `stop` is the `<body>` height, so that the element sticks as long as the page can be scrolled.

<p class="hint hint--primary"><b>Stop & Reference Elements</b> If you provide a reference element, you use it because you wish to define the position at which the sticky element stops to stick. Therefore, the stop parameter is ignored.</p>

### Not

Use the parameter `not` to define one or more breakpoints on which you wish to disable the sticky behavior:

```html
<!-- example -->
<div class="flx">
    <div yoi-sticky="not:small;stop:300;">
        <div class="w-6 h-6 bg-primary-15 br-al m-r-1"></div>
    </div>
    <div yoi-sticky="not:xlarge;stop:300;">
        <div class="w-6 h-6 bg-primary-15 br-al m-r-1"></div>
    </div>
    <div yoi-sticky="not:small,medium;stop:300;">
        <div class="w-6 h-6 bg-primary-15 br-al m-r-1"></div>
    </div>
</div>
```

<p class="hint hint--primary"><b>Allowed values:</b> Make sure you use only the allowed values <code>small</code>, <code>medium</code>, <code>large</code> and <code>xlarge</code>.</p>

## Events

This behavior fires the following events on each element it is applied to:

| Event             | Fires …                                   |
| ----------------- | ----------------------------------------- |
| `yoi-stick-start` | When the element starts to *stick*.       |
| `yoi-stick-stop`  | When the element gets *unstuck*.          |
