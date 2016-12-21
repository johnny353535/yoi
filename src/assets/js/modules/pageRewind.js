/** pageRewind.js */

var PageRewind = (function() {

    // private vars
    // ============
    
    var $pageRewind;
    var $window     = $(window);
    var $body       = $('body');
    var threshold   = 500;
    
    // private functions
    // =================
    
    function initializePageRewind() {
        
        /**
         *  Adds an anchor to the bottom of the viewport which
         *  appears after a certain scroll-threshold and scrolls the
         *  scrolls the page back to the very top on click.
         */
        
        $pageRewind = $(
            '<a class="pageRewind" href="#">\
                <i aria-hidden="true" class="icon--010-s"></i>\
            </a>'
        );
        
        $pageRewind
            .addClass('is--hidden')
            .on('click', function(e) {
                e.preventDefault();
                runPageRewind();
            })
            .appendTo($body);

        $window
            .scroll(function() {
                togglePageRewind();
            });
        
    }
    
    function runPageRewind() {
        
        /**
         *  Scrolls the page back to the very top.
         */
        
        $('html,body').animate({ scrollTop: 0 }, 500);
        
    }
    
    function togglePageRewind() {
        
        /**
         *  Shows or hides .pageRewind after a certain threshold.
         */
        
        if ($body.scrollTop() >= threshold) {
            $pageRewind.removeClass('is--hidden');
        } else {
            $pageRewind.addClass('is--hidden');
        }
        
    }
    
    // initialize
    // ==========
    
    initializePageRewind();
    
    // public functions
    // ================
    
    return {
        init : initializePageRewind,
        run  : runPageRewind
    }

})();