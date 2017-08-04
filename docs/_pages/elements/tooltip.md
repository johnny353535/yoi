---
layout: base
group: elements
title: Tool Tip
permalink: elements/tooltip
---

# Tool Tip

<p class="intro">Use this element to display small bits of text on mouseover.</p>

| Styles         | [toolTip.less]({{ pathToSourceFile }}assets/less/elements/toolTip.less)      |
| Script         | [toolTip.js]({{ pathToSourceFile }}assets/js/elements/toolTip.js)            |
| Script Hook    | `yoi-tooltip`                                                                |
| Base CSS-Class | `.tooltip--attention`                                                        |
| Modifiers      | `.tooltip--error, .tooltip--negative, .tooltip--success, .tooltip--positive` |

## Basic Example

This is how a basic `.toolTip` looks like and how you write the markup:

```html
<!-- example -->
<!-- trigger element -->
<div class="br p-4 w-10 h-10 al-c tc-blue-15 bg-blue-24" yoi-tooltip="target:#tooltip-1;">Move Cursor here</div>
<!-- tooltip -->
<div class="note m-b-2" id="tooltip-1">
    <div class="note__body">
        <p>This is a tooltip.</p>
    </div>
</div>
```

In the example above, when JavaScript is disabled, the user sees a nicely styled [note element](elements/note.html). This is very flexible and gives you complete control over styling your no-JS fallback.

<p class="hint"><b>Use any Markup:</b> You can use any markup you wish as a tooltip. The text content is always transformed into a properly styled tooltip.</p>
<p class="hint"><b>Smart Positioning</b> Tooltips are displayed relative to the cursor position on mouseover. They are smart enough to adjust themselves automatically so the viewport does not cut them off.</p>

## Parameters

| `target`       | CSS id selector   | The id selector of the element to convert into a tooltip.                                         |
| `followCursor` | `true` of `false` | By default, the tooltip follows the moving cursor (true). Set to `false` to disable this feature. |

### Static Tooltips

To stop the tooltip following the moving cursor, set `followCursor` to `false`. This especially makes sense for small tooltip trigger elements:

```html
<!-- example -->
<!-- trigger element -->
<div class="badge badge--rounded badge--positive" yoi-tooltip="target:#tooltip-3;followCursor:false;">?</div>
<!-- tooltip -->
<div id="tooltip-3">
    <p>I won’t move.</p>
</div>
```

## Inheriting Modifiers

A tooltip will inherit certain sematic class names from it’s target element (`*--attention`, `*--error`, `*--negative`, `*--positive`, `*--success`.). This is useful eg. to show tooltips in combination with `.note` to display input validation messages.

```html
<!-- example -->
<form>
    <!-- trigger element -->
    <input class="input--large input--success w-30" type="text" yoi-tooltip="target:#tooltip-2; icon:011;" />
    <!-- tooltip -->
    <div class="note m-b-2 note--success" id="tooltip-2">
        <h3 class="note__headline">Success!</h3>
        <div class="note__body">
            <p>This is a tooltip which inherits the *--success class from it’s trigger element.</p>
        </div>
    </div>
</form>
```

## Custom Events

| event name         | fires when …        |
| ------------------ | ------------------- |
| `yoi-tooltip-hide` | tooltip disappeared |
| `yoi-tooltip-show` | tooltip appeared    |
