---
layout: base
group: start
title: Project Structure
permalink: start/project_structure
---

## Project Structure

### Basic Directory Structure

#### Before Initial Setup

```
├── src/..
├── credentials.json
├── gulpfile.js
├── package.json
└── readme.md
```

#### After Initial Setup
After the initial check out from the GIT repository, the project only has one directory at root: */src*. **During the setup, two additional folders are added**: */dist* and */node_modules*.

```
├── dist/...
├── node_modules/...
├── src/
|   ├── assets/
|   |   ├── audio/...
|   |   ├── fonts/...
|   |   ├── img/...
|   |   ├── js/
|   |   |   ├── core/...
|   |   |   ├── libs/...
|   |   |   └── modules/...
|   |   └── less/
|   |       ├── core/...
|   |       ├── elements/...
|   |       ├── themes/...
|   |       ├── variables/...
|   |       ├── print.less
|   |       ├── screen-docs.less
|   |       ├── screen-s.less
|   |       └── screen.less
|   └── templates/
|       ├── desktop/
|       |   ├── layouts/...
|       |   ├── pages/...
|       |   └── index.html
|       ├── docs/
|       |   ├── layouts/...
|       |   ├── pages/...
|       |   └── index.html
|       ├── elements/...
|       ├── mobile/
|       |   ├── layouts/...
|       |   ├── pages/...
|       |   └── index.html
|       └── partials/...
├── credentials.json
├── gulpfile.js
├── package.json
└── readme.md
```

#### Main Directories
The following table describes the three main directories.

| Directory    | Content                                                                                                                                                                                   |
| -            | -                                                                                                                                                                                         |
| dist         | All assets (style sheets, images, scripts, pages) rendered from the */src* directory are written to this directory. The content of this directory is a fully functional static html page. |
| node_modules | All required node modules are copied to this directory during setup or update.                                                                                                            |
| src          | This directory contains all the source files that get rendered and merged into static assets and individual static html pages.                                                            |

### Files at Root

```
├── credentials.json
├── gulpfile.js
├── package.json
└── readme.md
```

| File             | Description                                                                                                           |
| -                | -                                                                                                                     |
| credentials.json | This file is excluded from the GIT repository. It contains passwords to upload the rendered pages to the test server. |
| gulpfile.js      | This file contains all gulp tasks and small custom extentions for the template engine.                                |
| package.json     | This file lists all required node modules.                                                                            |
| readme.md        | The readme file offers a quick start point and guides through the setup process.                                      |

<p class="hint hint--error"><b>Never Store Passwords inside the Repository!</b> While in may seem inconvenient, it is very important to **never store passwords inside the files under version control**. The reason is simple: If someone gains access to the GIT repository, she must not find additional passwords and therefore cause even more damage.</p>

### Dist Directory
Gulp processes the source files from /src and writes the compiled files to /dist. As a result, **the content of /dist is a fully functional static html site**.

### Assets Directory

```
└── assets/
    ├── audio/...
    ├── fonts/...
    ├── img/...
    ├── js/...
    └── less/...
```

This directory **contains all source files which are not templates**. */src/assets/audio*, */src/assets/fonts* and */src/assets/img* are self-explanatory. Each directory simply contains the files of a certain type.

#### src/assets/js

```
└── js/
    ├── core/...
    ├── libs/...
    └── modules/...
```

| Directory | Content                                                                                                                                   |
| -         | -                                                                                                                                         |
| core      | Higher order scripts that must be included before all other modules can run. Mostly helpers and the scripts needed for the documentation. |
| libs      | Third-party scripts. jQuery and such.                                                                                                     |
| modules   | Modules that power elements used in this project. *Slides*, *date picker*, *modals* and so on.                                            |

#### src/assets/less

```
└── less/
    ├── core/...
    ├── elements/...
    ├── themes/...
    ├── variables/...
    ├── print.less
    ├── screen-docs.less
    ├── screen-s.less
    └── screen.less
```

| Directory or File | Content                                                                                                                       |
| -                 | -                                                                                                                             |
| core/             | The core settings and elements (colors, mixins, normalize, …). More about these files under »CSS Interface« in the main menu. |
| elements/         | All elements used in this project. *Slides*, *date picker*, *modals* and so on.                                               |
| themes/           | Stylesheets to override the default colors and styles for custom branded pages or page sections.                              |
| variables/        | Less-Variables for breakpoints, colors, sizes, options and more.                                                              |
| print.less        | Very basic print stylesheet.                                                                                                  |
| screen-docs.less  | Index file for the documentation stylesheet.                                                                                  |
| screen-s.less     | Index file for small screen (= mobile) site.                                                                                  |
| screen.less       | Index file for (desktop) site.                                                                                                |

### Templates Directory

```
└── templates/
    ├── desktop/
    |   ├── layouts/...
    |   ├── pages/...
    |   └── index.html
    ├── docs/
    |   ├── layouts/...
    |   ├── pages/...
    |   └── index.html
    ├── elements/...
    ├── mobile/
    |   ├── layouts/...
    |   ├── pages/...
    |   └── index.html
    └── partials/...
```

| Directory | Content                                                                                                                                                |
| -         | -                                                                                                                                                      |
| desktop/  | All templates and pages for the Juvalis dektop site.                                                                                                   |
| docs/     | All templates and pages for the Juvalis documentation.                                                                                                 |
| elements/ | Elements used across all sites (desktop and mobile). Eg. sliders, menus, headers, etc. …                                                               |
| mobile/   | All templates and pages for the Juvalis mobile site.                                                                                                   |
| partials/ | Blocks of markup that are build with [utility classes](/pages/css_interface/utilities.html) only and therefore not defined as individual elements. |

### What is xyz?

<p class="hint"><b>Colophon</b> The documentation assumes the reader has at least basic knowledge about the technologies involved. However, a basic overview can be found at the <a href="pages/introduction/colophon.html">colophon page</a>.</p>