/** countdown.js */

YOI.element.Countdown = (function() {

    // localization
    
    var language = YOI.locale();
    
    var localization = {
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

    function initialize($countdown, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $countdown
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {string} timezone - ISO 8601 time zone
         *  @option {string} year     - end year (ISO 8601)
         *  @option {string} month    - end month (ISO 8601)
         *  @option {string} day      - end day (ISO 8601)
         *  @option {string} hour     - end hour (ISO 8601)
         *  @option {string} minute   - end minute (ISO 8601)
         *  @option {string} second   - end second (ISO 8601)
         */
        
        var $countdown = YOI.createCollection('countdown', $countdown, options);

        if ($countdown) $countdown.each(function(index) {
            
            var $thisCountdown  = $(this);
            var options         = $thisCountdown.data().options;
            var defaultTimezone = "GMT+0002";
            var defaultYear     = new Date().getFullYear();
            var defaultMonth    = 1;
            var defaultDay      = 1;
            var defaultHour     = 12;
            var defaultMinute   = 0;
            var defaultSecond   = 0;
            var timezone        = options.timezone | defaultTimezone;
            var year            = options.year === undefined ? defaultYear : parseInt(options.year);
            var month           = options.month === undefined || parseInt(options.month) > 12 || parseInt(options.month) < 1 ? defaultMonth : parseInt(options.month);
            var day             = options.day === undefined || parseInt(options.day) > 31 || parseInt(options.day) < 1 ? defaultDay : parseInt(options.day);
            var hour            = options.hour === undefined || parseInt(options.hour) > 12 || parseInt(options.hour) < 1 ? defaultHour : parseInt(options.hour);
            var minute          = options.minute === undefined || parseInt(options.minute) > 60 || parseInt(options.minute) < 1 ? defaultMinute : parseInt(options.minute);
            var second          = options.second === undefined || parseInt(options.second) > 60 || parseInt(options.second) < 1 ? defaultSecond : parseInt(options.second);
            
            // write props
        
            $thisCountdown.data().props = {
                'endTime' : getDateString(month, day, year, hour, minute, second, timezone),
                'index'   : index
            };
            
            // render the countdown
            
            render($thisCountdown);

            // update the clock every second

            YOI.setInterval('countdownTimer-' + index, 1000, function() {
                update($thisCountdown);
            });

        });

    }
    
    function render($thisCountdown) {
        
        /**
         *  Create and append the countdown markup.
         *
         *  @param {jQuery dom object} $countdown
         */
        
        var endTime             = $thisCountdown.data().props.endTime;
        var timeRemaining       = getTimeRemaining(endTime);
        var lcdCharacters       = getLcdCharactersCSSClassNames(timeRemaining);
        var $hiddenLabel        = $thisCountdown.find('.countdown__hiddenLabel');
        var $thisCountdownClock = $countdownClock.clone();

        // add the lcd characters and labels

        for (var i = 0; i < Object.keys(lcdCharacters).length; i++) {

            var unit            = Object.keys(lcdCharacters)[i];
            var $countdownChars = $('<div></div>').addClass('countdown__' + unit);
            var $countdownLabel = getCharacterLabel(unit);

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
        
        // accessibility: create an additional, visually hidden
        // label for screen readers
        
        if ($hiddenLabel.length === 0) {
            $thisCountdown.append($('<p class="countdown__hiddenLabel"></p>'));
        }
        
    }
    
    function update($thisCountdown) {
        
        /**
         *  Update the countdown display.
         *
         *  @param {jQuery dom object} $countdown
         */
        
        var endTime       = $thisCountdown.data().props.endTime;
        var index         = $thisCountdown.data().props.index;
        var timeRemaining = getTimeRemaining(endTime);
        var language      = YOI.locale();
        var $hiddenLabel  = $thisCountdown.find('.countdown__hiddenLabel');
        
        // if countdown is expired, clear countdown interval and fire custom event

        if (timeRemaining.total <= 0) {
            YOI.clearInterval('countdownTimer-' + index);
            $thisCountdown.trigger('yoi-countdown-expire');
        }
        
        // get lcd character map

        var lcdCharacters = getLcdCharactersCSSClassNames(timeRemaining);
        
        // update the LCD characters
        
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
        
        // update hidden label

        var labelTxt = {
            'en' : timeRemaining.days + ' days, ' + timeRemaining.hours + ' hours, ' + timeRemaining.minutes + ' minutes and ' + timeRemaining.seconds + ' seconds left.',
            'de' : 'Noch ' + timeRemaining.days + ' Tage, ' + timeRemaining.hours + ' Stunden, ' + timeRemaining.minutes + ' Minuten und ' + timeRemaining.seconds + ' Sekunden.'
        };

        $hiddenLabel.text(labelTxt[language]);
        
    }

    // function getTime() {
    //
    //     /**
    //      *  Get and return the formatted current time.
    //      *
    //      *  @return {object} currentTime - the formatted time
    //      */
    //
    //     var today       = new Date();
    //     var currentTime = {};
    //
    //     currentTime.hours   = YOI.zeroPad(today.getHours()).toString();
    //     currentTime.minutes = YOI.zeroPad(today.getMinutes()).toString();
    //     currentTime.seconds = YOI.zeroPad(today.getSeconds()).toString();
    //
    //     return currentTime;
    //
    // }
    
    function getDateString(month, day, year, hour, minute, second, timezone) {
        
        /**
         *  
         *
         *  @param  {}  - 
         *  @return {}  - 
         */
        
        var months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        
        var endTimeIsoString = months[month - 1] + ' ' + day + ' ' + year + ' ' + hour + ':' + minute + ':' + second + ' ' + timezone;
        
        return endTimeIsoString;

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
    
    function getLcdCharactersCSSClassNames(timeRemaining) {
        
        /**
         *  Returns an object with css the cass names for each LCD character.
         *
         *  @param  {object} timeRemaining - the remaining time (y/m/d/h/m/s)
         *  @return {object}               - a "lookup-table" with css class names
         */
        
        return {
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
        
    }

    function getCharacterLabel(unit) {

        /**
         *  Returns a clock label (eg. "hours") as jQuery dom element.
         *
         *  @param  {string} unit              - "days" | "hours" | "minutes" | "seconds"
         *  @return {jQuery dom object} $label - the label
         */

        var $label   = $countdownCharacterLabel.clone();

        $label.text(localization[language][unit]);

        return $label;

    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();