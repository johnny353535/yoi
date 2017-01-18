/** yoi.js */

var YOI = (function() {

    return {

        stringContains : function(input, searchString) {

            /**
             *  Check a string (input) for any occurance of a given
             *  subsstring (searchString) and return true/false accordingly.
             *
             *  @param  {string} input        - the string to search (hay stack)
             *  @param  {string} searchString - the string to find (needle)
             *  @return {bool}
             */

            // cancel if input is not valid

            if (input === undefined || searchString === undefined) return false;

            // check for substring

            if (input.indexOf(searchString) > -1) {
                return true;
            } else {
                return false;
            }

        },

        environment : function(envName) {

            /**
             *  Get an "environment" flag, useful to tag pages
             *  that are designed for a specific screen or platform.
             *
             *  @param  {string} envName - the environment name to check for
             *  @return {bool}
             */

            if ($('body').data('environment') === envName) {
                return true;
            } else {
                return false;
            }

        },

        currentBreakpoint : function() {

            /**
             *  Read and return the currently active media-query.
             *
             *  @return {string} - the active media query name
             */

            return window.getComputedStyle(document.body,':after').getPropertyValue('content').replace(/\"/g, '');

        },

        locale : function() {

            /**
             *  Read and return the "lang" attribute of a page.
             *
             *  @return {string} - the page language as ISO language code
             */

            return $('html').attr('lang');

        },

        foundModule : function(module) {

            /**
             *  Syntax sugar to test if a module is available.
             *
             *  @param  {string} module - the exact name of the module variable
             *  @return {bool}
             */

            if (typeof window[module] === 'object') {
                return true;
            } else {
                return false;
            }

        },

        blink : function(elem) {

            /**
             *  Blink animation.
             *
             *  @param  {jQuery dom object} elem - the element to blink
             *  @return {bool false}             - return false if elem is not a jQuery dom object
             */

            // cancel if elem is not a jQuery object

            if (!(elem instanceof jQuery) || elem === undefined) return false;

            // animate

            elem.animate({ opacity: 0 }, 100)
                .animate({ opacity: 1 }, 100)
                .animate({ opacity: 0 }, 100)
                .animate({ opacity: 1 }, 100);

        },
        
        pulse : function(elem) {

            /**
             *  Pulse animation.
             *
             *  @param  {jQuery dom object} elem - the element to pulse
             *  @return {bool false}             - return false if elem is not a jQuery dom object
             */

            // cancel if elem is not a jQuery object

            if (!(elem instanceof jQuery) || elem === undefined) return false;

            // animate

            elem.animate({ opacity: .2 }, 300)
                .animate({ opacity:  1 }, 300)
                .animate({ opacity: .2 }, 300)
                .animate({ opacity:  1 }, 300);

        },

        setDelay : function(delayName, delayTime, delayFunction) {

            /**
             *  Syntax sugar to set up a timeout.
             *
             *  @param {string}                       delayName     - variable name for the timeout
             *  @param {number}                       delayTime     - delay time in ms
             *  @param {string || anonymous function} delayFunction - exact function name or anonymous function
             */

            // remove running timeout

            this.clearDelay(delayName);

            // set timeout

            window[delayName] = window.setTimeout(function() {
                (delayFunction)();
            }, delayTime);

        },

        clearDelay : function(delayName) {

            /**
             *  Syntax sugar to clear a timeout.
             *
             *  @param {string} delayName - variable name for the timeout
             */


            if (typeof window[delayName] === 'number') {
                window.clearTimeout(window[delayName]);
                window[delayName] = undefined;
            }

        },

        setInterval : function(intervalName, intervalTime, intervalFunction) {

            /**
             *  Syntax sugar to set up an interval.
             *
             *  @param {string}                       intervalName     - variable name for the interval
             *  @param {number}                       intervalTime     - interval time in ms
             *  @param {string || anonymous function} intervalFunction - exact function name or anonymous function
             */

            // cancel running interval

            this.clearInterval(intervalName);

            // set interval

            window[intervalName] = window.setInterval(function() {
                (intervalFunction)();
            }, intervalTime);

        },

        clearInterval : function(intervalName) {

            /**
             *  Syntax sugar to clear an interval.
             *
             *  @param {string} intervalName - variable name for the interval
             */

            if (typeof window[intervalName] === 'number') {
                window.clearInterval(window[intervalName]);
                window[intervalName] = undefined;
            }

        },

        toObject : function(input) {

            /*
             *  Parse a string of certain formatting and turn it into
             *  a JavaScript object.
             *
             *  Examples of valid input:
             *
             *  foo:something
             *  foo: something
             *  foo : something
             *  foo:something;
             *  foo:something; bar:somethingelse
             *  foo:something; bar:somethingelse;
             *  foo :something; bar:   somethingelse;
             *  foo:something;bar:somethingelse;
             *
             *  @param  {string} input                      - the input to process, see example above
             *  @return {object || bool false} properObject - a proper JS object notation
             */

            var keyValuePair;
            var properObject = {};

            if (YOI.stringContains(input, ':')) {

                // clean up input, replace multiple whitespace characters with a single white space
                // eg. "    " is turned into " "

                input = (input || '').replace(/\s+/g,' ').split(';');

                // turn input into a proper object by creating key/value
                // pairs by splitting the input at any occurance of a colon (:),
                // remove leading and trailing white space (JS native trim function)
                // and finally turning the resulting strings into a simple JS object notation

                for (var i = 0; i < input.length; i++) {
                    
                    keyValuePair = input[i].split(':');

                    if (keyValuePair[1] !== undefined)
                        properObject[keyValuePair[0].trim()] = keyValuePair[1].trim();

                }

                return properObject;

            } else {

                return false;

            }

        },

        zeroPad : function(num, digits) {

            /**
             *  Add leading zeros to a given number and return the result.
             *
             *  @param  {number} num    - the number
             *  @param  {number} digits - the number of leading zeros
             *  @return {string}        - the padded number
             */

            var num = Math.abs(num);
            var digits = digits !== undefined ? digits : 1;
            var i = 1;
            var leadingZeros = '0';

            while (i < digits) {
                i++;
                leadingZeros += '0';
            }

            return (leadingZeros + num).slice(-digits-1);

        },
        
        hide : function($target) {
            
            /**
             *  Hides an element which has a Yoshino UI-Core display utility class like
             *  d-block, d-inl, d-inlblk. The script remembers the display class and
             *  puts it back, once YOI.show() gets called.
             *
             *  @param {number} $target - the jQuery target dom element
             */
            
            // cancel if $target is no valid jQuery onject
            
            if (!($target instanceof jQuery)) {
                return false;
            }
            
            // get the display utility class
            
            if ($target.hasClass('d-blk')) {
                $target.data('displayUtilityClass', 'd-blk');
            } else if ($target.hasClass('d-inl')) {
                $target.data('displayUtilityClass', 'd-inl');
            } else if ($target.hasClass('d-inlblk')) {
                $target.data('displayUtilityClass', 'd-inlblk');
            }
            
            // remove all display utility classes
            
            $target.removeClass('d-blk d-inl d-inlblk');

            // hide the target
            
            $target.hide();

        },

        show : function($target) {

            /**
             *  Show an element which was previously hidden by YOI.hide().
             *  Re-assigns the previously remembered Yoshino UI-Core display utility class.
             *
             *  @param {number} $target - the jQuery target dom element
             */
            
            // cancel if $target is no valid jQuery onject
            
            if (!($target instanceof jQuery)) {
                return false;
            }
            
            if ($target.data('displayUtilityClass') === undefined) {
                
                // if $target's data('displayUtilityClass') is undefined,
                // fall back to jQuery's $.show() method
                
                $target.show();
                
            } else {
                
                // if $target does have data('displayUtilityClass'),
                // re-assign the stored utility class in order to show the target
                
                $target.addClass($target.data('displayUtilityClass'));
                
            }

        }

    }

})();

/** documentation.js */

var Documentation = (function() {

    // private vars
    // ============

    var initialized = false;

    var languages = {
        'css'  : 'css',
        'js'   : 'javascript',
        'less' : 'less'
    }

    var $codeBlock = $('<code></code>');
    var $preBlock  = $('<pre></pre>');

    var $controls = $('\
        <p class="documentation__controls">\
            <button data-action="toggleDarkmode">background</button>\
            <button data-action="toggleCode">code</button>\
        </p>\
    ');

    var $fileDisplay = $('\
        <div id="fileDisplay" class="documentation__fileDisplay">\
            <button class="btn btn--subtle btn--large">\
                <span class="hidden">close</span>\
                <i class="icon--006-s" aria-hidden="true"></i>\
            </button>\
            <code>\
                <pre></pre>\
            </code>\
        </div>');

    // private functions
    // =================

    function initializeDocumentation() {

        /**
         *  Initialize the documentation: inject dom elements
         *  and attach events in order to display example code.
         */

        initializeControls();
        initializeFileDisplay();

        // hightlight code inside code-tags found in markup

        $('[class^="language-"]').each(function() {
            if (YOI.foundModule('Prism'))
                Prism.highlightElement($(this).find('pre')[0]);
        });

        // print the code for each code-example block

        $('.documentation__example[data-printcode]').each(function() {

            var $thisExampleBlock = $(this);
            var options           = YOI.toObject($thisExampleBlock.data('printcode'));

            /**
             * available options:
             *
             * @option {bool}   print          - print the code on page load
             * @option {bool}   printWithDelay - print the code after a short delay (useful if other scripts modifiy the code)
             * @option {bool}   format         - format / beautify the code - default is true
             * @option {bool}   highlight      - add syntax-highlighting to the code - default is true
             * @option {bool}   hideExample    - only show the code, hide the example
             * @option {string} language       - "markup"|"css"|"clike"|"javascript"|"less" (http://prismjs.com/#languages-list)
             */

            if (options.printWithDelay) {

                YOI.setDelay('printCodeDelay', 1000, function() {
                    printCode($thisExampleBlock);
                });

            } else {

                printCode($thisExampleBlock);

            }

        });

    }

    function initializeControls() {

        /**
         *  Add control elements to example blocks to switch
         *  between light and dark background or toggle code examples.
         */

        $('[data-docblock]').each(function() {

            var $thisDocBlock = $(this)
            var options       = YOI.toObject($thisDocBlock.data('docblock'));

            /**
             *  available options:
             *
             *  @option {bool} addControls - show controls
             */

            if (options.addControls) {

                var $thisExampleBlock = $thisDocBlock.find('.documentation__example');

                // insert buttons

                $thisDocBlock.append($controls.clone());

                // add events to buttons

                var $thisColorBtn = $thisDocBlock.find('[data-action="toggleDarkmode"]');
                var $thisCodeBtn  = $thisDocBlock.find('[data-action="toggleCode"]');

                $thisColorBtn.on('click', function() {
                    $thisDocBlock.toggleClass('documentation__block--dark');
                });

                $thisCodeBtn.on('click', function() {

                    var $thisCodeBlock = $thisDocBlock.find('code');

                    if ($thisCodeBlock.length) {
                        toggleCode($thisCodeBlock);
                    } else {
                        printCode($thisExampleBlock);
                    }

                });

            }

        });

    }

    function initializeFileDisplay() {

        /**
         *  Create a full-page overlay to display code.
         */

        // inject the file display

        $('.documentation').append($fileDisplay.clone().hide());

        // attach events to links

        $('.documentation__body a').each(function() {

            var $thisAnchor  = $(this);
            var thisFilePath = $thisAnchor.attr('href');

            // check the path

            var validFilePath = thisFilePath === undefined || thisFilePath === '#' || thisFilePath === '' ? false : true;

            // get the file extention

            if (validFilePath) {

                var thisFileExtention = thisFilePath.split('.')[1];
                var thisLanguage      = languages[thisFileExtention];

                // attach events to this link

                if (languages[thisFileExtention] !== undefined) {

                    $thisAnchor.on('click', function(e) {
                        e.preventDefault();
                        showFileDisplay($thisAnchor, thisLanguage);
                    });

                }

            }

        });

        // attach event to close button

        $('#fileDisplay .btn').on('click', function() {

            $('#fileDisplay').find('code').scrollTop(0);
            $('#fileDisplay').hide();

        });

    }

    function showFileDisplay(thisCaller, thisLanguage) {

        /**
         *  Open a full-page overlay to display code that is fetched via
         *  ajax from a link to a file (less, JavaScript, etc.).
         *
         *  @param {jQuery dom object} thisCaller   - the link calling this function
         *  @param {string}            thislanguage - a look-up key to select the language
         */

        var $thisLink        = thisCaller;
        var $fileDisplay     = $('#fileDisplay');
        var $pre             = $fileDisplay.find('pre');

        var thisFilePath     = $thisLink.attr('href');
        var highLightedCode;

        // get the file content via ajax

        $.ajax({
            url      : thisFilePath,
            dataType : 'text'
        })
        .done(function(responseData) {

            if (YOI.foundModule('Prism')) {

                // highlight with prism.js if available
                
                highLightedCode = Prism.highlight(responseData, Prism.languages[thisLanguage]);
                $pre.html(highLightedCode);

            } else {

                // or display the plain code

                $pre.html(responseData);

            }

        })
        .fail(function() {

            // display an error message

            $pre.html('<span class="tc-error">File not found.');

        });

        // show the file display

        $fileDisplay.fadeIn('fast');

    }

    function formatCode(code, language) {

        /**
         *  Format and clean up the input code.
         *
         *  @param  {string/html} code          - the input code to format
         *  @param  {string}      language      - a look-up key to select the language
         *  @return {string/html} formattedCode - the formatted code
         */

        // remove blank lines
        // http://stackoverflow.com/questions/16369642

        var cleanedCode = code.replace(/^\s*[\n\r]/gm, '');

        // beautify
        // https://github.com/beautify-web/js-beautify

        var beautifiedCode;

        switch (language) {
            case 'markup':
                beautifiedCode = html_beautify(cleanedCode, {
                    'wrap_line_length' : 0
                });
                break;
            case 'less' || 'css':
                beautifiedCode = css_beautify(cleanedCode);
                break;
            case 'javascript':
                beautifiedCode = js_beautify(cleanedCode, {
                    'wrap_line_length' : 0
                });
                break;
            default:
                beautifiedCode = cleanedCode;
        }

        // re-assign code variable

        var formattedCode = beautifiedCode;

        // return the formatted code

        return formattedCode;

    }

    function highlightCode(code, language) {

        /**
         *  Add syntax highlighting to code.
         *
         *  @param  {string/html} code            - the input code to format
         *  @param  {string}      language        - a look-up key to select the language
         *  @return {string/html} highLightedCode - the highlighted code
         */

        // run syntax highlighter "prism"
        // http://prismjs.com

        var highLightedCode = Prism.highlight(code, Prism.languages[language]);

        // return the highlighted code

        return highLightedCode;

    }

    function printCode($thisExampleBlock) {

        /**
         *  Inject a code block right after an example block
         *  to display the example code.
         *
         *  @param {jQuery dom object} $thisDocBlock - the example block to display the example code
         */

        var $thisDocBlock = $thisExampleBlock.first().closest('.documentation__block');

        $thisExampleBlock.each(function() {

            var $thisExampleBlock = $(this);
            var $thisCodeBlock    = $codeBlock.clone();
            var $thisPreBlock     = $preBlock.clone();

            var options           = YOI.toObject($thisExampleBlock.data('printcode'));
            var content           = decodeEntities($thisExampleBlock.html());
            var processedCode;

            // cast option flags to boolean

            if (options.format    === 'false') options.format    = false;
            if (options.highlight === 'false') options.highlight = false;

            // process the code

            if (options.format === false && options.highlight === false) {

                // if format and highlight are false, don't process the code at all
                processedCode = content;

            } else if (options.format === false) {

                // if format is false, only highlight the code
                processedCode = highlightCode(content, options.language);

            } else if (options.highlight === false) {

                // if highlight is false, only format the code
                processedCode = formatCode(content, options.language);

            } else {

                // default: format and highlight the code
                processedCode = highlightCode(formatCode(content, options.language), options.language);

            }

            // print the processed code

            $thisPreBlock.html(processedCode);

            // insert elements

            $thisCodeBlock.append($thisPreBlock).hide();
            $thisExampleBlock.after($thisCodeBlock);

            // reveal the pre block

            if (options.print || options.printWithDelay)
                toggleCode($thisCodeBlock, true);

            // hide the example and only show the code

            if (options.hideExample)
                $thisExampleBlock.hide();

        });

    }

    function toggleCode($thisCodeBlock, showWithoutAnimation) {

        /**
         *  Shows or hides a code block with a jQuery slide animation.
         *
         *  Since jQuery sets visibility for elements it animates with
         *  slideToggle() to it's initial display value (for <code> this
         *  would be display:inline-block), this function makes sure the
         *  <code> element is set to display:block after the animation
         *  is complete.
         *
         *  @param {jQuery dom object} $thisCodeBlock       - the code block
         *  @param {bool}              showWithoutAnimation - show the code block instantly
         */

        if (showWithoutAnimation) {

            $thisCodeBlock.css('display','block');

        } else {

            if ($thisCodeBlock.is(':visible')) {
                $thisCodeBlock.slideUp('fast');
            } else {
                $thisCodeBlock.slideDown('fast', function() {
                    $thisCodeBlock.css('display','block');
                });
            }

        }

    }

    function decodeEntities(code) {

        /**
         *  Decode input to HTML entities and
         *  return the output.
         *
         *  @param  {string/html} code        - the input code
         *  @return {string}      decodedCode - the processed output code
         */

        var tmpTextarea = $('<textarea>');
        var decodedCode = tmpTextarea.html(code).val();

        return decodedCode;

    }

    function cleanIndent(code) {

        /**
         *  Remove unnecessary indentation from input
         *  and return the output.
         *
         *  @param  {string/html} code        - the input code
         *  @return {string/html} cleanedCode - the processed output code
         */

        var pattern     = code.match(/\s*\n[\t\s]*/);
        var cleanedCode = code.replace(new RegExp(pattern, 'g'),'\n');

        return cleanedCode;

    }

    function removeEmptyLines(code) {

        /**
         *  Remove empty lines from input and return
         *  the output.
         *
         *  @param  {string/html} code        - the input code
         *  @return {string/html} cleanedCode - the processed output code
         */

        var pattern     = code.match(/^\s*[\r\n]/gm);
        var cleanedCode = input.replace(new RegExp(pattern, 'g'),'\n');

        return cleanedCode;

    }

    // initialize
    // ==========

    initializeDocumentation();

    // public functions
    // ================

    return {
        init : initializeDocumentation
    }

})();

/** accordion.js */

var Accordion = (function() {
    
    // private functions
    // =================
    
    function initializeAccordion($accordion, options) {
        
        /**
         *  Initialize all *[data-accordion] found in the document (= function call without parameters)
         *  or target one or more specific *[data-accordion] (= function call with $accordion).
         *  $accordion must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $accordion - the accordion(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div class="accordion" data-accordion="linked:true;">
         *
         *  Available options:
         *
         *  @option {string ["true"|"false"]} linked - set "true" to link the accordion sections. only
         *                                             one section can be open, the remaining sections
         *                                             will always close
         */
        
        if (!($accordion instanceof jQuery)) {
            $accordion = $('[data-accordion]');
        }
        
        $accordion.each(function() {
            
            var $thisAccordion = $(this);
            var $thisSections  = $thisAccordion.find('.accordion__section');
            var options        = options === undefined ? YOI.toObject($thisAccordion.data('accordion')) : options;
            
            // define the event: tap on mobile, click on desktop
            
            var eventType = YOI.environment('mobile') ? 'tap' : 'click';
            
            $thisSections.each(function() {
                
                var $thisSection = $(this);
                var $thisHeader  = $thisSection.find('.accordion__header');
                var $thisBody    = $thisSection.find('.accordion__body');
                
                // by default, on page load all accordion sections are closed.
                // however, accordion sections with the class name "is--open" in markup will be open.
                
                if (!$thisSection.hasClass('is--open') && !$thisSection.hasClass('is--closed')) {
                    $thisSection.addClass('is--closed');
                    $thisBody.slideUp(0);
                }
                
                // attach event
                
                $thisHeader.on(eventType, function(e) {
                    e.preventDefault();
                    toggleAccordionSection($thisSection);
                });
            
            });
            
        });
        
    }
    
    function initializeAccordionTriggers() {
        
        /**
         *  Gather all elements in DOM which are tagged with the custom
         *  data-attributes "action". Attach events accordingly to the values
         *  "openAllAccordions" and "closeAllAccordions".
         */
        
        $('[data-action="openAllAccordions"]').on('click', function(e) {
            e.preventDefault();
            openAllSections();
        });
        
        $('[data-action="closeAllAccordions"]').on('click', function(e) {
            e.preventDefault();
            closeAllSections();
        });
    
    }
    
    function toggleAccordionSection($section) {
        
        /**
         *  Opens or closes a given accordion section.
         *
         *  @param  {jQuery dom object} $section - the accordion section
         */
        
        var $thisAccordion = $section.closest('.accordion');
        var $thisSection   = $section;
        var $thisBody      = $section.find('.accordion__body');
        var options        = YOI.toObject($thisAccordion.data('accordion'));
        
        // in "linked" accordions, only one section can be open.
        // all remaining sections will close.
        
        if (options.linked === 'true') {
            $thisAccordion.find('.accordion__section').removeClass('is--open').addClass('is--closed');
            $thisAccordion.find('.accordion__body').stop().slideUp('fast');
            $thisSection.removeClass('is--closed').addClass('is--open');
            $thisBody.stop().slideDown('fast');
            return;
        }
        
        // by default, accordions can toggle their sections
        // individually and independently
        
        if ($thisSection.hasClass('is--closed')) {
            $thisSection.removeClass('is--closed').addClass('is--open');
            $thisBody.stop().slideDown('fast');
            return;
        }

        if ($thisSection.hasClass('is--open')) {
            $thisSection.removeClass('is--open').addClass('is--closed');
            $thisBody.stop().slideUp('fast');
            return;
        }
    
    }
    
    function closeAllSections() {

        /**
         *  Close all accordion sections found in DOM.
         */

        $('.accordion__section')
            .removeClass('is--open').addClass('is--closed')
            .find('.accordion__body').slideUp('fast');

    }

    function openAllSections() {

        /**
         *  Open all accordion sections found in DOM.
         */

        $('.accordion__section')
            .removeClass('is--closed').addClass('is--open')
            .find('.accordion__body').slideDown('fast');

    }

    // initialize
    // ==========

    initializeAccordion();
    initializeAccordionTriggers();
    
    // public functions
    // ================

    return {
        init         : initializeAccordion,
        initTriggers : initializeAccordionTriggers,
        closeAll     : closeAllSections,
        openAll      : openAllSections
    }

})();

/** browserHistory.js */

var BrowserHistory = (function() {

    // private vars
    // ============

    var currentScrollTop;
    var $window = $(window);

    // private functions
    // =================

    function pushHash(hashString) {
        history.pushState(null, null, window.location.pathname + hashString);
    }

    function replaceHash(hashString) {
        history.replaceState(null, null, window.location.pathname + hashString);
    }

    function clearHash() {
        history.replaceState('', document.title, window.location.pathname);
    }

    // public functions
    // ================

    return {
        pushHash    : pushHash,
        replaceHash : replaceHash,
        clearHash   : clearHash
    }

})();

/** countdown.js */

var Countdown = (function() {

    // private vars
    // ============
    
    // countdown clock labels
    
    var clockLabels = {
        'en' : {
            'days'    : 'Days',
            'hours'   : 'Hours',
            'minutes' : 'Min',
            'seconds' : 'Sec'
        },
        'de' : {
            'days'    : 'Tage',
            'hours'   : 'Std',
            'minutes' : 'Min',
            'seconds' : 'Sek'
        }
    };

    // "lcd" character template

    var $countdownCharacter = $('\
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="countdown__character" x="0px" y="0px" width="24px" height="37px" viewBox="0 0 24 37" xml:space="preserve">\
            <polygon class="countdown__character__segment-br" points="19,31 19,22 22,20 22,34" />\
            <polygon class="countdown__character__segment-tr" points="19,15 19,6 22,3 22,17" />\
            <polygon class="countdown__character__segment-bl" points="5,22 5,31 2,34 2,20" />\
            <polygon class="countdown__character__segment-tl" points="5,6 5,15 2,17 2,3" />\
            <polygon class="countdown__character__segment-b" points="6,32 18,32 21,35 3,35" />\
            <polygon class="countdown__character__segment-m" points="19,20 5,20 3,18.5 5,17 19,17 21,18.5" />\
            <polygon class="countdown__character__segment-t" points="3,2 6,5 18,5 21,2" />\
            <path class="countdown__character__dots" d="M12,14c1.104,0,2-0.896,2-2s-0.896-2-2-2s-2,0.896-2,2S10.896,14,12,14z M12,23c-1.104,0-2,0.896-2,2s0.896,2,2,2 s2-0.896,2-2S13.104,23,12,23z" />\
        </svg>\
    ');

    // other templates

    var $countdownCharacterLabel = $('<span class="countdown__label"></span>');
    var $countdownClock          = $('<div class="countdown__clock" aria-hidden="true"></div>');

    // private functions
    // =================

    function initializeCountdown($countdown, endTime) {
        
        /**
         *  Initialize all *[data-countdown] found in the document (= function call without parameters)
         *  or target one or more specific *[data-countdown] (= function call with $countdown).
         *  $countdown must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $countdown - the countdown(s)
         */
        
        if (!($countdown instanceof jQuery)) {
            $countdown = $('[data-countdown]');
        }

        $countdown.each(function(index) {
        
            var $thisCountdown = $(this);
            
            // render the countdown
            
            renderCountdown($thisCountdown, endTime, index);
            
            // update the clock every second
            
            YOI.setInterval('countdownTimer-' + index, 1000, function() {
                renderCountdown($thisCountdown, endTime, index)
            });
        
        });

    }
    
    function renderCountdown($thisCountdown, endTime, index) {
        
        /**
         *  Render the lcd-style countdown, also include a label for screen readers.
         *
         *  @param {jQuery dom object} $thisCountdown - the countdown
         *  @param {number}            index          - index number of the count down
         */
        
        // read end time and get remaining time
        
        var endTime       = endTime === undefined ? $thisCountdown.data('countdown') : endTime;
        var timeRemaining = getTimeRemaining(endTime);
        
        // if countdown is expired, clear countdown interval and fire custom event

        if (timeRemaining.total <= 0) {
            YOI.clearInterval('countdownTimer-' + index);
            $thisCountdown.trigger('countdown:expired');
        }

        // set the lcd characters
    
        setLcdCharacters($thisCountdown, timeRemaining);

        // accessibility: create an additional, visually hidden
        // label for screen readers
        
        var language = YOI.locale();
        
        var labelTxt = {
            'en' : timeRemaining.days + ' days, ' + timeRemaining.hours + ' hours, ' + timeRemaining.minutes + ' minutes and ' + timeRemaining.seconds + ' seconds left.',
            'de' : 'Noch ' + timeRemaining.days + ' Tage, ' + timeRemaining.hours + ' Stunden, ' + timeRemaining.minutes + ' Minuten und ' + timeRemaining.seconds + ' Sekunden.'
        };
        
        var $hiddenLabel = $thisCountdown.find('.hidden');

        if ($hiddenLabel.length === 0) {
            $thisCountdown.append($('<p class="hidden"></p>'));
        }

        $hiddenLabel.text(labelTxt[language]);

    }

    function getTime() {
        
        /**
         *  Get and return the formatted current time.
         *
         *  @return {object} currentTime - the formatted time
         */
        
        var today       = new Date();
        var currentTime = {};
        
        currentTime.hours   = YOI.zeroPad(today.getHours()).toString();
        currentTime.minutes = YOI.zeroPad(today.getMinutes()).toString();
        currentTime.seconds = YOI.zeroPad(today.getSeconds()).toString();

        return currentTime;

    }
    
    function getTimeRemaining(endTime) {
        
        /**
         *  Get and return the formatted remaining time.
         *
         *  @param  {string} endTime - the complete iso date format like "January 1 2020 15:50:00 GMT+0002"
         *  @return {object}         - the formatted remaining time
         */
        
        // format output
        
        var total   = Date.parse(endTime) - Date.parse(new Date());
        var seconds = YOI.zeroPad(Math.floor((total / 1000) % 60 )).toString();
        var minutes = YOI.zeroPad(Math.floor((total / 1000 / 60) % 60 )).toString();
        var hours   = YOI.zeroPad(Math.floor((total / (1000 * 60 * 60)) % 24 )).toString();
        var days    = YOI.zeroPad(Math.floor(total / (1000 * 60 * 60 * 24))).toString();
        
        // return output
        
        return {
            'total'   : total,
            'days'    : days,
            'hours'   : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
      
    }
    
    function setLcdCharacters($thisCountdown, timeRemaining) {

        /**
         *  Set or update the lcd-style characters of the countdown clock.
         *
         *  @param {jQuery dom object} $thisCountdown - the countdown
         *  @param {object} timeRemaining             - the formatted remaining time
         */

        // check if clock already exists

        var foundClock = $thisCountdown.find('.countdown__clock').length === 0 ? false : true;

        // generate the lcd character map

        var lcdCharacters = {
            'days' : [
                'countdown--' + timeRemaining.days.charAt(0),
                'countdown--' + timeRemaining.days.charAt(1)
            ],
            'hours' : [
                'countdown--' + timeRemaining.hours.charAt(0),
                'countdown--' + timeRemaining.hours.charAt(1)
            ],
            'minutes' : [
                'countdown--' + timeRemaining.minutes.charAt(0),
                'countdown--' + timeRemaining.minutes.charAt(1)
            ],
            'seconds' : [
                'countdown--' + timeRemaining.seconds.charAt(0),
                'countdown--' + timeRemaining.seconds.charAt(1)
            ]
        };

        // add the characters

        if (foundClock) {
            
            // update the css class names inside the existing clock

            for (var i = 0; i < Object.keys(lcdCharacters).length; i++) {

                var unit     = Object.keys(lcdCharacters)[i];
                var selector = '.countdown__' + unit + ' .countdown__character';

                if (timeRemaining.total > 0) {
                    $thisCountdown.find(selector).eq(0).attr('class', 'countdown__character ' + lcdCharacters[unit][0]);
                    $thisCountdown.find(selector).eq(1).attr('class', 'countdown__character ' + lcdCharacters[unit][1]);
                } else {
                    $thisCountdown.find(selector).eq(0).attr('class', 'countdown__character countdown--empty');
                    $thisCountdown.find(selector).eq(1).attr('class', 'countdown__character countdown--empty');
                }
            
            }

        } else {
            
            // reference the countdown clock
            
            var $thisCountdownClock = $countdownClock.clone();
            
            // add the lcd characters
            
            for (var i = 0; i < Object.keys(lcdCharacters).length; i++) {
            
                var unit            = Object.keys(lcdCharacters)[i];
                var $countdownChars = $('<div></div>').addClass('countdown__' + unit);
                var $countdownLabel = createCountdownCharacterLabel(unit);
                
                if (timeRemaining.total > 0) {
                    $countdownChars.append($countdownCharacter.clone().addClass(lcdCharacters[unit][0]));
                    $countdownChars.append($countdownCharacter.clone().addClass(lcdCharacters[unit][1]));
                } else {
                    $countdownChars.append($countdownCharacter.clone().addClass('countdown--empty'));
                    $countdownChars.append($countdownCharacter.clone().addClass('countdown--empty'));
                }
                
                $countdownChars.append($countdownLabel);
                $thisCountdownClock.append($countdownChars);
                
            }
            
            // add the countdown clock
            
            $thisCountdown.append($thisCountdownClock);
            
        }
        
    };
    
    function createCountdownCharacterLabel(unit) {
        
        /**
         *  Return a clock label (eg. "hours") as jQuery dom element.
         *
         *  @param  {string} unit              - "days" | "hours" | "minutes" | "seconds"
         *  @return {jQuery dom object} $label - the label
         */
        
        var $label   = $countdownCharacterLabel.clone();
        var language = YOI.locale();
        
        $label.text(clockLabels[language][unit])
        
        return $label;
        
    }

    // initialize
    // ==========

    initializeCountdown();

    // public functions
    // ================

    return {
        init : initializeCountdown
    }

})();
/** datePicker.js */

var DatePicker = (function() {

    // private vars
    // ============

    // get the document language, fall back to english
    // note: only german and english supported at this moment

    var language = typeof YOI.locale() !== 'object' || YOI.locale() === undefined || YOI.locale() === '' ? 'en' : YOI.locale();

    // object to save the current date

    var now = {};

    // templates

    var $datePicker = $('\
        <div class="datePicker">\
            <a class="btn btn--subtle btn--large btn--stripped pos-tl" data-action="prevMonth">\
                <i aria-hidden="true" class="icon--008-s"></i>\
            </a>\
            <a class="btn btn--subtle btn--large btn--stripped pos-tr" data-action="nextMonth">\
                <i aria-hidden="true" class="icon--007-s"></i>\
            </a>\
            <h3 class="datePicker__header"></h3>\
        </div>\
    ');

    var $weekDaysHeader_en = $('\
        <tr>\
            <th>Mon</th>\
            <th>Tue</th>\
            <th>Wed</th>\
            <th>Thu</th>\
            <th>Fri</th>\
            <th>Sat</th>\
            <th>Sun</th>\
        </tr>\
    ');

    var $weekDaysHeader_de = $('\
        <tr>\
            <th>Mo</th>\
            <th>Di</th>\
            <th>Mi</th>\
            <th>Do</th>\
            <th>Fr</th>\
            <th>Sa</th>\
            <th>So</th>\
        </tr>\
    ');

    // private functions
    // =================

    function initializeDatePicker($datepicker) {
        
        /**
         *  Initialize all input[data-datepicker] found in the document (= function call without parameters)
         *  or target one or more specific input[data-datepicker] (= function call with $datepicker).
         *  $datepicker must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $datepickers - the date picker(s)
         */

        // update the current date

        getCurrentDate();

        // initialize date picker(s)
        
        if (!($datepicker instanceof jQuery)) {
            $datepicker = $('input[data-datepicker]');
        }

        $datepicker.each(function(index) {

            // get date input & date input data

            var $thisDateInput = $(this);

            // if the date input already has data (from markup), use it

            if (!$.isEmptyObject($thisDateInput.data('datepicker'))) {

                // get and format date input data

                var thisDateInputData = YOI.toObject($thisDateInput.data('datepicker'));

                // if a field is undefined, fall back to the current time value for the field,
                // eg. if year is undefined, use the current year

                var inputYear  = thisDateInputData.year  === undefined ? now.year  : parseInt(thisDateInputData.year);
                var inputMonth = thisDateInputData.month === undefined ? now.month : parseInt(thisDateInputData.month);
                var inputDay   = thisDateInputData.day   === undefined ? now.day   : parseInt(thisDateInputData.day);

                updateDateInput(
                    $thisDateInput,
                    inputYear,
                    inputMonth,
                    inputDay
                );

                // render date picker with year and date from date input data

                var $thisDatePicker = renderDatePicker(inputYear, inputMonth, inputDay);

            } else {

                updateDateInput(
                    $thisDateInput,
                    now.year,
                    now.month
                );

                // render date picker with current date

                var $thisDatePicker = $thisDatePicker = renderDatePicker();

            }

            // get month table and month table data

            var $thisMonthTable    = $thisDatePicker.find('.datePicker__days');
            var thisMonthTableData = $thisMonthTable.data();

            // add a wrapper to aid positioning

            $thisDateInput.wrap('<div class="datePicker__wrapper"></div>');
            var $thisDateInputWrapper = $thisDateInput.closest('.datePicker__wrapper');

            // inject elements

            $thisDateInput.after($thisDatePicker);
            $thisDatePicker.hide();

            // attach events to wrapper

            $thisDateInputWrapper.on('click', function(e) {
                $thisDateInput.trigger('focus');
            });

            // attach events to date input field

            $thisDateInput
                .on('click', function(e) {

                    // prevent the click event on the date input field
                    // to bubble up, so that 'focus' won't get triggered
                    // on the wrapper

                    e.stopPropagation();

                })
                .on('blur', function() {

                    YOI.setDelay('datePickerHideTimeout-' + index, 500, function() {

                        // get the date input data

                        var thisDateInputData = $thisDateInput.data();

                        // hide this date picker after a short delay

                        $thisDateInput.next('.datePicker').fadeOut('fast', function() {

                            // reset the month table to the selected date

                            $thisDatePicker.find('.datePicker__days').replaceWith(renderMonthTable($thisDatePicker, thisDateInputData.selectedYear, thisDateInputData.selectedMonth));
                            $thisDatePicker.find('.datePicker__header').text(getMonthName(thisDateInputData.selectedMonth) + ' ' + thisDateInputData.selectedYear);

                        });

                    });

                })
                .on('focus', function(e) {

                    YOI.clearDelay('datePickerHideTimeout-' + index);

                    // hide all other date pickers first

                    hideAllDatePickers();

                    // get the date picker and decide weather
                    // to put it above or below the input field

                    var $thisDatePicker = placeDatePicker($thisDateInput.next('.datePicker'));

                    // show the date picker

                    $thisDatePicker.show();

                });

        });

    }

    function updateDatePicker($thisDatePicker, selectedYear, selectedMonth, selectedDay) {

        /**
         *  Attach a data object to the date picker with updated values.
         *
         *  @param {jQuery dom object} $thisDatePicker - the date picker
         *  @param {number}            selectedYear    - the selected year
         *  @param {number}            selectedMonth   - the selected month
         *  @param {number}            selectedDay     - the selected day
         */

        // format the date

        var formattedSelectedDate = YOI.zeroPad(selectedDay, 1) + '.' + YOI.zeroPad(selectedMonth + 1, 1) + '.' + selectedYear;

        // write data

        $thisDatePicker.data({
            'selectedYear'          : selectedYear,
            'selectedMonth'         : selectedMonth,
            'selectedDay'           : selectedDay,
            'formattedSelectedDate' : formattedSelectedDate
        });

    }

    function updateMonthTable($thisMonthTable, year, month) {

        /**
         *  Attach a data object to the month table with updated values.
         *
         *  @param {jQuery dom object} $thisMonthTable - the month table
         *  @param {number}            year            - the optional year, falls back to current year
         *  @param {number}            month           - the optional month, falls back to current month
         */

        // read the current date and time,
        // saved as object named "now"

        getCurrentDate();

        // default value for month and year

        if (month === undefined || year === undefined) {

            // if month or year are undefined,
            // use the current date

            var year  = now.year;
            var month = now.month;

        }

        // get the month name

        var monthName = getMonthName(month);

        // get the first day of the month

        var firstDayInstance = new Date(year, month, 1);
        var firstDay         = firstDayInstance.getDay();
        firstDayInstance = null;

        // number of days in current month

        var totalDays = getTotalDays(year, month);

        // get the selected day

        var selectedDay = $thisMonthTable.find('.datePicker--selectedDay').text();

        // format the date

        var formattedDate = YOI.zeroPad(selectedDay, 1) + '.' + YOI.zeroPad(month + 1, 1) + '.' + year;

        // write data to month table

        $thisMonthTable.data({
            'firstDay'       : firstDay,     // week day of the first day of the given month
            'totalDays'      : totalDays,    // total days of the given month
            'year'           : year,         // the given year of the month table
            'month'          : month,        // the given month of the month table
            'formattedDate'  : formattedDate // the formatted date
        });

    }

    function updateDateInput($thisDateInput, year, month, day) {

        /**
         *  Attach a data object to the date input field with updated values and write
         *  the formatted date into the date input field.
         *
         *  @param {jQuery dom object} $thisDateInput - the corrensponding input field
         *  @param {number}            year           - the given year
         *  @param {number}            month          - the given month
         *  @param {number}            day            - the given day
         */

        // format the date

        var formattedDate;

        if (!day || !month || !year) {
            formattedDate = '';
        } else {
            if (language === 'de') formattedDate = YOI.zeroPad(day, 1) + '.' + YOI.zeroPad(month + 1, 1) + '.' + year;
            if (language === 'en') formattedDate = YOI.zeroPad(month + 1, 1) + '.' + YOI.zeroPad(day, 1) + '.' + year;
        }

        // write data

        $thisDateInput.data({
            'selectedYear'  : year,
            'selectedMonth' : month,
            'selectedDay'   : day,
            'formattedDate' : formattedDate
        });

        // write the selected date to the date input field

        $thisDateInput.val(formattedDate);

    }

    function renderMonthTable($thisDatePicker, year, month) {

        /**
         *  Renders a new month table with optional parameters for year and month.
         *  If year or month are undefined, the current year or month will be used.
         *
         *  @param  {jQuery dom object} $thisDatePicker - the corresponding date picker
         *  @param  {number}            year            - the optional year
         *  @param  {number}            month           - the optional month
         *  @return {jQuery dom object} $monthTable     - the month table
         */

        // create the month table

        var $monthTable     = $('<table class="datePicker__days"><tbody></tbody></table>');
        var $monthTableBody = $monthTable.find('tbody').first();

        // update the month table

        updateMonthTable($monthTable, year, month);

        // access the month table data

        var thisMonthTableData = $monthTable.data();

        // access the date picker data

        var thisDatePickerData = $thisDatePicker.data();

        // create the table header

        if (YOI.locale() === 'en' || YOI.locale === undefined) {

            $monthTableBody.append($weekDaysHeader_en.clone());

        } else if (YOI.locale() === 'de') {

            $monthTableBody.append($weekDaysHeader_de.clone());

        }

        // create the table rows

        var indexCell = 1;
        var indexDay  = 1;

        for (var i = 0; i < Math.ceil((thisMonthTableData.totalDays + thisMonthTableData.firstDay - 1) / 7); i++) {

            var $row = $('<tr>');

            // create the table cells

            for (var j = 0; j < 7; j++) {

                if (indexCell < thisMonthTableData.firstDay || indexDay > thisMonthTableData.totalDays) {

                    // empty cells

                    $row.append('<td class="datePicker--emptyDay"></td>');

                } else if (thisMonthTableData.month === thisDatePickerData.selectedMonth && thisMonthTableData.year === thisDatePickerData.selectedYear && indexDay === thisDatePickerData.selectedDay) {

                    // selected day

                    $row.append('<td class="datePicker--selectedDay">' + indexDay + '</td>');
                    indexDay++;

                } else if (thisMonthTableData.month === now.month && thisMonthTableData.year === now.year && indexDay === now.day) {

                    // today

                    $row.append('<td class="datePicker--today">' + indexDay + '</td>');
                    indexDay++;

                } else {

                    // any other cell

                    $row.append('<td>' + indexDay + '</td>');
                    indexDay++;

                }

                indexCell++;

            }

            // append the table row

            $monthTableBody.append($row);

        }

        // attach events to date picker cells

        $monthTable.find('td:not(.datePicker--emptyDay)').on('mousedown', function() {

            var selectedDay = parseInt($(this).text());

            pickDate($monthTable, thisMonthTableData.year, thisMonthTableData.month, selectedDay);

        });

        // return month table

        return $monthTable;

    }

    function renderDatePicker(year, month, selectedDay) {

        /**
         *  Render a date picker with optional initial parameters for year, month and
         *  selected day. If no parameters are given, the current date will be used.
         *  The render function will only be called once per date picker on page load.
         *  For further manipulation (eg. changing the month), only the month table
         *  gets re-rendered.
         *
         *  @param  {number}            year            - the optional year
         *  @param  {number}            month           - the optional month
         *  @param  {number}            selectedDay     - the optional selected day
         *  @return {jQuery dom object} $thisDatePicker - the date picker
         */

        // get date picker and write date picker data

        var $thisDatePicker = $datePicker.clone();

        updateDatePicker(
            $thisDatePicker,
            year,
            month,
            selectedDay
        );

        // render month table

        var $thisMonthTable = renderMonthTable($thisDatePicker, year, month);

        // inject elements

        $thisDatePicker.append($thisMonthTable);

        // get month table data

        var thisMonthTableData = $thisMonthTable.data();

        // set year and month

        if (month === undefined) month = now.month;
        if (year  === undefined) year  = now.year;

        // write the date picker header

        $thisDatePicker.find('.datePicker__header').text(getMonthName(month) + ' ' + year);

        // attach events to date picker buttons

        $thisDatePicker.find('[data-action*="Month"]').on('click', function(e) {

            e.preventDefault();

            // important: get updated month table data on each click

            var $thisDatepicker    = $(this).closest('.datePicker');
            var $thisMonthTable    = $thisDatepicker.find('.datePicker__days');
            var thisMonthTableData = $thisMonthTable.data();
            var month              = thisMonthTableData.month;
            var year               = thisMonthTableData.year;

            // get the action (prevMonth or nextMonth)

            var thisAction = $(this).data('action');

            // action = show previous month

            if (thisAction === 'prevMonth') {

                if (month > 0) {

                    --month;

                } else {

                    month = 11;
                    --year;

                }

            }

            // action = show next month

            if (thisAction === 'nextMonth') {

                if (month < 11) {

                    ++month;

                } else {

                    month = 0;
                    ++year;

                }

            }

            // render new month table and
            // write date picker header

            $thisDatePicker.find('.datePicker__days').replaceWith(renderMonthTable($thisDatePicker, year, month));
            $thisDatePicker.find('.datePicker__header').text(getMonthName(month) + ' ' + year);

            // update month table data

            updateMonthTable($thisMonthTable, year, month);

        });

        // attach events to date picker

        $thisDatePicker.on('mousedown', function() {

            // for unknow reasons, focus gets fired *before* blur if we don't
            // use a short delay for debounce

            YOI.setDelay('datePickerFocusDelay', 50, function() {
                $thisDatePicker.prev('input[data-datepicker]').focus();
            });

        });

        // return the date picker

        return $thisDatePicker;

    }

    function pickDate($thisMonthTable, selectedYear, selectedMonth, selectedDay) {

        /**
         *  Set a date for a month table and update all associated data objects.
         *
         *  @param {jQuery dom object} $thisMonthTable - the corresponding month table
         *  @param {number}            selectedYear    - the selected year
         *  @param {number}            selectedMonth   - the selected month
         *  @param {number}            selectedDay     - the selected day
         */

        var $thisDatePicker = $thisMonthTable.closest('.datePicker');
        var $thisDateInput  = $thisDatePicker.prev('input[data-datepicker]');

        // access the month table data

        var thisMonthTableData = $thisMonthTable.data();

        // add a class to the day cell to visualize selection

        $thisMonthTable.find('td').each(function() {

            var $thisCell = $(this);

            $thisCell.removeClass('datePicker--selectedDay');

            if (parseInt($thisCell.text()) === selectedDay) {
                $thisCell.addClass('datePicker--selectedDay');
            }

        });

        // update month table

        updateMonthTable(
            $thisMonthTable,
            selectedYear,
            selectedMonth
        );

        // update date picker

        updateDatePicker(
            $thisDatePicker,
            selectedYear,
            selectedMonth,
            selectedDay
        );

        // update date input

        updateDateInput(
            $thisDateInput,
            selectedYear,
            selectedMonth,
            selectedDay
        );

    }

    function hideAllDatePickers() {

        /**
         *  Hide all visible date pickers.
         */

        $('.datePicker__wrapper .datePicker').hide();
    }

    function getCurrentDate() {

        /**
         *  Get the current date and return an object with well fomatted
         *  values for easy use and access.
         *
         *  @return {object} - formatted date object
         */

        // create a new date instance

        var currentDate = new Date();

        // save the date

        now = {
            'weekDay' : currentDate.getDay(),             // the current day of the week
            'day'     : currentDate.getDate(),            // the current day of the month
            'month'   : currentDate.getMonth(),           // the current month
            'year'    : adjustYear(currentDate.getYear()) // the current year
        }

    }

    function getTotalDays(year, month) {

        /**
         *  Returns the number of days of a given month of a given year.
         *
         *  @param  {number}  month - the month, starting at 0, eg. 5 for june
         *  @param  {number}  year  - the year, eg. 2016
         *  @return {number}        - the number of days of the given month
         */

        var daysInMonths = [
            31, // jan
            28, // feb
            31, // mar
            30, // apr
            31, // may
            30, // jun
            31, // jul
            31, // aug
            30, // sep
            31, // oct
            30, // nov
            31  // dec
        ];

        // february in leap year has 29 days

        if (year % 4 === 0)
            daysInMonths[1] = 29;

        // return the total days

        return daysInMonths[month];

    }

    function getMonthName(month) {

        /**
         *  Return the name of a given month. Very basic localisation,
         *  only English and German so far.
         *
         *  @param  {number}  month - the month, eg. 5
         *  @return {string}        - the name of the month in English (default) or German
         */

        var monthNames;

        if (language === 'en' || language === undefined) {

            monthNames = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]

        } else if (language === 'de') {

            monthNames = [
                'Januar',
                'Februar',
                'März',
                'April',
                'Mai',
                'Juni',
                'Juli',
                'August',
                'September',
                'Oktober',
                'November',
                'Dezember'
            ]

        }

        return monthNames[month];

    }

    function adjustYear(year) {

        /**
         *  Take any year and prefix it with '19' if the year is below 1000.
         *
         *  @param  {number}  year - the input year
         *  @return {number}  year - the well formatted output year
         */

        if (year < 1000) {
            year += 1900;
        }

        return year;

    }

    function placeDatePicker($thisDatePicker) {

        /**
         *  By default, date pickers are placed below the date input field.
         *  This function calculates the available space in the viewport below
         *  the input field. If the space is too low, the date picker will be
         *  placed above the date input field.
         *
         *  @param  {jQuery dom object} $thisDatePicker - the date picker
         *  @return {jQuery dom object} $thisDatePicker - the date picker plus positioning
         */

        // get the date input field

        var $dateInput       = $thisDatePicker.prev('input[data-datepicker]');

        // get some data about dimensions and positioning

        var dateInputOffsetY = $dateInput.offset().top;
        var dateInputHeight  = $dateInput.outerHeight();
        var datePickerHeight = $thisDatePicker.outerHeight();
        var viewPortHeight   = $(window).height();
        var scrollTop        = $(window).scrollTop();

        // calculate the available space below the date input field

        var place = viewPortHeight - ((dateInputOffsetY + dateInputHeight) - scrollTop) < datePickerHeight ? 'above' : 'below';

        // place the date picker below or above the date input field?

        if (place === 'above') {
            $thisDatePicker.css('top', -1 * datePickerHeight - 10 + 'px');
        } else if (place === 'below') {
            $thisDatePicker.css('top', dateInputHeight + 10 + 'px');
        }

        // return the date picker - with positioning

        return $thisDatePicker;

    }

    // initialize
    // ==========

    initializeDatePicker();

    // public functions
    // ================

    return {
        init   : initializeDatePicker,
        render : renderDatePicker,
        hide   : hideAllDatePickers
    }

})();

/** dismiss.js */

var Dismiss = (function() {

    // private vars
    // ============

    var $btnDismiss;
    var btnLabelClose = YOI.locale === 'de' ? 'schliessen' : 'close';

    $btnDismiss = $('\
        <button class="btn btn--subtle">\
            <span class="hidden">' + btnLabelClose + '</span>\
            <i class="icon--006-s" aria-hidden="true"></i>\
        </button>\
    ');

    // private functions
    // =================

    function initializeDismissableElement($dismissableElement) {
        
        /**
         *  Attach a close-button to dismissable elements.
         *
         *  Initialize all *[data-dismissable] found in the document (= function call without parameters)
         *  or target one or more specific *[data-dismissable] (= function call with $dismissable).
         *  $dismissableElement must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $dismissableElement - the dismissable element(s)
         */
        
        if (!($dismissableElement instanceof jQuery)) {
            $dismissableElement = $('input[data-dismissable]');
        }

        $dismissableElement.each(function() {

            var $thisDismissableElement = $(this);

            // attach button and events

            $btnDismiss
                .clone()
                .on('click', function(e) {
                    e.preventDefault();
                    dismiss($thisDismissableElement);
                })
                .appendTo($thisDismissableElement);

        });

    }

    function initializeDismissButton($dismissButton) {
        
        /**
         *  Initialize all *[data-dismiss] found in the document (= function call without parameters)
         *  or target one or more specific *[data-dismiss] (= function call with $dismissButton).
         *  $dismissButton must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $dismissButton - the dismiss button(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <button data-dismiss="target:#myTargetElement">
         *
         *  Available options:
         *
         *  @option {string} target - selector for target element
         */
        
        if (!($dismissButton instanceof jQuery)) {
            $dismissButton = $('[data-dismiss]');
        }

        $dismissButton.each(function() {

            var $thisTrigger = $(this);
            var options      = YOI.toObject($(this).data('dismiss'));
            var $thisTarget  = $(options.target);

            // attach events

            $thisTrigger.on('click', function(e) {
                e.preventDefault();
                dismiss($thisTarget);
            });

        });

    }

    function dismiss($thisTarget) {

        /**
         *  Close and remove any target element.
         *
         *  @param  {jQuery dom object} $thisTarget - the target element
         */
        
        if (!($thisTarget instanceof jQuery)) return false;

        $thisTarget.fadeOut(function() {
            $thisTarget.remove();
        });

    }

    // initialize
    // ==========

    initializeDismissableElement();
    initializeDismissButton();

    // public functions
    // ================

    return {
        initElements : initializeDismissableElement,
        initBtns     : initializeDismissButton,
        apply        : dismiss
    };

})();

/** dock.js */

var Dock = (function() {

    // private functions
    // =================

    function initializeDock($dock, options) {
    
        /**
         *  Initialize all *[data-dock] found in the document (= function call without parameters)
         *  or target one or more specific *[data-dock] (= function call with $dock).
         *  $dock must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $dock - the dock(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div class="dock" data-dock="autohide:true;">
         *
         *  Available options:
         *
         *  @option {boolean} autohide - if set to "true", the dock is initially hidden
         */
        
        if (!($dock instanceof jQuery)) {
            $dock = $('[data-dock]');
        }

        $dock.each(function() {

            var $thisDock = $(this);
            var options   = options === undefined ? YOI.toObject($thisDock.data('dock')) : options;

            // auto hide

            if (options.autohide) {

                hideDock($thisDock);

                $thisDock
                    .on('mouseover', function() {
                        YOI.clearDelay('hideDockTimeout');
                        showDock($thisDock);
                    })
                    .on('mouseout', function() {
                        YOI.setDelay('hideDockTimeout', 750, function() {
                            hideDock($thisDock);
                        });
                    });

            }

        });

    }

    function hideDock($thisDock) {

        /**
         *  Hide the dock.
         *
         *  @param {jQuery dom object} $thisDock - the dock
         */

        $thisDock.addClass('is--hidden');
    }

    function showDock($thisDock) {

        /**
         *  Show the dock.
         *
         *  @param {jQuery dom object} $thisDock - the dock
         */

        $thisDock.removeClass('is--hidden');
    }

    // initialize
    // ==========

    initializeDock();

    // public functions
    // ================

    return {
        init : initializeDock,
        hide : hideDock,
        show : showDock
    }

})();

/** filterBtns.js */

var FilterBtns = (function() {

    // private functions
    // =================

    function initializeFilterBtns($filterBtns) {
        
        /**
         *  Initialize all *[data-filterbtns] found in the document (= function call without parameters)
         *  or target one or more specific *[data-filterbtns] (= function call with $dock).
         *  $filterBtns must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $filterBtns - the filterbutton group(s)
         */
        
        if (!($filterBtns instanceof jQuery)) {
            $filterBtns = $('[data-filterbtns]');
        }

        $filterBtns.each(function() {

            var $thisFilterBtns = $(this);

            if ($thisFilterBtns.hasClass('filterBtns--removeable')) {

                // add events for removeable buttons

                $thisFilterBtns.find('.filterBtns__btn').each(function() {

                    var $thisBtn = $(this);

                    $thisBtn.on('click', function(e) {
                        e.preventDefault();
                        removeBtnFilter($thisBtn);
                    });

                });

            } else {

                // add events for regular buttons

                $thisFilterBtns.find('.filterBtns__btn').each(function() {

                    var $thisBtn = $(this);

                    $thisBtn.on('click', function(e) {
                        e.preventDefault();
                        toggleBtnFilter($thisBtn);
                    });

                    $thisBtn.on('mouseout', function(e) {

                        /*
                         *  If you click a button, it will immediately switch to
                         *  it's mouseover styling. This is not desired, hence logically,
                         *  you click "add" and get "remove".
                         *  Therefore, we need this debouce class, which overrides the
                         *  :hover state but gets removed on mouse out.
                         */

                        e.preventDefault();
                        $thisBtn.removeClass('filterBtns__btn--debounce');
                    });

                });

            }

        });

    }

    function toggleBtnFilter($thisBtn) {

        /**
         *  Mark the button active or inactive, depending
         *  on it's current state. Show an activity message.
         *
         *  @param  {jQuery dom object} $thisBtn - the filter button
         */

        if ($thisBtn.hasClass('is--active')) {
            $thisBtn.removeClass('is--active');
            $thisBtn.removeClass('filterBtns__btn--debounce');
        } else {
            $thisBtn.addClass('is--active');
            $thisBtn.addClass('filterBtns__btn--debounce');
        }

    }

    function removeBtnFilter($thisBtn) {

        /**
         *  Remove the button and show an activity message.
         *
         *  @param  {jQuery dom object} $thisBtn - the filter button
         */

        $thisBtn.fadeOut('fast');

    }

    // initialize
    // ==========

    initializeFilterBtns();

    // public functions
    // ================

    return {
        init : initializeFilterBtns
    }

})();

/** filters.js */

var Filters = (function() {

    // private vars
    // ============

    var filterGroupMaxHeight = 210;
    var loadResultsIsRunning = false;

    var btnLabelReset = YOI.locale === 'de' ? 'Alle Filter zurücksetzen' : 'Reset All';
    var msgLoading    = YOI.locale === 'de' ? 'Daten werden geladen' : 'Fetching data';

    var $resetBtn = $('\
        <a href="#" class="filters__resetBtn btn btn--large btn--subtle">\
            <i class="icon--006-s"></i>\
            <span>' + btnLabelReset + '</span>\
        </a>\
    ');

    var $loader = $('\
        <div class="loading">\
            <span class="pulse"></span>\
            <span class="msg"><b>' + msgLoading + '</b></span>\
        </div>\
    ');

    // private functions
    // =================

    function initializeFilters($filters) {

        /**
         *  Initialize all *[data-filters] found in the document (= function call without parameters)
         *  or target one or more specific *[data-filters] (= function call with $dock).
         *  $filters must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $filters - the filter group(s)
         */

        if (!($filters instanceof jQuery) || $filters === undefined) {
            $filters = $('[data-filters]');
        }

        $filters.each(function() {

            var $thisFilters            = $(this);
            var $thisFilterGroups       = $thisFilters.find('.filterGroup');
            var $thisFilterGroupHeaders = $thisFilters.find('.filterGroup__header');
            var $thisFiltersMulti       = $thisFilters.find('.filter--multi');
            var $thisFiltersSingle      = $thisFilters.find('.filter--single');

            // set initial states

            updateAllFilterGroups($thisFilters);
            toggleResetBtn($thisFilters);

            $thisFilterGroups.each(function() {

                var $thisFilterGroup = $(this);

                // only on init: mark filter groups that have too many filters
                // add make them scrollable

                var aboveMaxHeight = $thisFilterGroup.height() > filterGroupMaxHeight;

                if (aboveMaxHeight) {
                    $thisFilterGroup.data().isScroll = true;
                    $thisFilterGroup.addClass('filterGroup--isScroll');
                } else {
                    $thisFilterGroup.data().isScroll = false;
                }

                // collapse all filter groups if they are already
                // defined as collapsed in markup

                if ($thisFilterGroup.data().isCollapsed)
                    collapseFilterGroup($thisFilterGroup);

            });

            // attach events

            $thisFilterGroupHeaders.on('click', function() {
                var $thisFilterGroup = $(this).closest('.filterGroup');
                toggleFilterGroup($thisFilterGroup);
            });

            $thisFiltersMulti.on('click', function(e) {
                e.preventDefault();
                var $thisFilter = $(this);
                toggleFilter($thisFilter);
            });

            $thisFiltersSingle.on('click', function(e) {
                e.preventDefault();
                var $thisFilter = $(this);
                toggleFilter($thisFilter);
            });

            $thisFilters.on('filters:update', function() {
                updateResults($thisFilters);
            });

            $thisFilters.on('filters:reset', function() {
                resetFilters($thisFilters);
                toggleResetBtn($thisFilters);
            });

        });

    }

    function resetFilters($filters) {

        /**
         *  Reset all filters inside a .filter (if .filter was specified through
         *  the caller argument) or reset all filters on the page (if no caller
         *  was specified).
         *
         *  @param {jQuery dom object} $filters - the filters
         */

        var $thisFilters        = $filters;
        var $thisFilterGroups   = $thisFilters.find('.filterGroup');
        var $thisFiltersFilters = $thisFilters.find('.filter');

        // deactivate all filter buttons

        $thisFiltersFilters.removeClass('is--active');

        // collapse filter groups

        $thisFilterGroups.each(function() {
            var $thisFilterGroup = $(this);
            if ($thisFilterGroup.data().isCollapsed)
                collapseFilterGroup($thisFilterGroup);
        });

        // fire reset event on range sliders

        $thisFilters.find('.rangeInput').trigger('rangeInput:reset');

        // update search results

        $thisFilters.trigger('filters:update');

    }

    function collapseFilterGroup($thisFilterGroup) {

        /**
         *  Collapse a filter group by hiding all inactive filters.
         *  Active filters always stay visible.
         *
         *  @param {jQuery dom object} $filterGroup - the fiter group
         */

        var $thisFilters         = $thisFilterGroup.closest('.filters');
        var $thisFilterGroupBody = $thisFilterGroup.find('.filterGroup__body');

        if ($thisFilterGroup.hasClass('filterGroup--isScroll')) {
            $thisFilterGroupBody.animate({ scrollTop: 0 }, 100);
        }

        $thisFilterGroup.addClass('filterGroup--collapsed');

        $.when($thisFilterGroup.find('.filter:not(.is--active)').slideUp(200)).then(function() {
            updateAllFilterGroups($thisFilters);
        });

    }

    function expandFilterGroup($thisFilterGroup) {

        /**
         *  Expand a filter group by showing all inactive filters.
         *  Active filters always stay visible.
         *
         *  @param {jQuery dom object} $filterGroup - the fiter group
         */

        var $thisFilters     = $thisFilterGroup.closest('.filters');

        $thisFilterGroup.removeClass('filterGroup--collapsed');

        $.when($thisFilterGroup.find('.filter:not(.is--active)').slideDown(200)).then(function() {
            updateAllFilterGroups($thisFilters);
        });

    }

    function toggleFilterGroup($thisFilterGroup) {

        /**
         *  Expand or collapse a filter group by showing or hiding all inactive filters.
         *  Active filters always stay visible.
         *
         *  @param {jQuery dom object} $filterGroup - the fiter group
         */

        if ($thisFilterGroup.data().isCollapsed) {
            expandFilterGroup($thisFilterGroup);
        } else {
            collapseFilterGroup($thisFilterGroup);
        }

    }

    function toggleFilter($thisFilter) {

        /**
         *  Activate or deactivate an individual filter.
         *  The visual change is applied immediately while the actual query
         *  to update the search results and so on gets called with a certain delay.
         *  The delay helps avoiding unexpected behaviour through brute-force / rapid clicking.
         *
         *  @param {jQuery dom object} $thisFilter - the filter
         */

        // cancel if results update is running

        if (loadResultsIsRunning) {
            return false;
        }

        var $thisFilterGroup = $thisFilter.closest('.filterGroup');
        var $thisFilters     = $thisFilter.closest('.filters');

        if ($thisFilter.hasClass('filter--multi')) {
            $thisFilter.toggleClass('is--active');
        } else if ($thisFilter.hasClass('filter--single')) {
            $thisFilterGroup.find('.filter--single').removeClass('is--active');
            $thisFilter.addClass('is--active');
        }

        // axecute after delay

        YOI.setDelay('toggleFilterTimeout', 750, function() {

            // collapse filter group

            if ($thisFilterGroup.data().isCollapsed && $thisFilterGroup.data().hasActiveFilters)
                collapseFilterGroup($thisFilterGroup);

            // update all filter groups

            updateAllFilterGroups($thisFilters);

            // update search results

            $thisFilters.trigger('filters:update');

            // toggle reset button

            toggleResetBtn($thisFilters);

        });

    }

    function toggleResetBtn($thisFilters) {

        /**
         *  Injects or removes a reset button per '.filters' container.
         *  The buttons calls the public reset method and deactivates
         *  all active filter buttons.
         *
         *  @param {jQuery dom object} $thisFilters - the filters
         */

        var totalActiveFilters = $thisFilters.find('.is--active');

        if (!$thisFilters.find('.filters__resetBtn').length && totalActiveFilters.length) {

            $resetBtn
            .clone()
            .prependTo($thisFilters)
            .on('click', function(e) {
                e.preventDefault();
                $thisFilters.trigger('filters:reset');
            });

        } else if (!totalActiveFilters.length) {

            $thisFilters.find('.filters__resetBtn').detach();

        }

    }

    function updateAllFilterGroups($thisFilters) {

        /**
         *  Walk through all filter groups and update some properties.
         *  These properties are booleans like "is this filtergroup expanded or collapsed", etc.
         *  They are stored inside the jQuery data-object of each filter group.
         *
         *  @param {jQuery dom object} $thisFilters - the filters
         */

        var $thisFilterGroups = $thisFilters.find('.filterGroup');

        $thisFilterGroups.each(function() {

            var $thisFilterGroup = $(this);
            var $thisFilterGroupBody = $thisFilterGroup.find('.filterGroup__body');

            // update data

            $thisFilterGroup.data({
                // isScroll      : defined only once on init
                isCollapsed      : $thisFilterGroup.hasClass('filterGroup--collapsed'),
                hasActiveFilters : $thisFilterGroup.find('.is--active').length > 0
            });

            $thisFilterGroup.data({
                hasShadow: ($thisFilterGroup.data().isScroll && !$thisFilterGroup.data().isCollapsed) || ($thisFilterGroup.data().isCollapsed && $thisFilterGroup.height() > filterGroupMaxHeight)
            });

            // update css classes

            if ($thisFilterGroup.data().hasActiveFilters) {
                $thisFilterGroup.addClass('filterGroup--hasActiveFilters');
            } else {
                $thisFilterGroup.removeClass('filterGroup--hasActiveFilters');
            }

            if ($thisFilterGroup.data().hasShadow) {
                $thisFilterGroup.addClass('filterGroup--hasShadow');
            } else {
                $thisFilterGroup.removeClass('filterGroup--hasShadow');
            }

        });

    }

    function updateActiveFilters($thisFilters) {
        /**
         *  Todo:
         *  Read all active filters and generate a search url,
         *  Something like "/s/?term=some+search+term&filter=xx".
         *
         *  @param {jQuery dom object} $thisFilters - the filters
         */
    }

    function updateResults($thisFilters, withPriceRange) {

        /**
         *  Apply the active filters by requesting the search results
         *  and updating the search display. The search display is set via
         *  the data-attribute "data-searchdisplay" in the markup.
         *
         *  @param {jQuery dom object} $filter        - the filter
         *  @param {bool}              withPriceRange - updates the corrensponding price range, default is true
         */

        // cancel if already running

        if (loadResultsIsRunning) {
            return false;
        }

        // update price range?

        if (withPriceRange === undefined) {
            withPriceRange = true;
        }

        // gather dom objects

        var $thisSearchDisplay = $($thisFilters.data().searchdisplay);
        var $thisRangeInput    = $thisFilters.find('.rangeInput').first();

        // cancel if no search display was found

        if ($thisSearchDisplay.length < 1) return false;

        // execute after delay

        YOI.setDelay('updateResultsTimeout', 500, function() {

            /**
             *  Todo:
             *
             *  Load the search results and update the target display.
             *  Return data to update pagination. Return data to update any
             *  .rangeInput, for example to update the price range (derived from
             *  the updated search results from manipulating the filters).
             *
             *  To avoid unnecessary requests, the results should only be
             *  updated if the filters actually did change. Furthermore it's
             *  important to fetch any .rangeInput elements and include
             *  their data, too.
             *
             *  The following code is simply simulated behaviour to test the
             *  user experience:
             *
             */

            $('body').stop().animate({ scrollTop: 0 }, 500, function() {

                // set flag: update is running

                loadResultsIsRunning = true;

                // update filters

                $thisFilters.addClass('filters--disabled');
                $thisSearchDisplay.append($loader);
                $loader.hide().fadeIn(200);

                $thisSearchDisplay.animate({ opacity: 0 }, 200, function() {

                    $thisSearchDisplay.delay(300).animate({ opacity: 1 }, 500, function() {

                        $loader.fadeOut(200);
                        $thisFilters.removeClass('filters--disabled');

                        // update any rangeInput

                        if (withPriceRange && YOI.foundModule('RangeInput')) {

                            var $rangeInput = $thisFilters.find('.rangeInput').first();

                            var randomPriceA = Math.ceil(Math.random(1, 250) * 100);
                            var randomPriceB = Math.ceil(Math.random(1, 250) * 100);
                            var minPrice     = Math.min(randomPriceA, randomPriceB);
                            var maxPrice     = Math.max(randomPriceA, randomPriceB);
                            var absMinPrice  = minPrice;
                            var absMaxPrice  = maxPrice;

                            RangeInput.set($rangeInput, minPrice, maxPrice, absMinPrice, absMaxPrice);

                        }

                        loadResultsIsRunning = false;

                    });

                });

            });

        });

    }

    // initialize
    // ==========

    initializeFilters();

    // public functions
    // ================

    return {
        init   : initializeFilters,
        reset  : resetFilters,
        apply  : updateResults
    };

})();

/** flyouts.js */

var Flyout = (function() {

    // private functions
    // =================

    function initializeFlyout($flyout) {
        
        /**
         *  Initialize all *[data-flyout] found in the document (= function call without parameters)
         *  or target one or more specific *[data-flyout] (= function call with $dock).
         *  $flyout must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $flyout - the flyout(s)
         */
        
        if (!($flyout instanceof jQuery)) {
            $flyout = $('[data-flyout]');
        }

        $flyout.each(function() {

            var $thisFlyout = $(this).detach();
            var $flyoutHandle = $thisFlyout.find('.flyout__handle');

            // if no left/right modifier class was found,
            // fall back to "left" as default

            if (!$thisFlyout.hasClass('flyout--left') && !$thisFlyout.hasClass('flyout--right')) {
                $thisFlyout.addClass('flyout--left');
            }

            // hide the flyout

            $thisFlyout.addClass('flyout--hidden');

            // add events to flyout handle

            $flyoutHandle.on('click', function() {
                toggleFlyout($thisFlyout);
            });

            // move the flyout in markup to make it a
            // direct child of the body

            $('body').append($thisFlyout);

        });

    }

    function toggleFlyout($thisFlyout) {

        /**
         *  Toggle the flyout.
         *
         *  @param  {jQuery dom object} $thisFlyout - the flyout
         */

        $thisFlyout.toggleClass('flyout--visible');
    }

    function showFlyout($thisFlyout) {

        /**
         *  Show the flyout.
         *
         *  @param  {jQuery dom object} $thisFlyout - the flyout
         */

        $thisFlyout.removeClass('flyout--visible')
    }

    function hideFlyout($thisFlyout) {

        /**
         *  Hide the flyout.
         *
         *  @param  {jQuery dom object} $thisFlyout - the flyout
         */

        $thisFlyout.addClass('flyout--visible');
    }

    // initialize
    // ==========

    initializeFlyout();

    // public functions
    // ================

    return {
        init   : initializeFlyout,
        toggle : toggleFlyout,
        show   : showFlyout,
        hide   : hideFlyout
    }

})();

/** forms.js */

var CustomFormElements = (function() {

    // private vars
    // ============

    var $checkBoxWrapper = $('<span class="checkbox"></span>')
        .on('click', function() {
            $(this).find('input').trigger('change');
        });

    var $radioBtnWrapper = $('<span class="radio"></span>')
        .on('click', function() {
            $(this).find('input').trigger('change');
        });

    // private functions
    // =================

    function initializeCustomFormElements(scope) {

        /**
         *  Set css-selector to either target all custom form elements
         *  or only the ones in a specified scope (e.g. #myContainer input[type="checkbox"]).
         *
         *  @param  {string} scope - a jQuery selector to define the scope
         */

        // set css-selector to either target all custom form elements
        // or only the ones in a specified scope (e.g. #myContainer input[type="checkbox"])

        if (scope === undefined) {
            scope = '';
        } else {
            scope += ' ';
        }

        // select custom checkboxes and radio buttons

        var checkElemns = $(scope + 'input[type="checkbox"]:not(.js-fallback, .switch *, [data-switch]), input[type="radio"]:not(.js-fallback, .switch *, .radioBtn *)');
        var checkBoxes  = $(scope + 'input[type="checkbox"]:not(.js-fallback, .switch *, [data-switch])');
        var radioBtns   = $(scope + 'input[type="radio"]:not(.js-fallback, .switch *, .radioBtn *)');
        var selects     = $(scope + 'select:not(.js-fallback)');

        // prepare custom form elements

        checkBoxes.each(function() {

            var isWrappedInLabel = $(this).parents().index('label');

            if (isWrappedInLabel === -1) {
                $(this).wrap($checkBoxWrapper.clone(true)); // clone with events
            } else {
                $(this).wrap($checkBoxWrapper.clone());     // clone without events
            }

        });

        radioBtns.each(function() {

            var isWrappedInLabel = $(this).parents().index('label');

            if (isWrappedInLabel === -1) {
                $(this).wrap($radioBtnWrapper.clone(true)); // clone with events
            } else {
                $(this).wrap($radioBtnWrapper.clone());     // clone without events
            }

        });

        checkElemns.each(function() {

            var thisWrapper = $(this).parent();

            // move class names from checkbox/radio-button
            // to the wrapper

            thisWrapper.addClass($(this).attr('class'));
            $(this).removeAttr('class');

            // checked?

            if ($(this).is(':checked')) {
                thisWrapper.addClass('input--checked');
            }

        });

        selects.each(function() {

            var $thisSelect    = $(this);
            var $selectWrapper = $('<span></span>');
            var $icon          = $('<i class="icon--009-s" aria-hidden="true"></i>');

            // prepare wrapper, keep modifiers
            $selectWrapper.addClass('btn ' + $thisSelect.attr('class'));
            $selectWrapper.attr('role','customSelect');

            // inject elements
            $thisSelect.wrap($selectWrapper);
            $thisSelect.parent().append($icon);

            // remove classNames (modifiers) from select element
            $thisSelect.removeAttr('class');

        });

        checkElemns.on({
            'focus' : function() {
                $(this).parent().addClass('input--focus');
            },
            'blur' : function() {
                $(this).parent().removeClass('input--focus');
            },
            'change' : function(e) {
                $(this).parent().toggleClass('input--checked');
            }
        });

        // switches

        // $(scope + '.switch').each(function() {
        //
        //    /**
        //     *  How Does the Options-Interface Work?
        //     *
        //     *  Use the custom data-attribute to apply options. Use this notation:
        //     *  data-switch="foo:bar;hello:world;"
        //     */
        //
        //     var $thisSwitch = $(this);
        //
        //     var options     = YOI.toObject($thisSwitch.data('switch'));
        //     var labelOnTxt  = options.labelOn !== undefined ? options.labelOn : 'Ein';
        //     var labelOffTxt = options.labelOff !== undefined ? options.labelOff : 'Aus';
        //
        //     var $labelOn    = $('<span class="switch__labelOn">' + labelOnTxt + '</span>');
        //     var $labelOff   = $('<span class="switch__labelOff">' + labelOffTxt + '</span>');
        //     var $knob       = $('<span class="switch__knob">');
        //
        //     $thisSwitch.append($knob, $labelOn, $labelOff);
        //
        //     $thisSwitch.on('click', function(e) {
        //
        //         if ($thisSwitch.hasClass('switch--on')) {
        //
        //             $thisSwitch.removeClass('switch--on').addClass('switch--off');
        //             $thisSwitch.find('input[type="checkbox"]').attr('checked', false);
        //
        //         } else if ($thisSwitch.hasClass('switch--off')) {
        //
        //             $thisSwitch.removeClass('switch--off').addClass('switch--on');
        //             $thisSwitch.find('input[type="checkbox"]').attr('checked', true);
        //
        //         }
        //
        //     });
        //
        // });

        // textareas with max-chars

        // $(scope + '[data-maxchars]').each(function() {
        //
        //     var maxCharacters    = $(this).data('maxchars');
        //     var characterCount   = $(this).next('[data-characterCount]').html('Noch <b>' + maxCharacters + '</b> Zeichen möglich.');
        //     var characterCounter = $(this).next('[data-characterCount]').find('b');
        //
        //     $(this).on('keydown', function(e) {
        //
        //         var inputLenght = $(this)[0].value.length;
        //
        //         if(inputLenght >= maxCharacters) {
        //             characterCounter.addClass('error');
        //             characterCounter.text('0');
        //         } else {
        //             characterCounter.removeClass('error');
        //             characterCounter.text(maxCharacters - inputLenght);
        //         }
        //
        //     });
        //
        // });

    }

    // initialize
    // ==========

    initializeCustomFormElements();

    // public functions
    // ================

    return {
        init : initializeCustomFormElements
    }

})();

/** hide.js */

var Hide = (function() {
    
    // private functions
    // =================
    
    function initializeHide($hideTrigger, options) {
        
        /**
         *  Search the Dom for trigger-elements flagged with "data-hide" and hide the
         *  corresponding target elements on any event you wish to bind to the trigger.
         *  Options include to chose from all standard event handlers for the trigger and
         *  using one of two available transitions.
         *
         *  Initialize all *[data-hide] found in the document (= function call without parameters)
         *  or target one or more specific *[data-hide] (= function call with $dock).
         *  $hideTrigger must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $hideTrigger - the hide trigger(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <button class="btn" data-hide="target:#myTarget; event:click; transition:fadeOut">Hide</button>
         *
         *  Available options:
         *
         *  @option {string} target     - A string which is used as selector for the target element
         *                                (eg. '#myTarget' or '.myTarget', etc.)
         *  @option {string} event      - A string which defines the event which gets bound to the
         *                                trigger element. All standard event handlers from jQuery
         *                                can be used.
         *  @option {string} transition - Chose from two jQuery animations: 'fadeOut' and 'slideUp'.
         */
        
        if (!($hideTrigger instanceof jQuery)) {
            $hideTrigger = $('[data-hide]');
        }
        
        $hideTrigger.each(function(index){

            // set up vars

            var $thisTrigger = $(this);
            var $data        = options === undefined ? YOI.toObject($this.data('hide')) : options;
            var target       = $data.target !== undefined ? $data.target : false;
            var event        = $data.event !== undefined ? $data.event : 'click';
            var transition   = $data.transition !== undefined ? $data.transition : false;
            
            // cancel if no target was defined

            if (!target) return false;
            
            // apply event on trigger and hide target
            
            $thisTrigger.on(event, function(e) {
                if (transition === 'fadeOut') {
                    $(target).fadeOut();
                } else if (transition === 'slideUp') {
                    $(target).slideUp();
                } else {
                    $(target).hide();
                }
            });

        });
        
    }
    
    // initialize
    // ==========
    
    initializeHide();
    
    // public functions
    // ================
    
    return {
        init: initializeHide
    }

})();
/** imgMagnifier.js */

var ImgMagnifier = (function(){

    // private vars
    // ============

    var $cursor = $('<div class="imgMagnifier__cursor"></div>');
    var $viewer = $('<div class="imgMagnifier__viewer"></div>');

    var startViewerDelayTime = 600;

    // private functions

    function initializeImgMagnifier($imgMagnifier) {

        /**
         *  Initialize all *[data-imgmagnifier] found in the document (= function call without parameters)
         *  or target one or more specific *[data-imgmagnifier] (= function call with $imgmagnifier).
         *  $imgmagnifier must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $imgmagnifier - the image magnifier(s)
         */

        if (!($imgMagnifier instanceof jQuery)) {
            $imgMagnifier = $('[data-imgmagnifier]');
        }

        $imgMagnifier.each(function() {

            var $thisImgMagnifier = $(this);
            var $thisCursor       = $cursor.clone().hide();
            var $thisViewer       = $viewer.clone().hide();

            // append elements

            $thisImgMagnifier.append($thisCursor);
            $thisImgMagnifier.append($thisViewer);

            // To provide a nice noscript-fallback, the preview image
            // is wrapped inside a link to the zoom image. However, if JS
            // is enabled, the link should not open on click.

            $thisImgMagnifier.find('a')
                .on('click', function(e) {
                    e.preventDefault();
                });

            // attach other events

            $thisImgMagnifier
                .on('mouseenter', function() {
                    startViewer($thisImgMagnifier);
                })
                .on('mouseleave', function() {
                    stopViewer($thisImgMagnifier);
                })
                .on('mousemove', function(e) {
                    moveMagnifier($thisImgMagnifier, e);
                });

            // set up viewer and zoom image

            setViewer($thisImgMagnifier);
            setZoomImage($thisImgMagnifier);

        });

    }

    function resetImgMagnifier($imgMagnifier) {

        /**
         *  Reset one or more image magnifiers.
         *
         *  @param {jQuery dom object} $imgMagnifier - the image magnifier(s)
         */
        
        if (!($imgMagnifier instanceof jQuery)) {
            $imgMagnifier = $('[data-imgmagnifier]');
        }

        $imgMagnifier.each(function() {

            var $thisImgMagnifier = $(this);

            $thisImgMagnifier.data({
                'yPos' : $thisImgMagnifier.offset().top,
                'xPos' : $thisImgMagnifier.offset().left
            });

        });

    }

    function setZoomImage($thisImgMagnifier) {

        /**
         *  Load and inject the zoom image, attach events, store data inside
         *  $thisImgMagnifier data object for further calculations.
         *
         *  @param {jQuery dom object} $thisImgMagnifier - the image magnifier
         */

        var thisZoomImagePath   = $thisImgMagnifier.find('a').attr('href');
        var $thisViewer         = $thisImgMagnifier.find('.imgMagnifier__viewer');
        var $thisCursor         = $thisImgMagnifier.find('.imgMagnifier__cursor');
        var $thisPreviewImage   = $thisImgMagnifier.find('.imgMagnifier__previewImage');

        // prepare the zoom image, get size before injecting into DOM

        var thisZoomImage           = new Image();
            thisZoomImage.src       = thisZoomImagePath;
            thisZoomImage.className = 'imgMagnifier__zoomImage';
        var $thisZoomImage          = $(thisZoomImage);

        $thisZoomImage
            .on('error', function() {

                // If the image does not exist, destroy
                // the image magnifier.

                destroyImageMagnifier($thisImgMagnifier);

            })
            .on('load', function() {

                $thisViewer.append($thisZoomImage);

                $thisImgMagnifier.data({
                    'width'  : $thisImgMagnifier.width(),
                    'height' : $thisImgMagnifier.height(),
                    'yPos'   : $thisImgMagnifier.offset().top,
                    'xPos'   : $thisImgMagnifier.offset().left,
                    'yRatio' : $thisPreviewImage.height() / thisZoomImage.height,
                    'xRatio' : $thisPreviewImage.width() / thisZoomImage.width
                });

                setCursor($thisImgMagnifier);

                // If the zoom image is smaller than the preview image, destory
                // the image magnifier.

                if ($thisImgMagnifier.data().yRatio >= 1 || $thisImgMagnifier.data().yRatio >= 1) {
                    destroyImageMagnifier($thisImgMagnifier);
                }

            });

    }

    function setCursor($thisImgMagnifier) {

        /**
         *  Set the cursor size according to the zoom factor of .imgMagnifier__zoomImage.
         *  This factor is not fixed but calculated from the size ratio of
         *  .imgMagnifier__previewImage and .imgMagnifier__zoomImage.
         *
         *  @param {jQuery dom object} $thisImgMagnifier - the image magnifier
         */

        var $thisCursor      = $thisImgMagnifier.find('.imgMagnifier__cursor');
        var $thisViewer      = $thisImgMagnifier.find('.imgMagnifier__viewer');
        var thisCursorWith   = $thisImgMagnifier.width() * $thisImgMagnifier.data().xRatio;
        var thisCursorHeight = $thisImgMagnifier.height() * $thisImgMagnifier.data().yRatio;

        $thisCursor.css({
            width: thisCursorWith,
            height: thisCursorHeight
        });

        $thisCursor.data({
            'width'  : thisCursorWith,
            'height' : thisCursorHeight,
            'yRatio' : $thisViewer.height() / thisCursorHeight,
            'xRatio' : $thisViewer.width() / thisCursorWith
        });

    }

    function setViewer($thisImgMagnifier) {

        /**
         *  Set the viewer size and position. The viewer
         *  always has the same size as the .imgMagnifier itself.
         *
         *  @param {jQuery dom object} $thisImgMagnifier - the image magnifier
         */

        var $thisViewer = $thisImgMagnifier.find('.imgMagnifier__viewer');

        $thisViewer.css({
            width      : $thisImgMagnifier.width(),
            height     : $thisImgMagnifier.height(),
            left       : $thisImgMagnifier.width(),
            marginLeft : 20
        });

    }

    function startViewer($thisImgMagnifier) {

        /**
         *  Show the viewer after a short delay.
         *
         *  @param {jQuery dom object} $thisImgMagnifier - the image magnifier
         */

        var $thisViewer = $thisImgMagnifier.find('.imgMagnifier__viewer');
        var $thisCursor = $thisImgMagnifier.find('.imgMagnifier__cursor');

        YOI.setDelay('imgMagnifierDelay', startViewerDelayTime, function() {
            $thisViewer.fadeIn();
            $thisCursor.fadeIn();
        });

    }

    function stopViewer($thisImgMagnifier) {

        /**
         *  Hide the viewer.
         *
         *  @param {jQuery dom object} $thisImgMagnifier - the image magnifier
         */

        YOI.clearDelay('imgMagnifierDelay');

        var $thisViewer = $thisImgMagnifier.find('.imgMagnifier__viewer');
        var $thisCursor = $thisImgMagnifier.find('.imgMagnifier__cursor');

        $thisViewer.fadeOut('fast');
        $thisCursor.fadeOut('fast');

    }

    function moveMagnifier($thisImgMagnifier, e) {

        /**
         *  Move the cursor over the preview image and move the
         *  zoom image inside the viewer accordingly.
         *
         *  @param {jQuery dom object} $thisImgMagnifier - the image magnifier
         *  @param {event}             e                 - the trigger event
         */

        var $thisCursor    = $thisImgMagnifier.find('.imgMagnifier__cursor');
        var $thisZoomImage = $thisImgMagnifier.find('.imgMagnifier__zoomImage');

        var yPos = (e.pageY - $thisImgMagnifier.data().yPos - $thisCursor.data().height / 2);
        var xPos = (e.pageX - $thisImgMagnifier.data().xPos - $thisCursor.data().width / 2);

        // calculate cursor boundaries

        var minY = yPos > 0 ? true : false;
        var maxY = yPos < $thisImgMagnifier.data().height - $thisCursor.data().height ? true : false;
        var minX = xPos > 0 ? true : false;
        var maxX = xPos < $thisImgMagnifier.data().width - $thisCursor.data().width ? true : false;

        // move the cursor

        if (minY && maxY) $thisCursor.css('top', yPos);
        if (minX && maxX) $thisCursor.css('left', xPos);

        // move the zoom image

        if (minY && maxY) $thisZoomImage.css('top', yPos * $thisCursor.data().yRatio * -1);
        if (minX && maxX) $thisZoomImage.css('left', xPos * $thisCursor.data().xRatio * -1);

    }

    function destroyImageMagnifier($imgMagnifier) {

        /**
         *  Remove all injected elements and detach all events.
         *
         *  @param  {jQuery dom object} $$imgMagnifiers - all image magnifiers
         *  @return {bool false}
         */

        if (!($imgMagnifier instanceof jQuery)) {
            $imgMagnifier = $('.imgMagnifier');
        }

        $imgMagnifier.each(function() {

            var $thisImgMagnifier = $(this);

            $thisImgMagnifier.find('.imgMagnifier__cursor').remove();
            $thisImgMagnifier.find('.imgMagnifier__viewer').remove();
            $thisImgMagnifier.off();
            $thisImgMagnifier.find('*').off();

        });

        return false;

    }

    // initialize
    // ==========

    $(window)
        .on('load', function() {
            initializeImgMagnifier();
        })
        .on('resize', function() {
            YOI.clearDelay('imgMagnifierResetDelay');
            YOI.setDelay('imgMagnifierResetDelay', 500, function() {
                resetImgMagnifier();
            });
        });

    // public functions
    // ================

    return {
        init    : initializeImgMagnifier,
        destroy : destroyImageMagnifier
    }

})();

/** microSubmit.js */

var MicroSubmit = (function() {

    // private vars
    // ============

    var $response = $('\
        <span class="tc-green-12 fw-bold">OK</span>\
    ');

    // private functions
    // =================

    function initializeMicroSubmit($microSubmit, options) {
        
        /**
         *  Initialize all form[data-microsubmit] found in the document (= function call without parameters)
         *  or target one or more specific form[data-microsubmit] (= function call with $microSubmit).
         *  $microSubmit must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $microSubmit - the micro submit form(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <form data-microsubmit="response:#myCustomResponse;"></form>
         *
         *  Available options:
         *
         *  @option {string} response - a CSS selector (most likely an #id) to select the dom
         *                              element which is displayed after submit
         */

        if (!($microSubmit instanceof jQuery)) {
            $microSubmit = $('form[data-microsubmit]');
        }

        $microSubmit.each(function() {

            var $thisForm       = $(this);
            var options         = options === undefined ? YOI.toObject($thisForm.data('microsubmit')) : options;
            var receiver        = $thisForm.attr('action') !== undefined ? $thisForm.attr('action') : false;
            var thisMessage     = $thisForm.find('input').val();
            var $thisResponse   = $(options.response).length ? $(options.response) : $response.clone();
            
            // hide response content first
            
            YOI.hide($thisResponse);
            
            // cancel if no target url (for ajax send) was found
            
            if (!receiver) return false;
            
            // submit form, show msg

            $thisForm.submit(function(e) {
                
                e.preventDefault();
                
                $.ajax({
                    url: receiver,
                    type: "POST",
                    data: {
                        input: thisMessage
                    },
                    complete: function(response){
                        $thisForm.replaceWith($thisResponse);
                        YOI.show($thisResponse);
                    }
                });

            });

            /**
             *  It doesn't add any value to display an error message.
             *  Even if the submission fails, let's pretend it worked all fine.
             *  It's much better to track these errors internally.
             */

        });

    }

    // initialize
    // ==========

    initializeMicroSubmit();

    // public functions
    // ================

    return {
        init : initializeMicroSubmit
    }

})();

/** modal.js */

var Modal = (function() {

    // private vars
    // ============

    var modalActive   = false; // Is any modal currently visible?
    var loadedModals  = [];    // Which modals were loaded (ajax) so far?
    var scrollTop     = false; // How far is the page scrolled?
    var modalIdIndex  = 0;     // An index for internally generated modal ids.
    var btnLabelClose = YOI.locale === 'de' ? 'Schließen' : 'Close';

    var $modalCover = $('\
        <div class="modal__cover" id="modalCover" data-action="closeModal"></div>\
    ');

    var $modalContainer = $('\
        <div class="modal__container" id="modalContainer"></div>\
    ');

    var $modalCloseBtn = $('\
        <button class="btn btn--flat" data-action="closeModal">\
            <span class="hidden">' + btnLabelClose + '</span>\
            <i class="icon--006-s" aria-hidden="true"></i>\
        </button>\
    ');

    var $modalCloseBtnMobile = $('\
        <button class="btn btn--large btn--subtle" data-action="closeModal">\
            <span class="hidden">' + btnLabelClose + '</span>\
            <i class="icon--006" aria-hidden="true"></i>\
        </button>\
    ');

    // private methods

    function initializeModal($modal, options) {

        /**
         *  Initialize all *[data-modal] found in the document (= function call without parameters)
         *  or target one or more specific *[data-modal] (= function call with $modal).
         *  $modal must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $modal - the modal(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <button data-modal="path:pages/modal_test.html;cache:true;">
         *
         *  Available options:
         *
         *  @option {string} id   - id-selector, eg. "#modal-test"
         *                          To reference modals internally, this script uses generated ids, which
         *                          may be overridden by this option.
         *
         *  @option {string} path - Path to modal page, eg. "pages/modal_test.html".
         *                          Any element can be linked to a modal. If it's not a link or a link
         *                          with a href that does not link to a modal, the modal path may be
         *                          overridden by this option.
         *
         *  @option {bool} cache  - If true, the referenced modal will preload in the background.
         */
        
        if (!($modal instanceof jQuery)) {
            $modal = $('[data-modal]');
        }

        // prepare dom

        $(document.body).append($modalCover.clone().hide());
        $(document.body).append($modalContainer.clone().hide());

        // prepare modal links

        $modal.each(function() {

            var $this = $(this);

            var options        = options === undefined ? YOI.toObject($this.data('modal')) : options;
            var thisModalId    = options !== undefined && options.id    !== undefined ? options.id    : generateModalId();
            var thisModalPath  = options !== undefined && options.path  !== undefined ? options.path  : $this.attr('href');
            var thisModalCache = options !== undefined && options.cache !== undefined ? options.cache : false;

            // preload/cache

            if (thisModalCache) loadModal(thisModalId, thisModalPath);

            // attach click event

            $this.on('click', function(e) {

                e.preventDefault();
                showModal(thisModalId, thisModalPath);

            });

        });

        // inititalize triggers to close all modals

        initializeModalCloseTriggers();

    }

    function initializeModalCloseTriggers(modalId) {

        /**
         *  Attach modal close action to elements with
         *  data-action="closeModal".
         *
         *  Triggers are either all matching elements or
         *  only mathing elements inside the provided scope
         *  of modalId.
         *
         *  @param {string} modalId - the modal id
         */

        var triggers;

        if (modalId !== undefined) {
            triggers = $(modalId).find('[data-action="closeModal"]');
        } else {
            triggers = $('[data-action="closeModal"]');
        }

        triggers.on('click', function() {
            closeModals();
        });

    }

    function loadModal(modalId, modalPath, callback) {

        /**
         *  Load a modal (ajax) and inject it into the dom.
         *  If the target modal is already in the dom, do nothing.
         *
         *  @param {string} modalId             - the modal id
         *  @param {string} modalPath           - the path to the modal page
         *  @param {callback function} callback - a function to execute as callback
         */

        if (loadedModals.indexOf(modalId) === -1) {

            var $loadBin = $('<div>');

            // load into a placeholder element ($loadBin), append response to #modalContainer

            $loadBin.load(modalPath, function(response, status, xhr) {

                if (status === 'success') {

                    var thisModal = $(this).find('.modal, .modal-s').first();

                    // if valid modal markup was found

                    if (thisModal.length) {

                        // register the modalId to an array of already loaded modals.

                        loadedModals.push(modalId);

                        // prepare modal markup

                        thisModal.attr('id', modalId.split('#')[1]);
                        thisModal.find('.modal__header').append($modalCloseBtn.clone());
                        thisModal.find('.modal-s__header').append($modalCloseBtnMobile.clone());

                        // append to dom & hide

                        $('#modalContainer').append(thisModal);
                        $(modalId).hide();

                        // update elements inside modal

                        initializeModalCloseTriggers(modalId);

                        if (YOI.foundModule('CustomFormElements'))
                            CustomFormElements.init(modalId);

                        // optional callback

                        if (typeof callback === 'function') {
                            callback();
                        }

                    } else {

                        // treat as regular link
                        openFallbackLink(modalPath);

                    }

                }

                if (status === 'error') {

                    // fail silently

                }

            });

        }

    }

    function showModal(modalId, modalPath) {

        /**
         *  Open/show a modal.
         *
         *  @param {string} modalId   - the modal id
         *  @param {string} modalPath - the path to the modal page
         */

        if (loadedModals.indexOf(modalId) === -1) {

            // if the modal is not found in dom, load it first, then show it

            loadModal(modalId, modalPath, function(){
                showModal(modalId, modalPath);
            });

        } else {

            // if modal is already in dom, simply show it

            $('#modalCover').fadeIn('fast');
            $('#modalContainer').show();
            $(modalId).show();

            modalActive = true;

            // center modal

            centerModal(modalId);

            // On mobile, scroll page to top when opening the modal
            // but always jump back to the last scroll position when
            // closing the modal.

            if (YOI.environment('mobile')) {
                scrollTop = $('body').scrollTop();
                $('body').scrollTop(0);
            }

        }

    }

    function centerModal(modalId) {

        /**
         *  Vertically center a modal.
         *
         *  @param {string} modalId - the modal id
         */

        var modal = $(modalId);
        var offSetY = modal.height() / 2 * -1 - 10;

        // Does the modal vertically fit into the viewport (position: fixed)
        // or do we need to scroll (position: absolute)?

        var modalFitsIntoViewport = ($(window).height() - 50) < modal.height();

        if (modalFitsIntoViewport) {
            modal.css({'top': '10px', 'marginTop': '0', 'position': 'absolute' }); // make "scrollable"
            $('html,body').animate({scrollTop: 0}, 500); // "rewind" page to top
        } else {
            modal.css({'top': '50%', 'marginTop': offSetY, 'position': 'fixed' });
        }

    }

    function closeModals() {

        /**
         *  Close all modals.
         */

        $('#modalCover').fadeOut('fast');
        $('#modalContainer, #modalContainer .modal, #modalContainer .modal-s').hide();

        if (scrollTop > 0) {
            $('body').scrollTop(scrollTop);
        }

        modalActive = false;
        if (YOI.foundModule('BrowserHistory'))
            BrowserHistory.clearHash();

    }

    function detachModals() {

        /**
         *  Close and remove all modals.
         */

        $('#modalContainer .modal, #modalCover').fadeOut('fast',function() {

            $('#modalContainer').empty().hide();
            $('body').css('overflow','auto');

            modalActive = false;

        });

    }

    function generateModalId() {

        /**
         *  Generate a simple "unique" modal id for internal reference.
         *
         *  @return {string} - a unique modal id
         */

        return '#modal-' + modalIdIndex++;

    }

    function openFallbackLink(modalPath) {

        /**
         *  If a referenced modal is ill-formatted (or simply not a modal page),
         *  fall back to simply open the linked page.
         *
         *  @param {string} modalPath - the path to the modal page
         */

        window.location = window.location.protocol + '//' + window.location.host + '/' + modalPath;

    }

    // initialize
    // ==========

    initializeModal();

    // public methods
    // ==============

    return {
        init   : initializeModal,
        load   : loadModal,
        show   : showModal,
        close  : closeModals,
        detach : detachModals
    }

})();

/** pageRewind.js */

var PageRewind = (function() {

    // private vars
    // ============
    
    var $pageRewind;
    var $window     = $(window);
    var $body       = $('body');
    var threshold   = 500;
    
    // private functions
    // =================
    
    function initializePageRewind() {
        
        /**
         *  Adds an anchor to the bottom of the viewport which
         *  appears after a certain scroll-threshold and scrolls the
         *  scrolls the page back to the very top on click.
         */
        
        $pageRewind = $(
            '<a class="pageRewind" href="#">\
                <i aria-hidden="true" class="icon--010-s"></i>\
            </a>'
        );
        
        $pageRewind
            .addClass('is--hidden')
            .on('click', function(e) {
                e.preventDefault();
                runPageRewind();
            })
            .appendTo($body);

        $window
            .scroll(function() {
                togglePageRewind();
            });
        
    }
    
    function runPageRewind() {
        
        /**
         *  Scrolls the page back to the very top.
         */
        
        $('html,body').animate({ scrollTop: 0 }, 500);
        
    }
    
    function togglePageRewind() {
        
        /**
         *  Shows or hides .pageRewind after a certain threshold.
         */
        
        if ($body.scrollTop() >= threshold) {
            $pageRewind.removeClass('is--hidden');
        } else {
            $pageRewind.addClass('is--hidden');
        }
        
    }
    
    // initialize
    // ==========
    
    initializePageRewind();
    
    // public functions
    // ================
    
    return {
        init : initializePageRewind,
        run  : runPageRewind
    }

})();
/** pieChart.js */

var PieChart = (function() {

    // private vars
    // ============

    var $colorDot = $('<span class="pieChart__dot"></span>');

    var fixedPalette = [
        '#f69d29',
        '#ec4534',
        '#66579f',
        '#2988cb',
        '#7f9b3d',
        '#fff398',
        '#dc48c2',
        '#0d5964'
    ];

    // private functions
    // =================

    function initializePieChart($pieChart, options) {

        /**
         *  Initialize all *[data-piechart] found in the document (= function call without parameters)
         *  or target one or more specific *[data-piechart] (= function call with $piechart).
         *  $piechart must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $pieChart - the pie chart(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div data-piechart="palette:fixed;size:200;">
         *
         *  Available options:
         *
         *  @option {string} baseColor - hsl color as array string, eg: [130,25,50] - default is [208,50,60].
         *                               Sets the base color, used to calculate a unique color for each
         *                               slice of the pie chart.
         *                             
         *  @option {bool}   highlight - Default is true. Set to false if you wish to disable highlighting individual
         *                               slices on mouse over.
         *                             
         *  @option {string} palette   - "fixed" || "random" || "shades" || "unique" - default is "shades".
         *                               Selects the formula used to calculate the unique color for
         *                               each slice of the pie chart.
         *                             
         *  @option {number} size      - Sets the diameter of the pie chart SVG.
         */
        
        if (!($pieChart instanceof jQuery)) {
            $pieChart = $('[data-piechart]');
        }

        $pieChart.each(function() {

            var $thisPieChart        = $(this);
            var $thisPieChartRecords = $thisPieChart.find('.pieChart__record');
            var $thisPieChartSvg     = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            var options              = options === undefined ? YOI.toObject($thisPieChart.data('piechart')) : options;

            // store data

            $thisPieChart.data({
                rotation  : 0,
                index     : 0,
                records   : $thisPieChartRecords.length,
                baseColor : options.baseColor !== undefined ? options.baseColor : '[252,45,65]',
                palette   : options.palette !== undefined ? options.palette : 'shades',
                size      : options.size !== undefined ? options.size : 200,
                highlight : options.highlight !== undefined ? options.highlight : true
            });

            var size   = $thisPieChart.data().size;
            var radius = size / 2;

            $thisPieChartSvg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);

            $($thisPieChartSvg).css({
                width  : size,
                height : size
            });

            // append the wrapper and the svg

            $thisPieChart.prepend($thisPieChartSvg);

            // add data to pie chart

            $thisPieChartRecords.each(function(index) {

                var $thisRecord = $(this);
                var thisValue   = $(this).find('.pieChart__value').text();

                // add slices

                addData($thisPieChart, thisValue);

                // add dots to data records (legend)

                $thisRecord.prepend($colorDot.clone());

                // attach events to record

                if ($thisPieChart.data().highlight === true) {

                    $thisRecord
                        .on('mouseover', function() {

                            YOI.clearDelay('pieChartHightlightDelay');
                            highlightRecord($thisRecord);

                        })
                        .on('mouseleave', function() {

                            YOI.setDelay('pieChartHightlightDelay', 500, function() {
                                resetHighlightRecord($thisPieChart);
                            });

                        })
                        .on('click', function() {
                            blinkRecord($thisRecord);
                        });

                }

            });

            // paint the slices

            if ($thisPieChart.data().palette === 'fixed')  setFixedSliceColors($thisPieChart);
            if ($thisPieChart.data().palette === 'random') setRandomSliceColors($thisPieChart);
            if ($thisPieChart.data().palette === 'shades') setSliceShades($thisPieChart);
            if ($thisPieChart.data().palette === 'unique') setUniqueSliceColors($thisPieChart);

        });

    }

    function setUniqueSliceColors($thisPieChart) {

        /**
         *  Calculate and set unique, complementary fill colors for each slice.
         *
         *  @param {jQuery dom object} $thisPieChart - the pie chart
         */

        var $thisPaths      = $thisPieChart.find('path');
        var $thisCircles    = $thisPieChart.find('circle');
        var $thisDots       = $thisPieChart.find('.pieChart__dot');

        var totalSlices     = $thisPieChart.data().records;
        var baseColor       = JSON.parse($thisPieChart.data().baseColor);
        var startRadius     = baseColor[0];
        var startSaturation = baseColor[1] + '%';
        var startLuminance  = baseColor[2] + '%';

        for (var i = 0; i < totalSlices; i++) {

            var splitRadius = (360 / totalSlices) * i;
            var radius = splitRadius + startRadius > 360 ? splitRadius + startRadius - 360 : splitRadius + startRadius;

            // set colors

            if ($thisPaths[i] !== undefined)   $thisPaths[i].setAttribute('fill', 'hsl(' + radius + ',' + startSaturation + ',' + startLuminance + ')');
            if ($thisCircles[i] !== undefined) $thisCircles[i].setAttribute('fill', 'hsl(' + radius + ',' + startSaturation + ',' + startLuminance + ')');

            $thisDots.eq(i).css('background','hsl(' + radius + ',' + startSaturation + ',' + startLuminance + ')');

        }

    }

    function setRandomSliceColors($thisPieChart) {

        /**
         *  Calculate and set random rgb colors for each slice.
         *
         *  @param {jQuery dom object} $thisPieChart - the pie chart
         */

        var $thisPaths   = $thisPieChart.find('path');
        var $thisCircles = $thisPieChart.find('circle');
        var $thisDots    = $thisPieChart.find('.pieChart__dot');

        var totalSlices  = $thisPieChart.data().records;

        for (var i = 0; i < totalSlices; i++) {

            var randomColor = '#' + ('00000' + (Math.random() * (1<<24)|0).toString(16)).slice(-6);

            // set colors

            if ($thisPaths[i] !== undefined)   $thisPaths[i].setAttribute('fill', randomColor);
            if ($thisCircles[i] !== undefined) $thisCircles[i].setAttribute('fill', randomColor);

            $thisDots.eq(i).css('background', randomColor);

        }

    }

    function setFixedSliceColors($thisPieChart) {

        /**
         *  Pick and set colors for each slice from a fixed palette.
         *
         *  @param {jQuery dom object} $thisPieChart - the pie chart
         */

        var $thisPaths   = $thisPieChart.find('path');
        var $thisCircles = $thisPieChart.find('circle');
        var $thisDots    = $thisPieChart.find('.pieChart__dot');

        var totalSlices  = $thisPieChart.data().records;

        for (var i = 0; i < totalSlices; i++) {

            var j = i;

            // if there are more slices than colors in the palette,
            // start over and pick the first color again

            if (j > fixedPalette.length - 1) j = 1;

            // set colors

            if ($thisPaths[i] !== undefined)   $thisPaths[i].setAttribute('fill', fixedPalette[j]);
            if ($thisCircles[i] !== undefined) $thisCircles[i].setAttribute('fill', fixedPalette[j]);

            $thisDots.eq(i).css('background', fixedPalette[j]);

        }

    }

    function setSliceShades($thisPieChart) {

        /**
         *  Calculate and set shades of a given base color for each slice.
         *
         *  @param {jQuery dom object} $thisPieChart - the pie chart
         */

        var $thisPaths      = $thisPieChart.find('path');
        var $thisCircles    = $thisPieChart.find('circle');
        var $thisDots       = $thisPieChart.find('.pieChart__dot');

        var totalSlices     = $thisPieChart.data().records;
        var baseColor       = JSON.parse($thisPieChart.data().baseColor);
        var startRadius     = baseColor[0];
        var startSaturation = baseColor[1] + '%';
        var startLuminance  = baseColor[2] + '%';
        var splitLuminance  = (100 - parseInt(startLuminance)) / totalSlices;

        for (var i = 0; i < totalSlices; i++) {

            var luminance = parseInt(startLuminance) - splitLuminance * i;

            // set colors

            if ($thisPaths[i] !== undefined)   $thisPaths[i].setAttribute('fill', 'hsl(' + startRadius + ',' + startSaturation + ',' + luminance + '%)');
            if ($thisCircles[i] !== undefined) $thisCircles[i].setAttribute('fill', 'hsl(' + startRadius + ',' + startSaturation + ',' + luminance + '%)');

            $thisDots.eq(i).css('background','hsl(' + startRadius + ',' + startSaturation + ',' + luminance + '%)');

        }

    }

    function addData($thisPieChart, thisValue) {

        /**
         *  Calculate and set shades of a given base color for each slice.
         *
         *  @param {jQuery dom object} $thisPieChart - the pie chart
         *  @param {number}            $thisValue    - the numeric percentage value of the data bit
         */

        // Inspired by
        // http://jsfiddle.net/lensco/ScURE/

        var size     = parseInt($thisPieChart.data().size);
        var radius   = size / 2;
        var rotation = $thisPieChart.data().rotation;
        var index    = $thisPieChart.data().index;

        var $thisPieChartSvg = $thisPieChart.find('svg');
        var $thisPieSlice;

        // clean up thisValue

        thisValue = parseInt(thisValue);
        thisValue = Math.min(Math.max(thisValue, 0), 100);

        // Create a circle if the value is 100 or above,
        // otherwise draw the individual slice.

        if (thisValue >= 100) {

            $thisPieSlice = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            $thisPieSlice.setAttribute('r',  radius);
            $thisPieSlice.setAttribute('cx', radius);
            $thisPieSlice.setAttribute('cy', radius);

        } else {

            $thisPieSlice = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            // Calculate x,y coordinates of the point on the circle to draw the arc to.

            var x = Math.cos((2 * Math.PI) / (100 / thisValue));
            var y = Math.sin((2 * Math.PI) / (100 / thisValue));

            // Should the arc go the long way round?

            var longArc = (thisValue <= 50) ? 0 : 1;

            // "d" is a string that describes the path of the slice.
            // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d

            var d = 'M' + radius + ',' + radius + ' L' + radius + ',' + 0 + ', A' + radius + ',' + radius + ' 0 ' + longArc + ',1 ' + (radius + y * radius) + ',' + (radius - x * radius) + ' z';
            $thisPieSlice.setAttribute('d', d);

            // rotate the slice

            $thisPieSlice.setAttribute('transform', 'rotate(' + 360 / (100 / rotation) + ' ' + radius + ' ' + radius + ')');

            // save rotation and increase index

            $thisPieChart.data().rotation +=  thisValue;
            $thisPieChart.data().index +=  1;

        }

        // append the slice

        $thisPieChartSvg.append($thisPieSlice);

    }

    function highlightRecord($thisRecord) {

        /**
         *  Highlight a single record (think "slice") of a pie chart.
         *
         *  @param {jQuery dom object} $thisRecord - the pie chart record
         */

        var thisIndex = $thisRecord.index();
        var $slices   = $thisRecord.closest('.pieChart').find('svg path');

        // highlight the record

        $thisRecord.siblings().fadeTo(0, 0.4);
        $thisRecord.fadeTo(0, 1);

        // highlight the slices

        $slices.fadeTo(0, 0.15);
        $slices.eq(thisIndex).fadeTo(0, 1);

    }

    function blinkRecord($thisRecord) {

        /**
         *  Blink a single record (think "slice") of a pie chart.
         *
         *  @param {jQuery dom object} $thisRecord - the pie chart record
         */

        var thisIndex = $thisRecord.index();
        var $slices   = $thisRecord.closest('.pieChart').find('svg path');

        // let the slice blink

        YOI.blink($slices.eq(thisIndex));

    }

    function resetHighlightRecord($thisPieChart) {

        /**
         *  Remove the highlighting from all records (think "slices") of a pie chart.
         *
         *  @param {jQuery dom object} $thisPieChart - the pie chart
         */

        var $slices      = $thisPieChart.find('svg path');
        var $thisRecords = $thisPieChart.find('.pieChart__record');

        $slices.fadeTo(300, 1);
        $thisRecords.fadeTo(300, 1);

    }

    // initialize
    // ==========

    initializePieChart();

    // public functions
    // ================

    return {
        init                 : initializePieChart,
        highlightRecord      : highlightRecord,
        blinkRecord          : blinkRecord,
        resetHighlightRecord : resetHighlightRecord
    }

})();

/** popOver.js */

var PopOver = (function() {

    // private functions
    // =================

    function initializePopOverTrigger($popOverTrigger, options) {

        /**
         *  Initialize all *[data-popover] found in the document (= function call without parameters)
         *  or target one or more specific *[data-popover] (= function call with $popover).
         *  $popover must be a jQuery object or jQuery object collection.
         *
         *  @param  {jQuery dom object} $popOverTrigger - the pop over trigger(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div data-popover="pos:bt;eventShow:mouseover;">
         *
         *  Available options:
         *
         *  @option {string} target         - The target pop-over id selector.
         *  @option {string} pos            - ['tl','tr','br','bl'] Pop-over position relative to trigger. The default is 'tr'.
         *  @option {string} ref            - ['tl','tr','br','bl'] Pop-over reference point. The default is 'tl'.
         *  @option {string} toggleClass    - Css class name added to trigger if pop-over is currently shown.
         *  @option {string} eventShow      - ['click','dblclick','contextmenu','mouseover', 'mouseout', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'] Defines the event to show the pop-over. The default is mouseenter.
         *  @option {string} eventHide      - ['click','dblclick','contextmenu','mouseover', 'mouseout', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'] Defines the event to hide the pop-over. The default is mouseleave.
         *  @option {bool}   preventDefault - If true, the trigger’s default event (eg. click) gets prevented. The default is true.
         */

        if (!($popOverTrigger instanceof jQuery)) {
            $popOverTrigger = $('[data-popover]');
        }

        $popOverTrigger.each(function() {

            // reference the popover trigger

            var $thisPopOverTrigger = $(this);

            // read the options

            var options = options === undefined ? YOI.toObject($thisPopOverTrigger.data('popover')) : options;

            // cancel if target-selector does not return any element ...

            if (options.target === undefined || $(options.target).length < 1) return false;

            // ... or proceed, move the popover out of it's original position in the DOM and
            // inject it back at the end of <body> to enable correct absolute positioning
            
            var $thisPopOver = $(options.target).detach();
            $('body').append($thisPopOver);

            // valid events

            var validEvents = [
                'click',
                'dblclick',
                'contextmenu',
                'mouseover',
                'mouseout',
                'mousedown',
                'mouseup',
                'mouseenter',
                'mouseleave'
            ];

            // prevent default event option,
            // default is TRUE

            var preventDefault = options.preventDefault !== undefined ? options.preventDefault : true;

            // get the events to show and hide the popover
            // defaults are 'mouseover' for show and 'mouseout' for hide

            var eventShow = $.inArray(options.eventShow, validEvents) > -1 ? options.eventShow : 'mouseenter';
            var eventHide = $.inArray(options.eventHide, validEvents) > -1 ? options.eventShow : 'mouseleave';

            // attach events to pop-over trigger

            $thisPopOverTrigger
                .on(eventShow, function(e) {

                    if (preventDefault !== 'false') e.preventDefault();

                    hideAllPopOvers();
                    removeToggleClassFromPopOverTrigger();
                    showPopOver($thisPopOverTrigger, $thisPopOver);

                })
                .on(eventHide, function(e) {

                    if (preventDefault !== 'false') e.preventDefault();

                    YOI.clearInterval('popOverShowTimeout');
                    hidePopOver($thisPopOverTrigger, $thisPopOver);

                });

            // attach events to pop-over

            $thisPopOver
                .on('mouseenter', function() {
                    YOI.clearInterval('popOverHideTimeout');
                })
                .on('mouseleave', function() {
                    hidePopOver($thisPopOverTrigger, $thisPopOver);
                });

        });

        $('.popOver').each(function() {

            $thisPopOver = $(this);

            // first measure, then hide pop-over

            $thisPopOver
                .data({
                    width:  $thisPopOver.outerWidth(),
                    height: $thisPopOver.outerHeight()
                })
                .hide();

        });

    }

    function showPopOver($thisPopOverTrigger, $thisPopOver) {

        /**
         *  Shows a pop-over after a certain delay.
         *
         *  @param {jQuery dom object} $thisPopOverTrigger - the element to trigger the pop-over
         *  @param {jQuery dom object} $thisPopOver        - the pop-over
         */

        YOI.setDelay('popOverShowTimeout', 100, function() {

            // if this option is set, add the provided css class name
            // to the trigger element

            var options = YOI.toObject($thisPopOverTrigger.data('popover'));

            if (options.toggleClass !== undefined) {
                $thisPopOverTrigger.addClass(options.toggleClass);
            }

            // set the pop-over postion, then show it

            setPopOverPosition($thisPopOverTrigger, $thisPopOver);
            $thisPopOver.fadeIn(100);

        });

    }

    function hidePopOver($thisPopOverTrigger, $thisPopOver) {

        /**
         *  Hides a pop-over after a certain delay.
         *
         *  @param {jQuery dom object} $thisPopOverTrigger - the element to trigger the pop-over
         *  @param {jQuery dom object} $thisPopOver        - the pop-over
         */

        YOI.setDelay('popOverHideTimeout', 500, function() {
            $thisPopOver.hide();
            removeToggleClassFromPopOverTrigger();
        });

    }

    function hideAllPopOvers() {

        /**
         *  Clears the pop-over hide-interval and
         *  hides all pop-overs instantly.
         */

        // if this option is set, add the provided css class name
        // to the trigger element

        $('[data-popover]').each(function() {

            var $thisPopOverTrigger = $(this);
            var options             = $thisPopOverTrigger.data('popover');

            if (options.toggleClass !== undefined) {
                var cssClassName = options.toggleClass;
                $thisPopOverTrigger.removeClass(cssClassName);
            }

        });

        // clear the hide interval,
        // then hide all pop-overs

        YOI.clearInterval('popOverHideTimeout');
        $('.popOver').hide();

    }

    function setPopOverPosition($thisPopOverTrigger, $thisPopOver) {

        /**
         *  Position the pop-over
         *
         *  @param {jQuery dom object} $thisPopOverTrigger - the element to trigger the pop-over
         *  @param {jQuery dom object} $thisPopOver        - the pop-over
         */

        // read options

        var options = YOI.toObject($thisPopOverTrigger.data('popover'));

        // position settings

        var pos = options.pos !== undefined ? options.pos : 'tr';
        var ref = options.ref !== undefined ? options.ref : 'tl';

        // set pop-over position

        switch (pos) {
        case 'tl':
            $thisPopOver.css({
                'left': $thisPopOverTrigger.offset().left + 'px',
                'top' : $thisPopOverTrigger.offset().top  + 'px'
            });
            break;
        case 'tr':
            $thisPopOver.css({
                'left': $thisPopOverTrigger.offset().left + $thisPopOverTrigger.outerWidth() + 'px',
                'top' : $thisPopOverTrigger.offset().top  + 'px'
            });
            break;
        case 'br':
            $thisPopOver.css({
                'left': $thisPopOverTrigger.offset().left + $thisPopOverTrigger.outerWidth()  + 'px',
                'top' : $thisPopOverTrigger.offset().top  + $thisPopOverTrigger.outerHeight() + 'px'
            });
            break;
        case 'bl':
            $thisPopOver.css({
                'left': $thisPopOverTrigger.offset().left + 'px',
                'top' : $thisPopOverTrigger.offset().top  + $thisPopOverTrigger.outerHeight() + 'px'
            });
            break;
        }

        // set pop-over reference point

        switch (ref) {
        case 'tl':
            $thisPopOver.css({
                'marginLeft': 0,
                'marginTop': 0
            });
            break;
        case 'tr':
            $thisPopOver.css({
                'marginLeft': $thisPopOver.data().width * -1 + 'px',
                'marginTop' : 0
            });
            break;
        case 'br':
            $thisPopOver.css({
                'marginLeft': $thisPopOver.data().width  * -1 + 'px',
                'marginTop' : $thisPopOver.data().height * -1 + 'px'
            });
            break;
        case 'bl':
            $thisPopOver.css({
                'marginLeft': 0,
                'marginTop' : $thisPopOver.data().height * -1 + 'px'
            });
            break;
        }

    }
    
    function removeToggleClassFromPopOverTrigger($popOverTrigger) {
        
        /**
         *  Popover triggers provide an option to add any css-class to the trigger when the
         *  popover itself is visible. This function removes the very class name from all popover triggers
         *  (= function call without parameters) or a specific one (= function call with $popover).
         *
         *  @param  {jQuery dom object} $popOverTrigger - the pop over trigger
         */
        
        if (!($popOverTrigger instanceof jQuery)) {
            $popOverTrigger = $('[data-popover]');
        }
        
        $popOverTrigger.each(function() {
            
            // reference the popover trigger

            var $thisPopOverTrigger = $(this);

            // read the options

            var options = YOI.toObject($thisPopOverTrigger.data('popover'));
            
            // if this option is set, remove the provided css class name
            // from the trigger element

            var options = YOI.toObject($thisPopOverTrigger.data('popover'));

            if (options.toggleClass !== undefined) {
                $thisPopOverTrigger.removeClass(options.toggleClass);
            }
            
        });
        
    }

    // initialize
    // ==========

    initializePopOverTrigger();

    // public functions
    // ================

    return {
        init    : initializePopOverTrigger,
        hideAll : hideAllPopOvers
    }

})();

/** radioBtn.js */

var RadioBtn = (function() {

    // private vars
    // ============

    var $icon = $('<i aria-hidden="true" class="icon--011-s"></i>');

    // private functions
    // =================

    function initializeRadioBtn($radioBtn) {

        /**
         *  Initialize all *[data-radioBtn] found in the document (= function call without parameters)
         *  or target one or more specific *[data-radioBtn] (= function call with $radioBtn).
         *  $radioBtn must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $radioBtn - the radio button(s)
         */

        if (!($radioBtn instanceof jQuery)) {
            $radioBtn = $('[data-radiobtn]');
        }

        $radioBtn.each(function() {

            var $thisRadioBtn = $(this);

            $thisRadioBtn.find('input[type="radio"]').hide();
            $thisRadioBtn.prepend($icon.clone());

            // prevent default event of <label>

            $thisRadioBtn.find('label').on('click', function(e) {
                e.preventDefault();
            });

            // bind event to button

            $thisRadioBtn.on('click', function(e) {
                e.preventDefault();
                activateRadioBtn($thisRadioBtn);
            });

        });

    }

    function activateRadioBtn($thisRadioBtn) {

        /**
         *  Switch a radio button to "active".
         *
         *  @param  {jQuery object} $thisRadioBtn - the button
         */

        var $icon       = $thisRadioBtn.find('[class^="icon"]');
        var $radioInput = $thisRadioBtn.find('input[type="radio"]');
        var groupName   = $radioInput.attr('name');

        // reset all other buttons first

        $('input[name="' + groupName + '"]').closest('.radioBtn').removeClass('is--active');
        $('input[name="' + groupName + '"]').removeAttr('checked');

        // activate this button

        $radioInput.prop('checked', true);
        $radioInput.attr('checked', 'checked');
        $thisRadioBtn.addClass('is--active');

        // blink the icon

        YOI.blink($icon);

    }

    // initialize
    // ==========

    initializeRadioBtn();

    // public functions
    // ================

    return {
        init : initializeRadioBtn
    }

})();

/** rangeInput.js */

var RangeInput = (function() {

    // private vars
    // ============

    var knobOffset = 10;

    var rangeInputKnob = $('\
        <div class="rangeInput__knob"></div>\
    ');

    var rangeInputLabel = $('\
        <span class="rangeInput__label">0</span>\
    ');

    var rangeInputTrack = $('\
        <div class="rangeInput__track">\
            <div class="rangeInput__range"></div>\
        </div>\
    ');

    // private functions
    // =================

    function initializeRangeInput($rangeInput, options) {

        /**
         *  Initialize all *[data-rangeinput] found in the document (= function call without parameters)
         *  or target one or more specific *[data-rangeinput] (= function call with $rangeinput).
         *  $rangeinput must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $rangeinput - the range input(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div data-rangeinput="absMin:10;absMax:200;unit:$;">
         *
         *  Available options:
         *
         *  @option {number} absMin - absolut min value
         *  @option {number} absMax - absolut max value
         *  @option {number} min    - initial min value
         *  @option {number} max    - initial max value
         *  @option {string} unit   - a symbol for the unit ("$", "mm", etc.) as postfix for .rangeInput__label)
         */

        if (!($rangeInput instanceof jQuery)) {
            $rangeInput = $('[data-rangeinput]');
        }

        $rangeInput.each(function() {

            // gather dom elements

            var $documentBody = $('body');
            var $thisRangeInput = $(this);

            // options

            var options = options === undefined ? YOI.toObject($thisRangeInput.data('rangeinput')) : options;

            // attach events to range knobs

            rangeInputKnob
                .on('mousedown', function(e) {

                    var $thisKnob = $(this);

                    storeCursorPos($thisRangeInput, $thisKnob, e.pageX);

                    $(document)
                        .on('mousemove', function(e) {
                            $documentBody.addClass('noSelect');
                            $thisKnob.addClass('rangeInput__knob--active');
                            $thisRangeInput.addClass('rangeInput--active');
                            moveKnob($thisRangeInput, $thisKnob, e);
                        })
                        .on('mouseup', function(e) {
                            triggerFiltersUpdate($thisRangeInput);
                            $documentBody.removeClass('noSelect');
                            $thisKnob.removeClass('rangeInput__knob--active');
                            $thisRangeInput.removeClass('rangeInput--active');
                            $(document).off('mousemove mouseup');
                        });

                })
                .on('mouseover', function() {
                    $(this).siblings('.rangeInput__knob').removeClass('rangeInput__knob--topMost');
                    $(this).addClass('rangeInput__knob--topMost');
                });

            // clone & append objects

            var $thisMinKnob = rangeInputKnob.clone('true').addClass('rangeInput__knob--min').append(rangeInputLabel.clone());
            var $thisMaxKnob = rangeInputKnob.clone('true').addClass('rangeInput__knob--max').append(rangeInputLabel.clone());
            var $singleLabel = rangeInputLabel.clone().addClass('rangeInput__label--single');
            var $thisTrack   = rangeInputTrack.clone();

            $thisRangeInput.append($thisMinKnob, $thisMaxKnob, $singleLabel, $thisTrack);

            // assign data to range input,
            // provide default values for some properties

            $thisRangeInput.data({
                absMin     : (options.absMin !== undefined ? options.absMin : 0),
                absMax     : (options.absMax !== undefined ? options.absMax : 100),
                min        : (options.min !== undefined ? options.min : 0),
                max        : (options.max !== undefined ? options.max : 100),
                minValue   : null,
                maxValue   : null,
                unit       : (options.unit !== undefined ? options.unit : ''),
                offsetX    : Math.floor($thisTrack.offset().left),
                minPosX    : null,
                maxPosX    : null,
                cursorPosX : 0,
                width      : $thisTrack.width()
            });

            // move knobs to initial position

            $thisRangeInput.find('.rangeInput__knob').each(function() {
                var $thisKnob = $(this);
                moveKnob($thisRangeInput, $thisKnob);
            });

            // register reset event

            $thisRangeInput.on('rangeInput:reset', function() {
                RangeInput.reset($thisRangeInput);
            });

        });

    }

    function setRangeInput($rangeInput, absMin, absMax, min, max) {

        /**
         *  Set the range input to the provided values.
         *
         *  @param {jQuery dom object} $rangeInput - the range input
         *  @param {number}            absMin      - absolute min value
         *  @param {number}            absMax      - absolute max value
         *  @param {number}            min         - min value
         *  @param {number}            max         - max value
         */

        var $thisRangeInput = $rangeInput;
        var $thisMinKnob    = $thisRangeInput.find('.rangeInput__knob--min');
        var $thisMaxKnob    = $thisRangeInput.find('.rangeInput__knob--max');

        $thisRangeInput.data({
            absMin : absMin,
            absMax : absMax,
            min    : min,
            max    : max
        });

        moveKnob($thisRangeInput, $thisMinKnob);
        moveKnob($thisRangeInput, $thisMaxKnob);

    }

    function resetRangeInput($rangeInput) {

        /**
         *  Reset a range input. The knobs will move back into absolute min
         *  and absolute max positions.
         *
         *  @param {jQuery dom object} $rangeInput - the range input
         */

        var $thisRangeInput = $rangeInput;
        var $thisMinKnob    = $thisRangeInput.find('.rangeInput__knob--min');
        var $thisMaxKnob    = $thisRangeInput.find('.rangeInput__knob--max');

        var thisAbsMin = $thisRangeInput.data().absMin;
        var thisAbsMax = $thisRangeInput.data().absMax;

        $thisRangeInput.data({
            min : thisAbsMin,
            max : thisAbsMax
        });

        moveKnob($thisRangeInput, $thisMinKnob);
        moveKnob($thisRangeInput, $thisMaxKnob);

    }

    function adjustLabels($rangeInput) {

        /**
         *  Position & center labels above knobs. If the knobs
         *  get too close, the individual labels get merged into
         *  a single label.
         *
         *  @param {jQuery dom object} $rangeInput - the range input
         */

        var $thisRangeInput  = $rangeInput;
        var data             = $thisRangeInput.data();
        var $thisMinLabel    = $thisRangeInput.find('.rangeInput__knob--min .rangeInput__label');
        var $thisMaxLabel    = $thisRangeInput.find('.rangeInput__knob--max .rangeInput__label');
        var $thisSingleLabel = $thisRangeInput.find('.rangeInput__label--single');

        // center labels

        $thisMinLabel.css('left', (($thisMinLabel.outerWidth() / -2) + knobOffset));
        $thisMaxLabel.css('left', (($thisMaxLabel.outerWidth() / -2) + knobOffset));
        $thisSingleLabel.css('left', (data.minPosX + (data.maxPosX - data.minPosX) / 2) - ($thisSingleLabel.outerWidth() / 2));

        // if labels "collide", switch to a single label
        // or cancel if minPosX or maxPosX is not yet defined

        if (data.minPosX === null || data.maxPosX === null) return;

        var minKnobRightEdge = data.minPosX + $thisMinLabel.outerWidth() / 2;
        var maxKnobLeftEdge  = data.maxPosX - $thisMaxLabel.outerWidth() / 2;

        if (minKnobRightEdge >= maxKnobLeftEdge) {
            $thisRangeInput.addClass('rangeInput--mergedLabels');
        } else {
            $thisRangeInput.removeClass('rangeInput--mergedLabels');
        }

    };

    function storeCursorPos($rangeInput, $knob, ePosX) {

        /**
         *  Stores the cursor postion on mousedown on any knob.
         *  This information is used to correct offset between cursor
         *  position and knob center while dragging – to avoid the
         *  knobs to "jump into position".
         *
         *  @param {jQuery dom object} $rangeInput - the range input
         *  @param {jQuery dom object} $knob       - the range input knob
         *  @param {number}            ePosX       - the cursor x position
         */

        if ($knob.hasClass('rangeInput__knob--min')) {
            $rangeInput.data().cursorOffset = Math.floor(ePosX - $rangeInput.data().offsetX) - $rangeInput.data().minPosX;
        }

        if ($knob.hasClass('rangeInput__knob--max')) {
            $rangeInput.data().cursorOffset = Math.floor(ePosX - $rangeInput.data().offsetX) - $rangeInput.data().maxPosX;
        }

    };

    function moveKnob($rangeInput, $knob, e) {

        /**
         *  Moves a knob. Either while dragging or when directly
         *  set with specific values.
         *
         *  @param  {jQuery dom object} $rangeInput - the range input
         *  @param  {jQuery dom object} $knob       - the range input knob
         *  @param  {event}             ePosX       - the caller event
         *  @return {bool false}                    - returns false if data is invalid
         */

        // abort if data is clearly invalid

        if ($rangeInput.data().absMin >= $rangeInput.data().absMax) return false;

        // gather dom elements, set some vars

        var $thisRangeInput = $rangeInput;
        var $thisKnob       = $knob;
        var $thisMinInput   = $thisRangeInput.find('input[name="min"]');
        var $thisMaxInput   = $thisRangeInput.find('input[name="max"]');

        var data            = $thisRangeInput.data();
        var isMinKnob       = $thisKnob.hasClass('rangeInput__knob--min');
        var isMaxKnob       = $thisKnob.hasClass('rangeInput__knob--max');
        var posX            = 0;
        var thisKnobValue   = null;

        // set the knob position & value

        if (e !== undefined) {

            // deal with cursor offset first

            if (data.cursorOffset > 0) e.pageX = e.pageX - data.cursorOffset;
            if (data.cursorOffset < 0) e.pageX = e.pageX + (data.cursorOffset * -1);

            // set position & value if knob is beeing dragged

            posX          = Math.floor(Math.min(Math.max(0, (e.pageX - data.offsetX)), data.width));
            var factor    = Math.floor((posX / data.width) * 100);
            thisKnobValue = Math.floor(((data.absMax - data.absMin) / 100) * factor + (data.absMin * 1));

        } else {

            // set position & value if knob is set directly

            var inputValue;

            if (isMinKnob) inputValue = data.min;
            if (isMaxKnob) inputValue = data.max;

            var range   = data.absMax - data.absMin;
            var factor  = data.width / range;
            var posX    = Math.ceil(factor * (inputValue - data.absMin));

            thisKnobValue = inputValue;

        }

        // update min knob

        if (isMinKnob) {

            if (e !== undefined) data.min = thisKnobValue;

            if (data.min < data.max) {
                $thisRangeInput.find('.rangeInput__range').css('left', posX);
                $thisKnob.find('.rangeInput__label').text(thisKnobValue + ' ' + data.unit);
                $thisMinInput.val(thisKnobValue);
                data.minPosX = posX;
                data.minValue = thisKnobValue;
            }

        }

        // update max knob

        if (isMaxKnob) {

            if (e !== undefined) data.max = thisKnobValue;

            if (data.min < data.max) {
                $thisRangeInput.find('.rangeInput__range').css('right', data.width - posX);
                $thisKnob.find('.rangeInput__label').text(thisKnobValue + ' ' + data.unit);
                $thisMaxInput.val(thisKnobValue);
                data.maxPosX = posX;
                data.maxValue = thisKnobValue;
            }

        }

        // update single label

        var thisSingleLabelTxt = data.minValue + data.unit + ' – ' + data.maxValue + data.unit;
        $thisRangeInput.find('.rangeInput__label--single').text(thisSingleLabelTxt);

        // finally, move the knob and adjust the labels

        if (data.min < data.max) {
            $thisKnob.css('left', posX - knobOffset);
            adjustLabels($thisRangeInput);
        }

    };

    function triggerFiltersUpdate($rangeInput) {

        /**
         *  After knobs were dragged or set, apply the new values
         *  to search results / filtered data. Abort if no Filters
         *  are found.
         *
         *  @param  {jQuery dom object} $rangeInput - the range input
         *  @return {bool false}                    - returns false if the filters module isn't available
         */

        if (YOI.foundModule('Filters')) {

            $thisRangeInput = $rangeInput;
            $thisFilters = $thisRangeInput.closest('.filters');
            Filters.apply($thisFilters, false);

        } else {
            return false;
        }

    };

    // initialize
    // ==========

    initializeRangeInput();

    // public functions

    return {
        init  : initializeRangeInput,
        set   : setRangeInput,
        reset : resetRangeInput
    };

})();

var RatingInput = (function() {

    // private vars
    // ============
    
    var $ratingSelect = $('\
        <span class="ratingInput__select">\
            <i aria-hidden="true" class="icon--039-s"></i>\
            <i aria-hidden="true" class="icon--039-s"></i>\
            <i aria-hidden="true" class="icon--039-s"></i>\
            <i aria-hidden="true" class="icon--039-s"></i>\
            <i aria-hidden="true" class="icon--039-s"></i>\
        </span>\
    ');
    
    // private functions
    // =================
    
    function initializeRatingInput($ratingInput, options) {
        
        /**
         *  Initialize all *[data-ratinginput] found in the document (= function call without parameters)
         *  or target one or more specific *[data-ratinginput] (= function call with $ratingInput).
         *  $ratingInput must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div class="ratingInput" data-ratinginput="uid:1234;">
         *
         *  Available options:
         *
         *  @option {number}  uid    - the unique identifier for each element - useful to identify
         *                             submitted data on the backend
         *  @option {boolean} locked - set "true" to "lock" the element and prevent editing
         *  @option {number}  score  - a number between 0 (not rated) and 5 (highest rating score)
         */
        
        if (!($ratingInput instanceof jQuery)) {
            $ratingInput = $('[data-ratinginput]');
        }

        $ratingInput.each(function() {
            
            var $thisRatingInput  = $(this);
            var $thisRatingSelect = $ratingSelect.clone();
            var $thisRatingStars  = $thisRatingSelect.find('[class*="icon--"]');
            
            // append data
            
            appendData($thisRatingInput);
            
            // set the initial rating score
            
            setRating($thisRatingInput, $ratingInput.data().score);
            
            // add events to the rating stars
            
            $thisRatingStars
                .on('mouseover', function() {
                    setRating($thisRatingInput, $(this).index() + 1);
                })
                .on('click', function() {
                    submitRating($thisRatingInput);
                    lock($thisRatingInput);
                });
        
            // add a cloned rating select interface to
            // each ratingInput
        
            $thisRatingInput.append($thisRatingSelect);
            
        });
        
    }
    
    function appendData($ratingInput) {
        
        /**
         *  Read the options from the markup (custom data-attribute) and
         *  write them to the internal jQuery.data() object.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         */
        
        var options = YOI.toObject($ratingInput.data('ratinginput'));
        
        $ratingInput.data({
            'uid'    : options.uid === undefined ? null : options.uid,
            'locked' : options.locked === undefined ? false : options.locked,
            'score'  : options.score === undefined ? 0 : options.score
        });
        
    }
    
    function lock($ratingInput) {
        
        /**
         *  Lock the input to prevent further editing.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         */
        
        $ratingInput.addClass('ratingInput--locked');
        $ratingInput.data().locked = true;
    
    }
    
    function unlock($ratingInput) {
        
        /**
         *  Unlock the input to make it editable.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         */
        
        $ratingInput.removeClass('ratingInput--locked');
        $ratingInput.data().locked = false;
        
    }
    
    function setRating($ratingInput, score) {
        
        /**
         *  Set the current rating by writing it to the internal
         *  jQuery.data() object. Also update CSS classnames to
         *  visualize the rating.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         *  @param {number}            score        - the rating score from 0 to 6
         */
        
        var locked = $ratingInput.data().locked;
        
        if (!locked) {
            
            // update the score
            
            $ratingInput.data().score = score;
            
            // change css classes
            
            $ratingInput.removeClass('ratingInput--rated-1 ratingInput--rated-2 ratingInput--rated-3 ratingInput--rated-4 ratingInput--rated-5');
            $ratingInput.addClass('ratingInput--rated-' + score);
            
        }

    }
    
    function submitRating($ratingInput) {
        
        /**
         *  This function is for demontration purpose only. A proper
         *  submit method to the backend is still missing.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         */
        
        var uid   = $ratingInput.data().uid;
        var score = $ratingInput.data().score;
        
        // console.log('id: ' + uid + ' | score: ' + score);
        
    }
    
    // initialize
    // ==========
    
    initializeRatingInput();
    
    // public functions
    // ================
    
    return {
        init   : initializeRatingInput,
        lock   : lock,
        unlock : unlock,
        set    : setRating,
        submit : submitRating
    }

})();
/** remove.js */

var Remove = (function() {
    
    // private functions
    // =================
    
    function initializeRemoveTriggers($removeTrigger, options) {
        
        /**
         *  Initialize all *[data-remove] found in the document (= function call without parameters)
         *  or target one or more specific *[data-remove] (= function call with $removeTrigger).
         *  $removeTrigger must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $removeTrigger - the remove trigger(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <button data-remove="target:#myTargetElement">
         *
         *  Available options:
         *
         *  @option {string} target - optional CSS-selector for the DOM element to remove
         *                            by default, the target is the trigger's first parent element
         */

        if (!($removeTrigger instanceof jQuery)) {
            $removeTrigger = $('[data-remove]');
        }
        
        $removeTrigger.each(function() {

            var $thisremoveTrigger = $(this);
            var options            = options === undefined ? YOI.toObject($thisremoveTrigger.data('remove')) : options;
            var $thisTarget        = options.target !== undefined && $(options.target).length ? $(options.target) : $thisremoveTrigger.parent();

            $thisremoveTrigger.on('click', function(e) {
                e.preventDefault();
                $thisTarget.fadeOut(function(){
                    $thisTarget.remove();
                });
            });
            
        });
        
    }
    
    // initialize
    // ==========
    
    initializeRemoveTriggers();
    
    // public functions
    // ================
    
    return {
        init : initializeRemoveTriggers
    }

})();
/** reveal.js */

var Reveal = (function() {
    
    // private functions
    // =================
    
    function initializeReveal($revealTrigger, options) {
        
        /**
         *  Initialize all *[data-reveal] found in the document (= function call without parameters)
         *  or target one or more specific *[data-reveal] (= function call with $revealTrigger).
         *  $revealTrigger must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $revealTrigger - the reveal trigger(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <button data-reveal="target:#myTargetElement">
         *
         *  Available options:
         *
         *  @option {string} target     - A string which is used as CSS-selector for the target element
         *                                (eg. '#myTarget' or '.myTarget', etc.)
         *
         *  @option {string} event      - A string which defines the event which gets bound to the
         *                                trigger element. All standard event handlers from jQuery
         *                                can be used.
         *
         *  @option {string} transition - Chose from two jQuery animations: 'fadeIn' and 'slideDown'.
         *
         *  @option {bool} hideTarget   - Hide the target on page init? Default is true.
         */
        
        if (!($revealTrigger instanceof jQuery)) {
            $revealTrigger = $('[data-reveal]');
        }
        
        $revealTrigger.each(function(index){

            // set up vars

            var $thisRevealTrigger = $(this);
            var options            = options === undefined ? YOI.toObject($thisRevealTrigger.data('reveal')) : options;
            var target             = options.target !== undefined ? options.target : false;
            var event              = options.event !== undefined ? options.event : 'click';
            var transition         = options.transition !== undefined ? options.transition : false;
            var hideTarget         = options.hideTarget !== undefined ? options.hideTarget : true;

            // cancel if no target was defined

            if (!target) return false;

            // hide target elements first, may be overridden
            // by options

            if (hideTarget) $(target).hide();

            // apply event on trigger and hide target

            $thisRevealTrigger.on(event, function(e) {
                if (transition === 'fadeOut') {
                    $(target).fadeOut();
                } else if (transition === 'slideUp') {
                    $(target).slideUp();
                } else {
                    $(target).hide();
                }
            });

        });
        
    }
    
    // initialize
    // ==========
    
    initializeReveal();
    
    // public functions
    // ================
    
    return {
        init: initializeReveal
    }

})();
/** scrollTo.js */

var ScrollTo = (function() {

    // private vars
    // ============

    switch ($('body').data('environment')) {
    case 'desktop':
        var offset = 220;
        break;
    case 'mobile':
        var offset = 80;
        break;
    default:
        var offset = 20;
    }

    // private functions
    // =================

    function initializeScrollTo($scrollToTrigger) {

        /**
         *  Initialize all a[data-scrollto] found in the document (= function call without parameters)
         *  or target one or more specific a[data-scrollto] (= function call with $scrollToTrigger).
         *  $scrollToTrigger must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $scrollToTrigger - the scrollTo trigger(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <button data-scrollto="hightlight:true;">
         *
         *  Available options:
         *
         *  @option {string} highlight - Define an optional effect to highlight the target element once
         *                               the scrolling has stopped. Chose from "blink" and "pulse".
         */

        if (!($scrollToTrigger instanceof jQuery)) {
            $scrollToTrigger = $('[data-scrollto]');
        }

        $scrollToTrigger.each(function() {
            
            var $thisTrigger = $(this);
            var targetId     = $thisTrigger[0].hash;
            
            $thisTrigger.on('click', function(e) {
                
                // scroll to anchor if target element is found

                if ($(targetId).length) {
                    e.preventDefault();
                    scrollToTarget(targetId, $thisTrigger);
                }
                
            });

        });

    }

    function scrollToTarget(targetId, $thisTrigger, options) {

        /**
         *  Scroll the page to a given target element.
         *
         *  @param {string} targetId     - the target element css id (e.g. "#myTarget")
         *  @param {string} $thisTrigger - the scrollTo trigger element
         */
        
        var $target              = $(targetId);
        var $scrollContext;
        var $scrollContainer     = $target.closest('.scrl-y');
        var targetFound          = $target.length > 0 ? true : false;
        var scrollContainerFound = $scrollContainer.length > 0 ? true : false;
        var scrollPosY;
        var options              = options === undefined ? YOI.toObject($thisTrigger.data('scrollto')) : options;

        // cancel if no target was found
        
        if (!targetFound) return false;

        // if target is a tab, switch to the tab

        if ($(targetId).hasClass('tabs__page') && YOI.foundModule('Tabs')) {
            Tabs.switchTo(targetId);
        }

        // if the target is wrapped inside a container with
        // scroll-overflow, scroll this container. otherwise,
        // scroll the whole page.

        if (scrollContainerFound) {
            scrollPosY     = '+=' + $target.position().top;
            $scrollContext = $target.closest('.scrl-y');
        } else {
            scrollPosY     = $target.offset().top - offset;
            $scrollContext = $('body');
        }

        // start the scroll animation and apply optional highlight effect

        $.when(
            $scrollContext.stop().animate({
                scrollTop: scrollPosY
            }, 500)
        ).done(function(){
            if (options.highlight === "blink") YOI.blink($target);
            if (options.highlight === "pulse") YOI.pulse($target);
        });

    }

    // initialize
    // ==========

    initializeScrollTo();

    // public functions
    // ================

    return {
        init   : initializeScrollTo,
        target : scrollToTarget
    }

})();

/** slider.js */

var Slider = (function() {

    // private vars
    // ============

    var slideAutoplayIntervals = {};
    var btnLabelNext = YOI.locale === 'de' ? 'weiter' : 'next';
    var btnLabelPrev = YOI.locale === 'de' ? 'zurück' : 'previous';

    var slideControls = {

        // .pageBtns

        'pageBtns': $('\
            <div class="pageBtns">\
                <button class="pageBtns__btnPrev">\
                    <span class="hidden">' + btnLabelPrev + '</span>\
                </button>\
                <span class="pageBtns__indicator">\
                    <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">1</span>\
                </span>\
                <button class="pageBtns__btnNext">\
                    <span class="hidden">' + btnLabelNext + '</span>\
                </button>\
            </div>\
        '),

        // .flipBtns

        'flipBtns': $('\
            <div class="flipBtns">\
                <a class="flipBtns__btnPrev">\
                    <span class="hidden">' + btnLabelPrev + '</span>\
                </a>\
                <a class="flipBtns__btnNext">\
                    <span class="hidden">' + btnLabelNext + '</span>\
                </a>\
            </div>\
        '),

        'flipBtns--inset': $('\
            <div class="flipBtns flipBtns--inset">\
                <a class="flipBtns__btnPrev">\
                    <span class="hidden">' + btnLabelPrev + '</span>\
                </a>\
                <a class="flipBtns__btnNext">\
                    <span class="hidden">' + btnLabelNext + '</span>\
                </a>\
            </div>\
        '),

        // .pageDots

        'pageDots': $('\
            <div class="pageDots">\
                <a class="pageDots__btnPrev">\
                    <span class="hidden">' + btnLabelPrev + '</span>\
                </a>\
                <a class="pageDots__btnNext">\
                    <span class="hidden">' + btnLabelNext + '</span>\
                </a>\
            </div>\
        '),

        'pageDots--dark': $('\
            <div class="pageDots pageDots--dark">\
                <a class="pageDots__btnPrev">\
                    <span class="hidden">' + btnLabelPrev + '</span>\
                </a>\
                <a class="pageDots__btnNext">\
                    <span class="hidden">' + btnLabelNext + '</span>\
                </a>\
            </div>\
        '),

        'pageDots--subtle': $('\
            <div class="pageDots pageDots--subtle">\
                <a class="pageDots__btnPrev">\
                    <span class="hidden">' + btnLabelPrev + '</span>\
                </a>\
                <a class="pageDots__btnNext">\
                    <span class="hidden">' + btnLabelNext + '</span>\
                </a>\
            </div>\
        ')

    };

    // private functions
    // =================

    function initializeSlider($slider, options) {

        /**
         *  Initialize all *[data-slider] found in the document (= function call without parameters)
         *  or target one or more specific *[data-slider] (= function call with $slider).
         *  $slider must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $slider - the slider(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div data-slider="autoplay:true;controls:pageBtns;">
         *
         *  Available options:
         *
         *  @option {number} autoplay   - interval in miliseconds to change the slides automatically
         *  @option {bool}   clickable  - click on a slide to switch to the next side
         *  @option {string} controls   - keyword for the controls to add ["pageBtns" || "pageFlip" || "pageFlip--inset" || "pageDots" || "pageDots--dark" || "pageDots--subtle"]
         *  @option {bool}   swipeable  - change the slide on swipe left/right
         *  @option {string} transition - keyword for slide transition ["animate" || "fade"]
         */

        if (!($slider instanceof jQuery) || $slider === undefined) {
            $slider = $('[data-slider]');
        }

        $slider.each(function(sliderIndex) {
            
            // Please note:
            // 
            // sliderIndex is provided by jQuery's each() function and used to
            // reference the slider instances internally.
            // http://api.jquery.com/each/

            var $thisSlider        = $(this);
            var $thisSlides        = $thisSlider.find('.slider__slide');
            var $thisSlidesWrapper = $thisSlider.find('.slider__slides');

            // attach data to slider instance

            $thisSlider.data().slideIndex  = 0;
            $thisSlider.data().totalSlides = $thisSlides.length;

            // slider instance variables

            var slideIndex  = $thisSlider.data().slideIndex;
            var totalSlides = $thisSlider.data().totalSlides;

            // slider instance options

            var options = options === undefined ? YOI.toObject($thisSlider.data('slider')) : options;

            // prepare slides and adjust container to fixed height for animations

            if (options.transition !== undefined) {

                $(window).on('load', function(){
                    adjustHeight($thisSlider);
                });

            }

            // hide all slides but the first one

            $thisSlides.hide().first().show();

            // attach slide controls

            if (options.control !== undefined) {

                // add slide controls

                var thisControls = $(slideControls[options.control]).clone();
                $thisSlider.append(thisControls);

                // attach events to prev/next buttons

                $thisSlider.find('[class*="btnNext"]').on('click', function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderIndex);
                    showSlide($thisSlider, 'next');
                });

                $thisSlider.find('[class*="btnPrev"]').on('click', function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderIndex);
                    showSlide($thisSlider, 'prev');
                });

                // display total slides (.pageBtns)

                $thisSlider.find('.pageBtns__totalPages').text(totalSlides);

                // insert page dots (.pageDots)

                if (options.control.indexOf('pageDots') !== -1) {

                    // add pagination

                    for (var i = 0; i < totalSlides; i++) {
                        $('<a class="pageDots__dot"><span class="hidden">' + (i + 1) + '</span></a>').insertBefore($(this).find('.pageDots__btnNext'));
                    }

                    // set up pagination

                    paginationLinks = $(this).find('.pageDots a:not([class*="btn"])');
                    paginationLinks.first().addClass('pageDots--active');

                    paginationLinks.on('click', function(e) {

                        e.preventDefault();
                        stopAutoplay(sliderIndex);

                        if ($(this).parent().find('.pageDots__btnPrev').length) {
                            var linkIndex = $(this).index() -1;
                        } else {
                            var linkIndex = $(this).index();
                        }

                        showSlide($thisSlider, linkIndex);

                    });

                }

            }

            // attach events if "clickable"

            if (options.clickable) {

                $thisSlides.not('a').on('tap', function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderIndex);
                    showSlide($thisSlider, 'next');
                });

            }

            // attach events if "swipeable"

            if (options.swipeable) {

                $(this).on('swipeleft', function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderIndex);
                    showSlide($thisSlider, 'next');
                });

                $(this).on('swiperight',function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderIndex);
                    showSlide($thisSlider, 'prev');
                });

            }

            // enable auto play

            if (options.autoplay !== undefined) {
                slideAutoplayIntervals[sliderIndex] = window.setInterval(function(){
                    showSlide($thisSlider)
                }, options.autoplay);
            }

        });

    }

    function showSlide($thisSlider, target) {

        /**
         *  Show a slide.
         *
         *  @param {jQuery dom object} $thisSlider - the slider
         *  @param {string || integer} target      - a key for the target: "next" || "prev" || any slide number
         */

        var $thisSlides        = $thisSlider.find('.slider__slide');
        var $thisSlidesWrapper = $thisSlider.find('.slider__slides');

        var totalSlides        = $thisSlider.data().totalSlides;
        var slideIndex         = $thisSlider.data().slideIndex;
        var options            = YOI.toObject($thisSlider.data('slider'));
        var direction          = false;

        if (target === 'next' || target === undefined) {

            // set slideIndex to next slide

            slideIndex = slideIndex !== totalSlides - 1 ? slideIndex + 1 : 0;
            direction = '>';

        } else if (target === 'prev') {

            // set slideIndex to previous slide

            slideIndex = slideIndex === 0 ? totalSlides - 1 : slideIndex - 1;
            direction = '<';

        } else if (typeof target === 'number') {

            // set slideIndex to individual slide

            slideIndex = target;

        }

        // apply transition

        if (options.transition !== undefined) {

            applyTransition($thisSlider, slideIndex, direction);

        } else {

            $thisSlides.hide();
            $thisSlides.eq(slideIndex).show();

        }

        // update pagination links and slide indicator

        updatePagination($thisSlider, slideIndex);

        // update slider data object

        $thisSlider.data().slideIndex = slideIndex;

    }

    function applyTransition($thisSlider, nextSlideIndex, direction) {

        /**
         *  Transition between two slides.
         *
         *  @param {jQuery dom object} $thisSlider    - the slider
         *  @param {number}            nextSlideIndex - the next slide index number
         *  @param {string}            direction      - key for the direction, "<" || ">"
         */

        var $thisSlides       = $thisSlider.find('.slider__slide');
        var options           = YOI.toObject($thisSlider.data('slider'));
        var currentSlideIndex = $thisSlider.data().slideIndex;
        var leftOffset;

        switch (direction) {
        case '<':
            leftOffset = '-100%';
            break;
        case '>':
            leftOffset = '100%';
            break;
        }

        if (options.transition === 'animate') {

            // ... with animation

            if (!$thisSlides.is(':animated')) {

                // animate current slide

                $thisSlides
                    .eq(currentSlideIndex)
                    .css({
                        'z-index': '10'
                    })
                    .animate({
                        'left': leftOffset // animate position
                    }, 300, function() {   // reset after animation is done
                        $(this).css({
                            'left': '0',
                            'opacity': 0,
                            'z-index': '1'
                        });
                    });

                // and show next slide

                $thisSlides
                    .eq(nextSlideIndex)
                    .css({
                        'opacity': '1',
                        'z-index': '2'
                    })
                    .show();

            }

        } else if (options.transition === 'fade') {

            // ... with fade effect

            $thisSlides
                .eq(currentSlideIndex)
                .fadeOut(100, function(){
                    $thisSlides.eq(nextSlideIndex).fadeIn(300);
                });

        }

    }

    function stopAutoplay(sliderIndex) {

        /**
         *  Stop the auto play.
         *
         *  @param {string} sliderIndex - the internal slider instance index number
         */

        window.clearInterval(slideAutoplayIntervals[sliderIndex]);
        
    }

    function updatePagination($thisSlider, thisSlideIndex) {

        /**
         *  Update the pagination.
         *
         *  @param {jQuery dom object} $thisSlider    - the slider
         *  @param {number}            thisSlideIndex - the slide index number
         */

        // update page dots (.pageDots)

        paginationLinks = $thisSlider.find('.pageDots a:not([class*="btn"])');
        paginationLinks.removeClass('pageDots--active')
        paginationLinks.eq(thisSlideIndex).addClass('pageDots--active');

        // update page buttons (.pageBtns)

        $thisSlider.find('.pageBtns__currentPage').text(thisSlideIndex + 1);

    }

    function adjustHeight($thisSlider) {

        /**
         *  Adjust the height of a slider to match the height of the tallest slide.
         *
         *  @param {jQuery dom object} $thisSlider - the slider
         */

        var $thisSlides        = $thisSlider.find('.slider__slide');
        var $thisSlidesWrapper = $thisSlider.find('.slider__slides');
        var slideHeight        = 0;

        for (var i = 0; i < $thisSlides.length; i++) {
            var thisSlideHeight = $thisSlides.eq(i).outerHeight();
            slideHeight = thisSlideHeight > slideHeight ? thisSlideHeight : slideHeight;
            $thisSlidesWrapper.css({ 'height': slideHeight });
        };

        $thisSlidesWrapper.css({ 'height': slideHeight });

    }

    // initialize
    // ==========

    initializeSlider();

    // public functions
    // ================

    return {
        init : initializeSlider,
        show : showSlide
    };

})();

/** stepper.js */

var Stepper = (function() {

    // private vars
    // ============

    var btnLabelMore = YOI.locale === 'de' ? 'mehr'    : 'more';
    var btnLabelLess = YOI.locale === 'de' ? 'weniger' : 'less';

    var $stepperBtns = $('\
        <div class="stepper__btnPlus">\
            <i aria-hidden="true" class="icon--003-s"></i>\
            <span class="hidden">' + btnLabelMore + '</span>\
        </div>\
        <div class="stepper__btnMinus">\
            <i aria-hidden="true" class="icon--002-s"></i>\
            <span class="hidden">' + btnLabelLess + '</span>\
        </div>\
    ');

    // private functions
    // =================

    function initializeStepper($stepper) {

        /**
         *  Initialize all *[data-stepper] found in the document (= function call without parameters)
         *  or target one or more specific *[data-stepper] (= function call with $stepper).
         *  $stepper must be a jQuery object or jQuery object collection.
         *
         *  @param  {jQuery dom object} $stepper - the stepper
         */
        
        if (!($stepper instanceof jQuery)) {
            $stepper = $('[data-stepper]');
        }

        $stepper.each(function() {

            var $thisStepper = $(this);

            $thisStepper.prepend($stepperBtns.clone());

            // attach events

            var eventType = YOI.environment('mobile') ? 'tap' : 'click';

            $thisStepper.find('.stepper__btnPlus').on(eventType, function(e) {
                e.preventDefault();
                increaseItemCount($thisStepper);
            });

            $thisStepper.find('.stepper__btnMinus').on(eventType, function(e) {
                e.preventDefault();
                decreaseItemCount($thisStepper);
            });

            $thisStepper.find('.stepper__input').blur(function() {
                checkInput($thisStepper);
            });

            $thisStepper
                .on('swipeleft', function(e) {
                    decreaseItemCount($thisStepper);
                })
                .on('swiperight', function(e) {
                    increaseItemCount($thisStepper);
                });

        });

    }

    function increaseItemCount($stepper) {

        /**
         *  Increase the item count.
         *
         *  @param {jQuery dom object} $stepper - the stepper
         */

        checkInput($stepper);

        var currentValue = $stepper.find('.stepper__input')[0].value;

        if (currentValue >= 0) {
            currentValue++;
            $stepper.find('input')[0].value = currentValue;
        }

    }

    function decreaseItemCount($stepper) {

        /**
         *  Decrease the item count
         *
         *  @param {jQuery dom object} $stepper - the stepper
         */

        checkInput($stepper);

        var currentValue = $stepper.find('.stepper__input')[0].value;

        if (currentValue > 1) {
            currentValue--;
            $stepper.find('input')[0].value = currentValue;
        }

    }

    function checkInput($stepper) {

        /**
         *  Check the .stepper input element.
         *
         *  @param {jQuery dom object} $stepper - the stepper
         */

        var $txtField = $stepper.find('.stepper__input');
        var $input    = $stepper.find('.stepper__input')[0].value;

        if (!$input.match(/^[0-9]+$/)) {
            $txtField.addClass('input--error');
        } else {
            $txtField.removeClass('input--error');
        }

    }

    // initialize
    // ==========

    initializeStepper();

    // public functions
    // ================

    return {
        init      : initializeStepper,
        countUp   : increaseItemCount,
        countDown : decreaseItemCount
    }

})();

var Sticky = (function() {

    // private vars
    // ============
    
    var $body   = $('body');
    var $window = $(window);
    
    // private functions
    // =================
    
    function initializeSticky($stickyElement) {
        
        /**
         *  Initialize all *[data-sticky] found in the document (= function call without parameters)
         *  or target one or more specific *[data-sticky] (= function call with $stickyElement).
         *  $stickyElement must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $stickyElement - the sticky element(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div data-sticky="start:20;stop:200;">
         *
         *  Available options:
         *
         *  @option {number} start     - The distance between the sticky element top position and the
         *                               viewport top border at the moment the element sticks.
         *                               The default value is 0.
         *  @option {number} stop      - The distance between the sticky element initial top position
         *                               and the sticky element final top position at the moment it
         *                               stops sticking. The default value is the body height, which results
         *                               in sticking as long as the page can be scrolled.
         *  @option {string} reference - If the value is the keyword/string "parent", the sticky
         *                               element's fist parent element is referenced to control the
         *                               sticky element.
         *                               If the value is a jQuery-compatible CSS-selector, the script
         *                               selects the first matching element on the page and references
         *                               it's height to define a stop position for the sticky element.
         *                               The sticky element "sticks" as long as it's bottom aligns with
         *                               the reference element's bottom.
         */
        
        if (!($stickyElement instanceof jQuery)) {
            $stickyElement = $('[data-sticky]');
        }
        
        $stickyElement.each(function(index) {
            
            var $thisStickyElement      = $(this);
            var $thisStickyElementClone = $thisStickyElement.clone('true').attr('id', 'stickyClone-' + index);
            
            // update each sticky element's data
            
            updateStickyElementData($thisStickyElement);
            
            // do the necessary dom manipulation
            
            manipulateDom($thisStickyElement, $thisStickyElementClone);
            
        });
        
        // start position & stick observers
        
        positionObserver($stickyElement);
        stickObserver($stickyElement);
    
    }
    
    function manipulateDom($stickyElement, $stickyElementClone) {
        
        /**
         *  Perform all necessary dom manipulations. Takes a clone of the original
         *  sticky element, injects it as a direct child of the body and sets it to
         *  absolute positioning. While being "sticky", the clone is set to fixed positioning.
         *  The original element is kept as an empty element with it's initial width
         *  and height. The visibility is set to "hidden" in order to preserve the page layout.
         *
         *  @param {jQuery dom object} $stickyElement      - the sticky element
         *  @param {jQuery dom object} $stickyElementClone - the cloned sticky element
         */
        
        // prepare and append the cloned element
        
        $stickyElementClone.css({
            'position' : 'absolute',
            'width'    : $stickyElement.outerWidth(),
            'height'   : $stickyElement.outerHeight(),
            'top'      : $stickyElement.offset().top,
            'left'     : $stickyElement.offset().left
        });
        
        $body.append($stickyElementClone);
        
        // prepare and empty the original element
        
        $stickyElement.css({
            'width'      : $stickyElement.outerWidth(),
            'height'     : $stickyElement.outerHeight(),
            'visibility' : 'hidden'
        });
        
        $stickyElement.empty();
        
    }
    
    function updateStickyElementData($stickyElement) {
        
        /**
         *  Reads options from the custom data-option interface and calculates other
         *  important data, like initial position, dimensions, etc. Adds all data to the
         *  $stickyElement so that it is available for other functions.
         *
         *  @param {jQuery dom object} $stickyElement - the sticky element
         */
        
        var options                       = YOI.toObject($stickyElement.data('sticky'));
        var $referenceElement             = options.reference === 'parent' ? $stickyElement.parent() : $(options.reference).first();
        var stickyElementheight           = $stickyElement.outerHeight();
        var stickyElementInitialTopPos    = $stickyElement.offset().top;
        var stickyElementInitialBottomPos = stickyElementInitialTopPos + stickyElementheight;
        var topOffset                     = options.start !== undefined ? parseInt(options.start) : 0;
        var topDistance                   = options.stop !== undefined ? parseInt(options.stop) : 0;
        var stickStart                    = options.start !== undefined ? stickyElementInitialTopPos - topOffset : stickyElementInitialTopPos;
        var stickStop                     = options.stop !== undefined ? stickyElementInitialTopPos + topDistance - topOffset : $body.height();
        var passedValidation              = validInput($stickyElement);

        // the reference element is found in the dom
        
        if ($referenceElement.length) {
            stickStart = $referenceElement.offset().top - topOffset;
            stickStop  = stickStart + $referenceElement.outerHeight() - stickyElementheight - topDistance;
        }
        
        // the reference element is the parent dom object of the sticky element,
        // in this case, add the parent object's padding to the calculation
        
        if ($referenceElement.length && options.reference === 'parent') {
            stickStart = stickStart + parseInt($referenceElement.css('paddingTop'));
            stickStop  = stickStop - parseInt($referenceElement.css('paddingBottom')) + topDistance;
        }
        

        // write data

        $stickyElement.data({
            'passedValidation' : passedValidation,
            'height'           : stickyElementheight,
            'initialTopPos'    : stickyElementInitialTopPos,
            'initialBottomPos' : stickyElementInitialBottomPos,
            'topOffset'        : topOffset,
            'topDistance'      : topDistance,
            'stickStart'       : stickStart,
            'stickStop'        : stickStop
        });

    }
    
    function validInput($stickyElement) {
        
        /**
         *  Checks the input from the custom data-option interface and decides
         *  weather it makes sense. For example it does not make sense if the
         *  start position value is larger than the end position value. Stuff would break.
         *  Returns true if the input is valid, false if not.
         *
         *  @param  {jQuery dom object} $stickyElement - the sticky element
         *  @return {bool}                             - true if data is valid, false if data is invalid
         */

        var stickStart = $stickyElement.data().stickStart;
        var stickStop  = $stickyElement.data().stickStop;

        if (stickStop < 1 || stickStart > stickStop || stickStart > $stickyElement.offset().top) {
            return false;
        } else {
            return true;
        }

    }
    
    function positionObserver($stickyElements) {
        
        /**
         *  Listens to the window resize event. If the event is fired, this function
         *  updates the original $stickyElement data and updates the $stickyElementClone's
         *  left position.
         *
         *  @param {jQuery dom object} $stickyElement - the sticky element
         */
        
        $window.on('resize', function() {
            
            $stickyElements.each(function(index) {
                
                var $stickyElement      = $(this);
                var $stickyElementClone = $('#stickyClone-' + index);
                
                // if the sticky element passed validation (=> validInput),
                // do the re-positioning
                
                if (validInput($stickyElement)) {
                    updateStickyElementData($stickyElement);
                    $stickyElementClone.css('left', $stickyElement.offset().left);
                }
                
            });
            
        });
        
    }
    
    function stickObserver($stickyElements) {
        
        /**
         *  Listens to the window scroll event. If the event is fired, this function
         *  observes all sticky elements and manipulates their position. If a sticky element
         *  is inside it's "sticky boundaries", it is "set to stick", otherwise it gets "unstuck".
         *
         *  @param {jQuery dom object} $stickyElements      - the sticky element(s)
         *  @param {jQuery dom object} $stickyElementCloned - the cloned sticky element(s)
         */
        
        $window.on('scroll', function() {
            
            // store the scroll position
            
            var scrollTop = $window.scrollTop();
            
            // observe all sticky elements
            
            $stickyElements.each(function(index) {
                
                // variable assignments for better readability only
                
                var $stickyElement                = $(this);
                var $stickyElementClone           = $('#stickyClone-' + index);
                var stickyElementheight           = $stickyElement.data().height;
                var stickyElementInitialTopPos    = $stickyElement.data().initialTopPos;
                var stickyElementInitialBottomPos = $stickyElement.data().initialBottomPos;
                var stickStart                    = $stickyElement.data().stickStart;
                var stickStop                     = $stickyElement.data().stickStop;
                var topOffset                     = $stickyElement.data().topOffset;
                var topDistance                   = $stickyElement.data().topDistance;
                var cssPositionValue;
                var cssTopValue;
                
                // proceed if the sticky element passed validation (=> validInput)
                
                if (validInput($stickyElement)) {
                
                    // re-position on scroll
                
                    if (scrollTop < stickStart) {
                    
                        // outside top boundary
                    
                        cssPositionValue = 'absolute';
                        cssTopValue      = stickyElementInitialTopPos;
                    
                    } else if (scrollTop > stickStop) {
                    
                        // outside bottom boundary
                    
                        cssPositionValue = 'absolute';
                        cssTopValue      = stickStop + topOffset;
                    
                    } else {
                    
                        // inside boundaries
                    
                        cssPositionValue = 'fixed';
                        cssTopValue      = 0 + topOffset;
                    
                    }
                
                    // set the css
                
                    $stickyElementClone.css({
                        'position' : cssPositionValue,
                        'top'      : cssTopValue
                    });
                    
                }
                
            });
            
        });
        
    }
    
    // initialize
    // ==========
    
    initializeSticky();
    
    // public functions
    // ================
    
    return {
        init: initializeSticky
    }

})();
/** switch.js */

var Switch = (function() {

    // private vars
    // ============
    
    var $labelOn  = $('<span class="switch__labelOn"></span>');
    var $labelOff = $('<span class="switch__labelOff"></span>');
    var $knob     = $('<span class="switch__knob"></span>');
    
    var labelOnTxt = {
        'de' : 'Ein',
        'en' : 'On'
    }
    
    var labelOffTxt = {
        'de' : 'Aus',
        'en' : 'Off'
    }
    
    // get the document language, fall back to english
    // note: only german and english supported at this moment

    var language = typeof YOI.locale() !== 'object' || YOI.locale() === undefined || YOI.locale() === '' ? 'en' : YOI.locale();
    
    // private functions
    // =================
    
    function initializeSwitch($switch, options) {
        
       /**
        *  Initialize all [data-switch] found in the document (= function call without parameters)
        *  or target one or more specific [data-switch] (= function call with $switch).
        *  $switch must be a jQuery object or jQuery object collection.
        *
        *  @param {jQuery dom object} $switch - the switch(es)
        *
        *  Options are passed to the script as custom data values, eg:
        *
        *  <form data-switch="state:off;"></form>
        *
        *  Available options:
        *
        *  @option {string}  state      - a keyword to set the switch ["on"|"off"]
        *  @option {boolean} showLabels - if "true", labels (on, off) are added
        *  @option {string}  labelOn    - a string of no more than four characters for the "on" label (default: labelOnTxt[language])
        *  @option {string}  labelOff   - a string of no more than four characters for the "off" label (default: labelOffTxt[language])
        */

        if (!($switch instanceof jQuery)) {
            $switch = $('[data-switch]');
        }

        $switch.each(function() {

            var $thisSwitch = $(this);
            var options     = YOI.toObject($thisSwitch.data('switch'));
            var state       = options.state !== undefined ? options.state : 'off';
            
            // get the label text
            
            thisLabelOnText  = options.labelOn !== undefined ? options.labelOn : labelOnTxt[language];
            thisLabelOffText = options.labelOff !== undefined ? options.labelOff : labelOffTxt[language];
            
            // prepare the dom
            
            $thisSwitch.append(
                $knob.clone()
            );
            
            if (options.showLabels) {
                $thisSwitch.append(
                    $labelOn.clone().text(thisLabelOnText),
                    $labelOff.clone().text(thisLabelOffText)
                );
                $thisSwitch.addClass('switch--labeled');
            }
            
            // set to initial state
            
            if (state === 'on') stateOn($thisSwitch);
            if (state === 'off') stateOff($thisSwitch);

            // add events

            $thisSwitch.on('click', function(e) {
                stateToggle($thisSwitch);
            });

        });
        
    }
    
    function stateOn($switch) {
        
        /**
         *  Sets the switch to "on". Adds the proper CSS class name to
         *  visualize the state and sets the first checkbox found inside the
         *  switch to "checked".
         *
         *  @param {jQuery dom object} $switch - the switch
         */
        
        $switch.removeClass('switch--off').addClass('switch--on');
        $switch.find('input[type="checkbox"]').first().attr('checked', true);
        
    }
    
    function stateOff($switch) {
        
        /**
         *  Sets the switch to "off". Adds the proper CSS class name to
         *  visualize the state and removes the "checked" attribute from
         *  the first checkbox found inside the switch.
         *
         *  @param {jQuery dom object} $switch - the switch
         */
        
        $switch.removeClass('switch--on').addClass('switch--off');
        $switch.find('input[type="checkbox"]').first().attr('checked', false);
        
    }
    
    function stateToggle($switch) {
        
        /**
         *  Alternates the state between "on" and "off".
         *  See stateOn() and stateOff() for more.
         *
         *  @param {jQuery dom object} $switch - the switch
         */
        
        if ($switch.hasClass('switch--off')) {
            stateOn($switch);
        } else if ($switch.hasClass('switch--on')) {
            stateOff($switch);
        }
        
    }
    
    // initialize
    // ==========
    
    initializeSwitch();
    
    // public functions
    // ================
    
    return {
        init   : initializeSwitch,
        on     : stateOn,
        off    : stateOff,
        toggle : stateToggle
    }

})();
/** tables.js */

var Table = (function() {

    // private vars
    // ============

    var btnLabelRemove = YOI.locale === 'de' ? 'Entfernen' : 'Remove';

    var $removeBtn = $('\
        <button class="btn btn--subtle btn--rounded">\
            <span class="hidden">' + btnLabelRemove + '</span>\
            <i class="icon--006-s" aria-hidden="true"></i>\
        </button>\
    ');

    // private functions
    // =================

    function initializeTable($table, options) {
        
        /**
         *  Initialize all table[data-table] found in the document (= function call without parameters)
         *  or target one or more specific table[data-table] (= function call with $table).
         *  $table must be a jQuery object or jQuery object collection.
         *
         *  @param  {jQuery dom object} $table - the table(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <table data-table="removeable:true;">
         *
         *  Available options:
         *
         *  @option {boolean} removeable - removeable table rows
         *  @option {boolean} selectable - if set to true, single table rows can be selected, if set to "multi", multiple table rows can be selected
         */
        
        if (!($table instanceof jQuery)) {
            $table = $('[data-table]');
        }

        $table.each(function(){

            var $thisTable = $(this);
            var options    = options === undefined ? YOI.toObject($thisTable.data('table')) : options;

            if (options.selectable || options.selectable === 'multi') {

                // makes table rows selectable on click:

                // adjust table markup

                $thisTable.find('tr th:first-child').before('<th></th>');
                $thisTable.find('tr td:first-child').before('<td class="table__checkbox"></td>');

                // attach events

                $thisTable.find('td').on('click', function(e) {

                    e.preventDefault();

                    var $thisTr = $(this).closest('tr');
                    selectRow($thisTr);

                });

            }

            if (options.removeable) {

                // Inserts a col at the end of the table,
                // and puts a delete-button inside which removes
                // it's parent table row.

                var $thisRemoveBtn = $removeBtn.clone();

                // attach events to button

                $thisRemoveBtn.on('click', function(e) {

                    // prevent default & call remove row

                    e.preventDefault();

                    var $thisTr = $(this).closest('tr');
                    removeRow($thisTr);

                });

                // adjust table markup

                $thisTable.find('tr th:last-child').after('<th></th>');
                $thisTable.find('tr td:last-child').after('<td class="table__controls"></td>');

                // insert remove button

                $('.table__controls').append($thisRemoveBtn);

            }

        });

    }

    function selectRow($thisTr) {

        /**
         *  Select a given table row.
         *
         *  @param {jQuery dom object} $thisTr - the table row
         */

        var $thisTable = $thisTr.closest('table');
        var $thisAllTd = $thisTable.find('td');
        var $thisAllTr = $thisTable.find('tr');
        var options    = YOI.toObject($thisTable.data('table'));

        // select rows, either multiple or single

        if (options.selectable === 'multi') {
            $thisTr.toggleClass('tr--active');
        } else {
            $thisAllTr.removeClass('tr--active');
            $thisTr.addClass('tr--active');
        }

    }

    function removeRow($thisTr) {

        /**
         *  Remove a given table row.
         *
         *  @param  {jQuery dom object} $thisTr - the table row
         */

        var $thisTable   = $thisTr.closest('table');
        var thisData     = $thisTr.data();
        var totalTds     = $thisTable.find('td').length;
        var tableIsEmpty = (totalTds - $thisTr.find('td').length) === 0 ? true : false;

        $thisTr.fadeOut('slow', function() {

            $thisTr.remove();

            // custom event other scripts can subscribe to:
            // the last row got removed, table is empty

            if (tableIsEmpty) $thisTable.trigger('tables:empty');

        });

    }

    // initialize
    // ==========

    initializeTable();

    // public functions
    // ================

    return {
        init      : initializeTable,
        selectRow : selectRow,
        removeRow : removeRow
    };

})();

/** tabs.js */

var Tabs = (function() {

    // private functions
    // =================

    function initializeTabs() {

        /**
         *  Initialize the tabs.
         *
         *  In general:
         *
         *  - each .tabs__page must have an unique ID
         *  - tab pages don't need to be grouped inside a container element
         *  - all tab pages targeted by a tabs__menu get grouped
         *  - tab pages can be anywhere inside the document
         *
         *  For each .tabs__menu:
         *
         *  - An initial .tabs__page can be referred to by adding the class .is--active
         *    to a menu item. If no such class name was found, the tabs page referred to by
         *    the first tab menu item is shown.
         *
         *  - If location.hash matches a tab page inside the document, the initial tab page
         *    gets overridden by the tabs page matching the hash. Additionally, the tab page
         *    gets scrolled into the viewport.
         */

        $('.tabs__menu').each(function(){

            // read start tab from markup ...

            var thisStartTabId = $(this).find('.is--active').length ? $(this).find('.is--active a')[0].hash : $(this).find('a').first()[0].hash;

            // read start tab from url ...

            var urlTabId = window.location.hash;

            // ... and finally define the target tab

            var targetTabId = $(this).find('a[href*="' + urlTabId + '"]').length > 0 ? urlTabId : thisStartTabId;

            // switch to target tab

            switchToTab(targetTabId);

            // if start tab was in hash, scroll to start tab

            if (YOI.foundModule('ScrollTo') && urlTabId !== '')
                ScrollTo.target(urlTabId);

            // attach click event to menu items

            $(this).find('a').on('click', function(e) {

                e.preventDefault();

                var thisHash = $(this)[0].hash;
                switchToTab(thisHash);

            });

        });

    }

    function switchToTab(thisTargetTabId) {

        /**
         *  Show the target tab, hide all other related tabs.
         *
         *  @param {string} thisTargetTabId - target tab CSS-selector (most likely an #id, e.g. "#myTab")
         */

        var $thisTabsMenuItem         = $('a[href*="' + thisTargetTabId + '"]').parent('li');
        var $thisRelatedTabsMenuItems = $thisTabsMenuItem.closest('.tabs__menu').find('li');

        // remove '.is--active' from all related menu items,
        // hide all related tabs

        $thisRelatedTabsMenuItems.each(function() {

            var tabId = $(this).find('a')[0].hash;

            $(this).removeClass('is--active');
            $(tabId).hide();

        });

        // add '.is--active' and switch to target tab

        $thisTabsMenuItem.addClass('is--active');
        $(thisTargetTabId).show();

    }

    // initialize
    // ==========

    initializeTabs();

    // public functions
    // ================

    return {
        init     : initializeTabs,
        switchTo : switchToTab
    };

})();

/** toggleGroup.js */

var ToggleGroup = (function() {

    // private vars
    // ============

    var toggleTargetGroupIteration;
    var resetToggleDelayTime = 300;

    // private functions
    // =================

    function initializeToggleGroup($toggleGroup, options) {

        /**
         *  Initialize all *[data-toggle] found in the document (= function call without parameters)
         *  or target one or more specific *[data-toggle] (= function call with $toggleGroup).
         *  $toggleGroup must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $toggleGroup - the toggle group(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <button data-toggle="target:#myTargetElement;activeClassName:is--active;">
         *
         *  Available options:
         *
         *  @option {string} target          - CSS-selector for target element
         *  @option {string} group           - a unique string to group toggle elements
         *  @option {string} activeClassName - to highlight an "active" trigger, this
         *                                     CSS class name is added to the trigger
         */
        
        if (!($toggleGroup instanceof jQuery)) {
            $toggleGroup = $('[data-toggle]');
        }

        $toggleGroup.each(function(index) {

            var $thisTrigger      = $(this);
            var options           = options === undefined ? YOI.toObject($thisTrigger.data('toggle')) : options;
            var target            = options.target;
            var group             = options.group;
            var event             = options.event !== undefined ? options.event : 'mouseover';
            var activeClassName   = options.activeClassName;
            var $thisFallBackElem = $('[data-toggle-fallback="' + group + '"]');

            // group related toggle elements for easy dom-access

            $(target).addClass('toggleTargetGroup-' + group);
            $thisTrigger.addClass('toggleTriggerGroup-' + group);

            // toggle on event (default event = mouseover)

            $thisTrigger.on(event, function(e) {
                e.preventDefault();
                toggleGroup($thisTrigger);
            });

            if ($thisFallBackElem.length > 0 && event === 'mouseover') {

                // If there is a fallback element defined,
                // hide all targets since fallback is the first
                // element to show. This only makes sense on
                // mouseenter/mouseleave events, not on click.

                $(target).hide();

                // Add additional events to switch back
                // to fallback element.

                $thisTrigger
                    .on('mouseenter', function() {
                        YOI.clearDelay('resetToggleTimeout');
                    })
                    .on('mouseleave', function() {
                        YOI.setDelay('resetToggleTimeout', resetToggleDelayTime, function(){
                            resetToggleGroup($thisTrigger);
                        });
                    });

            } else {

                if (toggleTargetGroupIteration !== group) {

                    // If there is no fallback element defined,
                    // each time we start a new toggle group,
                    // hide all targets but the first one.

                    toggleTargetGroupIteration = group;

                    // If an "activeClassName" was defined, add it
                    // to the first trigger element.

                    if (activeClassName !== undefined)
                        $thisTrigger.addClass(activeClassName);

                } else {

                    // If a fall back element exists, hide all
                    // target elements to only show the fall
                    // back element.

                    $(target).hide();
                }

            }

        });

    }

    function toggleGroup($thisTrigger) {

        /**
         *  Toggle a group, read required data from the trigger.
         *
         *  @param {jQuery dom object} $thisTrigger - the trigger
         */

        var options           = YOI.toObject($thisTrigger.data('toggle'));
        var target            = options.target;
        var group             = options.group;
        var activeClassName   = options.activeClassName;

        var $thisFallBackElem = $('[data-toggle-fallback="' + group + '"]');

        // Hide all elements from the same toggle group and
        // show the target element.

        $('.toggleTargetGroup-' + group).hide();
        $(target).show();

        if (activeClassName !== undefined) {
            $('.toggleTriggerGroup-' + group).removeClass(activeClassName);
            $thisTrigger.addClass(activeClassName);
        }

        // If there is a fall back element, hide it.

        if ($thisFallBackElem !== undefined)
            $thisFallBackElem.hide();

    }

    function resetToggleGroup($thisTrigger) {

        /**
         *  Reset a toggle group, read required data from the trigger.
         *
         *  @param {jQuery dom object} $thisTrigger - the trigger
         */

        var options           = YOI.toObject($thisTrigger.data('toggle'));
        var group             = options.group;
        var activeClassName   = options.activeClassName;

        var $thisFallBackElem = $('[data-toggle-fallback="' + group + '"]');

        // Remove active class name from trigger.

        if (activeClassName !== undefined)
            $('.toggleTriggerGroup-' + group).removeClass(activeClassName);

        // Hide all elements from the same toggle group.

        $('.toggleTargetGroup-' + group).hide();

        // If there is a fall back element, show it.

        if ($thisFallBackElem.length > 0)
            $thisFallBackElem.fadeIn();

    }

    // initialize
    // ==========

    initializeToggleGroup();

    // public functions
    // ================

    return {
        init  : initializeToggleGroup,
        reset : resetToggleGroup
    }

})();

/** toolTip.js */

var Tooltip = (function() {

    // private vars
    // ============

    var showDelayDuration = 300;
    var hideDelayDuration = 200;

    // private functions
    // =================

    function initializeTooltip($tooltip, options) {

        /**
         *  Initialize all *[data-tooltip] found in the document (= function call without parameters)
         *  or target one or more specific *[data-tooltip] (= function call with $tooltip).
         *  $tooltip must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $tooltip - the tooltip(s)
         */

        if (!($tooltip instanceof jQuery)) {
            $tooltip = $('[data-tooltip]');
        }

        $tooltip.each(function() {

            // set up vars

            var $thisTooltip = $(this);
            var options      = options === undefined ? YOI.toObject($thisTooltip.data('tooltip')) : options;
            var $target      = options.target !== undefined ? $(options.target) : $thisTooltip.find('.tooltip');
            var character    = (options.character !== undefined && !icon) ? options.character : '?';
            var $trigger;

            // prepare the trigger element

            $trigger = prepareTrigger($thisTooltip);

            // prepare the target element

            $target = prepareTarget($target);

            // add event to trigger

            $trigger.on('mouseover', function(e) {

                // positioning

                setPosition($target, e);

                // hide all other tooltips

                $('.tooltip').hide();

                hideWithDelay('stop');
                showWithDelay($target, 'start');

            });

            $trigger.on('mouseout', function() {

                hideWithDelay('start');
                showWithDelay($target, 'stop');

            });

        });

    }

    function prepareTrigger($thisTrigger) {

        /**
         *  Prepare the trigger.
         *
         *  In case the trigger element itself is an text input element,
         *  a hint needs to get injected and things need to get
         *  wrapped inside a <div class="wrapper"> for positioning.
         *
         *  @param  {jQuery dom object} $thisTrigger         - the trigger
         *  @return {jQuery dom object} $thisPreparedTrigger - the prepared trigger
         */

        var options            = YOI.toObject($thisTrigger.data('tooltip'));
        var icon               = options.icon !== undefined ? options.icon : false;
        var textInputTypes     = [ 'email', 'password', 'tel', 'text', 'url' ];
        var triggerIsTextInput = $thisTrigger.prop('tagName') === 'INPUT' && $.inArray($thisTrigger.attr('type'), textInputTypes) > -1;
        var triggerIsTextarea  = $thisTrigger.prop('tagName') === 'TEXTAREA';
        var $thisPreparedTrigger;

        if (triggerIsTextInput || triggerIsTextarea) {

            var $wrapper = $('<div class="tooltip__wrapper">');

            if (!icon) {
                $thisPreparedTrigger = $('<span class="hint">' + character + '</span>');
            } else {
                $thisPreparedTrigger = $('<span class="hint"><i class="icon--' + icon + '-s" aria-hidden="true"></i></span>');
            }

            $thisTrigger.wrap($wrapper);
            $thisTrigger.parent().append($thisPreparedTrigger);
            $thisTrigger.parent().css('width', $thisTrigger.outerWidth());

        } else {

            $thisPreparedTrigger = $thisTrigger;

        }

        // return the prepared trigger

        return $thisPreparedTrigger;

    }

    function prepareTarget($thisTarget) {

        /**
         *  Prepare the target.
         *
         *  Remove original target element from the DOM,
         *  clean up the content, inject it into a new
         *  tooltip-element and attach that to the DOM.
         *
         *  @param  {jQuery dom object} $thisTarget - the target
         *  @return {jQuery dom object} $thisTarget - the prepared target
         */

        var $thisTmpTarget = $thisTarget.detach();

        if ($thisTarget.attr('id') !== undefined) {
            targetId = 'id="' + $thisTarget.attr('id') + '" ';
        } else {
            targetId = '';
        }

        $thisTarget = $('<div ' + targetId + 'class="tooltip">' + $thisTarget.html() +'</div>').appendTo($(document.body)).hide();

        if ($thisTmpTarget.attr('class') !== undefined) {

            // add compatible modifiers

            var compatibleModifiers = [
                '--positive',
                '--success',
                '--negative',
                '--error',
                '--attention'
            ];

            for (var i = 0; i < compatibleModifiers.length; i++) {

                var thisModifier            = compatibleModifiers[i];
                var thisTmpTargetClassnames = $thisTmpTarget.attr('class');

                if (thisTmpTargetClassnames.indexOf(thisModifier) > 0) {
                    thisModifier = 'tooltip--' + thisModifier.split('--')[1];
                    $thisTarget.addClass(thisModifier);
                }

            }

        }

        // return the prepared target

        return $thisTarget;

    }

    function setPosition($thisTarget, e) {

        /**
         *  Set the tool tip position.
         *
         *  @param {jQuery dom object} $thisTarget - the target element
         *  @param {event}             e           - the trigger event
         */

        // calculate dimensions and positions

        var padding        = 20;
        var cursorY        = e.pageY;
        var cursorX        = e.pageX;
        var tooltipWidth   = $thisTarget.width();
        var tooltipHeight  = $thisTarget.height();
        var viewPortWidth  = $(window).width();
        var viewPortHeight = $(window).height();
        var scrollTop      = $(window).scrollTop();

        // calculate position for tooltip

        var tooltipLeft = cursorX + tooltipWidth > viewPortWidth ? cursorX - tooltipWidth - padding + 'px' : cursorX  + 'px';
        var tooltipTop  = cursorY + tooltipHeight + padding * 3 > scrollTop + viewPortHeight ? cursorY - tooltipHeight - padding * 2 + 'px' : cursorY + padding + 'px';

        // set position for tooltip

        $thisTarget
            .css({
                'position': 'absolute',
                'left': tooltipLeft,
                'top': tooltipTop
            });

    }

    function showWithDelay($thisTarget, action) {

        /**
         *  Show a tool tip with delay.
         *
         *  @param {jQuery dom object} $thisTarget - the target element
         *  @param {string}            action      - keyword, "start" || "stop"
         */

        if (action === 'start') {

            YOI.setDelay('tooltipShowDelay', showDelayDuration, function(){
                $thisTarget.fadeIn(200);
            });


        } else if (action === 'stop') {

            YOI.clearDelay('tooltipShowDelay');

        }

    }

    function hideWithDelay(action) {

        /**
         *  Hide a tool tip with delay.
         *
         *  @param {string} action - keyword, "start" || "stop"
         */

        if (action === 'start') {

            YOI.setDelay('tooltipHideDelay', hideDelayDuration, function(){
                $('.tooltip').hide()
            });


        } else if (action === 'stop') {

            YOI.clearDelay('tooltipHideDelay');

        }

    }

    // initialize
    // ==========

    initializeTooltip();

    // public functions
    // ================

    return {
        init: initializeTooltip,
        show: showWithDelay,
        hide: hideWithDelay
    }

})();
