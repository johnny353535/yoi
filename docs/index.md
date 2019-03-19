---
layout: blank
title: Index
---

<!-- meta menu -->

{% include metamenu.html %}

<!-- section intro -->

<section id="intro" class="center">
    <div class="l:w-1-2 m:w-2-3 m-lr-auto p-lr-5">
        <p class="fs-6 lh-8 m-t-4 c-white">Yoi is a design system for the web with a dead-simple HTML-interface.</p>
        <p class="m-t-5">
            <a class="button button--primary button--large button--flat" href="{{ site.github.url }}/start/">Read the Docs</a>
        </p>
    </div>
</section>

<!-- footer -->

{% include pagefooter.html %}

<!-- custom styling -->

<style>
    html, body { background: #080022; }
    #intro { min-height: calc(100vh - 8.5rem); }
</style>
