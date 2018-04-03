/** keyboardagent.js */

YOI.module.KeyboardAgent = (function() {

    /**
     *  A wrapper for keyboard access. Triggers a custom event
     *  for each key of a curated list.
     */

    // private vars
    // ============

    var $document   = $(document);
    var initialized = false;

    // lookup table for relevant keys

    var keys = {
        38 : 'arrowup',
        39 : 'arrowright',
        40 : 'arrowdown',
        37 : 'arrowleft',
        13 : 'enter',
        32 : 'space',
        27 : 'escape',
        9  : 'tab'
    }

    // private functions
    // =================

    function initialize() {

        /**
         *  Initialize the script. Listen for key presses and
         *  trigger the corresponding custom events.
         */

        if (!initialized) $document.on('keyup.yoi.keyboardAgent', function(e) {

            // trigger the custom "yoi-keypressed" event

            var keyCode = e.which;
            if (keys[keyCode] !== undefined) $document.trigger('yoi-keypressed-' + keys[keyCode] + '.keyboardAgent');

        });

        // trigger the custom "yoi-focus-change" event

        $document.on('focusin.yoi.keyboardAgent focusout.yoi.keyboardAgent', function() {
            $document.trigger('yoi-focus-change.keyboardAgent');
        });

        // set "initialized" flag

        initialized = true;

    }

    function addTabFocus($elements) {

        /**
         *  Adds special focus styling if element got :focus after
         *  pressing the tab key.
         *
         *  @param {jQuery element} $elements
         */

        // add tabindex

        $elements.attr('tabindex','0');

        // attach tab key event

        $document.on('yoi-keypressed-tab.keyboardAgent', function() {

            var $activeElement = $(document.activeElement);

            $elements.removeClass('tabFocus');

            if ($activeElement.is($elements)) {
                $activeElement
                    .addClass('tabFocus')
                    .on('blur.yoi.keyboardAgent', function() {
                        $activeElement.removeClass('tabFocus');
                    });
            }

        });

    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init        : initialize,
        addTabFocus : addTabFocus
    }

})();
