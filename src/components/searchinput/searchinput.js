/** searchinput.js  */

YOI.component.SearchInput = (function() {

    // private vars
    // ============

    var $searchInputWrapper     = $('<span class="searchInput"></span>');

    // private functions
    // =================

    function initialize($searchInput, options) {

        /**
         *  Initialize the script.
         * 
         *  @param {jQuery element} $searchInput
         *  @param {object}         options
         * 
         *  Available options:
         *
         *  @option {string} cssClasses - additional css classes, eg. modifiers
         */

        var $searchInput = YOI.createCollection('searchinput', $searchInput, options);

        if ($searchInput) $searchInput.each(function() {
            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // proceed

            var $thisSearchInput            = $(this);
            var $thisSearchInputWrapper     = $searchInputWrapper.clone();
            var options                     = $thisSearchInput.data().options;
            var cssClasses                  = options.cssClasses || false;

            // prepare wrapper, keep modifiers

            $thisSearchInputWrapper.addClass($thisSearchInput.attr('class'));

            // add additional css classes from option.cssClasses

            if (cssClasses) {
                $thisSearchInputWrapper.addClass(cssClasses);
            }

            // inject elements

            $thisSearchInput.wrap($thisSearchInputWrapper);

            // remove classNames (modifiers) from input element

            $thisSearchInput.removeAttr('class');

            // add events

            $thisSearchInput.on({
                'focus': function() {
                    $thisSearchInput.parent().addClass('is--focus');
                    $thisSearchInput.trigger('yoi-input-focus');
                },
                'blur': function() {
                    $thisSearchInput.parent().removeClass('is--focus');
                    $thisSearchInput.trigger('yoi-input-blur');
                },
                'change': function() {
                    $thisSearchInput.trigger('yoi-input-change');
                }
            });

            // set initialized

            YOI.setReady($(this));

        });
        
    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();