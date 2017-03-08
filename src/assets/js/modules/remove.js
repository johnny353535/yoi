/** remove.js */

YOI.Remove = (function() {

    // private functions
    // =================

    function initialize($removeTrigger, options) {
    
        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $removeTrigger
         *  @param {object}            options
         */
        
        var $removeTrigger = YOI.createCollection('remove', $removeTrigger, options);

        if ($removeTrigger) $removeTrigger.each(function() {

            var $thisremoveTrigger = $(this);
            var options            = $thisremoveTrigger.data().options;
            var $thisTarget        = options.target !== undefined && $(options.target).length ? $(options.target) : $thisremoveTrigger.parent();
            
            // set default options via variable assignment.
            
            $thisremoveTrigger.on('click', function(e) {
                e.preventDefault();
                remove($thisTarget);
            });

        });

    }
    
    function remove($target) {
        
        /**
         *  Fade-out and remove the target element from the dom.
         *
         *  @param  {jQuery dom object} $target - the target element in dom
         */
        
        $target.fadeOut(function(){
            $target.trigger('yoi-remove');
            $target.remove();
        });
        
    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init  : initialize,
        apply : remove
    };

})();