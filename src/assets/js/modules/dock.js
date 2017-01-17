/** dock.js */

var Dock = (function() {

    // private functions
    // =================

    function initializeDock($dock, options) {
    
        /**
         *  Initialize all *[data-dock] found in the document (= function call without parameters)
         *  or target one or more specific *[data-dock] (= function call with $dock).
         *  $dock must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $dock - the dock(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div class="dock" data-dock="autohide:true;">
         *
         *  Available options:
         *
         *  @option {boolean} autohide - if set to "true", the dock is initially hidden
         */
        
        if (!($dock instanceof jQuery)) {
            $dock = $('[data-dock]');
        }

        $dock.each(function() {

            var $thisDock = $(this);
            var options   = options === undefined ? YOI.toObject($thisDock.data('dock')) : options;

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
    }

    function showDock($thisDock) {

        /**
         *  Show the dock.
         *
         *  @param {jQuery dom object} $thisDock - the dock
         */

        $thisDock.removeClass('is--hidden');
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
