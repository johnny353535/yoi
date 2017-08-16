---
layout: base
group: utilities
title: Visibility
permalink: utilities/visibility
---

# Visibility

<p class="intro">Use these utilities to set the visibility for any element.</p>

## Utilities

| `.vis-vis` | Sets any element to `visibility: visible;` |
| `.vis-hid` | Sets any element to `visibility: hidden;`  |
| `.hidden`  | Visually hidden, yet accessible.           |

<p class="hint hint--negative"><b>Accessability:</b> If you want to make sure that screen readers are able to access your element, use the utility <code>.hidden</code> instead of <code>.vis-hid</code>.</p>

## Responsive Utilities

| `.s--hidden`  | Visually hidden, yet accessible on small screens.       |
| `.m--hidden`  | Visually hidden, yet accessible on medium screens.      |
| `.l--hidden`  | Visually hidden, yet accessible on large screens.       |
| `.xl--hidden` | Visually hidden, yet accessible on extra large screens. |

## Examples

Resize the browser window and watch how visibility changes, responding to the screen size:

```html
<!-- example -->
<div class="br bg-main-25 p-4 tc-main-13 m-b-2 vis-vis">visible at <b>any screen size</b></div>
<div class="br bg-main-25 p-4 tc-main-13 m-b-2 vis-hid">hidden at any screen size, also inaccessible to screenreaders</div>
<div class="br bg-main-25 p-4 tc-main-13 m-b-2 hidden">visually hidden, yet accessible to screenreaders</div>
<div class="br bg-main-25 p-4 tc-main-13 m-b-2 s--hidden">hidden on <b>small</b> screens</div>
<div class="br bg-main-25 p-4 tc-main-13 m-b-2 m--hidden">hidden on <b>medium</b> screens</div>
<div class="br bg-main-25 p-4 tc-main-13 m-b-2 l--hidden">hidden on <b>large</b> screens</div>
<div class="br bg-main-25 p-4 tc-main-13 m-b-2 xl--hidden">hidden on <b>extra large</b> screens</div>
```

### Visible Only at a Specific Screen Size

If you wish to display an element at a specific screen size only, combine the responsible `.*--hidden`-utilities to achieve the desired result. The element in the following example is only visible on small screens:

```html
<!-- example -->
<div class="br bg-yellow-22 tc-yellow-10 p-4 m--hidden l--hidden xl--hidden">visible <b>only on small</b> screens</div>
```

## Associated Files

| src/less/utilities/visibility.less            |
| src/less/utilities/responsive-visibility.less |
