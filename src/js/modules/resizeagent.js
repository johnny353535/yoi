/** ResizeAgent.js */

YOI.module.Resizeagent = (function() {
   
    // private vars
    // ============
    
    var $document   = $(document);
    var $window     = $(window);
    var initialized = false;
    var lastBreakPoint;
    var activeBreakPoint;
    
    // private functions
    // =================
    
    function initialize() {
        
        /**
         *  Listens to the document ready and window resize events
         *  to run the observe() function.
         */
        
        // cancel if already initialized
            
        if (initialized) return false;
        
        // proceed, attach events
        
        $window.on('resize', function() {
            observe();
        });
        
        $document.ready(function() {
            observe();
        });
        
        // set initialized flag
            
        initialized = true;
        
    }
    
    function observe() {
        
        /**
         *  Fires a custom event when the breakpoint changed
         *  (eg. 'yoi-breakpoint-large').
         */
        
        activeBreakPoint = YOI.currentBreakPoint();
        
        // trigger the custom event if the breakpoint has changed
        
        if (activeBreakPoint !== lastBreakPoint) {
            
            YOI.clearDelay('resizeObserverDelay');

            YOI.setDelay('resizeObserverDelay', 250, function() {
                $window.trigger('yoi-breakpoint-' + activeBreakPoint);
            });
            
            // remember last breakpoint
            
            lastBreakPoint = activeBreakPoint;
            
        }
        
    }
    
    // public functions
    // ================
    
    return {
        init : initialize
    };

})();
