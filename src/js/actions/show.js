/** show.js */

YOI.action.Show = function($trigger, $target, options) {

    /**
     *  Reveals the target element.
     *
     *  @param {jQuery dom object} $trigger - the element which triggered the script
     *  @param {jQuery dom object} $target  - the target element
     *  @param {object}            options
     *
     *  Available options:
     *
     *  @option {string} transition - Chose from two jQuery animations: 'fade' and 'slide'.
     */

    if ($target instanceof jQuery) {

        // apply event on trigger and hide target

        if (options.transition === 'fade') {
            $target.stop().fadeIn();
        } else if (options.transition === 'slide') {
            $target.stop().slideDown();
        } else {
            $target.show();
        }

        // trigger custom event

        $target.trigger('yoi-show');
        
    }

}

YOI.action.Show.init = function() {
    
    /**
     *  Prepares the target elements by initially hiding them.
     */
    
    $('[yoi-action*="Show"], [yoi-action-1*="Show"], [yoi-action-2*="Show"], [yoi-action-3*="Show"], [yoi-action-4*="Show"]').each(function() {

        var $this = $(this);
        var selector;
        
        if ($this.is('[yoi-action*="Show"]'))   selector = YOI.toObject($this.attr('yoi-action')).Show;
        if ($this.is('[yoi-action-1*="Show"]')) selector = YOI.toObject($this.attr('yoi-action-1')).Show;
        if ($this.is('[yoi-action-2*="Show"]')) selector = YOI.toObject($this.attr('yoi-action-2')).Show;
        if ($this.is('[yoi-action-3*="Show"]')) selector = YOI.toObject($this.attr('yoi-action-3')).Show;
        if ($this.is('[yoi-action-4*="Show"]')) selector = YOI.toObject($this.attr('yoi-action-4')).Show;
        
        if (selector === 'self') {
            $this.hide();
        } else if (selector === 'parent') {
            $this.parent().hide();
        } else {
            $(selector).hide();
        }

    });
    
}