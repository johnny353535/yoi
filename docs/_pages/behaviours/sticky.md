---
layout: base
group: behaviours
title: Sticky
permalink: behaviours/sticky
---

# Sticky

<p class="intro">Makes an element <i>stick</i> when scrolled past it’s position on the page.</p>

## Basic Example

Add the Attribute `yoi-sticky` to any element. While scrolling down the page, as soon as the viewport’s top border reaches the element, it becomes *sticky*:

```html
<!-- example -->
<div class="w-6 h-6 p-2 bg-primary-15 br" yoi-sticky="stop:300;"></div>
```

<p class="hint hint--primary">If you provide no additional Parameter, the element sticks as long as the page can be scrolled.</p>

In the example above, `yoi-sticky="stop:300;"` makes the sticky element stick as long as it reaches a position *300px further down from it’s initial position*.

<p class="hint hint--negative"><b>Fixed Position and CSS Transforms</b> Elements with <code>position:fixed</code> or any CSS transformation (eg. <code>transform: translate()</code>) do not work with this behaviour. However, absolutely or relatively positioned elements are fine.</p>

## Parameters

| `reference` | `CSS selector` or the keyword `"parent"` - defines a reference element on the page           |
| `start`     | `number` - the *offset* before a sticky element actually *sticks*, the default offset is `0` |
| `stop`      | `number` - the *offset* after a sticky element no longer *sticks*                            |

### Reference

#### Defining a Reference Element

Add a CSS-selector as value for the `reference` parameter:

```html
yoi-sticky="reference:#myReferenceElement;"
```

Sticky takes the first matching element on the page and references it’s height to define a stop position for the sticky element. The sticky element *sticks* until it’s bottom aligns with the reference element’s bottom.

```html
<!-- example -->
<div class="flexGrid">
    <div class="w-8">
        <div class="w-6 h-6 p-2 bg-primary-15 m-r-4 br" yoi-sticky="reference:#myReferenceElement-1;"></div>
    </div>
    <div class="w-1-3">
        <div class="bg-base-24 br h-40 w-20 p-1" id="myReferenceElement-1"></div>
    </div>
</div>
```

<p class="hint hint--primary"><b>What Is a Valid Reference Element?</b> A valid reference element is any element on the page which is top-aligned with the sticky element and taller than the sticky element.</p>

#### The Keyword *Parent*

Use `reference:parent;` to turn the sticky element’s surrounding element (= *parent element*) into it’s reference element. The sticky element sticks *inside it’s parent element* until the sticky element’s bottom reaches the parent element’s bottom. Notice how the parent element’s padding is included into the calculation:

```html
<!-- example -->
<div class="br bg-base-24 h-30 p-2">
    <div class="w-6 h-6 p-2 bg-primary-15 br" yoi-sticky="reference:parent;"></div>
</div>
```

### Start & Stop

If you don’t define values for the parameters `start` and `stop`, the sticky element will start to stick as soon as it reaches the upper viewport border. It will stick as long as the page can be scrolled. Provide values for the `start` and `stop` parameters to control this behaviour.

#### Start

`start` defines the offset to the upper viewport border. For example: Add `start:20;` to make the element start to stick when it is scrolled 20px below the upper viewport border.

#### Stop

`stop` defines the distance between the sticky element’s initial top position and the position when it stops sticking. For example: Add `stop:300` to make the sticky element stick for a distance of 300px while scrolling.

#### Default Values

The default value for `start` is `0`. The default value for `stop` is the `<body>` height, so that the element sticks as long as the page can be scrolled.

<p class="hint hint--primary"><b>Stop & Reference Elements</b> If you provide a reference element, you use it because you wish to define the position at which the sticky element stops to stick. Therefore, the stop parameter is ignored.</p>

#### Examples

```html
<!-- example:tabs -->
<div class="flexGrid">
    <div class="w-1-4 p-r-4">
        <p class="tc-gray-15 fs-2 m-b-4">start: none;<br />stop: 200;</p>
        <div class="h-40 pos-rel" id="example-sticky-1">
            <div class="w-6 h-6 p-2 bg-primary-15 br" yoi-sticky="stop:200;"></div>
        </div>
    </div>
    <div class="w-1-4 p-r-4">
        <p class="tc-gray-15 fs-2 m-b-4">start: 30;<br />stop: 200;</p>
        <div class="h-40 pos-rel" id="example-sticky-2">
            <div class="w-6 h-6 p-2 bg-primary-15 br" yoi-sticky="start:30; stop:200;"></div>
        </div>
    </div>
    <div class="w-1-4 p-r-4">
        <p class="tc-gray-15 fs-2 m-b-4">start: 180;<br />stop: 200;</p>
        <div class="h-40 pos-rel" id="example-sticky-3">
            <div class="w-6 h-6 p-2 bg-primary-15 br" yoi-sticky="start:180; stop:200;"></div>
        </div>
    </div>
    <div class="w-1-4 p-r-4">
        <p class="tc-gray-15 fs-2 m-b-4">start: 30;<br />stop: 350;</p>
        <div class="h-40 pos-rel" id="example-sticky-4">
            <div class="w-6 h-6 p-2 bg-primary-15 br" yoi-sticky="start:30; stop:350;"></div>
        </div>
    </div>
</div>
```

<div style="height:1000px"></div>
<style>
    [id*="example-sticky-"]::after {
        border-top: #ddd 1px solid;
        content: ' ';
        left: 0;
        position: absolute;
        right: 0;
        top: 200px;
        width: 60px;
    }
    #example-sticky-4::after {
        top: 350px;
    }
</style>