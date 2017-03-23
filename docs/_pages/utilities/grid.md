---
layout: base
title: Grid
permalink: utilities/grid
---

## Layout and Grid
This framework does not implement a traditional layout grid. Instead, it contains utility classes for fractional widths as well as utility classes for absolute widths and heighs. These classes are simple yet powerful enough to compose almost every desired layouts.

|           |                                                                                              |
| -         | -                                                                                            |
| Less-File | [grid.less]({{ pathToSourceFile }}assets/less/utilities/grid.less)                           |
| Less-File | [layout.less]({{ pathToSourceFile }}assets/less/utilities/layout.less)                       |
| Less-File | [responsive-layout.less]({{ pathToSourceFile }}assets/less/utilities/responsive-layout.less) |

### Center
Use the `.center` utility class to vertically center a container and set it to the pre-defined [global width](/pages/css-variables/dimensions.html).

### Fractional Widths

Use fractional width utility classes to create layout containers. By default, these containers render as _display:block_. Read further to learn how to create grids with fractional layout containers.

| CSS Class Name | Description                           |
| -              | -                                     |
| `w-1-1`        | container at 100% width (full)        |
| `w-1-2`        | container at 50% width (half)         |
| `w-1-3`        | container at 33.3% width (one third)  |
| `w-1-4`        | container at 25% width (one quarter)  |
| `w-1-5`        | container at 20% width (one fifth)    |
| `w-2-3`        | container at 66.6% width (two thirds) |
| `w-2-5`        | container at 40% width (two fifths)   |
| `w-3-4`        | container at 75% width (three thrids) |
| `w-3-5`        | container at 60% width (three fifths) |
| `w-4-5`        | container at 80% width (four fifths)  |
| `w-auto`       | container at `width:auto`             |

```html
<div class="w-1-1"></div>
<div class="w-4-5"></div>
<div class="w-3-4"></div>
<div class="w-2-3"></div>
<div class="w-3-5"></div>
<div class="w-1-2"></div>
<div class="w-2-5"></div>
<div class="w-1-3"></div>
<div class="w-1-4"></div>
<div class="w-1-5"></div>
```

### Grids
Grids can be composed by using the available utility classes. It’s possible to use the _float-helpers_ to place containers next to each other.

```html
<div class="w-1-1">
    <div class="w-1-4 fl-l">1/4</div>
    <div class="w-3-4 fl-r">3/4</div>
</div>
<div class="w-1-1">
    <div class="w-1-3 fl-l">1/3</div>
    <div class="w-auto fl-l">Yo.</div>
    <div class="w-1-4 fl-r">1/4</div>
</div>
```

Note: Always border-box.

### Nesting
Layout containers can be nested. It’s possible to either use fractional widths inside absolute widths, the other way around or any combination of these.

```html
<div class="w-50">
    50rem width
    <div class="w-1-3">one third of parent</div>
</div>
<div class="w-1-2">
    half of container
    <div class="w-20">20rem width</div>
</div>
```

### Pulls

### Absolute Width and Height

### Examples

```html
<div class="grid-float">
    <div class="w-1-2">1/2</div>
    <div class="w-1-2">1/2</div>
</div>
```

### Absolute Width

```html
<div class="w-1"></div>
<div class="w-2"></div>
<div class="w-3"></div>
<div class="w-4"></div>
<div class="w-5"></div>
<!-- ... -->
<div class="w-60"></div>
```

### Absolute Height

```html
<div class="h-1"></div>
<div class="h-2"></div>
<div class="h-3"></div>
<div class="h-4"></div>
<div class="h-5"></div>
<!-- ... -->
<div class="h-60"></div>
```

### Flex Grid

```html
<div class="grid-flex flex-alignCenter">
    <div class="w-1-3 h-2"></div>
    <div class="w-1-3 h-5"></div>
    <div class="w-1-3 h-1"></div>
    <div class="w-1-3 h-7"></div>
    <div class="w-1-3 h-2"></div>
    <div class="w-1-3 h-5"></div>
</div>
```

### Debugging
Set the debug flag `@debugGrid` in [options.less](assets/less/variables/options.less) to `true` to draw outlines around any element which uses a grid-class – pretty much like in the examples on this very page.

<style type="text/css" media="screen">

    .documentation__example [class*="w-"],
    .documentation__example [class*="h-"] {
        background: rgba(255,1,1,.1);
        border: rgba(255,0,0,.1) 1px solid;
        box-sizing: border-box;
        color: #a1656a;
        font-family: monospace;
        min-height: 1rem;
        text-indent: .5rem;
    }

</style>