---
layout: base
group: components
title: StepCrumb
permalink: components/stepcrumb
---

# StepCrumb

<p class="intro">Use this component to create a compact horizontal chain of links to display a progress – eg. the current step of a register process.</p>

## Basic Example

This is how a basic `.stepCrumb` looks like and how you write the markup:

```html
<!-- example -->
<ul class="stepCrumb stepCrumb--step1">
    <li class="stepCrumb__item">
        <a href="#" class="stepCrumb__link">
            <span class="stepCrumb__label">Denial</span>
        </a>
    </li>
    <li class="stepCrumb__item">
        <a href="#" class="stepCrumb__link">
            <span class="stepCrumb__label">Anger</span>
        </a>
    </li>
    <li class="stepCrumb__item">
        <a href="#" class="stepCrumb__link">
            <span class="stepCrumb__label">Bargaining</span>
        </a>
    </li>
    <li class="stepCrumb__item">
        <a href="#" class="stepCrumb__link">
            <span class="stepCrumb__label">Depression</span>
        </a>
    </li>
    <li class="stepCrumb__item">
        <a href="#" class="stepCrumb__link">
            <span class="stepCrumb__label">Acceptance</span>
        </a>
    </li>
</ul>
```

## Modifiers

### Steps

Use the modifiers `.stepCrumb--step1` up to `.stepCrumb--step10` to highlight the current step:

```html
<!-- example:tabs -->
<p>
    <ul class="stepCrumb stepCrumb--step1">
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Denial</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Anger</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Bargaining</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Depression</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Acceptance</span>
            </a>
        </li>
    </ul>
</p>
<p>
    <ul class="stepCrumb stepCrumb--step2">
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Denial</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Anger</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Bargaining</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Depression</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Acceptance</span>
            </a>
        </li>
    </ul>
</p>
<p>
    <ul class="stepCrumb stepCrumb--step3">
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Denial</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Anger</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Bargaining</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Depression</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Acceptance</span>
            </a>
        </li>
    </ul>
</p>
<p>
    <ul class="stepCrumb stepCrumb--step4">
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Denial</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Anger</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Bargaining</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Depression</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Acceptance</span>
            </a>
        </li>
    </ul>
</p>
<p>
    <ul class="stepCrumb stepCrumb--step5">
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Denial</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Anger</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Bargaining</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Depression</span>
            </a>
        </li>
        <li class="stepCrumb__item">
            <a href="#" class="stepCrumb__link">
                <span class="stepCrumb__label">Acceptance</span>
            </a>
        </li>
    </ul>
</p>
```

<p class="hint"><b>Accessability:</b> While only one <code>.stepCrumb__label</code> is visible at a time, all labels are always included in the markup to provide meaningful information, eg. for screenreaders.</p>

## Markup

It’s possible and sometimes perfectly suitable to use `.stepCrumb` without links. However, due to the complicated stylimg of this element, it’s recommended to explicitly disable it’s mouseover styles. You can do so by adding the [utility-class ”.ptr-none“](utilities/interface.html):

```html
<!-- example -->
<ul class="stepCrumb stepCrumb--step3 ptr-none">
    <li class="stepCrumb__item">
        <span class="stepCrumb__label">Denial</span>
    </li>
    <li class="stepCrumb__item">
        <span class="stepCrumb__label">Anger</span>
    </li>
    <li class="stepCrumb__item">
        <span class="stepCrumb__label">Bargaining</span>
    </li>
    <li class="stepCrumb__item">
        <span class="stepCrumb__label">Depression</span>
    </li>
    <li class="stepCrumb__item">
        <span class="stepCrumb__label">Acceptance</span>
    </li>
</ul>
```