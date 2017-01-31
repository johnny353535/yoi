/** stepper.js */

var Stepper = (function() {

    // private vars
    // ============

    var btnLabelMore = YOI.locale === 'de' ? 'mehr'    : 'more';
    var btnLabelLess = YOI.locale === 'de' ? 'weniger' : 'less';

    var $stepperBtns = $('\
        <div class="stepper__btnPlus">\
            <span class="stepper__iconPlus"></span>\
            <span class="hidden">' + btnLabelMore + '</span>\
        </div>\
        <div class="stepper__btnMinus">\
            <span class="stepper__iconMinus"></span>\
            <span class="hidden">' + btnLabelLess + '</span>\
        </div>\
    ');

    // private functions
    // =================

    function initializeStepper($stepper) {

        /**
         *  Initialize all *[data-stepper] found in the document (= function call without parameters)
         *  or target one or more specific *[data-stepper] (= function call with $stepper).
         *  $stepper must be a jQuery object or jQuery object collection.
         *
         *  @param  {jQuery dom object} $stepper - the stepper
         */
        
        if (!($stepper instanceof jQuery)) {
            $stepper = $('[data-stepper]');
        }

        $stepper.each(function() {

            var $thisStepper = $(this);

            $thisStepper.prepend($stepperBtns.clone());

            // attach events

            var eventType = YOI.environment('mobile') ? 'tap' : 'click';

            $thisStepper.find('.stepper__btnPlus').on(eventType, function(e) {
                e.preventDefault();
                increaseItemCount($thisStepper);
            });

            $thisStepper.find('.stepper__btnMinus').on(eventType, function(e) {
                e.preventDefault();
                decreaseItemCount($thisStepper);
            });

            $thisStepper.find('.stepper__input').blur(function() {
                checkInput($thisStepper);
            });

            $thisStepper
                .on('swipeleft', function(e) {
                    decreaseItemCount($thisStepper);
                })
                .on('swiperight', function(e) {
                    increaseItemCount($thisStepper);
                });

        });

    }

    function increaseItemCount($stepper) {

        /**
         *  Increase the item count.
         *
         *  @param {jQuery dom object} $stepper - the stepper
         */

        checkInput($stepper);

        var currentValue = $stepper.find('.stepper__input')[0].value;

        if (currentValue >= 0) {
            currentValue++;
            $stepper.find('input')[0].value = currentValue;
        }

    }

    function decreaseItemCount($stepper) {

        /**
         *  Decrease the item count
         *
         *  @param {jQuery dom object} $stepper - the stepper
         */

        checkInput($stepper);

        var currentValue = $stepper.find('.stepper__input')[0].value;

        if (currentValue > 1) {
            currentValue--;
            $stepper.find('input')[0].value = currentValue;
        }

    }

    function checkInput($stepper) {

        /**
         *  Check the .stepper input element.
         *
         *  @param {jQuery dom object} $stepper - the stepper
         */

        var $txtField = $stepper.find('.stepper__input');
        var $input    = $stepper.find('.stepper__input')[0].value;

        if (!$input.match(/^[0-9]+$/)) {
            $txtField.addClass('input--error');
        } else {
            $txtField.removeClass('input--error');
        }

    }

    // initialize
    // ==========

    initializeStepper();

    // public functions
    // ================

    return {
        init      : initializeStepper,
        countUp   : increaseItemCount,
        countDown : decreaseItemCount
    }

})();
