/** popOvers.js */

var PopOver = (function() {

    // private functions
    // =================

    function initializePopOver() {

        /**
         *  Initializes pop-overs by searching the document for pop-over triggers.
         *  These triggers are identified trough the custom "data-popover" attribute.
         *  The attribute contains a sting with key/value pairs with at least one option:
         *  the target pop-over selector (preferably an #id). Example from markup:
         *
         *      <a href="#" data-popover="target:#pop-overId;">Show a pop-over</a>
         *
         *  Options may be set for each trigger element via more attributes within the same
         *  options string. See the following possible key/values for reference:
         *
         *      @param  {string} target         - The target pop-over id selector.
         *      @option {string} pos            - ['tl','tr','br','bl'] Pop-over position relative to trigger. The default is 'tr'.
         *      @option {string} ref            - ['tl','tr','br','bl'] Pop-over reference point. The default is 'tl'.
         *      @option {string} toggleClass    - Css class name added to trigger if pop-over is currently shown.
         *      @option {string} eventShow      - ['click','dblclick','contextmenu','mouseover', 'mouseout', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'] Defines the event to show the pop-over. The default is mouseenter.
         *      @option {string} eventHide      - ['click','dblclick','contextmenu','mouseover', 'mouseout', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'] Defines the event to hide the pop-over. The default is mouseleave.
         *      @option {bool}   preventDefault - If true, the trigger’s default event (eg. click) gets prevented. The default is true.
         *
         *  Example from markup:
         *
         *      <a href="#" class="btn" data-popover="target:#pop-overId; pos:bl; toggleClass:btn--active;">Show a pop-over</a>
         *
         */

        $('[data-popover]').each(function() {

            // reference the popover trigger

            var $thisPopOverTrigger = $(this);

            // read the options

            var options = Helper.toObject($thisPopOverTrigger.data('popover'));

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

                    hideAllPopOvers();
                    removeToggleClassFromPopOverTriggers();
                    showPopOver($thisPopOverTrigger, $thisPopOver);

                })
                .on(eventHide, function(e) {

                    if (preventDefault !== 'false') e.preventDefault();

                    Helper.clearInterval('popOverShowTimeout');
                    hidePopOver($thisPopOverTrigger, $thisPopOver);

                });

            // attach events to pop-over

            $thisPopOver
                .on('mouseenter', function() {
                    Helper.clearInterval('popOverHideTimeout');
                })
                .on('mouseleave', function() {
                    hidePopOver($thisPopOverTrigger, $thisPopOver);
                });

        });

        $('.popOver').each(function() {

            $thisPopOver = $(this);

            // first measure, then hide pop-over

            $thisPopOver
                .data({
                    width:  $thisPopOver.outerWidth(),
                    height: $thisPopOver.outerHeight()
                })
                .hide();

        });

    }

    function showPopOver($thisPopOverTrigger, $thisPopOver) {

        /**
         *  Shows a pop-over after a certain delay.
         *
         *  @param {jQuery dom object} $thisPopOverTrigger - the element to trigger the pop-over
         *  @param {jQuery dom object} $thisPopOver        - the pop-over
         */

        Helper.setDelay('popOverShowTimeout', 100, function() {

            // if this option is set, add the provided css class name
            // to the trigger element

            var options = Helper.toObject($thisPopOverTrigger.data('popover'));

            if (options.toggleClass !== undefined) {
                $thisPopOverTrigger.addClass(options.toggleClass);
            }

            // set the pop-over postion, then show it

            setPopOverPosition($thisPopOverTrigger, $thisPopOver);
            $thisPopOver.fadeIn(100);

        });

    }

    function hidePopOver($thisPopOverTrigger, $thisPopOver) {

        /**
         *  Hides a pop-over after a certain delay.
         *
         *  @param {jQuery dom object} $thisPopOverTrigger - the element to trigger the pop-over
         *  @param {jQuery dom object} $thisPopOver        - the pop-over
         */

        Helper.setDelay('popOverHideTimeout', 500, function() {
            $thisPopOver.hide();
            removeToggleClassFromPopOverTriggers();
        });

    }

    function hideAllPopOvers() {

        /**
         *  Clears the pop-over hide-interval and
         *  hides all pop-overs instantly.
         */

        // if this option is set, add the provided css class name
        // to the trigger element

        $('[data-popover]').each(function() {

            var $thisPopOverTrigger = $(this);
            var options = $thisPopOverTrigger.data('popover');

            if (options.toggleClass !== undefined) {
                var cssClassName = options.toggleClass;
                $thisPopOverTrigger.removeClass(cssClassName);
            }

        });

        // clear the hide interval,
        // then hide all pop-overs

        Helper.clearInterval('popOverHideTimeout');
        $('.popOver').hide();

    }

    function setPopOverPosition($thisPopOverTrigger, $thisPopOver) {

        /**
         *  Position the pop-over
         *
         *  @param {jQuery dom object} $thisPopOverTrigger - the element to trigger the pop-over
         *  @param {jQuery dom object} $thisPopOver        - the pop-over
         */

        // read options

        var options = Helper.toObject($thisPopOverTrigger.data('popover'));

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
    
    function removeToggleClassFromPopOverTriggers() {
        
        $('[data-popover]').each(function() {
            
            // reference the popover trigger

            var $thisPopOverTrigger = $(this);

            // read the options

            var options = Helper.toObject($thisPopOverTrigger.data('popover'));
            
            // if this option is set, remove the provided css class name
            // from the trigger element

            var options = Helper.toObject($thisPopOverTrigger.data('popover'));

            if (options.toggleClass !== undefined) {
                $thisPopOverTrigger.removeClass(options.toggleClass);
            }
            
        });
        
    }

    // initialize
    // ==========

    initializePopOver();

    // public functions
    // ================

    return {
        init    : initializePopOver,
        hideAll : hideAllPopOvers
    }

})();
