---
layout: base
group: start
title: Customizing
permalink: start/customizing
---

# Customizing

<p class="intro">Yoi offers a wide range of build-in options for customization. Tweak color values, change components and add your own styles and scripts.</p>

## The Yoi Kit

To customize Yoi, you need to download and compile it on your machine. We prepared a starter repository &mdash; [the Yoi Kit](https://github.com/yoshino-digital/yoi-kit) &mdash; which also offers powerful templating and a simple static page building workflow.

<div class="m-t-8">
    <a class="button button--large" href="https://github.com/yoshino-digital/yoi-kit">Yoi Kit on GitHub</a>
</div>
<p class="hint hint--primary"><b>Yoi Kit</b> The following documentation specifically describes how to customize Yoi via the <a href="https://github.com/yoshino-digital/yoi-kit">Yoi Kit</a>. We highly advice using it instead of the main Yoi repository for customization.</p>
<p class="hint"><b>Readme Files & Inline Coments</b> You will find readme files inside most directories of the Yoi Kit. In addition to that, most files contain inline comments which provide useful contextual help.</p>

## Configuring and Customizing

After you checked the [Yoi Kit](https://github.com/yoshino-digital/yoi-kit) out to your machine and executed [`npm install`](https://github.com/yoshino-digital/yoi-kit#installing), you will find all config files in `src/assets/less/config/`. Use the variables in [options.less](https://github.com/yoshino-digital/yoi/blob/master/src/less/config/options.less) to configure your own build of Yoi.

<p class="tree">
src
└── assets
    └── less
        └── config
            ├── <span class="c-blue-13">breakpoints</span>.less
            ├── <span class="c-blue-13">colors</span>.less
            ├── <span class="c-blue-13">options</span>.less
            └── <span class="c-blue-13">typography</span>.less
</p>

### options.less

| Variable                    | Default value       | Description                                                                                                                                                           |
| --------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@breakpointToJs`           | true                | Make the current breakpoint accessible in JS. Example: `var bp = YOI.currentBreakpoint();` &mdash; returns a string like `large`                                      |
| `@fullColorPalette`         | true                | Switch between a full or optimized color palette. The optimized color palette only contains [semantic colors]({{ site.github.url }}/utilities/color.html#semantic-colors). |
| `@rootFontSize`             | 10px                | Yoi sets all font sizes in *rem*. Example: 1.5rem = 1.5 &times; `@rootFontSize` (eg. 10px) = 15px                                                                     |
| `@maximumPageWrapperWidth`  | 100rem              | The maximum width of the `.wrapper` [layout utility]({{ site.github.url }}/utilities/layout.html#wrapper-and-cover).                                                       |
| `@defaultBorderRadius`      | 2                   | The default border-radius for all components. Multiplicand: 1px. Example: 2 produces a border-radius of 2px.                                                          |
| `@sizingSteps`              | 60                  | Number of steps for [width & height utility classes]({{ site.github.url }}/utilities/sizing.html). Example: 60 produces 60 fixed width & height utilities.                 |
| `@responsiveSizingSteps`    | 60                  | Nuber of steps for responsive [width & height utility classes]({{ site.github.url }}/utilities/sizing.html). See above.                                                    |
| `@sizingMultiplicand`       | 1rem                | Multiplicand for width & height utility classes. Example for 1rem: `.w-10` = 10 &times; `@sizingMultiplicand` (eg. 1rem) = fixed width of 10rem.                      |
| `@spacingSteps`             | 60                  | Number of steps for [margin & padding utility classes]({{ site.github.url }}/utilities/spacing.html). Example: 60 produces 60 margin & padding utilities.                  |
| `@responsiveSpacingSteps`   | 60                  | Number of steps for responsive [margin & padding utility classes]({{ site.github.url }}/utilities/spacing.html). See above.                                                |
| `@spacingMultiplicand`      | 0.5rem              | Multiplicand for margin & padding utility classes. Example for 0.5rem: `.p-3` = 3 &times; `@spacingMultiplicand` = produces 1.5rem padding.                           |
| `@positionSteps`            | 10                  | Number of steps for [*micro-positioning* utility classes]({{ site.github.url }}/utilities/layout.html#micro-positioning), multiplicand: 1px.                               |
| `@responsivePositionSteps`  | 10                  | Number of steps for [responsive *micro-positioning* utility classes]({{ site.github.url }}/utilities/layout.html#responsive-micro-positioning), multiplicand: 1px.         |
| `@defaultAnimationDuration` | 200ms               | Default css animation duration in milliseconds.                                                                                                                       |
| `@cdnDomain`                | cdn.yoshino.digital | Source for external images, for example Yoi’s [SVG icons]({{ site.github.url }}/components/icon.html).                                                                     |

### colors.less

#### Root color variables

| Variable               | Default Value                  | Description                                            |
| ---------------------- | ------------------------------ | ------------------------------------------------------ |
| `@htmlBackgroundColor` | `@color-white`                 | Background color of the `html` tag                     |
| `@bodyBackgroundColor` | `@color-white`                 | Background color of the `body` tag                     |
| `@textColor`           | `@color-base-8`                | Global text color                                      |
| `@focusColor`          | `@blue-22`                     | Highlight color for active elements (eg. a text input) |
| `@selectionColor`      | `fade(@color-primary-25, 50%)` | Highlight color for selected text                      |

#### Color Palette

Use the variables in [colors.less](https://github.com/yoshino-digital/yoi/blob/master/src/less/config/colors.less) to change the color palette for your own build of Yoi. You can generate color steps (different shades of the same base color) with the [Yoi Color Gradient Tool](https://yoshino-digital.github.io/yoi-color-gradient-tool/).

<div class="m-t-8">
    <a class="button button--large" href="https://yoshino-digital.github.io/yoi-color-gradient-tool/">Yoi Color Gradient Tool</a>
</div>

### breakpoints.less

Yoi comes with a set of media queries to target different screen sizes. In [breakpoints.less](https://github.com/yoshino-digital/yoi/blob/master/src/less/config/breakpoints.less), you can change the following breakpoint variables:

| Variable          | Default value |
| ----------------- | ------------- |
| `@bp-m-minwidth`  | 650px         |
| `@bp-l-minwidth`  | 960px         |
| `@bp-xl-minwidth` | 1220px        |

Take a look at the comments in [breakpoints.less](https://github.com/yoshino-digital/yoi/blob/master/src/less/config/breakpoints.less) for more detailed information.

### typography.less

Use the variables in [typography.less](https://github.com/yoshino-digital/yoi/blob/master/src/less/config/typography.less) to change fonts, adjust font sizes and vertical rhythm. The file contains useful comments for contextual documentation.

## Optimizing

<p class="hint hint--negative">By default configuration, Yoi has a rather massive file size &mdash; more than 4mb. This is way to much for any website to reasonably perform. Make sure that you only pick the parts you need before you publish your project.</p>

* Use the index files inside `/src/assets/js/` to chose the JavaScript files for [actions]({{ site.github.url }}/actions/), [behaviours]({{ site.github.url }}/behaviours/), [components]({{ site.github.url }}/components/) and *modules* for your project. By default, all scripts are included.
* Use `src/assets/less/yoi-components.less` and `src/assets/less/yoi-utilities.less` to pick the [components]({{ site.github.url }}//components) and [utilities]({{ site.github.url }}//utilities) for your project. By default, all components and utilities are included.
* The [*publish* task](https://github.com/yoshino-digital/yoi-kit#publish) makes experimental use of [uncss](https://github.com/giakki/uncss) — a script that parses HTML files and removes all the CSS rules from the stylesheets that were not referenced. This may dramatically shrink the file size because it removes many unused utility classes (eg. for [spacing]({{ site.github.url }}/utilities/spacing.html) and [sizing]({{ site.github.url }}/utilities/sizing.html)).

## Extending

We recommended to put your own stylesheets into the directory `src/assets/less/theme/` and include them at the end of the file `theme.less`. For simple projects, write all your scripts to the file `theme.js`. For more complex projects, put individual JavaScript files into the directory `js/theme/`. All JavaScript files get merged during the build process.

<p class="tree">
└── src
    └── assets
        ├── js
        │   └─ theme
        │      └── <span class="c-blue-13">theme.js</span>
        └── less
            ├── theme
            │   └── <span class="c-blue-13">[…]</span>
            <span class="c-blue-13">theme.less</span>
</p>

## Debugging

Yoi offers a few options for visual debugging in [options.less](https://github.com/yoshino-digital/yoi/blob/master/src/less/config/options.less):

| Variable          | Default value | Description                                            |
| ----------------- | ------------- | ------------------------------------------------------ |
| `@showBreakpoint` | false         | Display the active breakpoint on each page.            |
| `@showGuides`     | false         | Show both vertically and horizontally centered guides. |
| `@debugImages`    | false         | Highlight images without alt- or title-attributes.     |

### Placeholder

Yoi offers a styled placeholder element which can be useful while *designing in the browser*:

```html
<!-- example -->
<div class="placeholder w-20 h-10"></div>
```
