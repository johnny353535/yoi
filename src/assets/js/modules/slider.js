/** slider.js */

var Slider = (function() {

    // private vars
    // ============

    var slideAutoplayIntervals = {};
    var btnLabelNext = Helper.locale === 'de' ? 'weiter' : 'next';
    var btnLabelPrev = Helper.locale === 'de' ? 'zurück' : 'previous';

    var slideControls = {

        // .pageBtns

        'pageBtns': $('\
            <div class="pageBtns">\
                <button class="pageBtns__btnPrev">\
                    <span class="hidden">' + btnLabelPrev + '</span>\
                </button>\
                <span class="pageBtns__indicator">\
                    <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">1</span>\
                </span>\
                <button class="pageBtns__btnNext">\
                    <span class="hidden">' + btnLabelNext + '</span>\
                </button>\
            </div>\
        '),

        // .flipBtns

        'flipBtns': $('\
            <div class="flipBtns">\
                <a class="flipBtns__btnPrev">\
                    <span class="hidden">' + btnLabelPrev + '</span>\
                </a>\
                <a class="flipBtns__btnNext">\
                    <span class="hidden">' + btnLabelNext + '</span>\
                </a>\
            </div>\
        '),

        'flipBtns--inset': $('\
            <div class="flipBtns flipBtns--inset">\
                <a class="flipBtns__btnPrev">\
                    <span class="hidden">' + btnLabelPrev + '</span>\
                </a>\
                <a class="flipBtns__btnNext">\
                    <span class="hidden">' + btnLabelNext + '</span>\
                </a>\
            </div>\
        '),

        // .pageDots

        'pageDots': $('\
            <div class="pageDots">\
                <a class="pageDots__btnPrev">\
                    <span class="hidden">' + btnLabelPrev + '</span>\
                </a>\
                <a class="pageDots__btnNext">\
                    <span class="hidden">' + btnLabelNext + '</span>\
                </a>\
            </div>\
        '),

        'pageDots--dark': $('\
            <div class="pageDots pageDots--dark">\
                <a class="pageDots__btnPrev">\
                    <span class="hidden">' + btnLabelPrev + '</span>\
                </a>\
                <a class="pageDots__btnNext">\
                    <span class="hidden">' + btnLabelNext + '</span>\
                </a>\
            </div>\
        '),

        'pageDots--subtle': $('\
            <div class="pageDots pageDots--subtle">\
                <a class="pageDots__btnPrev">\
                    <span class="hidden">' + btnLabelPrev + '</span>\
                </a>\
                <a class="pageDots__btnNext">\
                    <span class="hidden">' + btnLabelNext + '</span>\
                </a>\
            </div>\
        ')

    };

    // private functions
    // =================

    function initializeSliders() {

        /**
         *  Initialize the sliders.
         */

        $('[data-slider]').each(function(sliderId) {

            // references to dom elements

            var $thisSlider        = $(this);
            var	$thisSlides        = $thisSlider.find('.slider__slide');
            var $thisSlidesWrapper = $thisSlider.find('.slider__slides');

            // attach data to slider instance

            $thisSlider.data().slideIndex  = 0;
            $thisSlider.data().totalSlides = $thisSlides.length;

            // slider instance variables

            var slideIndex  = $thisSlider.data().slideIndex;
            var totalSlides = $thisSlider.data().totalSlides;

            // slider instance options

            var options = Helper.toObject($thisSlider.data('slider'));

            /**
             *  Available options:
             *
             *  @param {number}  autoplay   - interval in miliseconds to change the slides automatically
             *  @param {bool}    clickable  - click on a slide to switch to the next side
             *  @param {string}  controls   - keyword for the controls to add ["pageBtns" || "pageFlip" || "pageFlip--inset" || "pageDots" || "pageDots--dark" || "pageDots--subtle"]
             *  @param {bool}    swipeable  - change the slide on swipe left/right
             *  @param {string}  transition - keyword for slide transition ["animate" || "fade"]
             */

            // prepare slides and adjust container to fixed height for animations

            if (options.transition !== undefined) {

                $(window).on('load', function(){
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

                $thisSlider.find('[class*="btnNext"]').on('click', function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderId);
                    showSlide($thisSlider, 'next');
                });

                $thisSlider.find('[class*="btnPrev"]').on('click', function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderId);
                    showSlide($thisSlider, 'prev');
                });

                // display total slides (.pageBtns)

                $thisSlider.find('.pageBtns__totalPages').text(totalSlides);

                // insert page dots (.pageDots)

                if (options.control.indexOf('pageDots') !== -1) {

                    // add pagination

                    for (var i = 0; i < totalSlides; i++) {
                        $('<a class="pageDots__dot"><span class="hidden">' + (i + 1) + '</span></a>').insertBefore($(this).find('.pageDots__btnNext'));
                    }

                    // set up pagination

                    paginationLinks = $(this).find('.pageDots a:not([class*="btn"])');
                    paginationLinks.first().addClass('pageDots--active');

                    paginationLinks.on('click', function(e) {

                        e.preventDefault();
                        stopAutoplay(sliderId);

                        if ($(this).parent().find('.pageDots__btnPrev').length) {
                            var linkIndex = $(this).index() -1;
                        } else {
                            var linkIndex = $(this).index();
                        }

                        showSlide($thisSlider, linkIndex);

                    });

                }

            }

            // attach events if "clickable"

            if (options.clickable) {

                $thisSlides.not('a').on('tap', function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderId);
                    showSlide($thisSlider, 'next');
                });

            }

            // attach events if "swipeable"

            if (options.swipeable) {

                $(this).on('swipeleft', function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderId);
                    showSlide($thisSlider, 'next');
                });

                $(this).on('swiperight',function(e) {
                    e.preventDefault();
                    stopAutoplay(sliderId);
                    showSlide($thisSlider, 'prev');
                });

            }

            // enable auto play

            if (options.autoplay !== undefined) {
                slideAutoplayIntervals[sliderId] = window.setInterval(function(){
                    showSlide($thisSlider)
                }, options.autoplay);
            }

        });

    }

    function showSlide($thisSlider, target) {

        /**
         *  Show a slide.
         *
         *  @param {jQuery dom object} $thisSlider - the slider
         *  @param {string || integer} target      - a key for the target: "next" || "prev" || any slide number
         */

        var	$thisSlides        = $thisSlider.find('.slider__slide');
        var $thisSlidesWrapper = $thisSlider.find('.slider__slides');

        var totalSlides        = $thisSlider.data().totalSlides;
        var slideIndex         = $thisSlider.data().slideIndex;
        var options            = Helper.toObject($thisSlider.data('slider'));
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

        $thisSlider.data().slideIndex = slideIndex;

    }

    function applyTransition($thisSlider, nextSlideIndex, direction) {

        /**
         *  Transition between two slides.
         *
         *  @param {jQuery dom object} $thisSlider    - the slider
         *  @param {number}            nextSlideIndex - the next slide index number
         *  @param {string}            direction      - key for the direction, "<" || ">"
         */

        var	$thisSlides       = $thisSlider.find('.slider__slide');

        var options           = Helper.toObject($thisSlider.data('slider'));
        var currentSlideIndex = $thisSlider.data().slideIndex;
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
                .fadeOut(100, function(){
                    $thisSlides.eq(nextSlideIndex).fadeIn(300);
                });

        }

    }

    function stopAutoplay(sliderId) {

        /**
         *  Stop the auto play.
         *
         *  @param {string} sliderId - the slider css id (e.g. "#mySlider")
         */

        window.clearInterval(slideAutoplayIntervals[sliderId]);
    }

    function updatePagination($thisSlider, thisSlideIndex) {

        /**
         *  Update the pagination.
         *
         *  @param {jQuery dom object} $thisSlider    - the slider
         *  @param {number}            thisSlideIndex - the slide index number
         */

        // update page dots (.pageDots)

        paginationLinks = $thisSlider.find('.pageDots a:not([class*="btn"])');
        paginationLinks.removeClass('pageDots--active')
        paginationLinks.eq(thisSlideIndex).addClass('pageDots--active');

        // update page buttons (.pageBtns)

        $thisSlider.find('.pageBtns__currentPage').text(thisSlideIndex + 1);

    }

    function adjustHeight($thisSlider) {

        /**
         *  Adjust the height of a slider to match the height of the tallest slide.
         *
         *  @param {jQuery dom object} $thisSlider - the slider
         */

        var	$thisSlides        = $thisSlider.find('.slider__slide');
        var $thisSlidesWrapper = $thisSlider.find('.slider__slides');
        var slideHeight        = 0;

        for (var i = 0; i < $thisSlides.length; i++) {
            var thisSlideHeight = $thisSlides.eq(i).outerHeight();
            slideHeight = thisSlideHeight > slideHeight ? thisSlideHeight : slideHeight;
            $thisSlidesWrapper.css({ 'height': slideHeight });
        };

        $thisSlidesWrapper.css({ 'height': slideHeight });

    }

    // initialize
    // ==========

    initializeSliders();

    // public functions
    // ================

    return {
        init : initializeSliders,
        show : showSlide
    };

})();
