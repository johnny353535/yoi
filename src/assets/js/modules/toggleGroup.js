/** toggleGroup.js */

var ToggleGroup = (function() {

    // private vars
    // ============

    var toggleTargetGroupIteration;
    var resetToggleDelayTime = 300;

    // private functions
    // =================

    function initializeToggleGroup($toggleGroup) {

        /**
         *  Initialize all *[data-toggle] found in the document (= function call without parameters)
         *  or target one or more specific *[data-toggle] (= function call with $toggleGroup).
         *  $toggleGroup must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $toggleGroup - the toggle group(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <button data-toggle="target:#myTargetElement;activeClassName:is--active;">
         *
         *  Available options:
         *
         *  @option {string} target          - Selector for target element.
         *  @option {string} group           - A unique string to group toggle elements.
         *  @option {string} activeClassName - To highlight an "active" trigger, this
         *                                     CSS class name is added to the trigger.
         */
        
        if (!($toggleGroup instanceof jQuery)) {
            $toggleGroup = $('[data-toggle]');
        }

        $toggleGroup.each(function(index) {

            var $thisTrigger      = $(this);
            var options           = Helper.toObject($thisTrigger.data('toggle'));
            var target            = options.target;
            var group             = options.group;
            var event             = options.event !== undefined ? options.event : 'mouseover';
            var activeClassName   = options.activeClassName;
            var $thisFallBackElem = $('[data-toggle-fallback="' + group + '"]');

            // group related toggle elements for easy dom-access

            $(target).addClass('toggleTargetGroup-' + group);
            $thisTrigger.addClass('toggleTriggerGroup-' + group);

            // toggle on event (default event = mouseover)

            $thisTrigger.on(event, function(e) {
                e.preventDefault();
                toggleGroup($thisTrigger);
            });

            if ($thisFallBackElem.length > 0 && event === 'mouseover') {

                // If there is a fallback element defined,
                // hide all targets since fallback is the first
                // element to show. This only makes sense on
                // mouseenter/mouseleave events, not on click.

                $(target).hide();

                // Add additional events to switch back
                // to fallback element.

                $thisTrigger
                    .on('mouseenter', function() {
                        Helper.clearDelay('resetToggleTimeout');
                    })
                    .on('mouseleave', function() {
                        Helper.setDelay('resetToggleTimeout', resetToggleDelayTime, function(){
                            resetToggleGroup($thisTrigger);
                        });
                    });

            } else {

                if (toggleTargetGroupIteration !== group) {

                    // If there is no fallback element defined,
                    // each time we start a new toggle group,
                    // hide all targets but the first one.

                    toggleTargetGroupIteration = group;

                    // If an "activeClassName" was defined, add it
                    // to the first trigger element.

                    if (activeClassName !== undefined)
                        $thisTrigger.addClass(activeClassName);

                } else {

                    // If a fall back element exists, hide all
                    // target elements to only show the fall
                    // back element.

                    $(target).hide();
                }

            }

        });

    }

    function toggleGroup($thisTrigger) {

        /**
         *  Toggle a group, read required data from the trigger.
         *
         *  @param {jQuery dom object} $thisTrigger - the trigger
         */

        var options           = Helper.toObject($thisTrigger.data('toggle'));
        var target            = options.target;
        var group             = options.group;
        var activeClassName   = options.activeClassName;

        var $thisFallBackElem = $('[data-toggle-fallback="' + group + '"]');

        // Hide all elements from the same toggle group and
        // show the target element.

        $('.toggleTargetGroup-' + group).hide();
        $(target).show();

        if (activeClassName !== undefined) {
            $('.toggleTriggerGroup-' + group).removeClass(activeClassName);
            $thisTrigger.addClass(activeClassName);
        }

        // If there is a fall back element, hide it.

        if ($thisFallBackElem !== undefined)
            $thisFallBackElem.hide();

    }

    function resetToggleGroup($thisTrigger) {

        /**
         *  Reset a toggle group, read required data from the trigger.
         *
         *  @param {jQuery dom object} $thisTrigger - the trigger
         */

        var options           = Helper.toObject($thisTrigger.data('toggle'));
        var group             = options.group;
        var activeClassName   = options.activeClassName;

        var $thisFallBackElem = $('[data-toggle-fallback="' + group + '"]');

        // Remove active class name from trigger.

        if (activeClassName !== undefined)
            $('.toggleTriggerGroup-' + group).removeClass(activeClassName);

        // Hide all elements from the same toggle group.

        $('.toggleTargetGroup-' + group).hide();

        // If there is a fall back element, show it.

        if ($thisFallBackElem.length > 0)
            $thisFallBackElem.fadeIn();

    }

    // initialize
    // ==========

    initializeToggleGroup();

    // public functions
    // ================

    return {
        init  : initializeToggleGroup,
        reset : resetToggleGroup
    }

})();
