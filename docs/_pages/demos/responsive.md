---
layout: blank
title: Responsive Demo
permalink: demos/responsive
sitemap: false
---

<h1 class="p-4">Responsive Design Test Page</h1>

<h2 class="p-4">Grid / Layout</h2>

<div class="p-4">
    <div class="flx">
        <div class="p-2 h-20 w-1-1 m:w-1-2 bg-yellow-22">1-1 on small; 1-2 from medium up;</div>
        <div class="p-2 h-20 w-1-1 m:w-1-2 bg-red-22">1-1 on small; 1-2 from medium up;</div>
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
                <span class="only-m:hidden">
                     <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
            </td>
        </tr>
        <tr>
            <td class="w-15 p-3">Hidden at <b class="c-red-15">L</b> and up</td>
            <td>
                <span class="l:hidden">
                     <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
            </td>
        </tr>
        <tr>
            <td class="w-15 p-3">Only visible at <b class="c-red-15">L</b></td>
            <td>
                <span class="only-s:hidden only-m:hidden xl:hidde">
                     <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
            </td>
        </tr>
    </table>
</div>