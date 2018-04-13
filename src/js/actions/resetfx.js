YOI.action.ResetFx = function($trigger, $target, options) {

    /**
     *  Resets Yoi fx-utility class names for a given $target.
     *
     *  @param {jQuery element} $trigger - the element which triggered the script
     *  @param {jQuery element} $target  - the target element
     *  @param {object}         options
     *
     *  Available options:
     *
     *  @option {string} fx  - fx utility class to remove
     */

    var $target = ($target instanceof jQuery) ? $target : false;
    var fx      = options.fx || false;

    if ($target.length && fx) {
        $target.removeClass('fx-' + fx);
        $target.addClass('fx-' + fx + '-initial');
    }

}
