/** forms.js */

YOI.element.CustomFormElements = (function() {

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
        
    var $selectWrapper = $('<span class="select"></span>');
    var $selectIcon    = $('<span class="select__icon"></span>');

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

        // checkboxes

        checkBoxes.each(function() {

            var $thisCheckbox    = $(this);
            var isWrappedInLabel = $thisCheckbox.parents().index('label');

            if (isWrappedInLabel === -1) {
                $thisCheckbox.wrap($checkBoxWrapper.clone(true)); // clone with events
            } else {
                $thisCheckbox.wrap($checkBoxWrapper.clone());     // clone without events
            }
            
            // attach events
            
            $thisCheckbox.on({
                'focus': function() {
                    $thisCheckbox.parent().addClass('is--focus');
                    $thisCheckbox.trigger('yoi-input:focus');
                },
                'blur': function() {
                    $thisCheckbox.parent().removeClass('is--focus');
                    $thisCheckbox.trigger('yoi-input:blur');
                },
                'change': function(e) {
                    $thisCheckbox.parent().toggleClass('is--checked');
                    $thisCheckbox.trigger('yoi-input:change');
                }
            });

        });
        
        // radio buttons

        radioBtns.each(function() {

            var $thisRadioBtn    = $(this);
            var isWrappedInLabel = $thisRadioBtn.parents().index('label');

            if (isWrappedInLabel === -1) {
                $thisRadioBtn.wrap($radioBtnWrapper.clone(true)); // clone with events
            } else {
                $thisRadioBtn.wrap($radioBtnWrapper.clone());     // clone without events
            }
            
            // attach events
            
            $thisRadioBtn.on({
                'focus': function() {
                    $thisRadioBtn.parent().addClass('is--focus');
                    $thisRadioBtn.trigger('yoi-input:focus');
                },
                'blur': function() {
                    $thisRadioBtn.parent().removeClass('is--focus');
                    $thisRadioBtn.trigger('yoi-input:blur');
                },
                'change': function(e) {
                
                    var groupName    = $thisRadioBtn.attr('name');
                    var $groupedBtns = $('[name="' + groupName + '"]');

                    $groupedBtns.parent().removeClass('is--checked');
                    $thisRadioBtn.parent().addClass('is--checked');
                    $thisRadioBtn.trigger('yoi-input:change');
                
                }
            });

        });
        
        // selects

        selects.each(function() {

            var $thisSelect        = $(this);
            var $thisSelectWrapper = $selectWrapper.clone();
            var $thisSelectIcon    = $selectIcon.clone();

            // prepare wrapper, keep modifiers

            $thisSelectWrapper.addClass($thisSelect.attr('class'));

            // inject elements

            $thisSelect.wrap($thisSelectWrapper);
            $thisSelect.parent().append($thisSelectIcon);

            // remove classNames (modifiers) from select element

            $thisSelect.removeAttr('class');
            
            // add events
            
            $thisSelect.on({
                'focus': function() {
                    $(this).parent().addClass('is--focus');
                    $(this).trigger('yoi-input:focus');
                },
                'blur': function() {
                    $(this).parent().removeClass('is--focus');
                    $(this).trigger('yoi-input:blur');
                },
                'change': function() {
                    $(this).trigger('yoi-input:change');
                }
            });

        });
        
        // add css class names to check element wrappers
        
        checkElemns.each(function() {

            var thisWrapper = $(this).parent();

            // move class names from an checkbox/radio-button/select
            // element to it's wrapper

            thisWrapper.addClass($(this).attr('class'));
            $(this).removeAttr('class');

            // if the check element is already checked,
            // add the "is--checked" modifier

            if ($(this).is(':checked')) {
                thisWrapper.addClass('is--checked');
            }

        });
        
    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();
