---
layout: base
group: actions
title: ScrollTo
permalink: actions/scrollto
---

# ScrollTo

<p class="intro">Use this action to smoothly scroll to a target element.</p>

## Example

Use `yoi-action="ScrollTo:CssSelector"` to smoothly scroll to the target element:

```html
<!-- example -->
<a class="btn btn--large" href="#exampleTarget-1" yoi-action="ScrollTo:#exampleTarget-1;">Scroll to #exampleTarget-1</a>
<div class="m-tb-20">
    <div id="exampleTarget-1" class="w-30 al-c p-8 br bg-purple-15 tc-purple-24 fs-2">#exampleTarget-1</div>
</div>
```

### Scroll a Container

The target element may sit inside a container with hidden or scrollable overflow. In this case, instead of scrolling the whole page, only the container scrolls.

<p class="hint"><b>Positioning / Context</b> Note: In order to scroll a container, the container itself must provide a context for positioning. This means it must be set to either <code>position:relative</code>, <code>position:absolute</code> or <code>position:fixed</code>.</p>

```html
<!-- example -->
<a class="btn btn--large" href="#exampleTarget-2" yoi-action="ScrollTo:#exampleTarget-2;">Scroll to #exampleTarget-2</a>
<a class="btn btn--large" href="#exampleTarget-3" yoi-action="ScrollTo:#exampleTarget-3;">Scroll to #exampleTarget-3</a>
```

<div class="m-t-4 h-40 p-4 br b-all bc-main-22 pos-rel scrl-y">
    <div class="w-25 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-2">Placeholder</div>
    <div id="exampleTarget-2" class="w-25 al-c p-8 m-b-2 br bg-yellow-20 tc-yellow-8 fs-2">#exampleTarget-2</div>
    <div class="w-25 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-2">Placeholder</div>
    <div class="w-25 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-2">Placeholder</div>
    <div id="exampleTarget-3" class="w-25 al-c p-8 m-b-2 br bg-yellow-20 tc-yellow-8 fs-2">#exampleTarget-3</div>
</div>

## Parameters

| `on`        | optional – Any valid event ([learn more](actions/index.html#the-on-parameter)). The default is `click`.          |
| `highlight` | optional – `blink` or `pulse` – a highlight animation on the target element that starts after scrolling.         |
| `offset`    | optional – A number to set the offset between the target element and the viewport’s top edge. The default is 20. |

### Highlight

If you wish to highlight the target element once the autometed scroll finished, use one of the two available highlight animation types – `blink` and `pulse`:

```html
<!-- example -->
<a class="btn btn--large" href="#exampleTarget-4" yoi-action="ScrollTo:#exampleTarget-4; highlight:blink;">Scroll to #exampleTarget-4</a>
<a class="btn btn--large" href="#exampleTarget-5" yoi-action="ScrollTo:#exampleTarget-5; highlight:pulse;">Scroll to #exampleTarget-5</a>
<div class="m-tb-20">
    <div id="exampleTarget-4" class="w-30 al-c p-8 m-b-4 br bg-green-15 tc-green-24 fs-2">#exampleTarget-4</div>
    <div id="exampleTarget-5" class="w-30 al-c p-8 br bg-red-17 tc-red-24 fs-2">#exampleTarget-5</div>
</div>
```

### Offset

If you wish to add some distance between the viewport’s top edge and the target element after scrolling, use the offset option. The number you provide translates to a pixel value, the default is 20:

```html
<!-- example -->
<a class="btn btn--large" href="#exampleTarget-6" yoi-action="ScrollTo:#exampleTarget-6; offset:100;">Scroll to #exampleTarget-6</a>
```

<div style="margin:800px 0;">
    <div id="exampleTarget-6" class="w-30 al-c p-8 m-b-4 br bg-green-15 tc-green-24 fs-2">#exampleTarget-6</div>
</div>