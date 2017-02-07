/** accordion.js */

var Accordion = (function() {

    // private functions
    // =================

    function initializeAccordion($accordion, options) {

        /**
         *  Initialize all *[data-accordion] found in the document (= function call without parameters)
         *  or target one or more specific *[data-accordion] (= function call with $accordion).
         *  $accordion must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $accordion - the accordion(s)
         *
         *  Options are passed to the script as custom data values, eg:
         *
         *  <div class="accordion" data-accordion="linked:true;">
         *
         *  Available options:
         *
         *  @option {string ["true"|"false"]} linked - set "true" to link the accordion sections. only
         *                                             one section can be open, the remaining sections
         *                                             will always close
         */

        if (!($accordion instanceof jQuery)) {
            $accordion = $('[data-accordion]');
        }

        $accordion.each(function() {

            var $thisAccordion = $(this);
            var $thisSections  = $thisAccordion.find('.accordion__section');
            var options        = options === undefined ? YOI.toObject($thisAccordion.data('accordion')) : options;

            // define the event: tap on mobile, click on desktop

            var eventType = YOI.environment('mobile') ? 'tap' : 'click';

            $thisSections.each(function() {

                var $thisSection = $(this);
                var $thisHeader  = $thisSection.find('.accordion__header');
                var $thisBody    = $thisSection.find('.accordion__body');

                // by default, on page load all accordion sections are closed.
                // however, accordion sections with the class name "is--open" in markup will be open.

                if (!$thisSection.hasClass('is--open') && !$thisSection.hasClass('is--closed')) {
                    $thisSection.addClass('is--closed');
                    $thisBody.slideUp(0);
                }

                // attach event

                $thisHeader.on(eventType, function(e) {
                    e.preventDefault();
                    toggleAccordionSection($thisSection);
                });

            });

        });

    }

    function initializeAccordionTriggers() {

        /**
         *  Gather all elements in DOM which are tagged with the custom
         *  data-attributes "action". Attach events accordingly to the values
         *  "openAllAccordions" and "closeAllAccordions".
         */

        $('[data-action="openAllAccordions"]').on('click', function(e) {
            e.preventDefault();
            openAllSections();
        });

        $('[data-action="closeAllAccordions"]').on('click', function(e) {
            e.preventDefault();
            closeAllSections();
        });

    }

    function toggleAccordionSection($section) {

        /**
         *  Opens or closes a given accordion section.
         *
         *  @param  {jQuery dom object} $section - the accordion section
         */

        var $thisAccordion = $section.closest('.accordion');
        var $thisSection   = $section;
        var $thisBody      = $section.find('.accordion__body');
        var options        = YOI.toObject($thisAccordion.data('accordion'));

        // in "linked" accordions, only one section can be open.
        // all remaining sections will close.

        if (options.linked === 'true') {
            $thisAccordion.find('.accordion__section').removeClass('is--open').addClass('is--closed');
            $thisAccordion.find('.accordion__body').stop().slideUp('fast');
            $thisSection.removeClass('is--closed').addClass('is--open');
            $thisBody.stop().slideDown('fast');
            return;
        }

        // by default, accordions can toggle their sections
        // individually and independently

        if ($thisSection.hasClass('is--closed')) {
            $thisSection.removeClass('is--closed').addClass('is--open');
            $thisBody.stop().slideDown('fast');
            return;
        }

        if ($thisSection.hasClass('is--open')) {
            $thisSection.removeClass('is--open').addClass('is--closed');
            $thisBody.stop().slideUp('fast');
            return;
        }

    }

    function closeAllSections() {

        /**
         *  Close all accordion sections found in DOM.
         */

        $('.accordion__section')
            .removeClass('is--open').addClass('is--closed')
            .find('.accordion__body').slideUp('fast');

    }

    function openAllSections() {

        /**
         *  Open all accordion sections found in DOM.
         */

        $('.accordion__section')
            .removeClass('is--closed').addClass('is--open')
            .find('.accordion__body').slideDown('fast');

    }

    // initialize
    // ==========

    initializeAccordion();
    initializeAccordionTriggers();

    // public functions
    // ================

    return {
        init         : initializeAccordion,
        initTriggers : initializeAccordionTriggers,
        closeAll     : closeAllSections,
        openAll      : openAllSections,
        toggle       : toggleAccordionSection
    }

})();
