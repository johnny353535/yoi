/** accordion.js */

YOI.element.Accordion = (function() {

    // private functions
    // =================

    function initializeAccordion($accordion, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $accordion
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {bool} linked - if TRUE, only one accordion section is expanded at a time
         *                          default: FALSE
         */
        
        var $accordion = YOI.createCollection('accordion', $accordion, options);
        
        if ($accordion) initializeAccordionTriggers();

        if ($accordion) $accordion.each(function() {

            var $thisAccordion = $(this);
            var $thisSections  = $thisAccordion.find('.accordion__section');

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
                    $thisSection.data().state = 'closed';
                    $thisBody.slideUp(0);
                }
                
                if ($thisSection.hasClass('is--open')) {
                    $thisSection.data().state = 'open';
                }

                // attach event

                $thisHeader.on(eventType, function(e) {
                    e.preventDefault();
                    toggleSection($thisSection);
                });

            });

        });
        
        // add keyboard events
        
        if ($accordion) addKeyboardEvents($accordion);

    }

    function initializeAccordionTriggers() {

        /**
         *  Gather all elements in DOM which are tagged with the custom
         *  data-attributes "action". Attach events accordingly to the values
         *  "openAllAccordions" and "closeAllAccordions".
         */

        $('[yoi-action="openAllAccordions"]').on('click', function(e) {
            e.preventDefault();
            openAllSections();
        });

        $('[yoi-action="closeAllAccordions"]').on('click', function(e) {
            e.preventDefault();
            closeAllSections();
        });

    }

    function toggleSection($section) {

        /**
         *  Opens or closes a given accordion section.
         *  By default, accordions can toggle their sections individually and independently.
         *  In "linked" accordions, only one section can be open. all remaining sections will close.
         *
         *  @param {jQuery dom object} $section - the accordion section
         */

        var $thisAccordion = $section.closest('.accordion');
        var $thisSection   = $section;
        var options        = $thisAccordion.data().options;
        var state          = $thisSection.data().state;
        
        if (state === 'closed' && options.linked) {
            closeAllSections($thisAccordion);
        }
        
        if (state === 'closed') {
            openSection($thisSection);
        }
        
        if (state === 'open' && !options.linked) {
            closeSection($thisSection);
        }

    }

    function openSection($section) {

        /**
         *  Open a single accordion section.
         *
         *  @param {jQuery dom object} $section - the accordion section
         */

        var $thisSection = $section;
        var $thisBody    = $section.find('.accordion__body');

        $thisSection
            .removeClass('is--closed')
            .addClass('is--open');

        $thisBody
            .stop()
            .slideDown('fast');

        $thisSection.trigger('yoi-accordion:open');
        $thisSection.data().state = 'open';

    }

    function closeSection($section) {

        /**
         *  Close a single accordion section.
         *
         *  @param {jQuery dom object} $section - the accordion section
         */
        
        var $thisSection = $section;
        var $thisBody    = $section.find('.accordion__body');
        
        $thisSection
            .removeClass('is--open')
            .addClass('is--closed');
    
        $thisBody
            .stop()
            .slideUp('fast');
        
        $thisSection.trigger('yoi-accordion:close');
        $thisSection.data().state = 'closed';
        
    }

    function closeAllSections($accordion) {
        
        /**
         *  If $accordion is omitted on function call, all accordion sections found
         *  in DOM are closed. Otherwise all sections of a given $accordion are closed.
         *
         *  @param {jQuery dom object} $$accordion - the accordion
         */
        
        var $targets;
        
        if ($accordion === undefined) {
            $targets = $('[yoi-accordion] .accordion__section');
        } else {
            $targets = $accordion.find('.accordion__section');
        }

        $targets.each(function() {
            closeSection($(this));
        });

    }

    function openAllSections($accordion) {

        /**
         *  If $accordion is omitted on function call, all accordion sections found
         *  in DOM are opened. Otherwise all sections of a given $accordion are opened.
         *
         *  @param {jQuery dom object} $$accordion - the accordion
         */
        
        var $targets;
        
        if ($accordion === undefined) {
            $targets = $('[yoi-accordion] .accordion__section');
        } else {
            $targets = $accordion.find('.accordion__section');
        }

        $targets.each(function() {
            openSection($(this));
        });

    }
    
    function addKeyboardEvents($accordion) {

        /**
         *  Attaches tabindex attribute to each $slider and listens to custom keyboard-events
         *  if $slider is focussed. Left arrow key: previous slide. Right arrow key: next slide.
         *
         *  @param {jQuery dom object} $slider
         */
        
        // add tab index
        
        $accordion.find('.accordion__header')
            .attr('tabindex','0')
            .on('mousedown', function() {
                $(this).removeClass('focus-inset')
                return false;
            })
            .on('focus', function() { $(this).addClass('focus-inset') })
            .on('blur', function() { $(this).removeClass('focus-inset') });
        
        // space key
        
        $document.on('yoi-keypressed:space', function(e) {
            
            var $activeElement = $(document.activeElement);
            var $section       = $activeElement.closest('.accordion__section');
            
            if ($activeElement.hasClass('accordion__header')) {
                toggleSection($section);
            }
            
        });

    }

    // public functions
    // ================

    return {
        init         : initializeAccordion,
        close        : closeSection,
        open         : openSection,
        closeAll     : closeAllSections,
        openAll      : openAllSections,
        toggle       : toggleSection
    };

})();
