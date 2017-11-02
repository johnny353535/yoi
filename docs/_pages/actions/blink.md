---
layout: base
group: actions
title: Blink
permalink: actions/blink
---

# Blink

<p class="intro">Makes an element <i>blink</i>.</p>

## Example

Add `yoi-action="Blink:#id;"` to make an element blink. By default, it blinks two times:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Blink:#example-1;">Blink</button>
<div id="example-1" class="box p-4 m-t-4 fs-2">This will blink two times.</div>
```

<p class="hint hint--primary"><b>Parent and Self</b> Use the keyword <code>parent</code> to target the parent (=sourrounding) element. Use the keyword <code>self</code> to target the element itself.</p>

## Parameters

| `on`      | Optional – a valid event ([learn more](actions/index.html#the-on-parameter)). The default event is `click`. |
| `trigger` | Optional – the trigger element to listen to ([learn more](actions/index.html#the-trigger-parameter)).       |
| `times`   | Oprional - the number of times the animation will play. The default value is `2`.                           |

### Times

Add the parameter `times` to define how many times the blink animation plays:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Blink:#example-2; times:4;">Blink Four Times</button>
<div id="example-2" class="box p-4 m-t-4 fs-2">This will blink four times.</div>
```

## Events

This action does not fire any event.