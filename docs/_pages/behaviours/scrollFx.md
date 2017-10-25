---
layout: base
group: behaviours
title: ScrollFx
permalink: behaviours/scrollfx
srcfiles:
    - scrollfx.js
    - ../modules/scrollagent.js
    - ../../less/utilities/fx.less
---

# Scrollfx

<p class="intro">Adds effects or transitions to an element, responding to the scrolling position.</p>

## Parameters

| `in`     | The effect to apply when the element scrolls into the viewport                                                                    |
| `center` | The effect to apply when the element is at the center of the viewport                                                             |
| `out`    | The effect to apply when the element scrolls out of the viewport                                                                  |
| `speed`  | Change the duration of all effects to `fast` or `slow`                                                                            |
| `repeat` | By default, the effects play each time on in/center/out. If you wish to apply them only once on in/center/out, set it to `false`. |

### In, Center, Out

Each element can have up to three effects. One for `in`, `center` and `out`.

For example, an effect on `in` plays when the element scrolls into the visible area of the page – no matter if you scroll up or down. `out` is the opposite (element leaves the visible area), while `center` applies the effect when the element aligns with the vertical center of the visible area. 

The following example will apply a effect `fx-fade-in` on `center`:

```html
<!-- example -->
<div class="bg-green-15 br h-10" yoi-scrollfx="center:fade-in;"></div>
```

### Speed

Add the Parameter `speed` to change the duration of all effects to either `slow` or `fast`:

```html
<!-- example -->
<div class="bg-blue-17 br m-b-2 h-10" yoi-scrollfx="center:slide-in-left; speed:slow;"></div>
<div class="bg-yellow-18 br h-10" yoi-scrollfx="center:slide-in-right; speed:fast;"></div>
```

### Repeat

By default, the effects play each time on `in`, `center` or `out`. Add the parameter `repeat` and set it to `false` to make the effect play only once:

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