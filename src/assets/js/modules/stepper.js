/** stepper.js */

var Stepper = (function() {

    // private vars
    // ============

    var btnLabelMore = Helper.locale === 'de' ? 'mehr'    : 'more';
    var btnLabelLess = Helper.locale === 'de' ? 'weniger' : 'less';

    var $stepperBtns = $('\
        <div class="stepper__btnPlus">\
            <i aria-hidden="true" class="icon--003-s"></i>\
            <span class="hidden">' + btnLabelMore + '</span>\
        </div>\
        <div class="stepper__btnMinus">\
            <i aria-hidden="true" class="icon--002-s"></i>\
            <span class="hidden">' + btnLabelLess + '</span>\
        </div>\
    ');

    // private functions
    // =================

    function initializeStepper() {

        /**
         *  Initialize by preparing the dom and attaching events.
         */

        $('.stepper').each(function() {

            var $this = $(this);

            $this.prepend($stepperBtns.clone());

            // attach events

            var eventType = Helper.environment('mobile') ? 'tap' : 'click';

            $this.find('.stepper__btnPlus').on(eventType,function(e) {
                e.preventDefault();
                increaseItemCount($this);
            });

            $this.find('.stepper__btnMinus').on(eventType,function(e) {
                e.preventDefault();
                decreaseItemCount($this);
            });

            $this.find('.stepper__input').blur(function() {
                checkInput($this);
            });

            $this
                .on('swipeleft', function(e) {
                    decreaseItemCount($this);
                })
                .on('swiperight', function(e) {
                    increaseItemCount($this);
                });

        });

    }

    function increaseItemCount($targetElem) {

        /**
         *  Increase the item count.
         *
         *  @param  {jQuery dom object} $targetElem - the btn input combo element
         *  @return {bool false}
         */

        checkInput($targetElem);

        var currentValue = $targetElem.find('.stepper__input')[0].value;

        if (currentValue >= 0) {
            currentValue++;
            $targetElem.find('input')[0].value = currentValue;
        }

        return false;

    }

    function decreaseItemCount($targetElem) {

        /**
         *  Decrease the item count
         *
         *  @param  {jQuery dom object} $targetElem - the .stepper element
         *  @return {bool false}
         */

        checkInput($targetElem);

        var currentValue = $targetElem.find('.stepper__input')[0].value;

        if (currentValue > 1) {
            currentValue--;
            $targetElem.find('input')[0].value = currentValue;
        }

        return false;

    }

    function checkInput($targetElem) {

        /**
         *  Check the .stepper input element.
         *
         *  @param  {jQuery dom object} $targetElem - the .stepper element
         *  @return {bool false}
         */

        var $txtField = $targetElem.find('.stepper__input');
        var $input    = $targetElem.find('.stepper__input')[0].value;

        if (!$input.match(/^[0-9]+$/)) {
            $txtField.addClass('input--error');
        } else {
            $txtField.removeClass('input--error');
        }

        return false;

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
