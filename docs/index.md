---
layout: blank
title: About
---

<div class="flx p-4 pos-absolute w-1-1">
    <div class="flx-grow">
        <span class="c-primary-15">{{ site.github.latest_release }}</span>
    </div>
    <div class="flx-grow al-r">
        <a href="https://github.com/yoshino-digital/yoi/" class="btn btn--medium btn--flat btn--primary">GitHub</a>
        <a href="{{ site.github.zip_url }}" class="btn btn--medium btn--flat btn--primary">
            <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-071-s" yoi-icon />
            <span>Download</span>
        </a>
    </div>
</div>
<div class="cover only-s--h-auto only-s--p-tb-10 center-content bg-primary-3">
    <div class="wrapper al-c" yoi-scrollfx="in:fade-in; repeat:false;">
        <img class="h-20 w-20" src="{{ site.github.url }}/assets/img/logo-yoi.svg" />
        <h1 class="hidden">Yoi</h1>
        <div class="m--w-40 m-lr-auto m-t-4">
            <p class="fs-4 lh-6 c-primary-22 m-tb-8">Yoi is a highly modular front-end library, controlled by a simple HTML-interface.</p>
            <p>
                <a class="fs-2 only-s--d-block" href="{{ site.github.url }}/start/">Read to the docs</a>
                <i class="fs-2 c-primary-10 m-lr-2 only-s--d-block only-s--m-tb-2">or</i>
                <a class="btn btn--primary btn--large btn--flat btn--rounded" href="#build" yoi-action="ScrollTo:#build; offset:0;">Learn more!</a>
            </p>
        </div>
    </div>
</div>
<div id="build" class="cover only-s--h-auto only-s--p-tb-10 article center-content bg-base-25">
    <div class="wrapper" yoi-scrollfx="in:fade-in; repeat:false;">
        <div class="flx flx-directionColumn m--flx-directionRow">
            <div class="m--w-1-3 w-1-1 h-24 pos-relative">
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-build-a.svg" yoi-parallax="factor:20;" />
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-build-b.svg" yoi-parallax="factor:-20;" />
            </div>
            <div class="m--w-2-3 w-1-1">
                <h2>Build</h2>
                <p class="c-base-15 fs-3 lh-5 m-t-2 m--w-40">Chose from a vast array of ready-made <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/components/">components</a> to create beautiful responsive websites.</p>
<div class="m-t-4" markdown="1">
```html
<!-- example -->
<div class="bg-white br-all w-20 tdr-none m-2 c-primary-14 sh-3 ofl-hidden" href="#">
    <img class="d-block" src="https://source.unsplash.com/qjgdslbEn-I/200x165">
    <div class="p-3">
        <div class="flx m-b-2">
            <div class="flx-grow">
                <h2 class="c-base-17 fs-1 lh-1 fw-bold tt-uppercase ls-1">Daily Quiz</h2>
            </div>
            <div class="al-r flx-grow">
                <p class="c-base-17 fs-1 lh-1 fw-bold">1 / 10</p>
            </div>
        </div>
        <h3 class="m-b-2">What is this?</h3>
        <p class="btns btns--vertical">
            <button class="btn btn--large btn--light">Rocket</button>
            <button class="btn btn--large btn--light">Space Ship</button>
            <button class="btn btn--large btn--light">Awesome</button>
        </p>
    </div>
</div>
```
</div>
            </div>
        </div>
    </div>
</div>

<div id="tweak" class="cover only-s--h-auto only-s--p-tb-10 article center-content bg-base-25">
    <div class="wrapper" yoi-scrollfx="in:fade-in; repeat:false;">
        <div class="flx flx-directionColumn m--flx-directionRow">
            <div class="m--w-1-3 w-1-1 h-24 pos-relative">
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-tweak-a.svg" yoi-parallax="factor:20;" />
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-tweak-b.svg" yoi-parallax="factor:-20;" />
            </div>
            <div class="m--w-2-3 w-1-1">
                <h2>Tweak</h2>
                <p class="c-base-15 fs-3 lh-5 m-t-2 m--w-40">A bit more <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/utilities/spacing.html">margin</a> to the top? Slightly darker <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/utilities/color.html">text color</a>? Yoi’s <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/utilities/">utilities</a> are your OCD’s best pal!</p>
<div class="m-t-4" markdown="1">
```html
<!-- example -->
<button class="btn btn--large c-red-15">Oh look!</button>
```
</div>
            </div>
        </div>
    </div>
</div>
<div id="control" class="cover only-s--h-auto only-s--p-tb-10 article center-content bg-base-25">
    <div class="wrapper" yoi-scrollfx="in:fade-in; repeat:false;">
        <div class="flx flx-directionColumn m--flx-directionRow">
            <div class="m--w-1-3 w-1-1 h-24 pos-relative">
                <img class="pos-absolute" id="illu-control-a" src="{{ site.github.url }}/assets/img/illu-control-a.svg" yoi-parallax="factor:20;" />
                <p class="pos-absolute" yoi-parallax="factor:-20;">
                    <img class="pos-absolute" id="illu-control-b" src="{{ site.github.url }}/assets/img/illu-control-b.svg" />
                    <img class="pos-absolute" id="illu-control-c" src="{{ site.github.url }}/assets/img/illu-control-c.svg" />
                </p>
            </div>
            <div class="m--w-2-3 w-1-1">
                <h2>Control</h2>
                <p class="c-base-15 fs-3 lh-5 m-t-2 m--w-40"><a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/behaviours/parallax.html">Parallax scrolling</a>, some <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/behaviours/scrollfx.html">fancy effect</a>, a button that <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/actions/show.html">shows</a> or <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/actions/hide.html">hides</a> stuff … full control without a single line of JavaScript!</p>
<div class="m-t-4" markdown="1">
```html
<!-- example -->
<button class="btn btn--large" yoi-action-1="Show:#illu-control-c; fx:fade-in; speed:slow;" yoi-action-2="ScrollTo:#control;">Boo!</button>
```
</div>
            </div>
        </div>
    </div>
</div>
<div id="adapt" class="cover only-s--h-auto only-s--p-tb-10 article center-content bg-base-25">
    <div class="wrapper" yoi-scrollfx="in:fade-in; repeat:false;">
        <div class="flx flx-directionColumn m--flx-directionRow">
            <div class="m--w-1-3 w-1-1 h-24 pos-relative">
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-adapt-a.svg" yoi-parallax="factor:20;" />
                <img class="pos-absolute" src="{{ site.github.url }}/assets/img/illu-adapt-b.svg" yoi-parallax="factor:-20;" />
            </div>
            <div class="m--w-2-3 w-1-1">
                <h2>Adapt</h2>
                <div class="c-base-15 fs-3 lh-5 m-t-2 l--w-40">
                    <p>Yoi was carefully designed to look great right out-of-the-box. However, it’s <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/start">well documented</a> for beginners and <a class="tdr-none hvr--tdr-underline" href="https://github.com/yoshino-digital/yoi-boilerplate">easy to customize</a> for experienced front-end developers.</p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="flx bg-primary-3 p-4">
    <p class="flx-grow  c-primary-15 fs-2">
        <img class="h-3 w-3 val-m m-r-1" src="{{ site.github.url }}/assets/img/logo-yoshino.svg" />
        <span class="val-m"><span class="only-s--hidden">&copy; {{ "now" | date: "%Y" }}</span> <a href="http://yoshino.digital" class="c-primary-18 tdr-none hvr--c-primary-22">Yoshino.digital GmbH</a></span>
    </p>
    <p class="flx-grow al-r">
        <a href="https://github.com/yoshino-digital/yoi/" class="btn btn--medium btn--flat btn--primary">GitHub</a>
    </p>
</div>
<style>
    html, body { background: #080022; }
</style>
