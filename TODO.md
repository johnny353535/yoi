# To Do

## Most Urgent

- [x] add glossary to docs
- [ ] complete user docs
- [ ] proof-read and edit user docs
- [ ] review, improve, refactor grid utilities
- [ ] write short styleguide for docs pages
- [ ] expand JSfiddle integration
- [ ] rename .menu and .mainMenu to more unique names?
- [ ] Utilities intro page:
    - the value "none" is expressed by "0", eg. b-0 = no borders
    - the opposite of none can be "all", eg. b-all = borders on all sides
    - numeric values, expressed like "*-1, *-2, …", can translate to pixels, eg. .bw-2 = border-width 2px or more abstract scalings
    - responsive utilities are expressed via breakpoint-prefixes (".s--, .m--, .l--, .xl--"), eg. .xl--fs-8 etc.
    - interactive utilities: ".hvr--"

## Nice to Have

- [ ] more constructor mixins
- [ ] add upload to boilerplate build process (via unix/bash script instead of node.js script)
- [ ] add lightbox component
- [ ] redraw & refactor icons

## Improvements

- [ ] rename .mainMenu
- [ ] add option to enable/disable behaviors depending on current breakpoint
- [ ] rebuild and optimizr behaviour "sticky"
- [ ] bring back slack webhook

## Future Roadmap

- [ ] gradient tool gets it's own repository
- [ ] refactor JS (modern syntax, modules, transpile via Babel
- [ ] make markup more accessible (according to [a11y checklist](http://a11yproject.com/checklist.html))
- [ ] migrate the project from bower to npm
- [ ] migrate from LESS to SASS