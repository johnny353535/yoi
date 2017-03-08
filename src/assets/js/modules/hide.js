/** hide.js */

YOI.Hide = (function() {

    // private functions
    // =================

    function initialize($trigger, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $trigger
         *  @param {object}            options
         */
        
        var $trigger = YOI.createCollection('hide', $trigger, options);

        if ($trigger) $trigger.each(function(index){

            var $thisTrigger = $(this);
            var options      = $thisTrigger.data().options;
            var transition   = options.transition;
            var $target      = $(options.target);
            var event        = options.event;

            // cancel if no target was defined

            if (!($target instanceof jQuery)) return false;

            // apply event on trigger and hide target

            $thisTrigger.on(event, function(e) {
                hide($target, transition);
            });

        });

    }
    
    function hide($target, transition) {
        
        /**
         *  Hides the target element.
         *
         *  @param {jQuery dom object} $target
         *  @param {string}            transition
         */
        
        // exit the script if no or an invalid target was supplied
        
        if (!($target instanceof jQuery)) return false;
        
        var transition = transition;
        
        // hide the target
        
        if (transition === 'fadeOut') {
            $target.fadeOut();
        } else if (transition === 'slideUp') {
            $target.slideUp();
        } else {
            $target.hide();
        }
        
        // trigger custom event
        
        $target.trigger('yoi-hide');
        
    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init  : initialize,
        apply : hide
    };

})();