/** maxChars.js */

YOI.MaxChars = (function() {

    // private vars
    // ============

    var defaultMaxLength = 100;

    // private functions
    // =================

    function initialize($inputElement, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $inputElement
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {number} maxLength  - the maximum allowed input character length
         *  @option {string} display    - the DOM-element to display how many characters are left
         *  @option {string} errorClass - a CSS-className applied to the display if input exceeds maxLength
         */

        var $inputElement = YOI.createCollection('maxchars', $inputElement, options);

        if ($inputElement) $inputElement.each(function() {
            
            var $thisInputElement = $(this);
            
            // set the max length
            
            setMaxLength($thisInputElement);
            
            // set the display

            displayCharsLeft($thisInputElement);

            // attach event

            $thisInputElement.on('input', function() {
                observeInput($thisInputElement);
            });

        });

    }
    
    function setMaxLength($inputElement) {
        
        /**
         *  Sets the maximum character length. The maxlength-attribute in markup
         *  overrides the value passed in via the options interface. If no value
         *  was provided or the value is below 1, it falls back to a default value.
         *
         *  @param  {jQuery dom object} $inputElement
         */
        
        var $thisInputElement = $inputElement;
        var options           = $thisInputElement.data().options;
        var maxLengthValue    = parseInt($inputElement.attr('maxlength'));
        
        if (maxLengthValue !== undefined && maxLengthValue > 0) {
            $thisInputElement.data().options.maxLength = maxLengthValue;
        } else if (options.maxLength === undefined) {
            $thisInputElement.data().options.maxLength = defaultMaxLength;
        }
        
    }

    function inputUnderLimit($inputElement) {

        /**
         *  Checks if the current character input inside the input element
         *  is under a given limit.
         *
         *  @param  {jQuery dom object} $inputElement - the maxchar element
         *  @return {boolean}                     - "true" if under limit, "false" if over limit
         */

        // TODO => set default maxlenght

        var maxLength   = $inputElement.data().options.maxLength;
        var inputLength = $inputElement[0].value.length;

        if (inputLength >= maxLength) {
            return false;
        } else {
            return true;
        }

    }

    function observeInput($inputElement) {

        /**
         *  Watches the input element and provides visual feedback so
         *  the user knows how many characters are left.
         *
         *  @param  {jQuery dom object} $inputElement - the maxchar element
         *  @return {boolean}                     - "false" if no display element was found
         */
        
        var $displayElement    = $($inputElement.data().options.display);
        var errorClassProvided = $inputElement.data().options.errorClass !== false;
        
        // cancel if no display element was found

        if (!$displayElement.length) return false;

        // add or remove the error styling

        if (inputUnderLimit($inputElement) && errorClassProvided) {
            removeErrorStyling($inputElement);
            $inputElement.data().state = 'underlimit';
        } else if (errorClassProvided) {
            addErrorStyling($inputElement);
            $inputElement.data().state = 'overlimit';
            $inputElement.trigger('yoi-maxchars:exceed');
        }

        // display how many characters are left

        displayCharsLeft($inputElement);

    }

    function displayCharsLeft($inputElement) {

        /**
         *  Writes how many characters are left to the display element.
         *
         *  @param  {jQuery dom object} $inputElement - the maxchar element
         *  @return {boolean}                     - "false" if no display element was found
         */
        
        // TODO => set default display element?

        var $displayElement = $($inputElement.data().options.display);
        var charsLeft       = $inputElement.data().options.maxLength - $inputElement[0].value.length;

        // cancel if no display element was found

        if (!$displayElement.length) return false;

        // write how many characters are left to the display element

        $displayElement.text(charsLeft);

    }

    function addErrorStyling($inputElement) {

        /**
         *  Adds the provided CSS class names to the display element if the
         *  input's character count exceeds the given limit.
         *
         *  @param  {jQuery dom object} $inputElement - the maxchar element
         *  @return {boolean}                     - "false" if no display element was found
         */

        var errorClass      = $inputElement.data().options.errorClass;
        var $displayElement = $($inputElement.data().options.display);

        // add the CSS error class names

        if ($displayElement) $displayElement.addClass(errorClass);

    }

    function removeErrorStyling($inputElement) {

        /**
         *  Removes the provided CSS class names from the display element if the
         *  input's character count is under the given limit.
         *
         *  @param  {jQuery dom object} $inputElement - the maxchar element
         *  @return {boolean}                     - "false" if no display element was found
         */
        
        // TODO => set default error class?

        var errorClass      = $inputElement.data().options.errorClassNames;
        var $displayElement = $($inputElement.data().options.displaySelector);

        // cancel if no display element was found

        if (!$displayElement.length) return false;

        // remove the CSS error class names

        $displayElement.removeClass(errorClass);

    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init        : initialize,
        display     : displayCharsLeft,
        addError    : addErrorStyling,
        removeError : removeErrorStyling
    }

})();