/** radioBtn.js */

var RadioBtn = (function() {

    // private vars
    // ============

    var $icon = $('<i aria-hidden="true" class="icon--011-s"></i>');

    // private functions
    // =================

    function initializeRadioBtns() {

        /**
         *  Initialize all radio buttons by preparing the dom
         *  and attaching events.
         */

        $('.radioBtn').has('input[type="radio"]').each(function() {

            var $thisBtn = $(this);

            $thisBtn.find('input[type="radio"]').hide();
            $thisBtn.prepend($icon.clone());

            // prevent default event of <label>

            $thisBtn.find('label').on('click', function(e) {
                e.preventDefault();
            });

            // bind event to button

            $thisBtn.on('click', function(e) {
                e.preventDefault();
                activateRadioBtn($thisBtn);
            });

        });

    }

    function activateRadioBtn($thisBtn) {

        /**
         *  Switch a radio button to "active".
         *
         *  @param  {jQuery object} $thisbtn - the button
         */

        var $icon       = $thisBtn.find('[class^="icon"]');
        var $radioInput = $thisBtn.find('input[type="radio"]');
        var groupName   = $radioInput.attr('name');

        // reset all other buttons first

        $('input[name="' + groupName + '"]').closest('.radioBtn').removeClass('radioBtn--active');
        $('input[name="' + groupName + '"]').removeAttr('checked');

        // activate this button

        $radioInput.prop('checked', true);
        $radioInput.attr('checked', 'checked');
        $thisBtn.addClass('radioBtn--active');

        // blink the icon

        Helper.blink($icon);

    }

    // initialize
    // ==========

    initializeRadioBtns();

    // public functions
    // ================

    return {
        init : initializeRadioBtns
    }

})();
