---
layout: base
group: components
title: Accordion
permalink: components/accordion
status: [draft, issues]
---

# Accordion

<p class="intro">Grouped expandable/collapsable sections.</p>

## Basic Example

This is how a basic `.accordion` looks like and how you write the markup:

```html
<!-- example -->
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

## Linked Accordion Sections

Always collapse all accordion sections but the currently expanded one by adding `linked:true` to the custom attribute `yoi-accordion`:

```html
<!-- example -->
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

## Controlling Accordion Sections

Define which section should start expanded/open by adding the modifier `.is--open` to an `.accordion__section`:

```html
<!-- example -->
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

## Actions

### Accordion.openAll

Open all accordions on the page by using the [action]({{ site.github.url }}/actions/) `Accordion.openAll`:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Accordion.openAll;">Open All Accordions</button>
```

### Accordion.closeAll

Close all accordions on the page by using the [action]({{ site.github.url }}/actions/) `Accordion.closeAll`:

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Accordion.closeAll; on:dblclick;">Close All Accordions on Double-Click</button>
```

```html
<!-- example -->
<button class="btn btn--large" yoi-action="Accordion.openAll; on:dblclick;">Open All Accordions on Double-Click</button>
```

### Custom Events

| event name            | fires when …                 |
| --------------------- | ---------------------------- |
| `yoi-accordion-open`  | An accordion section opens.  |
| `yoi-accordion-close` | An accordion section closes. |

Try the example below and watch the custom events, printed to the [log element]({{ site.github.url }}/components/log.html):

```html
<!-- example:tabs -->
<div id="myLog" class="log log--light m-b-4" yoi-log>
    <div class="log__body">
        <p>Listening</p>
    </div>
</div>
<div id="myAccordion" class="accordion" yoi-accordion>
    <div class="accordion__section">
        <div class="accordion__header">
            <h4>Section One</h4>
        </div>
        <div class="accordion__body">
            <p>Content of section one.</p>
        </div>
    </div>
    <div class="accordion__section">
        <div class="accordion__header">
            <h4>Section Two</h4>
        </div>
        <div class="accordion__body">
            <p>Content of section two.</p>
        </div>
    </div>
</div>
<script>
    $('#myAccordion').on('yoi-accordion-open', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-accordion-open');
    });
    $('#myAccordion').on('yoi-accordion-close', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-accordion-close');
    });
</script>
```
