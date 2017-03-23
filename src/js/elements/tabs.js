/** tabs.js */

YOI.element.Tabs = (function() {

    // private functions
    // =================

    function initialize($tabsMenu, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $tabsMenu
         *  @param {object}            options
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
        
        var $tabsMenu = YOI.createCollection('tabs', $tabsMenu, options);

        if ($tabsMenu) $tabsMenu.each(function(){
            
            var $thisTabsMenu = $(this);

            // read start tab from markup ...

            var thisStartTabId = $thisTabsMenu.find('.is--active').length ? $thisTabsMenu.find('.is--active a')[0].hash : $thisTabsMenu.find('a').first()[0].hash;

            // read start tab from url ...

            var urlTabId = window.location.hash;

            // ... and finally define the target tab

            var targetTabId = $thisTabsMenu.find('a[href*="' + urlTabId + '"]').length > 0 ? urlTabId : thisStartTabId;

            // switch to target tab

            switchTo(targetTabId);

            // if start tab was in hash, scroll to start tab
            
            if (YOI.foundModule('ScrollTo') && urlTabId !== '')
                YOI.module.ScrollTo.target(urlTabId);

            // attach click event to menu items

            $thisTabsMenu.find('a').on('click', function(e) {
                e.preventDefault();
                switchTo($(this)[0].hash);
            });

        });

    }

    function switchTo(thisTargetTabId) {

        /**
         *  Show the target tab, hide all other related tabs.
         *
         *  @param {string} thisTargetTabId - target tab CSS-selector (most likely an #id, e.g. "#myTab")
         */

        var $thisTabsMenuItem         = $('a[href*="' + thisTargetTabId + '"]').parent('li');
        var $thisRelatedTabsMenuItems = $thisTabsMenuItem.closest('.tabs__menu').find('li');
        var $thisTargetTab            = $(thisTargetTabId);
        
        // remove '.is--active' from all related menu items,
        // hide all related tabs

        $thisRelatedTabsMenuItems.each(function() {
            
            var $thisMenuItem = $(this);
            var tabId         = $thisMenuItem.find('a')[0].hash;

            $thisMenuItem.removeClass('is--active');
            $(tabId).hide();

        });

        // add '.is--active' and switch to target tab

        $thisTabsMenuItem.addClass('is--active');
        $thisTargetTab.show();
        
        // trigger custom event
        
        $thisTargetTab.trigger('yoi-tabs:change');

    }

    // public functions
    // ================

    return {
        init     : initialize,
        switchTo : switchTo
    };

})();