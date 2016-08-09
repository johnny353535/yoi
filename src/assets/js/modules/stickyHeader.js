/** stickyHeader.js */

var StickyHeader = (function() {

    // private vars
    // ============

    var $header      = $('[data-stickyheader]');
    var btnLabelMenu = Helper.locale === 'de' ? 'Menu' : 'Menu';


    // dom elements
    // ============

    var $stickyHeader = $('\
        <div id="stickyHeader"></div>\
    ');

    var $toggleBtn = $('\
        <button class="btn btn--large btn--subtle">\
            <i aria-hidden="true" class="icon--067-s"></i>\
            <span>' + btnLabelMenu + '</span>\
        </button>\
    ');

    // private functions

    function initializeStickyHeader() {

        /**
         *  Initialize the sticky header.
         */

        // cancel if no sticky header was found

        if ($header.length < 1) return false;

        // ... or proceed

        if ($('#stickyHeader').length < 1) {

            $('#shoppingWidgets, #header .searchForm').wrapAll($stickyHeader);
            $toggleBtn.clone().appendTo('#stickyHeader');

            $('#stickyHeader > button').on('click',function() {

                if (!$('#stickyHeader #mainMenu').length) {

                    $(this).find('i').attr('class','icon--006-s');
                    $('#stickyHeader').addClass('extended');
                    $('#mainMenu').appendTo('#stickyHeader');

                } else {

                    $(this).find('i').attr('class','icon--067-s');
                    $('#stickyHeader').removeClass('extended');
                    $('#mainMenu').appendTo('#header .center');

                }

            });

        }

        $(window).scroll(function() {
            stickHeader();
        });

    }

    function stickHeader() {

        /**
         *  Stick header to top if certain threshold is reached
         *  when scrolling the page.
         */

        if ($('body').scrollTop() >= 400) {
            $('#stickyHeader').addClass('active');
        } else if ($('body').scrollTop() <= 95) {
            $('#stickyHeader').removeClass('active');
        }

    }

    // initialize

    initializeStickyHeader();

    // public functions

    return {
        init  : initializeStickyHeader
    };

})();
