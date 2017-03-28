---
layout: base
group: elements
title: Tables
permalink: elements/tables
---

## Tables
Tables come with a few handy modifiers, eg. to render zebra-striped tables, tables with fixed width, etc. Tables can also be interactive (selectable or deletable rows), using the `yoi-table` hook.

| Less-File      | [tables.less]({{ pathToSourceFile }}assets/less/elements/tables.less)                                                            |
| JS-File        | [tables.js]({{ pathToSourceFile }}assets/js/elements/tables.js)                                                                  |
| Base CSS-Class | none (just the table-tag) or `.table`                                                                                            |
| Modifiers      | `.table--borderless, .table--colHeader, .table--compressed, .table--fixed, .table--simpleHeader, .table--stripped, .table-zebra` |

### Simple Table

```html
<table>
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

### Modifiers
Add one or more of the available modifier classes to change the appearance of a table.

#### Table Without Any Borders
Use the modifier `table--borderless`:

```html
<table class="table--borderless">
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

#### Table With Headers Inside Rows
Use the modifier `table--colHeader` and change the markup, so that each `<tr>` contains one `<th>`:

```html
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

#### Compressed Table
Use the modifier `table--compressed`:

```html
<table class="table--compressed">
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

#### Fixed-Width Table
Use the modifier `table--fixed`:

```html
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

#### Table With Simple Header
Use the modifier `table--simpleHeader`:

```html
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

#### Table Without Outer Borders
Use the modifier `table--stripped`:

```html
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

#### Zebra-Striped Table
Use the modifier `table--zebra`:

```html
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
</table>
```

### JavaScript Interface
#### Table With Selectable Rows
Use this option by adding `selectable:true;` as a value to the custom yoi-attribute.

```html
<table yoi-table="selectable:true;">
    <tr>
        <th class="w-20">Artikel</th>
        <th>Beschreibung</th>
    </tr>
    <tr>
        <td>Banane</td>
        <td>krumme Frucht</td>
    </tr>
    <tr>
        <td>Kirsche</td>
        <td>rote Frucht</td>
    </tr>
    <tr>
        <td>Orange</td>
        <td>runde Frucht</td>
    </tr>
    <tr>
        <td>Melone</td>
        <td>grosse Frucht</td>
    </tr>
</table>
```

#### Table With Multiple Selectable Rows
Use this option by adding `selectable:multi;` as a value to the custom yoi-attribute.

```html
<table yoi-table="selectable:multi;">
    <tr>
        <th class="w-20">Artikel</th>
        <th>Beschreibung</th>
    </tr>
    <tr>
        <td>Banane</td>
        <td>krumme Frucht</td>
    </tr>
    <tr>
        <td>Kirsche</td>
        <td>rote Frucht</td>
    </tr>
    <tr>
        <td>Orange</td>
        <td>runde Frucht</td>
    </tr>
    <tr>
        <td>Melone</td>
        <td>grosse Frucht</td>
    </tr>
</table>
```

#### Table With Removeable Rows
Use this option by adding `removeable:true;` as a value to the custom yoi-attribute.

```html
<table yoi-table="removeable:true;">
    <tr>
        <th class="w-20">Artikel</th>
        <th>Beschreibung</th>
    </tr>
    <tr yoi-foo="12345678">
        <td>Banane</td>
        <td>krumme Frucht</td>
    </tr>
    <tr yoi-foo="12345678">
        <td>Kirsche</td>
        <td>rote Frucht</td>
    </tr>
    <tr yoi-foo="12345678">
        <td>Orange</td>
        <td>runde Frucht</td>
    </tr>
    <tr yoi-foo="12345678">
        <td>Melone</td>
        <td>grosse Frucht</td>
    </tr>
</table>
```