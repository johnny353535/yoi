/** parallax.js */

YOI.behaviour.Parallax = (function() {
    
    // private variables
    // =================
    
    var $document        = $(document);
    var $window          = $(window);
    var currentScrollTop = 0;
    var initialScrollTop = $window.scrollTop();
    var defaultFactor    = 8;
    var initialized      = false;
    var $activeParallaxElements;
    
    // private functions
    // =================

    function initialize($parallaxElement, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $parallaxElement
         *  @param {object}            options
         */

        var $parallaxElement = YOI.createCollection('parallax', $parallaxElement, options);

        if ($parallaxElement) {
            
            // proceed
            
            $parallaxElement.each(function() {

                var $this = $(this);

                // cancel if already initialized

                if ($this.data().props.isParallax) return false;

                // store element collection in a new
                // shared variable
                
                $activeParallaxElements = $parallaxElement;
                
                // update all parallax elements
                
                updateParallaxElements();
                
                // set initialized

                $this.data().props.isParallax = true;

            });
            
            if (!initialized) {
            
                // attach events
        
                $window.on('resize yoi-scroll', function() {
                    updateParallaxEnv();
                    scrollParallax();
                });
                
                // to avoid hickups, always scroll the page
                // back to top on dom-ready
            
                resetScroll();
                
                // set initialized flag
                
                initialized = true;
                
            }
            
        }

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

        $activeParallaxElements.each(function() {
            
            var $this               = $(this);
            var data                = $this.data();
            var state               = data.state;
            var initialPosY         = data.props.initialPosY;
            var factor              = data.options.factor || defaultFactor;
            var scrollTopInViewport = initialPosY - (currentScrollTop + viewportHeight);
            var parallaxOffset      = data.startsInViewport ? parseInt(currentScrollTop / factor, 10) : parseInt(scrollTopInViewport / factor, 10);
            
            if (state === 'in' || state === 'center') {
                $this.css('transform', 'translate3d(0, ' + parallaxOffset + 'px, 1px)');
            }

        });

    }
    
    function updateParallaxElements() {

        /**
         *  Updates all parallax elements by attaching load-events and adding
         *  them to the collection of elements watched by YOI.ScrollAgent.
         */

        $activeParallaxElements.each(function() {

            var $this = $(this);
            var state = $this.data().state;
            
            // observe element via YOI.ScrollAgent
            
            YOI.module.ScrollAgent.init($this);
            
            // edge case: flag elements which are already inside the viewport
            // on dom-ready

            if ((state === 'in' || state === 'center')) {
                $this.data().startsInViewport = true;
            }
            
            // attach load event to each parallax element -
            // if the element is an image, the document dimensions might change

            if ($this.is('img')) {
                $this.on('load', function() {
                    updateParallaxEnv();
                    scrollParallax();
                });
            }

        });

    }
    
    function resetScroll() {
        
        /**
         *  Always scroll the page back to top to avoid errors
         *  with parallax scrolling.
         */
        
        $('body').scrollTop(0);
        
        $window.on('unload', function() {
            $window.scrollTop(0);
        });
        
    }

    function updateParallaxEnv() {

        /**
         *  Updates important environment variables that are shared
         *  throughout the script.
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

    // public functions
    // ================

    return {
        init : initialize
    };

})();
