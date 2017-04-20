---
layout: base
group: elements
title: Pagination
permalink: elements/pagination
---

## Pagination
Straightforward pagination element with page- and browse links.

| Styles         | [pagination.less]({{ pathToSourceFile }}assets/less/elements/pagination.less) |
| Base CSS-Class | `.pagination`                                                                 |
| Modifiers      | `-`                                                                           |

### Basic Example

```html
<div class="pagination">
    <div class="pagination__load">
        <a class="btn" href="#">Mehr anzeigen</a>
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
                <span class="hidden">vorherige Seite</span>
                <span class="icon"></span>
            </a>
            <a class="btn" href="#">
                <span class="hidden">nächste Seite</span>
                <span class="icon"></span>
            </a>
        </div>
    </div>
</div>
```