---
layout: base
group: components
title: Tile
permalink: components/tile
status: draft
---

# Tile

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

### Text at Bottom

Makes the copy text align to the bottom.

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

### Blur Effect

```html
<!-- example -->
<a class="tile tile--blur">
    <div class="tile__body">
        <h2 class="tile__title">Pain Reliev</h2>
        <p class="tile__copy fs-2 lh-3 m-t-1">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="tile__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>
```

### Slide Effect

```html
<!-- example -->
<a class="tile tile--slide">
    <div class="tile__body">
        <h2 class="tile__title">Pain Reliev</h2>
        <p class="tile__copy fs-2 lh-3 m-t-1">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="tile__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>

<a class="tile tile--bottom tile--slide">
    <div class="tile__body">
        <h2 class="tile__title">Pain Reliev</h2>
        <p class="tile__copy fs-2 lh-3 m-t-1">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="tile__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>
```

### Combining Slide & Blur Effects

```html
<!-- example -->
<a class="tile tile--bottom tile--blur tile--slide">
    <div class="tile__body">
        <h2 class="tile__title">Pain Reliev</h2>
        <p class="tile__copy fs-2 lh-3 m-t-1">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="tile__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>
```