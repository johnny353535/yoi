// ===========================================================
//
//        File:    js/hide.js
//        Descr.:    Simple script to hide elements.
//
// ===========================================================

$('[data-hide]').each(function(index){

    // set up vars

    var $this      = $(this),
        $data      = Helper.toObject($this.data('hide')),
        target     = $data.target,
        event      = $data.event !== undefined ? $data.event : 'click',
        transition = $data.transition !== undefined ? $data.transition : false;

    // apply event on trigger and hide target

    $this.on(event, function(e) {
        if (transition === 'fadeOut') {
            $(target).fadeOut();
        } else if (transition === 'slideUp') {
            $(target).slideUp();
        } else {
            $(target).hide();
        }
    });

});
