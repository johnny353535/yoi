/** scrollkeys.js */

YOI.component.PageSkim = (function() {

    // private vars
    // ============

    var initialized         = false;
    var keyboardEventsAdded = false;
    var $window             = $(window);
    var $body               = $('body');
    var currentHook         = -1;
    var totalHooks;

    // settings

    var scrollSpeed = 200;
    var offset      = 20;
    var $hooks      = $('h1, h2, h3, h4, h5, h6');

    // localization

    var language = YOI.locale();

    var localization = {
        'en' : {
            'prev' : 'jump to previous mark',
            'next' : 'jump to next mark'
        },
        'de' : {
            'prev' : 'zur letzten Sprungmarke',
            'next' : 'zum nächsten Sprungmarke'
        }
    };

    // buttons

    var $pageSkim = $('\
        <div id="pageSkim" class="pageSkim">\
            <a class="pageSkim__btnPrev">\
                <span class="hidden">' + localization[language].prev + '</span>\
            </a>\
            <a class="pageSkim__btnNext">\
                <span class="hidden">' + localization[language].next + '</span>\
            </a>\
        </div>\
    ');

    // private functions
    // =================

    function initialize() {

       /**
        *  Initialize the script.
        */

        var enablePageSkim = $body.is('[yoi-pageskim]');

        if (enablePageSkim && !initialized) {

            var options  = YOI.toObject($body.attr('yoi-pageskim'));
            var position = options.position || 'br';
            offset       = options.offset || offset;
            $hooks       = $(options.hooks).length ? $(options.hooks) : $hooks;
            totalHooks   = $hooks.length;

            // detect the current hook

            detectCurrentHook();

            // add keyboard events

            addKeyboardEvents();

            // inject the buttons & add position

            $pageSkim.addClass('pos-fixed-' + position);
            $body.append($pageSkim);

            // init the icons

            YOI.component.Icon.init();

            // add events to scroll buttons

            $('#pageSkim').find('.pageSkim__btnPrev').on('click', function(e) {
                e.preventDefault();
                scrollToHook('prev');
            });

            $('#pageSkim').find('.pageSkim__btnNext').on('click', function(e) {
                e.preventDefault();
                scrollToHook('next');
            });

            // set initialized flag

            initialized = true;

        }

    }

    function scrollToHook(direction) {

        /**
         *  Scrolls to the previous or next hook.
         *
         *  @param {string} direction - 'prev' for previous or 'next' for next hook
         */

        // cancel if no hooks were found

        if (!$hooks) return false;

        // set the current hook

        setCurrentHook(direction);

        // do the scrolling

        $.when(
            $body.stop().animate({
                scrollTop : $hooks.eq(currentHook).offset().top - offset
            }, scrollSpeed)
        ).done(function(){
            $document.trigger('yoi-pageskim-' + direction);
        });

    }

    function addKeyboardEvents() {

        /**
         *  Add keyboard events.
         */

        if (YOI.foundModule('KeyboardAgent') && !keyboardEventsAdded) {

            // disable default behavior of
            // space and arrow keys

            $document.on('keydown', function(e) {
                if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                    e.preventDefault();
                }
            });

            // space and arrow keys

            $document
                .on('yoi-keypressed-arrowup yoi-keypressed-arrowleft', function() {
                    if (YOI.noFocus()) {
                        scrollToHook('prev');
                        highlightButton('prev');
                    }
                })
                .on('yoi-keypressed-arrowdown yoi-keypressed-arrowright yoi-keypressed-space', function() {
                    if (YOI.noFocus()) {
                        scrollToHook('next');
                        highlightButton('next');
                    }
                })
                .on('yoi-focus-change', function() {
                    if (YOI.noFocus()) {
                        $pageSkim.stop().fadeIn();
                    } else {
                        $pageSkim.stop().fadeOut();
                    }
                });
        }

        // set flag

        keyboardEventsAdded = true;

    }

    function highlightButton(direction) {

        /**
         *  "Presses" the corresponding button.
         *
         *  @param {string} direction - 'prev' for previous or 'next' for next hook
         */

        // cancel if direction is missing

        if (!direction) return false;

        // proceed

        var $button;

        if (direction === 'prev') $button = $('#pageSkim').find('.pageSkim__btnPrev');
        if (direction === 'next') $button = $('#pageSkim').find('.pageSkim__btnNext');

        $button.addClass('is--active');

        YOI.setDelay('highlightScrollKeyDelay', 200, function() {
            $button.removeClass('is--active');
        });

    }

    function setCurrentHook(direction) {

        /**
         *  Sets the current hook.
         *
         *  @param {string} direction - 'prev' for previous or 'next' for next hook
         */

        if (direction === 'prev') {
            --currentHook;
            if (currentHook < 0) currentHook = 0;
        }

        if (direction === 'next') {
            ++currentHook;
            if (currentHook === totalHooks) currentHook = totalHooks - 1;
        }

    }

    function detectCurrentHook() {

        /**
         *  Detects the current hook on interval. While it doubles the purpose of
         *  setCurrentHook() to some degree, it's a practical solution to detect
         *  the current hook after page scrolled or when the url contained a hash.
         */

        // cancel if no hooks were found

        if (!$hooks) return false;

        // proceed

        $window.on('yoi-scroll-stop', function() {

            // find the first hook which is visible in the viewport
            // and return it's index

            $hooks.each(function(index) {
                if ($(this).offset().top + offset > $body.scrollTop()) {
                    currentHook = index;
                    return false;
                }
            });

            // if the page is not scrolled past the first hook,
            // reset currentHook

            if ($body.scrollTop() < $hooks.eq(0).offset().top - offset) {
                currentHook = -1;
            }

        });

    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();
