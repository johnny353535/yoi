---
layout: base
group: elements
title: SearchPrompt
permalink: elements/searchprompt
---

# SearchPrompt

Use this element to create a prominent search input.

| Styles         | [searchPrompt.less]({{ pathToSourceFile }}assets/less/elements/searchPrompt.less) |
| Base CSS-Class | `.searchPrompt`                                                                   |

## Basic Example

This is how a basic `.searchPrompt` looks like and how you write the markup:

```html
<!-- example -->
<form class="searchPrompt">
    <input class="searchPrompt__input" type="text" />
    <input class="searchPrompt__button" type="submit" value="Search" />
    <span class="searchPrompt__icon"></span>
</form>
```