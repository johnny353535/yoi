/** drawers.js */

var Drawers = (function() {

    // private functions
    // =================

    function initializeDrawers() {

        /**
         *  Initialize drawers by attaching events and initially close
         *  drawers marked as closed in markup.
         */

        // close certain drawers

        $('.drawer.closed > .body, .drawer.closed > .subDrawers').slideUp(0);

        // attach events to close or open all drawers

        $('[data-action="closeDrawers"]').click(function(e) {
            e.preventDefault();
            closeDrawers();
        });

        $('[data-action="openDrawers"]').click(function(e) {
            e.preventDefault();
            openDrawers();
        });

        // open/close individual drawers

        $('.drawer .header').each(function() {

            // define the event: tap on mobile, click on desktop

            var eventType = Helper.environment('mobile') ? 'tap' : 'click';

            // attach event

            $(this).on(eventType, function(e) {

                e.preventDefault();

                var parentDrawer = $(this).parent('.drawer');
                var hasSubdrawers = $(this).parent('.drawer').find('.subDrawers').length > 0 ? true : false;

                if (parentDrawer.hasClass('closed')) {
                    parentDrawer.removeClass('closed').addClass('open');
                    parentDrawer.find('> .body, .subDrawers').stop().slideDown('fast');
                    return;
                }

                if (parentDrawer.hasClass('open')) {
                    parentDrawer.removeClass('open').addClass('closed');
                    parentDrawer.find('> .body, .subDrawers').stop().slideUp('fast');
                    return;
                }

            });

        });

    }

    function closeDrawers() {

        /**
         *  Close all open drawers in document.
         */

        $('.drawer.open').removeClass('open').addClass('closed').find('.body').slideUp('fast');
    }

    function openDrawers() {

        /**
         *  Open all closed drawers in document.
         */

        $('.drawer.closed').removeClass('closed').addClass('open').find('.body').slideDown('fast');
    }

    // initialize
    // ==========

    initializeDrawers();

    // public functions
    // ================

    return {
        init  : initializeDrawers,
        close : closeDrawers,
        open  : openDrawers
    }

})();
