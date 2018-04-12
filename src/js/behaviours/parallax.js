/** parallax.js */

YOI.behaviour.Parallax = (function() {

    // private variables
    // =================

    var $window           = $(window);
    var currentScrollTop  = $window.scrollTop();
    var viewportHeight    = $window.height();
    var defaultFactor     = 8;
    var observerIsRunning = false;

    // private functions
    // =================

    function initialize($parallaxElement, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery element} $parallaxElement
         *  @param {object}         options
         *
         *  @option {string} reference	- CSS selector or the keyword "parent" - defines
         *                                a reference element on the page
         *  @option {number} start      - the offset before a sticky element actually sticks,
         *                                the default offset is 0
         *  @option {number} stop       - the offset after a sticky element no longer sticks
         *  @option {string} not        - a comma-seperated list of strings - the breakpoints/screen-sizes
         *                                on which sticky behaviour is disabled
         */

        var $parallaxElement = YOI.createCollection('parallax', $parallaxElement, options);

        if ($parallaxElement) {

            // flag all parallax elements as initialized

            $parallaxElement.each(function() {
                $(this).data().props.isParallax = true;
            });

            startScrollAgent();
            startParallaxObserver();
            updateProps();

            // trigger one initial scroll

            $window.trigger('yoi-scroll');

            // run only once on first scroll - this is the case if the page loads
            // and jumps to an anchor or gets refreshed and jumps back to it last
            // scroll position

            $window.one('yoi-scroll', function() {
                updateProps();
                updateParallaxEnv();
                transformParallax();
            });

        }

    }

    function startScrollAgent() {

        /**
         *  Initializes the scroll agent on the collection of
         *  sticky elements. The scroll agent observes target elements,
         *  stores and updates their position data and fires custom events
         *  other scripts can listen to.
         */

        YOI.module.ScrollAgent.init(YOI.elementCollection['parallax']);

    }

    function updateProps() {

        /**
         *  Update props of all parallax elements in the collection.
         */

        YOI.elementCollection['parallax'].each(function() {

            var $this = $(this);
            var data  = $this.data();

            // flag elements which are inside the viewport before scrolling

            $this.data().props.startsInViewport = data.props.initialPosY < viewportHeight;

        });

    }

    function resetProps($parallaxElement) {

        /**
         *  Reset all properties.
         *
         *  @param {jQuery element} $parallaxElement
         */

        $parallaxElement.data().props = {};

    }

    function resetTransforms($parallaxElement) {

        /**
         *  Reset all CSS transforms.
         *
         *  @param {jQuery element} $parallaxElement
         */

        $parallaxElement.css('transform','none');

    }

    function resetAll() {

        /**
         *  Reset properties and CSS transforms for all sticky elements.
         */

        YOI.elementCollection['parallax'].each(function() {
            var $this = $(this);
            resetProps($this);
            resetTransforms($this);
        });

    }

    function startParallaxObserver() {

        /**
         *  Start the parallax observer (by attaching event listeners).
         */

        if (observerIsRunning) return;

        $window
            .on('yoi-breakpoint-change.parallax yoi-pageheight-change.parallax', function() {
                updateParallaxEnv();
                updateProps();
                transformParallax();
            })
            .on('yoi-scroll.parallax', function() {
                updateParallaxEnv();
                transformParallax();
            });

        observerIsRunning = true;

    }

    function transformParallax() {

        /**
         *  Adds a position offset to all target elements while scrolling to
         *  create a parallax effect.
         */

        // cancel on scrolling 'overshoots'

        if (scrollOvershoot()) return;

        // manipulate the position offset of each element
        // in the collection

        window.requestAnimationFrame(function() {

            YOI.elementCollection['parallax'].each(function() {

                var activeBreakpoint           = YOI.currentBreakPoint();
                var $this                      = $(this);
                var data                       = $this.data();
                var options                    = $this.data().options;
                var state                      = data.state;
                var initialPosY                = data.props.initialPosY;
                var factor                     = data.options.factor || defaultFactor;
                var not                        = options.not !== undefined ? options.not.split(',') : false;
                var allowedOnCurrentBreakpoint = $.inArray(activeBreakpoint, not) === -1;
                var scrollTopInViewport        = initialPosY - (currentScrollTop + viewportHeight);
                var parallaxOffset             = data.props.startsInViewport ? parseInt(currentScrollTop / factor, 10) * -1 : parseInt(scrollTopInViewport / factor, 10);

                // the element is in the viewport and allowed to scroll parallax
                // on the current breakpoint - apply css transforms

                if (state !== 'out' && allowedOnCurrentBreakpoint) {
                    $this.css('transform', 'translate3d(0, ' + parallaxOffset + 'px, 1px)');
                }

                // the element is not allowed to scroll parallax
                // on the current breakpoint - reset css transforms

                if (!allowedOnCurrentBreakpoint) {
                    resetTransforms($this);
                }

            });

        });

    }

    function updateParallaxEnv() {

        /**
         *  Updates shared "scroll environment" variables.
         */

        currentScrollTop = $window.scrollTop();
        viewportHeight   = $window.height();

    }

    function scrollOvershoot() {

        /**
         *  Returns true for scroll values larger than the document height or
         *  smaller than zero (iOS/Safari "rubberband" effect).
         *
         *  @return {bool}
         */

        return $window.scrollTop() + $window.height() > $(document).height() || $window.scrollTop() < 0;

    }

    function destroy() {

        /**
         *  Disable all parallax behaviour and reset all changes to
         *  the document or element stylings, remove all related event listeners.
         */

        $window.off('yoi-breakpoint-change.parallax yoi-pageheight-change.parallax yoi-scroll.parallax');
        YOI.filterCollection('scrollagent', 'isParallax');
        resetAll();
        YOI.destroyCollection('parallax');
        observerIsRunning = false;

    }

    // public functions
    // ================

    return {
        init : initialize,
        destroy : destroy
    };

})();
