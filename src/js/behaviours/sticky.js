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
            
            var $thisStickyElement = $(this);
            
            // if the sticky already has position:fixed or
            // any css transformation, cancel ...
            
            if ($thisStickyElement.css('position') === 'fixed' || $stickyElement.css('transform') !== 'none') return;
            
            // ... otherwise proceed and perform the necessary dom manipulation on load,
            // then update the sticky element properties

            $window.on('load', function() {
                manipulateDom($thisStickyElement, index);
                updateStickyElementProps($thisStickyElement);
            });

        });

        // start position & stick observers

        if ($stickyElement) positionObserver($stickyElement);
        if ($stickyElement) stickObserver($stickyElement);

    }

    function manipulateDom($stickyElement, index) {

        /**
         *  Perform all necessary dom manipulations and style changes.
         *
         *  @param {jQuery dom object} $stickyElement - the sticky element
         *  @param {number}            index          - the index of $stickyElement
         */

        var $stickyPlaceholder        = $('<div id="stickyPlaceholder-' + index + '"></div>');
        var $stickyWrapper            = $('<div class="stickyWrapper"></div>');
        var stickyElementCssPos       = $stickyElement.css('position');
        var stickyElementCssLeft      = $stickyElement.css('left');
        var stickyElementCssTop       = $stickyElement.css('top');
        
        // set the $stickyElement and $stickyWrapper styles
        
        if (stickyElementCssPos !== 'static') {
            
            // if the $stickyElement is absolutely or relatively positioned,
            // clear these properties and copy them over to $stickyWrapper
            
            $stickyElement.css({
                'position': 'static'
            });
            
            $stickyWrapper.css({
                'position': stickyElementCssPos,
                'top': stickyElementCssTop,
                'left': stickyElementCssLeft
            });
            
        } else {
            
            // in all other cases, set the wrapper to position:relative
            
            $stickyWrapper.css({
                'position': 'relative'
            });
            
        }

        // set the $stickyPlaceholder styles

        $stickyPlaceholder.css({
            'width'   : $stickyElement.outerWidth(),
            'height'  : $stickyElement.outerHeight(),
            'display' : 'none'
        });
        
        // do the dom manipulation

        $($stickyElement).wrap($stickyWrapper);
        $stickyPlaceholder.insertAfter($stickyElement);

    }

    function updateStickyElementProps($stickyElement) {

        /**
         *  Reads options from the custom data-option interface and calculates other
         *  important data, like initial position, dimensions, etc. Adds all data to the
         *  $stickyElement props object, so that it is available for other functions.
         *
         *  @param {jQuery dom object} $stickyElement - the sticky element
         */
        
        var data                          = $stickyElement.data();
        var options                       = data.options;
        var props                         = data.props;
        var $referenceElement             = options.reference === 'parent' ? $stickyElement.parent().parent() : $(options.reference).first();
        var stickyElementHeight           = $stickyElement.outerHeight();
        var stickyElementWidth            = $stickyElement.outerWidth();
        var stickyElementInitialTopPos    = $stickyElement.offset().top;
        var topOffset                     = options.start !== undefined ? parseInt(options.start) : 0;
        var topDistance                   = options.stop !== undefined ? parseInt(options.stop) : 0;
        var stickStart                    = options.start !== undefined ? stickyElementInitialTopPos - topOffset : stickyElementInitialTopPos;
        var stickStop                     = options.stop !== undefined ? stickyElementInitialTopPos + topDistance - topOffset : $body.height();
        var passedValidation              = validInput($stickyElement);

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
         *  Listens to the window resize event. When the event fires, this function
         *  updates the original $stickyElement property data.
         *
         *  @param {jQuery dom object} $stickyElements - the sticky element(s)
         */

        $window.on('resize', function() {
                
            $stickyElements.each(function(index) {

                var $stickyElement = $(this);
                
                // if the sticky element passed validation (=> validInput),
                // do the re-positioning

                if (validInput($stickyElement)) {
                    updateStickyElementProps($stickyElement);
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
         *  @param {jQuery dom object} $stickyElements - the sticky element(s)
         */

        $window.on('scroll', function() {

            // store the scroll position

            var scrollTop = $window.scrollTop();

            // observe all sticky elements

            $stickyElements.each(function(index) {

                var $stickyElement             = $(this);
                var $stickyPlaceholder         = $('#stickyPlaceholder-' + index);
                var props                      = $stickyElement.data().props;
                var stickyElementInitialTopPos = props.initialTopPos;
                var stickStart                 = props.stickStart;
                var stickStop                  = props.stickStop;
                var topOffset                  = props.topOffset;
                
                var cssPositionValue;
                var cssTopValue;
                var stickyPlaceholderDisplay;
            
                // proceed if the sticky element passed validation

                if (props.passedValidation) {

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

                    $stickyElement.css({
                        'position': cssPositionValue,
                        'top': cssTopValue,
                        'backface-visibility': 'hidden',
                        'z-index': 1001
                    });
                    
                    $stickyPlaceholder.css({
                        'display' : stickyPlaceholderDisplay
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