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
            var thisElementDimensions   = getElementDimensions($thisStickyElement);
            var thisElementPosition     = getElementPosition($thisStickyElement);
            var options                 = Helper.toObject($thisStickyElement.data('sticky'));
            
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
    
    function createResizeObserver($thisStickyElement, $thisStickyElementClone) {
        
        $window.on('resize', function() {
            setElementPosition($thisStickyElementClone, getElementPosition($thisStickyElement));
        });
        
    }
    
    function createScrollObserver($thisStickyElement, $thisStickyElementClone) {
        
        var options                = Helper.toObject($thisStickyElement.data('sticky'));
        var bottomLimit            = options.bottom !== undefined ? options.bottom : $thisStickyElement.parent().offset().top + $thisStickyElement.parent().height();
        var topLimit               = options.top !== undefined ? options.top : $thisStickyElement.parent().offset().top;
        var stickyPosY             = bottomLimit - $thisStickyElement.height();
        var stickyElementOffsetTop = $thisStickyElement.offset().top;
        var stickyElementheight    = $thisStickyElement.height();
        
        $window.on('scroll', function() {
            
            var bottomBoundary = $(window).scrollTop() + stickyElementOffsetTop + stickyElementheight;
            
            if (bottomBoundary > bottomLimit) {
                
                // outside boundaries
                
                $thisStickyElementClone.css({
                    'position' : 'absolute',
                    'top'      : stickyPosY
                });
                
            } else {
                
                // inside boundaries
                
                $thisStickyElementClone.css({
                    'position' : 'fixed',
                    'top'      : stickyElementOffsetTop
                });
                
            }
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
