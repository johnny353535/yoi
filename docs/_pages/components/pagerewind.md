---
layout: base
group: components
title: PageRewind
permalink: components/pagerewind
---

# PageRewind

<p class="intro">A scroll-to-top button at the bottom of a page.</p>

## Usage

Add a `.pageRewind` to any page by adding the attribute `yoi-pagerewind` to the `<body>` element:

```html
<body yoi-pagerewind> … </body>
```

Scroll to see the element in action on this page.

## Actions

### PageRewind

Scroll the page back to top with the [action]({{ site.github.url }}/actions/) `PageRewind`:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="PageRewind.run;">Scroll to Top</button>
```

### Custom Events

| event name             | fires when …               |
| ---------------------- | -------------------------- |
| `yoi-pagerewind-start` | The page started scrolling |
| `yoi-pagerewind-stop`  | The page stopped scrolling |
