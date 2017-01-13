/** remove.js */

var Remove = (function() {
    
    // private functions
    // =================
    
    function initializeRemoveTriggers($removeTrigger) {
        
        /**
         *  Initialize all *[data-remove] found in the document (= function call without parameters)
         *  or target one or more specific *[data-remove] (= function call with $removeTrigger).
         *  $removeTrigger must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $removeTrigger - the remove trigger(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <button data-remove="target:#myTargetElement">
         *
         *  Available options:
         *
         *  @option {string, CSS selector} target - optional selector for the DOM element to remove
         *                                          by default, the target is the trigger's first parent element
         */

        if (!($removeTrigger instanceof jQuery)) {
            $removeTrigger = $('[data-remove]');
        }
        
        $removeTrigger.each(function() {

            var $thisremoveTrigger = $(this);
            var options            = YOI.toObject($thisremoveTrigger.data('remove'));
            var $thisTarget        = options.target !== undefined && $(options.target).length ? $(options.target) : $thisremoveTrigger.parent();

            $thisremoveTrigger.on('click', function(e) {
                e.preventDefault();
                $thisTarget.fadeOut(function(){
                    $thisTarget.remove();
                });
            });
            
        });
        
    }
    
    // initialize
    // ==========
    
    initializeRemoveTriggers();
    
    // public functions
    // ================
    
    return {
        init : initializeRemoveTriggers
    }

})();