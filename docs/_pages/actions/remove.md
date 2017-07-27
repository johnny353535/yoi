---
layout: base
group: actions
title: Remove
permalink: actions/remove
---

# Remove

<p class="intro">Add this action to an element (eg. a button) to remove it’s parent element or any other target-element.</p>

| Js-File | [remove.js]({{ pathToSourceFile }}assets/js/actions/remove.js) |

## Examples

Use `yoi-action="Remove:CssSelector"` to remove a target element from the document.

```html
<!-- example -->
<div class="m-b-2">
    <button class="btn btn--large" yoi-action="Remove:#exampleTarget-1;">Remove #exampleTarget-1</button>
</div>
<div id="exampleTarget-1" class="box w-30 h-20 p-4 tc-gray-15 fs-15">
    <p>#exampleTarget-1</p>
</div>
```

Use the keyword `parent` to remove the parent (=sourrounding) element:

```html
<!-- example -->
<div class="box w-30 h-20 p-2">
    <button class="btn btn--large pos-tr m-2" yoi-action="Remove:parent;">Remove the Parent Element</button>
</div>
```

Use the keyword `self` to remove the element itself:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Remove:self;">Remove Self</button>
```

You may use any valid CSS-selector – id, class name, tag name, attribute, etc. – plus any combination. Hence it’s possible to select many elements at once. Some examples:

```html
<!-- example:tabs -->
<div class="m-b-2">
    <button class="btn btn--large" yoi-action="Remove:.myTargetElement;">Remove My Many Target Elements</button>
</div>
<div class="myTargetElement w-30 p-2 m-b-2 box p-2 tc-gray-15 fs-15">
    <p>One of My Many Target Elements</p>
</div>
<div class="myTargetElement w-30 p-2 m-b-2 box p-2 tc-gray-15 fs-15">
    <p>One of My Many Target Elements</p>
</div>
<div class="myTargetElement w-30 p-2 m-b-2 box p-2 tc-gray-15 fs-15">
    <p>One of My Many Target Elements</p>
</div>
<div class="myTargetElement w-30 p-2 m-b-2 box p-2 tc-gray-15 fs-15">
    <p>One of My Many Target Elements</p>
</div>
<hr class="ruler m-tb-4" />
<div class="m-b-2">
    <button class="btn btn--large" yoi-action="Remove:ol,[href*=http];">Remove All Ordered Lists and External Links</button>
</div>
<ol class="p-l-4 m-t-4 m-b-2">
    <li>Manganese</li>
    <li>Gold</li>
    <li>Calcium</li>
</ol>
<a href="http://yoshino.digital">Yoshino Digital</a>
```

## Parameters

| `on` | optional – Any valid event ([learn more](actions/index.html#the-on-parameter)). The default is `click`. |