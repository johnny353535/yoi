/** lazyload.js */

YOI.module.Lazyload = (function() {

    // private vars
    // ============
    
    // private functions
    // =================
    
    function initialize($lazyload, options) {
    
        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $lazyload
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {string} image     - url to image
         *  @option {string} small     - url to image @ breakpoint "small"
         *  @option {string} medium    - url to image @ breakpoint "medium"
         *  @option {string} large     - url to image @ breakpoint "large"
         *  @option {string} xlarge    - url to image @ breakpoint "xlarge"
         *  @option {string} width     - optional image width
         *  @option {string} height    - optional image height
         *  @option {string} alt       - optional image alt
         *  @option {string} title     - optional image title
         *  @option {string} longdesc  - optional image longdesc
         *  @option {string} modifiers - optional css modifier classnames
         */
         
        var $lazyload = YOI.createCollection('lazyload', $lazyload, options);
        
        if ($lazyload) $lazyload.each(function() {
            
            var $thisLazyload = $(this);
            var options       = $thisLazyload.data().options;
            var defaultImage  = options.image !== undefined ? options.image : false;
            var width         = options.width !== undefined ? options.width : false;
            var height        = options.height !== undefined ? options.height : false;
            var alt           = options.alt !== undefined ? options.alt : false;
            var title         = options.title !== undefined ? options.title : false;
            var longdesc      = options.longdesc !== undefined ? options.longdesc : false;
            var modifiers     = options.modifiers !== undefined ? options.modifiers : false;
            
            // cancel if no image url was found
            
            if (!defaultImage) return false;
            
            // pick the image url
            
            var imageUrl;
            
            var currentBreakpoint = YOI.currentBreakpoint();
            var breakPointSmall   = YOI.stringContains(currentBreakpoint, 'small');
            var breakPointMedium  = YOI.stringContains(currentBreakpoint, 'medium');
            var breakPointLarge   = YOI.stringContains(currentBreakpoint, 'large');
            var breakPointXlarge  = YOI.stringContains(currentBreakpoint, 'xlarge');
            
            if (breakPointSmall) imageUrl        = options.small;
            if (breakPointMedium) imageUrl       = options.medium;
            if (breakPointLarge) imageUrl        = options.large;
            if (breakPointXlarge) imageUrl       = options.xlarge;
            if (imageUrl === undefined) imageUrl = defaultImage;
            
            // make a new image
            
            var newImage = $('<img src="' + imageUrl + '"></img>');
            
            if (width) newImage.attr('width', width);
            if (height) newImage.attr('height', height);
            if (alt) newImage.attr('alt', alt);
            if (title) newImage.attr('title', title);
            if (longdesc) newImage.attr('longdesc', longdesc);
            if (modifiers) newImage.addClass(modifiers);
            
            // inject after the noscript element
            
            newImage
                .addClass('fx-fade-in-initial')
                .insertAfter($thisLazyload)
                .promise()
                .then(function() {
                    YOI.module.ScrollAgent.init(newImage);
                });
            
            // when the image is done loading, listen for the yoi-viewport:in event
            // and add the fx css class name
                
            newImage.on('load', function() {
                $(this).one('yoi-viewport:in', function() {
                    $(this).addClass('fx-fade-in');
                });
            });
            
            // to make sure timing always works well, this little hack is necesarry
            // learn more at http://mikefowler.me/2014/04/22/cached-images-load-event/
            
            if (newImage[0].complete) {
                newImage.load();
            }

        });
        
    }
    
    // public functions
    // ================
    
    return {
        init: initialize
    }

})();
