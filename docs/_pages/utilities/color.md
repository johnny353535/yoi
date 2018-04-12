---
layout: base
group: utilities
title: Color
permalink: utilities/color
srcfiles:
    - color-base.less
    - color-interactive.less
---

# Color

<p class="intro">Adds or overrides background-, border- and text-color.</p>

## Palette

Colors can be put in two groups: *semantic colors* (colors with *meaning*) and *unsemantic colors* (decorative colors without particular meaning). Technically, each color can have up to 256 shades. By default the shades range from `0` (darkest) to `25` (lightest).

### Semantic Colors

Each of the 5 default semantic colors has a particular meaning and is ideally reserved for particular purpose throughout your design:

<table>
    <tr>
        <th class="w-5">Sample</th>
        <th>Name</th>
        <th>Meaning/Purpose</th>
    </tr>
    <tr>
        <td class="bg-base-15"></td>
        <td><code>base</code></td>
        <td>for base text and border colors</td>
    </tr>
    <tr>
        <td class="bg-primary-15"></td>
        <td><code>primary</code></td>
        <td>to mark primary elements like action buttons or to add visual accent</td>
    </tr>
    <tr>
        <td class="bg-attention-15"></td>
        <td><code>attention</code></td>
        <td>for hints or helpful messages</td>
    </tr>
    <tr>
        <td class="bg-negative-15"></td>
        <td><code>negative</code></td>
        <td>for important warnings like error messages</td>
    </tr>
    <tr>
        <td class="bg-positive-15"></td>
        <td><code>positive</code></td>
        <td>for positive messages like <i>Succes!</i> or to mark active states</td>
    </tr>
</table>

By default, the semantic colors are mapped to unsemantic colors, eg. `negative` is mapped to `red`. When you [compile your own instance of YOI]({{ site.github.url }}start/customizing.html), you can change the palettes as you wish.

### Unsemantic Colors

<table>
    <tr>
        <th class="w-5">Sample</th>
        <th>Name</th>
    </tr>
    <tr>
        <td class="bg-gray-15"></td>
        <td><code>gray</code></td>
    </tr>
    <tr>
        <td class="bg-yellow-15"></td>
        <td><code>yellow</code></td>
    </tr>
    <tr>
        <td class="bg-red-15"></td>
        <td><code>red</code></td>
    </tr>
    <tr>
        <td class="bg-purple-15"></td>
        <td><code>purple</code></td>
    </tr>
    <tr>
        <td class="bg-blue-15"></td>
        <td><code>blue</code></td>
    </tr>
    <tr>
        <td class="bg-green-15"></td>
        <td><code>green</code></td>
    </tr>
</table>

### Color Shades

By default, each color has 25 shades, ranging from 1 (darkest) to 25 (lightest):

<table class="table--borderless table--fixed">
    <tr>
        <th>gray</th>
        <th>yellow</th>
        <th>red</th>
        <th>purple</th>
        <th>blue</th>
        <th>green</th>
    </tr>
    {% for i in (1..25) %}
        <tr>
            <td class="fw-bold c-gray-{{ 26 | minus: i }} bg-gray-{{ i }}">{{ i }}</td>
            <td class="fw-bold c-yellow-{{ 26 | minus: i }} bg-yellow-{{ i }}">{{ i }}</td>
            <td class="fw-bold c-red-{{ 26 | minus: i }} bg-red-{{ i }}">{{ i }}</td>
            <td class="fw-bold c-purple-{{ 26 | minus: i }} bg-purple-{{ i }}">{{ i }}</td>
            <td class="fw-bold c-blue-{{ 26 | minus: i }} bg-blue-{{ i }}">{{ i }}</td>
            <td class="fw-bold c-green-{{ 26 | minus: i }} bg-green-{{ i }}">{{ i }}</td>
        </tr>
    {% endfor %}
</table>

## Background Color

| `.bg-attention-[…]` | Background color shade of *attention*, eg. `.bg-attention-12`     |
| `.bg-base-[…]`      | Background color shade of *base*, eg. `.bg-base-12`               |
| `.bg-negative-[…]`  | Background color shade of *negative*, eg. `.bg-negative-12`       |
| `.bg-positive-[…]`  | Background color shade of *positive*, eg. `.bg-positive-12`       |
| `.bg-primary-[…]`   | Background color shade of *primary*, eg. `.bg-primary-12`         |
| `.bg-blue-[…]`      | Background color shade of *blue*, eg. `.bg-blue-12`               |
| `.bg-gray-[…]}`     | Background color shade of *gray*, eg. `.bg-gray-12`               |
| `.bg-green-[…]`     | Background color shade of *green*, eg. `.bg-green-12`             |
| `.bg-purple-[…]`    | Background color shade of *purple*, eg. `.bg-purple-12`           |
| `.bg-red-[…]`       | Background color shade of *red*, eg. `.bg-red-12`                 |
| `.bg-yellow-[…]`    | Background color shade of *yellow*, eg. `.bg-yellow-12`           |
| `.bg-transparent`   | Background color shade of *transparent*, eg. `.bg-transparent-12` |
| `.bg-white`         | Background color shade of *white*, eg. `.bg-white-12`             |

## Border Color

| `.bc-attention-[…]` | Border color shade of *attention*, eg. `.bg-attention-12`     |
| `.bc-base-[…]`      | Border color shade of *base*, eg. `.bg-base-12`               |
| `.bc-negative-[…]`  | Border color shade of *negative*, eg. `.bg-negative-12`       |
| `.bc-positive-[…]`  | Border color shade of *positive*, eg. `.bg-positive-12`       |
| `.bc-primary-[…]`   | Border color shade of *primary*, eg. `.bg-primary-12`         |
| `.bc-blue-[…]`      | Border color shade of *blue*, eg. `.bg-blue-12`               |
| `.bc-gray-[…]}`     | Border color shade of *gray*, eg. `.bg-gray-12`               |
| `.bc-green-[…]`     | Border color shade of *green*, eg. `.bg-green-12`             |
| `.bc-purple-[…]`    | Border color shade of *purple*, eg. `.bg-purple-12`           |
| `.bc-red-[…]`       | Border color shade of *red*, eg. `.bg-red-12`                 |
| `.bc-yellow-[…]`    | Border color shade of *yellow*, eg. `.bg-yellow-12`           |
| `.bc-transparent`   | Border color shade of *transparent*, eg. `.bg-transparent-12` |
| `.bc-white`         | Border color shade of *white*, eg. `.bg-white-12`             |

## Text Color

| `.c-attention-[…]` | Text color shade of *attention*, eg. `.bg-attention-12`     |
| `.c-base-[…]`      | Text color shade of *base*, eg. `.bg-base-12`               |
| `.c-negative-[…]`  | Text color shade of *negative*, eg. `.bg-negative-12`       |
| `.c-positive-[…]`  | Text color shade of *positive*, eg. `.bg-positive-12`       |
| `.c-primary-[…]`   | Text color shade of *primary*, eg. `.bg-primary-12`         |
| `.c-blue-[…]`      | Text color shade of *blue*, eg. `.bg-blue-12`               |
| `.c-gray-[…]}`     | Text color shade of *gray*, eg. `.bg-gray-12`               |
| `.c-green-[…]`     | Text color shade of *green*, eg. `.bg-green-12`             |
| `.c-purple-[…]`    | Text color shade of *purple*, eg. `.bg-purple-12`           |
| `.c-red-[…]`       | Text color shade of *red*, eg. `.bg-red-12`                 |
| `.c-yellow-[…]`    | Text color shade of *yellow*, eg. `.bg-yellow-12`           |
| `.c-transparent`   | Text color shade of *transparent*, eg. `.bg-transparent-12` |
| `.c-white`         | Text color shade of *white*, eg. `.bg-white-12`             |

## Interactive Color

Add the prefix `hvr--` to each color utility to apply the styling on *mouseover*:

```html
<!-- example -->
<div class="box p-5 hvr--bg-purple-25 hvr--bc-purple-24 hvr--c-purple-13">mouseover for example</div>
```
