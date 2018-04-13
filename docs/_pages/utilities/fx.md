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
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-a; fx:fade-in; speed:fast;">Fade-In Fast</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-a; fx:fade-in;">Reset</button>
</p>
<p>
    <span id="example-a" class="d-inlineblock br-all bg-base-23 w-10 h-10"></span>
</p>
```

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-b; fx:fade-in; speed:slow;">Fade-In Slow</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-b; fx:fade-in;">Reset</button>
<p>
<p>
    <span id="example-b" class="d-inlineblock br-all bg-base-23 w-10 h-10"></span>
</p>
```

## Examples

### fx-fade-in

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-1; fx:fade-in;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-1; fx:fade-in;">Reset</button>
</p>
<span id="example-1" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-fade-out

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-2; fx:fade-out;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-2; fx:fade-out;">Reset</button>
</p>
<span id="example-2" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-scale-up

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-3; fx:scale-up;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-3; fx:scale-up;">Reset</button>
</p>
<span id="example-3" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-scale-down

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-4; fx:scale-down;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-4; fx:scale-down;">Reset</button>
</p>
<span id="example-4" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-scale-up-y

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-5; fx:scale-up-y;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-5; fx:scale-up-y;">Reset</button>
</p>
<span id="example-5" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-scale-down-y

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-6; fx:scale-down-y;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-6; fx:scale-down-y;">Reset</button>
</p>
<span id="example-6" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-slide-in-top

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-7; fx:slide-in-top;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-7; fx:slide-in-top;">Reset</button>
</p>
<span id="example-7" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-slide-out-top

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large " yoi-action="Show:#example-8; fx:slide-out-top;">Run</button>
    <button class="btn btn--primary btn--large " yoi-action="ResetFx:#example-8; fx:slide-out-top;">Reset</button>
</p>
<span id="example-8" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-slide-in-bottom

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-9; fx:slide-in-bottom;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-9; fx:slide-in-bottom;">Reset</button>
</p>
<span id="example-9" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-slide-out-bottom

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-10; fx:slide-out-bottom;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-10; fx:slide-out-bottom;">Reset</button>
</p>
<span id="example-10" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-slide-in-left

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-11; fx:slide-in-left;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-11; fx:slide-in-left;">Reset</button>
</p>
<span id="example-11" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-slide-out-left

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-12; fx:slide-out-left;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-12; fx:slide-out-left;">Reset</button>
</p>
<span id="example-12" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-slide-in-right

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-13; fx:slide-in-right;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-13; fx:slide-in-right;">Reset</button>
</p>
<span id="example-13" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-slide-out-right

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-14; fx:slide-out-right;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-14; fx:slide-out-right;">Reset</button>
</p>
<span id="example-14" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```

### fx-shake

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--primary btn--large" yoi-action="Show:#example-15; fx:shake;">Run</button>
    <button class="btn btn--primary btn--large" yoi-action="ResetFx:#example-15; fx:shake;">Reset</button>
</p>
<span id="example-15" class="d-inlineblock br-all bg-base-23 w-10 h-10 val-t"></span>
```
