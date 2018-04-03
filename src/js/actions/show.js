/** show.js */

YOI.action.Show = function($trigger, $target, options) {

    /**
     *  Reveals the target element.
     *
     *  @param {jQuery element} $trigger - the element which triggered the script
     *  @param {jQuery element} $target  - the target element
     *  @param {object}         options
     *
     *  Available options:
     *
     *  @option {string} transition - Chose from two jQuery animations: 'fade' and 'slide'.
     */

    if ($target instanceof jQuery) {

        var fx    = options.fx || false;
        var speed = options.speed || false;

        // add fx

        if (fx) $target.addClass('fx-' + fx);
        if (fx && speed) $target.addClass('fx-' + speed);

        // show and trigger custom event

        $target.show().trigger('yoi-show');

    }

}

YOI.action.Show.init = function() {

    /**
     *  Prepares all target elements. Adds initial styling
     *  to make CSS animations work properly.
     */

    var selectors = '\
        [yoi-action*="Show"],\
        [yoi-action-1*="Show"],\
        [yoi-action-2*="Show"],\
        [yoi-action-3*="Show"],\
        [yoi-action-4*="Show"]\
    ';

    $(selectors).each(function() {

        // update options

        YOI.updateOptions($(this));

        // assign vars

        var $this          = $(this);
        var options        = $this.data().options;
        var targetSelector = options.Show;
        var fx             = options.fx || false;
        var $target;

        // get the target element

        switch (targetSelector) {
            case 'self':
                $target = $this;
                break;
            case 'parent':
                $target = $this.parent();
                break;
            default:
                $target = $(targetSelector);
        }

        // prepare the target element

        if ($target instanceof jQuery) {

            // remove all fx-classes

            $target.removeClass(function (index, className) {
                return (className.match (/(^|\s)fx-\S+/g) || []).join(' ');
            });

            // add initial fx-classes

            if (fx) {
                $target.addClass('fx-' + fx + '-initial').removeClass('fx-' + fx);
            }

            // hide the target element

            $target.hide();

        }

    });

}
