---
layout: base
group: actions
title: Pulse
permalink: actions/pulse
---

# Pulse

<p class="intro">Makes an element <i>pulse</i>.</p>

## Example

Add `yoi-action="Pulse:#targetElementSelector;"` to make an element pulse. By default, it pulses two times:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Pulse:#example-1;">Pulse</button>
<div id="example-1" class="box p-4 m-t-4 fs-2">This will pulse two times.</div>
```

<p class="hint hint--primary"><b>Parent and Self</b> Use the keyword <code>parent</code> to target the parent (=sourrounding) element. Use the keyword <code>self</code> to target the element itself.</p>

## Parameters

| `on`      | Optional – a valid event ([learn more](actions/index.html#the-on-parameter)). The default event is `click`. |
| `trigger` | Optional – the trigger element to listen to ([learn more](actions/index.html#the-trigger-parameter)).       |
| `times`   | Oprional - the number of times the animation will play. The default value is `2`.                           |

### Times

Add the parameter `times` to define how many times the pulse animation plays:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Pulse:#example-2; times:4;">Pulse Four Times</button>
<div id="example-2" class="box p-4 m-t-4 fs-2">This will pulse four times.</div>
```