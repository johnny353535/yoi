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
                $(this)[0].value = "";
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
