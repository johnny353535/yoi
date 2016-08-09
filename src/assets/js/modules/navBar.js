/** navBar.js */

var NavBar = (function() {

    // private vars
    // ============

    var simulatedDuration;
    var defaultMsg = Helper.locale === 'de' ? 'Bitte warten …' : 'Please wait …';
    var $badges    = undefined;

    var $monitor = $('\
        <div class="navBar__monitor">\
            <div class="center">\
                <span class="navBar__monitor__pulse"></span>\
                <span class="navBar__monitor__msg"></span>\
            </div>\
        </div>\
    ');

    // private functions
    // =================

    function initializeNavBar() {

        /**
         *  Initialize the nav bar.
         */

        $badges = $('.navBar .badge');
        $monitor.appendTo('.navBar').hide();

    }

    function showMsg(msgTxt) {

        /**
         *  Show a message inside the nav bar.
         *
         *  @param {string} msgTxt - the message to display
         */

        if (msgTxt !== undefined) {
            $monitor.find('.navBar__monitor__msg').text(msgTxt);     // show provided message
        } else {
            $monitor.find('.navBar__monitor__msg').text(defaultMsg); // show default message
        }

        // show and hide elements

        $badges.stop().animate({'top':'-100'});

        $monitor.fadeIn(function() {
            $monitor.fadeOut();
            $badges.stop().animate({'top':'10'});
        });

    }

    // initialize
    // ==========

    initializeNavBar();

    // public functions
    // ================

    return {
        init    : initializeNavBar,
        showMsg : showMsg
    };

})();
