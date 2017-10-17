/** parallax.js */

YOI.behaviour.Parallax = (function() {
    
    // private variables
    // =================
    
    var $window                 = $(window);
    var $activeParallaxElements = $();
    
    var currentScrollTop        = 0;
    var defaultSpeed            = 5;
    
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
        
        if ($parallaxElement) $parallaxElement.each(function() {
        
            // cancel if already initialized

            if ($(this).data().props.isParallax) return false;
            
            // proceed
            
            $activeParallaxElements = $activeParallaxElements.add($(this));
            
            // set initialized

            $(this).data().props.isParallax = true;
        
        });
        
        // initialize the YOI scroll agent
        
        YOI.module.ScrollAgent.init($parallaxElement);
        
        // attach events

        $window
            .on('yoi-scroll-up', function() {
                updateParallaxEnv();
                scrollParallax('up');
            })
            .on('yoi-scroll-down', function() {
                updateParallaxEnv();
                scrollParallax('down');
            })
            .on('yoi-scroll-stop', function() {
                tweenBack();
            })
            .on('load resize', function() {
                updateParallaxEnv();
            });

    }
    
    function scrollParallax(direction) {

        /**
         *  Adds a position offset to all target elements while scrolling to
         *  create a parallax effect.
         *
         *  @param  {string} direction - the scroll direction ('up' or 'down')
         */
        
        // cancel on scrolling 'overshoots'
        
        if (scrollOvershoot()) return;
        
        // manipulate the position offset of each element
        // in the collection
        
        $activeParallaxElements.each(function() {

            var $this  = $(this);
            var offset = $this.data().props.offset || 0;
            var state  = $this.data().state;
            
            //
            
            if (state === 'in' || state === 'center') {
            
                var speed = $this.data().options.speed || defaultSpeed;
                
                if (direction === 'down') $this.data().props.offset = parseFloat(offset, 10) + parseFloat(speed, 10) + 'px';
                if (direction === 'up')   $this.data().props.offset = parseFloat(offset, 10) - parseFloat(speed, 10) + 'px';
                    
                $this.css('transform', 'translate3d(0, ' + offset + ', 1px)');
            
            }

        });

    }
    
    function updateParallaxEnv() {
        
        /**
         *  Updates important environment variables that are shared
         *  throughout the script.
         */
        
        currentScrollTop = $window.scrollTop();
        viewPortHeight   = $window.height();
        
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
    
    function tweenBack() {
        
        /**
         *  
         *
         *  @param  {}  - 
         *  @return {}  - 
         */
        
        $activeParallaxElements.each(function() {

            var $this = $(this);

            if ($window.scrollTop() < 1) {
                $this.css('transition','all 100ms ease-in-out');
                $this.css('transform', 'translate3d(0, 0, 1px)');
            } else {
                $this.css('transition','none');
            }
            
        });

    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();

/*
    - test weather the element is an image
    - add load events accordingly
    - otherwise, implement like materialize
*/
