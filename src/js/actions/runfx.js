/** runfx.js */

YOI.action.RunFx = function($trigger, $target, options) {

    /**
     *  Adds one of YOI's CSS fx-classes to the target element.
     *
     *  @param {jQuery dom object} $trigger - the element which triggered the script
     *  @param {jQuery dom object} $target  - the target element
     *  @param {object}            options
     */

    if ($target instanceof jQuery) {

        var fx    = options.fx || false;
        var speed = options.speed || false;
        
        // reset fx
        
        YOI.resetFx($target);

        // add fx classes

        if (speed) $target.addClass('fx-' + speed);
        if (fx) $target.addClass('fx-' + fx);

    }

};

// run resetFx() on dom ready

$(function() {
    YOI.resetFx();
});