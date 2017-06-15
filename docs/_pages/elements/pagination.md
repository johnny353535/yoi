---
layout: base
group: elements
title: Pagination
permalink: elements/pagination
---

# Pagination

Use this element to render a pagination with page links and browse buttons.

| Styles         | [pagination.less]({{ pathToSourceFile }}assets/less/elements/pagination.less) |
| Base CSS-Class | `.pagination`                                                                 |

## Basic Example

This is how a basic `.pagination` looks like and how you write the markup:

```html
<!-- example -->
<div class="pagination">
    <div class="pagination__load">
        <a class="btn" href="#">Show more</a>
    </div>
    <ul class="pagination__items">
        <li class="pagination__item">
            <a class="btn btn--subtle" href="#">1</a>
        </li>
        <li class="pagination__item is--active">
            <a class="btn btn--subtle" href="#">2</a>
        </li>
        <li class="pagination__item">
            <a class="btn btn--subtle" href="#">3</a>
        </li>
        <li class="pagination__item">
            <a class="btn btn--subtle" href="#">4</a>
        </li>
        <li class="pagination__item">
            <a class="btn btn--subtle" href="#">5</a>
        </li>
    </ul>
    <div class="pagination__nav">
        <div class="btns">
            <a class="btn" href="#">
                <span class="hidden">previous page</span>
                <span class="icon"></span>
            </a>
            <a class="btn" href="#">
                <span class="hidden">next page</span>
                <span class="icon"></span>
            </a>
        </div>
    </div>
</div>
```