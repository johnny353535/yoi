---
layout: base
group: start
title: CSS Styleguide
permalink: start/styleguide_css
---

## CSS / Less Style Guide
We mostly embrace [Airbnb’s CSS coding style](https://github.com/airbnb/css).

### Formating
Borrowed and slightly modified from Airbnb:

* Use soft tabs (4 spaces) for indentation.
* When using multiple selectors in a rule declaration, give each selector its own line.
* Put a space before the opening brace { in rule declarations.
* In properties, put a space after, but not before, the : character.
* Put closing braces } of rule declarations on a new line.
* Put blank lines between rule declarations.

```css
/* bad :( */

.some-element{
  border-radius:50%;
  border:2px solid white; }
.selectorOne, .selectorTwo, .selectorThree {
  ...
}
#someIdSelector {
  ...
}

/* good :) */

.someElement {
    border-radius: 50%;
    border: 2px solid white;
}

.selectorOne,
.selectorTwo,
.selectorThree {
    ...
}
```

#### BEM
Use the BEM convention! If you are not sure what this means, read the [great introduction for beginners on CSS-tricks](https://css-tricks.com/bem-101/).

```css
/* bad :( */

.myElement {
    ...
}

.myElement .title {
    ...
}

.myElement .copy {
    ...
}

.myElement.active {
    ...
}

/* good :) */

.myElement {
    ...
}

.myElement__title {
    ...
}

.myElement__copy {
    ...
}

.myElement--active {
    ...
}
```

#### Selectors

* Do not use id-selectors!
* Do not combine tag with class-selectors!

You **really do not need id-selectors for styling**. Apart from the fact that id-selectors are not reusable, they introduce an unnecessarily high level of specificity.

#### Comments

* Only use Less-style [single-line comments](http://lesscss.org/features/#features-overview-feature-comments).
* Prefer comments on their own line. Avoid end-of-line comments.
* Write detailed comments for code that isn't self-documenting (uses of z-index, compatibility or browser-specific hacks)

#### Ordering of Property Declarations

This topic can cause religious conflicts. We think it simply does not make sense to use any _creative_ ordering method. But ordering makes a lot of sense in order to spot duplicated declarations. The solution: **order by alphabet**. Most text editors let you select a block of code and order the lines alphabetically. This is what you should do.

### LESS-Features: Nesting, Mixins, Extends

* If you need to, use nesting. **Never go beyond two levels of nesting!**
* We only have very few mixins. Avoid to add more mixins.
* **Never use the extend feature!** It causes more problems than benefits.
* Use the [parent selector](http://lesscss.org/features/#parent-selectors-feature) wisely!

```css
/* bad :( */

div.myElement {
    &__title {
        color: red;
    }
    &__copy {
        border-bottom: red 2px solid;
        a {
            text-decoration: underline;
            span {
                font-weight: bold;
            }
        }
    }
}

/* good :) */

.myElement {
    ...
}

.myElement__title {
    ...
}

.myElement__copy {

    ...

    a {
        ...
    }

    span {
        ...
    }

}
```

### Example of Proper Formatting

```css
/** myElement.less */

// block
// =====

.myElement {
    .mixin-clearfix;
    background: #fff;
    border-radius: 2px;
    color: @blue-10;
    height: 14rem;
    width: 14rem;
}

// elements
// ========

.myElement__body {
    padding: 1.5rem;
}

// modifiers
// =========

// large

.myElement--large {
    height: 17rem;
    width: 17rem;
}

// small

.myElement--small {
    height: 10rem;
    width: 10rem;
}
```

### Specificity
In some rare cases, you just need to up the specificity of your CSS selector. While you could do so by adding a tag – eg. `div.foo .bar` beats `.foo.bar` – this is probably a bad idea since you should not make too many assumptions about the markup. Also, the use of IDs or `!important` is not a good strategy since they increase the specificity way too much. What else can we do?

There is a little know **legal hack**.

> Repeated occurrances [sic] of the same simple selector are allowed and do increase specificity.
> https://www.w3.org/TR/css3-selectors/#specificity

#### Example

```css
/* the selector to trump: */

.foo.foo--bar {
    color: red;
}

/* the bad strategies :( */

div.foo.foo--bar {
    color: green;
}

#someId .foo.foo--bar {
    color: green;
}

.bar .foo--bar {
    color: green !important;
}

/* the good strategy :) */

.foo.foo--bar.foo--bar {
    color: green;
}
```