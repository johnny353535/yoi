---
layout: base
group: interface
title: Sticky
permalink: interface/sticky
---

## Sticky
Make any element on the page **stick** while scrolling past a certain threshold, which can be defined per element.

| Js-File | [sticky.js]({{ pathToSourceFile }}assets/js/modules/sticky.js) |
| Hooks   | `yoi-sticky`                                                   |

### Simple Example
Ad the custom yoi-attribute `yoi-sticky` to any element you wish to make *sticky*. While scrolling the page down, as soon as the vieport’s top border *touches* the element, it *sticks* at the viewport top while scrolling. If no other parameter is provided, the element *sticks as long as the page can be scrolled*. However, in this first simple example, one parameter is provided: *stop*.

```html
<!-- example -->
<div class="fl-l w-6 h-6 p-2 bg-red-15 m-r-4 br" yoi-sticky="reference:#myReferenceElement-1;"></div>
<div class="box h-40 w-20 p-1" id="myReferenceElement-1">
    <span class="tc-gray-15 fs-15 m-l-1">#myReferenceElement-1</span>
</div>
```

```html
<!-- example -->
<div class="w-6 h-6 p-2 bg-red-15 br" yoi-sticky="stop:100;"></div>
```

`yoi-sticky:stop:100;` from the example above tells the sticky element to stick as long, as it reached a position *100px further down from it’s initial position*.

### Picking a Reference Element
A very useful feature of this script is the *reference element*. A valid reference element is any element on the page which is top-aligned with the sticky element and which is taller than the sticky element.

You can provide a reference element by adding a CSS-selector as a value for the option *reference*:

```html
yoi-sticky="reference:#myReferenceElement;"
```

The script selects the first matching element on the page and references it’s height to define a stop position for the sticky element. The sticky element *sticks* as long as it’s bottom aligns with the reference element’s bottom.

```html
<!-- example -->
<div class="fl-l w-6 h-6 p-2 bg-red-15 m-r-4 br" yoi-sticky="reference:#myReferenceElement-2;"></div>
<div class="box h-40 w-20 p-1" id="myReferenceElement-2">
    <span class="tc-gray-15 fs-15 m-l-1">#myReferenceElement-2</span>
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
        <span class="tc-gray-15 fs-15 pos-tr m-t-1 m-r-2">parent element</span>
        <div class="w-6 h-6 p-2 bg-red-15 br" yoi-sticky="reference:parent;"></div>
    </div>
</div>
```

<p class="hint"><b>What Is a Valid Reference Element?</b> A valid reference element is any element on the page which is top-aligned with the sticky element and taller than the sticky element.</p>
<p class="hint"><b>Stop & Reference Elements</b> If you use a reference element, you use it because you can define the position at which the sticky element stops to stick. Therefore, the stop parameter will be ignored if you use a reference element.</p>

### The Start And Stop Parameters
If you don not define any values for start and stop, the sticky element will start to stick as soon as it *touches* the upper viewport border. It will stick as long as the page can be scrolled. By providing values for the start and stop parameters, you can control this behaviour.

#### Start
`start` defines the offset to the upper viewport border. For example if you set `start:20;`, the element starts to stick when it is 20px below the upper viewport border.

#### Stop
`stop` defines the distance between the sticky element’s initial top position and the position when it stops sticking. For example if you set `stop:300`, the sticky element will stick for 300px while scrolling the page.

#### Default Values
The default value for `start` is 0. The default value for `stop` is the body height – in this case the element sticks as long as the page can be scrolled.


```html
<!-- example -->
<div class="grid-float">
    <div class="w-1-4 p-r-4">
        <p class="tc-gray-15 fs-15 m-b-4">start: none;<br />stop: 200;</p>
        <div class="h-40 pos-rel" id="example-1">
            <div class="w-6 h-6 p-2 bg-red-15 br" yoi-sticky="stop:200;"></div>
        </div>
    </div>
    <div class="w-1-4 p-r-4">
        <p class="tc-gray-15 fs-15 m-b-4">start: 30;<br />stop: 200;</p>
        <div class="h-40 pos-rel" id="example-2">
            <div class="w-6 h-6 p-2 bg-red-15 br" yoi-sticky="start:30; stop:200;"></div>
        </div>
    </div>
    <div class="w-1-4 p-r-4">
        <p class="tc-gray-15 fs-15 m-b-4">start: 180;<br />stop: 200;</p>
        <div class="h-40 pos-rel" id="example-3">
            <div class="w-6 h-6 p-2 bg-red-15 br" yoi-sticky="start:180; stop:200;"></div>
        </div>
    </div>
    <div class="w-1-4 p-r-4">
        <p class="tc-gray-15 fs-15 m-b-4">start: 30;<br />stop: 350;</p>
        <div class="h-40 pos-rel" id="example-4">
            <div class="w-6 h-6 p-2 bg-red-15 br" yoi-sticky="start:30; stop:350;"></div>
        </div>
    </div>
</div>
```

### Possible Use Cases
The most obvious use case for this script might be a menu that sticks while scrolling past the content area. However, it is flexible enough to use it for many other scenarios, too. Maybe stick the letter-labels on a large alphabetically ordered list while scrolling:

```html
<!-- example -->
<div class="m-b-4 clearfix">
    <div class="fl-l w-4 m-r-2" yoi-sticky="reference:parent">
        <div class="p-2 bg-blue-22 tc-blue-5 fw-bold br al-c">A</div>
    </div>
    <div class="fl-l w-1-2">
        <table>
            <tr>
                <td>Actinium</td>
            </tr>
            <tr>
                <td>Aluminium</td>
            </tr>
            <tr>
                <td>Americium</td>
            </tr>
        </table>
    </div>
</div>
<div class="m-b-4 clearfix">
    <div class="fl-l w-4 m-r-2" yoi-sticky="reference:parent">
        <div class="p-2 bg-blue-22 tc-blue-5 fw-bold br al-c">B</div>
    </div>
    <div class="fl-l w-1-2">
        <table>
            <tr>
                <td>Barium</td>
            </tr>
            <tr>
                <td>Berkelium</td>
            </tr>
            <tr>
                <td>Beryllium</td>
            </tr>
            <tr>
                <td>Bismuth</td>
            </tr>
        </table>
    </div>
</div>
<div class="m-b-4 clearfix">
    <div class="fl-l w-4 m-r-2" yoi-sticky="reference:parent">
        <div class="p-2 bg-blue-22 tc-blue-5 fw-bold br al-c">C</div>
    </div>
    <div class="fl-l w-1-2">
        <table>
            <tr>
                <td>Cadmium</td>
            </tr>
            <tr>
                <td>Caesium</td>
            </tr>
            <tr>
                <td>Calcium</td>
            </tr>
            <tr>
                <td>Californium</td>
            </tr>
            <tr>
                <td>Carbon</td>
            </tr>
            <tr>
                <td>Cerium</td>
            </tr>
            <tr>
                <td>Chlorine</td>
            </tr>
            <tr>
                <td>Chromium</td>
            </tr>
            <tr>
                <td>Cobalt</td>
            </tr>
            <tr>
                <td>Copernicium</td>
            </tr>
        </table>
    </div>
</div>
<div class="m-b-4 clearfix">
    <div class="fl-l w-4 m-r-2" yoi-sticky="reference:parent">
        <div class="p-2 bg-blue-22 tc-blue-5 fw-bold br al-c">D</div>
    </div>
    <div class="fl-l w-1-2">
        <table>
            <tr>
                <td>Darmstadtium</td>
            </tr>
            <tr>
                <td>Dubnium</td>
            </tr>
            <tr>
                <td>Dysprosium</td>
            </tr>
        </table>
    </div>
</div>
```

{% raw %}
<style type="text/css" media="screen">
    *[id*="example-"]::after {
        border-top: #ff6830 1px dashed;
        content: ' ';
        left: 0;
        position: absolute;
        right: 0;
        top: 200px;
        z-index: 10;
    }
    #example-4::after {
        top: 350px;
    }
</style>
{% endraw %}