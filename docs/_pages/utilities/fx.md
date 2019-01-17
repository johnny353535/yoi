---
layout: base
group: utilities
title: Fx
permalink: utilities/fx
---

# Fx

<p class="intro">Applies CSS animations on an element.</p>

<p class="hint hint--primary">These utilities are most useful in combination with the <a href="{{ site.github.url }}/actions/show.html">Show-</a> and <a href="{{ site.github.url }}/actions/hide.html">Hide</a>-actions, <a href="{{ site.github.url }}/behaviours/scrollfx.html">Scollfx behaviour</a> or your own JavaScript.</p>

| `.fx-fade-in`          | fades in                             |
| `.fx-fade-out`         | fades out                            |
| `.fx-scale-up`         | grows from zero to origial size      |
| `.fx-scale-down`       | shrinks from original size to zero   |
| `.fx-scale-up-y`       | grows from zero to original height   |
| `.fx-scale-down-y`     | shrinks from original height to zero |
| `.fx-slide-in-top`     | moves in from the top                |
| `.fx-slide-out-top`    | moves out to the top                 |
| `.fx-slide-in-bottom`  | moves in from the bottom             |
| `.fx-slide-out-bottom` | moves out to the bottom              |
| `.fx-slide-in-left`    | moves in from the left               |
| `.fx-slide-out-left`   | moves out to the left                |
| `.fx-slide-in-right`   | moves in from the right              |
| `.fx-slide-out-right`  | moves out to the right               |
| `.fx-shake`            | shakes                               |

## Speed / Fx-Duration

Add the css-class `.fx-slow`, `.fx-fast` or `.fx-[1-25]` where `.fx-1` is the slowest and `.fx-25` the fastest:

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Show:#example-a; fx:fade-in; speed:fast;">Fade-In Fast</button>
</p>
<div id="example-a" class="br-all bg-base-23 w-10 h-10"></div>
```

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Show:#example-b; fx:fade-in; speed:slow;">Fade-In Slow</button>
<p>
<div id="example-b" class="br-all bg-base-23 w-10 h-10"></div>
```

## Examples

### fx-fade-in

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Show:#example-1; fx:fade-in;">Run</button>
</p>
<div id="example-1" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-fade-out

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Hide:#example-2; fx:fade-out;">Run</button>
</p>
<div id="example-2" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-scale-up

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Show:#example-3; fx:scale-up;">Run</button>
</p>
<div id="example-3" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-scale-down

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Hide:#example-4; fx:scale-down;">Run</button>
</p>
<div id="example-4" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-scale-up-y

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Show:#example-5; fx:scale-up-y;">Run</button>
</p>
<div id="example-5" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-scale-down-y

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Hide:#example-6; fx:scale-down-y;">Run</button>
</p>
<div id="example-6" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-slide-in-top

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Show:#example-7; fx:slide-in-top;">Run</button>
</p>
<div id="example-7" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-slide-out-top

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large " yoi-action="Hide:#example-8; fx:slide-out-top;">Run</button>
</p>
<div id="example-8" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-slide-in-bottom

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Show:#example-9; fx:slide-in-bottom;">Run</button>
</p>
<div id="example-9" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-slide-out-bottom

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Hide:#example-10; fx:slide-out-bottom;">Run</button>
</p>
<div id="example-10" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-slide-in-left

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Show:#example-11; fx:slide-in-left;">Run</button>
</p>
<div id="example-11" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-slide-out-left

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Hide:#example-12; fx:slide-out-left;">Run</button>
</p>
<div id="example-12" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-slide-in-right

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Show:#example-13; fx:slide-in-right;">Run</button>
</p>
<div id="example-13" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-slide-out-right

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Hide:#example-14; fx:slide-out-right;">Run</button>
</p>
<div id="example-14" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```

### fx-shake

```html
<!-- example -->
<p class="buttons m-b-1">
    <button class="button button--large" yoi-action="Show:#example-15; fx:shake;">Run</button>
</p>
<div id="example-15" class="br-all bg-base-23 w-10 h-10 val-t"></div>
```
