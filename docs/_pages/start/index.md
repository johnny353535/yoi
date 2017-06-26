---
layout: base
group: start
title: Introduction
permalink: start/
---

# Introduction

<p class="intro">YOI is our custom-built frontend component library. It enables our team to design and build web pages directly in the browser – up and ready for production.</p>

## Easy to Learn

If you are already familiar with the basics of HTML, you will quickly learn how to use YOI since _you will only write HTML_. No CSS. And not a single line of JavaScript. 

We kept things simple because we designed this system with _non-programmers_ in mind. While recent frameworks like React are exiting and push the limits of modern web development, they are designed to build rich JavaScript-only web applications, come with a steep learning curve and aim at more experienced developers.

## Simple yet Powerful

### Ready-to-Use _Elements_

This system offers you many [pre-built elements](elements/) that you can mix & match to build almost any layout you wish. Think of them as Lego-blocks. But even better, imagine you could also slightly tweak your lego blocks instead of merely combining them. Ever needed a block of unusual size or color? That’s exactly what we’ve got you covered. 

### Fine-Grain Control with _Utilities_

By adding utility-classes to an element, you can override styling like colors, width, margin, etc. to fine-tune your layout or even build new custom elements. Or you can use utility classes to create up complex, even responsive layouts withput the need to write CSS.

## Build Interaction Without Writing JavaScript

### Hooks

In addition to rather simple and static elements, this system also features interactive elements. [DatePickers](elements/datePicker.html), [Modals](elements/modal.html), [PopOvers](elements/popOver.html) – all these elements are configured via custom HTML attributes that we call _hooks_. Think of this a simple key/value pairs to enable different options – eg. `yoi-modal="cache:true;"` tells the modal script to preload the content of a modal page so it opens faster.

### Actions

Do you need a button that opens all accordions on a page? For use cases like this, we enabled another kind of _hook_, one that binds an action to an element (like a button). It may look like this: `<button yoi-action="openAllAccordions">Open all Accordions</button>`. The same could be accomplished via a short line of JavaScript – but it’s much easier to do via HTML.