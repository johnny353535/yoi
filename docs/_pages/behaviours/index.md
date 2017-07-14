---
layout: base
group: behaviours
title: Introduction
permalink: behaviours/
---

# Behaviours

<p class="intro">YOI provides a powerful HTML-based interface to add certain functionality to elements on your web page. We call these added functionalities <i>Behaviours</i>.</p>

## Purpose

Use a _behaviour_ if you want to add a specific functionality to a specific element which only affect the specific element itself. Eg. make an element stick to the top of the viewport, once you scolled past it.

## Logic

You assign a behavior to an element by adding the behaviour’s custom attribute. We call these attributes _hooks_. For example, a `<div>` with a hook looks like this:

```html
<div yoi-nameofbehaviour>...</div>
```

Unlike [YOI’s actions](actions/index.html), behaviors do not share a single uniform _hook_. Each _behavior_ has it’s own custom _hook_. Additionally, each _behavior_ has it’s own custom set of parameters.

## Multiple Behaviours

An HTML-element can have multiple different behaviours. However, an HTML-element can not have multiple behaviours of the same kind.

## Parameters

Make sure you write the parameters correctly, otherwise the action just does not work. Checklist for parameters:

* An behaviour may have _many parameters_.
* Paramaters must be _formatted correctly_. They are written as key/value pairs. Keys are seperated from values with a colon. Each key/value pair must end with a semicolon: `key:value;`.
* If values include special characters – for example URLS with slashes, colons etc. – wrap them in _single quotation marks_: `key:'some//value:with_special?charactes'`.
* Values can _not include single nor double quotation marks_.
* All parameters are optional and can follow in any order you prefer.