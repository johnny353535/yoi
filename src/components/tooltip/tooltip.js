/** tooltip.js */

YOI.component.Tooltip = (function() {

    // private vars
    // ============

    var defaultFadeDuration = 200;
    var defaultShowDelay    = 500;
    var defaultHideDelay    = 500;
    var generatedToolTipId  = 1;

    // private functions
    // =================

    function initialize($tooltipTrigger, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery element} $tooltipTrigger
         *  @param {object}         options
         *
         *  Available options:
         *
         *  @option {string} target         - a CSS selector (most likely an #id) to select the dom
         *                                    element which gets turned into a tooltip
         *  @option {string} staticPosition - set to 'top', 'right', 'bottom' or 'left' to create a
         *                                    static tooltip with a pointer
         *  @option {string} fixed          - set the tooltip to position:fixed
         *  @option {number} showDelay      - time in milliseconds to delay showing the tooltip
         *  @option {number} hideDelay      - time in milliseconds to delay hiding the tooltip
         */

        var $tooltipTrigger = YOI.createCollection('tooltip', $tooltipTrigger, options);

        if ($tooltipTrigger) $tooltipTrigger.each(function() {

            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // proceed

            var $thisTooltipTrigger = $(this);
            var options             = $thisTooltipTrigger.data().options;
            var staticPosition      = options.staticPosition || false;
            var content             = options.content || false;
            var target              = options.target || false;
            var hasStaticPosition   = staticPosition === 'top' || staticPosition === 'right' || staticPosition === 'bottom' || staticPosition === 'left';

            if (!target && content !== false) {
                // if no target is set but the content,
                // generate the tooltip on the fly

                var $thisTooltip = generateTooltip($thisTooltipTrigger, content);
            } else if (target) {
                // or prepare a referenced element in the dom
                // and turn it into a tooltip

                var $thisTooltip = prepareTooltip($thisTooltipTrigger, $(options.target));
            } else {
                // otherwise cancel

                return false;
            }

            $thisTooltipTrigger.on('mouseenter', function(e) {
                if (hasStaticPosition) {
                    setStaticPosition($thisTooltipTrigger, $thisTooltip);
                } else {
                    setPosition($thisTooltipTrigger, $thisTooltip, e);
                }
                hideAll();
                hideWithDelay($thisTooltipTrigger, $thisTooltip, 'stop');
                showWithDelay($thisTooltipTrigger, $thisTooltip, 'start');
            });

            // hide tooltip

            $thisTooltipTrigger.on('mouseleave', function() {
                hideWithDelay($thisTooltipTrigger, $thisTooltip, 'start');
                showWithDelay($thisTooltipTrigger, $thisTooltip, 'stop');
            });

            // follow moving cursor

            if (!staticPosition) {
                $thisTooltipTrigger.on('mousemove', function(e) {
                    setPosition($thisTooltipTrigger, $thisTooltip, e);
                });
            }

            // set initialized

            YOI.setReady($(this));

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

    function generateTooltip($thisTooltipTrigger, content) {

        /**
         *  Creates a tooltip and injects it into the dom.
         *
         *  @param  {jQuery element} $thisTooltipTrigger - the tooltip trigger element
         *  @param  {string}         content             - the content of the created tooltip
         *  @return {jQuery element}                     – reference to the prepared tooltip in DOM
         */

        var tooltipId             = 'yoi-tooltip-' + generatedToolTipId++;
        var targetAlreadyPrepared = $('#' + tooltipId).length;
        var content               = content || 'lorem ipsum';

        if (!targetAlreadyPrepared) {

            // generate and inject the tooltip
            $('<div id="' + tooltipId + '" class="tooltip">' + content +'</div>').appendTo($(document.body)).hide();

            // store the reference on the trigger element
            // props object

            YOI.updateProps($thisTooltipTrigger, {
                'tooltipId' : tooltipId
            });

        }

        return $('#' + tooltipId);

    }

    function changeTooltipContent($thisTooltipTrigger, content) {

        /**
         *  Change the content of an existing tooltip.
         *
         *  @param  {jQuery element} $thisTooltipTrigger - the tooltip trigger element
         *  @param  {string}         content             - the content of the created tooltip
         *
         */

        var $thisToolTip = $('#' + $thisTooltipTrigger.data().props.tooltipId);

        // cancel if no tooltip was found

        if (!$thisToolTip.length) return false;

        // change the tooltip content

        $thisToolTip.html(content);

    }

    function prepareTooltip($thisTooltipTrigger, $thisTargetElement) {

        /**
         *  Turns the given target element into a proper tooltip.
         *
         *  Remove original target element from the DOM, clean up the content, inject it into
         *  a new tooltip-element and attach it to the DOM.
         *
         *  @param  {jQuery element} $thisTooltipTrigger - the tooltip trigger element
         *  @param  {jQuery element} $thisTargetElement  - the target element to transform into a tooltip
         *  @return {jQuery element}                     – reference to the prepared tooltip in DOM
         */

        var targetId              = $thisTargetElement.attr('id');
        var targetAlreadyPrepared = $('#' + targetId + '.tooltip').length;

        if (!targetAlreadyPrepared) {

            // if the $thisTargetElement was not already prepared,
            // detach $thisTargetElement and append the properly
            // prepared tooltip

            $thisTargetElement.detach();
            $('<div id="' + targetId + '" class="tooltip">' + $thisTargetElement.html() +'</div>').appendTo($(document.body)).hide();

            // store the reference on the trigger element
            // props object

            YOI.updateProps($thisTooltipTrigger, {
                'tooltipId' : targetId
            });

        }

        return $('#' + targetId);

    }

    function setPosition($thisTooltipTrigger, $thisTooltip, e) {

        /**
         *  Set the tooltip position.
         *
         *  @param {jQuery element} $thisTooltip - the tooltip
         *  @param {event}          e            - the trigger event
         */

        // calculate dimensions and positions

        var offset         = 20;
        var cursorY        = e.pageY;
        var cursorX        = e.pageX;
        var tooltipWidth   = $thisTooltip.width();
        var tooltipHeight  = $thisTooltip.height();
        var viewPortWidth  = $(window).width();
        var viewPortHeight = $(window).height();
        var scrollTop      = $(window).scrollTop();
        var fixed          = $thisTooltipTrigger.data().options.fixed || false;
        var positionType   = fixed ? 'fixed' : 'absolute';
        var scrollOffset   = fixed ? $(window).scrollTop() : 0;

        // calculate position for tooltip

        var tooltipLeft = cursorX + tooltipWidth > viewPortWidth ? cursorX - tooltipWidth - offset + 'px' : cursorX  + 'px';
        var tooltipTop  = cursorY + tooltipHeight + offset * 3 > scrollTop + viewPortHeight ? cursorY - tooltipHeight - scrollOffset - offset * 2 + 'px' : cursorY + offset - scrollOffset + 'px';

        // set position for tooltip

        $thisTooltip
            .css({
                'position': positionType,
                'left': tooltipLeft,
                'top': tooltipTop
            });

    }

    function setStaticPosition($thisTooltipTrigger, $thisTooltip) {

        /**
         *  Set the tooltip to a "static" position, relative to it's trigger element,
         *  not following the curser on mousemove.
         *
         *  @param {jQuery element} $thisTooltipTrigger - the tooltip trigger element
         *  @param {jQuery element} $thisTooltip        - the tooltip
         *  @param {string}         position            - position keyword (top, right, bottom, left)
         */

        var offset       = 10;
        var options      = $thisTooltipTrigger.data().options;
        var position     = options.staticPosition;
        var fixed        = options.fixed || false;
        var positionType = fixed ? 'fixed' : 'absolute';
        var scrollOffset = fixed ? $(window).scrollTop() : 0;
        var tooltipLeft;
        var tooltipTop;

        switch (position) {
            case 'top':
                tooltipLeft = $thisTooltipTrigger.offset().left + $thisTooltipTrigger.outerWidth() / 2 - $thisTooltip.outerWidth() / 2;
                tooltipTop  = $thisTooltipTrigger.offset().top - scrollOffset - $thisTooltip.outerHeight() - offset;
                break;
            case 'right':
                tooltipLeft = $thisTooltipTrigger.offset().left + $thisTooltipTrigger.outerWidth() + offset;
                tooltipTop  = $thisTooltipTrigger.offset().top - scrollOffset + $thisTooltipTrigger.outerHeight() / 2 - $thisTooltip.outerHeight() / 2;
                break;
            case 'bottom':
                tooltipLeft = $thisTooltipTrigger.offset().left + $thisTooltipTrigger.outerWidth() / 2 - $thisTooltip.outerWidth() / 2;
                tooltipTop  = $thisTooltipTrigger.offset().top - scrollOffset + $thisTooltipTrigger.outerHeight() + offset;
                break;
            case 'left':
                tooltipLeft = $thisTooltipTrigger.offset().left - $thisTooltip.outerWidth() - offset;
                tooltipTop  = $thisTooltipTrigger.offset().top - scrollOffset + $thisTooltipTrigger.outerHeight() / 2 - $thisTooltip.outerHeight() / 2;
                break;
        }


        // set position for tooltip

        $thisTooltip
            .attr('class','tooltip tooltip--' + position)
            .css({
                'position': positionType,
                'left': tooltipLeft,
                'top': tooltipTop
            });

    }

    function showWithDelay($thisTooltipTrigger, $thisTooltip, action) {

        /**
         *  Show a tooltip with delay.
         *
         *  @param {jQuery element} $thisTooltip - the tooltip
         *  @param {string}         action       - keyword, "start" || "stop"
         */

        var options           = $thisTooltipTrigger.data().options;
        var showDelayDuration = options.showDelay || defaultShowDelay;

        if (action === 'start') {

            YOI.setDelay('tooltipShowDelay', showDelayDuration, function(){
                $thisTooltip
                    .fadeIn(defaultFadeDuration)
                    .promise()
                    .then(function() {
                        $thisTooltip.trigger('yoi-tooltip-show');
                    });
            });

        } else if (action === 'stop') {

            YOI.clearDelay('tooltipShowDelay');

        }

    }

    function hideWithDelay($thisTooltipTrigger, $thisTooltip, action) {

        /**
         *  Hide a tool tip with delay.
         *
         *  @param {string} action - keyword, "start" || "stop"
         */

        var options           = $thisTooltipTrigger.data().options;
        var hideDelayDuration = options.hideDelay || defaultHideDelay;

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
        change  : changeTooltipContent,
        show    : showWithDelay,
        hide    : hideWithDelay,
        hideAll : hideAll
    };

})();
