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
        
        $document
            .on('keydown', function(e) {
                
                // if the space key was pressed and any yoi-element has focus,
                // prevent the page from scrolling
                
                if (e.which === 32 && e.target !== document.body) e.preventDefault();
                
            })
            .on('keyup', function(e) {
                
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