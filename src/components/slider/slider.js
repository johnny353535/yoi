/** slider.js */

YOI.component.Slider = (function() {

    // private vars
    // ============

    var $document           = $(document);
    var $window             = $(window);
    var keyboardEventsAdded = false;

    // localization

    var language = YOI.locale();

    var localization = {
        'en' : {
            'buttonLabelNext' : 'next',
            'buttonLabelPrev' : 'previous'
        },
        'de' : {
            'buttonLabelNext' : 'weiter',
            'buttonLabelPrev' : 'zurück'
        }
    };

    // templates

    var slideControls = {

        // .pageButtons

        'pageButtons--tl': $('\
            <div class="pageButtons pageButtons--tl">\
                <button class="pageButtons__buttonPrev">\
                    <span class="hidden">' + localization[language]['buttonLabelPrev'] + '</span>\
                </button>\
                <span class="pageButtons__indicator">\
                    <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">1</span>\
                </span>\
                <button class="pageButtons__buttonNext">\
                    <span class="hidden">' + localization[language]['buttonLabelNext'] + '</span>\
                </button>\
            </div>\
        '),

        'pageButtons--tr': $('\
            <div class="pageButtons pageButtons--tr">\
                <button class="pageButtons__buttonPrev">\
                    <span class="hidden">' + localization[language]['buttonLabelPrev'] + '</span>\
                </button>\
                <span class="pageButtons__indicator">\
                    <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">1</span>\
                </span>\
                <button class="pageButtons__buttonNext">\
                    <span class="hidden">' + localization[language]['buttonLabelNext'] + '</span>\
                </button>\
            </div>\
        '),

        'pageButtons--br': $('\
            <div class="pageButtons pageButtons--br">\
                <button class="pageButtons__buttonPrev">\
                    <span class="hidden">' + localization[language]['buttonLabelPrev'] + '</span>\
                </button>\
                <span class="pageButtons__indicator">\
                    <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">1</span>\
                </span>\
                <button class="pageButtons__buttonNext">\
                    <span class="hidden">' + localization[language]['buttonLabelNext'] + '</span>\
                </button>\
            </div>\
        '),

        'pageButtons--bl': $('\
            <div class="pageButtons pageButtons--bl">\
                <button class="pageButtons__buttonPrev">\
                    <span class="hidden">' + localization[language]['buttonLabelPrev'] + '</span>\
                </button>\
                <span class="pageButtons__indicator">\
                    <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">1</span>\
                </span>\
                <button class="pageButtons__buttonNext">\
                    <span class="hidden">' + localization[language]['buttonLabelNext'] + '</span>\
                </button>\
            </div>\
        '),

        // .flipButtons

        'flipButtons': $('\
            <div class="flipButtons">\
                <a class="flipButtons__buttonPrev">\
                    <span class="hidden">' + localization[language]['buttonLabelPrev'] + '</span>\
                </a>\
                <a class="flipButtons__buttonNext">\
                    <span class="hidden">' + localization[language]['buttonLabelNext'] + '</span>\
                </a>\
            </div>\
        '),

        'flipButtons--inset': $('\
            <div class="flipButtons flipButtons--inset">\
                <a class="flipButtons__buttonPrev">\
                    <span class="hidden">' + localization[language]['buttonLabelPrev'] + '</span>\
                </a>\
                <a class="flipButtons__buttonNext">\
                    <span class="hidden">' + localization[language]['buttonLabelNext'] + '</span>\
                </a>\
            </div>\
        '),

        // .pageDots

        'pageDots': $('\
            <div class="pageDots">\
                <a class="pageDots__buttonPrev">\
                    <span class="hidden">' + localization[language]['buttonLabelPrev'] + '</span>\
                </a>\
                <a class="pageDots__buttonNext">\
                    <span class="hidden">' + localization[language]['buttonLabelNext'] + '</span>\
                </a>\
            </div>\
        '),

        'pageDots--dark': $('\
            <div class="pageDots pageDots--dark">\
                <a class="pageDots__buttonPrev">\
                    <span class="hidden">' + localization[language]['buttonLabelPrev'] + '</span>\
                </a>\
                <a class="pageDots__buttonNext">\
                    <span class="hidden">' + localization[language]['buttonLabelNext'] + '</span>\
                </a>\
            </div>\
        '),

        'pageDots--subtle': $('\
            <div class="pageDots pageDots--subtle">\
                <a class="pageDots__buttonPrev">\
                    <span class="hidden">' + localization[language]['buttonLabelPrev'] + '</span>\
                </a>\
                <a class="pageDots__buttonNext">\
                    <span class="hidden">' + localization[language]['buttonLabelNext'] + '</span>\
                </a>\
            </div>\
        ')

    };

    // private functions
    // =================

    function initialize($slider, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery element} $slider
         *  @param {object}         options
         *
         *  Available options:
         *
         *  @option {number} autoplay   - interval in miliseconds to change the slides automatically
         *  @option {bool}   clickable  - click on a slide to switch to the next side
         *  @option {string} controls   - keyword for the controls to add ["pageButtons--tl" || "pageButtons--tr" || "pageButtons--br" || "pageButtons--bl" || "pageFlip" || "pageFlip--inset" || "pageDots" || "pageDots--dark" || "pageDots--subtle"]
         *  @option {bool}   swipeable  - change the slide on swipe left/right
         *  @option {string} transition - keyword for slide transition ["animate" || "fade"]
         */

        var $slider = YOI.createCollection('slider', $slider, options);

        if ($slider) $slider.each(function(sliderIndex) {

            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // @param {number} sliderIndex
            //
            // sliderIndex is provided by jQuery's each() function. this script
            // uses it to reference the slider instances. (http://api.jquery.com/each/)

            var $thisSlider = $(this);
            var $thisSlides = $thisSlider.find('.slider__slide');

            // attach data to slider instance

            $thisSlider.data().props = {
                index       : sliderIndex,
                slideIndex  : 0,
                totalSlides : $thisSlides.length
            };

            // reference slider instance props & options

            var totalSlides = $thisSlider.data().props.totalSlides;
            var options     = $thisSlider.data().options;

            // prepare slides and adjust container to fixed height for animations

            if (options.transition !== undefined) {
                $window.on('load resize', function(){
                    adjustHeight($thisSlider);
                });
            }

            // hide all slides but the first one

            $thisSlides.hide().first().show();

            // attach slide controls

            if (options.control !== undefined) {

                // add slide controls

                var thisControls = $(slideControls[options.control]).clone();
                $thisSlider.append(thisControls);

                // attach events to prev/next buttons

                $thisSlider.find('[class*="buttonNext"]').on('click', function(e) {
                    e.preventDefault();
                    stopAutoplay($thisSlider);
                    showSlide($thisSlider, 'next');
                });

                $thisSlider.find('[class*="buttonPrev"]').on('click', function(e) {
                    e.preventDefault();
                    stopAutoplay($thisSlider);
                    showSlide($thisSlider, 'prev');
                });

                // display total slides (.pageButtons)

                $thisSlider.find('.pageButtons__totalPages').text(totalSlides);

                // insert page dots (.pageDots)

                if (options.control.indexOf('pageDots') !== -1) {

                    // add pagination

                    for (var i = 0; i < totalSlides; i++) {
                        $('<a class="pageDots__dot"><span class="hidden">' + (i + 1) + '</span></a>').insertBefore($(this).find('.pageDots__buttonNext'));
                    }

                    // set up pagination

                    paginationLinks = $thisSlider.find('.pageDots a:not([class*="button"])');
                    paginationLinks.first().addClass('is--active');

                    paginationLinks.on('click', function(e) {

                        e.preventDefault();
                        stopAutoplay($thisSlider);

                        var linkIndex;

                        if ($thisSlider.parent().find('.pageDots__buttonPrev').length) {
                            linkIndex = $thisSlider.index() -1;
                        } else {
                            linkIndex = $thisSlider.index();
                        }

                        showSlide($thisSlider, linkIndex);

                    });

                }

            }

            // attach events if "clickable"

            if (options.clickable) {
                $thisSlides.not('a').on('tap', function(e) {
                    e.preventDefault();
                    stopAutoplay($thisSlider);
                    showSlide($thisSlider, 'next');
                });
            }

            // enable auto play

            if (options.autoplay !== undefined) {
                startAutoplay($thisSlider);
            }

            // set initialized

            YOI.setReady($(this));

        });

        // add keyboard events

        if (!keyboardEventsAdded) addKeyboardEvents();

    }

    function showSlide($thisSlider, target) {

        /**
         *  Show a slide.
         *
         *  @param {jQuery element}    $thisSlider - the slider
         *  @param {string || integer} target      - a key for the target: "next" || "prev" || any slide number
         */

        var $thisSlides        = $thisSlider.find('.slider__slide');
        var props              = $thisSlider.data().props;
        var options            = $thisSlider.data().options;
        var totalSlides        = props.totalSlides;
        var slideIndex         = props.slideIndex;
        var direction          = false;

        if (target === 'next' || target === undefined) {

            // set slideIndex to next slide

            slideIndex = slideIndex !== totalSlides - 1 ? slideIndex + 1 : 0;
            direction = '>';

        } else if (target === 'prev') {

            // set slideIndex to previous slide

            slideIndex = slideIndex === 0 ? totalSlides - 1 : slideIndex - 1;
            direction = '<';

        } else if (typeof target === 'number') {

            // set slideIndex to individual slide

            slideIndex = target;

        }

        // apply transition

        if (options.transition !== undefined) {

            applyTransition($thisSlider, slideIndex, direction);

        } else {

            $thisSlides.hide();
            $thisSlides.eq(slideIndex).show();

        }

        // update pagination links and slide indicator

        updatePagination($thisSlider, slideIndex);

        // update slider data object

        $thisSlider.data().props.slideIndex = slideIndex;

        // trigger custom event

        $thisSlider.trigger('yoi-slider-change');

    }

    function applyTransition($thisSlider, nextSlideIndex, direction) {

        /**
         *  Transition between two slides.
         *
         *  @param {jQuery element} $thisSlider    - the slider
         *  @param {number}         nextSlideIndex - the next slide index number
         *  @param {string}         direction      - key for the direction, "<" || ">"
         */

        var $thisSlides       = $thisSlider.find('.slider__slide');
        var options           = $thisSlider.data().options;
        var currentSlideIndex = $thisSlider.data().props.slideIndex;
        var leftOffset;

        switch (direction) {
        case '<':
            leftOffset = '-100%';
            break;
        case '>':
            leftOffset = '100%';
            break;
        }

        if (options.transition === 'animate') {

            // ... with animation

            if (!$thisSlides.is(':animated')) {

                // animate current slide

                $thisSlides
                    .eq(currentSlideIndex)
                    .css({
                        'z-index': '10'
                    })
                    .stop()
                    .animate({
                        'left': leftOffset // animate position
                    }, 300, function() {   // reset after animation is done
                        $(this).css({
                            'left': '0',
                            'opacity': 0,
                            'z-index': '1'
                        });
                    });

                // and show next slide

                $thisSlides
                    .eq(nextSlideIndex)
                    .css({
                        'opacity': '1',
                        'z-index': '2'
                    })
                    .show();

            }

        } else if (options.transition === 'fade') {

            // ... with fade effect

            $thisSlides
                .eq(currentSlideIndex)
                .stop()
                .fadeOut(100, function(){
                    $thisSlides.eq(nextSlideIndex).fadeIn(300);
                });

        }

    }

    function startAutoplay($slider) {

        /**
         *  Start auto play.
         *
         *  @param {jQuery element} $slider
         */

        var options      = $slider.data().options;
        var sliderIndex  = $slider.data().props.index;
        var intervalName = 'slideAutoplay-' + sliderIndex;

        YOI.setInterval(intervalName, options.autoplay, function() {
            showSlide($slider);
        });

        // trigger custom event

        $slider.trigger('yoi-slider-autoplaystart');

    }

    function stopAutoplay($slider) {

        /**
         *  Stop auto play.
         *
         *  @param {jQuery element} $slider
         */

        var sliderIndex  = $slider.data().props.index;
        var intervalName = 'slideAutoplay-' + sliderIndex;

        YOI.clearInterval(intervalName);

        // trigger custom event

        $slider.trigger('yoi-slider-autoplaystop');

    }

    function updatePagination($thisSlider, thisSlideIndex) {

        /**
         *  Update the pagination.
         *
         *  @param {jQuery element} $thisSlider    - the slider
         *  @param {number}         thisSlideIndex - the slide index number
         */

        // update page dots (.pageDots)

        paginationLinks = $thisSlider.find('.pageDots a:not([class*="button"])');
        paginationLinks.removeClass('is--active');
        paginationLinks.eq(thisSlideIndex).addClass('is--active');

        // update page buttons (.pageButtons)

        $thisSlider.find('.pageButtons__currentPage').text(thisSlideIndex + 1);

    }

    function adjustHeight($thisSlider) {

        /**
         *  Adjust the height of a slider to match the height of the tallest slide.
         *
         *  @param {jQuery element} $thisSlider - the slider
         */

        var $thisSlides        = $thisSlider.find('.slider__slide');
        var $thisSlidesWrapper = $thisSlider.find('.slider__slides');
        var slideHeight        = 0;

        for (var i = 0; i < $thisSlides.length; i++) {
            var thisSlideHeight = $thisSlides.eq(i).outerHeight();
            slideHeight = thisSlideHeight > slideHeight ? thisSlideHeight : slideHeight;
            $thisSlidesWrapper.css({ 'height': slideHeight });
        }

        $thisSlidesWrapper.css({ 'height': slideHeight });

    }

    function addKeyboardEvents() {

        /**
         *  Adds keyboard events.
         */

        if (YOI.foundModule('KeyboardAgent') && !keyboardEventsAdded) {

            // tab key

            YOI.module.KeyboardAgent.addTabFocus($('[yoi-slider]'));

            // left arrow key

            $document.on('yoi-keypressed-arrowleft', function() {

                var $activeElement = $(document.activeElement);

                if ($activeElement.is('[yoi-slider]')) {
                    showSlide($activeElement, 'prev');
                    stopAutoplay($activeElement);
                }

            });

            // right arrow key

            $document.on('yoi-keypressed-arrowright', function() {

                var $activeElement = $(document.activeElement);

                if ($activeElement.is('[yoi-slider]')) {
                    showSlide($activeElement, 'next');
                    stopAutoplay($activeElement);
                }

            });

        }

        // set flag

        keyboardEventsAdded = true;

    }

    // public functions
    // ================

    return {
        init  : initialize,
        show  : showSlide,
        start : startAutoplay,
        stop  : stopAutoplay
    };

})();
