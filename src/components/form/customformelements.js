/** customformelements.js */

YOI.component.CustomFormElements = (function() {

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

    function initialize() {

        /**
         *  Initialize the script.
         */

        // select custom checkboxes and radio buttons

        var $checkElemns = $('input[type="checkbox"]:not(.js-fallback, .switch *), input[type="radio"]:not(.js-fallback, .switch *, .pickBtn *)');
        var $checkBoxes  = $('input[type="checkbox"]:not(.js-fallback, .switch *)');
        var $radioBtns   = $('input[type="radio"]:not(.js-fallback, .switch *, .pickBtn *)');
        var $selects     = $('select:not(.js-fallback)');

        // checkboxes
        // ----------

        $checkBoxes.each(function() {

            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // proceed

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
                    $thisCheckbox.parent().addClass('input--focus');
                    $thisCheckbox.trigger('yoi-input-focus');
                },
                'blur': function() {
                    $thisCheckbox.parent().removeClass('input--focus');
                    $thisCheckbox.trigger('yoi-input-blur');
                },
                'change': function() {
                    if ($thisCheckbox.is(':checked')) {
                        $thisCheckbox.prop('checked', false);
                        $thisCheckbox.parent().removeClass('input--checked');
                    } else if (!$thisCheckbox.is(':checked')) {
                        $thisCheckbox.prop('checked', true);
                        $thisCheckbox.parent().addClass('input--checked');
                    }
                    $thisCheckbox.trigger('yoi-input-change');
                }
            });

            // set initialized

            YOI.setReady($(this));

        });

        // radio buttons
        // -------------

        $radioBtns.each(function() {

            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // proceed

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
                    $thisRadioBtn.parent().addClass('input--focus');
                    $thisRadioBtn.trigger('yoi-input-focus');
                },
                'blur': function() {
                    $thisRadioBtn.parent().removeClass('input--focus');
                    $thisRadioBtn.trigger('yoi-input-blur');
                },
                'change': function() {
                    $('[name="' + $thisRadioBtn.attr('name') + '"]').parent().removeClass('input--checked');
                    if ($thisRadioBtn.is(':checked')) {
                        $thisRadioBtn.parent().addClass('input--checked');
                    }
                    if (!$thisRadioBtn.is(':checked')) {
                        $thisRadioBtn.prop('checked', true);
                        $thisRadioBtn.parent().addClass('input--checked');
                    }
                    $thisRadioBtn.trigger('yoi-input-change');
                }
            });

            // set initialized

            YOI.setReady($(this));

        });

        // selects
        // -------

        $selects.each(function() {

            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // proceed

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
                    $thisSelect.parent().addClass('input--focus');
                    $thisSelect.trigger('yoi-input-focus');
                },
                'blur': function() {
                    $thisSelect.parent().removeClass('input--focus');
                    $thisSelect.trigger('yoi-input-blur');
                },
                'change': function() {
                    $thisSelect.trigger('yoi-input-change');
                }
            });

            // set initialized

            YOI.setReady($(this));

        });

        // add css class names to check element wrappers

        $checkElemns.each(function() {

            var thisWrapper = $(this).parent();

            // move class names from an checkbox/radio-button/select
            // element to it's wrapper

            thisWrapper.addClass($(this).attr('class'));
            $(this).removeAttr('class');

            // if the check element is already checked,
            // add the "input--checked" modifier

            if ($(this).is(':checked')) {
                thisWrapper.addClass('input--checked');
            }

            // set initialized

            YOI.setReady($(this));

        });

    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();
