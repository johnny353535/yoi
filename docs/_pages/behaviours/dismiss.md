---
layout: base
group: behaviours
title: Dismiss
permalink: behaviours/dismiss
---

# Dismiss

<p class="intro">Adds a close-button to an element.</p>

## Example

Add the attribute `yoi-dismiss` to your element:

```html
<!-- example -->
<div class="box p-4" yoi-dismiss>
    <p class="fs-2">You may dismiss me.</p>
</div>
```

<p class="hint hint--negative"><b>Positioning</b>: If the target’s element has neither <code>position: absolute;</code> nor <code>position: relative;</code>, the position will be set to <code>relative</code>. This might affect the element’s styling!</p>

## Events

This behaviour fires the following [events](/glossary) on each element with the applied behaviour:

| Event           | Fires …                                   |
| --------------- | ----------------------------------------- |
| `yoi-dismissed` | After the dismissable element disappeared |