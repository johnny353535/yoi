---
layout: blank
title: Index
---

<!-- meta menu -->

{% include metamenu.html %}

<!-- section intro -->

<section id="intro" class="al-c center">
    <div>
        <img class="h-30 w-30 d-block m-lr-auto" src="{{ site.github.url }}/assets/img/logo-yoi.svg" />
        <h1 class="hidden">Yoi</h1>
        <div class="m--w-40 w-30 m-lr-auto">
            <p class="fs-4 lh-6 m-t-4">Yoi is a versatile front-end library with a dead-simple HTML-interface.</p>
            <p class="m-t-5">
                <a class="btn btn--primary btn--xlarge btn--flat" href="{{ site.github.url }}/start/">Read the Docs</a>
            </p>
        </div>
    </div>
</section>

<!-- footer -->

{% include pagefooter.html %}

<!-- custom styling -->

<style>
    html, body { background: #faf9f7; }
    #intro { min-height: calc(100vh - 12rem); }
    #intro .btn { box-shadow: 0 1rem 40px rgba(62,43,120,.35); }
</style>
