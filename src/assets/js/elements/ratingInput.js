YOI.RatingInput = (function() {

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

    function initializeRatingInput($ratingInput, options) {

        /**
         *  Initialize all *[data-ratinginput] found in the document (= function call without parameters)
         *  or target one or more specific *[data-ratinginput] (= function call with $ratingInput).
         *  $ratingInput must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div class="ratingInput" data-ratinginput="uid:1234;">
         *
         *  Available options:
         *
         *  @option {number}  uid    - the unique identifier for each element - useful to identify
         *                             submitted data on the backend
         *  @option {boolean} locked - set "true" to "lock" the element and prevent editing
         *  @option {number}  score  - a number between 0 (not rated) and 5 (highest rating score)
         */

        if (!($ratingInput instanceof jQuery)) {
            $ratingInput = $('[data-ratinginput]');
        }

        $ratingInput.each(function() {

            var $thisRatingInput  = $(this);
            var $thisRatingSelect = $ratingSelect.clone();
            var $thisRatingStars  = $thisRatingSelect.find('.ratingInput__star');

            // append data

            appendData($thisRatingInput);

            // set the initial rating score

            setRating($thisRatingInput, $ratingInput.data().score);

            // add events to the rating stars

            $thisRatingStars
                .on('mouseover', function() {
                    setRating($thisRatingInput, $(this).index() + 1);
                })
                .on('click', function() {
                    submitRating($thisRatingInput);
                    lock($thisRatingInput);
                });

            // add a cloned rating select interface to
            // each ratingInput

            $thisRatingInput.append($thisRatingSelect);

        });

    }

    function appendData($ratingInput) {

        /**
         *  Read the options from the markup (custom data-attribute) and
         *  write them to the internal jQuery.data() object.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         */

        var options = YOI.toObject($ratingInput.data('ratinginput'));

        $ratingInput.data({
            'uid'    : options.uid === undefined ? null : options.uid,
            'locked' : options.locked === undefined ? false : options.locked,
            'score'  : options.score === undefined ? 0 : options.score
        });

    }

    function lock($ratingInput) {

        /**
         *  Lock the input to prevent further editing.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         */

        $ratingInput.addClass('ratingInput--locked');
        $ratingInput.data().locked = true;

    }

    function unlock($ratingInput) {

        /**
         *  Unlock the input to make it editable.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         */

        $ratingInput.removeClass('ratingInput--locked');
        $ratingInput.data().locked = false;

    }

    function setRating($ratingInput, score) {

        /**
         *  Set the current rating by writing it to the internal
         *  jQuery.data() object. Also update CSS classnames to
         *  visualize the rating.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         *  @param {number}            score        - the rating score from 0 to 6
         */

        var locked = $ratingInput.data().locked;

        if (!locked) {

            // update the score

            $ratingInput.data().score = score;

            // change css classes

            $ratingInput.removeClass('ratingInput--rated-1 ratingInput--rated-2 ratingInput--rated-3 ratingInput--rated-4 ratingInput--rated-5');
            $ratingInput.addClass('ratingInput--rated-' + score);

        }

    }

    function submitRating($ratingInput) {

        /**
         *  This function is for demonstration purpose only. A proper
         *  submit method to the backend is still missing.
         *
         *  @param {jQuery dom object} $ratingInput - the rating input
         */

        var uid   = $ratingInput.data().uid;
        var score = $ratingInput.data().score;

        // console.log('id: ' + uid + ' | score: ' + score);

    }

    // initialize
    // ==========

    initializeRatingInput();

    // public functions
    // ================

    return {
        init   : initializeRatingInput,
        lock   : lock,
        unlock : unlock,
        set    : setRating,
        submit : submitRating
    }

})();