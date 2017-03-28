---
layout: base
group: tools
title: Color Tool
permalink: tools/color_tool
---

## Color Tool
Our color gradients were not created using [Less’ internal color blending functions](http://lesscss.org/functions/#color-blending) because they do not produce gradients with **constant luminosity**. Instead, certain shades would always pop out and feel wrong because they are over-saturated.

We solved this problem with a custom algorithm which basically mimics [Photoshop’s »color« blend mode](http://www.beneaththewaves.net/Photography/Secrets_of_Photoshops_Colour_Blend_Mode_Revealed_Sort_Of.html). Use the tool below to generate color shades.
The color variables (less) for the Yoshino frontend are based on 25-step gradients. The higher the number, the lighter the color (eg. `@blue-0` vs. `@blue-25`).

<div class="boxes">
    <div class="w-1-1 box">
        <div class="grid-float">
        <div class="w-1-5 fl-l p-4">
            <form id="colorForm" action="#">
                <label for="referenceColor">Reference color</label>
                <input class="input--large m-b-2" type="text" id="referenceColor" value="#7ebaf0" />
                <label for="lessVarBasename">Var base name</label>
                <input class="input--large m-b-2" type="text" id="lessVarBasename" value="color" />
                <label for="steps">Gradient steps</label>
                <input class="input--large m-b-2" type="text" id="steps" value="25" />
                <input class="btn btn--large btn--dark w-1-1 al-c" id="btnSubmit" type="submit" value="Run" />
            </form>
            <div class="m-t-4" id="presets">
                <label class="m-b-2">Or pick a preset:</label>
                <button class="btn btn--flat btn--rounded btn--light m-b-2" onclick="ColorMath.paintGradient('#8572c0',26);ColorMath.generateCode()">Purple</button><br />
                <button class="btn btn--flat btn--rounded btn--light m-b-2" onclick="ColorMath.paintGradient('#7ebaf0',26);ColorMath.generateCode()">Blue</button><br />
                <button class="btn btn--flat btn--rounded btn--light m-b-2" onclick="ColorMath.paintGradient('#b7e7cd',26);ColorMath.generateCode()">Green</button><br />
                <button class="btn btn--flat btn--rounded btn--light m-b-2" onclick="ColorMath.paintGradient('#f84502',26);ColorMath.generateCode()">Red</button><br />
                <button class="btn btn--flat btn--rounded btn--light m-b-2" onclick="ColorMath.paintGradient('#fff9bb',26);ColorMath.generateCode()">Yellow</button><br />
                <button class="btn btn--flat btn--rounded btn--light m-b-2" onclick="ColorMath.paintGradient('#979797',26);ColorMath.generateCode()">Grey</button>
            </div>
        </div>
        <div class="w-4-5 fl-r p-4">
            <div id="gradient"></div>
        </div>
        </div>
    </div>
    <div class="box" id="codepanel">
        <code class="tc-main-8 d-blk"></code>
    </div>
</div>

{% raw %}
<style type="text/css" media="screen">

    .shade {
        height: 4rem;
        text-align: right;
    }

    .shade p {
        background: rgba(0,0,0,.4);
        color: #fff;
        display: inline-block;
        font: normal 1.5rem/4rem monospace;
        height: 100%;
        padding: 0 1.5rem;
    }

    #gradient {
        display: none;
    }

    #codepanel {
        display: none;
    }

    #codepanel code {
        margin: 0;
        padding: 2rem;
        white-space: pre;
    }

</style>
<script>

    var ColorMath = {

        global: {

            generatedCode: ''

        },

        init: function(){

            document.getElementById('colorForm').addEventListener('submit', function(e){

                e.preventDefault();

                var referenceColor = document.getElementById('referenceColor').value;
                var steps = document.getElementById('steps').value * 1 + 1;

                document.querySelector("#btnSubmit").value = 'Refresh';

                ColorMath.paintGradient(referenceColor,steps);
                ColorMath.generateCode();

            });

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

</script>
{% endraw %}
