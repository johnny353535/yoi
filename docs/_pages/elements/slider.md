---
layout: base
group: elements
title: Slider
permalink: elements/slider
---

# Slider

<p class="intro">Sliders are simple slide show elements that can contain images, text or both. A few options are available – like *autoplay*, *transition style* and a few more. For each `.slide`, you can chose from a few different *control elements*.</p>

| Styles         | [slider.less]({{ pathToSourceFile }}assets/less/elements/slider.less) |
| Script         | [slider.js]({{ pathToSourceFile }}assets/js/elements/slider.js)       |
| Script Hook    | `yoi-slider`                                                          |
| Base CSS-Class | `.slider`                                                             |
| Modifiers      | `.slider--dark, .slider--super`                                       |

## Super Slider With Autoplay and Animated Transition

```html
<!-- example -->
<div class="slider slider--super" yoi-slider="autoplay:5000; transition:animate;">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zGnXou4siEI/760x350" alt="" />
            <div class="slider__caption">
                <h3>Consectetur</h3>
                <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/GyDktTa0Nmw/760x350" alt="" />
            <div class="slider__caption">
                <h3>Lorem</h3>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/hNxDy-l07qY/760x350" alt="" />
            <div class="slider__caption">
                <h3>Excepteur</h3>
                <p> Excepteur sint occaecat cupidatat non proident.</p>
            </div>
        </div>
    </div>
</div>
```

## Super Slider With Control Element ”pageBtns“

```html
<!-- example -->
<div class="slider slider--super" yoi-slider="control:pageBtns--br; clickable:true;">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zGnXou4siEI/760x350" alt="" />
            <div class="slider__caption">
                <h3>Consectetur</h3>
                <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/GyDktTa0Nmw/760x350" alt="" />
            <div class="slider__caption">
                <h3>Lorem</h3>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/hNxDy-l07qY/760x350" alt="" />
            <div class="slider__caption">
                <h3>Excepteur</h3>
                <p> Excepteur sint occaecat cupidatat non proident.</p>
            </div>
        </div>
    </div>
</div>
```

## Super Slider With Control Element ”flipBtns“ and Animated Transition

```html
<!-- example -->
<div class="slider slider--super" yoi-slider="control:flipBtns; transition:animate;">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zGnXou4siEI/760x350" alt="" />
            <div class="slider__caption">
                <h3>Consectetur</h3>
                <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/GyDktTa0Nmw/760x350" alt="" />
            <div class="slider__caption">
                <h3>Lorem</h3>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/hNxDy-l07qY/760x350" alt="" />
            <div class="slider__caption">
                <h3>Excepteur</h3>
                <p> Excepteur sint occaecat cupidatat non proident.</p>
            </div>
        </div>
    </div>
</div>
```

## Slider With Control Element ”pageBtns“ and Fade-Transition

```html
<!-- example -->
<div class="slider" yoi-slider="control:pageBtns--tr; transition:fade;">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zGnXou4siEI/760x350" alt="" />
            <div class="slider__caption">
                <h3>Consectetur</h3>
                <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/GyDktTa0Nmw/760x350" alt="" />
            <div class="slider__caption">
                <h3>Lorem</h3>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/hNxDy-l07qY/760x350" alt="" />
            <div class="slider__caption">
                <h3>Excepteur</h3>
                <p> Excepteur sint occaecat cupidatat non proident.</p>
            </div>
        </div>
    </div>
</div>
```

## Slider With Control Element ”flipBtns“

```html
<!-- example -->
<div class="slider" yoi-slider="control:flipBtns;">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zGnXou4siEI/760x350" alt="" />
            <div class="slider__caption">
                <h3>Consectetur</h3>
                <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/GyDktTa0Nmw/760x350" alt="" />
            <div class="slider__caption">
                <h3>Lorem</h3>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/hNxDy-l07qY/760x350" alt="" />
            <div class="slider__caption">
                <h3>Excepteur</h3>
                <p> Excepteur sint occaecat cupidatat non proident.</p>
            </div>
        </div>
    </div>
</div>
```

## Slider With Control Element ”flipBtns--inset“

```html
<!-- example -->
<div class="slider" yoi-slider="control:flipBtns--inset;">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zGnXou4siEI/760x350" alt="" />
            <div class="slider__caption">
                <h3>Sodbrennen</h3>
                <p>Schmerzen in der Brust? Häufiges Aufstoßen? Wir sagen, was Sie gegen Sodbrennen tun können!</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/GyDktTa0Nmw/760x350" alt="" />
            <div class="slider__caption">
                <h3>Migräne</h3>
                <p>Hämmern, Pochen, Bohren – wie Sie den Schmerz in den Griff bekommen …</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/hNxDy-l07qY/760x350" alt="" />
            <div class="slider__caption">
                <h3>Chronische Venenerkrankung</h3>
                <p>Was tun schweren Beinen und Krampfadern?</p>
            </div>
        </div>
    </div>
</div>
```

## Slider With Control Element ”pageDots“ and Fade-Transition

```html
<!-- example -->
<div class="slider" yoi-slider="control:pageDots; clickable:true; transition:fade;">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zGnXou4siEI/760x350" alt="" />
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/GyDktTa0Nmw/760x350" alt="" />
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/hNxDy-l07qY/760x350" alt="" />
        </div>
    </div>
</div>
```