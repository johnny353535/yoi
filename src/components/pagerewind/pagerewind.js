/** pagerewind.js */

YOI.component.PageRewind = (function() {

    // private vars
    // ============

    var $pageRewind;
    var $window     = $(window);
    var $body       = $('body');
    var threshold   = 500;
    var initialized = false;

    // localization
    
    var language = YOI.locale();
    
    var localization = {
        'en' : {
            'labelTxt' : 'scroll back to top'
        },
        'de' : {
            'labelTxt' : 'Zurück zum Seitenanfang'
        }
    };

    // private functions
    // =================

    function initialize() {

        /**
         *  Adds an anchor to the bottom of the viewport which
         *  appears after a certain scroll-threshold and scrolls the
         *  scrolls the page back to the very top on click.
         */
        
        var enablePageRewind = $body.is('[yoi-pagerewind]');
        
        if (enablePageRewind && !initialized) {
        
            $pageRewind = $(
                '<a class="pageRewind" href="#">\
                    <span class="hidden">' + localization[language]['labelTxt'] + '</span>\
                </a>'
            );

            $pageRewind
                .addClass('is--hidden')
                .on('click', function(e) {
                    e.preventDefault();
                    run();
                })
                .appendTo($body);

            $window
                .scroll(function() {
                    toggle();
                });
                
            // set initialized flag
                
            initialized = true;
                
        }

    }

    function run() {

        /**
         *  Scrolls the page back to the very top.
         */
        
        // trigger the custom start event
        
        $pageRewind.trigger('yoi-pagerewind-start');

        // scroll back to page top and
        // fire custom end event when done

        $('html,body').animate({
            scrollTop: 0
        }, 500)
        .promise()
        .then(function() {
            $pageRewind.trigger('yoi-pagerewind-stop');
        });

    }

    function toggle() {

        /**
         *  Shows or hides .pageRewind after a certain threshold.
         */

        if ($body.scrollTop() >= threshold) {
            $pageRewind.removeClass('is--hidden');
        } else {
            $pageRewind.addClass('is--hidden');
        }

    }

    // public functions
    // ================

    return {
        init : initialize,
        run  : run
    };

})();
