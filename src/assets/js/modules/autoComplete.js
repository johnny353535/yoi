/** autoComplete.js */

var AutoComplete = (function() {

    // private functions
    // =================

    function initializeAutoComplete($autoCompleteInput) {
        
        /**
         *  Initialize all *[data-autocomplete] found in the document (= function call without parameters)
         *  or target one or more specific *[data-autocomplete] (= function call with $autoCompleteInput).
         *  $autoCompleteInput must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $autoCompleteInput - the auto complete input field
         */

        var inputValue;
        
        if (!($autoCompleteInput instanceof jQuery)) {
            $autoCompleteInput = $('[data-autocomplete]');
        }

        $autoCompleteInput.each(function() {
            
            var $thisAutoCompleteInput = $(this);
            
            $thisAutoCompleteInput
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
