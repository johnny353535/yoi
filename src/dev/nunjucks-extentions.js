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
        
        url += id;
        url += width;
        url += height;
        url += fillColor;
        url += strokeColor;

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
