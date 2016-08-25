exports.nunjucksPad = function(num, pad) {
    
    /**
     *  Custom filter for our nunjucks template environment.
     *  Creates padded numbers (leading zeros, e.g. 001)
     *  rather simple, no error handling, no negative number conversion etc.
     *  
     *  @param  {number} num    - the filter input (eg "2" if "2|pad(4)")
     *  @param  {number} digits - the amount of leading zeros
     *  @return {string}        - the padded number as string
     */
    
    var num = Math.abs(num);
    var pad = pad !== undefined ? pad : 1;
    var i = 1;
    var leadingZeros = '0';

    while (i < pad) {
        i++;
        leadingZeros += '0';
    }

    return (leadingZeros + num).slice(-pad-1);

};

exports.nunjucksFixed = function(num, digits) {

    /**
     *  Custom filter to set floating numbers to fixed digits.
     *  
     *  @param  {number} num    - the filter input (eg "2" if "2|fixed(4)")
     *  @param  {number} digits - the amount of fixed digits after the decimal point
     *  @return {string}        - the fixed number as string
     */
  
   return num.toFixed(digits);

};

exports.nunjucksRandom = function(num, max) {
    
    /**
     *  Returns an absolute random number between min and max.
     *  
     *  @param  {number} num - the filter input (eg "2" if "2|rnd(10)")
     *  @param  {number} max - the largest possible random number (default is 100)
     *  @return {number}     - the generated random number
     */
    
    var num = Math.abs(num);
    if (max === undefined) max = 100;
    
    return Math.floor(Math.random() * (max - num + 1)) + num;

};