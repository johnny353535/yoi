/** update.js */

YOI.action.Update = function($trigger, $target, options) {

   /**
    *  Load remote content (AJAX) and inject the response data into a given
    *  element ($target) in the document.
    *
    *  @param {jQuery element} $trigger - the element which triggered the script
    *  @param {jQuery element} $target  - the target element
    *  @param {object}         options
    *
    *  Available options:
    *
    *  @option {string} url    - the url for the ajax request
    *  @option {string} type   - optional request type ("POST" or "GET"), default: "GET"
    *  @option {string} filter - optional CSS selector to filter an element from the response markup
    */

    if (YOI.isjQuery($target)) {

        var requestType = options.type || false;
        var requestUrl  = options.url || false;
        var filter      = options.filter || '#yoi-update-src';

        // localization

        var language = YOI.locale();

        var localization = {
            'en' : {
                'errorTitle' : 'Error',
                'errorMsg' : 'Could not load the requested data.'
            },
            'de' : {
                'errorTitle' : 'Fehler',
                'errorMsg' : 'Leider konnte der angeforderte Inhalt nicht geladen werden.'
            }
        };

        // templates

        var $errorMsg = $('\
            <div class="note note--negative note--large b-0 p-4">\
                <p class="note__body"><b>' + localization[language].errorTitle + ':</b> ' + localization[language].errorMsg + '</p>\
            </div>\
        ');

        var $spinner = $('<span class="spinner"></span>');

        // validate/set the request type

        if (requestType && (requestType.toLowerCase() === 'get' || requestType.toLowerCase() === 'post')) {
            requestType = requestType.toUpperCase();
        } else {
            requestType = 'GET';
        }

        // do ajax call if requestUrl was provided

        if (requestUrl) {
            $.ajax({

                url   : requestUrl,
                cache : false,
                type  : requestType,

                beforeSend: function() {
                    $target
                        .append($spinner.clone())
                        .trigger('yoi-update-before');
                },

                error: function() {
                    $target
                        .html($errorMsg.clone())
                        .trigger('yoi-update-error');
                },

                success: function(data) {
                    var $response = $(data).filter(filter);
                    $target
                        .html($response)
                        .trigger('yoi-update-success');
                }

            });
        }

    }

};
