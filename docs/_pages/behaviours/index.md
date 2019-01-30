---
layout: base
group: behaviors
title: Introduction
permalink: behaviors/
---

# Behaviors

<p class="intro">YOI <i>behaviors</i> provide a simple CSS-like interface to add functionality to HTML elements.</p>

## Purpose

Use a *behavior* to make an element *behave* in a certain way depending on certain conditions. For example make an element react to it’s current position while scrolling.

## The Behavior Attribute

Add a behavior-attribute to any element to activate the behavior:

```html
<div yoi-dismiss></div>
```

### List of Behaviors

| Behavior                            | Attribute      | Description                                                                      |
| ------------------------------------ | -------------- | -------------------------------------------------------------------------------- |
| [Dismiss]({{ site.github.url }}/behaviors/dismiss.html)   | `yoi-dismiss`  | Adds a close-button to an element.                                               |
| [Lazyload]({{ site.github.url }}/behaviors/lazyload.html) | `yoi-lazyload` | Loads an image only if it’s inside the viewport.                                 |
| [Parallax]({{ site.github.url }}/behaviors/parallax.html) | `yoi-parallax` | Adds a parallax scrolling effect to an element.                                  |
| [Scrollfx]({{ site.github.url }}/behaviors/scrollfx.html) | `yoi-scrollfx` | Adds effects or transitions to an element, responding to the scrolling position. |
| [Sticky]({{ site.github.url }}/behaviors/sticky.html)     | `yoi-sticky`   | Makes an element *stick* when scrolled past it’s position on the page.           |

<p class="hint hint--negative">You can add more than one behavior to an element. However, you cannot add the same behavior multiple times.</p>

## Parameters

Behaviors may have parameters to change the default setting of a behavior:

```html
<div yoi-parallax="factor:5;">...</div>
```

<p class="hint hint--primary">Make sure you write the parameters correctly, otherwise the behavior might not work. If you know CSS, the syntax should look familiar to you:</p>

### Parameter Formatting Checklist

* A behavior may accept _many parameters_.
* Write Parameters in key/value-pairs.
* Keys are seperated from values with a colon.
* Each key/value-pair must end with a semicolon.
* This is how you write a valid key/value-pair: `key:value;`.
* If at least one value contains special characters (slashes, colons etc.), wrap **all values** in _single quotation marks_: `foo:'some//value:with_special?charactes'; bar:'12'; foobar:'abc'`.
* Values must _not include single nor double quotation marks_!
* Write Parameters in any order you prefer.
