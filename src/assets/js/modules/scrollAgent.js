YOI.ScrollAgent = (function() {

    // private vars
    // ============
    
    var $body   = $('body');
    var $window = $(window);
    var $targetElement;
    
    var viewPortHeight = $window.height();
    
    var scrollTop;
    var lastScrollTop  = 0;
    var offset         = 0; // % of viewport height
    
    var viewportIn;
    var viewportOut;
    var viewportCenter;
    
    var scrollDirection     = false;
    var lastScrollDirection = false;
    
    // private functions
    // =================
    
    function initializeScrollAgent($targetElement, options) {
        
       /**
        *  Initialize all *[data-scrollagent] found in the document (= function call without parameters)
        *  or target one or more specific *[data-scrollagent] (= function call with $targetElement).
        *  $targetElement must be a jQuery object or jQuery object collection.
        *
        *  @param {jQuery dom object} $targetElement - the target element(s)
        *
        *  Available options:
        *
        *  @option {} offset - xxx
        *  @option {} offset - xxx
        */
        
        if (!($targetElement instanceof jQuery)) {
            $targetElement = $('[data-scrollagent]');
        }
        
        if (!$targetElement.length) {
            return false;
        }
        
        $targetElement.each(function() {
            updateTargetElementData($(this), options);
        });
        
        // update the viewport height on resize

        $(window).on('resize', function() {
            viewPortHeight = $window.height();
        });

        // start observer and listener

        observe($targetElement);
        listen($targetElement);
    
    }
    
    function updateTargetElementData($targetElement, options) {
        
        /**
         *  Reads data from the custom data-attribute and from calculations (eg. height)
         *  and maps the data directly to it's target objects via jQuery's data() method.
         *
         *  @param {jQuery dom object} $targetElement - the target element
         */
        
        var thisOptions     = typeof(options) !== 'object' ? YOI.toObject($targetElement.data('scrollagent')) : options;
        var thisOffset      = thisOptions.offset !== undefined ? parseInt(thisOptions.offset) : offset;
        var thisHeight      = $targetElement.outerHeight();
        var thisInitialPosY = $targetElement.offset().top;

        // write data

        $targetElement.data({
            'height'      : thisHeight,
            'initialPosY' : thisInitialPosY,
            'offset'      : thisOffset,
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
                var offset         = viewPortHeight / 100 * $targetElement.data().offset;
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