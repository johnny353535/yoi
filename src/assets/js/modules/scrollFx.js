YOI.ScrollFx = (function() {

    // private functions
    // =================
    
    function initialize($targetElement, options) {
        
       /**
        *  Initialize the script.
        *
        *  @param {jQuery dom object} $inputElement
        *  @param {object}            options
        */
        
        var $targetElement = YOI.createCollection('scrollfx', $targetElement, options);
        
        if ($targetElement) $targetElement.each(function() {

            var $targetElement = $(this);

            YOI.ScrollAgent.init($targetElement);

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
        var state    = $targetElement.data().state;
        var inFx     = options.in !== undefined ? options.in : false;
        var centerFx = options.center !== undefined ? options.center : false;
        
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
            var state          = $targetElement.data().state;
            var inFx           = options.in !== undefined ? options.in : false;
            var centerFx       = options.center !== undefined ? options.center : false;
            var speed          = options.speed !== undefined ? options.speed : false;
            var repeat         = options.repeat !== undefined ? options.repeat : true;
            
            $targetElement.on('yoi-viewport:in', function() {
                
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
                
                // add initial css
                
                addTargetElementInitialCss($targetElement);
                
                // no reapeat
                
                if (repeat !== true) $targetElement.addClass('fx-off');
                
            });
            
        });
        
    }
    
    // initialize
    // ==========
    
    initialize();
    
    // public functions
    // ================
    
    return {
        init: initialize
    }

})();