---
layout: base
group: elements
title: Date Picker
permalink: elements/datepicker
---

## Date Picker
Use this element to provide an easy and comfortable way to enter dates into input fields. It was **designed for use on desktop browsers only**. On mobile browsers it makes more sense to use the native input widgets.

| Less-File      | [datePicker.less]({{ pathToSourceFile }}assets/less/elements/datePicker.less) |
| JS-File        | [datePicker.js]({{ pathToSourceFile }}assets/js/elements/datePicker.js)       |
| Base CSS-Class | `.datePicker`                                                                 |
| Modifiers      | `none`                                                                        |

### Basic Example
Add the yoi-attribute "datepicker" to any (date-)input field that you would like to use the date picker. A little icon on the right side will appear to indicate that the field invokes a date picker on focus. *If you do not supply any more data, the date picker will start with the current date*.

```html
<form>
    <input class="w-20" type="date" yoi-datepicker />
</form>
```

### Set an Initial Date
You can add a date to the input field via markup. **Make sure you use the date picker yoi-attribute. Do not use the value-attribute.**

```html
<form>
    <input class="w-20" type="date" yoi-datepicker="year:2010; month:10; day:5;" />
</form>
```

If you leave out a parameter, it will **fall back to the current date**. Eg. if you leave out the year, the date picker will assume you wish to initialize it with the current year. Same for month and day, of course.

```html
<form>
    <input class="w-20" type="date" yoi-datepicker="month:10; day:10;" />
</form>
```

### Positioning
By default, the date picker appears below the date input field. However, if the available space in viewport below the input is too low, the date picker appears above the input field. Try it out by scrolling the page before you focus on the input field.

```html
<form>
    <input class="input w-20" type="date" yoi-datepicker />
</form>
```

### Large Input Fields
The date picker works perfectly fine with both large and small input fields.

```html
<form>
    <input class="input--large w-20" type="date" yoi-datepicker />
</form>
```

### Markup
These date pickers were created to be used as progressive enhancement. Without JavaScript, the input still works fine, with JavaScript enabled, the experience gets enhanced. Therefore, **you do not need to write additional markup** since it’s all dynamically generated. However, this is an **example of the generated markup**:

```html
<div class="datePicker">
    <span class="datePicker__btnPrev" yoi-action="prevMonth"></span>
    <span class="datePicker__btnNext" yoi-action="nextMonth"></span>
    <h3 class="datePicker__header">February 2017</h3>
    <table class="datePicker__days">
        <tbody>
            <tr>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
            </tr>
            <tr>
                <td class="datePicker--emptyDay"></td>
                <td class="datePicker--emptyDay"></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
            </tr>
            <tr>
                <td class="datePicker--today">6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
            </tr>
            <tr>
                <td>13</td>
                <td>14</td>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
                <td>19</td>
            </tr>
            <tr>
                <td>20</td>
                <td>21</td>
                <td>22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
                <td>26</td>
            </tr>
            <tr>
                <td>27</td>
                <td>28</td>
                <td class="datePicker--emptyDay"></td>
                <td class="datePicker--emptyDay"></td>
                <td class="datePicker--emptyDay"></td>
                <td class="datePicker--emptyDay"></td>
                <td class="datePicker--emptyDay"></td>
            </tr>
        </tbody>
    </table>
</div>
```