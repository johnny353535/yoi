---
layout: base
group: actions
title: Remove
permalink: actions/remove
---

## Remove

<p class="intro">Create elements (eg. buttons) that remove their parent element or any other target-element from the current document/page.</p>

|         |                                                                |
| -       | -                                                              |
| Js-File | [remove.js]({{ pathToSourceFile }}assets/js/modules/remove.js) |
| Hooks   | `yoi-remove`                                                   |

### Examples
Use any element as a trigger by adding the custom yoi-attribute `yoi-remove`. In this most basic example, the trigger’s parent element will get removed from the dom, once the trigger is clicked. This is the default behaviour.

```html
<!-- example -->
<div class="box w-30 h-20 p-2">
    <button class="btn pos-tr m-2" yoi-action="Remove:parent;">Remove my Parent Element</button>
</div>
```

If you wish to remove any other element in the dom, refer to it through the trigger element by adding the value `target:` + a CSS-selector for the target element:

```html
<!-- example -->
<!-- the trigger element: -->
<div class="m-b-2">
    <button class="btn" yoi-action="Remove:#myTargetElement;">Remove my Target Element</button>
</div>
<!-- the target element: -->
<div id="myTargetElement" class="w-30 h-20 p-2 br bg-green-16 tc-white">
    <p>My Target Element</p>
</div>
```

If you wish to remove a collection of elements from the dom, refer to them throught the trigger element by adding the value `target:` + a CSS-selector for the target elements. You may use any valid CSS-selector – id, class name, tag name, attribute, etc. – plus any combination. Some examples:

```html
<!-- example -->
<!-- the trigger element: -->
<div class="m-b-2">
    <button class="btn" yoi-action="Remove:.myTargetElement;">Remove My Many Target Elements</button>
</div>
<!-- the target elements: -->
<div class="myTargetElement w-30 p-2 m-b-2 br bg-red-16 tc-white">
    <p>One of My Many Target Elements</p>
</div>
<div class="myTargetElement w-30 p-2 m-b-2 br bg-red-16 tc-white">
    <p>One of My Many Target Elements</p>
</div>
<div class="myTargetElement w-30 p-2 m-b-2 br bg-red-16 tc-white">
    <p>One of My Many Target Elements</p>
</div>
<div class="myTargetElement w-30 p-2 br bg-red-16 tc-white">
    <p>One of My Many Target Elements</p>
</div>
<!-- the trigger element: -->
<div class="m-b-2">
    <button class="btn" yoi-action="Remove:ol,[href*=http];">Remove All Ordered Lists and External Links</button>
</div>
<!-- the target elements: -->
<ol class="p-l-4 m-t-4 m-b-2">
    <li>Manganese</li>
    <li>Gold</li>
    <li>Calcium</li>
</ol>
<a href="http://yoshino.digital">Yoshino Digital</a>
```
