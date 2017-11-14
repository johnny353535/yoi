/** parallax.js */

YOI.behaviour.Parallax = (function() {
    
    // private variables
    // =================
    
    var $window                 = $(window);
    var $activeParallaxElements = $();
    var currentScrollTop        = 0;
    var defaultFactor           = 8;
    var initialized             = false;

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
                
                // add parallax element to new element collection

                $activeParallaxElements = $activeParallaxElements.add($this);
                
                // update parallax element
                
                updateParallaxElement($this);

                // set initialized

                $this.data().props.isParallax = true;
                
            });
            
            // to avoid positioning errors, always scroll the page
            // back to top on dom-ready

            resetScroll();
            
            // cancel if already initialized
            
            if (initialized) return;
            
            // attach events

            $window.on('resize yoi-scroll', function() {
                updateParallaxEnv();
                scrollParallax();
            });

            // set initialized
            
            initialized = true;

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
        
        window.requestAnimationFrame(function () {
            
            $activeParallaxElements.each(function() {
            
                var $this               = $(this);
                var data                = $this.data();
                var state               = data.state;
                var initialPosY         = data.props.initialPosY;
                var factor              = data.options.factor || defaultFactor;
                var scrollTopInViewport = initialPosY - (currentScrollTop + viewportHeight);
                var parallaxOffset      = data.props.startsInViewport ? parseInt(currentScrollTop / factor, 10) : parseInt(scrollTopInViewport / factor, 10);
            
                if (state === 'in' || state === 'center') {
                    $this.css('transform', 'translate3d(0, ' + parallaxOffset + 'px, 1px)');
                }

            });
            
        });

    }
    
    function updateParallaxElement($parallaxElement) {

        /**
         *  Updates a parallax element. Initializes YOI.scrollAgent on first
         *  call, etc.
         *
         *  @param {jQuery dom object} $parallaxElement
         */
        
        var data = $parallaxElement.data();
        
        // observe element via YOI.ScrollAgent
        
        if (!data.props.isParallax) {
            YOI.module.ScrollAgent.init($parallaxElement);
        }

        // edge case: flag elements which are already inside the viewport
        // on dom-ready
        
        if ((data.state === 'in' || data.state === 'center')) {
            $parallaxElement.data().props.startsInViewport = true;
        }
        
        // if the $parallaxElement is an image, recursively call
        // updateParallaxElement() since dimensions such as document
        // height are very likely to have changed
        
        if ($parallaxElement.is('img')) {
            $parallaxElement.on('load', function() {
                updateParallaxElement($parallaxElement);
                updateParallaxEnv();
            });
        }

    }
    
    function resetScroll() {
        
        /**
         *  Scrolls the page back to top to avoid errors
         *  with parallax scrolling.
         */
        
        $('body').scrollTop(0);
        
        $window.on('unload', function() {
            $window.scrollTop(0);
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

    // public functions
    // ================

    return {
        init : initialize
    };

})();
