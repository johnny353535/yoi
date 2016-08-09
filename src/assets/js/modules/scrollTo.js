/** scrollTo.js */

var ScrollTo = (function() {

    // private vars
    // ============

    switch ($('body').data('environment')) {
        case 'desktop':
            var offset = 220;
            break;
        case 'mobile':
            var offset = 80;
            break;
        default:
            var offset = 20;
    }

    // private functions
    // =================

    function initializeScrollTo() {

        /**
         *  Initialize by attaching events.
         */

        $('[data-scrollTo]').on('click', function(e) {

            var	targetId = $(this)[0].hash;

            // scroll to anchor if target element is found

            if ($(targetId).length) {
                e.preventDefault();
                scrollToTarget(targetId);
            }

        });

    }

    function scrollToTarget(targetId) {

        /**
         *  Scroll the page to a given target element.
         *
         *  @param {string} targetId - the target element css id (e.g. "#myTarget")
         */

        var $target = $(targetId);
        var targetFound = $target.length > 0 ? true : false;
        var scrollPosY;

        // if target is a tab, swith to the tab

        if ($(targetId).hasClass('tabs__page') && Helper.foundModule('Tabs')) {
            Tabs.switchTo(targetId);
        }

        // if target is found, set scroll position to target position,
        // otherwise set scroll position to page top

        if (targetFound) {
            scrollPosY = $target.offset().top - offset;
        } else {
            scrollPosY = 0;
        }

        // do the scroll animation

        $('body').stop().animate({
            scrollTop: scrollPosY
        }, 500);

    }

    // initialize
    // ==========

    initializeScrollTo();

    // public functions
    // ================

    return {
        init   : initializeScrollTo,
        target : scrollToTarget
    }

})();
