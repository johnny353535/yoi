/** filters.js */

YOI.element.Filters = (function() {

    // private vars
    // ============

    var filterGroupMaxHeight = 210;
    var loadResultsIsRunning = false;
    
    // localization
    
    var language = YOI.locale();
    
    var localization = {
        'en' : {
            'btnLabelReset' : 'Reset All Filters'
        },
        'de' : {
            'btnLabelReset' : 'Alle Filter zurücksetzen'
        }
    };
    
    // templates

    var $resetBtn = $('\
        <a href="#" class="filters__resetBtn">' + localization[language]['btnLabelReset'] + '</a>\
    ');

    // private functions
    // =================

    function initialize($filters, options) {
        
        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $accordion
         *  @param {object}            options
         */
        
        var $filters = YOI.createCollection('filters', $filters, options);

        if ($filters) $filters.each(function() {

            var $thisFilters            = $(this);
            var $thisFilterGroups       = $thisFilters.find('.filterGroup');
            var $thisFilterGroupHeaders = $thisFilters.find('.filterGroup__header');
            var $thisFiltersMulti       = $thisFilters.find('.filter--multi');
            var $thisFiltersSingle      = $thisFilters.find('.filter--single');

            // set initial states

            updateAllFilterGroups($thisFilters);

            $thisFilterGroups.each(function() {

                var $thisFilterGroup = $(this);
                var props            = $thisFilterGroup.data().props;

                // only on init: mark filter groups that have too many filters
                // add make them scrollable

                var aboveMaxHeight = $thisFilterGroup.height() > filterGroupMaxHeight;

                if (aboveMaxHeight) {
                    props.isScroll = true;
                    $thisFilterGroup.addClass('filterGroup--isScroll');
                } else {
                    props.isScroll = false;
                }

                // collapse all filter groups if they are already
                // defined as collapsed in markup

                if (props.isCollapsed)
                    collapseFilterGroup($thisFilterGroup);

            });

            // attach events

            $thisFilterGroupHeaders.on('click', function() {
                var $thisFilterGroup = $(this).closest('.filterGroup');
                toggleFilterGroup($thisFilterGroup);
            });

            $thisFiltersMulti.on('click', function(e) {
                e.preventDefault();
                var $thisFilter = $(this);
                toggleFilter($thisFilter);
            });

            $thisFiltersSingle.on('click', function(e) {
                e.preventDefault();
                var $thisFilter = $(this);
                toggleFilter($thisFilter);
            });

            $thisFilters.on('yoi-filters:reset', function() {
                reset($thisFilters);
                removeResetBtn($thisFilters);
            });
            
            $thisFilters.on('yoi-filters:update', function() {
                addResetBtn($thisFilters);
            });
            
            // if a foo
            
            $thisFilters.on('yoi-rangeinput:change', function() {
                addResetBtn($thisFilters);
            });

        });

    }

    function reset($filters) {

        /**
         *  Reset all filters inside a .filter (if .filter was specified through
         *  the caller argument) or reset all filters on the page (if no caller
         *  was specified).
         *
         *  @param {jQuery dom object} $filters - the filters
         */

        var $thisFilters        = $filters;
        var $thisFilterGroups   = $thisFilters.find('.filterGroup');
        var $thisFiltersFilters = $thisFilters.find('.filter');

        // deactivate all filter buttons

        $thisFiltersFilters.removeClass('is--active');

        // collapse filter groups

        $thisFilterGroups.each(function() {
            
            var $thisFilterGroup = $(this);
            var props            = $thisFilterGroup.data().props;
            
            if (props.isCollapsed)
                collapseFilterGroup($thisFilterGroup);
            
        });

        // fire reset event on range inputs

        $thisFilters.find('.rangeInput').trigger('yoi-rangeinput:reset');

        // trigger custom event

        $thisFilters.trigger('yoi-filters:update');

    }

    function collapseFilterGroup($thisFilterGroup) {

        /**
         *  Collapse a filter group by hiding all inactive filters.
         *  Active filters always stay visible.
         *
         *  @param {jQuery dom object} $filterGroup - the fiter group
         */

        var $thisFilters         = $thisFilterGroup.closest('.filters');
        var $thisFilterGroupBody = $thisFilterGroup.find('.filterGroup__body');

        if ($thisFilterGroup.hasClass('filterGroup--isScroll')) {
            $thisFilterGroupBody.animate({ scrollTop: 0 }, 100);
        }

        $thisFilterGroup.addClass('filterGroup--collapsed');

        $.when($thisFilterGroup.find('.filter:not(.is--active)').slideUp(200)).then(function() {
            updateAllFilterGroups($thisFilters);
        });

    }

    function expandFilterGroup($thisFilterGroup) {

        /**
         *  Expand a filter group by showing all inactive filters.
         *  Active filters always stay visible.
         *
         *  @param {jQuery dom object} $filterGroup - the fiter group
         */

        var $thisFilters     = $thisFilterGroup.closest('.filters');

        $thisFilterGroup.removeClass('filterGroup--collapsed');

        $.when($thisFilterGroup.find('.filter:not(.is--active)').slideDown(200)).then(function() {
            updateAllFilterGroups($thisFilters);
        });

    }

    function toggleFilterGroup($thisFilterGroup) {

        /**
         *  Expand or collapse a filter group by showing or hiding all inactive filters.
         *  Active filters always stay visible.
         *
         *  @param {jQuery dom object} $filterGroup - the fiter group
         */
        
        var props = $thisFilterGroup.data().props;

        if (props.isCollapsed) {
            expandFilterGroup($thisFilterGroup);
        } else {
            collapseFilterGroup($thisFilterGroup);
        }

    }

    function toggleFilter($thisFilter) {

        /**
         *  Activate or deactivate an individual filter.
         *  The visual change is applied immediately while the actual update-event is triggered
         *  after a certain delay to prevent unexpected behaviour through brute-force / rapid clicking.
         *
         *  @param {jQuery dom object} $thisFilter - the filter
         */

        // cancel if results update is running

        if (loadResultsIsRunning) {
            return false;
        }

        var $thisFilterGroup = $thisFilter.closest('.filterGroup');
        var props            = $thisFilterGroup.data().props;
        var $thisFilters     = $thisFilter.closest('.filters');

        if ($thisFilter.hasClass('filter--multi')) {
            $thisFilter.toggleClass('is--active');
        } else if ($thisFilter.hasClass('filter--single')) {
            $thisFilterGroup.find('.filter--single').removeClass('is--active');
            $thisFilter.addClass('is--active');
        }
        
        // trigger custom event
        
        $thisFilter.trigger('yoi-filters:change');

        // axecute after delay

        YOI.setDelay('toggleFilterTimeout', 750, function() {

            // collapse filter group

            if (props.isCollapsed && props.hasActiveFilters)
                collapseFilterGroup($thisFilterGroup);

            // update all filter groups

            updateAllFilterGroups($thisFilters);

            // trigger custom event

            $thisFilters.trigger('yoi-filters:update');

        });

    }
    
    function addResetBtn($thisFilters) {
        
        /**
         *  Add a reset button per '.filters' container.
         *  The buttons calls the reset method on click.
         *
         *  @param {jQuery dom object} $thisFilters
         */
        
        var hasResetBtn = $thisFilters.find('.filters__resetBtn').length > 0;
        
        if (!hasResetBtn) {
            $resetBtn
                .clone()
                .prependTo($thisFilters)
                .on('click', function(e) {
                    e.preventDefault();
                    $thisFilters.trigger('yoi-filters:reset');
                });
        }
        
    }
    
    function removeResetBtn($thisFilters) {
        
        /**
         *  Removes the reset button per '.filters' container.
         *
         *  @param {jQuery dom object} $thisFilters
         */
        
        $thisFilters.find('.filters__resetBtn').detach();
        
    }

    function updateAllFilterGroups($thisFilters) {

        /**
         *  Walk through all filter groups and update some properties.
         *  These properties are booleans like "is this filtergroup expanded or collapsed", etc.
         *  They are stored inside the "props" object of each filter group.
         *
         *  @param {jQuery dom object} $thisFilters
         */

        var $thisFilterGroups = $thisFilters.find('.filterGroup');

        $thisFilterGroups.each(function() {

            var $thisFilterGroup = $(this);
            var props            = YOI.updateProps($thisFilterGroup);

            // update props

            props.isCollapsed      = $thisFilterGroup.hasClass('filterGroup--collapsed');
            props.hasActiveFilters = $thisFilterGroup.find('.is--active').length > 0;
            props.hasShadow        = (props.isScroll && !props.isCollapsed) || (props.isCollapsed && $thisFilterGroup.height() > filterGroupMaxHeight);

            // update css classes

            if (props.hasActiveFilters) {
                $thisFilterGroup.addClass('filterGroup--hasActiveFilters');
            } else {
                $thisFilterGroup.removeClass('filterGroup--hasActiveFilters');
            }

            if (props.hasShadow) {
                $thisFilterGroup.addClass('filterGroup--hasShadow');
            } else {
                $thisFilterGroup.removeClass('filterGroup--hasShadow');
            }

        });

    }

    // public functions
    // ================

    return {
        init   : initialize,
        reset  : reset
    };

})();
