---
layout: base
group: behaviours
title: Introduction
permalink: behaviours/
---

# Behaviours

<p class="intro">YOI’s <i>behaviours</i> provide a simple CSS-like interface to add functionality to HTML elements.</p>

## The Behaviour Attribute

Add a [behaviour-Attribute](/glossary) to any element to activate the behaviour:

```html
<div yoi-dismiss></div>
```

### List of Behaviours

| behaviour                            | attribute      | description |
| ------------------------------------ | -------------- | ----------- |
| [Dismiss](behaviours/dismiss.html)   | `yoi-dismiss`  |             |
| [Lazyload](behaviours/lazyload.html) | `yoi-lazyload` |             |
| [Parallax](behaviours/parallax.html) | `yoi-parallax` |             |
| [Scrollfx](behaviours/scrollfx.html) | `yoi-scrollfx` |             |
| [Stiky](behaviours/sticky.html)      | `yoi-sticky`   |             |

<p class="hint hint--negative">You can add more than one behaviour to an element. However, you cannot add the same behaviour multiple times.</p>

## Parameters

Behaviours may have [parameters](/glossary) to change the default setting of a behaviour:

```html
<div yoi-parallax="factor:5;">...</div>
```

<p class="hint hint--primary">Make sure you write the parameters correctly, otherwise the behaviour might not work. If you know CSS, the syntax should look familiar to you:</p>

### Parameter Formatting Checklist

* A behaviour may accept _many parameters_.
* Write Parameters in key/value-pairs.
* Keys are seperated from values with a colon.
* Each key/value-pair must end with a semicolon.
* This is how you write a valid key/value-pair: `key:value;`.
* If at least one value contains special characters (slashes, colons etc.), wrap **all values** in _single quotation marks_: `foo:'some//value:with_special?charactes'; bar:'12'; foobar:'abc'`. 
* Values must _not include single nor double quotation marks_!
* Write Parameters in any order you prefer.