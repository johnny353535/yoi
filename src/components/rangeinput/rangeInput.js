/** rangeInput.js */

YOI.component.RangeInput = (function() {

    // private vars
    // ============

    var knobOffset;
    var $document = $(document);
    var $body     = $('body');

    var rangeInputKnob = $('\
        <div class="rangeInput__knob"></div>\
    ');

    var rangeInputLabel = $('\
        <span class="rangeInput__label"></span>\
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
         *  @option {number} absMin - absolute min value
         *  @option {number} absMax - absolute max value
         *  @option {number} min    - initial min value
         *  @option {number} max    - initial max value
         *  @option {string} unit   - a symbol for the unit ("$", "mm", etc.) as postfix for .rangeInput__label)
         */
        
        var $rangeInput = YOI.createCollection('rangeinput', $rangeInput, options);

        if ($rangeInput) $rangeInput.each(function() {
            
            // cancel if already initialized
            
            if (YOI.isReady($(this))) return false;
            
            // proceed

            var $thisRangeInput = $(this);
            var options         = $thisRangeInput.data().options;
            
            var $thisMinKnob;
            var $thisMaxKnob;
            var $singleLabel;
            var $thisTrack;

            // attach events to range knobs

            rangeInputKnob
                .on('mousedown', function(e) {
                    
                    // make sure the correct elements get referenced

                    var $thisKnob       = $(this);
                    var $thisRangeInput = $(this).closest('.rangeInput');
                    
                    // store cursor position

                    storeCursorPos($thisRangeInput, $thisKnob, e.pageX);

                    // attach event listeners to the document

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

            $thisMinKnob = rangeInputKnob.clone('true').addClass('rangeInput__knob--min').append(rangeInputLabel.clone());
            $thisMaxKnob = rangeInputKnob.clone('true').addClass('rangeInput__knob--max').append(rangeInputLabel.clone());
            $singleLabel = rangeInputLabel.clone().addClass('rangeInput__label--single');
            $thisTrack   = rangeInputTrack.clone();
            
            $thisRangeInput.append($thisMinKnob, $thisMaxKnob, $singleLabel, $thisTrack);

            // assign values to range input data().props object,
            // provide default values for some properties

            $thisRangeInput.data().props = {
                absMin     : (options.absMin || 0),
                absMax     : (options.absMax || 100),
                min        : (options.min || options.absMin || 0),
                max        : (options.max || options.absMax || 100),
                minValue   : null,
                maxValue   : null,
                unit       : (options.unit || ''),
                offsetX    : Math.floor($thisTrack.offset().left),
                minPosX    : null,
                maxPosX    : null,
                cursorPosX : 0,
                width      : $thisTrack.width()
            };
            
            // calculate the knob offset, save to global variable

            knobOffset = $thisRangeInput.find('.rangeInput__knob').first().outerWidth() / 2;
            
            // move knobs to initial position

            set(
                $thisRangeInput,
                $thisRangeInput.data().props.absMin,
                $thisRangeInput.data().props.absMax,
                $thisRangeInput.data().props.min,
                $thisRangeInput.data().props.max
            );
            
            // set initialized
            
            YOI.setReady($(this));

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
        var thisProps       = $thisRangeInput.data().props;
        
        // update props
        
        thisProps.absMin    = absMin
        thisProps.absMax    = absMax
        thisProps.min       = min
        thisProps.max       = max
        
        // move knobs

        moveKnob($thisRangeInput, $thisMinKnob);
        moveKnob($thisRangeInput, $thisMaxKnob);
        
        // trigger custom event
        
        $rangeInput.trigger('yoi-rangeinput-change');

    }

    function reset($rangeInput) {

        /**
         *  Reset a range input. The knobs will move back into absolute min
         *  and absolute max positions.
         *
         *  @param {jQuery dom object} $rangeInput - the range input
         */

        var $thisRangeInput = $rangeInput;
        var thisProps       = $thisRangeInput.data().props;
        var $thisMinKnob    = $thisRangeInput.find('.rangeInput__knob--min');
        var $thisMaxKnob    = $thisRangeInput.find('.rangeInput__knob--max');
        var thisAbsMin      = props.absMin;
        var thisAbsMax      = props.absMax;
        
        thisProps.min = thisAbsMin;
        thisProps.max = thisAbsMax;
        
        moveKnob($thisRangeInput, $thisMinKnob);
        moveKnob($thisRangeInput, $thisMaxKnob);
        
        // trigger custom event
        
        $rangeInput.trigger('yoi-rangeinput-reset');

    }

    function adjustLabels($rangeInput) {
        
        /**
         *  Position & center labels above knobs. If the knobs
         *  get too close, the individual labels get merged into
         *  a single label. Also update the label text.
         *
         *  @param {jQuery dom object} $rangeInput - the range input
         */

        var $thisRangeInput  = $rangeInput;
        var $thisMinLabel    = $thisRangeInput.find('.rangeInput__knob--min .rangeInput__label');
        var $thisMaxLabel    = $thisRangeInput.find('.rangeInput__knob--max .rangeInput__label');
        var $thisSingleLabel = $thisRangeInput.find('.rangeInput__label--single');
        var props            = $thisRangeInput.data().props;
        
        var minKnobRightEdge;
        var maxKnobLeftEdge;
        
        // update label text
        
        $thisMinLabel.text(props.min + ' ' + props.unit);
        $thisMaxLabel.text(props.max + ' ' + props.unit);
        $thisSingleLabel.text(props.minValue + props.unit + ' – ' + props.maxValue + ' ' + props.unit);

        // center labels
        
        var minLabelWidth    = $thisMinLabel.outerWidth();
        var maxLabelWidth    = $thisMaxLabel.outerWidth();
        var singleLabelWidth = $thisSingleLabel.outerWidth();

        $thisMinLabel.css('left', ((minLabelWidth / -2) + knobOffset));
        $thisMaxLabel.css('left', ((maxLabelWidth / -2) + knobOffset));
        $thisSingleLabel.css('left', (props.minPosX + (props.maxPosX - props.minPosX) / 2) - (singleLabelWidth / 2));
        
        // if labels "collide", switch to a single label
        // or cancel if minPosX or maxPosX is not yet defined

        if (props.minPosX === null || props.maxPosX === null) return;

        minKnobRightEdge = props.minPosX + minLabelWidth / 2;
        maxKnobLeftEdge  = props.maxPosX - maxLabelWidth / 2;

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
        var factor;
        var inputValue;
        var range;
        
        if (e !== undefined) {
            
            // set knob position & value via dragging,
            // deal with cursor offset first

            if (props.cursorOffset > 0) e.pageX = e.pageX - props.cursorOffset;
            if (props.cursorOffset < 0) e.pageX = e.pageX + (props.cursorOffset * -1);

            // set position & value if knob is beeing dragged

            posX          = Math.floor(Math.min(Math.max(0, (e.pageX - props.offsetX)), props.width));
            factor        = Math.floor((posX / props.width) * 100);
            thisKnobValue = Math.floor(((props.absMax - props.absMin) / 100) * factor + (props.absMin * 1));
            
            // trigger custom event
            
            $thisRangeInput.trigger('yoi-rangeinput-change');

        } else {

            // set position & value directly on function call
            
            if (isMinKnob) inputValue = props.min;
            if (isMaxKnob) inputValue = props.max;

            range         = props.absMax - props.absMin;
            factor        = Math.ceil(props.width / range);
            posX          = factor * (inputValue - props.absMin);
            thisKnobValue = inputValue;

        }

        // update min knob

        if (isMinKnob) {

            if (e !== undefined) props.min = thisKnobValue;
            
            if (props.min < props.max) {
                
                $thisRangeInput.find('.rangeInput__range').css('left', posX);
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
                $thisMaxInput.val(thisKnobValue);
                
                props.maxPosX  = posX;
                props.maxValue = thisKnobValue;
                
            }

        }

        // finally, move the knob and adjust the labels

        if (props.min < props.max) {
            $thisKnob.css('left', posX - knobOffset);
            adjustLabels($thisRangeInput);
        }

    }

    // public functions

    return {
        init  : initialize,
        set   : set,
        reset : reset
    };

})();
