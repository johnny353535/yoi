---
layout: base
group: start
title: Introduction
permalink: start/
---

# This is Yoi

<p class="intro">Yoi (pronounced <i>yo-ee</i>) is <a href="https://yoshino.digital">Yoshino’s</a> component library, the foundation for most of our projects. It enables our team to design, build and test web pages <i>directly in the browser</i>. It was made to be used by designers with basic knowledge of HTML and CSS – at its core stands a <i>simple HTML-based interface</i>.</p>

If you are already familiar with the [basics of HTML](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics), you will quickly learn how to use Yoi since _you will only write HTML_. No CSS and not a single line of JavaScript. We kept things simple because we designed this system with _non-programmers_ in mind.

## Components

**Building Blocks** &mdash; Yoi offers a large array of [pre-built components]({{ site.github.url }}/components/) that you can mix & match to build almost any layout you wish. Think of them as Lego-blocks. But even better, imagine you could also slightly tweak your lego blocks instead of merely combining them. Ever needed a block of unusual size or color? That’s exactly what we took care of.

## Utilities

**Layout via CSS classes** &mdash; By adding [utility-classes]({{ site.github.url }}/utilities/) to an element, you can override styling like colors, width, margin, etc. to fine-tune your layout or even build new custom components. Or you can use utility classes to compose complex new components or even responsive layouts – without writing any CSS!

## Behaviors

**Effects without writing JavaScript** &mdash; Sometimes you wish to fade-in an element on the page as soon as it entered the viewport or make another element stick to the top edge of the screen once you scrolled past it. Yoi has many useful [Behaviors]({{ site.github.url }}/behaviors/) already built in. You can apply and configure them on any element in you HTML via Yoi’s _attributes_ syntax.

## Actions

**Interactions without writing JavaScript** &mdash; Do you need a button that opens all accordions on a page? For use cases like this, we enabled another kind of _attribute_, one that binds an action to an element (like a button). It may look like this: `<button yoi-action="Accordion.openAll;">Open all Accordions</button>`.

## Attribute-Syntax

**Simple HTML interface** &mdash; Yoi also includes some more complex and interactive components like [Modals]({{ site.github.url }}/components/modal.html), [PopOvers]({{ site.github.url }}/components/popover.html) – all these components are configured via custom HTML attributes. Think of this a simple key/value pairs to enable different options – eg. `yoi-modal="cache:true;"` tells the modal script to preload the content of a modal page. We stick to this syntax with all our components, behaviors and actions. Once you learned it, you are even able to guess it.
