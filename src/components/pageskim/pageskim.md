---
layout: base
group: components
title: PageSkim
permalink: components/pageskim
---

# PageSkim

<p class="intro">Buttons (with keyboard bindings) to scroll the page back and forth between certain <i>hooks</i>.</p>

## Usage

Add the attribute `yoi-pageskim` to the `<body>` element to enable page skim:

```html
<body yoi-pageskim> … </body>
```

Scroll to see the element in action on this page.

## Parameters

| `hooks`    | CSS selector           | Optional. Defines the *hooks*. Any CSS selector will work. Default is `h1, h2, h3, h4, h5, h6`.             |
| `position` | `tl`, `tr`, `br`, `bl` | Optional. Set the position of the scroll buttons to one of the four edges of the screen. Default is `br` (= bottom right). |

### Attributes

Set the *hooks* to any collection of elements on the page by providing a CSS selector. The following example would jump back and forth between all elements with the CSS-class `.jumpMark`:

```html
<body yoi-pageskim="hooks:'.jumpMark'"> … </body>
```

### Position

Pin the `.scrollKeys` to one of the four corners of the screen: `tl` = top left, `tr` = top right, `br` = bottom right, `bl` = bottom left. The default position is bottom right.

## Keyboard Binding

With page skim enabled, you can use the arrow keys and space bar to navigate through the *hooks*.

## Custom Events

| `yoi-pageskim-prev` | Fires after the browser finisehd scrolling to the previous *hook*. |
| `yoi-pageskim-next` | Fires after the browser finisehd scrolling to the next *hook*.     |
