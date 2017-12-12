/** lazyload.js */

YOI.behaviour.Lazyload = (function() {

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
         *  @option {string} src        - url to image
         *  @option {string} srcSmall   - url to image @ breakpoint "small"
         *  @option {string} srcMedium  - url to image @ breakpoint "medium"
         *  @option {string} srcLarge   - url to image @ breakpoint "large"
         *  @option {string} srcXlarge  - url to image @ breakpoint "xlarge"
         *  @option {string} width      - optional image width
         *  @option {string} height     - optional image height
         *  @option {string} alt        - optional image alt
         *  @option {string} title      - optional image title
         *  @option {string} longdesc   - optional image longdesc
         *  @option {string} cssClasses - optional css class names
         */
         
        var $lazyload = YOI.createCollection('lazyload', $lazyload, options);
        
        if ($lazyload) $lazyload.each(function() {
            
            // cancel if already initialized

            if ($(this).data().props.isLazyloading) return false;

            // proceed
            
            makeLazyload($(this));
            
            // set initialized
                
            $(this).data().props.isLazyloading = true;

        });
        
    }
    
    function makeLazyload($noscriptElement) {
        
        /**
         *  Prepares and injects lazy-loading images.
         *
         *  @param {jQuery dom object} $noscriptElement
         */
        
        var $placeHolder  = $('<img class="lazyLoadPlaceHolder" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />');
        var options       = $noscriptElement.data().options;
        var defaultImage  = options.src || extractImgSrcFromString($noscriptElement.html()) || false;
        var width         = options.width || false;
        var height        = options.height || false;
        var alt           = options.alt || false;
        var title         = options.title || false;
        var longdesc      = options.longdesc || false;
        var cssClasses    = options.cssClasses || false;

        // cancel if
        // - no image url was found
        // - the module ScrollAgent was not found

        if (!defaultImage || !YOI.foundModule('ScrollAgent')) {
            return false;
        }
        
        // insert a placeholder element and
        // initialize the scroll agent
        
        $placeHolder.insertAfter($noscriptElement);
        $placeHolder = $noscriptElement.next('.lazyLoadPlaceHolder');
        YOI.module.ScrollAgent.init($placeHolder);
        
        // prepare the placeholder, set optional width & height,
        // add optional css classes

        if (width)      $placeHolder.attr('width', width);
        if (height)     $placeHolder.attr('height', height);
        if (cssClasses) $placeHolder.addClass(cssClasses);
        
        // placeholder enters viewport:
        
        $placeHolder.one('yoi-viewport-in', function() {
            
            // read the image url
            
            var imageUrl;
            
            var currentBreakPoint = YOI.currentBreakPoint();
            var breakPointSmall   = YOI.stringContains(currentBreakPoint, 'small');
            var breakPointMedium  = YOI.stringContains(currentBreakPoint, 'medium');
            var breakPointLarge   = YOI.stringContains(currentBreakPoint, 'large');
            var breakPointXlarge  = YOI.stringContains(currentBreakPoint, 'xlarge');
            
            if (breakPointSmall)  imageUrl = options.srcSmall;
            if (breakPointMedium) imageUrl = options.srcMedium;
            if (breakPointLarge)  imageUrl = options.srcLarge;
            if (breakPointXlarge) imageUrl = options.srcXlarge;
            
            // set default for image url
            
            imageUrl = imageUrl || defaultImage;
            
            // create a new image
            
            var $newImage = $('<img />');
            
            // add attributes to new image
            
            if (width)      $newImage.attr('width', width);
            if (height)     $newImage.attr('height', height);
            if (alt)        $newImage.attr('alt', alt);
            if (title)      $newImage.attr('title', title);
            if (longdesc)   $newImage.attr('longdesc', longdesc);
            if (cssClasses) $newImage.addClass(cssClasses);
            
            // inject the new image after the noscript element
            
            $newImage
                .on('load', function() { $(this).addClass('fx-fade-in'); })
                .attr('src', imageUrl)
                .addClass('fx-fade-in-initial')
                .insertAfter($noscriptElement);
                
            // to make sure timing always works well, this little hack might be necesarry
            // learn more at http://mikefowler.me/2014/04/22/cached-images-load-event/
            
            if ($newImage[0].complete) {
                $newImage.trigger('load');
            }
            
            // reset the placeholder

            $placeHolder
                .removeClass(cssClasses)
                .css({
                    'width' : 0,
                    'height' : 0,
                    'opacity' : 0
                });

        });
        
    }
    
    function extractImgSrcFromString(input) {
        
        /**
         *  Extracts the path to an image from a src-attribute/value string.
         *
         *  @param  {string} input  - the input string to process
         *  @return {string} output - the src value as string
         */
        
        var output = input.split('src="')[1].split('"')[0];
        
        return output;
        
    }
    
    // public functions
    // ================
    
    return {
        init: initialize
    }

})();
