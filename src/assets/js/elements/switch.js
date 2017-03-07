/** switch.js */

YOI.Switch = (function() {

    // private vars
    // ============

    var $labelOn  = $('<span class="switch__labelOn"></span>');
    var $labelOff = $('<span class="switch__labelOff"></span>');
    var $knob     = $('<span class="switch__knob"></span>');

    var labelOnTxt = {
        'de' : 'Ein',
        'en' : 'On'
    }

    var labelOffTxt = {
        'de' : 'Aus',
        'en' : 'Off'
    }

    // get the document language, fall back to english
    // note: only german and english supported at this moment

    var language = typeof YOI.locale() !== 'object' || YOI.locale() === undefined || YOI.locale() === '' ? 'en' : YOI.locale();

    // private functions
    // =================

    function initialize($switch, options) {
        
        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $switch
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {string}  state      - a keyword to set the switch ["on"|"off"]
         *  @option {boolean} showLabels - if "true", labels (on, off) are added
         *  @option {string}  labelOn    - a string of no more than four characters for the "on" label (default: labelOnTxt[language])
         *  @option {string}  labelOff   - a string of no more than four characters for the "off" label (default: labelOffTxt[language])
         */
        
        var $switch = YOI.createCollection('switch', $switch, options);

        if ($switch) $switch.each(function() {

            var $thisSwitch = $(this);
            var options     = $thisSwitch.data().options;
            var state       = options.state !== undefined ? options.state : 'off';

            // get the label text

            thisLabelOnText  = options.labelOn !== undefined ? options.labelOn : labelOnTxt[language];
            thisLabelOffText = options.labelOff !== undefined ? options.labelOff : labelOffTxt[language];

            // prepare the dom

            $thisSwitch.append(
                $knob.clone()
            );

            if (options.showLabels) {
                $thisSwitch.append(
                    $labelOn.clone().text(thisLabelOnText),
                    $labelOff.clone().text(thisLabelOffText)
                );
                $thisSwitch.addClass('switch--labeled');
            }

            // set to initial state

            if (state === 'on') setOn($thisSwitch);
            if (state === 'off') setOff($thisSwitch);

            // add events

            $thisSwitch.on('click', function(e) {
                setToggle($thisSwitch);
            });

        });

    }

    function setOn($switch) {

        /**
         *  Sets the switch to "on". Adds the proper CSS class name to
         *  visualize the state and sets the first checkbox found inside the
         *  switch to "checked".
         *
         *  @param {jQuery dom object} $switch - the switch
         */

        $switch.removeClass('switch--off').addClass('switch--on');
        $switch.find('input[type="checkbox"]').first().attr('checked', true);
        
        // trigger custom event
        
        $switch.trigger('yoi-switch:on');

    }

    function setOff($switch) {

        /**
         *  Sets the switch to "off". Adds the proper CSS class name to
         *  visualize the state and removes the "checked" attribute from
         *  the first checkbox found inside the switch.
         *
         *  @param {jQuery dom object} $switch - the switch
         */

        $switch.removeClass('switch--on').addClass('switch--off');
        $switch.find('input[type="checkbox"]').first().attr('checked', false);
        
        // trigger custom event
        
        $switch.trigger('yoi-switch:off');

    }

    function setToggle($switch) {

        /**
         *  Alternates the state between "on" and "off".
         *  See setOn() and setOff() for more.
         *
         *  @param {jQuery dom object} $switch - the switch
         */

        if ($switch.hasClass('switch--off')) {
            setOn($switch);
        } else if ($switch.hasClass('switch--on')) {
            setOff($switch);
        }

    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init   : initialize,
        on     : setOn,
        off    : setOff,
        toggle : setToggle
    }

})();