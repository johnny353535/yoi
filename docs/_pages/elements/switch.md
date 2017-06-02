---
layout: base
group: elements
title: Switch
permalink: elements/switch
---

## Switch

Use this element to display animated binary switch buttons.

| Styles         | [switch.less]({{ pathToSourceFile }}assets/less/elements/switch.less) |
| Base CSS-Class | `.switch`                                                             |
| Script Hook    | `yoi-switch`                                                          |
| Modifiers      | `.switch--large`                                                      |

### Basic Example

This is how a basic `.switch` looks like and how you write the markup:

```html
<!-- example -->
<div class="switch" yoi-switch>
    <input type="checkbox" />
</div>
```

<p class="hint"><b>Accessability:</b> The <code>.switch</code> element is accessible by design since it’s just a wrapper around a standard <code>input type="radio"</code> element. So when JavaScript is disabled, it provides a graceful and accessible fallback.</p>

### Modifiers

#### Large

Use the modifier `.switch--large` to increase the size:

```html
<!-- example -->
<div class="switch switch--large" yoi-switch>
    <input type="checkbox" />
</div>
```

### Options

### JavaScript API

### Events