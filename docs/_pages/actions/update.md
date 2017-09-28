---
layout: base
group: actions
title: Update
permalink: actions/update
---

# Update

<p class="intro">Use this action to request remote content and inject it into any target element.</p>

## Basic Example

Use `yoi-action="Update:CssSelector; url:'https://someAdress.com';"` to request data and inject it into the target element.

In the following example, each button calls the _action_ `Update` to load different content into the example container below. The last button points to an invalid address and therefore demonstrates an error message:

```html
<!-- example -->
<div class="btns">
    <button class="btn btn--large" yoi-action="Update:#exampleContainer; url:demos/ajaxSource-1.html;">What is Valium?</button>
    <button class="btn btn--large" yoi-action="Update:#exampleContainer; url:demos/ajaxSource-2.html;">What is Strychnine?</button>
    <button class="btn btn--large" yoi-action="Update:#exampleContainer; url:demos/ajaxSource-xyz.html;">42?</button>
</div>
<div id="exampleContainer" class="pos-rel m-t-4">
    <div class="p-4 b-dashed bc-main-20 bw-1 br">
        <p class="fs-2">Response goes here …</p>
    </div>
</div>
```

## Parameters

| `on`   | optional – Any valid event ([learn more](actions/index.html#the-on-parameter)). The default is `click`. |
| `url`  | required – The url for the ajax request                                                                 |
| `type` | optional – The request type `POST` or `GET`. The default is `GET`.                                      |