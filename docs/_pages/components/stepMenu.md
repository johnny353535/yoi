---
layout: base
group: components
title: StepMenu
permalink: components/stepmenu
---

# StepMenu

<p class="intro">Use this component to create a prominent vertical chain of links to display a progress – eg. the current step of a register process.</p>

## Basic Example

This is how a basic `.stepMenu` looks like and how you write the markup:

```html
<!-- example -->
<ul class="stepMenu stepMenu--step3">
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Denial</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Anger</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Bargaining</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Depression</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Acceptance</a>
    </li>
</ul>
```

## Modifiers

### Steps

Use the modifiers `.stepMenu--step1` up to `.stepMenu--step10` to highlight the current step:

```html
<!-- example:tabs -->
<ul class="stepMenu stepMenu--step1">
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Denial</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Anger</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Bargaining</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Depression</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Acceptance</a>
    </li>
</ul>
<p class="fs-3 m-b-4">…</p>
<ul class="stepMenu stepMenu--step5">
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Denial</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Anger</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Bargaining</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Depression</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Acceptance</a>
    </li>
</ul>
```

### Alignment

Use the modifier `.stepMenu--right` to change the text-alignment from left (default) to right:

```html
<!-- example:tabs -->
<ul class="stepMenu stepMenu--step2 stepMenu--right">
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Denial</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Anger</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Bargaining</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Depression</a>
    </li>
    <li class="stepMenu__item">
        <a href="#" class="stepMenu__label">Acceptance</a>
    </li>
</ul>
```

## Markup

It’s possible and sometimes perfectly suitable to use `.stepMenu` without links:

```html
<!-- example:tabs -->
<ul class="stepMenu stepMenu--step2">
    <li class="stepMenu__item">
        <span class="stepMenu__label">Denial</span>
    </li>
    <li class="stepMenu__item">
        <span class="stepMenu__label">Anger</span>
    </li>
    <li class="stepMenu__item">
        <span class="stepMenu__label">Bargaining</span>
    </li>
    <li class="stepMenu__item">
        <span class="stepMenu__label">Depression</span>
    </li>
    <li class="stepMenu__item">
        <span class="stepMenu__label">Acceptance</span>
    </li>
</ul>
```