/** radiobutton.js */

YOI.component.RadioButton = (function() {

    // private vars
    // ============

    var $radioBtnWrapper = $('<span class="radioButton"></span>')
        .on('click', function() {
            var $thisInput = $(this).find('input');
            if ($thisInput.is(':disabled')) return false;
            $thisInput.trigger('change');
        });

    // private functions
    // =================

    function initialize($radioBtn, options) {

        /**
         *  Initialize the script.
         */

        var $radioBtn = YOI.createCollection('radiobutton', $radioBtn, options);

        if ($radioBtn) $radioBtn.each(function() {
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

            var thisWrapper = $(this).parent();

            // move class names from a radio-button
            // to it's wrapper

            thisWrapper.addClass($(this).attr('class'));
            $(this).removeAttr('class');

            // if the radio-button is already checked,
            // add the "is--checked" modifier

            if ($(this).is(':checked')) {
                thisWrapper.addClass('is--checked');
            }

            // if the radio-button is disabled,
            // add the "is--disabled" modifier

            if ($(this).is(':disabled')) {
                thisWrapper.addClass('is--disabled');
            }

            // attach events

            $thisRadioBtn.on({
                'focus': function() {
                    $thisRadioBtn.parent().addClass('is--focus');
                    $thisRadioBtn.trigger('yoi-input-focus');
                },
                'blur': function() {
                    $thisRadioBtn.parent().removeClass('is--focus');
                    $thisRadioBtn.trigger('yoi-input-blur');
                },
                'change': function() {
                    $('[name="' + $thisRadioBtn.attr('name') + '"]').parent().removeClass('is--checked');
                    if ($thisRadioBtn.is(':checked')) {
                        $thisRadioBtn.parent().addClass('is--checked');
                    }
                    if (!$thisRadioBtn.is(':checked')) {
                        $thisRadioBtn.prop('checked', true);
                        $thisRadioBtn.parent().addClass('is--checked');
                    }
                    $thisRadioBtn.trigger('yoi-input-change');
                }
            });

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