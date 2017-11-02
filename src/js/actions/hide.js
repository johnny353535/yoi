/** hide.js */

YOI.action.Hide = function($trigger, $target, options) {

    /**
     *  Hides the target element.
     *
     *  @param {jQuery dom object} $trigger - the element which triggered the script
     *  @param {jQuery dom object} $target  - the target element
     *  @param {object}            options
     *
     *  Available options:
     *
     *  @option {string} transition - Chose from the jQuery effects 'fadet' and 'slide'.
     */
    
    if ($target instanceof jQuery) {
        
        var fx     = options.fx || false;
        var speed  = options.speed || false;
        var remove = options.remove || false;

        // add fx, hide and trigger custom event
        
        if (fx && speed) $target.addClass('fx-' + speed);
        
        if (remove === 'true') {
            if (fx) {
                $target
                    .addClass('fx-' + fx)
                    .on('animationend', function() {
                        $target.remove().trigger('yoi-remove');
                    });
            } else {
                $target.remove().trigger('yoi-remove');
            }
        } else {
            if (fx) {
                $target
                    .addClass('fx-' + fx)
                    .on('animationend', function() {
                        $target.hide().trigger('yoi-hide');
                    });
            } else {
                $target.hide().trigger('yoi-hide');
            }
        }

    }

}

YOI.action.Hide.init = function() {
    
    /**
     *  Prepares all target elements. Adds initial styling
     *  to make CSS animations work properly.
     */
    
    var selectors = '\
        [yoi-action*="Hide"],\
        [yoi-action-1*="Hide"],\
        [yoi-action-2*="Hide"],\
        [yoi-action-3*="Hide"],\
        [yoi-action-4*="Hide"]\
    ';
    
    $(selectors).each(function() {

        // update options
        
        YOI.updateOptions($(this));
        
        // assign vars

        var $this          = $(this);
        var options        = $this.data().options;
        var targetSelector = options.Hide;
        var fx             = options.fx || false;
        var $target;
        
        // get the target element

        switch (targetSelector) {
            case 'self':
                $target = $this;
                break;
            case 'parent':
                $target = $this.parent();
                break;
            default:
                $target = $(targetSelector);
        }
        
        // prepare the target element
        
        if ($target instanceof jQuery) {
            
            // remove all fx-classes

            $target.removeClass(function (index, className) {
                return (className.match (/(^|\s)fx-\S+/g) || []).join(' ');
            });

            // add initial fx-classes

            if (fx) {
                $target.addClass('fx-' + fx + '-initial').removeClass('fx-' + fx);
            }
            
            // show the target element
        
            $target.show();
            
        }

    });

}