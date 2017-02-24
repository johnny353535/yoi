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
        
        getAttribute : function($element) {
            
            /**
             *  Searches for custom "yoi-*" attributes inside an alement's markup
             *  and returns the value of the first matching attribute.
             *
             *  @param  {jQuery dom object} $element
             *  @return {string}            yoiAttributeValue - the attribute's content / value
             */
        
            var yoiAttributeValue;
        
            $.each($element[0].attributes, function(index, attribute) {
                if (attribute.name.match('^yoi-')) {
                    yoiAttributeValue = attribute.value;
                    return false;
                }
            });
            
            return yoiAttributeValue;
            
        },
        
        setOptions : function($element, options) {
            
            /**
             *  Attaches options directly to each $element via jQuery's data() method.
             *  Options are either retrieved via the options-parameter or (if undefined)
             *  read from markup.
             *
             *  Note: If a key/value is already set, it won't be changed.
             *
             *  @param {jQuery dom object} $element
             *  @param {object}            options
             */
            
            // create options object
            
            if ($element.data().options === undefined)
                $element.data().options = {};
            
            if (options === undefined) {
                
                // if the options parameter is omitted on function call, read the
                // options from the element's yoi-* attribute
                
                var options = YOI.toObject(YOI.getAttribute($element));
                
            }
            
            if (typeof options === 'object') {
                
                // if options is a valid object, attach the options to
                // the element via jQuery's data() function
                
                $.each(options, function(key, value) {
                    $element.data().options[key] = value;
                });
                
            }
    
        },
        
        createCollection : function(identifier, $element, options) {
            
            /**
             *  Create or add to a collection of jQuery objects. Passes and attaches options
             *  via YOI.setOptions().
             *
             *  @param  {} identifier - the string to select elements from the dom via
             *                          custom yoi-{identifier} attribute
             *  @param  {} $element   - jQuery element, optional
             *  @param  {} options    - options, optional
             *  @return {} object     - the jQuery element collection
             */
            
            // if it does not exist, create a new collection of jQuery objects
            
            if (YOI.elementCollection[identifier] === undefined)
                YOI.elementCollection[identifier] = $([]);
            
            if (!($element instanceof jQuery)) {
        
                // if the createCollection() is called without a valid matching jQuery element,
                // gather the matching elements from the dom
        
                YOI.elementCollection[identifier] = $('[yoi-' + identifier + ']');
                
                // if no elements are found, return false ...
                
                if (!YOI.elementCollection[identifier].length) return false;
        
                // ... otherwise add data (eg. options) to each element in the collection
                
                YOI.elementCollection[identifier].each(function() {
                    YOI.setOptions($(this), options);
                });
        
            } else if ($element instanceof jQuery) {
        
                // if the createCollection() is called with a valid matching jQuery element,
                // set it's options and add it to the element collection
        
                YOI.setOptions($element, options);
                YOI.elementCollection[identifier] = YOI.elementCollection[identifier].add($element);
            
            }
            
            return YOI.elementCollection[identifier];
        
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

// create an object to store jQuery
// element collections

YOI.elementCollection = {};
