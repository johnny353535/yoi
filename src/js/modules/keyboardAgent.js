/** keyboardAgent.js */

YOI.KeyboardAgent = (function() {

    // private vars
    // ============
    
    var $document = $(document);
    
    // lookup table for relevant keys
    
    var keys = {
        38 : 'arrowup',
        39 : 'arrowright',
        40 : 'arrowdown',
        37 : 'arrowleft',
        13 : 'enter',
        32 : 'space',
        27 : 'escape'
    }
    
    // private functions
    // =================
    
    function initialize() {
    
        /**
         *  Initialize the script. Listen for key presses and
         *  trigger the corresponding custom events.
         */
        
        $document.on('keyup', function(e) {
                
            // trigger the custom "yoi-keypressed" event
            
            var keyCode = e.which;
            if (keys[keyCode] !== undefined) $document.trigger('yoi-keypressed:' + keys[keyCode]);
            
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