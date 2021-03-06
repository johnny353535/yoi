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

| `.only-s:w-[*]` | `.w-[*]` only at breakpoint `s`       |
| `.m:w-[*]`      | `.w-[*]` at breakpoint `m` and larger |
| `.only-m:w-[*]` | `.w-[*]` only at breakpoint `m`       |
| `.l:w-[*]`      | `.w-[*]` at breakpoint `l` and larger |
| `.only-l:w-[*]` | `.w-[*]` only at breakpoint `l`       |
| `.xl:w-[*]`     | `.w-[*]` at breakpoint `xl`           |

## Auto Width & Height

| `.w-auto`| width at *auto*, useful to reset an element’s width  |
| `.h-auto`| height at *auto*, useful to reset an element’s width |

### Responsive Auto Width & Height

| `.only-s:[w/h]-auto` | `.[w/h]-auto` only at breakpoint `s`       |
| `.m:[w/h]-auto`      | `.[w/h]-auto` at breakpoint `m` and larger |
| `.only-m:[w/h]-auto` | `.[w/h]-auto` only at breakpoint `m`       |
| `.l:[w/h]-auto`      | `.[w/h]-auto` at breakpoint `l` and larger |
| `.only-l:[w/h]-auto` | `.[w/h]-auto` only at breakpoint `l`       |
| `.xl:[w/h]-auto`     | `.[w/h]-auto` at breakpoint `xl`           |

## Full Width & Height

| `.w-full`| width at 100%  |
| `.h-full`| height at 100% |

### Responsive Full Width & Height

| `.only-s:[w/h]-full` | `.[w/h]-full` only at breakpoint `s`       |
| `.m:[w/h]-full`      | `.[w/h]-full` at breakpoint `m` and larger |
| `.only-m:[w/h]-full` | `.[w/h]-full` only at breakpoint `m`       |
| `.l:[w/h]-full`      | `.[w/h]-full` at breakpoint `l` and larger |
| `.only-l:[w/h]-full` | `.[w/h]-full` only at breakpoint `l`       |
| `.xl:[w/h]-full`     | `.[w/h]-full` at breakpoint `xl`           |

## Fixed Width & Height

At YOI’s default configuration, 50 fixed width and 50 fixed height steps are available. Read the step number as multiplicant of .5rem – thus `.w-10` translates to .5rem &times; 10 = 5rem. *rem* is a mesurement unit relative to the font size of the `<html>` element. By default, Yoi’s root font size is 8px. So `.w-10` = 5rem (15 &times; 8px) &times; 10 = 80px;

| `.w-[1–10]`   | fixed width between 1 (.5rem &times; 1) and 50 (.5rem &times; 50)  |
| `.h-[1–10]`   | fixed height between 1 (.5rem &times; 1) and 50 (.5rem &times; 50) |
| `.w-viewport` | fixed with of 1vw (viewport width)                                 |
| `.h-viewport` | fixed height of 1vh (viewport height)                              |

### Responsive Fixed Width & Height

| `.only-s:[w/h]-[*]` | `.[w/h]-[*]` only at breakpoint `s`       |
| `.m:[w/h]-[*]`      | `.[w/h]-[*]` at breakpoint `m` and larger |
| `.only-m:[w/h]-[*]` | `.[w/h]-[*]` only at breakpoint `m`       |
| `.l:w-[w/h]-[*]`    | `.[w/h]-[*]` at breakpoint `l` and larger |
| `.only-l:[w/h]-[*]` | `.[w/h]-[*]` only at breakpoint `l`       |
| `.xl:[w/h]-[*]`     | `.[w/h]-[*]` at breakpoint `xl`           |

## Minimum & Maximum Width & Height

| `.w-max-full`     | maximum width at 100%                   |
| `.w-max-viewport` | maximum width at 1vw (viewport width)   |
| `.h-max-full`     | maximum height at 100%                  |
| `.h-max-viewport` | maximum height at 1vh (viewport height) |
| `.w-min-full`     | mimimum width at 100%                   |
| `.w-min-viewport` | mimimum width at 1vw (viewport width)   |
| `.h-min-full`     | mimimum height at 100%                  |
| `.h-min-viewport` | mimimum height at 1vh (viewport height) |

## Responsive Minimum & Maximum Width & Height

| `.only-s-[w/h]-[max/min]-[*]`  | `.[w/h]-[max/min]-[full/viewport]` only at breakpoint `s`      |
| `.m:[w/h]-[max/min]-[*]`      | `.[w/h]-[max/min]-[full/viewport]` at breakpoint `m` and larger |
| `.only-m:[w/h]-[max/min]-[*]` | `.[w/h]-[max/min]-[full/viewport]` only at breakpoint `m`       |
| `.l:[w/h]-[max/min]-[*]`      | `.[w/h]-[max/min]-[full/viewport]` at breakpoint `l` and larger |
| `.only-l:[w/h]-[max/min]-[*]` | `.[w/h]-[max/min]-[full/viewport]` only at breakpoint `l`       |
| `.xl:[w/h]-[max/min]-[*]`     | `.[w/h]-[max/min]-[full/viewport]` at breakpoint `xl`           |
