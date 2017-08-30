# YOI - the Yoshino Frontend Component Library

YOI is Yoshino’s custom-built frontend component library. It enables our team to design, build, test and iterate web pages _directly in the browser_. YOI was made to be used by designers with basic knowledge of HTML and CSS – at it’s core stands a simple HTML-based interface.

## Documentation

At the moment we are still working to complete our [user manual](https://yoshino-digital.github.io/yoi/). A proper technical documentation will follow.

## Installing

- install Node.js and NPM: [on MacOs](https://treehouse.github.io/installation-guides/mac/node-mac.html) | [on Windows](https://treehouse.github.io/installation-guides/windows/node-windows.html)
- install Jekyll: [on MacOs](https://treehouse.github.io/installation-guides/mac/jekyll-mac.html)  | [on Windows](https://treehouse.github.io/installation-guides/windows/jekyll-windows.html)
- clone this repository, navigate to the local directory via Terminal and start the setup: `npm install`

If you work on a Windows machine, you might be interested in [this article about a modern web development setup on Windows](https://github.com/felixrieseberg/windows-development-environment).

## Developing

During development, you can use the following NPM scripts:

### Build & Serve

- Run the build process for development: `npm run build`
- Start a local preview server (with auto-refresh on changes): `npm run serve`
- It makes sense to chain the two commands: `npm run build && npm run serve`

### Deploy & Commit

- Once you are ready to publish your changes, run the deploy process: `npm run deploy`
- Add your changes: `git add *`
- Commit your changes: `git commit -m "your commit message"`
- And finally push your changes to the repository on GitHub: `git push`

If you wish to learn more about using GIT and GitHub, [this website](http://rogerdudler.github.io/git-guide/) might be a valuable recource for you.

## Licensing

We plan to release YOI under a Creative Commons Attribution-NonCommercial license.

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Notizen
=======

- code examples
    - eventuell css-klassenenamen highlighten?
    - copy & paste einbauen (https://alligator.io/js/copying-to-clipboard/)

- build-process
    - braucht kein deploy, compress etc. da nur auf gh-pages?
    - nein: deploy ist für dest!
    - kann auf bower als sources verzichtet werden?
        - einzige dependencies: jQuery und normalize css
        - würde den install-prozess vereinfachen
        - bower aber weiterhin für alle weiteren instanzen nutzen
- inline svgs
    - eventuell ein script schreiben das die jekyll *.md files
      parsed und inline svgs einfügt?
    - ja! macht sinn. aber wie im build-prozess eingliedern?
    - vor jedem serve oder build!
- documentation
    - tables vereinheitlichen
    - link zu source files: immer git

- responsive
    - option für jedes util, responsive classes zu erzeugen
    - dazu vars als flags!
    - breakpoints -> auch hier flags setzen für breakpoints, so dass nur der code erzeugt wird, der benötigt wird

- https://github.com/felixrieseberg/windows-development-environment

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
