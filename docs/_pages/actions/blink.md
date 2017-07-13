---
layout: base
group: actions
title: Blink
permalink: actions/blink
---

# Blink

<p class="intro">Use this action to make an element <i>blink</i>, eg. to draw the user’s attention.</p>

| Js-File | [blink.js]({{ pathToSourceFile }}assets/js/actions/blink.js) |

## Basic Example

Use `yoi-action="Bink:CssSelector;"` to make an element blink. By default, it will blink two times.

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Blink:#exampleContainer-1;">Blink</button>
<div id="exampleContainer-1" class="box p-4 m-t-4 fs-15">Blink.</div>
```

Add the parameter `times` to define how many times the blink animation will play:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Blink:#exampleContainer-2; times:4;">Blink Four Times</button>
<div id="exampleContainer-2" class="box p-4 m-t-4 fs-15">Blink.</div>
```

## Parameters

| `on`    | optional – Any valid event ([learn more](actions/index.html#the-on-parameter)). The default is `click`. |
| `times` | oprional - The number of times the animation will play. The default value is 2.                         |