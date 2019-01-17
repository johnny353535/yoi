---
layout: base
group: components
title: Switch
permalink: components/switch
---

# Switch

<p class="intro">Animated binary switch buttons.</p>

## Basic Example

This is how a basic `.switch` looks like and how you write the markup:

```html
<!-- example -->
<div class="switch" yoi-switch>
    <input type="checkbox" />
</div>
```

<p class="hint"><b>Accessability:</b> The <code>.switch</code> element is accessible by design since it’s just a wrapper around a standard <code>input type="radio"</code> element. So when JavaScript is disabled, it provides a graceful and accessible fallback.</p>

## Modifiers

### Size

Use the modifier `.switch--large` to render a large switch:

```html
<!-- example -->
<div class="switch switch--large" yoi-switch>
    <input type="checkbox" />
</div>
```

## Attributes

| Key | Value | Description |
| - | - | - |
| state      | "on"/"off" | a keyword to set the switch to "on" or "off" |
| showLabels | true / false | if "true", labels are added |
| labelOn    | string, maximum 4 characters | text for the "on" label (default: labelOnTxt[language]) |
| labelOff   | string, maximum 4 character | text for the "off" label (default: labelOffTxt[language]) |

```html
<!-- example -->
<div class="switch" yoi-switch="state:on;">
    <input type="checkbox" />
</div>
<div class="switch" yoi-switch="showLabels:true;">
    <input type="checkbox" />
</div>
<div class="switch" yoi-switch="showLabels:true; labelOn:yes; labelOff:no;">
    <input type="checkbox" />
</div>
```

## Actions

### Switch.on

Pick a switch and set it to “on”:

```html
<!-- example:tabs -->
<div id="exampleSwitch-1" class="switch switch--large" yoi-switch>
    <input type="checkbox" />
</div>
<button class="button button--medium m-l-2" yoi-action="Switch.on:#exampleSwitch-1;">Switch On</button>
```

### Switch.off

Pick a switch and set it to “off”:

```html
<!-- example:tabs -->
<div id="exampleSwitch-2" class="switch switch--large" yoi-switch="state:on;">
    <input type="checkbox" />
</div>
<button class="button button--medium m-l-2" yoi-action="Switch.off:#exampleSwitch-2;">Switch Off</button>
```

### Switch.toggle

Pick a `.switch` and toggle it’s state between “on” and “off”:

```html
<!-- example:tabs -->
<div id="exampleSwitch-3" class="switch switch--large" yoi-switch>
    <input type="checkbox" />
</div>
<button class="button button--medium m-l-2" yoi-action="Switch.toggle:#exampleSwitch-3;">Switch Toggle</button>
```

### Custom Events

| event name       | fires when …            |
| ---------------- | ----------------------- |
| `yoi-switch-on`  | A switch was turned on  |
| `yoi-switch-off` | A switch was tuened off |
