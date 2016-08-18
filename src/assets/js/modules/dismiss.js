/** dismiss.js */

var Dismiss = (function() {

    // private vars
    // ============

    var $btnDismiss;
    var onMobile = $(document.body).data('environment') === 'mobile';
    var btnLabelClose = Helper.locale === 'de' ? 'schliessen' : 'close';

    if (onMobile) {

        $btnDismiss = $('\
            <button class="btn btn--large btn--subtle">\
                <span class="hidden">' + btnLabelClose + '</span>\
                <i class="icon--006-s" aria-hidden="true"></i>\
            </button>\
        ');

    } else {

        $btnDismiss = $('\
            <button class="btn btn--subtle">\
                <span class="hidden">' + btnLabelClose + '</span>\
                <i class="icon--006-s" aria-hidden="true"></i>\
            </button>\
        ');

    }

    // private functions
    // =================

    function initializeDismissableElements() {

        /**
         *  Attaches a close-button to all elements that have
         *  a data-dismissable flag.
         */

        $('[data-dismissable]').each(function() {

            var $thisTarget = $(this);

            // attach button and events

            $btnDismiss
                .clone()
                .on('click', function(e) {
                    e.preventDefault();
                    dismiss($thisTarget);
                })
                .appendTo($thisTarget);

        });

    }

    function initializeDismissButtons() {

        /**
         *  Queries the document for buttons flagged with a
         *  data-dismiss attribute. Reads the target element
         *  from the data-attribute value.
         */

        $('[data-dismiss]').each(function() {

            var $thisTrigger = $(this);
            var options      = Helper.toObject($(this).data('dismiss'));
            var $thisTarget  = $(options.target);

            /**
             *  Available options:
             *
             *  @option {string} target - selector for target element
             */

            // attach events

            $thisTrigger.on('click', function(e) {
                e.preventDefault();
                dismiss($thisTarget);
            });

        });

    }

    function dismiss($thisTarget) {

        /**
         *  Close and remove any target element.
         *
         *  @param  {jQuery dom object} $thisTarget - the target element
         */

        $thisTarget.fadeOut(function() {
            $thisTarget.remove();
        });

    }

    // initialize
    // ==========

    initializeDismissableElements();
    initializeDismissButtons();

    // public functions
    // ================

    return {
        initElements : initializeDismissableElements,
        initBtns     : initializeDismissButtons,
        apply        : dismiss
    };

})();
