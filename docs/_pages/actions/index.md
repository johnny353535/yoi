---
layout: base
group: actions
title: Introduction
permalink: actions/
---

# Actions

<p class="intro">YOI provides a powerful HTML-based interface to call JavaScript functions that interact with elements on your web page. We call these functions <i>actions</i>.</p>

## Purpose

Use an _action_ if you want a specific element control other elements on the page. Eg. add an action to hide a specific element to a button.

## Logic

No matter what _action_ you wish to call, the logic is always the same. To attach an action to an element (eg. a `<button>`), add the `yoi-action` attribute and provide at least two parameters as a key/value pair: 1. the _action name_ (always uppercase!) and 2. a _CSS selector for the target element_:

```html
<div yoi-action="Actionname:#targetSelector;">...</div>
```

### Multiple Actions

You can add multiple actions to a single element. However, the markup can get messy and the interactions become difficult to maintain, so we limited the number of actions per element to a total of five. Each actions needs it’s individual custom attribute, formatted like this:

```html
<div yoi-action="..." yoi-action-1="..." yoi-action-2="..." yoi-action-3="..." yoi-action-4="..."></div>
```

_We strongly recommend to use a maximum of two actions per element._ To improve readability, it might make more sense to start with `yoi-action-1` like so:

```html
<div yoi-action-1="..." yoi-action-2="..."></div>
```

## Basic Example

In the following example, we attach the action _Hide_ to a button and set the target to the #id of the element we wish to hide:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:#exampleTarget-1;">Hide #exampleTarget-1</button>
<div id="exampleTarget-1" class="m-t-4">
    <div class="box p-4 tc-gray-15 fs-2">#exampleTarget-1</div>
</div>
```

## Parameters

### Formatting

Make sure you write the parameters correctly, otherwise the action just does not work. Checklist for parameters:

* An action may have _many parameters_.
* An action must have _at least one parameter_.
* Paramaters must be _formatted correctly_. They are written as key/value pairs. Keys are seperated from values with a colon. Each key/value pair must end with a semicolon: `key:value;`.
* If at least one value includes special characters – for example URLS with slashes, colons etc. – wrap **all values** in _single quotation marks_: `foo:'some//value:with_special?charactes'; bar:'12'; foobar:'abc'`. 
* Values can _not include single nor double quotation marks_.
* The _order of the parameters matters_, the first parameter must alyways be: `ActionName:targetSelector;` or `ActionName`.
+ All following parameters are optional and can follow in any order you prefer.
* Action names must _begin with an upper case character_.

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
    <p class="fs-2 tc-gray-15 m-b-2">This is the parent element of the button.</p>
    <button class="btn btn--large" yoi-action="Hide:parent;">Hide my Parent Element</button>
</div>
```

### The _on_ Parameter

By default, every action is called _on click_. If you wish to call the action on another [event](https://developer.mozilla.org/en-US/docs/Web/Events), use the _on_ parameter:

```html
<!-- example:tabs -->
<p class="fs-2 tc-gray-15 m-b-4">Use the buttons and the text input to make the example target blink:</p>
<div class="btns">
    <button class="btn btn--large" yoi-action="Blink:#exampleTarget-2;">click</button>
    <button class="btn btn--large" yoi-action="Blink:#exampleTarget-2; on:dblclick;">double-click</button>
    <button class="btn btn--large" yoi-action="Blink:#exampleTarget-2; on:mouseover;">mouseover</button>
    <button class="btn btn--large" yoi-action="Blink:#exampleTarget-2; on:mouseout;">mouseout</button>
</div>
<input class="input--large w-20 m-t-2" type="text" value="focus" yoi-action="Blink:#exampleTarget-2; on:focus;" />
<div id="exampleTarget-2" class="m-t-4">
    <div class="box p-4 tc-gray-15 fs-2">#exampleTarget-2</div>
</div>
```

#### Custom Events

Some of YOI’s [elements](elements/) fire their own custom events. They follow the naming scheme `yoi-elementname-eventname` (all lowercase). Each element lists it’s custom events on it’s page in this documentation. Your _actions_ can also listen to these events with the _on_-paramater.

In the following example, the [switch](elements/switch.html) fires the events `yoi-switch-on` and `yoi-switch-off`. We use these events instead of eg. `click` to call two actions: show the example target on `yoi-switch-on` and hide it on `yoi-switch-off`:

```html
<!-- example:tabs -->
<p class="fs-2 tc-gray-15 m-b-4">Use the switch to show or hide the example target:</p>
<div class="switch switch--large" yoi-switch yoi-action-1="Show:#exampleTarget-3; on:yoi-switch-on;" yoi-action-2="Hide:#exampleTarget-3; on:yoi-switch-off;"></div>
<div id="exampleTarget-3" class="m-t-4">
    <div class="box p-4 tc-gray-15 fs-2">#exampleTarget-3</div>
</div>
```

### The _trigger_ Parameter

There are two ways to use _actions_:

1. Add `yoi-action` to an element to let it control another (target-)element
2. Add `yoi-action` to an element that listens to an event which another (trigger-)element fires

In all examples above, we used the first method. However, sometimes the second method might make more sense. In order to tell the element which other elements _it is supposed to listen to_, use the _trigger_-parameter:

```html
<!-- example:tabs -->
<p class="fs-2 tc-gray-15 m-b-4">An example element will <i>listen</i> to the <code>yoi-switch-on</code> and <code>yoi-switch-off</code> events and show or hide itself accordingly:</p>
<div id="exampleTrigger-1" class="switch switch--large" yoi-switch></div>
<div class="m-t-4" yoi-action-1="Show:self; on:yoi-switch-on; trigger:#exampleTrigger-1;" yoi-action-2="Hide:self; on:yoi-switch-off; trigger:#exampleTrigger-1;" >
    <div class="box p-4 tc-gray-15 fs-2">Hello.</div>
</div>
```

### Option Parameters

Some _actions_ offer _options_. You can look up the available options on each action’s idividual documentation page. In the following example, the target element gets hidden with an optional slide-transition:

```html
<!-- example -->
<p class="fs-2 tc-gray-15 m-b-4">Click the button to hide the target element with a slide-transition:</p>
<button class="btn btn--large" yoi-action="Hide:#exampleTarget-4; transition:slideUp;">Hide #exampleTarget-4</button>
<div id="exampleTarget-4" class="m-t-4">
    <div class="box p-4 tc-gray-15 fs-2">#exampleTarget-4</div>
</div>
```

## Elements Can Have Actions, Too!

In addition to YOI’s universally available actions, many elements offer actions themselves. This is extremely powerful! In the following example, we use a switch to toggle another switch:

```html
<!-- example:tabs -->
<p class="fs-2 tc-gray-15 m-b-4">Use the first switch to toggle the second switch:</p>
<div class="switch switch--large" yoi-switch yoi-action="Switch.toggle:#exampleSwitch;"></div>
<div id="exampleSwitch" class="switch switch--large" yoi-switch="state:on;"></div>
```

You can look up each element’s available options on the element’s idividual documentation page.