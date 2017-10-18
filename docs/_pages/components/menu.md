---
layout: base
group: components
title: Menu
permalink: components/menu
---

# Menu

<p class="intro">Use this component to create a simple menu. It is designed to include *up to three levels of sub menus* and features *optional pointers* on either the right or left side.</p>

## Basic Example

This is the basic example of a `.menu` instance. You are free to use any markup you like as long as you use the BEM class name provided by this example. After all, while that’s a feature, it’s a feature you might rarely need since simple lists (`<ul>` od `<ol>`) are semantically the correct choices in most scenarios.

<p class="hint hint--primary">Click the menu items on this example page to add the .is--active modifier class.</p>

```html
<!-- example -->
<ul class="menu">
    <li class="menu__item">
        <a class="menu__link" href="#">Kontrolllösungen</a>
    </li>
    <li class="menu__item">
        <a class="menu__link" href="#">Lanzetten</a>
    </li>
    <li class="menu__item">
        <a class="menu__link" href="#">Messgeräte &amp; Zubehör</a>
    </li>
</ul>
```

## Sub-Menus

As mentioned above, a `.menu` instance may have up to three levels of nested sub menus. See the folowing example.

<p class="hint hint--primary"><b>Limited Nesting</b> In order to not break the layout, please make sure you only nest up to three levels deep, like in the following example.</p>

```html
<!-- example:tabs -->
<ul class="menu">
    <li class="menu__item">
        <a class="menu__link" href="#">Blutzuckermessung</a>
        <ul class="menu">
            <li class="menu__item">
                <a class="menu__link" href="#">Kontrolllösungen</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Lanzetten</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Messgeräte &amp; Zubehör</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Stechhilfen</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Teststreifen</a>
                <ul class="menu">
                    <li class="menu__item">
                        <a class="menu__link" href="#">kleine Teststreifen</a>
                    </li>
                    <li class="menu__item">
                        <a class="menu__link" href="#">große Teststreifen</a>
                        <ul class="menu">
                            <li class="menu__item">
                                <a class="menu__link" href="#">grün</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="#">blau</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
    <li class="menu__item">
        <a class="menu__link" href="#">Diabetikerbedarf</a>
        <ul class="menu">
            <li class="menu__item">
                <a class="menu__link" href="#">Diabetikervitamine</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Fußpflege</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Hautpflege</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Polyneuropathie</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Süßungsmittel</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Unterzuckerung</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Wundversorgung</a>
            </li>
        </ul>
    </li>
    <li class="menu__item">
        <a class="menu__link" href="#">Insulininjektion</a>
        <ul class="menu">
            <li class="menu__item">
                <a class="menu__link" href="#">Desinfektion</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Insulinpens</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Insulinspritzen</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Penkanülen</a>
            </li>
        </ul>
    </li>
</ul>
```

## Pointers

Add optional pointers to the currently selected (`.is--active`) element. Chose from pinters to the left (`.menu--pointLeft`) and pointers to the right (`.menu--pointRight`).

```html
<!-- example:tabs -->
<ul class="menu menu--pointLeft">
    <li class="menu__item">
        <a class="menu__link" href="#">Blutzuckermessung</a>
        <ul class="menu">
            <li class="menu__item">
                <a class="menu__link" href="#">Kontrolllösungen</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Stechhilfen</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Teststreifen</a>
                <ul class="menu">
                    <li class="menu__item">
                        <a class="menu__link" href="#">kleine Teststreifen</a>
                    </li>
                    <li class="menu__item">
                        <a class="menu__link" href="#">große Teststreifen</a>
                        <ul class="menu">
                            <li class="menu__item">
                                <a class="menu__link" href="#">grün</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="#">blau</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
    <li class="menu__item">
        <a class="menu__link" href="#">Diabetikerbedarf</a>
        <ul class="menu">
            <li class="menu__item">
                <a class="menu__link" href="#">Diabetikervitamine</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Fußpflege</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Hautpflege</a>
            </li>
        </ul>
    </li>
    <li class="menu__item">
        <a class="menu__link" href="#">Insulininjektion</a>
        <ul class="menu">
            <li class="menu__item">
                <a class="menu__link" href="#">Desinfektion</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" href="#">Insulinpens</a>
            </li>
        </ul>
    </li>
</ul>
```

## Advanced Usage

The following example combines the `.menu` with the [toggleGroup interface](/pages/js-interface/toggleGroup.html) to create a simple, *tab-able* widget.

```html
<!-- example:tabs -->
<div class="box flexGrid">
    <div class="w-1-3">
        <ul class="menu menu--pointRight br-0 b-0 b-r">
            <li class="menu__item">
                <a class="menu__link" yoi-toggle="target:#view-1; group:toggleMenu; activeClassName:is--active;">Lorem</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" yoi-toggle="target:#view-2; group:toggleMenu; activeClassName:is--active;">Ipsum</a>
            </li>
            <li class="menu__item">
                <a class="menu__link" yoi-toggle="target:#view-3; group:toggleMenu; activeClassName:is--active;">Dolor</a>
            </li>
        </ul>
    </div>
    <div class="w-2-3 p-4">
        <div id="view-1">
            <h2>Lorem</h2>
        </div>
        <div id="view-2">
            <h2>Ipsum</h2>
        </div>
        <div id="view-3">
            <h2>Dolor</h2>
        </div>
    </div>
</div>
```

{% raw %}
<script>
    (function() {

        /**
         *  Mark the active menu item on click by adding the class name ".is--active".
         *  Depending on context, the exact target item to mark differs.
         */

        $('.menu__item').on('click', function(e) {

            // prevent default event behaviour and event bubbling

            e.preventDefault();
            e.stopPropagation();

            // assign variables

            var $this          = $(this);
            var $parentMenu    = $this.closest('.menu');
            var $enclosedLinks = $this.find('.menu__link');
            var $target;

            // pick the target
            // (.menu__item if no enclosed link is found, otherwise .menu__link)

            if ($enclosedLinks.length) {
                target = $enclosedLinks.first();
            } else {
                target = $this;
            }

            // reset all active items

            $this.parents('.menu').find('.menu__item, .menu__link').removeClass('is--active');

            // mark the active item

            target.addClass('is--active');

        })

    })();
</script>
{% endraw %}