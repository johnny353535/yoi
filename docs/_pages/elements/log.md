---
layout: base
group: elements
title: Log
permalink: elements/log
---

# Log

Use this element to log short messages in reverse-order.

| Styles         | [log.less]({{ pathToSourceFile }}assets/less/elements/log.less) |
| Script         | [log.js]({{ pathToSourceFile }}assets/js/elements/log.js)       |
| Base CSS-Class | `.log`                                                          |
| Modifiers      | `.log--tl, .log--tr, .log--br, .log--bl`                        |

<p class="hint"><b>For Documentation Only:</b> By itself, this element is pretty useless. It’s designed to monitor output in code documentation, driven by it’s simple JavaScript API.</p>

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
<div class="log log--br" yoi-dismissable>
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
 *  @param {jQuery dom object} $log
 *  @param {string | html}     logInput - the content, appended to the log
 */

YOI.element.Log.write($('#myLog'), 'my message');
```

<p class="hint"><b>Formatting:</b> You can write simple strings or fully formatted HTML to the log. However, this rarely makes much sense.</p>

### clear()

Use this function to add a message to the `.log`.

```js
/**
 *  @param {jQuery dom object} $log
 */

YOI.element.Log.clear($('#myLog'));
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
<div class="btns m-t-4">
    <button id="logBtn-write" class="btn btn--large br-tl-0">Fill the Log</button>
    <button id="logBtn-clear" class="btn btn--large br-tr-0">Clear the Log</button>
</div>

<!-- JavaScript -->
<script>
    
    // log some messages
    
    YOI.element.Log.write($('#exampleLog-1'), '<br /><span class="tc-blue-15">response</span> = {<br />&nbsp;&nbsp;&nbsp;&nbsp;"key one" : <span class="tc-yellow-15">"value one"</span>,<br />&nbsp;&nbsp;&nbsp;&nbsp;"key two" : <span class="tc-yellow-15">"value two"</span><br />}');
    YOI.element.Log.write($('#exampleLog-1'), 'one');
    YOI.element.Log.write($('#exampleLog-1'), 'two');
    YOI.element.Log.write($('#exampleLog-1'), 'three');
    
    // attach clear-funtion to #logBtn-clear
    
    $('#logBtn-clear').on('click', function() {
        YOI.element.Log.clear($('#exampleLog-1'));
    });
    
    // attach fill-function to #logBtn-write
    
    $('#logBtn-write').on('click', function() {
        YOI.element.Log.write($('#exampleLog-1'), 'some text');
    });
    
</script>
```