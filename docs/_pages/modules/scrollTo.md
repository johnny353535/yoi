---
layout: base
group: modules
title: ScrollTo
permalink: modules/scrollto
---

## scrollTo

<p class="intro">This script provides a simple interface to set smooth automated scrolls to target anchors within the same document.</p>

|         |                                                                    |
| -       | -                                                                  |
| Js-File | [scrollTo.js]({{ pathToSourceFile }}assets/js/modules/scrollTo.js) |
| Hooks   | `yoi-scrollto`                                                     |
| Options | `highlight: [blink / pulse]`                                       |

### Smoothly Scroll to an Anchor

In order to set a smooth automated scroll (to a target element within the same document), add the yoi-attribute `yoi-scrollto` to the link.

```html
<a class="btn btn--large" href="#target-1" yoi-scrollto>Scroll to Target #1</a>
<div class="m-tb-20">
    <div id="target-1" class="w-20 al-c p-8 br bg-purple-15 tc-purple-24 fs-15">Target #1</div>
</div>
```

### Highlighting Effects

If you wish to highlight the target element once the autometed scroll finished, add one of the two available highlight animation types – `blink` and `pulse` to the `yoi-scrollto`-attribute.

```html
<a class="btn btn--large" href="#target-2" yoi-scrollto="highlight:blink">Scroll to Target #2</a>
<a class="btn btn--large" href="#target-3" yoi-scrollto="highlight:pulse">Scroll to Target #3</a>
<div id="target-2" class="w-20 al-c p-8 m-b-4 br bg-green-15 tc-green-24 fs-15">Target #2</div>
<div id="target-3" class="w-20 al-c p-8 br bg-red-17 tc-red-24 fs-15">Target #3</div>
```

### Scroll a Container

The target element may sit inside a container with hidden or scrollable overflow. In this case, instead of scrolling the whole page, only the container scrolls.

<p class="hint"><b>Positioning / Context</b> Note: In order to scroll a container, the container itself must provide a context for positioning. This means it must be set to either <code>position:relative</code>, <code>position:absolute</code> or <code>position:fixed</code>.</p>

```html
<a class="btn btn--large" href="#target-4" yoi-scrollto>Scroll Container to Target #4</a>
<a class="btn btn--large" href="#target-5" yoi-scrollto>Scroll Container to Target #5</a>
```

<div class="m-t-4 h-40 p-4 br b-all bc-main-22 pos-rel scrl-y">
    <div class="w-20 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-15">Placeholder</div>
    <div class="w-20 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-15">Placeholder</div>
    <div class="w-20 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-15">Placeholder</div>
    <div class="w-20 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-15">Placeholder</div>
    <div class="w-20 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-15">Placeholder</div>
    <div id="target-4" class="w-20 al-c p-8 m-b-2 br bg-yellow-20 tc-yellow-8 fs-15">Target #4</div>
    <div class="w-20 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-15">Placeholder</div>
    <div class="w-20 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-15">Placeholder</div>
    <div class="w-20 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-15">Placeholder</div>
    <div class="w-20 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-15">Placeholder</div>
    <div class="w-20 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-15">Placeholder</div>
    <div class="w-20 al-c p-8 m-b-2 br bg-main-23 tc-main-12 fs-15">Placeholder</div>
    <div id="target-5" class="w-20 al-c p-8 m-b-2 br bg-yellow-20 tc-yellow-8 fs-15">Target #5</div>
</div>
