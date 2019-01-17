---
layout: base
group: components
title: Pagination
permalink: components/pagination
status: incomplete
---

# Pagination

<p class="intro">A horizontal set of page links and browse buttons.</p>

## Basic Example

This is how a basic `.pagination` looks like and how you write the markup:

```html
<!-- example -->
<div class="pagination">
    <div class="pagination__load">
        <a class="button button--flat button--primary" href="#">Show more</a>
    </div>
    <ul class="pagination__items">
        <li class="pagination__item">
            <a class="button button--subtle" href="#">1</a>
        </li>
        <li class="pagination__item is--active">
            <a class="button button--subtle" href="#">2</a>
        </li>
        <li class="pagination__item">
            <a class="button button--subtle" href="#">3</a>
        </li>
        <li class="pagination__item">
            <a class="button button--subtle" href="#">4</a>
        </li>
        <li class="pagination__item">
            <a class="button button--subtle" href="#">5</a>
        </li>
    </ul>
    <div class="pagination__nav">
        <div class="buttons">
            <a class="button button--subtle" href="#">
                <span class="hidden">previous page</span>
                <img src="http://cdn.yoshino.digital/svg.php?id=icon-008-s" class="icon" yoi-icon />
            </a>
            <a class="button button--subtle" href="#">
                <span class="hidden">next page</span>
                <img src="http://cdn.yoshino.digital/svg.php?id=icon-007-s" class="icon" yoi-icon />
            </a>
        </div>
    </div>
</div>
```