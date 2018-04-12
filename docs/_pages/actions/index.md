---
layout: base
group: actions
title: Introduction
permalink: actions/
---

# Actions

<p class="intro">YOI <i>Actions</i> provide a CSS-like interface for pre-defined JavaScript functions.</p>

## Purpose

Use an _action_ to make *one element interact with another element*. For example, add an action to a `<button>` to hide a `<div>` on click.

## The Action Attribute

Add an [action-attribute]({{ site.github.url }}glossary) to an element to make it execute an action. You must always add at least one key/value pair: the *action name* and the *target element [selector]({{ site.github.url }}glossary)*:

```html
<div yoi-action="Actionname:#id;">...</div>
```

### Multiple Actions

You can add up to five actions to a single element. Each actions needs a unique, numbered action attribute:

```html
<div yoi-action="..." yoi-action-1="..." yoi-action-2="..." yoi-action-3="..." yoi-action-4="..."></div>
```

<p class="hint hint--primary"><b>Actions are Limited</b> Try to use a maximum of two actions per element. If you need more complex interactivity, it’s much better to write your own JavaScript.</p>

## Example

Add the action _Hide_ to a `<button>` and set the target element selector to match the #id of the element we wish to hide:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:#example-1;">Hide #example-1</button>
<div id="example-1" class="m-t-4">
    <div class="box p-4 c-gray-15 fs-2">#example-1</div>
</div>
```

## Parameters

### Formatting

<p class="hint hint--primary">Make sure you write the parameters correctly, otherwise the action might not work. If you know CSS, the syntax should look familiar to you:</p>

* An action may accept _many parameters_.
* An action must have _at least one parameter_.
* Write parameters in key/value-pairs.
* Keys are seperated from values with a colon.
* Each key/value-pair must end with a semicolon.
* This is how you write a valid key/value-pair: `key:value;`.
* If at least one value contains special characters (slashes, colons etc.), wrap **all values** in _single quotation marks_: `foo:'some//value:with_special?charactes'; bar:'12'; foobar:'abc'`. 
* Values must _not include single nor double quotation marks_!
* Write Parameters in any order you prefer.
* Action names _start with an upper case character_.

### The Target Value

Set the target value to a valid [CSS selector]({{ site.github.url }}glossary) to select the element you wish to manipulate.

### The Target Value _self_

Use the keyword _self_ (written in lowercase) to select the very element you added the action to:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:self;">Hide Myself</button>
```

### The Target Value _parent_

Use the keyword _parent_ (written in lowercase), to select the parent (= enclosing) element of the element you added the action to:

```html
<!-- example -->
<div class="box p-4">
    <p class="fs-2 c-gray-15 m-b-2">This is the parent element of the button.</p>
    <button class="btn btn--large" yoi-action="Hide:parent;">Hide my Parent Element</button>
</div>
```

### The _on_ Parameter

By default, every action is executed _on click_. Use the _on_ parameter to call the action on another [event](https://developer.mozilla.org/en-US/docs/Web/Events):

```html
<!-- example -->
<p class="fs-2 c-gray-15 m-b-4">Use the buttons and the text input to make the example target blink:</p>
<div class="btns">
    <button class="btn btn--large" yoi-action="Blink:#example-2;">click</button>
    <button class="btn btn--large" yoi-action="Blink:#example-2; on:dblclick;">double-click</button>
    <button class="btn btn--large" yoi-action="Blink:#example-2; on:mouseover;">mouseover</button>
    <button class="btn btn--large" yoi-action="Blink:#example-2; on:mouseout;">mouseout</button>
</div>
<input class="input--large w-20 m-t-2" type="text" value="focus" yoi-action="Blink:#example-2; on:focus;" />
<div id="example-2" class="m-t-4">
    <div class="box p-4 c-gray-15 fs-2">#example-2</div>
</div>
```

### Option Parameters

Some _actions_ implement _options_. Available options are listed on each action’s documentation page. In the following example, the target element gets hidden with an optional slide-transition:

```html
<!-- example -->
<p class="fs-2 c-gray-15 m-b-4">Click the button to hide the target element with a slide-transition:</p>
<button class="btn btn--large" yoi-action="Hide:#example-4; transition:slideUp;">Hide #example-4</button>
<div id="example-4" class="m-t-4">
    <div class="box p-4 c-gray-15 fs-2">#example-4</div>
</div>
```

### The _trigger_ Parameter

There are two ways to use _actions_:

* Add `yoi-action` to an element to let it *control another element*.
* Add `yoi-action` to an element to listen to an event *fired by another element*. The other element becomes the *trigger*.

The first method is used in all previous examples. However, sometimes the second method might make more sense:

```html
<!-- example -->
<p class="fs-2 c-gray-15 m-b-4">An example element will <i>listen</i> to the <code>yoi-switch-on</code> and <code>yoi-switch-off</code> events and show or hide itself accordingly:</p>
<div id="exampleTrigger-1" class="switch switch--large" yoi-switch></div>
<div class="m-t-4" yoi-action-1="Show:self; on:yoi-switch-on; trigger:#exampleTrigger-1;" yoi-action-2="Hide:self; on:yoi-switch-off; trigger:#exampleTrigger-1;" >
    <div class="box p-4 c-gray-15 fs-2">Hello.</div>
</div>
```

## Custom Events

Some of YOI’s [elements](components/) fire custom events. They follow the naming scheme `yoi-elementname-eventname` (written in lowercase). Available custom events are listet on each component’s documentation page.

In the following example, the [switch](components/switch.html) fires the events `yoi-switch-on` and `yoi-switch-off`. The example target gets hidden on `yoi-switch-off` and becomes visible on `yoi-switch-off`:

```html
<!-- example -->
<p class="fs-2 c-gray-15 m-b-4">Use the switch to show or hide the example target:</p>
<div class="switch switch--large" yoi-switch yoi-action-1="Show:#example-3; on:yoi-switch-on;" yoi-action-2="Hide:#example-3; on:yoi-switch-off;"></div>
<div id="example-3" class="m-t-4">
    <div class="box p-4 c-gray-15 fs-2">#example-3</div>
</div>
```

## Components Can Have Actions, Too!

In addition to YOI global actions described in this chapter, many YOI components expose their own actions. Available actions are listed on each component’s documentation page. In the following example, one switch toggles another switch:

```html
<!-- example -->
<p class="fs-2 c-gray-15 m-b-4">Use the first switch to toggle the second switch:</p>
<div class="switch switch--large" yoi-switch yoi-action="Switch.toggle:#exampleSwitch;"></div>
<div id="exampleSwitch" class="switch switch--large" yoi-switch="state:on;"></div>
```