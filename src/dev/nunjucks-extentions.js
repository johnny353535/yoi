exports.nunjucksGenerateMenu = function() {
    
    /**
     *  Custom nunjuck extention, reads templates from a given directory
     *  and returns an unordered list with links for each template (= page).
     *  Used to automagically create menus.
     *
     *  Learn more about extending nunjucks:
     *  https://mozilla.github.io/nunjucks/api.html#custom-tags
     */
    
    var glob = require('glob');
    
    this.tags = ['menu'];

    this.parse = function(parser, nodes, lexer) {
        
        var tok  = parser.nextToken();
        var args = parser.parseSignature(null, true);
        
        parser.advanceAfterBlockEnd(tok.value);
        
        return new nodes.CallExtensionAsync(this, 'run', args);
        
    };

    this.run = function(context, args) {

        var pagePath  = args.path;
        var globSrc   = args.src;
        var modifiers = args.modifiers;
        var callback  = arguments[arguments.length - 1];
        var menuList  = '<ul class="linkList ' + modifiers + '">';
        var menuGlob  = new glob('**/*.html', { cwd: globSrc });

        menuGlob
            .on('match', function(match) {
                var pageName = match.split('.html')[0].replace(/_/g, ' ');
                menuList += '<li class="linkList__item"><a class="linkList__link" href="' + pagePath + match + '">' + pageName + '</a></li>';
            })
            .on('end', function() {
                menuList += '</ul>';
                callback('', menuList);
            });
            
    };

};

exports.nunjucksIncludeRemote = function() {
    
    /**
     *  Custom nunjucks extention, loads markup from a remote location
     *  and injects it into the template.
     *
     *  Learn more about extending nunjucks:
     *  https://mozilla.github.io/nunjucks/api.html#custom-tags
     *
     *  This function depends on the module "request". Learn more
     *  about request:
     *  https://github.com/request/request
     */
    
    this.tags = ['includeRemote'];

    this.parse = function(parser, nodes, lexer) {
        
        var tok  = parser.nextToken();
        var args = parser.parseSignature(null, true);
        
        parser.advanceAfterBlockEnd(tok.value);
        
        return new nodes.CallExtensionAsync(this, 'run', args);
        
    };

    this.run = function(context, url) {
        
        var request = require('request');
        var callback = arguments[arguments.length - 1];
        
        request(url, function(error, response, body) {
            
            if (!error && response.statusCode == 200) {
                callback('', body);
            } else {
                console.log('ERROR: Could not include from ' + url + '.');
                callback('', body);
            }
            
        });
        
    };

};

exports.nunjucksIcon = function() {
    
    /**
     *  Custom nunjucks extention, loads dynamically generated SVG icons
     *  from a remote location and injects it into the template.
     *
     *  Learn more about extending nunjucks:
     *  https://mozilla.github.io/nunjucks/api.html#custom-tags
     *
     *  This function depends on the module "request". Learn more
     *  about request:
     *  https://github.com/request/request
     */
    
    this.tags = ['icon'];

    this.parse = function(parser, nodes, lexer) {
        
        var tok  = parser.nextToken();
        var args = parser.parseSignature(null, true);
        
        parser.advanceAfterBlockEnd(tok.value);
        
        return new nodes.CallExtensionAsync(this, 'run', args);
        
    };

    this.run = function(context, attributes) {
        
        var request  = require('request');
        var callback = arguments[arguments.length - 1];
        
        var url         = 'http://localhost/svg.php?id=icon-';
        var id          = attributes.id !== undefined ? attributes.id : '';
        var width       = attributes.width !== undefined ? '&w=' + attributes.width : '';
        var height      = attributes.height !== undefined ? '&h=' + attributes.height : '';
        var fillColor   = attributes.fillColor !== undefined ? '&f=' + attributes.fillColor : '';
        var strokeColor = attributes.strokeColor !== undefined ? '&s=' + attributes.strokeColor : '';
        var title       = attributes.title !== undefined ? '&title=' + attributes.title : '';
        var descr       = attributes.descr !== undefined ? '&descr=' + attributes.descr : '';
        var hidden      = attributes.hidden !== undefined ? '&hidden=' + attributes.hidden : '';
        
        url += id;
        url += width;
        url += height;
        url += fillColor;
        url += strokeColor;
        url += title;
        url += descr;
        url += hidden;

        request(url, function(error, response, body) {

            if (!error && response.statusCode == 200) {
                callback('', body);
            } else {
                console.log('ERROR: Could not include from ' + url + '.');
                callback('', body);
            }

        });
    
    };

};

exports.nunjucksMarkdown = function() {
    
    // https://github.com/zephraph/nunjucks-markdown/blob/master/lib/markdown_tag.js
    
    //
    
    var Remarkable     = require('remarkable');
    var thisRemarkable = new Remarkable();
    var hljs           = require('highlight.js');

    thisRemarkable.set({
        html   : true,
        breaks : true,
        highlight: function(str, lang) {
            
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (err) {}
            }
            
            try {
                return hljs.highlightAuto(str).value;
            } catch (err) {}
            
            return '';
        }
    });
    
    //

    this.tags = ['markdown'];

    this.parse = function(parser, nodes, lexer) {
      
        var tok = parser.nextToken();

        // Parse the markdown tag and collect any arguments

        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        // If arguments, return the fileTag constructed node

        if (args.children.length > 0) {
            return new nodes.CallExtension(this, 'fileTag', args);
        }

        // Otherwise parse until the close block and move the parser to the next position

        var body = parser.parseUntilBlocks('endmarkdown');

        // I found Nunjucks to be incredibly convoluted on how to just get some data into the BlockTag function,
        // this finally worked by faking another template node.

        var tabStart = new nodes.NodeList(0, 0, [new nodes.Output(0, 0, [new nodes.TemplateData(0, 0, (tok.colno - 1))])]);

        parser.advanceAfterBlockEnd();

        // Return the constructed blockTag node

        return new nodes.CallExtensionAsync(this, 'blockTag', args, [body, tabStart]);
    
    };

    // Markdown rendering for the block. Pretty simple, just get the body text and pass
    // it through the markdown renderer.

    this.blockTag = function(environment, body, tabStart) {

        var callback    = arguments[arguments.length - 1];
        var body        = body();
        var spacesRegex = /^[\s]+/;
        var tabStart    = tabStart(); // The column postion of the {% markdown %} tag.

        if (tabStart > 0) { // If the {% markdown %} tag is tabbed in, normalize the content to the same depth.
            body = body.split(/\r?\n/); // Split into lines.
            body = body.map(function(line) {
                var startSpaces = line.match(spacesRegex);
                if (startSpaces && startSpaces[0].length >= tabStart) { // If the content is not at the same or greater tab depth, do nothing..
                    return line.slice(tabStart); // Subtract the column postion from the start of the string.
                } else if (startSpaces) {
                    return line.slice(startSpaces[0].length);
                } else {
                    return line;
                }
            });
            body = body.join("\n"); // Rejoin into one string.
        }

        callback('', thisRemarkable.render(body));

    }
}
