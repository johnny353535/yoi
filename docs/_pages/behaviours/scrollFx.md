---
layout: base
group: behaviors
title: ScrollFx
permalink: behaviors/scrollfx
srcfiles:
    - scrollfx.js
    - ../modules/scrollagent.js
    - ../../less/utilities/fx.less
---

# Scrollfx

<p class="intro">Adds effects or transitions to an element, responding to the scrolling position.</p>

## Parameters

| `in`     | [The effect](/yoi/{{ page.url }}.html#available-effects) to apply when the element enters the viewport                                 |
| `bottom` | [The effect](/yoi/{{ page.url }}.html#available-effects) to apply when the element is completely visible inside the viewport           |
| `center` | [The effect](/yoi/{{ page.url }}.html#available-effects) to apply when the element is at the center of the viewport                    |
| `top`    | [The effect](/yoi/{{ page.url }}.html#available-effects) to apply when the element reaches the top edge of the viewport                |
| `speed`  | Change the duration of all effects to `slow`, `fast` or a number from 1 to 25 where 1 is the slowest and 25 the fastest.          |
| `repeat` | By default, the effects play each time on in/center/out. If you wish to apply them only once on in/center/out, set it to `false`. |
| `not`    | `string` or a comma-seperated list of strings - the breakpoints/screen-sizes on which scroll fx are disabled                      |

### In, Bottom, Center, Top

Each element can have up to four effects. One for `in`, `bottom`, `center` and `top`. See the [table above](/yoi/{{ page.url }}.html#parameters) to learn what these parameters mean.
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

### Not

Use the parameter `not` to define one or more breakpoints on which you wish to disable the scroll fx:

```html
<!-- example -->
<div class="flx">
    <div class="bg-purple-24 br-all h-10 w-10 m-r-2" yoi-scrollfx="center:fade-in; not:small;"></div>
    <div class="bg-purple-24 br-all h-10 w-10" yoi-scrollfx="center:fade-in; not:xlarge;"></div>
</div>
```

<p class="hint hint--primary"><b>Allowed values:</b> Make sure you use only the allowed values <code>small</code>, <code>medium</code>, <code>large</code> and <code>xlarge</code>.</p>

## Available Effects

You can use all [fx utility classes]({{ site.github.url }}/utilities/fx.html):

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
