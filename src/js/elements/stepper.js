/** stepper.js */

YOI.element.Stepper = (function() {

    // private vars
    // ============
    
    // localization
    
    var language = YOI.locale();
    
    var localization = {
        'en' : {
            'btnLabelMore' : 'more',
            'btnLabelLess' : 'less'
        },
        'de' : {
            'btnLabelMore' : 'mehr',
            'btnLabelLess' : 'weniger'
        }
    };
    
    // templates

    var $stepperBtns = $('\
        <div class="stepper__btnPlus">\
            <span class="stepper__iconPlus"></span>\
            <span class="hidden">' + localization[language]['btnLabelMore'] + '</span>\
        </div>\
        <div class="stepper__btnMinus">\
            <span class="stepper__iconMinus"></span>\
            <span class="hidden">' + localization[language]['btnLabelLess'] + '</span>\
        </div>\
    ');

    // private functions
    // =================

    function initialize($stepper, options) {
        
        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $stepper
         *  @param {object}            options
         */
        
        var $stepper = YOI.createCollection('stepper', $stepper, options);

        if ($stepper) $stepper.each(function() {

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

        });

    }

    function increaseItemCount($stepper) {

        /**
         *  Increase the item count.
         *
         *  @param {jQuery dom object} $stepper - the stepper
         */

        checkInput($stepper);
        
        if ($stepper.data().state === 'error') return false;

        var currentValue = $stepper.find('.stepper__input')[0].value;

        if (currentValue >= 0) {
            currentValue++;
            $stepper.find('input')[0].value = currentValue;
        }
        
        // trigger custom event
        
        $stepper.trigger('yoi-stepper:up');

    }

    function decreaseItemCount($stepper) {

        /**
         *  Decrease the item count
         *
         *  @param {jQuery dom object} $stepper - the stepper
         */

        checkInput($stepper);
        
        if ($stepper.data().state === 'error') return false;

        var currentValue = $stepper.find('.stepper__input')[0].value;

        if (currentValue > 1) {
            currentValue--;
            $stepper.find('input')[0].value = currentValue;
        }
        
        // trigger custom event
        
        $stepper.trigger('yoi-stepper:down');

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
            $stepper.trigger('yoi-stepper:error');
            $stepper.data().state = 'error';
        } else {
            $txtField.removeClass('input--error');
            $stepper.data().state = '';
        }

    }

    // public functions
    // ================

    return {
        init      : initialize,
        countUp   : increaseItemCount,
        countDown : decreaseItemCount
    };

})();
