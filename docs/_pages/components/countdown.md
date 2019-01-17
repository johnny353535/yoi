---
layout: base
group: components
title: Countdown
permalink: components/countdown
---

# Countdown

<p class="intro">Countdown to a future date less than a year ahead – rendered as a lcd-style clock, yet fully accessible via screen readers.</p>

## Basic Example

This is how a basic `.countdown` looks like and how you write the markup:

```html
<!-- example -->
<div class="countdown" yoi-countdown="year:{{ 'now' | date: "%Y" }}; month:12; day:31;"></div>
```

<p class="hint hint--negative"><b>Limitations</b> Please notice that while the countdown was <i>designed to count down to an event less than 12 months in the future</i>.</p>

## Expired Countdown

Once the countdown expired, the display resets and the *custom event* `yoi-countdown-expire` fires.

```html
<!-- example -->
<div class="countdown" yoi-countdown="year:2001; month:12; day:31; hour:15;"></div>
```

## Progressive Enhancement, Accessibility & Fallback

Each lcd-style digit is an svg graphic. To make the countdown more accessible by default, the script inserts a visually hidden label with a well-readable string, representing the remaining time. However, it’s a good idea to always include this label to provide a meaningful noScript-fallback:

```html
<!-- example -->
<div class="countdown" yoi-countdown="year:{{ 'now' | date: "%Y" }}; month:12; day:31; hour:15;">
    <p class="hidden">Expires on December 31st {{ 'now' | date: "%Y" }} at 15:00 GMT+0002.</p>
</div>
```
