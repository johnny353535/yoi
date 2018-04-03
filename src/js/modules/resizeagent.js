/** ResizeAgent.js */

YOI.module.Resizeagent = (function() {

    // private vars
    // ============

    var $document   = $(document);
    var $window     = $(window);
    var $body       = $('body');
    var initialized = false;

    var lastBreakPoint;
    var activeBreakPoint;

    var lastPageHeight;
    var currentPageHeight;

    // private functions
    // =================

    function initialize() {

        /**
         *  Listens to the document ready and window resize events
         *  to run the observe() function.
         */

        // cancel if already initialized

        if (initialized) return false;

        // proceed, attach events

        $window.on('resize.yoi.resizeAgent', function() {
            reportResizeChange();
            reportPageHeightChange();
        });

        $document.ready(function() {
            reportBreakPointChange();
            reportPageHeightChange();
        });

        // set initialized flag

        initialized = true;

    }

    function reportResizeChange() {

        /**
         *  Fires a custom event when the window got resized.
         */

        YOI.clearDelay('reportResizeChangeDelay');

        YOI.setDelay('reportResizeChangeDelay', 250, function() {
            $window.trigger('yoi-resize.resizeAgent');
        });

    }

    function reportBreakPointChange() {

        /**
         *  Fires a custom event when the breakpoint changed
         *  (eg. 'yoi-breakpoint-large').
         */

        activeBreakPoint = YOI.currentBreakPoint();

        // trigger the custom event if the breakpoint has changed

        if (activeBreakPoint !== lastBreakPoint) {

            YOI.clearDelay('reportBreakPointChangeDelay');

            YOI.setDelay('reportBreakPointChangeDelay', 250, function() {
                $window.trigger('yoi-breakpoint-change.resizeAgent');
                $window.trigger('yoi-breakpoint-' + activeBreakPoint + '.resizeAgent');
            });

            // remember last breakpoint

            lastBreakPoint = activeBreakPoint;

        }

    }

    function reportPageHeightChange() {

        /**
         *  Observes the page height on an interval to
         *  trigger a custom event other scripts can
         *  listen to.
         */

        lastPageHeight = $body.height();

        YOI.setInterval('reportPageHeightChangeInterval', 1000, function() {

            currentPageHeight = $body.height();

            if (currentPageHeight !== lastPageHeight) {
                $window.trigger('yoi-pageheight-change.resizeAgent');
                lastPageHeight = $body.height();
            }

        });

    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();
