/** pickBtn.js */

YOI.PickBtn = (function() {

    // private vars
    // ============

    var $icon = $('<span class="pickBtn__icon"></span>');

    // private functions
    // =================

    function initializePickBtn($pickBtn) {

        /**
         *  Initialize all *[data-pickbtn] found in the document (= function call without parameters)
         *  or target one or more specific *[data-pickbtn] (= function call with $pickBtn).
         *  $pickBtn must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $pickBtn - the pick-button(s)
         */

        if (!($pickBtn instanceof jQuery)) {
            $pickBtn = $('[data-pickbtn]');
        }

        $pickBtn.each(function() {

            var $thisPickBtn = $(this);

            $thisPickBtn.find('input[type="radio"]').hide();
            $thisPickBtn.prepend($icon.clone());

            // prevent default event of <label>

            $thisPickBtn.find('label').on('click', function(e) {
                e.preventDefault();
            });

            // bind event to button

            $thisPickBtn.on('click', function(e) {
                e.preventDefault();
                activatePickBtn($thisPickBtn);
            });

        });

    }

    function activatePickBtn($thisPickBtn) {

        /**
         *  Switch a radio button to "active".
         *
         *  @param  {jQuery object} $thisPickBtn - the pick-button
         */

        var $icon       = $thisPickBtn.find('.pickBtn__icon');
        var $radioInput = $thisPickBtn.find('input[type="radio"]');
        var groupName   = $radioInput.attr('name');

        // reset all other buttons first

        $('input[name="' + groupName + '"]').closest('.pickBtn').removeClass('is--active');
        $('input[name="' + groupName + '"]').removeAttr('checked');
        $('input[name="' + groupName + '"]').prop('checked', false);

        // activate this button

        $radioInput.prop('checked', true);
        $radioInput.attr('checked', 'checked');
        $thisPickBtn.addClass('is--active');

        // blink the icon

        YOI.blink($icon);

    }

    // initialize
    // ==========

    initializePickBtn();

    // public functions
    // ================

    return {
        init : initializePickBtn
    }

})();
