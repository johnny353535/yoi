// ===========================================================
//
//        File:    js/shoppingWidgets.js
//        Descr.:    Toggle shopping widgets.
//
// ===========================================================

// set up

var quickListShowDelay = 150,
    quickListHideDelay = 500;

var cartWidget = $('#cartWidget').not('.status-empty'),
    quickList = $('#cartWidget-quicklist');

quickList.hide();

// events

cartWidget
    .on('touchstart',function() {
        cartWidget.off();
    })
    .on('mouseover',function(e) {
        e.preventDefault();
        delayShowCartWidget('start');
        delayHideCartWidget('stop');
    })
    .on('mouseout',function(e) {
        e.preventDefault();
        delayShowCartWidget('stop');
        delayHideCartWidget('start');
    });

quickList
    .on('mouseover',function() {
        delayHideCartWidget('stop');
    })
    .on('mouseout',function() {
        delayHideCartWidget('start');
    });

// functions

function delayShowCartWidget(action,button) {

    if (action === 'start') {

        Helper.setInterval('delayShowCartWidgetTimeout', 500, function() {
            cartWidget.addClass('active');
            quickList.slideDown('fast');
        });

    } else if (action === 'stop') {

        Helper.clearInterval('delayShowCartWidgetTimeout');

    }

}

function delayHideCartWidget(action,button) {

    if (action === 'start') {

        Helper.setInterval('delayHideCartWidgetTimeout', 500, function() {
            quickList.slideUp('fast',function() {
                cartWidget.removeClass('active');
            });
        });

    } else if (action === 'stop') {

        Helper.clearInterval('delayHideCartWidgetTimeout');

    }

}
