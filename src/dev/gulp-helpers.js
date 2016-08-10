exports.printError = function(err) {

    /**
     *  simple formatted error log
     */
    
    var gutil = require('gulp-util');

    gutil.log(gutil.colors.white.bgRed.bold(err.message));
    this.emit('end');

};