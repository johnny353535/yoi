---
layout: base
group: components
title: Icon
permalink: components/icon
---

# Icon

<p class="intro">Monochrome SVG-based icons.</p>

## Basic Example

This is how a basic `.icon` looks like and how you write the markup:

```html
<!-- example -->
<img class="icon" src="{{ site.github.url }}/assets/img/icon-arrow-up.svg" yoi-icon />
```
## Modifiers

### Size

Render icons in different sizes with the modifiers `.icon--small, .icon--large, .icon--xlarge`:

```html
<!-- example -->
<img class="icon icon--small" src="{{ site.github.url }}/assets/img/icon-arrow-up.svg" yoi-icon />
<img class="icon icon--large" src="{{ site.github.url }}/assets/img/icon-arrow-up.svg" yoi-icon />
<img class="icon icon--xlarge" src="{{ site.github.url }}/assets/img/icon-arrow-up.svg" yoi-icon />
```

### Weight

Render icons in different weights with the modifiers `.icon--thin` and `.icon--bold`:

```html
<!-- example -->
<img class="icon icon--thin" src="{{ site.github.url }}/assets/img/icon-arrow-up.svg" yoi-icon />
<img class="icon icon--bold" src="{{ site.github.url }}/assets/img/icon-arrow-up.svg" yoi-icon />
```

### Color

Render icons in different semantic colors with the modifiers `.icon--attention, .icon--positive, .icon--negative`:

```html
<!-- example -->
<img class="icon icon--attention" src="{{ site.github.url }}/assets/img/icon-arrow-up.svg" yoi-icon />
<img class="icon icon--positive" src="{{ site.github.url }}/assets/img/icon-arrow-up.svg" yoi-icon />
<img class="icon icon--negative" src="{{ site.github.url }}/assets/img/icon-arrow-up.svg" yoi-icon />
```

## SVG and HTML

Generally speaking, there are two different ways to display SVG graphics on a web page. You may treat the SVG file like an `<image>` (or `<object>`) by using a HTML-tag with a source- (or data-) attribute:

```html
<!-- SVG as image -->
<img class="icon" src="{{ site.github.url }}/assets/img/icon-arrow-up.svg" />

<!-- SVG as object -->
<object class="icon" type="image/svg+xml" data="{{ site.github.url }}/assets/img/icon-arrow-up.svg">
```

The other option is writing the SVG markup inline, directly into the HTML:

```html
<!-- inline SVG markup -->
<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
```

<p class="hint"><b>Learn more about SVG in HTML</b> The explanaintion above is simplified. If you wish to learn more, take a look at <a href="https://css-tricks.com/using-svg/">this excellent article on css-tricks.com</a>.</p>

Writing the SVG markup by hand isn’t a practical solution. In most cases, you can add icons to your page by using an `<image>`-tag. However, in some cases the only option is the inline method because styling the SVG via CSS only really works this way. See the following section [Inline-SVG Helper](/yoi/{{ page.url }}.html#inline-svg-helper) for a solution.

## Inline-SVG Helper

If you need to embed SVG markup directly, add the attribute `yoi-icon` to your `<img>` or `<object>` tag. No further settings required – the tag gets replaced instantly with the actual SVG markup:

```html
<!-- example -->
<img class="icon icon--xlarge" src="{{ site.github.url }}/assets/img/icon-arrow-up.svg" yoi-icon />
```

## List of Available Icons

<table>
    <tr>
        <th>Name</th>
        <th>Icon</th>
    </tr>
    <tr>
        <td>icon-arrow-down</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-arrow-down.svg" yoi-icon /></td>
    </tr>
    <tr>
        <td>icon-arrow-left</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-arrow-left.svg" yoi-icon /></td>
    </tr>
    <tr>
        <td>icon-arrow-right</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-arrow-right.svg" yoi-icon /></td>
    </tr>
    <tr>
        <td>icon-arrow-up</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-arrow-up.svg" yoi-icon /></td>
    </tr>
    <tr>
        <td>icon-checkmark</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-checkmark.svg" yoi-icon /></td>
    </tr>
    <tr>
        <td>icon-chevron-down</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-chevron-down.svg" yoi-icon /></td>
    </tr>
    <tr>
        <td>icon-chevron-left</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-chevron-left.svg" yoi-icon /></td>
    </tr>
    <tr>
        <td>icon-chevron-right</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-chevron-right.svg" yoi-icon /></td>
    </tr>
    <tr>
        <td>icon-chevron-up</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-chevron-up.svg" yoi-icon /></td>
    </tr>
    <tr>
        <td>icon-minus</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-minus.svg" yoi-icon /></td>
    </tr>
    <tr>
        <td>icon-plus</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-plus.svg" yoi-icon /></td>
    </tr>
    <tr>
        <td>icon-spyglass</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-spyglass.svg" yoi-icon /></td>
    </tr>
    <tr>
        <td>icon-x</td>
        <td><img class="icon" src="{{ site.github.url }}/assets/img/icon-x.svg" yoi-icon /></td>
    </tr>
</table>
