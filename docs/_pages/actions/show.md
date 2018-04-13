---
layout: base
group: actions
title: Show
permalink: actions/show
---

# Show

<p class="intro">Shows a hidden element.</p>

## Example

Add `yoi-action="Show:#id;"` to show an element:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Show:#example-1;">Show Instantly</button>
<div id="example-1" class="box p-4 m-t-4">
    <p class="fs-2">This will show.</p>
</div>
```

<p class="hint hint--primary"><b>Parent and Self</b> Use the keyword <code>parent</code> to target the parent (=sourrounding) element. Use the keyword <code>self</code> to target the element itself.</p>

## Parameters

| `on`      | Optional – a valid event ([learn more]({{ site.github.url }}/actions/index.html#the-on-parameter)), the default event is `click`          |
| `trigger` | Optional – the trigger element to listen to ([learn more]({{ site.github.url }}/actions/index.html#the-trigger-parameter))                |
| `fx`      | Optional – [fx utility class]({{ site.github.url }}/utilities/fx.html) to add an animation                                                |
| `speed`   | Optional – `slow` or `fast`, speed for fx-animation                                                                                       |
| `toggle`  | Optional - if set to `true`, the action toggles the visibility of the target element on each call (shows when hidden, hides when visible) |

### Fx

Use the optional `fx` parameter to add an animation. Technically you can use all [fx utility classes]({{ site.github.url }}/utilities/fx.html) – however, only the following produce proper show-animations:

| `.fx-fade-in`         | fades in                           |
| `.fx-scale-up`        | grows from zero to origial size    |
| `.fx-scale-up-y`      | grows from zero to original height |
| `.fx-slide-in-top`    | moves in to the top                |
| `.fx-slide-in-bottom` | moves in to the bottom             |
| `.fx-slide-in-left`   | moves in to the left               |
| `.fx-slide-in-right`  | moves in to the right              |

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Show:#example-2; fx:fade-in;">Show with Fx</button>
<div id="example-2" class="box p-4 m-t-4">
    <p class="fs-2">This will show with a fade-in transition.</p>
</div>
```

### Speed

Use the optional parameter `speed` and set it to `fast` or `slow` to control the fx animation speed:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Show:#example-3; fx:fade-in; speed:fast;">Show Fast</button>
<div id="example-3" class="box p-4 m-t-4">
    <p class="fs-2">This will show with a fast fade-in transition.</p>
</div>
```

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Show:#example-4; fx:fade-in; speed:slow;">Show Slowly</button>
<div id="example-4" class="box p-4 m-t-4">
    <p class="fs-2">This will show with a slow fade-in transition.</p>
</div>
```

### Toggle

Use the optional parameter `toggle` and set it to `true` to *toggle* the visibility: the action *shows* the target element when it’s hidden and *hides* it when it’s visible. Please note that *toggle* also applies the effects and reverses them like you would expect, eg. 'fade-in' becomes 'fade-out' while hiding.

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Show:#example-5; fx:fade-in; speed:slow; toggle:true;">Show/Toggle</button>
<div id="example-5" class="box p-4 m-t-4">
    <p class="fs-2">This will show when hidden and hide when visible.</p>
</div>
```

## Events

This action fires the following events on each element it is applied to:

| `yoi-show` | Fires when the element is visible. |
