---
layout: base
group: behaviours
title: Sticky
permalink: behaviours/sticky
---

# Sticky

<p class="intro">Makes any element on the page stick while scrolling past a certain threshold, which can be defined per element.</p>

## Basic Example

Ad the custom yoi-attribute `yoi-sticky` to any element you wish to make *sticky*. While scrolling the page down, as soon as the vieport’s top border *touches* the element, it *sticks* at the viewport top while scrolling. If no other parameter is provided, the element *sticks as long as the page can be scrolled*.

```html
<!-- example -->
<div class="w-6 h-6 p-2 bg-red-15 br" yoi-sticky="stop:300;"></div>
```

`yoi-sticky="stop:300;"` from the example above tells the sticky element to stick as long, as it reached a position *300px further down from it’s initial position*.

## Parameters

| `reference` | `CSS selector` or the keyword `parent` - Defines a [reference element on the page](#defining-a-reference-element) |
| `start`     | `number` - The *offset* before a sticky element actually *sticks*. Default is 0.                                  |
| `stop`      | `number` - The *offset* after a sticky element no longer *sticks*                                                 |

### Defining a Reference Element

A valid reference element is any element on the page which is *top-aligned with the sticky element* and which is *taller than the sticky element*.

You can provide a reference element by adding a CSS-selector as a value for the option *reference*:

```html
yoi-sticky="reference:#myReferenceElement;"
```

The script selects the first matching element on the page and references it’s height to define a stop position for the sticky element. The sticky element *sticks* as long as it’s bottom aligns with the reference element’s bottom.

```html
<!-- example -->
<div class="fl-l w-6 h-6 p-2 bg-red-15 m-r-4 br" yoi-sticky="reference:#myReferenceElement-1;"></div>
<div class="box h-40 w-20 p-1" id="myReferenceElement-1">
    <span class="tc-gray-15 fs-2 m-l-1">#myReferenceElement-1</span>
</div>
```

#### The Parent Keyword

Another possible value for the reference-parameter is the keyword `parent`:

```html
<div yoi-sticky="reference:parent;"></div>
```
By using this keyword, the script selects the sticky element’s surrounding element (= parent element) as a reference. The sticky element sticks *inside it’s parent element* as long as the sticky element’s bottom reaches the parent element’s bottom. Please notice that if the parent element has a bottom-padding, the sticky element stops as soon as it’s bottom reaches the bottom padding.

```html
<!-- example -->
<div class="w-30 p-r-4">
    <div class="box h-30 p-2">
        <span class="tc-gray-15 fs-2 pos-tr m-t-1 m-r-2">parent element</span>
        <div class="w-6 h-6 p-2 bg-red-15 br" yoi-sticky="reference:parent;"></div>
    </div>
</div>
```

<p class="hint"><b>What Is a Valid Reference Element?</b> A valid reference element is any element on the page which is top-aligned with the sticky element and taller than the sticky element.</p>
<p class="hint"><b>Stop & Reference Elements</b> If you use a reference element, you use it because you can define the position at which the sticky element stops to stick. Therefore, the stop parameter will be ignored if you use a reference element.</p>

### The Start And Stop Parameters

If you do not define any values for start and stop, the sticky element will start to stick as soon as it *touches* the upper viewport border. It will stick as long as the page can be scrolled. By providing values for the start and stop parameters, you can control this behaviour.

#### Start

`start` defines the offset to the upper viewport border. For example if you set `start:20;`, the element starts to stick when it is 20px below the upper viewport border.

#### Stop

`stop` defines the distance between the sticky element’s initial top position and the position when it stops sticking. For example if you set `stop:300`, the sticky element will stick for 300px while scrolling the page.

#### Default Values

The default value for `start` is 0. The default value for `stop` is the body height – in this case the element sticks as long as the page can be scrolled.

```html
<!-- example -->
<div class="flexGrid">
    <div class="w-1-4 p-r-4">
        <p class="tc-gray-15 fs-2 m-b-4">start: none;<br />stop: 200;</p>
        <div class="h-40 pos-rel" id="example-sticky-1">
            <div class="w-6 h-6 p-2 bg-red-15 br" yoi-sticky="stop:200;"></div>
        </div>
    </div>
    <div class="w-1-4 p-r-4">
        <p class="tc-gray-15 fs-2 m-b-4">start: 30;<br />stop: 200;</p>
        <div class="h-40 pos-rel" id="example-sticky-2">
            <div class="w-6 h-6 p-2 bg-red-15 br" yoi-sticky="start:30; stop:200;"></div>
        </div>
    </div>
    <div class="w-1-4 p-r-4">
        <p class="tc-gray-15 fs-2 m-b-4">start: 180;<br />stop: 200;</p>
        <div class="h-40 pos-rel" id="example-sticky-3">
            <div class="w-6 h-6 p-2 bg-red-15 br" yoi-sticky="start:180; stop:200;"></div>
        </div>
    </div>
    <div class="w-1-4 p-r-4">
        <p class="tc-gray-15 fs-2 m-b-4">start: 30;<br />stop: 350;</p>
        <div class="h-40 pos-rel" id="example-sticky-4">
            <div class="w-6 h-6 p-2 bg-red-15 br" yoi-sticky="start:30; stop:350;"></div>
        </div>
    </div>
</div>
```

<div style="height:500px"></div>