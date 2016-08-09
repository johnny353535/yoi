// ===========================================================
//
//		File:	js/stickyElements.js
//		Descr.:	Stick elements to position when they reach top
//				of viewport (through scrolling).
//
// ===========================================================

var stickyElements = $('.sticky');
var stickyElementsAttr = [];

stickyElements.each(function() {

    var	prevMargin = $(this).prev().length > 0 ? $(this).prev().css('marginBottom').split('px')[0] : 0,
        itemOffset = $(this).offset().top + prevMargin * 2;
        itemWidth = $(this).outerWidth();
        itemHeight = $(this).outerHeight();

    stickyElementsAttr.push([itemOffset,itemWidth,itemHeight]);

});

function stickItems() {

    // TODO: make sure sticky item scrolls out of viewport
    // once it reached it's parent's bottom

    var bodyOffset = $('body').scrollTop(),
        bodyHeight = $(window).height();

    stickyElements.each(function(index,value) {

        var	elementOffset = stickyElementsAttr[index][0],
            elementHeight = stickyElementsAttr[index][2],
            elementWidth = stickyElementsAttr[index][1];

        var	scrolledPastElementPosition = bodyOffset >= elementOffset - 140,
            viewportIsLargerThanMenu = bodyHeight > elementHeight;

        var placeHolder = $('<div>',{
            'class': 'stickyPlaceholder',
            'css': {
                'height': elementHeight,
                'width': elementWidth,
                'background': 'transparent'
            }
        });

        if (scrolledPastElementPosition && viewportIsLargerThanMenu) {

            if (!$(this).next().hasClass('stickyPlaceholder')) {
                $(this).after(placeHolder);
            }
            $(this).css({
                'width': elementWidth,
                'position': 'fixed',
                'top': 140,
                'zIndex': 100
            });

        } else {

            $(this).next('.stickyPlaceholder').remove();
            $(this).css({
                'width': '',
                'position': '',
                'top': '',
                'zIndex': ''
            });

        }

    });

}

$(window).scroll(function() {
    stickItems();
});
