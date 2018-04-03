/** dismiss.js */

YOI.behaviour.Dismiss = (function() {

    // private vars
    // ============

    // localization

    var language = YOI.locale();

    var localization = {
        'en' : {
            'btnLabel' : 'close'
        },
        'de' : {
            'btnLabel' : 'schliessen'
        }
    };

    // templates

    var $btnDismiss = $('\
        <span class="btnDismiss">' + localization[language]['btnLabel'] + '</span>\
    ');

    // private functions
    // =================

    function initialize($dismissableElement, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery element} $dismissableElement
         *  @param {object}         options
         */

        var $dismissableElement = YOI.createCollection('dismiss', $dismissableElement, options);

        if ($dismissableElement) $dismissableElement.each(function() {

            // cancel if already initialized

            if ($(this).data().props.isDismissable) return;

            // proceed

            var $thisDismissableElement = $(this);
            var positionStatic          = $thisDismissableElement.css('position') === 'static';
            var options                 = options || $thisDismissableElement.data().options;

            // to correctly (absolutely) position $btnDismiss, make sure
            // $thisDismissableElement provides positioning context

            if (positionStatic) $thisDismissableElement.css('position','relative');

            // attach button and events

            $btnDismiss
                .clone()
                .on('click', function(e) {
                    e.preventDefault();
                    dismiss($(this).parent());
                })
                .appendTo($thisDismissableElement);

            // set initialized

            $(this).data().props.isDismissable = true;

        });

    }

    function dismiss($targetElement) {

        /**
         *  Close and remove any target element.
         *
         *  @param {jQuery element} $targetElement - the target element
         */

        if (!($targetElement instanceof jQuery)) return false;

        $targetElement.fadeOut(function() {
            $targetElement.trigger('yoi-dismiss');
        });

    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();
