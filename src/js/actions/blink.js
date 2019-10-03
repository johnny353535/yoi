/** blink.js */

YOI.action.Blink = function($trigger, $target, options) {

    /**
     *  Blink animation.
     *
     *  @param {jQuery element} $trigger - the element which triggered the script
     *  @param {jQuery element} $target  - the target element
     *  @param {object}         options
     */

    if (YOI.isjQuery($target)) {
        YOI.blink($target, options.times);
    }

}
