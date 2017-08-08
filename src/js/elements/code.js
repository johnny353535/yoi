/** code.js */

YOI.element.Code = (function() {

    // private functions
    // =================
    
    function initialize() {

        /**
         *  Formats <code> tags with html content. Listens for specially formatted html-comments as flags:
         *
         *  <!-- example -->      = injects the markup above the <code> tag
         *  <!-- example:tabs --> = replaces the <code> tag with a tabbed widget (rendered markup + code)
         */

        var $codeWrapper = $('div[class*="highlighter"]');
        var tabPageIndex = 0;

        $.each($codeWrapper, function(index) {
            
            // // cancel if already initialized
            //
            // if (YOI.isReady($(this))) return false;
            //
            // // proceed

            var $thisCodeWrapper    = $(this);
            var $thisCode           = $thisCodeWrapper.find('code');
            var exampleTag          = '<!-- example -->';
            var exampleTagTabbed    = '<!-- example:tabs -->';
            var thisExample         = $thisCode.text().split(exampleTag).length > 1 ? $thisCode.text().split(exampleTag)[1] : false;
            var thisExampleTabbed   = $thisCode.text().split(exampleTagTabbed).length > 1 ? $thisCode.text().split(exampleTagTabbed)[1] : false;

            if (thisExampleTabbed) {

                // set indexes to generate unique ids
                // for tab pages

                var firstIndex  = ++tabPageIndex;
                var secondIndex = ++tabPageIndex;

            }

            if (thisExample) {

                // markup variable

                var _ = '';

                // remove the "exampleTag" and the first line break

                $thisCode.find('.c:contains("' + exampleTag + '")').remove();

                // template for tabbed code preview

                _ =    '<div class="code__example">';
                _ +=       '<div class="code__result">';
                _ +=           thisExample;
                _ +=       '</div>';
                _ +=       '<div class="code__source">';
                _ +=           $thisCodeWrapper.html();
                _ +=       '</div>';
                _ +=   '</div>';

            }

            if (thisExampleTabbed) {

                // markup variable

                var _ = '';

                // remove the "exampleTagTabbed" and the first line break

                $thisCode.find('.c:contains("' + exampleTagTabbed + '")').remove();

                // template for tabbed code preview

                _ =    '<div class="code__example tabs">';
                _ +=       '<div class="tabs__menu tabs__menu--loose" yoi-tabs>';
                _ +=           '<ul class="tabs__items">';
                _ +=               '<li class="tabs__item">';
                _ +=                   '<a class="tabs__link" href="#exampleTab-' + firstIndex + '">Example</a>';
                _ +=               '</li>';
                _ +=               '<li class="tabs__item">';
                _ +=                   '<a class="tabs__link" href="#exampleTab-' + secondIndex + '">Code</a>';
                _ +=               '</li>';
                _ +=           '</ul>';
                _ +=       '</div>';
                _ +=       '<div id="exampleTab-' + firstIndex + '" class="tabs__page">';
                _ +=           thisExampleTabbed;
                _ +=       '</div>';
                _ +=       '<div id="exampleTab-' + secondIndex + '" class="tabs__page">';
                _ +=           $thisCodeWrapper.html();
                _ +=       '</div>';
                _ +=   '</div>';

            }

            if (thisExample || thisExampleTabbed) {
                $thisCodeWrapper.replaceWith(_);
            }
   
        });
        
        // // set initialized
        //
        // YOI.setReady($(this));
        
    }

    // public functions
    // ================

    return {
        start : initialize
    };

})();
