---
layout: base
group: components
title: Search Input
permalink: components/searchinput
---

# Search Input

## Basic Example

This is how `<input type="search">` looks like and how your write the markup:

```html
<!-- example -->
<input type="search" yoi-searchinput />

```

## Modifiers

### Rounded

```html
<!-- example:tabs -->
<p class="m-b-2">
    <input class="searchInput--rounded" type="search" yoi-searchinput />
</p>
<p>
    <input class="searchInput--large searchInput--rounded" type="search" yoi-searchinput />
<p>
```

### Size

Use the modifiers `.searchInput--large` or `searchInput--small` to create search inputs with different sizes:

```html
<!-- example:tabs -->
<p class="m-b-2">
    <input class="searchInput--small" type="search" yoi-searchinput />
</p>
<p class="m-b-2">
    <input type="search" yoi-searchinput />
</p>
<p>
    <input class="searchInput--large" type="search" yoi-searchinput />
</p>
```