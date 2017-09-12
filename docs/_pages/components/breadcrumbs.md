---
layout: base
group: components
title: Breadcrumbs
permalink: components/breadcrumbs
---

# Breadcrumbs

<p class="intro">Use this component to displaying the path to the current page.</p>

| Styles         | [breadcrumbs.less]({{ pathToSourceFile }}assets/less/components/breadcrumbs.less) |
| Base CSS-Class | `.breadcrumbs`                                                                  |
| Modifiers      | `-`                                                                             |

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