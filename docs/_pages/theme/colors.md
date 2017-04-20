---
layout: base
group: theme
title: Colors
permalink: theme/colors
---

## Colors

Colors.less defines all color variables used throughout the whole frontend. If you create a new project, use this file to change color variables or add new ones.

|           |                                                                    |
| -         | -                                                                  |
| Less-File | [colors.less]({{ pathToSourceFile }}assets/less/theme/colors.less) |


### Color Settings

Use these variables to assign the rather descriptive main color-variables to variables used as project settings:

```less
@htmlBackgroundColor:       @blue-8;
@bodyBackgroundColor:       #fff;
@textColor:                 @blue-8;
```

### Main Color Variables

The Yoshino default theme includes four main colors: blue, green, red and yellow. These main colors are available in 25 different shades, through 25 different variables. The following example illustrates how to use the `@blue-` color variables (but of course the same logic applies to the other main colors):

```less
/*
    @blue-base              // the "base" shade of blue
    @blue-1                 // the darkest shade of blue
    ...
    @blue-25                // the lightest shade of blue
*/

.myElement {
    background: @blue-25;   // very light blue background
    color: @blue-8;         // dark blue text color
}
```

These variables are a _Less language feature_. See the [Less documentation](http://lesscss.org/features/#variables-feature) to learn more about Less variables.

<p class="hint"><b>Color Tool</b>Use the <a href="pages/tools/color_tool.html">Color Tool</a> to see all avaiable color shades or to create color gradients and variables for your own code.</p>

### Other Color Variables

Apart from the four base colors, there are some more color variables for special purpose:

```less
@color-transparent:        rgba(255,255,255,0);
@color-gold:               #eac310;
```

### List of *Semantic Colors*

- attention
- positive / success
- negative / error
- dark
- light

### Color Utility Classes

In addition to the Less color variables (which can only be used in Less style sheets), there are **color utility classes** which can be used in any template / markup. [Learn more about utilities](/pages/css-interface/utilities.html).

```html
<span class="bg-yellow-22 tc-red-10 p-2">Medium red on light yellow</span>
<span class="bg-green-10 tc-yellow-22 p-2">Bright yellow on medium green</span>
<span class="bg-red-10 tc-white p-2">White on medium red</span>
```