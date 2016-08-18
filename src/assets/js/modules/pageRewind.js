// ===========================================================
//
//        File:    js/pageRewind.js
//        Descr.:    Scroll page back to the very top, animated.
//
// ===========================================================

$('#pageRewind')
    .addClass('inactive')
    .click(function(e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: 0}, 500);
    });

function pageRewind() {
    if ($('body').scrollTop() >= 500) {
        $('#pageRewind').removeClass('inactive');
    } else {
        $('#pageRewind').addClass('inactive');
    }
}

$(window).scroll(function() {
    pageRewind();
});
