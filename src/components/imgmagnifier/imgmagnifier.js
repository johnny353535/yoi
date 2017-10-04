/** imgmagnifier.js */

YOI.component.ImgMagnifier = (function(){

    // private vars
    // ============
    
    var $window = $(window);
    var $cursor = $('<div class="imgMagnifier__cursor"></div>');
    var $viewer = $('<div class="imgMagnifier__viewer"></div>');
    var defaultStartViewerDelayTime = 250;

    // private functions

    function initialize($imgMagnifier, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $dock
         *  @param {object}            options
        
         *  Available options:
         *
         *  @option {number} zoomImage - path to the identical yet larger image, if not supplied,
         *                               the script will look for a link / href inside .imgMagnifier
         *  @option {number} delay     - delay after which the magnifyer appears (milliseconds)
         */

        var $imgMagnifier = YOI.createCollection('imgmagnifier', $imgMagnifier, options);

        if ($imgMagnifier) $imgMagnifier.each(function() {
            
            // cancel if already initialized
            
            if (YOI.isReady($(this))) return false;
            
            // proceed

            var $thisImgMagnifier = $(this);
            var $thisCursor       = $cursor.clone().fadeOut(0);
            var $thisViewer       = $viewer.clone().fadeOut(0);

            // append elements

            $thisImgMagnifier.append($thisCursor);
            $thisImgMagnifier.append($thisViewer);

            // To provide a nice noscript-fallback, the preview image
            // is wrapped inside a link to the zoom image. However, if JS
            // is enabled, the link should not open on click.

            $thisImgMagnifier.find('a').on('click', function(e) {
                e.preventDefault();
            });

            $window.on('load', function() {
                
                // attach mouse events

                $thisImgMagnifier
                    .on('mouseenter', function() {
                        startViewer($thisImgMagnifier);
                    })
                    .on('mouseleave', function() {
                        stopViewer($thisImgMagnifier);
                    })
                    .on('mousemove', function(e) {
                        moveMagnifier($thisImgMagnifier, e);
                    });
                    
                // attach resize event
        
                $window.on('resize', function() {
                    YOI.clearDelay('imgMagnifierResetDelay');
                    YOI.setDelay('imgMagnifierResetDelay', 500, function() {
                        reset();
                    });
                });
                    
                // set up viewer and zoom image
                
                setViewer($thisImgMagnifier);
                setZoomImage($thisImgMagnifier);
                
            });
            
            // set initialized
            
            YOI.setReady($(this));

        });

    }

    function reset($imgMagnifier) {

        /**
         *  Reset one or more image magnifiers.
         *
         *  @param {jQuery dom object} $imgMagnifier - the image magnifier(s)
         */

        if (!($imgMagnifier instanceof jQuery)) {
            $imgMagnifier = $('[yoi-imgmagnifier]');
        }

        $imgMagnifier.each(function() {

            var $thisImgMagnifier = $(this);

            $thisImgMagnifier.data().props = {
                'yPos' : $thisImgMagnifier.offset().top,
                'xPos' : $thisImgMagnifier.offset().left
            };

        });

    }
    
    function destroy($imgMagnifier) {

        /**
         *  Remove all injected elements and detach all events.
         *
         *  @param {jQuery dom object} $imgMagnifier - all image magnifiers
         */

        if (!($imgMagnifier instanceof jQuery)) {
            $imgMagnifier = $('.imgMagnifier');
        }

        $imgMagnifier.each(function() {

            var $thisImgMagnifier = $(this);

            $thisImgMagnifier.find('.imgMagnifier__cursor').remove();
            $thisImgMagnifier.find('.imgMagnifier__viewer').remove();
            $thisImgMagnifier.off();
            $thisImgMagnifier.find('*').off();

        });

    }

    function setZoomImage($thisImgMagnifier) {

        /**
         *  Load and inject the zoom image, attach events, store data inside
         *  $thisImgMagnifier data object for further calculations.
         *
         *  @param {jQuery dom object} $thisImgMagnifier - the image magnifier
         */

        var options              = $thisImgMagnifier.data().options;
        var thisZoomImagePath    = options.zoomImage || $thisImgMagnifier.find('a').attr('href');
        var $thisViewer          = $thisImgMagnifier.find('.imgMagnifier__viewer');
        var $thisPreviewImage    = $thisImgMagnifier.find('.imgMagnifier__previewImage');

        // prepare the zoom image, get size before injecting into DOM

        var thisZoomImage       = new Image();
        thisZoomImage.src       = thisZoomImagePath;
        thisZoomImage.className = 'imgMagnifier__zoomImage';
        var $thisZoomImage      = $(thisZoomImage);

        $thisZoomImage
            .on('error', function() {

                // If the image does not exist, destroy
                // the image magnifier.

                destroy($thisImgMagnifier);

            })
            .on('load', function() {

                $thisViewer.append($thisZoomImage);

                $thisImgMagnifier.data().props = {
                    'width'  : $thisImgMagnifier.width(),
                    'height' : $thisImgMagnifier.height(),
                    'yPos'   : $thisImgMagnifier.offset().top,
                    'xPos'   : $thisImgMagnifier.offset().left,
                    'yRatio' : $thisPreviewImage.height() / thisZoomImage.height,
                    'xRatio' : $thisPreviewImage.width() / thisZoomImage.width
                };

                setCursor($thisImgMagnifier);

                // If the zoom image is smaller than the preview image, destroy
                // the image magnifier.

                if ($thisImgMagnifier.data().props.yRatio >= 1 || $thisImgMagnifier.data().props.yRatio >= 1) {
                    destroy($thisImgMagnifier);
                }

            });

    }

    function setCursor($thisImgMagnifier) {

        /**
         *  Set the cursor size according to the zoom factor of .imgMagnifier__zoomImage.
         *  This factor is not fixed but calculated from the size ratio of
         *  .imgMagnifier__previewImage and .imgMagnifier__zoomImage.
         *
         *  @param {jQuery dom object} $thisImgMagnifier - the image magnifier
         */

        var $thisCursor      = $thisImgMagnifier.find('.imgMagnifier__cursor');
        var $thisViewer      = $thisImgMagnifier.find('.imgMagnifier__viewer');
        var thisCursorWith   = $thisImgMagnifier.width() * $thisImgMagnifier.data().props.xRatio;
        var thisCursorHeight = $thisImgMagnifier.height() * $thisImgMagnifier.data().props.yRatio;

        $thisCursor.css({
            width: thisCursorWith,
            height: thisCursorHeight
        });

        $thisCursor.data().props = {
            'width'  : thisCursorWith,
            'height' : thisCursorHeight,
            'yRatio' : $thisViewer.height() / thisCursorHeight,
            'xRatio' : $thisViewer.width() / thisCursorWith
        };

    }

    function setViewer($thisImgMagnifier) {

        /**
         *  Set the viewer size and position. The viewer
         *  always has the same size as the .imgMagnifier itself.
         *
         *  @param {jQuery dom object} $thisImgMagnifier - the image magnifier
         */

        var $thisViewer = $thisImgMagnifier.find('.imgMagnifier__viewer');

        $thisViewer.css({
            width      : $thisImgMagnifier.width(),
            height     : $thisImgMagnifier.height(),
            left       : $thisImgMagnifier.width(),
            marginLeft : 20
        });

    }

    function startViewer($thisImgMagnifier) {

        /**
         *  Show the viewer after a short delay.
         *
         *  @param {jQuery dom object} $thisImgMagnifier - the image magnifier
         */

        var $thisViewer = $thisImgMagnifier.find('.imgMagnifier__viewer');
        var $thisCursor = $thisImgMagnifier.find('.imgMagnifier__cursor');
        var options     = $thisImgMagnifier.data().options;
        var delay       = options.delay || parseInt(options.delay) || defaultStartViewerDelayTime;

        YOI.setDelay('imgMagnifierDelay', delay, function() {
            $thisViewer.fadeIn(250);
            $thisCursor.fadeIn(100);
            $thisViewer.trigger('yoi-imgmagnifier-start');
        });

    }

    function stopViewer($thisImgMagnifier) {

        /**
         *  Hide the viewer.
         *
         *  @param {jQuery dom object} $thisImgMagnifier - the image magnifier
         */

        YOI.clearDelay('imgMagnifierDelay');

        var $thisViewer = $thisImgMagnifier.find('.imgMagnifier__viewer');
        var $thisCursor = $thisImgMagnifier.find('.imgMagnifier__cursor');

        $thisViewer.fadeOut(50);
        $thisCursor.fadeOut(150);
        
        $thisViewer.trigger('yoi-imgmagnifier-stop');
        
    }

    function moveMagnifier($thisImgMagnifier, e) {

        /**
         *  Move the cursor over the preview image and move the
         *  zoom image inside the viewer accordingly.
         *
         *  @param {jQuery dom object} $thisImgMagnifier - the image magnifier
         *  @param {event}             e                 - the trigger event
         */

        var $thisCursor       = $thisImgMagnifier.find('.imgMagnifier__cursor');
        var $thisZoomImage    = $thisImgMagnifier.find('.imgMagnifier__zoomImage');
        var imgMagnifierProps = $thisImgMagnifier.data().props;
        var cursorProps       = $thisCursor.data().props;
        
        // calculate position
        
        var yPos = (e.pageY - imgMagnifierProps.yPos - cursorProps.height / 2);
        var xPos = (e.pageX - imgMagnifierProps.xPos - cursorProps.width / 2);

        // calculate cursor boundaries

        var minY = yPos > 0 ? true : false;
        var maxY = yPos < imgMagnifierProps.height - cursorProps.height ? true : false;
        var minX = xPos > 0 ? true : false;
        var maxX = xPos < imgMagnifierProps.width - cursorProps.width ? true : false;

        // move the cursor

        if (minY && maxY) $thisCursor.css('top', yPos);
        if (minX && maxX) $thisCursor.css('left', xPos);

        // move the zoom image

        if (minY && maxY) $thisZoomImage.css('top', yPos * cursorProps.yRatio * -1);
        if (minX && maxX) $thisZoomImage.css('left', xPos * cursorProps.xRatio * -1);

    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();
