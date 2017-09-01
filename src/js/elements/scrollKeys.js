/** scrollKeys.js */

YOI.element.ScrollKeys = (function() {

    // private vars
    // ============
    
    var initialized        = false;
    var keyboadEventsAdded = false;
    var $window            = $(window);
    var $body              = $('body');
    var totalHooks;
    var currentHook;
    
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
        <div id="scrollButtons" class="btns sh-4 m-4">\
            <button class="btn btn--large">\
                <span class="hidden">' + localization[language].prev + '</span>\
                <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-008-s" yoi-icon />\
            </button>\
            <button class="btn btn--large">\
                <span class="hidden">' + localization[language].next + '</span>\
                <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-007-s" yoi-icon />\
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
            var position = options.position || 'tr';
            
            offset       = options.offset || offset;
            $hooks       = $(options.hooks).length ? $(options.hooks) : $hooks;
            totalHooks   = $hooks.length;
            
            // set the current hook
            
            setCurrentHook();
            detectCurrentHookAfterScroll();
            
            // add keyboard events
            
            addKeyboardEvents();
            
            // inject the buttons & add position
            
            $scrollButtons.addClass('pos-fix-' + position);
            $body.append($scrollButtons);
            
            // init the icons
            
            YOI.element.Icon.init();
            
            // add events to scroll buttons
            
            $('#scrollButtons').find('.btn').eq(0).on('click', function(e) {
                e.preventDefault();
                scrollToHook('prev');
            });
            
            $('#scrollButtons').find('.btn').eq(1).on('click', function(e) {
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
                scrollTop : $hooks.eq(currentHook - 1).offset().top - offset
            }, scrollSpeed)
        ).done(function(){
            $document.trigger('yoi-scrollKeys-' + direction);
        });
        
    }
    
    function addKeyboardEvents() {

        /**
         *  Adds keyboard events.
         */
        
        if (YOI.foundModule('KeyboardAgent') && !keyboadEventsAdded) {
            $document.on('yoi-keypressed-arrowleft', function() {
                scrollToHook('prev');
                highlightBtn('prev');
            });
            $document.on('yoi-keypressed-arrowright', function() {
                scrollToHook('next');
                highlightBtn('next');
            });
        }
        
        // set flag
        
        keyboadEventsAdded = true;

    }
    
    function highlightBtn(direction) {
        
        /**
         *  "Presses" the corresponding button.
         *
         *  @param {string} direction - 'prev' for previous or 'next' for next hook
         */
        
        // cancel if direction is missing
        
        if (!direction) return false;
        
        // proceed
        
        var btnIndex;
        
        if (direction === 'prev') btnIndex = 0;
        if (direction === 'next') btnIndex = 1;
        
        var $btn = $('#scrollButtons').find('.btn').eq(btnIndex);
        
        $btn.addClass('btn--active');
        
        YOI.setDelay('highlightScrollKeyDelay', 200, function() {
            $btn.removeClass('btn--active');
        });
        
    }
    
    function setCurrentHook(direction) {
        
        /**
         *  Sets the current hook.
         *
         *  @param {string} direction - 'prev' for previous or 'next' for next hook
         */

        if (direction === 'prev') {
            
            // go to previous hook
            
            --currentHook;
            if (currentHook < 1) currentHook = 1;
            
        } else if (direction === 'next') {
            
            // go to next hook
            
            ++currentHook;
            if (currentHook > totalHooks) currentHook = totalHooks;
            
        } else {
            
            // no direction, reset currentHook
            
            currentHook = 0;
            
        }

    }
    
    function detectCurrentHookAfterScroll() {
        
        /**
         *  Detects the current hook after scrolling. While it doubles the purpose of
         *  setCurrentHook() to some degree, it's a practical solution to detect the
         *  current hook after the user scrolled the page or when the url contained a hash.
         */
        
        $(window).on('scroll', function() {
        
            // cancel if no hooks were found
        
            if (!$hooks) return false;
        
            // proceed
        
            YOI.clearDelay('scrollKeysScrollListenerDelay');
        
            YOI.setDelay('scrollKeysScrollListenerDelay', 500, function() {
                $hooks.each(function(index) {
                    
                    // find the first hook which is visible in the viewport
                    
                    if ($(this).offset().top > $body.scrollTop()) {
                        currentHook = index + 1;
                        return false;
                    }
                    
                });
            });
        
        });
        
    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();