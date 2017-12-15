---
layout: blank
title: Responsive Demo
permalink: demos/responsive
---

<h1 class="p-4">Responsive Design Test Page</h1>

<h2 class="p-4">Grid / Layout</h2>

<div class="p-4">
    <div class="flx">
        <div class="p-2 h-20 w-1-1 m--w-1-2 bg-yellow-22">1-1 on small; 1-2 from medium up;</div>
        <div class="p-2 h-20 w-1-1 m--w-1-2 bg-red-22">1-1 on small; 1-2 from medium up;</div>
    </div>
    <div class="flx">
        <div class="p-2 h-20 w-1-2 bg-yellow-22">always 1-2;</div>
        <div class="p-2 h-20 w-1-2 bg-red-22">always 1-2;</div>
    </div>
</div>

<h2 class="p-4">Visibility</h2>

<div class="p-4">
    <table>
        <tr>
            <td class="w-15 p-3">Only hidden at <b class="c-red-15">M</b></td>
            <td>
                <span class="only-m--hidden">
                    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-011-s&f=666" yoi-icon />
                </span>
            </td>
        </tr>
        <tr>
            <td class="w-15 p-3">Hidden at <b class="c-red-15">L</b> and up</td>
            <td>
                <span class="l--hidden">
                    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-011-s&f=666" yoi-icon />
                </span>
            </td>
        </tr>
        <tr>
            <td class="w-15 p-3">Only visible at <b class="c-red-15">L</b></td>
            <td>
                <span class="only-s--hidden only-m--hidden xl--hidde">
                    <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-011-s&f=666" yoi-icon />
                </span>
            </td>
        </tr>
    </table>
</div>