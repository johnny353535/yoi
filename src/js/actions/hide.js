/** hide.js */

YOI.action.Hide = function($target, options) {

    /**
     *  Hides the target element.
     *
     *  @param {jQuery dom object} $target
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