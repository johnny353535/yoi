/** pageprogress.js */

YOI.component.PageProgress = (function() {

    // private vars
    // ============

    var $window             = $(window);
    var $document           = $(document)
    var $body               = $('body');
    var initialized         = false;
    var $pageProgressBar;
    var documentHeight;
    var windowHeight;
    var totalScroll;
    var scrollPosition;
    var pageProgress;
    var visiblePageProgress;

    // private functions
    // =================

    function initialize() {

       /**
        *  Initialize the script.
        */

        var enablePageProgress = $body.is('[yoi-pageprogress]');

        if (enablePageProgress && !initialized) {

            // get options

            var options           = YOI.toObject($body.attr('yoi-pageprogress'));
            visiblePageProgress = YOI.toBoolean(options.visible);

            if (visiblePageProgress) {

                // create, append and reference the
                // scroll progress bar

                $pageProgressBar = $('\
                    <div class="pageProgress">\
                        <div class="pageProgress__track"></div>\
                    </div>\
                ');

                $body.append($pageProgressBar);
                $pageProgressBar = $('.pageProgress__track').first();

            }

            // attach events

            $window.on('load.yoi yoi-scroll yoi-resize', function() { 
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
        scrollPosition = $(window).scrollTop();
        pageProgress = scrollPosition / (totalScroll / 100);

        // handle edge cases

        if (pageProgress > 100 && windowHeight > documentHeight) {
            pageProgress = 100;
        } else if (pageProgress < 0) {
            pageProgress = 0;
        }

        // update the track width

        if (visiblePageProgress) $pageProgressBar.css('width', pageProgress + '%');

        // fire custom events

        if (pageProgress === 0)                      $window.trigger('yoi-scroll-0');
        if (pageProgress > 24 && pageProgress < 30)  $window.trigger('yoi-scroll-25');
        if (pageProgress > 49 && pageProgress < 55)  $window.trigger('yoi-scroll-50');
        if (pageProgress > 74 && pageProgress < 80)  $window.trigger('yoi-scroll-75');
        if (pageProgress > 99)                       $window.trigger('yoi-scroll-100');

    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();
