---
layout: base
group: behaviours
title: Lazyload
permalink: behaviours/lazyload
---

# Lazyload

<p class="intro">Load an image only if it’s inside the viewport.</p>

## Basic Example

Wrap your image inside a `<noscript>` tag and add the atribute `yoi-lazyload`:

```html
<!-- example -->
<noscript yoi-lazyload>
    <img src="https://source.unsplash.com/Volo9FYUAzU/250x250" />
</noscript>
```

<p class="hint hint--primary">There is no way to use JavaScript to stop the browser from loading an individual image. However, the <code>&lt;noscript&gt;</code> tag is a sufficient solution. When JavaScript is disabled, the image inside the <code>&lt;noscript&gt;</code> tag loads just fine.</p>

## Parameters

| `src`        | Optional url to the image you want to load. By default the image inside the noscript-tag will load. |
| `srcSmall`   | Optional url to image at breakpoint *small*                                                         |
| `srcMedium`  | Optional url to image at breakpoint *medium*                                                        |
| `srcLarge`   | Optional url to image at breakpoint *large*                                                         |
| `srcXlarge`  | Optional url to image at breakpoint *xlarge*                                                        |
| `width`      | Optional image width                                                                                |
| `height`     | Optional image height                                                                               |
| `alt`        | Optional image alt text                                                                             |
| `title`      | Optional image title                                                                                |
| `longdesc`   | Optional image long description                                                                     |
| `cssClasses` | Optional CSS class names (eg. [utility classnames](utilities/)) for the generated `<img>`-tag       |

### Image Source

By default, Lazyload accesses the image source from the `<img>`-tag. Use the parameter `src` to load a different image:

```html
<!-- example -->
<noscript yoi-lazyload="src:'https://source.unsplash.com/wTPp323zAEw/250x250';">
    <img src="https://source.unsplash.com/Volo9FYUAzU/250x250" />
</noscript>
```

### Breakpoints

Use the parameters `srcSmall, srcMedium, srcLarge, srcXlarge` to load different images depending on the [active breakpoint](/glossary). You could load small images for small screens and larger images for larger screens. Resize the browser window and reload the page to see the example below in action:

```html
<!-- example -->
<noscript yoi-lazyload="
        srcSmall:'https://source.unsplash.com/WLUHO9A_xik/150x150';
        srcMedium:'https://source.unsplash.com/WLUHO9A_xik/300x300';
        srcLarge:'https://source.unsplash.com/WLUHO9A_xik/400x400';
        srcXlarge:'https://source.unsplash.com/WLUHO9A_xik/550x550';
    ">
    <img src="https://source.unsplash.com/WLUHO9A_xik/500x500" />
</noscript>
```

### Dimensions

Use the parameters `width` and `height` to define fixed image dimensions. In the example below, the image is squished to make the result obvious:

```html
<!-- example -->
<noscript yoi-lazyload="width:300; height:100;">
    <img src="https://source.unsplash.com/Volo9FYUAzU/250x250" />
</noscript>
```

### Description Texts

Use the parameters `alt`, `descr` and `longdesc` to add the corresponding values:

```html
<!-- example -->
<noscript yoi-lazyload="
        alt:'sea turtle underwater';
        title:'Sea turtle, swimming to her nesting ground.';
        longdesc:'Sea turtles, like salmon, will return to the same nesting grounds at which they were born.';
    ">
    <img src="https://source.unsplash.com/L-2p8fapOA8/250x250" />
</noscript>
```

<p class="hint hint--negative">Always wrap the values for the `alt`, `descr` and `longdesc` attributes in single quotation marks to prevent errors.</p>

### CSS Class Names

Use the parameter `cssClasses` to add any CSS class names to the image. The following example adds [Utilities](/glossary) for padding, background-color and slightly rounded corners:

```html
<!-- example -->
<noscript yoi-lazyload="cssClasses:'p-4 bg-primary-15 br';">
    <img src="https://source.unsplash.com/hppWAs2WTZU/210x210" />
</noscript>
```

## Events

This behaviour does not fire [custom events](glossary/). However, each image fires the standard `load` event.