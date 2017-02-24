/** hide.js */

YOI.Hide = (function() {
    
    // private vars
    // ============
    
    var $triggerCollection;
    var options = undefined;

    // private functions
    // =================

    function initialize($trigger, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $element
         *  @param {object}            options
         */

        if (!($trigger instanceof jQuery)) {
        
            // if the init function is called without a valid matching jQuery element,
            // gather the matching elements from the dom. if no elements are found,
            // exit the script.
        
            $triggerCollection = $('[data-hide]');
            if (!$triggerCollection.length) return false;
        
            // add data (eg. options) to each element in the collection
        
            $triggerCollection.each(function() {
                setOptions($(this));
            });
        
        } else if ($trigger instanceof jQuery) {
        
            // if the init function is called with a valid matching jQuery element,
            // add it to the element collection
        
            setOptions($trigger, options);
            $triggerCollection = $triggerCollection.add($trigger);
        
        }

        $trigger.each(function(index){

            var $thisTrigger = $(this);
            var options      = $thisTrigger.data();
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
    
    function setOptions($element, options) {
    
        /**
         *  Attaches options directly to each $element via jQuery's data() method.
         *  Options are either retrieved via the options-parameter or (if undefined)
         *  read from markup.
         *
         *  @param {jQuery dom object} $element
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {string} target     - A string which is used as selector for the target element
         *                                (eg. '#myTarget' or '.myTarget', etc.)
         *  @option {string} event      - A string which defines the event which gets bound to the
         *                                trigger element. All standard event handlers from jQuery
         *                                can be used.
         *  @option {string} transition - Chose from two jQuery animations: 'fadeOut' and 'slideUp'.
         */
    
        var options    = options === undefined ? YOI.toObject($element.data('hide')) : options;
        var target     = options.target !== undefined ? options.target : false;
        var event      = options.event !== undefined ? options.event : 'click';
        var transition = options.transition !== undefined ? options.transition : false;
    
        $element.data({
            'target'     : target,
            'event'      : event,
            'transition' : transition
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
        
        $target.trigger('yoi-hidden');
        
    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init  : initialize,
        apply : hide
    }

})();