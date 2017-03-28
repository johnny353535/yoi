---
layout: base
group: start
title: CSS Styleguide
permalink: start/styleguide_js
---

## JavaScript Style Guide
We mostly embrace [Airbnb’s JavaScript coding style](https://github.com/airbnb/javascript).

### ES2015 / Babel

We plan to use [Babel](https://babeljs.io) to write all our JavaScript in the _future_ ES2015 syntax and transpile it into »old school« JavaScript. But not yet.

### Module Pattern

We use the [Revealing Module Pattern](https://carldanley.com/js-revealing-module-pattern/) for our scripts.


```js
var MyModule = (function() {

    function myMethod() {
        alert('my method');
    }

    function myOtherMethod() {
        alert('my other method');
    }

    // explicitly return public methods when this object is instantiated

    return {
        someMethod      : myMethod,
        someOtherMethod : myOtherMethod
    };
})();

// example usage

MyModule.myMethod();        // undefined
MyModule.myOtherMethod();   // undefined
MyModule.someMethod();      // alerts "my method"
MyModule.someOtherMethod(); // alerts "my other method"
```

### Formatting

#### Indentation, White Space and Line Breaks
Use four spaces instead of one tab. Don’t add a line break at the end of a file. Use unix-style line breaks.

#### Blocks / Brackets
For all blocks, keep the opening curly bracket on the same line and put the closing curly bracket on a new line.

```js
// bad :(

function sayHello()
{
    alert('Hello!');
}

// good :)

function sayHello() {
    alert('Hello!');
}
```

For control structures with a single statement, curly brackets are optional but do not add line breaks and indentation.

```js
// bad :(

if (x > y)
    doSomething();

// good :)

if (x > y) doSomething();
```

#### Control Structures vs. Functions
Use one space between a control key word (eg. _if_) and the following curly brackets but write the curly brackets for function parameters directly after the function key word or function identifier.

```
// bad :(

if(x > y) {
    ...
}

doSomething ();

// good :)

if (x > y) {
    ...
}

doSomething();
```

#### Function and Variable Names in CamelCase
Use camelCase for function or variable names.

```js
// bad :(

var some_variable = 12;

function some_function() {
    ...
}

doSomething ();

// good :)

var someVariable = 12;

function someFunction() {
    ...
}
```

#### Block Comments
Use [jsDocs-Style comment blocks](http://usejsdoc.org/about-getting-started.html), eg. to describe functions, their parameters and output.

```js
function cleanIndent(code) {

    /**
     *  Remove unnecessary indentation from input
     *  and return the output.
     *
     *  @param  {string/html} code        - the input code
     *  @return {string/html} cleanedCode - the processed output code
     */

    var pattern     = code.match(/\s*\n[\t\s]*/);
    var cleanedCode = code.replace(new RegExp(pattern, "g"),'\n');

    return cleanedCode;

}
```

#### Be Verbose!
Use a somewhat [_literate programmming style_](https://en.wikipedia.org/wiki/Literate_programming) as much as possible. It makes the code human-readable and saves you a lot of time if you look at old code and try to figure out what you did back then.

```js
// bad :(

function formatCode(code, language) {

    var cleanedCode     = code.replace(/^\s*[\n\r]/gm, '');
    var beautifiedCode  = html_beautify(cleanedCode, { "wrap_line_length" : 0 });
    var highLightedCode = Prism.highlight(beautifiedCode, Prism.languages[language]);
    var formattedCode   = highLightedCode;

    return formattedCode;

}

// good :)

function formatCode(code, language) {

    /**
     *  Format and clean up the input (code) and add
     *  language specific syntax-highlighting.
     *
     *  @param  {string/html} code          - the input code to format
     *  @param  {string}      language      - a look-up key to select the language
     *  @return {string/html} formattedCode - the formatted and highlighted code
     */

    // remove blank lines
    // http://stackoverflow.com/questions/16369642

    var cleanedCode = code.replace(/^\s*[\n\r]/gm, '');

    // beautify
    // https://github.com/beautify-web/js-beautify

    var beautifiedCode = html_beautify(cleanedCode, {
        "wrap_line_length" : 0
    });

    // run syntax highlighter "prism"
    // http://prismjs.com

    var highLightedCode = Prism.highlight(beautifiedCode, Prism.languages[language]);

    // re-assign code variable

    var formattedCode = highLightedCode;

    // return the formatted code

    return formattedCode;

}
```

#### Use Tabular Formatting to Boost Readability
If you write large blocks of variable assignment or some object notation or so on, use tabular formatting to make your code more readable.

```js
// bad :(

var someVariable = 'hey';
var someOtherVariable = 'hello';
var anotherVariable = 'yo';

options = {
    'someOption': 42,
    'someOtherOption': 99,
    'anotherOption': false
}

// good :)

var someVariable      = 'hey';
var someOtherVariable = 'hello';
var anotherVariable   = 'yo';

options = {
    'someOption'      : 42,
    'someOtherOption' : 99,
    'anotherOption'   : false
}
```

#### Use Single Quotes
Use single quotes over double quotes. It does not really make any difference but since we use double quotes in our markup, you avoid escaping. However, if you need proper JSON objects, use double quotes in object notation.

```js
// bad :(

var myMarkup = "&lt;div class=\&quot;box\&quot;&gt;&lt;/div&gt;";

// good :)

var myMarkup = '&lt;div class=&quot;box&quot;&gt;&lt;/div&gt;';
```

#### Put Large Strings on Multiple Lines
Use multiple lines for large strings like template snippets.

```js
// bad :(

var myMarkup = '&lt;div class=&quot;elements&quot;&gt;&lt;h3 class=&quot;element__title&quot;&gt;Some Title&lt;/h3&gt;&lt;p class=&quot;element__copy&quot;&gt;Some copy text&lt;/p&gt;&lt;/div&gt;';

// good :)

var myMarkup = '\
    &lt;div class=&quot;elements&quot;&gt;\
        &lt;h3 class=&quot;element__title&quot;&gt;Some Title&lt;/h3&gt;\
        &lt;p class=&quot;element__copy&quot;&gt;Some copy text&lt;/p&gt;\
    &lt;/div&gt;\
';
```

#### Use === and !== over == and !=
Because this is what you really want in most cases.