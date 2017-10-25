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
     *  @option {string} transition - Chose from the jQuery effects 'fadet' and 'slide'.
     */
    
    if ($target instanceof jQuery) {

        // hide the target

        if (options.transition === 'fade') {
            $target.stop().fadeOut();
        } else if (options.transition === 'slide') {
            $target.stop().slideUp();
        } else {
            $target.hide();
        }

        // trigger custom event

        $target.trigger('yoi-hide');

    }

}