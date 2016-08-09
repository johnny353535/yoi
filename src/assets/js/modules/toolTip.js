/** toolTip.js */

var Tooltip = (function() {

    // private vars
    // ============

    var showDelayDuration = 300;
    var hideDelayDuration = 200;

    // private functions
    // =================

    function initializeTooltip(scope) {

        /**
         *  Initialize the tool tips.
         *
         *  @param  {string} scope - css selector
         */

        // set css-selector to either target all tool tip related elements
        // or only the ones in a specified scope (e.g. #myContainer [data-tooltip="..."])

        if (scope === undefined) {
            scope = '';
        } else {
            scope += ' ';
        }

        $(scope + '[data-tooltip]').each(function() {

            // set up vars

            var $this     = $(this);
            var options   = Helper.toObject($this.data('tooltip'));
            var $target   = options.target !== undefined ? $(options.target) : $this.find('.tooltip');
            var character = (options.character !== undefined && !icon) ? options.character : '?';
            var $trigger;

            // prepare the trigger element

            $trigger = prepareTrigger($this);

            // prepare the target element

            $target = prepareTarget($target);

            // add event to trigger

            $trigger.on('mouseover', function(e) {

                // positioning

                setPosition($target, e);

                // hide all other tooltips

                $('.tooltip').hide();

                hideWithDelay('stop');
                showWithDelay($target, 'start');

            });

            $trigger.on('mouseout', function() {

                hideWithDelay('start');
                showWithDelay($target, 'stop');

            });

        });

    }

    function prepareTrigger($thisTrigger) {

        /**
         *  Prepare the trigger.
         *
         *  In case the trigger element itself is an text input element,
         *  a hint needs to get injected and things need to get
         *  wrapped inside a <div class="wrapper"> for positioning.
         *
         *  @param  {jQuery dom object} $thisTrigger         - the trigger
         *  @return {jQuery dom object} $thisPreparedTrigger - the prepared trigger
         */

        var options            = Helper.toObject($thisTrigger.data('tooltip'));
        var icon               = options.icon !== undefined ? options.icon : false;
        var textInputTypes     = ['email', 'password', 'tel', 'text', 'url'];
        var triggerIsTextInput = $thisTrigger.prop('tagName') === 'INPUT' && $.inArray($thisTrigger.attr('type'), textInputTypes) > -1;
        var triggerIsTextarea  = $thisTrigger.prop('tagName') === 'TEXTAREA';
        var $thisPreparedTrigger;

        if (triggerIsTextInput || triggerIsTextarea) {

            var $wrapper = $('<div class="tooltip__wrapper">');

            if (!icon) {
                $thisPreparedTrigger = $('<span class="hint">' + character + '</span>');
            } else {
                $thisPreparedTrigger = $('<span class="hint"><i class="icon--' + icon + '-s" aria-hidden="true"></i></span>');
            }

            $thisTrigger.wrap($wrapper);
            $thisTrigger.parent().append($thisPreparedTrigger);
            $thisTrigger.parent().css('width', $thisTrigger.outerWidth());

        } else {

            $thisPreparedTrigger = $thisTrigger;

        }

        // return the prepared trigger

        return $thisPreparedTrigger;

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

                var thisModifier = compatibleModifiers[i];
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

        if (action == 'start') {

            Helper.setDelay('tooltipShowDelay', showDelayDuration, function(){
                $thisTarget.fadeIn(200);
            });


        } else if (action == 'stop') {

            Helper.clearDelay('tooltipShowDelay');

        }

    }

    function hideWithDelay(action) {

        /**
         *  Hide a tool tip with delay.
         *
         *  @param {string} action - keyword, "start" || "stop"
         */

        if (action == 'start') {

            Helper.setDelay('tooltipHideDelay', hideDelayDuration, function(){
                $('.tooltip').hide()
            });


        } else if (action == 'stop') {

            Helper.clearDelay('tooltipHideDelay');

        }

    }

    // initialize
    // ==========

    initializeTooltip();

    // public functions
    // ================

    return {
        init: initializeTooltip,
        show: showWithDelay,
        hide: hideWithDelay
    }

})();
