# YOI - the Yoshino Frontend Component Library

YOI (pronounced *yo-ee*) is Yoshino’s custom-built frontend component library. It enables our team to design, build and test web pages *directly in the browser*. It was made to be used by designers with basic knowledge of HTML and CSS – at its core stands a simple *HTML-based interface*.

## Documentation

At the moment we are still working to complete our [user manual](https://yoshino-digital.github.io/yoi/).

## Installing

- install Node.js and NPM: [on MacOs](https://treehouse.github.io/installation-guides/mac/node-mac.html) | [on Windows](https://treehouse.github.io/installation-guides/windows/node-windows.html)
- clone this repository, navigate to the local directory via Terminal and start the setup: `npm install`

If you work on a Windows machine, you might be interested in [this article about a modern web development setup on Windows](https://github.com/felixrieseberg/windows-development-environment).

## Developing

During development, you can use the following [NPM scripts](https://docs.npmjs.com/misc/scripts):

### Build & Serve

1. Run the build process for development: `npm run build`
2. Start a local preview server (with auto-refresh on changes): `npm run serve`

It makes sense to chain the two commands: `npm run build && npm run serve`

### Publish & Commit

Development is limited to the Yoshino frontend team. Unfortunately, at this point we do not have the recources to run this as a real open source project – but maybe in the future we will.
However, as a Yoshino team member, this is how you publish your changes:

1. Make sure you bump up the version number in bower.json
2. Once you are ready, run the publish process: `npm run publish`
3. After the publish process is complete, push to the repository
4. Tag a new release with the new version number

If you wish to learn more about using GIT and GitHub, [this website](http://rogerdudler.github.io/git-guide/) might be a valuable recource for you.

## Licensing

We plan to release YOI under a Creative Commons Attribution-NonCommercial license.