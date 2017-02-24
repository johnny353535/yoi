/** ScrollAgent.js */

YOI.ScrollAgent = (function() {

    // private vars
    // ============
    
    var $targetElement;
    var $body                = $('body');
    var $window              = $(window);
    var viewPortHeight       = $window.height();
    var lastScrollTop        = 0;
    var offset               = 0;
    var scrollTop;
    var viewportIn;
    var viewportOut;
    var viewportCenter;
    var scrollDirection;
    var lastScrollDirection;
    
    // private functions
    // =================
    
    function initializeScrollAgent($targetElement) {
        
       /**
        *  Initialize the script.
        *
        *  @param {jQuery dom object} $targetElement - the target element(s)
        */
        
        // if the function is called without a valid $targetElement,
        // gather the elements from the dom
        
        if (!($targetElement instanceof jQuery)) {
            $targetElement = $('[data-scrollagent]');
        }
        
        // if no elements are found, stop the script
        
        if (!$targetElement.length) {
            return false;
        }
        
        // map data to each target element
        
        $targetElement.each(function() {
            updateTargetElementData($(this));
        });
        
        // update the viewport height on resize

        $(window).on('resize', function() {
            viewPortHeight = $window.height();
        });

        // start internal observer and listener

        observe($targetElement);
        listen($targetElement);
    
    }
    
    function updateTargetElementData($targetElement) {
        
        /**
         *  Reads data from the custom data-attribute and from calculations (eg. height)
         *  and maps the data directly to it's target objects via jQuery's data() method.
         *
         *  @param {jQuery dom object} $targetElement - the target element
         */
        
        var thisHeight      = $targetElement.outerHeight();
        var thisInitialPosY = $targetElement.offset().top;

        // write data

        $targetElement.data({
            'height'      : thisHeight,
            'initialPosY' : thisInitialPosY,
            'state'       : 'out'
        });
        
    }
    
    function observe($targetElements) {
        
        /**
         *  Observes all target elements and fires custom events weather the
         *  element enters or leaves the viewport.
         *
         *  @param {jQuery dom object} $targetElements - the target element(s)
         */
        
        $window.on('scroll', function() {

            // get current scroll position & current scroll direction
            
            scrollTop       = $window.scrollTop();
            scrollDirection = scrollTop >= lastScrollTop ? 'down' : 'up';
            
            // observe all target elements

            $targetElements.each(function(index) {
                
                // variable assignments for better readability only
                
                var $targetElement = $(this);
                var state          = $targetElement.data().state;
                var initialPosY    = $targetElement.data().initialPosY;
                var offset         = viewPortHeight / 100 * offset;
                var height         = $targetElement.data().height;
                
                // calculate viewPortIn & viewPortOut
                
                viewportIn     = (scrollTop + viewPortHeight) > (initialPosY + offset) && scrollTop + offset < (initialPosY + height);
                viewportCenter = (scrollTop + viewPortHeight / 2) > initialPosY && (scrollTop + viewPortHeight) < (initialPosY + height + viewPortHeight / 2);
                viewportOut    = !viewportIn;
                
                // trigger custom viewport-events
                
                if (viewportIn && state === 'out') $targetElement.trigger('yoi-viewport:in');
                if (viewportCenter && state !== 'center') $targetElement.trigger('yoi-viewport:center');
                if (viewportOut && state === 'in' || viewportOut && state === 'center') $targetElement.trigger('yoi-viewport:out');

                if (scrollDirection !== lastScrollDirection) {
                    $targetElement.trigger('yoi-scrolldirection:' + scrollDirection);
                }
                
                // save the last scroll position and the last scroll direction
                
                lastScrollTop       = scrollTop > 0 ? scrollTop : 0;
                lastScrollDirection = scrollDirection;
                
            });

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
    
    // initialize
    // ==========
    
    initializeScrollAgent();
    
    // public functions
    // ================
    
    return {
        init: initializeScrollAgent
    }

})();