---
layout: base
group: components
title: ImgMagnifier
permalink: components/imgmagnifier
status: [draft, issues]
---

# ImgMagnifier

<p class="intro">Magnifier function for any image.</p>

## Basic Example

This is how a basic `.imgMagnifier` looks like and how you write the markup:

```html
<!-- example -->
<div class="imgMagnifier" yoi-imgmagnifier>
    <a href="https://source.unsplash.com/6BPd7r3erSk/1000x1000">
        <img class="imgMagnifier__previewImage" src="https://source.unsplash.com/6BPd7r3erSk/300x300" alt="" />
    </a>
</div>
```

The magnify region is the same size than the original image and is always placed on the right side next to it.

<p class="hint hint--negative"><b>For Desktop only:</b> <code>.imgMagnifier</code> was designed for desktop browsers with a mouse a input device.</p>

## Markup & Fallback

Each `.imgMagnifyer` must have at least one information: where to find the larger version of the preview image? In the example below, `imgMagnifier` reads the path to the larger image from the link (`<a>`) which is wrapped around the preview image. This is the recommended way to write the markup, since it’s also an _elegant fallback solution_. If JavaScript is not available, the link simple leads to an identical but larger image.

It’s also possible to leave out the link and point to the large image via the attribute `yoi-imgmagnifier`. More on that below.

## JavaScript-API

### Attributes

The attribute `yoi-rangeinput` accepts parameters to control the behavior. The following options are available:

| key       | description                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------- |
| zoomImage | Path to the identical yet larger image. If not supplied, the script will look for a link / href inside .imgMagnifier. |
| delay     | Delay after which the magnifyer appears (milliseconds).                                                               |

#### Zoom Image

I you wish to create an `.imgMagnifier` without the link, you need to provide the path to the larger image via the custom attribute `yoi-imgmagnifier`:

```html
<!-- example -->
<div class="imgMagnifier" yoi-imgmagnifier="zoomImage:'https://source.unsplash.com/6BPd7r3erSk/2000x2000';">
    <img class="imgMagnifier__previewImage" src="https://source.unsplash.com/6BPd7r3erSk/300x300" alt="" />
</div>
```

<p class="hint hint--negative"><b>Use single quotation marks</b>: Whenever you set a value with special characters (eg. a full web address), you must use single quotation marks for all values (eg. bar:'http://foo.com'; abc:'xyz';).</p>

#### Delay

Set the delay (in milliseconds) after which the magnifyer appears. In the following example the delay is set to 1000 (one second):

```html
<!-- example -->
<div class="imgMagnifier" yoi-imgmagnifier="delay:1000;">
    <a href="https://source.unsplash.com/TZCehSn-T-o/2000x2000">
        <img class="imgMagnifier__previewImage" src="https://source.unsplash.com/TZCehSn-T-o/300x300" alt="" />
    </a>
</div>
```

### Custom Events

`.imgMagnifier` fires custom events:

| event name               | fires when …                                       |
| ------------------------ | -------------------------------------------------- |
| `yoi-imgmagnifier-start` | after initial delay, when magnifying starts        |
| `yoi-imgmagnifier-stop`  | immediately after cursor leaves the original image |