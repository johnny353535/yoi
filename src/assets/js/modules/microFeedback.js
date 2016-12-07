/** microSubmit.js */

var MicroSubmit = (function() {

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

    function initializeMicroSubmit($microSubmit) {
        
        /**
         *  Initialize all form[data-microsubmit] found in the document (= function call without parameters)
         *  or target one or more specific form[data-microsubmit] (= function call with $microSubmit).
         *  $microSubmit must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $microSubmit - the micro submit form(s)
         */
        
        // data:
        // endpoint
        // message

        if (!($microSubmit instanceof jQuery)) {
            $microSubmit = $('[data-microsubmit]');
        }

        $microSubmit.each(function() {

            var $thisForm  = $(this).find('form');
            var options    = Helper.toObject($thisForm.data('microsubmit'));
            var targetUrl  = options.url !== undefined ? options.url : false;
            var postData   = 'foo';
            var successMsg = options.successMsg !== undefined ? options.successMsg : false;
            
            // cancel if no target url (for ajax send) was found
            
            if (!targetUrl) return false;
            
            // submit form, show msg

            $thisForm.on('submit', function(e) {

                e.preventDefault();
                
                $.post(targetUrl,
                    {
                        s: term
                    }
                )
                .done(function( data ) {
                    $thisForm.fadeOut('slow', function() {
                        if ($successMsg) $successMsg.clone().replaceAll($thisForm);
                    });
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
