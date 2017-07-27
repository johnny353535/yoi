---
layout: base
group: behaviours
title: ScrollFx
permalink: behaviours/scrollfx
---

# ScrollFx

<p class="intro">Adds effects or transitions to elements, when they enter or leave the viewport while scrolling.</p>

| Js-Files | [scrollAgent.js]({{ pathToSourceFile }}assets/js/modules/scrollAgent.js), [scrollFx.js]({{ pathToSourceFile }}assets/js/features/scrollFx.js) |

## Parameters

| `in`     | The effect to apply when the element scrolls into the viewport                                                                    |
| `center` | The effect to apply when the element is at the center of the viewport                                                             |
| `out`    | The effect to apply when the element scrolls out of the viewport                                                                  |
| `speed`  | Change the default speed af the effects to `fast` or `slow`                                                                       |
| `repeat` | By default, the effects play each time on in/center/out. If you wish to apply them only once on in/center/out, set it to `false`. |

### In, Center, Out

Each element can have up to three effects. One for `in`, `center` and `out`. The keywords target the element according to their position relative to the viewport while scrolling. That means that an effect on `in` plays when the element scrolls into the visible area of the page – no matter if you scroll up or down. `out` is the opposite (element leaves the visible area) and `center` applies the effect when the element is right in the vertical center of the visible area. 

The following example will apply a fade-in effect when the element reaches the center of the viewport:

```html
<!-- example -->
<div class="bg-green-15 br h-10" yoi-scrollfx="center:fade-in;"></div>
```

### Speed

You can change the default speed of the effect to either `slow` or `fast`:

```html
<!-- example -->
<div class="bg-blue-17 br m-b-2 h-10" yoi-scrollfx="center:slide-in-left; speed:slow;"></div>
<div class="bg-yellow-18 br h-10" yoi-scrollfx="center:slide-in-right; speed:fast;"></div>
```

### Repeat

By default, the effects play each time the according keywords (`in, center, out`) apply. If you wish to play them only once, set `repeat` to `false`:

```html
<!-- example -->
<div class="bg-purple-18 br h-10" yoi-scrollfx="center:flip-in-x; repeat:false;"></div>
```

### Available Effects

You can use all [fx utility classes](utilities/fx.html):

| `fx-fade-in`          | fades in                       |
| `fx-fade-out`         | fades out                      |
| `fx-scale-up`         | grows                          |
| `fx-scale-down`       | shrinks                        |
| `fx-slide-in-top`     | moves in from the top          |
| `fx-slide-out-top`    | moves out to the top           |
| `fx-slide-in-bottom`  | moves in from the bottom       |
| `fx-slide-out-bottom` | moves out to the bottom        |
| `fx-slide-in-left`    | moves in from the left         |
| `fx-slide-out-left`   | moves out to the left          |
| `fx-slide-in-right`   | moves in from the right        |
| `fx-slide-out-right`  | moves out to the right         |
| `fx-flip-in-x`        | 3d-flip in on horizontal axis  |
| `fx-flip-out-x`       | 3d-flip out on horizontal axis |
| `fx-flip-in-y`        | 3d-flip in on vertical axis    |
| `fx-flip-out-y`       | 3d-flip out on vertical axis   |
| `fx-shake`            | shakes                         |
| `fx-pulse`            | pulses                         |