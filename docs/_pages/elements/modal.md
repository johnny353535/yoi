---
layout: base
group: elements
title: Modal
permalink: elements/modal
---

## Modal
Modals are simple, regular pages, referenced by either `href`-attributes or a path via a `yoi-modal`-attribute. Any element may reference a modal. Modals are loaded asynchronically (ajax) and injected into the dom.

| Less-File      | [modal.less]({{ pathToSourceFile }}assets/less/elements/modal.less) |
| JS-File        | [modal.js]({{ pathToSourceFile }}assets/js/elements/modal.js)       |
| Base CSS-Class | `.modal`                                                            |
| Modifiers      | `.modal--small`                                                     |

### Modal Page
Modal pages must at least have an element with the CSS-class `.modal`. Everything else is optional.
The following is an example for a typical modal page. You may want to <a href="demos/modal.html" target="_blank">open it in another browser tab</a>.

```html
<div class="h-30 p-tb-3">
    <div class="modal">
        <div class="modal__header">
            <h3 class="modal__title">Demo Modal</h3>
        </div>
        <div class="modal__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div class="modal__footer">
            <button class="btn btn--large btn--dark fl-r">OK</button>
            <span class="btn btn--large btn--subtle fl-r m-r-1" yoi-action="closeModal">Cancel</span>
        </div>
    </div>
</div>
```

### Modifiers
There is only one modifier available: `.modal--small`. It affects the modal width:

```html
<div class="h-28 p-tb-3">
    <div class="modal modal--small">
        <div class="modal__header">
            <h3 class="modal__title">Small Demo Modal</h3>
        </div>
        <div class="modal__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <div class="modal__footer">
            <button class="btn btn--large btn--dark fl-r">OK</button>
            <span class="btn btn--large btn--subtle fl-r m-r-1" yoi-action="closeModal">Cancel</span>
        </div>
    </div>
</div>
```

<p class="hint hint--attention"><b>Modals Are Regular Pages</b> YOI modals are regular html pages and therefore highly accessible. If a modal opens via JavaScript, the modal page is requested via AJAX and unnecessary markup is ignored (eg. the <code>&lt;body&gt;</code> tag).</p>
<p class="hint"><b>Where is the Close-Button?</b> You must not include a close button in your modal’s markup. Since it only makes sense when the modal opens via JavaScript, the script injects the close button for you.</p>

### Referencing a Modal Page
If you wish to reference to a modal page to show it as a modal, you need to apply the `yoi-modal` atribute to the trigger element (most likely a link).

```html
<a class="btn btn--large" href="demos/modal.html" yoi-modal>Show Demo Modal</a>
```

### Generate a Simple Modal

```html
<button class="btn btn--large" yoi-modal="generate:true; title:Generated Modal; body:This is a generated modal. It is really basic, there is not much you can do with this thing.; modifiers:modal--small;">Generate Modal</button>
```

In this most simple example, only two things are necessary: a valid link to a correctly formatted modal page and the `yoi-modal`-atribute.

### Options
Modal-links can have options. In fact, you may use any element to refer to a modal, as long as you provide a valid modal path:

```html
<span yoi-modal="path:demos/modal.html;">Show Demo Modal</span>
```

Option are written as **semicolon-seperated key/value pairs**:

```
path:desktop/pages/modal_demo.html; cache:true; …
```

#### Available options

| Key | Value | Description |
| - | - | - |
| id    | id-selector as *string*, eg. `#modal-test`| To reference modals internally, this script uses generated ids, which may be overridden by this option. |
| path  | valid path to modal page as *string*, eg. `pages/modal_test.html` | Any element can be linked to a modal. If it's not a link or a link with a href that does not link to a modal, the modal path may be overridden by this option. |
| cache | *boolean* true/false | If set to true, the referenced modal will preload in the background. |

### Modals to External Pages

<p class="hint hint--error"><b>Modals Must Not Load External Pages</b> The modals are not designed to reference external pages. Apart from the fact that <em>http:</em> breaks the option-notation, it is not desired to load external pages (and possibly injected scripts) we have no control over into our environment.</p>

### Errors / Fallback
If you reference a modal page that is either ill-formatted, isn’t a modal page or simply does not exist, the modal won’t be shown.
Instead, if the trigger element is a link, it will fall back to it’s default behaviour (open the location provided via `href`-attribute, even if the page does not exist). If the trigger element is not a link (modal path via `yoiyoi-ons`-attribute), nothing will happen on click.
