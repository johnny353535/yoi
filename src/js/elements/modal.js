/** modal.js */

YOI.element.Modal = (function() {

    // private vars
    // ============

    var $body        = $(document.body);
    var $document    = $(document);
    var $window      = $(window);
    var modalActive  = false;
    var loadedModals = [];
    var scrollTop    = false;
    var initialized  = false;

    // localization
    
    var language = YOI.locale();
    
    var localization = {
        'en' : {
            'btnLabelClose' : 'Close'
        },
        'de' : {
            'btnLabelClose' : 'Schließen'
        }
    };

    // templates

    var $modalCover = $('\
        <div class="modal__cover" id="modalCover" yoi-action="closeModal"></div>\
    ');

    var $modalContainer = $('\
        <div class="modal__container" id="modalContainer"></div>\
    ');

    var $modalCloseBtn = $('\
        <button class="btnDismiss" yoi-action="closeModal">\
            <span class="hidden">' + localization[language]['btnLabelClose'] + '</span>\
        </button>\
    ');
    
    var $modalTemplate = $('\
        <div class="modal">\
            <div class="modal__header">\
                <h3 class="modal__title"></h3>\
                <button class="btnDismiss" yoi-action="closeModal">\
                    <span class="hidden">' + localization[language]['btnLabelClose'] + '</span>\
                </button>\
            </div>\
            <div class="modal__body"></div>\
        </div>\
    ');

    // private methods

    function initialize($modalTrigger, options) {
        
        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $modalTrigger
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

        var $modalTrigger = YOI.createCollection('modal', $modalTrigger, options);

        // prepare dom

        if ($modalTrigger && !initialized) {
            prepareDom();
        }

        // prepare modal links

        if ($modalTrigger) $modalTrigger.each(function(index) {
            
            // cancel if already initialized
            
            if (YOI.isReady($(this))) return false;
            
            // proceed

            var $thisModalTrigger  = $(this);
            var options            = $thisModalTrigger.data().options;
            var thisModalGenerate  = options.generate || false;
            var thisModalTitle     = options.title || '';
            var thisModalBody      = options.body || '';
            var thisModalId        = options.id || '#modal-' + index;
            var thisModalModifiers = options.modifiers || false;
            var thisModalPath      = options.path || $thisModalTrigger.attr('href');
            var thisModalCache     = options.cache || false;

            // preload/cache

            if (thisModalCache) load(thisModalId, thisModalPath);

            // attach click event

            $thisModalTrigger.on('click', function(e) {
                
                e.preventDefault();
                
                if (thisModalGenerate === 'true') {
                    generate(thisModalTitle, thisModalBody, thisModalId, thisModalModifiers);
                } else {
                    show(thisModalId, thisModalPath);
                }

            });
            
            // set initialized
            
            YOI.setReady($(this));

        });

        // inititalize triggers to close all modals

        if (!initialized) initializeCloseTriggers();
        
        // set initialized flag
        
        initialized = true;

    }
    
    function prepareDom() {
        
        /**
         *  Append and hide $modalCover
         *  and $modalContainer.
         */
        
        $body.append($modalCover.clone().hide());
        $body.append($modalContainer.clone().hide());
        
        domPrepared = true;
        
    }
    
    function foundModal(modalId) {
        
        /**
         *  Returns true if modal is already loaded, false if not.
         *
         *  @param  {string} modalId 
         *  @return {bool}
         */
        
        return loadedModals.indexOf(modalId) === -1 ? false : true;
        
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

        if (modalId) {
            triggers = $(modalId).find('[yoi-action="closeModal"]');
        } else {
            triggers = $('[yoi-action="closeModal"]');
        }

        triggers.on('click', function() {
            closeAll();
        });

    }
    
    function generate(title, body, modalId, modifiers) {
        
        /**
         *  Generates a very simple modal. Add the title, body text and
         *  optional modifiers.
         *
         *  @param {string} title     - the modal title
         *  @param {string} body      - the modal body text
         *  @param {string} modalId   - modal id
         *  @param {string} modifiers - optional modifiers (CSS class names)
         */
        
        var $thisModal      = $modalTemplate.clone();
        var $thisModalTitle = $thisModal.find('.modal__title');
        var $thisModalBody  = $thisModal.find('.modal__body');
        var thisModalId     = modalId.split('#')[1];
        
        // add title, content and id
        
        $thisModalTitle.text(title);
        $thisModalBody.html('<p>' + body + '</p>');
        $thisModal.attr('id', thisModalId);
        
        // add modifiers
        
        if (modifiers) {
            $thisModal.addClass(modifiers);
        }
        
        if (!title) {
            $thisModal.addClass('modal--simple');
        }
        
        // add modal to markup
        
        if (!foundModal(modalId)) {
            $('#modalContainer').append($thisModal);
            loadedModals.push(modalId);
        }
        
        // initialize the close triggers and
        // show the generated modal
        
        initializeCloseTriggers(modalId);
        show(modalId);
        
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

        if (!foundModal(modalId)) {

            var $loadBin = $('<div>');

            // load into a placeholder element ($loadBin), append response to #modalContainer

            $loadBin.load(modalPath, function(response, status, xhr) {

                if (status === 'success') {

                    var $thisModal   = $(this).find('.modal').first();
                    var $images      = $(this).find('img');
                    var totalImages  = $images.length;
                    var imageCounter = 0;

                    // if valid modal markup was found

                    if ($thisModal.length) {

                        // register the modalId to an array of already loaded modals

                        loadedModals.push(modalId);

                        // prepare modal markup

                        $thisModal.attr('id', modalId.split('#')[1]);
                        $thisModal.find('.modal__header').append($modalCloseBtn.clone());

                        // append to dom & hide

                        $('#modalContainer').append($thisModal);
                        $(modalId).hide();

                        // update elements inside modal

                        initializeCloseTriggers(modalId);
                        
                        // optional callback

                        if (typeof callback === 'function') {
                            callback();
                        }
                        
                        // trigger load events
                    
                        $document.trigger('yoi-modal-load');
                        
                        // trigger load event after all images loaded
                        
                        $images.on('load', function() {

                            ++imageCounter;
                            
                            if (imageCounter === totalImages) {
                                $window.trigger('load');
                            }
                            
                        });

                    } else {

                        // treat as regular link
                        
                        openFallbackLink(modalPath);

                    }

                }

                if (status === 'error') {

                    // trigger error event
                    
                    $window.trigger('yoi-modal-error');

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

        if (foundModal(modalId)) {

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
            
            $document.trigger('yoi-modal-show');
            
            // re-initialize YOI elements
            
            YOI.initialize();

        } else {

            // if the modal is not found in dom, load it first, then show it

            load(modalId, modalPath, function() {
                show(modalId, modalPath);
            });

        }

    }

    function center(modalId) {

        /**
         *  Vertically center a modal.
         *
         *  @param {string} modalId - the modal id
         */

        var $modal  = $(modalId);
        var offSetY = $modal.height() / 2 * -1 - 10;

        // Does the modal vertically fit into the viewport (position: fixed)
        // or do we need to scroll (position: absolute)?

        var modalFitsIntoViewport = ($(window).height() - 50) < $modal.height();

        if (modalFitsIntoViewport) {
            $modal.css({'top': '1rem', 'marginTop': '0', 'position': 'absolute' }); // make "scrollable"
            $('html,body').animate({scrollTop: 0}, 500);                            // "rewind" page to top
        } else {
            $modal.css({'top': '50%', 'marginTop': offSetY, 'position': 'fixed' });
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
        
        if (YOI.foundModule('BrowserHistory')) {
            YOI.module.BrowserHistory.clearHash();
        }
        
        $document.trigger('yoi-modal-hide');
        
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

    // public methods
    // ==============

    return {
        init  : initialize,
        show  : show,
        close : closeAll
    };

})();
