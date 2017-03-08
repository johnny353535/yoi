/** dismiss.js */

YOI.Dismiss = (function() {

    // private vars
    // ============

    var $btnDismiss;
    var btnLabelClose = YOI.locale === 'de' ? 'schliessen' : 'close';

    $btnDismiss = $('\
        <span class="btnDismiss">' + btnLabelClose + '</span>\
    ');

    // private functions
    // =================

    function initialize($dismissableElement, options) {
        
        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $dismissableElement
         *  @param {object}            options
         */
        
        var $dismissableElement = YOI.createCollection('dismissable', $dismissableElement, options);

        if ($dismissableElement) $dismissableElement.each(function() {

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
