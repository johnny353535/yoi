---
layout: base
group: components
title: Pie Chart
permalink: components/piechart
status: draft
---

# Pie Chart

<p class="intro">A simple SVG pie chart, dynamically generated on page load. It reads the data records from on simple markup which provides an elegant and meaningful fall back if JavaScript is not available. See also: <a href="pages/components/barChart.html">Bar Chart</a>.</p>

## Most Basic Example

Use this markup to generate a most simple pie chart with **all default options applied**. The script looks for the `yoi-piechart` attribute so never forget to inlcude it in your markup.

```html
<!-- example:tabs -->
<div class="pieChart" yoi-piechart>
    <div class="pieChart__data">
        <p class="pieChart__record">
            <span class="pieChart__value">30%</span>
            <span class="pieChart__label">Rho­dium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">30%</span>
            <span class="pieChart__label">Gold</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">30%</span>
            <span class="pieChart__label">Mer­cury</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">10%</span>
            <span class="pieChart__label">Alumin­ium</span>
        </p>
    </div>
</div>
```

## Options

Option are written as **semicolon-seperated key/value pairs**:

| Key       | Value                                               | Description                                                                                                                                                                                        |
| -         | -                                                   | -                                                                                                                                                                                                  |
| baseColor | *array* with the length of three, eg. `[150,30,50]` | a HSL base color to calculate a color palette from                                                                                                                                                 |
| highlight | *boolean true/false*                                | highlighting individual slices on mouseover and click, default ist `true`                                                                                                                          |
| palette   | *string*: `fixed, random, shades, unique`           | `fixed` = a predefined color palette, `random` = random rgb colors, `shades` = shades of supplied or default `baseColor`, `unique` = unique colors, calculated for supplied or default `baseColor` |
| size      | *integer*                                           | the diameter of the pie chart in px                                                                                                                                                                |

## Unique Color Palette

```html
<!-- example:tabs -->
<div class="pieChart" yoi-piechart="palette:unique;">
    <div class="pieChart__data">
        <p class="pieChart__record">
            <span class="pieChart__value">55%</span>
            <span class="pieChart__label">Sele­nium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">15%</span>
            <span class="pieChart__label">Tin</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">15%</span>
            <span class="pieChart__label">Phos­phorus</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">10%</span>
            <span class="pieChart__label">Carbon</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">5%</span>
            <span class="pieChart__label">Thulium</span>
        </p>
    </div>
</div>
```

```html
<!-- example:tabs -->
<div class="pieChart" yoi-piechart="palette:unique; baseColor:[50,70,60]">
    <div class="pieChart__data">
        <p class="pieChart__record">
            <span class="pieChart__value">55%</span>
            <span class="pieChart__label">Sele­nium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">15%</span>
            <span class="pieChart__label">Tin</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">15%</span>
            <span class="pieChart__label">Phos­phorus</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">10%</span>
            <span class="pieChart__label">Carbon</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">5%</span>
            <span class="pieChart__label">Thulium</span>
        </p>
    </div>
</div>
```

## Random Color Palette

```html
<!-- example:tabs -->
<div class="pieChart" yoi-piechart="palette:random;">
    <div class="pieChart__data">
        <p class="pieChart__record">
            <span class="pieChart__value">60%</span>
            <span class="pieChart__label">Cerium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">30%</span>
            <span class="pieChart__label">Ura­nium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">10%</span>
            <span class="pieChart__label">Hydro­gen</span>
        </p>
    </div>
</div>
```

## Fixed Color Palette

```html
<!-- example:tabs -->
<div class="pieChart" yoi-piechart="palette:fixed;">
    <div class="pieChart__data">
        <p class="pieChart__record">
            <span class="pieChart__value">20%</span>
            <span class="pieChart__label">Hydro­gen</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">17%</span>
            <span class="pieChart__label">So­dium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">16%</span>
            <span class="pieChart__label">Potas­sium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">16%</span>
            <span class="pieChart__label">Cae­sium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">15%</span>
            <span class="pieChart__label">Fran­cium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">12%</span>
            <span class="pieChart__label">Magne­sium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">3%</span>
            <span class="pieChart__label">Cal­cium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">1%</span>
            <span class="pieChart__label">Stront­ium</span>
        </p>
    </div>
</div>
```

## Different Sizes (and Random Color Palettes)

```html
<!-- example:tabs -->
<div class="pieChart" yoi-piechart="size:100; palette:random;">
    <div class="pieChart__data">
        <p class="pieChart__record">
            <span class="pieChart__value">60%</span>
            <span class="pieChart__label">Cerium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">30%</span>
            <span class="pieChart__label">Ura­nium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">10%</span>
            <span class="pieChart__label">Hydro­gen</span>
        </p>
    </div>
</div>
```

```html
<!-- example:tabs -->
<div class="pieChart" yoi-piechart="size:300; palette:random;">
    <div class="pieChart__data">
        <p class="pieChart__record">
            <span class="pieChart__value">60%</span>
            <span class="pieChart__label">Cerium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">30%</span>
            <span class="pieChart__label">Ura­nium</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__value">10%</span>
            <span class="pieChart__label">Hydro­gen</span>
        </p>
    </div>
</div>
```

## Different Formatting of Records

You may **change the order of label and value** for each `.pieChart__record` **or hide the value** when it makes sense by adding the global modifier `.hidden`.

```html
<!-- example:tabs -->
<div class="pieChart" yoi-piechart>
    <div class="pieChart__data">
        <p class="pieChart__record">
            <span class="pieChart__label">Cerium</span>
            <span class="pieChart__value">40%</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__label">Ura­nium</span>
            <span class="pieChart__value">30%</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__label">Hydro­gen</span>
            <span class="pieChart__value">30%</span>
        </p>
    </div>
</div>
```

```html
<!-- example:tabs -->
<div class="pieChart" yoi-piechart>
    <div class="pieChart__data">
        <p class="pieChart__record">
            <span class="pieChart__label">Cerium</span>
            <span class="pieChart__value hidden">40%</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__label">Ura­nium</span>
            <span class="pieChart__value hidden">30%</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__label">Hydro­gen</span>
            <span class="pieChart__value hidden">30%</span>
        </p>
    </div>
</div>
```

## Disable Highlighting

Set `highlight` to `false` if you wish to **disable highlighting** individual slices on mouseover and click.

```html
<!-- example:tabs -->
<div class="pieChart" yoi-piechart="highlight:false;">
    <div class="pieChart__data">
        <p class="pieChart__record">
            <span class="pieChart__label">Cerium</span>
            <span class="pieChart__value">40%</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__label">Ura­nium</span>
            <span class="pieChart__value">30%</span>
        </p>
        <p class="pieChart__record">
            <span class="pieChart__label">Hydro­gen</span>
            <span class="pieChart__value">30%</span>
        </p>
    </div>
</div>
```