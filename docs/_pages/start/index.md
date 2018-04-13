---
layout: base
group: start
title: Introduction
permalink: start/
---

# What is Yoi?

<p class="intro">Yoi (pronounced <i>yo-ee</i>) is Yoshino’s custom-built frontend component library. It enables our team to design, build and test web pages <i>directly in the browser</i>. It was made to be used by designers with basic knowledge of HTML and CSS – at its core stands a <i>simple HTML-based interface</i>.</p>

## Quick to Learn

If you are already familiar with the [basics of HTML](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics), you will quickly learn how to use Yoi since _you will only write HTML_. No CSS and not a single line of JavaScript. We kept things simple because we designed this system with _non-programmers_ in mind.

## Easy to Use

### Building Blocks

This system offers a large array of [pre-built components]({{ site.github.url }}/components/) that you can mix & match to build almost any layout you wish. Think of them as Lego-blocks. But even better, imagine you could also slightly tweak your lego blocks instead of merely combining them. Ever needed a block of unusual size or color? That’s exactly what we took care of.

### Fine-Grain Control

By adding [utility-classes]({{ site.github.url }}/utilities/) to an element, you can override styling like colors, width, margin, etc. to fine-tune your layout or even build new custom elements. Or you can use utility classes to compose complex new elements or even responsive layouts – without writing any additional CSS.

## Easy to Control and Powerfully Interactive

### Attributes

In addition to rather simple and static elements, Yoi also features more complex and interactive elements. [DatePickers]({{ site.github.url }}/components/datepicker.html), [Modals]({{ site.github.url }}/components/modal.html), [PopOvers]({{ site.github.url }}/components/popover.html) – all these elements are configured via custom HTML attributes. Think of this a simple key/value pairs to enable different options – eg. `yoi-modal="cache:true;"` tells the modal script to preload the content of a modal page.

### Behaviours

Sometimes you wish to fade-in an element on the page as soon as it entered the viewport or make another element stick to the top edge of the screen once you scrolled past it. Yoi has many useful [Behaviours]({{ site.github.url }}/behaviours/) already built in. You can apply and configure them on any element in you HTML via Yoi’s _attributes_ syntax.

### Actions

Do you need a button that opens all accordions on a page? For use cases like this, we enabled another kind of _attribute_, one that binds an action to an element (like a button). It may look like this: `<button yoi-action="Accordion.openAll;">Open all Accordions</button>`.
