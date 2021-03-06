---
layout: base
group: components
title: Modal
permalink: components/modal
status: draft
---

# Modal

<p class="intro">A small window, overlaying and blocking the rest of the page.</p>

## Basic Example

Tis is how a basic modal looks like and how ou write the markup:

```html
<!-- example -->
<a class="button button--large" href="{{ site.github.url }}/demos/modal.html" yoi-modal>Open demos/modal.html as Modal</a>
```

## Modal Pages

YOI modals are designed to be regular pages, referenced, optionally preloaded and injected into the page. Modal pages must at least have an element with the CSS-class `.modal`.

The following is an example for a typical modal markup. You may want to <a href="{{ site.github.url }}/demos/modal.html" target="_blank">open it in another browser tab</a> to

```html
<!-- example -->
<div class="modal">
    <div class="modal__header">Demo Modal</div>
    <div class="modal__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    <div class="modal__footer">
        <button class="button button--dark button--flat fl-r">Do Something</button>
        <span class="button button--light button--flat fl-r m-r-1" yoi-action="closeModal">Cancel</span>
    </div>
</div>
```

## Modifiers

There is only one modifier available: `.modal--small`. It affects the modal width:

```html
<!-- example -->
<div class="modal modal--small">
    <div class="modal__header">Small Demo Modal</div>
    <div class="modal__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
    </div>
    <div class="modal__footer">
        <button class="button button--dark button--flat fl-r">Do Something</button>
        <span class="button button--light button--flat fl-r m-r-1" yoi-action="closeModal">Cancel</span>
    </div>
</div>
```

<p class="hint hint--primary"><b>Modals Are Regular Pages</b> YOI modals are regular html pages and therefore highly accessible. If a modal opens via JavaScript, the modal page is requested via AJAX and unnecessary markup is ignored (eg. the <code>&lt;body&gt;</code> tag).</p>
<p class="hint hint--primary"><b>Where is the Close-Button?</b> You must not include a close button in your modal’s markup. Since it only makes sense when the modal opens via JavaScript, the script injects the close button for you.</p>

## Referencing a Modal Page

If you wish to reference to a modal page to show it as a modal, you need to apply the `yoi-modal` atribute to the trigger element (most likely a link).

```html
<a class="button button--large" href="{{ site.github.url }}/demos/modal.html" yoi-modal>Show Demo Modal</a>
```

In this most simple example, only two things are necessary: a valid link to a correctly formatted modal page and the `yoi-modal`-atribute.

## Generate a Simple Modal

Use the option `generate:true` to generate modals on the fly (instead of referring modal pages). Add title and body text with `title:` and `body:` like in the following example:

```html
<!-- example -->
<button class="button button--large" yoi-modal="generate:true; title:Generated Modal; body:This is a generated modal. Lorem ipsum dolor sit amet, consectetur adipisicing.; modifiers:modal--small;">Generate Small Modal With Title</button>
<button class="button button--large" yoi-modal="generate:true; body:This is a generated modal without title. Lorem ipsum dolor sit amet, consectetur adipisicing.; modifiers:modal--small;">Generate Small Modal</button>
```

## Options

Modal-links can have options. In fact, you may use any element to refer to a modal, as long as you provide a valid modal path:

```html
<span yoi-modal="path:{{ site.github.url }}/demos/modal.html;">Show Demo Modal</span>
```

Option are written as **semicolon-seperated key/value pairs**:

```
path:desktop/pages/modal_demo.html; cache:true; …
```

### Available options

| Key | Value | Description |
| - | - | - |
| id    | id-selector as *string*, eg. `#modal-test`| To reference modals internally, this script uses generated ids, which may be overridden by this option. |
| path  | valid path to modal page as *string*, eg. `pages/modal_test.html` | Any element can be linked to a modal. If it's not a link or a link with a href that does not link to a modal, the modal path may be overridden by this option. |
| cache | *boolean* true/false | If set to true, the referenced modal will preload in the background. |

## Modals from External Sites

<p class="hint hint--negative"><b>Modals Must Not Load Pages from external sites</b> The modals are not designed to reference external pages. It is not a good idea to load recources pages (and possibly injected scripts) you might not have no control over.</p>

## Errors / Fallback

If you reference a modal page that is either ill-formatted, isn’t a modal page or simply does not exist, the modal won’t show.
Instead, if the trigger element is a link, it will fall back to it’s default behavior (open the location provided via `href`-attribute, even if the page does not exist). If the trigger element is not a link (modal path via `yoi`-attribute), nothing will happen on click.
