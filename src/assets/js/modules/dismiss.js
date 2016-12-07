/** dismiss.js */

var Dismiss = (function() {

    // private vars
    // ============

    var $btnDismiss;
    var btnLabelClose = Helper.locale === 'de' ? 'schliessen' : 'close';

    $btnDismiss = $('\
        <button class="btn btn--subtle">\
            <span class="hidden">' + btnLabelClose + '</span>\
            <i class="icon--006-s" aria-hidden="true"></i>\
        </button>\
    ');

    // private functions
    // =================

    function initializeDismissableElement($dismissableElement) {
        
        /**
         *  Attach a close-button to dismissable elements.
         *
         *  Initialize all *[data-dismissable] found in the document (= function call without parameters)
         *  or target one or more specific *[data-dismissable] (= function call with $dismissable).
         *  $dismissableElement must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $dismissableElement - the dismissable element(s)
         */
        
        if (!($dismissableElement instanceof jQuery)) {
            $dismissableElement = $('input[data-dismissable]');
        }

        $dismissableElement.each(function() {

            var $thisDismissableElement = $(this);

            // attach button and events

            $btnDismiss
                .clone()
                .on('click', function(e) {
                    e.preventDefault();
                    dismiss($thisDismissableElement);
                })
                .appendTo($thisDismissableElement);

        });

    }

    function initializeDismissButton($dismissButton) {
        
        /**
         *  Initialize all *[data-dismiss] found in the document (= function call without parameters)
         *  or target one or more specific *[data-dismiss] (= function call with $dismissButton).
         *  $dismissButton must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $dismissButton - the dismiss button(s)
         *  @option {string} target                   - selector for target element
         */
        
        if (!($dismissButton instanceof jQuery)) {
            $dismissButton = $('[data-dismiss]');
        }

        $dismissButton.each(function() {

            var $thisTrigger = $(this);
            var options      = Helper.toObject($(this).data('dismiss'));
            var $thisTarget  = $(options.target);

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
        
        if (!($thisTarget instanceof jQuery)) return false;

        $thisTarget.fadeOut(function() {
            $thisTarget.remove();
        });

    }

    // initialize
    // ==========

    initializeDismissableElement();
    initializeDismissButton();

    // public functions
    // ================

    return {
        initElements : initializeDismissableElement,
        initBtns     : initializeDismissButton,
        apply        : dismiss
    };

})();
