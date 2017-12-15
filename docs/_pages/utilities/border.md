---
layout: base
group: utilities
title: Border
permalink: utilities/border
---

# Border

<p class="intro">Adds or overrides borders, border-style, -width and -radius.</p>

## Border

All borders have the default border-color and -width.

| `.b-all` | Default border on all sides   |
| `.b-t`   | Default border on the top     |
| `.b-r`   | Default border on the right   |
| `.b-b`   | Default border on the bottom  |
| `.b-l`   | Default border on the left    |

| `.b-0`   | No borders on either side     |
| `.b-t-0` | No border on the top          |
| `.b-r-0` | No border on the right        |
| `.b-b-0` | No border on the bottom       |
| `.b-l-0` | No border on the left         |

## Border Style

| `.b-dashed` | Dashed border |
| `.b-dotted` | Dotted border |
| `.b-solid`  | Solid border  |

## Border Width

| `.bw-1` | Default border width |
| `.bw-2` | Medium border        |
| `.bw-3` | Very thick border    |

```html
<!-- example:tabs -->
<div class="flx">
    <div class="b-all w-10 h-10 p-2 m-4 bw-1">.bw-1</div>
    <div class="b-all w-10 h-10 p-2 m-4 bw-2">.bw-2</div>
    <div class="b-all w-10 h-10 p-2 m-4 bw-3">.bw-3</div>
</div>
```

## Border Radius

| `.br`        | Default border-radius on all sides        |
| `.br-circle` | 50% border-radius on all sides            |
| `.br-tl`     | Default border-radius on the top left     |
| `.br-tr`     | Default border-radius on the top right    |
| `.br-br`     | Default border-radius on the bottom right |
| `.br-bl`     | Default border-radius on the bottom left  |

| `.br-0 `     | No border radius on either side           |
| `.br-tl-0`   | No border radius on the top left          |
| `.br-tr-0`   | No border radius on the top right         |
| `.br-br-0`   | No border radius on the bottom right      |
| `.br-bl-0`   | No border radius on the bottom left       |