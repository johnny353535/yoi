/** accordion.js */

YOI.element.Accordion = (function() {
    
    // private vars
    // ============
    
    var keyboadEventsAdded = false;

    // private functions
    // =================

    function initialize($accordion, options) {

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
        
        // if ($accordion) initializeAccordionTriggers();

        if ($accordion) $accordion.each(function() {
            
            // cancel if already initialized
            
            if (YOI.isReady($(this))) return false;
            
            // proceed

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

                // attach events

                $thisHeader.on(eventType, function(e) {
                    e.preventDefault();
                    toggleSection($thisSection);
                });

            });
            
            // set initialized
            
            YOI.setReady($(this));

        });
        
        // add keyboad events
        
        addKeyboardEvents();

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
            .slideDown('fast')
            .promise()
            .then(function() { $thisSection.trigger('yoi-accordion-done') });

        $thisSection.trigger('yoi-accordion-open');
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
            .addClass('is--closed')
            .promise()
            .then(function() { $thisSection.trigger('yoi-accordion-done') });
    
        $thisBody
            .stop()
            .slideUp('fast');
        
        $thisSection.trigger('yoi-accordion-close');
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
            $targets = $('.accordion__section');
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
         *  @param {jQuery dom object} $accordion - the accordion
         */
        
        var $targets;
        
        if ($accordion === undefined) {
            $targets = $('[yoi-accordion] .accordion__section');
        } else {
            $targets = $('.accordion__section');
        }

        $targets.each(function() {
            openSection($(this));
        });

    }
    
    function addKeyboardEvents() {

        /**
         *  Adds keyboard events.
         */

        if (YOI.foundModule('KeyboardAgent') && !keyboadEventsAdded) {
            
            // tab key
            
            YOI.module.KeyboardAgent.addTabFocus($('.accordion__header'));
        
            // enter key
        
            $document.on('yoi-keypressed-enter', function() {
            
                var $activeElement = $(document.activeElement);
            
                if ($activeElement.is('.accordion__header')) {
                    toggleSection($activeElement.closest('.accordion__section'));
                }
            
            });
            
        }
        
        // set flag
        
        keyboadEventsAdded = true;

    }

    // public functions
    // ================

    return {
        init     : initialize,
        close    : closeSection,
        open     : openSection,
        closeAll : closeAllSections,
        openAll  : openAllSections,
        toggle   : toggleSection
    };

})();
