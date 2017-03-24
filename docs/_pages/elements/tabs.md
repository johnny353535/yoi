---
layout: base
title: Tabs
permalink: elements/tabs
---

## Tabs
Yoshino tabs have some powerful features. You can choose from different layouts. You can define a start tab per tab group (by default, the first tab in the markup is the start tab). And since the JavaScript is modular, other scripts can use tab functions. For example if you use a scroll-to-anchor button and the target element is a (hidden) tab, the button will switch the target tab to visible.

| Less-File      | [tabs.less]({{ pathToSourceFile }}assets/less/elements/tabs.less)                       |
| JS-File        | [tabs.js]({{ pathToSourceFile }}assets/js/elements/tabs.js)                             |
| Base CSS-Class | `.tabs, .tabs__menu`                                                                    |
| Modifiers      | `.tabs__menu--large, .tabs__menu--subtle, .tabs__menu--checkmarks, .tabs__menu--arrows` |

### Basic Example
This is a basic example. Make sure to **add an #id to each tab** that you reference via the `.tabs__menu`.

```html
<div class="tabs" >
    <div class="tabs__menu" yoi-tabs>
        <ul class="tabs__items">
            <li class="tabs__item tabs__item is--active">
                <a class="tabs__link" href="#tab-1-1-a">Tab #1-a</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-1-2-a">Tab #2-a</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-1-3-a">Tab #3-a</a>
            </li>
        </ul>
    </div>
    <div id="tab-1-1-a" class="tabs__page">
        <p>Tab #1-a Content</p>
    </div>
    <div id="tab-1-2-a" class="tabs__page">
        <p>Tab #2-a Content</p>
    </div>
    <div id="tab-1-3-a" class="tabs__page">
        <p>Tab #3-a Content</p>
    </div>
</div>
```

### Fixed vs. Loose Layout
By default, all tabs take up the same with, like cells within in table row. However, if you wish the tabs to be only as wide as their content, there is a modifier for that: `.tabs__menu--loose`:

```html
<div class="tabs">
    <div class="tabs__menu tabs__menu--loose" yoi-tabs>
        <ul class="tabs__items">
            <li class="tabs__item tabs__item is--active">
                <a class="tabs__link" href="#tab-1-1-b">Tab #1-b</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-1-2-b">Tab #2-b</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-1-3-b">Tab #3-b</a>
            </li>
        </ul>
    </div>
    <div id="tab-1-1-b" class="tabs__page">
        <p>Tab #1-b Content</p>
    </div>
    <div id="tab-1-2-b" class="tabs__page">
        <p>Tab #2-b Content</p>
    </div>
    <div id="tab-1-3-b" class="tabs__page">
        <p>Tab #3-b Content</p>
    </div>
</div>
```

### Tabs with Large Buttons
Add the modifier `.tabs__menu--large` to the `.tabs__menu`.

```html
<div class="tabs">
    <div class="tabs__menu tabs__menu--large" yoi-tabs>
        <ul class="tabs__items">
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-2-1">Tab #1</a>
            </li>
            <li class="tabs__item tabs__item is--active">
                <a class="tabs__link" href="#tab-2-2">Tab #2</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-2-3">Tab #3</a>
            </li>
        </ul>
    </div>
    <div id="tab-2-1" class="tabs__page">
        <p>Tab #1 Content</p>
    </div>
    <div id="tab-2-2" class="tabs__page">
        <p>Tab #2 Content</p>
    </div>
    <div id="tab-2-3" class="tabs__page">
        <p>Tab #3 Content</p>
    </div>
</div>
```

### Subtle Tabs Menu
Use the modifier `.tabs__menu--subtle` to create a clean and subtle tab menu.

```html
<div class="tabs__menu tabs__menu--subtle" yoi-tabs>
    <ul class="tabs__items">
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-7-1">Tab #1</a>
        </li>
        <li class="tabs__item tabs__item is--active">
            <a class="tabs__link" href="#tab-7-2">Tab #2</a>
        </li>
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-7-3">Tab #3</a>
        </li>
    </ul>
</div>
<div id="tab-7-1" class="tabs__page">
    <p>Tab #1 Content</p>
</div>
<div id="tab-7-2" class="tabs__page">
    <p>Tab #2 Content</p>
</div>
<div id="tab-7-3" class="tabs__page">
    <p>Tab #3 Content</p>
</div>
```

### Check Marks
Add the modifier `.tabs__menu--checkmarks` to the `.tabs__menu` to display a check mark on each active tab link.

```html
<div class="tabs">
    <div class="tabs__menu tabs__menu--checkmarks tabs__menu--large" yoi-tabs>
        <ul class="tabs__items">
            <li class="tabs__item tabs__item is--active">
                <a class="tabs__link" href="#tab-6-1">Tab 1</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-6-2">Tab 2</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-6-3">Tab 3</a>
            </li>
        </ul>
    </div>
    <div class="tabs__page" id="tab-6-1">Tab 1</div>
    <div class="tabs__page" id="tab-6-2">Tab 2</div>
    <div class="tabs__page" id="tab-6-3">Tab 3</div>
</div>
```

### Scroll to Tab
Yoshino JavaScript is modular. This means, individual scripts expose some functions that other scripts can use. This allows you to use a scroll-to-anchor link to scroll to a target tab and switch it to visible.

```html
<div class="m-b-4">
    <a class="btn btn--large btn--rounded" href="#tab-4-3" yoi-scrollTo>Go to and show #tab-4-3</a>
</div>
<div class="tabs">
    <div class="tabs__menu tabs__menu--large" yoi-tabs>
        <ul class="tabs__items">
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-4-1">Tab #1</a>
            </li>
            <li class="tabs__item tabs__item is--active">
                <a class="tabs__link" href="#tab-4-2">Tab #2</a>
            </li>
            <li class="tabs__item">
                <a class="tabs__link" href="#tab-4-3">Tab #3</a>
            </li>
        </ul>
    </div>
    <div id="tab-4-1" class="tabs__page">
        <p>Tab #1 Content</p>
    </div>
    <div id="tab-4-2" class="tabs__page">
        <p>Tab #2 Content</p>
    </div>
    <div id="tab-4-3" class="tabs__page">
        <p>Tab #3 Content</p>
    </div>
</div>
```

### Arrow Tabs
Add the modifier `.tabs__menu--arrows` to the `.tabs__menu` to get an alternative layout. Combine it with large SVG icons to create prominent tabs.

```html
<div class="tabs__menu tabs__menu--arrows tabs__menu--large" yoi-tabs>
    <ul class="tabs__items">
        <li class="tabs__item tabs__item is--active">
            <a class="tabs__link" href="#tab-3a-1">Beschreibung</a>
        </li>
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-3a-2">Inhaltsstoffe</a>
        </li>
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-3a-3">Einnahme & Dosierung</a>
        </li>
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-3a-4">Bewertungen</a>
        </li>
    </ul>
</div>
<div class="tabs__page" id="tab-3a-1">Beschreibung</div>
<div class="tabs__page" id="tab-3a-2">Inhaltsstoffe</div>
<div class="tabs__page" id="tab-3a-3">Einnahme & Dosierung</div>
<div class="tabs__page" id="tab-3a-4">Bewertungen</div>
```

```html
<div class="tabs__menu tabs__menu--arrows tabs__menu--large" yoi-tabs>
    <ul class="tabs__items">
        <li class="tabs__item tabs__item is--active">
            <a class="tabs__link" href="#tab-3b-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><g fill="#1D1D1B"><path d="M30 35.001v-10.001000000000001h-7v4h3v6.001h-3v4h10v-4z"/><circle cx="28" cy="21" r="2.5"/></g><path fill="#1D1D1B" d="M33.5 10h-19v36h27v-28l-8-8zm0 3l5 5h-5v-5zm6 31h-23v-32h15v8h8v24z"/></svg>
                Beschreibung
            </a>
        </li>
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-3b-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><path fill="#1D1D1B" d="M43.5 46h-31c-.357 0-.688-.19-.866-.501-.179-.31-.178-.69.001-1l10.865-18.768v-8.731h-4c-.552 0-1-.448-1-1s.448-1 1-1h5c.552 0 1 .448 1 1v10c0 .176-.046.349-.135.501l-10.131 17.499h27.531l-10.13-17.499c-.088-.152-.135-.325-.135-.501v-10c0-.552.447-1 1-1h5c.553 0 1 .448 1 1s-.447 1-1 1h-4v8.731l10.865 18.768c.18.31.18.69.001 1-.178.311-.509.501-.866.501zM31.657 31.791s-1.76 1.201-3.658 0-3.193-.796-3.657 0l-5.947 10.209h19.211l-5.949-10.209z"/><circle fill="#1D1D1B" cx="29.5" cy="29.5" r="1.5"/><circle fill="#1D1D1B" cx="27" cy="26" r="1"/><circle fill="#1D1D1B" cx="29" cy="18" r="1"/></svg>
                Inhaltsstoffe
            </a>
        </li>
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-3b-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><path fill="#1D1D1B" d="M28.236 13.085c0-.126-.104-.227-.235-.227s-.236.101-.236.227c-1.544 8.01-10.265 14.993-10.265 23.692 0 5.799 4.701 10.5 10.5 10.5s10.5-4.701 10.5-10.5c0-8.699-8.721-15.682-10.264-23.692zm-1.236 31.807c-.552 0-1-.447-1-1s.448-1 1-1c3.859 0 7-3.141 7-7 0-.553.447-1 1-1s1 .447 1 1c0 4.962-4.037 9-9 9z"/></svg>
                Einnahme & Dosierung
            </a>
        </li>
        <li class="tabs__item">
            <a class="tabs__link" href="#tab-3b-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><path fill="#1D1D1B" d="M28 12.715l4.131 12.714h13.369l-10.815 7.858 4.13 12.713-10.815-7.857-10.815 7.857 4.13-12.713-10.815-7.858h13.369z"/></svg>
                Bewertungen
            </a>
        </li>
    </ul>
</div>
<div class="tabs__page" id="tab-3b-1">Beschreibung</div>
<div class="tabs__page" id="tab-3b-2">Inhaltsstoffe</div>
<div class="tabs__page" id="tab-3b-3">Einnahme & Dosierung</div>
<div class="tabs__page" id="tab-3b-4">Bewertungen</div>
```