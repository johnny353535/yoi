---
layout: base
group: elements
title: Countdown
permalink: elements/countdown
---

## Countdown
Use this element to create a countdown to a future date less than a year ahead. The countdown is rendered as a lcd-style clock, yet fully accessible via screen readers.

| Styles         | [countdown.less]({{ pathToSourceFile }}assets/less/elements/countdown.less) |
| Script         | [countdown.js]({{ pathToSourceFile }}assets/js/elements/countdown.js)       |
| Base CSS-Class | `.countdown`                                                                |
| Modifiers      | `-`                                                                         |

### Basic Example
This is how a basic `.countdown` looks like and how you write the markup:

```html
<!-- example -->
<div class="countdown" yoi-countdown="year:{{ 'now' | date: "%Y" }}; month:12; day:31;"></div>
```

<p class="hint hint--error"><b>Limitations</b> Please notice that while the countdown was <i>designed to count down to an event less than 12 months in the future</i>.</p>

### Countdown With Optional Title
Add an element with the css class name `countdown__title` to add an optional title.

```html
<!-- example -->
<div class="countdown" yoi-countdown="year:{{ 'now' | date: "%Y" }}; month:12; day:31; hour:15;">
    <p class="countdown__title">Time Until Takeoff:</p>
</div>
```

### Expired Countdown
Once the countdown expired, the display will reset and the *custom event* `countdown:expired` *will fire* (JavaScript).

```html
<!-- example -->
<div class="countdown" yoi-countdown="year:2001; month:12; day:31; hour:15;"></div>
```

### Progressive Enhancement, Accessibility & Fallback
Each lcd-style digit is an svg graphic. To make the countdown more accessible by default, the script inserts a visually hidden label with a well-readable string, representing the remaining time. However, it’s a good idea to always include this label to provide a meaningful noScript-fallback:

```html
<!-- example -->
<div class="countdown" yoi-countdown="year:{{ 'now' | date: "%Y" }}; month:12; day:31; hour:15;">
    <p class="hidden">Expires on December 31st {{ 'now' | date: "%Y" }} at 15:00 GMT+0002.</p>
</div>
```

Once the script is executed, the label gets replaced and updates every second:

```html
<!-- example -->
<div class="countdown" yoi-countdown="year:{{ 'now' | date: "%Y" }}; month:12; day:31; hour:15;">
    <p class="hidden">Expires on January 1st, {{ 'now' | date: "%Y" }} at 15:00 GMT+0002</p>
</div>
```
