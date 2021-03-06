---
layout: base
group: behaviors
title: Dismiss
permalink: behaviors/dismiss
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

This behavior fires the following events on each element it is applied to:

| `yoi-dismiss` | Fires after the dismissable element disappeared. |
