/** modal.js */

YOI.Modal = (function() {

    // private vars
    // ============

    var $body         = $(document.body);
    var $document     = $(document);
    var modalActive   = false; // Is any modal currently visible?
    var loadedModals  = [];    // Which modals were loaded (ajax) so far?
    var scrollTop     = false; // How far is the page scrolled?
    var modalIdIndex  = 0;     // An index for internally generated modal ids.
    var btnLabelClose = YOI.locale === 'de' ? 'Schließen' : 'Close';

    var $modalCover = $('\
        <div class="modal__cover" id="modalCover" yoi-action="closeModal"></div>\
    ');

    var $modalContainer = $('\
        <div class="modal__container" id="modalContainer"></div>\
    ');

    var $modalCloseBtn = $('\
        <button class="btnDismiss" yoi-action="closeModal">\
            <span class="hidden">' + btnLabelClose + '</span>\
        </button>\
    ');

    // private methods

    function initialize($modal, options) {
        
        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $inputElement
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {string} id   - id-selector, eg. "#modal-test"
         *                          To reference modals internally, this script uses generated ids, which
         *                          may be overridden by this option.
         *
         *  @option {string} path - Path to modal page, eg. "pages/modal_test.html".
         *                          Any element can be linked to a modal. If it's not a link or a link
         *                          with a href that does not link to a modal, the modal path may be
         *                          overridden by this option.
         *
         *  @option {bool} cache  - If true, the referenced modal will preload in the background.
         */

        var $modal = YOI.createCollection('modal', $modal, options);

        // prepare dom

        if ($modal) prepareDom();

        // prepare modal links

        if ($modal) $modal.each(function() {

            var $thisModal = $(this);

            var options        = $thisModal.data().options;
            var thisModalId    = options.id !== undefined ? options.id : generateId();
            var thisModalPath  = options.path !== undefined ? options.path : $thisModal.attr('href');
            var thisModalCache = options.cache !== undefined ? options.cache : false;

            // preload/cache

            if (thisModalCache) load(thisModalId, thisModalPath);

            // attach click event

            $thisModal.on('click', function(e) {

                e.preventDefault();
                show(thisModalId, thisModalPath);

            });

        });

        // inititalize triggers to close all modals

        initializeCloseTriggers();

    }
    
    function prepareDom() {
        
        /**
         *  
         *
         *  @param  {}  - 
         *  @return {}  - 
         */
        
        $body.append($modalCover.clone().hide());
        $body.append($modalContainer.clone().hide());
        
    }

    function initializeCloseTriggers(modalId) {

        /**
         *  Attach modal close action to elements with
         *  yoi-action="closeModal".
         *
         *  Triggers are either all matching elements or
         *  only mathing elements inside the provided scope
         *  of modalId.
         *
         *  @param {string} modalId - the modal id
         */

        var triggers;

        if (modalId !== undefined) {
            triggers = $(modalId).find('[yoi-action="closeModal"]');
        } else {
            triggers = $('[yoi-action="closeModal"]');
        }

        triggers.on('click', function() {
            closeAll();
        });

    }

    function load(modalId, modalPath, callback) {

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

                    var thisModal = $(this).find('.modal').first();

                    // if valid modal markup was found

                    if (thisModal.length) {

                        // register the modalId to an array of already loaded modals.

                        loadedModals.push(modalId);

                        // prepare modal markup

                        thisModal.attr('id', modalId.split('#')[1]);
                        thisModal.find('.modal__header').append($modalCloseBtn.clone());

                        // append to dom & hide

                        $('#modalContainer').append(thisModal);
                        $(modalId).hide();

                        // update elements inside modal

                        initializeCloseTriggers(modalId);

                        if (YOI.foundModule('YOI.CustomFormElements'))
                            CustomFormElements.init(modalId);

                        // optional callback

                        if (typeof callback === 'function') {
                            callback();
                        }
                        
                        $window.trigger('yoi-modal:load');

                    } else {

                        // treat as regular link
                        openFallbackLink(modalPath);

                    }

                }

                if (status === 'error') {

                    // fail silently
                    
                    $window.trigger('yoi-modal:error');

                }

            });

        }

    }

    function show(modalId, modalPath) {

        /**
         *  Open/show a modal.
         *
         *  @param {string} modalId   - the modal id
         *  @param {string} modalPath - the path to the modal page
         */

        if (loadedModals.indexOf(modalId) === -1) {

            // if the modal is not found in dom, load it first, then show it

            load(modalId, modalPath, function(){
                show(modalId, modalPath);
            });

        } else {

            // if modal is already in dom, simply show it

            $('#modalCover').fadeIn('fast');
            $('#modalContainer').show();
            $(modalId).show();

            modalActive = true;

            // center modal

            center(modalId);

            // On mobile, scroll page to top when opening the modal
            // but always jump back to the last scroll position when
            // closing the modal.

            if (YOI.environment('mobile')) {
                scrollTop = $('body').scrollTop();
                $('body').scrollTop(0);
            }
            
            $document.trigger('yoi-modal:show');

        }

    }

    function center(modalId) {

        /**
         *  Vertically center a modal.
         *
         *  @param {string} modalId - the modal id
         */

        var modal   = $(modalId);
        var offSetY = modal.height() / 2 * -1 - 10;

        // Does the modal vertically fit into the viewport (position: fixed)
        // or do we need to scroll (position: absolute)?

        var modalFitsIntoViewport = ($(window).height() - 50) < modal.height();

        if (modalFitsIntoViewport) {
            modal.css({'top': '1rem', 'marginTop': '0', 'position': 'absolute' }); // make "scrollable"
            $('html,body').animate({scrollTop: 0}, 500); // "rewind" page to top
        } else {
            modal.css({'top': '50%', 'marginTop': offSetY, 'position': 'fixed' });
        }

    }

    function closeAll() {

        /**
         *  Close all modals.
         */

        $('#modalCover').fadeOut('fast');
        $('#modalContainer, #modalContainer .modal').hide();

        if (scrollTop > 0) {
            $('body').scrollTop(scrollTop);
        }

        modalActive = false;
        
        if (YOI.foundModule('YOI.BrowserHistory')) {
            BrowserHistory.clearHash();
        }
        
        $document.trigger('yoi-modal:hide');
        
    }

    function detachAll() {

        /**
         *  Close and remove all modals.
         */

        $('#modalContainer .modal, #modalCover').fadeOut('fast',function() {

            $('#modalContainer').empty().hide();
            $('body').css('overflow','auto');

            modalActive = false;

        });

    }

    function generateId() {

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

    initialize();

    // public methods
    // ==============

    return {
        init      : initialize,
        show      : show,
        close     : closeAll
    }

})();
