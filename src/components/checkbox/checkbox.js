/** checkbox.js */

YOI.component.Checkbox = (function() {

    // private vars
    // ============

    var $checkBoxWrapper = $('<span class="checkbox"></span>')
        .on('click', function() {
            var $thisInput = $(this).find('input');
            if ($thisInput.is(':disabled')) return false;
            $thisInput.trigger('change');
        });

    // private functions
    // =================

    function initialize($checkBox, options) {

        /**
         *  Initialize the script.
         */

        var $checkBox = YOI.createCollection('checkbox', $checkBox, options);

        if ($checkBox) $checkBox.each(function() {
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

            var thisWrapper = $(this).parent();

            // move class names from a checkbox
            // to it's wrapper

            thisWrapper.addClass($(this).attr('class'));
            $(this).removeAttr('class');

            // if the checkbox is already checked,
            // add the "is--checked" modifier

            if ($(this).is(':checked')) {
                thisWrapper.addClass('is--checked');
            }

            // if the checkbox is disabled,
            // add the "is--disabled" modifier

            if ($(this).is(':disabled')) {
                thisWrapper.addClass('is--disabled');
            }

            // attach events

            $thisCheckbox.on({
                'focus': function() {
                    $thisCheckbox.parent().addClass('is--focus');
                    $thisCheckbox.trigger('yoi-input-focus');
                },
                'blur': function() {
                    $thisCheckbox.parent().removeClass('is--focus');
                    $thisCheckbox.trigger('yoi-input-blur');
                },
                'change': function() {
                    if ($thisCheckbox.is(':checked')) {
                        $thisCheckbox.prop('checked', false);
                        $thisCheckbox.parent().removeClass('is--checked');
                    } else if (!$thisCheckbox.is(':checked')) {
                        $thisCheckbox.prop('checked', true);
                        $thisCheckbox.parent().addClass('is--checked');
                    }
                    $thisCheckbox.trigger('yoi-input-change');
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