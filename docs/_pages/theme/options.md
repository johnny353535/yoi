---
layout: base
group: theme
title: Options
permalink: theme/options
---

## Options

Use the variables

### Available Option Flags

#### @debugGrid
#### @debugBemElements
#### @debugBemModifiers
#### @debugMediaquery

While debugging your layouts, set `@debugMediaquery` to `true` in your master Less sheet to **display the active media query at the bottom left of every page**.

#### @broadCastActiveMediaqueryToJs

If you write JavaScript and need to read the current break point, there is a helper function in [helpers.js](assets/js/core/helpers.js) called `currentBreakpoint()`. The function returns the following keywords:

* none
* small
* medium
* large
* xlarge

Use it in your code like this:

```js
myFunction() {

    if (currentBreakpoint() === 'small') {

        // do something only if screen is small

    } else {

        // do something else

    }

}
```