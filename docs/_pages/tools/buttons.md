---
layout: base
group: tools
title: Buttons Tool
permalink: tools/buttons
---

{% raw %}

## Buttons Tool
### Single Buttons

<form class="m-tb-4">
    <span data-modifier="btn--light btn--dark btn--attention btn--negative btn--positive btn--subtle">
        <select class="select select--large">
            <option value="">none</option>
            <option value="btn--light">light</option>
            <option value="btn--dark">dark</option>
            <option value="btn--attention">attention</option>
            <option value="btn--negative">error, negative</option>
            <option value="btn--positive">success, positive</option>
            <option value="btn--subtle">subtle</option>
        </select>
    </span>
    <b class="p-lr-1">+</b>
    <span data-modifier="btn--rounded btn--flat btn--outline">
        <select class="select select--large">
            <option value="">none</option>
            <option value="btn--rounded">rounded</option>
            <option value="btn--flat">flat</option>
            <option value="btn--flat btn--rounded">flat rounded</option>
            <option value="btn--outline btn--outline">outline</option>
            <option value="btn--rounded btn--outline">rounded outline</option>
        </select>
    </span>
    <b class="p-lr-1">+</b>
    <span data-modifier="btn--small btn--medium btn--large">
        <select class="select select--large">
            <option value="">none</option>
            <option value="btn--small">small</option>
            <option value="btn--medium">medium</option>
            <option value="btn--large">large</option>
        </select>
    </span>
</form>
<div class="documentation__blocks">
    <div class="documentation__block">
        <div class="documentation__example" yoi-controls>
            <button class="btn" style="margin-bottom: 3px;">
                <span>Button</span>
            </button>
            <hr class="ruler m-tb-4" />
            {% for i in range(0, 86) %}
                <button class="btn" style="margin-bottom: 3px;">
                    <span class="icon">{% icon { id: i|pad(2) + '-s' } %}</span>
                    <span>Button</span>
                </button>
            {% endfor %}
            <hr class="ruler m-tb-4" />
            {% for i in range(0, 86) %}
                <button class="btn" style="margin-bottom: 3px;">
                    <span>Button</span>
                    <span class="icon">{% icon { id: i|pad(2) + '-s' } %}</span>
                </button>
            {% endfor %}
            <hr class="ruler m-tb-4" />
            {% for i in range(0, 86) %}
                <button class="btn" style="margin-bottom: 3px;">
                    <span class="hidden">Button</span>
                    <span class="icon">{% icon { id: i|pad(2) + '-s' } %}</span>
                </button>
            {% endfor %}
        </div>
    </div>
</div>

### Large Icons Inside Large Buttons

<form class="m-tb-4">
    <span data-modifier="btn--light btn--dark btn--attention btn--negative btn--positive btn--subtle">
        <select class="select select--large">
            <option value="">none</option>
            <option value="btn--light">light</option>
            <option value="btn--dark">dark</option>
            <option value="btn--attention">attention</option>
            <option value="btn--negative">error, negative</option>
            <option value="btn--positive">success, positive</option>
            <option value="btn--subtle">subtle</option>
        </select>
    </span>
    <b class="p-lr-1">+</b>
    <span data-modifier="btn--rounded btn--flat btn--outline">
        <select class="select select--large">
            <option value="">none</option>
            <option value="btn--rounded">rounded</option>
            <option value="btn--flat">flat</option>
            <option value="btn--flat btn--rounded">flat rounded</option>
            <option value="btn--outline btn--outline">outline</option>
            <option value="btn--rounded btn--outline">rounded outline</option>
        </select>
    </span>
</form>
<div class="documentation__blocks">
    <div class="documentation__block">
        <div class="documentation__example">
            <button class="btn btn--large" style="margin-bottom: 3px;">
                <span class="icon">{% icon { id: '022' } %}</span>
                <span>Large Icon</span>
            </button>
            <button class="btn btn--large" style="margin-bottom: 3px;">
                <span>Large Icon</span>
                <span class="icon">{% icon { id: '022' } %}</span>
            </button>
            <button class="btn btn--large" style="margin-bottom: 3px;">
                <span class="hidden">Large Icon</span>
                <span class="icon">{% icon { id: '022' } %}</span>
            </button>
            <hr class="ruler m-tb-4" />
            <button class="btn btn--large" style="margin-bottom: 3px;">
                <span class="icon">{% icon { id: '022' } %}</span>
                <span>Large Icon</span>
            </button>
            <button class="btn btn--large" style="margin-bottom: 3px;">
                <span>Large Icon</span>
                <span class="icon">{% icon { id: '026' } %}</span>
            </button>
            <button class="btn btn--large" style="margin-bottom: 3px;">
                <span class="hidden">Large Icon</span>
                <span class="icon">{% icon { id: '026' } %}</span>
            </button>
        </div>
    </div>
</div>

### Light Outline Button on top of an Image

<div class="documentation__blocks">
    <div class="documentation__block">
        <div class="documentation__example">
            <div class="posterTeaser posterTeaser--bottom w-24">
                <img src="https://unsplash.it/240/240" alt="" />
                <p class="posterTeaser__body al-c m-b-2">
                    <a href="#" class="btn btn--light btn--large btn--outline">
                        <span>Learn more</span>
                        <span class="icon">{% icon { id: '007-s' } %}</span>
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>

### Button Groups

<form class="m-tb-4">
    <span data-modifier="btn--light btn--dark btn--attention btn--negative btn--positive btn--subtle">
        <select class="select select--large">
            <option value="">none</option>
            <option value="btn--light">light</option>
            <option value="btn--dark">dark</option>
            <option value="btn--attention">attention</option>
            <option value="btn--negative">error, negative</option>
            <option value="btn--positive">success, positive</option>
            <option value="btn--subtle">subtle</option>
        </select>
    </span>
    <b class="p-lr-1">+</b>
    <span data-modifier="btn--rounded btn--flat btn--outline">
        <select class="select select--large">
            <option value="">none</option>
            <option value="btn--rounded">rounded</option>
            <option value="btn--flat">flat</option>
            <option value="btn--flat btn--rounded">flat rounded</option>
            <option value="btn--outline btn--outline">outline</option>
            <option value="btn--rounded btn--outline">rounded outline</option>
        </select>
    </span>
    <b class="p-lr-1">+</b>
    <span data-modifier="btn--small btn--medium btn--large">
        <select class="select select--large">
            <option value="">none</option>
            <option value="btn--small">small</option>
            <option value="btn--medium">medium</option>
            <option value="btn--large">large</option>
        </select>
    </span>
</form>
<div class="documentation__blocks">
    <div class="documentation__block">
        <div class="documentation__example">
            <div class="btns m-b-2">
                <button class="btn">Button</button>
                <button class="btn">Button</button>
                <button class="btn">Button</button>
            </div>
            <div class="btns m-b-2">
                <button class="btn">
                    <span class="icon">{% icon { id: '000-s' } %}</span>
                    <span>Play</span>
                </button>
                <button class="btn">
                    <span class="icon">{% icon { id: '063-s' } %}</span>
                    <span>Stop</span>
                </button>
                <button class="btn">
                    <span class="icon">{% icon { id: '064-s' } %}</span>
                    <span>Pause</span>
                </button>
                <button class="btn">
                    <span class="icon">{% icon { id: '061-s' } %}</span>
                    <span>Rewind</span>
                </button>
                <button class="btn">
                    <span class="icon">{% icon { id: '060-s' } %}</span>
                    <span>Forward</span>
                </button>
            </div>
            <div class="btns m-b-2">
                <button class="btn">
                    <span>Play</span>
                    <span class="icon">{% icon { id: '000-s' } %}</span>
                </button>
                <button class="btn">
                    <span>Stop</span>
                    <span class="icon">{% icon { id: '063-s' } %}</span>
                </button>
                <button class="btn">
                    <span>Pause</span>
                    <span class="icon">{% icon { id: '064-s' } %}</span>
                </button>
                <button class="btn">
                    <span>Rewind</span>
                    <span class="icon">{% icon { id: '061-s' } %}</span>
                </button>
                <button class="btn">
                    <span>Forward</span>
                    <span class="icon">{% icon { id: '060-s' } %}</span>
                </button>
            </div>
            <div class="btns m-b-2">
                <button class="btn">
                    <span class="hidden">Play</span>
                    <span class="icon">{% icon { id: '000-s' } %}</span>
                </button>
                <button class="btn">
                    <span class="hidden">Stop</span>
                    <span class="icon">{% icon { id: '063-s' } %}</span>
                </button>
                <button class="btn">
                    <span class="hidden">Pause</span>
                    <span class="icon">{% icon { id: '064-s' } %}</span>
                </button>
                <button class="btn">
                    <span class="hidden">Rewind</span>
                    <span class="icon">{% icon { id: '061-s' } %}</span>
                </button>
                <button class="btn">
                    <span class="hidden">Forward</span>
                    <span class="icon">{% icon { id: '060-s' } %}</span>
                </button>
            </div>
        </div>
    </div>
    <div class="documentation__block">
        <div class="documentation__example">
            <div class="btns btns--vertical m-b-2">
                <button class="btn">Button</button>
                <button class="btn">Button</button>
                <button class="btn">Button</button>
            </div>
            <div class="btns btns--vertical m-b-2">
                <button class="btn">
                    <span>Play</span>
                    <span class="icon">{% icon { id: '000-s' } %}</span>
                </button>
                <button class="btn">
                    <span>Stop</span>
                    <span class="icon">{% icon { id: '063-s' } %}</span>
                </button>
                <button class="btn">
                    <span>Pause</span>
                    <span class="icon">{% icon { id: '064-s' } %}</span>
                </button>
                <button class="btn">
                    <span>Rewind</span>
                    <span class="icon">{% icon { id: '061-s' } %}</span>
                </button>
                <button class="btn">
                    <span>Forward</span>
                    <span class="icon">{% icon { id: '060-s' } %}</span>
                </button>
            </div>
            <div class="btns btns--vertical m-b-2">
                <button class="btn">
                    <span>Play</span>
                    <span class="icon">{% icon { id: '000-s' } %}</span>
                </button>
                <button class="btn">
                    <span>Stop</span>
                    <span class="icon">{% icon { id: '063-s' } %}</span>
                </button>
                <button class="btn">
                    <span>Pause</span>
                    <span class="icon">{% icon { id: '064-s' } %}</span>
                </button>
                <button class="btn">
                    <span>Rewind</span>
                    <span class="icon">{% icon { id: '061-s' } %}</span>
                </button>
                <button class="btn">
                    <span>Forward</span>
                    <span class="icon">{% icon { id: '060-s' } %}</span>
                </button>
            </div>
            <div class="btns btns--vertical m-b-2">
                <button class="btn">
                    <span class="hidden">Play</span>
                    <span class="icon">{% icon { id: '000-s' } %}</span>
                </button>
                <button class="btn">
                    <span class="hidden">Stop</span>
                    <span class="icon">{% icon { id: '063-s' } %}</span>
                </button>
                <button class="btn">
                    <span class="hidden">Pause</span>
                    <span class="icon">{% icon { id: '064-s' } %}</span>
                </button>
                <button class="btn">
                    <span class="hidden">Rewind</span>
                    <span class="icon">{% icon { id: '061-s' } %}</span>
                </button>
                <button class="btn">
                    <span class="hidden">Forward</span>
                    <span class="icon">{% icon { id: '060-s' } %}</span>
                </button>
            </div>
        </div>
    </div>
</div>
{% endraw %}