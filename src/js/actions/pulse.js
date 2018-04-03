/** pulse.js */

YOI.action.Pulse = function($trigger, $target, options) {

    /**
     *  Blink animation.
     *
     *  @param {jQuery element} $trigger - the element which triggered the script
     *  @param {jQuery element} $target  - the target element
     *  @param {object}         options
     */

    if ($target instanceof jQuery) {
        YOI.pulse($target, options.times);
    }

}
