---
layout: blank
title: Introduction
---

<div class="p-2 pos-absolute w-1-1 al-r">
    <a href="{{ site.github.repository_url }}" class="btn btn--medium btn--subtle c-primary-22 hvr--bg-primary-6">GitHub</a>
    <a href="{{ site.github.zip_url }}" class="btn btn--medium btn--subtle c-primary-22 hvr--bg-primary-6">Download</a>
</div>
<section id="intro" class="cover only-s--h-auto only-s--p-tb-15 l--p-tb-30 center bg-primary-3">
    <div class="wrapper al-c" yoi-scrollfx="in:fade-in; repeat:false;">
        <img class="h-20 w-20 m-t-4 d-block m-lr-auto" src="{{ site.github.url }}/assets/img/logo-yoi-large.svg" />
        <h1 class="hidden">Yoi</h1>
        <div class="m--w-40 m-lr-auto m-t-4">
            <p class="fs-4 lh-6 c-primary-22 m-tb-8"><b>Yoi</b> is a modular front-end library with a dead simple HTML-interface.</p>
            <p>
                <a class="fs-2 c-primary-22 only-s--d-block tdr-none hvr--tdr-underline" href="{{ site.github.url }}/start/">Read to the docs</a>
                <i class="fs-2 c-primary-15 m-lr-2 only-s--d-block only-s--m-tb-2">or</i>
                <a class="btn btn--primary btn--large btn--flat" href="#build" yoi-action="ScrollTo:#build; offset:0;">Learn more!</a>
            </p>
        </div>
    </div>
</section>
<img class="bg-base-25 h-3 d-block w-1-1" src="{{ site.github.url }}/assets/img/divider-dark.svg" />
<section id="build" class="p-tb-15 l--p-tb-30 article bg-base-25 pos-relative">
    <div class="wrapper" yoi-scrollfx="in:fade-in; repeat:false;">
        <div class="flx flx-directionColumn m--flx-directionRow">
            <div class="m--w-1-3 w-1-1 h-26 pos-relative">
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-build-a.svg" yoi-parallax="factor:20;" />
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-build-b.svg" yoi-parallax="factor:-20;" />
            </div>
            <div class="m--w-2-3 w-1-1">
                <h2 class="fs-6">Build</h2>
                <p class="c-base-15 fs-3 lh-5 m-t-2 m--w-40">Chose from a vast array of ready-made <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/components/">components</a> to create beautiful responsive websites.</p>
<div class="m-t-4" markdown="1">
```html
<!-- example -->
<div class="tile tile--bottom fx--blur fx--slide">
    <div class="tile__body">
        <h2 class="tile__title">Rocket</h2>
        <div class="tile__copy">
            <div class="flx m-t-2">
                <div class="w-2-3">
                    <p class="fs-2 lh-3">Fast, huge and never out of fashion.</p>
                    <p class="fs-3 fw-bold c-primary-20">€ 99.000.000</p>
                </div>
                <div class="w-1-3 pos-relative al-r">
                    <button class="btn btn--large pos-br">Buy</button>
                </div>
            </div>
        </div>
    </div>
    <img class="tile__image" src="https://source.unsplash.com/qjgdslbEn-I/230x250" alt="" />
</div>
```
</div>
            </div>
        </div>
    </div>
</section>
<section id="tweak" class="p-tb-15 l--p-tb-30 article bg-base-25 pos-relative">
    <div class="wrapper" yoi-scrollfx="in:fade-in; repeat:false;">
        <div class="flx flx-directionColumn m--flx-directionRow">
            <div class="m--w-1-3 w-1-1 h-26 pos-relative">
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-tweak-b.svg" yoi-parallax="factor:30;" />
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-tweak-a.svg" yoi-parallax="factor:50;" />
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-tweak-c.svg" yoi-parallax="factor:-20;" />
            </div>
            <div class="m--w-2-3 w-1-1">
                <h2 class="fs-6">Tweak</h2>
                <p class="c-base-15 fs-3 lh-5 m-t-2 m--w-40">A bit more <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/utilities/spacing.html">margin</a> to the top? Darker <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/utilities/color.html">text color</a>? Yoi’s <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/utilities/">utilities</a> are your OCD’s best match!</p>
<div class="m-t-4" markdown="1">
```html
<!-- example -->
<button class="btn btn--large c-red-15">Oh look!</button>
```
</div>
            </div>
        </div>
    </div>
</section>
<section id="control" class="p-tb-15 l--p-tb-30 article bg-base-25">
    <div class="wrapper" yoi-scrollfx="in:fade-in; repeat:false;">
        <div class="flx flx-directionColumn m--flx-directionRow">
            <div class="m--w-1-3 w-1-1 h-26 pos-relative">
                <img class="pos-absolute" id="illu-control-a" src="{{ site.github.url }}/assets/img/illu-control-a.svg" yoi-parallax="factor:20;" />
                <p class="pos-absolute" yoi-parallax="factor:-20;">
                    <img class="pos-absolute" id="illu-control-b" src="{{ site.github.url }}/assets/img/illu-control-b.svg" />
                    <img class="pos-absolute" id="illu-control-c" src="{{ site.github.url }}/assets/img/illu-control-c.svg" />
                </p>
            </div>
            <div class="m--w-2-3 w-1-1">
                <h2 class="fs-6">Control</h2>
                <p class="c-base-15 fs-3 lh-5 m-t-2 m--w-40"><a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/behaviours/parallax.html">Parallax scrolling</a>, some <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/behaviours/scrollfx.html">fancy effect</a>, <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/actions/show.html">show</a> or <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/actions/hide.html">hide</a> stuff … take full control without writing a single line of JavaScript!</p>
<div class="m-t-4" markdown="1">
```html
<!-- example -->
<button class="btn btn--large" yoi-action-1="Show:#illu-control-c; fx:fade-in; speed:slow;" yoi-action-2="ScrollTo:#control;">Boo!</button>
```
</div>
            </div>
        </div>
    </div>
</section>
<section id="adapt" class="p-tb-15 l--p-tb-30 article bg-base-25">
    <div class="wrapper" yoi-scrollfx="in:fade-in; repeat:false;">
        <div class="flx flx-directionColumn m--flx-directionRow">
            <div class="m--w-1-3 w-1-1 h-26 pos-relative">
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-adapt-a.svg" yoi-parallax="factor:20;" />
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-adapt-b.svg" yoi-parallax="factor:25;" />
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-adapt-c.svg" yoi-parallax="factor:15;" />
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-adapt-d.svg" yoi-parallax="factor:10;" />
            </div>
            <div class="m--w-2-3 w-1-1">
                <h2 class="fs-6">Adapt</h2>
                <div class="c-base-15 fs-3 lh-5 m-t-2 l--w-40">
                    <p>Yoi was carefully designed to look great right out-of-the-box. However, it’s <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/start">well documented</a> for beginners and <a class="tdr-none hvr--tdr-underline" href="https://github.com/yoshino-digital/yoi-boilerplate">easy to customize</a> for experienced front-end developers.</p>
                </div>
            </div>
        </div>
    </div>
</section>
<img class="bg-primary-3 h-3 d-block w-1-1" src="{{ site.github.url }}/assets/img/divider-light.svg" />
<section class="bg-primary-3 p-4">
    <p class="c-primary-15 fs-2">
        <img class="h-3 w-3 val-m m-r-1" src="{{ site.github.url }}/assets/img/logo-yoshino.svg" />
        <span class="val-m"><span class="only-s--hidden">&copy; {{ "now" | date: "%Y" }}</span> <a href="http://yoshino.digital" class="c-primary-18 tdr-none hvr--c-primary-22">Yoshino.digital GmbH</a></span>
    </p>
</section>
<style>
    html, body { background: #080022; }
</style>