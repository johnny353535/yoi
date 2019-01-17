/** filterbuttons.js */

YOI.component.FilterButtons = (function() {

    // private functions
    // =================

    function initialize($filterButtons, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery element} $dock
         *  @param {object}         options
         */

        var $filterButtons = YOI.createCollection('filterbuttons', $filterButtons, options);

        if ($filterButtons) $filterButtons.each(function() {

            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // proceed

            var $thisFilterButtons = $(this);

            if ($thisFilterButtons.hasClass('filterButtons--removeable')) {

                // add events for removeable buttons

                $thisFilterButtons.find('.filterButtons__button').each(function() {

                    var $thisButton = $(this);

                    $thisButton.on('click', function(e) {
                        e.preventDefault();
                        remove($thisButton);
                    });

                });

            } else {

                // add events for regular buttons

                $thisFilterButtons.find('.filterButtons__button').each(function() {

                    var $thisButton = $(this);

                    // set the state

                    if ($thisButton.hasClass('is--active')) {
                        $thisButton.data().state = 'on';
                    } else {
                        $thisButton.data().state = 'off';
                    }

                    // add the event

                    $thisButton.on('click', function(e) {
                        e.preventDefault();
                        toggle($thisButton);
                    });

                    $thisButton.on('mouseout', function(e) {

                        /*
                         *  If you click a button, it will immediately switch to
                         *  it's mouseover styling. This is not desired, hence logically,
                         *  you click "add" and get "remove".
                         *  Therefore, we need this debouce class, which overrides the
                         *  :hover state but gets removed on mouse out.
                         */

                        e.preventDefault();
                        $thisButton.removeClass('filterButtons__button--debounce');

                    });

                });

            }

            // set initialized

            YOI.setReady($(this));

        });

    }

    function toggle($thisButton) {

        /**
         *  Mark the button active or inactive, depending
         *  on it's current state. Show an activity message.
         *
         *  @param  {jQuery element} $thisButton - the filter button
         */

        var state = $thisButton.data().state;

        if (state === 'on') {
            $thisButton.removeClass('is--active');
            $thisButton.removeClass('filterButtons__button--debounce');
            $thisButton.trigger('yoi-filterbutton-on');
            $thisButton.data().state = 'off';
        }

        if (state === 'off') {
            $thisButton.addClass('is--active');
            $thisButton.addClass('filterButtons__button--debounce');
            $thisButton.trigger('yoi-filterbutton-off');
            $thisButton.data().state = 'on';
        }

    }

    function remove($thisButton) {

        /**
         *  Remove the button and show an activity message.
         *
         *  @param  {jQuery element} $thisButton - the filter button
         */

        $thisButton.fadeOut('fast');
        $thisButton.trigger('yoi-filterbutton-remove');

    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();
