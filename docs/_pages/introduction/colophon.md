---
layout: base
title: Colophon
permalink: introduction/colophon
---

## Colophon
This page provides an overview of the different technologies, tools and frameworks used throughout the project. It assumes you understand at least the fundamentals of modern web technology – HTML, JavaScript, CSS.

### Node.js
[Node.js](https://nodejs.org/en/) is JavaScript that runs on a server. This could be a remote web server but in our case it is your computer. Node.js is the technology that runs the task runner we use (Gulp) and the templating system for this project (Nunjucks).

From the official website:

> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

### Gulp
[Gulp](http://http://gulpjs.com) is a so-called _task runner_. During development, Gulp runs some scripts (»_tasks_« in Gulp lingo) to manipulate the files you are working on. Gulp searches for a special JavaScript file named `gulpfile.js` – this is where all Gulp-tasks are defined.

This project already has a number of gulp tasks implemented and you should not modify them or add new tasks even if Gulp lets you do so. So what do the Gulp tasks do and how do you run them?

Gulp tasks get called from the console. On a Mac, this would be the Terminal app. By typing `gulp serve` for example, the whole source code from _/src_ gets processed and rendered into a static site, copied to the _/dist_ directory. During this process, a lot of stuff happens. Less files are rendered into CSS files, the individual JavaScript files get merged into a single file as well as compressed, and so on.

### Nunjucks
We use the [Nunjucks template engine](https://github.com/mozilla/nunjucks) to render the templates of this project. Like many modern template engines, Nunjucks features [template inheritance](https://mozilla.github.io/nunjucks/templating.html#template-inheritance) and [partials with parameters](https://mozilla.github.io/nunjucks/templating.html#macro) (called *macros*) in addition to plain page templates. Official description:

> A powerful templating engine with inheritance, asynchronous control, and more (jinja2 inspired).

### Less
[Less](http://lesscss.org) is a so-called _pre-processor_ for CSS. It looks like CSS but enhances it with lost of useful features like [variables](http://lesscss.org/features/#variables-feature), [mixins](http://lesscss.org/features/#mixins-feature), [loops](http://lesscss.org/features/#loops-feature) and more. There are other excellent pre-processors available but we stick to Less since a port to [Sass](http://sass-lang.com) for example would simply not be worth the time – Less provides all the features and stability we need for this project.

From the official website:

> Less is a CSS pre-processor, meaning that it extends the CSS language, adding features that allow variables, mixins, functions and many other techniques that allow you to make CSS that is more maintainable, themeable and extendable.

### jQuery
We use the JavaScript [jQuery](https://jquery.com) for our client-side JavaScript. In case you are not familiar with jQuery (excerpt from the official jQuery website):

> jQuery makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.
