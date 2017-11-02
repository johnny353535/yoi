---
layout: base
group: utilities
title: Fx
permalink: utilities/fx
---

# Fx

<p class="intro">Applies CSS animations on an element.</p>

<p class="hint hint--primary">These utilities are most useful in combination with the <a href="actions/show.html">Show-</a> and <a href="actions/hide.html">Hide</a>-actions, <a href="behaviours/scrollfx.html">Scollfx behaviour</a> or your own JavaScript.</p>

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

## Examples

### fx-fade-in

```html
<!-- example:tabs -->
<div id="example-1" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Show:#example-1; fx:fade-in;">Run</button></p>
```

### fx-fade-out

```html
<!-- example:tabs -->
<div id="example-2" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Hide:#example-2; fx:fade-out;">Run</button></p>
```

### fx-scale-up

```html
<!-- example:tabs -->
<div id="example-3" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Show:#example-3; fx:scale-up;">Run</button></p>
```

### fx-scale-down

```html
<!-- example:tabs -->
<div id="example-4" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Hide:#example-4; fx:scale-down;">Run</button></p>
```

### fx-scale-up-y

```html
<!-- example:tabs -->
<div id="example-5" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Show:#example-5; fx:scale-up-y;">Run</button></p>
```

### fx-scale-down-y

```html
<!-- example:tabs -->
<div id="example-6" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Hide:#example-6; fx:scale-down-y;">Run</button></p>
```

### fx-slide-in-top

```html
<!-- example:tabs -->
<div id="example-7" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Show:#example-7; fx:slide-in-top;">Run</button></p>
```

### fx-slide-out-top

```html
<!-- example:tabs -->
<div id="example-8" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Hide:#example-8; fx:slide-out-top;">Run</button></p>
```

### fx-slide-in-bottom

```html
<!-- example:tabs -->
<div id="example-9" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Show:#example-9; fx:slide-in-bottom;">Run</button></p>
```

### fx-slide-out-bottom

```html
<!-- example:tabs -->
<div id="example-10" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Hide:#example-10; fx:slide-out-bottom;">Run</button></p>
```

### fx-slide-in-left

```html
<!-- example:tabs -->
<div id="example-11" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Show:#example-11; fx:slide-in-left;">Run</button></p>
```

### fx-slide-out-left

```html
<!-- example:tabs -->
<div id="example-12" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Hide:#example-12; fx:slide-out-left;">Run</button></p>
```

### fx-slide-in-right

```html
<!-- example:tabs -->
<div id="example-13" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Show:#example-13; fx:slide-in-right;">Run</button></p>
```

### fx-slide-out-right

```html
<!-- example:tabs -->
<div id="example-14" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Hide:#example-14; fx:slide-out-right;">Run</button></p>
```

### fx-shake

```html
<!-- example:tabs -->
<div id="example-15" class="br-all bg-base-23 w-10 h-10"></div>
<p class="m-t-2"><button class="btn btn--primary btn--large" yoi-action="Show:#example-15; fx:shake;">Run</button></p>
```