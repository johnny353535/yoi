/** dock.js */

var Dock = (function() {

    // private functions
    // =================

    function initializeDock() {

        /**
         *  Initialite the dock by preparing the dom
         *  and attaching events.
         */

        $('[data-dock]').each(function() {

            var $thisDock = $(this);
            var options = Helper.toObject($thisDock.data('dock'));

            // auto hide

            if (options.autohide) {

                hideDock($thisDock);

                $thisDock
                    .on('mouseover', function() {
                        Helper.clearDelay('hideDockTimeout');
                        showDock($thisDock);
                    })
                    .on('mouseout', function() {
                        Helper.setDelay('hideDockTimeout', 750, function() {
                            hideDock($thisDock);
                        });
                    });

            }

        });

    }

    function hideDock($thisDock) {

        /**
         *  Hide the dock.
         *
         *  @param {jQuery dom object} $thisDock - the dock
         */

        $thisDock.addClass('dock--hidden');
    }

    function showDock($thisDock) {

        /**
         *  Show the dock.
         *
         *  @param {jQuery dom object} $thisDock - the dock
         */

        $thisDock.removeClass('dock--hidden');
    }

    // initialize
    // ==========

    initializeDock();

    // public functions
    // ================

    return {
        init : initializeDock,
        hide : hideDock,
        show : showDock
    }

})();
