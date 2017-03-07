/** forms.js */

YOI.CustomFormElements = (function() {

    // private vars
    // ============
    
    var $checkBoxWrapper = $('<span class="checkbox"></span>')
        .on('click', function() {
            $(this).find('input').trigger('change yoi-input:change');
        });

    var $radioBtnWrapper = $('<span class="radio"></span>')
        .on('click', function() {
            $(this).find('input').trigger('change yoi-input:change');
        });

    // private functions
    // =================

    function initialize(scope) {

        /**
         *  Set css-selector to either target all custom form elements
         *  or only the ones in a specified scope (e.g. #myContainer input[type="checkbox"]).
         *
         *  @param {string} scope - a jQuery selector to define the scope
         */

        // set css-selector to either target all custom form elements
        // or only the ones in a specified scope (e.g. #myContainer input[type="checkbox"])

        if (scope === undefined) {
            var scope = '';
        } else {
            scope += ' ';
        }

        // select custom checkboxes and radio buttons

        var checkElemns = $(scope + 'input[type="checkbox"]:not(.js-fallback, .switch *), input[type="radio"]:not(.js-fallback, .switch *, .pickBtn *)');
        var checkBoxes  = $(scope + 'input[type="checkbox"]:not(.js-fallback, .switch *)');
        var radioBtns   = $(scope + 'input[type="radio"]:not(.js-fallback, .switch *, .pickBtn *)');
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
                thisWrapper.addClass('is--checked');
            }

        });

        checkElemns.on({
            'focus yoi-input:focus': function() {
                $(this).parent().addClass('is--focus');
                $(this).trigger('focus yoi-input:focus');
            },
            'blur yoi-input:blur': function() {
                $(this).parent().removeClass('is--focus');
                $(this).trigger('blur yoi-input:blur');
            },
            'change yoi-input:change': function(e) {
                $(this).parent().toggleClass('is--checked');
                $(this).trigger('change yoi-input:change');
            }
        });

        selects.each(function() {

            var $thisSelect    = $(this);
            var $selectWrapper = $('<span></span>');
            var $icon          = $('<span class="select__icon"></span>');

            // prepare wrapper, keep modifiers

            $selectWrapper.addClass($thisSelect.attr('class'));

            // inject elements

            $thisSelect.wrap($selectWrapper);
            $thisSelect.parent().append($icon);

            // remove classNames (modifiers) from select element

            $thisSelect.removeAttr('class');

        });

        selects.on({
            'focus yoi-input:focus': function() {
                $(this).parent().addClass('is--focus');
                $(this).trigger('focus yoi-input:focus');
            },
            'blur yoi-input:blur': function() {
                $(this).parent().removeClass('is--focus');
                $(this).trigger('blur yoi-input:blur');
            },
            'change yoi-input:change': function() {
                $(this).trigger('change yoi-input:change');
            }
        });

    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init : initialize
    }

})();
