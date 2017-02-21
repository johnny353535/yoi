/** reveal.js */

YOI.Reveal = (function() {

    // private functions
    // =================

    function initializeReveal($revealTrigger, options) {

        /**
         *  Initialize all *[data-reveal] found in the document (= function call without parameters)
         *  or target one or more specific *[data-reveal] (= function call with $revealTrigger).
         *  $revealTrigger must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $revealTrigger - the reveal trigger(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <button data-reveal="target:#myTargetElement">
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

        if (!($revealTrigger instanceof jQuery)) {
            $revealTrigger = $('[data-reveal]');
        }

        $revealTrigger.each(function(index){

            // set up vars

            var $thisRevealTrigger = $(this);
            var options            = options === undefined ? YOI.toObject($thisRevealTrigger.data('reveal')) : options;
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

        });

    }

    // initialize
    // ==========

    initializeReveal();

    // public functions
    // ================

    return {
        init: initializeReveal
    }

})();