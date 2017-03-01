/** filters.js */

YOI.Filters = (function() {

    // private vars
    // ============

    var filterGroupMaxHeight = 210;
    var loadResultsIsRunning = false;

    var btnLabelReset = YOI.locale === 'de' ? 'Alle Filter zurücksetzen' : 'Reset All';
    var msgLoading    = YOI.locale === 'de' ? 'Daten werden geladen' : 'Fetching data';

    var $resetBtn = $('\
        <a href="#" class="filters__resetBtn">' + btnLabelReset + '</a>\
    ');

    var $loader = $('\
        <div class="loading">\
            <span class="pulse"></span>\
            <span class="msg"><b>' + msgLoading + '</b></span>\
        </div>\
    ');

    // private functions
    // =================

    function initializeFilters($filters) {

        /**
         *  Initialize all *[yoi-filters] found in the document (= function call without parameters)
         *  or target one or more specific *[yoi-filters] (= function call with $dock).
         *  $filters must be a jQuery object or jQuery object collection.
         *
         *  @param {jQuery dom object} $filters - the filter group(s)
         */

        if (!($filters instanceof jQuery) || $filters === undefined) {
            $filters = $('[yoi-filters]');
        }

        $filters.each(function() {

            var $thisFilters            = $(this);
            var $thisFilterGroups       = $thisFilters.find('.filterGroup');
            var $thisFilterGroupHeaders = $thisFilters.find('.filterGroup__header');
            var $thisFiltersMulti       = $thisFilters.find('.filter--multi');
            var $thisFiltersSingle      = $thisFilters.find('.filter--single');

            // set initial states

            updateAllFilterGroups($thisFilters);
            toggleResetBtn($thisFilters);

            $thisFilterGroups.each(function() {

                var $thisFilterGroup = $(this);

                // only on init: mark filter groups that have too many filters
                // add make them scrollable

                var aboveMaxHeight = $thisFilterGroup.height() > filterGroupMaxHeight;

                if (aboveMaxHeight) {
                    $thisFilterGroup.data().isScroll = true;
                    $thisFilterGroup.addClass('filterGroup--isScroll');
                } else {
                    $thisFilterGroup.data().isScroll = false;
                }

                // collapse all filter groups if they are already
                // defined as collapsed in markup

                if ($thisFilterGroup.data().isCollapsed)
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

            $thisFilters.on('yoi-filters:update', function() {
                updateResults($thisFilters);
            });

            $thisFilters.on('yoi-filters:reset', function() {
                resetFilters($thisFilters);
                toggleResetBtn($thisFilters);
            });

        });

    }

    function resetFilters($filters) {

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
            if ($thisFilterGroup.data().isCollapsed)
                collapseFilterGroup($thisFilterGroup);
        });

        // fire reset event on range sliders

        $thisFilters.find('.rangeInput').trigger('yoi-rangeInput:reset');

        // update search results

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

        if ($thisFilterGroup.data().isCollapsed) {
            expandFilterGroup($thisFilterGroup);
        } else {
            collapseFilterGroup($thisFilterGroup);
        }

    }

    function toggleFilter($thisFilter) {

        /**
         *  Activate or deactivate an individual filter.
         *  The visual change is applied immediately while the actual query
         *  to update the search results and so on gets called with a certain delay.
         *  The delay helps avoiding unexpected behaviour through brute-force / rapid clicking.
         *
         *  @param {jQuery dom object} $thisFilter - the filter
         */

        // cancel if results update is running

        if (loadResultsIsRunning) {
            return false;
        }

        var $thisFilterGroup = $thisFilter.closest('.filterGroup');
        var $thisFilters     = $thisFilter.closest('.filters');

        if ($thisFilter.hasClass('filter--multi')) {
            $thisFilter.toggleClass('is--active');
        } else if ($thisFilter.hasClass('filter--single')) {
            $thisFilterGroup.find('.filter--single').removeClass('is--active');
            $thisFilter.addClass('is--active');
        }

        // axecute after delay

        YOI.setDelay('toggleFilterTimeout', 750, function() {

            // collapse filter group

            if ($thisFilterGroup.data().isCollapsed && $thisFilterGroup.data().hasActiveFilters)
                collapseFilterGroup($thisFilterGroup);

            // update all filter groups

            updateAllFilterGroups($thisFilters);

            // update search results

            $thisFilters.trigger('yoi-filters:update');

            // toggle reset button

            toggleResetBtn($thisFilters);

        });

    }

    function toggleResetBtn($thisFilters) {

        /**
         *  Injects or removes a reset button per '.filters' container.
         *  The buttons calls the public reset method and deactivates
         *  all active filter buttons.
         *
         *  @param {jQuery dom object} $thisFilters - the filters
         */

        var totalActiveFilters = $thisFilters.find('.is--active');

        if (!$thisFilters.find('.filters__resetBtn').length && totalActiveFilters.length) {

            $resetBtn
            .clone()
            .prependTo($thisFilters)
            .on('click', function(e) {
                e.preventDefault();
                $thisFilters.trigger('yoi-filters:reset');
            });

        } else if (!totalActiveFilters.length) {

            $thisFilters.find('.filters__resetBtn').detach();

        }

    }

    function updateAllFilterGroups($thisFilters) {

        /**
         *  Walk through all filter groups and update some properties.
         *  These properties are booleans like "is this filtergroup expanded or collapsed", etc.
         *  They are stored inside the jQuery data-object of each filter group.
         *
         *  @param {jQuery dom object} $thisFilters - the filters
         */

        var $thisFilterGroups = $thisFilters.find('.filterGroup');

        $thisFilterGroups.each(function() {

            var $thisFilterGroup = $(this);
            var $thisFilterGroupBody = $thisFilterGroup.find('.filterGroup__body');

            // update data

            $thisFilterGroup.data({
                // isScroll      : defined only once on init
                isCollapsed      : $thisFilterGroup.hasClass('filterGroup--collapsed'),
                hasActiveFilters : $thisFilterGroup.find('.is--active').length > 0
            });

            $thisFilterGroup.data({
                hasShadow: ($thisFilterGroup.data().isScroll && !$thisFilterGroup.data().isCollapsed) || ($thisFilterGroup.data().isCollapsed && $thisFilterGroup.height() > filterGroupMaxHeight)
            });

            // update css classes

            if ($thisFilterGroup.data().hasActiveFilters) {
                $thisFilterGroup.addClass('filterGroup--hasActiveFilters');
            } else {
                $thisFilterGroup.removeClass('filterGroup--hasActiveFilters');
            }

            if ($thisFilterGroup.data().hasShadow) {
                $thisFilterGroup.addClass('filterGroup--hasShadow');
            } else {
                $thisFilterGroup.removeClass('filterGroup--hasShadow');
            }

        });

    }

    function updateActiveFilters($thisFilters) {
        /**
         *  Todo:
         *  Read all active filters and generate a search url,
         *  Something like "/s/?term=some+search+term&filter=xx".
         *
         *  @param {jQuery dom object} $thisFilters - the filters
         */
    }

    function updateResults($thisFilters, withPriceRange) {

        /**
         *  Apply the active filters by requesting the search results
         *  and updating the search display. The search display is set via
         *  the data-attribute "data-searchdisplay" in the markup.
         *
         *  @param {jQuery dom object} $filter        - the filter
         *  @param {bool}              withPriceRange - updates the corrensponding price range, default is true
         */

        // cancel if already running

        if (loadResultsIsRunning) {
            return false;
        }

        // update price range?

        if (withPriceRange === undefined) {
            withPriceRange = true;
        }

        // gather dom objects

        var $thisSearchDisplay = $($thisFilters.data().searchdisplay);
        var $thisRangeInput    = $thisFilters.find('.rangeInput').first();

        // cancel if no search display was found

        if ($thisSearchDisplay.length < 1) return false;

        // execute after delay

        YOI.setDelay('updateResultsTimeout', 500, function() {

            /**
             *  Todo:
             *
             *  Load the search results and update the target display.
             *  Return data to update pagination. Return data to update any
             *  .rangeInput, for example to update the price range (derived from
             *  the updated search results from manipulating the filters).
             *
             *  To avoid unnecessary requests, the results should only be
             *  updated if the filters actually did change. Furthermore it's
             *  important to fetch any .rangeInput elements and include
             *  their data, too.
             *
             *  The following code is simply simulated behaviour to test the
             *  user experience:
             *
             */

            $('body').stop().animate({ scrollTop: 0 }, 500, function() {

                // set flag: update is running

                loadResultsIsRunning = true;

                // update filters

                $thisFilters.addClass('filters--disabled');
                $thisSearchDisplay.append($loader);
                $loader.hide().fadeIn(200);

                $thisSearchDisplay.animate({ opacity: 0 }, 200, function() {

                    $thisSearchDisplay.delay(300).animate({ opacity: 1 }, 500, function() {

                        $loader.fadeOut(200);
                        $thisFilters.removeClass('filters--disabled');

                        // update any rangeInput

                        if (withPriceRange && YOI.foundModule('YOI.RangeInput')) {

                            var $rangeInput = $thisFilters.find('.rangeInput').first();

                            var randomPriceA = Math.ceil(Math.random(1, 250) * 100);
                            var randomPriceB = Math.ceil(Math.random(1, 250) * 100);
                            var minPrice     = Math.min(randomPriceA, randomPriceB);
                            var maxPrice     = Math.max(randomPriceA, randomPriceB);
                            var absMinPrice  = minPrice;
                            var absMaxPrice  = maxPrice;

                            RangeInput.set($rangeInput, minPrice, maxPrice, absMinPrice, absMaxPrice);

                        }

                        loadResultsIsRunning = false;

                    });

                });

            });

        });

    }

    // initialize
    // ==========

    initializeFilters();

    // public functions
    // ================

    return {
        init   : initializeFilters,
        reset  : resetFilters,
        apply  : updateResults
    };

})();
