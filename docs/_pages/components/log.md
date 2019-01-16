---
layout: base
group: components
title: Log
permalink: components/log
status: draft
---

# Log

<p class="intro">Logs short messages in reverse-order.</p>
<p class="hint hint--primary"><b>For Documentation Only:</b> By itself, this element is pretty useless. It’s designed to monitor output in code documentation, driven by it’s simple JavaScript API.</p>

## Basic Example

This is how a basic `.log` looks like and how you write the markup:

```html
<!-- example -->
<div class="log">
    <div class="log__body">
        <p>Ready</p>
    </div>
</div>
```

## Modifiers

### Color

Add the modifier `.log--light` to render a `.log` with a lighter color scheme:

```html
<!-- example -->
<div class="log log--light">
    <div class="log__body">
        <p></p>
    </div>
</div>
```

### Position

Add one of the four modifiers (`.log--tl`, `.log--tr`, `.log--br`, `.log--bl`) to *pin* a `.log` to one of the four corners of the viewport. The resulting `.log` is one line heigh and expands on mouse-over. The following code renders the example you should see in the bottom right corner of this page:

```html
<!-- example -->
<div class="log log--br" yoi-dismiss>
    <div class="log__body">
        <p></p>
    </div>
</div>
```

## JavaScript API

This element makes sense as soon as you start interacting with it through it’s JavaScript API. It’s designed for code documentation. For example, you could write to the log whenever a custom event is fired. All messages are displayd in **reverse-order** with the latest message always on top.

### write()

Use this function to add a message to the `.log`.

```js
/**
 *  @param {jQuery element} $log
 *  @param {string | html}     logInput - the content, appended to the log
 */

YOI.component.Log.write($('#myLog'), 'my message');
```

<p class="hint"><b>Formatting:</b> You can write simple strings or fully formatted HTML to the log. However, this rarely makes much sense.</p>

### clear()

Use this function to add a message to the `.log`.

```js
/**
 *  @param {jQuery element} $log
 */

YOI.component.Log.clear($('#myLog'));
```

### Demo

Take a look at the code for this example to get an idea how to use the `.log`:

```html
<!-- example:tabs -->
<!-- markup for log -->
<div id="exampleLog-1" class="log br-br-0">
    <div class="log__body"></div>
</div>

<!-- markup for buttons -->
<div class="buttons m-t-4">
    <button id="logButton-write" class="button button--large br-tl-0">Fill the Log</button>
    <button id="logButton-clear" class="button button--large br-tr-0">Clear the Log</button>
</div>

<!-- JavaScript -->
<script>

    // log some messages

    YOI.component.Log.write($('#exampleLog-1'), '<br /><span class="c-blue-15">response</span> = {<br />&nbsp;&nbsp;&nbsp;&nbsp;"key one" : <span class="c-yellow-15">"value one"</span>,<br />&nbsp;&nbsp;&nbsp;&nbsp;"key two" : <span class="c-yellow-15">"value two"</span><br />}');
    YOI.component.Log.write($('#exampleLog-1'), 'one');
    YOI.component.Log.write($('#exampleLog-1'), 'two');
    YOI.component.Log.write($('#exampleLog-1'), 'three');

    // attach clear-funtion to #logButton-clear

    $('#logButton-clear').on('click', function() {
        YOI.component.Log.clear($('#exampleLog-1'));
    });

    // attach fill-function to #logButton-write

    $('#logButton-write').on('click', function() {
        YOI.component.Log.write($('#exampleLog-1'), 'some text');
    });

</script>
```
