// ===========================================================
//
//		File:	js/remove.js
//		Descr.:	Remove an element from the dom.
//		Status:	Done.
//
// ===========================================================

(function() {

    var parentElements = '.dataElement, .item';

    $('[data-action="remove"]').each(function() {

        var $this = $(this);
        var	$thisParent = $this.parents(parentElements);

        $this.on('click', function(e) {

            e.preventDefault();
            $thisParent.fadeOut(function(){
                $thisParent.remove();
            });

        });

    });

})();
