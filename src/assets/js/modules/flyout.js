/** flyouts.js */

var Flyout = (function() {

    // private functions
    // =================

    function initializeFlyout() {

        /**
         *  Initialize the flyout menus by preparing the dom and
         *  attaching events.
         */

        $('.flyout').each(function() {

            var $thisFlyout = $(this).detach();
            var $flyoutHandle = $thisFlyout.find('.flyout__handle');

            // if no left/right modifier class was found,
            // fall back to "left" as default

            if (!$thisFlyout.hasClass('flyout--left') && !$thisFlyout.hasClass('flyout--right')) {
                $thisFlyout.addClass('flyout--left');
            }

            // hide the flyout

            $thisFlyout.addClass('flyout--hidden');

            // add events to flyout handle

            $flyoutHandle.on('click', function() {
                toggleFlyout($thisFlyout);
            });

            // move the flyout in markup to make it a
            // direct child of the body

            $('body').append($thisFlyout);

        });

    }

    function toggleFlyout($thisFlyout) {

        /**
         *  Toggle the flyout.
         *
         *  @param  {jQuery dom object} $thisFlyout - the flyout
         */

        $thisFlyout.toggleClass('flyout--visible');
    }

    function showFlyout($thisFlyout) {

        /**
         *  Show the flyout.
         *
         *  @param  {jQuery dom object} $thisFlyout - the flyout
         */

        $thisFlyout.removeClass('flyout--visible')
    }

    function hideFlyout($thisFlyout) {

        /**
         *  Hide the flyout.
         *
         *  @param  {jQuery dom object} $thisFlyout - the flyout
         */

        $thisFlyout.addClass('flyout--visible');
    }

    // initialize
    // ==========

    initializeFlyout();

    // public functions
    // ================

    return {
        init   : initializeFlyout,
        toggle : toggleFlyout,
        show   : showFlyout,
        hide   : hideFlyout
    }

})();
