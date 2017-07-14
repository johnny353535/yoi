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
         *  @param {jQuery dom object} $$stickyElement
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {number} start     - The distance between the sticky element top position and the
         *                               viewport top border at the moment the element sticks.
         *                               The default value is 0.
         *  @option {number} stop      - The distance between the sticky element initial top position
         *                               and the sticky element final top position at the moment it
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
         */
        
        var $stickyElement = YOI.createCollection('sticky', $stickyElement, options);

        if ($stickyElement) $stickyElement.each(function(index) {

            var $thisStickyElement      = $(this);
            var $thisStickyElementClone = $thisStickyElement.clone().removeAttr('yoi-sticky').attr('id', 'stickyClone-' + index);
            
            // update each sticky element's data

            updateStickyElementProps($thisStickyElement);

            // do the necessary dom manipulation

            manipulateDom($thisStickyElement, $thisStickyElementClone);

        });

        // start position & stick observers

        if ($stickyElement) positionObserver($stickyElement);
        if ($stickyElement) stickObserver($stickyElement);

    }

    function manipulateDom($stickyElement, $stickyElementClone) {

        /**
         *  Perform all necessary dom manipulations. Takes a clone of the original
         *  sticky element, injects it as a direct child of the body and sets it to
         *  absolute positioning. While being "sticky", the clone is set to fixed positioning.
         *  The original element is kept as an empty element with it's initial width
         *  and height. The visibility is set to "hidden" in order to preserve the page layout.
         *
         *  @param {jQuery dom object} $stickyElement      - the sticky element
         *  @param {jQuery dom object} $stickyElementClone - the cloned sticky element
         */
        
        // prepare the cloned element
        
        $stickyElementClone.css({
            'position'                    : 'absolute',
            'width'                       : $stickyElement.outerWidth(),
            'height'                      : $stickyElement.outerHeight(),
            'top'                         : $stickyElement.offset().top,
            'left'                        : $stickyElement.offset().left,
             // make it work smoothly on iOS Safari
            '-webkit-transform'           : 'translate3d(0,0,0)'
        });

        // append the cloned element

        $body.append($stickyElementClone);

        // prepare the original element

        $stickyElement.css({
            'width'      : $stickyElement.outerWidth(),
            'height'     : $stickyElement.outerHeight(),
            'visibility' : 'hidden'
        });

        // empty the original element

        $stickyElement.empty();
        
    }

    function updateStickyElementProps($stickyElement) {

        /**
         *  Reads options from the custom data-option interface and calculates other
         *  important data, like initial position, dimensions, etc. Adds all data to the
         *  $stickyElement props object, so that it is available for other functions.
         *
         *  @param {jQuery dom object} $stickyElement - the sticky element
         */
        
        var options                       = $stickyElement.data().options;
        var $referenceElement             = options.reference === 'parent' ? $stickyElement.parent() : $(options.reference).first();
        var stickyElementheight           = $stickyElement.outerHeight();
        var stickyElementInitialTopPos    = $stickyElement.offset().top;
        var stickyElementInitialBottomPos = stickyElementInitialTopPos + stickyElementheight;
        var topOffset                     = options.start !== undefined ? parseInt(options.start) : 0;
        var topDistance                   = options.stop !== undefined ? parseInt(options.stop) : 0;
        var stickStart                    = options.start !== undefined ? stickyElementInitialTopPos - topOffset : stickyElementInitialTopPos;
        var stickStop                     = options.stop !== undefined ? stickyElementInitialTopPos + topDistance - topOffset : $body.height();
        var passedValidation              = validInput($stickyElement);

        // the reference element is found in the dom

        if ($referenceElement.length) {
            stickStart = $referenceElement.offset().top - topOffset;
            stickStop  = stickStart + $referenceElement.outerHeight() - stickyElementheight - topDistance;
        }

        // the reference element is the parent dom object of the sticky element,
        // in this case, add the parent object's padding to the calculation

        if ($referenceElement.length && options.reference === 'parent') {
            stickStart = stickStart + parseInt($referenceElement.css('paddingTop'));
            stickStop  = stickStop - parseInt($referenceElement.css('paddingBottom')) + topDistance;
        }
        
        // write props data
        
        $stickyElement.data().props = {
            passedValidation : passedValidation,
            height           : stickyElementheight,
            initialTopPos    : stickyElementInitialTopPos,
            initialBottomPos : stickyElementInitialBottomPos,
            topOffset        : topOffset,
            topDistance      : topDistance,
            stickStart       : stickStart,
            stickStop        : stickStop
        };
        
    }

    function validInput($stickyElement) {

        /**
         *  Checks the input from the custom data-option interface and decides
         *  weather it makes sense. For example it does not make sense if the
         *  start position value is larger than the end position value. Stuff would break.
         *  Returns true if the input is valid, false if not.
         *
         *  @param  {jQuery dom object} $stickyElement - the sticky element
         *  @return {bool}                             - true if data is valid, false if data is invalid
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

    function positionObserver($stickyElements) {

        /**
         *  Listens to the window resize event. If the event is fired, this function
         *  updates the original $stickyElement data and updates the $stickyElementClone's
         *  left position.
         *
         *  @param {jQuery dom object} $stickyElement - the sticky element
         */

        $window.on('resize', function() {
                
            $stickyElements.each(function(index) {

                var $stickyElement      = $(this);
                var $stickyElementClone = $('#stickyClone-' + index);
                
                // if the sticky element passed validation (=> validInput),
                // do the re-positioning

                if (validInput($stickyElement)) {
                    updateStickyElementProps($stickyElement);
                    $stickyElementClone.css('left', Math.floor($stickyElement.offset().left));
                }

            });

        });

    }

    function stickObserver($stickyElements) {

        /**
         *  Listens to the window scroll event. If the event is fired, this function
         *  observes all sticky elements and manipulates their position. If a sticky element
         *  is inside it's "sticky boundaries", it is "set to stick", otherwise it gets "unstuck".
         *
         *  @param {jQuery dom object} $stickyElements      - the sticky element(s)
         *  @param {jQuery dom object} $stickyElementCloned - the cloned sticky element(s)
         */

        $window.on('scroll', function() {

            // store the scroll position

            var scrollTop = $window.scrollTop();

            // observe all sticky elements

            $stickyElements.each(function(index) {

                var $stickyElement             = $(this);
                var $stickyElementClone        = $('#stickyClone-' + index);
                var props                      = $stickyElement.data().props;
                var stickyElementInitialTopPos = props.initialTopPos;
                var stickStart                 = props.stickStart;
                var stickStop                  = props.stickStop;
                var topOffset                  = props.topOffset;
                var cssPositionValue;
                var cssTopValue;
            
                // proceed if the sticky element passed validation

                if (props.passedValidation) {

                    // re-position on scroll

                    if (scrollTop < stickStart) {
                    
                        // outside top boundary

                        cssPositionValue = 'absolute';
                        cssTopValue      = stickyElementInitialTopPos;

                    } else if (scrollTop > stickStop) {

                        // outside bottom boundary

                        cssPositionValue = 'absolute';
                        cssTopValue      = stickStop + topOffset;

                    } else {
                    
                        // inside boundaries

                        cssPositionValue = 'fixed';
                        cssTopValue      = 0 + topOffset;

                    }

                    // set the css

                    $stickyElementClone.css({
                        'position' : cssPositionValue,
                        'top'      : cssTopValue
                    });

                }

            });

        });

    }

    // public functions
    // ================

    return {
        init: initialize
    };

})();