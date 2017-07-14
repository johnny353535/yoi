---
layout: base
group: behaviours
title: Dismissable
permalink: behaviours/dismissable
---

# Dismissable

<p class="intro">Adds a dismiss (or “close”) button to an element’s upper right corner.</p>

| Js-File | [dismiss.js]({{ pathToSourceFile }}assets/js/behaviours/dismiss.js)           |
| Styles  | [btnDismiss.less]({{ pathToSourceFile }}assets/less/elements/btnDismiss.less) |

## Example

```html
<!-- example -->
<div class="box p-4 w-30" yoi-dismissable>
    <p class="fs-15">You may dismiss me.</p>
</div>
```

<p class="hint hint--negative"><b>Positioning</b>: If the target’s element has neither <code>position: absolute;</code> nor <code>position: relative;</code>, the position will be set to <code>relative</code>. This might affect the element’s styling.</p>