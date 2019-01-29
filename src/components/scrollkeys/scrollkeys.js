/** scrollkeys.js */

YOI.component.ScrollKeys = (function() {

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

    var $scrollButtons = $('\
        <div id="scrollButtons" class="buttons buttons--vertical sh-4 m-4">\
            <button class="button button--large">\
                <span class="hidden">' + localization[language].prev + '</span>\
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="18 15 12 9 6 15"></polyline></svg>\
            </button>\
            <button class="button button--large">\
                <span class="hidden">' + localization[language].next + '</span>\
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="6 9 12 15 18 9"></polyline></svg>\
            </button>\
        </div>\
    ');

    // private functions
    // =================

    function initialize() {

       /**
        *  Initialize the script.
        */

        var enableScrollKeys = $body.is('[yoi-scrollkeys]');

        if (enableScrollKeys && !initialized) {

            var options  = YOI.toObject($body.attr('yoi-scrollkeys'));
            var position = options.position || 'br';
            offset       = options.offset || offset;
            $hooks       = $(options.hooks).length ? $(options.hooks) : $hooks;
            totalHooks   = $hooks.length;

            // detect the current hook

            detectCurrentHook();

            // add keyboard events

            addKeyboardEvents();

            // inject the buttons & add position

            $scrollButtons.addClass('pos-fixed-' + position);
            $body.append($scrollButtons);

            // init the icons

            YOI.component.Icon.init();

            // add events to scroll buttons

            $('#scrollButtons').find('.button').eq(0).on('click', function(e) {
                e.preventDefault();
                scrollToHook('prev');
            });

            $('#scrollButtons').find('.button').eq(1).on('click', function(e) {
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
            $document.trigger('yoi-scrollKeys-' + direction);
        });

    }

    function addKeyboardEvents() {

        /**
         *  Adds keyboard events.
         */

        if (YOI.foundModule('KeyboardAgent') && !keyboardEventsAdded) {
            $document
                .on('yoi-keypressed-arrowleft', function() {
                    if (YOI.noFocus()) {
                        scrollToHook('prev');
                        highlightButton('prev');
                    }
                })
                .on('yoi-keypressed-arrowright', function() {
                    if (YOI.noFocus()) {
                        scrollToHook('next');
                        highlightButton('next');
                    }
                })
                .on('yoi-focus-change', function() {
                    if (YOI.noFocus()) {
                        $scrollButtons.stop().fadeIn();
                    } else {
                        $scrollButtons.stop().fadeOut();
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

        var buttonIndex;

        if (direction === 'prev') buttonIndex = 0;
        if (direction === 'next') buttonIndex = 1;

        var $button = $('#scrollButtons').find('.button').eq(buttonIndex);

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
