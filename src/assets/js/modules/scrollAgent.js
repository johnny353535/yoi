/** ScrollAgent.js */

YOI.module.ScrollAgent = (function() {

    // private vars
    // ============
    
    var $window        = $(window);
    var viewPortHeight = $window.height();
    var lastScrollTop  = 0;
    var offset         = 0;
    var scrollTop;
    var viewportIn;
    var viewportOut;
    var viewportCenter;
    var scrollDirection;
    var lastScrollDirection;
    
    // private functions
    // =================
    
    function initialize($targetElement, options) {
        
       /**
        *  Initialize the script.
        *
        *  @param {jQuery dom object} $inputElement
        *  @param {object}            options
        */
        
        var $targetElement = YOI.createCollection('scrollagent', $targetElement, options);

        if ($targetElement) {
            
            // initially update target elements
            
            update($targetElement);

            // start observer and listener
            
            observe($targetElement);
            listen($targetElement);
        
            // update target elements on load and resize,
            // run the observer on scroll

            $window
                .on('load resize', function() {
                    update($targetElement);
                    observe($targetElement);
                })
                .on('scroll', function() {
                    observe($targetElement);
                });

        }
    
    }
    
    function update($targetElements) {
        
        /**
         *  Reads data from the custom data-attribute and from calculations (eg. height)
         *  and maps the data directly to it's target objects via jQuery's data() method.
         *
         *  @param {jQuery dom object} $targetElements - the target element(s)
         */
        
        // update the viewport height
    
        viewPortHeight = $window.height();
    
        // update all target elements
    
        $targetElements.each(function() {
        
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
                $thisTargetElement.trigger('yoi-viewport:in');
            } else {
                $thisTargetElement.data().state = 'out';
            }
    
        });

    }
    
    function observe($targetElements) {
        
        /**
         *  Observes all target elements and fires custom events weather the
         *  element enters or leaves the viewport.
         *
         *  @param {jQuery dom object} $targetElements - the target element(s)
         */
            
        // get current scroll position & current scroll direction
        
        scrollTop       = $window.scrollTop();
        scrollDirection = scrollTop >= lastScrollTop ? 'down' : 'up';
        
        // observe all target elements

        $targetElements.each(function(index) {
            
            // variable assignments for better readability only
            
            var $targetElement = $(this);
            var state          = $targetElement.data().state;
            var initialPosY    = $targetElement.data().props.initialPosY;
            var height         = $targetElement.data().props.height;
            
            // calculate viewPortIn & viewPortOut
            
            viewportIn     = (scrollTop + viewPortHeight) > (initialPosY + offset) && scrollTop + offset < (initialPosY + height);
            viewportCenter = (scrollTop + viewPortHeight / 2) > initialPosY && (scrollTop + viewPortHeight) < (initialPosY + height + viewPortHeight / 2);
            viewportOut    = !viewportIn;
            
            // trigger custom viewport-events
            
            if (viewportIn && state === 'out') $targetElement.trigger('yoi-viewport:in');
            if (viewportCenter && state !== 'center') $targetElement.trigger('yoi-viewport:center');
            if (viewportOut && state === 'in' || viewportOut && state === 'center') $targetElement.trigger('yoi-viewport:out');
            
            // trigger scroll direction event

            if (scrollDirection !== lastScrollDirection) {
                $targetElement.trigger('yoi-scrolldirection:' + scrollDirection);
            }
            
            // save the last scroll position and the last scroll direction
            
            lastScrollTop       = scrollTop > 0 ? scrollTop : 0;
            lastScrollDirection = scrollDirection;
            
        });

    }
    
    function listen($targetElements) {

        /**
         *  Listens to the custom events fired by each target element (entering or leaving viewport)
         *  and maps the current state ("in" or "out") directly to each target object via jQuery's data() method.
         *
         *  @param {jQuery dom object} $targetElements - the target element(s)
         */

        $targetElements.each(function() {

            var $targetElement = $(this);

            $targetElement.on('yoi-viewport:in', function() {
                $targetElement.data().state = 'in';
            });
            
            $targetElement.on('yoi-viewport:center', function() {
                $targetElement.data().state = 'center';
            });

            $targetElement.on('yoi-viewport:out', function() {
                $targetElement.data().state = 'out';
            });

        });

    }
    
    // public functions
    // ================
    
    return {
        init: initialize
    };

})();