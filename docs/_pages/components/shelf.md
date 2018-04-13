---
layout: base
group: components
title: Shelf
permalink: components/shelf
---

# Shelf

<p class="intro">A grid of elements resembling a shelf.</p>

## Basic Example

For this example, we use thumbnail-images inside shelf items. You could use any other item instead (see [examples below](yoi/{{ page.url }}.html#variations)). This is how a basic `.shelf` might look like and how you write the markup:

```html
<!-- example -->
<div class="shelf">
    <div class="shelf__board">
        <div class="flx">
            <div class="shelf__item w-1-4">
                <div class="box p-2 m-2">
                    <img class="w-1-1 d-blk" src="https://source.unsplash.com/EARYIkg21D4/150x150" alt="" />
                </div>
            </div>
            <div class="shelf__item w-1-4">
                <div class="box p-2 m-2">
                    <img class="w-1-1 d-blk" src="https://source.unsplash.com/mk2USqDQE5E/150x150" alt="" />
                </div>
            </div>
            <div class="shelf__item w-1-4">
                <div class="box p-2 m-2">
                    <img class="w-1-1 d-blk" src="https://source.unsplash.com/tME8s001BNQ/150x150" alt="" />
                </div>
            </div>
            <div class="shelf__item w-1-4">
                <div class="box p-2 m-2">
                    <img class="w-1-1 d-blk" src="https://source.unsplash.com/qvEwMfUX_DM/150x150" alt="" />
                </div>
            </div>
        </div>
    </div>
    <div class="shelf__board">
        <div class="flx">
            <div class="shelf__item w-1-4">
                <div class="box p-2 m-2">
                    <img class="w-1-1 d-blk" src="https://source.unsplash.com/JgOeRuGD_Y4/150x150" alt="" />
                </div>
            </div>
            <div class="shelf__item w-1-4">
                <div class="box p-2 m-2">
                    <img class="w-1-1 d-blk" src="https://source.unsplash.com/EDqP5r_QwrE/150x150" alt="" />
                </div>
            </div>
            <div class="shelf__item w-1-4">
                <div class="box p-2 m-2">
                    <img class="w-1-1 d-blk" src="https://source.unsplash.com/xgTMSz6kegE/150x150" alt="" />
                </div>
            </div>
            <div class="shelf__item w-1-4">
                <div class="box p-2 m-2">
                    <img class="w-1-1 d-blk" src="https://source.unsplash.com/trvP9JiYC1E/150x150" alt="" />
                </div>
            </div>
        </div>
    </div>
    <div class="shelf__board">
        <div class="flx">
            <div class="shelf__item w-1-4">
                <div class="box p-2 m-2">
                    <img class="w-1-1 d-blk" src="https://source.unsplash.com/z_L0sZoxlCk/150x150" alt="" />
                </div>
            </div>
            <div class="shelf__item w-1-4">
                <div class="box p-2 m-2">
                    <img class="w-1-1 d-blk" src="https://source.unsplash.com/wVjd0eWNqI8/150x150" alt="" />
                </div>
            </div>
            <div class="shelf__item w-1-4">
                <div class="box p-2 m-2">
                    <img class="w-1-1 d-blk" src="https://source.unsplash.com/9CV6WrxxdrM/150x150" alt="" />
                </div>
            </div>
            <div class="shelf__item w-1-4">
                <div class="box p-2 m-2">
                    <img class="w-1-1 d-blk" src="https://source.unsplash.com/_l8ZdgJ9m7w/150x150" alt="" />
                </div>
            </div>
        </div>
    </div>
</div>
```

# Variations

You could use any element or custom markup inside a `.shelf__item`. See the following examples for inspiration:

```html
<!-- example -->
<div class="shelf">
    <div class="shelf__board">
        <div class="flx">
            <div class="shelf__item w-1-3">
                <div class="box h-25 p-2 m-2">
                    <h3>Basic</h3>
                    <p class="m-tb-2">This affordable option is the most popular choice among our customers.</p>
                    <p class="fs-3 al-c"><b>5 €</b></p>
                    <a class="btn btn--large btn--light al-c pos-l pos-r pos-b m-2" href="#">Buy</a>
                </div>
            </div>
            <div class="shelf__item w-1-3">
                <div class="box bg-yellow-21 bc-yellow-19 h-25 p-2 m-2 c-yellow-5">
                    <h3>Professional</h3>
                    <p class="m-tb-2">The perfect option for our professional customers.</p>
                    <p class="fs-3 al-c"><b>15 €</b></p>
                    <a class="btn btn--large btn--attention al-c pos-l pos-r pos-b m-2" href="#">Buy</a>
                </div>
            </div>
            <div class="shelf__item w-1-3">
                <div class="box bg-red-21 bc-red-19 h-25 p-2 m-2 c-red-5">
                    <h3>Premium</h3>
                    <p class="m-tb-2">Everything you can imagine is covered by our premium plan.</p>
                    <p class="fs-3 al-c"><b>500 €</b></p>
                    <a class="btn btn--large btn--negative al-c pos-l pos-r pos-b m-2" href="#">Buy</a>
                </div>
            </div>
        </div>
    </div>
</div>
```

```html
<!-- example -->
<div class="shelf">
    <div class="shelf__board">
        <div class="flx">
            <div class="shelf__item w-1-2">
                <a class="box bg-base-5 b-0 h-30 tdr-none hvr--bg-base-3 p-b-10 m-2 c-blue-22 ofl-hidden" href="#">
                    <img class="d-blk m-b-2" src="https://source.unsplash.com/kFCdfLbu6zA/290x170">
                    <div class="p-2">
                        <h4 class="m-b-1">Yoga Master in 10 Days</h4>
                        <p class="fs-2 lh-3">Turn healthy and become a yoga-master in just 10 days.</p>
                    </div>
                </a>
            </div>
            <div class="shelf__item w-1-2">
                <a class="box bg-base-5 b-0 h-30 tdr-none hvr--bg-base-3 p-b-10 m-2 c-red-22 ofl-hidden" href="#">
                    <img class="d-blk m-b-2" src="https://source.unsplash.com/-rWjydNhATw/290x170">
                    <div class="p-2">
                        <h4 class="m-b-1">Running Like a Pro</h4>
                        <p class="fs-2 lh-3">This short book teaches you just the right technique you needed to become a real pro-runner.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
```
