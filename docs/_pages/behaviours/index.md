---
layout: base
group: behaviours
title: Introduction
permalink: behaviours/
---

# Behaviours

<p class="intro">YOI provides a HTML-based interface to add functionality to elements on the page. We call this <i>Behaviours</i>.</p>

## Purpose

Use a Behaviour to add a specific functionality to a specific [element](/glossary). A Behaviour only affects the specific element itself.

## Logic

Add a [Behaviour-Attribute](/glossary) to any element to activate the chosen behaviour:

```html
<div yoi-somebehaviour>...</div>
```

## Multiple Behaviours

An [element](/glossary) can have multiple different Behaviours. However, an [element](/glossary) can not have multiple behaviours of the same kind!

## Parameters

Behaviors may have options. You can manipulate them via YOI’s [Parameter-Syntax](/glossary):

```html
<div yoi-somebehaviour="someOption:someValue;">...</div>
```

Make sure you write the parameters correctly. If you don’t, the Behaviour might not work. If you know CSS, the syntax should look familiar to you. Follow this check-list:

* A Behaviour may accept _many parameters_.
* Write Parameters in key/value-pairs.
* Keys are seperated from values with a colon.
* Each key/value-pair must end with a semicolon.
* This is how you write a valid key/value-pair: `key:value;`.
* If at least one value contains special characters (slashes, colons etc.), wrap **all values** in _single quotation marks_: `foo:'some//value:with_special?charactes'; bar:'12'; foobar:'abc'`. 
* Values must _not include single nor double quotation marks_!
* Write Parameters in any order you prefer.