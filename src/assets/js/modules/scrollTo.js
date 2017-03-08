/** scrollTo.js */

YOI.ScrollTo = (function() {

    // private vars
    // ============
    
    var $document = $(document);

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

    function initialize($scrollToTrigger, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $trigger
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {string} highlight - Define an optional effect to highlight the target element once
         *                               the scrolling has stopped. Chose from "blink" and "pulse".
         */
        
        var $scrollToTrigger = YOI.createCollection('scrollto', $scrollToTrigger, options);

        if ($scrollToTrigger) $scrollToTrigger.each(function() {

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
        var options              = options === undefined ? $thisTrigger.data().options : options;

        // cancel if no target was found

        if (!targetFound) return false;

        // if target is a tab, switch to the tab

        if ($target.hasClass('tabs__page') && YOI.foundModule('Tabs')) {
            YOI.Tabs.switchTo(targetId);
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

        $document.trigger('yoi-scrollto:start');

        $.when(
            $scrollContext.stop().animate({
                scrollTop: scrollPosY
            }, 500)
        ).done(function(){
            if (options.highlight === 'blink') YOI.blink($target);
            if (options.highlight === 'pulse') YOI.pulse($target);
            $document.trigger('yoi-scrollto:end');
        });

    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init   : initialize,
        target : scrollToTarget
    };

})();
