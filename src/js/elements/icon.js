/** icon.js */

YOI.element.Icon = (function() {

    // private functions
    // =================

    function initialize($icon) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $icon
         */

        var $icon = YOI.createCollection('icon', $icon);

        if ($icon) $icon.each(function() {
            var $thisIcon = $(this);
            replace($thisIcon);
        });

    }

    // public functions
    // ================
    
    function replace($icon) {
        
        /**
         *  Replace a given SVG as image or SVG as object
         *  with the actual SVG markup.
         *
         *  @param {jQuery dom object} $icon
         */
        
        var $iconSvg;
        var iconClassNames = $icon.attr('class');
        var source         = $icon.attr('data') || $icon.attr('src');
        
        if (source !== undefined) {
            
            $.ajax({
                url: source,
                dataType: 'text',
                success: function(data) {
                    $iconSvg = $(data).addClass(iconClassNames);
                    $icon.replaceWith($iconSvg);
                },
            });
        
        }
        
    }

    return {
        init    : initialize,
        replace : replace
    };

})();
