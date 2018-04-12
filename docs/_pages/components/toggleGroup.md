---
layout: base
group: components
title: Toggle Group
permalink: components/togglegroup
status: draft
---

# Toggle Group

<p class="intro">Logically grouped elements, behaving like a group of tabs with optional start element to fall back to</p>

## Example with mouseover and Fall Back Element

The default event to trigger a toggle is mouseover. Sometimes it makes sense to switch back to a *fall back element* after some delay. You can set it up by providing such element and mark it with `yoi-toggle-fallback="$"` where `$` is the toggle group name.

```html
<!-- example -->
<div class="box w-20 h-20" yoi-toggle-fallback="toggleGroup-1">
    <div class="box__body h-10">
        Move your cursor over the buttons below to show different images.
    </div>
</div>
<div class="box w-20 h-20" id="toggleElement-1">
    <div class="box__body">
        <img class="d-blk" src="https://source.unsplash.com/o0RZkkL072U/180x180" />
    </div>
</div>
<div class="box w-20 h-20" id="toggleElement-2">
    <div class="box__body">
        <img class="d-blk" src="https://source.unsplash.com/gsh-RsCnLKQ/180x180" />
    </div>
</div>
<div class="box w-20 h-20" id="toggleElement-3">
    <div class="box__body">
        <img class="d-blk" src="https://source.unsplash.com/jqvxcyVx2YE/180x180" />
    </div>
</div>
<div class="btns m-t-4">
    <button class="btn btn--large" yoi-toggle="target:#toggleElement-1; group:toggleGroup-1;">1</button>
    <button class="btn btn--large" yoi-toggle="target:#toggleElement-2; group:toggleGroup-1;">2</button>
    <button class="btn btn--large" yoi-toggle="target:#toggleElement-3; group:toggleGroup-1;">3</button>
</div>
```

## Example with click event

This is basically the same thing like a [`.tab`]({{ site.github.url }}pages/components/tabs.html), only you can define other events then `click` and chose any trigger element you wish. In the following example we use [`.btn`]({{ site.github.url }}pages/components/buttons.html) and provide an *activeClassName* to mark them as active once pressed.

```html
<!-- example -->
<div class="box">
    <div class="box__body">
        <div class="btns">
            <button class="btn btn--light btn--large" yoi-toggle="target:#toggleElement-4; group:toggleGroup-2; event:click; activeClassName:is--active;">Panel One</button>
            <button class="btn btn--light btn--large" yoi-toggle="target:#toggleElement-5; group:toggleGroup-2; event:click; activeClassName:is--active;">Panel Two</button>
            <button class="btn btn--light btn--large" yoi-toggle="target:#toggleElement-6; group:toggleGroup-2; event:click; activeClassName:is--active;">Panel Three</button>
        </div>
    </div>
    <div class="box__body" id="toggleElement-4">Panel One</div>
    <div class="box__body" id="toggleElement-5">Panel Two</div>
    <div class="box__body" id="toggleElement-6">Panel Three</div>
</div>
```