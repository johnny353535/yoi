---
layout: base
group: elements
title: ImgMagnifier
permalink: elements/imgmagnifier
---

## ImgMagnifier
Use this element to create an *amazon-style* image zoomer. It’s very lightweight and only needs two elements with no further parameters: a preview image and a zoom image.

| Less-File      | [imgMagnifier.less]({{ pathToSourceFile }}assets/less/elements/imgMagnifier.less) |
| JS-File        | [imgMagnifier.js]({{ pathToSourceFile }}assets/js/elements/imgMagnifier.js)       |
| Base CSS-Class | `.imgMagnifier`                                                                   |

### Example
See the following examples for markup reference. Notice how this element implements a **gracefull no-script fall back** – in this case it’s just a link to the larger image.

```html
<div class="imgMagnifier" yoi-imgmagnifier>
    <a href="https://source.unsplash.com/WLUHO9A_xik/1000x1000">
        <img class="imgMagnifier__previewImage" src="https://source.unsplash.com/WLUHO9A_xik/300x300" alt="" />
    </a>
</div>
<div class="imgMagnifier" yoi-imgmagnifier="delay:100;">
    <a href="https://source.unsplash.com/WLUHO9A_xik/1000x1000">
        <img class="imgMagnifier__previewImage" src="https://source.unsplash.com/WLUHO9A_xik/300x300" alt="" />
    </a>
</div>
```