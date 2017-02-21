/** scrollTo.js */

YOI.ScrollTo = (function() {

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

    function initializeScrollTo($scrollToTrigger) {

        /**
         *  Initialize all a[data-scrollto] found in the document (= function call without parameters)
         *  or target one or more specific a[data-scrollto] (= function call with $scrollToTrigger).
         *  $scrollToTrigger must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $scrollToTrigger - the scrollTo trigger(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <button data-scrollto="hightlight:true;">
         *
         *  Available options:
         *
         *  @option {string} highlight - Define an optional effect to highlight the target element once
         *                               the scrolling has stopped. Chose from "blink" and "pulse".
         */

        if (!($scrollToTrigger instanceof jQuery)) {
            $scrollToTrigger = $('[data-scrollto]');
        }

        $scrollToTrigger.each(function() {

            var $thisTrigger = $(this);
            var targetId     = $thisTrigger[0].hash;

            $thisTrigger.on('click', function(e) {

                // scroll to anchor if target element is found

                if ($(targetId).length) {
                    e.preventDefault();
                    scrollToTarget(targetId, $thisTrigger);
                }

            });

        });

    }

    function scrollToTarget(targetId, $thisTrigger, options) {

        /**
         *  Scroll the page to a given target element.
         *
         *  @param {string} targetId     - the target element css id (e.g. "#myTarget")
         *  @param {string} $thisTrigger - the scrollTo trigger element
         */

        var $target              = $(targetId);
        var $scrollContext;
        var $scrollContainer     = $target.closest('.scrl-y');
        var targetFound          = $target.length > 0 ? true : false;
        var scrollContainerFound = $scrollContainer.length > 0 ? true : false;
        var scrollPosY;
        var options              = options === undefined ? YOI.toObject($thisTrigger.data('scrollto')) : options;

        // cancel if no target was found

        if (!targetFound) return false;

        // if target is a tab, switch to the tab

        if ($(targetId).hasClass('tabs__page') && YOI.foundModule('YOI.Tabs')) {
            Tabs.switchTo(targetId);
        }

        // if the target is wrapped inside a container with
        // scroll-overflow, scroll this container. otherwise,
        // scroll the whole page.

        if (scrollContainerFound) {
            scrollPosY     = '+=' + $target.position().top;
            $scrollContext = $target.closest('.scrl-y');
        } else {
            scrollPosY     = $target.offset().top - offset;
            $scrollContext = $('body');
        }

        // start the scroll animation and apply optional highlight effect

        $.when(
            $scrollContext.stop().animate({
                scrollTop: scrollPosY
            }, 500)
        ).done(function(){
            if (options.highlight === 'blink') YOI.blink($target);
            if (options.highlight === 'pulse') YOI.pulse($target);
        });

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
