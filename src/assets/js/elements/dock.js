/** dock.js */

YOI.element.Dock = (function() {

    // private functions
    // =================

    function initialize($dock, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $dock
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {bool} autohide - if TRUE, dock is initially hidden
         *                            default: FALSE
         */

        var $dock = YOI.createCollection('dock', $dock, options);

        if ($dock) $dock.each(function() {

            var $thisDock = $(this);
            var options   = $thisDock.data().options;

            // auto hide

            if (options.autohide) {

                hide($thisDock);

                $thisDock
                    .on('mouseover', function() {
                        YOI.clearDelay('hideTimeout');
                        show($thisDock);
                    })
                    .on('mouseout', function() {
                        YOI.setDelay('hideTimeout', 750, function() {
                            hide($thisDock);
                        });
                    });

            }

        });

    }

    function hide($thisDock) {

        /**
         *  Hide the dock.
         *
         *  @param {jQuery dom object} $thisDock - the dock
         */

        $thisDock.addClass('is--hidden');
        $thisDock.trigger('yoi-dock:hide');
        $thisDock.data().state = 'hidden';
        
    }

    function show($thisDock) {

        /**
         *  Show the dock.
         *
         *  @param {jQuery dom object} $thisDock - the dock
         */

        $thisDock.removeClass('is--hidden');
        $thisDock.trigger('yoi-dock:show');
        $thisDock.data().state = 'visible';
        
    }

    // public functions
    // ================

    return {
        init : initialize,
        hide : hide,
        show : show
    };

})();
