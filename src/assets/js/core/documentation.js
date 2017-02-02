/** documentation.js */

var Documentation = (function() {

    // private vars
    // ============

    var initialized = false;

    var languages = {
        'css'  : 'css',
        'js'   : 'javascript',
        'less' : 'less'
    }

    var $codeBlock = $('<code></code>');
    var $preBlock  = $('<pre></pre>');

    var $controls = $('\
        <p class="documentation__controls">\
            <button data-action="toggleDarkmode">background</button>\
            <button data-action="toggleCode">code</button>\
        </p>\
    ');

    var $fileDisplay = $('\
        <div id="fileDisplay" class="documentation__fileDisplay">\
            <button class="btnDismiss btnDismiss--large"></button>\
            <code>\
                <pre></pre>\
            </code>\
        </div>');

    // private functions
    // =================

    function initializeDocumentation() {

        /**
         *  Initialize the documentation: inject dom elements
         *  and attach events in order to display example code.
         */

        initializeControls();
        initializeFileDisplay();

        // hightlight code inside code-tags found in markup

        $('[class^="language-"]').each(function() {
            if (YOI.foundModule('Prism'))
                Prism.highlightElement($(this).find('pre')[0]);
        });

        // print the code for each code-example block

        $('.documentation__example[data-printcode]').each(function() {

            var $thisExampleBlock = $(this);
            var options           = YOI.toObject($thisExampleBlock.data('printcode'));

            /**
             * available options:
             *
             * @option {bool}   print          - print the code on page load
             * @option {bool}   printWithDelay - print the code after a short delay (useful if other scripts modifiy the code)
             * @option {bool}   format         - format / beautify the code - default is true
             * @option {bool}   highlight      - add syntax-highlighting to the code - default is true
             * @option {bool}   hideExample    - only show the code, hide the example
             * @option {string} language       - "markup"|"css"|"clike"|"javascript"|"less" (http://prismjs.com/#languages-list)
             */

            if (options.printWithDelay) {

                YOI.setDelay('printCodeDelay', 1000, function() {
                    printCode($thisExampleBlock);
                });

            } else {

                printCode($thisExampleBlock);

            }

        });

    }

    function initializeControls() {

        /**
         *  Add control elements to example blocks to switch
         *  between light and dark background or toggle code examples.
         */

        $('[data-docblock]').each(function() {

            var $thisDocBlock = $(this)
            var options       = YOI.toObject($thisDocBlock.data('docblock'));

            /**
             *  available options:
             *
             *  @option {bool} addControls - show controls
             */

            if (options.addControls) {

                var $thisExampleBlock = $thisDocBlock.find('.documentation__example');

                // insert buttons

                $thisDocBlock.append($controls.clone());

                // add events to buttons

                var $thisColorBtn = $thisDocBlock.find('[data-action="toggleDarkmode"]');
                var $thisCodeBtn  = $thisDocBlock.find('[data-action="toggleCode"]');

                $thisColorBtn.on('click', function() {
                    $thisDocBlock.toggleClass('documentation__block--dark');
                });

                $thisCodeBtn.on('click', function() {

                    var $thisCodeBlock = $thisDocBlock.find('code');

                    if ($thisCodeBlock.length) {
                        toggleCode($thisCodeBlock);
                    } else {
                        printCode($thisExampleBlock);
                    }

                });

            }

        });

    }

    function initializeFileDisplay() {

        /**
         *  Create a full-page overlay to display code.
         */

        // inject the file display

        $('.documentation').append($fileDisplay.clone().hide());

        // attach events to links

        $('.documentation__body a').each(function() {

            var $thisAnchor  = $(this);
            var thisFilePath = $thisAnchor.attr('href');

            // check the path

            var validFilePath = thisFilePath === undefined || thisFilePath === '#' || thisFilePath === '' ? false : true;

            // get the file extention

            if (validFilePath) {

                var thisFileExtention = thisFilePath.split('.')[1];
                var thisLanguage      = languages[thisFileExtention];

                // attach events to this link

                if (languages[thisFileExtention] !== undefined) {

                    $thisAnchor.on('click', function(e) {
                        e.preventDefault();
                        showFileDisplay($thisAnchor, thisLanguage);
                    });

                }

            }

        });

        // attach event to close button

        $('#fileDisplay .btnDismiss').on('click', function() {

            $('#fileDisplay').find('code').scrollTop(0);
            $('#fileDisplay').hide();

        });

    }

    function showFileDisplay(thisCaller, thisLanguage) {

        /**
         *  Open a full-page overlay to display code that is fetched via
         *  ajax from a link to a file (less, JavaScript, etc.).
         *
         *  @param {jQuery dom object} thisCaller   - the link calling this function
         *  @param {string}            thislanguage - a look-up key to select the language
         */

        var $thisLink        = thisCaller;
        var $fileDisplay     = $('#fileDisplay');
        var $pre             = $fileDisplay.find('pre');

        var thisFilePath     = $thisLink.attr('href');
        var highLightedCode;

        // get the file content via ajax

        $.ajax({
            url      : thisFilePath,
            dataType : 'text'
        })
        .done(function(responseData) {

            if (YOI.foundModule('Prism')) {

                // highlight with prism.js if available
                
                highLightedCode = Prism.highlight(responseData, Prism.languages[thisLanguage]);
                $pre.html(highLightedCode);

            } else {

                // or display the plain code

                $pre.html(responseData);

            }

        })
        .fail(function() {

            // display an error message

            $pre.html('<span class="tc-error">File not found.');

        });

        // show the file display

        $fileDisplay.fadeIn('fast');

    }

    function formatCode(code, language) {

        /**
         *  Format and clean up the input code.
         *
         *  @param  {string/html} code          - the input code to format
         *  @param  {string}      language      - a look-up key to select the language
         *  @return {string/html} formattedCode - the formatted code
         */

        // remove blank lines
        // http://stackoverflow.com/questions/16369642

        var cleanedCode = code.replace(/^\s*[\n\r]/gm, '');

        // beautify
        // https://github.com/beautify-web/js-beautify

        var beautifiedCode;

        switch (language) {
            case 'markup':
                beautifiedCode = html_beautify(cleanedCode, {
                    'wrap_line_length' : 0
                });
                break;
            case 'less' || 'css':
                beautifiedCode = css_beautify(cleanedCode);
                break;
            case 'javascript':
                beautifiedCode = js_beautify(cleanedCode, {
                    'wrap_line_length' : 0
                });
                break;
            default:
                beautifiedCode = cleanedCode;
        }

        // re-assign code variable

        var formattedCode = beautifiedCode;

        // return the formatted code

        return formattedCode;

    }

    function highlightCode(code, language) {

        /**
         *  Add syntax highlighting to code.
         *
         *  @param  {string/html} code            - the input code to format
         *  @param  {string}      language        - a look-up key to select the language
         *  @return {string/html} highLightedCode - the highlighted code
         */

        // run syntax highlighter "prism"
        // http://prismjs.com

        var highLightedCode = Prism.highlight(code, Prism.languages[language]);

        // return the highlighted code

        return highLightedCode;

    }

    function printCode($thisExampleBlock) {

        /**
         *  Inject a code block right after an example block
         *  to display the example code.
         *
         *  @param {jQuery dom object} $thisDocBlock - the example block to display the example code
         */

        var $thisDocBlock = $thisExampleBlock.first().closest('.documentation__block');

        $thisExampleBlock.each(function() {

            var $thisExampleBlock = $(this);
            var $thisCodeBlock    = $codeBlock.clone();
            var $thisPreBlock     = $preBlock.clone();

            var options           = YOI.toObject($thisExampleBlock.data('printcode'));
            var content           = decodeEntities($thisExampleBlock.html());
            var processedCode;

            // cast option flags to boolean

            if (options.format    === 'false') options.format    = false;
            if (options.highlight === 'false') options.highlight = false;

            // process the code

            if (options.format === false && options.highlight === false) {

                // if format and highlight are false, don't process the code at all
                processedCode = content;

            } else if (options.format === false) {

                // if format is false, only highlight the code
                processedCode = highlightCode(content, options.language);

            } else if (options.highlight === false) {

                // if highlight is false, only format the code
                processedCode = formatCode(content, options.language);

            } else {

                // default: format and highlight the code
                processedCode = highlightCode(formatCode(content, options.language), options.language);

            }

            // print the processed code

            $thisPreBlock.html(processedCode);

            // insert elements

            $thisCodeBlock.append($thisPreBlock).hide();
            $thisExampleBlock.after($thisCodeBlock);

            // reveal the pre block

            if (options.print || options.printWithDelay)
                toggleCode($thisCodeBlock, true);

            // hide the example and only show the code

            if (options.hideExample)
                $thisExampleBlock.hide();

        });

    }

    function toggleCode($thisCodeBlock, showWithoutAnimation) {

        /**
         *  Shows or hides a code block with a jQuery slide animation.
         *
         *  Since jQuery sets visibility for elements it animates with
         *  slideToggle() to it's initial display value (for <code> this
         *  would be display:inline-block), this function makes sure the
         *  <code> element is set to display:block after the animation
         *  is complete.
         *
         *  @param {jQuery dom object} $thisCodeBlock       - the code block
         *  @param {bool}              showWithoutAnimation - show the code block instantly
         */

        if (showWithoutAnimation) {

            $thisCodeBlock.css('display','block');

        } else {

            if ($thisCodeBlock.is(':visible')) {
                $thisCodeBlock.slideUp('fast');
            } else {
                $thisCodeBlock.slideDown('fast', function() {
                    $thisCodeBlock.css('display','block');
                });
            }

        }

    }

    function decodeEntities(code) {

        /**
         *  Decode input to HTML entities and
         *  return the output.
         *
         *  @param  {string/html} code        - the input code
         *  @return {string}      decodedCode - the processed output code
         */

        var tmpTextarea = $('<textarea>');
        var decodedCode = tmpTextarea.html(code).val();

        return decodedCode;

    }

    function cleanIndent(code) {

        /**
         *  Remove unnecessary indentation from input
         *  and return the output.
         *
         *  @param  {string/html} code        - the input code
         *  @return {string/html} cleanedCode - the processed output code
         */

        var pattern     = code.match(/\s*\n[\t\s]*/);
        var cleanedCode = code.replace(new RegExp(pattern, 'g'),'\n');

        return cleanedCode;

    }

    function removeEmptyLines(code) {

        /**
         *  Remove empty lines from input and return
         *  the output.
         *
         *  @param  {string/html} code        - the input code
         *  @return {string/html} cleanedCode - the processed output code
         */

        var pattern     = code.match(/^\s*[\r\n]/gm);
        var cleanedCode = input.replace(new RegExp(pattern, 'g'),'\n');

        return cleanedCode;

    }

    // initialize
    // ==========

    initializeDocumentation();

    // public functions
    // ================

    return {
        init : initializeDocumentation
    }

})();
