/** switch.js */

YOI.component.Switch = (function() {

    // private vars
    // ============

    // localization

    var language = YOI.locale();

    var localization = {
        'en' : {
            'labelOn'  : 'On',
            'labelOff' : 'Off'
        },
        'de' : {
            'labelOn'  : 'Ein',
            'labelOff' : 'Aus'
        }
    };

    // templates

    var $labelOn  = $('<span class="switch__labelOn"></span>');
    var $labelOff = $('<span class="switch__labelOff"></span>');
    var $knob     = $('<span class="switch__knob"></span>');

    // private functions
    // =================

    function initialize($switch, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery element} $switch
         *  @param {object}         options
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

            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // proceed

            var $thisSwitch = $(this);
            var options     = $thisSwitch.data().options;
            var state       = options.state !== undefined ? options.state : 'off';

            // get the label text

            thisLabelOnText  = options.labelOn !== undefined ? options.labelOn : localization[language]['labelOn'];
            thisLabelOffText = options.labelOff !== undefined ? options.labelOff : localization[language]['labelOff'];

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

            // set initialized

            YOI.setReady($(this));

        });

    }

    function setOn($switch, preventEvents) {

        /**
         *  Sets the switch to "on". Adds the proper CSS class name to
         *  visualize the state and sets the first checkbox found inside the
         *  switch to "checked".
         *
         *  @param {jQuery element} $switch       - the switch
         *  @param {boolean}        preventEvents - prevent custom events, default: false
         */

        var preventEvents = preventEvents === undefined ? false : true;

        $switch.removeClass('switch--off').addClass('switch--on');
        $switch.find('input[type="checkbox"]').first().attr('checked', true);

        // trigger custom events

        if (!preventEvents) {
            $switch.trigger('yoi-switch-on');
            $switch.trigger('yoi-switch-change');
        }

    }

    function setOff($switch, preventEvents) {

        /**
         *  Sets the switch to "off". Adds the proper CSS class name to
         *  visualize the state and removes the "checked" attribute from
         *  the first checkbox found inside the switch.
         *
         *  @param {jQuery element} $switch       - the switch
         *  @param {boolean}        preventEvents - prevent custom events, default: false
         */

        var preventEvents = preventEvents === undefined ? false : true;

        $switch.removeClass('switch--on').addClass('switch--off');
        $switch.find('input[type="checkbox"]').first().attr('checked', false);

        // trigger custom events

        if (!preventEvents) {
            $switch.trigger('yoi-switch-off');
            $switch.trigger('yoi-switch-change');
        }

    }

    function setToggle($switch, preventEvents) {

        /**
         *  Alternates the state between "on" and "off".
         *  See setOn() and setOff() for more.
         *
         *  @param {jQuery element} $switch - the switch
         *  @param {boolean}        preventEvents - prevent custom events, default: false
         */

        if ($switch.hasClass('switch--off')) {
            setOn($switch, preventEvents);
        } else if ($switch.hasClass('switch--on')) {
            setOff($switch, preventEvents);
        }

    }

    // public functions
    // ================

    return {
        init   : initialize,
        on     : setOn,
        off    : setOff,
        toggle : setToggle
    };

})();
