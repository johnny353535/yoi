/** hide.js */

YOI.action.Hide = function($trigger, $target, options) {

    /**
     *  Hides the target element.
     *
     *  @param {jQuery element} $trigger - the element which triggered the script
     *  @param {jQuery element} $target  - the target element
     *  @param {object}         options
     *
     *  Available options:
     *
     *  @option {string} on      - an event, the default event is "click"
     *  @option {string} fx      - optional fx utility class to add an animation
     *  @option {string} speed   - optional "slow" or "fast", speed for fx-animation
     *  @option {bool}   toggle  - optional, toggles/reverses the action on next call
     */

    if (YOI.isjQuery($target)) {

        var fx     = options.fx || false;
        var toggle = options.toggle === 'true' ? true : false;
        var speed  = options.speed || false;
        var remove = options.remove === 'true' ? true : false;

        // toggle/show

        if (toggle && $target.is(':hidden')) {
            YOI.removeFx($target);
            YOI.action.Show(false, $target, { 'fx' : YOI.reverseFx(fx), 'speed' : speed });
            return;
        }

        // hide with fx

        if (fx) {
            $target.addClass('fx-' + fx + '-initial');
            $target.addClass('fx-' + fx);
            $target.on('animationend', function() {
                YOI.hide($target);
                YOI.removeFx($target);
                $target.trigger('yoi-hide');
                $target.off('animationend');
                if (remove) $target.remove().trigger('yoi-remove');
            });
            return;
        }

        // hide without fx

        YOI.hide($target)
        $target.trigger('yoi-hide');
        if (remove) $target.remove().trigger('yoi-remove');

    }

}

YOI.action.Hide.init = function() {

    /**
     *  Prepares all target elements. Adds initial styling
     *  to make CSS animations work properly.
     */

    $('[yoi-action*="Hide"]').each(function() {

        // update options

        YOI.updateOptions($(this));

        // assign vars

        var $this          = $(this);
        var options        = $this.data().options;
        var targetSelector = options.Hide;
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

        if (YOI.isjQuery($target)) {

            // remove all fx-classes

            YOI.removeFx($target);

            // add initial fx-classes

            if (fx) {
                $target.addClass('fx-' + fx + '-initial').removeClass('fx-' + fx);
            }

            // show the target element

            YOI.show($target);

        }

    });

}
