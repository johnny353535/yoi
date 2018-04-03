/** scrollfx.js */

YOI.behaviour.ScrollFx = (function() {

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
        */

        var $targetElement = YOI.createCollection('scrollfx', $targetElement, options);

        if ($targetElement) $targetElement.each(function() {

            var $thisTargetElement = $(this);

            // cancel if already initialized

            if ($thisTargetElement.data().props.hasScrollFx) return;

            // prepare & listen

            prepare($thisTargetElement);
            listen($thisTargetElement);

            // set initialized

            $thisTargetElement.data().props.hasScrollFx = true;

        });

        // initialize the scroll agent

        YOI.module.ScrollAgent.init($targetElement, options);

    }

    function prepare($targetElement) {

        /**
         *  If the target element uses the internal fx (css-)classes,
         *  this method adds the corresponding initial (css-)class.
         *
         *  @param {jQuery element} $targetElement - the target element
         */

        var options  = $targetElement.data().options;
        var inFx     = options.in || false;
        var bottomFx = options.bottom || false;
        var centerFx = options.center || false;
        var topFx    = options.top || false;

        if (inFx)     $targetElement.addClass('fx-' + inFx + '-initial');
        if (bottomFx) $targetElement.addClass('fx-' + bottomFx + '-initial');
        if (centerFx) $targetElement.addClass('fx-' + centerFx + '-initial');
        if (topFx)    $targetElement.addClass('fx-' + topFx + '-initial');

        $targetElement.removeClass('fx-' + inFx);
        $targetElement.removeClass('fx-' + bottomFx);
        $targetElement.removeClass('fx-' + centerFx);
        $targetElement.removeClass('fx-' + topFx);

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
                applyFx($targetElement, inFx, speed);
            });

            $targetElement.on('yoi-viewport-bottom.scrollFx', function() {
                applyFx($targetElement, bottomFx, speed);
            });

            $targetElement.on('yoi-viewport-center.scrollFx', function() {
                applyFx($targetElement, centerFx, speed);
            });

            $targetElement.on('yoi-viewport-top.scrollFx', function() {
                applyFx($targetElement, topFx, speed);
            });

            $targetElement.on('yoi-viewport-out.scrollFx', function() {
                prepare($targetElement);
            });

        } else {

            $targetElement.one('yoi-viewport-in.scrollFx', function() {
                applyFx($targetElement, inFx, speed);
            });

            $targetElement.one('yoi-viewport-bottom.scrollFx', function() {
                applyFx($targetElement, bottomFx, speed);
            });

            $targetElement.one('yoi-viewport-center.scrollFx', function() {
                applyFx($targetElement, centerFx, speed);
            });

            $targetElement.one('yoi-viewport-top.scrollFx', function() {
                applyFx($targetElement, topFx, speed);
            });

        }

    }

    function applyFx($targetElement, fx, speed) {

        /**
         *  Applies the given fx and play it at the given speed.
         *
         *  @param {jQuery element} $targetElement - the target element
         *  @param {string}         fx             - the fx css class to apply
         *  @param {string}         speed          - the speed css class to apply
         */

        if (fx) {
            $targetElement.removeClass('fx-' + fx + '-initial');
            $targetElement.addClass('fx-' + fx);
        }

        if (speed) {
            $targetElement.addClass('fx-' + speed);
        }

    }

    // public functions
    // ================

    return {
        init: initialize
    };

})();
