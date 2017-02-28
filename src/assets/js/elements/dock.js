/** dock.js */

YOI.Dock = (function() {

    // private functions
    // =================

    function initializeDock($dock, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $dock
         *  @param {object}            options
         */

        var $dock = YOI.createCollection('dock', $dock, options);

        if ($dock) $dock.each(function() {

            var $thisDock = $(this);
            var options   = $thisDock.data().options;

            // auto hide

            if (options.autohide) {

                hideDock($thisDock);

                $thisDock
                    .on('mouseover', function() {
                        YOI.clearDelay('hideDockTimeout');
                        showDock($thisDock);
                    })
                    .on('mouseout', function() {
                        YOI.setDelay('hideDockTimeout', 750, function() {
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

        $thisDock.addClass('is--hidden');
        $thisDock.trigger('yoi-dock:hide');
        $thisDock.data.state() = 'hidden';
        
    }

    function showDock($thisDock) {

        /**
         *  Show the dock.
         *
         *  @param {jQuery dom object} $thisDock - the dock
         */

        $thisDock.removeClass('is--hidden');
        $thisDock.trigger('yoi-dock:show');
        $thisDock.data.state() = 'visible';
        
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
