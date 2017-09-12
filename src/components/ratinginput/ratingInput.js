/** ratingInput.js */

YOI.component.RatingInput = (function() {

    // private vars
    // ============

    var $ratingSelect = $('\
        <span class="ratingInput__select">\
            <span class="ratingInput__star"></span>\
            <span class="ratingInput__star"></span>\
            <span class="ratingInput__star"></span>\
            <span class="ratingInput__star"></span>\
            <span class="ratingInput__star"></span>\
        </span>\
    ');

    // private functions
    // =================

    function initialize($ratingInput, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $ratingInput
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {number}  uid    - the unique identifier for each element - useful to identify
         *                             submitted data on the backend
         *  @option {boolean} locked - set "true" to "lock" the element and prevent editing
         *  @option {number}  score  - a number between 0 (not rated) and 5 (highest rating score)
         */
        
        var $ratingInput = YOI.createCollection('ratinginput', $ratingInput, options);

        if ($ratingInput) $ratingInput.each(function() {
            
            // cancel if already initialized
            
            if (YOI.isReady($(this))) return false;
            
            // proceed

            var $thisRatingInput  = $(this);
            var $thisRatingSelect = $ratingSelect.clone();
            var $thisRatingStars  = $thisRatingSelect.find('.ratingInput__star');

            // set the initial rating score

            setScore($thisRatingInput);
            
            // set the initial state
            
            if ($thisRatingInput.hasClass('ratingInput--locked')) {
                $thisRatingInput.data().state = 'locked';
            }

            // add events to the rating stars

            $thisRatingStars
                .on('mouseover', function() {
                    setScore($thisRatingInput, $(this).index() + 1);
                })
                .on('click', function() {
                    submitScore($thisRatingInput);
                    lock($thisRatingInput);
                });

            // add a cloned rating select interface to
            // each ratingInput

            $thisRatingInput.append($thisRatingSelect);
            
            // set initialized
            
            YOI.setReady($(this));

        });

    }

    function lock($ratingInput) {

        /**
         *  Lock the input to prevent further editing.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         */

        $ratingInput.addClass('ratingInput--locked');
        $ratingInput.data().state = 'locked';
        
        // fire custom event
        
        $ratingInput.trigger('yoi-rating-lock');

    }

    function unlock($ratingInput) {

        /**
         *  Unlock the input to make it editable.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         */

        $ratingInput.removeClass('ratingInput--locked');
        $ratingInput.data().state = 'unlocked';
        
        // fire custom event
        
        $ratingInput.trigger('yoi-rating-unlock');

    }

    function setScore($ratingInput, score) {

        /**
         *  Set the current rating by writing it to the internal
         *  jQuery.data() object. Also update CSS classnames to
         *  visualize the rating.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         *  @param {number}            score        - the rating score from 0 to 6 (optional, default = 0)
         */

        var options = $ratingInput.data().options;
        var state   = $ratingInput.data().state;
        var score   = score || options.score || getScoreFromModifier($ratingInput) || 0;
        
        if (state !== 'locked') {

            // update the score

            $ratingInput.data().options.score = score;

            // change css classes

            $ratingInput.removeClass('ratingInput--rated-1 ratingInput--rated-2 ratingInput--rated-3 ratingInput--rated-4 ratingInput--rated-5');
            $ratingInput.addClass('ratingInput--rated-' + score);

            // fire custom event
        
            $ratingInput.trigger('yoi-rating-change');
        
        }

    }
    
    function getScoreFromModifier($ratingInput) {
        
        /**
         *  Read the score from the .ratingInput--score-* modifier class.
         *
         *  @param  {jQuery dom object} $ratingInput - the rating input
         *  @return {number}            score        - the score
         */
        
        var score = null;
        
        if ($ratingInput.hasClass('ratingInput--rated-1')) score = 1;
        if ($ratingInput.hasClass('ratingInput--rated-2')) score = 2;
        if ($ratingInput.hasClass('ratingInput--rated-3')) score = 3;
        if ($ratingInput.hasClass('ratingInput--rated-4')) score = 4;
        if ($ratingInput.hasClass('ratingInput--rated-5')) score = 5;
        
        return score;
        
    }

    function submitScore($ratingInput) {

        /**
         *  This function is for demonstration purpose only. A proper
         *  submit method to the backend is still missing.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         */
        
        // fire custom event
        
        $ratingInput.trigger('yoi-rating-submit');

    }

    // public functions
    // ================

    return {
        init   : initialize,
        lock   : lock,
        unlock : unlock,
        set    : setScore
    };

})();