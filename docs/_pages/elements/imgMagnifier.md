---
layout: base
group: elements
title: ImgMagnifier
permalink: elements/imgmagnifier
---

# ImgMagnifier

Use this element to add a magnifyer function to an image.

| Styles         | [imgMagnifier.less]({{ pathToSourceFile }}assets/less/elements/imgMagnifier.less) |
| Script         | [imgMagnifier.js]({{ pathToSourceFile }}assets/js/elements/imgMagnifier.js)       |
| Script Hook    | `yoi-imgmagnifier`                                                                |
| Base CSS-Class | `.imgMagnifier`                                                                   |

## Basic Example

This is how a basic `.imgMagnifier` looks like and how you write the markup:

```html
<!-- example -->
<div class="imgMagnifier" yoi-imgmagnifier="zoomImage:'https://source.unsplash.com/45FJgZMXCK8/1000x1000';">
    <img class="imgMagnifier__previewImage" src="https://source.unsplash.com/WLUHO9A_xik/300x300" alt="" />
</div>
```

```html
<!-- example -->
<div class="imgMagnifier" yoi-imgmagnifier>
    <a href="https://source.unsplash.com/WLUHO9A_xik/1000x1000">
        <img class="imgMagnifier__previewImage" src="https://source.unsplash.com/WLUHO9A_xik/300x300" alt="" />
    </a>
</div>
```

<p class="hint">The magnify region is the same size than the original image and is always placed right to it.</p>

<p class="hint hint--negative"><b>For Desktop only:</b> <code>.imgMagnifier</code> was designed for desktop browsers with a mouse a input device. It’s not suitable for mobile pages.</p>

## JavaScript-API

### Hook

The hook `yoi-rangeinput` accepts parameters to control the behaviour. The following options are available:

| key       | description                                            |
| --------- | ------------------------------------------------------ |
| zoomImage | xxx                                                    |
| delay     | delay after which the magnifyer appears (milliseconds) |

#### Delay

Set the delay (in milliseconds) after which the magnifyer appears:

```html
<!-- example -->
<div class="imgMagnifier" yoi-imgmagnifier="delay:1000;">
    <a href="https://source.unsplash.com/WLUHO9A_xik/1000x1000">
        <img class="imgMagnifier__previewImage" src="https://source.unsplash.com/WLUHO9A_xik/300x300" alt="" />
    </a>
</div>
```

### Custom Events

`.rangeInput` fires custom events your script can listen to:

| event name               | fires when …                                       |
| ------------------------ | -------------------------------------------------- |
| `yoi-imgmagnifier:start` | after initial delay, when magnifying starts        |
| `yoi-imgmagnifier:stop`  | immediately after cursor leaves the original image |

## Fallback
