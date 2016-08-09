// ===========================================================
//
//		File:	js/drawerMenu.js
//		Descr.:	Three-level foldable list menu.
//
// ===========================================================

// open nested elements

$('.drawerMenu li:not(".open") .handle + ul').hide();

$('.drawerMenu .handle').on('tap', function(e) {

    if(!$(this).parent().hasClass('open')) {
        $(this).parent().addClass('open');
        $(this).parent().find('> ul').stop().slideDown('fast');
    } else if( $(this).parent().hasClass('open')) {
        $(this).parent().removeClass('open');
        $(this).parent().find('> ul').stop().slideUp('fast');
    }

});

// option to hide list items after defined max. item number

$('.drawerMenu ul').each(function() {

    var options = $(this).data('options');

    if (options === undefined) {

        return;

    } else {

        // read options

        var threshold = options.maxItems;
        var listItems = $(this).find('> li');

        // if the menu has more items than threshold,
        // cut off menu

        if (listItems.length > threshold) {

            listItems.slice(threshold).hide();

            // create and insert load-button

            var btnLoad = $('<button class="btnLoad">alle anzeigen</button>')
                .on('tap', function() {
                    $(this).parent().find('> li').show();
                    $(this).remove();
                })
                .insertAfter($(this).find('> li').eq(threshold));

        }

    }

});

// toggle states for list items that
// behave like radio buttons or checkboxes

$('.drawerMenu li[class^="radiobtn-"]').on('tap', function(e) {

    e.preventDefault();

    var options = $(this).parent('ul').data('options');

    if (options !== undefined && options.hasOwnProperty('activityMsg')) {
        NavBar.showMsg(options.activityMsg);
    } else {
        NavBar.showMsg();
    }

    if ($(this).hasClass('radiobtn-off')) {
        $(this).siblings('li.radiobtn-on').removeClass('radiobtn-on').addClass('radiobtn-off');
        $(this).addClass('radiobtn-on');
    } else if ($(this).hasClass('radiobtn-on')) {
        $(this).removeClass('radiobtn-on').addClass('radiobtn-off');
    }

    // update data-bits

    var dataBit = $(this).find('.dataBit');
    var dataBitInHandle = $(this).parent().prev('.handle').find('.dataBit');

    if (dataBit.length > 0) {
        dataBitInHandle.html(dataBit.html());
        Helper.blink(dataBitInHandle);
    }

});

$('.drawerMenu li[class^="checkbox-"]').on('tap', function(e) {

    e.preventDefault();

    var options = $(this).parent('ul').data('options');
    var parentDrawerMenu = $(this).parents('.drawerMenu').eq(0);
    var btnFilter = parentDrawerMenu.next('.btnFilter').removeClass('hidden');

    if (options !== undefined && options.hasOwnProperty('activityMsg')) {
        NavBar.showMsg(options.activityMsg);
    } else {
        NavBar.showMsg();
    }

    // add filter

    if ($(this).hasClass('checkbox-off')) {
        $(this).removeClass('checkbox-off').addClass('checkbox-on');
        var buttonTxt = $(this).text();
        var button = $('<li class="removeable"><a href="#">' + buttonTxt + '</a></li>');
        button.appendTo(btnFilter.find('ul'));
        BtnFilters.init();
        return false;
    }

    // remove filter

    if ($(this).hasClass('checkbox-on')) {
        $(this).removeClass('checkbox-on').addClass('checkbox-off');
        return false;
    }

});
