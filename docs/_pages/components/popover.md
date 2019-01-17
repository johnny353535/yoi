---
layout: base
group: components
title: Pop-Over
permalink: components/popover
status: draft
---

# Pop-Over

<p class="intro">Small overlay, relatively positioned to a reference element.</p>

## Basic Example

To create a pop-over, you need two elements: a *trigger* and the *pop-over* itself. Whily any element can be a trigger, `<a>`s with the pop-over’s id as `href` value make sense in most cases.

To reference a *pop-over*, add the `yoi-popover` attribute to the trigger element. You must at least provide one parameter: the target pop-over id:

```html
<!-- example -->
<a class="button button--large" href="#examplePopOver-1" yoi-popover="target:#examplePopOver-1;" tabindex="0">Show pop-over</a>
<div class="popOver" id="examplePopOver-1">
    <p class="p-2 fs-2 lh-3">pop-over</p>
</div>
```

<p class="hint"><b>Use Any Element You Wish</b> Any element can be a trigger for a pop-over. <em>Any element</em> can be a pop-over.</p>
<p class="hint"><b>Reference the Same Pop-Over Multiple Times</b> It is possible (and recommended!) to reference the same pop-over through as many pop-over-triggers as you wish.</p>
<p class="hint"><b>Pop-Over Position in Markup</b> Pop-overs do not have to directly follow their triggers in the markup – they can be <em>placed anywhere</em>. Technically, each pop-over is first detached from the DOM and then re-injected at the end of <code>&lt;body&gt;</code> to enable correct absolute positioning.</p>

## Parameters

| `target`              | CSS id selector                                       | The target pop-over id selector.                                                      |
| `pos`                 | `'tl','tr','br','bl'`                                 | Pop-over position relative to trigger. The default is _tr_.                           |
| `ref`                 | `'tl','tr','br','bl'`                                 | Pop-over reference point. The default is _tl_.                                        |
| `toggleClass`         | css class name                                        | Css class name added to trigger if pop-over is currently shown.                       |
| `on`                  | any standard (mouse-)event, eg. `mouseover, click, …` | Defines the event to show the pop-over. The default is _mouseenter_.                  |
| `preventDefaultClick` | true/false`                                           | If true, the trigger element’s default click-event is ignored. The default is _true_. |

### target

To link a trigger to it’s pop-over, you must *at least supply one parameter: the target’s id selector*.

### pos

By default, any pop-over will appear at the right side of the trigger with it’s top left edge aligned to the top right edge of the trigger. Different positioning can be achieved if values for either `pos` or `ref` are set. `pos` sets *the pop-over’s position, relative to it’s trigger element*.

```html
<!-- example -->
<a href="#examplePopOver-3" class="button button--large" yoi-popover="target:#examplePopOver-3; pos:bl;">Show pop-over</a>
<div class="popOver" id="examplePopOver-3">
    <p class="p-2 fs-2 lh-3">Pop-over at bottom left</p>
</div>
```

### ref

This option defines the *pop-over’s reference point* and can be one of the four corners (`tl` = *top left*, `tr` = *top right*, `br` = *bottom right*, `bl` = *bottom left*).

```html
<!-- example -->
<a href="#examplePopOver-4" class="button button--large" yoi-popover="target:#examplePopOver-4; ref:bl;">Show pop-over</a>
<div class="popOver" id="examplePopOver-4">
    <p class="p-2 fs-2 lh-3">Pop-over reference point is bottom left</p>
</div>
```

### toggleClass

Use this option if the *trigger* should get an *additional css class while the pop-over is visible*, eg. to highlight it or to add a visual indication for *pressed* etc.:

```html
<!-- example -->
<a href="#examplePopOver-9" class="button button--large" yoi-popover="target:#examplePopOver-9; toggleClass:tabFocus;">Show pop-over</a>
<div class="popOver" id="examplePopOver-9">
    <p class="p-2 fs-2 lh-3">You added <code>.tabFocus</code><br/>to the button element.</p>
</div>
```

### on

The default event for the trigger to show the pop-over is `mouseover`. Use this option to override it with another valid event.

```html
<!-- example -->
<a href="#examplePopOver-10" class="button button--large" yoi-popover="target:#examplePopOver-10; on:dblclick;">Show pop-over on double-click</a>
<div class="popOver" id="examplePopOver-10">
    <p class="p-2 fs-2 lh-3">Popover</p>
</div>
```

### preventDefaultClick

By default, the trigger element’s default click-event (eg. if you use `<a href="...">`) won’t fire. To override this behaviour, set this parameter to `false`.

## Custom Events

| event name         | fires when …         |
| ------------------ | -------------------- |
| `yoi-popover-hide` | pop-over disappeared |
| `yoi-popover-show` | pop-over appeared    |

## Use Cases / Examples

Show a menu on click:

```html
<!-- example:tabs -->
<a class="button button--large" href="#examplePopOver-7" yoi-popover="target:#examplePopOver-7; on:click;">Click for Menu</a>
<div class="popOver" id="examplePopOver-7">
    <ul class="linkList linkList--large b-0">
        <li class="linkList__item">
            <a class="linkList__link" href="#">Oxygen</a>
        </li>
        <li class="linkList__item">
            <a class="linkList__link" href="#">Potassium</a>
        </li>
        <li class="linkList__item">
            <a class="linkList__link" href="#">Krypton</a>
        </li>
        <li class="linkList__item">
            <a class="linkList__link" href="#">Molybdenum</a>
        </li>
    </ul>
</div>
```

Show table-column modifiers (sorting/searching/filtering etc.) on mouseover:

```html
<!-- example:tabs -->
<table>
    <tr>
        <th class="crs-pntr" yoi-popover="target:#examplePopOver-8; pos:bl;">Date</th>
        <th class="crs-pntr" yoi-popover="target:#examplePopOver-9; pos:bl;">Name</th>
        <th class="crs-pntr" yoi-popover="target:#examplePopOver-10; pos:bl;">Status</th>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
</table>
<div class="popOver" id="examplePopOver-8">
    <form class="p-2">
        <div class="w-1-1">
            <div class="w-1-2 p-r-1 fl-l">
                <input class="w-10" type="text" placeholder="From" />
            </div>
            <div class="w-1-2 p-l-1 fl-r">
                <input class="w-10" type="text" placeholder="To" />
            </div>
        </div>
        <p class="m-t-2">
            <button class="button">Update Column</button>
        </p>
    </form>
</div>
<div class="popOver" id="examplePopOver-9">
    <form class="p-2">
        <input class="w-15 val-t" type="text" placeholder="Name" />
        <button class="button val-t">Filter by Name</button>
    </form>
</div>
<div class="popOver" id="examplePopOver-10">
    <form class="p-2">
        <select class="select">
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
        </select>
    </form>
</div>
```
