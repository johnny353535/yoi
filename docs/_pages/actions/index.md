---
layout: base
group: actions
title: Introduction
permalink: actions/
---

# Actions

<p class="intro">YOI provides a powerful HTML-based interface to call JavaScript functions that interact with elements on your web page. We call these functions <i>actions</i>.</p>

## Logic

No matter what _action_ you wish to call, the logic is always the same. To attach an action to an element (eg. a `<button>`), add the `yoi-action` attribute and provide at least two parameters as a key/value pair: 1. the _action name_ (always uppercase!) and 2. a _CSS selector for the target element_:

```
yoi-action="Actionname:#targetSelector;"
```

## Basic Example

In the following example, we attach the action _Hide_ to a button and set the target to the #id of the element we wish to hide:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:#exampleTarget-1;">Hide #exampleTarget-1</button>
<div id="exampleTarget-1" class="m-t-4">
    <div class="box p-4">#exampleTarget-1</div>
</div>
```

## Parameters

### Formatting

Make sure you write the parameters correctly, otherwise the action just does not work. Checklist for parameters:

* An action may have **many parameters**.
* An action must have **at least one parameter**.
* Paramaters must be **formatted correctly**. They are written as key/value pairs. Keys are seperated from values with a colon. Each key/value pair must end with a semicolon: `key:value;`.
* If values include special characters – for example URLS with slashes, colons etc. – wrap them in **single quotation marks**: `key:'some//value:with_special?charactes'`.
* Values can **not include single nor double quotation marks**!
* The **order of the parameters matters**, the first parameter must alyways be: `ActionName:targetSelector;`.
+ All following parameters are always optional and can always be in any order you wish.
* Action names must **begin with an upper case character**!

## The _target_ Parameter

This parameter takes any valid CSS selector. It tells the _action_ which element on the page to manipulate. We recommend to use #id-selectors. Please note: An #id can only be used once per document.

### The Target Value _self_

If you use the keyword _self_ (must be lowercase), the target will be the very element itself:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:self;">Hide Myself</button>
```

### The Target Value _parent_

If you use the keyword _parent_ (must be lowercase), the target will be the parent (= first sourrounding element) of your element:

```html
<!-- example -->
<div class="box p-4">
    <p class="fs-15 tc-gray-15 m-b-2">This is the parent element of the button.</p>
    <button class="btn btn--large" yoi-action="Hide:parent;">Hide my Parent Element</button>
</div>
```

### The _On_ Parameter

x

x special case: custom yoi-event

### Option Parameters

x

## List of Available Actions



## Elements Can Have Actions, Too

two kinds of actions

