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
    
    var $window        = $(window);
    var viewportHeight = $window.height();
    var lastScrollTop  = 0;
    var viewportIn;
    var viewportOut;
    var viewportCenter;
    
    var $activeTargetElements;
    var initialized = false;
    
    // private functions
    // =================
    
    function initialize($targetElement) {
        
       /**
        *  Initialize the script.
        *
        *  @param {jQuery dom object} $targetElement
        */
        
        var $targetElement = YOI.createCollection('scrollagent', $targetElement);
        
        if ($targetElement) {
            
            // share all target elements in a new variable
        
            $activeTargetElements = $targetElement;
            
            // initially run update(), observe() and listen()
            
            update();
            observe();
            listen();
            
            // attach events
            
            if (!initialized) {
                
                $window
                    .on('load resize', function() {
                        update();
                        observe();
                    })
                    .on('scroll', function() {
                        broadcastScrollEvents();
                        observe();
                    });
                    
                // set initialized flag
                    
                initialized = true;

            }

        }

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
    
            // write data

            $thisTargetElement.data().props = {
                'height'      : thisHeight,
                'initialPosY' : thisInitialPosY
            };
        
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
         */

        // get current scroll position & current scroll direction

        var currentScrollTop = $window.scrollTop();
        
        // observe all target elements

        $activeTargetElements.each(function(index) {
            
            // variable assignments for better readability only
            
            var $targetElement = $(this);
            var state          = $targetElement.data().state;
            var initialPosY    = $targetElement.data().props.initialPosY;
            var height         = $targetElement.data().props.height;
            var transformY     = parseFloat($targetElement.css('transform').split(',')[13], 10) || 0;
            
            // calculate viewportIn & viewportOut
            
            viewportIn     = (currentScrollTop + viewportHeight) > (initialPosY + transformY) && currentScrollTop < (initialPosY + height + transformY);
            viewportCenter = (currentScrollTop + viewportHeight / 2) > initialPosY + transformY && (currentScrollTop + viewportHeight) < (initialPosY + height + transformY + viewportHeight / 2);
            viewportOut    = !viewportIn;
            
            // trigger custom viewport-events
            
            if (viewportIn && state === 'out') $targetElement.trigger('yoi-viewport-in');
            if (viewportCenter && state !== 'center') $targetElement.trigger('yoi-viewport-center');
            if (viewportOut && state === 'in' || viewportOut && state === 'center') $targetElement.trigger('yoi-viewport-out');
            
        });

    }

    function broadcastScrollEvents() {

        /**
         *  While scrolling, broadcast three custom events:
         *
         *  yoi-scrolling-down => page is scrolling down
         *  yoi-scroll-up      => page is scrolling up
         *  yoi-scroll-stop    => page stopped scrolling
         */

        // general scrolling event

        $window.trigger('yoi-scroll');

        // scroll direction

        var currentScrollTop = $window.scrollTop();

        if (currentScrollTop < lastScrollTop) $window.trigger('yoi-scroll-up');
        if (currentScrollTop > lastScrollTop) $window.trigger('yoi-scroll-down');

        lastScrollTop = currentScrollTop;

        // scroll stop

        YOI.clearDelay('scrollObserverDelay');

        YOI.setDelay('scrollObserverDelay', 250, function() {
            $window.trigger('yoi-scroll-stop');
        });

    }
    
    function listen() {

        /**
         *  Listens to the custom events fired by each target element (entering or leaving viewport)
         *  and maps the current state ("in" or "out") directly to each target object via jQuery's data() method.
         */

        $activeTargetElements.each(function() {

            var $targetElement = $(this);

            $targetElement.on('yoi-viewport-in', function() {
                $targetElement.data().state = 'in';
            });
            
            $targetElement.on('yoi-viewport-center', function() {
                $targetElement.data().state = 'center';
            });

            $targetElement.on('yoi-viewport-out', function() {
                $targetElement.data().state = 'out';
            });

        });

    }
    
    // public functions
    // ================
    
    return {
        init : initialize
    };

})();