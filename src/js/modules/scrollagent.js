/** Scrollagent.js */

YOI.module.ScrollAgent = (function() {

    /**
     *  Creates a collection of dom object that respond to their
     *  current position while scrolling. For example, a dom object
     *  fires the custom event 'yoi-viewport-in' when it scrolls into
     *  the viewport.
     */

    // private vars
    // ============

    var initialized      = false;
    var $window          = $(window);
    var viewportHeight   = $window.height();
    var lastScrollTop    = 0;
    var currentScrollTop = 0;

    // private functions
    // =================

    function initialize($targetElement) {

       /**
        *  Initialize the script.
        *
        *  @param {jQuery element} $targetElement
        */

        // create a collection from all target elements

        if (YOI.isjQuery($targetElement)) YOI.createCollection('scrollagent', $targetElement);

        // attach events

        if (!initialized) {

            $window
                .on('load.yoi-scrollAgent resize.yoi-scrollAgent yoi-pageheight-change.scrollAgent', function() {
                    update();
                })
                .on('yoi-scroll.scrollAgent', function() {
                    observe();
                });

            // set initialized flag

            initialized = true;

        }

        // initially run update

        update();

        // even if initialize() got called without $targetElement, still broadcast custom scroll events
        // (yoi-scroll, yoi-scroll-up, yoi-scroll-down, yoi-scroll-stop)

        $window.off('scroll.yoi-scrollAgent').on('scroll.yoi-scrollAgent', function() {
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

        var $collection = YOI.collection['scrollagent'] || false;

        if ($collection) $collection.each(function() {

            var $targetElement  = $(this);
            var thisHeight      = $targetElement.outerHeight();
            var thisInitialPosY = $targetElement.offset().top;
            var props           = $targetElement.data().props;

            // write data

            props.height      = thisHeight;
            props.initialPosY = thisInitialPosY;

            // set the initial state

            if ($window.scrollTop() < thisInitialPosY && $window.height() > thisInitialPosY + 10) {
                $targetElement.data().state = 'in';
                $targetElement.trigger('yoi-viewport-in');
            } else {
                $targetElement.data().state = 'out';
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

        var $collection = YOI.collection['scrollagent'] || false;

        if ($collection) $collection.each(function(index) {

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
         *  yoi-scroll          => page is scrolling
         *  yoi-scroll-up       => page is scrolling up
         *  yoi-scroll-down     => page is scrolling down
         *  yoi-scroll-start    => page started scrolling (fires only once)
         *  yoi-scroll-stop     => page stopped scrolling (fires only once)
         *  yoi-scroll-slowdown => scrolling slows down (only on browsers with eased-out scrolling)
         */

        var isScrolling      = false;
        var slowDown         = 1;
        var currentScrollTop = 0;

        if (typeof window['scrollObserverInterval'] !== 'number') {

            YOI.setInterval('scrollObserverInterval', 10, function() {

                // record current scroll position

                currentScrollTop = $window.scrollTop();

                // general scrolling event

                $window.trigger('yoi-scroll');

                // scroll start event

                if (!isScrolling) {
                    $window.trigger('yoi-scroll-start');
                    isScrolling = true;
                }

                // scroll direction

                if (currentScrollTop < lastScrollTop) $window.trigger('yoi-scroll-up');
                if (currentScrollTop > lastScrollTop) $window.trigger('yoi-scroll-down');

                // slowdown

                if (Math.abs(lastScrollTop - currentScrollTop) === 0) ++slowDown;
                if (slowDown > 15) $window.trigger('yoi-scroll-slowdown');

                // record last scroll position

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
