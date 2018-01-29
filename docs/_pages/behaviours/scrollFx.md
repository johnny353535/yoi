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
| `speed`  | Change the duration of all effects to `slow`, `fast` or a number from 1 to 25 where 1 is the slowest and 25 the fastest.          |
| `repeat` | By default, the effects play each time on in/center/out. If you wish to apply them only once on in/center/out, set it to `false`. |

### In, Center, Out

Each element can have up to three effects. One for `in`, `center` and `out`.

For example, an effect on `in` plays when the element scrolls into the visible area of the page – no matter if you scroll up or down. `out` is the opposite (element leaves the visible area), while `center` applies the effect when the element aligns with the vertical center of the visible area. 

The following example will apply a effect `fx-fade-in` on `center`:

```html
<!-- example -->
<div class="bg-green-15 br-all h-10" yoi-scrollfx="center:fade-in;"></div>
```

### Speed

Add the Parameter `speed` to change the duration of all effects to either `slow` or `fast`:

```html
<!-- example -->
<div class="bg-blue-22 c-blue-10 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:slow;">slow</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:1;">1</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:2;">2</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:3;">3</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:4;">4</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:5;">5</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:6;">6</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:7;">7</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:8;">8</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:9;">9</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:10;">10</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:11;">11</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:12;">12</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:13;">13</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:14;">14</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:15;">15</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:16;">16</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:17;">17</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:18;">18</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:19;">19</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:20;">20</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:21;">21</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:22;">22</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:23;">23</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:24;">24</div>
<div class="bg-base-24 br-all m-b-1 p-2" yoi-scrollfx="center:fade-in; speed:25;">25</div>
<div class="bg-red-22 c-red-10 br-all p-2" yoi-scrollfx="center:fade-in; speed:fast;">fast</div>
```

### Repeat

By default, the effects play each time on `in`, `center` or `out`. Add the parameter `repeat` and set it to `false` to make the effect play only once:

```html
<!-- example -->
<div class="bg-purple-18 br-all h-10" yoi-scrollfx="center:slide-in-bottom; repeat:false;"></div>
```

### Available Effects

You can use all [fx utility classes](utilities/fx.html):

| `.fx-fade-in`          | fades in                 |
| `.fx-fade-out`         | fades out                |
| `.fx-scale-up`         | grows                    |
| `.fx-scale-down`       | shrinks                  |
| `.fx-slide-in-top`     | moves in from the top    |
| `.fx-slide-out-top`    | moves out to the top     |
| `.fx-slide-in-bottom`  | moves in from the bottom |
| `.fx-slide-out-bottom` | moves out to the bottom  |
| `.fx-slide-in-left`    | moves in from the left   |
| `.fx-slide-out-left`   | moves out to the left    |
| `.fx-slide-in-right`   | moves in from the right  |
| `.fx-slide-out-right`  | moves out to the right   |
| `.fx-shake`            | shakes                   |