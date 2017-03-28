---
layout: base
group: elements
title: PickBtn
permalink: elements/pickbtn
---

## PickBtn
Use this element to create prominent radio buttons. It’s basically a visual candy wrapper around a `<label>` and an `input[type="radio"]`.

| Less-File      | [pickBtn.less]({{ pathToSourceFile }}assets/less/elements/pickBtn.less) |
| JS-File        | [pickBtn.js]({{ pathToSourceFile }}assets/js/elements/pickBtn.js)       |
| Base CSS-Class | `.pickBtn`                                                              |
| Modifiers      | `-`                                                                     |

### Basic Example
The script that controls `.pickBtn` instances assumes that we use *real* `input[type="radio"]` elements inside each `.pickBtn`. Once a button is active, the script activates the radio input inside, so you can work with it like you would expect working with a regular radio input.

```html
<ul class="fs-0">
    <li class="pickBtn m-r-1 is--active" yoi-pickbtn>
        <label for="pickBtn_1" class="pickBtn__label">Brausetabletten</label>
        <input id="pickBtn_1" type="radio" checked="checked" name="testGroup_1" />
    </li>
    <li class="pickBtn m-r-1" yoi-pickbtn>
        <label for="pickBtn_2" class="pickBtn__label">Lösliches Pulver</label>
        <input id="pickBtn_2" type="radio" name="testGroup_1" />
    </li>
    <li class="pickBtn m-r-1" yoi-pickbtn>
        <label for="pickBtn_3" class="pickBtn__label">Kautabletten</label>
        <input id="pickBtn_3" type="radio" name="testGroup_1" />
    </li>
</ul>
```

<p class="hint"><b>The Name Attribute</b> Regular radio inputs are logically grouped by their name-attribute. The script for these radio buttons follows the same logic, so <b>make sure you use the name attribute to group the radio buttons correctly</b>.</p>

### Special Element: Toggle-Label
Sometimes you may wish to include an additional label and hide it, once a button is active. Therefore, you can use the element `.pickBtn__toggleLabel`, like this:

```html
<ul class="fs-0">
    <li class="pickBtn m-r-1 is--active" yoi-pickbtn>
        <label for="pickBtn_4" class="pickBtn__label">50 Stk</label>
        <span class="pickBtn__toggleLabel tc-price">€ 10,99</span>
        <input id="pickBtn_4" type="radio" checked="checked" name="testGroup_2" />
    </li>
    <li class="pickBtn m-r-1" yoi-pickbtn>
        <label for="pickBtn_5" class="pickBtn__label">70 Stk</label>
        <span class="pickBtn__toggleLabel tc-price">€ 15,99</span>
        <input id="pickBtn_5" type="radio" name="testGroup_2" />
    </li>
    <li class="pickBtn" yoi-pickbtn>
        <label for="pickBtn_6" class="pickBtn__label">150 Stk</label>
        <span class="pickBtn__toggleLabel tc-price">€ 20,99</span>
        <input id="pickBtn_6" type="radio" name="testGroup_2" />
    </li>
</ul>
```