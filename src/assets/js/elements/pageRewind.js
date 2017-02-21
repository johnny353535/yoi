/** pageRewind.js */

YOI.PageRewind = (function() {

    // private vars
    // ============

    var $pageRewind;
    var $window   = $(window);
    var $body     = $('body');
    var threshold = 500;

    // get the document language, fall back to english
    // note: only german and english supported at this moment

    var language = typeof YOI.locale() !== 'object' || YOI.locale() === undefined || YOI.locale() === '' ? 'en' : YOI.locale();

    var labelTxt = {
        'en' : 'scroll back to top',
        'de' : 'Zurück zum Seitenanfang'
    };

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
                <span class="hidden">' + labelTxt[language] + '</span>\
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