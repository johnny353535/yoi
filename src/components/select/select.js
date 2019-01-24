/** select.js */

YOI.component.Select = (function() {

    // private vars
    // ============

    var $selectWrapper = $('<span class="select"></span>');
    var $selectIcon    = $('<span class="select__icon"></span>');

    // private functions
    // =================

    function initialize($select, options) {

        /**
         *  Initialize the script.
         * 
         *  @param {jQuery element} $select
         *  @param {object}         options
         * 
         *  Available options:
         *
         *  @option {string} cssClasses - additional css classes, eg. modifiers
         */

        var $select = YOI.createCollection('select', $select, options);

        if ($select) $select.each(function() {
            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // proceed

            var $thisSelect        = $(this);
            var $thisSelectWrapper = $selectWrapper.clone();
            var $thisSelectIcon    = $selectIcon.clone();
            var options            = $thisSelect.data().options;
            var cssClasses         = options.cssClasses || false;

            // prepare wrapper, keep modifiers

            $thisSelectWrapper.addClass($thisSelect.attr('class'));

            // add additional css classes from option.cssClasses

            if (cssClasses) {
                $thisSelectWrapper.addClass(cssClasses);
            }

            // inject elements

            $thisSelect.wrap($thisSelectWrapper);
            $thisSelect.parent().append($thisSelectIcon);

            // remove classNames (modifiers) from select element

            $thisSelect.removeAttr('class');

            // add events

            $thisSelect.on({
                'focus': function() {
                    $thisSelect.parent().addClass('is--focus');
                    $thisSelect.trigger('yoi-input-focus');
                },
                'blur': function() {
                    $thisSelect.parent().removeClass('is--focus');
                    $thisSelect.trigger('yoi-input-blur');
                },
                'change': function() {
                    $thisSelect.trigger('yoi-input-change');
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
