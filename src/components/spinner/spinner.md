---
layout: base
group: components
title: Spinner
permalink: components/spinner
---

# Spinner

<p class="intro">A simple animated activity indicator.</p>

## Basic Example

This is how a basic `.spinner` looks like and how you write the markup:

```html
<!-- example -->
<div class="box box--1 w-10 h-10">
    <span class="spinner"></span>
</div>
```

<p class="hint hint--negative"><b>Positioning:</b> A <code>.spinner</code> must always be placed inside a positioned element (eg. <code>position: relative;</code>).</p>

## Modifiers

### Dark

Add the modifier class `.spinner--dark` to create a spinner that looks better on dark backgrounds:

```html
<!-- example -->
<div class="box box--1 w-10 h-10">
    <span class="spinner spinner--dark"></span>
    <img class="d-blk" src="https://source.unsplash.com/IzYV53M52PM/160x160" />
</div>
```
