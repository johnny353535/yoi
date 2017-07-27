---
layout: base
group: behaviours
title: Lazyload
permalink: behaviours/lazyload
---

# Lazyload

<p class="intro">Loads an image only if it’s inside the viewport.</p>

| Scripts | [lazyload.js]({{ pathToSourceFile }}assets/js/behaviours/lazyload.js), [scrollAgent.js]({{ pathToSourceFile }}assets/js/modules/scrollAgent.js) |

## Basic Example

Wrap your image inside a `<noscript>` tag and add the custom atribute `yoi-lazyload`:

```html
<!-- example -->
<noscript yoi-lazyload>
    <img src="https://source.unsplash.com/Volo9FYUAzU/500x500" />
</noscript>
```

<p class="hint">Since there is no way to stop the browser from loading an individual image via JavaScript, the <code>&lt;noscript&gt;</code> tag is a good solution. If JavaScript is disabled, the image inside the tag will load just fine.</p>

## Parameters

| `src`        | Otional url to the image you want to load. By default the image inside the noscript-tag will load. |
| `srcSmall`   | Optional url to image at breakpoint “small”                                                        |
| `srcMedium`  | Optional url to image at breakpoint “medium”                                                       |
| `srcLarge`   | Optional url to image at breakpoint “large”                                                        |
| `srcXlarge`  | Optional url to image at breakpoint “xlarge”                                                       |
| `width`      | Optional image width                                                                               |
| `height`     | Optional image height                                                                              |
| `alt`        | Optional image alt text                                                                            |
| `title`      | Optional image title                                                                               |
| `longdesc`   | Optional image long description                                                                    |
| `cssClasses` | Optional CSS class names (eg. [utility classnames](utilities/)) for the generated `<img>`-tag      |

### Image Src

By default, the image source url is read from the `<img>`-tag. However, you can provide a parameter to even load a different image:

```html
<!-- example -->
<noscript yoi-lazyload="src:'https://source.unsplash.com/CS5vT_Kin3E/300x300';">
    <img src="https://source.unsplash.com/Volo9FYUAzU/300x300" />
</noscript>
```

### Breakpoints

You can use lazyload to load different images, depending on the active breakpoint (mediaquery). That means, you can load small images for small screens and larger images for larger screens. Four breakpoints (= _screen sizes_) are available: `srcSMall, srcMedium, srcLarge, srcXlarge`. Resize the browser window and hit reload to see the example below in action:

```html
<!-- example -->
<noscript yoi-lazyload="
        srcSmall:'https://source.unsplash.com/WLUHO9A_xik/150x150';
        srcMedium:'https://source.unsplash.com/WLUHO9A_xik/300x300';
        srcLarge:'https://source.unsplash.com/WLUHO9A_xik/400x400';
        srcXlarge:'https://source.unsplash.com/WLUHO9A_xik/600x600';
    ">
    <img src="https://source.unsplash.com/WLUHO9A_xik/500x500" />
</noscript>
```

### Dimensions

You can set fixed image dimensions if you wish. In the example below, we change the aspect ratio to make the effect clear:

```html
<!-- example -->
<noscript yoi-lazyload="width:300; height:100;">
    <img src="https://source.unsplash.com/WLUHO9A_xik/500x500" />
</noscript>
```

### Description Texts

You can set the `alt`, `descr` and `longdesc` values:

```html
<!-- example -->
<noscript yoi-lazyload="
        alt:'sea turtle underwater';
        title:'Sea turtle, swimming to her nesting ground.';
        longdesc:'Sea turtles, like salmon, will return to the same nesting grounds at which they were born.';
    ">
    <img src="https://source.unsplash.com/L-2p8fapOA8/500x500" />
</noscript>
```

<p class="hint hint--negative">Make sure you wrap the values for the alt/title/longdesc attributes in single quotation marks to prevent errors.</p>

### CSS Class Names

You can add any CSS class names to the `<img>`-tag, eg. YOI’s [utility class names](utilities/):

```html
<!-- example -->
<noscript yoi-lazyload="cssClasses:'p-4 bg-gray-5 br';">
    <img src="https://source.unsplash.com/hppWAs2WTZU/500x500" />
</noscript>
```