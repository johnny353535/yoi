YOI.ScrollFx = (function() {

    // private vars
    // ============
    
    // private functions
    // =================
    
    function initializeScrollFx($targetElement) {
        
        if (!($targetElement instanceof jQuery)) {
            $targetElement = $('[data-scrollfx]');
        }

        $targetElement.each(function() {
            
            var $targetElement = $(this);
            var options        = YOI.toObject($targetElement.data('scrollfx'));
            
            YOI.ScrollAgent.init($targetElement);
            
            updateTargetElementData($targetElement);
            addTargetElementInitialCss($targetElement);
            
            // start listener
            
            listen($targetElement);

        });

    }
    
    function updateTargetElementData($targetElement) {
        
        /**
         *  Reads data from the custom data-attribut and maps the data directly to it's target
         *  objects via jQuery's data() method.
         *
         *  @param {jQuery dom object} $targetElement - the target element
         */

        var options  = YOI.toObject($targetElement.data('scrollfx'));
        var toggleFx = options.toggle !== undefined ? options.toggle : false;
        var inFx     = options.in !== undefined ? options.in : false;
        var centerFx = options.center !== undefined ? options.center : false;
        var speed    = options.speed !== undefined ? options.speed : false;
        var repeat   = options.repeat !== undefined ? options.repeat : true;
        
        // write data

        $targetElement.data({
            'toggleFx' : toggleFx,
            'inFx'     : inFx,
            'centerFx' : centerFx,
            'speed'    : speed,
            'repeat'   : repeat
        });

    }
    
    function addTargetElementInitialCss($targetElement) {
        
        /**
         *  If the target element uses the internal fx (css-)classes,
         *  this method adds the corresponding initial (css-)class.
         *
         *  @param {jQuery dom object} $targetElement - the target element
         */
        
        var inFx     = $targetElement.data().inFx;
        var centerFx = $targetElement.data().centerFx;
        var state    = $targetElement.data().state;
        
        if (inFx)     $targetElement.addClass('fx-' + inFx + '-initial');
        if (centerFx) $targetElement.addClass('fx-' + centerFx + '-initial');
        
        $targetElement.removeClass('fx-' + inFx);
        $targetElement.removeClass('fx-' + centerFx);

    }
    
    function listen($targetElements) {
        
        /**
         *  Listens to the custom events (entering or leaving viewport) and
         *  applies fx accordingly.
         *
         *  @param {jQuery dom object} $targetElements - the target element(s)
         */
        
        $targetElements.each(function() {
            
            var $targetElement = $(this);
            var state          = $targetElement.data().state;
            var inFx           = $targetElement.data().inFx;
            var centerFx       = $targetElement.data().centerFx;
            var speed          = $targetElement.data().speed;
            var repeat         = $targetElement.data().repeat;
            
            $targetElement.on('yoi-viewport:in', function() {
                
                console.log('in');
                
                // add inFx
                
                if (inFx) {
                    $targetElement.removeClass('fx-' + inFx + '-initial');
                    $targetElement.addClass('fx-' + inFx);
                }
                
                // set speed
                
                if (speed) {
                    $targetElement.addClass('fx-' + speed);
                }
                
            });
            
            $targetElement.on('yoi-viewport:center', function() {
                
                console.log('center');

                // add centerFx

                if (centerFx) {
                    $targetElement.removeClass('fx-' + centerFx + '-initial');
                    $targetElement.addClass('fx-' + centerFx);
                }

                // set speed

                if (speed) {
                    $targetElement.addClass('fx-' + speed);
                }

            });
            
            $targetElement.on('yoi-viewport:out', function() {
                
                console.log('out');
                
                // add initial css
                
                addTargetElementInitialCss($targetElement);
                
                // no reapeat
                
                if (repeat !== true) $targetElement.addClass('fx-off');
                
            });
            
        });
        
    }
    
    // initialize
    // ==========
    
    initializeScrollFx();
    
    // public functions
    // ================
    
    return {
        init: initializeScrollFx
    }

})();