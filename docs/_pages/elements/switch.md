---
layout: base
group: elements
title: Switch
permalink: elements/switch
---

# Switch

Use this element to display animated binary switch buttons.

| Styles         | [switch.less]({{ pathToSourceFile }}assets/less/elements/switch.less) |
| Base CSS-Class | `.switch`                                                             |
| Script Hook    | `yoi-switch`                                                          |
| Modifiers      | `.switch--large`                                                      |

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

## JavaScript API

### Hook

| Key | Value | Description |
| - | - | - |
| state      | "on"/"off" | a keyword to set the switch to "on" or "off" |
| showLabels | true / false | if "true", labels are added |
| labelOn    | string, maximum 4 characters | text for the "on" label (default: labelOnTxt[language]) |
| labelOff   | string, maximum 4 character | text for the "off" label (default: labelOffTxt[language]) |

```html
<!-- example -->
<div class="switch" yoi-switch="state:on">
    <input type="checkbox" />
</div>
<div class="switch" yoi-switch="showLabels:true">
    <input type="checkbox" />
</div>
<div class="switch" yoi-switch="showLabels:true; labelOn:yes; labelOff:no;">
    <input type="checkbox" />
</div>
```

### Methods

#### on()

Pick a switch and set it to “on”:

```html
<!-- example:tabs -->
<div id="exampleSwitch-1" class="switch switch--large" yoi-switch>
    <input type="checkbox" />
</div>
<button id="exampleButton-1" class="btn btn--medium m-l-2">Switch on</button>
<script>
    $('#exampleButton-1').on('click', function() {
        YOI.element.Switch.on($('#exampleSwitch-1'));
    });
</script>
```

#### off()

Pick a switch and set it to “off”:

```html
<!-- example:tabs -->
<div id="exampleSwitch-2" class="switch switch--large" yoi-switch="state:on">
    <input type="checkbox" />
</div>
<button id="exampleButton-2" class="btn btn--medium m-l-2">Switch off</button>
<script>
    $('#exampleButton-2').on('click', function() {
        YOI.element.Switch.off($('#exampleSwitch-2'));
    });
</script>
```

#### toggle()

Pick a `.switch` and toggle it’s state between “on” and “off”:

```html
<!-- example:tabs -->
<div id="exampleSwitch-3" class="switch switch--large" yoi-switch>
    <input type="checkbox" />
</div>
<button id="exampleButton-3" class="btn btn--medium m-l-2">Toggle switch</button>
<script>
    $('#exampleButton-3').on('click', function() {
        YOI.element.Switch.toggle($('#exampleSwitch-3'));
    });
</script>
```

### Custom Events

Each `.switch` fires custom events your script can listen to:

```
yoi-switch:on  // switched on
yoi-switch:off // switched off
```

Try the example below and watch the custom events, printed to the [log element](elements/log.html):

```html
<!-- example:tabs -->
<div id="myLog" class="log log--light m-b-4" yoi-log>
    <div class="log__body">
        <p>Listening</p>
    </div>
</div>
<div id="mySwitch" class="switch switch--large" yoi-switch>
    <input type="checkbox" />
</div>
<script>
    $('#mySwitch').on('yoi-switch:on', function() {
        YOI.element.Log.write($('#myLog'), 'yoi-switch:on');
    });
    $('#mySwitch').on('yoi-switch:off', function() {
        YOI.element.Log.write($('#myLog'), 'yoi-switch:off');
    });
</script>
```