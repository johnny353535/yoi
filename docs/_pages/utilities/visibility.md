---
layout: base
group: utilities
title: Visibility
permalink: utilities/visibility
srcfiles:
    - visibility-base.less
    - visibility-responsive.less
---

# Visibility

<p class="intro">Use these utilities to set the visibility for any element.</p>

## Utilities

| `.vis-vis` | Sets any element to `visibility: visible;` |
| `.vis-hid` | Sets any element to `visibility: hidden;`  |
| `.hidden`  | Visually hidden, yet accessible.           |

<p class="hint hint--negative"><b>Accessability:</b> If you want to make sure that screen readers are able to access your element, use the utility <code>.hidden</code> instead of <code>.vis-hid</code>.</p>

## Responsive Utilities

| `.m--hidden`      | Visually hidden, yet accessible on **medium and larger screens**. |
| `.l--hidden`      | Visually hidden, yet accessible on **large and larger screens**.  |
| `.xl--hidden`     | Visually hidden, yet accessible on **extra large screens**.       |
| `.only-s--hidden` | Visually hidden, yet accessible on **small screens only**         |
| `.only-m--hidden` | Visually hidden, yet accessible on **medium screens only**        |
| `.only-l--hidden` | Visually hidden, yet accessible on **large screens only**         |

## Examples

Resize the browser window and watch how visibility of the colored squares in the first column changes depending on the screen size:

```html
<!-- example:tabs -->
<table class="table--stripped">
    <tr>
        <td class="w-2">
            <div class="bg-blue-20 w-2 h-2 m--hidden"></div>
        </td>
        <td>
            <code>.m--hidden</code>
        </td>
    </tr>
    <tr>
        <td class="w-2">
            <div class="bg-blue-20 w-2 h-2 l--hidden"></div>
        </td>
        <td>
            <code>.l--hidden</code>
        </td>
    </tr>
    <tr>
        <td class="w-2">
            <div class="bg-blue-20 w-2 h-2 xl--hidden"></div>
        </td>
        <td>
            <code>.xl--hidden</code>
        </td>
    </tr>
    <tr>
        <td class="w-2">
            <div class="bg-purple-20 w-2 h-2 only-s--hidden"></div>
        </td>
        <td>
            <code>.only-s--hidden</code>
        </td>
    </tr>
    <tr>
        <td class="w-2">
            <div class="bg-purple-20 w-2 h-2 only-m--hidden"></div>
        </td>
        <td>
            <code>.only-m--hidden</code>
        </td>
    </tr>
    <tr>
        <td class="w-2">
            <div class="bg-purple-20 w-2 h-2 only-l--hidden"></div>
        </td>
        <td>
            <code>.only-l--hidden</code>
        </td>
    </tr>
</table>
```

### Visible Only at a Specific Screen Size

If you wish to display an element at a specific screen size only, combine the responsible `.*--hidden`-utilities to achieve the desired result. The element in the following example is only visible on small screens:

```html
<!-- example -->
<div class="br-all bg-yellow-22 c-yellow-10 p-4 m--hidden l--hidden xl--hidden">visible <b>only on small</b> screens</div>
```