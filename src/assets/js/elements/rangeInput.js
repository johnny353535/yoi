/** rangeInput.js */

var RangeInput = (function() {

    // private vars
    // ============

    var knobOffset = 10;

    var rangeInputKnob = $('\
        <div class="rangeInput__knob"></div>\
    ');

    var rangeInputLabel = $('\
        <span class="rangeInput__label">0</span>\
    ');

    var rangeInputTrack = $('\
        <div class="rangeInput__track">\
            <div class="rangeInput__range"></div>\
        </div>\
    ');

    // private functions
    // =================

    function initializeRangeInput($rangeInput, options) {

        /**
         *  Initialize all *[data-rangeinput] found in the document (= function call without parameters)
         *  or target one or more specific *[data-rangeinput] (= function call with $rangeinput).
         *  $rangeinput must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $rangeinput - the range input(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div data-rangeinput="absMin:10;absMax:200;unit:$;">
         *
         *  Available options:
         *
         *  @option {number} absMin - absolut min value
         *  @option {number} absMax - absolut max value
         *  @option {number} min    - initial min value
         *  @option {number} max    - initial max value
         *  @option {string} unit   - a symbol for the unit ("$", "mm", etc.) as postfix for .rangeInput__label)
         */

        if (!($rangeInput instanceof jQuery)) {
            $rangeInput = $('[data-rangeinput]');
        }

        $rangeInput.each(function() {

            // gather dom elements

            var $documentBody = $('body');
            var $thisRangeInput = $(this);

            // options

            var options = options === undefined ? YOI.toObject($thisRangeInput.data('rangeinput')) : options;

            // attach events to range knobs

            rangeInputKnob
                .on('mousedown', function(e) {

                    var $thisKnob = $(this);

                    storeCursorPos($thisRangeInput, $thisKnob, e.pageX);

                    $(document)
                        .on('mousemove', function(e) {
                            $documentBody.addClass('noSelect');
                            $thisKnob.addClass('rangeInput__knob--active');
                            $thisRangeInput.addClass('rangeInput--active');
                            moveKnob($thisRangeInput, $thisKnob, e);
                        })
                        .on('mouseup', function(e) {
                            triggerFiltersUpdate($thisRangeInput);
                            $documentBody.removeClass('noSelect');
                            $thisKnob.removeClass('rangeInput__knob--active');
                            $thisRangeInput.removeClass('rangeInput--active');
                            $(document).off('mousemove mouseup');
                        });

                })
                .on('mouseover', function() {
                    $(this).siblings('.rangeInput__knob').removeClass('rangeInput__knob--topMost');
                    $(this).addClass('rangeInput__knob--topMost');
                });

            // clone & append objects

            var $thisMinKnob = rangeInputKnob.clone('true').addClass('rangeInput__knob--min').append(rangeInputLabel.clone());
            var $thisMaxKnob = rangeInputKnob.clone('true').addClass('rangeInput__knob--max').append(rangeInputLabel.clone());
            var $singleLabel = rangeInputLabel.clone().addClass('rangeInput__label--single');
            var $thisTrack   = rangeInputTrack.clone();

            $thisRangeInput.append($thisMinKnob, $thisMaxKnob, $singleLabel, $thisTrack);

            // assign data to range input,
            // provide default values for some properties

            $thisRangeInput.data({
                absMin     : (options.absMin !== undefined ? options.absMin : 0),
                absMax     : (options.absMax !== undefined ? options.absMax : 100),
                min        : (options.min !== undefined ? options.min : 0),
                max        : (options.max !== undefined ? options.max : 100),
                minValue   : null,
                maxValue   : null,
                unit       : (options.unit !== undefined ? options.unit : ''),
                offsetX    : Math.floor($thisTrack.offset().left),
                minPosX    : null,
                maxPosX    : null,
                cursorPosX : 0,
                width      : $thisTrack.width()
            });

            // move knobs to initial position

            $thisRangeInput.find('.rangeInput__knob').each(function() {
                var $thisKnob = $(this);
                moveKnob($thisRangeInput, $thisKnob);
            });

            // register reset event

            $thisRangeInput.on('rangeInput:reset', function() {
                RangeInput.reset($thisRangeInput);
            });

        });

    }

    function setRangeInput($rangeInput, absMin, absMax, min, max) {

        /**
         *  Set the range input to the provided values.
         *
         *  @param {jQuery dom object} $rangeInput - the range input
         *  @param {number}            absMin      - absolute min value
         *  @param {number}            absMax      - absolute max value
         *  @param {number}            min         - min value
         *  @param {number}            max         - max value
         */

        var $thisRangeInput = $rangeInput;
        var $thisMinKnob    = $thisRangeInput.find('.rangeInput__knob--min');
        var $thisMaxKnob    = $thisRangeInput.find('.rangeInput__knob--max');

        $thisRangeInput.data({
            absMin : absMin,
            absMax : absMax,
            min    : min,
            max    : max
        });

        moveKnob($thisRangeInput, $thisMinKnob);
        moveKnob($thisRangeInput, $thisMaxKnob);

    }

    function resetRangeInput($rangeInput) {

        /**
         *  Reset a range input. The knobs will move back into absolute min
         *  and absolute max positions.
         *
         *  @param {jQuery dom object} $rangeInput - the range input
         */

        var $thisRangeInput = $rangeInput;
        var $thisMinKnob    = $thisRangeInput.find('.rangeInput__knob--min');
        var $thisMaxKnob    = $thisRangeInput.find('.rangeInput__knob--max');

        var thisAbsMin = $thisRangeInput.data().absMin;
        var thisAbsMax = $thisRangeInput.data().absMax;

        $thisRangeInput.data({
            min : thisAbsMin,
            max : thisAbsMax
        });

        moveKnob($thisRangeInput, $thisMinKnob);
        moveKnob($thisRangeInput, $thisMaxKnob);

    }

    function adjustLabels($rangeInput) {

        /**
         *  Position & center labels above knobs. If the knobs
         *  get too close, the individual labels get merged into
         *  a single label.
         *
         *  @param {jQuery dom object} $rangeInput - the range input
         */

        var $thisRangeInput  = $rangeInput;
        var data             = $thisRangeInput.data();
        var $thisMinLabel    = $thisRangeInput.find('.rangeInput__knob--min .rangeInput__label');
        var $thisMaxLabel    = $thisRangeInput.find('.rangeInput__knob--max .rangeInput__label');
        var $thisSingleLabel = $thisRangeInput.find('.rangeInput__label--single');

        // center labels

        $thisMinLabel.css('left', (($thisMinLabel.outerWidth() / -2) + knobOffset));
        $thisMaxLabel.css('left', (($thisMaxLabel.outerWidth() / -2) + knobOffset));
        $thisSingleLabel.css('left', (data.minPosX + (data.maxPosX - data.minPosX) / 2) - ($thisSingleLabel.outerWidth() / 2));

        // if labels "collide", switch to a single label
        // or cancel if minPosX or maxPosX is not yet defined

        if (data.minPosX === null || data.maxPosX === null) return;

        var minKnobRightEdge = data.minPosX + $thisMinLabel.outerWidth() / 2;
        var maxKnobLeftEdge  = data.maxPosX - $thisMaxLabel.outerWidth() / 2;

        if (minKnobRightEdge >= maxKnobLeftEdge) {
            $thisRangeInput.addClass('rangeInput--mergedLabels');
        } else {
            $thisRangeInput.removeClass('rangeInput--mergedLabels');
        }

    };

    function storeCursorPos($rangeInput, $knob, ePosX) {

        /**
         *  Stores the cursor postion on mousedown on any knob.
         *  This information is used to correct offset between cursor
         *  position and knob center while dragging – to avoid the
         *  knobs to "jump into position".
         *
         *  @param {jQuery dom object} $rangeInput - the range input
         *  @param {jQuery dom object} $knob       - the range input knob
         *  @param {number}            ePosX       - the cursor x position
         */

        if ($knob.hasClass('rangeInput__knob--min')) {
            $rangeInput.data().cursorOffset = Math.floor(ePosX - $rangeInput.data().offsetX) - $rangeInput.data().minPosX;
        }

        if ($knob.hasClass('rangeInput__knob--max')) {
            $rangeInput.data().cursorOffset = Math.floor(ePosX - $rangeInput.data().offsetX) - $rangeInput.data().maxPosX;
        }

    };

    function moveKnob($rangeInput, $knob, e) {

        /**
         *  Moves a knob. Either while dragging or when directly
         *  set with specific values.
         *
         *  @param  {jQuery dom object} $rangeInput - the range input
         *  @param  {jQuery dom object} $knob       - the range input knob
         *  @param  {event}             ePosX       - the caller event
         *  @return {bool false}                    - returns false if data is invalid
         */

        // abort if data is clearly invalid

        if ($rangeInput.data().absMin >= $rangeInput.data().absMax) return false;

        // gather dom elements, set some vars

        var $thisRangeInput = $rangeInput;
        var $thisKnob       = $knob;
        var $thisMinInput   = $thisRangeInput.find('input[name="min"]');
        var $thisMaxInput   = $thisRangeInput.find('input[name="max"]');

        var data            = $thisRangeInput.data();
        var isMinKnob       = $thisKnob.hasClass('rangeInput__knob--min');
        var isMaxKnob       = $thisKnob.hasClass('rangeInput__knob--max');
        var posX            = 0;
        var thisKnobValue   = null;

        // set the knob position & value

        if (e !== undefined) {

            // deal with cursor offset first

            if (data.cursorOffset > 0) e.pageX = e.pageX - data.cursorOffset;
            if (data.cursorOffset < 0) e.pageX = e.pageX + (data.cursorOffset * -1);

            // set position & value if knob is beeing dragged

            posX          = Math.floor(Math.min(Math.max(0, (e.pageX - data.offsetX)), data.width));
            var factor    = Math.floor((posX / data.width) * 100);
            thisKnobValue = Math.floor(((data.absMax - data.absMin) / 100) * factor + (data.absMin * 1));

        } else {

            // set position & value if knob is set directly

            var inputValue;

            if (isMinKnob) inputValue = data.min;
            if (isMaxKnob) inputValue = data.max;

            var range   = data.absMax - data.absMin;
            var factor  = data.width / range;
            var posX    = Math.ceil(factor * (inputValue - data.absMin));

            thisKnobValue = inputValue;

        }

        // update min knob

        if (isMinKnob) {

            if (e !== undefined) data.min = thisKnobValue;

            if (data.min < data.max) {
                $thisRangeInput.find('.rangeInput__range').css('left', posX);
                $thisKnob.find('.rangeInput__label').text(thisKnobValue + ' ' + data.unit);
                $thisMinInput.val(thisKnobValue);
                data.minPosX = posX;
                data.minValue = thisKnobValue;
            }

        }

        // update max knob

        if (isMaxKnob) {

            if (e !== undefined) data.max = thisKnobValue;

            if (data.min < data.max) {
                $thisRangeInput.find('.rangeInput__range').css('right', data.width - posX);
                $thisKnob.find('.rangeInput__label').text(thisKnobValue + ' ' + data.unit);
                $thisMaxInput.val(thisKnobValue);
                data.maxPosX = posX;
                data.maxValue = thisKnobValue;
            }

        }

        // update single label

        var thisSingleLabelTxt = data.minValue + data.unit + ' – ' + data.maxValue + data.unit;
        $thisRangeInput.find('.rangeInput__label--single').text(thisSingleLabelTxt);

        // finally, move the knob and adjust the labels

        if (data.min < data.max) {
            $thisKnob.css('left', posX - knobOffset);
            adjustLabels($thisRangeInput);
        }

    };

    function triggerFiltersUpdate($rangeInput) {

        /**
         *  After knobs were dragged or set, apply the new values
         *  to search results / filtered data. Abort if no Filters
         *  are found.
         *
         *  @param  {jQuery dom object} $rangeInput - the range input
         *  @return {bool false}                    - returns false if the filters module isn't available
         */

        if (YOI.foundModule('Filters')) {

            $thisRangeInput = $rangeInput;
            $thisFilters = $thisRangeInput.closest('.filters');
            Filters.apply($thisFilters, false);

        } else {
            return false;
        }

    };

    // initialize
    // ==========

    initializeRangeInput();

    // public functions

    return {
        init  : initializeRangeInput,
        set   : setRangeInput,
        reset : resetRangeInput
    };

})();
