'use strict';

// require modules
// ===============

// npm modules

var browsersync = require('browser-sync');
var concat      = require('gulp-concat');
var cssnano     = require('gulp-cssnano');
var del         = require('del');
var eclint      = require('eclint');
var eslint      = require('gulp-eslint');
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
var request     = require('request');

// "private" modules

var printError = require('./src/dev/gulp-helpers.js').printError;

// environment variables / flags
// =============================
 
var writeSourceMaps = true;
var compressStyles  = false;
var compressImages  = false;
var compressScripts = false;
var basePath        = '/';

if (gutil.env.prod === true) {

    // if the environment variable "--prod" is added to any task call,
    // change these flags to "production mode"

    writeSourceMaps = false;
    compressStyles  = true;
    compressImages  = true;
    compressScripts = true;

}

if (gutil.env.github === true) {
    
    // if the environment variable "--github" is added to the build task call,
    // change the base path so the site works on github pages
    
    var basePath = '/ui-core/';

}

// code format / linting options
// =============================

var eslintRules = {
    'array-bracket-spacing'         : [1, 'always', { 'singleValue': false }],
    'comma-dangle'                  : 1,
    'eqeqeq'                        : 1,
    'func-call-spacing'             : [1, 'never'],
    'indent'                        : [1, 4],
    'linebreak-style'               : [1, 'unix'],
    'no-alert'                      : 1,
    'no-console'                    : 1,
    'no-tabs'                       : 1,
    'no-trailing-spaces'            : 1,
    'no-whitespace-before-property' : 1,
    'quotes'                        : [1, 'single'],
    // 'semi'                          : [1, 'never'],
    'space-before-function-paren'   : [1, 'never'],
    'unicode-bom'                   : [1, 'never'],
    'valid-jsdoc'                   : 1,
};

// tasks
// =====

gulp.task('default', function() {

    /**
    *  Default gulp task
    */

    runsequence('clean', ['templates', 'less', 'js', 'copy']);

});

gulp.task('clean', function() {

    /**
    *  Delete all files from ./dist and ./docs
    */

    return del(['dist/**/*', 'docs/**/*']);

});

gulp.task('codecheck', function() {
    
   /**
    *  Checks code with eslint and displays a well-formatted report.
    */
    
    return gulp.src(['src/assets/js/**/*.js'], { base: './' })
        .pipe(eslint({ 'rules' : eslintRules }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

gulp.task('codeformat', function() {

    /**
    *  Formats all source code via eclint (reads settings from /.editorconfig).
    *  JavaScript code gets formatted via eslint.
    */

    var stylesheets = gulp.src(['src/**/*.less'], { base: './' })
        .pipe(eclint.fix())
        .pipe(gulp.dest('.'));

    var markup = gulp.src(['src/**/*.html'], { base: './' })
        .pipe(eclint.fix())
        .pipe(gulp.dest('.'));

    var scripts = gulp.src(['src/assets/js/**/*.js'], { base: './' })
        .pipe(eslint({
            'rules': eslintRules,
            fix: true
        }))
        .pipe(gulp.dest('.'));

    var json = gulp.src(['**/*.json'], { base: './' })
        .pipe(eclint.fix())
        .pipe(gulp.dest('.'));

    return merge(stylesheets, markup, scripts, json);
    
});

gulp.task('less', function() {

    /**
    *  Compile less files with optional compression (cssnano),
    *  auto-prefixer and sourcemaps.
    */

    var coreCss = gulp.src([
        './src/assets/less/yoshino-ui-core.less'
    ])
    .pipe(writeSourceMaps ? gutil.noop() : sourcemaps.init())
        .pipe(less().on('error', printError))
        .pipe(compressStyles ?
            cssnano({
                autoprefixer : {
                    browsers : ['last 2 versions'],
                    add      : true
                }
            }) : gutil.noop()
        )
    .pipe(writeSourceMaps ? gutil.noop() : sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/assets/css/'))
    .pipe(gulp.dest('./docs/assets/css/'));

    return coreCss;

});

gulp.task('js', function() {

    /**
    *  Process javascript with optional compression (uglify) and sourcemaps.
    */

    var scripts = require('./src/assets/js/yoshino-ui-core.json');
    var libs    = require('./src/assets/js/libs.json');

    var yoshinoUiCore = gulp.src(scripts.src)
        .pipe(writeSourceMaps ? gutil.noop() : sourcemaps.init())
            .pipe(concat('yoshino-ui-core.js'))
            .pipe(compressScripts ? uglify().on('error', printError) : gutil.noop())
        .pipe(writeSourceMaps ? gutil.noop() : sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/js/'))
        .pipe(gulp.dest('./docs/assets/js/'));

    var jQuery = gulp.src(libs.jQuery)
        .pipe(concat('jquery.js'))
        .pipe(gulp.dest('./dist/assets/js/libs/'))
        .pipe(gulp.dest('./docs/assets/js/libs/'));

    var prism = gulp.src(libs.prism)
        .pipe(concat('prism.js'))
        .pipe(gulp.dest('./dist/assets/js/libs/'))
        .pipe(gulp.dest('./docs/assets/js/libs/'));

    var beautify = gulp.src(libs.beautify)
        .pipe(concat('beautify.js'))
        .pipe(gulp.dest('./dist/assets/js/libs/'))
        .pipe(gulp.dest('./docs/assets/js/libs/'));

    return merge(yoshinoUiCore, jQuery, prism, beautify);

});

gulp.task('copy', function() {

    /**
    *  Copy other assets from ./src to ./dist (favIcon, fonts, images, ...).
    *  Optional image compression.
    */

    var copyFavicon = gulp.src('./src/assets/img/favicon.ico')
        .pipe(gulp.dest('./docs/'));
  
    var copyAudio = gulp.src('./src/assets/audio/**/*')
        .pipe(gulp.dest('./dist/assets/audio/'))
        .pipe(gulp.dest('./docs/assets/audio/'));
  
    var copyIconFont = gulp.src('./bower_components/yoshino-icons/webfont/**/*')
        .pipe(gulp.dest('./dist/assets/fonts/icons/'))
        .pipe(gulp.dest('./docs/assets/fonts/icons/'));
  
    var copyIconSvgs = gulp.src('./bower_components/yoshino-icons/svg/**/*.svg')
        .pipe(gulp.dest('./dist/assets/img/icons/'))
        .pipe(gulp.dest('./docs/assets/img/icons/'));
  
    var copyImages = gulp.src('./src/assets/img/**/*')
        .pipe(compressImages ? imagemin() : gutil.noop())
        .pipe(gulp.dest('./dist/assets/img/'))
        .pipe(gulp.dest('./docs/assets/img/'));
        
    var copyDevScript = gulp.src('./src/dev/**/*')
        .pipe(gulp.dest('./dist/dev/'));

    return merge(copyFavicon, copyAudio, copyIconFont, copyIconSvgs, copyImages, copyDevScript);

});

gulp.task('templates', function() {

    /**
    *  Render nunjuck templates to static HTML files.
    *  Additional searchpath for assets to include SVGs with nunjucks.
    */

    // nunjucks extentions

    var nunjucksGenerateMenu  = require('./src/dev/nunjucks-extentions.js').nunjucksGenerateMenu;
    var nunjucksIncludeRemote = require('./src/dev/nunjucks-extentions.js').nunjucksIncludeRemote;
    var nunjucksIcon          = require('./src/dev/nunjucks-extentions.js').nunjucksIcon;
    
    // nunjucks filters
    
    var nunjucksFixed        = require('./src/dev/nunjucks-filters.js').nunjucksFixed;
    var nunjucksPad          = require('./src/dev/nunjucks-filters.js').nunjucksPad;
    var nunjucksRandom       = require('./src/dev/nunjucks-filters.js').nunjucksRandom;
    
    return gulp.src([
        '!./src/templates/**/layouts/**/*',
        '!./src/templates/elements/**/*',
        './src/templates/**/*.html'
    ])
    .pipe(nunjucks({
        
        searchPaths: ['./src/templates/'],
        locals: { basePath: basePath },
        setUp: function(env) {

            // configure markdown
            
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm         : true,
                tables      : true,
                breaks      : false,
                pendantic   : false,
                sanitize    : false,
                smartLists  : true,
                smartypants : true
            });

            markdown.register(env, marked);

            // add filters
  
            env.addFilter('fixed', nunjucksFixed);
            env.addFilter('pad', nunjucksPad);
            env.addFilter('rnd', nunjucksRandom);
            
            // add extensions
            
            env.addExtension('menu', new nunjucksGenerateMenu(), true);
            env.addExtension('remote', new nunjucksIncludeRemote(), true);
            env.addExtension('icon', new nunjucksIcon(), true);

            // return
            
            return env;
    
        }
    })
    .on('error', printError))
    .pipe(gulp.dest('./docs/'));

});

gulp.task('build', function(callback) {

    /**
    *  Build a static page for documentation.
    */
    
    runsequence('clean', ['templates', 'less', 'js', 'copy'], callback);

});

gulp.task('serve', function() {

    /**
    *  Run a local web server and some watch tasks which trigger a
    *  refresh when files get changed.
    */

    runsequence('build', function() {

        gulp.watch('./src/assets/js/**/*.js', ['js']);
        gulp.watch('./src/assets/less/**/*.less', ['less']);
        gulp.watch('./src/templates/**/*', ['templates']);
        gulp.watch('./src/assets/img/**/*', ['copy']);
        
        browsersync.init({
            server      : ['./docs/', './src/'],
            baseDir     : './docs/',
            notify      : false
        });

    });

});
