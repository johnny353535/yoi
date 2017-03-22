/** update.js */

YOI.module.Update = (function() {

    // private vars
    // ============
    
    // localization
    
    var language = YOI.locale();
    
    var localization = {
        'en' : {
            'errorTitle' : 'Fehler',
            'errorMsg' : 'Leider konnte der angeforderte Inhalt nicht geladen werden. Unser Team wurde informiert. Tipp: Stellen Sie sicher, dass eine Internetverbindung besteht.'
        },
        'de' : {
            'errorTitle' : 'Error',
            'errorMsg' : 'Could not load data. A notice was sent to our support team. Hint: Are you sure your internet connection is working?'
        }
    };
    
    // templates
    
    var $errorMsg = $('\
        <div class="note note--error note--large">\
            <h3 class="note__headline">' + localization[language].errorTitle + '</h3>\
            <div class="note__body">\
                <p>' + localization[language].errorMsg + '</p>\
            </div>\
        </div>\
    ');

    // private functions
    // =================

    function initialize($updateTrigger, options) {

       /**
        *  Initialize the script.
        *
        *  @param {jQuery dom object} $updateTrigger
        *  @param {object}            options
        *
        *  Available options:
        *
        *  @option {string} requestUrl  - the url for the ajax request
        *  @option {string} requestType - optional request type ("POST" or "GET"), default: "GET"
        */
       
        var $updateTrigger = YOI.createCollection('update', $updateTrigger, options);

        if ($updateTrigger) $updateTrigger.each(function() {
            
            // proceed

            var $thisTrigger = $(this);
            var options      = $thisTrigger.data().options;
            var requestType  = options.type !== undefined ? options.type : false;
            var requestUrl   = options.url !== undefined ? options.url : false;
            var $target      = options.target !== undefined ? $(options.target) : false;

            // validate request type

            if (!requestType) {
                requestType = 'GET';
            } else if (requestType.toLowerCase() === 'get' || requestType.toLowerCase() === 'post') {
                requestType = requestType.toUpperCase();
            }

            // proceed if requestUrl was provided and
            // $target is a proper jQuery object

            if (requestUrl || $target instanceof jQuery) {
                $thisTrigger.on('click', function(e) {
                    e.preventDefault();
                    $.ajax({
                        url: requestUrl,
                        cache: false,
                        type: requestType,
                        beforeSend: function(){
                            $target.addClass('loading');
                        },
                        error: function() {
                            $target.html($errorMsg.clone());
                        },
                        success: function(data) {
                            var $responseMarkup = $(data).filter('#ajaxContent');
                            $target.html($responseMarkup);
                        },
                        complete: function(response){
                            $target.removeClass('loading');
                        }
                    });
                });
            }

        });

    }

    // public functions
    // ================

    return {
        init : initialize
    };

})();
