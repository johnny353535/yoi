/** stepper.js */

YOI.component.Stepper = (function() {

    // private vars
    // ============

    // localization

    var language = YOI.locale();

    var localization = {
        'en' : {
            'buttonLabelMore' : 'more',
            'buttonLabelLess' : 'less'
        },
        'de' : {
            'buttonLabelMore' : 'mehr',
            'buttonLabelLess' : 'weniger'
        }
    };

    // templates

    var $stepperButtons = $('\
        <div class="stepper__buttonUp">\
            <span class="stepper__iconUp"></span>\
            <span class="hidden">' + localization[language]['buttonLabelMore'] + '</span>\
        </div>\
        <div class="stepper__buttonDown">\
            <span class="stepper__iconDown"></span>\
            <span class="hidden">' + localization[language]['buttonLabelLess'] + '</span>\
        </div>\
    ');

    // private functions
    // =================

    function initialize($stepper, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery element} $stepper
         *  @param {object}         options
         */

        var $stepper = YOI.createCollection('stepper', $stepper, options);

        if ($stepper) $stepper.each(function() {

            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // proceed

            var $thisStepper = $(this);

            // save initial value

            $thisStepper.data().props.initialValue = $thisStepper.find('.stepper__input')[0].value || 1;

            // add elements

            $thisStepper.prepend($stepperButtons.clone());

            // attach events

            var eventType = YOI.environment('mobile') ? 'tap' : 'click';

            $thisStepper.find('.stepper__buttonUp').on(eventType, function(e) {
                e.preventDefault();
                increaseItemCount($thisStepper);
            });

            $thisStepper.find('.stepper__buttonDown').on(eventType, function(e) {
                e.preventDefault();
                decreaseItemCount($thisStepper);
            });

            $thisStepper.find('.stepper__input').blur(function() {
                validateInput($thisStepper);
            });

            // set initialized

            YOI.setReady($(this));

        });

    }

    function increaseItemCount($stepper) {

        /**
         *  Increase the item count.
         *
         *  @param {jQuery element} $stepper - the stepper
         */

        validateInput($stepper);

        if ($stepper.data().state === 'error') return false;

        var currentValue = $stepper.find('.stepper__input')[0].value;

        if (currentValue >= 0) {
            currentValue++;
            $stepper.find('input')[0].value = currentValue;
        }

        // trigger custom event

        $stepper.trigger('yoi-stepper-up');

    }

    function decreaseItemCount($stepper) {

        /**
         *  Decrease the item count
         *
         *  @param {jQuery element} $stepper - the stepper
         */

        validateInput($stepper);

        if ($stepper.data().state === 'error') return false;

        var currentValue = $stepper.find('.stepper__input')[0].value;

        if (currentValue > 1) {
            currentValue--;
            $stepper.find('input')[0].value = currentValue;
        }

        // trigger custom event

        $stepper.trigger('yoi-stepper-down');

    }

    function resetItemCount($stepper) {

        /**
         *  Reset the item count.
         *
         *  @param {jQuery element} $stepper - the stepper
         */

        setItemCount($stepper, $stepper.data().props.initialValue);

        // remove error formatting

        removeErrorFormatting($stepper);

        // trigger custom event

        $stepper.trigger('yoi-stepper-reset');

    }

    function clearItemCount($stepper) {

        /**
         *  Set the item count to zero.
         *
         *  @param {jQuery element} $stepper - the stepper
         */

        setItemCount($stepper, 0);

        // remove error formatting

        removeErrorFormatting($stepper);

        // trigger custom event

        $stepper.trigger('yoi-stepper-clear');

    }

    function setItemCount($stepper, val) {

        /**
         *  Set the item count to a given value.
         *
         *  @param {jQuery element} $stepper - the stepper
         *  @param {number}         val      - the value
         */

        if (YOI.isNumber(val)) {

            // remove error formatting

            removeErrorFormatting($stepper);

            // change the value

            $stepper.find('.stepper__input')[0].value = val;
            $stepper.trigger('yoi-stepper-change');

        }

    }

    function validateInput($stepper) {

        /**
         *  Validate the .stepper input element.
         *
         *  @param {jQuery element} $stepper - the stepper
         */

        var inputVal = $stepper.find('.stepper__input')[0].value;

        if (YOI.isNumber(inputVal)) {

            // input is a natural number

            removeErrorFormatting($stepper);

            // trigger custom event

            $stepper.trigger('yoi-stepper-valid');

        } else {

            // input is invalid

            addErrorFormatting($stepper);

            // trigger custom event

            $stepper.trigger('yoi-stepper-invalid');

        }

    }

    function addErrorFormatting($stepper) {

        /**
         *  Add error formatting to a stepper.
         *
         *  @param {jQuery element} $stepper - the stepper
         */

        var $txtField = $stepper.find('.stepper__input');

        $txtField.addClass('input--negative');
        $stepper.data().state = 'error';

    }

    function removeErrorFormatting($stepper) {

        /**
         *  Remove error formatting on a stepper.
         *
         *  @param {jQuery element} $stepper - the stepper
         */

        var $txtField = $stepper.find('.stepper__input');

        $txtField.removeClass('input--negative');
        $stepper.data().state = '';

    }

    // public functions
    // ================

    return {
        init      : initialize,
        countUp   : increaseItemCount,
        countDown : decreaseItemCount,
        reset     : resetItemCount,
        clear     : clearItemCount
    };

})();
