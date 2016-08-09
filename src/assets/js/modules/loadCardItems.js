// ===========================================================
//
//		File:	js/loadCardItems.js
//		Descr.:	Split page in subpages, load pagination
//				after all subpages are displayed.
//
// ===========================================================

// TODO:
// - Add option to load cards asynchronically (ajax), use "infinite" as data-options keyword.
// - Add option to infinitely load cards.

$('.itemCards').each(function() {

    var options = $(this).data('options');

    if (options === undefined || options.indexOf('itemsPerPage-') === -1) {

        return;

    } else {

        // read number of items per page

        var itemsPerPage = options.split('itemsPerPage-')[1].split(' ')[0],
            itemList = $(this),
            listItems = itemList.find('.item'),
            slice,
            pages = [],
            currentPage = 0;

        while (listItems.length > 0) {
            slice = listItems.splice(0,itemsPerPage);
            pages.push(slice);
        }

        // hide all pages, show first one

        $(pages).each(function() { $(this).addClass('hidden'); });
        $(pages[0]).removeClass('hidden');

        // create and append load-button

        var nextPageButton = $('<a class="btnLoad">\
                                    <span><b>' + itemsPerPage + '</b> weitere laden</span>\
                                </a>')
                             .click(function(e) {
                                currentPage++;
                                loadNextPage(pages, currentPage, e.target);
                             })
                             .appendTo($(this));

    }

});

var loadNextPage = function(pages, currentPageNo, button) {

    NavBar.showMsg('Produkte laden …');

    if (currentPageNo + 1 < pages.length) {

        // apped next page
        $(pages[currentPageNo]).removeClass('hidden');

    } else {

        // apped next page
        $(pages[currentPageNo]).removeClass('hidden');

        // replace button with pagination
        var pagination = $('<ul class="pagination large stripped">\
                                <li>\
                                    <a class="btnPrev" href="#">\
                                        <span class="hidden">vorherige Seite</span>\
                                        <i aria-hidden="true" class="icon--008-s"></i>\
                                    </a>\
                                </li>\
                                <li class="current">\
                                    <a href="#">1</a>\
                                </li>\
                                <li>\
                                    <a href="#">2</a>\
                                </li>\
                                <li>\
                                    <a href="#">3</a>\
                                </li>\
                                <li>\
                                    <a href="#">4</a>\
                                </li>\
                                <li>\
                                    <a href="#">5</a>\
                                </li>\
                                <li>\
                                    <a class="btnNext" href="#">\
                                        <span class="hidden">nächste Seite</span>\
                                        <i aria-hidden="true" class="icon--007-s"></i>\
                                    </a>\
                                </li>\
                            </ul>');
        $(button).replaceWith(pagination); // somehow buggy in webkit ...

    }

}
