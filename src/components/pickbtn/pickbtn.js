/** pickbutton.js */

YOI.component.PickButton = (function() {

    // private vars
    // ============

    var $icon = $('<span class="pickButton__icon"></span>');

    // private functions
    // =================

    function initialize($pickButton) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery element} $pickButton
         *  @param {object}         options
         */

        var $pickButton = YOI.createCollection('pickButton', $pickButton);

        if ($pickButton) $pickButton.each(function() {

            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // proceed

            var $thisPickButton = $(this);

            $thisPickButton.find('input[type="radio"]').hide();
            $thisPickButton.prepend($icon.clone());

            // prevent default event of <label>

            $thisPickButton.find('label').on('click', function(e) {
                e.preventDefault();
            });

            // bind event to button

            $thisPickButton.on('click', function(e) {
                e.preventDefault();
                activate($thisPickButton);
                $thisPickButton.trigger('yoi-pickbutton-change');
            });

            // set initialized

            YOI.setReady($(this));

        });

    }

    function activate($thisPickButton) {

        /**
         *  Switch a radio button to "active".
         *
         *  @param  {jQuery object} $thisPickButton - the pick-button
         */

        var $icon       = $thisPickButton.find('.pickButton__icon');
        var $radioInput = $thisPickButton.find('input[type="radio"]');
        var groupName   = $radioInput.attr('name');

        // reset all other buttons first

        $('input[name="' + groupName + '"]').closest('.pickButton').removeClass('is--active');
        $('input[name="' + groupName + '"]').removeAttr('checked');
        $('input[name="' + groupName + '"]').prop('checked', false);

        // activate this button

        $radioInput.prop('checked', true);
        $radioInput.attr('checked', 'checked');
        $thisPickButton.addClass('is--active');

        // blink the icon

        YOI.blink($icon);

    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();
