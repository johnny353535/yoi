---
layout: base
group: utilities
title: Sizing
permalink: utilities/sizing
srcfiles:
    - sizing-base.less
    - sizing-responsive.less
---

# Sizing

<p class="intro">Adds or overrides width and height.</p>

## Fractional Width

| `.w-1-1`  | width at 100%                 |
| `.w-1-2`  | width at 50% (half)           |
| `.w-1-3`  | width at 33.3% (third)        |
| `.w-1-4`  | width at 25% (quarter)        |
| `.w-1-5`  | width at 20% (fifth)          |
| `.w-1-6`  | width at 16.6% (sixth)        |
| `.w-2-3`  | width at 66.6%% (two thirds)  |
| `.w-2-5`  | width at 40% (two fifths)     |
| `.w-3-4`  | width at 75% (three quarters) |
| `.w-3-5`  | width at 60% (three fifths)   |
| `.w-4-5`  | width at 80% (four fifths)    |

```html
<!-- example -->
<div class="bg-gray-24 br-all p-2 w-1-1 m-b-2">1-1</div>
<div class="bg-gray-24 br-all p-2 w-4-5 m-b-2">4-5</div>
<div class="bg-gray-24 br-all p-2 w-3-4 m-b-2">3-4</div>
<div class="bg-gray-24 br-all p-2 w-2-3 m-b-2">2-3</div>
<div class="bg-gray-24 br-all p-2 w-1-2 m-b-2">1-2</div>
<div class="bg-gray-24 br-all p-2 w-2-5 m-b-2">2-5</div>
<div class="bg-gray-24 br-all p-2 w-1-3 m-b-2">1-3</div>
<div class="bg-gray-24 br-all p-2 w-1-4 m-b-2">1-4</div>
<div class="bg-gray-24 br-all p-2 w-1-5 m-b-2">1-5</div>
<div class="bg-gray-24 br-all p-2 w-1-6">1-6</div>
```

### Responsive Fractional Width

| `.only-s--w-[...]` | `.w-[...]` only at breakpoint `s`       |
| `.m--w-[...]`      | `.w-[...]` at breakpoint `m` and larger |
| `.only-m--w-[...]` | `.w-[...]` only at breakpoint `m`       |
| `.l--w-[...]`      | `.w-[...]` at breakpoint `l` and larger |
| `.only-l--w-[...]` | `.w-[...]` only at breakpoint `l`       |
| `.xl--w-[...]`     | `.w-[...]` at breakpoint `xl`           |

## Auto Width

| `.w-auto`| width at *auto*, useful to reset an element’s width |

### Responsive Auto Width

| `.only-s--w-auto` | `.w-auto` only at breakpoint `s`       |
| `.m--w-auto`      | `.w-auto` at breakpoint `m` and larger |
| `.only-m--w-auto` | `.w-auto` only at breakpoint `m`       |
| `.l--w-auto`      | `.w-auto` at breakpoint `l` and larger |
| `.only-l--w-auto` | `.w-auto` only at breakpoint `l`       |
| `.xl--w-auto`     | `.w-auto` at breakpoint `xl`           |

## Fixed Width & Height

At YOI’s default configuration, 60 fixed width and 60 fixed height steps are available. Read the step number as multiplicant of 1rem – thus `.w-15` translates to 1rem &times; 15 = 15rem. The same logic applies to the fixed height utilities.

| `.w-[1–60]` | fixed width between 1 (1rem &times; 1) and 60 (1rem &times; 60)  |
| `.h-[1–60]` | fixed height between 1 (1rem &times; 1) and 60 (1rem &times; 60) |

### Responsive Fixed Width

| `.only-s--w-[1–60]` | `.w-[1–60]` only at breakpoint `s`       |
| `.m--w-[1–60]`      | `.w-[1–60]` at breakpoint `m` and larger |
| `.only-m--w-[1–60]` | `.w-[1–60]` only at breakpoint `m`       |
| `.l--w-[1–60]`      | `.w-[1–60]` at breakpoint `l` and larger |
| `.only-l--w-[1–60]` | `.w-[1–60]` only at breakpoint `l`       |
| `.xl--w-[1–60]`     | `.w-[1–60]` at breakpoint `xl`           |

### Responsive Fixed Height

| `.only-s--h-[1–60]` | `.h-[1–60]` only at breakpoint `s`       |
| `.m--h-[1–60]`      | `.h-[1–60]` at breakpoint `m` and larger |
| `.only-m--h-[1–60]` | `.h-[1–60]` only at breakpoint `m`       |
| `.l--h-[1–60]`      | `.h-[1–60]` at breakpoint `l` and larger |
| `.only-l--h-[1–60]` | `.h-[1–60]` only at breakpoint `l`       |
| `.xl--h-[1–60]`     | `.h-[1–60]` at breakpoint `xl`           |
