---
layout: base
group: elements
title: Log
permalink: elements/log
---

## Log
<p class="hint hint--error">No documentation yet.</p>

```html
<!-- example -->
<div id="myLog" class="log" yoi-log>
    <div class="log__body"></div>
</div>
<script>
    YOI.element.Log.write($('#myLog'), 'foo');
    YOI.element.Log.write($('#myLog'), 'bar');
    YOI.element.Log.write($('#myLog'), 'baz');
    YOI.element.Log.write($('#myLog'), 'boo');
</script>
```