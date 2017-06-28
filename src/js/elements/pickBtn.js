/** pickBtn.js */

YOI.element.PickBtn = (function() {

    // private vars
    // ============

    var $icon = $('<span class="pickBtn__icon"></span>');

    // private functions
    // =================

    function initialize($pickBtn) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $pickBtn
         *  @param {object}            options
         */
        
        var $pickBtn = YOI.createCollection('pickBtn', $pickBtn);

        if ($pickBtn) $pickBtn.each(function() {

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
                activate($thisPickBtn);
                $thisPickBtn.trigger('yoi-pickbtn-change');
            });

        });

    }

    function activate($thisPickBtn) {

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

    // public functions
    // ================

    return {
        init : initialize
    };

})();
