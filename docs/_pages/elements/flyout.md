---
layout: base
group: elements
title: Flyout
permalink: elements/flyout
---

## Flyout
Use this element to display a small tab and text label that is pinned to either the left or right side of the screen and displays a small panel on click. You should **use only one flyout per page** and **only for important information** (such as feedback / help / contact links) since the sticky labels on the side of the screen appera rather prominent to the user. This element was **designed for large screens only** and should not be used on mobile pages.

| Less-File      | [flyout.less]({{ pathToSourceFile }}assets/less/elements/flyout.less) |
| JS-File        | [flyout.js]({{ pathToSourceFile }}assets/js/elements/flyout.js)       |
| Base CSS-Class | `.flyout`                                                             |
| Modifiers      | `.flyout--left, .flyout--right`                                       |

### Basic Example
A flyout **can contain any content**. Since it’s a very prominent element on any page, use it very sparely and only where it makes sense. A perfectly valid scenario would be a flyout as a contact or feedback panel.

```html
<div class="flyout" yoi-flyout>
    <h2 class="flyout__handle">Click Me</h2>
    <div class="flyout__body">
        <h3 class="ff-ss">This is an Example Flyout</h3>
        <p class="fs-15 lh-20 m-tb-4">Use this element to display relevant information like contact links or such.</p>
        <a href="#" class="btn btn--large d-blk w-1-1 m-b-2">
            <i aria-hidden="true" class="icon--021"></i>
            <span>Call-Back</span>
        </a>
        <a href="#" class="btn btn--large d-blk w-1-1">
            <i aria-hidden="true" class="icon--038"></i>
            <span>E-Mail</span>
        </a>
    </div>
</div>
```

### Modifiers
There are two modifiers available (`.flyout--left, .flyout--right`) to either **stick the flyout to the left or to the right side of the screen**. In the example above, neither `.flyout--left` nor `flyout--right` was used, still the flyout sits on the left side of the screen. **Left is the default position**, the modifier class got added since no position was defined.

### Position in DOM
To correctly position the flyout (to »pin« it while scrolling), `position:fixed` is applied. Since unexpected positioning are likely to occur due to the flyout’s position in the DOM, each flyout gets removed from it’s current position an re-injected at the end of the `body`. This means **you do not have to care where in your markup you put the flyout**.

### NoScript / Fall Back
If JavaScript is not available, the flyout is a simple box and remains at it’s position in the DOM.