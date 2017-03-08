/** reveal.js */

YOI.Reveal = (function() {

    // private functions
    // =================

    function initialize($revealTrigger, options) {
        
        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $revealTrigger
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {string} target     - A string which is used as CSS-selector for the target element
         *                                (eg. '#myTarget' or '.myTarget', etc.)
         *
         *  @option {string} event      - A string which defines the event which gets bound to the
         *                                trigger element. All standard event handlers from jQuery
         *                                can be used.
         *
         *  @option {string} transition - Chose from two jQuery animations: 'fadeIn' and 'slideDown'.
         *
         *  @option {bool} hideTarget   - Hide the target on page init? Default is true.
         */
        
        var $revealTrigger = YOI.createCollection('reveal', $revealTrigger, options);

        if ($revealTrigger) $revealTrigger.each(function(index){

            // set up vars

            var $thisRevealTrigger = $(this);
            var options            = $thisRevealTrigger.data().options;
            var target             = options.target !== undefined ? options.target : false;
            var event              = options.event !== undefined ? options.event : 'click';
            var transition         = options.transition !== undefined ? options.transition : false;
            var hideTarget         = options.hideTarget !== undefined ? options.hideTarget : true;

            // cancel if no target was defined

            if (!target) return false;

            // hide target elements first, may be overridden
            // by options

            if (hideTarget) $(target).hide();

            // apply event on trigger and hide target

            $thisRevealTrigger.on(event, function(e) {
                if (transition === 'fadeOut') {
                    $(target).fadeOut();
                } else if (transition === 'slideUp') {
                    $(target).slideUp();
                } else {
                    $(target).hide();
                }
            });
            
            // trigger custom event
            
            $thisRevealTrigger.trigger('yoi-reveal');

        });

    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init: initialize
    };

})();