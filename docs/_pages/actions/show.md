---
layout: base
group: actions
title: Show
permalink: actions/show
---

# Show

<p class="intro">Reveals a hidden element.</p>

## Example

Add `yoi-action="Show:#id;"` to show an element:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Show:#example-1;">Show</button>
<div id="example-1" class="box p-4 m-t-4">
    <p class="fs-2">This will show.</p>
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
<button class="btn btn--large" yoi-action="Show:#example-2; transition:fade;">Show</button>
<div id="example-2" class="box p-4 m-t-4">
    <p class="fs-2">This will show with a fade-in-transition.</p>
</div>
```