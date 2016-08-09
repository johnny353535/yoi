// ===========================================================
//
//		File:	js/stickyTeasers.js
//		Descr.:	-
//
// ===========================================================

var closeStickyTeaserBtn = $('<button class="btn btn--subtle pos-tr">\
                                  <span class="hidden">schliessen</span>\
                                  <i class="icon--006-s" aria-hidden="true"></i>\
                              </button>');

$('.stickyTeaser').each(function() {

    var that = $(this);
    var closeBtn = closeStickyTeaserBtn.clone();

    closeBtn.on('click', function(e){
        e.preventDefault();
        that.addClass('removed');
    });

    that.append(closeBtn);

});
