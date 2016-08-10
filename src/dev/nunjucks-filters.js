exports.nunjucksPad = function(num, digits) {
    
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