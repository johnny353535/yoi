---
layout: base
group: elements
title: Tool Tip
permalink: elements/tooltip
---

## Tool Tip
Tooltips are small portions of markup which are associated with a certain element on the page. They are hidden on page load and get revealed on mouseover. **Tooltips can be any markup you wish!** Simply give the markup you want to turn into a tooltip a unique id and »link« it to another element by referring to it through the yoi-tooltip attribute. This way the tooltip markup can be placed anywhere in your markup.

| Styles         | [toolTip.less]({{ pathToSourceFile }}assets/less/elements/toolTip.less)      |
| Script         | [toolTip.js]({{ pathToSourceFile }}assets/js/elements/toolTip.js)            |
| Base CSS-Class | `.tooltip--attention`                                                        |
| Modifiers      | `.tooltip--error, .tooltip--negative, .tooltip--success, .tooltip--positive` |

### Setting up a tooltip
The following might be the element you wish to turn into a tooltip:

```html
<div id="myTooltip">This is a tool tip.</div>
```

And this is how you refer to the tooltip from the element that you wish to trigger the tooltip on mouseOver:

```html
<div class="documentation__block">
    <code class="language-markup"><pre>&lt;div yoi-tooltip=&quot;target:#myTooltip;&quot;&gt;Move Cursor here&lt;/div&gt;</pre></code>
</div>
```

In the following example, a `.note` element is used as a tooltip. If JavaScript is disabled, the tooltip falls back to a nicely styled .note element. This is very flexible and gives you complete control over styling your no-JS fallback.
Example: Using a .note as tooltip

```html
<div class="note m-b-2" id="hint-1">
    <h3 class="note__headline">Attention!</h3>
    <div class="note__body">
        <p>This is a tooltip.</p>
    </div>
</div>
<div class="box p-4 w-10 h-10 al-c" yoi-tooltip="target:#hint-1;">Move Cursor here</div>
```

### No JavaScript?
If JavaScript was disabled, the example above would look like this:

```html
<div class="note m-b-2">
    <h3 class="note__headline">Attention!</h3>
    <div class="note__body">
        <p>This is a tooltip.</p>
    </div>
</div>
<div class="box p-4 w-10 h-10 al-c">Move Cursor here</div>
```

### Inheritance
A tooltip will inherit certain sematic class names from it’s target (`*--attention`, `*--error`, `*--negative`, `*--positive`, `*--success`.). This is pretty much only useful to show tooltips in combination with `.hints` while showing input validation messages.

```html
<form>
    <div class="note m-b-2 note--success" id="hint-2">
        <h3 class="note__headline">Success!</h3>
        <div class="note__body">
            <p>This is a tooltip which inherits the *--success class from it’s target.</p>
        </div>
    </div>
    <input class="input--large input--success w-30" type="text" yoi-tooltip="target:#hint-2; icon:011;" />
</form>
```

### Positioning
Tooltips are displayed relative to the cursor position on mouseover. The script is smart enough to place the tooltip left/right or above/below the cursor automatically so the viewport does not cut it off.
