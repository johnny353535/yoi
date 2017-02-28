/** flyouts.js */

YOI.Flyout = (function() {

    // private functions
    // =================

    function initializeFlyout($flyout, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $flyout
         *  @param {object}            options
         */

        var $flyout = YOI.createCollection('flyout', $flyout, options);

        if ($flyout) $flyout.each(function() {

            var $thisFlyout   = $(this).detach();
            var $flyoutHandle = $thisFlyout.find('.flyout__handle');

            // if no left/right modifier class was found,
            // fall back to "left" as default

            if (!$thisFlyout.hasClass('flyout--left') && !$thisFlyout.hasClass('flyout--right')) {
                $thisFlyout.addClass('flyout--left');
            }

            // hide the flyout

            hideFlyout($thisFlyout);

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
        
        if ($thisFlyout.data().state == 'visible') {
            hideFlyout($thisFlyout)
        } else {
            showFlyout($thisFlyout);
        }
        
    }

    function showFlyout($thisFlyout) {

        /**
         *  Show the flyout.
         *
         *  @param  {jQuery dom object} $thisFlyout - the flyout
         */
        
        $thisFlyout
            .removeClass('flyout--hidden')
            .addClass('flyout--visible')
            .trigger('yoi-flyout:visible');
            
        $thisFlyout.data().state = 'visible';
        
    }

    function hideFlyout($thisFlyout) {

        /**
         *  Hide the flyout.
         *
         *  @param  {jQuery dom object} $thisFlyout - the flyout
         */
        
        $thisFlyout
            .removeClass('flyout--visible')
            .addClass('flyout--hidden')
            .trigger('yoi-flyout:hidden');
            
        $thisFlyout.data().state = 'hidden';

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
