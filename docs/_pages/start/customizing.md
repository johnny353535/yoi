---
layout: base
group: start
title: Customizing
permalink: start/customizing
---

# Customizing

<div class="m-t-4 m--pos-tr m--m-4 m--m-t-10">
    <span class="badge">documentation incomplete</span>
</div>

<p class="intro">Yoi offers a wide range of build-in options for customization. Tweak color values, change components or even extend Yoi by building your own components.</p>

## Yoi Boilerplate

To customize Yoi, you need to download and compile it on your machine. We prepared a [starter kit (boilerplate)](https://github.com/yoshino-digital/yoi-boilerplate) which also offers powerful templating and a simple static page building workflow:

<div class="m-t-8">
    <a class="btn btn--large" href="https://github.com/yoshino-digital/yoi-boilerplate">Yoi Boilerplate on GitHub</a>
</div>

<p class="hint hint--negative">The following documentation specifically describes how to customize Yoi via the <a href="https://github.com/yoshino-digital/yoi-boilerplate">Yoi Boilerplate</a>. We highly advice using the Yoi Boilerplate instead of the main Yoi repository for customization.</p>

## Configuring and Customizing

After you checked the [Yoi Boilerplate](https://github.com/yoshino-digital/yoi-boilerplate) out to your machine, you will find all config files in `src/assets/less/config/`. Use the variables in [options.less](https://github.com/yoshino-digital/yoi-boilerplate/blob/master/src/assets/less/config/options.less) to configure your own build of Yoi:

| Variable                   | Default value       | Description                                                                                                                                                           |
| -------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@breakpointToJs`          | true                | Make the current breakpoint accessible in JS. Example: `var bp = YOI.currentBreakpoint();` &mdash; returns a string like `large`                                      |
| `@fullColorPalette`        | true                | Switch between a full or optimized color palette. The optimized color palette only contains [semantic colors]({{ github.url }}/utilities/color.html#semantic-colors). |
| `@rootFontSize`            | 10px                | Yoi sets all font sizes in *rem*. Example: 1.5rem = 1.5 &times; `@rootFontSize` (eg. 10px) = 15px                                                                     |
| `@maximumPageWrapperWidth` | 100rem              | The maximum width of the `.wrapper` [layout utility]({{ github.url }}/utilities/layout.html#wrapper-and-cover).                                                       |
| `@defaultBorderRadius`     | 2                   | The default border-radius for all components. Multiplicand: 1px. Example: 2 produces a border-radius of 2px.                                                          |
| `@sizingSteps`             | 60                  | Number of steps for [width & height utility classes]({{ github.url }}/utilities/sizing.html). Example: 60 produces 60 fixed width & height utilities.                 |
| `@responsiveSizingSteps`   | 60                  | Nuber of steps for responsive [width & height utility classes]({{ github.url }}/utilities/sizing.html). See above.                                                    |
| `@sizingMultiplicand`      | 1rem                | Multiplicand for width & height utility classes. Example for 1rem: `.w-10` = 10 &times; `@sizingMultiplicand` (eg. 1rem) = fixed width of 10rem.                      |
| `@spacingSteps`            | 60                  | Number of steps for [margin & padding utility classes]({{ github.url }}/utilities/spacing.html). Example: 60 produces 60 margin & padding utilities.                  |
| `@responsiveSpacingSteps`  | 60                  | Number of steps for responsive [margin & padding utility classes]({{ github.url }}/utilities/spacing.html). See above.                                                |
| `@spacingMultiplicand`     | 0.5rem              | Multiplicand for margin & padding utility classes. Example for 0.5rem: `.p-3` = 3 &times; `@spacingMultiplicand` = produces 1.5rem padding.                           |
| `@positionSteps`           | 10                  | Number of steps for [*micro-positioning* utility classes]({{ github.url }}/utilities/layout.html#micro-positioning), multiplicand: 1px.                               |
| `@responsivePositionSteps` | 10                  | Number of steps for [responsive *micro-positioning* utility classes]({{ github.url }}/utilities/layout.html#responsive-micro-positioning), multiplicand: 1px.         |
| `@animationDuration`       | 0.5                 | Default css animation duration in seconds.                                                                                                                            |
| `@cdnDomain`               | cdn.yoshino.digital | Source for external images, for example Yoi’s [SVG icons]({{ github.url }}/components/icon.html).                                                                     |

### Colors

Use the variables in [colors.less](https://github.com/yoshino-digital/yoi-boilerplate/blob/master/src/assets/less/config/colors.less) to change he color palette for your own build of Yoi. You can generate color steps (different shades of the same base color) with the [Yoi Color Gradient Tool](https://yoshino-digital.github.io/yoi-color-gradient-tool/).

<div class="m-t-8">
    <a class="btn btn--large" href="https://yoshino-digital.github.io/yoi-color-gradient-tool/">Yoi Color Gradient Tool</a>
</div>

### Breakpoints

Yoi comes with a set of media queries to target different screen sizes. In [breakpoints.less](https://github.com/yoshino-digital/yoi-boilerplate/blob/master/src/assets/less/config/breakpoints.less), you can change the following breakpoint variables:

| Variable          | Default value |
| ----------------- | ------------- |
| `@bp-m-minwidth`  | 650px         |
| `@bp-l-minwidth`  | 960px         |
| `@bp-xl-minwidth` | 1220px        |

See the comments in [breakpoints.less](https://github.com/yoshino-digital/yoi-boilerplate/blob/master/src/assets/less/config/breakpoints.less) for more detailed information.

### Typography

Use the variables in [typography.less](https://github.com/yoshino-digital/yoi-boilerplate/blob/master/src/assets/less/config/typography.less) to change fonts, adjust font sizes and vertical rhythm.

<!--
## Extending

- own css and scripts in boilerplate
- yo
-->

## Debugging

Yoi offers a few options for visual debugging in [options.less](https://github.com/yoshino-digital/yoi-boilerplate/blob/master/src/assets/less/config/options.less):

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

<!--

## Optimizing

<p class="hint hint--negative">Pick Only What Your Project Needs</p>

* Use the index files inside `/src/assets/js/` to chose the _actions_, _behaviours_, _components_ and _modules_ you need for your project. By default, all scripts are included.
* Use `src/assets/less/yoi-components.less` and `src/assets/less/yoi-components.less` to pick the [components]({{ site.github.url }}/components) and [utilities]({{ site.github.url }}/utilities) for your project. By default, all components and utilities are included.
* uncss

-->