/** microSubmit.js */

YOI.MicroSubmit = (function() {

    // private vars
    // ============

    var $response = $('\
        <span class="tc-green-12 fw-bold">OK</span>\
    ');

    // private functions
    // =================

    function initializeMicroSubmit($microSubmit, options) {

        /**
         *  Initialize all form[data-microsubmit] found in the document (= function call without parameters)
         *  or target one or more specific form[data-microsubmit] (= function call with $microSubmit).
         *  $microSubmit must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $microSubmit - the micro submit form(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <form data-microsubmit="response:#myCustomResponse;"></form>
         *
         *  Available options:
         *
         *  @option {string} response - a CSS selector (most likely an #id) to select the dom
         *                              element which is displayed after submit
         */

        if (!($microSubmit instanceof jQuery)) {
            $microSubmit = $('form[data-microsubmit]');
        }

        $microSubmit.each(function() {

            var $thisForm       = $(this);
            var options         = options === undefined ? YOI.toObject($thisForm.data('microsubmit')) : options;
            var receiver        = $thisForm.attr('action') !== undefined ? $thisForm.attr('action') : false;
            var thisMessage     = $thisForm.find('input').val();
            var $thisResponse   = $(options.response).length ? $(options.response) : $response.clone();

            // hide response content first

            YOI.hide($thisResponse);

            // cancel if no target url (for ajax send) was found

            if (!receiver) return false;

            // submit form, show msg

            $thisForm.submit(function(e) {

                e.preventDefault();

                $.ajax({
                    url: receiver,
                    type: 'POST',
                    data: {
                        input: thisMessage
                    },
                    complete: function(response){
                        $thisForm.replaceWith($thisResponse);
                        YOI.show($thisResponse);
                    }
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

    initializeMicroSubmit();

    // public functions
    // ================

    return {
        init : initializeMicroSubmit
    }

})();
