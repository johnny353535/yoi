---
layout: base
group: actions
title: Hide
permalink: actions/hide
---

# Hide

<p class="intro">Use this action to hide an element.</p>

| Js-File | [hide.js]({{ pathToSourceFile }}assets/js/actions/hide.js) |

## Basic Example

Use `yoi-action="Hide:CssSelector;"` to hide an element:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Hide:#exampleContainer;">Hide Example</button>
<div id="exampleContainer" class="box p-4 m-t-4">
    <p class="fs-15">Hello.</p>
</div>
```

## Parameters

| parameter | description                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------- |
| on        | optional – Any valid event ([learn more](actions/index.html#the-on-parameter)). The default is `click`. |