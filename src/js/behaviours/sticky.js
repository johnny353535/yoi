/** sticky.js */

YOI.behaviour.Sticky = (function() {

    // private vars
    // ============

    var $body   = $('body');
    var $window = $(window);

    // private functions
    // =================

    function initialize($stickyElement, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery element} $stickyElement
         *  @param {object}         options
         *
         *  Available options:
         *
         *  @option {number} start     - The distance between the sticky element's top position and the
         *                               viewport's top border at the moment the element sticks.
         *                               The default value is 0.
         *  @option {number} stop      - The distance between the sticky element's initial top position
         *                               and the sticky element's final top position at the moment it
         *                               stops sticking. The default value is the body height, which results
         *                               in sticking as long as the page can be scrolled.
         *  @option {string} reference - If the value is the keyword/string "parent", the sticky
         *                               element's fist parent element is referenced to control the
         *                               sticky element.
         *                               If the value is a jQuery-compatible CSS-selector, the script
         *                               selects the first matching element on the page and references
         *                               it's height to define a stop position for the sticky element.
         *                               The sticky element "sticks" as long as it's bottom aligns with
         *                               the reference element's bottom.
         *  @option {string} not       - A single string or a comma-seperated list of strings. Valid values
         *                               are "small", "medium", "large" and "xlarge". This options tells
         *                               the sticky element to disable it's sticky behaviour on the given
         *                               breakpoints (eg. not:small,medium; = element won't stick on "small"
         *                               and "medium" breakpoint).
         */

        var $stickyElement = YOI.createCollection('sticky', $stickyElement, options);

        if ($stickyElement) {

            // console.log($stickyElement);
            // return;

            $stickyElement.each(function(index) {

                var $thisStickyElement = $(this);

                // cancel if already initialized

                if ($thisStickyElement.data().props.isSticky) return;

                // if $thisStickyElement already has position:fixed or
                // any css transformation, cancel ...

                if ($thisStickyElement.css('position') === 'fixed' || $stickyElement.css('transform') !== 'none') return;

                // ... otherwise proceed and perform the necessary transformation,
                // then update the sticky element's properties

                transform($thisStickyElement, index);
                updateProps($thisStickyElement);

                // set initialized

                $thisStickyElement.data().props.isSticky = true;

            });

            // start position & stick observers

            startPositionObserver(); // on: yoi-breakpoint-change yoi-pageheight-change
            startStickObserver();    // on: yoi-scroll

        }

    }

    function transform($stickyElement, index) {

        /**
         *  Perform all necessary dom manipulation and style changes.
         *
         *  @param {jQuery element} $stickyElement - the sticky element
         *  @param {number}         index          - the index of $stickyElement
         */

        var $stickyPlaceholder     = $('<div id="stickyPlaceholder-' + index + '"></div>');
        var $stickyWrapper         = $('<div class="stickyWrapper"></div>');
        var stickyElementCssPos    = $stickyElement.css('position');
        var stickyElementCssLeft   = $stickyElement.css('left');
        var stickyElementCssTop    = $stickyElement.css('top');
        var stickyElementCSSMargin = $stickyElement.css('margin');

        // set the $stickyElement and $stickyWrapper styles

        if (stickyElementCssPos !== 'static') {

            // if the $stickyElement is absolutely or relatively positioned,
            // clear these properties and copy them over to $stickyWrapper

            $stickyWrapper.css({
                'position': stickyElementCssPos,
                'top': stickyElementCssTop,
                'left': stickyElementCssLeft
            });

            // we use native setProperty() on $stickyElement because we might need
            // to override position rules wich are applied with "!important"

            $stickyElement[0].style.setProperty('position', 'static', 'important');

        } else {

            // in all other cases, set the wrapper to position:relative

            $stickyWrapper.css({
                'position': 'relative'
            });

        }

        // set the $stickyPlaceholder styles

        $stickyPlaceholder.css({
            'margin'  : stickyElementCSSMargin,
            'width'   : $stickyElement.outerWidth(),
            'height'  : $stickyElement.outerHeight(),
            'display' : 'none'
        });

        // do the dom manipulation

        $($stickyElement).wrap($stickyWrapper);
        $stickyPlaceholder.insertAfter($stickyElement);

    }

    function reset($stickyElement, index) {

        /**
         *  Reset all data, CSS and dom manipulation for a given
         *  sticky element.
         *
         *  @param {jQuery element} $stickyElement - the sticky element
         *  @param {number}         index          - the index of $stickyElement
         */

        $('#stickyPlaceholder-' + index).remove();

        $stickyElement.data().props = {};
        $stickyElement.removeAttr('style');
        $stickyElement.unwrap('.stickyWrapper');

    }

    function updateProps($stickyElement) {

        /**
         *  Reads options from the custom data-option interface and calculates other
         *  important data, like initial position, dimensions, etc. Adds all data to the
         *  $stickyElement props object, to make it available for further use.
         *
         *  @param {jQuery element} $stickyElement - the sticky element
         */

        var activeBreakpoint           = YOI.currentBreakPoint();
        var data                       = $stickyElement.data();
        var options                    = data.options;
        var $referenceElement          = options.reference === 'parent' ? $stickyElement.parent().parent() : $(options.reference).first();
        var stickyElementHeight        = $stickyElement.outerHeight();
        var stickyElementWidth         = $stickyElement.outerWidth();
        var stickyElementInitialTopPos = $stickyElement.offset().top;
        var topOffset                  = options.start !== undefined ? parseInt(options.start) : 0;
        var topDistance                = options.stop !== undefined ? parseInt(options.stop) : 0;
        var stickStart                 = options.start !== undefined ? stickyElementInitialTopPos - topOffset : stickyElementInitialTopPos;
        var stickStop                  = options.stop !== undefined ? stickyElementInitialTopPos + topDistance - topOffset : $body.height();
        var not                        = options.not !== undefined ? options.not.split(',') : false;
        var allowedOnCurrentBreakpoint = $.inArray(activeBreakpoint, not) === -1;
        var passedValidation           = validInput($stickyElement) && validHeight($stickyElement) && allowedOnCurrentBreakpoint;

        // the reference element is found in the dom

        if ($referenceElement.length) {
            stickStart = $referenceElement.offset().top - topOffset;
            stickStop  = stickStart + $referenceElement.outerHeight() - stickyElementHeight - topDistance;
        }

        // the reference element is the parent dom object of the sticky element,
        // in this case, add the parent object's padding to the calculation

        if ($referenceElement.length && options.reference === 'parent') {
            stickStart = stickStart + parseInt($referenceElement.css('paddingTop'));
            stickStop  = stickStop - parseInt($referenceElement.css('paddingBottom')) + topDistance;
        }

        // write props

        data.props.passedValidation = passedValidation;
        data.props.height           = stickyElementHeight;
        data.props.width            = stickyElementWidth;
        data.props.initialTopPos    = stickyElementInitialTopPos;
        data.props.topOffset        = topOffset;
        data.props.topDistance      = topDistance;
        data.props.stickStart       = stickStart;
        data.props.stickStop        = stickStop;

    }

    function validInput($stickyElement) {

        /**
         *  Checks the input from the custom data-option interface and decides
         *  weather it makes sense. For example it does not make sense if the
         *  start position value is larger than the end position value.
         *  Returns TRUE if the input is valid, FALSE if not.
         *
         *  @param  {jQuery element} $stickyElement - the sticky element
         *  @return {bool}                          - true if data is valid, false if data is invalid
         */

        var props      = $stickyElement.data().props;
        var stickStart = props.stickStart;
        var stickStop  = props.stickStop;

        if (stickStop < 1 || stickStart > stickStop || stickStart > $stickyElement.offset().top) {
            return false;
        } else {
            return true;
        }

    }

    function validHeight($stickyElement) {

        /**
         *  Prevents very tall elements from getting sticky.
         *  Returns TRUE if $stickyElement is shorter and FALSE if $stickyElement
         *  is taller than the window/viewport.
         *
         *  @return {bool}
         */

        if ($stickyElement.outerHeight() > $window.height()) {
            return false;
        } else {
            return true;
        }

    }

    function positionObserver() {

        /**
         *  Resets and updates the $stickyElement props data.
         */

        YOI.collection['sticky'].each(function(index) {

            var $stickyElement   = $(this);
            var passedValidation = validInput($stickyElement) && validHeight($stickyElement);

            // reset & update props, if the sticky element passed validation,
            // do the transformation

            reset($stickyElement, index);
            if (passedValidation) transform($stickyElement, index);
            updateProps($stickyElement);

        });

        // trigger one initial scroll

        $window.trigger('yoi-scroll');

    }

    function startPositionObserver() {

        /**
         *  Starts the position observer.
         */

        $window.on('load.sticky yoi-resize.sticky yoi-breakpoint-change.sticky yoi-pageheight-change.sticky', function() {
            positionObserver();
        });

    }

    function stickObserver() {

        /**
         *  Observes all sticky elements and manipulates their position. If a sticky element
         *  is inside it's "sticky boundaries", it is "set to stick", otherwise it gets "unstuck".
         */

        // store the scroll position

        var scrollTop = $window.scrollTop();

        // observe all sticky elements

        YOI.collection['sticky'].each(function(index) {

            var $stickyElement             = $(this);
            var $stickyPlaceholder         = $('#stickyPlaceholder-' + index);
            var props                      = $stickyElement.data().props;
            var stickyElementInitialTopPos = props.initialTopPos;
            var stickStart                 = props.stickStart;
            var stickStop                  = props.stickStop;
            var topOffset                  = props.topOffset;
            var passedValidation           = props.passedValidation;
            var cssWidthValue              = props.width;
            var cssPositionValue;
            var cssTopValue;
            var stickyPlaceholderDisplay;

            // proceed if the sticky element passed validation

            if (passedValidation) {

                // re-position on scroll

                if (scrollTop < stickStart) {

                    // outside top boundary

                    cssPositionValue         = 'static';
                    cssTopValue              = 0;
                    stickyPlaceholderDisplay = 'none';

                    // trigger custom event

                    $stickyElement.trigger('yoi-stick-stop');


                } else if (scrollTop > stickStop) {

                    // outside bottom boundary

                    cssPositionValue         = 'absolute';
                    cssTopValue              = stickStop - stickyElementInitialTopPos + topOffset;
                    stickyPlaceholderDisplay = 'block';

                    // trigger custom event

                    $stickyElement.trigger('yoi-stick-stop');

                } else {

                    // inside boundaries

                    cssPositionValue         = 'fixed';
                    cssTopValue              = 0 + topOffset;
                    stickyPlaceholderDisplay = 'block';

                    // trigger custom event

                    $stickyElement.trigger('yoi-stick-start');

                }

                // set the css

                // we use native setProperty() on $stickyElement because we might need to override
                // rules wich are applied with "!important"

                $stickyElement[0].style.setProperty('position', cssPositionValue, 'important');

                $stickyElement.css({
                    'width' : cssWidthValue,
                    'top' : cssTopValue,
                    'backface-visibility' : 'hidden',
                    'z-index' : 1001
                });

                $stickyPlaceholder.css({
                    'display' : stickyPlaceholderDisplay
                });

            }

        });

    }

    function startStickObserver() {

        /**
         *  Starts the stick observer.
         */

        $window.on('yoi-scroll.sticky', function() {
            stickObserver();
        });

    }

    function destroy() {

        /**
         *  Disable all sticky behaviour and reset all changes to
         *  the document or element stylings, remove all related event listeners.
         */

        $window.off('load.sticky yoi-resize.sticky yoi-scroll.sticky yoi-breakpoint-change.sticky yoi-pageheight-change.sticky');
        YOI.collection['sticky'].each(function() { reset($(this)); });
        YOI.destroyCollection('sticky');

    }

    // public functions
    // ================

    return {
        init : initialize,
        destroy : destroy
    };

})();
