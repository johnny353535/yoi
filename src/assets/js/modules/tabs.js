/** tabs.js */

var Tabs = (function() {

    // private functions
    // =================

    function initializeTabs() {

        /**
         *  Initialize the tabs.
         *
         *  In general:
         *
         *  - each .tabs__page must have an unique ID
         *  - tab pages don't need to be grouped inside a container element
         *  - all tab pages targeted by a tabs__menu get grouped
         *  - tab pages can be anywhere inside the document
         *
         *  For each .tabs__menu:
         *
         *  - An initial .tabs__page can be referred to by adding the class .is--active
         *    to a menu item. If no such class name was found, the tabs page referred to by
         *    the first tab menu item is shown.
         *
         *  - If location.hash matches a tab page inside the document, the initial tab page
         *    gets overridden by the tabs page matching the hash. Additionally, the tab page
         *    gets scrolled into the viewport.
         */

        $('.tabs__menu').each(function(){

            // read start tab from markup ...

            var thisStartTabId = $(this).find('.is--active').length ? $(this).find('.is--active a')[0].hash : $(this).find('a').first()[0].hash;

            // read start tab from url ...

            var urlTabId = window.location.hash;

            // ... and finally define the target tab

            var targetTabId = $(this).find('a[href*="' + urlTabId + '"]').length > 0 ? urlTabId : thisStartTabId;

            // switch to target tab

            switchToTab(targetTabId);

            // if start tab was in hash, scroll to start tab

            if (YOI.foundModule('ScrollTo') && urlTabId !== '')
                ScrollTo.target(urlTabId);

            // attach click event to menu items

            $(this).find('a').on('click', function(e) {

                e.preventDefault();

                var thisHash = $(this)[0].hash;
                switchToTab(thisHash);

            });

        });

    }

    function switchToTab(thisTargetTabId) {

        /**
         *  Show the target tab, hide all other related tabs.
         *
         *  @param {string} thisTargetTabId - target tab css id selector (e.g. "#myTab")
         */

        var $thisTabsMenuItem         = $('a[href*="' + thisTargetTabId + '"]').parent('li');
        var $thisRelatedTabsMenuItems = $thisTabsMenuItem.closest('.tabs__menu').find('li');

        // remove '.is--active' from all related menu items,
        // hide all related tabs

        $thisRelatedTabsMenuItems.each(function() {

            var tabId = $(this).find('a')[0].hash;

            $(this).removeClass('is--active');
            $(tabId).hide();

        });

        // add '.is--active' and switch to target tab

        $thisTabsMenuItem.addClass('is--active');
        $(thisTargetTabId).show();

    }

    // initialize
    // ==========

    initializeTabs();

    // public functions
    // ================

    return {
        init     : initializeTabs,
        switchTo : switchToTab
    };

})();
