---
layout: base
group: interface
title: Update
permalink: interface/update
---

## Update
This script provides a simple interface to post to a given endpoint (eg. some backend script) and inject the retrieved markup back into the document.

| Js-File | [update.js]({{ pathToSourceFile }}assets/js/modules/update.js) |
| Hooks   | `yoi-update`                                                   |

### Simple Example

```html
<!-- example -->
<div class="btns">
    <button class="btn btn--large" yoi-update="url:demos/ajaxSource-1.html;target:#container;">What is Valium?</button>
    <button class="btn btn--large" yoi-update="url:demos/ajaxSource-2.html;target:#container;">What is Strychnine?</button>
    <button class="btn btn--large" yoi-update="url:demos/ajaxSource-xyz.html;target:#container;">Why 42?</button>
</div>
<div id="container" class="pos-rel m-t-4">
    <div class="p-4 b-ghost br">
        <p class="fs-15">Response goes here …</p>
    </div>
</div>
```
