---
layout: base
title: Debugging
permalink: core/debug
---

## Visual Debugging
Use the [option variables](/pages/theme/options.html) of your [theme](/pages/theme/_introduction.html) to include styles that are only applied if certain _debug flags_ were set. You can highlight BEM-style elements (__elements, --modifiers), certain utility classes or even display the currently active media query.

|                |                                                                      |
| -              | -                                                                    |
| Less-File      | [debug.less]({{ pathToSourceFile }}assets/less/core/debug.less)      |
| Less-File      | [options.less]({{ pathToSourceFile }}assets/less/theme/options.less) |

<div class="documentation__block">
    <div class="documentation__example" yoi-printcode="language:markup; print:true;">
        <div class="placeholder w-10 h-15 m-2"></div>
        <div class="placeholder w-20 h-30 m-2"></div>
    </div>
</div>