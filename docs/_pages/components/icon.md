---
layout: base
group: components
title: Icon
permalink: components/icon
---

# Icon

<p class="intro">Monochrome, SVG-based icons.</p>

| Styles         | [icon.less]({{ pathToSourceFile }}assets/less/components/icon.less) |
| Script         | [icon.js]({{ pathToSourceFile }}assets/js/components/icon.js)       |
| Script Hook    | `yoi-icon`                                                        |
| Base CSS-Class | `.icon`                                                           |
| Modifiers      | `.icon--small, .icon--large, .icon--xlarge`                       |

## Basic Example

This is how a basic `.icon` looks like and how you write the markup:

```html
<!-- example -->
<img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-016" />
```
## Modifiers

Use the modifiers `.icon--small, .icon--large, .icon--xlarge` to render icons in different sizes:

```html
<!-- example -->
<img class="icon icon--small" src="http://cdn.yoshino.digital/svg.php?id=icon-016-s" />
<img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-016" />
<img class="icon icon--large" src="http://cdn.yoshino.digital/svg.php?id=icon-016" />
<img class="icon icon--xlarge" src="http://cdn.yoshino.digital/svg.php?id=icon-016" />
```

## Icon CDN

We created a handy little online tool to generate our YOI-icons for you on the fly. You can request every icon of the set and manipulate it’s size and color via a simple URL:

<div class="box p-1 fs-2 m-t-3 m-b-4">
    http://cdn.yoshino.digital/svg.php?
    <span class="tc-gray-15">+</span> <span class="tc-gray-12">id=</span><b class="tc-red-12">icon-001</b>
    <span class="tc-gray-15">+</span> <span class="tc-gray-12">&f=</span><span class="tc-red-12">#ccff00</span>
    <span class="tc-gray-15">+</span> <span class="tc-gray-12">&s=</span><span class="tc-red-12">#b00</span>
    <span class="tc-gray-15">+</span> <span class="tc-gray-12">&w=</span><span class="tc-red-12">128</span>
    <span class="tc-gray-15">+</span> <span class="tc-gray-12">&h=</span><span class="tc-red-12">128</span>
</div>

| **id** | Always required! The prefix “icon-” + a numeric id + the optional postfix “-s” for the small version. |
| f      | Optional fill color, written as hex-value (eg. aa3344 or shorthand a34)                               |
| s      | Optional stroke color, written as hex-value (eg. aa3344 or shorthand a34)                             |
| w      | Optional width in pixels. Numeric value without unit (eg. 128).                                       |
| h      | Optional height in pixels. Numeric value without unit (eg. 128).                                      |

## SVG and HTML

The YOI icons are SVG graphics. Generally speaking, there are two different ways to display SVG graphics on a web page. You may treat the SVG file like an `<image>` (or `<object>`) by using a HTML-tag with a source- (or data-) attribute:

```html
<!-- SVG as image -->
<img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-016" />

<!-- SVG as object -->
<object class="icon" type="image/svg+xml" data="http://cdn.yoshino.digital/svg.php?id=icon-016">
```

The other option is writing the SVG markup inline, directly into the HTML:

```html
<!-- inline SVG markup -->
<svg xmlns="http://www.w3.org/2000/svg" class="icon" role="img" aria-hidden="true" width="32" height="32" viewBox="0 0 2048 2048">
    <path fill="#6754a1" d="M768 319.835l-256 256v1152h1024v-1408H768zm640 1280H640v-896h256v-256h512v1152z"></path>
    <path fill="#6754a1" d="M768 831.835h512v128H768zM768 1087.835h512v128H768zM768 1343.835h512v128H768z"></path>
</svg>
```

<p class="hint"><b>Learn more about SVG in HTML</b> The explanaintion above is simplified. If you wish to learn more, take a look at <a href="https://css-tricks.com/using-svg/">this excellent article on css-tricks.com</a>.</p>

Writing the SVG markup by hand is not a good solution of course. In most cases, you can add icons to your page by using an `<image>`-tag. However, in some cases the only option is the inline method because styling the SVG via CSS only really works this way. See the following section [Inline-SVG Helper]({{ page.url }}.html#inline-svg-helper) for a another handy little tool.

## JavaScript API

### Inline-SVG Helper

If you need to embed SVG markup directly, add the script-hook `yoi-icon` to your `<img>` or `<object>` tag. No further settings required – the tag gets replaced instantly with the SVG markup:
    
```html
<!-- example -->
<img class="icon icon--xlarge" src="http://cdn.yoshino.digital/svg.php?id=icon-015" yoi-icon />
```

### replace()

The inline-SVG helper exposes a method to manually replace SVG images/objects with actual SVG markup. The method accepts only one parameter: a jQuery object, referencing the element you wish to replace:

```html
<!-- example -->
<img id="myIcon" src="http://cdn.yoshino.digital/svg.php?id=icon-015" />
<script>YOI.component.Icon.replace($('#myIcon'));</script>
```

## A List of All Available Icons

<table>
    <tr>
        <th>ID</th>
        <th>small</th>
        <th>regular</th>
        <th>large</th>
        <th>xlarge</th>
    </tr>
    {% for i in (1..85) %}
        <tr>
            <td>{{ i | prepend: '000' | slice: -3, 3 }}</td>
            <td class="val-m al-c"><img class="icon icon--small m-1" src="http://cdn.yoshino.digital/svg.php?id=icon-{{ i | prepend: '000' | slice: -3, 3 }}-s" /></td>
            <td class="val-m al-c"><img class="icon m-1" src="http://cdn.yoshino.digital/svg.php?id=icon-{{ i | prepend: '000' | slice: -3, 3 }}" /></td>
            <td class="val-m al-c"><img class="icon icon--large icon--x2 m-1" src="http://cdn.yoshino.digital/svg.php?id=icon-{{ i | prepend: '000' | slice: -3, 3 }}" /></td>
            <td class="val-m al-c"><img class="icon icon--xlarge m-1" src="http://cdn.yoshino.digital/svg.php?id=icon-{{ i | prepend: '000' | slice: -3, 3 }}" /></td>
        </tr>
    {% endfor %}
</table>