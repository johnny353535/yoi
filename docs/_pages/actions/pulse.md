---
layout: base
group: actions
title: Pulse
permalink: actions/pulse
---

# Pulse

<p class="intro">Use this action to make an element <i>pulse</i>, eg. to draw the user’s attention.</p>

| Js-File | [pulse.js]({{ pathToSourceFile }}assets/js/actions/pulse.js) |

## Basic Example

Use `yoi-action="Pulse:CssSelector;"` to make an element pulse. By default, it will pulse two times.

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Pulse:#exampleContainer-1;">Pulse</button>
<div id="exampleContainer-1" class="box p-4 m-t-4 fs-2">Pulse.</div>
```

Add the parameter `times` to define how many times the pulse animation will play:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Pulse:#exampleContainer-2; times:4;">Pulse Four Times</button>
<div id="exampleContainer-2" class="box p-4 m-t-4 fs-2">Pulse.</div>
```

## Parameters

| `on`    | optional – Any valid event ([learn more](actions/index.html#the-on-parameter)). The default is `click`. |
| `times` | oprional - The number of times the animation will play. The default value is 2.                         |