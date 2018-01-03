---
layout: base
group: components
title: ScrollKeys
permalink: components/scrollkeys
---

# ScrollKeys

<div class="m-t-4 m--pos-tr m--m-4 m--m-t-10">
    <span class="badge badge--medium badge--rounded badge--negative">issues</span>
</div>

<p class="intro">Buttons (with keyboard bindings) to scroll the page back and forth between <i>jump marks</i>.</p>

## Usage

Add `.scrollKeys` to any page by adding the attribute `yoi-scrollkeys` to the `<body>` element:

```html
<body yoi-scrollkeys> … </body>
```

Scroll to see the element in action on this page.

## Parameters

| `hooks`    | CSS selector           | Optional. Defines the *hooks* (= jump marks). Any CSS selector will work. Default is `h1, h2, h3, h4, h5, h6`.             |
| `position` | `tl`, `tr`, `br`, `bl` | Optional. Set the position of the scroll buttons to one of the four edges of the screen. Default is `br` (= bottom right). |

### Attributes

Set the *hooks* (= jump marks) to any collection of elements on the page by providing a CSS selector. The following example would jump back and forth between all elements with the CSS-class `.jumpMark`:

```html
<body yoi-scrollkeys="hooks:'.jumpMark'"> … </body>
```

### Position

Pin the `.scrollKeys` to one of the four corners of the screen: `tl` = top left, `tr` = top right, `br` = bottom right, `bl` = bottom left. The default position is bottom right.

## Keyboard Binding

Use the left and right arrow keys to navigate through the *hooks*.

## Custom Events

| `yoi-scrollkeys-prev`  | Fires after the browser finisehd scrolling to the previous *hook*. |
| `yoi-scrollKeys-next`  | Fires after the browser finisehd scrolling to the next *hook*.     |