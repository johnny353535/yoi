/** helpers.js */

var Helper = (function() {

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
             *  "foo:something"
             *  "foo: something"
             *  "foo:something;"
             *  "foo:'anything'"
             *  "foo:something; bar:somethingelse"
             *  "foo:something; bar:somethingelse;"
             *
             *  @param  {string} input                      - the input to process, see example above
             *  @return {object || bool false} properObject - a proper JS object notation
             */

            var keyValuePair;
            var properObject = {};

            if (Helper.stringContains(input, ':')) {

                // clean up input

                input = (input || '').replace(/\s/g,'').split(';');

                // turn input into a proper object

                for (var i = 0; i < input.length; i++) {

                    keyValuePair = input[i].split(':');

                    if (keyValuePair[1] !== undefined)
                        properObject[keyValuePair[0]] = keyValuePair[1];

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
             *  @param  {number}  num    - the number
             *  @param  {number}  digits - the number of leading zeros
             *  @return {string}         - the padded number
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

    var $controls     = $('\
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
            if (Helper.foundModule('Prism'))
                Prism.highlightElement($(this).find('pre')[0]);
        });

        // print the code for each code-example block

        $('.documentation__example[data-printcode]').each(function() {

            var $thisExampleBlock = $(this);
            var options           = Helper.toObject($thisExampleBlock.data('printcode'));

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

                Helper.setDelay('printCodeDelay', 1000, function() {
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
            var options       = Helper.toObject($thisDocBlock.data('docblock'));

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

            if (Helper.foundModule('Prism')) {

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

            var options           = Helper.toObject($thisExampleBlock.data('printcode'));
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

/** autoComplete.js */

var AutoComplete = (function() {

    // private functions
    // =================

    function initializeAutoComplete() {

        var autoCompleteInputFields = $('[data-action="autocomplete"]');
        var inputValue;

        autoCompleteInputFields
            .on('focus', function() {
                inputValue = $(this)[0].value;
                $(this)[0].value = '';
            })
            .on('keypress', function() {
                $(this).closest('form').find('.autoComplete').show();
            })
            .on('blur', function() {
                $(this)[0].value = inputValue;
                $(this).closest('form').find('.autoComplete').hide();
            });

    }

    // initialize
    // ==========

    initializeAutoComplete();

    // public functions
    // ================

    return {
        init : initializeAutoComplete
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

var countdown = (function() {

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

    function initializeCountdown() {
        
        /**
         *  Initialize all countdowns found in the document.
         */

        $('[data-countdown]').each(function(index) {
        
            var $thisCountdown = $(this);
            
            // render the countdown
            
            renderCountdown($thisCountdown, index);
            
            // update the clock every second
            
            Helper.setInterval('countdownTimer-' + index, 1000, function() {
                renderCountdown($thisCountdown, index)
            });
        
        });

    }
    
    function renderCountdown($thisCountdown, index) {
        
        /**
         *  Render the lcd-style countdown, also include a label for screen readers.
         *
         *  @param {jQuery dom object} $thisCountdown - the countdown
         *  @param {number}            index          - index number of the count down
         */
        
        // read end time and get remaining time
        
        var endTime       = $thisCountdown.data('countdown');
        var timeRemaining = getTimeRemaining(endTime);
        
        // if countdown is expired, clear countdown interval and fire custom event

        if (timeRemaining.total <= 0) {
            Helper.clearInterval('countdownTimer-' + index);
            $thisCountdown.trigger('countdown:expired');
        }

        // set the lcd characters
    
        setLcdCharacters($thisCountdown, timeRemaining);

        // accessibility: create an additional, visually hidden
        // label for screen readers
        
        var language = Helper.locale();
        
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
        
        currentTime.hours   = Helper.zeroPad(today.getHours()).toString();
        currentTime.minutes = Helper.zeroPad(today.getMinutes()).toString();
        currentTime.seconds = Helper.zeroPad(today.getSeconds()).toString();

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
        var seconds = Helper.zeroPad(Math.floor((total / 1000) % 60 )).toString();
        var minutes = Helper.zeroPad(Math.floor((total / 1000 / 60) % 60 )).toString();
        var hours   = Helper.zeroPad(Math.floor((total / (1000 * 60 * 60)) % 24 )).toString();
        var days    = Helper.zeroPad(Math.floor(total / (1000 * 60 * 60 * 24))).toString();
        
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
        var language = Helper.locale();
        
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

    var language = typeof Helper.locale() !== 'object' || Helper.locale() === undefined || Helper.locale() === '' ? 'en' : Helper.locale();

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

    function initializeDatePicker() {

        /**
         *  Initialize the date picker.
         */

        // update the current date

        getCurrentDate();

        // initialize all date pickers

        $('input[data-datepicker]').each(function(index) {

            // get date input & date input data

            var $thisDateInput = $(this);

            // if the date input already has data (from markup), use it

            if (!$.isEmptyObject($thisDateInput.data('datepicker'))) {

                // get and format date input data

                thisDateInputData = Helper.toObject($thisDateInput.data('datepicker'));

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

                    Helper.setDelay('datePickerHideTimeout-' + index, 500, function() {

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

                    Helper.clearDelay('datePickerHideTimeout-' + index);

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

        var formattedSelectedDate = Helper.zeroPad(selectedDay, 1) + '.' + Helper.zeroPad(selectedMonth + 1, 1) + '.' + selectedYear;

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

        var formattedDate = Helper.zeroPad(selectedDay, 1) + '.' + Helper.zeroPad(month + 1, 1) + '.' + year;

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
            if (language === 'de') formattedDate = Helper.zeroPad(day, 1) + '.' + Helper.zeroPad(month + 1, 1) + '.' + year;
            if (language === 'en') formattedDate = Helper.zeroPad(month + 1, 1) + '.' + Helper.zeroPad(day, 1) + '.' + year;
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

        if (Helper.locale() === 'en' || Helper.locale === undefined) {

            $monthTableBody.append($weekDaysHeader_en.clone());

        } else if (Helper.locale() === 'de') {

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

            Helper.setDelay('datePickerFocusDelay', 50, function() {
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
    var onMobile = $(document.body).data('environment') === 'mobile';
    var btnLabelClose = Helper.locale === 'de' ? 'schliessen' : 'close';

    if (onMobile) {

        $btnDismiss = $('\
            <button class="btn btn--large btn--subtle">\
                <span class="hidden">' + btnLabelClose + '</span>\
                <i class="icon--006-s" aria-hidden="true"></i>\
            </button>\
        ');

    } else {

        $btnDismiss = $('\
            <button class="btn btn--subtle">\
                <span class="hidden">' + btnLabelClose + '</span>\
                <i class="icon--006-s" aria-hidden="true"></i>\
            </button>\
        ');

    }

    // private functions
    // =================

    function initializeDismissableElements() {

        /**
         *  Attaches a close-button to all elements that have
         *  a data-dismissable flag.
         */

        $('[data-dismissable]').each(function() {

            var $thisTarget = $(this);

            // attach button and events

            $btnDismiss
                .clone()
                .on('click', function(e) {
                    e.preventDefault();
                    dismiss($thisTarget);
                })
                .appendTo($thisTarget);

        });

    }

    function initializeDismissButtons() {

        /**
         *  Queries the document for buttons flagged with a
         *  data-dismiss attribute. Reads the target element
         *  from the data-attribute value.
         */

        $('[data-dismiss]').each(function() {

            var $thisTrigger = $(this);
            var options      = Helper.toObject($(this).data('dismiss'));
            var $thisTarget  = $(options.target);

            /**
             *  Available options:
             *
             *  @option {string} target - selector for target element
             */

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

        $thisTarget.fadeOut(function() {
            $thisTarget.remove();
        });

    }

    // initialize
    // ==========

    initializeDismissableElements();
    initializeDismissButtons();

    // public functions
    // ================

    return {
        initElements : initializeDismissableElements,
        initBtns     : initializeDismissButtons,
        apply        : dismiss
    };

})();

/** dock.js */

var Dock = (function() {

    // private functions
    // =================

    function initializeDock() {

        /**
         *  Initialite the dock by preparing the dom
         *  and attaching events.
         */

        $('[data-dock]').each(function() {

            var $thisDock = $(this);
            var options   = Helper.toObject($thisDock.data('dock'));

            // auto hide

            if (options.autohide) {

                hideDock($thisDock);

                $thisDock
                    .on('mouseover', function() {
                        Helper.clearDelay('hideDockTimeout');
                        showDock($thisDock);
                    })
                    .on('mouseout', function() {
                        Helper.setDelay('hideDockTimeout', 750, function() {
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

        $thisDock.addClass('dock--hidden');
    }

    function showDock($thisDock) {

        /**
         *  Show the dock.
         *
         *  @param {jQuery dom object} $thisDock - the dock
         */

        $thisDock.removeClass('dock--hidden');
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

// ===========================================================
//
//        File:    js/drawerMenu.js
//        Descr.:    Three-level foldable list menu.
//
// ===========================================================

// open nested elements

$('.drawerMenu li:not(".open") .handle + ul').hide();

$('.drawerMenu .handle').on('tap', function(e) {

    if(!$(this).parent().hasClass('open')) {
        $(this).parent().addClass('open');
        $(this).parent().find('> ul').stop().slideDown('fast');
    } else if( $(this).parent().hasClass('open')) {
        $(this).parent().removeClass('open');
        $(this).parent().find('> ul').stop().slideUp('fast');
    }

});

// option to hide list items after defined max. item number

$('.drawerMenu ul').each(function() {

    var options = $(this).data('options');

    if (options === undefined) {

        return;

    } else {

        // read options

        var threshold = options.maxItems;
        var listItems = $(this).find('> li');

        // if the menu has more items than threshold,
        // cut off menu

        if (listItems.length > threshold) {

            listItems.slice(threshold).hide();

            // create and insert load-button

            var btnLoad = $('<button class="btnLoad">alle anzeigen</button>')
                .on('tap', function() {
                    $(this).parent().find('> li').show();
                    $(this).remove();
                })
                .insertAfter($(this).find('> li').eq(threshold));

        }

    }

});

// toggle states for list items that
// behave like radio buttons or checkboxes

$('.drawerMenu li[class^="radiobtn-"]').on('tap', function(e) {

    e.preventDefault();

    var options = $(this).parent('ul').data('options');

    if (options !== undefined && options.hasOwnProperty('activityMsg')) {
        NavBar.showMsg(options.activityMsg);
    } else {
        NavBar.showMsg();
    }

    if ($(this).hasClass('radiobtn-off')) {
        $(this).siblings('li.radiobtn-on').removeClass('radiobtn-on').addClass('radiobtn-off');
        $(this).addClass('radiobtn-on');
    } else if ($(this).hasClass('radiobtn-on')) {
        $(this).removeClass('radiobtn-on').addClass('radiobtn-off');
    }

    // update data-bits

    var dataBit = $(this).find('.dataBit');
    var dataBitInHandle = $(this).parent().prev('.handle').find('.dataBit');

    if (dataBit.length > 0) {
        dataBitInHandle.html(dataBit.html());
        Helper.blink(dataBitInHandle);
    }

});

$('.drawerMenu li[class^="checkbox-"]').on('tap', function(e) {

    e.preventDefault();

    var options = $(this).parent('ul').data('options');
    var parentDrawerMenu = $(this).parents('.drawerMenu').eq(0);
    var btnFilter = parentDrawerMenu.next('.btnFilter').removeClass('hidden');

    if (options !== undefined && options.hasOwnProperty('activityMsg')) {
        NavBar.showMsg(options.activityMsg);
    } else {
        NavBar.showMsg();
    }

    // add filter

    if ($(this).hasClass('checkbox-off')) {
        $(this).removeClass('checkbox-off').addClass('checkbox-on');
        var buttonTxt = $(this).text();
        var button = $('<li class="removeable"><a href="#">' + buttonTxt + '</a></li>');
        button.appendTo(btnFilter.find('ul'));
        BtnFilters.init();
        return false;
    }

    // remove filter

    if ($(this).hasClass('checkbox-on')) {
        $(this).removeClass('checkbox-on').addClass('checkbox-off');
        return false;
    }

});

/** drawers.js */

var Drawers = (function() {

    // private functions
    // =================

    function initializeDrawers() {

        /**
         *  Initialize drawers by attaching events and initially close
         *  drawers marked as closed in markup.
         */

        // close certain drawers

        $('.drawer.closed > .body, .drawer.closed > .subDrawers').slideUp(0);

        // attach events to close or open all drawers

        $('[data-action="closeDrawers"]').click(function(e) {
            e.preventDefault();
            closeDrawers();
        });

        $('[data-action="openDrawers"]').click(function(e) {
            e.preventDefault();
            openDrawers();
        });

        // open/close individual drawers

        $('.drawer .header').each(function() {

            // define the event: tap on mobile, click on desktop

            var eventType = Helper.environment('mobile') ? 'tap' : 'click';

            // attach event

            $(this).on(eventType, function(e) {

                e.preventDefault();

                var parentDrawer = $(this).parent('.drawer');
                var hasSubdrawers = $(this).parent('.drawer').find('.subDrawers').length > 0 ? true : false;

                if (parentDrawer.hasClass('closed')) {
                    parentDrawer.removeClass('closed').addClass('open');
                    parentDrawer.find('> .body, .subDrawers').stop().slideDown('fast');
                    return;
                }

                if (parentDrawer.hasClass('open')) {
                    parentDrawer.removeClass('open').addClass('closed');
                    parentDrawer.find('> .body, .subDrawers').stop().slideUp('fast');
                    return;
                }

            });

        });

    }

    function closeDrawers() {

        /**
         *  Close all open drawers in document.
         */

        $('.drawer.open').removeClass('open').addClass('closed').find('.body').slideUp('fast');
    }

    function openDrawers() {

        /**
         *  Open all closed drawers in document.
         */

        $('.drawer.closed').removeClass('closed').addClass('open').find('.body').slideDown('fast');
    }

    // initialize
    // ==========

    initializeDrawers();

    // public functions
    // ================

    return {
        init  : initializeDrawers,
        close : closeDrawers,
        open  : openDrawers
    }

})();

/** filterBtns.js */

var FilterBtns = (function() {

    // private functions
    // =================

    function initializeFilterBtns() {

        /**
         *  Initialize the filter buttons by preparing the dom
         *  and attaching events.
         */

        $('.filterBtns').each(function() {

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

        if ($thisBtn.hasClass('filterBtns__btn--active')) {
            $thisBtn.removeClass('filterBtns__btn--active');
            $thisBtn.removeClass('filterBtns__btn--debounce');
        } else {
            $thisBtn.addClass('filterBtns__btn--active');
            $thisBtn.addClass('filterBtns__btn--debounce');
        }

        if(Helper.foundModule('NavBar'))
            NavBar.showMsg('Filter angewandt.');

    }

    function removeBtnFilter($thisBtn) {

        /**
         *  Remove the button and show an activity message.
         *
         *  @param  {jQuery dom object} $thisBtn - the filter button
         */

        $thisBtn.fadeOut('fast', function() {

            if(Helper.foundModule('NavBar'))
                NavBar.showMsg('Filter angewandt.');

        });

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

    var btnLabelReset = Helper.locale === 'de' ? 'Alle Filter zurücksetzen' : 'Reset All';
    var msgLoading    = Helper.locale === 'de' ? 'Daten werden geladen' : 'Fetching data';

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
         *  Initializes filters. If "$filters" is undefined,
         *  all found ".filters" inside the document will be initialized.
         *  "$filters" must be a jQuery object.
         *
         *  @param {jQuery dom object} $filters - the filters
         */

        if (!($filters instanceof jQuery) || $filters === undefined) {
            $filters = $('.filters');
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

        $thisFiltersFilters.removeClass('filter--active');

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

    function collapseFilterGroup($filterGroup) {

        /**
         *  Collapse a filter group by hiding all inactive filters.
         *  Active filters always stay visible.
         *
         *  @param {jQuery dom object} $filterGroup - the fiter group
         */

        var $thisFilterGroup     = $filterGroup;
        var $thisFilters         = $thisFilterGroup.closest('.filters');
        var $thisFilterGroupBody = $thisFilterGroup.find('.filterGroup__body');

        if ($thisFilterGroup.hasClass('filterGroup--isScroll')) {
            $thisFilterGroupBody.animate({ scrollTop: 0 }, 100);
        }

        $thisFilterGroup.addClass('filterGroup--collapsed');

        $.when($thisFilterGroup.find('.filter:not(.filter--active)').slideUp(200)).then(function() {
            updateAllFilterGroups($thisFilters);
        });

    }

    function expandFilterGroup($filterGroup) {

        /**
         *  Expand a filter group by showing all inactive filters.
         *  Active filters always stay visible.
         *
         *  @param {jQuery dom object} $filterGroup - the fiter group
         */

        var $thisFilterGroup = $filterGroup;
        var $thisFilters     = $thisFilterGroup.closest('.filters');

        $thisFilterGroup.removeClass('filterGroup--collapsed');

        $.when($thisFilterGroup.find('.filter:not(.filter--active)').slideDown(200)).then(function() {
            updateAllFilterGroups($thisFilters);
        });

    }

    function toggleFilterGroup($filterGroup) {

        /**
         *  Expand or collapse a filter group by showing or hiding all inactive filters.
         *  Active filters always stay visible.
         *
         *  @param {jQuery dom object} $filterGroup - the fiter group
         */

        var $thisFilterGroup = $filterGroup;

        if ($thisFilterGroup.data().isCollapsed) {
            expandFilterGroup($thisFilterGroup);
        } else {
            collapseFilterGroup($thisFilterGroup);
        }

    }

    function toggleFilter($filter) {

        /**
         *  Activate or deactivate an individual filter.
         *  The visual change is applied immediately while the actual query
         *  to update the search results and so on gets called with a certain delay.
         *  The delay helps avoiding unexpected behaviour through brute-force / rapid clicking.
         *
         *  @param {jQuery dom object} $filter - the filter
         */

        // cancel if results update is running

        if (loadResultsIsRunning) {
            return false;
        }

        var $thisFilter      = $filter;
        var $thisFilterGroup = $thisFilter.closest('.filterGroup');
        var $thisFilters     = $thisFilter.closest('.filters');

        if ($thisFilter.hasClass('filter--multi')) {
            $thisFilter.toggleClass('filter--active');
        } else if ($thisFilter.hasClass('filter--single')) {
            $thisFilterGroup.find('.filter--single').removeClass('filter--active');
            $thisFilter.addClass('filter--active');
        }

        // axecute after delay

        Helper.setDelay('toggleFilterTimeout', 750, function() {

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

    function toggleResetBtn($filters) {

        /**
         *  Injects or removes a reset button per '.filters' container.
         *  The buttons calls the public reset method and deactivates
         *  all active filter buttons.
         *
         *  @param {jQuery dom object} $filters - the filters
         */

        var $thisFilters       = $filters;
        var totalActiveFilters = $thisFilters.find('.filter--active');

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

    function updateAllFilterGroups($filters) {

        /**
         *  Walk through all filter groups and update some properties.
         *  These properties are booleans like "is this filtergroup expanded or collapsed", etc.
         *  They are stored inside the jQuery data-object of each filter group.
         *
         *  @param {jQuery dom object} $filters - the filters
         */

        var $thisFilters      = $filters;
        var $thisFilterGroups = $thisFilters.find('.filterGroup');

        $thisFilterGroups.each(function() {

            var $thisFilterGroup = $(this);
            var $thisFilterGroupBody = $thisFilterGroup.find('.filterGroup__body');

            // update data

            $thisFilterGroup.data({
                // isScroll      : defined only once on init
                isCollapsed      : $thisFilterGroup.hasClass('filterGroup--collapsed'),
                hasActiveFilters : $thisFilterGroup.find('.filter--active').length > 0
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

    function updateActiveFilters($filters) {
        /**
         *  Todo:
         *  Read all active filters and generate a search url,
         *  Something like "/s/?term=some+search+term&filter=xx".
         *
         *  @param {jQuery dom object} $filters - the filters
         */
    }

    function updateResults($filter, withPriceRange) {

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

        var $thisFilters       = $filter;
        var $thisSearchDisplay = $($thisFilters.data().searchdisplay);
        var $thisRangeInput    = $thisFilters.find('.rangeInput').first();

        // cancel if no search display was found

        if ($thisSearchDisplay.length < 1) return false;

        // execute after delay

        Helper.setDelay('updateResultsTimeout', 500, function() {

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

                        if (withPriceRange && Helper.foundModule('RangeInput')) {

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

    function initializeFlyout() {

        /**
         *  Initialize the flyout menus by preparing the dom and
         *  attaching events.
         */

        $('.flyout').each(function() {

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

    var    $checkBoxWrapper = $('<span class="checkbox"></span>')
        .on('click', function() {
            $(this).find('input').trigger('change');
        });

    var $radioBtnWrapper = $('<span class="radio"></span>')
        .on('click', function() {
            $(this).find('input').trigger('change');
        });

    var $ratingSelect = $('\
        <span class="ratingSelect">\
            <i aria-hidden="true" class="icon--039-s"></i>\
            <i aria-hidden="true" class="icon--039-s"></i>\
            <i aria-hidden="true" class="icon--039-s"></i>\
            <i aria-hidden="true" class="icon--039-s"></i>\
            <i aria-hidden="true" class="icon--039-s"></i>\
        </span>\
    ');

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

        var checkElemns = $(scope + 'input[type="checkbox"]:not(.js-fallback, .switch *), input[type="radio"]:not(.js-fallback, .switch *, .radioBtn *)');
        var checkBoxes  = $(scope + 'input[type="checkbox"]:not(.js-fallback, .switch *)');
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

        $(scope + '.switch').each(function() {

            var $thisSwitch = $(this);

            var options     = Helper.toObject($thisSwitch.data('switch'));
            var    labelOnTxt  = options.labelOn !== undefined ? options.labelOn : 'Ein';
            var labelOffTxt = options.labelOff !== undefined ? options.labelOff : 'Aus';

            var $labelOn    = $('<span class="switch__labelOn">' + labelOnTxt + '</span>');
            var $labelOff   = $('<span class="switch__labelOff">' + labelOffTxt + '</span>');
            var $knob       = $('<span class="switch__knob">');

            $thisSwitch.append($knob, $labelOn, $labelOff);

            $thisSwitch.on('click', function(e) {

                if ($thisSwitch.hasClass('switch--on')) {

                    $thisSwitch.removeClass('switch--on').addClass('switch--off');
                    $thisSwitch.find('input[type="checkbox"]').attr('checked', false);

                } else if ($thisSwitch.hasClass('switch--off')) {

                    $thisSwitch.removeClass('switch--off').addClass('switch--on');
                    $thisSwitch.find('input[type="checkbox"]').attr('checked', true);

                }

            });

        });

        // textareas with max-chars

        $(scope + '[data-maxchars]').each(function() {

            var maxCharacters    = $(this).data('maxchars');
            var characterCount   = $(this).next('[data-characterCount]').html('Noch <b>' + maxCharacters + '</b> Zeichen möglich.');
            var characterCounter = $(this).next('[data-characterCount]').find('b');

            $(this).on('keydown', function(e) {

                var inputLenght = $(this)[0].value.length;

                if(inputLenght >= maxCharacters) {
                    characterCounter.addClass('error');
                    characterCounter.text('0');
                } else {
                    characterCounter.removeClass('error');
                    characterCounter.text(maxCharacters - inputLenght);
                }

            });

        });

        // special rating input element

        $ratingSelect.on('click', function() {
            $(this).toggleClass('locked');
        });

        $ratingSelect.find('i').each(function(index) {

            $(this).on('mouseover', function() {

                var rating = index + 1;
                var ratingSelectElem = $(this).parent();
                var ratingInput = $(this).parent().prev('.ratingInput');

                if (ratingSelectElem.hasClass('locked')) return false;

                ratingSelectElem.attr('class','ratingSelect rated--' + rating);
                ratingInput.val(rating);

            });

        });

        $(scope + '.ratingInput').after($ratingSelect.clone(true));

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

// ===========================================================
//
//        File:    js/hide.js
//        Descr.:    Simple script to hide elements.
//
// ===========================================================

$('[data-hide]').each(function(index){

    // set up vars

    var $this      = $(this),
        $data      = Helper.toObject($this.data('hide')),
        target     = $data.target,
        event      = $data.event !== undefined ? $data.event : 'click',
        transition = $data.transition !== undefined ? $data.transition : false;

    // apply event on trigger and hide target

    $this.on(event, function(e) {
        if (transition === 'fadeOut') {
            $(target).fadeOut();
        } else if (transition === 'slideUp') {
            $(target).slideUp();
        } else {
            $(target).hide();
        }
    });

});

/** imgMagnifier.js */

var ImgMagnifier = (function(){

    // private vars
    // ============

    var $cursor = $('<div class="imgMagnifier__cursor"></div>');
    var $viewer = $('<div class="imgMagnifier__viewer"></div>');

    var startViewerDelayTime = 600;

    // private functions

    function initializeImgMagnifier($imgMagnifiers) {

        /**
         *  Initializes image magnifiers. If "$imgMagnifiers" is undefined,
         *  all found ".imgMagnifier" inside the document will be initialized.
         *  "$imgMagnifiers" must be a jQuery object.
         *
         *  @param {jQuery dom object} $imgMagnifiers - the image magnifier
         */

        if (!($imgMagnifiers instanceof jQuery)) {
            $imgMagnifiers = $('.imgMagnifier');
        }

        $imgMagnifiers.each(function() {

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

    function resetImgMagnifier($imgMagnifiers) {

        /**
         *  Reset all image magnifiers.
         *
         *  @param {jQuery dom object} $imgMagnifiers - all image magnifiers
         */

        if (!($imgMagnifiers instanceof jQuery)) {
            $imgMagnifiers = $('.imgMagnifier');
        }

        $imgMagnifiers.each(function() {

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

        Helper.setDelay('imgMagnifierDelay', startViewerDelayTime, function() {
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

        Helper.clearDelay('imgMagnifierDelay');

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

    function destroyImageMagnifier($imgMagnifiers) {

        /**
         *  Remove all injected elements and detach all events.
         *
         *  @param  {jQuery dom object} $$imgMagnifiers - all image magnifiers
         *  @return {bool false}
         */

        if (!($imgMagnifiers instanceof jQuery)) {
            $imgMagnifiers = $('.imgMagnifier');
        }

        $imgMagnifiers.each(function() {

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

            Helper.clearDelay('imgMagnifierResetDelay');
            Helper.setDelay('imgMagnifierResetDelay', 500, function() {
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

/** microFeeedback.js */

var MicroFeedback = (function() {

    // private vars
    // ============

    var msgSuccess = Helper.locale === 'de' ? 'Danke für Ihre Einschätzung.' : 'Thank you.';

    var $successMsg = $('\
        <span class="microFeedback__msg positive">\
            <i class="icon--011-s" aria-hidden="true"></i>\
            <b>' + msgSuccess + '</b>\
        </span>\
    ');

    // private functions
    // =================

    function initializeMicroFeedback() {

        /**
         *  Initialize by preparing the dom and attaching events.
         */

        $('.microFeedback').each(function() {

            var $thisForm = $(this).find('form');

            // submit form, show msg

            $thisForm.on('submit', function(e) {

                e.preventDefault();

                $thisForm.fadeOut('slow', function() {
                    $successMsg.clone().replaceAll($thisForm);
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

    initializeMicroFeedback();

    // public functions
    // ================

    return {
        init : initializeMicroFeedback
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
    var btnLabelClose = Helper.locale === 'de' ? 'Schließen' : 'Close';

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

    function initializeModal(modalId) {

        /**
         *  Prepare dom elements, target all elements with data-modal attribute,
         *  read modal-related options to override default values/behaviour
         *  and attach a click-event to show the related modal page.
         *
         *  Modal links may have options, provided by a key/value list inside the
         *  data-modal attribute (eg. data-modal="cache:true;").
         *
         *  @option {string} id     - id-selector, eg. "#modal-test"
         *                            To reference modals internally, this script uses generated ids, which
         *                            may be overridden by this option.
         *
         *  @option {string} path   - Path to modal page, eg. "pages/modal_test.html".
         *                            Any element can be linked to a modal. If it's not a link or a link
         *                            with a href that does not link to a modal, the modal path may be
         *                            overridden by this option.
         *
         *  @option {bool} cache    - If true, the referenced modal will preload in the background.
         *
         *  @param {string} modalId - the modal id
         */

        // prepare dom

        $(document.body).append($modalCover.clone().hide());
        $(document.body).append($modalContainer.clone().hide());

        // prepare modal links

        $('[data-modal]').each(function() {

            var $this = $(this);

            var options        = Helper.toObject($this.data('modal'));
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

                        if (Helper.foundModule('CustomFormElements'))
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

            if (Helper.environment('mobile')) {
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
        if (Helper.foundModule('BrowserHistory'))
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

// ===========================================================
//
//        File:    js/pageRewind.js
//        Descr.:    Scroll page back to the very top, animated.
//
// ===========================================================

$('#pageRewind')
    .addClass('inactive')
    .click(function(e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: 0}, 500);
    });

function pageRewind() {
    if ($('body').scrollTop() >= 500) {
        $('#pageRewind').removeClass('inactive');
    } else {
        $('#pageRewind').addClass('inactive');
    }
}

$(window).scroll(function() {
    pageRewind();
});

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

    function initializePieChart() {

        /**
         *  Initialize the pie charts by preparing the dom and attaching events.
         */

        $('[data-piechart]').each(function() {

            var $thisPieChart        = $(this);
            var $thisPieChartRecords = $thisPieChart.find('.pieChart__record');
            var $thisPieChartSvg     = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

            /**
             *  Available options:
             *
             *  @option {string}  baseColor - hsl color as array string, eg: [130,25,50] - default is [208,50,60].
             *                                Sets the base color, used to calculate a unique color for each
             *                                slice of the pie chart.
             *
             *  @option {bool}    highlight - Default is true. Set to false if you wish to disable highlighting individual
             *                                slices on mouse over.
             *
             *  @option {string}  palette   - "fixed" || "random" || "shades" || "unique" - default is "shades".
             *                                Selects the formula used to calculate the unique color for
             *                                each slice of the pie chart.
             *
             *  @option {number}  size      - Sets the diameter of the pie chart SVG.
             */

            var options = Helper.toObject($thisPieChart.data('piechart'));

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

                            Helper.clearDelay('pieChartHightlightDelay');
                            highlightRecord($thisRecord);

                        })
                        .on('mouseleave', function() {

                            Helper.setDelay('pieChartHightlightDelay', 500, function() {
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

        Helper.blink($slices.eq(thisIndex));

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

/** popOvers.js */

var PopOver = (function() {

    // private functions
    // =================

    function initializePopOver() {

        /**
         *  Initializes pop-overs by searching the document for pop-over triggers.
         *  These triggers are identified trough the custom "data-popover" attribute.
         *  The attribute contains a sting with key/value pairs with at least one option:
         *  the target pop-over selector (preferably an #id). Example from markup:
         *
         *      <a href="#" data-popover="target:#pop-overId;">Show a pop-over</a>
         *
         *  Options may be set for each trigger element via more attributes within the same
         *  options string. See the following possible key/values for reference:
         *
         *      @param  {string} target         - The target pop-over id selector.
         *      @option {string} pos            - ['tl','tr','br','bl'] Pop-over position relative to trigger. The default is 'tr'.
         *      @option {string} ref            - ['tl','tr','br','bl'] Pop-over reference point. The default is 'tl'.
         *      @option {string} toggleClass    - Css class name added to trigger if pop-over is currently shown.
         *      @option {string} eventShow      - ['click','dblclick','contextmenu','mouseover', 'mouseout', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'] Defines the event to show the pop-over. The default is mouseenter.
         *      @option {string} eventHide      - ['click','dblclick','contextmenu','mouseover', 'mouseout', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'] Defines the event to hide the pop-over. The default is mouseleave.
         *      @option {bool}   preventDefault - If true, the trigger’s default event (eg. click) gets prevented. The default is true.
         *
         *  Example from markup:
         *
         *      <a href="#" class="btn" data-popover="target:#pop-overId; pos:bl; toggleClass:btn--active;">Show a pop-over</a>
         *
         */

        $('[data-popover]').each(function() {

            // reference the popover trigger

            var $thisPopOverTrigger = $(this);

            // read the options

            var options = Helper.toObject($thisPopOverTrigger.data('popover'));

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
                    removeToggleClassFromPopOverTriggers();
                    showPopOver($thisPopOverTrigger, $thisPopOver);

                })
                .on(eventHide, function(e) {

                    if (preventDefault !== 'false') e.preventDefault();

                    Helper.clearInterval('popOverShowTimeout');
                    hidePopOver($thisPopOverTrigger, $thisPopOver);

                });

            // attach events to pop-over

            $thisPopOver
                .on('mouseenter', function() {
                    Helper.clearInterval('popOverHideTimeout');
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

        Helper.setDelay('popOverShowTimeout', 100, function() {

            // if this option is set, add the provided css class name
            // to the trigger element

            var options = Helper.toObject($thisPopOverTrigger.data('popover'));

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

        Helper.setDelay('popOverHideTimeout', 500, function() {
            $thisPopOver.hide();
            removeToggleClassFromPopOverTriggers();
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
            var options = $thisPopOverTrigger.data('popover');

            if (options.toggleClass !== undefined) {
                var cssClassName = options.toggleClass;
                $thisPopOverTrigger.removeClass(cssClassName);
            }

        });

        // clear the hide interval,
        // then hide all pop-overs

        Helper.clearInterval('popOverHideTimeout');
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

        var options = Helper.toObject($thisPopOverTrigger.data('popover'));

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
    
    function removeToggleClassFromPopOverTriggers() {
        
        $('[data-popover]').each(function() {
            
            // reference the popover trigger

            var $thisPopOverTrigger = $(this);

            // read the options

            var options = Helper.toObject($thisPopOverTrigger.data('popover'));
            
            // if this option is set, remove the provided css class name
            // from the trigger element

            var options = Helper.toObject($thisPopOverTrigger.data('popover'));

            if (options.toggleClass !== undefined) {
                $thisPopOverTrigger.removeClass(options.toggleClass);
            }
            
        });
        
    }

    // initialize
    // ==========

    initializePopOver();

    // public functions
    // ================

    return {
        init    : initializePopOver,
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

    function initializeRadioBtns() {

        /**
         *  Initialize all radio buttons by preparing the dom
         *  and attaching events.
         */

        $('.radioBtn').has('input[type="radio"]').each(function() {

            var $thisBtn = $(this);

            $thisBtn.find('input[type="radio"]').hide();
            $thisBtn.prepend($icon.clone());

            // prevent default event of <label>

            $thisBtn.find('label').on('click', function(e) {
                e.preventDefault();
            });

            // bind event to button

            $thisBtn.on('click', function(e) {
                e.preventDefault();
                activateRadioBtn($thisBtn);
            });

        });

    }

    function activateRadioBtn($thisBtn) {

        /**
         *  Switch a radio button to "active".
         *
         *  @param  {jQuery object} $thisbtn - the button
         */

        var $icon       = $thisBtn.find('[class^="icon"]');
        var $radioInput = $thisBtn.find('input[type="radio"]');
        var groupName   = $radioInput.attr('name');

        // reset all other buttons first

        $('input[name="' + groupName + '"]').closest('.radioBtn').removeClass('radioBtn--active');
        $('input[name="' + groupName + '"]').removeAttr('checked');

        // activate this button

        $radioInput.prop('checked', true);
        $radioInput.attr('checked', 'checked');
        $thisBtn.addClass('radioBtn--active');

        // blink the icon

        Helper.blink($icon);

    }

    // initialize
    // ==========

    initializeRadioBtns();

    // public functions
    // ================

    return {
        init : initializeRadioBtns
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

    function initializeRangeInput($rangeInputs) {

        /**
         *  Initializes range inputs. If "$rangeInputs" is undefined,
         *  all found ".rangeInput" inside the document will be initialized.
         *  "$rangeInputs" must be a jQuery object.
         *
         *  @param {jQuery dom object} $rangeInputs - the range inputs
         */

        if (!($rangeInputs instanceof jQuery)) {
            $rangeInputs = $('.rangeInput');
        }

        $rangeInputs.each(function() {

            // gather dom elements

            var $documentBody = $('body');
            var $thisRangeInput = $(this);

            // options

            var options = Helper.toObject($thisRangeInput.data('rangeinput'));

            /**
             *  Available options:
             *
             *  @option {number}  absMin - absolut min value
             *  @option {number}  absMax - absolut max value
             *  @option {number}  min    - initial min value
             *  @option {number}  max    - initial max value
             *  @option {string}  unit   - a symbol for the unit ("$", "mm", etc.) as postfix for .rangeInput__label)
            */

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

        if (Helper.foundModule('Filters')) {

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

// ===========================================================
//
//        File:    js/remove.js
//        Descr.:    Remove an element from the dom.
//        Status:    Done.
//
// ===========================================================

(function() {

    var parentElements = '.dataElement, .item';

    $('[data-action="remove"]').each(function() {

        var $this = $(this);
        var    $thisParent = $this.parents(parentElements);

        $this.on('click', function(e) {

            e.preventDefault();
            $thisParent.fadeOut(function(){
                $thisParent.remove();
            });

        });

    });

})();

// ===========================================================
//
//        File:    js/reveal.js
//        Descr.:    Simple script to reveal hidden elements.
//
// ===========================================================

$('[data-reveal]').each(function(index){

    // set up vars

    var $this      = $(this);
    var $data      = Helper.toObject($this.data('reveal'));

    var target     = $data.target !== undefined ? $data.target : false;
    var event      = $data.event !== undefined ? $data.event : 'click';
    var transition = $data.transition !== undefined ? $data.transition : false;
    var hideTarget = $data.hideTarget !== undefined ? $data.hideTarget : true;

    // cancel if no target was defined

    if (!target) return false;

    // hide target elements first

    if (hideTarget) $(target).hide();

    // apply event on trigger and reveal target

    $this.on(event, function(e) {
        if (transition === 'fadeIn') {
            $(target).fadeIn();
        } else if (transition === 'slideDown') {
            $(target).slideDown();
        } else {
            $(target).show();
        }
    });

});

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

    function initializeScrollTo() {

        /**
         *  Initialize by attaching events.
         */

        $('[data-scrollTo]').on('click', function(e) {
            
            var $thisTrigger = $(this);
            var targetId     = $thisTrigger[0].hash;

            // scroll to anchor if target element is found

            if ($(targetId).length) {
                e.preventDefault();
                scrollToTarget(targetId, $thisTrigger);
            }

        });

    }

    function scrollToTarget(targetId, $thisTrigger) {

        /**
         *  Scroll the page to a given target element.
         *
         *  @param  {string} targetId  - the target element css id (e.g. "#myTarget")
         *  @option {string} highlight - define an optional effect to highlight the target element once
         *                               the scrolling has stopped. chose from "blink" and "pulse".
         */
        
        var $target              = $(targetId);
        var $scrollContext;
        var $scrollContainer     = $target.closest('.scrl-y');
        var targetFound          = $target.length > 0 ? true : false;
        var scrollContainerFound = $scrollContainer.length > 0 ? true : false;
        var scrollPosY;
        var options              = Helper.toObject($thisTrigger.data('scrollto'));

        // cancel if no target was found
        
        if (!targetFound) return false;

        // if target is a tab, switch to the tab

        if ($(targetId).hasClass('tabs__page') && Helper.foundModule('Tabs')) {
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
            if (options.highlight === "blink") Helper.blink($target);
            if (options.highlight === "pulse") Helper.pulse($target);
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

/** shoppingList.js */

var ShoppingList = (function() {

    // private vars
    // ============

    var $listCounter = $('#listCounter');
    var $coin        = $('<i aria-hidden="true" class="icon--004-s"></i>');
    var listCounterValue;

    // private functions
    // =================

    function initializeShoppingList() {

        /**
         *  Initialize the shopping list (aka "Merkzettel").
         */

        $('[data-action="addToList"]').each(function() {

            var $thisBtn      = $(this);
            var thisCoinSound = new Audio('assets/audio/coin.wav');

            // Since we inject another icon, the width changes.
            // We need to fix it simply to make sure the button
            // keeps a square aspect ratio. Unfortunately, this
            // is rather ugly.

            var hasNoLabel = $thisBtn.has('.hidden').length > 0;

            if (hasNoLabel)                                     $thisBtn.css('width','2.5rem');
            if (hasNoLabel && $thisBtn.hasClass('btn--small'))  $thisBtn.css('width','2rem');
            if (hasNoLabel && $thisBtn.hasClass('btn--medium')) $thisBtn.css('width','3rem');
            if (hasNoLabel && $thisBtn.hasClass('btn--large'))  $thisBtn.css('width','4rem');

            // inject the coin

            $thisBtn.append($coin.clone());

            // attach event

            $thisBtn.on('click', function(e) {
                e.preventDefault();
                toggleAddToListBtn($thisBtn, thisCoinSound);
            });

        });

    }

    function toggleAddToListBtn($thisBtn, thisCoinSound) {

        /**
         *  Toggle the add-to-list button state.
         *
         *  @param {jQuery dom object} $thisBtn - the button
         *  @param {}  -
         */

        if ($thisBtn.hasClass('btn--success')) {

            thisCoinSound.pause();
            thisCoinSound.currentTime = 0;
            $thisBtn.removeClass('btn--success');
            decreaseListCounter();

        } else {

            thisCoinSound.play();
            $thisBtn.addClass('btn--success');
            increaseListCounter();

        }

    }

    function increaseListCounter() {

        /**
         *  Add 1 to item counter.
         */

        var amount = $listCounter.text() * 1;
        ++amount;

        setListCounter(amount);

    }

    function decreaseListCounter() {

        /**
         *  Substract 1 from item counter.
         */

        var amount = $listCounter.text() * 1;

        if (amount > 0) {
            --amount;
            setListCounter(amount);
        }

    }

    function setListCounter(amount) {

        /**
         *  Set the counter to a given amount.
         *
         *  @param {number}  amount - the amount
         */

        if (typeof amount === 'number' && (amount % 1) === 0) {

            $listCounter.text(amount)
            Helper.blink($listCounter);
            listCounterValue = $listCounter.text() * 1;

            if (listCounterValue > 0) {
                $listCounter.addClass('badge--dark');
            } else {
                $listCounter.removeClass('badge--dark');
            }

        }

    }

    // initialize
    // ==========

    initializeShoppingList();

    // public functions
    // ================

    return {
        init      : initializeShoppingList,
        setCount  : setListCounter,
        countUp   : increaseListCounter,
        countDown : decreaseListCounter
    }

})();

// ===========================================================
//
//        File:    js/shoppingWidgets.js
//        Descr.:    Toggle shopping widgets.
//
// ===========================================================

// set up

var quickListShowDelay = 150,
    quickListHideDelay = 500;

var cartWidget = $('#cartWidget').not('.status-empty'),
    quickList = $('#cartWidget-quicklist');

quickList.hide();

// events

cartWidget
    .on('touchstart',function() {
        cartWidget.off();
    })
    .on('mouseover',function(e) {
        e.preventDefault();
        delayShowCartWidget('start');
        delayHideCartWidget('stop');
    })
    .on('mouseout',function(e) {
        e.preventDefault();
        delayShowCartWidget('stop');
        delayHideCartWidget('start');
    });

quickList
    .on('mouseover',function() {
        delayHideCartWidget('stop');
    })
    .on('mouseout',function() {
        delayHideCartWidget('start');
    });

// functions

function delayShowCartWidget(action,button) {

    if (action === 'start') {

        Helper.setInterval('delayShowCartWidgetTimeout', 500, function() {
            cartWidget.addClass('active');
            quickList.slideDown('fast');
        });

    } else if (action === 'stop') {

        Helper.clearInterval('delayShowCartWidgetTimeout');

    }

}

function delayHideCartWidget(action,button) {

    if (action === 'start') {

        Helper.setInterval('delayHideCartWidgetTimeout', 500, function() {
            quickList.slideUp('fast',function() {
                cartWidget.removeClass('active');
            });
        });

    } else if (action === 'stop') {

        Helper.clearInterval('delayHideCartWidgetTimeout');

    }

}

/** slider.js */

var Slider = (function() {

    // private vars
    // ============

    var slideAutoplayIntervals = {};
    var btnLabelNext = Helper.locale === 'de' ? 'weiter' : 'next';
    var btnLabelPrev = Helper.locale === 'de' ? 'zurück' : 'previous';

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

    function initializeSliders() {

        /**
         *  Initialize the sliders.
         */

        $('[data-slider]').each(function(sliderId) {

            // references to dom elements

            var $thisSlider        = $(this);
            var    $thisSlides        = $thisSlider.find('.slider__slide');
            var $thisSlidesWrapper = $thisSlider.find('.slider__slides');

            // attach data to slider instance

            $thisSlider.data().slideIndex  = 0;
            $thisSlider.data().totalSlides = $thisSlides.length;

            // slider instance variables

            var slideIndex  = $thisSlider.data().slideIndex;
            var totalSlides = $thisSlider.data().totalSlides;

            // slider instance options

            var options = Helper.toObject($thisSlider.data('slider'));

            /**
             *  Available options:
             *
             *  @param {number}  autoplay   - interval in miliseconds to change the slides automatically
             *  @param {bool}    clickable  - click on a slide to switch to the next side
             *  @param {string}  controls   - keyword for the controls to add ["pageBtns" || "pageFlip" || "pageFlip--inset" || "pageDots" || "pageDots--dark" || "pageDots--subtle"]
             *  @param {bool}    swipeable  - change the slide on swipe left/right
             *  @param {string}  transition - keyword for slide transition ["animate" || "fade"]
             */

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
                    stopAutoplay(sliderId);
                    showSlide($thisSlider, 'next');
                });

                $thisSlider.find('[class*="btnPrev"]').on('click', function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderId);
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
                        stopAutoplay(sliderId);

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
                    stopAutoplay(sliderId);
                    showSlide($thisSlider, 'next');
                });

            }

            // attach events if "swipeable"

            if (options.swipeable) {

                $(this).on('swipeleft', function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderId);
                    showSlide($thisSlider, 'next');
                });

                $(this).on('swiperight',function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderId);
                    showSlide($thisSlider, 'prev');
                });

            }

            // enable auto play

            if (options.autoplay !== undefined) {
                slideAutoplayIntervals[sliderId] = window.setInterval(function(){
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

        var    $thisSlides        = $thisSlider.find('.slider__slide');
        var $thisSlidesWrapper = $thisSlider.find('.slider__slides');

        var totalSlides        = $thisSlider.data().totalSlides;
        var slideIndex         = $thisSlider.data().slideIndex;
        var options            = Helper.toObject($thisSlider.data('slider'));
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

        var    $thisSlides       = $thisSlider.find('.slider__slide');

        var options           = Helper.toObject($thisSlider.data('slider'));
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

    function stopAutoplay(sliderId) {

        /**
         *  Stop the auto play.
         *
         *  @param {string} sliderId - the slider css id (e.g. "#mySlider")
         */

        window.clearInterval(slideAutoplayIntervals[sliderId]);
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

        var    $thisSlides        = $thisSlider.find('.slider__slide');
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

    initializeSliders();

    // public functions
    // ================

    return {
        init : initializeSliders,
        show : showSlide
    };

})();

/** stepper.js */

var Stepper = (function() {

    // private vars
    // ============

    var btnLabelMore = Helper.locale === 'de' ? 'mehr'    : 'more';
    var btnLabelLess = Helper.locale === 'de' ? 'weniger' : 'less';

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

    function initializeStepper() {

        /**
         *  Initialize by preparing the dom and attaching events.
         */

        $('.stepper').each(function() {

            var $this = $(this);

            $this.prepend($stepperBtns.clone());

            // attach events

            var eventType = Helper.environment('mobile') ? 'tap' : 'click';

            $this.find('.stepper__btnPlus').on(eventType,function(e) {
                e.preventDefault();
                increaseItemCount($this);
            });

            $this.find('.stepper__btnMinus').on(eventType,function(e) {
                e.preventDefault();
                decreaseItemCount($this);
            });

            $this.find('.stepper__input').blur(function() {
                checkInput($this);
            });

            $this
                .on('swipeleft', function(e) {
                    decreaseItemCount($this);
                })
                .on('swiperight', function(e) {
                    increaseItemCount($this);
                });

        });

    }

    function increaseItemCount($targetElem) {

        /**
         *  Increase the item count.
         *
         *  @param  {jQuery dom object} $targetElem - the btn input combo element
         *  @return {bool false}
         */

        checkInput($targetElem);

        var currentValue = $targetElem.find('.stepper__input')[0].value;

        if (currentValue >= 0) {
            currentValue++;
            $targetElem.find('input')[0].value = currentValue;
        }

        return false;

    }

    function decreaseItemCount($targetElem) {

        /**
         *  Decrease the item count
         *
         *  @param  {jQuery dom object} $targetElem - the .stepper element
         *  @return {bool false}
         */

        checkInput($targetElem);

        var currentValue = $targetElem.find('.stepper__input')[0].value;

        if (currentValue > 1) {
            currentValue--;
            $targetElem.find('input')[0].value = currentValue;
        }

        return false;

    }

    function checkInput($targetElem) {

        /**
         *  Check the .stepper input element.
         *
         *  @param  {jQuery dom object} $targetElem - the .stepper element
         *  @return {bool false}
         */

        var $txtField = $targetElem.find('.stepper__input');
        var $input    = $targetElem.find('.stepper__input')[0].value;

        if (!$input.match(/^[0-9]+$/)) {
            $txtField.addClass('input--error');
        } else {
            $txtField.removeClass('input--error');
        }

        return false;

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

// ===========================================================
//
//        File:    js/stickyElements.js
//        Descr.:    Stick elements to position when they reach top
//                of viewport (through scrolling).
//
// ===========================================================

var stickyElements = $('.sticky');
var stickyElementsAttr = [];

stickyElements.each(function() {

    var    prevMargin = $(this).prev().length > 0 ? $(this).prev().css('marginBottom').split('px')[0] : 0,
        itemOffset = $(this).offset().top + prevMargin * 2;
    itemWidth = $(this).outerWidth();
    itemHeight = $(this).outerHeight();

    stickyElementsAttr.push([ itemOffset,itemWidth,itemHeight ]);

});

function stickItems() {

    // TODO: make sure sticky item scrolls out of viewport
    // once it reached it's parent's bottom

    var bodyOffset = $('body').scrollTop(),
        bodyHeight = $(window).height();

    stickyElements.each(function(index,value) {

        var    elementOffset = stickyElementsAttr[index][0],
            elementHeight = stickyElementsAttr[index][2],
            elementWidth = stickyElementsAttr[index][1];

        var    scrolledPastElementPosition = bodyOffset >= elementOffset - 140,
            viewportIsLargerThanMenu = bodyHeight > elementHeight;

        var placeHolder = $('<div>',{
            'class': 'stickyPlaceholder',
            'css': {
                'height': elementHeight,
                'width': elementWidth,
                'background': 'transparent'
            }
        });

        if (scrolledPastElementPosition && viewportIsLargerThanMenu) {

            if (!$(this).next().hasClass('stickyPlaceholder')) {
                $(this).after(placeHolder);
            }
            $(this).css({
                'width': elementWidth,
                'position': 'fixed',
                'top': 140,
                'zIndex': 100
            });

        } else {

            $(this).next('.stickyPlaceholder').remove();
            $(this).css({
                'width': '',
                'position': '',
                'top': '',
                'zIndex': ''
            });

        }

    });

}

$(window).scroll(function() {
    stickItems();
});

// ===========================================================
//
//        File:    js/stickyTeasers.js
//        Descr.:    -
//
// ===========================================================

var closeStickyTeaserBtn = $('<button class="btn btn--subtle pos-tr">\
                                  <span class="hidden">schliessen</span>\
                                  <i class="icon--006-s" aria-hidden="true"></i>\
                              </button>');

$('.stickyTeaser').each(function() {

    var that = $(this);
    var closeBtn = closeStickyTeaserBtn.clone();

    closeBtn.on('click', function(e){
        e.preventDefault();
        that.addClass('removed');
    });

    that.append(closeBtn);

});

// ===========================================================
//
//        File:    js/suggestedBundle.js
//        Descr.:    Toggle elements in .suggestedBundle.
//
// ===========================================================

$('.suggestedBundle').each(function() {

    $(this).find('input[type="checkbox"]').change(function() {

        // manipulate list

        $(this).closest('label')
            .find('span').eq(1)
            .toggleClass('inactive');

        $(this).closest('label')
            .find('span').eq(2)
            .toggleClass('inactive');

        // manipulate packshots

        var itemIndex = $(this).parent().parent().index();
        $('.packshots li').eq(itemIndex).fadeToggle();

    })

});

/** tables.js */

var Table = (function() {

    // private vars
    // ============

    var btnLabelRemove = Helper.locale === 'de' ? 'Entfernen' : 'Remove';

    var $removeBtn = $('\
        <button class="btn btn--subtle btn--rounded">\
            <span class="hidden">' + btnLabelRemove + '</span>\
            <i class="icon--006-s" aria-hidden="true"></i>\
        </button>\
    ');

    // private functions
    // =================

    function initializeTables() {

        /**
         *  Get all tables with custom data-attribute and
         *  enhance functionality.
         */

        $('[data-table]').each(function(){

            var $thisTable = $(this);
            var options    = Helper.toObject($thisTable.data('table'));

            /**
             *  Available options:
             *
             *  @param {bool}           removeable   - removeable table rows
             *  @param {bool || string} selectable   - if set to true – single table rows can be selected, if set to "multi" – multiple table rows can be selected
             */

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

        var options    = Helper.toObject($thisTable.data('table'));

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

    initializeTables();

    // public functions
    // ================

    return {
        init      : initializeTables,
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

            if (Helper.foundModule('ScrollTo') && urlTabId !== '')
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
         *  @param {string} thisTargetTabId - target tab css id selector (e.g. "#myTab")
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

    function initializeToggleGroup() {

        /*
            Initialize.
        */

        $('[data-toggle]').each(function(index) {

            var $thisTrigger      = $(this);

            var options           = Helper.toObject($thisTrigger.data('toggle'));
            var target            = options.target;
            var group             = options.group;
            var event             = options.event !== undefined ? options.event : 'mouseover';
            var activeClassName   = options.activeClassName;

            var $thisFallBackElem = $('[data-toggle-fallback="' + group + '"]');

            /**
             *  Available options:
             *
             *  @option {string} target          - Selector for target element.
             *  @option {string} group           - A unique string to group toggle elements.
             *  @option {string} activeClassName - To highlight an "active" trigger, this
             *                                     CSS class name is added to the trigger.
             */

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
                        Helper.clearDelay('resetToggleTimeout');
                    })
                    .on('mouseleave', function() {
                        Helper.setDelay('resetToggleTimeout', resetToggleDelayTime, function(){
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

        var options           = Helper.toObject($thisTrigger.data('toggle'));
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

        var options           = Helper.toObject($thisTrigger.data('toggle'));
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

    function initializeTooltip(scope) {

        /**
         *  Initialize the tool tips.
         *
         *  @param  {string} scope - css selector
         */

        // set css-selector to either target all tool tip related elements
        // or only the ones in a specified scope (e.g. #myContainer [data-tooltip="..."])

        if (scope === undefined) {
            scope = '';
        } else {
            scope += ' ';
        }

        $(scope + '[data-tooltip]').each(function() {

            // set up vars

            var $this     = $(this);
            var options   = Helper.toObject($this.data('tooltip'));
            var $target   = options.target !== undefined ? $(options.target) : $this.find('.tooltip');
            var character = (options.character !== undefined && !icon) ? options.character : '?';
            var $trigger;

            // prepare the trigger element

            $trigger = prepareTrigger($this);

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

        var options            = Helper.toObject($thisTrigger.data('tooltip'));
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

            Helper.setDelay('tooltipShowDelay', showDelayDuration, function(){
                $thisTarget.fadeIn(200);
            });


        } else if (action === 'stop') {

            Helper.clearDelay('tooltipShowDelay');

        }

    }

    function hideWithDelay(action) {

        /**
         *  Hide a tool tip with delay.
         *
         *  @param {string} action - keyword, "start" || "stop"
         */

        if (action === 'start') {

            Helper.setDelay('tooltipHideDelay', hideDelayDuration, function(){
                $('.tooltip').hide()
            });


        } else if (action === 'stop') {

            Helper.clearDelay('tooltipHideDelay');

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
