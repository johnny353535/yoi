---
layout: base
group: elements
title: Accordion
permalink: elements/accordion
---

## Accordion
Use this element to create one or several grouped sections that expand or collapse content, once a section header is clicked.

|                |                                                                             |
| -              | -                                                                           |
| Less-File      | [accordion.less]({{ pathToSourceFile }}assets/less/elements/accordion.less) |
| JS-File        | [accordion.js]({{ pathToSourceFile }}assets/js/elements/accordion.js)       |
| Base CSS-Class | `.accordion`                                                                |
| Modifiers      | `-`                                                                         |

### Simple Example
This is the markup for the most basic example of an accordion. Don’t forget to add the custom yoi-attribute `accordion`.

```html
<div class="accordion" yoi-accordion>
    <div class="accordion__section">
        <div class="accordion__header">
            <h4>Manganese</h4>
        </div>
        <div class="accordion__body">
            <p>Manganese is a chemical element with symbol Mn and atomic number 25. It is not found as a free element in nature; it is often found in minerals in combination with iron. Manganese is a metal with important industrial metal alloy uses, particularly in stainless steels.</p>
        </div>
    </div>
    <div class="accordion__section">
        <div class="accordion__header">
            <h4>Gold</h4>
        </div>
        <div class="accordion__body">
            <p>Gold is a chemical element with the symbol Au (from Latin: aurum) and the atomic number 79. In its purest form, it is a bright, slightly reddish yellow, dense, soft, malleable and ductile metal. Chemically, gold is a transition metal and a group 11 element. It is one of the least reactive chemical elements, and is solid under standard conditions. The metal therefore occurs often in free elemental (native) form, as nuggets or grains, in rocks, in veins and in alluvial deposits. It occurs in a solid solution series with the native element silver (as electrum) and also naturally alloyed with copper and palladium. Less commonly, it occurs in minerals as gold compounds, often with tellurium (gold tellurides).</p>
        </div>
    </div>
    <div class="accordion__section">
        <div class="accordion__header">
            <h4>Calcium</h4>
        </div>
        <div class="accordion__body">
            <p>Calcium is a chemical element with symbol Ca and atomic number 20. Calcium is a soft gray Group 2 alkaline earth metal, fifth-most-abundant element by mass in the Earth's crust. The ion Ca2+ is also the fifth-most-abundant dissolved ion in seawater by both molarity and mass, after sodium, chloride, magnesium, and sulfate.[4] Free calcium metal is too reactive to occur in nature. Calcium is produced in supernova nucleosynthesis.</p>
        </div>
    </div>
</div>
```

### Controlling Accordion Sections
By default, all accordion sections are closed on page load. However, you can define which section should stay expanded/open. To do so, add the modifier `.is--open` to the very `.accordion__section` element you picked.

```html
<div class="accordion" yoi-accordion>
    <div class="accordion__section">
        <div class="accordion__header">
            <h4>Manganese</h4>
        </div>
        <div class="accordion__body">
            <p>Manganese is a chemical element with symbol Mn and atomic number 25. It is not found as a free element in nature; it is often found in minerals in combination with iron. Manganese is a metal with important industrial metal alloy uses, particularly in stainless steels.</p>
        </div>
    </div>
    <div class="accordion__section is--open">
        <div class="accordion__header">
            <h4>Gold</h4>
        </div>
        <div class="accordion__body">
            <p>Gold is a chemical element with the symbol Au (from Latin: aurum) and the atomic number 79. In its purest form, it is a bright, slightly reddish yellow, dense, soft, malleable and ductile metal. Chemically, gold is a transition metal and a group 11 element. It is one of the least reactive chemical elements, and is solid under standard conditions. The metal therefore occurs often in free elemental (native) form, as nuggets or grains, in rocks, in veins and in alluvial deposits. It occurs in a solid solution series with the native element silver (as electrum) and also naturally alloyed with copper and palladium. Less commonly, it occurs in minerals as gold compounds, often with tellurium (gold tellurides).</p>
        </div>
    </div>
</div>
```

Another feature allows you to **open or close all accordions on the page**. You may call the according functions in your JavaScript:

```js
Accordion.openAll();  // opens all accordion sections found in DOM
Accordion.closeAll(); // closes all accordion sections found in DOM
```

Alternatively, you can assign the function calls to elements like buttons by tagging them with the custom yoi-attribute `yoi-action` and the according value like `yoi-action="openAllAccordions"` or `yoi-action="closeAllAccordions"`.

```html
<p class="btns">
    <button class="btn btn--large" yoi-action="openAllAccordions">Open All Accordions</button>
    <button class="btn btn--large" yoi-action="closeAllAccordions">Close All Accordions</button>
</p>
```

### Linked Accordion Sections
It’s a common UI pattern to close all accordion sections but the one the user wishes to open. This behaviour is optional and may be enabled by adding `linked:true` to the custom yoi-attribute `yoi-accordion`:

```html
<div class="accordion" yoi-accordion="linked:true;">
    <div class="accordion__section is--open">
        <div class="accordion__header">
            <h4>Manganese</h4>
        </div>
        <div class="accordion__body">
            <p>Manganese is a chemical element with symbol Mn and atomic number 25. It is not found as a free element in nature; it is often found in minerals in combination with iron. Manganese is a metal with important industrial metal alloy uses, particularly in stainless steels.</p>
        </div>
    </div>
    <div class="accordion__section">
        <div class="accordion__header">
            <h4>Gold</h4>
        </div>
        <div class="accordion__body">
            <p>Gold is a chemical element with the symbol Au (from Latin: aurum) and the atomic number 79. In its purest form, it is a bright, slightly reddish yellow, dense, soft, malleable and ductile metal. Chemically, gold is a transition metal and a group 11 element. It is one of the least reactive chemical elements, and is solid under standard conditions. The metal therefore occurs often in free elemental (native) form, as nuggets or grains, in rocks, in veins and in alluvial deposits. It occurs in a solid solution series with the native element silver (as electrum) and also naturally alloyed with copper and palladium. Less commonly, it occurs in minerals as gold compounds, often with tellurium (gold tellurides).</p>
        </div>
    </div>
    <div class="accordion__section">
        <div class="accordion__header">
            <h4>Calcium</h4>
        </div>
        <div class="accordion__body">
            <p>Calcium is a chemical element with symbol Ca and atomic number 20. Calcium is a soft gray Group 2 alkaline earth metal, fifth-most-abundant element by mass in the Earth's crust. The ion Ca2+ is also the fifth-most-abundant dissolved ion in seawater by both molarity and mass, after sodium, chloride, magnesium, and sulfate.[4] Free calcium metal is too reactive to occur in nature. Calcium is produced in supernova nucleosynthesis.</p>
        </div>
    </div>
</div>
```