---
layout: base
group: start
title: Introduction
permalink: start/
---

# What is YOI?

<p class="intro">YOI is Yoshino’s custom-built frontend component library. It enables our team to design, build, test and iterate web pages <i>directly in the browser</i>. YOI was made to be used by designers with basic knowledge of HTML and CSS – at it’s core stands a <i>simple HTML-based interface</i>.</p>

## Quick to Learn

If you are already familiar with the [basics of HTML](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics), you will quickly learn how to use YOI since _you will only write HTML_. No CSS. And not a single line of JavaScript. We kept things simple because we designed this system with _non-programmers_ in mind.

## Easy to Use

### Building Blocks

This system offers a large array of [pre-built elements](elements/) that you can mix & match to build almost any layout you wish. Think of them as Lego-blocks. But even better, imagine you could also slightly tweak your lego blocks instead of merely combining them. Ever needed a block of unusual size or color? That’s exactly what we’ve got you covered. 

### Fine-Grain Control

By adding [utility-classes](utilities/) to an element, you can override styling like colors, width, margin, etc. to fine-tune your layout or even build new custom elements. Or you can use utility classes to compose complex new elements or even responsive layouts – all without adding any new CSS.

## Interactive

### Hooks

In addition to rather simple and static elements, YOI also features more complex and interactive elements. [DatePickers](elements/datePicker.html), [Modals](elements/modal.html), [PopOvers](elements/popOver.html) – all these elements are configured via custom HTML attributes that we call _hooks_. Think of this a simple key/value pairs to enable different options – eg. `yoi-modal="cache:true;"` tells the modal script to preload the content of a modal page so it opens faster.

### Actions

Do you need a button that opens all accordions on a page? For use cases like this, we enabled another kind of _hook_, one that binds an action to an element (like a button). It may look like this: `<button yoi-action="openAllAccordions">Open all Accordions</button>`.