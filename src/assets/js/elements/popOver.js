/** popOver.js */

YOI.PopOver = (function() {
    
    // private vars
    // ============
    
    $document = $(document);

    // private functions
    // =================

    function initialize($popOverTrigger, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $popOverTrigger
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {string} target         - The target pop-over id selector.
         *  @option {string} pos            - ['tl','tr','br','bl'] Pop-over position relative to trigger. The default is 'tr'.
         *  @option {string} ref            - ['tl','tr','br','bl'] Pop-over reference point. The default is 'tl'.
         *  @option {string} toggleClass    - Css class name added to trigger if pop-over is currently shown.
         *  @option {string} eventShow      - ['click','dblclick','contextmenu','mouseover', 'mouseout', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'] Defines the event to show the pop-over. The default is mouseenter.
         *  @option {string} eventHide      - ['click','dblclick','contextmenu','mouseover', 'mouseout', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'] Defines the event to hide the pop-over. The default is mouseleave.
         *  @option {bool}   preventDefault - If true, the trigger’s default event (eg. click) gets prevented. The default is true.
         */
        
        var $popOverTrigger = YOI.createCollection('popover', $popOverTrigger, options);

        if ($popOverTrigger) $popOverTrigger.each(function() {

            // reference the popover trigger

            var $thisPopOverTrigger = $(this);

            // read the options

            var options = $thisPopOverTrigger.data().options;

            // cancel if target-selector does not return any element ...

            if (options.target === undefined || $(options.target).length < 1) return false;

            // ... or proceed, move the popover out of it's original position in the DOM and
            // inject it back at the end of <body> to enable correct absolute positioning

            var $thisPopOver = $(options.target).detach();
            $('body').append($thisPopOver);

            // valid events

            var validEvents = [
                'click',
                'dblclick',
                'contextmenu',
                'mouseover',
                'mouseout',
                'mousedown',
                'mouseup',
                'mouseenter',
                'mouseleave'
            ];

            // prevent default event option,
            // default is TRUE

            var preventDefault = options.preventDefault !== undefined ? options.preventDefault : true;

            // get the events to show and hide the popover
            // defaults are 'mouseover' for show and 'mouseout' for hide

            var eventShow = $.inArray(options.eventShow, validEvents) > -1 ? options.eventShow : 'mouseenter';
            var eventHide = $.inArray(options.eventHide, validEvents) > -1 ? options.eventShow : 'mouseleave';

            // attach events to pop-over trigger

            $thisPopOverTrigger
                .on(eventShow, function(e) {

                    if (preventDefault !== 'false') e.preventDefault();

                    hideAll();
                    removeToggleClass();
                    show($thisPopOverTrigger, $thisPopOver);

                })
                .on(eventHide, function(e) {

                    if (preventDefault !== 'false') e.preventDefault();

                    YOI.clearInterval('popOverShowTimeout');
                    hide($thisPopOverTrigger, $thisPopOver);

                });

            // attach events to pop-over

            $thisPopOver
                .on('mouseenter', function() {
                    YOI.clearInterval('popOverHideTimeout');
                })
                .on('mouseleave', function() {
                    hide($thisPopOverTrigger, $thisPopOver);
                });

        });

        $('.popOver').each(function() {

            var $thisPopOver = $(this);

            // first measure, then hide pop-over

            $thisPopOver
                .data({
                    width:  $thisPopOver.outerWidth(),
                    height: $thisPopOver.outerHeight()
                })
                .hide();

        });

    }

    function show($thisPopOverTrigger, $thisPopOver) {

        /**
         *  Shows a pop-over after a certain delay.
         *
         *  @param {jQuery dom object} $thisPopOverTrigger - the element to trigger the pop-over
         *  @param {jQuery dom object} $thisPopOver        - the pop-over
         */

        YOI.setDelay('popOverShowTimeout', 100, function() {

            // if this option is set, add the provided css class name
            // to the trigger element

            var options = $thisPopOverTrigger.data().options;

            if (options.toggleClass !== undefined) {
                $thisPopOverTrigger.addClass(options.toggleClass);
            }

            // set the pop-over postion, then show it

            setPosition($thisPopOverTrigger, $thisPopOver);
            $thisPopOver.fadeIn(100);
            
            // trigger custom event
        
            $thisPopOverTrigger.trigger('yoi-popover:show');

        });

    }

    function hide($thisPopOverTrigger, $thisPopOver) {

        /**
         *  Hides a pop-over after a certain delay.
         *
         *  @param {jQuery dom object} $thisPopOverTrigger - the element to trigger the pop-over
         *  @param {jQuery dom object} $thisPopOver        - the pop-over
         */

        YOI.setDelay('popOverHideTimeout', 500, function() {
            
            $thisPopOver.hide();
            removeToggleClass();
            
            // trigger custom event
        
            $thisPopOverTrigger.trigger('yoi-popover:hide');
            
        });

    }

    function hideAll() {

        /**
         *  Clears the pop-over hide-interval and
         *  hides all pop-overs instantly.
         */

        // if this option is set, add the provided css class name
        // to the trigger element

        $('[yoi-popover]').each(function() {

            var $thisPopOverTrigger = $(this);
            var options             = $thisPopOverTrigger.data().options;

            if (options.toggleClass !== undefined) {
                var cssClassName = options.toggleClass;
                $thisPopOverTrigger.removeClass(cssClassName);
            }

        });

        // clear the hide interval,
        // then hide all pop-overs

        YOI.clearInterval('popOverHideTimeout');
        $('.popOver').hide();

    }

    function setPosition($thisPopOverTrigger, $thisPopOver) {

        /**
         *  Position the pop-over
         *
         *  @param {jQuery dom object} $thisPopOverTrigger - the element to trigger the pop-over
         *  @param {jQuery dom object} $thisPopOver        - the pop-over
         */

        // read options

        var options = $thisPopOverTrigger.data().options;

        // position settings

        var pos = options.pos !== undefined ? options.pos : 'tr';
        var ref = options.ref !== undefined ? options.ref : 'tl';

        // set pop-over position

        switch (pos) {
        case 'tl':
            $thisPopOver.css({
                'left': $thisPopOverTrigger.offset().left + 'px',
                'top' : $thisPopOverTrigger.offset().top  + 'px'
            });
            break;
        case 'tr':
            $thisPopOver.css({
                'left': $thisPopOverTrigger.offset().left + $thisPopOverTrigger.outerWidth() + 'px',
                'top' : $thisPopOverTrigger.offset().top  + 'px'
            });
            break;
        case 'br':
            $thisPopOver.css({
                'left': $thisPopOverTrigger.offset().left + $thisPopOverTrigger.outerWidth()  + 'px',
                'top' : $thisPopOverTrigger.offset().top  + $thisPopOverTrigger.outerHeight() + 'px'
            });
            break;
        case 'bl':
            $thisPopOver.css({
                'left': $thisPopOverTrigger.offset().left + 'px',
                'top' : $thisPopOverTrigger.offset().top  + $thisPopOverTrigger.outerHeight() + 'px'
            });
            break;
        }

        // set pop-over reference point

        switch (ref) {
        case 'tl':
            $thisPopOver.css({
                'marginLeft': 0,
                'marginTop': 0
            });
            break;
        case 'tr':
            $thisPopOver.css({
                'marginLeft': $thisPopOver.data().width * -1 + 'px',
                'marginTop' : 0
            });
            break;
        case 'br':
            $thisPopOver.css({
                'marginLeft': $thisPopOver.data().width  * -1 + 'px',
                'marginTop' : $thisPopOver.data().height * -1 + 'px'
            });
            break;
        case 'bl':
            $thisPopOver.css({
                'marginLeft': 0,
                'marginTop' : $thisPopOver.data().height * -1 + 'px'
            });
            break;
        }

    }

    function removeToggleClass($popOverTrigger) {

        /**
         *  Popover triggers provide an option to add any css-class to the trigger when the
         *  popover itself is visible. This function removes the very class name from all popover triggers
         *  (= function call without parameters) or a specific one (= function call with $popover).
         *
         *  @param  {jQuery dom object} $popOverTrigger - the pop over trigger
         */

        if (!($popOverTrigger instanceof jQuery)) {
            $popOverTrigger = $('[yoi-popover]');
        }

        $popOverTrigger.each(function() {

            var $thisPopOverTrigger = $(this);
            var options             = $thisPopOverTrigger.data().options;

            // if this option is set, remove the provided css class name
            // from the trigger element

            if (options.toggleClass !== undefined) {
                $thisPopOverTrigger.removeClass(options.toggleClass);
            }

        });

    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init    : initialize,
        hideAll : hideAll
    };

})();
