/** hide.js */

YOI.action.Hide = function($trigger, $target, options) {

    /**
     *  Hides the target element.
     *
     *  @param {jQuery dom object} $trigger - the element which triggered the script
     *  @param {jQuery dom object} $target  - the target element
     *  @param {object}            options
     *
     *  Available options:
     *
     *  @option {string} transition - Chose from two jQuery animations: 'fadeOut' and 'slideUp'.
     */
    
    if ($target instanceof jQuery) {

        // hide the target

        if (options.transition === 'fadeOut') {
            $target.stop().fadeOut();
        } else if (options.transition === 'slideUp') {
            $target.stop().slideUp();
        } else {
            $target.hide();
        }

        // trigger custom event

        $target.trigger('yoi-hide');

    }

}