var Sticky = (function() {

    // private vars
    // ============
    
    var $body   = $('body');
    var $window = $(window);
    
    // private functions
    // =================
    
    function initializeSticky($stickyElement) {
        
        /**
         *  Initialize all *[data-sticky] found in the document (= function call without parameters)
         *  or target one or more specific *[data-sticky] (= function call with $stickyElement).
         *  $stickyElement must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $stickyElement - the sticky element
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div data-sticky="start:20;stop:200;">
         *
         *  Available options:
         *
         *  @option {number}               start     - The distance between the sticky element top position and the
         *                                             viewport top border at the moment the element sticks.
         *                                             The default value is 0.
         *
         *  @option {number}               stop      - The distance between the sticky element initial top position
         *                                             and the sticky element final top position at the moment it
         *                                             stops sticking. The default value is the body height, which results
         *                                             in sticking as long as the page can be scrolled.
         *
         *  @option {string, CSS selector} reference - If the value is the keyword/string "parent", the sticky
         *                                             element's fist parent element is referenced to control the
         *                                             sticky element.
         *                                             If the value is a jQuery-compatible CSS selector, the script
         *                                             selects the first matching element on the page and references
         *                                             it's height to define a stop position for the sticky element.
         *                                             The sticky element "sticks" as long as it's bottom aligns with
         *                                             the reference element's bottom.
         */
        
        if (!($stickyElement instanceof jQuery)) {
            $stickyElement = $('[data-sticky]');
        }
        
        $stickyElement.each(function() {
            
            var $thisStickyElement      = $(this);
            var $thisStickyElementClone = $thisStickyElement.clone();
            
            // update the stick element's data
            
            updateStickyElementData($thisStickyElement);
            
            // cancel if option values are invalid
            
            if (validInput($thisStickyElement) === false) return false;
            
            // do the necessary dom manipulation
            
            manipulateDom($thisStickyElement, $thisStickyElementClone);

            // run position & stick observers
            
            positionObserver($thisStickyElement, $thisStickyElementClone);
            stickObserver($thisStickyElement, $thisStickyElementClone);
        
        });
    
    }
    
    function manipulateDom($stickyElement, $stickyElementClone) {
        
        /**
         *  Perform all necessary dom manipulations. Takes a clone of the original
         *  sticky element, injects it as a direct child of the body and sets it to
         *  absolute positioning. While being "sticky", the clone is set to fixed positioning.
         *  The original element is kept as an empty element with it's initial width
         *  and height. The visibility is set to "hidden" in order to preserve the page layout.
         *
         *  @param {jQuery dom object} $stickyElement       - the sticky element
         *  @param {jQuery dom object} $stickyElementCloned - the cloned sticky element
         */
        
        // prepare and append the cloned element
        
        $stickyElementClone.css({
            'position' : 'absolute',
            'width'    : $stickyElement.outerWidth(),
            'height'   : $stickyElement.outerHeight(),
            'top'      : $stickyElement.offset().top,
            'left'     : $stickyElement.offset().left
        });
        
        $body.append($stickyElementClone);
        
        // prepare and empty the original element
        
        $stickyElement.css({
            'width'      : $stickyElement.outerWidth(),
            'height'     : $stickyElement.outerHeight(),
            'visibility' : 'hidden'
        });
        
        $stickyElement.empty();
        
    }
    
    function updateStickyElementData($stickyElement) {
        
        /**
         *  Reads options from the custom data-option interface and calculates other
         *  important data, like initial position, dimensions, etc. Adds all data to the
         *  $stickyElement so that it is available for other functions.
         *
         *  @param {jQuery dom object} $stickyElement - the sticky element
         */

        var options                       = Helper.toObject($stickyElement.data('sticky'));
        var $referenceElement             = options.reference === 'parent' ? $stickyElement.parent() : $(options.reference).first();
        var $scroller                     = options.scroller !== undefined ? $(options.scroller).first() : false;
        var stickyElementheight           = $stickyElement.height();
        var stickyElementInitialTopPos    = $stickyElement.offset().top;
        var stickyElementInitialBottomPos = stickyElementInitialTopPos + stickyElementheight;
        var topOffset                     = options.start !== undefined ? parseInt(options.start) : 0;
        var topDistance                   = options.stop !== undefined ? parseInt(options.stop) : 0;
        var stickStart                    = options.start !== undefined ? stickyElementInitialTopPos - topOffset : stickyElementInitialTopPos;
        var stickStop                     = options.stop !== undefined ? stickyElementInitialTopPos + topDistance - topOffset : $body.height();

        // the reference element is found in the dom
        
        if ($referenceElement.length) {
            stickStart = $referenceElement.offset().top - topOffset;
            stickStop  = stickStart + $referenceElement.height() - stickyElementheight - topDistance + parseInt($referenceElement.css('borderTopWidth')) + parseInt($referenceElement.css('borderBottomWidth'));
        }
        
        // the reference element is the parent dom object of the sticky element,
        // in this case, add the parent object's padding to the calculation
        
        if ($referenceElement.length && options.reference === 'parent') {
            stickStart = stickStart + parseInt($referenceElement.css('paddingTop'));
            stickStop  = stickStop - parseInt($referenceElement.css('paddingBottom')) + topDistance;
        }

        // write data

        $stickyElement.data({
            'referenceElement' : $referenceElement,
            'scroller'         : $scroller,
            'height'           : stickyElementheight,
            'initialTopPos'    : stickyElementInitialTopPos,
            'initialBottomPos' : stickyElementInitialBottomPos,
            'topOffset'        : topOffset,
            'topDistance'      : topDistance,
            'stickStart'       : stickStart,
            'stickStop'        : stickStop
        });

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

        var stickStart = $stickyElement.data().stickStart;
        var stickStop  = $stickyElement.data().stickStop;

        if (stickStop < 1 || stickStart > stickStop || stickStart > $stickyElement.offset().top) {
            return false;
        } else {
            return true;
        }

    }
    
    function positionObserver($stickyElement, $stickyElementClone) {
        
        /**
         *  Listens to the window resize event. If the event is fired, this function
         *  updates the original $stickyElement data and updates the $stickyElementClone's
         *  left position.
         *
         *  @param {jQuery dom object} $stickyElement       - the sticky element
         *  @param {jQuery dom object} $stickyElementCloned - the cloned sticky element
         */
        
        $window.on('resize', function() {
            
            updateStickyElementData($stickyElement);
            $stickyElementClone.css('left', $stickyElement.offset().left);
            
        });
        
    }
    
    function stickObserver($stickyElement, $stickyElementClone) {
        
        /**
         *  Listens to the window scroll event. If the event is fired, this function
         *  observes all sticky elements and manipulates their position. If a sticky element
         *  is inside it's "sticky boundaries", it is "set to stick", otherwise it gets "unstuck".
         *
         *  @param {jQuery dom object} $stickyElement       - the sticky element
         *  @param {jQuery dom object} $stickyElementCloned - the cloned sticky element
         */
        
        // references, for better readability only
        
        var stickyElementheight           = $stickyElement.data().height;
        var stickyElementInitialTopPos    = $stickyElement.data().initialTopPos;
        var stickyElementInitialBottomPos = $stickyElement.data().initialBottomPos;
        var stickStart                    = $stickyElement.data().stickStart;
        var stickStop                     = $stickyElement.data().stickStop;
        var topOffset                     = $stickyElement.data().topOffset;
        var topDistance                   = $stickyElement.data().topDistance;
        var $referenceElement             = $stickyElement.data().referenceElement;
        
        // observe and re-position on scroll
        
        $window.on('scroll', function() {
            
            var scrollTop = $window.scrollTop();
            var cssPositionValue;
            var cssTopValue;
            
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
            
        });
        
    }
    
    // initialize
    // ==========
    
    initializeSticky();
    
    // public functions
    // ================
    
    return {
        init: initializeSticky
    }

})();