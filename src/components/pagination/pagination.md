---
layout: base
group: components
title: Pagination
permalink: components/pagination
---

# Pagination

<p class="intro">A horizontal set of page links and browse buttons.</p>

## Basic Example

This is how a basic `.pagination` looks like and how you write the markup:

```html
<!-- example -->
<div class="pagination">
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
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </a>
            <a class="button button--subtle" href="#">
                <span class="hidden">next page</span>
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
        </div>
    </div>
</div>
```
