---
layout: base
group: utilities
title: Layout
permalink: utilities/layout
srcfiles:
    - layout-base.less
    - layout-responsive.less
---

# Layout

<p class="intro">Adds or overrides layout properties like display type, positioning type, alignment, float, overflow …</p>

## Display

| `.d-inline`      | set element to *display:inline*      |
| `.d-block`       | set element to *display:block*       |
| `.d-inlineblock` | set element to *display:inlineblock* |
| `.d-none`        | set element to *display:none*        |

### Responsive Display

| `.only-s--d-[*]` | `.d-[*]` only at breakpoint `s`       |
| `.m--d-[*]`      | `.d-[*]` at breakpoint `m` and larger |
| `.only-m--d-[*]` | `.d-[*]` only at breakpoint `m`       |
| `.l--d-[*]`      | `.d-[*]` at breakpoint `l` and larger |
| `.only-l--d-[*]` | `.d-[*]` only at breakpoint `l`       |
| `.xl--d-[*]`     | `.d-[*]` at breakpoint `xl`           |

## Positioning Type

| `.pos-absolute` | set element to *absolute* positioning               |
| `.pos-relative` | set element to *relative* positioning               |
| `.pos-fixed`    | set element to *fixed* positioning                  |
| `.pos-static`   | set element to *static* positioning (initial value) |

### Responsive Positioning Type

| `.only-s--pos-[*]` | `.pos-[*]` only at breakpoint `s`       |
| `.m--pos-[*]`      | `.pos-[*]` at breakpoint `m` and larger |
| `.only-m--pos-[*]` | `.pos-[*]` only at breakpoint `m`       |
| `.l--pos-[*]`      | `.pos-[*]` at breakpoint `l` and larger |
| `.only-l--pos-[*]` | `.pos-[*]` only at breakpoint `l`       |
| `.xl--pos-[*]`     | `.pos-[*]` at breakpoint `xl`           |

## Absolute Positioning

Add **absolute** positioning with the following utilities, placing an element to one of four sides or one of four corners:

| `.pos-t`        | position element at top          |
| `.pos-r`        | position element at right        |
| `.pos-b`        | position element at bottom       |
| `.pos-l`        | position element at left         |
| `.pos-tl`       | position element at top left     |
| `.pos-tr`       | position element at top right    |
| `.pos-br`       | position element at bottom right |
| `.pos-bl`       | position element at bottom left  |

```html
<!-- example:tabs -->
<div class="fs-0">
    <div class="pos-relative br-all bg-gray-25 w-5 h-5 d-inlineblock m-1">
        <div class="w-1 h-1 bg-green-15 pos-t"></div>
    </div>
    <div class="pos-relative br-all bg-gray-25 w-5 h-5 d-inlineblock m-1">
        <div class="w-1 h-1 bg-green-15 pos-r"></div>
    </div>
    <div class="pos-relative br-all bg-gray-25 w-5 h-5 d-inlineblock m-1">
        <div class="w-1 h-1 bg-green-15 pos-b"></div>
    </div>
    <div class="pos-relative br-all bg-gray-25 w-5 h-5 d-inlineblock m-1">
        <div class="w-1 h-1 bg-green-15 pos-l"></div>
    </div>
</div>
<div class="fs-0">
    <div class="pos-relative br-all bg-gray-25 w-5 h-5 d-inlineblock m-1">
        <div class="w-1 h-1 bg-blue-15 pos-tl"></div>
    </div>
    <div class="pos-relative br-all bg-gray-25 w-5 h-5 d-inlineblock m-1">
        <div class="w-1 h-1 bg-blue-15 pos-tr"></div>
    </div>
    <div class="pos-relative br-all bg-gray-25 w-5 h-5 d-inlineblock m-1">
        <div class="w-1 h-1 bg-blue-15 pos-br"></div>
    </div>
    <div class="pos-relative br-all bg-gray-25 w-5 h-5 d-inlineblock m-1">
        <div class="w-1 h-1 bg-blue-15 pos-bl"></div>
    </div>
</div>
```

### Responsive Absolute Positioning

| `.only-s--pos-[*]` | `.pos-[*]` only at breakpoint `s`       |
| `.m--pos-[*]`      | `.pos-[*]` at breakpoint `m` and larger |
| `.only-m--pos-[*]` | `.pos-[*]` only at breakpoint `m`       |
| `.l--pos-[*]`      | `.pos-[*]` at breakpoint `l` and larger |
| `.only-l--pos-[*]` | `.pos-[*]` only at breakpoint `l`       |
| `.xl--pos-[*]`     | `.pos-[*]` at breakpoint `xl`           |

## Micro Positioning

Add *micro positioning* with the following utilities. Eg. `.pos-t-3` translates to 1px &times; 3 = 1.5rem distance from top. Notice that you also need to add a positioning type eg. `.pos-relative`.

| `.pos-t-[1–10]` | position element 1px &times; [1–10] from top    |
| `.pos-r-[1–10]` | position element 1px &times; [1–10] from right  |
| `.pos-b-[1–10]` | position element 1px &times; [1–10] from bottom |
| `.pos-l-[1–10]` | position element 1px &times; [1–10] from left   |

The following example demonstrates the effect of `.pos-t-[1–10]` combined with `.pos-relative`:

```html
<!-- example:tabs -->
<div class="fs-0 p-tb-4">
    <div class="w-1 h-1 m-r-2 bg-purple-17 pos-relative pos-t-1 d-inlineblock"></div>
    <div class="w-1 h-1 m-r-2 bg-purple-17 pos-relative pos-t-2 d-inlineblock"></div>
    <div class="w-1 h-1 m-r-2 bg-purple-17 pos-relative pos-t-3 d-inlineblock"></div>
    <div class="w-1 h-1 m-r-2 bg-purple-17 pos-relative pos-t-4 d-inlineblock"></div>
    <div class="w-1 h-1 m-r-2 bg-purple-17 pos-relative pos-t-5 d-inlineblock"></div>
    <div class="w-1 h-1 m-r-2 bg-purple-17 pos-relative pos-t-6 d-inlineblock"></div>
    <div class="w-1 h-1 m-r-2 bg-purple-17 pos-relative pos-t-7 d-inlineblock"></div>
    <div class="w-1 h-1 m-r-2 bg-purple-17 pos-relative pos-t-8 d-inlineblock"></div>
    <div class="w-1 h-1 m-r-2 bg-purple-17 pos-relative pos-t-9 d-inlineblock"></div>
    <div class="w-1 h-1 m-r-2 bg-purple-17 pos-relative pos-t-10 d-inlineblock"></div>
</div>
```

<p class="hint hint--positive"><b>Use Cases</b> This kind of <i>micro positioning</i> should only be used for small design tweaks that can not be achieved via any other technique.</p>

### Responsive Micro Positioning

| `.only-s--pos-[*]-[1–10]` | `.pos-[*]-[1–10]` only at breakpoint `s`       |
| `.m--pos-[*]-[1–10]`      | `.pos-[*]-[1–10]` at breakpoint `m` and larger |
| `.only-m--pos-[*]-[1–10]` | `.pos-[*]-[1–10]` only at breakpoint `m`       |
| `.l--pos-[*]-[1–10]`      | `.pos-[*]-[1–10]` at breakpoint `l` and larger |
| `.only-l--pos-[*]-[1–10]` | `.pos-[*]-[1–10]` only at breakpoint `l`       |
| `.xl--pos-[*]-[1–10]`     | `.pos-[*]-[1–10]` at breakpoint `xl`           |

## Fixed Positioning

Add **fixed** positioning with the following utilities, pinning an element to one of four sides or one of four corners of the viewport:

| `.pos-fixed-t`  | pin element to the top of the viewport          |
| `.pos-fixed-r`  | pin element to the right of the viewport        |
| `.pos-fixed-b`  | pin element to the bottom of the viewport       |
| `.pos-fixed-l`  | pin element to the left of the viewport         |
| `.pos-fixed-tl` | pin element to the top left of the viewport     |
| `.pos-fixed-tr` | pin element to the top right of the viewport    |
| `.pos-fixed-br` | pin element to the bottom right of the viewport |
| `.pos-fixed-bl` | pin element to the bottom left of the viewport  |

### Responsive Fixed Positioning

| `.only-s--pos-fixed-[*]` | `.pos-fixed-[*]` only at breakpoint `s`       |
| `.m--pos-fixed-[*]`      | `.pos-fixed-[*]` at breakpoint `m` and larger |
| `.only-m--pos-fixed-[*]` | `.pos-fixed-[*]` only at breakpoint `m`       |
| `.l--pos-fixed-[*]`      | `.pos-fixed-[*]` at breakpoint `l` and larger |
| `.only-l--pos-fixed-[*]` | `.pos-fixed-[*]` only at breakpoint `l`       |
| `.xl--pos-fixed-[*]`     | `.pos-fixed-[*]` at breakpoint `xl`           |

## Centering

| `.center` | centers the element’s (only) child element both horizontally and vertically |

```html
<!-- example -->
<div class="pos-relative br-all bg-gray-24 w-10 h-10 center m-b-2">
    <div class="w-1 h-1 bg-green-15"></div>
</div>
```

### Responsive Centering

| `.only-s--center-[*]` | `.center-[*]` only at breakpoint `s`       |
| `.m--center-[*]`      | `.center-[*]` at breakpoint `m` and larger |
| `.only-m--center-[*]` | `.center-[*]` only at breakpoint `m`       |
| `.l--center-[*]`      | `.center-[*]` at breakpoint `l` and larger |
| `.only-l--center-[*]` | `.center-[*]` only at breakpoint `l`       |
| `.xl--center-[*]`     | `.center-[*]` at breakpoint `xl`           |

## Wrapper and Cover

| `.wrapper` | centers an element vertically on screens larger than a given max-width (see [start/customizing](/start/customizing.html)) |
| `.cover`   | sets an element to 100% viewport width and 100% viewport height                                                           |

## Columns

| `.cls-2` | divides text into two colums   |
| `.cls-3` | divides text into three colums |
| `.cls-4` | divides text into four colums  |

```html
<!-- example -->
<div class="br-all bg-gray-25 p-4 m-b-2 cls-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at aliquid dolor, minima ex porro fugit accusamus dolorum nisi assumenda, pariatur earum eligendi maiores, velit obcaecati, perspiciatis a dolores quo.</div>
<div class="br-all bg-gray-25 p-4 m-b-2 cls-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at aliquid dolor, minima ex porro fugit accusamus dolorum nisi assumenda, pariatur earum eligendi maiores, velit obcaecati, perspiciatis a dolores quo.</div>
<div class="br-all bg-gray-25 p-4 cls-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at aliquid dolor, minima ex porro fugit accusamus dolorum nisi assumenda, pariatur earum eligendi maiores, velit obcaecati, perspiciatis a dolores quo.</div>
```

### Responsive Columns

| `.only-s--cls-[2–4]` | `.cls-[2–4]` only at breakpoint `s`       |
| `.m--cls-[2–4]`      | `.cls-[2–4]` at breakpoint `m` and larger |
| `.only-m--cls-[2–4]` | `.cls-[2–4]` only at breakpoint `m`       |
| `.l--cls-[2–4]`      | `.cls-[2–4]` at breakpoint `l` and larger |
| `.only-l--cls-[2–4]` | `.cls-[2–4]` only at breakpoint `l`       |
| `.xl--cls-[2–4]`     | `.cls-[2–4]` at breakpoint `xl`           |

## Vertical Alignment

| `.val-m` | vertically align to the *middle* |
| `.val-t` | vertically align to the *top*    |
| `.val-b` | vertically align to the *bottom* |

```html
<!-- example -->
<p class="lh-9 br-all bg-gray-24 p-2">
    <span class="lh-1 val-m">middle</span>
    <span class="lh-1 val-t">top</span>
    <span class="lh-1 val-b">bottom</span>
</p>
```

### Responsive Vertical Alignment

| `.only-s--val-[t, m, b]` | `.val-[t, m, b]` only at breakpoint `s`       |
| `.m--val-[t, m, b]`      | `.val-[t, m, b]` at breakpoint `m` and larger |
| `.only-m--val-[t, m, b]` | `.val-[t, m, b]` only at breakpoint `m`       |
| `.l--val-[t, m, b]`      | `.val-[t, m, b]` at breakpoint `l` and larger |
| `.only-l--val-[t, m, b]` | `.val-[t, m, b]` only at breakpoint `l`       |
| `.xl--val-[t, m, b]`     | `.val-[t, m, b]` at breakpoint `xl`           |

## Float & Clear

| `.fl-r`     | float right                                      |
| `.fl-l`     | float left                                       |
| `.cl-r`     | clear right                                      |
| `.cl-l`     | clear left                                       |
| `.cl-b`     | clear both                                       |
| `.clearfix` | add clearfix (invisible clearing pseudo-element) |

### Responsive Float & Clear

| `.only-s--fl-[*]` | `.fl-[*]` only at breakpoint `s`       |
| `.m--fl-[*]`      | `.fl-[*]` at breakpoint `m` and larger |
| `.only-m--fl-[*]` | `.fl-[*]` only at breakpoint `m`       |
| `.l--fl-[*]`      | `.fl-[*]` at breakpoint `l` and larger |
| `.only-l--fl-[*]` | `.fl-[*]` only at breakpoint `l`       |
| `.xl--fl-[*]`     | `.fl-[*]` at breakpoint `xl`           |

| `.only-s--cl-[*]` | `.cl-[*]` only at breakpoint `s`       |
| `.m--cl-[*]`      | `.cl-[*]` at breakpoint `m` and larger |
| `.only-m--cl-[*]` | `.cl-[*]` only at breakpoint `m`       |
| `.l--cl-[*]`      | `.cl-[*]` at breakpoint `l` and larger |
| `.only-l--cl-[*]` | `.cl-[*]` only at breakpoint `l`       |
| `.xl--cl-[*]`     | `.cl-[*]` at breakpoint `xl`           |

| `.only-s--clearfix` | `.clearfix` only at breakpoint `s`       |
| `.m--clearfix`      | `.clearfix` at breakpoint `m` and larger |
| `.only-m--clearfix` | `.clearfix` only at breakpoint `m`       |
| `.l--clearfix`      | `.clearfix` at breakpoint `l` and larger |
| `.only-l--clearfix` | `.clearfix` only at breakpoint `l`       |
| `.xl--clearfix`     | `.clearfix` at breakpoint `xl`           |

## Overflow

| `.ofl-x-hidden` | hide horizontal overflow (left/right) |
| `.ofl-y-hidden` | hide vertical overflow (top/bottom)   |
| `.ofl-hidden`   | hide overflow on all sides            |
| `.ofl-visible`  | show overflow on all sides            |

### Responsive Overflow

| `.only-s--ofl-[*]` | `.ofl-[*]` only at breakpoint `s`       |
| `.m--ofl-[*]`      | `.ofl-[*]` at breakpoint `m` and larger |
| `.only-m--ofl-[*]` | `.ofl-[*]` only at breakpoint `m`       |
| `.l--ofl-[*]`      | `.ofl-[*]` at breakpoint `l` and larger |
| `.only-l--ofl-[*]` | `.ofl-[*]` only at breakpoint `l`       |
| `.xl--ofl-[*]`     | `.ofl-[*]` at breakpoint `xl`           |

## z-Index

Use these utilities to manipulate the order of overlapping, absolutely positioned elements. An element with higher z-index will sit over and element with lower z-index.

```html
<!-- example -->
<div class="pos-relative h-10">
    <div class="br w-4 h-4 br bg-purple-15 pos-tl z-1"></div>
    <div class="br w-4 h-4 br bg-base-10 pos-tl m-4 z-3"></div>
    <div class="br w-10 h-10 br bg-purple-23 pos-tl m-2 z-2"></div>
</div>
```

| `.z-1`  | z-index at 100  |
| `.z-2`  | z-index at 200  |
| `.z-3`  | z-index at 300  |
| `.z-4`  | z-index at 400  |
| `.z-5`  | z-index at 500  |
| `.z-6`  | z-index at 600  |
| `.z-7`  | z-index at 700  |
| `.z-8`  | z-index at 800  |
| `.z-9`  | z-index at 900  |
| `.z-10` | z-index at 1000 |

### Responsive z-Index

| `.only-s--z-[1–10]` | `.z-[1–10]` only at breakpoint `s`       |
| `.m--z-[1–10]`      | `.z-[1–10]` at breakpoint `m` and larger |
| `.only-m--z-[1–10]` | `.z-[1–10]` only at breakpoint `m`       |
| `.l--z-[1–10]`      | `.z-[1–10]` at breakpoint `l` and larger |
| `.only-l--z-[1–10]` | `.z-[1–10]` only at breakpoint `l`       |
| `.xl--z-[1–10]`     | `.z-[1–10]` at breakpoint `xl`           |

## z-Index 3D

Elements that have 3D transforms might not render as expected when mixed with 2D elements, no matter how you set the z-index values. Use the 3D z-index utilities to control stacking order with mixed 2D and 3D elements.

In the following example, we want the dark grey box (last item in markup) to render above all other elments. In the first group, we use the z-index utilities and it might not work as exepected. In the second group, we use a 3d z-index utility for the dark box – which should fix the problem:

```html
<!-- example -->
<div class="flx">
    <div class="pos-relative h-10 w-1-2">
        <div class="br bg-purple-20 w-6 h-6 pos-tl m-5 z-1" yoi-parallax="factor:20;"></div>
        <div class="br bg-purple-23 w-6 h-6 pos-tl m-12 z-2" yoi-parallax="factor:15;"></div>
        <div class="br bg-base-10 c-base-25 w-4 h-7 m-l-15 pos-tl z-3"></div>
    </div>
    <div class="pos-relative h-10 w-1-2">
        <div class="br bg-purple-20 w-6 h-6 pos-tl m-5 z-1" yoi-parallax="factor:20;"></div>
        <div class="br bg-purple-23 w-6 h-6 pos-tl m-12 z-2" yoi-parallax="factor:15;"></div>
        <div class="br bg-base-10 c-base-25 w-6 h-6 m-l-15 pos-tl z-3d-3"></div>
    </div>
</div>
```

### Why Get Some Elements Rendered As 3D Elements?

To improve performance, Yoi sets any element with CSS transforms to 3D. This might apply to:

* elements with [fx-utilities]({{ site.github.url }}utilities/fx.html)
* elements with [parallax effect]({{ site.github.url }}behaviours/parallax.html)
* elements with [scroll effects]({{ site.github.url }}behaviours/scrollfx.html)
* [sticky]({{ site.github.url }}behaviours/sticky.html) elements

| `.z-3d-1`  | 3d transform z at 1px  |
| `.z-3d-2`  | 3d transform z at 2px  |
| `.z-3d-3`  | 3d transform z at 3px  |
| `.z-3d-4`  | 3d transform z at 4px  |
| `.z-3d-5`  | 3d transform z at 5px  |
| `.z-3d-6`  | 3d transform z at 6px  |
| `.z-3d-7`  | 3d transform z at 7px  |
| `.z-3d-8`  | 3d transform z at 8px  |
| `.z-3d-9`  | 3d transform z at 9px  |
| `.z-3d-10` | 3d transform z at 10px |

### Responsive z-Index 3D

| `.only-s--z-3d-[1–10]` | `.z-3d-[1–10]` only at breakpoint `s`       |
| `.m--z-3d-[1–10]`      | `.z-3d-[1–10]` at breakpoint `m` and larger |
| `.only-m--z-3d-[1–10]` | `.z-3d-[1–10]` only at breakpoint `m`       |
| `.l--z-3d-[1–10]`      | `.z-3d-[1–10]` at breakpoint `l` and larger |
| `.only-l--z-3d-[1–10]` | `.z-3d-[1–10]` only at breakpoint `l`       |
| `.xl--z-3d-[1–10]`     | `.z-3d-[1–10]` at breakpoint `xl`           |
