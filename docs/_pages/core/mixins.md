---
layout: base
title: Mixins
permalink: core/mixins
---

## Mixins
Mixins are reusable snippets of CSS code. They are a [Less language feature](http://lesscss.org/features/#mixins-feature).

|                |                                                                   |
| -              | -                                                                 |
| Less-File      | [mixins.less]({{ pathToSourceFile }}assets/less/core/mixins.less) |

### Helper Mixins

#### .mixin-clearfix
Use this mixin to add the popular [micro clearfix hack](http://cssmojo.com/the-very-latest-clearfix-reloaded/).

#### .mixin-hidden
Use this mixin to _visually_ hide elements. These elements are still accessible by screenreaders.

#### .mixin-clearAppearance
Use this mixin to disable the default browser styling for certain elements – especially input elements. [Learn more about the appearance rule](https://css-tricks.com/almanac/properties/a/appearance/).

#### .mixin-defaultBorderRadius
Use this mixin to add the default border radius (as declared in [theme/options.less](/docs/pages/theme/options.html)) to all four corners of your element.