exports.nunjucksGenerateMenu = function() {
    
    /**
     *  Custom nunjuck extention, reads templates from a given directory
     *  and returns an unordered list with links for each template (= page).
     *  Used to automagically create menus.
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

        var args = args.split(' + ');

        if (args.length > 1) {
            var pagePath  = args[0];
            var globPath  = args[1];
            var modifiers = ' ' + args[2]
        } else {
            var pagePath  = '';
            var globPath  = args[0];
            var modifiers = '';
        }

        var callback = arguments[arguments.length - 1];
        var menuList = '<ul class="linkList' + modifiers + '">';
        var menuGlob = new glob('**/*.html', { cwd: globPath });

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