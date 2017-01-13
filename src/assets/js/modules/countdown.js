/** countdown.js */

var Countdown = (function() {

    // private vars
    // ============
    
    // countdown clock labels
    
    var clockLabels = {
        'en' : {
            'days'    : 'Days',
            'hours'   : 'Hours',
            'minutes' : 'Min',
            'seconds' : 'Sec'
        },
        'de' : {
            'days'    : 'Tage',
            'hours'   : 'Std',
            'minutes' : 'Min',
            'seconds' : 'Sek'
        }
    };

    // "lcd" character template

    var $countdownCharacter = $('\
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="countdown__character" x="0px" y="0px" width="24px" height="37px" viewBox="0 0 24 37" xml:space="preserve">\
            <polygon class="countdown__character__segment-br" points="19,31 19,22 22,20 22,34" />\
            <polygon class="countdown__character__segment-tr" points="19,15 19,6 22,3 22,17" />\
            <polygon class="countdown__character__segment-bl" points="5,22 5,31 2,34 2,20" />\
            <polygon class="countdown__character__segment-tl" points="5,6 5,15 2,17 2,3" />\
            <polygon class="countdown__character__segment-b" points="6,32 18,32 21,35 3,35" />\
            <polygon class="countdown__character__segment-m" points="19,20 5,20 3,18.5 5,17 19,17 21,18.5" />\
            <polygon class="countdown__character__segment-t" points="3,2 6,5 18,5 21,2" />\
            <path class="countdown__character__dots" d="M12,14c1.104,0,2-0.896,2-2s-0.896-2-2-2s-2,0.896-2,2S10.896,14,12,14z M12,23c-1.104,0-2,0.896-2,2s0.896,2,2,2 s2-0.896,2-2S13.104,23,12,23z" />\
        </svg>\
    ');

    // other templates

    var $countdownCharacterLabel = $('<span class="countdown__label"></span>');
    var $countdownClock          = $('<div class="countdown__clock" aria-hidden="true"></div>');

    // private functions
    // =================

    function initializeCountdown($countdown) {
        
        /**
         *  Initialize all *[data-countdown] found in the document (= function call without parameters)
         *  or target one or more specific *[data-countdown] (= function call with $countdown).
         *  $countdown must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $countdown - the countdown(s)
         */
        
        if (!($countdown instanceof jQuery)) {
            $countdown = $('[data-countdown]');
        }

        $countdown.each(function(index) {
        
            var $thisCountdown = $(this);
            
            // render the countdown
            
            renderCountdown($thisCountdown, index);
            
            // update the clock every second
            
            YOI.setInterval('countdownTimer-' + index, 1000, function() {
                renderCountdown($thisCountdown, index)
            });
        
        });

    }
    
    function renderCountdown($thisCountdown, index) {
        
        /**
         *  Render the lcd-style countdown, also include a label for screen readers.
         *
         *  @param {jQuery dom object} $thisCountdown - the countdown
         *  @param {number}            index          - index number of the count down
         */
        
        // read end time and get remaining time
        
        var endTime       = $thisCountdown.data('countdown');
        var timeRemaining = getTimeRemaining(endTime);
        
        // if countdown is expired, clear countdown interval and fire custom event

        if (timeRemaining.total <= 0) {
            YOI.clearInterval('countdownTimer-' + index);
            $thisCountdown.trigger('countdown:expired');
        }

        // set the lcd characters
    
        setLcdCharacters($thisCountdown, timeRemaining);

        // accessibility: create an additional, visually hidden
        // label for screen readers
        
        var language = YOI.locale();
        
        var labelTxt = {
            'en' : timeRemaining.days + ' days, ' + timeRemaining.hours + ' hours, ' + timeRemaining.minutes + ' minutes and ' + timeRemaining.seconds + ' seconds left.',
            'de' : 'Noch ' + timeRemaining.days + ' Tage, ' + timeRemaining.hours + ' Stunden, ' + timeRemaining.minutes + ' Minuten und ' + timeRemaining.seconds + ' Sekunden.'
        };
        
        var $hiddenLabel = $thisCountdown.find('.hidden');

        if ($hiddenLabel.length === 0) {
            $thisCountdown.append($('<p class="hidden"></p>'));
        }

        $hiddenLabel.text(labelTxt[language]);

    }

    function getTime() {
        
        /**
         *  Get and return the formatted current time.
         *
         *  @return {object} currentTime - the formatted time
         */
        
        var today       = new Date();
        var currentTime = {};
        
        currentTime.hours   = YOI.zeroPad(today.getHours()).toString();
        currentTime.minutes = YOI.zeroPad(today.getMinutes()).toString();
        currentTime.seconds = YOI.zeroPad(today.getSeconds()).toString();

        return currentTime;

    }
    
    function getTimeRemaining(endTime) {
        
        /**
         *  Get and return the formatted remaining time.
         *
         *  @param  {string} endTime - the complete iso date format like "January 1 2020 15:50:00 GMT+0002"
         *  @return {object}         - the formatted remaining time
         */
        
        // format output
        
        var total   = Date.parse(endTime) - Date.parse(new Date());
        var seconds = YOI.zeroPad(Math.floor((total / 1000) % 60 )).toString();
        var minutes = YOI.zeroPad(Math.floor((total / 1000 / 60) % 60 )).toString();
        var hours   = YOI.zeroPad(Math.floor((total / (1000 * 60 * 60)) % 24 )).toString();
        var days    = YOI.zeroPad(Math.floor(total / (1000 * 60 * 60 * 24))).toString();
        
        // return output
        
        return {
            'total'   : total,
            'days'    : days,
            'hours'   : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
      
    }
    
    function setLcdCharacters($thisCountdown, timeRemaining) {

        /**
         *  Set or update the lcd-style characters of the countdown clock.
         *
         *  @param {jQuery dom object} $thisCountdown - the countdown
         *  @param {object} timeRemaining             - the formatted remaining time
         */

        // check if clock already exists

        var foundClock = $thisCountdown.find('.countdown__clock').length === 0 ? false : true;

        // generate the lcd character map

        var lcdCharacters = {
            'days' : [
                'countdown--' + timeRemaining.days.charAt(0),
                'countdown--' + timeRemaining.days.charAt(1)
            ],
            'hours' : [
                'countdown--' + timeRemaining.hours.charAt(0),
                'countdown--' + timeRemaining.hours.charAt(1)
            ],
            'minutes' : [
                'countdown--' + timeRemaining.minutes.charAt(0),
                'countdown--' + timeRemaining.minutes.charAt(1)
            ],
            'seconds' : [
                'countdown--' + timeRemaining.seconds.charAt(0),
                'countdown--' + timeRemaining.seconds.charAt(1)
            ]
        };

        // add the characters

        if (foundClock) {
            
            // update the css class names inside the existing clock

            for (var i = 0; i < Object.keys(lcdCharacters).length; i++) {

                var unit     = Object.keys(lcdCharacters)[i];
                var selector = '.countdown__' + unit + ' .countdown__character';

                if (timeRemaining.total > 0) {
                    $thisCountdown.find(selector).eq(0).attr('class', 'countdown__character ' + lcdCharacters[unit][0]);
                    $thisCountdown.find(selector).eq(1).attr('class', 'countdown__character ' + lcdCharacters[unit][1]);
                } else {
                    $thisCountdown.find(selector).eq(0).attr('class', 'countdown__character countdown--empty');
                    $thisCountdown.find(selector).eq(1).attr('class', 'countdown__character countdown--empty');
                }
            
            }

        } else {
            
            // reference the countdown clock
            
            var $thisCountdownClock = $countdownClock.clone();
            
            // add the lcd characters
            
            for (var i = 0; i < Object.keys(lcdCharacters).length; i++) {
            
                var unit            = Object.keys(lcdCharacters)[i];
                var $countdownChars = $('<div></div>').addClass('countdown__' + unit);
                var $countdownLabel = createCountdownCharacterLabel(unit);
                
                if (timeRemaining.total > 0) {
                    $countdownChars.append($countdownCharacter.clone().addClass(lcdCharacters[unit][0]));
                    $countdownChars.append($countdownCharacter.clone().addClass(lcdCharacters[unit][1]));
                } else {
                    $countdownChars.append($countdownCharacter.clone().addClass('countdown--empty'));
                    $countdownChars.append($countdownCharacter.clone().addClass('countdown--empty'));
                }
                
                $countdownChars.append($countdownLabel);
                $thisCountdownClock.append($countdownChars);
                
            }
            
            // add the countdown clock
            
            $thisCountdown.append($thisCountdownClock);
            
        }
        
    };
    
    function createCountdownCharacterLabel(unit) {
        
        /**
         *  Return a clock label (eg. "hours") as jQuery dom element.
         *
         *  @param  {string} unit              - "days" | "hours" | "minutes" | "seconds"
         *  @return {jQuery dom object} $label - the label
         */
        
        var $label   = $countdownCharacterLabel.clone();
        var language = YOI.locale();
        
        $label.text(clockLabels[language][unit])
        
        return $label;
        
    }

    // initialize
    // ==========

    initializeCountdown();

    // public functions
    // ================

    return {
        init : initializeCountdown
    }

})();