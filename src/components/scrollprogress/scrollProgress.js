/** scrollProgress.js */

YOI.component.ScrollProgress = (function() {

    // private vars
    // ============

    var $window             = $(window);
    var $document           = $(document)
    var $body               = $('body');
    var initialized         = false;
    var $scrollProgressBar;
    var documentHeight;
    var windowHeight;
    var totalScroll;
    var scrollPosition;
    var scrollProgress;
    var visibleScrollProgress;
    
    // private functions
    // =================

    function initialize() {

       /**
        *  Initialize the script.
        */

        var enableScrollProgress = $body.is('[yoi-scrollprogress]');

        if (enableScrollProgress && !initialized) {

            // get options

            var options           = YOI.toObject($body.attr('yoi-scrollprogress'));
            visibleScrollProgress = YOI.toBoolean(options.visible);

            if (visibleScrollProgress) {

                // create, append and reference the
                // scroll progress bar

                $scrollProgressBar = $('\
                    <div class="scrollProgress">\
                        <div class="scrollProgress__track"></div>\
                    </div>\
                ');

                $body.append($scrollProgressBar);
                $scrollProgressBar = $('.scrollProgress__track').first();

            }

            // attach events

            $window.on('load scroll resize', function() {
                update();
            });

            // set initialized flag

            initialized = true;

        }

    }
    
    function update() {
        
        /**
         *  Updates the scroll progress bar track to reflect the
         *  current reading position.
         */
        
        documentHeight = $document.height();
        windowHeight   = $window.height();
        totalScroll    = documentHeight - windowHeight;
        scrollPosition = $('body').scrollTop();
        scrollProgress = scrollPosition / (totalScroll / 100);

        // handle edge cases
        
        if (scrollProgress > 100 && windowHeight > documentHeight) {
            scrollProgress = 100;
        } else if (scrollProgress < 0) {
            scrollProgress = 0;
        }
        
        // update the track width
        
        if (visibleScrollProgress) $scrollProgressBar.css('width', scrollProgress + '%');
        
        // fire custom events
        
        if (scrollProgress === 0)                        $window.trigger('yoi-scroll-0');
        if (scrollProgress > 24 && scrollProgress < 30)  $window.trigger('yoi-scroll-25');
        if (scrollProgress > 49 && scrollProgress < 55)  $window.trigger('yoi-scroll-50');
        if (scrollProgress > 74 && scrollProgress < 80)  $window.trigger('yoi-scroll-75');
        if (scrollProgress > 99)                         $window.trigger('yoi-scroll-100');
    
    }
    
    // public functions
    // ================

    return {
        init : initialize
    };

})();