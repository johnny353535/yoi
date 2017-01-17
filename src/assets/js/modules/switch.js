/** switch.js */

var Switch = (function() {

    // private vars
    // ============
    
    var $switchWrapper = $('<span class="switch"></span>');
    var $labelOn       = $('<span class="switch__labelOn"></span>');
    var $labelOff      = $('<span class="switch__labelOff"></span>');
    var $knob          = $('<span class="switch__knob"></span>');
    
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
        *  @option {string}  state       - a keyword to set the switch ["on"|"off"]
        *  @option {boolean} addCheckbox - if "true", a checkbox will be injected
        *  @option {boolean} showLabels  - if "true", labels (on, off) are added
        */

        if (!($switch instanceof jQuery)) {
            $switch = $('[data-switch]');
        }

        $switch.each(function() {

            var $thisSwitch        = $(this);
            var $thisSwitchWrapper = $switchWrapper.clone();
            var options            = YOI.toObject($thisSwitch.data('switch'));

            // prepare the dom
            
            $thisSwitch = $thisSwitch.wrap($thisSwitchWrapper).parent();
            
            $thisSwitch.append(
                $knob.clone(),
                $labelOn.clone().text(labelOnTxt[language]),
                $labelOff.clone().text(labelOffTxt[language])
            );
            
            $thisSwitch.addClass('switch--on');
            
            /*
                if (:checked || .hasClass('switch--on'))
                    => make it switched on
            
            */

            // add events

            $thisSwitch.on('click', function(e) {
                stateToggle($thisSwitch);
            });

        });
        
    }
    
    function stateOn($switch) {
        
        /**
         *  
         *
         *  @param  {}  - 
         *  @return {}  - 
         */
        
        $switch.removeClass('switch--off').addClass('switch--on');
        $switch.find('input[type="checkbox"]').attr('checked', true);
        
    }
    
    function stateOff($switch) {
        
        /**
         *  
         *
         *  @param  {}  - 
         *  @return {}  - 
         */
        
        $switch.removeClass('switch--on').addClass('switch--off');
        $switch.find('input[type="checkbox"]').attr('checked', false);
        
    }
    
    function stateToggle($switch) {
        
        /**
         *  
         *
         *  @param  {}  - 
         *  @return {}  - 
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









// $(scope + '.switch').each(function() {
//
//    /**
//     *  How Does the Options-Interface Work?
//     *
//     *  Use the custom data-attribute to apply options. Use this notation:
//     *  data-switch="foo:bar;hello:world;"
//     */
//
//     var $thisSwitch = $(this);
//
//     var options     = YOI.toObject($thisSwitch.data('switch'));
//     var labelOnTxt  = options.labelOn !== undefined ? options.labelOn : 'Ein';
//     var labelOffTxt = options.labelOff !== undefined ? options.labelOff : 'Aus';
//
//     var $labelOn    = $('<span class="switch__labelOn">' + labelOnTxt + '</span>');
//     var $labelOff   = $('<span class="switch__labelOff">' + labelOffTxt + '</span>');
//     var $knob       = $('<span class="switch__knob">');
//
//     $thisSwitch.append($knob, $labelOn, $labelOff);
//
//     $thisSwitch.on('click', function(e) {
//
//         if ($thisSwitch.hasClass('switch--on')) {
//
//             $thisSwitch.removeClass('switch--on').addClass('switch--off');
//             $thisSwitch.find('input[type="checkbox"]').attr('checked', false);
//
//         } else if ($thisSwitch.hasClass('switch--off')) {
//
//             $thisSwitch.removeClass('switch--off').addClass('switch--on');
//             $thisSwitch.find('input[type="checkbox"]').attr('checked', true);
//
//         }
//
//     });
//
// });