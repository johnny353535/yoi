/** console.js */

YOI.element.Console = (function() {
    
    // private vars
    // ============
    
    var $document   = $(document);
    var consoleLog  = [];
    
    // make the console listen to these events:
    
    var yoiEvents = [
        
        'yoi-accordion:close',
        'yoi-accordion:open',
        'yoi-countdown:expire',
        'yoi-datepicker:hide',
        'yoi-datepicker:show',
        'yoi-filters:change',
        'yoi-filters:reset',
        'yoi-filters:update',
        'yoi-hide',
        'yoi-imgmagnifier:start',
        'yoi-imgmagnifier:stop',
        'yoi-input:blur',
        'yoi-input:change',
        'yoi-input:focus',
        'yoi-modal:error',
        'yoi-modal:hide',
        'yoi-modal:load',
        'yoi-modal:show',
        'yoi-pagerewind:end',
        'yoi-pagerewind:start',
        'yoi-pickbtn:change',
        'yoi-popover:hide',
        'yoi-popover:show',
        'yoi-rangeinput:change',
        'yoi-rangeinput:update',
        'yoi-rating:submit',
        'yoi-remove',
        'yoi-reveal',
        'yoi-scrollto:end',
        'yoi-scrollto:start',
        'yoi-slider:autoplaystart',
        'yoi-slider:autoplaystop',
        'yoi-slider:change',
        'yoi-stepper:down',
        'yoi-stepper:error',
        'yoi-stepper:up',
        'yoi-switch:off',
        'yoi-switch:on',
        'yoi-table:empty',
        'yoi-table:remove',
        'yoi-table:select',
        'yoi-tabs:change',
        'yoi-togglegroup:change',
        'yoi-togglegroup:reset',
        'yoi-tooltip:hide',
        'yoi-tooltip:show',
        'yoi-viewport:center',
        'yoi-viewport:in',
        'yoi-viewport:out'
        // 'yoi-scrolldirection:down',
        // 'yoi-scrolldirection:up',
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

    // public functions
    // ================

    return {
        init : initialize,
        log  : log
    };

})();
