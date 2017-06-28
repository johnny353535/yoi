---
layout: base
group: actions
title: Update
permalink: actions/update
---

## Update

<p class="intro">This script provides a simple interface to post to a given endpoint (eg. some backend script) and inject the retrieved markup back into the document.</p>

| Js-File | [update.js]({{ pathToSourceFile }}assets/js/modules/update.js) |
| Hooks   | `yoi-update`                                                   |

### Simple Example

```html
<!-- example -->
<div class="btns">
    <button class="btn btn--large" yoi-action="Update:#container; url:demos/ajaxSource-1.html;">What is Valium?</button>
    <button class="btn btn--large" yoi-action="Update:#container; url:demos/ajaxSource-2.html;">What is Strychnine?</button>
    <button class="btn btn--large" yoi-action="Update:#container; url:demos/ajaxSource-xyz.html;">Why 42?</button>
</div>
<div id="container" class="pos-rel m-t-4">
    <div class="p-4 b-ghost br">
        <p class="fs-15">Response goes here …</p>
    </div>
</div>
```
