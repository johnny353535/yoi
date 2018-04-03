/** Scrollagent.js */

YOI.module.ScrollAgent = (function() {

    /**
     *  Creates a collection of dom object that respond to their
     *  current position while scrolling. For example, a dom object
     *  fires the cutom event 'yoi-viewport-in' when it scrolls into
     *  the viewport.
     */

    // private vars
    // ============

    var $window = $(window);
    var $activeTargetElements;
    var viewportHeight = $window.height();
    var currentScrollTop;
    var lastScrollTop = 0;
    var initialized = false;

    // private functions
    // =================

    function initialize($targetElement) {

       /**
        *  Initialize the script.
        *
        *  @param {jQuery element} $targetElement
        */

        var $targetElement = YOI.createCollection('scrollagent', $targetElement);

        if ($targetElement) {

            // share all target elements in a new variable

            $activeTargetElements = $targetElement;

            // initially run update()

            update();

            // attach events

            if (!initialized) {

                $window
                    .on('load.yoi resize.yoi yoi-pageheight-change', function() {
                        update();
                    })
                    .on('yoi-scroll', function() {
                        observe();
                    });

                // set initialized flag

                initialized = true;

            }

        }

        // always broadcast custom scroll events:
        // yoi-scroll, yoi-scroll-up, yoi-scroll-down, yoi-scroll-stop

        $window.off('scroll.yoi').on('scroll.yoi', function() {
            broadcast();
        });

    }

    function update() {

        /**
         *  Reads data from the custom data-attribute and from calculations (eg. height)
         *  and maps the data directly to it's target objects via jQuery's data() method.
         */

        // update the viewport height

        viewportHeight = $window.height();

        // update all target elements

        $activeTargetElements.each(function() {

            var $thisTargetElement = $(this);
            var thisHeight         = $thisTargetElement.outerHeight();
            var thisInitialPosY    = $thisTargetElement.offset().top;
            var props              = $thisTargetElement.data().props;

            // write data

            props.height      = thisHeight;
            props.initialPosY = thisInitialPosY;

            // set the initial state

            if ($window.scrollTop() < thisInitialPosY && $window.height() > thisInitialPosY + 10) {
                $thisTargetElement.data().state = 'in';
                $thisTargetElement.trigger('yoi-viewport-in');
            } else {
                $thisTargetElement.data().state = 'out';
            }

        });

    }

    function observe() {

        /**
         *  Observes all target elements and fires custom events weather the
         *  element enters or leaves the viewport.
         *
         *  Custom events:
         *
         *  yoi-viewport-in     => element entered the viewport
         *  yoi-viewport-bottom => element completely visible in the viewport
         *  yoi-viewport-center => element's verticle center at verticle center of the viewport
         *  yoi-viewport-top    => element's top edge reached viewport's top edge
         *  yoi-viewport-out    => element left the viewport
         */

        // get current scroll position & current scroll direction

        currentScrollTop = $window.scrollTop();

        // observe all target elements

        $activeTargetElements.each(function(index) {

            var $targetElement = $(this);
            var state          = $targetElement.data().state;
            var initialPosY    = $targetElement.data().props.initialPosY;
            var height         = $targetElement.data().props.height;
            var transformY     = parseFloat($targetElement.css('transform').split(',')[13], 10) || 0;

            var viewportIn;
            var viewportBottom;
            var viewportCenter;
            var viewportTop;
            var viewportOut;

            // calculate viewportIn, viewportCenter & viewportOut

            viewportIn     = (currentScrollTop + viewportHeight) > (initialPosY + transformY) && currentScrollTop < (initialPosY + height + transformY);
            viewportBottom = (currentScrollTop + viewportHeight) > (initialPosY + height + transformY);
            viewportCenter = (currentScrollTop + viewportHeight / 2) > initialPosY + transformY && (currentScrollTop + viewportHeight) < (initialPosY + height + transformY + viewportHeight / 2);
            viewportTop    = currentScrollTop >= initialPosY;
            viewportOut    = !viewportIn;

            // trigger custom viewport-events

            if (viewportIn && state === 'out') {
                $targetElement.trigger('yoi-viewport-in');
                $targetElement.data().state = 'in';
            }

            if (viewportBottom && state === 'in') {
                $targetElement.trigger('yoi-viewport-bottom');
                $targetElement.data().state = 'bottom';
            }

            if (viewportCenter && (state === 'top' || state === 'bottom')) {
                $targetElement.trigger('yoi-viewport-center');
                $targetElement.data().state = 'center';
            }

            if (viewportTop && (state === 'in' || state === 'center')) {
                $targetElement.trigger('yoi-viewport-top');
                $targetElement.data().state = 'top';
            }

            if (viewportOut && !(state === 'out')) {
                $targetElement.trigger('yoi-viewport-out');
                $targetElement.data().state = 'out';
            }

        });

    }

    function broadcast() {

        /**
         *  Starts an interval on scroll and stops the interval after
         *  scrolling. During the interval, custom scroll-events are triggered.
         *  Other Scripts can listen to these events instead of the original scroll
         *  event to boost performance.
         *
         *  Custom events:
         *
         *  yoi-scroll       => page is scrolling
         *  yoi-scroll-up    => page is scrolling up
         *  yoi-scroll-down  => page is scrolling down
         *  yoi-scroll-start => page started scrolling (fires only once)
         *  yoi-scroll-stop  => page stopped scrolling (fires only once)
         */

        var isScrolling = false;

        if (typeof window['scrollObserverInterval'] !== 'number') {

            YOI.setInterval('scrollObserverInterval', 10, function() {

                // general scrolling event

                $window.trigger('yoi-scroll');

                // scroll start event

                if (!isScrolling) {
                    $window.trigger('yoi-scroll-start');
                    isScrolling = true;
                }

                // scroll direction

                var currentScrollTop = $window.scrollTop();

                if (currentScrollTop < lastScrollTop) $window.trigger('yoi-scroll-up');
                if (currentScrollTop > lastScrollTop) $window.trigger('yoi-scroll-down');

                lastScrollTop = currentScrollTop;

            });

        }

        // scroll stop

        YOI.clearDelay('scrollObserverDelay');

        YOI.setDelay('scrollObserverDelay', 250, function() {
            $window.trigger('yoi-scroll-stop');
            YOI.clearInterval('scrollObserverInterval');
            isScrolling = false;
        });

    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();
