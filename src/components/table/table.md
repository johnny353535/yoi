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
