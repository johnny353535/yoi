---
layout: base
group: components
title: Table
permalink: components/table
status: [draft, incomplete]
---

# Table

<p class="intro">Tables in different flavours, eg. zebra-striped, tables with fixed width, prominent or subtle headers and so on.</p>

## Basic Example

This is how a basic `<table>` looks like and how you write the markup:

```html
<!-- example -->
<table>
    <tr>
        <th>Header</th>
        <th>Header</th>
        <th>Header</th>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
</table>
```

## Modifiers

### Borderless

Use the modifier `.table--borderless` to create a table with no borders at all:

```html
<!-- example -->
<table class="table--borderless">
    <tr>
        <th>Header</th>
        <th>Header</th>
        <th>Header</th>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
</table>
```

### Headers Inside Rows

Use the modifier `.table--colHeader` and change the markup, so that each `<tr>` contains one `<th>`:

```html
<!-- example -->
<table class="table--colHeader">
    <tr>
        <th scope="row">Key</th>
        <td>Value</td>
    </tr>
    <tr>
        <th scope="row">Key</th>
        <td>Value</td>
    </tr>
    <tr>
        <th scope="row">Key</th>
        <td>Value</td>
    </tr>
</table>
```

### Compressed

Use the modifier `.table--compressed` to create a table that takes up less space:

```html
<!-- example -->
<table class="table--compressed">
    <tr>
        <th>Header</th>
        <th>Header</th>
        <th>Header</th>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
</table>
```

### Fixed-Width

Use the modifier `.table--fixed` to create a table with cells of identical size:

```html
<!-- example -->
<table class="table--fixed">
    <tr>
        <th>Header</th>
        <th>Header</th>
        <th>Header</th>
        <th>Header</th>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
</table>
```

### Simple Header

Use the modifier `.table--simpleHeader` to create a table with less prominent headers:

```html
<!-- example -->
<table class="table--simpleHeader">
    <tr>
        <th>Header</th>
        <th>Header</th>
        <th>Header</th>
        <th>Header</th>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
</table>
```

### Table Without Outer Borders

Use the modifier `.table--stripped` to create a table without outer borders:

```html
<!-- example -->
<table class="table--stripped">
    <tr>
        <th>Header</th>
        <th>Header</th>
        <th>Header</th>
        <th>Header</th>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
</table>
```

### Zebra-Striped Table

Use the modifier `.table--zebra` to create a table with alternating row colors:

```html
<!-- example -->
<table class="table--zebra">
    <tr>
        <th>Header</th>
        <th>Header</th>
        <th>Header</th>
        <th>Header</th>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
    <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
    </tr>
</table>
```

## JavaScript-API

### Attributes

Add the attribute `yoi-table` to a `<table>` to make it intercative. The attribute accepts parameters to enable the following features.

#### Selectable Rows

Use this option by adding `selectable:true;` as a parameter to the attribute:

```html
<!-- example -->
<table yoi-table="selectable:true;">
    <tr>
        <th>Anti-Infectives</th>
        <th>Central Nervous System Agents</th>
    </tr>
    <tr>
        <td>Amebicides</td>
        <td>Analgesics</td>
    </tr>
    <tr>
        <td>Aminoglycosides</td>
        <td>Anorexiants</td>
    </tr>
    <tr>
        <td>Anthelmintics</td>
        <td>Anticonvulsants</td>
    </tr>
    <tr>
        <td>Antifungals</td>
        <td>Antiemetic/Antivertigo Agents</td>
    </tr>
</table>
```

#### Multiple Selectable Rows

Use this option by adding `selectable:multi;` as a parameter to the attribute:

```html
<!-- example -->
<table yoi-table="selectable:multi;">
    <tr>
        <th>Anti-Infectives</th>
        <th>Central Nervous System Agents</th>
    </tr>
    <tr>
        <td>Amebicides</td>
        <td>Analgesics</td>
    </tr>
    <tr>
        <td>Aminoglycosides</td>
        <td>Anorexiants</td>
    </tr>
    <tr>
        <td>Anthelmintics</td>
        <td>Anticonvulsants</td>
    </tr>
    <tr>
        <td>Antifungals</td>
        <td>Antiemetic/Antivertigo Agents</td>
    </tr>
</table>
```

#### Removeable Rows

Use this option by adding `removeable:true;` as a parameter to the attribute:

```html
<!-- example -->
<table yoi-table="removeable:true;">
    <tr>
        <th>Anti-Infectives</th>
        <th>Central Nervous System Agents</th>
    </tr>
    <tr>
        <td>Amebicides</td>
        <td>Analgesics</td>
    </tr>
    <tr>
        <td>Aminoglycosides</td>
        <td>Anorexiants</td>
    </tr>
    <tr>
        <td>Anthelmintics</td>
        <td>Anticonvulsants</td>
    </tr>
    <tr>
        <td>Antifungals</td>
        <td>Antiemetic/Antivertigo Agents</td>
    </tr>
</table>
```

### Methods

Use the following JavaScript methods to programatically interact with with a `<table>`:

#### init()

...

#### select()

Pick a `<tr>` and mark it selected:

```html
<!-- example -->
<table id="exampleTable-1" yoi-table="selectable:true;">
    <tr>
        <th>Anti-Infectives</th>
        <th>Central Nervous System Agents</th>
    </tr>
    <tr>
        <td>Amebicides</td>
        <td>Analgesics</td>
    </tr>
    <tr>
        <td>Aminoglycosides</td>
        <td>Anorexiants</td>
    </tr>
</table>
<button id="exampleButton-1" class="button button--large val-t m-t-2">Select a row</button>
<script>
    $('#exampleButton-1').on('click', function() {
        YOI.component.Table.select($('#exampleTable-1 tr').eq(1));
    });
</script>
```

#### unselect()

Pick a `<tr>` and remove the selection:

```html
<!-- example -->
<table id="exampleTable-2" yoi-table="selectable:true;">
    <tr>
        <th>Anti-Infectives</th>
        <th>Central Nervous System Agents</th>
    </tr>
    <tr class="is--active">
        <td>Amebicides</td>
        <td>Analgesics</td>
    </tr>
    <tr>
        <td>Aminoglycosides</td>
        <td>Anorexiants</td>
    </tr>
</table>
<button id="exampleButton-2" class="button button--large val-t m-t-2">Unselect row</button>
<script>
    $('#exampleButton-2').on('click', function() {
        YOI.component.Table.unselect($('#exampleTable-2 tr').eq(1));
    });
</script>
```

#### removeRow()

Pick a `<tr>` and remove it:

```html
<!-- example -->
<table id="exampleTable-3" yoi-table="removeable:true;">
    <tr>
        <th>Anti-Infectives</th>
        <th>Central Nervous System Agents</th>
    </tr>
    <tr class="is--active">
        <td>Amebicides</td>
        <td>Analgesics</td>
    </tr>
    <tr>
        <td>Aminoglycosides</td>
        <td>Anorexiants</td>
    </tr>
</table>
<button id="exampleButton-3" class="button button--large val-t m-t-2">Remove a row</button>
<script>
    $('#exampleButton-3').on('click', function() {
        YOI.component.Table.remove($('#exampleTable-3 tr').eq(1));
    });
</script>
```

### Custom Events

Each `<table>` fires custom events your script can listen to:

```
yoi-table:remove    // row got removed
yoi-table:empty     // last row / all rows got removed
yoi-table:select    // row got selected
yoi-table:unselect  // row got unselected
```

Try the example below and watch the custom events, printed to the [log element]({{ site.github.url }}/components/log.html):

```html
<!-- example:tabs -->
<div id="myLog" class="log log--light m-b-4" yoi-log>
    <div class="log__body">
        <p>Listening</p>
    </div>
</div>
<table id="exampleTable-4" class="m-b-2" yoi-table="selectable:true;">
    <tr>
        <th>Anti-Infectives</th>
        <th>Central Nervous System Agents</th>
    </tr>
    <tr>
        <td>Amebicides</td>
        <td>Analgesics</td>
    </tr>
    <tr>
        <td>Aminoglycosides</td>
        <td>Anorexiants</td>
    </tr>
</table>
<table id="exampleTable-5" class="m-b-2" yoi-table="removeable:true;">
    <tr>
        <th>Anti-Infectives</th>
        <th>Central Nervous System Agents</th>
    </tr>
    <tr class="is--active">
        <td>Amebicides</td>
        <td>Analgesics</td>
    </tr>
    <tr>
        <td>Aminoglycosides</td>
        <td>Anorexiants</td>
    </tr>
</table>
<div class="buttons">
    <button id="exampleButton-4" class="button button--large">Select a row</button>
    <button id="exampleButton-5" class="button button--large">Deselect a row</button>
    <button id="exampleButton-6" class="button button--large">Remove a row</button>
</div>
<script>

    // log the custom events

    $('#exampleTable-4').on('yoi-table:select', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-table:select');
    });
    $('#exampleTable-4').on('yoi-table:unselect', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-table:unselect');
    });
    $('#exampleTable-5').on('yoi-table:remove', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-table:remove');
    });
    $('#exampleTable-5').on('yoi-table:empty', function() {
        YOI.component.Log.write($('#myLog'), 'yoi-table:empty');
    });

    // bind methods to buttons on click

    $('#exampleButton-4').on('click', function() {
        YOI.component.Table.select($('#exampleTable-4 tr').eq(1));
    });
    $('#exampleButton-5').on('click', function() {
        YOI.component.Table.unselect($('#exampleTable-4 tr').eq(1));
    });
    $('#exampleButton-6').on('click', function() {
        YOI.component.Table.remove($('#exampleTable-5 tr').eq(1));
    });

</script>
```
