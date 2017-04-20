---
layout: base
group: elements
title: StepMenu
permalink: elements/stepmenu
---

## StepMenu

| Styles         | [stepMenu.less]({{ pathToSourceFile }}assets/less/elements/stepMenu.less) |
| Base CSS-Class | `.stepMenu`                                                               |
| Modifiers      | `.stepMenu--step1, […], .stepMenu--step5`                                 |

### Basic Example

```html
<ul class="stepMenu stepMenu--step3">
    <li class="stepMenu__item">
        <a class="stepMenu__label">Denial</a>
    </li>
    <li class="stepMenu__item">
        <a class="stepMenu__label">Anger</a>
    </li>
    <li class="stepMenu__item">
        <a class="stepMenu__label">Bargaining</a>
    </li>
    <li class="stepMenu__item">
        <a class="stepMenu__label">Depression</a>
    </li>
    <li class="stepMenu__item">
        <a class="stepMenu__label">Acceptance</a>
    </li>
</ul>
```

```html
<ul class="stepMenu stepMenu--right stepMenu--step2">
    <li class="stepMenu__item">
        <a class="stepMenu__label">Denial</a>
    </li>
    <li class="stepMenu__item">
        <a class="stepMenu__label">Anger</a>
    </li>
    <li class="stepMenu__item">
        <a class="stepMenu__label">Bargaining</a>
    </li>
    <li class="stepMenu__item">
        <a class="stepMenu__label">Depression</a>
    </li>
    <li class="stepMenu__item">
        <a class="stepMenu__label">Acceptance</a>
    </li>
</ul>
```