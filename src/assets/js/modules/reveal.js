/** reveal.js */

var Reveal = (function() {
    
    // private functions
    // =================
    
    function initializeReveal($revealTrigger) {
        
        /**
         *  Initialize all *[data-rangeinput] found in the document (= function call without parameters)
         *  or target one or more specific *[data-rangeinput] (= function call with $radioBtn).
         *  $rangeinput must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $revealTrigger - the reveal trigger(s)
         *
         *  Show the corresponding target elements on any event you wish to bind to the trigger.
         *  Options include to chose from all standard event handlers for the trigger and
         *  using one of two available transitions.
         *
         *  @option {string} target     - A string which is used as selector for the target element
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

            var $this      = $(this);
            var $data      = Helper.toObject($this.data('reveal'));
            var target     = $data.target !== undefined ? $data.target : false;
            var event      = $data.event !== undefined ? $data.event : 'click';
            var transition = $data.transition !== undefined ? $data.transition : false;
            var hideTarget = $data.hideTarget !== undefined ? $data.hideTarget : true;

            // cancel if no target was defined

            if (!target) return false;

            // hide target elements first, may be overridden
            // by options

            if (hideTarget) $(target).hide();

            // apply event on trigger and hide target

            $this.on(event, function(e) {
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