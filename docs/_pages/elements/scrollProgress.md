---
layout: base
group: elements
title: ScrollProgress
permalink: elements/scrollProgress
---

# ScrollProgress

<p class="intro">Use this element to create a progress bar that displays the current reading position and triggers custom events based on the scroll position.</p>

## Usage

The element is created and injected into the page via JavaScript. If you wish to add a `.scrollProgress` to a specific page, add the attribute `yoi-scrollprogress` to the `<body>`:

```html
<body yoi-scrollprogress> … </body>
```

## Options

This element has only one option: `visible`. If set to `false`, the element won’t be rendered but the script will still run in the background and trigger custom events.

```html
<body yoi-scrollprogress="visible:false;"> … </body>
```

## Events

| event            | Fires when …                  |
| ---------------- | ----------------------------- |
| `yoi-scroll-0`   | The page scrolled to 0%.      |
| `yoi-scroll-25`  | The page scrolled around 25%. |
| `yoi-scroll-50`  | The page scrolled around 50%. |
| `yoi-scroll-75`  | The page scrolled around 75%. |
| `yoi-scroll-100` | The page scrolled to 100%.    |

<p class="hint">Please note, that all events but <code>yoi-scrollprogress-0</code> and <code>yoi-scrollprogress-100</code> are triggered multiple times in certain position ranges. For example <code>yoi-scrollprogress-100</code> is triggered while scrolling the page between 49%–55%.</p>


<!--
    - create universal yoi-broadcaster to bubble up events?
-->