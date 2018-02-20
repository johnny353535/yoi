/** code.js */

YOI.component.Code = (function() {

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
        
        if ($codeWrapper) $codeWrapper.each(function(index) {
            
            // cancel if already initialized

            if (YOI.isReady($(this))) return false;

            // proceed

            var $thisCodeWrapper    = $(this);
            var $thisCode           = $thisCodeWrapper.find('code');
            var exampleTag          = "<!-- example -->";
            var exampleTagTabbed    = "<!-- example:tabs -->";
            var thisExample         = $thisCode.text().split(exampleTag).length > 1 ? $thisCode.text().split(exampleTag)[1] : false;
            var thisExampleTabbed   = $thisCode.text().split(exampleTagTabbed).length > 1 ? $thisCode.text().split(exampleTagTabbed)[1] : false;
            var markup;
            
            if (thisExampleTabbed) {

                // set indexes to generate unique ids
                // for tab pages

                var firstIndex  = ++tabPageIndex;
                var secondIndex = ++tabPageIndex;

            }

            if (thisExample) {

                // remove the "exampleTag"

                $thisCode.find('.c:contains("' + exampleTag + '")').remove();

                // template for tabbed code preview

                markup =  '<div class="code__example">';
                markup +=     '<div class="code__result">';
                markup +=         thisExample;
                markup +=     '</div>';
                markup +=     '<div class="code__source">';
                markup +=         $thisCodeWrapper.html();
                markup +=     '</div>';
                markup += '</div>';

            }

            if (thisExampleTabbed) {

                // remove the "exampleTagTabbed"

                $thisCode.find('.c:contains("' + exampleTagTabbed + '")').remove();

                // template for tabbed code preview

                markup =  '<div class="code__example tabs">';
                markup +=     '<div class="tabs__menu tabs__menu--loose" yoi-tabs>';
                markup +=         '<ul class="tabs__items">';
                markup +=             '<li class="tabs__item">';
                markup +=                 '<a class="tabs__link" href="#exampleTab-' + firstIndex + '">Example</a>';
                markup +=             '</li>';
                markup +=             '<li class="tabs__item">';
                markup +=                 '<a class="tabs__link" href="#exampleTab-' + secondIndex + '">Code</a>';
                markup +=             '</li>';
                markup +=         '</ul>';
                markup +=     '</div>';
                markup +=     '<div id="exampleTab-' + firstIndex + '" class="tabs__page code__result">';
                markup +=         thisExampleTabbed;
                markup +=     '</div>';
                markup +=     '<div id="exampleTab-' + secondIndex + '" class="tabs__page code__source">';
                markup +=         $thisCodeWrapper.html();
                markup +=     '</div>';
                markup += '</div>';

            }
            
            // add copy button
            
            if (thisExample || thisExampleTabbed) {
                markup = addCopyBtn(markup);
            } else {
                markup = addCopyBtn($thisCodeWrapper);
            }
            
            // inject markup

            if (thisExample || thisExampleTabbed) {
                $thisCodeWrapper.replaceWith(markup);
            }
            
            //
            
            truncate(index);
            
            // set initialized

            YOI.setReady($(this));
   
        });

    }
    
    function addCopyBtn(markup) {
        
        /**
         *  Adds a copy-to-clipboard-button to a code example.
         *
         *  @param  {string}           markup  - the original markup (input)
         *  @return {jQuery dom oject} $markup - the processed markup (output)
         */
        
        var copyToClipboardSupported = document.queryCommandSupported && document.queryCommandSupported('copy');
        
        // return the unprocessed input (markup) if
        // queryCommand is not supportetd
        
        if (!copyToClipboardSupported) return markup;

        // proceed
        
        var $markup                = markup instanceof jQuery ? markup : $(markup);
        var $copyBtn               = $('<button class="code__copyBtn btn btn--subtle">Copy</button>');
        var $codeSource            = $markup.find('.code__source');
        var codeHasRenderedExample = $codeSource.length ? true : false;

        // prepare the copy button

        $copyBtn.on('click', function() {
        
            // find the code
        
            var $code = $copyBtn.parent().find('code').first();
        
            // copy code to clipboard
        
            copyToClipBoard($code);
        
            // give visual feedback to user
        
            YOI.blink($copyBtn);
            
        });

        // inject the copy button

        if (codeHasRenderedExample) {
            $markup.find('.code__source').append($copyBtn);
        } else {
            $markup.append($copyBtn);
        }

        // return the processed markup

        return $markup;
        
    }
    
    function copyToClipBoard($source) {
        
        /**
         *  Copies the text content of a given $source to the clipboard.
         *
         *  @param {jQuery dom oject} $source
         */

        var selection = window.getSelection();
        var range     = document.createRange();
        
        range.selectNodeContents($source[0]);
        selection.addRange(range);
        
        document.execCommand('copy');
        
        selection.removeAllRanges();
        
    }
    
    function truncate(index) {

        /**
         *  Truncates a code block if it exceeds 4 lines.
         *
         *  @param {number} index
         */

        var $thisCodeSource = $('.code__source').eq(index);
        var $thisCode       = $thisCodeSource.find('code');
        
        // do not truncate code inside tabs (cancel)
        
        if ($thisCodeSource.hasClass('tabs__page')) return false;
        
        // assign vars
        
        var $expandBtn    = $('<button class="code__expandBtn btn btn--subtle">Expand</button>');
        var codeHeight    = $thisCode.height();
        var lineHeight    = $thisCode.css('line-height');
        var maxCodeHeight = parseInt(lineHeight) * 5;
        
        // add events to expand button
        
        $expandBtn.on('click', function(e) {
            
            e.preventDefault();
            
            var $this = $(this);
            
            if ($thisCode.is('.code__source--truncated')) {
                
                // expand
                
                $thisCode.animate({
                    height: codeHeight
                }, 200, function() {
                    $thisCode.removeClass('code__source--truncated');
                    $this.text('Collapse');
                });

            } else {

                // collapse

                $thisCode.animate({
                    height: maxCodeHeight
                }, 200, function() {
                    $thisCode.addClass('code__source--truncated');
                    $this.text('Expand');
                });
                
            }

        });
        
        // truncate code
        
        if (codeHeight > maxCodeHeight) {
            $thisCode.height(maxCodeHeight);
            $thisCode.addClass('code__source--truncated');
            $thisCodeSource.append($expandBtn);
        }

    }

    // public functions
    // ================

    return {
        initialize : initialize
    };

})();
