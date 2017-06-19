---
layout: base
group: modules
title: Toggle Group
permalink: modules/togglegroup
---

## Toggle Group
This script provides simple hooks you can use to logically group elements anywhere inside a document and make them *toggleable*. This means the elements behave like a group of tabs, you can always switch to one element and hide all the others. Other than tabs, you can use any markup you like (for any trigger or target item), you can provide an *activeClassName* to highlight an active trigger element and you can even define the event *per trigger*.

|                              |                                                                          |
| -                            | -                                                                        |
| Js-File                      | [toggleGroup.js]({{ pathToSourceFile }}assets/js/modules/toggleGroup.js) |
| Hooks                        | `yoi-toggle, yoi-toggle-fallback`                                        |
| Options (for `yoi-toggle`)  | `target, group, event` (optional)`, activeClassName` (optional)           |

### Example with mouseover and Fall Back Element
If you provide no event in the options JSON, the default event to trigger a toggle is mouseover. Sometimes it makes sense to switch back to a *fall back element* after some delay. You can set it up by providing such element and mark it with `yoi-toggle-fallback="$"` where `$` is the toggle group name.

```html
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
        <img class="d-blk" src="https://source.unsplash.com/zdXtC-jna3I/180x180" />
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

### Example with click event
This is basically the same thing like a [`.tab`](/pages/components/tabs.html), only you can define other events then `click` and chose any trigger element you wish. In the following example we use [`.btn`](/pages/components/buttons.html) and provide an *activeClassName* to mark them as active once pressed.

```html
<div class="box">
    <div class="box__body">
        <div class="btns">
            <button class="btn btn--light btn--large" yoi-toggle="target:#toggleElement-4; group:toggleGroup-2; event:click; activeClassName:btn--active;">Panel One</button>
            <button class="btn btn--light btn--large" yoi-toggle="target:#toggleElement-5; group:toggleGroup-2; event:click; activeClassName:btn--active;">Panel Two</button>
            <button class="btn btn--light btn--large" yoi-toggle="target:#toggleElement-6; group:toggleGroup-2; event:click; activeClassName:btn--active;">Panel Three</button>
        </div>
    </div>
    <div class="box__body" id="toggleElement-4">Panel One</div>
    <div class="box__body" id="toggleElement-5">Panel Two</div>
    <div class="box__body" id="toggleElement-6">Panel Three</div>
</div>
```