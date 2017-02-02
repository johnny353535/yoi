/** switch.js */

var Switch = (function() {

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

    function initializeSwitch($switch, options) {

       /**
        *  Initialize all [data-switch] found in the document (= function call without parameters)
        *  or target one or more specific [data-switch] (= function call with $switch).
        *  $switch must be a jQuery object or jQuery object collection.
        *
        *  @param {jQuery dom object} $switch - the switch(es)
        *
        *  Options are passed to the script as custom data values, eg:
        *
        *  <form data-switch="state:off;"></form>
        *
        *  Available options:
        *
        *  @option {string}  state      - a keyword to set the switch ["on"|"off"]
        *  @option {boolean} showLabels - if "true", labels (on, off) are added
        *  @option {string}  labelOn    - a string of no more than four characters for the "on" label (default: labelOnTxt[language])
        *  @option {string}  labelOff   - a string of no more than four characters for the "off" label (default: labelOffTxt[language])
        */

        if (!($switch instanceof jQuery)) {
            $switch = $('[data-switch]');
        }

        $switch.each(function() {

            var $thisSwitch = $(this);
            var options     = YOI.toObject($thisSwitch.data('switch'));
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

            if (state === 'on') stateOn($thisSwitch);
            if (state === 'off') stateOff($thisSwitch);

            // add events

            $thisSwitch.on('click', function(e) {
                stateToggle($thisSwitch);
            });

        });

    }

    function stateOn($switch) {

        /**
         *  Sets the switch to "on". Adds the proper CSS class name to
         *  visualize the state and sets the first checkbox found inside the
         *  switch to "checked".
         *
         *  @param {jQuery dom object} $switch - the switch
         */

        $switch.removeClass('switch--off').addClass('switch--on');
        $switch.find('input[type="checkbox"]').first().attr('checked', true);

    }

    function stateOff($switch) {

        /**
         *  Sets the switch to "off". Adds the proper CSS class name to
         *  visualize the state and removes the "checked" attribute from
         *  the first checkbox found inside the switch.
         *
         *  @param {jQuery dom object} $switch - the switch
         */

        $switch.removeClass('switch--on').addClass('switch--off');
        $switch.find('input[type="checkbox"]').first().attr('checked', false);

    }

    function stateToggle($switch) {

        /**
         *  Alternates the state between "on" and "off".
         *  See stateOn() and stateOff() for more.
         *
         *  @param {jQuery dom object} $switch - the switch
         */

        if ($switch.hasClass('switch--off')) {
            stateOn($switch);
        } else if ($switch.hasClass('switch--on')) {
            stateOff($switch);
        }

    }

    // initialize
    // ==========

    initializeSwitch();

    // public functions
    // ================

    return {
        init   : initializeSwitch,
        on     : stateOn,
        off    : stateOff,
        toggle : stateToggle
    }

})();