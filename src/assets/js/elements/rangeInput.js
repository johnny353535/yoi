/** rangeInput.js */

YOI.RangeInput = (function() {

    // private vars
    // ============

    var knobOffset;
    var $document = $(document);
    var $body     = $('body');

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

    function initialize($rangeInput, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $rangeInput
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {number} absMin - absolut min value
         *  @option {number} absMax - absolut max value
         *  @option {number} min    - initial min value
         *  @option {number} max    - initial max value
         *  @option {string} unit   - a symbol for the unit ("$", "mm", etc.) as postfix for .rangeInput__label)
         */
        
        var $rangeInput = YOI.createCollection('rangeinput', $rangeInput, options);

        if ($rangeInput) $rangeInput.each(function() {

            var $thisRangeInput = $(this);
            var options         = $thisRangeInput.data().options;

            // attach events to range knobs

            rangeInputKnob
                .on('mousedown', function(e) {

                    var $thisKnob = $(this);

                    storeCursorPos($thisRangeInput, $thisKnob, e.pageX);

                    $document
                        .on('mousemove', function(e) {
                            $body.addClass('noSelect');
                            $thisKnob.addClass('rangeInput__knob--active');
                            $thisRangeInput.addClass('rangeInput--active');
                            moveKnob($thisRangeInput, $thisKnob, e);
                        })
                        .on('mouseup', function(e) {
                            $body.removeClass('noSelect');
                            $thisKnob.removeClass('rangeInput__knob--active');
                            $thisRangeInput.removeClass('rangeInput--active');
                            $document.off('mousemove mouseup');
                        });

                })
                .on('mouseover', function() {
                    
                    var $thisKnob = $(this);
                    
                    $thisKnob.siblings('.rangeInput__knob').removeClass('rangeInput__knob--topMost');
                    $thisKnob.addClass('rangeInput__knob--topMost');
                    
                });

            // clone & append objects

            var $thisMinKnob = rangeInputKnob.clone('true').addClass('rangeInput__knob--min').append(rangeInputLabel.clone());
            var $thisMaxKnob = rangeInputKnob.clone('true').addClass('rangeInput__knob--max').append(rangeInputLabel.clone());
            var $singleLabel = rangeInputLabel.clone().addClass('rangeInput__label--single');
            var $thisTrack   = rangeInputTrack.clone();

            $thisRangeInput.append($thisMinKnob, $thisMaxKnob, $singleLabel, $thisTrack);

            // assign values to range input data().props object,
            // provide default values for some properties

            $thisRangeInput.data().props = {
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
            };
            
            // calculate the knob offset
            
            knobOffset = $thisRangeInput.find('.rangeInput__knob').first().outerWidth() / 2;

            // move knobs to initial position

            $thisRangeInput.find('.rangeInput__knob').each(function() {
                var $thisKnob = $(this);
                moveKnob($thisRangeInput, $thisKnob);
            });

            // register reset event

            $thisRangeInput.on('yoi-rangeinput:reset', function() {
                reset($thisRangeInput);
            });

        });

    }

    function set($rangeInput, absMin, absMax, min, max) {

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

        $thisRangeInput.data().props = {
            absMin : absMin,
            absMax : absMax,
            min    : min,
            max    : max
        };

        moveKnob($thisRangeInput, $thisMinKnob);
        moveKnob($thisRangeInput, $thisMaxKnob);

    }

    function reset($rangeInput) {

        /**
         *  Reset a range input. The knobs will move back into absolute min
         *  and absolute max positions.
         *
         *  @param {jQuery dom object} $rangeInput - the range input
         */

        var $thisRangeInput = $rangeInput;
        var props           = $thisRangeInput.data().props;
        var $thisMinKnob    = $thisRangeInput.find('.rangeInput__knob--min');
        var $thisMaxKnob    = $thisRangeInput.find('.rangeInput__knob--max');
        var thisAbsMin      = props.absMin;
        var thisAbsMax      = props.absMax;
        
        props.min = thisAbsMin;
        props.max = thisAbsMax;
        
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
        var props            = $thisRangeInput.data().props;
        var $thisMinLabel    = $thisRangeInput.find('.rangeInput__knob--min .rangeInput__label');
        var $thisMaxLabel    = $thisRangeInput.find('.rangeInput__knob--max .rangeInput__label');
        var $thisSingleLabel = $thisRangeInput.find('.rangeInput__label--single');

        // center labels

        $thisMinLabel.css('left', (($thisMinLabel.outerWidth() / -2) + knobOffset));
        $thisMaxLabel.css('left', (($thisMaxLabel.outerWidth() / -2) + knobOffset));
        $thisSingleLabel.css('left', (props.minPosX + (props.maxPosX - props.minPosX) / 2) - ($thisSingleLabel.outerWidth() / 2));

        // if labels "collide", switch to a single label
        // or cancel if minPosX or maxPosX is not yet defined

        if (props.minPosX === null || props.maxPosX === null) return;

        var minKnobRightEdge = props.minPosX + $thisMinLabel.outerWidth() / 2;
        var maxKnobLeftEdge  = props.maxPosX - $thisMaxLabel.outerWidth() / 2;

        if (minKnobRightEdge >= maxKnobLeftEdge) {
            $thisRangeInput.addClass('rangeInput--mergedLabels');
        } else {
            $thisRangeInput.removeClass('rangeInput--mergedLabels');
        }

    }

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
        
        var props = $rangeInput.data().props;
        var newCursorPos;

        if ($knob.hasClass('rangeInput__knob--min')) {
            newCursorPos = Math.floor(ePosX - props.offsetX) - props.minPosX;
        }

        if ($knob.hasClass('rangeInput__knob--max')) {
            newCursorPos = Math.floor(ePosX - props.offsetX) - props.maxPosX;
        }
        
        // update prop if value has changed and trigger custom event
        
        if (props.cursorOffset != newCursorPos) {
            props.cursorOffset = newCursorPos;
            $rangeInput.trigger('yoi-rangeinput:change');
        }
        
    }

    function moveKnob($rangeInput, $knob, e) {

        /**
         *  Moves a knob. Either while dragging or when directly
         *  set with specific values.
         *
         *  @param  {jQuery dom object} $rangeInput - the range input
         *  @param  {jQuery dom object} $knob       - the range input knob
         *  @param  {event}             ePosX       - the caller event
         *  @return {bool false}                    - returns false if props data is invalid
         */
        
        // abort if absMin is larger than absMax

        if ($rangeInput.data().props.absMin >= $rangeInput.data().props.absMax) return false;
        
        // gather dom elements, set some vars

        var $thisRangeInput = $rangeInput;
        var $thisKnob       = $knob;
        var $thisMinInput   = $thisRangeInput.find('input[name="min"]');
        var $thisMaxInput   = $thisRangeInput.find('input[name="max"]');
        var props           = $thisRangeInput.data().props;
        var isMinKnob       = $thisKnob.hasClass('rangeInput__knob--min');
        var isMaxKnob       = $thisKnob.hasClass('rangeInput__knob--max');
        var posX            = 0;
        var thisKnobValue   = null;

        if (e !== undefined) {
            
            // set knob position & value via dragging,
            // deal with cursor offset first

            if (props.cursorOffset > 0) e.pageX = e.pageX - props.cursorOffset;
            if (props.cursorOffset < 0) e.pageX = e.pageX + (props.cursorOffset * -1);

            // set position & value if knob is beeing dragged

            posX          = Math.floor(Math.min(Math.max(0, (e.pageX - props.offsetX)), props.width));
            var factor    = Math.floor((posX / props.width) * 100);
            thisKnobValue = Math.floor(((props.absMax - props.absMin) / 100) * factor + (props.absMin * 1));

        } else {

            // set position & value directly on function call

            var inputValue;

            if (isMinKnob) inputValue = props.min;
            if (isMaxKnob) inputValue = props.max;

            var range   = props.absMax - props.absMin;
            var factor  = props.width / range;
            var posX    = Math.ceil(factor * (inputValue - props.absMin));

            thisKnobValue = inputValue;

        }

        // update min knob

        if (isMinKnob) {

            if (e !== undefined) props.min = thisKnobValue;
            
            if (props.min < props.max) {
                $thisRangeInput.find('.rangeInput__range').css('left', posX);
                $thisKnob.find('.rangeInput__label').text(thisKnobValue + ' ' + props.unit);
                $thisMinInput.val(thisKnobValue);
                props.minPosX  = posX;
                props.minValue = thisKnobValue;
            }

        }

        // update max knob

        if (isMaxKnob) {

            if (e !== undefined) props.max = thisKnobValue;

            if (props.min < props.max) {
                $thisRangeInput.find('.rangeInput__range').css('right', props.width - posX);
                $thisKnob.find('.rangeInput__label').text(thisKnobValue + ' ' + props.unit);
                $thisMaxInput.val(thisKnobValue);
                props.maxPosX  = posX;
                props.maxValue = thisKnobValue;
            }

        }

        // update single label

        var thisSingleLabelTxt = props.minValue + props.unit + ' – ' + props.maxValue + props.unit;
        $thisRangeInput.find('.rangeInput__label--single').text(thisSingleLabelTxt);

        // finally, move the knob and adjust the labels

        if (props.min < props.max) {
            $thisKnob.css('left', posX - knobOffset);
            adjustLabels($thisRangeInput);
        }

    }

    // initialize
    // ==========

    initialize();

    // public functions

    return {
        init  : initialize,
        set   : set,
        reset : reset
    };

})();
