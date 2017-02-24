/** dismiss.js */

YOI.Dismiss = (function() {

    // private vars
    // ============

    var $dismissableElementCollection;
    var $dismissButton;
    var $btnDismiss;
    var btnLabelClose = YOI.locale === 'de' ? 'schliessen' : 'close';

    $btnDismiss = $('\
        <span class="btnDismiss">' + btnLabelClose + '</span>\
    ');

    // private functions
    // =================

    function initialize($dismissableElement) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $dismissableElement - the dismissable element(s)
         */

        if (!($dismissableElement instanceof jQuery)) {
            
            // if the init function is called without a valid matching jQuery element,
            // gather the matching elements from the dom. if no elements are found,
            // exit the script.
            
            $dismissableElementCollection = $('[data-dismissable]');
            if (!$dismissableElementCollection.length) return false;
            
        } else if ($dismissableElement instanceof jQuery) {
            
            // if the init function is called with a valid matching jQuery element,
            // add it to the element collection
            
            $dismissableElementCollection = $dismissableElementCollection.add($dismissableElement);
            
        }

        $dismissableElementCollection.each(function() {

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

    function dismiss($targetElement) {

        /**
         *  Close and remove any target element.
         *
         *  @param {jQuery dom object} $targetElement - the target element
         */

        if (!($targetElement instanceof jQuery)) return false;

        $targetElement.fadeOut(function() {
            $targetElement.trigger('yoi-dismissed');
            $targetElement.remove();
        });

    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init  : initialize,
        apply : dismiss
    };

})();
