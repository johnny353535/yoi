---
layout: base
group: components
title: Breadcrumbs
permalink: components/breadcrumbs
---

# Breadcrumbs

<p class="intro">Horizontal menu to aid navigation by displaying the path to the current page.</p>

## Example

This is how breadcrumbs look like and how you write the markup:

```html
<!-- example -->
<nav class="breadcrumbs">
    <ul>
        <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="#">
                <span class="breadcrumbs__label">Home Page</span>
            </a>
        </li>
        <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="#">
                <span class="breadcrumbs__label">Lorem Ipsum</span>
            </a>
        </li>
        <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="#">
                <span class="breadcrumbs__label">Dolor Sit Amet</span>
            </a>
        </li>
        <li class="breadcrumbs__item">
            <span class="breadcrumbs__label">Current Page</span>
        </li>
    </ul>
</nav>
```