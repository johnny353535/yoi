---
layout: base
group: actions
title: ResetFx
permalink: actions/resetfx
---

# Reset Fx

<p class="intro">Resets Yoi fx-utility class names for an element.</p>

## Example

```html
<!-- example:tabs -->
<p class="btns m-b-1">
    <button class="btn btn--large" yoi-action="Show:#example-a; fx:fade-in; speed:fast;">Fade-In Fast</button>
    <button class="btn btn--large" yoi-action="ResetFx:#example-a; fx:fade-in;">Reset Fx</button>
</p>
<p>
    <span id="example-a" class="d-inlineblock br-all bg-base-23 w-10 h-10"></span>
</p>
```
