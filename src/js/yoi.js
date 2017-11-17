/** yoi.js */

var YOI = {
    
    // create empty objects to store jQuery
    // element collections

    elementCollection : {},
    action            : {},
    behaviour         : {},
    component         : {},
    module            : {},

    // helpers

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

        if (!input || !searchString) return false;

        // check for substring

        if (input.indexOf(searchString) > -1) {
            return true;
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
        var digits = digits || 1;
        var i = 1;
        var leadingZeros = '0';

        while (i < digits) {
            i++;
            leadingZeros += '0';
        }

        return (leadingZeros + num).slice(-digits-1);

    },

    foundModule : function(module) {

        /**
         *  Syntax sugar to test if a module is available.
         *
         *  @param  {string} module - the exact name of the module variable
         *  @return {bool}
         */

        if (typeof window.YOI.module[module] === 'object') {
            return true;
        } else {
            return false;
        }

    },

    foundComponent : function(component) {

        /**
         *  Syntax sugar to test if a component is available.
         *
         *  @param  {string} component - the exact name of the component variable
         *  @return {bool}
         */

        if (typeof window.YOI.component[component] === 'object') {
            return true;
        } else {
            return false;
        }

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
         *  foo:'something';
         *  foo:'some:thing:with:colons';
         *  foobar; foo:bar;
         *  foo:bar; foobar;
         *  foo; bar; foobar;
         *  ...
         *
         *  @param  {string} input                      - the input to process, see example above
         *  @return {object || bool false} properObject - a proper JS object notation
         */

        var keyValuePair;
        var properObject = {};
        
        if (YOI.stringContains(input, ':') || YOI.stringContains(input, ';')) {
        
            // set the start- and end-markers for values
        
            var valueStartMarker;
            var keyValuePairEndMarker;
        
            if (YOI.stringContains(input, "'") && YOI.stringContains(input, ';')) {
                
                // at least one value is wrapped in single
                // quotation marks (to escape certain characters)
                
                valueStartMarker      = ":'";
                keyValuePairEndMarker = "';";
                
            } else {
                
                // no single quotation marks found
                
                valueStartMarker      = ':';
                keyValuePairEndMarker = ';';
                
            }

            // clean up input, replace multiple whitespace characters with a single white space
            // eg. "    " is turned into " "
            
            input = (input || '').replace(/\s+/g,' ').split(keyValuePairEndMarker);

            // since the last item in the resulting array will always be an empty string, restrict
            // the for-loop to input.length - 1
            
            for (var i = 0; i < input.length - 1; i++) {
                
                // create key/value pairs

                keyValuePair = input[i].split(valueStartMarker);

                if (keyValuePair.length === 1) {

                    // If there is only a single string instead of a key/value pair,
                    // create the key "action" and assign the value of the given string.

                    properObject['action'] = input[0];

                } else if (keyValuePair.length === 2) {

                    // If there is a proper key/value pair, add it to the properObject.

                    properObject[keyValuePair[0].trim()] = keyValuePair[1].trim();
                    
                }

            }
            
            return properObject;
        
        } else {

            return false;

        }

    },
    
    toBoolean : function(input) {
        
        /**
         *  Takes a string, interprets a boolean value and
         *  returns true or false. If no input was given,
         *  the function returns true.
         *
         *  @param  {string} input - the string to interpret
         *  @return {bool} 
         */
        
        if (!input) return true;
        
        switch (input.toLowerCase()) {
            case "false":
            case "no":
            case "0":
            case "":
                return false;
            default:
                return true;
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

    hide : function($target) {

        /**
         *  Hides an element which has a Yoshino UI-Core display utility class like
         *  d-block, d-inline, d-inlineblock. The script remembers the display class and
         *  puts it back, once YOI.show() gets called.
         *
         *  @param {number} $target - the jQuery target dom element
         */

        // cancel if $target is no valid jQuery onject

        if (!($target instanceof jQuery)) {
            return false;
        }

        // get the display utility class

        if ($target.hasClass('d-block')) {
            $target.data('displayUtilityClass', 'd-block');
        } else if ($target.hasClass('d-inline')) {
            $target.data('displayUtilityClass', 'd-inline');
        } else if ($target.hasClass('d-inlineblock')) {
            $target.data('displayUtilityClass', 'd-inlineblock');
        }

        // remove all display utility classes

        $target.removeClass('d-block d-inline d-inlineblock');

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
        
        if (!$target.data().hasOwnProperty('displayUtilityClass')) {

            // if $target's data('displayUtilityClass') is undefined,
            // fall back to jQuery's $.show() method

            $target.show();

        } else {

            // if $target does have data('displayUtilityClass'),
            // re-assign the stored utility class in order to show the target

            $target.addClass($target.data('displayUtilityClass'));

        }

    },

    isNumber : function(inputVal) {
        
        /**
         *  Returns TRUE if the input is a whole, positive number (= natural number).
         *
         *  @param {string} inputVal - the input value
         */
        
        var pattern = /^(0|([1-9]\d*))$/;
        var testVal;
        
        // convert input value
        
        if (typeof inputVal !== "string") {
            testVal = inputVal.toString();
        } else {
            testVal = inputVal;
        }
        
        // return test outcome
        
        return pattern.test(testVal);
        
    },
    
    noFocus : function() {
        
        /**
         *  Returns true if the document's active element is the BODY -
         *  which means that no other element has focus.
         *
         *  @return {bool} 
         */
        
        return document.activeElement.tagName === 'BODY';
        
    },
    
    throttle : function(targetFunction, delay) {

        /**
         *  Throttles the execution of a given function
         *  (targetFunction) to a certain interval (delay).
         *
         *  @param  {function} targetFunction - the function to throttle
         *  @param  {number}   delay          - the delay/interval in ms
         *  @return {function}
         */

        var snapshot = Date.now();

        return function() {
            if ((snapshot + delay - Date.now()) < 0) {
                targetFunction();
                snapshot = Date.now();
            }
        }

    },
    
    validBreakpoint : function(keyword) {
        
        /**
         *  Checks if a given breakpoint name (keyword) is in the YOI
         *  breakpoint array (validBreakPoints).
         *
         *  @param  {string} keyword - the breakpoint name to test for
         *  @return {bool}
         */
        
        var validBreakPoints = [
            'small',
            'medium',
            'large',
            'xlarge'
        ];
        
        var position = $.inArray(keyword, validBreakPoints);
        
        return (position >= 0);
        
    },

    // global attributes

    environment : function(envName) {

        /**
         *  Read and return the "yoi-environment" attribute of a page or check
         *  for a given envName.
         *
         *  @param  {string} envName - the environment name to check for
         *  @return {string | bool}  - a) the page environment string (eg. "mobile")
         *                             b) checks against the given envName parameter
         *                                and returns true/false
         */
        
        var defaultEnvironment = 'desktop';
        var currentEnvironment = $('body').attr('yoi-environment') || defaultEnvironment;
    
        if (!envName) {
            return currentEnvironment;
        } else {
            return $('body').attr('yoi-environment') === envName;
        }

    },

    locale : function(language) {

        /**
         *  Read and return the "lang" attribute of a page or check
         *  for a given language.
         *
         *  @return {string}        - the page language as ISO language code
         *  @return {string | bool} - a) the page language as ISO language code
         *                            b) checks against the given language parameter
         *                               and returns true/false
         */
        
        var defaultLanguage = 'en';
        var currentLanguage = $('html').attr('lang') || defaultLanguage;
    
        if (!language) {
            return currentLanguage;
        } else {
            return $('html').attr('lang') === language;
        }

    },

    currentBreakPoint : function() {

        /**
         *  Read and return the currently active media-query.
         *
         *  @return {string} - the active media query name
         */

        return window.getComputedStyle(document.body,':after').getPropertyValue('content').replace(/\"/g, '');

    },

    // animations & fx

    blink : function($elem, times) {

        /**
         *  Blink animation.
         *
         *  @param  {jQuery dom object} $elem - the element to blink
         *  @param  {number} times            - number of times the animation gets played, default is 2
         *  @return {bool false}              - return false if elem is not a jQuery dom object
         */
        
        // cancel if $elem is not a jQuery object

        if (!($elem instanceof jQuery)) return false;
        
        // set times to default value
        
        var times = times || 2;
        
        // stop the element animation first
        
        $elem.stop(true, true);
        
        // run the blink animation
        
        for (var i = 0; i < times; i++) {
            $elem
                .animate({ opacity: 0 }, 100)
                .animate({ opacity: 1 }, 100);
        }

    },

    pulse : function($elem, times) {

        /**
         *  Pulse animation.
         *
         *  @param  {jQuery dom object} $elem - the element to pulse
         *  @param  {number} times            - number of times the animation gets played, default is 2
         *  @return {bool false}              - return false if elem is not a jQuery dom object
         */

        // cancel if $elem is not a jQuery object

        if (!($elem instanceof jQuery)) return false;
        
        // set times to default value
        
        var times = times || 2;
        
        // stop the element animation first
        
        $elem.stop(true, true);

        // run the pulse animation
        
        for (var i = 0; i < times; i++) {
            $elem
                .animate({ opacity: .2 }, 300)
                .animate({ opacity:  1 }, 300);
        }

    },

    // dom observer

    startDomObserver : function() {
        
        /**
         *  Starts the global MutationObserver instance.
         */
        
        var $document = $(document);
        var observer  = window.MutationObserver || window.WebKitMutationObserver;
        var target    = document.body;

        YOI.observer = new observer(function(mutations) {
            mutations.forEach(function(mutation) {

                if (mutation.addedNodes.length) {
                    $document.trigger('yoi-dom-add');
                    // console.log('added:');
                    // console.log(mutation.target);
                }
                
                if (mutation.removedNodes.length) {
                    $document.trigger('yoi-dom-remove');
                    // console.log('removed:');
                    // console.log(mutation.target);
                }
                
            });
        });

        YOI.observer.observe(target, {
            subtree       : true,
            attributes    : true,
            childList     : true,
            characterData : true
        });
        
    },

    stopDomObserver : function() {
        
        /**
         *  Stops the global MutationObserver instance.
         */
        
        if (YOI.hasOwnProperty('observer')) {
            YOI.observer.disconnect();
        }
        
    },
    
    // YOI elements
    
    updateOptions : function($element, options) {
        
        /**
         *  Options are simple key/value pairs that affect how a component
         *  might behave. For example "autoplay:true" for a slide show.
         *  Options are attached to an $element via jQuery's data() method.
         *
         *  @param {jQuery dom object} $element
         *  @param {object}            options
         */
    
        // if not already present, create "options" object
    
        if (!$element.data().hasOwnProperty('options')) {
            $element.data().options = {};
        }
        
        // if the "options" parameter is omitted on function call, read the
        // options from the element's yoi-* attribute
        
        if (!options) {
            var options = YOI.toObject(YOI.getAttribute($element));
        }
        
        // if "options" is a valid object, attach the options to
        // the element via jQuery's data() function
    
        if (typeof options === 'object') {
            $.each(options, function(key, value) {
                $element.data().options[key] = value;
            });
        }
    
    },

    updateProps : function($element, props) {
    
        /**
         *  Props are simple key/value pairs that define properties of a
         *  component. For example an $element's size or position.
         *  Props are attached to an $element via jQuery's data() method.
         *
         *  @param  {jQuery dom object}  $element
         *  @param  {object}             props
         *  @return {object}             props
         */
    
        // if not already present, create "props" object
    
        if (!$element.data().hasOwnProperty('props')) {
            $element.data().props = {};
        }
        
        // if "props" is a valid object, attach the value to
        // the element via jQuery's data() function

        if (typeof props === 'object') {
            $.each(props, function(key, value) {
                $element.data().props[key] = value;
            });
        }

        return $element.data().props;

    },

    updateState : function($element, state) {
    
        /**
         *  Each $element can have one state. For example "visible" or "hidden".
         *  The state is attached to an $element via jQuery's data() method.
         *
         *  @param  {jQuery dom object}  $element
         *  @param  {string}             state
         *  @return {object}             state
         */
    
        // if not already present, create "state" object
    
        if (!$element.data().hasOwnProperty('state')) {
            $element.data().state = '';
        }
        
        // if "state" is a valid string, attach the value to
        // the element via jQuery's data() function

        if (typeof state === 'string') {
            $element.data().state = state;
        }
        
        return $element.data().state;
    
    },

    createCollection : function(identifier, $element, options, state, props) {
        
        /**
         *  Create or add to a collection of jQuery objects and add options,
         *  state and props data.
         *
         *  @param  {} identifier - the string to select elements from the dom via
         *                          custom yoi-{identifier} attribute
         *  @param  {} $element   - jQuery element, optional
         *  @param  {} options    - options, optional
         *  @return {} object     - the jQuery element collection
         */
        
        // if it does not exist, create a new collection of jQuery objects
    
        if (!YOI.elementCollection[identifier]) {
            YOI.elementCollection[identifier] = $([]);
        }
    
        if (!($element instanceof jQuery)) {
            
            // if the createCollection() is called without a valid matching jQuery element,
            // gather the matching elements from the dom

            YOI.elementCollection[identifier] = $('[yoi-' + identifier + ']');
        
            // if no elements are found, return false ...
        
            if (!YOI.elementCollection[identifier].length) return false;

            // ... otherwise add data (options, state, props) to each element in the collection
        
            YOI.elementCollection[identifier].each(function() {
                
                var $this = $(this);
                
                YOI.updateOptions($this, options);
                YOI.updateState($this, state);
                YOI.updateProps($this, props);
                
            });

        } else if ($element instanceof jQuery) {
            
            // if the createCollection() is called with a valid matching jQuery element,
            // set it's options and add it to the element collection
            
            YOI.updateOptions($element, options);
            YOI.updateState($element, state);
            YOI.updateProps($element, props);
            
            YOI.elementCollection[identifier] = YOI.elementCollection[identifier].add($element);
    
        }
    
        return YOI.elementCollection[identifier];

    },
    
    // YOI actions
    
    bindAction: function($element, hook) {
        
        /**
         *  Reads function and event type from the hook parameters and binds
         *  them to a given jQuery $element.
         *
         *  @param {jQuery dom object} $element
         *  @param {string}            hook
         */
        
        // cancel if action was already bound
        
        if ($element.data().props.hasOwnProperty(hook)) return false;
        
        //if ($element.data().props.hasOwnProperty(hook)) return false;
        
        // proceed
        
        var params         = YOI.toObject($element.attr(hook));
        var action         = params['action'] || Object.keys(params)[0] || '';
        var hostObject     = action.split('.')[0] || false;
        var publicFunction = action.split('.')[1] || false;
        var event          = params.on || 'click';
        var options        = {};
        var $target        = $(params[action]);
        var $trigger       = params.hasOwnProperty('trigger') ? $(params.trigger) : $element;
        
        // define the target
        
        switch (params[action]) {
            
            // the keyword "self" switches the target element to $element
            // and the trigger element to $(window)
            
            case 'self':
                $target = $element;
                break;
                
            // the keyword "parent" switches the target element
            // to $element.parent()
                
            case 'parent':
                $target = $element.parent();
                break;

        }
        
        // store options in new object
        
        if (typeof params === 'object') {
            $.map(params, function(value, key) {
                if (key !== action && key !== 'on') {
                    options[key] = value;
                }
            });
        }
        
        // the function to be called belongs to an 'element'

        if ((hostObject && publicFunction) && typeof YOI['component'][hostObject][publicFunction] === 'function') {
            $trigger.on(event, function(e) {
                e.preventDefault();
                YOI['component'][hostObject][publicFunction]($target);
            });
        }

        // the function to be called is a simple 'action'

        if (typeof YOI['action'][action] === 'function') {
            $trigger.on(event, function(e) {
                e.preventDefault();
                YOI['action'][action]($trigger, $target, options);
            });
        }
        
        // set flag: action is bound
        
        $element.data().props[hook] = true;
        
    },

    mapActions : function() {
        
        /**
         *  Simple wrapper function to apply YOI.bindAction() to
         *  a set of DOM elements.
         */
        
        $('[yoi-action], [yoi-action-1], [yoi-action-2], [yoi-action-3], [yoi-action-4]').each(function() {
            
            var $this = $(this);
            
            // update props
            
            YOI.updateProps($this);
            
            // bind actions
            
            if ($this.is('[yoi-action]'))   YOI.bindAction($this, 'yoi-action');
            if ($this.is('[yoi-action-1]')) YOI.bindAction($this, 'yoi-action-1');
            if ($this.is('[yoi-action-2]')) YOI.bindAction($this, 'yoi-action-2');
            if ($this.is('[yoi-action-3]')) YOI.bindAction($this, 'yoi-action-3');
            if ($this.is('[yoi-action-4]')) YOI.bindAction($this, 'yoi-action-4');
            
        });
        
    },
    
    // YOI initialize
    
    setReady : function($element) {
        
        /**
         *  Set a "initialized" flag to a (jQuery-)element.
         *
         *  @param {jQuery dom object} $element
         */
        
        $element.data().initialized = true;
        
    },
    
    isReady : function($element) {
        
        /**
         *  Test for a "initialized" flag on a (jQuery-)element.
         *
         *  @param  {jQuery dom object} $element
         *  @return {bool}              state
         */
        
        var state;
        
        if ($element.data().initialized) {
            state = true;
        } else {
            state = false;
        }
        
        return state;
        
    },
    
    initialize : function() {
        
        /**
         *  Initializes all YOI components, actions, behaviours, modules ...
         */
        
        // initialize all YOI components

        $.each(YOI.component, function() {
            if (this.hasOwnProperty('init')) this.init();
        });
        
        // initialize all YOI actions

        $.each(YOI.action, function() {
            if (this.hasOwnProperty('init')) this.init();
        });

        // initialize all YOI behaviours

        $.each(YOI.behaviour, function() {
            if (this.hasOwnProperty('init')) this.init();
        });

        // initialize all YOI modules

        $.each(YOI.module, function() {
            if (this.hasOwnProperty('init')) this.init();
        });
        
        // map actions

        YOI.mapActions();
        
        // start the global MutationObserver
        // learn more: https://developer.mozilla.org/en/docs/Web/API/MutationObserver

        // YOI.startDomObserver();
        
    }
    
};

$(function() {
    
    // run YOI.component.Code before
    // all other scripts, so that code
    // example in docs rendered by this script
    // initialize with the right timing
    
    if (YOI.component.Code) YOI.component.Code.initialize();
    
    // initialize all YOI components

    YOI.initialize();

});