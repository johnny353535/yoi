/** filterBtns.js */

var FilterBtns = (function() {

    // private functions
    // =================

    function initializeFilterBtns() {

        /**
         *  Initialize the filter buttons by preparing the dom
         *  and attaching events.
         */

        $('.filterBtns').each(function() {

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

        if ($thisBtn.hasClass('filterBtns__btn--active')) {
            $thisBtn.removeClass('filterBtns__btn--active');
            $thisBtn.removeClass('filterBtns__btn--debounce');
        } else {
            $thisBtn.addClass('filterBtns__btn--active');
            $thisBtn.addClass('filterBtns__btn--debounce');
        }

        if(Helper.foundModule('NavBar'))
            NavBar.showMsg('Filter angewandt.');

    }

    function removeBtnFilter($thisBtn) {

        /**
         *  Remove the button and show an activity message.
         *
         *  @param  {jQuery dom object} $thisBtn - the filter button
         */

        $thisBtn.fadeOut('fast', function() {

            if(Helper.foundModule('NavBar'))
                NavBar.showMsg('Filter angewandt.');

        });

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
