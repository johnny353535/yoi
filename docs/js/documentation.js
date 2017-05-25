/** documentation.js */

// code examples
// =============

(function() {
    
    /**
     *  Formats <code> tags with html content. Listens for specially formatted html-comments as flags:
     *
     *  <!-- example -->      = injects the markup above the <code> tag
     *  <!-- example:tabs --> = replaces the <code> tag with a tabbed widget (rendered markup + code)
     */
    
    var $window      = $(window);
    var $codeWrapper = $('div[class*="highlighter"]');
    var tabPageIndex = 0;
    
    $.each($codeWrapper, function(index) {
        
        var $thisCodeWrapper    = $(this);
        var $thisCode           = $thisCodeWrapper.find('code');
        var exampleTag          = '<!-- example -->';
        var exampleTagTabbed    = '<!-- example:tabs -->';
        var thisExample         = $thisCode.text().split(exampleTag).length > 1 ? $thisCode.text().split(exampleTag)[1] : false;
        var thisExampleTabbed   = $thisCode.text().split(exampleTagTabbed).length > 1 ? $thisCode.text().split(exampleTagTabbed)[1] : false;
        
        if (thisExampleTabbed) {
            
            // set indexes to generate unique ids
            // for tab pages
            
            var firstIndex  = ++tabPageIndex;
            var secondIndex = ++tabPageIndex;
            
        }
        
        if (thisExample) {
            
            // markup variable
            
            var _ = '';
            
            // remove the "exampleTag" and the first line break
            
            $thisCode.find('.c:contains("' + exampleTag + '")').remove();
            
            // template for tabbed code preview

            _ =    '<div class="documentation__example">';
            _ +=       '<div class="documentation__result">';
            _ +=           thisExample;
            _ +=       '</div>';
            _ +=       '<div class="documentation__code">';
            _ +=           $thisCodeWrapper.html();
            _ +=       '</div>';
            _ +=   '</div>';
        
        }
        
        if (thisExampleTabbed) {
            
            // markup variable
            
            var _ = '';
            
            // remove the "exampleTagTabbed" and the first line break
        
            $thisCode.find('.c:contains("' + exampleTagTabbed + '")').remove();
            
            // template for tabbed code preview

            _ =    '<div class="documentation__example tabs">';
            _ +=       '<div class="tabs__menu tabs__menu--loose" yoi-tabs>';
            _ +=           '<ul class="tabs__items">';
            _ +=               '<li class="tabs__item">';
            _ +=                   '<a class="tabs__link" href="#exampleTab-' + firstIndex + '">Example</a>';
            _ +=               '</li>';
            _ +=               '<li class="tabs__item">';
            _ +=                   '<a class="tabs__link" href="#exampleTab-' + secondIndex + '">Code</a>';
            _ +=               '</li>';
            _ +=           '</ul>';
            _ +=       '</div>';
            _ +=       '<div id="exampleTab-' + firstIndex + '" class="tabs__page">';
            _ +=           thisExampleTabbed;
            _ +=       '</div>';
            _ +=       '<div id="exampleTab-' + secondIndex + '" class="tabs__page">';
            _ +=           $thisCodeWrapper.html();
            _ +=       '</div>';
            _ +=   '</div>';
            
        }
        
        if (thisExample || thisExampleTabbed) {
            $thisCodeWrapper.replaceWith(_);
        }
        
    });
    
})();

// tools/buttons.md
// ================

(function() {

    $('[data-modifier]').on('change', function() {

        var $this = $(this);

        var allButtons       = $this.parent().next('.documentation__blocks').find('.btn');
        var modifierClasses  = $this.data('modifier');
        var selectedModifier = $this.find('option:selected').val();
        var dependendSelect  = $this.nextAll('span').first().find('[role="customSelect"]');

        allButtons.each(function() {

            var $this = $(this);

            $this.removeClass(modifierClasses);
            $this.addClass(selectedModifier);

            // special case because of flat/subtle depedency

            if (selectedModifier === 'btn--subtle') {
                dependendSelect.addClass('btn--disabled');
                dependendSelect.find('select').prop('disabled', true);
                dependendSelect.find('option').prop('selected', false);
                $this.removeClass('btn--rounded btn--flat btn--outline');
            } else {
                dependendSelect.removeClass('btn--disabled');
                dependendSelect.find('select').prop('disabled', false);
            }

        });

    });

})();

// tools/gradient.md
// =================

(function() {
    
    var ColorMath = {

        global: {
            generatedCode: ''
        },

        init: function(){
            
            if ($('#colorForm').length) {
                
                document.getElementById('colorForm').addEventListener('submit', function(e){

                    e.preventDefault();

                    var referenceColor = document.getElementById('referenceColor').value;
                    var steps = document.getElementById('steps').value * 1 + 1;

                    document.querySelector("#btnSubmit").value = 'Refresh';

                    ColorMath.paintGradient(referenceColor,steps);
                    ColorMath.generateCode();

                });
                
            }

        },

        hexToRgb: function(hex){

            // input contains #
            if (hex[0] == "#") {
                hex = hex.substr(1);
            }

            // input is hex shortcut
            if (hex.length == 3) {
                var temp = hex;
                hex = '';
                temp = /^([a-f0-9])([a-f0-9])([a-f0-9])$/i.exec(temp).slice(1);
                for (var i=0;i<3;i++) hex += temp[i] + temp[i];
            }

            var triplets = /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(hex).slice(1);
            var r = parseInt(triplets[0],16);
            var g = parseInt(triplets[1],16);
            var b = parseInt(triplets[2],16);

            return [r,g,b];

        },

        hexToHsl: function(hex){

            var rgbColor = ColorMath.hexToRgb(hex);
            var hslColor = ColorMath.rgbToHsl(rgbColor);

            return hslColor;

        },

        rgbToHsl: function(rgb) {

            r = rgb[0]/255, g = rgb[1]/255, b = rgb[2]/255;

            var max     = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2, d = max - min;

            if (max == min){
                h = s = 0;
            } else {
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2;               break;
                    case b: h = (r - g) / d + 4;               break;
                }
                h /= 6;
            }

            return [h * 360,s,l];

        },

        rgbToHex: function(rgb) {

            return '#' + rgb.map(function (i) {
                i = Math.round(i);
                i = (i > 255 ? 255 : (i < 0 ? 0 : i)).toString(16);
                return i.length === 1 ? '0' + i : i;
            }).join('');

        },

        makeShade: function(referenceColor,gradientPos) {

            var hsl_1 = ColorMath.hexToHsl(referenceColor);
            var rgb_2 = [gradientPos,gradientPos,gradientPos];
            var hsl_2 = ColorMath.rgbToHsl(rgb_2);
            var diff  = hsl_2[2] - hsl_1[2];

            var referenceColorAsRgb = ColorMath.hexToRgb(referenceColor);

            var red   = referenceColorAsRgb[0] / 255 + diff;
            var green = referenceColorAsRgb[1] / 255 + diff;
            var blue  = referenceColorAsRgb[2] / 255 + diff;

            var luminance = 0.3 * red + 0.59 * green + 0.11 * blue;
            var cMin = Math.min(red,green,blue);
            var cMax = Math.max(red,green,blue);

            if (cMin < 0) {
                red   = luminance + (red-luminance) * luminance/(luminance - cMin);
                green = luminance + (green-luminance) * luminance/(luminance - cMin);
                blue  = luminance + (blue-luminance) * luminance/(luminance - cMin);
            }
            if (cMax > 1) {
                red   = luminance + (red - luminance) * (1 - luminance) / (cMax - luminance);
                green = luminance + (green - luminance) * (1 - luminance) / (cMax - luminance);
                blue  = luminance + (blue - luminance) * (1 - luminance) / (cMax - luminance);
            }

            var rgb = [
                Math.round(red * 255),
                Math.round(green * 255),
                Math.round(blue * 255)
            ];

            var hex = ColorMath.rgbToHex(rgb);

            return hex;

        },

        paintGradient : function(referenceColor,steps){

            var canvas = document.getElementById('gradient');
            var stepBase = 255 / (steps - 1);
            var prefix = document.getElementById('lessVarBasename').value;

            canvas.innerHTML = '';
            ColorMath.global.generatedCode = '';

            for (var i=1; i < steps; i++) {

                var gradientPos = stepBase * i;
                var shade = ColorMath.makeShade(referenceColor,gradientPos);
                var colorStep = document.createElement('div');
                colorStep.className = 'shade';
                colorStep.style.backgroundColor = shade;
                colorStep.innerHTML = '<p>'+shade+'</p>';
                canvas.appendChild(colorStep);
                ColorMath.global.generatedCode += '@' + prefix + '-' + i + ': ' + shade + ';\r\n';

            };

            canvas.style.display = 'block';

        },

        generateCode: function(){

            var codepanel = document.getElementById('codepanel');
            codepanel.getElementsByTagName('code')[0].innerHTML = ColorMath.global.generatedCode;
            codepanel.style.display = 'block';

        }

    }

    window.ColorMath = ColorMath;
    ColorMath.init();
    
})();