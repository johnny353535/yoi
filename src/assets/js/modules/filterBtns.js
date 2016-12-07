/** filterBtns.js */

var FilterBtns = (function() {

    // private functions
    // =================

    function initializeFilterBtns($filterBtns) {
        
        /**
         *  Initialize all *[data-filterbtns] found in the document (= function call without parameters)
         *  or target one or more specific *[data-filterbtns] (= function call with $dock).
         *  $filterBtns must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $filterBtns - the filterbutton group(s)
         */
        
        if (!($filterBtns instanceof jQuery)) {
            $filterBtns = $('[data-filterbtns]');
        }

        $filterBtns.each(function() {

            var $thisFilterBtns = $(this);

            if ($thisFilterBtns.hasClass('filterBtns--removeable')) {

                // add events for removeable buttons

                $thisFilterBtns.find('.filterBtns__btn').each(function() {

                    var $thisBtn = $(this);

                    $thisBtn.on('click', function(e) {
                        e.preventDefault();
                        removeBtnFilter($thisBtn);
                    });

                });

            } else {

                // add events for regular buttons

                $thisFilterBtns.find('.filterBtns__btn').each(function() {

                    var $thisBtn = $(this);

                    $thisBtn.on('click', function(e) {
                        e.preventDefault();
                        toggleBtnFilter($thisBtn);
                    });

                    $thisBtn.on('mouseout', function(e) {

                        /*
                         *  If you click a button, it will immediately switch to
                         *  it's mouseover styling. This is not desired, hence logically,
                         *  you click "add" and get "remove".
                         *  Therefore, we need this debouce class, which overrides the
                         *  :hover state but gets removed on mouse out.
                         */

                        e.preventDefault();
                        $thisBtn.removeClass('filterBtns__btn--debounce');
                    });

                });

            }

        });

    }

    function toggleBtnFilter($thisBtn) {

        /**
         *  Mark the button active or inactive, depending
         *  on it's current state. Show an activity message.
         *
         *  @param  {jQuery dom object} $thisBtn - the filter button
         */

        if ($thisBtn.hasClass('is--active')) {
            $thisBtn.removeClass('is--active');
            $thisBtn.removeClass('filterBtns__btn--debounce');
        } else {
            $thisBtn.addClass('is--active');
            $thisBtn.addClass('filterBtns__btn--debounce');
        }

    }

    function removeBtnFilter($thisBtn) {

        /**
         *  Remove the button and show an activity message.
         *
         *  @param  {jQuery dom object} $thisBtn - the filter button
         */

        $thisBtn.fadeOut('fast');

    }

    // initialize
    // ==========

    initializeFilterBtns();

    // public functions
    // ================

    return {
        init : initializeFilterBtns
    }

})();
