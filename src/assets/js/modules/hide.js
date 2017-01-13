/** hide.js */

var Hide = (function() {
    
    // private functions
    // =================
    
    function initializeHide($hideTrigger, options) {
        
        /**
         *  Search the Dom for trigger-elements flagged with "data-hide" and hide the
         *  corresponding target elements on any event you wish to bind to the trigger.
         *  Options include to chose from all standard event handlers for the trigger and
         *  using one of two available transitions.
         *
         *  Initialize all *[data-hide] found in the document (= function call without parameters)
         *  or target one or more specific *[data-hide] (= function call with $dock).
         *  $hideTrigger must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $hideTrigger - the hide trigger(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <button class="btn" data-hide="target:#myTarget; event:click; transition:fadeOut">Hide</button>
         *
         *  Available options:
         *
         *  @option {string} target     - A string which is used as selector for the target element
         *                                (eg. '#myTarget' or '.myTarget', etc.)
         *
         *  @option {string} event      - A string which defines the event which gets bound to the
         *                                trigger element. All standard event handlers from jQuery
         *                                can be used.
         *
         *  @option {string} transition - Chose from two jQuery animations: 'fadeOut' and 'slideUp'.
         */
        
        if (!($hideTrigger instanceof jQuery)) {
            $hideTrigger = $('[data-hide]');
        }
        
        $hideTrigger.each(function(index){

            // set up vars

            var $thisTrigger = $(this);
            var $data        = options === undefined ? YOI.toObject($this.data('hide')) : options;
            var target       = $data.target !== undefined ? $data.target : false;
            var event        = $data.event !== undefined ? $data.event : 'click';
            var transition   = $data.transition !== undefined ? $data.transition : false;
            
            // cancel if no target was defined

            if (!target) return false;
            
            // apply event on trigger and hide target
            
            $thisTrigger.on(event, function(e) {
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
    
    initializeHide();
    
    // public functions
    // ================
    
    return {
        init: initializeHide
    }

})();