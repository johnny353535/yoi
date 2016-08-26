// ===========================================================
//
//        File:    js/reveal.js
//        Descr.:    Simple script to reveal hidden elements.
//
// ===========================================================

$('[data-reveal]').each(function(index){

    // set up vars

    var $this      = $(this);
    var $data      = Helper.toObject($this.data('reveal'));

    var target     = $data.target !== undefined ? $data.target : false;
    var event      = $data.event !== undefined ? $data.event : 'click';
    var transition = $data.transition !== undefined ? $data.transition : false;
    var hideTarget = $data.hideTarget !== undefined ? $data.hideTarget : true;

    // cancel if no target was defined

    if (!target) return false;

    // hide target elements first

    if (hideTarget) $(target).hide();

    // apply event on trigger and reveal target

    $this.on(event, function(e) {
        if (transition === 'fadeIn') {
            $(target).fadeIn();
        } else if (transition === 'slideDown') {
            $(target).slideDown();
        } else {
            $(target).show();
        }
    });

});
