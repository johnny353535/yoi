/** blink.js */

YOI.action.Blink = function($trigger, $target, options) {

    /**
     *  Blink animation.
     *
     *  @param {jQuery dom object} $trigger - the element which triggered the script
     *  @param {jQuery dom object} $target  - the target element
     *  @param {object}            options
     */

    if ($target instanceof jQuery) {
        YOI.blink($target, options.times);
    }

}