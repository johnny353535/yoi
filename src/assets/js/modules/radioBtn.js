/** radioBtn.js */

var RadioBtn = (function() {

    // private vars
    // ============

    var $icon = $('<i aria-hidden="true" class="icon--011-s"></i>');

    // private functions
    // =================

    function initializeRadioBtn($radioBtn) {

        /**
         *  Initialize all *[data-radioBtn] found in the document (= function call without parameters)
         *  or target one or more specific *[data-radioBtn] (= function call with $radioBtn).
         *  $radioBtn must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $radioBtn - the radio button(s)
         */

        if (!($radioBtn instanceof jQuery)) {
            $radioBtn = $('[data-radiobtn]');
        }

        $radioBtn.each(function() {

            var $thisRadioBtn = $(this);

            $thisRadioBtn.find('input[type="radio"]').hide();
            $thisRadioBtn.prepend($icon.clone());

            // prevent default event of <label>

            $thisRadioBtn.find('label').on('click', function(e) {
                e.preventDefault();
            });

            // bind event to button

            $thisRadioBtn.on('click', function(e) {
                e.preventDefault();
                activateRadioBtn($thisRadioBtn);
            });

        });

    }

    function activateRadioBtn($thisRadioBtn) {

        /**
         *  Switch a radio button to "active".
         *
         *  @param  {jQuery object} $thisRadioBtn - the button
         */

        var $icon       = $thisRadioBtn.find('[class^="icon"]');
        var $radioInput = $thisRadioBtn.find('input[type="radio"]');
        var groupName   = $radioInput.attr('name');

        // reset all other buttons first

        $('input[name="' + groupName + '"]').closest('.radioBtn').removeClass('is--active');
        $('input[name="' + groupName + '"]').removeAttr('checked');

        // activate this button

        $radioInput.prop('checked', true);
        $radioInput.attr('checked', 'checked');
        $thisRadioBtn.addClass('is--active');

        // blink the icon

        YOI.blink($icon);

    }

    // initialize
    // ==========

    initializeRadioBtn();

    // public functions
    // ================

    return {
        init : initializeRadioBtn
    }

})();
