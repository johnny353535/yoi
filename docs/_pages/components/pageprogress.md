---
layout: base
group: components
title: PageProgress
permalink: components/pageprogress
---

# PageProgress

<p class="intro">A progress bar that displays the current reading position and triggers custom events based on the scroll position.</p>

## Usage

Add a `.pageProgress` to any page by adding the attribute `yoi-pageprogress` to the `<body>` element:

```html
<body yoi-pageprogress> … </body>
```

## Options

This element has only one option: `visible`. If set to `false`, the element won’t be rendered but the script will still run in the background and trigger custom events.

```html
<body yoi-pageprogress="visible:false;"> … </body>
```

## Events

| event            | Fires when …                  |
| ---------------- | ----------------------------- |
| `yoi-scroll-0`   | The page scrolled to 0%.      |
| `yoi-scroll-25`  | The page scrolled around 25%. |
| `yoi-scroll-50`  | The page scrolled around 50%. |
| `yoi-scroll-75`  | The page scrolled around 75%. |
| `yoi-scroll-100` | The page scrolled to 100%.    |

<p class="hint">Please note, that all events but <code>yoi-pageprogress-0</code> and <code>yoi-pageprogress-100</code> are triggered multiple times in certain position ranges. For example <code>yoi-pageprogress-100</code> is triggered while scrolling the page between 49%–55%.</p>
