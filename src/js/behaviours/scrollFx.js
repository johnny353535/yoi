/** scrollFx.js */

YOI.behaviour.ScrollFx = (function() {

    // private functions
    // =================
    
    function initialize($targetElement, options) {
        
       /**
        *  Initialize the script.
        *
        *  @param {jQuery dom object} $inputElement
        *  @param {object}            options
        *
        *  Available options:
        *
        *  @option {string} in     - yoi fx css class name on viewport:in
        *  @option {string} center - yoi fx css class name on viewport:center
        *  @option {string} out    - yoi fx css class name on viewport:out
        *  @option {string} repeat - repeats the fx each time, default is "true"
        *  @option {string} speed  - change the default speed to "slow" or "fast"
        */
        
        var $targetElement = YOI.createCollection('scrollfx', $targetElement, options);
        
        if ($targetElement) $targetElement.each(function() {
            
            var $targetElement = $(this);

            YOI.module.ScrollAgent.init($targetElement, options);

            addTargetElementInitialCss($targetElement);

            // start listener

            listen($targetElement);

        });

    }
    
    function addTargetElementInitialCss($targetElement) {
        
        /**
         *  If the target element uses the internal fx (css-)classes,
         *  this method adds the corresponding initial (css-)class.
         *
         *  @param {jQuery dom object} $targetElement - the target element
         */
        
        var options  = $targetElement.data().options;
        var inFx     = options.in || false;
        var centerFx = options.center || false;
        
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
            var options        = $targetElement.data().options;
            var inFx           = options.in || false;
            var centerFx       = options.center || false;
            var speed          = options.speed || false;
            var repeat         = options.repeat || true;
            
            if (repeat !== 'false') {
                
                $targetElement.on('yoi-viewport-in', function() {
                    applyFx($targetElement, inFx, speed);
                });
                
                $targetElement.on('yoi-viewport-center', function() {
                    applyFx($targetElement, centerFx, speed);
                });
                
                $targetElement.on('yoi-viewport-out', function() {
                    addTargetElementInitialCss($targetElement);
                });
                
            } else {
                
                $targetElement.one('yoi-viewport-in', function() {
                    applyFx($targetElement, inFx, speed);
                });
                
                $targetElement.one('yoi-viewport-center', function() {
                    applyFx($targetElement, centerFx, speed);
                });

            }

        });
        
    }
    
    function applyFx($targetElement, fx, speed) {
        
        /**
         *  Applies the given fx and play it at the given speed.
         *
         *  @param {jQuery dom object} $targetElement - the target element
         *  @param {string}            fx             - the fx css class to apply
         *  @param {string}            speed          - the speed css class to apply
         */
        
        if (fx) {
            $targetElement.removeClass('fx-' + fx + '-initial');
            $targetElement.addClass('fx-' + fx);
        }

        if (speed) {
            $targetElement.addClass('fx-' + speed);
        }
        
    }
    
    // public functions
    // ================
    
    return {
        init: initialize
    };

})();