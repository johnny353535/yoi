---
layout: base
group: elements
title: Slider
permalink: elements/slider
---

## Slider
Sliders are simple slide show elements that can contain images, text or both. A few options are available – like *autoplay*, *transition style* and a few more. For each `.slide`, you can chose from a few different *control elements*.

| Styles         | [slider.less]({{ pathToSourceFile }}assets/less/elements/slider.less) |
| Script         | [slider.js]({{ pathToSourceFile }}assets/js/elements/slider.js)       |
| Base CSS-Class | `.slider`                                                             |
| Modifiers      | `.slider--dark, .slider--super`                                       |

### JavaScript Interface

```
yoi-slider="
    autoplay   : @param;
    clickable  : @param;
    controls   : @param;
    swipeable  : @param;
    transition : @param;
"

/**
 *  @param {integer} autoplay   - interval in miliseconds to change the slides automatically
 *  @param {bool}    clickable  - click on a slide to switch to the next side
 *  @param {string}  controls   - keyword for the controls to add ["pageBtns" || "pageFlip" || "pageFlip--inset" || "pageDots" || "pageDots--dark" || "pageDots--subtle"]
 *  @param {bool}    swipeable  - change the slide on swipe left/right
 *  @param {string}  transition - keyword for slide transition ["animate" || "fade"]
 */
```

### Super Slider With Autoplay and Animated Transition

```html
<div class="slider slider--super" yoi-slider="autoplay:5000; transition:animate;">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/o0RZkkL072U/760x350" alt="" />
            <div class="slider__caption">
                <h3>Sodbrennen</h3>
                <p>Schmerzen in der Brust? Häufiges Aufstoßen? Wir sagen, was Sie gegen Sodbrennen tun können!</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/sqL5xItVgpg/760x350" alt="" />
            <div class="slider__caption">
                <h3>Migräne</h3>
                <p>Hämmern, Pochen, Bohren – wie Sie den Schmerz in den Griff bekommen …</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zdXtC-jna3I/760x350" alt="" />
            <div class="slider__caption">
                <h3>Chronische Venenerkrankung</h3>
                <p>Was tun schweren Beinen und Krampfadern?</p>
            </div>
        </div>
    </div>
</div>
```

### Super Slider With Control Element ”pageBtns“

```html
<div class="slider slider--super" yoi-slider="control:pageBtns; clickable:true">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/o0RZkkL072U/760x350" alt="" />
            <div class="slider__caption">
                <h3>Sodbrennen</h3>
                <p>Schmerzen in der Brust? Häufiges Aufstoßen? Wir sagen, was Sie gegen Sodbrennen tun können!</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/sqL5xItVgpg/760x350" alt="" />
            <div class="slider__caption">
                <h3>Migräne</h3>
                <p>Hämmern, Pochen, Bohren – wie Sie den Schmerz in den Griff bekommen …</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zdXtC-jna3I/760x350" alt="" />
            <div class="slider__caption">
                <h3>Chronische Venenerkrankung</h3>
                <p>Was tun schweren Beinen und Krampfadern?</p>
            </div>
        </div>
    </div>
</div>
```

### Super Slider With Control Element ”flipBtns“ and Animated Transition

``html
<div class="slider slider--super" yoi-slider="control:flipBtns; transition:animate;">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/o0RZkkL072U/760x350" alt="" />
            <div class="slider__caption">
                <h3>Sodbrennen</h3>
                <p>Schmerzen in der Brust? Häufiges Aufstoßen? Wir sagen, was Sie gegen Sodbrennen tun können!</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/sqL5xItVgpg/760x350" alt="" />
            <div class="slider__caption">
                <h3>Migräne</h3>
                <p>Hämmern, Pochen, Bohren – wie Sie den Schmerz in den Griff bekommen …</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zdXtC-jna3I/760x350" alt="" />
            <div class="slider__caption">
                <h3>Chronische Venenerkrankung</h3>
                <p>Was tun schweren Beinen und Krampfadern?</p>
            </div>
        </div>
    </div>
</div>
```

### Slider With Control Element ”pageBtns“ and Fade-Transition

```html
<div class="slider" yoi-slider="control:pageBtns; transition:fade;">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/o0RZkkL072U/760x350" alt="" />
            <div class="slider__caption">
                <h3>Sodbrennen</h3>
                <p>Schmerzen in der Brust? Häufiges Aufstoßen? Wir sagen, was Sie gegen Sodbrennen tun können!</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/sqL5xItVgpg/760x350" alt="" />
            <div class="slider__caption">
                <h3>Migräne</h3>
                <p>Hämmern, Pochen, Bohren – wie Sie den Schmerz in den Griff bekommen …</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zdXtC-jna3I/760x350" alt="" />
            <div class="slider__caption">
                <h3>Chronische Venenerkrankung</h3>
                <p>Was tun schweren Beinen und Krampfadern?</p>
            </div>
        </div>
    </div>
</div>
```

### Slider With Control Element ”flipBtns“

```html
<div class="slider" yoi-slider="control:pageBtns; transition:fade;">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/o0RZkkL072U/760x350" alt="" />
            <div class="slider__caption">
                <h3>Sodbrennen</h3>
                <p>Schmerzen in der Brust? Häufiges Aufstoßen? Wir sagen, was Sie gegen Sodbrennen tun können!</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/sqL5xItVgpg/760x350" alt="" />
            <div class="slider__caption">
                <h3>Migräne</h3>
                <p>Hämmern, Pochen, Bohren – wie Sie den Schmerz in den Griff bekommen …</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zdXtC-jna3I/760x350" alt="" />
            <div class="slider__caption">
                <h3>Chronische Venenerkrankung</h3>
                <p>Was tun schweren Beinen und Krampfadern?</p>
            </div>
        </div>
    </div>
</div>
```

### Slider With Control Element ”flipBtns--inset“

```html
<div class="slider" yoi-slider="control:flipBtns--inset;">
    <div class="slider__slides">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/o0RZkkL072U/760x350" alt="" />
            <div class="slider__caption">
                <h3>Sodbrennen</h3>
                <p>Schmerzen in der Brust? Häufiges Aufstoßen? Wir sagen, was Sie gegen Sodbrennen tun können!</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/sqL5xItVgpg/760x350" alt="" />
            <div class="slider__caption">
                <h3>Migräne</h3>
                <p>Hämmern, Pochen, Bohren – wie Sie den Schmerz in den Griff bekommen …</p>
            </div>
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zdXtC-jna3I/760x350" alt="" />
            <div class="slider__caption">
                <h3>Chronische Venenerkrankung</h3>
                <p>Was tun schweren Beinen und Krampfadern?</p>
            </div>
        </div>
    </div>
</div>
```

### Slider With Control Element ”pageDots“ and Fade-Transition

```html
<div class="slider p-b-1" yoi-slider="control:pageDots; clickable:true; transition:fade;">
    <div class="slider__slides m-b-2">
        <div class="slider__slide">
            <img src="https://source.unsplash.com/o0RZkkL072U/760x350" alt="" />
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/sqL5xItVgpg/760x350" alt="" />
        </div>
        <div class="slider__slide">
            <img src="https://source.unsplash.com/zdXtC-jna3I/760x350" alt="" />
        </div>
    </div>
</div>
```

### Slider With Control Element ”pageDots“, Only Text

```html
<div class="slider p-b-1" yoi-slider="control:pageDots; clickable:true; transition:fade;">
    <div class="slider__slides m-b-2">
        <div class="slider__slide">
            <p class="fs-20 lh-25 p-4 al-c">Slide with text!</p>
        </div>
        <div class="slider__slide">
            <p class="fs-20 lh-25 p-4 al-c">Slide with more text!</p>
        </div>
        <div class="slider__slide">
            <p class="fs-20 lh-25 p-4 al-c">Slide with textIcon!</p>
        </div>
    </div>
</div>
```

### Dark Slider With Control Element ”pageDots“, Only Text

```html
<div class="slider slider--dark p-b-1" yoi-slider="control:pageDots--dark; clickable:true; transition:fade;">
    <div class="slider__slides m-b-2">
        <div class="slider__slide">
            <p class="fs-20 lh-25 p-4 al-c">Slide with text!</p>
        </div>
        <div class="slider__slide">
            <p class="fs-20 lh-25 p-4 al-c">Slide with more text!</p>
        </div>
        <div class="slider__slide">
            <p class="fs-20 lh-25 p-4 al-c">Slide with text!</p>
        </div>
    </div>
</div>
```