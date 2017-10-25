---
layout: base
group: actions
title: Remove
permalink: actions/remove
---

# Remove

<p class="intro">Removes an element.</p>

## Example

Add `yoi-action="Remove:targetElementSelector;"` to remove an element from the document:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Remove:#example-1;">Remove</button>
<div id="example-1" class="box p-4 m-t-4">
    <p class="fs-2">This will get removed from the document.</p>
</div>
```

<p class="hint hint--primary"><b>Parent and Self</b> Use the keyword <code>parent</code> to target the parent (=sourrounding) element. Use the keyword <code>self</code> to target the element itself.</p>

## Parameters

| `on`      | Optional – a valid event ([learn more](actions/index.html#the-on-parameter)). The default event is `click`. |
| `trigger` | Optional – the trigger element to listen to ([learn more](actions/index.html#the-trigger-parameter)).       |

