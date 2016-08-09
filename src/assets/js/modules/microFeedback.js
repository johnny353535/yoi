/** microFeeedback.js */

var MicroFeedback = (function() {

    // private vars
    // ============

    var msgSuccess = Helper.locale === 'de' ? 'Danke für Ihre Einschätzung.' : 'Thank you.';

    var $successMsg = $('\
        <span class="microFeedback__msg positive">\
            <i class="icon--011-s" aria-hidden="true"></i>\
            <b>' + msgSuccess + '</b>\
        </span>\
    ');

    // private functions
    // =================

    function initializeMicroFeedback() {

        /**
         *  Initialize by preparing the dom and attaching events.
         */

        $('.microFeedback').each(function() {

            var $thisForm = $(this).find('form');

            // submit form, show msg

            $thisForm.on('submit', function(e) {

                e.preventDefault();

                $thisForm.fadeOut('slow', function() {
                    $successMsg.clone().replaceAll($thisForm);
                });

            });

            /**
             *  It doesn't add any value to display an error message.
             *  Even if the submission fails, let's pretend it worked all fine.
             *  It's much better to track these errors internally.
             */

        });

    }

    // initialize
    // ==========

    initializeMicroFeedback();

    // public functions
    // ================

    return {
        init : initializeMicroFeedback
    }

})();
