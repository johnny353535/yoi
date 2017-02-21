/** maxChars.js */

YOI.MaxChars = (function() {

    // private vars
    // ============

    var defaultMaxLength = 100;

    // private functions
    // =================

    function initializeMaxChars($maxChars, options) {

       /**
        *  Initialize all [data-maxchars] text-inputs found in the document (= function call without parameters)
        *  or target one or more specific [data-maxchars] (= function call with $maxChars).
        *  $maxChars must be a jQuery object or jQuery object collection, especially an input[type="text"] or a textarea.
        *
        *  @param {jQuery dom object} $maxChars - the maxchar element(s) (input[type="text"] or textarea)
        *
        *  Options are passed to the script as custom data values, eg:
        *
        *  <textarea data-maxchars="maxLength:100;"></textarea>
        *
        *  Available options:
        *
        *  @option {string} maxLength - xxx
        *  @option {string} display   - xxx
        *  @option {string} errorClass  - xxx
        *  @option {string} txt       - xxx
        */

        if (!($maxChars instanceof jQuery)) {
            $maxChars = $('textarea[data-maxchars], input[type="text"][data-maxchars]');
        }

        $maxChars.each(function() {

            var $thisMaxChars = $(this);

           // append data

            appendData($thisMaxChars);

           // set the display

            displayCharsLeft($maxChars);

           // attach event

            $thisMaxChars.on('input', function() {
                observeInput($thisMaxChars);
            });

        });

    }

    function appendData($maxChars) {

        /**
         *  Read the options from the markup (custom data-attribute) and
         *  write them to the internal jQuery.data() object. In addition,
         *  this function also sets the input's maxlength-attribute value
         *  in the markup.
         *
         *  @param {jQuery dom object} $maxChars - the maxchar element
         */

        var maxLengthValue  = $maxChars.attr('maxlength');
        var options         = options === undefined ? YOI.toObject($maxChars.data('maxchars')) : options;
        var displaySelector = options.display !== undefined ? options.display : false;
        var displaytxt      = options.txt !== undefined ? options.txt : false;
        var errorClassNames = options.errorClass !== undefined ? options.errorClass : false;

        // get the max length for input
        // important: a (valid) maxlength attribute has a higher priority than options.maxLength

        var maxLength;

        if (maxLengthValue !== undefined && maxLengthValue > 0) {
            maxLength = maxLengthValue;
        } else if (options.maxLength !== undefined && options.maxLength > 0) {
            maxLength = options.maxLength;
        } else {
            maxLength = defaultMaxLength;
        }

        // set the input's maxlength-attribute value

        $maxChars.attr('maxlength', maxLength);

        // attach the data to the jQuery data object

        $maxChars.data({
            'maxLength'       : maxLength,
            'displaySelector' : displaySelector,
            'displaytxt'      : displaytxt,
            'errorClassNames' : errorClassNames
        });

    }

    function inputUnderLimit($maxChars) {

        /**
         *  Checks if the current character input inside the input element
         *  is under a given limit.
         *
         *  @param  {jQuery dom object} $maxChars - the maxchar element
         *  @return {boolean}                     - "true" if under limit, "false" if over limit
         */

        var maxLength   = $maxChars.data().maxLength;
        var inputLength = $maxChars[0].value.length;

        if (inputLength >= maxLength) {
            return false;
        } else {
            return true;
        }

    }

    function observeInput($maxChars) {

        /**
         *  Watches the input element and provides visual feedback so
         *  the user knows how many characters are left.
         *
         *  @param  {jQuery dom object} $maxChars - the maxchar element
         *  @return {boolean}                     - "false" if no display element was found
         */

        var $displayElement    = $($maxChars.data().displaySelector);
        var errorClassProvided = $maxChars.data().errorClass !== false;

        // cancel if no display element was found

        if (!$displayElement.length) return false;

        // add or remove the error styling

        if (inputUnderLimit($maxChars) && errorClassProvided) {
            removeErrorStyling($maxChars);
        } else if (errorClassProvided) {
            addErrorStyling($maxChars);
        }

        // display how many characters are left

        displayCharsLeft($maxChars);

    }

    function displayCharsLeft($maxChars) {

        /**
         *  Writes how many characters are left to the display element.
         *
         *  @param  {jQuery dom object} $maxChars - the maxchar element
         *  @return {boolean}                     - "false" if no display element was found
         */

        var $displayElement = $($maxChars.data().displaySelector);
        var charsLeft       = $maxChars.data().maxLength - $maxChars[0].value.length;

        // cancel if no display element was found

        if (!$displayElement.length) return false;

        // write how many characters are left to the display element

        $displayElement.text(charsLeft);

    }

    function addErrorStyling($maxChars) {

        /**
         *  Adds the provided CSS class names to the display element if the
         *  input's character count exceeds the given limit.
         *
         *  @param  {jQuery dom object} $maxChars - the maxchar element
         *  @return {boolean}                     - "false" if no display element was found
         */

        var errorClass      = $maxChars.data().errorClassNames;
        var $displayElement = $($maxChars.data().displaySelector);

        // cancel if no display element was found

        if (!$displayElement.length) return false;

        // add the CSS error class names

        $displayElement.addClass(errorClass);

    }

    function removeErrorStyling($maxChars) {

        /**
         *  Removes the provided CSS class names from the display element if the
         *  input's character count is under the given limit.
         *
         *  @param  {jQuery dom object} $maxChars - the maxchar element
         *  @return {boolean}                     - "false" if no display element was found
         */

        var errorClass      = $maxChars.data().errorClassNames;
        var $displayElement = $($maxChars.data().displaySelector);

        // cancel if no display element was found

        if (!$displayElement.length) return false;

        // remove the CSS error class names

        $displayElement.removeClass(errorClass);

    }

    // initialize
    // ==========

    initializeMaxChars();

    // public functions
    // ================

    return {
        init        : initializeMaxChars,
        display     : displayCharsLeft,
        addError    : addErrorStyling,
        removeError : removeErrorStyling
    }

})();