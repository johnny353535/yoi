---
layout: base
group: elements
title: ScrollKeys
permalink: elements/scrollkeys
---

# ScrollKeys

<p class="intro">Use this element to add buttons (and keyboard bindings) that let the user scroll back and forth between jump marks.</p>

## Usage

The element is created and injected into the page via JavaScript. If you wish to add a `.scrollKeys` to a specific page, add the attribute `yoi-scrollkeys` to the `<body>`:

```html
<body yoi-scrollkeys> … </body>
```

You can see the element in action on this page.

## Parameters

| `hooks`    | CSS selector           | Optional. Defines the *hooks* (= jump marks). Any CSS selector will work. Default is `h1, h2, h3, h4, h5, h6`.          |
| `position` | `tl`, `tr`, `br`, `bl` | Optional. Set the position of the scroll buttons to one of the four edges of the screen. Default is `tr` (= top right). |

### Hooks

Set the *hooks* (= jump marks) to any collection of elements on the page by providing a CSS selector. The following example would jump back and forth between all elements with the CSS-class `.jumpMark`:

```html
<body yoi-scrollkeys="hooks:'.jumpMark'"> … </body>
```

### Position

Pin the `.scrollKeys` to one of the four corners of the screen: `tl` = top left, `tr` = top right, `br` = bottom right, `bl` = bottom left. The default position is top right.

## Keyboard Binding

Use the left and right arrow keys to navigate through the *hooks*.

## Custom Events

| `yoi-scrollkeys-prev`  | Fires after the browser finisehd scrolling to the previous *hook*. |
| `yoi-scrollKeys-next`  | Fires after the browser finisehd scrolling to the next *hook*.     |