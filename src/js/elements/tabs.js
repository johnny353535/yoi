/** tabs.js */

YOI.element.Tabs = (function() {
    
    // private vars
    // ============
    
    var $window = $(window);

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
         *    gets overwritten by the tabs page matching the hash. Additionally, the tab page
         *    gets scrolled into the viewport.
         */
        
        var $tabsMenu = YOI.createCollection('tabs', $tabsMenu, options);

        if ($tabsMenu) $tabsMenu.each(function(){
            
            var $thisTabsMenu = $(this);
            
            // get the start tab
            
            var urlTabId       = window.location.hash;
            var firstTabId     = $thisTabsMenu.find('a').first()[0].hash;
            var hashMatchesTab = $thisTabsMenu.find('a[href="' + urlTabId + '"]').length;
            var hasActiveTab   = $thisTabsMenu.has('.tabs__item.is--active').length;
            var startTabId     = hashMatchesTab ? urlTabId : firstTabId;
            
            // if the hash does not match any tab and if the
            // tabs menu has an active tab already set in markup,
            // overwrite startTabId with the id of the active tab
            
            if (hasActiveTab && !hashMatchesTab) {
                startTabId = $thisTabsMenu.find('.tabs__item.is--active a').first()[0].hash;
            }
            
            // switch to start tab
            
            switchTo(startTabId);
            
            // attach events

            $thisTabsMenu.find('a').on('click', function(e) {
                e.preventDefault();
                switchTo(this.hash);
            });

        });
    
    }

    function switchTo(thisTargetTabId) {

        /**
         *  Show the target tab, hide all other related tabs.
         *
         *  @param {string} thisTargetTabId - target tab CSS-selector (most likely an #id, e.g. "#myTab")
         */
        
        var $thisTabsMenuItem  = $('a[href="' + thisTargetTabId + '"]').parent('li');
        var $thisTabsMenu      = $thisTabsMenuItem.closest('.tabs__menu');
        var $thisTabsMenuItems = $thisTabsMenu.find('li');
        var $thisTargetTab     = $(thisTargetTabId);
        
        // remove '.is--active' from all related menu items,
        // hide all related tabs

        $thisTabsMenuItems.each(function() {
            
            var $thisMenuItem = $(this);
            var tabId         = $thisMenuItem.find('a')[0].hash;

            $thisMenuItem.removeClass('is--active');
            $(tabId).hide();

        });

        // add '.is--active' and switch to target tab

        $thisTabsMenuItem.addClass('is--active');
        $thisTargetTab.show();
        
        // trigger custom event
        
        $thisTabsMenu.trigger('yoi-tabs-change');

    }

    // public functions
    // ================

    return {
        init     : initialize,
        switchTo : switchTo
    };

})();
