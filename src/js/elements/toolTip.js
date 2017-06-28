/** toolTip.js */

YOI.element.Tooltip = (function() {

    // private vars
    // ============

    var showDelayDuration = 300;
    var hideDelayDuration = 200;

    // private functions
    // =================

    function initialize($tooltip, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $tooltip
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {string} target - a CSS selector (most likely an #id) to select the dom
         *                            element which gets turned into a tooltip
         */

        var $tooltip = YOI.createCollection('tooltip', $tooltip, options);

        if ($tooltip) $tooltip.each(function() {

            // set up vars

            var $thisTooltip = $(this);
            var options      = $thisTooltip.data().options;
            var $target      = options.target !== undefined ? $(options.target) : $thisTooltip.find('.tooltip');

            // prepare the target element

            $target = prepareTarget($target);

            // add event to trigger

            $thisTooltip.on('mouseover', function(e) {

                // positioning

                setPosition($target, e);

                // hide all other tooltips

                hideAll();
                hideWithDelay($target, 'stop');
                showWithDelay($target, 'start');

            });

            $thisTooltip.on('mouseout', function() {

                hideWithDelay($target, 'start');
                showWithDelay($target, 'stop');

            });

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

    function prepareTarget($thisTarget) {

        /**
         *  Prepare the target.
         *
         *  Remove original target element from the DOM,
         *  clean up the content, inject it into a new
         *  tooltip-element and attach that to the DOM.
         *
         *  @param  {jQuery dom object} $thisTarget - the target
         *  @return {jQuery dom object} $thisTarget - the prepared target
         */

        var $thisTmpTarget = $thisTarget.detach();

        if ($thisTarget.attr('id') !== undefined) {
            targetId = 'id="' + $thisTarget.attr('id') + '" ';
        } else {
            targetId = '';
        }

        $thisTarget = $('<div ' + targetId + 'class="tooltip">' + $thisTarget.html() +'</div>').appendTo($(document.body)).hide();

        if ($thisTmpTarget.attr('class') !== undefined) {

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
                var thisTmpTargetClassnames = $thisTmpTarget.attr('class');

                if (thisTmpTargetClassnames.indexOf(thisModifier) > 0) {
                    thisModifier = 'tooltip--' + thisModifier.split('--')[1];
                    $thisTarget.addClass(thisModifier);
                }

            }

        }

        // return the prepared target

        return $thisTarget;

    }

    function setPosition($thisTarget, e) {

        /**
         *  Set the tool tip position.
         *
         *  @param {jQuery dom object} $thisTarget - the target element
         *  @param {event}             e           - the trigger event
         */

        // calculate dimensions and positions

        var padding        = 20;
        var cursorY        = e.pageY;
        var cursorX        = e.pageX;
        var tooltipWidth   = $thisTarget.width();
        var tooltipHeight  = $thisTarget.height();
        var viewPortWidth  = $(window).width();
        var viewPortHeight = $(window).height();
        var scrollTop      = $(window).scrollTop();

        // calculate position for tooltip

        var tooltipLeft = cursorX + tooltipWidth > viewPortWidth ? cursorX - tooltipWidth - padding + 'px' : cursorX  + 'px';
        var tooltipTop  = cursorY + tooltipHeight + padding * 3 > scrollTop + viewPortHeight ? cursorY - tooltipHeight - padding * 2 + 'px' : cursorY + padding + 'px';

        // set position for tooltip

        $thisTarget
            .css({
                'position': 'absolute',
                'left': tooltipLeft,
                'top': tooltipTop
            });

    }

    function showWithDelay($thisTarget, action) {

        /**
         *  Show a tool tip with delay.
         *
         *  @param {jQuery dom object} $thisTarget - the target element
         *  @param {string}            action      - keyword, "start" || "stop"
         */

        if (action === 'start') {

            YOI.setDelay('tooltipShowDelay', showDelayDuration, function(){
                $thisTarget
                    .fadeIn(200)
                    .promise()
                    .then(function() {
                        $thisTarget.trigger('yoi-tooltip-show');
                    });
            });


        } else if (action === 'stop') {

            YOI.clearDelay('tooltipShowDelay');

        }

    }

    function hideWithDelay($thisTarget, action) {

        /**
         *  Hide a tool tip with delay.
         *
         *  @param {string} action - keyword, "start" || "stop"
         */

        if (action === 'start') {

            YOI.setDelay('tooltipHideDelay', hideDelayDuration, function(){
                $('.tooltip').hide();
                $thisTarget.trigger('yoi-tooltip-hide');
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
