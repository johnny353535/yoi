---
layout: base
group: utilities
title: Grid
permalink: utilities/grid
srcfiles:
    - grid-base.less
    - grid-responsive.less
---

# Grid

<p class="intro">Adds or overrides flexbox rules.</p>

<p class="hint">We called this collection <i>Grid</i> because it contains the utilities for flexbox layout, which we encourage you to combine with the <a href="sizing.html">sizing utilities</a> to create grid-like layouts.</p>

## How to Create Layouts

Create straightforward one-dimendional layouts with very few utilities. Use `.flx` (on the container) and fractional [sizing utilities](sizing.html) like `.w-1-2, .w-1-4, …` (on the containing elements):

```html
<!-- example -->
<div class="flx">
    <div class="w-1-2 p-4 c-red-10 bg-red-25">1/2</div>
    <div class="w-1-4 p-4 c-purple-10 bg-purple-25">1/4</div>
    <div class="w-1-4 p-4 c-blue-10 bg-blue-25">1/4</div>
</div>
```

Create responsive layouts by using the [breakpoint-prefixes](#responsive-flexbox). The following example displays three columns at 50% and 25% width, next to each other, in the same order they appear in markup on large screens. On small screens, you will see three 100% wide blocks stacked on top of each other in a different order:

```html
<!-- example -->
<div class="flx flx-directionColumn l:flx-directionRow">
    <div class="flx-3 l:w-1-2 l:flx-1 p-4 c-red-10 bg-red-25"><b>1</b></div>
    <div class="flx-1 l:w-1-4 l:flx-2 p-4 c-purple-10 bg-purple-25"><b>2</b></div>
    <div class="flx-2 l:w-1-4 l:flx-3 p-4 c-blue-10 bg-blue-25"><b>3</b></div>
</div>
```

## Flexbox

As [css-tricks.com](https://css-tricks.com) explains it nicely: *Flexbox is […] a single-direction layout concept. Think of flex items as primarily laying out either in horizontal rows or vertical columns.*

Since flexbox is a rather complex layout concept, it’s best to learn it with visual examples. Others did a great job on this already, take a look at:

* [css-tricks.com](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [cssreference.io](http://cssreference.io/flexbox/)
* [scotch.io](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)

### Utilities for Flex Container

<p class="hint hint--primary">Please note that the <code>.flx</code> utility wraps it’s items to a new line of they do not fit it’s width. By default, a mere <code>display: flex;</code> wraps it’s items.</p>

| `.flx`                          | Defines a block flex container, enables flex context for all of its direct children, lets items wrap onto multiple lines from top to bottom. |
| `.flx-wrap`                     | Wraps flex items onto multiple lines, from top to bottom. |
| `.flx-noWrap`                   | Places all flex items on one line. |
| `.flx-wrapReverse`              | Wraps flex items onto multiple lines from bottom to top. |
| `.flx-directionRow`             | Establishes the main-axis from left to right. |
| `.flx-directionRowReverse`      | Establishes the main-axis from right to left. |
| `.flx-directionColumn`          | Establishes the main-axis from top to bottom. |
| `.flx-directionColumnReverse`   | Establishes the main-axis from bottom to top. |
| `.flx-alignStart`               | Cross-start margin edge of the items is placed on the cross-start line. |
| `.flx-alignEnd`                 | Cross-end margin edge of the items is placed on the cross-end line. |
| `.flx-alignCenter`              | Centers items in the cross-axis |
| `.flx-alignBaseline`            | Alignes items such as their baselines align. |
| `.flx-alignStretch`             | Stretches lines to take up the remaining space. |
| `.flx-alignContentStart`        | Packs lines at the start of the container. |
| `.flx-alignContentEnd`          | Packs lines at the end of the container. |
| `.flx-alignContentCenter`       | Packs lines at the center of the container. |
| `.flx-alignContentSpaceBetween` | Distributes lines evenly; the first line is at the start of the container while the last one is at the end. |
| `.flx-alignContentSpaceAround`  | Distributes lines evenly with equal space around each line. |
| `.flx-justifyStart`             | Packs items toward the start line. |
| `.flx-justifyEnd`               | Packs items toward to end line. |
| `.flx-justifyCenter`            | Centers items along the line. |
| `.flx-justifySpaceBetween`      | Distributes items evenly in the line; first item is on the start line, last item on the end line. |
| `.flx-justifySpaceAround`       | Distributes items evenly in the line with equal space around them. |
| `.flx-justifySpaceEvenly`       | Distributes items so that the spacing between any two items (and the space to the edges) is equal. |

### Utilities for Flex Items

| `.flx-alignSelfStart`           | Overrides the item’s alignment, see `.flx-alignStart`.    |
| `.flx-alignSelfEnd`             | Overrides the item’s alignment, see `.flx-alignEnd`.      |
| `.flx-alignSelfCenter`          | Overrides the item’s alignment, see `.flx-alignCenter`.   |
| `.flx-alignSelfBaseline`        | Overrides the item’s alignment, see `.flx-alignBaseline`. |
| `.flx-alignSelfStretch`         | Overrides the item’s alignment, see `.flx-alignStretch`.  |
| `.flx-grow`                     | Applies `flex-grow: 1` to the item                        |

### Responsive Flexbox

You can add [breakpoint-prefixes]() to all utilities listetd above to control their behaviour according to the current breakpoint:

| `.only-s:flx-[*]` | `.flx-[*]` only at breakpoint `s`       |
| `.m:flx-[*]`      | `.flx-[*]` at breakpoint `m` and larger |
| `.only-m:flx-[*]` | `.flx-[*]` only at breakpoint `m`       |
| `.l:flx-[*]`      | `.flx-[*]` at breakpoint `l` and larger |
| `.only-l:flx-[*]` | `.flx-[*]` only at breakpoint `l`       |
| `.xl:flx-[*]`     | `.flx-[*]` at breakpoint `xl`           |

## What About CSS Grid?

You should be able to create most layouts with the flexbox technique described above. Whenever you need more complex, two-dimensional layouts – that means layouts with rules for both vertical and horizontal attributes – you should use proper CSS grids. However, we decided to not implement CSS grid utilities at this point. If you need layouts of this complexity, you are better off writing your own CSS.

Learn more about CSS grid on [css-tricks.com](https://css-tricks.com/snippets/css/complete-guide-grid/).