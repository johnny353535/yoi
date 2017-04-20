---
layout: base
group: elements
title: Pop-Over
permalink: elements/popover
---

## Pop-Over
Use this element to link any trigger (eg. a button) to a _pop-over_ which appears on mouse over.

| Styles         | [popOver.less]({{ pathToSourceFile }}assets/less/elements/popOver.less) |
| Script         | [popOver.js]({{ pathToSourceFile }}assets/js/elements/popOver.js)       |
| Base CSS-Class | `.popOver`                                                              |
| Modifiers      | `-`                                                                     |

### Basic Example
To build a pop-over, you need two elements: a *trigger* and the *pop-over* itself. Any element can be a trigger but links with the pop-over’s id as `href` value make the most sense in most cases. **To reference a pop-over**, add the `yoi-popover` hook to the trigger. This attribute **must contain at least one parameter: the target pop-over id**.

This example uses the pop-over to display a small menu:

```html
<a class="btn btn--large" href="#examplePopOver-1" yoi-popover="target:#examplePopOver-1;">Show pop-over</a>
<div class="popOver" id="examplePopOver-1">
    <p class="p-4 fs-15 lh-20">Hello.</p>
</div>
```

<p class="hint"><b>Use Any Element You Wish</b> Any element in the DOM</em> can be a trigger for a pop-over. <em>Any element in the DOM</em> can be a pop-over.</p>
<p class="hint"><b>Reference the Same Pop-Over Multiple Times</b> It is absolutely possible (and recommended) to reference exactly the same pop-over through as many pop-over-triggers as you wish.</p>

### Options
The pop-over hook accepts some parameters as options. Use **semicolon seperated key/value pairs** like `yoi-popover="target:#foo; pos:bl; ref:tl;"`. The **following options are available**:

| Key            | Value                                                                                                                    | Description                                                                             |
| -              | -                                                                                                                        | -                                                                                       |
| target         | *string*, css id selector                                                                                                | The target pop-over id selector.                                                        |
| pos            | *string*, `'tl','tr','br','bl'`                                                                                          | Pop-over position relative to trigger. The default is _tr_.                             |
| ref            | *string*, `'tl','tr','br','bl'`                                                                                          | Pop-over reference point. The default is _tl_.                                          |
| toggleClass    | *string*, css class name                                                                                                 | Css class name added to trigger if pop-over is currently shown.                         |
| eventShow      | *string*, `'click','dblclick','contextmenu','mouseover', 'mouseout', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'` | Defines the event to show the pop-over. The default is _mouseenter_.                    |
| eventHide      | *string*, `'click','dblclick','contextmenu','mouseover', 'mouseout', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'` | Defines the event to hide the pop-over. The default is _mouseleave_.                    |
| preventDefault | *bool*, `true/false`                                                                                                     | If true, the trigger’s default event (eg. click) gets prevented. The default is _true_. |

#### target
To link a trigger to it’s pop-over, you must **at least supply one parameter: the target’s id selector**.

#### pos
By default, any pop-over will appear at the right side of the trigger with it’s top left edge right at the top right edge of the trigger. However, different positioning can be achieved if values for either `pos` or `ref` are set. `pos` sets **the pop-over’s position, relative to it’s trigger**.

#### ref
This option defines the **pop-over’s reference point** and can be one of the four corners (tl = *top left*, tr = *top right*, br = *bottom right*, bl = *bottom left*).

#### toggleClass
Use this option if the **trigger** should get an **additional css class name while the menu is visible**, eg. to highlight it or to add a visual indication for *pressed* etc.

#### eventShow
The default event for the trigger to show the pop-over is `mouseover`. Use this option to override it with another valid event.

#### eventHide
The default event for the trigger to hide the pop-over is `mouseout`. Use this option to override it with another valid event.

#### preventDefault
By default, the trigger’s default event (eg. `click` if you use an anchor like `<a href="...">`) won’t fire (`event.preventDefault()`). Use this option with `true/false` to override this behaviour.

### Positioning
The following examples illustrate how to position the pop-overs.

```html
<a href="#examplePopOver-2" class="btn btn--large" yoi-popover="target:#examplePopOver-2;">Pop-over at default Position</a>
<div class="popOver" id="examplePopOver-2">
    <p class="p-4 fs-15 lh-20">Hello.</p>
</div>

<a href="#examplePopOver-3" class="btn btn--large" yoi-popover="target:#examplePopOver-3; pos:bl;">Pop-over at bottom left</a>
<div class="popOver" id="examplePopOver-3">
    <p class="p-4 fs-15 lh-20">Guten Tag.</p>
</div>

<a href="#examplePopOver-4" class="btn btn--large" yoi-popover="target:#examplePopOver-4; pos:tl; ref:bl;">Pop-over at top left</a>
<div class="popOver" id="examplePopOver-4">
    <p class="p-4 fs-15 lh-20">Bonjour.</p>
</div>
```

### Position in DOM

<p class="hint"><b>Pop-Over Position in Dom</b> Pop-overs do not have to directly follow their triggers in the DOM. In fact, they can be <em>placed anywhere in the markup</em>. Technically, each pop-over is first detached from the DOM and then re-injected into the body-tag to enable correct absolute positioning.</p>

### Change Class Name of Trigger When Pop-Over Is Visible
Use the option `toggleClass` to **add any css class name to the trigger** when the menu is visible.

```html
<div class="popOver" id="examplePopOver-6-a">
    <p class="p-4 fs-15 lh-20">Hallo.</p>
</div>

<div class="popOver" id="examplePopOver-6-b">
    <p class="p-4 fs-15 lh-20">Howdy.</p>
</div>
```

### Changing the Default Events to Show or Hide the Pop-over

<p class="hint hint--attention"><b>Attention</b> If you change the events to show/hide the pop-over, there is no internal test that prevents you from using illogical event-combinations. If you provide an invalid event (one not listet in the options-overview further above), the default event gets used.</p>

### More Use Cases / Examples
#### Show a Menu on Click

```html
<a class="btn btn--large" href="#examplePopOver-7" yoi-popover="target:#examplePopOver-7; eventShow:click;">
    <i aria-hidden="true" class="icon--067-s"></i>
    <span>Menu</span>
</a>
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

#### Show Table-Column Modifiers (sorting/searching/filtering etc.) on Click

```html
<table>
    <tr>
        <th class="crsr-pntr" yoi-popover="target:#examplePopOver-8; pos:bl; eventShow:click;">Date</th>
        <th class="crsr-pntr" yoi-popover="target:#examplePopOver-9; pos:bl; eventShow:click;">Name</th>
        <th class="crsr-pntr" yoi-popover="target:#examplePopOver-10; pos:bl; eventShow:click;">Status</th>
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
            <button class="btn">Update Column</button>
        </p>
    </form>
</div>
<div class="popOver" id="examplePopOver-9">
    <form class="p-2">
        <input class="w-15 val-t" type="text" placeholder="Name" />
        <button class="btn val-t">Filter by Name</button>
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