---
layout: base
group: utilities
title: Introduction
permalink: utilities/
---

# Utilities

<p class="intro">YOI <i>utilities</i> are specific <i>single-purpose CSS classes</i> to modify or create designs without actually writing CSS.</p>

## Logic

*Utilities* are CSS classes with *only one or very few rules*. Each utility only does what you would *expect*. See the following example with the utilities `fw-bold` (font weight bold) and `fst-italic` (font style italic):

```html
<!-- example -->
<p class="fw-bold">Bold</p>
<p class="fst-italic">Italic</p>
```

Utilities are highly reuseable and almost infinitely combineable. You can easily combine the two utilities from the first example:

```html
<!-- example -->
<p class="fw-bold fst-italic">Bold Italic</p>
```

### Naming Scheme

Utilities are named after a consistent set of rules to make remembering the names as easy as possible:

#### Basic Rules

| *CSS rules* have property/value pairs                                     | `property: value;` like `display: block;` |
| In most *utility names*, properties/values are seperated by a single dash | `property-value`                          |
| *Properties* are shortened to 1–4 characters                              | `p-value`, eg. `d-block`                  |
| Most *values* are not shortened                                           | `d-inline`, `d-block`, `d-inlineblock`, … |

#### Value Shorthands

Some values are shortened to make the resulting utility class names shorter:

| top, right, bottom, left                       | `t`, `r`, `b`, `l`     |
| top & bottom, left & right                     | `tb`, `lr`             |
| top-left, top-right, bottom-right, bottom-left | `tl`, `tr`, `br`, `bl` |
| none, 0                                        | `0`                    |

#### Value Steps

Some values represent steps. Steps can be of different scopes (eg. 1–25, 1–6, …) and different units (eg. `px`, `rem`, `%`, …). This varies from affected properties, like `border-width`, `opacity`, `width` and is documented on each utility group page.

## Using Utilities

Utilities provide a simple, fast and consistent way to design by only writing HTML. Combine them to create almost every design you like. However, utilities also have limitations. For example if you want to create a complex responsive layout, it might be better to create a new style sheet with your own CSS classes and rules.

### To Add …

Use utilities to *add styles*. In the following example, a [box component]({{ site.github.url }}/components/box.html) gets a margin from the [spacing-utility]({{ site.github.url }}/utilities/spacing.html) `.m-6`:

```html
<!-- example -->
<div class="box m-6">
    <div class="box__header">Example</div>
    <div class="box__body">
        <p>This is a modified box component.</p>
    </div>
</div>
```

### To Modify …

Use utilities to *override styles*. In the following example, the [box component]({{ site.github.url }}/components/box.html) gets a wider border with a different color via `bw-2` and `bc-red-15`:

```html
<!-- example -->
<div class="box bc-red-15 bw-2">
    <div class="box__header">Example</div>
    <div class="box__body">
        <p>This is a modified box component.</p>
    </div>
</div>
```

### To Create …

Use utilities to create new elements. The element in the following example uses many utilities for [color]({{ site.github.url }}/utilities/color.html), [shadows]({{ site.github.url }}/utilities/shadow.html), [typography]({{ site.github.url }}/utilities/typography.html) and more …

```html
<!-- example -->
<div class="bg-white br-all m:w-1-2 tdr-none m-2 c-primary-10 sh-2 ofl-hidden hvr:sh-4 trn" href="#">
    <img class="d-block w-1-1" src="https://source.unsplash.com/-rWjydNhATw/600x300">
    <div class="p-3 p-lr-4">
        <h4 class="m-b-1">Running Like a Pro</h4>
        <p class="fs-2 lh-3">These 10 secret tricks will turn you into a successful runner.</p>
    </div>
</div>
```

## Interactive Utilities (mouseover-prefix)

Some utilities feature *interactive* utilities as listed on each individual documentation page.

| `.hvr:[utility]` | apply the utility’s styling on *mouseover* |

## Responsive Utilities (breakpoint-prefixes)

Some utilities feature *responsive* utilities as listed on each individual documentation page. Use the following breakpoint-prefixes:

| `.only-s:[utility]` | apply the utility’s styling only at breakpoint `s`       |
| `.m:[utility]`      | apply the utility’s styling at breakpoint `m` and larger |
| `.only-m:[utility]` | apply the utility’s styling only at breakpoint `m`       |
| `.l:[utility]`      | apply the utility’s styling at breakpoint `l` and larger |
| `.only-l:[utility]` | apply the utility’s styling only at breakpoint `l`       |
| `.xl:[utility]`     | apply the utility’s styling at breakpoint `xl`           |
