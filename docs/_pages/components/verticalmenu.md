---
layout: base
group: components
title: Verticalmenu
permalink: components/verticalmenu
---

# VerticalMenu

<p class="intro">Use this component to create a simple vertical menu. It is designed to include *up to three levels of sub menus* and features *optional pointers* on either the right or left side.</p>

## Basic Example

This is the basic example of a `.verticalMenu` instance. You are free to use any markup you like as long as you use the BEM class name provided by this example. After all, while that’s a feature, it’s a feature you might rarely need since simple lists (`<ul>` od `<ol>`) are semantically the correct choices in most scenarios.

<p class="hint hint--primary">Click the verticalMenu items on this example page to add the .is--active modifier class.</p>

```html
<!-- example -->
<ul class="verticalMenu">
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Kontrolllösungen</a>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Lanzetten</a>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Messgeräte &amp; Zubehör</a>
    </li>
</ul>
```

## Sub-verticalMenus

As mentioned above, a `.verticalMenu` instance may have up to three levels of nested sub verticalMenus. See the folowing example.

<p class="hint hint--primary"><b>Limited Nesting</b> In order to not break the layout, please make sure you only nest up to three levels deep, like in the following example.</p>

```html
<!-- example:tabs -->
<ul class="verticalMenu">
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Blutzuckermessung</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Kontrolllösungen</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Lanzetten</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Messgeräte &amp; Zubehör</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Stechhilfen</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Teststreifen</a>
                <ul class="verticalMenu">
                    <li class="verticalMenu__item">
                        <a class="verticalMenu__link" href="#">kleine Teststreifen</a>
                    </li>
                    <li class="verticalMenu__item">
                        <a class="verticalMenu__link" href="#">große Teststreifen</a>
                        <ul class="verticalMenu">
                            <li class="verticalMenu__item">
                                <a class="verticalMenu__link" href="#">grün</a>
                            </li>
                            <li class="verticalMenu__item">
                                <a class="verticalMenu__link" href="#">blau</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Diabetikerbedarf</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Diabetikervitamine</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Fußpflege</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Hautpflege</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Polyneuropathie</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Süßungsmittel</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Unterzuckerung</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Wundversorgung</a>
            </li>
        </ul>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Insulininjektion</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Desinfektion</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Insulinpens</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Insulinspritzen</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Penkanülen</a>
            </li>
        </ul>
    </li>
</ul>
```

## Pointers

Add optional pointers to the currently selected (`.is--active`) element. Chose from pinters to the left (`.verticalMenu--pointLeft`) and pointers to the right (`.verticalMenu--pointRight`).

```html
<!-- example:tabs -->
<ul class="verticalMenu verticalMenu--pointLeft">
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Blutzuckermessung</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Kontrolllösungen</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Stechhilfen</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Teststreifen</a>
                <ul class="verticalMenu">
                    <li class="verticalMenu__item">
                        <a class="verticalMenu__link" href="#">kleine Teststreifen</a>
                    </li>
                    <li class="verticalMenu__item">
                        <a class="verticalMenu__link" href="#">große Teststreifen</a>
                        <ul class="verticalMenu">
                            <li class="verticalMenu__item">
                                <a class="verticalMenu__link" href="#">grün</a>
                            </li>
                            <li class="verticalMenu__item">
                                <a class="verticalMenu__link" href="#">blau</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Diabetikerbedarf</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Diabetikervitamine</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Fußpflege</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Hautpflege</a>
            </li>
        </ul>
    </li>
    <li class="verticalMenu__item">
        <a class="verticalMenu__link" href="#">Insulininjektion</a>
        <ul class="verticalMenu">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Desinfektion</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" href="#">Insulinpens</a>
            </li>
        </ul>
    </li>
</ul>
```

## Advanced Usage

The following example combines the `.verticalMenu` with the [toggleGroup interface](/pages/js-interface/toggleGroup.html) to create a simple, *tab-able* widget.

```html
<!-- example:tabs -->
<div class="box flx">
    <div class="w-1-3">
        <ul class="verticalMenu verticalMenu--pointRight br-0 b-0 b-r">
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" yoi-toggle="target:#view-1; group:toggleverticalMenu; activeClassName:is--active;">Lorem</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" yoi-toggle="target:#view-2; group:toggleverticalMenu; activeClassName:is--active;">Ipsum</a>
            </li>
            <li class="verticalMenu__item">
                <a class="verticalMenu__link" yoi-toggle="target:#view-3; group:toggleverticalMenu; activeClassName:is--active;">Dolor</a>
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
         *  Mark the active verticalMenu item on click by adding the class name ".is--active".
         *  Depending on context, the exact target item to mark differs.
         */

        $('.verticalMenu__item').on('click', function(e) {

            // prevent default event behaviour and event bubbling

            e.preventDefault();
            e.stopPropagation();

            // assign variables

            var $this          = $(this);
            var $parentverticalMenu    = $this.closest('.verticalMenu');
            var $enclosedLinks = $this.find('.verticalMenu__link');
            var $target;

            // pick the target
            // (.verticalMenu__item if no enclosed link is found, otherwise .verticalMenu__link)

            if ($enclosedLinks.length) {
                target = $enclosedLinks.first();
            } else {
                target = $this;
            }

            // reset all active items

            $this.parents('.verticalMenu').find('.verticalMenu__item, .verticalMenu__link').removeClass('is--active');

            // mark the active item

            target.addClass('is--active');

        })

    })();
</script>
{% endraw %}