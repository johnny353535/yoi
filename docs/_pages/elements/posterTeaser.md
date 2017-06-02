---
layout: base
group: elements
title: PosterTeaser
permalink: elements/posterteaser
---

## PosterTeaser

This element renders text on top of a darkened image, resembling a movie poster.

|                |                                                                                   |
| -              | -                                                                                 |
| Styles         | [posterTeaser.less]({{ pathToSourceFile }}assets/less/elements/posterTeaser.less) |
| Base CSS-Class | `.posterTeaser`                                                                   |
| Modifiers      | `.posterTeaser--bottom, .fx--slide, .fx--blur`                                    |

### Example

```html
<!-- example -->
<a class="posterTeaser">
    <div class="posterTeaser__body">
        <h2>Pain Reliev</h2>
        <p>Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="posterTeaser__image" src="https://source.unsplash.com/9kbmpWBTk9A/300x300" alt="" />
</a>
```

<p class="hint"><b>Markup</b> You can turn any HTML block-level element into a <em>.posterTeaser</em> but please note: only anchors get the hover effect.</p>
<p class="hint"><b>Size</b> <em>.posterTeaser__image</em> sets the overall <em>.posterTeaser</em> width an height! Overflowing text will get cut off. Please also note, that <em>.posterTeaser</em> is set to <strong>inline-block</strong>. Wrap it inside another block-level element if you need to create a block.</p>

### Modifiers

#### posterTeaser\--bottom

It makes the copy text align to the bottom.

```html
<!-- example -->
<a class="posterTeaser posterTeaser--bottom">
    <div class="posterTeaser__body">
        <h2>Pain Reliev</h2>
        <p>Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="posterTeaser__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>
```

#### fx\--blur

```html
<!-- example -->
<a class="posterTeaser fx--blur">
    <div class="posterTeaser__body">
        <h2 class="posterTeaser__title">Pain Reliev</h2>
        <p class="posterTeaser__copy">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="posterTeaser__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>
```

#### fx\--slide

```html
<!-- example -->
<a class="posterTeaser fx--slide">
    <div class="posterTeaser__body">
        <h2 class="posterTeaser__title">Pain Reliev</h2>
        <p class="posterTeaser__copy">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="posterTeaser__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>

<a class="posterTeaser posterTeaser--bottom fx--slide">
    <div class="posterTeaser__body">
        <h2 class="posterTeaser__title">Pain Reliev</h2>
        <p class="posterTeaser__copy">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="posterTeaser__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>
```

#### fx\--blur + fx\--slide

```html
<!-- example -->
<a class="posterTeaser posterTeaser--bottom fx--blur fx--slide">
    <div class="posterTeaser__body">
        <h2 class="posterTeaser__title">Pain Reliev</h2>
        <p class="posterTeaser__copy">Opioids are excellent acute pain medication, but it is their ability to produce euphoria that makes them attractive to addicts.</p>
    </div>
    <img class="posterTeaser__image" src="https://source.unsplash.com/yJXTe7wskl0/300x300" alt="" />
</a>
```