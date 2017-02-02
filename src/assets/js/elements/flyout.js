/** flyouts.js */

var Flyout = (function() {

    // private functions
    // =================

    function initializeFlyout($flyout) {

        /**
         *  Initialize all *[data-flyout] found in the document (= function call without parameters)
         *  or target one or more specific *[data-flyout] (= function call with $dock).
         *  $flyout must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $flyout - the flyout(s)
         */

        if (!($flyout instanceof jQuery)) {
            $flyout = $('[data-flyout]');
        }

        $flyout.each(function() {

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
