/** browserHistory.js */

YOI.BrowserHistory = (function() {

    // private vars
    // ============

    var currentScrollTop;
    var $window = $(window);

    // private functions
    // =================

    function pushHash(hashString) {
        history.pushState(null, null, window.location.pathname + hashString);
    }

    function replaceHash(hashString) {
        history.replaceState(null, null, window.location.pathname + hashString);
    }

    function clearHash() {
        history.replaceState('', document.title, window.location.pathname);
    }

    // public functions
    // ================

    return {
        pushHash    : pushHash,
        replaceHash : replaceHash,
        clearHash   : clearHash
    }

})();
