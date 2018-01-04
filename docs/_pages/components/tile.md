---
layout: base
group: components
title: Tile
permalink: components/tile
---

# Tile

<div class="badges m-t-4 m--pos-tr m--m-4 m--m-t-10">
    <span class="badge">documentation incomplete</span>
    <span class="badge badge--attention">component incomplete</span>
</div>

<p class="intro">Element with white text on top of a darkened image and mouseover-effects.</p>

## Example

```html
<!-- example -->
<a class="tile">
    <div class="tile__body">
        <h2>Pain Reliev</h2>
        <p class="fs-2 lh-3 m-t-1">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="tile__image" src="https://source.unsplash.com/9kbmpWBTk9A/300x300" alt="" />
</a>
```

<p class="hint"><b>Markup</b> You can turn any HTML block-level element into a <em>.tile</em> but please note: only anchors get the hover effect.</p>
<p class="hint"><b>Size</b> <em>.tile__image</em> sets the overall <em>.tile</em> width an height! Overflowing text will get cut off. Please also note, that <em>.tile</em> is set to <strong>inline-block</strong>. Wrap it inside another block-level element if you need to create a block.</p>

## Modifiers

### tile\--bottom

It makes the copy text align to the bottom.

```html
<!-- example -->
<a class="tile tile--bottom">
    <div class="tile__body">
        <h2>Pain Reliev</h2>
        <p class="fs-2 lh-3 m-t-1">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="tile__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>
```

### fx\--blur

```html
<!-- example -->
<a class="tile fx--blur">
    <div class="tile__body">
        <h2 class="tile__title">Pain Reliev</h2>
        <p class="tile__copy fs-2 lh-3 m-t-1">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="tile__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>
```

### fx\--slide

```html
<!-- example -->
<a class="tile fx--slide">
    <div class="tile__body">
        <h2 class="tile__title">Pain Reliev</h2>
        <p class="tile__copy fs-2 lh-3 m-t-1">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="tile__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>

<a class="tile tile--bottom fx--slide">
    <div class="tile__body">
        <h2 class="tile__title">Pain Reliev</h2>
        <p class="tile__copy fs-2 lh-3 m-t-1">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="tile__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>
```

### fx\--blur + fx\--slide

```html
<!-- example -->
<a class="tile tile--bottom fx--blur fx--slide">
    <div class="tile__body">
        <h2 class="tile__title">Pain Reliev</h2>
        <p class="tile__copy fs-2 lh-3 m-t-1">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="tile__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>
```