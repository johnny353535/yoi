/** log.js */

YOI.element.Log = (function() {

    // private functions
    // =================
    
    function write($log, logInput) {
        
        /**
         *  Append text to the log and display it in reverse order.
         *
         *  @param {jQuery dom object} $log
         *  @param {string | html}     logInput - the content, appended to the log
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
    
    function clear($log) {
        
        /**
         *  Clear the log's memory and display.
         *
         *  @param {jQuery dom object} $log
         */
        
        // cancel if no $log was found

        if ($log === undefined || $log.length < 1) return false;
        
        // clear the log's memory & the log's display
        
        $log.data().memory = [];
        $log.find('.log__body').first().html('<p></p>');
        
    }

    // public functions
    // ================

    return {
        write : write,
        clear : clear
    };

})();
