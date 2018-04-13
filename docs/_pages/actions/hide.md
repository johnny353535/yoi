---
layout: base
group: actions
title: Hide
permalink: actions/hide
---

# Hide

<p class="intro">Hides an element.</p>

## Example

Add `yoi-action="Hide:#id;"` to hide an element:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:#example-1;">Hide Instantly</button>
<div id="example-1" class="box p-4 m-t-4">
    <p class="fs-2">This will hide.</p>
</div>
```

<p class="hint hint--primary"><b>Parent and Self</b> Use the keyword <code>parent</code> to target the parent (=sourrounding) element. Use the keyword <code>self</code> to target the element itself.</p>

## Parameters

| `on`      | Optional – a valid event ([learn more]({{ site.github.url }}/actions/index.html#the-on-parameter)), the default event is `click` |
| `trigger` | Optional – the trigger element to listen to ([learn more]({{ site.github.url }}/actions/index.html#the-trigger-parameter))       |
| `fx`      | Optional – [fx utility class]({{ site.github.url }}/utilities/fx.html) to add an animation                                       |
| `speed`   | Optional – `slow` or `fast`, speed for fx-animation                                                        |
| `remove`  | Optional – if set to `true`, the target element is removed from the document                               |

### Fx

Use the optional parameter `fx` to add an animation. Technically you can use all [fx utility classes]({{ site.github.url }}/utilities/fx.html) – however, only the following produce proper show-animations:

| `.fx-fade-out`         | fades out                            |
| `.fx-scale-down`       | shrinks from original size to zero   |
| `.fx-scale-down-y`     | shrinks from original height to zero |
| `.fx-slide-out-top`    | moves out to the top                 |
| `.fx-slide-out-bottom` | moves out to the bottom              |
| `.fx-slide-out-left`   | moves out to the left                |
| `.fx-slide-out-right`  | moves out to the right               |

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:#example-2; fx:fade-out;">Hide with Fx</button>
<div id="example-2" class="box p-4 m-t-4">
    <p class="fs-2">This will hide with a fade-out-transition.</p>
</div>
```

### Speed

Use the optional parameter `speed` and set it to `fast` or `slow` to control the fx animation speed:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:#example-3; fx:fade-out; speed:fast;">Hide Fast</button>
<div id="example-3" class="box p-4 m-t-4">
    <p class="fs-2">This will hide with a fast fade-out-transition.</p>
</div>
```

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:#example-4; fx:fade-out; speed:slow;">Hide Slowly</button>
<div id="example-4" class="box p-4 m-t-4">
    <p class="fs-2">This will hide with a slow fade-out-transition.</p>
</div>
```

### Remove

Use the optional parameter `remove` and set it to `true` to remove the target element from the document after hiding:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:#example-5; remove:true;">Hide & Remove</button>
<div id="example-5" class="box p-4 m-t-4">
    <p class="fs-2">This will hide and remove.</p>
</div>
```

<p class="hint hint--primary">With <code>remove:true;</code>, the target element will trigger the event `yoi-remove` rather than `yoi-hide`.</p>

## Events

This action fires the following events on each element it is applied to:

| `yoi-hide`   | Fires when the element is hidden.  |
| `yoi-remove` | Fires when the element is removed. |
