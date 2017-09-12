/** maxChars.js */

YOI.component.MaxChars = (function() {

    // private vars
    // ============

    var defaultMaxLength = 200;

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
            
            // cancel if already initialized
            
            if (YOI.isReady($(this))) return false;
            
            // proceed
            
            var $thisInputElement = $(this);

            // update properties
            
            updateProps($thisInputElement);
            
            // set the display

            displayCharsLeft($thisInputElement);

            // attach event

            $thisInputElement.on('input', function() {
                updateInputElement($thisInputElement);
            });
            
            // set initialized
            
            YOI.setReady($(this));

        });

    }
    
    function updateProps($inputElement) {
        
        /**
         *  Assign values from options directly to the $inputElement
         *  jQuery-data-object.
         *
         *  @param {jQuery dom object} $inputElement
         */
        
        var options = $inputElement.data().options;
        
        $inputElement.data().props = {
            maxLength       : parseInt($inputElement.attr('maxlength')) || parseInt(options.maxLength) || defaultMaxLength,
            display         : options.display || false,
            errorClassNames : options.errorClass || false
        }
        
    }

    function updateInputElement($inputElement) {

        /**
         *  Watch the input element and provide visual feedback so
         *  the user knows how many characters are left.
         *
         *  @param  {jQuery dom object} $inputElement - the maxchar element
         */
        
        var props           = $inputElement.data().props;
        var $displayElement = $(props.display);
        var inputLength     = $inputElement[0].value.length;
        
        // don't accept input if over maxlength
        
        if (inputLength > props.maxLength) {
            $inputElement.val($inputElement.val().slice(0, -1));
        }
        
        if ($displayElement.length) {
            
            if (inputLength >= props.maxLength) {
                
                // add error class and trigger custom event
                
                $displayElement.addClass(props.errorClassNames);
                $inputElement.trigger('yoi-maxchars-reset');
                
            } else {
                
                // remove error class
                
                $displayElement.removeClass(props.errorClassNames);
                
            }
        
            // show how many chars are left
        
            displayCharsLeft($inputElement);
            
        }

    }

    function displayCharsLeft($inputElement) {

        /**
         *  Write how many characters are left to the display element.
         *
         *  @param  {jQuery dom object} $inputElement - the maxchar element
         */

        var props           = $inputElement.data().props;
        var $displayElement = $(props.display);
        var charsLeft       = props.maxLength - $inputElement[0].value.length;
        
        // write how many characters are left to the display element

        if ($displayElement.length) $displayElement.text(charsLeft);

    }

    
    function reset($inputElement) {
        
        /**
         *  Reset the input and display element.
         *
         *  @param  {jQuery dom object} $inputElement - the maxchar element
         */
        
        var props           = $inputElement.data().props;
        var $displayElement = $(props.display);
        
        $inputElement.val('');
        $displayElement.text(props.maxLength);
        $displayElement.removeClass(props.errorClassNames);
        
        // trigger custom event
        
        $inputElement.trigger('yoi-maxchars-reset');
        
    }

    // public functions
    // ================

    return {
        init  : initialize,
        reset : reset
    };

})();