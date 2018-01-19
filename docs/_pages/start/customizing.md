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

<p class="intro">Yoi offers a wide range of build-in options for customization. Tweak color values, change components or even extend Yoi by building your very own custom components.</p>

## Yoi Boilerplate

To customize Yoi, you need to download and compile it on your machine. We prepared a [starter kit (boilerplate)](https://github.com/yoshino-digital/yoi-boilerplate) which also offers powerful templating and a simple static page building workflow:

<div class="m-t-8">
    <a class="btn btn--large" href="https://github.com/yoshino-digital/yoi-boilerplate">Yoi Boilerplate on GitHub</a>
</div>

## Configuring

### Options
 
| `@breakpointToJs`          | `true/false`          | make the current breakpoint accessible in JS                                 |
| `@fullColorPalette`        | `true/false`          | switch between a full or optimized color palette                             |
| `@maximumPageWrapperWidth` | `100rem`              | the maximum width of the .wrapper layout utility (2rem padding left & right) |
| `@defaultBorderRadius`     | `2`                   | border radius, multiplicand: 1 PX                                            |
| `@sizingSteps`             | `60`                  | steps for width & height utility classes, multiplicand: 1 REM                |
| `@responsiveSizingSteps`   | `60`                  | steps for responsive width & height utility classes                          |
| `@sizingMultiplicand`      | `1rem`                | multiplicand for width & height utility classes                              |
| `@spacingSteps`            | `60`                  | steps for margin & padding utility classes, multiplicand: 0.5 REM            |
| `@responsiveSpacingSteps`  | `60`                  | steps for responsive margin & padding utility classes, multiplicand: 0.5 REM |
| `@spacingMultiplicand`     | `0`.5rem              | multiplicand for margin & padding utility classes                            |
| `@positionSteps`           | `10`                  | steps for micro-positioning utility classes, multiplicand: 1 PX              |
| `@responsivePositionSteps` | `10`                  | steps for responsive micro-positioning utility classes, multiplicand: 1 PX   |
| `@animationDuration`       | `0.5`                 | default css animation duration                                               |
| `@cdnDomain`               | `cdn.yoshino.digital` | source for external images                                                   |

<!-- ### Colors, Typography, Breakpoints

xxx -->

## Optimizing

<p class="hint hint--negative">Pick Only What Your Project Needs</p>

* Use the index files inside `/src/assets/js/` to chose the _actions_, _behaviours_, _components_ and _modules_ you need for your project. By default, all scripts are included.
* Use `src/assets/less/yoi-components.less` and `src/assets/less/yoi-components.less` to pick the [components]({{ site.github.url }}/components) and [utilities]({{ site.github.url }}/utilities) for your project. By default, all components and utilities are included.
* uncss

## Customizing

You find all nececarry configuration for CSS in [src/less/config/](https://github.com/yoshino-digital/yoi/tree/master/src/less/config).

<!-- ## Extending

xx -->

## Debugging

Yoi offers a few options for visual debugging in `src/less/config/options.less`:

`@showBreakpoint` | `true/false` | display the active breakpoint on each page            |
`@showGuides`     | `true/false` | show both vertically and horizontally centered guides |
`@debugImages`    | `true/false` | highlight images without alt- or title-attributes     |

There is also a styled placeholder element:

```html
<!-- example -->
<div class="placeholder w-20 h-10"></div>
```