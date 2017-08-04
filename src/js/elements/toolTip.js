/** toolTip.js */

YOI.element.Tooltip = (function() {

    // private vars
    // ============

    var showDelayDuration = 300;
    var hideDelayDuration = 200;

    // private functions
    // =================

    function initialize($tooltipTrigger, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $tooltipTrigger
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {string} target       - a CSS selector (most likely an #id) to select the dom
         *                                  element which gets turned into a tooltip
         *  @option {string} followCursor - set to 'false' to disable repositioning
         *                                  on mousemove, default is true
         */

        var $tooltipTrigger = YOI.createCollection('tooltip', $tooltipTrigger, options);

        if ($tooltipTrigger) $tooltipTrigger.each(function() {

            // set up vars

            var $thisTooltipTrigger = $(this);
            var options             = $thisTooltipTrigger.data().options;
            var followCursor        = options.followCursor || true;
            var $thisTooltip        = $(options.target) || $thisTooltipTrigger.find('.tooltip');

            // prepare the target element

            $thisTooltip = prepareTooltip($thisTooltip);

            // add events

            $thisTooltipTrigger.on('mouseenter', function(e) {
                setPosition($thisTooltip, e);
                hideAll();
                hideWithDelay($thisTooltip, 'stop');
                showWithDelay($thisTooltip, 'start');
            });

            $thisTooltipTrigger.on('mouseleave', function() {
                hideWithDelay($thisTooltip, 'start');
                showWithDelay($thisTooltip, 'stop');
            });
            
            if (followCursor === true) {
                $thisTooltipTrigger.on('mousemove', function(e) {
                    setPosition($thisTooltip, e);
                });
            }

        });

    }

    function hideAll(scope) {

        /**
         *  Hides all tool tips. Either all tool tips found in the current
         *  document all all tool tips found inside a specified scope of
         *  another dom element.
         *
         *  @param {string} scope - a jQuery selector to define the scope
         */

        // set css-selector to either target all tool tips
        // or only the ones inside a specified scope of another dom element

        if (scope === undefined) {
            scope = '';
        } else {
            scope += ' ';
        }

        // hide all tool tips

        $(scope + '.tooltip').hide();

    }

    function prepareTooltip($thisTooltip) {

        /**
         *  Turns the given target element into a proper tooltip.
         *
         *  Remove original target element from the DOM,
         *  clean up the content, inject it into a new
         *  tooltip-element and attach that to the DOM.
         *
         *  @param  {jQuery dom object} $thisTooltip - the target element to transform into a tooltip
         *  @return {jQuery dom object} $thisTooltip - the properly prepared tooltip
         */

        var $thisTmpTooltip = $thisTooltip.detach();

        if ($thisTooltip.attr('id') !== undefined) {
            targetId = 'id="' + $thisTooltip.attr('id') + '" ';
        } else {
            targetId = '';
        }

        $thisTooltip = $('<div ' + targetId + 'class="tooltip">' + $thisTooltip.html() +'</div>').appendTo($(document.body)).hide();

        if ($thisTmpTooltip.attr('class') !== undefined) {

            // add compatible modifiers

            var compatibleModifiers = [
                '--positive',
                '--success',
                '--negative',
                '--error',
                '--attention'
            ];

            for (var i = 0; i < compatibleModifiers.length; i++) {

                var thisModifier            = compatibleModifiers[i];
                var thisTmpTargetClassnames = $thisTmpTooltip.attr('class');

                if (thisTmpTargetClassnames.indexOf(thisModifier) > 0) {
                    thisModifier = 'tooltip--' + thisModifier.split('--')[1];
                    $thisTooltip.addClass(thisModifier);
                }

            }

        }

        // return the prepared target

        return $thisTooltip;

    }

    function setPosition($thisTooltip, e) {

        /**
         *  Set the tooltip position.
         *
         *  @param {jQuery dom object} $thisTooltip - the tooltip
         *  @param {event}             e            - the trigger event
         */

        // calculate dimensions and positions

        var padding        = 20;
        var cursorY        = e.pageY;
        var cursorX        = e.pageX;
        var tooltipWidth   = $thisTooltip.width();
        var tooltipHeight  = $thisTooltip.height();
        var viewPortWidth  = $(window).width();
        var viewPortHeight = $(window).height();
        var scrollTop      = $(window).scrollTop();
        
        // calculate position for tooltip

        var tooltipLeft = cursorX + tooltipWidth > viewPortWidth ? cursorX - tooltipWidth - padding + 'px' : cursorX  + 'px';
        var tooltipTop  = cursorY + tooltipHeight + padding * 3 > scrollTop + viewPortHeight ? cursorY - tooltipHeight - padding * 2 + 'px' : cursorY + padding + 'px';

        // set position for tooltip

        $thisTooltip
            .css({
                'position': 'absolute',
                'left': tooltipLeft,
                'top': tooltipTop
            });

    }

    function showWithDelay($thisTooltip, action) {

        /**
         *  Show a tooltip with delay.
         *
         *  @param {jQuery dom object} $thisTooltip - the tooltip
         *  @param {string}            action       - keyword, "start" || "stop"
         */

        if (action === 'start') {
            
            YOI.setDelay('tooltipShowDelay', showDelayDuration, function(){
                $thisTooltip
                    .fadeIn(200)
                    .promise()
                    .then(function() {
                        $thisTooltip.trigger('yoi-tooltip-show');
                    });
            });


        } else if (action === 'stop') {

            YOI.clearDelay('tooltipShowDelay');

        }

    }

    function hideWithDelay($thisTooltip, action) {

        /**
         *  Hide a tool tip with delay.
         *
         *  @param {string} action - keyword, "start" || "stop"
         */

        if (action === 'start') {

            YOI.setDelay('tooltipHideDelay', hideDelayDuration, function(){
                $('.tooltip').hide();
                $thisTooltip.trigger('yoi-tooltip-hide');
            });

        } else if (action === 'stop') {

            YOI.clearDelay('tooltipHideDelay');

        }

    }

    // public functions
    // ================

    return {
        init    : initialize,
        show    : showWithDelay,
        hide    : hideWithDelay,
        hideAll : hideAll
    };

})();
