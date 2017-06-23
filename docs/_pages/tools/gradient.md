---
layout: base
group: tools
title: Gradient Tool
permalink: tools/gradient
---

# Gradient Tool

<p class="intro">Our color gradients were not created using [Less’ internal color blending functions](http://lesscss.org/functions/#color-blending) because they do not produce gradients with *constant luminosity*. Instead, certain shades would always pop out and feel wrong because they are over-saturated.</p>

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