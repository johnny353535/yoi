---
layout: base
group: actions
title: Show
permalink: actions/show
---

# Show

<p class="intro">Use this action to show an invisible element.</p>

| Js-File | [show.js]({{ pathToSourceFile }}assets/js/actions/show.js) |

## Basic Example

Use `yoi-action="Show:CssSelector;"` to show an invisible element. To render the element invisible, you need to apply the [utility-class](utiities/visibility.html) `.jsHidden` first:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Show:#exampleContainer;">Show Example</button>
<div id="exampleContainer" class="box p-4 m-t-4 jsHidden">
    <p class="fs-15">Boo.</p>
</div>
```

## Parameters

| parameter | description                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------- |
| on        | optional – Any valid event ([learn more](actions/index.html#the-on-parameter)). The default is `click`. |