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

<p class="intro">Use these utilities to set the visibility for an element.</p>

## Utilities

| `.vis-hidden`  | Hides an element                                              |
| `.vis-visible` | Makes an element visible                                      |
| `.hidden`      | Hides an element but preserver accessility for screen readers |
| `.visible`     | Opposite of `.hidden`                                         |

<p class="hint hint--negative"><b>Accessability:</b> If you want to make sure that screen readers are able to access your hidden element, use the utility <code>.hidden</code> instead of <code>.vis-hidden</code>.</p>

Learn more about manipulatig visibility with CSS: [Now You See Me / A List Apart](http://alistapart.com/article/now-you-see-me), [Places It’s Tempting To Use Display: None; But Don’t / CSS Tricks](https://css-tricks.com/places-its-tempting-to-use-display-none-but-dont/)

## Responsive Utilities

| `.m:vis-hidden`       | Hidden on **medium and larger screens**.                          |
| `.m:vis-visible`      | Visible on **medium and larger screens**.                         |
| `.m:hidden`           | Visually hidden, yet accessible on **medium and larger screens**. |
| `.m:visible`          | Visible on **medium and larger screens**.                         |
| `.l:vis-hidden`       | Hidden on **large and larger screens**.                           |
| `.l:vis-visible`      | Visible on **large and larger screens**.                          |
| `.l:hidden`           | Visually hidden, yet accessible on **large and larger screens**.  |
| `.l:visible`          | Visible on **large and larger screens**.                          |
| `.xl:vis-hidden`      | Hidden on **extra large screens**.                                |
| `.xl:vis-visible`     | Visible on **extra large screens**.                               |
| `.xl:hidden`          | Visually hidden, yet accessible on **extra large screens**.       |
| `.xl:visible`         | Visible on **extra large screens**.                               |
| `.only-s:vis-hidden`  | Hidden on **small screens only**.                                 |
| `.only-s:vis-visible` | Visible on **small screens only**.                                |
| `.only-s:hidden`      | Visually hidden, yet accessible on **small screens only**         |
| `.only-s:visible`     | Visible on **small screens only**.                                |
| `.only-m:vis-hidden`  | Hidden on **medium screens only**.                                |
| `.only-m:vis-visible` | Visible on **medium screens only**.                               |
| `.only-m:hidden`      | Visually hidden, yet accessible on **medium screens only**        |
| `.only-m:visible`     | Visible on **medium screens only**.                               |
| `.only-l:vis-hidden`  | Hidden on **large screens only**.                                 |
| `.only-l:vis-visible` | Visible on **large screens only**.                                |
| `.only-l:hidden`      | Visually hidden, yet accessible on **large screens only**         |
| `.only-l:visible`     | Visible on **large screens only**                                 |

<p class="hint hint--negative"><b>Choose the right opposite:</b> Make sure you don’t pick false opposites like <code>.vis-hidden</code> and <code>.visible</code> while creating responsive layouts. Always use <code>.visible</code> to override <code>.hidden</code> and <code>.vis-visible</code> to override <code>.vis-hidden</code>.</p>

## Examples

Resize the browser window and watch how visibility of the colored squares in the first column changes depending on the screen size:

```html
<!-- example:tabs -->
<table class="table--stripped">
    <tr>
        <td class="w-2">
            <div class="bg-blue-20 w-2 h-2 m:hidden"></div>
        </td>
        <td>
            <code>.m:hidden</code>
        </td>
    </tr>
    <tr>
        <td class="w-2">
            <div class="bg-blue-20 w-2 h-2 l:hidden"></div>
        </td>
        <td>
            <code>.l:hidden</code>
        </td>
    </tr>
    <tr>
        <td class="w-2">
            <div class="bg-blue-20 w-2 h-2 xl:hidden"></div>
        </td>
        <td>
            <code>.xl:hidden</code>
        </td>
    </tr>
    <tr>
        <td class="w-2">
            <div class="bg-purple-20 w-2 h-2 only-s:hidden"></div>
        </td>
        <td>
            <code>.only-s:hidden</code>
        </td>
    </tr>
    <tr>
        <td class="w-2">
            <div class="bg-purple-20 w-2 h-2 only-m:hidden"></div>
        </td>
        <td>
            <code>.only-m:hidden</code>
        </td>
    </tr>
    <tr>
        <td class="w-2">
            <div class="bg-purple-20 w-2 h-2 only-l:hidden"></div>
        </td>
        <td>
            <code>.only-l:hidden</code>
        </td>
    </tr>
</table>
```
