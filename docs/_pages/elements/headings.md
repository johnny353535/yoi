---
layout: base
group: elements
title: Headings
permalink: elements/headings
---

# Headings

These are the headline-styles you can use in your documents.

| Styles | [headings.less]({{ pathToSourceFile }}assets/less/elements/headings.less) |

## Example

These are all available headline styles. Please note that level 4–6 have identical styling.

```html
<!-- example -->
<h1>Heading Level 1</h1>
<h2>Heading Level 2</h2>
<h3>Heading Level 3</h3>
<h4>Heading Level 4</h4>
<h5>Heading Level 5</h5>
<h6>Heading Level 6</h6>
```

## Modification

Headings do not have their own modifiers classes. Use [YOI Utility Classes](utilities/) to make modifications:

```html
<!-- example -->
<h1 class="fw-normal">Thin Heading Level 1</h1>
<h2 class="tc-green-15 al-c">Green, centered Heading Level 2</h2>
<h3 class="tc-blue-15 al-r">Blue, right-aligned Heading Level 2</h3>
```