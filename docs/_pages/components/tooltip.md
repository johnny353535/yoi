---
layout: base
group: components
title: Tooltip
permalink: components/tooltip
---

# Tooltip

<p class="intro">Small contextual bits of text on mouseover.</p>

## Basic Example

This is how a basic `.toolTip` looks like and how you write the markup:

```html
<!-- example -->
<div class="br-all p-4 w-10 h-10 lh-5 al-c c-blue-15 bg-blue-24" yoi-tooltip="content:This is a tooltip;">Move Cursor here</div>
```

<p class="hint hint--negative"><b>Correct Formatting:</b> If at least one value contains special characters (slashes, colons etc.), wrap <b>all values</b> in <i>single quotation marks</i>: <code>foo:'some//value:with_special?charactes'; bar:'12'; foobar:'abc'</code>.</p>

### Existing Dom Elements as Tooltips

By default, a tooltip is generated and injected into the dom. If you are interested in progressive enhancement and the content of the tooltip makes sense to display even if JavaScript is not executed, you can turn any existing element in the document into a tooltip. You need to reference it by id:

```html
<!-- example -->
<!-- trigger element -->
<div class="br-all p-4 w-10 h-10 lh-5 al-c c-blue-15 bg-blue-24" yoi-tooltip="target:#tooltip-1;">Move Cursor here</div>
<!-- tooltip -->
<div class="note m-b-2" id="tooltip-1">
    <div class="note__body">
        <p>This is a tooltip.</p>
    </div>
</div>
```

When JavaScript is disabled, the user sees a nicely styled [note element]({{ site.github.url }}/components/note.html). This is very flexible and gives you complete control over styling your no-JS fallback.

<p class="hint"><b>Use any Markup:</b> You can use any markup you wish as a tooltip. The text content is always transformed into a properly styled tooltip.</p>
<p class="hint"><b>Smart Positioning:</b> Tooltips are displayed relative to the cursor position on mouseover and adjust themselves automatically so the viewport does not cut them off.</p>

## Parameters

| `target`         | CSS id selector                  | The id selector of the element to convert into a tooltip.                                                                                                                   |
| `staticPosition` | `top`, `right`, `bottom`, `left` | Creates a static tooltip with a pointer at the given position, relative to it’s trigger element.                                                                            |
| `fixed`          | `true`/`false`                   | Sets tootip positioning to `fixed` instead of `absolute`. Enable this option if you display a tooltip over a fixed-positioned element so it stays in place while scrolling. |
| `showDelay`      | time in milliseconds             | Time to delay showing the tooltip, default is 300                                                                                                                           |
| `hideDealy`      | time in milliseconds             | Time to delay hiding the tooltip, default is 200                                                                                                                            |
| `generate`       | boolean true/false               | Set to `true` to generate a tooltip on the fly via JS instead of converting a dom element into a tooltip, default is `false`                                                |

### Static Position

Set the parameter `staticPosition` to `top`, `right`, `bottom`, `left` to create a *static* tooltip with a pointer at the given position, relative to it’s trigger element:

```html
<!-- example -->
<!-- trigger elements -->
<span class="d-inlineblock br-all p-2 c-blue-15 bg-blue-24 m-r-4" yoi-tooltip="target:#tooltip-2; staticPosition:top;">top</span>
<span class="d-inlineblock br-all p-2 c-blue-15 bg-blue-24 m-r-4" yoi-tooltip="target:#tooltip-2; staticPosition:right;">right</span>
<span class="d-inlineblock br-all p-2 c-blue-15 bg-blue-24 m-r-4" yoi-tooltip="target:#tooltip-2; staticPosition:bottom;">bottom</span>
<span class="d-inlineblock br-all p-2 c-blue-15 bg-blue-24 m-r-4" yoi-tooltip="target:#tooltip-2; staticPosition:left;">left</span>
<!-- tooltip -->
<div id="tooltip-2">
    <p>I won’t move.</p>
</div>
```

<p class="hint hint--negative"><b>Correct Positioning:</b> To make sure the tooltip is positioned correctly, set the trigger element to <code>display:block;</code> or <code>display:inline-block;</code>.</p>

### showDelay

Set the parameter `showDelay` to any number of milliseconds (eg. `showDelay:1000` = one second) to delay showing the tooltip:

```html
<!-- example -->
<!-- trigger element -->
<div class="br-all p-4 w-10 h-10 lh-5 al-c c-blue-15 bg-blue-24" yoi-tooltip="target:#tooltip-3; showDelay:1000;">Move Cursor here</div>
<!-- tooltip -->
<div id="tooltip-3">
    <p>This is a tooltip with 1 second show-delay.</p>
</div>
```

### hideDelay

Set the parameter `hideDealy` to any number of milliseconds (eg. `hideDelay:1000` = one second) to delay hiding the tooltip:

```html
<!-- example -->
<!-- trigger element -->
<div class="br-all p-4 w-10 h-10 lh-5 al-c c-blue-15 bg-blue-24" yoi-tooltip="target:#tooltip-4; hideDelay:1000;">Move Cursor here</div>
<!-- tooltip -->
<div id="tooltip-4">
    <p>This is a tooltip with 1 second hide-delay.</p>
</div>
```

## Custom Events

| `yoi-tooltip-hide`   | Fires when tooltip disappeared        |
| `yoi-tooltip-show`   | Fires when tooltip appeared           |
| `yoi-tooltip-change` | Fires after tooltip (content) changed |
