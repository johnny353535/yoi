---
layout: base
group: components
title: Rating
permalink: components/rating
---

# Rating

<p class="intro">Use this component to display a compact rating score – visualized by a number of stars between 1 and 5.</p>

## Basic Example

This is how a basic `.rating` looks like and how you write the markup:

```html
<!-- example -->
<span class="rating rating--4">
    <span class="rating__stars">4 / 5</span>
</span>
```

<p class="hint hint--negative"><b>Accessability:</b> To make sure that screen readers still receive meaningful data, always repeat the rating score as text inside <code>.rating__stars</code>. Feel free to chose any phrasing you like, eg. ”Five out of five stars“ and ”5 / 5“ both work equally fine.</p>

## Modifiers

### Score

Use the modifiers `.rating-1, […], .rating-5` to render ratings with the corresponding number of stars. If you leave out the rating modifier, `.rating` will display zero stars by default:

```html
<!-- example -->
<p>
    <span class="rating rating--0">
        <span class="rating__stars">0 / 5</span>
    </span>
</p>
<p>
    <span class="rating rating--1">
        <span class="rating__stars">1 / 5</span>
    </span>
</p>
<p>
    <span class="rating rating--2">
        <span class="rating__stars">2 / 5</span>
    </span>
</p>
<p>
    <span class="rating rating--3">
        <span class="rating__stars">3 / 5</span>
    </span>
</p>
<p>
    <span class="rating rating--4">
        <span class="rating__stars">4 / 5</span>
    </span>
</p>
<p>
    <span class="rating rating--5">
        <span class="rating__stars">5 / 5</span>
    </span>
</p>
```

### Size

Use the modifiers `.rating--small, .rating--medium, .rating--large` to render ratings in different sizes. The default size of `.rating` is between ”medium“ and ”large“:

```html
<!-- example -->
<p>
    <span class="rating rating--small rating--4">
        <span class="rating__stars">4 / 5</span>
    </span>
</p>
<p>
    <span class="rating rating--medium rating--4">
        <span class="rating__stars">4 / 5</span>
    </span>
</p>
<p>
    <span class="rating rating--4">
        <span class="rating__stars">4 / 5</span>
    </span>
</p>
<p>
    <span class="rating rating--large rating--4">
        <span class="rating__stars">4 / 5</span>
    </span>
</p>
```
