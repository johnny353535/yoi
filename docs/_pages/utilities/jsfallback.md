---
layout: base
group: utilities
title: JsFallback
permalink: utilities/jsfallback
---

# JavaSript Fallback

<p class="intro">Hide or show elements depending on enabled JavaScript.</p>

| `.js-fallback` | Hides an element when JavaScript isn’t enabled, like `<noscript></noscript>`. |
| `.js-only`     | Shows an element only when JavaScript is enabled.                             |

## Example

```html
<!-- example -->
<div class="js-fallback">
    <p class="c-negative-15">No JavaScript.</p>
</div>
<div class="js-only">
    <div class="br-all w-2 h-2 bg-purple-17"></div>
</div>
<script>
    $(function() {
        $('.js-only').first()
            .fadeIn('slow')
            .animate({ marginLeft: 200 }, 1000)
            .animate({ marginLeft: 0 },   1000)
            .fadeOut('slow', arguments.callee);
    });
</script>
```