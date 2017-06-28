/** remove.js */

YOI.action.Remove = function($trigger, $target, options) {

    /**
     *  Remove a given target element.
     *
     *  @param {jQuery dom object} $trigger - the element which triggered the script
     *  @param {jQuery dom object} $target  - the target element
     *  @param {object}            options
     */
    
    if ($target instanceof jQuery) {

        // remove the target

        $target.fadeOut(function() {
            $target.trigger('yoi-remove');
            $target.remove();
        });
        
    }
    
};