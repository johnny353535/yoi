/** scrollfx.js */

YOI.behaviour.ScrollFx = (function() {

    // private vars
    // ============

    var fxClassNames = [
        'fade-in',
        'fade-out',
        'scale-up',
        'scale-down',
        'slide-in-top',
        'slide-out-top',
        'slide-in-bottom',
        'slide-out-bottom',
        'slide-in-left',
        'slide-out-left',
        'slide-in-right',
        'slide-out-right',
        'shake'
    ];

    // private functions
    // =================

    function initialize($targetElement, options) {

       /**
        *  Initialize the script.
        *
        *  @param {jQuery element} $targetElement(s)
        *  @param {object}         options
        *
        *  Available options:
        *
        *  @option {string} in     - yoi fx css class name on viewport:in
        *  @option {string} bottom - yoi fx css class name on viewport:bottom
        *  @option {string} center - yoi fx css class name on viewport:center
        *  @option {string} top    - yoi fx css class name on viewport:top
        *  @option {string} repeat - repeats the fx each time, default is "true"
        *  @option {string} speed  - change the default speed to "slow" or "fast"
        *  @option {string} not    - a string or a comma-seperated list of strings
        *                            to set the breakpoints/screen-sizes on which
        *                            scroll fx are disabled
        */

        var $targetElement = YOI.createCollection('scrollfx', $targetElement, options);

        if ($targetElement) $targetElement.each(function() {

            var $thisTargetElement = $(this);

            // cancel if already initialized

            if ($thisTargetElement.data().props.hasScrollFx) return;

            // proceed

            resetFxClassNames($thisTargetElement);
            resetCustomClassName($thisTargetElement);
            prepare($thisTargetElement);
            listen($thisTargetElement);

            // set initialized

            $thisTargetElement.data().props.hasScrollFx = true;

        });

        // start the breakpoint agent

        startBreakpointAgent();

        // initialize the scroll agent

        YOI.module.ScrollAgent.init($targetElement, options);

    }

    function startBreakpointAgent() {

        /**
         *  Listen to breakpoint changes and set the
         *  "allowedOnCurrentBreakpoint" property.
         */

         var $window = $(window);

         $window.on('yoi-breakpoint-change.scrollfx', function() {

            YOI.collection['scrollfx'].each(function() {

                var $this            = $(this);
                var options          = $this.data().options;
                var activeBreakpoint = YOI.currentBreakPoint();
                var not              = options.not !== undefined ? options.not.split(',') : false;

                $this.data().props.allowedOnCurrentBreakpoint = $.inArray(activeBreakpoint, not) === -1;

            });

        });

        // trigger one initial breakpoint change event

        $window.trigger('yoi-breakpoint-change');

    }

    function prepare($targetElement) {

        /**
         *  If the target element uses the internal fx (css-)classes,
         *  this method adds the corresponding "initial" (css-)class and
         *  removes the fx (css-)classes which were applied before.
         *
         *  @param {jQuery element} $targetElement - the target element
         */

        var options  = $targetElement.data().options;
        var inFx     = options.in || false;
        var bottomFx = options.bottom || false;
        var centerFx = options.center || false;
        var topFx    = options.top || false;

        if (validateFxClassName(inFx)) {
            $targetElement.addClass('fx-' + inFx + '-initial');
            $targetElement.removeClass('fx-' + inFx);
        } else {
            $targetElement.removeClass(inFx);
        }

        if (validateFxClassName(bottomFx)) {
            $targetElement.addClass('fx-' + bottomFx + '-initial');
            $targetElement.removeClass('fx-' + bottomFx);
        } else {
            $targetElement.removeClass(bottomFx);
        }

        if (validateFxClassName(centerFx)) {
            $targetElement.addClass('fx-' + centerFx + '-initial');
            $targetElement.removeClass('fx-' + centerFx);
        } else {
            $targetElement.removeClass(centerFx);
        }

        if (validateFxClassName(topFx)) {
            $targetElement.addClass('fx-' + topFx + '-initial');
            $targetElement.removeClass('fx-' + topFx);
        } else {
            $targetElement.removeClass(topFx);
        }

    }

    function listen($targetElement) {

        /**
         *  Listens to the custom events (entering or leaving viewport) and
         *  applies fx accordingly.
         *
         *  @param {jQuery element} $targetElement - the target element
         */

        var options  = $targetElement.data().options;
        var inFx     = options.in || false;
        var bottomFx = options.bottom || false;
        var centerFx = options.center || false;
        var topFx    = options.top || false;
        var speed    = options.speed || false;
        var repeat   = options.repeat || true;

        if (repeat !== 'false') {

            $targetElement.on('yoi-viewport-in.scrollFx', function() {
                if (validateFxClassName(inFx)) {
                    applyFx($targetElement, inFx, speed);
                } else {
                    applyCustomClassName($targetElement, inFx);
                }
            });

            $targetElement.on('yoi-viewport-bottom.scrollFx', function() {
                if (validateFxClassName(bottomFx)) {
                    applyFx($targetElement, bottomFx, speed);
                } else {
                    applyCustomClassName($targetElement, bottomFx);
                }
            });

            $targetElement.on('yoi-viewport-center.scrollFx', function() {
                if (validateFxClassName(centerFx)) {
                    applyFx($targetElement, centerFx, speed);
                } else {
                    applyCustomClassName($targetElement, centerFx);
                }
            });

            $targetElement.on('yoi-viewport-top.scrollFx', function() {
                if (validateFxClassName(topFx)) {
                    applyFx($targetElement, topFx, speed);
                } else {
                    applyCustomClassName($targetElement, topFx);
                }
            });

            $targetElement.on('yoi-viewport-out.scrollFx', function() {
                prepare($targetElement);
            });

        } else {

            $targetElement.one('yoi-viewport-in.scrollFx', function() {
                if (validateFxClassName(inFx)) {
                    applyFx($targetElement, inFx, speed);
                } else {
                    applyCustomClassName($targetElement, inFx);
                }
            });

            $targetElement.one('yoi-viewport-bottom.scrollFx', function() {
                if (validateFxClassName(bottomFx)) {
                    applyFx($targetElement, bottomFx, speed);
                } else {
                    applyCustomClassName($targetElement, bottomFx);
                }
            });

            $targetElement.one('yoi-viewport-center.scrollFx', function() {
                if (validateFxClassName(centerFx)) {
                    applyFx($targetElement, centerFx, speed);
                } else {
                    applyCustomClassName($targetElement, centerFx);
                }
            });

            $targetElement.one('yoi-viewport-top.scrollFx', function() {
                if (validateFxClassName(topFx)) {
                    applyFx($targetElement, topFx, speed);
                } else {
                    applyCustomClassName($targetElement, topFx);
                }
            });

        }

    }

    function validateFxClassName(className) {

        /**
         *  Checks if the given className is part of YOI's scroll fx.
         * 
         *  @param  {string}  className - the (css-)class name to test for
         *  @return {boolean}
         */

        return fxClassNames.includes(className);

    }

    function applyFx($targetElement, fx, speed) {

        /**
         *  Applies the given fx and play it at the given speed.
         *
         *  @param {jQuery element} $targetElement - the target element
         *  @param {string}         fx             - the fx css class to apply
         *  @param {string}         speed          - the speed css class to apply
         */

        var props   = $targetElement.data().props;
        var allowed = props.allowedOnCurrentBreakpoint;

        if (!allowed) return;

        if (fx) {
            $targetElement.removeClass('fx-' + fx + '-initial');
            $targetElement.addClass('fx-' + fx);
        }

        if (speed) {
            $targetElement.addClass('fx-' + speed);
        }

    }

    function resetFxClassNames($targetElement) {

        /**
         *  Remove all fx-related class names from the target element.
         *
         *  @param {jQuery element} $targetElement
         */

        $targetElement.removeClass(function(index, className) {
            return (className.match (/(^|\s)fx-\S+/g) || []).join(' ');
        });

    }

    function applyCustomClassName($targetElement, customClassName) {

        /**
         *  Adds the given custom (css-)class name to the target element.
         * 
         *  @param {jQuery element} $targetElement
         *  @param {string}         customClassName - the custom css class to apply
         */

        var props   = $targetElement.data().props;
        var allowed = props.allowedOnCurrentBreakpoint;

        if (!allowed) return;

        if (customClassName) {
            $targetElement.removeClass(customClassName);
            $targetElement.addClass(customClassName);
        }

    }

    function resetCustomClassName($targetElement) {

        /**
         *  Remove the custom class names from the target element.
         *
         *  @param {jQuery element} $targetElement
         */

        var options  = $targetElement.data().options;
        var inFx     = options.in || false;
        var bottomFx = options.bottom || false;
        var centerFx = options.center || false;
        var topFx    = options.top || false;

        console.log('resetCustomClassName()');
        
        if (inFx) $targetElement.removeClass(inFx);
        if (bottomFx) $targetElement.removeClass(bottomFx);
        if (centerFx) $targetElement.removeClass(centerFx);
        if (topFx) $targetElement.removeClass(topFx);

    }

    function reset($targetElement) {

        /**
         *  Reset all properties and options of the target element.
         *
         *  @param {jQuery element} $targetElement
         */

        $targetElement.data().props   = {};
        $targetElement.data().options = {};
        resetFxClassNames($targetElement);
        resetCustomClassName($targetElement);

    }

    function destroy() {

        /**
         *  Disable all scroll fx and reset all changes to
         *  the document or element stylings, remove all related event listeners.
         */

        reset(YOI.collection['scrollfx']);
        YOI.filterCollection('scrollagent', 'hasScrollFx');
        YOI.destroyCollection('scrollfx');
        $(window).off('yoi-breakpoint-change.scrollfx');

    }

    // public functions
    // ================

    return {
        init: initialize,
        destroy : destroy
    };

})();
