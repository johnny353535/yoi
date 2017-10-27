---
layout: base
group: utilities
title: Interface
permalink: utilities/interface
---

# Interface

<p class="intro">Text-selection, pointer-events, scrolling overflow and focus styles.</p>

## Text Selection

| `.slct-none` | Disables text selection |

## Pointer Events

| `.pntr-auto` | Enables pointer events  |
| `.pntr-none` | Disables pointer events |

[Learn more about pointer events.](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)

## Scroll

| `.scrl-x` | Scroll overflow *horizontally* (left/right) |
| `.scrl-y` | Scoll overflow *vertically* (top/bottom)    |

## Focus

Use `.focus` to add the default focus styling (like on text inputs). Use `.tabFocus` or `.tabFocus-inset` to add an animated and prominent focus style. YOI applies these stylings whenever an element gets focus from a tab-key press.

| `.focus`          | … |
| `.tabFocus`       | … |
| `.tabFocus-inset` | … |

```html
<!-- example -->
<div class="br-all m-b-6 p-4 bg-base-25 focus">focus</div>
<div class="br-all m-b-6 p-4 bg-base-25 tabFocus">tabFocus</div>
<div class="br-all p-4 bg-base-25 tabFocus-inset">tabFocus-inset</div>
```