---
layout: base
group: elements
title: Breadcrumbs
permalink: elements/breadcrumbs
---

## Breadcrumbs
`.breadcrumbs` aid navigation by displaying the »path« to web page. This is a very simple element, it’s merely a container with an unordered list of links inside. The
breadcrumbs element does not have any modifier.

| Less-File      | [breadcrumbs.less]({{ pathToSourceFile }}assets/less/elements/breadcrumbs.less) |
| Base CSS-Class | `.breadcrumbs`                                                                  |
| Modifiers      | `none`                                                                          |

### Example

```html
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