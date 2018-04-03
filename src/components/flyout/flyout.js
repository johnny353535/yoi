/** flyout.js */

YOI.component.Flyout = (function() {

    // private functions
    // =================

    function initialize($flyout, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery element} $flyout
         *  @param {object}         options
         */

        var $flyout = YOI.createCollection('flyout', $flyout, options);

        if ($flyout) $flyout.each(function() {

            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // proceed

            var $thisFlyout   = $(this).detach();
            var $flyoutHandle = $thisFlyout.find('.flyout__handle');

            // if no left/right modifier class was found,
            // fall back to "left" as default

            if (!$thisFlyout.hasClass('flyout--left') && !$thisFlyout.hasClass('flyout--right')) {
                $thisFlyout.addClass('flyout--left');
            }

            // hide the flyout

            hide($thisFlyout);

            // add events to flyout handle

            $flyoutHandle.on('click', function() {
                toggle($thisFlyout);
            });

            // move the flyout in markup to make it a
            // direct child of the body

            $('body').append($thisFlyout);

            // set initialized

            YOI.setReady($(this));

        });

    }

    function toggle($thisFlyout) {

        /**
         *  Toggle the flyout.
         *
         *  @param  {jQuery element} $thisFlyout - the flyout
         */

        if ($thisFlyout.data().state == 'visible') {
            hide($thisFlyout);
        } else {
            show($thisFlyout);
        }

    }

    function show($thisFlyout) {

        /**
         *  Show the flyout.
         *
         *  @param  {jQuery element} $thisFlyout - the flyout
         */

        $thisFlyout
            .removeClass('flyout--hidden')
            .addClass('flyout--visible')
            .trigger('yoi-flyout-visible');

        $thisFlyout.data().state = 'visible';

    }

    function hide($thisFlyout) {

        /**
         *  Hide the flyout.
         *
         *  @param  {jQuery element} $thisFlyout - the flyout
         */

        $thisFlyout
            .removeClass('flyout--visible')
            .addClass('flyout--hidden')
            .trigger('yoi-flyout-hidden');

        $thisFlyout.data().state = 'hidden';

    }

    // public functions
    // ================

    return {
        init   : initialize,
        toggle : toggle,
        show   : show,
        hide   : hide
    };

})();
