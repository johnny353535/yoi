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
     *  @option {string} on      - an event, the default event is "click"
     *  @option {string} fx      - optional fx utility class to add an animation
     *  @option {string} speed   - optional "slow" or "fast", speed for fx-animation
     *  @option {bool}   toggle  - optional, toggles/reverses the action on next call
     */

    if (YOI.isjQuery($target)) {

        var fx     = options.fx || false;
        var toggle = options.toggle === 'true' ? true : false;
        var speed  = options.speed || false;

        // toggle/hide

        if (toggle && $target.is(':visible')) {
            YOI.removeFx($target);
            YOI.action.Hide(false, $target, { 'fx' : YOI.reverseFx(fx), 'speed' : speed });
            return;
        }

        // show with fx

        if (fx) {
            if (speed) $target.addClass('fx-' + speed);
            YOI.show($target);
            $target.addClass('fx-' + fx + '-initial');
            $target.addClass('fx-' + fx);
            $target.on('animationend', function() {
                YOI.removeFx($target);
                $target.trigger('yoi-show');
                $target.off('animationend');
            });
            return;
        }

        // show without fx

        YOI.show($target);
        $target.trigger('yoi-show');

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

        if (YOI.isjQuery($target)) {

            if (fx) {
                YOI.removeFx($target);
                $target.addClass('fx-' + fx + '-initial');
            }

            YOI.hide($target);

        }

    });

}
