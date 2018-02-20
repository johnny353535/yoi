---
layout: blank
title: Index
---

<!-- meta menu -->

{% include metamenu.html %}

<!-- section intro -->

<section id="intro" class="cover only-s--h-auto only-s--p-tb-15 l--p-tb-30 center bg-base-25">
    <div class="wrapper al-c op-transparent">
        <img class="h-20 w-20 d-block m-lr-auto" src="{{ site.github.url }}/assets/img/logo-yoi-large.svg" />
        <h1 class="hidden">Yoi</h1>
        <div class="m--w-40 w-25 m-lr-auto">
            <p class="fs-4 lh-6 m-t-10 m-b-4 c-base-15">Yoi &mdash; A flexible front-end library, controlled by a simple yet powerful HTML-interface.</p>
        </div>
    </div>
</section>
<img class="bg-white h-3 d-block w-1-1" src="{{ site.github.url }}/assets/img/divider-top.svg" />

<!-- section build -->

<section id="build" class="p-tb-15 l--p-tb-30 article bg-white pos-relative">
    <div class="wrapper" yoi-scrollfx="in:fade-in; speed:slow; repeat:false;">
        <div class="flx flx-directionColumn m--flx-directionRow">
            <div class="m--w-1-3 w-1-1 p-r-6">
                <h2 class="fs-9">Build</h2>
            </div>
            <div class="m--w-2-3 w-1-1">
                <p class="c-base-15 fs-3 lh-5 m-t-2 m--w-40">Chose from a vast array of ready-made <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/components/">components</a> to create beautiful responsive websites.</p>
<div class="m-t-4" markdown="1">
```html
<!-- example -->
<div class="tile tile--bottom tile--blur tile--slide">
    <div class="tile__body">
        <h2 class="tile__title">Cotton Pants</h2>
        <div class="tile__copy">
            <div class="flx m-t-2">
                <div class="w-2-3">
                    <p class="fs-2 lh-3">Finest organic cotton, slim yet comfortable fit.</p>
                    <p class="fs-3 fw-bold c-yellow-20">€ 75</p>
                </div>
                <div class="w-1-3 pos-relative al-r">
                    <button class="btn btn--large btn--flat pos-br">Buy</button>
                </div>
            </div>
        </div>
    </div>
    <img class="tile__image" src="https://source.unsplash.com/eyFcZLLYvfA/230x300" alt="" />
</div>
```
</div>
                <p class="c-base-18 m-t-2">Image via <a class="c-base-13 tdr-none hvr--tdr-underline" href="https://unsplash.com/photos/eyFcZLLYvfA">unsplash.com</a></p>
            </div>
        </div>
    </div>
</section>

<!-- section tweak -->

<section id="tweak" class="p-tb-15 l--p-tb-30 article bg-white pos-relative">
    <div class="wrapper" yoi-scrollfx="in:fade-in; speed:slow; repeat:false;">
        <div class="flx flx-directionColumn m--flx-directionRow">
            <div class="m--w-1-3 w-1-1 p-r-6">
                <h2 class="fs-9">Tweak</h2>
            </div>
            <div class="m--w-2-3 w-1-1">
                <p class="c-base-15 fs-3 lh-5 m-t-2 m--w-40">A bit more <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/utilities/spacing.html">margin</a> to the left? Another <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/utilities/color.html">text color</a>? Yoi’s huge collection of <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/utilities/">utilities</a> is the cure for your OCD!</p>
<div class="m-t-4" markdown="1">
```html
<!-- example -->
<button class="btn btn--large m-l-6 c-green-12">Tweaked Button</button>
```
</div>
            </div>
        </div>
    </div>
</section>

<!-- section control -->

<section id="control" class="p-tb-15 l--p-tb-30 article bg-white">
    <div class="wrapper" yoi-scrollfx="in:fade-in; speed:slow; repeat:false;">
        <div class="flx flx-directionColumn m--flx-directionRow">
            <div class="m--w-1-3 w-1-1 p-r-6">
                <h2 class="fs-9">Control</h2>
            </div>
            <div class="m--w-2-3 w-1-1">
                <p class="c-base-15 fs-3 lh-5 m-t-2 m--w-40"><a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/behaviours/parallax.html">Parallax scrolling</a>, some <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/behaviours/scrollfx.html">fancy effect</a>, <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/actions/show.html">show</a> or <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/actions/hide.html">hide</a> stuff … take full control without writing a single line of JavaScript!</p>
<div class="m-t-4" markdown="1">
```html
<!-- example -->
<div class="pos-relative h-50 w-26">

    <!-- background with button -->

    <div class="br pos-absolute bg-purple-10 w-24 h-40 m-l-5 m-t-5" yoi-parallax="factor:-30;">
        <button yoi-action="Show:#styleInfo;" class="pos-br btn btn--large btn--outline btn--light m-4">Shop this Style</button>
    </div>

    <!-- image -->

    <div id="styleImg" class="br h-36 w-24 ofl-hidden pos-absolute z-3d-1">
        <img class="pos-absolute z-3d-3" src="https://source.unsplash.com/as5uuSv4F84/260x400" yoi-parallax="factor:30;" />
    </div>

    <!-- shopping overlay -->

    <div id="styleInfo" class="pos-absolute w-1-1 bg-white br m-l-2 m-t-4 p-4 sh-4 z-3d-2" yoi-dismiss>
        <h4>This Style</h4>
        <div class="flx b-t p-t-2 m-t-2">
            <div class="w-1-1 m-b-2">
                <b>Summer Dress</b> by SuperFancy</p>
            </div>
            <div class="w-1-2">
                <select>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                </select>
            </div>
            <div class="w-1-2 al-r">
                <button class="btn btn--flat btn--primary">Add to Cart</button>
            </div>
        </div>
        <div class="flx b-t p-t-2 m-t-2">
            <div class="w-1-1 m-b-2">
                <b>Camera</b> by Cameracadabra</p>
            </div>
            <div class="w-1-2">
                <select>
                    <option>Cherry</option>
                    <option>Cucumber</option>
                    <option>Aubergine</option>
                    <option>Mustard</option>
                </select>
            </div>
            <div class="w-1-2 al-r">
                <button class="btn btn--flat btn--primary">Add to Cart</button>
            </div>
        </div>
    </div>

</div>
```
</div>
                <p class="c-base-18 m-t-2">Image via <a class="c-base-13 tdr-none hvr--tdr-underline" href="https://unsplash.com/photos/as5uuSv4F84">unsplash.com</a></p>
            </div>
        </div>
    </div>
</section>

<!-- section adapt -->

<section id="adapt" class="p-tb-15 l--p-tb-30 article bg-white">
    <div class="wrapper" yoi-scrollfx="in:fade-in; speed:slow; repeat:false;">
        <div class="flx flx-directionColumn m--flx-directionRow">
            <div class="m--w-1-3 w-1-1 p-r-6">
                <h2 class="fs-9">Adapt</h2>
            </div>
            <div class="m--w-2-3 w-1-1">
                <div class="c-base-15 fs-3 lh-5 m-t-2">
                    <p>Yoi was carefully designed to look great right out-of-the-box. However, it’s <a class="tdr-none hvr--tdr-underline" href="{{ site.github.url }}/start/customizing.html">well documented</a> for beginners and <a class="tdr-none hvr--tdr-underline" href="https://github.com/yoshino-digital/yoi-boilerplate">easy to customize</a> for experienced front-end developers.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- footer -->

{% include pagefooter.html %}

<!-- custom styling -->

<style>
    html, body { background: #faf9f7; }
</style>