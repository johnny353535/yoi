---
layout: base
group: elements
title: Badge
permalink: elements/badge
---

## Badge
Use `.badge` to display small bits of data, eg. inside a button. It’s perfect to create one-word labels (eg. *Special Offer!*) or counters (You have *12* unread messages*).

|                |                                                                                                                                                                                                                          |
| -              | -                                                                                                                                                                                                                        |
| Less-File      | [badge.less]({{ pathToSourceFile }}assets/less/elements/badge.less)                                                                                                                                                      |
| Base CSS-Class | `.badge`                                                                                                                                                                                                                 |
| Modifiers      | `.badge--small, .badge--medium, .badge--large, .badge--dark, .badge--light, .badge--attention, .badge--error, .badge--negative, .badge--success, .badge--positive, .badge--prescription, .badge--price, .badge--rounded` |

### Available Sizes
Badges are available in four different sizes.

```html
<span class="badge badge--small">21</span>
<span class="badge">22</span>
<span class="badge badge--medium">23</span>
<span class="badge badge--large">24</span>
```

### Rounded Badges
Use the modifier `.badge--rounded` to render pill-shaped badges.

```html
<span class="badge badge--small badge--rounded">21</span>
<span class="badge badge--rounded">22</span>
<span class="badge badge--medium badge--rounded">23</span>
<span class="badge badge--large badge--rounded">24</span>
```

### Badges in Different Colors
All [color modifiers](/pages/css-interface/colors.html) are available for badges.

```html
<span class="badge badge--light badge--small badge--rounded">21</span>
<span class="badge badge--light badge--rounded">22</span>
<span class="badge badge--light badge--medium badge--rounded">23</span>
<span class="badge badge--light badge--large badge--rounded">24</span>

<span class="badge badge--small badge--rounded">21</span>
<span class="badge badge--rounded">22</span>
<span class="badge badge--medium badge--rounded">23</span>
<span class="badge badge--large badge--rounded">24</span>

<span class="badge badge--dark badge--small badge--rounded">21</span>
<span class="badge badge--dark badge--rounded">22</span>
<span class="badge badge--dark badge--medium badge--rounded">23</span>
<span class="badge badge--dark badge--large badge--rounded">24</span>

<span class="badge badge--attention badge--small badge--rounded">21</span>
<span class="badge badge--attention badge--rounded">22</span>
<span class="badge badge--attention badge--medium badge--rounded">23</span>
<span class="badge badge--attention badge--large badge--rounded">24</span>

<span class="badge badge--negative badge--small badge--rounded">21</span>
<span class="badge badge--negative badge--rounded">22</span>
<span class="badge badge--negative badge--medium badge--rounded">23</span>
<span class="badge badge--negative badge--large badge--rounded">24</span>

<span class="badge badge--positive badge--small badge--rounded">21</span>
<span class="badge badge--positive badge--rounded">22</span>
<span class="badge badge--positive badge--medium badge--rounded">23</span>
<span class="badge badge--positive badge--large badge--rounded">24</span>

<span class="badge badge--prescription badge--small badge--rounded">21</span>
<span class="badge badge--prescription badge--rounded">22</span>
<span class="badge badge--prescription badge--medium badge--rounded">23</span>
<span class="badge badge--prescription badge--large badge--rounded">24</span>

<span class="badge badge--price badge--small badge--rounded">21</span>
<span class="badge badge--price badge--rounded">22</span>
<span class="badge badge--price badge--medium badge--rounded">23</span>
<span class="badge badge--price badge--large badge--rounded">24</span>
```