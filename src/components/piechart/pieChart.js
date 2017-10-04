/** piechart.js */

YOI.component.PieChart = (function() {

    // private vars
    // ============

    var $colorDot = $('<span class="pieChart__dot"></span>');

    var fixedPalette = [
        '#f69d29',
        '#ec4534',
        '#66579f',
        '#2988cb',
        '#7f9b3d',
        '#fff398',
        '#dc48c2',
        '#0d5964'
    ];

    // private functions
    // =================

    function initialize($pieChart, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $pieChart
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {string} baseColor - hsl color as array string, eg: [130,25,50] - default is [208,50,60].
         *                               Sets the base color, used to calculate a unique color for each
         *                               slice of the pie chart.
         *  @option {bool}   highlight - Default is true. Set to false if you wish to disable highlighting individual
         *                               slices on mouse over.
         *  @option {string} palette   - "fixed" || "random" || "shades" || "unique" - default is "shades".
         *                               Selects the formula used to calculate the unique color for
         *                               each slice of the pie chart.
         *  @option {number} size      - Sets the diameter of the pie chart SVG.
         */
        
        var $pieChart = YOI.createCollection('piechart', $pieChart, options);

        if ($pieChart) $pieChart.each(function() {
            
            // cancel if already initialized
            
            if (YOI.isReady($(this))) return false;
            
            // proceed

            var $thisPieChart        = $(this);
            var $thisPieChartRecords = $thisPieChart.find('.pieChart__record');
            var $thisPieChartSvg     = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            var options              = $thisPieChart.data().options;
            var size                 = options.size !== undefined ? options.size : 200;
            var highlight            = options.highlight !== undefined ? (options.highlight === true) : true;
            var palette              = options.palette !== undefined ? options.palette : 'shades';

            // store props

            $thisPieChart.data().props = {
                rotation  : 0,
                index     : 0,
                records   : $thisPieChartRecords.length,
                size      : size
            };
            
            var size   = $thisPieChart.data().props.size;

            $thisPieChartSvg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);

            $($thisPieChartSvg).css({
                width  : size,
                height : size
            });

            // append the wrapper and the svg

            $thisPieChart.prepend($thisPieChartSvg);

            // add data to pie chart

            $thisPieChartRecords.each(function(index) {

                var $thisRecord = $(this);
                var thisValue   = $thisRecord.find('.pieChart__value').text();

                // add slices

                addChartData($thisPieChart, thisValue);

                // add dots to data records (legend)

                $thisRecord.prepend($colorDot.clone());

                // attach events to record
                
                if (highlight) {
                    $thisRecord
                        .on('mouseover', function() {
                            YOI.clearDelay('pieChartHightlightDelay');
                            highlightRecord($thisRecord);
                        })
                        .on('mouseleave', function() {
                            YOI.setDelay('pieChartHightlightDelay', 500, function() {
                                resetHighlightRecord($thisPieChart);
                            });
                        })
                        .on('click', function() {
                            blinkRecord($thisRecord);
                        });
                }

            });

            // paint the slices

            if (palette === 'fixed')  setFixedSliceColors($thisPieChart);
            if (palette === 'random') setRandomSliceColors($thisPieChart);
            if (palette === 'shades') setSliceShades($thisPieChart);
            if (palette === 'unique') setUniqueSliceColors($thisPieChart);
            
            // set initialized
            
            YOI.setReady($(this));

        });

    }

    function setUniqueSliceColors($thisPieChart) {

        /**
         *  Calculate and set unique, complementary fill colors for each slice.
         *
         *  @param {jQuery dom object} $thisPieChart - the pie chart
         */

        var $thisPaths      = $thisPieChart.find('path');
        var $thisCircles    = $thisPieChart.find('circle');
        var $thisDots       = $thisPieChart.find('.pieChart__dot');
        var options         = $thisPieChart.data().options;
        var props           = $thisPieChart.data().props;
        var totalSlices     = props.records;
        var baseColor       = typeof options.baseColor === 'array' ? JSON.parse(options.baseColor) : [252,45,65];
        var startRadius     = baseColor[0];
        var startSaturation = baseColor[1] + '%';
        var startLuminance  = baseColor[2] + '%';
        
        for (var i = 0; i < totalSlices; i++) {

            var splitRadius = (360 / totalSlices) * i;
            var radius = splitRadius + startRadius > 360 ? splitRadius + startRadius - 360 : splitRadius + startRadius;

            // set colors

            if ($thisPaths[i] !== undefined) $thisPaths[i].setAttribute('fill', 'hsl(' + radius + ',' + startSaturation + ',' + startLuminance + ')');
            if ($thisCircles[i] !== undefined) $thisCircles[i].setAttribute('fill', 'hsl(' + radius + ',' + startSaturation + ',' + startLuminance + ')');

            $thisDots.eq(i).css('background','hsl(' + radius + ',' + startSaturation + ',' + startLuminance + ')');

        }

    }

    function setRandomSliceColors($thisPieChart) {

        /**
         *  Calculate and set random rgb colors for each slice.
         *
         *  @param {jQuery dom object} $thisPieChart - the pie chart
         */

        var $thisPaths   = $thisPieChart.find('path');
        var $thisCircles = $thisPieChart.find('circle');
        var $thisDots    = $thisPieChart.find('.pieChart__dot');
        var totalSlices  = $thisPieChart.data().props.records;

        for (var i = 0; i < totalSlices; i++) {

            var randomColor = '#' + ('00000' + (Math.random() * (1<<24)|0).toString(16)).slice(-6);

            // set colors

            if ($thisPaths[i] !== undefined)   $thisPaths[i].setAttribute('fill', randomColor);
            if ($thisCircles[i] !== undefined) $thisCircles[i].setAttribute('fill', randomColor);

            $thisDots.eq(i).css('background', randomColor);

        }

    }

    function setFixedSliceColors($thisPieChart) {

        /**
         *  Pick and set colors for each slice from a fixed palette.
         *
         *  @param {jQuery dom object} $thisPieChart - the pie chart
         */

        var $thisPaths   = $thisPieChart.find('path');
        var $thisCircles = $thisPieChart.find('circle');
        var $thisDots    = $thisPieChart.find('.pieChart__dot');
        var totalSlices  = $thisPieChart.data().props.records;

        for (var i = 0; i < totalSlices; i++) {

            var j = i;

            // if there are more slices than colors in the palette,
            // start over and pick the first color again

            if (j > fixedPalette.length - 1) j = 1;

            // set colors

            if ($thisPaths[i] !== undefined)   $thisPaths[i].setAttribute('fill', fixedPalette[j]);
            if ($thisCircles[i] !== undefined) $thisCircles[i].setAttribute('fill', fixedPalette[j]);

            $thisDots.eq(i).css('background', fixedPalette[j]);

        }

    }

    function setSliceShades($thisPieChart) {

        /**
         *  Calculate and set shades of a given base color for each slice.
         *
         *  @param {jQuery dom object} $thisPieChart - the pie chart
         */

        var $thisPaths      = $thisPieChart.find('path');
        var $thisCircles    = $thisPieChart.find('circle');
        var $thisDots       = $thisPieChart.find('.pieChart__dot');
        var options         = $thisPieChart.data().options;
        var totalSlices     = $thisPieChart.data().props.records;
        var baseColor       = typeof options.baseColor === 'object' ? JSON.parse(options.baseColor) : [252,45,65];
        var startRadius     = baseColor[0];
        var startSaturation = baseColor[1] + '%';
        var startLuminance  = baseColor[2] + '%';
        var splitLuminance  = (100 - parseInt(startLuminance)) / totalSlices;

        for (var i = 0; i < totalSlices; i++) {

            var luminance = parseInt(startLuminance) - splitLuminance * i;

            // set colors

            if ($thisPaths[i] !== undefined)   $thisPaths[i].setAttribute('fill', 'hsl(' + startRadius + ',' + startSaturation + ',' + luminance + '%)');
            if ($thisCircles[i] !== undefined) $thisCircles[i].setAttribute('fill', 'hsl(' + startRadius + ',' + startSaturation + ',' + luminance + '%)');

            $thisDots.eq(i).css('background','hsl(' + startRadius + ',' + startSaturation + ',' + luminance + '%)');

        }

    }

    function addChartData($thisPieChart, thisValue) {

        /**
         *  Calculate and set shades of a given base color for each slice.
         *
         *  @param {jQuery dom object} $thisPieChart - the pie chart
         *  @param {number}            $thisValue    - the numeric percentage value of the data bit
         */

        // Inspired by
        // http://jsfiddle.net/lensco/ScURE/

        var size             = parseInt($thisPieChart.data().props.size);
        var radius           = size / 2;
        var rotation         = $thisPieChart.data().props.rotation;
        var $thisPieChartSvg = $thisPieChart.find('svg');
        var $thisPieSlice;

        // clean up thisValue

        thisValue = parseInt(thisValue);
        thisValue = Math.min(Math.max(thisValue, 0), 100);

        // Create a circle if the value is 100 or above,
        // otherwise draw the individual slice.

        if (thisValue >= 100) {

            $thisPieSlice = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            $thisPieSlice.setAttribute('r',  radius);
            $thisPieSlice.setAttribute('cx', radius);
            $thisPieSlice.setAttribute('cy', radius);

        } else {

            $thisPieSlice = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            // Calculate x,y coordinates of the point on the circle to draw the arc to.

            var x = Math.cos((2 * Math.PI) / (100 / thisValue));
            var y = Math.sin((2 * Math.PI) / (100 / thisValue));

            // Should the arc go the long way round?

            var longArc = (thisValue <= 50) ? 0 : 1;

            // "d" is a string that describes the path of the slice.
            // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d

            var d = 'M' + radius + ',' + radius + ' L' + radius + ',' + 0 + ', A' + radius + ',' + radius + ' 0 ' + longArc + ',1 ' + (radius + y * radius) + ',' + (radius - x * radius) + ' z';
            $thisPieSlice.setAttribute('d', d);

            // rotate the slice

            $thisPieSlice.setAttribute('transform', 'rotate(' + 360 / (100 / rotation) + ' ' + radius + ' ' + radius + ')');

            // save rotation and increase index

            $thisPieChart.data().props.rotation +=  thisValue;
            $thisPieChart.data().props.index +=  1;

        }

        // append the slice

        $thisPieChartSvg.append($thisPieSlice);

    }

    function highlightRecord($thisRecord) {

        /**
         *  Highlight a single record (think "slice") of a pie chart.
         *
         *  @param {jQuery dom object} $thisRecord - the pie chart record
         */

        var thisIndex = $thisRecord.index();
        var $slices   = $thisRecord.closest('.pieChart').find('svg path');

        // highlight the record

        $thisRecord.siblings().fadeTo(0, 0.4);
        $thisRecord.fadeTo(0, 1);

        // highlight the slices

        $slices.fadeTo(0, 0.15);
        $slices.eq(thisIndex).fadeTo(0, 1);

    }

    function blinkRecord($thisRecord) {

        /**
         *  Blink a single record (think "slice") of a pie chart.
         *
         *  @param {jQuery dom object} $thisRecord - the pie chart record
         */

        var thisIndex = $thisRecord.index();
        var $slices   = $thisRecord.closest('.pieChart').find('svg path');

        // let the slice blink

        YOI.blink($slices.eq(thisIndex));

    }

    function resetHighlightRecord($thisPieChart) {

        /**
         *  Remove the highlighting from all records (think "slices") of a pie chart.
         *
         *  @param {jQuery dom object} $thisPieChart - the pie chart
         */

        var $slices      = $thisPieChart.find('svg path');
        var $thisRecords = $thisPieChart.find('.pieChart__record');

        $slices.fadeTo(300, 1);
        $thisRecords.fadeTo(300, 1);

    }

    // public functions
    // ================

    return {
        init                 : initialize,
        highlightRecord      : highlightRecord,
        blinkRecord          : blinkRecord,
        resetHighlightRecord : resetHighlightRecord
    };

})();
