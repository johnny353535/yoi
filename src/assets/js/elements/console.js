/** console.js */

YOI.Console = (function() {
    
    // private vars
    // ============
    
    var $document   = $(document);
    var consoleLog  = [];
    
    // make the console listen to these events:
    
    var yoiEvents = [
        'yoi-accordion:close',
        'yoi-accordion:open',
        'yoi-modal:load',
        'yoi-modal:error',
        'yoi-modal:show',
        'yoi-modal:hide',
        'yoi-viewport:in',
        'yoi-viewport:center',
        'yoi-viewport:out',
        // 'yoi-scrolldirection:up',
        // 'yoi-scrolldirection:down',
        'yoi-pagerewind:start',
        'yoi-pagerewind:end',
        'yoi-pickbtn:change',
        'yoi-popover:show',
        'yoi-popover:hide',
        'yoi-rating:submit',
        'yoi-stepper:up',
        'yoi-stepper:down',
        'yoi-stepper:error',
        'yoi-switch:on',
        'yoi-switch:off',
        'yoi-table:select',
        'yoi-table:remove',
        'yoi-table:empty',
        'yoi-tooltip:show',
        'yoi-tooltip:hide',
        'yoi-remove',
        'yoi-hide',
        'yoi-reveal',
        'yoi-scrollto:start',
        'yoi-scrollto:end',
        'yoi-togglegroup:change',
        'yoi-togglegroup:reset'
    ];

    // private functions
    // =================

    function initialize() {

        /**
         *  Initialize the "console". It's pretty much just a logger for custom
         *  "yoi-events".
         */
        
        $.each(yoiEvents, function(index, key) {
            
            // on each custom "yoi-event", log the event name
            // to the console
            
            var eventName = key;
            
            $document.on(eventName, function() {
                consoleLog.unshift(eventName);
                log(consoleLog);
            });
            
        });

    }
    
    function log(consoleLog) {
        
        /**
         *  Append text to the consoleLog array and display it in
         *  the yoi-console in reverse order.
         *
         *  @param {string} consoleLog - the complete console log
         */
        
        var $yoiConsole     = $('[yoi-console]').first();
        var $yoiConsoleBody = $yoiConsole.find('.console__body').first();
        var consoleOutput   = '';
        
        $.each(consoleLog, function(index, key) {
            consoleOutput += '<p><span class="console__label">' + YOI.zeroPad(consoleLog.length - index, 3) + '</span>' + consoleLog[index] + '</p>';
            $yoiConsoleBody.html(consoleOutput);
        });
    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init : initialize,
        log  : log
    }

})();
