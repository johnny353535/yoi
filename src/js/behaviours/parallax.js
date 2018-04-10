/** parallax.js */

YOI.behaviour.Parallax = (function() {

    // private variables
    // =================

    var $window          = $(window);
    var currentScrollTop = $window.scrollTop();
    var defaultFactor    = 8;

    // private functions
    // =================

    function initialize($parallaxElement, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery element} $parallaxElement
         *  @param {object}         options
         */

        var $parallaxElement = YOI.createCollection('parallax', $parallaxElement, options);

        if ($parallaxElement) {

            $parallaxElement.each(function() {

                var $this = $(this);

                // cancel if already initialized

                if ($this.data().props.isParallax) return;

                // update parallax element

                YOI.module.ScrollAgent.init($this);
                update($this);

                // set initialized

                $this.data().props.isParallax = true;

            });

            //

            updateParallaxEnv();
            updateAll();
            scrollParallax();

            // start parallax observer

            startParallaxObserver();

            // ///

            // $window.trigger('yoi-scroll.parallax');

        }

    }

    function update($parallaxElement) {

        /**
         *  Updates a parallax element. Initializes YOI.scrollAgent on first
         *  call, etc.
         *
         *  @param {jQuery element} $parallaxElement
         */

        var data = $parallaxElement.data();

        // // observe element via YOI.ScrollAgent

        // if (!data.props.isParallax) {
        //     YOI.module.ScrollAgent.init($parallaxElement);
        // }

        // edge case: flag elements which are already inside the viewport
        // on dom-ready

        if (data.state !== 'out') {
            $parallaxElement.data().props.startsInViewport = true;
        }

    }

    function resetAll() {

        /**
         *
         *
         */

        YOI.elementCollection['parallax'].each(function() {

            var $this = $(this);

            $this.data().props = {};
            $this.css('transform','none');

        });

    }

    function updateAll() {

        /**
         *  Simple helper function to update all parallax elements
         *  in the collection $parallaxElement.
         *
         *  @param {jQuery element} $parallaxElement
         */

        YOI.elementCollection['parallax'].each(function() {
            update($(this));
        });

    }

    function startParallaxObserver() {

        /**
         *
         *
         */

        $window
            .on('yoi-breakpoint-change.parallax yoi-pageheight-change.parallax', function() {
                scrollParallax();
                updateParallaxEnv();
                updateAll();
            })
            .on('yoi-scroll.parallax', function() {
                updateParallaxEnv();
                scrollParallax();
            });

    }

    function scrollParallax() {

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

                var $this               = $(this);
                var data                = $this.data();
                var state               = data.state;
                var initialPosY         = data.props.initialPosY;
                var factor              = data.options.factor || defaultFactor;
                var scrollTopInViewport = initialPosY - (currentScrollTop + viewportHeight);
                var parallaxOffset      = data.props.startsInViewport ? parseInt(currentScrollTop / factor, 10) : parseInt(scrollTopInViewport / factor, 10);

                if (state !== 'out') {
                    $this.css('transform', 'translate3d(0, ' + parallaxOffset + 'px, 1px)');
                }

            });

        });

    }

    function updateParallaxEnv() {

        /**
         *  Updates shared variables.
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
         *
         *
         */

        $window.off('yoi-breakpoint-change.parallax yoi-pageheight-change.parallax yoi-scroll.parallax');
        YOI.filterCollection('scrollagent', 'isParallax');
        resetAll();
        YOI.destroyCollection('parallax');

    }

    // public functions
    // ================

    return {
        init : initialize,
        destroy : destroy
    };

})();
