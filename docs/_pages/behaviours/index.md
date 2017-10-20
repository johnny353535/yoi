---
layout: base
group: behaviours
title: Introduction
permalink: behaviours/
---

# Behaviours

<p class="intro">YOI provides a simple CSS-like interface to add functionality to HTML elements. We call it <i>Behaviours</i>.</p>

## The Behaviour Attribute

Add a [Behaviour-Attribute](/glossary) to any element to activate the chosen behaviour:

```html
<div yoi-somebehaviour></div>
```

<p class="hint hint--negative">An element can have multiple <i>different</i> Behaviours. However, an element can not have multiple <i>identical</i> behaviours.</p>

## Parameters

Behaviors may have options or settings. We call this *parameters*. You can manipulate them via YOI’s [Parameter-Syntax](/glossary):

```html
<div yoi-somebehaviour="someOption:someValue;">...</div>
```

<p class="hint hint--primary">Make sure you write the parameters correctly. If you don’t, the Behaviour might not work. If you know CSS, the syntax should look familiar to you.</p>

### Parameter Formatting Checklist

* A Behaviour may accept _many parameters_.
* Write Parameters in key/value-pairs.
* Keys are seperated from values with a colon.
* Each key/value-pair must end with a semicolon.
* This is how you write a valid key/value-pair: `key:value;`.
* If at least one value contains special characters (slashes, colons etc.), wrap **all values** in _single quotation marks_: `foo:'some//value:with_special?charactes'; bar:'12'; foobar:'abc'`. 
* Values must _not include single nor double quotation marks_!
* Write Parameters in any order you prefer.