'use strict';

// require modules
// ===============

var browsersync = require('browser-sync');
var concat      = require('gulp-concat');
var cssnano     = require('gulp-cssnano');
var del         = require('del');
var eclint      = require('eclint');
var ftp         = require('vinyl-ftp');
var glob        = require('glob');
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var imagemin    = require('gulp-imagemin');
var less        = require('gulp-less');
var markdown    = require('nunjucks-markdown');
var marked      = require('marked');
var merge       = require('merge-stream');
var nunjucks    = require('gulp-nunjucks-html');
var runsequence = require('run-sequence');
var slack       = require('node-slack');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');

// globals
// =======

var PRODUCTION  = false;
var BASEPATH    = '/';
var CREDENTIALS = require('./credentials.json');

// tasks
// =====

gulp.task('default', function() {

    /**
     *  Default gulp task
     */

    runsequence('clean', 'codeformat', ['templates', 'less', 'js', 'copy']);

});

gulp.task('clean', function() {

    /**
     *  Delete all files from ./dist
     */

    return del(['dist/**/*']);

});

gulp.task('codeformat', function() {

    /**
     *  Formats code, reads settings from /.editorconfig:
     */

    return gulp.src([
            './src/**/*.html',
            './src/assets/js/core-modules/**/*.js',
            './src/assets/js/modules/**/*.js',
            './src/**/*.json',
            './src/**/*.less'
        ],
        {
            base: './'
        })
        .pipe(eclint.fix())
        .pipe(gulp.dest('.'));

});

gulp.task('less', function() {

    /**
     *  Compile less files:
     *
     *  PRODUCTION  --> without sourcemaps, with compression, with autoprefixer
     *  !PRODUCTION --> with sourcemaps, without compression, without autoprefixer
     */

    var coreCss = gulp.src([
            './src/assets/less/yoshino-ui-core.less'
        ])
        .pipe(PRODUCTION ? gutil.noop() : sourcemaps.init())
            .pipe(less().on('error', printError))
            .pipe(PRODUCTION ?
                cssnano({
                    autoprefixer: {
                        browsers: ['last 2 versions'],
                        add: true
                    }
                }) : gutil.noop()
            )
        .pipe(PRODUCTION ? gutil.noop() : sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/css'));

    return coreCss;

});

gulp.task('js', function() {

    /**
     *  Process javascript.
     *
     *  PRODUCTION  --> without sourcemaps, with uglify
     *  !PRODUCTION --> with sourcemaps, without uglify
     *
     *  Javascript from the "libs" directory (eg. jQuery)
     *  simply get copied to ./dist
     */
    
    var scripts = require('./src/assets/js/yoshino-ui-core.json');
    
    var uiCoreJs = gulp.src(scripts.src)
        .pipe(PRODUCTION ? gutil.noop() : sourcemaps.init())
            .pipe(concat('yoshino-ui-core.js'))
            .pipe(PRODUCTION ? uglify().on('error', printError) : gutil.noop())
        .pipe(PRODUCTION ? gutil.noop() : sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/js/'));

    var libsJs = gulp.src('./src/assets/js/libs/**/*.js')
        .pipe(gulp.dest('./dist/assets/js/libs'));

    return merge(uiCoreJs, libsJs);

});

gulp.task('copy', function() {

    /**
     *  Copy other files from ./src to ./dist (favIcon, fonts, images, ...).
     *
     *  PRODUCTION  --> without imagemin
     *  !PRODUCTION --> with imagemin
     */

    var copyFavicon = gulp.src('./src/assets/img/favicon.ico')
        .pipe(gulp.dest('./dist'));
        
    var copyAudio = gulp.src('./src/assets/audio/**/*')
        .pipe(gulp.dest('./dist/assets/audio'));
        
    var copyFonts = gulp.src('./src/assets/fonts/**/*')
        .pipe(gulp.dest('./dist/assets/fonts'));
        
    var copyImages = gulp.src('./src/assets/img/**/*')
        .pipe(PRODUCTION ? imagemin() : gutil.noop())
        .pipe(gulp.dest('./dist/assets/img'));

    return merge(copyFavicon, copyAudio, copyFonts, copyImages);

});

gulp.task('upload', function() {
    
    /**
     *  Upload the production files to the preview-server.
     *  Passwords are stored in a seperate file, excluded from git.
     *  Once the upload is complete, a message gets send to #slack
     *  via a simple webhook.
     */

    var conn = ftp.create({
        host:           CREDENTIALS.devServer.hostName,
        user:           CREDENTIALS.devServer.ftpUser,
        password:       CREDENTIALS.devServer.ftpPass,
        maxConnections: 10,
        log:            gutil.log
    });

    return gulp.src('./dist/**', {
            base: './dist/',
            buffer: false
        })
        .pipe(conn.dest('html/').on('end', function() {
            
            var slackMsg = new slack(CREDENTIALS.slackWebhook.updateOnDevserver);
    
            slackMsg.send({
                'text'        : 'Update on dev server by *' + CREDENTIALS.teamMember + '*:',
                'mrkdwn'      : true,
                'attachments' : [{
                    'text'  : CREDENTIALS.devServer.url          + '\n' +
                              CREDENTIALS.devServer.htaccessUser + '\n' +
                              CREDENTIALS.devServer.htaccessPass + '\n',
                    'color' : '#2afd8f'
                }]
            });
            
        }));

});

gulp.task('templates', function() {

    /**
     *  Render nunjuck templates to static HTML files.
     */
    
    return gulp.src([
            '!./src/templates/**/layouts/**/*',
            '!./src/templates/partials/**/*',
            './src/templates/**/*.html'
        ])
        .pipe(nunjucks({
            searchPaths: ['./src/templates/', './src/assets/'],
            locals: {
                BASEPATH: BASEPATH
            },
            setUp: function(env) {
                
                // configure markdown
    
                marked.setOptions({
                    renderer: new marked.Renderer(),
                    gfm: true,
                    tables: true,
                    breaks: false,
                    pendantic: false,
                    sanitize: false,
                    smartLists: true,
                    smartypants: true
                });
                
                markdown.register(env, marked);
                
                // add filters and extensions
                
                env.addFilter('pad', nunjucksFilter_pad);
                env.addExtension('menu', new nunjucksExtention_menu(), true);
                
                // return
                
                return env;
            }
        })
        .on('error', printError))
        .pipe(gulp.dest('./dist'));

});

gulp.task('serve', function() {

    /**
     *  Run a local web server and some watch tasks
     *  which trigger a refresh when files get changed.
     */

    runsequence('clean', 'codeformat', ['templates', 'less', 'js', 'copy'], function() {

        gulp.watch('./src/assets/js/**/*.js', ['js']);
        gulp.watch('./src/assets/less/**/*.less', ['less']);
        gulp.watch('./src/templates/**/*', ['templates']);
        gulp.watch('./src/assets/img/**/*', ['copy']);

        browsersync.init({
            server      : ['./dist', './src'],
            baseDir     : './dist',
            index       : 'docs/index.html',
            notify      : false
        });

    });

});

gulp.task('deploy', function() {

    /**
     *  Run a sequence of tasks in production-mode and call
     *  the upload task at the end of the task chain.
     */

    PRODUCTION = true;
    BASEPATH = '/';

    runsequence('clean', 'codeformat', ['templates', 'less', 'js', 'copy'], 'upload');

});

// helpers
// =======

var printError = function(err) {

    /**
     *  simple formatted error log
     */

    gutil.log(gutil.colors.white.bgRed.bold(err.message));
    this.emit('end');

};

// custom nunjucks filters & extentions
// ====================================

var nunjucksFilter_pad = function(num, digits) {
    
    /**
     *  Custom filter for our nunjucks template environment.
     *  Creates padded numbers (leading zeros, e.g. 001)
     *  rather simple, no error handling, no negative number conversion etc.
     */
    
    var num = Math.abs(num);
    var digits = digits !== undefined ? digits : 1;
    var i = 1;
    var leadingZeros = '0';

    while (i < digits) {
        i++;
        leadingZeros += '0';
    }

    return (leadingZeros + num).slice(-digits-1);

};

var nunjucksExtention_menu = function() {
    
    /**
     *  Custom nunjuck extention, reads templates from a given directory
     *  and returns an unordered list with links for each template (= page).
     *  Used to automagically create menus.
     */
    
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
