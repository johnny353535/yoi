---
layout: base
group: elements
title: PageRewind
permalink: elements/pagerewind
---

# PageRewind

<p class="intro">Use this element to create a _scroll-to-top-button_ at the bottom of a page.</p>

| Styles         | [pageRewind.less]({{ pathToSourceFile }}assets/less/elements/pageRewind.less) |
| Script         | [pageRewind.js]({{ pathToSourceFile }}assets/js/elements/pageRewind.js)       |
| Script Hook    | `yoi-pagerewind`                                                              |
| Base CSS-Class | `.pageRewind`                                                                 |

## Usage

The element is created and injected into the page via JavaScript. If you wish to add a `.pageRewind` to a specific page, add the attribute `yoi-pagerewind` to the `<body>`:

```html
<body yoi-pagerewind> … </body>
```

You can see the element in action on this page.

## Actions

### PageRewind.run

If you wish to scroll the page back to top via JavaScript, you can do so by calling this function:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="PageRewind.run;">Scroll to Top</button>
```

### Custom Events

| event name             | fires when …               |
| ---------------------- | -------------------------- |
| `yoi-pagerewind-start` | The page started scrolling |
| `yoi-pagerewind-stop`  | The page stopped scrolling |