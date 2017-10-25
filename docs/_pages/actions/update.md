---
layout: base
group: actions
title: Update
permalink: actions/update
---

# Update

<p class="intro">Injects remote content into any target element.</p>

## Example

Use `yoi-action="Update:'#targetElementSelector'; url:'https://someAdress.com';"` to request data and inject it into the target element.

In the following example, each button calls the _action_ `Update` to load different content into the example container below. The last button points to an invalid address and therefore demonstrates an error message:

```html
<!-- example -->
<div class="btns">
    <button class="btn btn--large" yoi-action="Update:'#example-1'; url:'demos/ajaxSource-1.html';">What is Valium?</button>
    <button class="btn btn--large" yoi-action="Update:'#example-1'; url:'demos/ajaxSource-2.html';">What is Strychnine?</button>
    <button class="btn btn--large" yoi-action="Update:'#example-1'; url:'demos/ajaxSource-xyz.html';">42?</button>
</div>
<div id="example-1" class="pos-rel m-t-4">
    <div class="p-4 b-dashed bc-base-22 bw-1 br">
        <p class="fs-2">Response goes here …</p>
    </div>
</div>
```
<p class="hint hint--primary"><b>Parent and Self</b> Use the keyword <code>parent</code> to target the parent (=sourrounding) element. Use the keyword <code>self</code> to target the element itself.</p>

## Parameters

| `on`      | Optional – a valid event ([learn more](actions/index.html#the-on-parameter)). The default event is `click`.    |
| `trigger` | Optional – the trigger element to listen to ([learn more](actions/index.html#the-trigger-parameter)).          |
| `url`     | **Required** – the URL for the update request                                                                  |
| `type`    | Optional – the request type `POST` or `GET`. The default is `GET`.                                             |
| `filter`  | Optional – CSS selector to filter an element from the response HTML. The default selector is `#yoi-update-src` |

### Filter

Add the filter parameter to select elements from the response markup. If the selector does not match anything, the whole response markup gets returned. The default selector is `#yoi-update-src`.