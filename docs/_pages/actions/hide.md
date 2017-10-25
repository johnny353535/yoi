---
layout: base
group: actions
title: Hide
permalink: actions/hide
---

# Hide

<p class="intro">Hides an element.</p>

## Example

Add `yoi-action="Hide:#targetElementSelector;"` to hide an element:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:#example-1;">Hide</button>
<div id="example-1" class="box p-4 m-t-4">
    <p class="fs-2">This will hide.</p>
</div>
```
<p class="hint hint--primary"><b>Parent and Self</b> Use the keyword <code>parent</code> to target the parent (=sourrounding) element. Use the keyword <code>self</code> to target the element itself.</p>

## Parameters

| `on`         | Optional – a valid event ([learn more](actions/index.html#the-on-parameter)). The default event is `click`. |
| `trigger`    | Optional – the trigger element to listen to ([learn more](actions/index.html#the-trigger-parameter)).       |
| `transition` | Optional – one of the transitions `fade` and `slide`.                                                       |

### Transition

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:#example-2; transition:fade;">Hide</button>
<div id="example-2" class="box p-4 m-t-4">
    <p class="fs-2">This will hide with a fade-out-transition.</p>
</div>
```