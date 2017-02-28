/** filterBtns.js */

YOI.FilterBtns = (function() {

    // private functions
    // =================

    function initializeFilterBtns($filterBtns, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $dock
         *  @param {object}            options
         */

        var $filterBtns = YOI.createCollection('filterbtns', $filterBtns, options);

        if ($filterBtns) $filterBtns.each(function() {

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
                    
                    // set the state
                    
                    if ($thisBtn.hasClass('is--active')) {
                        $thisBtn.data().state = 'on';
                    } else {
                        $thisBtn.data().state = 'off';
                    }
                    
                    // add the event

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
        
        var state = $thisBtn.data().state;

        if (state === 'on') {
            $thisBtn.removeClass('is--active');
            $thisBtn.removeClass('filterBtns__btn--debounce');
            $thisBtn.trigger('yoi-filterbtn:on');
            $thisBtn.data().state = 'off';
        }
        
        if (state === 'off') {
            $thisBtn.addClass('is--active');
            $thisBtn.addClass('filterBtns__btn--debounce');
            $thisBtn.trigger('yoi-filterbtn:off');
            $thisBtn.data().state = 'on';
        }

    }

    function removeBtnFilter($thisBtn) {

        /**
         *  Remove the button and show an activity message.
         *
         *  @param  {jQuery dom object} $thisBtn - the filter button
         */

        $thisBtn.fadeOut('fast');
        $thisBtn.trigger('yoi-filterbtn:remove');

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
