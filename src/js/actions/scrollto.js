/** scrollto.js */

YOI.action.ScrollTo = function($trigger, $target, options) {

   /**
    *  Vertically scrolls the whole page or a scrollable container to a given target element.
    *
    *  @param {jQuery element} $trigger - the element which triggered the script
    *  @param {jQuery element} $target  - the target element
    *  @param {object}         options
    *
    *  Available options:
    *
    *  @option {string} highlight - Define an optional effect to highlight the target element once
    *                               the scrolling has stopped. Chose from "blink" and "pulse".
    *  @option {number} offset    - When scrolled to target element, this is the remaining distance in px
    *                               between the target and the upper viewport border. Default = 20.
    */

    // scroll to anchor if target element is found

    if (YOI.isjQuery($target)) {

        var $document            = $(document);
        var scrollRoot           = document.scrollingElement || document.documentElement;
        var $scrollContext;
        var $scrollContainer     = $target.closest('.scr-y') || false;
        var offset               = options.offset || 20;
        var highlight            = options.highlight || false;
        var scrollPosY;

        // if target is a tab, switch to the tab

        if ($target.hasClass('tabs__page') && YOI.foundComponent('Tabs')) {
            YOI.component.Tabs.switchTo(targetId);
        }

        // if the target is wrapped inside a container with
        // scroll-overflow, scroll this container. otherwise,
        // scroll the whole page.

        if ($scrollContainer.length) {
            scrollPosY     = '+=' + $target.position().top;
            $scrollContext = $target.closest('.scr-y');
        } else {
            scrollPosY     = $target.offset().top - offset;
            $scrollContext = $(scrollRoot);
        }

        // start the scroll animation and apply optional
        // highlight effect

        $document.trigger('yoi-scrollto-start');

        $.when(
            $scrollContext.stop().animate({
                scrollTop: scrollPosY
            }, 500)
        ).done(function(){
            if (highlight === 'blink') YOI.blink($target);
            if (highlight === 'pulse') YOI.pulse($target);
            $document.trigger('yoi-scrollto-end');
        });

    }

};
