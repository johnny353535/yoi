---
layout: base
group: components
title: PickButton
permalink: components/pickbutton
status: draft
---

# PickButton

<p class="intro">Toggle buttons as wrappers around radio inputs.</p>

## Basic Example

The script that controls `.pickButton` instances assumes that we use *real* `input[type="radio"]` elements inside each `.pickButton`. Once a button is active, the script activates the radio input inside, so you can work with it like you would expect working with a regular radio input.

```html
<!-- example -->
<ul class="fs-0">
    <li class="pickButton m-r-1 is--active" yoi-pickbutton>
        <label for="pickButton_1" class="pickButton__label">Brausetabletten</label>
        <input id="pickButton_1" type="radio" checked="checked" name="testGroup_1" />
    </li>
    <li class="pickButton m-r-1" yoi-pickbutton>
        <label for="pickButton_2" class="pickButton__label">Lösliches Pulver</label>
        <input id="pickButton_2" type="radio" name="testGroup_1" />
    </li>
    <li class="pickButton m-r-1" yoi-pickbutton>
        <label for="pickButton_3" class="pickButton__label">Kautabletten</label>
        <input id="pickButton_3" type="radio" name="testGroup_1" />
    </li>
</ul>
```

<p class="hint"><b>The Name Attribute</b> Regular radio inputs are logically grouped by their name-attribute. The script for these radio buttons follows the same logic, so <b>make sure you use the name attribute to group the radio buttons correctly</b>.</p>

## Special Element: Toggle-Label

Sometimes you may wish to include an additional label and hide it, once a button is active. Therefore, you can use the element `.pickButton__toggleLabel`, like this:

```html
<!-- example -->
<ul class="fs-0">
    <li class="pickButton m-r-1 is--active" yoi-pickbutton>
        <label for="pickButton_4" class="pickButton__label">50 Stk</label>
        <span class="pickButton__toggleLabel">€ 10,99</span>
        <input id="pickButton_4" type="radio" checked="checked" name="testGroup_2" />
    </li>
    <li class="pickButton m-r-1" yoi-pickbutton>
        <label for="pickButton_5" class="pickButton__label">70 Stk</label>
        <span class="pickButton__toggleLabel">€ 15,99</span>
        <input id="pickButton_5" type="radio" name="testGroup_2" />
    </li>
    <li class="pickButton" yoi-pickbutton>
        <label for="pickButton_6" class="pickButton__label">150 Stk</label>
        <span class="pickButton__toggleLabel">€ 20,99</span>
        <input id="pickButton_6" type="radio" name="testGroup_2" />
    </li>
</ul>
```
