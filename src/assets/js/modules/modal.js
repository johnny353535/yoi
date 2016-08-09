/** modal.js */

var Modal = (function() {

    // private vars
    // ============

    var modalActive   = false; // Is any modal currently visible?
    var loadedModals  = [];    // Which modals were loaded (ajax) so far?
    var scrollTop     = false; // How far is the page scrolled?
    var modalIdIndex  = 0;     // An index for internally generated modal ids.
    var btnLabelClose = Helper.locale === 'de' ? 'Schließen' : 'Close';

    var $modalCover = $('\
        <div id="modalCover" data-action="closeModal"></div>\
    ');

    var $modalContainer = $('\
        <div id="modalContainer"></div>\
    ');

    var $modalCloseBtn = $('\
        <button class="btn btn--flat" data-action="closeModal">\
            <span class="hidden">' + btnLabelClose + '</span>\
            <i class="icon--006-s" aria-hidden="true"></i>\
        </button>\
    ');

    var $modalCloseBtnMobile = $('\
        <button class="btn btn--large btn--subtle" data-action="closeModal">\
            <span class="hidden">' + btnLabelClose + '</span>\
            <i class="icon--006" aria-hidden="true"></i>\
        </button>\
    ');

    // private methods

    function initializeModal(modalId) {

        /**
         *  Prepare dom elements, target all elements with data-modal attribute,
         *  read modal-related options to override default values/behaviour
         *  and attach a click-event to show the related modal page.
         *
         *  Modal links may have options, provided by a key/value list inside the
         *  data-modal attribute (eg. data-modal="cache:true;").
         *
         *  @option {string} id     - id-selector, eg. "#modal-test"
         *                            To reference modals internally, this script uses generated ids, which
         *                            may be overridden by this option.
         *
         *  @option {string} path   - Path to modal page, eg. "pages/modal_test.html".
         *                            Any element can be linked to a modal. If it's not a link or a link
         *                            with a href that does not link to a modal, the modal path may be
         *                            overridden by this option.
         *
         *  @option {bool} cache    - If true, the referenced modal will preload in the background.
         *
         *  @param {string} modalId - the modal id
         */

        // prepare dom

        $(document.body).append($modalCover.clone().hide());
        $(document.body).append($modalContainer.clone().hide());

        // prepare modal links

        $('[data-modal]').each(function() {

            var $this = $(this);

            var options        = Helper.toObject($this.data('modal'));
            var thisModalId    = options !== undefined && options.id    !== undefined ? options.id    : generateModalId();
            var thisModalPath  = options !== undefined && options.path  !== undefined ? options.path  : $this.attr('href');
            var thisModalCache = options !== undefined && options.cache !== undefined ? options.cache : false;

            // preload/cache

            if (thisModalCache) loadModal(thisModalId, thisModalPath);

            // attach click event

            $this.on('click', function(e) {

                e.preventDefault();
                showModal(thisModalId, thisModalPath);

            });

        });

        // inititalize triggers to close all modals

        initializeModalCloseTriggers();

    }

    function initializeModalCloseTriggers(modalId) {

        /**
         *  Attach modal close action to elements with
         *  data-action="closeModal".
         *
         *  Triggers are either all matching elements or
         *  only mathing elements inside the provided scope
         *  of modalId.
         *
         *  @param {string} modalId - the modal id
         */

        var triggers;

        if (modalId !== undefined) {
            triggers = $(modalId).find('[data-action="closeModal"]');
        } else {
            triggers = $('[data-action="closeModal"]');
        }

        triggers.on('click', function() {
            closeModals();
        });

    }

    function loadModal(modalId, modalPath, callback) {

        /**
         *  Load a modal (ajax) and inject it into the dom.
         *  If the target modal is already in the dom, do nothing.
         *
         *  @param {string} modalId             - the modal id
         *  @param {string} modalPath           - the path to the modal page
         *  @param {callback function} callback - a function to execute as callback
         */

        if (loadedModals.indexOf(modalId) === -1) {

            var $loadBin = $('<div>');

            // load into a placeholder element ($loadBin), append response to #modalContainer

            $loadBin.load(modalPath, function(response, status, xhr) {

                if (status === 'success') {

                    var thisModal = $(this).find('.modal, .modal-s').first();

                    // if valid modal markup was found

                    if (thisModal.length) {

                        // register the modalId to an array of already loaded modals.

                        loadedModals.push(modalId);

                        // prepare modal markup

                        thisModal.attr('id', modalId.split('#')[1]);
                        thisModal.find('.modal__header').append($modalCloseBtn.clone());
                        thisModal.find('.modal-s__header').append($modalCloseBtnMobile.clone());

                        // append to dom & hide

                        $('#modalContainer').append(thisModal);
                        $(modalId).hide();

                        // update elements inside modal

                        initializeModalCloseTriggers(modalId);

                        if (Helper.foundModule('CustomFormElements'))
                            CustomFormElements.init(modalId);

                        // optional callback

                        if (typeof callback === 'function') {
                            callback();
                        }

                    } else {

                        // treat as regular link
                        openFallbackLink(modalPath);

                    }

                }

                if (status === 'error') {

                    // fail silently

                }

            });

        }

    }

    function showModal(modalId, modalPath) {

        /**
         *  Open/show a modal.
         *
         *  @param {string} modalId   - the modal id
         *  @param {string} modalPath - the path to the modal page
         */

        if (loadedModals.indexOf(modalId) === -1) {

            // if the modal is not found in dom, load it first, then show it

            loadModal(modalId, modalPath, function(){
                showModal(modalId, modalPath);
            });

        } else {

            // if modal is already in dom, simply show it

            $('#modalCover').fadeIn('fast');
            $('#modalContainer').show();
            $(modalId).show();

            modalActive = true;

            // center modal

            centerModal(modalId);

            // On mobile, scroll page to top when opening the modal
            // but always jump back to the last scroll position when
            // closing the modal.

            if (Helper.environment('mobile')) {
                scrollTop = $('body').scrollTop();
                $('body').scrollTop(0);
            }

        }

    }

    function centerModal(modalId) {

        /**
         *  Vertically center a modal.
         *
         *  @param {string} modalId - the modal id
         */

        var modal = $(modalId);
        var offSetY = modal.height() / 2 * -1 - 10;

        // Does the modal vertically fit into the viewport (position: fixed)
        // or do we need to scroll (position: absolute)?

        var modalFitsIntoViewport = ($(window).height() - 50) < modal.height();

        if (modalFitsIntoViewport) {
            modal.css({'top': '10px', 'marginTop': '0', 'position': 'absolute' }); // make "scrollable"
            $('html,body').animate({scrollTop: 0}, 500); // "rewind" page to top
        } else {
            modal.css({'top': '50%', 'marginTop': offSetY, 'position': 'fixed' });
        }

    }

    function closeModals() {

        /**
         *  Close all modals.
         */

        $('#modalCover').fadeOut('fast');
        $('#modalContainer, #modalContainer .modal, #modalContainer .modal-s').hide();

        if (scrollTop > 0) {
            $('body').scrollTop(scrollTop);
        }

        modalActive = false;
        if (Helper.foundModule('BrowserHistory'))
            BrowserHistory.clearHash();

    }

    function detachModals() {

        /**
         *  Close and remove all modals.
         */

        $('#modalContainer .modal, #modalCover').fadeOut('fast',function() {

            $('#modalContainer').empty().hide();
            $('body').css('overflow','auto');

            modalActive = false;

        });

    }

    function generateModalId() {

        /**
         *  Generate a simple "unique" modal id for internal reference.
         *
         *  @return {string} - a unique modal id
         */

        return '#modal-' + modalIdIndex++;

    }

    function openFallbackLink(modalPath) {

        /**
         *  If a referenced modal is ill-formatted (or simply not a modal page),
         *  fall back to simply open the linked page.
         *
         *  @param {string} modalPath - the path to the modal page
         */

        window.location = window.location.protocol + '//' + window.location.host + '/' + modalPath;

    }

    // initialize
    // ==========

    initializeModal();

    // public methods
    // ==============

    return {
        init   : initializeModal,
        load   : loadModal,
        show   : showModal,
        close  : closeModals,
        detach : detachModals
    }

})();
