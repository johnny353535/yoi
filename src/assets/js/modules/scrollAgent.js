var ScrollAgent = (function() {

    // private vars
    // ============
    
    var $body   = $('body');
    var $window = $(window);
    
    var $targetElement;
    var lastScrollTop = 0;
        
    // private functions
    // =================
    
    function initializeScrollAgent($targetElement) {
        
        if (!($targetElement instanceof jQuery)) {
            $targetElement = $('[data-scrollagent]');
        }

        $targetElement.each(function() {
            updateTargetElementData($(this));
        });
        
        observePosition($targetElement);
        listenToTargetElements($targetElement);
        
    }
    
    function updateTargetElementData($targetElement) {

        var options       = YOI.toObject($targetElement.data('scrollagent'));
        var children      = 'xxx';
        var height        = $targetElement.outerHeight();
        var initialTopPos = $targetElement.offset().top;
        var offset        = options.offset !== undefined ? parseInt(options.offset) : 0;
        var state         = 'out';
        var toggleFx      = options.toggleFx !== undefined ? options.toggleFx : false;
        var toggleClass   = options.toggleClass !== undefined ? options.toggleClass : false;
        var noRepeat      = options.noRepeat !== undefined ? options.noRepeat : false;
        
        // write data

        $targetElement.data({
            'offset'        : offset,
            'initialTopPos' : initialTopPos,
            'state'         : state,
            'toggleClass'   : toggleClass,
            'toggleFx'      : toggleFx,
            'noRepeat'      : noRepeat,
            'height'        : height
        });

    }
    
    function observePosition($targetElements) {
        
        $window.on('scroll', function() {

            // store the scroll position

            var scrollTop       = $window.scrollTop();
            var scrollDirection = lastScrollTop > scrollTop ? 'up' : 'down';
            lastScrollTop       = scrollTop > 0 ? scrollTop : 0;

            // observe all target elements

            $targetElements.each(function(index) {

                // variable assignments for better readability only
                
                // var startPos       = $targetElement.data().startPos;

                var $targetElement = $(this);
                var state          = $targetElement.data().state;
                var offset         = $targetElement.data().offset;
                var initialTopPos  = $targetElement.data().initialTopPos;
                var startPos       = scrollDirection === 'down' ? initialTopPos + offset : initialTopPos - offset;
                var viewPortHeight = $window.height();
                var height         = $targetElement.data().height;
                var viewportIn     = (scrollTop + viewPortHeight) > startPos && scrollTop < (startPos + height);
                var viewportOut    = (scrollTop + viewPortHeight) < startPos || scrollTop > (startPos + height);
                
                // trigger custom viewport-in & viewport-out events
                
                if (viewportIn && state === 'out') $targetElement.trigger('yoi-viewport:in');
                if (viewportOut && state === 'in') $targetElement.trigger('yoi-viewport:out');

            });
            

        });

    }
    
    function mapEffects() {
        // fade in, fade out
        // move in, move out (t, r, b, l)
        // speed (negative values = slower, positiove values = faster)
    }
    
    function listenToTargetElements($targetElement) {
        
        $targetElement.each(function() {
            
            var $targetElement = $(this);
            var toggleClass    = $targetElement.data().toggleClass;
            var toggleFx       = $targetElement.data().toggleFx;
            var noRepeat       = $targetElement.data().noRepeat;
            
            $targetElement.on('yoi-viewport:in', function() {
                
                // change state
                
                $targetElement.data().state = 'in';
                
                // add toggleClass
                
                if (toggleClass) $targetElement.addClass(toggleClass);
                
                // add toggleFx
                
                if (toggleFx) {
                    $targetElement.addClass('fx-' + toggleFx);
                }
                
            });
            
            $targetElement.on('yoi-viewport:out', function() {
                
                // change state
                
                $targetElement.data().state = 'out';
                
                // remove toggleClass
                
                if (toggleClass) $targetElement.removeClass(toggleClass);
                
                // remove toggleFx
                
                if (toggleFx) {
                    $targetElement.addClass('fx-' + toggleFx + '-initial');
                    $targetElement.removeClass('fx-' + toggleFx);
                }
                
                // if no reapeat
                
                if (noRepeat) $targetElement.css('animation','none');
                
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


/*

    TODO:

    - comments & documentation
    - add children & delay
    - add offset
    - add lazyload?
    - ...

*/
