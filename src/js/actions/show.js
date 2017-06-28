/** show.js */

YOI.action.Show = function($trigger, $target, options) {

    /**
     *  Reveals the target element.
     *
     *  @param {jQuery dom object} $trigger - the element which triggered the script
     *  @param {jQuery dom object} $target  - the target element
     *  @param {object}            options
     *
     *  Available options:
     *
     *  @option {string} transition - Chose from two jQuery animations: 'fadeIn' and 'slideDown'.
     */

    if ($target instanceof jQuery) {

        // apply event on trigger and hide target

        if (options.transition === 'fadeIn') {
            $target.stop().fadeIn();
        } else if (options.transition === 'slideDown') {
            $target.stop().slideDown();
        } else {
            $target.show();
        }

        // trigger custom event

        $target.trigger('yoi-show');
        
    }

}