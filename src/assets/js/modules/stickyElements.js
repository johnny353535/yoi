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
         *  @param  {jQuery dom object} $stickyElement - the sticky element
         */
        
        if (!($stickyElement instanceof jQuery)) {
            $stickyElement = $('[data-sticky]');
        }
        
        $stickyElement.each(function() {
            
            var $thisStickyElement      = $(this);
            var $thisStickyElementClone = $thisStickyElement.clone();
            var options                 = Helper.toObject($thisStickyElement.data('sticky'));
            var stickStart              = options.start !== undefined ? parseInt(options.start) : 0;
            var stickStop               = options.stop !== undefined ? parseInt(options.stop) : 0;
            var $referenceElement       = options.reference === 'parent' ? $thisStickyElement.parent() : $(options.reference);
            
            /*
            
            if ($referenceElement.length) {
                stickStart = getElementPosition($referenceElement).top + parseInt($referenceElement.css('paddingTop'));
                stickStop  = stickStart + $referenceElement.height() - (parseInt($referenceElement.css('paddingTop')) + parseInt($referenceElement.css('paddingBottom')));
            }
            
            // abort if values are invalid
            
            if (stickStop < 1 || stickStart > stickStop || stickStart > getElementPosition($thisStickyElement).top) return false;
            
            */
            
            // hide the original element
            
            $thisStickyElement.css('opacity','.2');
            
            // prepare the cloned element
            
            setElementDimensions($thisStickyElementClone, getElementDimensions($thisStickyElement));
            setElementPosition($thisStickyElementClone, getElementPosition($thisStickyElement));
            
            $thisStickyElementClone.css('position','fixed');
            $thisStickyElementClone.appendTo($body);
            
            // create resize & scroll observers
            
            createResizeObserver($thisStickyElement, $thisStickyElementClone);
            createScrollObserver($thisStickyElement, $thisStickyElementClone);
        
        });
    
    }
    
    function updateStickyElementData($stickyElement) {

        var options                       = Helper.toObject($stickyElement.data('sticky'));
        var $referenceElement             = options.reference === 'parent' ? $stickyElement.parent() : $(options.reference);
        var stickyElementheight           = $stickyElement.height();
        var stickyElementInitialTopPos    = getElementPosition($stickyElement).top;
        var stickyElementInitialBottomPos = stickyElementInitialTopPos + stickyElementheight;
        var topOffset                     = options.start !== undefined ? parseInt(options.start) : 0;
        var bottomOffset                  = options.stop  !== undefined ? parseInt(options.stop) : 0;

        // the reference element is found in the dom
        
        if ($referenceElement.length) {
            stickStart = getElementPosition($referenceElement).top - topOffset;
            stickStop  = stickStart + $referenceElement.height() - stickyElementheight - bottomOffset;
        }
        
        // the reference element is the parent dom object of the sticky element,
        // so count in the parent object's padding
        
        if ($referenceElement.length && options.reference === 'parent') {
            stickStart = stickStart + parseInt($referenceElement.css('paddingTop'));
            stickStop  = stickStop - parseInt($referenceElement.css('paddingBottom'));
        }

        // write data

        $stickyElement.data({
            'referenceElement'              : $referenceElement,
            'stickyElementheight'           : stickyElementheight,
            'stickyElementInitialTopPos'    : stickyElementInitialTopPos,
            'stickyElementInitialBottomPos' : stickyElementInitialBottomPos,
            'topOffset'                     : topOffset,
            'bottomOffset'                  : bottomOffset,
            'stickStart'                    : options.start !== undefined ? parseInt(options.start) : 0,
            'stickStop'                     : options.stop !== undefined ? parseInt(options.stop) : 0
        });

    }
    
    function validInput() {
        
    }
    
    function createResizeObserver($thisStickyElement, $thisStickyElementClone) {
        
        $window.on('resize', function() {
            setElementPosition($thisStickyElementClone, getElementPosition($thisStickyElement));
        });
        
    }
    
    function createScrollObserver($thisStickyElement, $thisStickyElementClone) {
        
        /*
            x───────────────────────▶ options.start
            ┌──────────────────┐────▶ stickyElementInitialTopPos
            │                  │
            │  sticky element  │
            │                  │
            └──────────────────┘────▶ stickyElementInitialBottomPos
            x───────────────────────▶ options.stop
        */
        
        var options                       = Helper.toObject($thisStickyElement.data('sticky'));
        var stickyElementheight           = $thisStickyElement.height();
        var stickyElementInitialTopPos    = getElementPosition($thisStickyElement).top;
        var stickyElementInitialBottomPos = stickyElementInitialTopPos + stickyElementheight;
        var stickStart                    = options.start !== undefined ? stickyElementInitialTopPos - parseInt(options.start) : stickyElementInitialTopPos;
        var stickStop                     = options.stop !== undefined ? stickyElementInitialTopPos + parseInt(options.stop) - parseInt(options.start) : stickyElementInitialBottomPos;
        var topOffset                     = options.start !== undefined ? parseInt(options.start) : 0;
        var bottomOffset                  = options.stop  !== undefined ? parseInt(options.stop) : 0;
        var $referenceElement             = options.reference === 'parent' ? $thisStickyElement.parent() : $(options.reference);
        
        // the reference element is any dom object
        
        if ($referenceElement.length) {
            stickStart = getElementPosition($referenceElement).top - topOffset;
            stickStop  = stickStart + $referenceElement.height() - stickyElementheight - bottomOffset;
        }
        
        // the reference element is the parent dom object,
        // so count in the parent element's padding
        
        if ($referenceElement.length && options.reference === 'parent') {
            stickStart = stickStart + parseInt($referenceElement.css('paddingTop'));
            stickStop  = stickStop - parseInt($referenceElement.css('paddingBottom'));
        }
        
        // observe and re-position position on scroll
        
        $window.on('scroll', function() {
            
            var scrollTop = $(window).scrollTop();
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
            
            $thisStickyElementClone.css({
                'position' : cssPositionValue,
                'top'      : cssTopValue
            });
            
        });

    }
    
    function getElementDimensions($element) {
        
        var thisDimensions = {};
        
        thisDimensions.width  = $element.outerWidth();
        thisDimensions.height = $element.outerHeight();
        
        return thisDimensions;
        
    }
    
    function setElementDimensions($element, dimensions) {
        
        $element.css({
            'width'  : dimensions.width,
            'height' : dimensions.height
        });
        
    }
    
    function getElementPosition($element) {
        
        var thisPosition = {};
        
        thisPosition.top  = $element.offset().top;
        thisPosition.left = $element.offset().left;
        
        return thisPosition;
        
    }
    
    function setElementPosition($element, position) {
        
        $element.css({
            'top'  : position.top,
            'left' : position.left
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

/*
    todo:
    
    - do not create a sticky element copy but move the original element in dom
    x change stop from absolute value to a value relative to the original start position
    x move getElementPosition() & setElementPosition to Helper
    x move getElementDimensions() & setElementDimensions to Helper
    - rename Helper prefix to YOI
*/