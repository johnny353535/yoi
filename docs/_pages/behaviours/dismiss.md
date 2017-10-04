---
layout: base
group: behaviours
title: Dismiss
permalink: behaviours/dismiss
---

# Dismiss

<p class="intro">Adds a dismiss (or “close”) button to an element’s upper right corner.</p>

## Example

```html
<!-- example -->
<div class="box p-4" yoi-dismissable>
    <p class="fs-2">You may dismiss me.</p>
</div>
```

<p class="hint hint--negative"><b>Positioning</b>: If the target’s element has neither <code>position: absolute;</code> nor <code>position: relative;</code>, the position will be set to <code>relative</code>. This might affect the element’s styling.</p>