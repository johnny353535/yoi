---
layout: base
group: actions
title: ScrollTo
permalink: actions/scrollto
---

# ScrollTo

<p class="intro">Smoothly scrolls to a target element.</p>

## Example

Add `yoi-action="ScrollTo:#id"` to smoothly scroll to the target element:

```html
<!-- example -->
<a class="btn btn--large" href="#example-1" yoi-action="ScrollTo:#example-1;">Scroll to #example-1</a>
<div class="m-t-20">
    <div id="example-1" class="w-30 al-c p-8 br-all bg-purple-15 c-purple-24 fs-2">#example-1</div>
</div>
```

### Scroll a Container Element

If the target element is inside a scrollable container element, instead of scrolling the whole page, only the container scrolls. This is detected automatically, no additional parameters are required.

<p class="hint hint--primary"><b>Positioning / Context</b> To scroll a container, the container itself must provide a context for positioning. This means it must be set to either <code>position:relative</code>, <code>position:absolute</code> or <code>position:fixed</code>.</p>

```html
<!-- example -->
<a class="btn btn--large" href="#example-2" yoi-action="ScrollTo:#example-2;">Scroll to #example-2</a>
<a class="btn btn--large" href="#example-3" yoi-action="ScrollTo:#example-3;">Scroll to #example-3</a>
```

<div class="m-t-4 h-40 p-4 br-all b-all bc-base-22 pos-relative scr-y">
    <div class="w-25 al-c p-8 m-b-2 br-all bg-base-24 c-base-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br-all bg-base-24 c-base-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br-all bg-base-24 c-base-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br-all bg-base-24 c-base-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br-all bg-base-24 c-base-12 fs-2">Placeholder</div>
    <div id="example-2" class="w-25 al-c p-8 m-b-2 br-all bg-yellow-20 c-yellow-8 fs-2">#example-2</div>
    <div class="w-25 al-c p-8 m-b-2 br-all bg-base-24 c-base-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br-all bg-base-24 c-base-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br-all bg-base-24 c-base-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br-all bg-base-24 c-base-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br-all bg-base-24 c-base-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br-all bg-base-24 c-base-12 fs-2">Placeholder</div>
    <div id="example-3" class="w-25 al-c p-8 m-b-2 br-all bg-yellow-20 c-yellow-8 fs-2">#example-3</div>
</div>

## Parameters

| `on`        | Optional – a valid event ([learn more](actions/index.html#the-on-parameter)). The default event is `click`.             |
| `trigger`   | Optional – the trigger element to listen to ([learn more](actions/index.html#the-trigger-parameter)).                   |
| `highlight` | Optional – `blink` or `pulse` – a highlight animation of the target element that starts after scrolling.                |
| `offset`    | Optional – a number (px) to set the offset between the target element and the viewport’s top edge. The default is `20`. |

### Highlight

Set the highlight parameter to one of the two available highlight animation types – `blink` and `pulse` – to highlight the target element after scrolling:

```html
<!-- example -->
<a class="btn btn--large" href="#example-4" yoi-action="ScrollTo:#example-4; highlight:blink;">Scroll to #example-4 and blink</a>
<a class="btn btn--large" href="#example-5" yoi-action="ScrollTo:#example-5; highlight:pulse;">Scroll to #example-5 and pulse</a>
<div class="m-t-20">
    <div id="example-4" class="w-30 al-c p-8 m-b-4 br-all bg-green-15 c-green-24 fs-2">#example-4</div>
    <div id="example-5" class="w-30 al-c p-8 br-all bg-red-17 c-red-24 fs-2">#example-5</div>
</div>
```

### Offset

Set the offset parameter to the desired distance (in px) between the viewport’s top edge and the target element’s top edge after scrolling:

```html
<!-- example -->
<a class="btn btn--large" href="#example-6" yoi-action="ScrollTo:#example-6; offset:100;">Scroll to #example-6</a>
```

<div style="margin:800px 0;">
    <div id="example-6" class="w-30 al-c p-8 m-b-4 br-all bg-green-15 c-green-24 fs-2">#example-6 with 100px offset</div>
</div>

## Events

This action fires the following [events]({{ site.github.url }}glossary) on each element it is applied to:

| `yoi-scrollto-start` | Fires after the scrolling starts. |
| `yoi-scrollto-en`    | Fires after the scrolling ends.   |