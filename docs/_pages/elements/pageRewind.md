---
layout: base
group: elements
title: PageRewind
permalink: elements/pagerewind
---

# PageRewind

Use this element to create a _scroll-to-top-button_ at the bottom of a page.

| Styles         | [accordion.less]({{ pathToSourceFile }}assets/less/elements/accordion.less) |
| Script         | [accordion.js]({{ pathToSourceFile }}assets/js/elements/accordion.js)       |
| Script Hook    | `yoi-accordion`                                                             |
| Base CSS-Class | `.accordion`                                                                |
| Modifiers      | `-`                                                                         |

## Usage

The element is created and injected into the page via JavaScript. If you wish to add a `.pageRewind` to a specific page, add the attribute `yoi-pagerewind` to the `<body>`:

```html
<body yoi-pagerewind> … </body>
```

You can see the element in action on this page.

## JavaScript-API

### run()

If you wish to scroll the page back to top via JavaScript, you can do so by calling this function:

```js
YOI.element.PageRewind.run();
```

### Custom Events

`.pageRewind` fires custom events your script can listen to:

```
yoi-pagerewind:start
yoi-pagerewind:stop
```

Try it out and see the events logged here:

```html
<!-- example:tabs -->
<div id="myLog" class="log log--light m-b-4" yoi-log>
    <div class="log__body">
        <p>Listening</p>
    </div>
</div>
<button id="exampleBtn" class="btn btn--large">Scroll to top</button>
<script>
    $('#exampleBtn').on('click', function() {
        YOI.element.PageRewind.run();
    });
    $(document).on('yoi-pagerewind:start', function() {
        YOI.element.Log.write($('#myLog'), 'yoi-pagerewind:start');
    });
    $(document).on('yoi-pagerewind:stop', function() {
        YOI.element.Log.write($('#myLog'), 'yoi-pagerewind:stop');
    });
</script>
```