/** log.js */

YOI.element.Log = (function() {
    
    // private vars
    // ============
    
    var $document  = $(document);

    // private functions
    // =================
    
    // // function logCustomEvents($console) {
    //
    //     /**
    //      *
    //      */
    //
    //     var yoiEvents = [
    //         'yoi-accordion:close',
    //         'yoi-accordion:open',
    //         'yoi-countdown:expire',
    //         'yoi-datepicker:hide',
    //         'yoi-datepicker:show',
    //         'yoi-filters:change',
    //         'yoi-filters:reset',
    //         'yoi-filters:update',
    //         'yoi-hide',
    //         'yoi-imgmagnifier:start',
    //         'yoi-imgmagnifier:stop',
    //         'yoi-input:blur',
    //         'yoi-input:change',
    //         'yoi-input:focus',
    //         'yoi-keypressed:arrowdown',
    //         'yoi-keypressed:arrowleft',
    //         'yoi-keypressed:arrowright',
    //         'yoi-keypressed:arrowup',
    //         'yoi-keypressed:enter',
    //         'yoi-keypressed:escape',
    //         'yoi-keypressed:space',
    //         'yoi-modal:error',
    //         'yoi-modal:hide',
    //         'yoi-modal:load',
    //         'yoi-modal:show',
    //         'yoi-pagerewind:end',
    //         'yoi-pagerewind:start',
    //         'yoi-pickbtn:change',
    //         'yoi-popover:hide',
    //         'yoi-popover:show',
    //         'yoi-rangeinput:change',
    //         'yoi-rangeinput:update',
    //         'yoi-rating:submit',
    //         'yoi-remove',
    //         'yoi-reveal',
    //         'yoi-scrollto:end',
    //         'yoi-scrollto:start',
    //         'yoi-slider:autoplaystart',
    //         'yoi-slider:autoplaystop',
    //         'yoi-slider:change',
    //         'yoi-stepper:down',
    //         'yoi-stepper:error',
    //         'yoi-stepper:up',
    //         'yoi-switch:off',
    //         'yoi-switch:on',
    //         'yoi-table:empty',
    //         'yoi-table:remove',
    //         'yoi-table:select',
    //         'yoi-tabs:change',
    //         'yoi-togglegroup:change',
    //         'yoi-togglegroup:reset',
    //         'yoi-tooltip:hide',
    //         'yoi-tooltip:show',
    //         'yoi-viewport:center',
    //         'yoi-viewport:in',
    //         'yoi-viewport:out'
    //         // 'yoi-scrolldirection:down',
    //         // 'yoi-scrolldirection:up',
    //     ];
    //
    //     $.each(yoiEvents, function(index, key) {
    //
    //         // on each custom "yoi-event", log the event name
    //         // to the console
    //
    //         var eventName = key;
    //
    //         $document.on(eventName, function() {
    //             consoleLog.unshift(eventName);
    //             log($console, consoleLog);
    //         });
    //
    //     });
    //
    // }
    
    function write($log, logInput) {
        
        /**
         *  Append text to the log and display it in
         *  the log in reverse order.
         *
         *  @param {jQuery dom object} $log
         *  @param {string}            logInput - the content, appended to the log
         */
        
        // cancel if no $log was found

        if ($log === undefined || $log.length < 1) return false;
        
        // resume by initializing $console.data().memory
        
        if ($log.data().memory === undefined) $log.data().memory = [];

        // write to $log.data().memory

        $log.data().memory.unshift(logInput);
        
        // assign vars
        
        var $logBody  = $log.find('.log__body').first();
        var logMemory = $log.data().memory;
        var logOutput = '';

        // print output to $log

        $.each(logMemory, function(index, key) {
            logOutput += '<p><span class="log__label">' + YOI.zeroPad(logMemory.length - index, 3) + '</span>' + logMemory[index] + '</p>';
            $logBody.html(logOutput);
        });
        
    }
    
    function clear() {
        
    }

    // public functions
    // ================

    return {
        write : write,
        clear : clear
    };

})();
