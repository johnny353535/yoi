var YOI = function() {
    return {
        stringContains: function(input, searchString) {
            if (input === undefined || searchString === undefined) return false;
            if (input.indexOf(searchString) > -1) {
                return true;
            } else {
                return false;
            }
        },
        zeroPad: function(num, digits) {
            var num = Math.abs(num);
            var digits = digits !== undefined ? digits : 1;
            var i = 1;
            var leadingZeros = "0";
            while (i < digits) {
                i++;
                leadingZeros += "0";
            }
            return (leadingZeros + num).slice(-digits - 1);
        },
        foundModule: function(module) {
            if (typeof window.YOI.module[module] === "object") {
                return true;
            } else {
                return false;
            }
        },
        foundElement: function(element) {
            if (typeof window.YOI.element[element] === "object") {
                return true;
            } else {
                return false;
            }
        },
        setDelay: function(delayName, delayTime, delayFunction) {
            this.clearDelay(delayName);
            window[delayName] = window.setTimeout(function() {
                delayFunction();
            }, delayTime);
        },
        clearDelay: function(delayName) {
            if (typeof window[delayName] === "number") {
                window.clearTimeout(window[delayName]);
                window[delayName] = undefined;
            }
        },
        setInterval: function(intervalName, intervalTime, intervalFunction) {
            this.clearInterval(intervalName);
            window[intervalName] = window.setInterval(function() {
                intervalFunction();
            }, intervalTime);
        },
        clearInterval: function(intervalName) {
            if (typeof window[intervalName] === "number") {
                window.clearInterval(window[intervalName]);
                window[intervalName] = undefined;
            }
        },
        toObject: function(input) {
            var keyValuePair;
            var properObject = {};
            if (YOI.stringContains(input, ":")) {
                var valueStartMarker;
                var keyValuePairEndMarker;
                if (YOI.stringContains(input, "'") && YOI.stringContains(input, ";")) {
                    valueStartMarker = ":'";
                    keyValuePairEndMarker = "';";
                } else {
                    valueStartMarker = ":";
                    keyValuePairEndMarker = ";";
                }
                input = (input || "").replace(/\s+/g, " ").split(keyValuePairEndMarker);
                for (var i = 0; i < input.length; i++) {
                    keyValuePair = input[i].split(valueStartMarker);
                    if (keyValuePair[1] !== undefined) properObject[keyValuePair[0].trim()] = keyValuePair[1].trim();
                }
                return properObject;
            } else {
                return false;
            }
        },
        getAttribute: function($element) {
            var yoiAttributeValue;
            $.each($element[0].attributes, function(index, attribute) {
                if (attribute.name.match("^yoi-")) {
                    yoiAttributeValue = attribute.value;
                    return false;
                }
            });
            return yoiAttributeValue;
        },
        hide: function($target) {
            if (!($target instanceof jQuery)) {
                return false;
            }
            if ($target.hasClass("d-blk")) {
                $target.data("displayUtilityClass", "d-blk");
            } else if ($target.hasClass("d-inl")) {
                $target.data("displayUtilityClass", "d-inl");
            } else if ($target.hasClass("d-inlblk")) {
                $target.data("displayUtilityClass", "d-inlblk");
            }
            $target.removeClass("d-blk d-inl d-inlblk");
            $target.hide();
        },
        show: function($target) {
            if (!($target instanceof jQuery)) {
                return false;
            }
            if ($target.data("displayUtilityClass") === undefined) {
                $target.show();
            } else {
                $target.addClass($target.data("displayUtilityClass"));
            }
        },
        environment: function(envName) {
            if (envName === undefined) {
                return $("body").attr("yoi-environment");
            } else {
                return $("body").attr("yoi-environment") === envName;
            }
        },
        currentBreakpoint: function() {
            return window.getComputedStyle(document.body, ":after").getPropertyValue("content").replace(/\"/g, "");
        },
        locale: function(language) {
            if (language === undefined) {
                return $("html").attr("lang");
            } else {
                return $("html").attr("lang") === language;
            }
        },
        blink: function(elem) {
            if (!(elem instanceof jQuery) || elem === undefined) return false;
            elem.animate({
                opacity: 0
            }, 100).animate({
                opacity: 1
            }, 100).animate({
                opacity: 0
            }, 100).animate({
                opacity: 1
            }, 100);
        },
        pulse: function(elem) {
            if (!(elem instanceof jQuery) || elem === undefined) return false;
            elem.animate({
                opacity: .2
            }, 300).animate({
                opacity: 1
            }, 300).animate({
                opacity: .2
            }, 300).animate({
                opacity: 1
            }, 300);
        },
        updateOptions: function($element, options) {
            if ($element.data().options === undefined) $element.data().options = {};
            if (options === undefined) {
                var options = YOI.toObject(YOI.getAttribute($element));
            }
            if (typeof options === "object") {
                $.each(options, function(key, value) {
                    $element.data().options[key] = value;
                });
            }
        },
        updateProps: function($element, props) {
            if ($element.data().props === undefined) $element.data().props = {};
            if (typeof props === "object") {
                if (props !== $element.data().props) {
                    $element.trigger("YOI.props:change");
                }
                $.each(props, function(key, value) {
                    $element.data().props[key] = value;
                });
                $element.trigger("YOI.props:update");
            }
            return $element.data().props;
        },
        updateState: function($element, state) {
            if ($element.data().state === undefined) $element.data().state = {};
            if (typeof state === "string") {
                if (state !== $element.data().state) {
                    $element.trigger("YOI.state:change");
                }
                $element.data().state = state;
                $element.trigger("YOI.state:update");
            }
            return $element.data().state;
        },
        createCollection: function(identifier, $element, options, state, props) {
            if (YOI.elementCollection[identifier] === undefined) YOI.elementCollection[identifier] = $([]);
            if (!($element instanceof jQuery)) {
                YOI.elementCollection[identifier] = $("[yoi-" + identifier + "]");
                if (!YOI.elementCollection[identifier].length) return false;
                YOI.elementCollection[identifier].each(function() {
                    YOI.updateOptions($(this), options);
                    YOI.updateState($(this), state);
                    YOI.updateProps($(this), props);
                });
            } else if ($element instanceof jQuery) {
                YOI.updateOptions($element, options);
                YOI.elementCollection[identifier] = YOI.elementCollection[identifier].add($element);
            }
            return YOI.elementCollection[identifier];
        },
        startDomObserver: function() {
            var $document = $(document);
            var observer = window.MutationObserver || window.WebKitMutationObserver;
            var target = document.body;
            this.observer = new observer(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length) {
                        $document.trigger("yoi-dom:add");
                    }
                    if (mutation.removedNodes.length) {
                        $document.trigger("yoi-dom:remove");
                    }
                });
            });
            this.observer.observe(target, {
                subtree: true,
                attributes: true,
                childList: true,
                characterData: true
            });
        },
        stopDomObserver: function() {
            if (this.observer !== undefined) {
                this.observer.disconnect();
            }
        }
    };
}();

YOI.elementCollection = {};

YOI.element = {};

YOI.module = {};

$(function() {
    YOI.element.Code.start();
    $.each(YOI.element, function() {
        try {
            this.init();
        } catch (e) {}
    });
    $.each(YOI.module, function() {
        try {
            this.init();
        } catch (e) {}
    });
});

YOI.element.Accordion = function() {
    function initializeAccordion($accordion, options) {
        var $accordion = YOI.createCollection("accordion", $accordion, options);
        if ($accordion) initializeAccordionTriggers();
        if ($accordion) $accordion.each(function() {
            var $thisAccordion = $(this);
            var $thisSections = $thisAccordion.find(".accordion__section");
            var eventType = YOI.environment("mobile") ? "tap" : "click";
            $thisSections.each(function() {
                var $thisSection = $(this);
                var $thisHeader = $thisSection.find(".accordion__header");
                var $thisBody = $thisSection.find(".accordion__body");
                if (!$thisSection.hasClass("is--open") && !$thisSection.hasClass("is--closed")) {
                    $thisSection.addClass("is--closed");
                    $thisSection.data().state = "closed";
                    $thisBody.slideUp(0);
                }
                if ($thisSection.hasClass("is--open")) {
                    $thisSection.data().state = "open";
                }
                $thisHeader.on(eventType, function(e) {
                    e.preventDefault();
                    toggleSection($thisSection);
                });
            });
        });
        if ($accordion) addKeyboardEvents($accordion);
    }
    function initializeAccordionTriggers() {
        $('[yoi-action="openAllAccordions"]').on("click", function(e) {
            e.preventDefault();
            openAllSections();
        });
        $('[yoi-action="closeAllAccordions"]').on("click", function(e) {
            e.preventDefault();
            closeAllSections();
        });
    }
    function toggleSection($section) {
        var $thisAccordion = $section.closest(".accordion");
        var $thisSection = $section;
        var options = $thisAccordion.data().options;
        var state = $thisSection.data().state;
        if (state === "closed" && options.linked) {
            closeAllSections($thisAccordion);
        }
        if (state === "closed") {
            openSection($thisSection);
        }
        if (state === "open" && !options.linked) {
            closeSection($thisSection);
        }
    }
    function openSection($section) {
        var $thisSection = $section;
        var $thisBody = $section.find(".accordion__body");
        $thisSection.removeClass("is--closed").addClass("is--open");
        $thisBody.stop().slideDown("fast").promise().then(function() {
            $thisSection.trigger("yoi-accordion:done");
        });
        $thisSection.trigger("yoi-accordion:open");
        $thisSection.data().state = "open";
    }
    function closeSection($section) {
        var $thisSection = $section;
        var $thisBody = $section.find(".accordion__body");
        $thisSection.removeClass("is--open").addClass("is--closed").promise().then(function() {
            $thisSection.trigger("yoi-accordion:done");
        });
        $thisBody.stop().slideUp("fast");
        $thisSection.trigger("yoi-accordion:close");
        $thisSection.data().state = "closed";
    }
    function closeAllSections($accordion) {
        var $targets;
        if ($accordion === undefined) {
            $targets = $("[yoi-accordion] .accordion__section");
        } else {
            $targets = $accordion.find(".accordion__section");
        }
        $targets.each(function() {
            closeSection($(this));
        });
    }
    function openAllSections($accordion) {
        var $targets;
        if ($accordion === undefined) {
            $targets = $("[yoi-accordion] .accordion__section");
        } else {
            $targets = $accordion.find(".accordion__section");
        }
        $targets.each(function() {
            openSection($(this));
        });
    }
    function addKeyboardEvents($accordion) {
        $accordion.find(".accordion__header").attr("tabindex", "0").on("mousedown", function() {
            $(this).removeClass("focus-inset");
            return false;
        }).on("focus", function() {
            $(this).addClass("focus-inset");
        }).on("blur", function() {
            $(this).removeClass("focus-inset");
        });
        $document.on("yoi-keypressed:space", function(e) {
            var $activeElement = $(document.activeElement);
            var $section = $activeElement.closest(".accordion__section");
            if ($activeElement.hasClass("accordion__header")) {
                toggleSection($section);
            }
        });
    }
    return {
        init: initializeAccordion,
        close: closeSection,
        open: openSection,
        closeAll: closeAllSections,
        openAll: openAllSections,
        toggle: toggleSection
    };
}();

YOI.element.Code = function() {
    function initialize() {
        var $window = $(window);
        var $codeWrapper = $('div[class*="highlighter"]');
        var tabPageIndex = 0;
        $.each($codeWrapper, function(index) {
            var $thisCodeWrapper = $(this);
            var $thisCode = $thisCodeWrapper.find("code");
            var exampleTag = "\x3c!-- example --\x3e";
            var exampleTagTabbed = "\x3c!-- example:tabs --\x3e";
            var thisExample = $thisCode.text().split(exampleTag).length > 1 ? $thisCode.text().split(exampleTag)[1] : false;
            var thisExampleTabbed = $thisCode.text().split(exampleTagTabbed).length > 1 ? $thisCode.text().split(exampleTagTabbed)[1] : false;
            if (thisExampleTabbed) {
                var firstIndex = ++tabPageIndex;
                var secondIndex = ++tabPageIndex;
            }
            if (thisExample) {
                var _ = "";
                $thisCode.find('.c:contains("' + exampleTag + '")').remove();
                _ = '<div class="documentation__example">';
                _ += '<div class="documentation__result">';
                _ += thisExample;
                _ += "</div>";
                _ += '<div class="documentation__code">';
                _ += $thisCodeWrapper.html();
                _ += "</div>";
                _ += "</div>";
            }
            if (thisExampleTabbed) {
                var _ = "";
                $thisCode.find('.c:contains("' + exampleTagTabbed + '")').remove();
                _ = '<div class="documentation__example tabs">';
                _ += '<div class="tabs__menu tabs__menu--loose" yoi-tabs>';
                _ += '<ul class="tabs__items">';
                _ += '<li class="tabs__item">';
                _ += '<a class="tabs__link" href="#exampleTab-' + firstIndex + '">Example</a>';
                _ += "</li>";
                _ += '<li class="tabs__item">';
                _ += '<a class="tabs__link" href="#exampleTab-' + secondIndex + '">Code</a>';
                _ += "</li>";
                _ += "</ul>";
                _ += "</div>";
                _ += '<div id="exampleTab-' + firstIndex + '" class="tabs__page">';
                _ += thisExampleTabbed;
                _ += "</div>";
                _ += '<div id="exampleTab-' + secondIndex + '" class="tabs__page">';
                _ += $thisCodeWrapper.html();
                _ += "</div>";
                _ += "</div>";
            }
            if (thisExample || thisExampleTabbed) {
                $thisCodeWrapper.replaceWith(_);
            }
        });
    }
    return {
        start: initialize
    };
}();

YOI.element.Countdown = function() {
    var language = YOI.locale();
    var localization = {
        en: {
            days: "Days",
            hours: "Hours",
            minutes: "Min",
            seconds: "Sec"
        },
        de: {
            days: "Tage",
            hours: "Std",
            minutes: "Min",
            seconds: "Sek"
        }
    };
    var $countdownCharacter = $('        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="countdown__character" x="0px" y="0px" width="24px" height="37px" viewBox="0 0 24 37" xml:space="preserve">            <polygon class="countdown__character__segment-br" points="19,31 19,22 22,20 22,34" />            <polygon class="countdown__character__segment-tr" points="19,15 19,6 22,3 22,17" />            <polygon class="countdown__character__segment-bl" points="5,22 5,31 2,34 2,20" />            <polygon class="countdown__character__segment-tl" points="5,6 5,15 2,17 2,3" />            <polygon class="countdown__character__segment-b" points="6,32 18,32 21,35 3,35" />            <polygon class="countdown__character__segment-m" points="19,20 5,20 3,18.5 5,17 19,17 21,18.5" />            <polygon class="countdown__character__segment-t" points="3,2 6,5 18,5 21,2" />            <path class="countdown__character__dots" d="M12,14c1.104,0,2-0.896,2-2s-0.896-2-2-2s-2,0.896-2,2S10.896,14,12,14z M12,23c-1.104,0-2,0.896-2,2s0.896,2,2,2 s2-0.896,2-2S13.104,23,12,23z" />        </svg>    ');
    var $countdownCharacterLabel = $('<span class="countdown__label"></span>');
    var $countdownClock = $('<div class="countdown__clock" aria-hidden="true"></div>');
    function initialize($countdown, options) {
        var $countdown = YOI.createCollection("countdown", $countdown, options);
        if ($countdown) $countdown.each(function(index) {
            var $thisCountdown = $(this);
            var options = $thisCountdown.data().options;
            var defaultTimezone = "GMT+0002";
            var defaultYear = new Date().getFullYear();
            var defaultMonth = 1;
            var defaultDay = 1;
            var defaultHour = 12;
            var defaultMinute = 0;
            var defaultSecond = 0;
            var timezone = options.timezone === undefined ? defaultTimezone : options.timezone;
            var year = options.year === undefined ? defaultYear : parseInt(options.year);
            var month = options.month === undefined || parseInt(options.month) > 12 || parseInt(options.month) < 1 ? defaultMonth : parseInt(options.month);
            var day = options.day === undefined || parseInt(options.day) > 31 || parseInt(options.day) < 1 ? defaultDay : parseInt(options.day);
            var hour = options.hour === undefined || parseInt(options.hour) > 12 || parseInt(options.hour) < 1 ? defaultHour : parseInt(options.hour);
            var minute = options.minute === undefined || parseInt(options.minute) > 60 || parseInt(options.minute) < 1 ? defaultMinute : parseInt(options.minute);
            var second = options.second === undefined || parseInt(options.second) > 60 || parseInt(options.second) < 1 ? defaultSecond : parseInt(options.second);
            $thisCountdown.data().props = {
                endTime: getDateString(month, day, year, hour, minute, second, timezone),
                index: index
            };
            render($thisCountdown);
            YOI.setInterval("countdownTimer-" + index, 1e3, function() {
                update($thisCountdown);
            });
        });
    }
    function render($thisCountdown) {
        var endTime = $thisCountdown.data().props.endTime;
        var timeRemaining = getTimeRemaining(endTime);
        var lcdCharacters = getLcdCharactersCSSClassNames(timeRemaining);
        var $hiddenLabel = $thisCountdown.find(".countdown__hiddenLabel");
        var $thisCountdownClock = $countdownClock.clone();
        for (var i = 0; i < Object.keys(lcdCharacters).length; i++) {
            var unit = Object.keys(lcdCharacters)[i];
            var $countdownChars = $("<div></div>").addClass("countdown__" + unit);
            var $countdownLabel = getCharacterLabel(unit);
            if (timeRemaining.total > 0) {
                $countdownChars.append($countdownCharacter.clone().addClass(lcdCharacters[unit][0]));
                $countdownChars.append($countdownCharacter.clone().addClass(lcdCharacters[unit][1]));
            } else {
                $countdownChars.append($countdownCharacter.clone().addClass("countdown--empty"));
                $countdownChars.append($countdownCharacter.clone().addClass("countdown--empty"));
            }
            $countdownChars.append($countdownLabel);
            $thisCountdownClock.append($countdownChars);
        }
        $thisCountdown.append($thisCountdownClock);
        if ($hiddenLabel.length === 0) {
            $thisCountdown.append($('<p class="countdown__hiddenLabel"></p>'));
        }
    }
    function update($thisCountdown) {
        var endTime = $thisCountdown.data().props.endTime;
        var index = $thisCountdown.data().props.index;
        var timeRemaining = getTimeRemaining(endTime);
        var language = YOI.locale();
        var $hiddenLabel = $thisCountdown.find(".countdown__hiddenLabel");
        if (timeRemaining.total <= 0) {
            YOI.clearInterval("countdownTimer-" + index);
            $thisCountdown.trigger("yoi-countdown:expire");
        }
        var lcdCharacters = getLcdCharactersCSSClassNames(timeRemaining);
        for (var i = 0; i < Object.keys(lcdCharacters).length; i++) {
            var unit = Object.keys(lcdCharacters)[i];
            var selector = ".countdown__" + unit + " .countdown__character";
            if (timeRemaining.total > 0) {
                $thisCountdown.find(selector).eq(0).attr("class", "countdown__character " + lcdCharacters[unit][0]);
                $thisCountdown.find(selector).eq(1).attr("class", "countdown__character " + lcdCharacters[unit][1]);
            } else {
                $thisCountdown.find(selector).eq(0).attr("class", "countdown__character countdown--empty");
                $thisCountdown.find(selector).eq(1).attr("class", "countdown__character countdown--empty");
            }
        }
        var labelTxt = {
            en: timeRemaining.days + " days, " + timeRemaining.hours + " hours, " + timeRemaining.minutes + " minutes and " + timeRemaining.seconds + " seconds left.",
            de: "Noch " + timeRemaining.days + " Tage, " + timeRemaining.hours + " Stunden, " + timeRemaining.minutes + " Minuten und " + timeRemaining.seconds + " Sekunden."
        };
        $hiddenLabel.text(labelTxt[language]);
    }
    function getTime() {
        var today = new Date();
        var currentTime = {};
        currentTime.hours = YOI.zeroPad(today.getHours()).toString();
        currentTime.minutes = YOI.zeroPad(today.getMinutes()).toString();
        currentTime.seconds = YOI.zeroPad(today.getSeconds()).toString();
        return currentTime;
    }
    function getDateString(month, day, year, hour, minute, second, timezone) {
        var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var endTimeIsoString = months[month - 1] + " " + day + " " + year + " " + hour + ":" + minute + ":" + second + " " + timezone;
        return endTimeIsoString;
    }
    function getTimeRemaining(endTime) {
        var total = Date.parse(endTime) - Date.parse(new Date());
        var seconds = YOI.zeroPad(Math.floor(total / 1e3 % 60)).toString();
        var minutes = YOI.zeroPad(Math.floor(total / 1e3 / 60 % 60)).toString();
        var hours = YOI.zeroPad(Math.floor(total / (1e3 * 60 * 60) % 24)).toString();
        var days = YOI.zeroPad(Math.floor(total / (1e3 * 60 * 60 * 24))).toString();
        return {
            total: total,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
    function getLcdCharactersCSSClassNames(timeRemaining) {
        return {
            days: [ "countdown--" + timeRemaining.days.charAt(0), "countdown--" + timeRemaining.days.charAt(1) ],
            hours: [ "countdown--" + timeRemaining.hours.charAt(0), "countdown--" + timeRemaining.hours.charAt(1) ],
            minutes: [ "countdown--" + timeRemaining.minutes.charAt(0), "countdown--" + timeRemaining.minutes.charAt(1) ],
            seconds: [ "countdown--" + timeRemaining.seconds.charAt(0), "countdown--" + timeRemaining.seconds.charAt(1) ]
        };
    }
    function getCharacterLabel(unit) {
        var $label = $countdownCharacterLabel.clone();
        $label.text(localization[language][unit]);
        return $label;
    }
    return {
        init: initialize
    };
}();

YOI.element.CustomFormElements = function() {
    var $checkBoxWrapper = $('<span class="checkbox"></span>').on("click", function() {
        $(this).find("input").trigger("change");
    });
    var $radioBtnWrapper = $('<span class="radio"></span>').on("click", function() {
        $(this).find("input").trigger("change");
    });
    var $selectWrapper = $('<span class="select"></span>');
    var $selectIcon = $('<span class="select__icon"></span>');
    function initialize(scope) {
        if (scope === undefined) {
            var scope = "";
        } else {
            scope += " ";
        }
        var checkElemns = $(scope + 'input[type="checkbox"]:not(.js-fallback, .switch *), input[type="radio"]:not(.js-fallback, .switch *, .pickBtn *)');
        var checkBoxes = $(scope + 'input[type="checkbox"]:not(.js-fallback, .switch *)');
        var radioBtns = $(scope + 'input[type="radio"]:not(.js-fallback, .switch *, .pickBtn *)');
        var selects = $(scope + "select:not(.js-fallback)");
        checkBoxes.each(function() {
            var $thisCheckbox = $(this);
            var isWrappedInLabel = $thisCheckbox.parents().index("label");
            if (isWrappedInLabel === -1) {
                $thisCheckbox.wrap($checkBoxWrapper.clone(true));
            } else {
                $thisCheckbox.wrap($checkBoxWrapper.clone());
            }
            $thisCheckbox.on({
                focus: function() {
                    $thisCheckbox.parent().addClass("is--focus");
                    $thisCheckbox.trigger("yoi-input:focus");
                },
                blur: function() {
                    $thisCheckbox.parent().removeClass("is--focus");
                    $thisCheckbox.trigger("yoi-input:blur");
                },
                change: function(e) {
                    $thisCheckbox.parent().toggleClass("is--checked");
                    $thisCheckbox.trigger("yoi-input:change");
                }
            });
        });
        radioBtns.each(function() {
            var $thisRadioBtn = $(this);
            var isWrappedInLabel = $thisRadioBtn.parents().index("label");
            if (isWrappedInLabel === -1) {
                $thisRadioBtn.wrap($radioBtnWrapper.clone(true));
            } else {
                $thisRadioBtn.wrap($radioBtnWrapper.clone());
            }
            $thisRadioBtn.on({
                focus: function() {
                    $thisRadioBtn.parent().addClass("is--focus");
                    $thisRadioBtn.trigger("yoi-input:focus");
                },
                blur: function() {
                    $thisRadioBtn.parent().removeClass("is--focus");
                    $thisRadioBtn.trigger("yoi-input:blur");
                },
                change: function(e) {
                    var groupName = $thisRadioBtn.attr("name");
                    var $groupedBtns = $('[name="' + groupName + '"]');
                    $groupedBtns.parent().removeClass("is--checked");
                    $thisRadioBtn.parent().addClass("is--checked");
                    $thisRadioBtn.trigger("yoi-input:change");
                }
            });
        });
        selects.each(function() {
            var $thisSelect = $(this);
            var $thisSelectWrapper = $selectWrapper.clone();
            var $thisSelectIcon = $selectIcon.clone();
            $thisSelectWrapper.addClass($thisSelect.attr("class"));
            $thisSelect.wrap($thisSelectWrapper);
            $thisSelect.parent().append($thisSelectIcon);
            $thisSelect.removeAttr("class");
            $thisSelect.on({
                focus: function() {
                    $(this).parent().addClass("is--focus");
                    $(this).trigger("yoi-input:focus");
                },
                blur: function() {
                    $(this).parent().removeClass("is--focus");
                    $(this).trigger("yoi-input:blur");
                },
                change: function() {
                    $(this).trigger("yoi-input:change");
                }
            });
        });
        checkElemns.each(function() {
            var thisWrapper = $(this).parent();
            thisWrapper.addClass($(this).attr("class"));
            $(this).removeAttr("class");
            if ($(this).is(":checked")) {
                thisWrapper.addClass("is--checked");
            }
        });
    }
    return {
        init: initialize
    };
}();

YOI.element.DatePicker = function() {
    var $document = $(document);
    var language = YOI.locale();
    var localization = {
        en: {
            weekDays: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
            monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
        },
        de: {
            weekDays: [ "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So" ],
            monthNames: [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ]
        }
    };
    var language = typeof YOI.locale() !== "object" || YOI.locale() === undefined || YOI.locale() === "" ? "en" : YOI.locale();
    var now = {};
    var $datePicker = $('        <div class="datePicker">            <span class="datePicker__btnPrev" yoi-action="prevMonth"></span>            <span class="datePicker__btnNext" yoi-action="nextMonth"></span>            <h3 class="datePicker__header"></h3>        </div>    ');
    var $weekDaysHeader = $("        <tr>            <th>" + localization[language]["weekDays"][0] + "</th>            <th>" + localization[language]["weekDays"][1] + "</th>            <th>" + localization[language]["weekDays"][2] + "</th>            <th>" + localization[language]["weekDays"][3] + "</th>            <th>" + localization[language]["weekDays"][4] + "</th>            <th>" + localization[language]["weekDays"][5] + "</th>            <th>" + localization[language]["weekDays"][6] + "</th>        </tr>    ");
    function initialize($datepicker, options) {
        getCurrentDate();
        var $datepicker = YOI.createCollection("datepicker", $datepicker, options);
        if ($datepicker) $datepicker.each(function(index) {
            var $thisDateInput = $(this);
            var options = $thisDateInput.data().options;
            var inputYear = options.year === undefined ? now.year : parseInt(options.year);
            var inputMonth = options.month === undefined ? now.month : parseInt(options.month - 1);
            var inputDay = options.day === undefined ? now.day : parseInt(options.day);
            updateDateInput($thisDateInput, inputYear, inputMonth, inputDay);
            var $thisDatePicker = renderDatePicker(inputYear, inputMonth, inputDay);
            var $thisMonthTable = $thisDatePicker.find(".datePicker__days");
            var thisMonthTableProps = $thisMonthTable.data().props;
            $thisDateInput.wrap('<div class="datePicker__wrapper"></div>');
            var $thisDateInputWrapper = $thisDateInput.closest(".datePicker__wrapper");
            $thisDateInput.after($thisDatePicker);
            $thisDatePicker.hide();
            $thisDateInputWrapper.on("click", function(e) {
                $thisDateInput.trigger("focus");
            });
            $thisDateInput.on("click", function(e) {
                e.stopPropagation();
            }).on("blur", function() {
                YOI.setDelay("datePickerHideTimeout-" + index, 500, function() {
                    var thisDateInputProps = $thisDateInput.data().props;
                    $thisDateInput.next(".datePicker").fadeOut("fast", function() {
                        $thisDatePicker.find(".datePicker__days").replaceWith(renderMonthTable($thisDatePicker, thisDateInputProps.selectedYear, thisDateInputProps.selectedMonth));
                        $thisDatePicker.find(".datePicker__header").text(localization[language]["monthNames"][thisDateInputProps.selectedMonth] + " " + thisDateInputProps.selectedYear);
                    });
                    $document.trigger("yoi-datepicker:hide");
                });
            }).on("focus", function(e) {
                YOI.clearDelay("datePickerHideTimeout-" + index);
                hideAllDatePickers();
                var $thisDatePicker = placeDatePicker($thisDateInput.next(".datePicker"));
                $thisDatePicker.show();
                $document.trigger("yoi-datepicker:show");
            });
        });
    }
    function updateDatePicker($thisDatePicker, selectedYear, selectedMonth, selectedDay) {
        var formattedSelectedDate = YOI.zeroPad(selectedDay, 1) + "." + YOI.zeroPad(selectedMonth, 1) + "." + selectedYear;
        $thisDatePicker.data().props = {
            selectedYear: selectedYear,
            selectedMonth: selectedMonth,
            selectedDay: selectedDay,
            formattedSelectedDate: formattedSelectedDate
        };
    }
    function updateMonthTable($thisMonthTable, year, month) {
        getCurrentDate();
        if (month === undefined || year === undefined) {
            var year = now.year;
            var month = now.month;
        }
        var monthName = localization[language]["monthNames"][month];
        var firstDayInstance = new Date(year, month, 1);
        var firstDay = firstDayInstance.getDay();
        firstDayInstance = null;
        var totalDays = getTotalDays(year, month);
        var selectedDay = $thisMonthTable.find(".datePicker--selectedDay").text();
        var formattedDate = YOI.zeroPad(selectedDay, 1) + "." + YOI.zeroPad(month + 1, 1) + "." + year;
        $thisMonthTable.data().props = {
            firstDay: firstDay,
            totalDays: totalDays,
            year: year,
            month: month,
            formattedDate: formattedDate
        };
    }
    function updateDateInput($thisDateInput, year, month, day) {
        var formattedDate;
        if (!day || !month || !year) {
            formattedDate = "";
        } else {
            if (language === "de") formattedDate = YOI.zeroPad(day, 1) + "." + YOI.zeroPad(month + 1, 1) + "." + year;
            if (language === "en") formattedDate = YOI.zeroPad(month + 1, 1) + "." + YOI.zeroPad(day, 1) + "." + year;
        }
        $thisDateInput.data().props = {
            selectedYear: year,
            selectedMonth: month,
            selectedDay: day,
            formattedDate: formattedDate
        };
        $thisDateInput.val(formattedDate);
    }
    function renderMonthTable($thisDatePicker, year, month) {
        var $monthTable = $('<table class="datePicker__days"><tbody></tbody></table>');
        var $monthTableBody = $monthTable.find("tbody").first();
        updateMonthTable($monthTable, year, month);
        var thisMonthTableProps = $monthTable.data().props;
        var thisDatePickerProps = $thisDatePicker.data().props;
        $monthTableBody.append($weekDaysHeader.clone());
        var indexCell = 1;
        var indexDay = 1;
        for (var i = 0; i < Math.ceil((thisMonthTableProps.totalDays + thisMonthTableProps.firstDay - 1) / 7); i++) {
            var $row = $("<tr>");
            for (var j = 0; j < 7; j++) {
                var $cell = $("<td></td>");
                if (indexCell < thisMonthTableProps.firstDay || indexDay > thisMonthTableProps.totalDays) {
                    $cell.addClass("datePicker--emptyDay");
                } else {
                    $cell.text(indexDay);
                    indexDay++;
                }
                if (thisMonthTableProps.month === thisDatePickerProps.selectedMonth && thisMonthTableProps.year === thisDatePickerProps.selectedYear && indexDay - 1 === thisDatePickerProps.selectedDay) {
                    $cell.addClass("datePicker--selectedDay");
                }
                if (thisMonthTableProps.month === now.month && thisMonthTableProps.year === now.year && indexDay - 1 === now.day) {
                    $cell.addClass("datePicker--today");
                }
                $row.append($cell);
                indexCell++;
            }
            $monthTableBody.append($row);
        }
        $monthTable.find("td:not(.datePicker--emptyDay)").on("mousedown", function() {
            var selectedDay = parseInt($(this).text());
            pickDate($monthTable, thisMonthTableProps.year, thisMonthTableProps.month, selectedDay);
        });
        return $monthTable;
    }
    function renderDatePicker(year, month, selectedDay) {
        var $thisDatePicker = $datePicker.clone();
        updateDatePicker($thisDatePicker, year, month, selectedDay);
        var $thisMonthTable = renderMonthTable($thisDatePicker, year, month);
        $thisDatePicker.append($thisMonthTable);
        var thisMonthTableProps = $thisMonthTable.data().props;
        if (month === undefined) month = now.month;
        if (year === undefined) year = now.year;
        $thisDatePicker.find(".datePicker__header").text(localization[language]["monthNames"][month] + " " + year);
        $thisDatePicker.find('[yoi-action*="Month"]').on("click", function(e) {
            e.preventDefault();
            var $thisMonthButton = $(this);
            var $thisDatepicker = $thisMonthButton.closest(".datePicker");
            var $thisMonthTable = $thisDatepicker.find(".datePicker__days");
            var thisMonthTableProps = $thisMonthTable.data().props;
            var month = thisMonthTableProps.month;
            var year = thisMonthTableProps.year;
            var thisAction = $thisMonthButton.attr("yoi-action");
            if (thisAction === "prevMonth") {
                if (month > 0) {
                    --month;
                } else {
                    month = 11;
                    --year;
                }
            }
            if (thisAction === "nextMonth") {
                if (month < 11) {
                    ++month;
                } else {
                    month = 0;
                    ++year;
                }
            }
            $thisDatePicker.find(".datePicker__days").replaceWith(renderMonthTable($thisDatePicker, year, month));
            $thisDatePicker.find(".datePicker__header").text(localization[language]["monthNames"][month] + " " + year);
            updateMonthTable($thisMonthTable, year, month);
        });
        $thisDatePicker.on("mousedown", function() {
            YOI.setDelay("datePickerFocusDelay", 50, function() {
                $thisDatePicker.prev("input[yoi-datepicker]").focus();
            });
        });
        return $thisDatePicker;
    }
    function pickDate($thisMonthTable, selectedYear, selectedMonth, selectedDay) {
        var $thisDatePicker = $thisMonthTable.closest(".datePicker");
        var $thisDateInput = $thisDatePicker.prev("input[yoi-datepicker]");
        var thisMonthTableProps = $thisMonthTable.data().props;
        $thisMonthTable.find("td").each(function() {
            var $thisCell = $(this);
            $thisCell.removeClass("datePicker--selectedDay");
            if (parseInt($thisCell.text()) === selectedDay) {
                $thisCell.addClass("datePicker--selectedDay");
            }
        });
        updateMonthTable($thisMonthTable, selectedYear, selectedMonth);
        updateDatePicker($thisDatePicker, selectedYear, selectedMonth, selectedDay);
        updateDateInput($thisDateInput, selectedYear, selectedMonth, selectedDay);
    }
    function hideAllDatePickers() {
        $(".datePicker__wrapper .datePicker").hide();
        $document.trigger("yoi-datepicker:hide");
    }
    function getCurrentDate() {
        var currentDate = new Date();
        now = {
            weekDay: currentDate.getDay(),
            day: currentDate.getDate(),
            month: currentDate.getMonth(),
            year: adjustYear(currentDate.getYear())
        };
    }
    function getTotalDays(year, month) {
        var daysInMonths = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
        if (year % 4 === 0) daysInMonths[1] = 29;
        return daysInMonths[month];
    }
    function adjustYear(year) {
        if (year < 1e3) {
            year += 1900;
        }
        return year;
    }
    function placeDatePicker($thisDatePicker) {
        var $dateInput = $thisDatePicker.prev("input[yoi-datepicker]");
        var dateInputOffsetY = $dateInput.offset().top;
        var dateInputHeight = $dateInput.outerHeight();
        var datePickerHeight = $thisDatePicker.outerHeight();
        var viewPortHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var place = viewPortHeight - (dateInputOffsetY + dateInputHeight - scrollTop) < datePickerHeight ? "above" : "below";
        if (place === "above") {
            $thisDatePicker.css("top", -1 * datePickerHeight - 10 + "px");
        } else if (place === "below") {
            $thisDatePicker.css("top", dateInputHeight + 10 + "px");
        }
        return $thisDatePicker;
    }
    return {
        init: initialize,
        hide: hideAllDatePickers
    };
}();

YOI.element.Dock = function() {
    function initialize($dock, options) {
        var $dock = YOI.createCollection("dock", $dock, options);
        if ($dock) $dock.each(function() {
            var $thisDock = $(this);
            var options = $thisDock.data().options;
            if (options.autohide) {
                hide($thisDock);
                $thisDock.on("mouseover", function() {
                    YOI.clearDelay("hideTimeout");
                    show($thisDock);
                }).on("mouseout", function() {
                    YOI.setDelay("hideTimeout", 750, function() {
                        hide($thisDock);
                    });
                });
            }
        });
    }
    function hide($thisDock) {
        $thisDock.addClass("is--hidden");
        $thisDock.trigger("yoi-dock:hide");
        $thisDock.data().state = "hidden";
    }
    function show($thisDock) {
        $thisDock.removeClass("is--hidden");
        $thisDock.trigger("yoi-dock:show");
        $thisDock.data().state = "visible";
    }
    return {
        init: initialize,
        hide: hide,
        show: show
    };
}();

YOI.element.FilterBtns = function() {
    function initialize($filterBtns, options) {
        var $filterBtns = YOI.createCollection("filterbtns", $filterBtns, options);
        if ($filterBtns) $filterBtns.each(function() {
            var $thisFilterBtns = $(this);
            if ($thisFilterBtns.hasClass("filterBtns--removeable")) {
                $thisFilterBtns.find(".filterBtns__btn").each(function() {
                    var $thisBtn = $(this);
                    $thisBtn.on("click", function(e) {
                        e.preventDefault();
                        remove($thisBtn);
                    });
                });
            } else {
                $thisFilterBtns.find(".filterBtns__btn").each(function() {
                    var $thisBtn = $(this);
                    if ($thisBtn.hasClass("is--active")) {
                        $thisBtn.data().state = "on";
                    } else {
                        $thisBtn.data().state = "off";
                    }
                    $thisBtn.on("click", function(e) {
                        e.preventDefault();
                        toggle($thisBtn);
                    });
                    $thisBtn.on("mouseout", function(e) {
                        e.preventDefault();
                        $thisBtn.removeClass("filterBtns__btn--debounce");
                    });
                });
            }
        });
    }
    function toggle($thisBtn) {
        var state = $thisBtn.data().state;
        if (state === "on") {
            $thisBtn.removeClass("is--active");
            $thisBtn.removeClass("filterBtns__btn--debounce");
            $thisBtn.trigger("yoi-filterbtn:on");
            $thisBtn.data().state = "off";
        }
        if (state === "off") {
            $thisBtn.addClass("is--active");
            $thisBtn.addClass("filterBtns__btn--debounce");
            $thisBtn.trigger("yoi-filterbtn:off");
            $thisBtn.data().state = "on";
        }
    }
    function remove($thisBtn) {
        $thisBtn.fadeOut("fast");
        $thisBtn.trigger("yoi-filterbtn:remove");
    }
    return {
        init: initialize
    };
}();

YOI.element.Filters = function() {
    var filterGroupMaxHeight = 210;
    var language = YOI.locale();
    var localization = {
        en: {
            btnLabelReset: "Reset All Filters"
        },
        de: {
            btnLabelReset: "Alle Filter zurücksetzen"
        }
    };
    var $resetBtn = $('        <a href="#" class="filters__resetBtn">' + localization[language]["btnLabelReset"] + "</a>    ");
    function initialize($filters, options) {
        var $filters = YOI.createCollection("filters", $filters, options);
        if ($filters) $filters.each(function() {
            var $thisFilters = $(this);
            var $thisFilterGroups = $thisFilters.find(".filterGroup");
            var $thisFilterGroupHeaders = $thisFilters.find(".filterGroup__header");
            var $thisFiltersMulti = $thisFilters.find(".filter--multi");
            var $thisFiltersSingle = $thisFilters.find(".filter--single");
            updateAllFilterGroups($thisFilters);
            $thisFilterGroups.each(function() {
                var $thisFilterGroup = $(this);
                var props = $thisFilterGroup.data().props;
                var aboveMaxHeight = $thisFilterGroup.height() > filterGroupMaxHeight;
                if (aboveMaxHeight) {
                    props.isScroll = true;
                    $thisFilterGroup.addClass("filterGroup--isScroll");
                } else {
                    props.isScroll = false;
                }
                if (props.isCollapsed) collapseFilterGroup($thisFilterGroup);
            });
            $thisFilterGroupHeaders.on("click", function() {
                var $thisFilterGroup = $(this).closest(".filterGroup");
                toggleFilterGroup($thisFilterGroup);
            });
            $thisFiltersMulti.on("click", function(e) {
                e.preventDefault();
                var $thisFilter = $(this);
                toggleFilter($thisFilter);
            });
            $thisFiltersSingle.on("click", function(e) {
                e.preventDefault();
                var $thisFilter = $(this);
                toggleFilter($thisFilter);
            });
            $thisFilters.on("yoi-filters:reset", function() {
                reset($thisFilters);
                removeResetBtn($thisFilters);
            });
            $thisFilters.on("yoi-filters:update", function() {
                addResetBtn($thisFilters);
            });
            $thisFilters.on("yoi-rangeinput:change", function() {
                addResetBtn($thisFilters);
            });
        });
    }
    function reset($filters) {
        var $thisFilters = $filters;
        var $thisFilterGroups = $thisFilters.find(".filterGroup");
        var $thisFiltersFilters = $thisFilters.find(".filter");
        $thisFiltersFilters.removeClass("is--active");
        $thisFilterGroups.each(function() {
            var $thisFilterGroup = $(this);
            var props = $thisFilterGroup.data().props;
            if (props.isCollapsed) collapseFilterGroup($thisFilterGroup);
        });
        $thisFilters.find(".rangeInput").trigger("yoi-rangeinput:reset");
        $thisFilters.trigger("yoi-filters:update");
    }
    function collapseFilterGroup($thisFilterGroup) {
        var $thisFilters = $thisFilterGroup.closest(".filters");
        var $thisFilterGroupBody = $thisFilterGroup.find(".filterGroup__body");
        if ($thisFilterGroup.hasClass("filterGroup--isScroll")) {
            $thisFilterGroupBody.animate({
                scrollTop: 0
            }, 100);
        }
        $thisFilterGroup.addClass("filterGroup--collapsed");
        $.when($thisFilterGroup.find(".filter:not(.is--active)").slideUp(200)).then(function() {
            updateAllFilterGroups($thisFilters);
        });
    }
    function expandFilterGroup($thisFilterGroup) {
        var $thisFilters = $thisFilterGroup.closest(".filters");
        $thisFilterGroup.removeClass("filterGroup--collapsed");
        $.when($thisFilterGroup.find(".filter:not(.is--active)").slideDown(200)).then(function() {
            updateAllFilterGroups($thisFilters);
        });
    }
    function toggleFilterGroup($thisFilterGroup) {
        var props = $thisFilterGroup.data().props;
        if (props.isCollapsed) {
            expandFilterGroup($thisFilterGroup);
        } else {
            collapseFilterGroup($thisFilterGroup);
        }
    }
    function toggleFilter($thisFilter) {
        var $thisFilterGroup = $thisFilter.closest(".filterGroup");
        var props = $thisFilterGroup.data().props;
        var $thisFilters = $thisFilter.closest(".filters");
        if ($thisFilter.hasClass("filter--multi")) {
            $thisFilter.toggleClass("is--active");
        } else if ($thisFilter.hasClass("filter--single")) {
            $thisFilterGroup.find(".filter--single").removeClass("is--active");
            $thisFilter.addClass("is--active");
        }
        $thisFilter.trigger("yoi-filters:change");
        YOI.setDelay("toggleFilterTimeout", 750, function() {
            if (props.isCollapsed && props.hasActiveFilters) collapseFilterGroup($thisFilterGroup);
            updateAllFilterGroups($thisFilters);
            $thisFilters.trigger("yoi-filters:update");
        });
    }
    function addResetBtn($thisFilters) {
        var hasResetBtn = $thisFilters.find(".filters__resetBtn").length > 0;
        if (!hasResetBtn) {
            $resetBtn.clone().prependTo($thisFilters).on("click", function(e) {
                e.preventDefault();
                $thisFilters.trigger("yoi-filters:reset");
            });
        }
    }
    function removeResetBtn($thisFilters) {
        $thisFilters.find(".filters__resetBtn").detach();
    }
    function updateAllFilterGroups($thisFilters) {
        var $thisFilterGroups = $thisFilters.find(".filterGroup");
        $thisFilterGroups.each(function() {
            var $thisFilterGroup = $(this);
            var props = YOI.updateProps($thisFilterGroup);
            props.isCollapsed = $thisFilterGroup.hasClass("filterGroup--collapsed");
            props.hasActiveFilters = $thisFilterGroup.find(".is--active").length > 0;
            props.hasShadow = props.isScroll && !props.isCollapsed || props.isCollapsed && $thisFilterGroup.height() > filterGroupMaxHeight;
            if (props.hasActiveFilters) {
                $thisFilterGroup.addClass("filterGroup--hasActiveFilters");
            } else {
                $thisFilterGroup.removeClass("filterGroup--hasActiveFilters");
            }
            if (props.hasShadow) {
                $thisFilterGroup.addClass("filterGroup--hasShadow");
            } else {
                $thisFilterGroup.removeClass("filterGroup--hasShadow");
            }
        });
    }
    return {
        init: initialize,
        toggle: toggleFilter,
        reset: reset
    };
}();

YOI.element.Flyout = function() {
    function initialize($flyout, options) {
        var $flyout = YOI.createCollection("flyout", $flyout, options);
        if ($flyout) $flyout.each(function() {
            var $thisFlyout = $(this).detach();
            var $flyoutHandle = $thisFlyout.find(".flyout__handle");
            if (!$thisFlyout.hasClass("flyout--left") && !$thisFlyout.hasClass("flyout--right")) {
                $thisFlyout.addClass("flyout--left");
            }
            hide($thisFlyout);
            $flyoutHandle.on("click", function() {
                toggle($thisFlyout);
            });
            $("body").append($thisFlyout);
        });
    }
    function toggle($thisFlyout) {
        if ($thisFlyout.data().state == "visible") {
            hide($thisFlyout);
        } else {
            show($thisFlyout);
        }
    }
    function show($thisFlyout) {
        $thisFlyout.removeClass("flyout--hidden").addClass("flyout--visible").trigger("yoi-flyout:visible");
        $thisFlyout.data().state = "visible";
    }
    function hide($thisFlyout) {
        $thisFlyout.removeClass("flyout--visible").addClass("flyout--hidden").trigger("yoi-flyout:hidden");
        $thisFlyout.data().state = "hidden";
    }
    return {
        init: initialize,
        toggle: toggle,
        show: show,
        hide: hide
    };
}();

YOI.element.ImgMagnifier = function() {
    var $window = $(window);
    var $cursor = $('<div class="imgMagnifier__cursor"></div>');
    var $viewer = $('<div class="imgMagnifier__viewer"></div>');
    var defaultStartViewerDelayTime = 600;
    function initialize($imgMagnifier, options) {
        var $imgMagnifier = YOI.createCollection("imgmagnifier", $imgMagnifier, options);
        if ($imgMagnifier) $imgMagnifier.each(function() {
            var $thisImgMagnifier = $(this);
            var $thisCursor = $cursor.clone().hide();
            var $thisViewer = $viewer.clone().hide();
            $thisImgMagnifier.append($thisCursor);
            $thisImgMagnifier.append($thisViewer);
            $thisImgMagnifier.find("a").on("click", function(e) {
                e.preventDefault();
            });
            $thisImgMagnifier.on("mouseenter", function() {
                startViewer($thisImgMagnifier);
            }).on("mouseleave", function() {
                stopViewer($thisImgMagnifier);
            }).on("mousemove", function(e) {
                moveMagnifier($thisImgMagnifier, e);
            });
            $window.on("load", function() {
                setViewer($thisImgMagnifier);
                setZoomImage($thisImgMagnifier);
            });
            $window.on("resize", function() {
                YOI.clearDelay("imgMagnifierResetDelay");
                YOI.setDelay("imgMagnifierResetDelay", 500, function() {
                    reset();
                });
            });
        });
    }
    function reset($imgMagnifier) {
        if (!($imgMagnifier instanceof jQuery)) {
            $imgMagnifier = $("[yoi-imgmagnifier]");
        }
        $imgMagnifier.each(function() {
            var $thisImgMagnifier = $(this);
            $thisImgMagnifier.data().props = {
                yPos: $thisImgMagnifier.offset().top,
                xPos: $thisImgMagnifier.offset().left
            };
        });
    }
    function destroy($imgMagnifier) {
        if (!($imgMagnifier instanceof jQuery)) {
            $imgMagnifier = $(".imgMagnifier");
        }
        $imgMagnifier.each(function() {
            var $thisImgMagnifier = $(this);
            $thisImgMagnifier.find(".imgMagnifier__cursor").remove();
            $thisImgMagnifier.find(".imgMagnifier__viewer").remove();
            $thisImgMagnifier.off();
            $thisImgMagnifier.find("*").off();
        });
        return false;
    }
    function setZoomImage($thisImgMagnifier) {
        var thisZoomImagePath = $thisImgMagnifier.find("a").attr("href");
        var $thisViewer = $thisImgMagnifier.find(".imgMagnifier__viewer");
        var $thisPreviewImage = $thisImgMagnifier.find(".imgMagnifier__previewImage");
        var thisZoomImage = new Image();
        thisZoomImage.src = thisZoomImagePath;
        thisZoomImage.className = "imgMagnifier__zoomImage";
        var $thisZoomImage = $(thisZoomImage);
        $thisZoomImage.on("error", function() {
            destroy($thisImgMagnifier);
        }).on("load", function() {
            $thisViewer.append($thisZoomImage);
            $thisImgMagnifier.data().props = {
                width: $thisImgMagnifier.width(),
                height: $thisImgMagnifier.height(),
                yPos: $thisImgMagnifier.offset().top,
                xPos: $thisImgMagnifier.offset().left,
                yRatio: $thisPreviewImage.height() / thisZoomImage.height,
                xRatio: $thisPreviewImage.width() / thisZoomImage.width
            };
            setCursor($thisImgMagnifier);
            if ($thisImgMagnifier.data().props.yRatio >= 1 || $thisImgMagnifier.data().props.yRatio >= 1) {
                destroy($thisImgMagnifier);
            }
        });
    }
    function setCursor($thisImgMagnifier) {
        var $thisCursor = $thisImgMagnifier.find(".imgMagnifier__cursor");
        var $thisViewer = $thisImgMagnifier.find(".imgMagnifier__viewer");
        var thisCursorWith = $thisImgMagnifier.width() * $thisImgMagnifier.data().props.xRatio;
        var thisCursorHeight = $thisImgMagnifier.height() * $thisImgMagnifier.data().props.yRatio;
        $thisCursor.css({
            width: thisCursorWith,
            height: thisCursorHeight
        });
        $thisCursor.data().props = {
            width: thisCursorWith,
            height: thisCursorHeight,
            yRatio: $thisViewer.height() / thisCursorHeight,
            xRatio: $thisViewer.width() / thisCursorWith
        };
    }
    function setViewer($thisImgMagnifier) {
        var $thisViewer = $thisImgMagnifier.find(".imgMagnifier__viewer");
        $thisViewer.css({
            width: $thisImgMagnifier.width(),
            height: $thisImgMagnifier.height(),
            left: $thisImgMagnifier.width(),
            marginLeft: 20
        });
    }
    function startViewer($thisImgMagnifier) {
        var $thisViewer = $thisImgMagnifier.find(".imgMagnifier__viewer");
        var $thisCursor = $thisImgMagnifier.find(".imgMagnifier__cursor");
        var options = $thisImgMagnifier.data().options;
        var delay = options.delay !== undefined ? parseInt(options.delay) : defaultStartViewerDelayTime;
        YOI.setDelay("imgMagnifierDelay", delay, function() {
            $thisViewer.fadeIn();
            $thisCursor.fadeIn();
            $thisViewer.trigger("yoi-imgmagnifier:start");
        });
    }
    function stopViewer($thisImgMagnifier) {
        YOI.clearDelay("imgMagnifierDelay");
        var $thisViewer = $thisImgMagnifier.find(".imgMagnifier__viewer");
        var $thisCursor = $thisImgMagnifier.find(".imgMagnifier__cursor");
        $thisViewer.fadeOut("fast");
        $thisCursor.fadeOut("fast");
        $thisViewer.trigger("yoi-imgmagnifier:stop");
    }
    function moveMagnifier($thisImgMagnifier, e) {
        var $thisCursor = $thisImgMagnifier.find(".imgMagnifier__cursor");
        var $thisZoomImage = $thisImgMagnifier.find(".imgMagnifier__zoomImage");
        var imgMagnifierProps = $thisImgMagnifier.data().props;
        var cursorProps = $thisCursor.data().props;
        var yPos = e.pageY - imgMagnifierProps.yPos - cursorProps.height / 2;
        var xPos = e.pageX - imgMagnifierProps.xPos - cursorProps.width / 2;
        var minY = yPos > 0 ? true : false;
        var maxY = yPos < imgMagnifierProps.height - cursorProps.height ? true : false;
        var minX = xPos > 0 ? true : false;
        var maxX = xPos < imgMagnifierProps.width - cursorProps.width ? true : false;
        if (minY && maxY) $thisCursor.css("top", yPos);
        if (minX && maxX) $thisCursor.css("left", xPos);
        if (minY && maxY) $thisZoomImage.css("top", yPos * cursorProps.yRatio * -1);
        if (minX && maxX) $thisZoomImage.css("left", xPos * cursorProps.xRatio * -1);
    }
    return {
        init: initialize,
        destroy: destroy
    };
}();

YOI.element.Log = function() {
    var $document = $(document);
    function write($log, logInput) {
        if ($log === undefined || $log.length < 1) return false;
        if ($log.data().memory === undefined) $log.data().memory = [];
        $log.data().memory.unshift(logInput);
        var $logBody = $log.find(".log__body").first();
        var logMemory = $log.data().memory;
        var logOutput = "";
        $.each(logMemory, function(index, key) {
            logOutput += '<p><span class="log__label">' + YOI.zeroPad(logMemory.length - index, 3) + "</span>" + logMemory[index] + "</p>";
            $logBody.html(logOutput);
        });
    }
    function clear($log) {
        if ($log === undefined || $log.length < 1) return false;
        $log.data().memory = [];
        $log.find(".log__body").first().html("<p></p>");
    }
    return {
        write: write,
        clear: clear
    };
}();

YOI.element.MaxChars = function() {
    var defaultMaxLength = 100;
    function initialize($inputElement, options) {
        var $inputElement = YOI.createCollection("maxchars", $inputElement, options);
        if ($inputElement) $inputElement.each(function() {
            var $thisInputElement = $(this);
            setMaxLength($thisInputElement);
            displayCharsLeft($thisInputElement);
            $thisInputElement.on("input", function() {
                observeInput($thisInputElement);
            });
        });
    }
    function setMaxLength($inputElement) {
        var $thisInputElement = $inputElement;
        var options = $thisInputElement.data().options;
        var maxLengthValue = parseInt($inputElement.attr("maxlength"));
        if (maxLengthValue !== undefined && maxLengthValue > 0) {
            $thisInputElement.data().options.maxLength = maxLengthValue;
        } else if (options.maxLength === undefined) {
            $thisInputElement.data().options.maxLength = defaultMaxLength;
        }
    }
    function inputUnderLimit($inputElement) {
        var maxLength = $inputElement.data().options.maxLength;
        var inputLength = $inputElement[0].value.length;
        if (inputLength >= maxLength) {
            return false;
        } else {
            return true;
        }
    }
    function observeInput($inputElement) {
        var $displayElement = $($inputElement.data().options.display);
        var errorClassProvided = $inputElement.data().options.errorClass !== false;
        if (!$displayElement.length) return false;
        if (inputUnderLimit($inputElement) && errorClassProvided) {
            removeErrorStyling($inputElement);
            $inputElement.data().state = "underlimit";
        } else if (errorClassProvided) {
            addErrorStyling($inputElement);
            $inputElement.data().state = "overlimit";
            $inputElement.trigger("yoi-maxchars:exceed");
        }
        displayCharsLeft($inputElement);
    }
    function displayCharsLeft($inputElement) {
        var $displayElement = $($inputElement.data().options.display);
        var charsLeft = $inputElement.data().options.maxLength - $inputElement[0].value.length;
        if (!$displayElement.length) return false;
        $displayElement.text(charsLeft);
    }
    function addErrorStyling($inputElement) {
        var errorClass = $inputElement.data().options.errorClass;
        var $displayElement = $($inputElement.data().options.display);
        if ($displayElement) $displayElement.addClass(errorClass);
    }
    function removeErrorStyling($inputElement) {
        var errorClass = $inputElement.data().options.errorClassNames;
        var $displayElement = $($inputElement.data().options.displaySelector);
        if (!$displayElement.length) return false;
        $displayElement.removeClass(errorClass);
    }
    return {
        init: initialize,
        display: displayCharsLeft,
        addError: addErrorStyling,
        removeError: removeErrorStyling
    };
}();

YOI.element.Modal = function() {
    var $body = $(document.body);
    var $document = $(document);
    var modalActive = false;
    var loadedModals = [];
    var scrollTop = false;
    var modalIdIndex = 0;
    var language = YOI.locale();
    var localization = {
        en: {
            btnLabelClose: "Close"
        },
        de: {
            btnLabelClose: "Schließen"
        }
    };
    var $modalCover = $('        <div class="modal__cover" id="modalCover" yoi-action="closeModal"></div>    ');
    var $modalContainer = $('        <div class="modal__container" id="modalContainer"></div>    ');
    var $modalCloseBtn = $('        <button class="btnDismiss" yoi-action="closeModal">            <span class="hidden">' + localization[language]["btnLabelClose"] + "</span>        </button>    ");
    var $modalTemplate = $('        <div class="modal">            <div class="modal__header">                <h3 class="modal__title"></h3>                <button class="btnDismiss" yoi-action="closeModal">                    <span class="hidden">' + localization[language]["btnLabelClose"] + '</span>                </button>            </div>            <div class="modal__body"></div>        </div>    ');
    function initialize($modalTrigger, options) {
        var $modalTrigger = YOI.createCollection("modal", $modalTrigger, options);
        if ($modalTrigger) prepareDom();
        if ($modalTrigger) $modalTrigger.each(function() {
            var $thisModalTrigger = $(this);
            var options = $thisModalTrigger.data().options;
            var thisModalGenerate = options.generate !== undefined ? options.generate : false;
            var thisModalTitle = options.title !== undefined ? options.title : false;
            var thisModalBody = options.body !== undefined ? options.body : false;
            var thisModalId = options.id !== undefined ? options.id : generateId();
            var thisModalModifiers = options.modifiers !== undefined ? options.modifiers : false;
            var thisModalPath = options.path !== undefined ? options.path : $thisModalTrigger.attr("href");
            var thisModalCache = options.cache !== undefined ? options.cache : false;
            if (thisModalCache) load(thisModalId, thisModalPath);
            $thisModalTrigger.on("click", function(e) {
                e.preventDefault();
                if (thisModalGenerate === "true") {
                    generate(thisModalTitle, thisModalBody, thisModalId, thisModalModifiers);
                } else {
                    show(thisModalId, thisModalPath);
                }
            });
        });
        initializeCloseTriggers();
    }
    function prepareDom() {
        $body.append($modalCover.clone().hide());
        $body.append($modalContainer.clone().hide());
    }
    function foundModal(modalId) {
        return loadedModals.indexOf(modalId) === -1 ? false : true;
    }
    function initializeCloseTriggers(modalId) {
        var triggers;
        if (modalId !== undefined) {
            triggers = $(modalId).find('[yoi-action="closeModal"]');
        } else {
            triggers = $('[yoi-action="closeModal"]');
        }
        triggers.on("click", function() {
            closeAll();
        });
    }
    function generate(title, body, modalId, modifiers) {
        var $thisModal = $modalTemplate.clone();
        var $thisModalTitle = $thisModal.find(".modal__title");
        var $thisModalBody = $thisModal.find(".modal__body");
        var thisModalId = modalId.split("#")[1];
        $thisModalTitle.text(title);
        $thisModalBody.html("<p>" + body + "</p>");
        $thisModal.attr("id", thisModalId);
        if (modifiers) {
            $thisModal.addClass(modifiers);
        }
        if (!foundModal(modalId)) {
            $("#modalContainer").append($thisModal);
            loadedModals.push(modalId);
        }
        initializeCloseTriggers(modalId);
        show(modalId);
    }
    function load(modalId, modalPath, callback) {
        if (!foundModal(modalId)) {
            var $loadBin = $("<div>");
            $loadBin.load(modalPath, function(response, status, xhr) {
                if (status === "success") {
                    var thisModal = $(this).find(".modal").first();
                    if (thisModal.length) {
                        loadedModals.push(modalId);
                        thisModal.attr("id", modalId.split("#")[1]);
                        thisModal.find(".modal__header").append($modalCloseBtn.clone());
                        $("#modalContainer").append(thisModal);
                        $(modalId).hide();
                        initializeCloseTriggers(modalId);
                        if (YOI.foundElement("CustomFormElements")) YOI.element.CustomFormElements.init(modalId);
                        if (typeof callback === "function") {
                            callback();
                        }
                        $document.trigger("yoi-modal:load");
                    } else {
                        openFallbackLink(modalPath);
                    }
                }
                if (status === "error") {
                    $window.trigger("yoi-modal:error");
                }
            });
        }
    }
    function show(modalId, modalPath) {
        if (foundModal(modalId)) {
            $("#modalCover").fadeIn("fast");
            $("#modalContainer").show();
            $(modalId).show();
            modalActive = true;
            center(modalId);
            if (YOI.environment("mobile")) {
                scrollTop = $("body").scrollTop();
                $("body").scrollTop(0);
            }
            $document.trigger("yoi-modal:show");
        } else {
            load(modalId, modalPath, function() {
                show(modalId, modalPath);
            });
        }
    }
    function center(modalId) {
        var $modal = $(modalId);
        var offSetY = $modal.height() / 2 * -1 - 10;
        var modalFitsIntoViewport = $(window).height() - 50 < $modal.height();
        if (modalFitsIntoViewport) {
            $modal.css({
                top: "1rem",
                marginTop: "0",
                position: "absolute"
            });
            $("html,body").animate({
                scrollTop: 0
            }, 500);
        } else {
            $modal.css({
                top: "50%",
                marginTop: offSetY,
                position: "fixed"
            });
        }
    }
    function closeAll() {
        $("#modalCover").fadeOut("fast");
        $("#modalContainer, #modalContainer .modal").hide();
        if (scrollTop > 0) {
            $("body").scrollTop(scrollTop);
        }
        modalActive = false;
        if (YOI.foundModule("BrowserHistory")) {
            YOI.module.BrowserHistory.clearHash();
        }
        $document.trigger("yoi-modal:hide");
    }
    function detachAll() {
        $("#modalContainer .modal, #modalCover").fadeOut("fast", function() {
            $("#modalContainer").empty().hide();
            $("body").css("overflow", "auto");
            modalActive = false;
        });
    }
    function generateId() {
        return "#modal-" + modalIdIndex++;
    }
    function openFallbackLink(modalPath) {
        window.location = window.location.protocol + "//" + window.location.host + "/" + modalPath;
    }
    return {
        init: initialize,
        show: show,
        close: closeAll
    };
}();

YOI.element.PageRewind = function() {
    var $pageRewind;
    var $document = $(document);
    var $window = $(window);
    var $body = $("body");
    var threshold = 500;
    var language = YOI.locale();
    var localization = {
        en: {
            labelTxt: "scroll back to top"
        },
        de: {
            labelTxt: "Zurück zum Seitenanfang"
        }
    };
    function initialize() {
        $pageRewind = $('<a class="pageRewind" href="#">                <span class="hidden">' + localization[language]["labelTxt"] + "</span>            </a>");
        $pageRewind.addClass("is--hidden").on("click", function(e) {
            e.preventDefault();
            run();
        }).appendTo($body);
        $window.scroll(function() {
            toggle();
        });
    }
    function run() {
        $document.trigger("yoi-pagerewind:start");
        $("html,body").animate({
            scrollTop: 0
        }, 500).promise().then(function() {
            $document.trigger("yoi-pagerewind:end");
        });
    }
    function toggle() {
        if ($body.scrollTop() >= threshold) {
            $pageRewind.removeClass("is--hidden");
        } else {
            $pageRewind.addClass("is--hidden");
        }
    }
    return {
        init: initialize,
        run: run
    };
}();

YOI.element.PickBtn = function() {
    var $icon = $('<span class="pickBtn__icon"></span>');
    function initialize($pickBtn) {
        var $pickBtn = YOI.createCollection("pickBtn", $pickBtn);
        if ($pickBtn) $pickBtn.each(function() {
            var $thisPickBtn = $(this);
            $thisPickBtn.find('input[type="radio"]').hide();
            $thisPickBtn.prepend($icon.clone());
            $thisPickBtn.find("label").on("click", function(e) {
                e.preventDefault();
            });
            $thisPickBtn.on("click", function(e) {
                e.preventDefault();
                activate($thisPickBtn);
                $thisPickBtn.trigger("yoi-pickbtn:change");
            });
        });
    }
    function activate($thisPickBtn) {
        var $icon = $thisPickBtn.find(".pickBtn__icon");
        var $radioInput = $thisPickBtn.find('input[type="radio"]');
        var groupName = $radioInput.attr("name");
        $('input[name="' + groupName + '"]').closest(".pickBtn").removeClass("is--active");
        $('input[name="' + groupName + '"]').removeAttr("checked");
        $('input[name="' + groupName + '"]').prop("checked", false);
        $radioInput.prop("checked", true);
        $radioInput.attr("checked", "checked");
        $thisPickBtn.addClass("is--active");
        YOI.blink($icon);
    }
    return {
        init: initialize
    };
}();

YOI.element.PieChart = function() {
    var $colorDot = $('<span class="pieChart__dot"></span>');
    var fixedPalette = [ "#f69d29", "#ec4534", "#66579f", "#2988cb", "#7f9b3d", "#fff398", "#dc48c2", "#0d5964" ];
    function initialize($pieChart, options) {
        var $pieChart = YOI.createCollection("piechart", $pieChart, options);
        if ($pieChart) $pieChart.each(function() {
            var $thisPieChart = $(this);
            var $thisPieChartRecords = $thisPieChart.find(".pieChart__record");
            var $thisPieChartSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            var options = $thisPieChart.data().options;
            var size = options.size !== undefined ? options.size : 200;
            var highlight = options.highlight !== undefined ? options.highlight == true : true;
            var palette = options.palette !== undefined ? options.palette : "shades";
            $thisPieChart.data().props = {
                rotation: 0,
                index: 0,
                records: $thisPieChartRecords.length,
                size: size
            };
            var size = $thisPieChart.data().props.size;
            $thisPieChartSvg.setAttribute("viewBox", "0 0 " + size + " " + size);
            $($thisPieChartSvg).css({
                width: size,
                height: size
            });
            $thisPieChart.prepend($thisPieChartSvg);
            $thisPieChartRecords.each(function(index) {
                var $thisRecord = $(this);
                var thisValue = $thisRecord.find(".pieChart__value").text();
                addChartData($thisPieChart, thisValue);
                $thisRecord.prepend($colorDot.clone());
                if (highlight) {
                    $thisRecord.on("mouseover", function() {
                        YOI.clearDelay("pieChartHightlightDelay");
                        highlightRecord($thisRecord);
                    }).on("mouseleave", function() {
                        YOI.setDelay("pieChartHightlightDelay", 500, function() {
                            resetHighlightRecord($thisPieChart);
                        });
                    }).on("click", function() {
                        blinkRecord($thisRecord);
                    });
                }
            });
            if (palette === "fixed") setFixedSliceColors($thisPieChart);
            if (palette === "random") setRandomSliceColors($thisPieChart);
            if (palette === "shades") setSliceShades($thisPieChart);
            if (palette === "unique") setUniqueSliceColors($thisPieChart);
        });
    }
    function setUniqueSliceColors($thisPieChart) {
        var $thisPaths = $thisPieChart.find("path");
        var $thisCircles = $thisPieChart.find("circle");
        var $thisDots = $thisPieChart.find(".pieChart__dot");
        var options = $thisPieChart.data().options;
        var props = $thisPieChart.data().props;
        var totalSlices = props.records;
        var baseColor = typeof options.baseColor === "array" ? JSON.parse(options.baseColor) : [ 252, 45, 65 ];
        var startRadius = baseColor[0];
        var startSaturation = baseColor[1] + "%";
        var startLuminance = baseColor[2] + "%";
        for (var i = 0; i < totalSlices; i++) {
            var splitRadius = 360 / totalSlices * i;
            var radius = splitRadius + startRadius > 360 ? splitRadius + startRadius - 360 : splitRadius + startRadius;
            if ($thisPaths[i] !== undefined) $thisPaths[i].setAttribute("fill", "hsl(" + radius + "," + startSaturation + "," + startLuminance + ")");
            if ($thisCircles[i] !== undefined) $thisCircles[i].setAttribute("fill", "hsl(" + radius + "," + startSaturation + "," + startLuminance + ")");
            $thisDots.eq(i).css("background", "hsl(" + radius + "," + startSaturation + "," + startLuminance + ")");
        }
    }
    function setRandomSliceColors($thisPieChart) {
        var $thisPaths = $thisPieChart.find("path");
        var $thisCircles = $thisPieChart.find("circle");
        var $thisDots = $thisPieChart.find(".pieChart__dot");
        var totalSlices = $thisPieChart.data().props.records;
        for (var i = 0; i < totalSlices; i++) {
            var randomColor = "#" + ("00000" + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
            if ($thisPaths[i] !== undefined) $thisPaths[i].setAttribute("fill", randomColor);
            if ($thisCircles[i] !== undefined) $thisCircles[i].setAttribute("fill", randomColor);
            $thisDots.eq(i).css("background", randomColor);
        }
    }
    function setFixedSliceColors($thisPieChart) {
        var $thisPaths = $thisPieChart.find("path");
        var $thisCircles = $thisPieChart.find("circle");
        var $thisDots = $thisPieChart.find(".pieChart__dot");
        var totalSlices = $thisPieChart.data().props.records;
        for (var i = 0; i < totalSlices; i++) {
            var j = i;
            if (j > fixedPalette.length - 1) j = 1;
            if ($thisPaths[i] !== undefined) $thisPaths[i].setAttribute("fill", fixedPalette[j]);
            if ($thisCircles[i] !== undefined) $thisCircles[i].setAttribute("fill", fixedPalette[j]);
            $thisDots.eq(i).css("background", fixedPalette[j]);
        }
    }
    function setSliceShades($thisPieChart) {
        var $thisPaths = $thisPieChart.find("path");
        var $thisCircles = $thisPieChart.find("circle");
        var $thisDots = $thisPieChart.find(".pieChart__dot");
        var options = $thisPieChart.data().options;
        var totalSlices = $thisPieChart.data().props.records;
        var baseColor = typeof options.baseColor === "object" ? JSON.parse(options.baseColor) : [ 252, 45, 65 ];
        var startRadius = baseColor[0];
        var startSaturation = baseColor[1] + "%";
        var startLuminance = baseColor[2] + "%";
        var splitLuminance = (100 - parseInt(startLuminance)) / totalSlices;
        for (var i = 0; i < totalSlices; i++) {
            var luminance = parseInt(startLuminance) - splitLuminance * i;
            if ($thisPaths[i] !== undefined) $thisPaths[i].setAttribute("fill", "hsl(" + startRadius + "," + startSaturation + "," + luminance + "%)");
            if ($thisCircles[i] !== undefined) $thisCircles[i].setAttribute("fill", "hsl(" + startRadius + "," + startSaturation + "," + luminance + "%)");
            $thisDots.eq(i).css("background", "hsl(" + startRadius + "," + startSaturation + "," + luminance + "%)");
        }
    }
    function addChartData($thisPieChart, thisValue) {
        var size = parseInt($thisPieChart.data().props.size);
        var radius = size / 2;
        var rotation = $thisPieChart.data().props.rotation;
        var $thisPieChartSvg = $thisPieChart.find("svg");
        var $thisPieSlice;
        thisValue = parseInt(thisValue);
        thisValue = Math.min(Math.max(thisValue, 0), 100);
        if (thisValue >= 100) {
            $thisPieSlice = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            $thisPieSlice.setAttribute("r", radius);
            $thisPieSlice.setAttribute("cx", radius);
            $thisPieSlice.setAttribute("cy", radius);
        } else {
            $thisPieSlice = document.createElementNS("http://www.w3.org/2000/svg", "path");
            var x = Math.cos(2 * Math.PI / (100 / thisValue));
            var y = Math.sin(2 * Math.PI / (100 / thisValue));
            var longArc = thisValue <= 50 ? 0 : 1;
            var d = "M" + radius + "," + radius + " L" + radius + "," + 0 + ", A" + radius + "," + radius + " 0 " + longArc + ",1 " + (radius + y * radius) + "," + (radius - x * radius) + " z";
            $thisPieSlice.setAttribute("d", d);
            $thisPieSlice.setAttribute("transform", "rotate(" + 360 / (100 / rotation) + " " + radius + " " + radius + ")");
            $thisPieChart.data().props.rotation += thisValue;
            $thisPieChart.data().props.index += 1;
        }
        $thisPieChartSvg.append($thisPieSlice);
    }
    function highlightRecord($thisRecord) {
        var thisIndex = $thisRecord.index();
        var $slices = $thisRecord.closest(".pieChart").find("svg path");
        $thisRecord.siblings().fadeTo(0, .4);
        $thisRecord.fadeTo(0, 1);
        $slices.fadeTo(0, .15);
        $slices.eq(thisIndex).fadeTo(0, 1);
    }
    function blinkRecord($thisRecord) {
        var thisIndex = $thisRecord.index();
        var $slices = $thisRecord.closest(".pieChart").find("svg path");
        YOI.blink($slices.eq(thisIndex));
    }
    function resetHighlightRecord($thisPieChart) {
        var $slices = $thisPieChart.find("svg path");
        var $thisRecords = $thisPieChart.find(".pieChart__record");
        $slices.fadeTo(300, 1);
        $thisRecords.fadeTo(300, 1);
    }
    return {
        init: initialize,
        highlightRecord: highlightRecord,
        blinkRecord: blinkRecord,
        resetHighlightRecord: resetHighlightRecord
    };
}();

YOI.element.PopOver = function() {
    $document = $(document);
    function initialize($popOverTrigger, options) {
        var $popOverTrigger = YOI.createCollection("popover", $popOverTrigger, options);
        if ($popOverTrigger) $popOverTrigger.each(function() {
            var $thisPopOverTrigger = $(this);
            var options = $thisPopOverTrigger.data().options;
            if (options.target === undefined || $(options.target).length < 1) return false;
            var $thisPopOver = $(options.target).detach();
            $("body").append($thisPopOver);
            var validEvents = [ "click", "dblclick", "contextmenu", "mouseover", "mouseout", "mousedown", "mouseup", "mouseenter", "mouseleave" ];
            var preventDefault = options.preventDefault !== undefined ? options.preventDefault : true;
            var eventShow = $.inArray(options.eventShow, validEvents) > -1 ? options.eventShow : "mouseenter";
            var eventHide = $.inArray(options.eventHide, validEvents) > -1 ? options.eventShow : "mouseleave";
            $thisPopOverTrigger.on(eventShow, function(e) {
                if (preventDefault !== "false") e.preventDefault();
                hideAll();
                removeToggleClass();
                show($thisPopOverTrigger, $thisPopOver);
            }).on(eventHide, function(e) {
                if (preventDefault !== "false") e.preventDefault();
                YOI.clearInterval("popOverShowTimeout");
                hide($thisPopOverTrigger, $thisPopOver);
            });
            $thisPopOver.on("mouseenter", function() {
                YOI.clearInterval("popOverHideTimeout");
            }).on("mouseleave", function() {
                hide($thisPopOverTrigger, $thisPopOver);
            });
        });
        $(".popOver").each(function() {
            var $thisPopOver = $(this);
            $thisPopOver.data({
                width: $thisPopOver.outerWidth(),
                height: $thisPopOver.outerHeight()
            }).hide();
        });
    }
    function show($thisPopOverTrigger, $thisPopOver) {
        YOI.setDelay("popOverShowTimeout", 100, function() {
            var options = $thisPopOverTrigger.data().options;
            if (options.toggleClass !== undefined) {
                $thisPopOverTrigger.addClass(options.toggleClass);
            }
            setPosition($thisPopOverTrigger, $thisPopOver);
            $thisPopOver.fadeIn(100);
            $thisPopOverTrigger.trigger("yoi-popover:show");
        });
    }
    function hide($thisPopOverTrigger, $thisPopOver) {
        YOI.setDelay("popOverHideTimeout", 500, function() {
            $thisPopOver.hide();
            removeToggleClass();
            $thisPopOverTrigger.trigger("yoi-popover:hide");
        });
    }
    function hideAll() {
        $("[yoi-popover]").each(function() {
            var $thisPopOverTrigger = $(this);
            var options = $thisPopOverTrigger.data().options;
            if (options.toggleClass !== undefined) {
                var cssClassName = options.toggleClass;
                $thisPopOverTrigger.removeClass(cssClassName);
            }
        });
        YOI.clearInterval("popOverHideTimeout");
        $(".popOver").hide();
    }
    function setPosition($thisPopOverTrigger, $thisPopOver) {
        var options = $thisPopOverTrigger.data().options;
        var pos = options.pos !== undefined ? options.pos : "tr";
        var ref = options.ref !== undefined ? options.ref : "tl";
        switch (pos) {
          case "tl":
            $thisPopOver.css({
                left: $thisPopOverTrigger.offset().left + "px",
                top: $thisPopOverTrigger.offset().top + "px"
            });
            break;

          case "tr":
            $thisPopOver.css({
                left: $thisPopOverTrigger.offset().left + $thisPopOverTrigger.outerWidth() + "px",
                top: $thisPopOverTrigger.offset().top + "px"
            });
            break;

          case "br":
            $thisPopOver.css({
                left: $thisPopOverTrigger.offset().left + $thisPopOverTrigger.outerWidth() + "px",
                top: $thisPopOverTrigger.offset().top + $thisPopOverTrigger.outerHeight() + "px"
            });
            break;

          case "bl":
            $thisPopOver.css({
                left: $thisPopOverTrigger.offset().left + "px",
                top: $thisPopOverTrigger.offset().top + $thisPopOverTrigger.outerHeight() + "px"
            });
            break;
        }
        switch (ref) {
          case "tl":
            $thisPopOver.css({
                marginLeft: 0,
                marginTop: 0
            });
            break;

          case "tr":
            $thisPopOver.css({
                marginLeft: $thisPopOver.data().width * -1 + "px",
                marginTop: 0
            });
            break;

          case "br":
            $thisPopOver.css({
                marginLeft: $thisPopOver.data().width * -1 + "px",
                marginTop: $thisPopOver.data().height * -1 + "px"
            });
            break;

          case "bl":
            $thisPopOver.css({
                marginLeft: 0,
                marginTop: $thisPopOver.data().height * -1 + "px"
            });
            break;
        }
    }
    function removeToggleClass($popOverTrigger) {
        if (!($popOverTrigger instanceof jQuery)) {
            $popOverTrigger = $("[yoi-popover]");
        }
        $popOverTrigger.each(function() {
            var $thisPopOverTrigger = $(this);
            var options = $thisPopOverTrigger.data().options;
            if (options.toggleClass !== undefined) {
                $thisPopOverTrigger.removeClass(options.toggleClass);
            }
        });
    }
    return {
        init: initialize,
        hideAll: hideAll
    };
}();

YOI.element.RangeInput = function() {
    var knobOffset;
    var $document = $(document);
    var $body = $("body");
    var rangeInputKnob = $('        <div class="rangeInput__knob"></div>    ');
    var rangeInputLabel = $('        <span class="rangeInput__label">0</span>    ');
    var rangeInputTrack = $('        <div class="rangeInput__track">            <div class="rangeInput__range"></div>        </div>    ');
    function initialize($rangeInput, options) {
        var $rangeInput = YOI.createCollection("rangeinput", $rangeInput, options);
        if ($rangeInput) $rangeInput.each(function() {
            var $thisRangeInput = $(this);
            var options = $thisRangeInput.data().options;
            rangeInputKnob.on("mousedown", function(e) {
                var $thisKnob = $(this);
                storeCursorPos($thisRangeInput, $thisKnob, e.pageX);
                $document.on("mousemove", function(e) {
                    $body.addClass("noSelect");
                    $thisKnob.addClass("rangeInput__knob--active");
                    $thisRangeInput.addClass("rangeInput--active");
                    moveKnob($thisRangeInput, $thisKnob, e);
                }).on("mouseup", function(e) {
                    $body.removeClass("noSelect");
                    $thisKnob.removeClass("rangeInput__knob--active");
                    $thisRangeInput.removeClass("rangeInput--active");
                    $document.off("mousemove mouseup");
                });
            }).on("mouseover", function() {
                var $thisKnob = $(this);
                $thisKnob.siblings(".rangeInput__knob").removeClass("rangeInput__knob--topMost");
                $thisKnob.addClass("rangeInput__knob--topMost");
            });
            var $thisMinKnob = rangeInputKnob.clone("true").addClass("rangeInput__knob--min").append(rangeInputLabel.clone());
            var $thisMaxKnob = rangeInputKnob.clone("true").addClass("rangeInput__knob--max").append(rangeInputLabel.clone());
            var $singleLabel = rangeInputLabel.clone().addClass("rangeInput__label--single");
            var $thisTrack = rangeInputTrack.clone();
            $thisRangeInput.append($thisMinKnob, $thisMaxKnob, $singleLabel, $thisTrack);
            $thisRangeInput.data().props = {
                absMin: options.absMin !== undefined ? options.absMin : 0,
                absMax: options.absMax !== undefined ? options.absMax : 100,
                min: options.min !== undefined ? options.min : 0,
                max: options.max !== undefined ? options.max : 100,
                minValue: null,
                maxValue: null,
                unit: options.unit !== undefined ? options.unit : "",
                offsetX: Math.floor($thisTrack.offset().left),
                minPosX: null,
                maxPosX: null,
                cursorPosX: 0,
                width: $thisTrack.width()
            };
            knobOffset = $thisRangeInput.find(".rangeInput__knob").first().outerWidth() / 2;
            $thisRangeInput.find(".rangeInput__knob").each(function() {
                var $thisKnob = $(this);
                moveKnob($thisRangeInput, $thisKnob);
            });
            $thisRangeInput.on("yoi-rangeinput:reset", function() {
                reset($thisRangeInput);
            });
        });
    }
    function set($rangeInput, absMin, absMax, min, max) {
        var $thisRangeInput = $rangeInput;
        var $thisMinKnob = $thisRangeInput.find(".rangeInput__knob--min");
        var $thisMaxKnob = $thisRangeInput.find(".rangeInput__knob--max");
        $thisRangeInput.data().props = {
            absMin: absMin,
            absMax: absMax,
            min: min,
            max: max
        };
        moveKnob($thisRangeInput, $thisMinKnob);
        moveKnob($thisRangeInput, $thisMaxKnob);
    }
    function reset($rangeInput) {
        var $thisRangeInput = $rangeInput;
        var props = $thisRangeInput.data().props;
        var $thisMinKnob = $thisRangeInput.find(".rangeInput__knob--min");
        var $thisMaxKnob = $thisRangeInput.find(".rangeInput__knob--max");
        var thisAbsMin = props.absMin;
        var thisAbsMax = props.absMax;
        props.min = thisAbsMin;
        props.max = thisAbsMax;
        moveKnob($thisRangeInput, $thisMinKnob);
        moveKnob($thisRangeInput, $thisMaxKnob);
    }
    function adjustLabels($rangeInput) {
        var $thisRangeInput = $rangeInput;
        var props = $thisRangeInput.data().props;
        var $thisMinLabel = $thisRangeInput.find(".rangeInput__knob--min .rangeInput__label");
        var $thisMaxLabel = $thisRangeInput.find(".rangeInput__knob--max .rangeInput__label");
        var $thisSingleLabel = $thisRangeInput.find(".rangeInput__label--single");
        $thisMinLabel.css("left", $thisMinLabel.outerWidth() / -2 + knobOffset);
        $thisMaxLabel.css("left", $thisMaxLabel.outerWidth() / -2 + knobOffset);
        $thisSingleLabel.css("left", props.minPosX + (props.maxPosX - props.minPosX) / 2 - $thisSingleLabel.outerWidth() / 2);
        if (props.minPosX === null || props.maxPosX === null) return;
        var minKnobRightEdge = props.minPosX + $thisMinLabel.outerWidth() / 2;
        var maxKnobLeftEdge = props.maxPosX - $thisMaxLabel.outerWidth() / 2;
        if (minKnobRightEdge >= maxKnobLeftEdge) {
            $thisRangeInput.addClass("rangeInput--mergedLabels");
        } else {
            $thisRangeInput.removeClass("rangeInput--mergedLabels");
        }
    }
    function storeCursorPos($rangeInput, $knob, ePosX) {
        var props = $rangeInput.data().props;
        var newCursorPos;
        if ($knob.hasClass("rangeInput__knob--min")) {
            newCursorPos = Math.floor(ePosX - props.offsetX) - props.minPosX;
        }
        if ($knob.hasClass("rangeInput__knob--max")) {
            newCursorPos = Math.floor(ePosX - props.offsetX) - props.maxPosX;
        }
        if (props.cursorOffset != newCursorPos) {
            props.cursorOffset = newCursorPos;
            $rangeInput.trigger("yoi-rangeinput:change");
        }
    }
    function moveKnob($rangeInput, $knob, e) {
        if ($rangeInput.data().props.absMin >= $rangeInput.data().props.absMax) return false;
        var $thisRangeInput = $rangeInput;
        var $thisKnob = $knob;
        var $thisMinInput = $thisRangeInput.find('input[name="min"]');
        var $thisMaxInput = $thisRangeInput.find('input[name="max"]');
        var props = $thisRangeInput.data().props;
        var isMinKnob = $thisKnob.hasClass("rangeInput__knob--min");
        var isMaxKnob = $thisKnob.hasClass("rangeInput__knob--max");
        var posX = 0;
        var thisKnobValue = null;
        if (e !== undefined) {
            if (props.cursorOffset > 0) e.pageX = e.pageX - props.cursorOffset;
            if (props.cursorOffset < 0) e.pageX = e.pageX + props.cursorOffset * -1;
            posX = Math.floor(Math.min(Math.max(0, e.pageX - props.offsetX), props.width));
            var factor = Math.floor(posX / props.width * 100);
            thisKnobValue = Math.floor((props.absMax - props.absMin) / 100 * factor + props.absMin * 1);
        } else {
            var inputValue;
            if (isMinKnob) inputValue = props.min;
            if (isMaxKnob) inputValue = props.max;
            var range = props.absMax - props.absMin;
            var factor = props.width / range;
            var posX = Math.ceil(factor * (inputValue - props.absMin));
            thisKnobValue = inputValue;
        }
        if (isMinKnob) {
            if (e !== undefined) props.min = thisKnobValue;
            if (props.min < props.max) {
                $thisRangeInput.find(".rangeInput__range").css("left", posX);
                $thisKnob.find(".rangeInput__label").text(thisKnobValue + " " + props.unit);
                $thisMinInput.val(thisKnobValue);
                props.minPosX = posX;
                props.minValue = thisKnobValue;
            }
        }
        if (isMaxKnob) {
            if (e !== undefined) props.max = thisKnobValue;
            if (props.min < props.max) {
                $thisRangeInput.find(".rangeInput__range").css("right", props.width - posX);
                $thisKnob.find(".rangeInput__label").text(thisKnobValue + " " + props.unit);
                $thisMaxInput.val(thisKnobValue);
                props.maxPosX = posX;
                props.maxValue = thisKnobValue;
            }
        }
        var thisSingleLabelTxt = props.minValue + props.unit + " – " + props.maxValue + props.unit;
        $thisRangeInput.find(".rangeInput__label--single").text(thisSingleLabelTxt);
        if (props.min < props.max) {
            $thisKnob.css("left", posX - knobOffset);
            adjustLabels($thisRangeInput);
        }
    }
    return {
        init: initialize,
        set: set,
        reset: reset
    };
}();

YOI.element.RatingInput = function() {
    var $ratingSelect = $('        <span class="ratingInput__select">            <span class="ratingInput__star"></span>            <span class="ratingInput__star"></span>            <span class="ratingInput__star"></span>            <span class="ratingInput__star"></span>            <span class="ratingInput__star"></span>        </span>    ');
    function initialize($ratingInput, options) {
        var $ratingInput = YOI.createCollection("ratinginput", $ratingInput, options);
        if ($ratingInput) $ratingInput.each(function() {
            var $thisRatingInput = $(this);
            var $thisRatingSelect = $ratingSelect.clone();
            var $thisRatingStars = $thisRatingSelect.find(".ratingInput__star");
            setScore($thisRatingInput);
            $thisRatingStars.on("mouseover", function() {
                setScore($thisRatingInput, $(this).index() + 1);
            }).on("click", function() {
                submitScore($thisRatingInput);
                lock($thisRatingInput);
            });
            $thisRatingInput.append($thisRatingSelect);
        });
    }
    function lock($ratingInput) {
        $ratingInput.addClass("ratingInput--locked");
        $ratingInput.data().state = "locked";
    }
    function unlock($ratingInput) {
        $ratingInput.removeClass("ratingInput--locked");
        $ratingInput.data().state = "unlocked";
    }
    function setScore($ratingInput, score) {
        var options = $ratingInput.data().options;
        var state = $ratingInput.data().state;
        var score = score !== undefined ? score : options.score;
        if (state !== "locked") {
            $ratingInput.data().options.score = score;
            $ratingInput.removeClass("ratingInput--rated-1 ratingInput--rated-2 ratingInput--rated-3 ratingInput--rated-4 ratingInput--rated-5");
            $ratingInput.addClass("ratingInput--rated-" + score);
        }
    }
    function submitScore($ratingInput) {
        var options = $ratingInput.data().options;
        var uid = options.uid;
        var score = options.score === undefined ? 0 : options.score;
        $ratingInput.trigger("yoi-rating:submit");
    }
    return {
        init: initialize,
        lock: lock,
        unlock: unlock,
        set: setScore
    };
}();

YOI.element.Slider = function() {
    var $document = $(document);
    var $window = $(window);
    var language = YOI.locale();
    var localization = {
        en: {
            btnLabelNext: "next",
            btnLabelPrev: "previous"
        },
        de: {
            btnLabelNext: "weiter",
            btnLabelPrev: "zurück"
        }
    };
    var slideControls = {
        "pageBtns--tl": $('            <div class="pageBtns pageBtns--tl">                <button class="pageBtns__btnPrev">                    <span class="hidden">' + localization[language]["btnLabelPrev"] + '</span>                </button>                <span class="pageBtns__indicator">                    <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">1</span>                </span>                <button class="pageBtns__btnNext">                    <span class="hidden">' + localization[language]["btnLabelNext"] + "</span>                </button>            </div>        "),
        "pageBtns--tr": $('            <div class="pageBtns pageBtns--tr">                <button class="pageBtns__btnPrev">                    <span class="hidden">' + localization[language]["btnLabelPrev"] + '</span>                </button>                <span class="pageBtns__indicator">                    <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">1</span>                </span>                <button class="pageBtns__btnNext">                    <span class="hidden">' + localization[language]["btnLabelNext"] + "</span>                </button>            </div>        "),
        "pageBtns--br": $('            <div class="pageBtns pageBtns--br">                <button class="pageBtns__btnPrev">                    <span class="hidden">' + localization[language]["btnLabelPrev"] + '</span>                </button>                <span class="pageBtns__indicator">                    <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">1</span>                </span>                <button class="pageBtns__btnNext">                    <span class="hidden">' + localization[language]["btnLabelNext"] + "</span>                </button>            </div>        "),
        "pageBtns--bl": $('            <div class="pageBtns pageBtns--bl">                <button class="pageBtns__btnPrev">                    <span class="hidden">' + localization[language]["btnLabelPrev"] + '</span>                </button>                <span class="pageBtns__indicator">                    <span class="pageBtns__currentPage">1</span> / <span class="pageBtns__totalPages">1</span>                </span>                <button class="pageBtns__btnNext">                    <span class="hidden">' + localization[language]["btnLabelNext"] + "</span>                </button>            </div>        "),
        flipBtns: $('            <div class="flipBtns">                <a class="flipBtns__btnPrev">                    <span class="hidden">' + localization[language]["btnLabelPrev"] + '</span>                </a>                <a class="flipBtns__btnNext">                    <span class="hidden">' + localization[language]["btnLabelNext"] + "</span>                </a>            </div>        "),
        "flipBtns--inset": $('            <div class="flipBtns flipBtns--inset">                <a class="flipBtns__btnPrev">                    <span class="hidden">' + localization[language]["btnLabelPrev"] + '</span>                </a>                <a class="flipBtns__btnNext">                    <span class="hidden">' + localization[language]["btnLabelNext"] + "</span>                </a>            </div>        "),
        pageDots: $('            <div class="pageDots">                <a class="pageDots__btnPrev">                    <span class="hidden">' + localization[language]["btnLabelPrev"] + '</span>                </a>                <a class="pageDots__btnNext">                    <span class="hidden">' + localization[language]["btnLabelNext"] + "</span>                </a>            </div>        "),
        "pageDots--dark": $('            <div class="pageDots pageDots--dark">                <a class="pageDots__btnPrev">                    <span class="hidden">' + localization[language]["btnLabelPrev"] + '</span>                </a>                <a class="pageDots__btnNext">                    <span class="hidden">' + localization[language]["btnLabelNext"] + "</span>                </a>            </div>        "),
        "pageDots--subtle": $('            <div class="pageDots pageDots--subtle">                <a class="pageDots__btnPrev">                    <span class="hidden">' + localization[language]["btnLabelPrev"] + '</span>                </a>                <a class="pageDots__btnNext">                    <span class="hidden">' + localization[language]["btnLabelNext"] + "</span>                </a>            </div>        ")
    };
    function initialize($slider, options) {
        var $slider = YOI.createCollection("slider", $slider, options);
        if ($slider) $slider.each(function(sliderIndex) {
            var $thisSlider = $(this);
            var $thisSlides = $thisSlider.find(".slider__slide");
            $thisSlider.data().props = {
                index: sliderIndex,
                slideIndex: 0,
                totalSlides: $thisSlides.length
            };
            var totalSlides = $thisSlider.data().props.totalSlides;
            var options = $thisSlider.data().options;
            if (options.transition !== undefined) {
                $window.on("load", function() {
                    adjustHeight($thisSlider);
                });
            }
            $thisSlides.hide().first().show();
            if (options.control !== undefined) {
                var thisControls = $(slideControls[options.control]).clone();
                $thisSlider.append(thisControls);
                $thisSlider.find('[class*="btnNext"]').on("click", function(e) {
                    e.preventDefault();
                    stopAutoplay($thisSlider);
                    showSlide($thisSlider, "next");
                });
                $thisSlider.find('[class*="btnPrev"]').on("click", function(e) {
                    e.preventDefault();
                    stopAutoplay($thisSlider);
                    showSlide($thisSlider, "prev");
                });
                $thisSlider.find(".pageBtns__totalPages").text(totalSlides);
                if (options.control.indexOf("pageDots") !== -1) {
                    for (var i = 0; i < totalSlides; i++) {
                        $('<a class="pageDots__dot"><span class="hidden">' + (i + 1) + "</span></a>").insertBefore($(this).find(".pageDots__btnNext"));
                    }
                    paginationLinks = $thisSlider.find('.pageDots a:not([class*="btn"])');
                    paginationLinks.first().addClass("is--active");
                    paginationLinks.on("click", function(e) {
                        e.preventDefault();
                        stopAutoplay($thisSlider);
                        var linkIndex;
                        if ($thisSlider.parent().find(".pageDots__btnPrev").length) {
                            linkIndex = $thisSlider.index() - 1;
                        } else {
                            linkIndex = $thisSlider.index();
                        }
                        showSlide($thisSlider, linkIndex);
                    });
                }
            }
            if (options.clickable) {
                $thisSlides.not("a").on("tap", function(e) {
                    e.preventDefault();
                    stopAutoplay($thisSlider);
                    showSlide($thisSlider, "next");
                });
            }
            if (options.swipeable) {
                $thisSlider.on("swipeleft", function(e) {
                    e.preventDefault();
                    stopAutoplay($thisSlider);
                    showSlide($thisSlider, "next");
                });
                $thisSlider.on("swiperight", function(e) {
                    e.preventDefault();
                    stopAutoplay($thisSlider);
                    showSlide($thisSlider, "prev");
                });
            }
            if (options.autoplay !== undefined) {
                startAutoplay($thisSlider);
            }
        });
        if ($slider) addKeyboardEvents($slider);
    }
    function showSlide($thisSlider, target) {
        var $thisSlides = $thisSlider.find(".slider__slide");
        var props = $thisSlider.data().props;
        var options = $thisSlider.data().options;
        var totalSlides = props.totalSlides;
        var slideIndex = props.slideIndex;
        var direction = false;
        if (target === "next" || target === undefined) {
            slideIndex = slideIndex !== totalSlides - 1 ? slideIndex + 1 : 0;
            direction = ">";
        } else if (target === "prev") {
            slideIndex = slideIndex === 0 ? totalSlides - 1 : slideIndex - 1;
            direction = "<";
        } else if (typeof target === "number") {
            slideIndex = target;
        }
        if (options.transition !== undefined) {
            applyTransition($thisSlider, slideIndex, direction);
        } else {
            $thisSlides.hide();
            $thisSlides.eq(slideIndex).show();
        }
        updatePagination($thisSlider, slideIndex);
        $thisSlider.data().props.slideIndex = slideIndex;
        $thisSlider.trigger("yoi-slider:change");
    }
    function applyTransition($thisSlider, nextSlideIndex, direction) {
        var $thisSlides = $thisSlider.find(".slider__slide");
        var options = $thisSlider.data().options;
        var currentSlideIndex = $thisSlider.data().props.slideIndex;
        var leftOffset;
        switch (direction) {
          case "<":
            leftOffset = "-100%";
            break;

          case ">":
            leftOffset = "100%";
            break;
        }
        if (options.transition === "animate") {
            if (!$thisSlides.is(":animated")) {
                $thisSlides.eq(currentSlideIndex).css({
                    "z-index": "10"
                }).animate({
                    left: leftOffset
                }, 300, function() {
                    $(this).css({
                        left: "0",
                        opacity: 0,
                        "z-index": "1"
                    });
                });
                $thisSlides.eq(nextSlideIndex).css({
                    opacity: "1",
                    "z-index": "2"
                }).show();
            }
        } else if (options.transition === "fade") {
            $thisSlides.eq(currentSlideIndex).fadeOut(100, function() {
                $thisSlides.eq(nextSlideIndex).fadeIn(300);
            });
        }
    }
    function startAutoplay($slider) {
        var options = $slider.data().options;
        var sliderIndex = $slider.data().props.index;
        var intervalName = "slideAutoplay-" + sliderIndex;
        YOI.setInterval(intervalName, options.autoplay, function() {
            showSlide($slider);
        });
        $slider.trigger("yoi-slider:autoplaystart");
    }
    function stopAutoplay($slider) {
        var sliderIndex = $slider.data().props.index;
        var intervalName = "slideAutoplay-" + sliderIndex;
        YOI.clearInterval(intervalName);
        $slider.trigger("yoi-slider:autoplaystop");
    }
    function updatePagination($thisSlider, thisSlideIndex) {
        paginationLinks = $thisSlider.find('.pageDots a:not([class*="btn"])');
        paginationLinks.removeClass("is--active");
        paginationLinks.eq(thisSlideIndex).addClass("is--active");
        $thisSlider.find(".pageBtns__currentPage").text(thisSlideIndex + 1);
    }
    function adjustHeight($thisSlider) {
        var $thisSlides = $thisSlider.find(".slider__slide");
        var $thisSlidesWrapper = $thisSlider.find(".slider__slides");
        var slideHeight = 0;
        for (var i = 0; i < $thisSlides.length; i++) {
            var thisSlideHeight = $thisSlides.eq(i).outerHeight();
            slideHeight = thisSlideHeight > slideHeight ? thisSlideHeight : slideHeight;
            $thisSlidesWrapper.css({
                height: slideHeight
            });
        }
        $thisSlidesWrapper.css({
            height: slideHeight
        });
    }
    function addKeyboardEvents($slider) {
        $slider.attr("tabindex", "0").on("focus", function() {
            $(this).addClass("focus");
        }).on("blur", function() {
            $(this).removeClass("focus");
        });
        $document.on("yoi-keypressed:arrowleft", function() {
            var $activeSlider = $(document.activeElement);
            if ($activeSlider.attr("yoi-slider") !== undefined) {
                showSlide($activeSlider, "prev");
                stopAutoplay($slider);
            }
        });
        $document.on("yoi-keypressed:arrowright", function() {
            var $activeSlider = $(document.activeElement);
            if ($activeSlider.attr("yoi-slider") !== undefined) {
                showSlide($activeSlider, "next");
                stopAutoplay($slider);
            }
        });
    }
    return {
        init: initialize,
        show: showSlide,
        start: startAutoplay,
        stop: stopAutoplay
    };
}();

YOI.element.Stepper = function() {
    var language = YOI.locale();
    var localization = {
        en: {
            btnLabelMore: "more",
            btnLabelLess: "less"
        },
        de: {
            btnLabelMore: "mehr",
            btnLabelLess: "weniger"
        }
    };
    var $stepperBtns = $('        <div class="stepper__btnPlus">            <span class="stepper__iconPlus"></span>            <span class="hidden">' + localization[language]["btnLabelMore"] + '</span>        </div>        <div class="stepper__btnMinus">            <span class="stepper__iconMinus"></span>            <span class="hidden">' + localization[language]["btnLabelLess"] + "</span>        </div>    ");
    function initialize($stepper, options) {
        var $stepper = YOI.createCollection("stepper", $stepper, options);
        if ($stepper) $stepper.each(function() {
            var $thisStepper = $(this);
            $thisStepper.prepend($stepperBtns.clone());
            var eventType = YOI.environment("mobile") ? "tap" : "click";
            $thisStepper.find(".stepper__btnPlus").on(eventType, function(e) {
                e.preventDefault();
                increaseItemCount($thisStepper);
            });
            $thisStepper.find(".stepper__btnMinus").on(eventType, function(e) {
                e.preventDefault();
                decreaseItemCount($thisStepper);
            });
            $thisStepper.find(".stepper__input").blur(function() {
                checkInput($thisStepper);
            });
        });
    }
    function increaseItemCount($stepper) {
        checkInput($stepper);
        if ($stepper.data().state === "error") return false;
        var currentValue = $stepper.find(".stepper__input")[0].value;
        if (currentValue >= 0) {
            currentValue++;
            $stepper.find("input")[0].value = currentValue;
        }
        $stepper.trigger("yoi-stepper:up");
    }
    function decreaseItemCount($stepper) {
        checkInput($stepper);
        if ($stepper.data().state === "error") return false;
        var currentValue = $stepper.find(".stepper__input")[0].value;
        if (currentValue > 1) {
            currentValue--;
            $stepper.find("input")[0].value = currentValue;
        }
        $stepper.trigger("yoi-stepper:down");
    }
    function checkInput($stepper) {
        var $txtField = $stepper.find(".stepper__input");
        var $input = $stepper.find(".stepper__input")[0].value;
        if (!$input.match(/^[0-9]+$/)) {
            $txtField.addClass("input--error");
            $stepper.trigger("yoi-stepper:error");
            $stepper.data().state = "error";
        } else {
            $txtField.removeClass("input--error");
            $stepper.data().state = "";
        }
    }
    return {
        init: initialize,
        countUp: increaseItemCount,
        countDown: decreaseItemCount
    };
}();

YOI.element.Switch = function() {
    var language = YOI.locale();
    var localization = {
        en: {
            labelOn: "On",
            labelOff: "Off"
        },
        de: {
            labelOn: "Ein",
            labelOff: "Aus"
        }
    };
    var $labelOn = $('<span class="switch__labelOn"></span>');
    var $labelOff = $('<span class="switch__labelOff"></span>');
    var $knob = $('<span class="switch__knob"></span>');
    function initialize($switch, options) {
        var $switch = YOI.createCollection("switch", $switch, options);
        if ($switch) $switch.each(function() {
            var $thisSwitch = $(this);
            var options = $thisSwitch.data().options;
            var state = options.state !== undefined ? options.state : "off";
            thisLabelOnText = options.labelOn !== undefined ? options.labelOn : localization[language]["labelOn"];
            thisLabelOffText = options.labelOff !== undefined ? options.labelOff : localization[language]["labelOff"];
            $thisSwitch.append($knob.clone());
            if (options.showLabels) {
                $thisSwitch.append($labelOn.clone().text(thisLabelOnText), $labelOff.clone().text(thisLabelOffText));
                $thisSwitch.addClass("switch--labeled");
            }
            if (state === "on") setOn($thisSwitch);
            if (state === "off") setOff($thisSwitch);
            $thisSwitch.on("click", function(e) {
                setToggle($thisSwitch);
            });
        });
    }
    function setOn($switch) {
        $switch.removeClass("switch--off").addClass("switch--on");
        $switch.find('input[type="checkbox"]').first().attr("checked", true);
        $switch.trigger("yoi-switch:on");
    }
    function setOff($switch) {
        $switch.removeClass("switch--on").addClass("switch--off");
        $switch.find('input[type="checkbox"]').first().attr("checked", false);
        $switch.trigger("yoi-switch:off");
    }
    function setToggle($switch) {
        if ($switch.hasClass("switch--off")) {
            setOn($switch);
        } else if ($switch.hasClass("switch--on")) {
            setOff($switch);
        }
    }
    return {
        init: initialize,
        on: setOn,
        off: setOff,
        toggle: setToggle
    };
}();

YOI.element.Table = function() {
    function initialize($table, options) {
        var $table = YOI.createCollection("table", $table, options);
        if ($table) $table.each(function() {
            var $thisTable = $(this);
            var options = $thisTable.data().options;
            if (options.selectable || options.selectable === "multi") {
                $thisTable.find("tr th:first-child").before("<th></th>");
                $thisTable.find("tr td:first-child").before('<td class="table__checkbox"></td>');
                $thisTable.find("td").on("click", function(e) {
                    e.preventDefault();
                    var $thisTr = $(this).closest("tr");
                    selectRow($thisTr);
                });
            }
            if (options.removeable) {
                $thisTable.find("tr th:last-child").after("<th></th>");
                $thisTable.find("tr td:last-child").after('<td class="table__removeBtn"></td>');
                $thisTable.find(".table__removeBtn").on("click", function(e) {
                    e.preventDefault();
                    var $thisTr = $(this).closest("tr");
                    removeRow($thisTr);
                });
            }
        });
    }
    function selectRow($thisTr) {
        var $thisTable = $thisTr.closest("table");
        var $thisAllTr = $thisTable.find("tr");
        var options = $thisTable.data().options;
        if (options.selectable === "multi") {
            $thisTr.toggleClass("tr--active");
        } else {
            $thisAllTr.removeClass("tr--active");
            $thisTr.addClass("tr--active");
        }
        $thisTable.trigger("yoi-table:select");
    }
    function removeRow($thisTr) {
        var $thisTable = $thisTr.closest("table");
        var totalTds = $thisTable.find("td").length;
        var tableIsEmpty = totalTds - $thisTr.find("td").length === 0 ? true : false;
        $thisTr.fadeOut("slow", function() {
            $thisTr.remove();
            if (tableIsEmpty) $thisTable.trigger("yoi-table:empty");
        });
        $thisTable.trigger("yoi-table:remove");
    }
    return {
        init: initialize,
        selectRow: selectRow,
        removeRow: removeRow
    };
}();

YOI.element.Tabs = function() {
    var $window = $(window);
    function initialize($tabsMenu, options) {
        var $tabsMenu = YOI.createCollection("tabs", $tabsMenu, options);
        if ($tabsMenu) $tabsMenu.each(function() {
            var $thisTabsMenu = $(this);
            var urlTabId = window.location.hash;
            var firstTabId = $thisTabsMenu.find("a").first()[0].hash;
            var hashMatchesTab = $thisTabsMenu.find('a[href="' + urlTabId + '"]').length;
            var hasActiveTab = $thisTabsMenu.has(".tabs__item.is--active").length;
            var startTabId = hashMatchesTab ? urlTabId : firstTabId;
            if (hasActiveTab && !hashMatchesTab) {
                startTabId = $thisTabsMenu.find(".tabs__item.is--active a").first()[0].hash;
            }
            switchTo(startTabId);
            $thisTabsMenu.find("a").on("click", function(e) {
                e.preventDefault();
                switchTo(this.hash);
            });
        });
    }
    function switchTo(thisTargetTabId) {
        var $thisTabsMenuItem = $('a[href="' + thisTargetTabId + '"]').parent("li");
        var $thisRelatedTabsMenuItems = $thisTabsMenuItem.closest(".tabs__menu").find("li");
        var $thisTargetTab = $(thisTargetTabId);
        $thisRelatedTabsMenuItems.each(function() {
            var $thisMenuItem = $(this);
            var tabId = $thisMenuItem.find("a")[0].hash;
            $thisMenuItem.removeClass("is--active");
            $(tabId).hide();
        });
        $thisTabsMenuItem.addClass("is--active");
        $thisTargetTab.show();
        $thisTargetTab.trigger("yoi-tabs:change");
    }
    return {
        init: initialize,
        switchTo: switchTo
    };
}();

YOI.element.Tooltip = function() {
    var showDelayDuration = 300;
    var hideDelayDuration = 200;
    function initialize($tooltip, options) {
        var $tooltip = YOI.createCollection("tooltip", $tooltip, options);
        if ($tooltip) $tooltip.each(function() {
            var $thisTooltip = $(this);
            var options = $thisTooltip.data().options;
            var $target = options.target !== undefined ? $(options.target) : $thisTooltip.find(".tooltip");
            $target = prepareTarget($target);
            $thisTooltip.on("mouseover", function(e) {
                setPosition($target, e);
                hideAll();
                hideWithDelay($target, "stop");
                showWithDelay($target, "start");
            });
            $thisTooltip.on("mouseout", function() {
                hideWithDelay($target, "start");
                showWithDelay($target, "stop");
            });
        });
    }
    function hideAll(scope) {
        if (scope === undefined) {
            scope = "";
        } else {
            scope += " ";
        }
        $(scope + ".tooltip").hide();
    }
    function prepareTarget($thisTarget) {
        var $thisTmpTarget = $thisTarget.detach();
        if ($thisTarget.attr("id") !== undefined) {
            targetId = 'id="' + $thisTarget.attr("id") + '" ';
        } else {
            targetId = "";
        }
        $thisTarget = $("<div " + targetId + 'class="tooltip">' + $thisTarget.html() + "</div>").appendTo($(document.body)).hide();
        if ($thisTmpTarget.attr("class") !== undefined) {
            var compatibleModifiers = [ "--positive", "--success", "--negative", "--error", "--attention" ];
            for (var i = 0; i < compatibleModifiers.length; i++) {
                var thisModifier = compatibleModifiers[i];
                var thisTmpTargetClassnames = $thisTmpTarget.attr("class");
                if (thisTmpTargetClassnames.indexOf(thisModifier) > 0) {
                    thisModifier = "tooltip--" + thisModifier.split("--")[1];
                    $thisTarget.addClass(thisModifier);
                }
            }
        }
        return $thisTarget;
    }
    function setPosition($thisTarget, e) {
        var padding = 20;
        var cursorY = e.pageY;
        var cursorX = e.pageX;
        var tooltipWidth = $thisTarget.width();
        var tooltipHeight = $thisTarget.height();
        var viewPortWidth = $(window).width();
        var viewPortHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var tooltipLeft = cursorX + tooltipWidth > viewPortWidth ? cursorX - tooltipWidth - padding + "px" : cursorX + "px";
        var tooltipTop = cursorY + tooltipHeight + padding * 3 > scrollTop + viewPortHeight ? cursorY - tooltipHeight - padding * 2 + "px" : cursorY + padding + "px";
        $thisTarget.css({
            position: "absolute",
            left: tooltipLeft,
            top: tooltipTop
        });
    }
    function showWithDelay($thisTarget, action) {
        if (action === "start") {
            YOI.setDelay("tooltipShowDelay", showDelayDuration, function() {
                $thisTarget.fadeIn(200).promise().then(function() {
                    $thisTarget.trigger("yoi-tooltip:show");
                });
            });
        } else if (action === "stop") {
            YOI.clearDelay("tooltipShowDelay");
        }
    }
    function hideWithDelay($thisTarget, action) {
        if (action === "start") {
            YOI.setDelay("tooltipHideDelay", hideDelayDuration, function() {
                $(".tooltip").hide();
                $thisTarget.trigger("yoi-tooltip:hide");
            });
        } else if (action === "stop") {
            YOI.clearDelay("tooltipHideDelay");
        }
    }
    return {
        init: initialize,
        show: showWithDelay,
        hide: hideWithDelay,
        hideAll: hideAll
    };
}();

YOI.element.BrowserHistory = function() {
    var currentScrollTop;
    var $window = $(window);
    function pushHash(hashString) {
        history.pushState(null, null, window.location.pathname + hashString);
    }
    function replaceHash(hashString) {
        history.replaceState(null, null, window.location.pathname + hashString);
    }
    function clearHash() {
        history.replaceState("", document.title, window.location.pathname);
    }
    return {
        pushHash: pushHash,
        replaceHash: replaceHash,
        clearHash: clearHash
    };
}();

YOI.module.Dismiss = function() {
    var language = YOI.locale();
    var localization = {
        en: {
            btnLabel: "close"
        },
        de: {
            btnLabel: "schliessen"
        }
    };
    var $btnDismiss = $('        <span class="btnDismiss">' + localization[language]["btnLabel"] + "</span>    ");
    function initialize($dismissableElement, options) {
        var $dismissableElement = YOI.createCollection("dismissable", $dismissableElement, options);
        if ($dismissableElement) $dismissableElement.each(function() {
            var $thisDismissableElement = $(this);
            $btnDismiss.clone().on("click", function(e) {
                e.preventDefault();
                dismiss($thisDismissableElement);
            }).appendTo($thisDismissableElement);
        });
    }
    function dismiss($targetElement) {
        if (!($targetElement instanceof jQuery)) return false;
        $targetElement.fadeOut(function() {
            $targetElement.trigger("yoi-dismissed");
            $targetElement.remove();
        });
    }
    return {
        init: initialize,
        apply: dismiss
    };
}();

YOI.module.Hide = function() {
    function initialize($trigger, options) {
        var $trigger = YOI.createCollection("hide", $trigger, options);
        if ($trigger) $trigger.each(function(index) {
            var $thisTrigger = $(this);
            var options = $thisTrigger.data().options;
            var transition = options.transition;
            var $target = $(options.target);
            var event = options.event;
            if (!($target instanceof jQuery)) return false;
            $thisTrigger.on(event, function(e) {
                hide($target, transition);
            });
        });
    }
    function hide($target, transition) {
        if (!($target instanceof jQuery)) return false;
        var transition = transition;
        if (transition === "fadeOut") {
            $target.fadeOut();
        } else if (transition === "slideUp") {
            $target.slideUp();
        } else {
            $target.hide();
        }
        $target.trigger("yoi-hide");
    }
    return {
        init: initialize,
        apply: hide
    };
}();

YOI.KeyboardAgent = function() {
    var $document = $(document);
    var keys = {
        38: "arrowup",
        39: "arrowright",
        40: "arrowdown",
        37: "arrowleft",
        13: "enter",
        32: "space",
        27: "escape"
    };
    function initialize() {
        $document.on("keydown", function(e) {
            if (e.which === 32 && e.target !== document.body) e.preventDefault();
        }).on("keyup", function(e) {
            var keyCode = e.which;
            if (keys[keyCode] !== undefined) $document.trigger("yoi-keypressed:" + keys[keyCode]);
        });
    }
    initialize();
    return {
        init: initialize
    };
}();

YOI.module.Lazyload = function() {
    function initialize($lazyload, options) {
        var $lazyload = YOI.createCollection("lazyload", $lazyload, options);
        if ($lazyload) $lazyload.each(function() {
            var $thisLazyload = $(this);
            var options = $thisLazyload.data().options;
            var defaultImage = options.image !== undefined ? options.image : false;
            var width = options.width !== undefined ? options.width : false;
            var height = options.height !== undefined ? options.height : false;
            var alt = options.alt !== undefined ? options.alt : false;
            var title = options.title !== undefined ? options.title : false;
            var longdesc = options.longdesc !== undefined ? options.longdesc : false;
            var modifiers = options.modifiers !== undefined ? options.modifiers : false;
            if (!defaultImage) return false;
            var imageUrl;
            var currentBreakpoint = YOI.currentBreakpoint();
            var breakPointSmall = YOI.stringContains(currentBreakpoint, "small");
            var breakPointMedium = YOI.stringContains(currentBreakpoint, "medium");
            var breakPointLarge = YOI.stringContains(currentBreakpoint, "large");
            var breakPointXlarge = YOI.stringContains(currentBreakpoint, "xlarge");
            if (breakPointSmall) imageUrl = options.small;
            if (breakPointMedium) imageUrl = options.medium;
            if (breakPointLarge) imageUrl = options.large;
            if (breakPointXlarge) imageUrl = options.xlarge;
            if (imageUrl === undefined) imageUrl = defaultImage;
            var newImage = $('<img src="' + imageUrl + '"></img>');
            if (width) newImage.attr("width", width);
            if (height) newImage.attr("height", height);
            if (alt) newImage.attr("alt", alt);
            if (title) newImage.attr("title", title);
            if (longdesc) newImage.attr("longdesc", longdesc);
            if (modifiers) newImage.addClass(modifiers);
            newImage.addClass("fx-fade-in-initial").insertAfter($thisLazyload).promise().then(function() {
                YOI.module.ScrollAgent.init(newImage);
            });
            newImage.on("load", function() {
                $(this).one("yoi-viewport:in", function() {
                    $(this).addClass("fx-fade-in");
                });
            });
            if (newImage[0].complete) {
                newImage.trigger("load");
            }
        });
    }
    return {
        init: initialize
    };
}();

YOI.module.Remove = function() {
    function initialize($removeTrigger, options) {
        var $removeTrigger = YOI.createCollection("remove", $removeTrigger, options);
        if ($removeTrigger) $removeTrigger.each(function() {
            var $thisremoveTrigger = $(this);
            var options = $thisremoveTrigger.data().options;
            var $thisTarget = options.target !== undefined && $(options.target).length ? $(options.target) : $thisremoveTrigger.parent();
            $thisremoveTrigger.on("click", function(e) {
                e.preventDefault();
                remove($thisTarget);
            });
        });
    }
    function remove($target) {
        $target.fadeOut(function() {
            $target.trigger("yoi-remove");
            $target.remove();
        });
    }
    return {
        init: initialize,
        apply: remove
    };
}();

YOI.module.Reveal = function() {
    function initialize($revealTrigger, options) {
        var $revealTrigger = YOI.createCollection("reveal", $revealTrigger, options);
        if ($revealTrigger) $revealTrigger.each(function(index) {
            var $thisRevealTrigger = $(this);
            var options = $thisRevealTrigger.data().options;
            var target = options.target !== undefined ? options.target : false;
            var event = options.event !== undefined ? options.event : "click";
            var transition = options.transition !== undefined ? options.transition : false;
            var hideTarget = options.hideTarget !== undefined ? options.hideTarget : true;
            if (!target) return false;
            if (hideTarget) $(target).hide();
            $thisRevealTrigger.on(event, function(e) {
                if (transition === "fadeOut") {
                    $(target).fadeOut();
                } else if (transition === "slideUp") {
                    $(target).slideUp();
                } else {
                    $(target).hide();
                }
            });
            $thisRevealTrigger.trigger("yoi-reveal");
        });
    }
    return {
        init: initialize
    };
}();

YOI.module.ScrollAgent = function() {
    var $window = $(window);
    var viewPortHeight = $window.height();
    var lastScrollTop = 0;
    var offset = 0;
    var scrollTop;
    var viewportIn;
    var viewportOut;
    var viewportCenter;
    var scrollDirection;
    var lastScrollDirection;
    function initialize($targetElement, options) {
        var $targetElement = YOI.createCollection("scrollagent", $targetElement, options);
        if ($targetElement) {
            update($targetElement);
            observe($targetElement);
            listen($targetElement);
            $window.on("load resize", function() {
                update($targetElement);
                observe($targetElement);
            }).on("scroll", function() {
                observe($targetElement);
            });
        }
    }
    function update($targetElements) {
        viewPortHeight = $window.height();
        $targetElements.each(function() {
            var $thisTargetElement = $(this);
            var thisHeight = $thisTargetElement.outerHeight();
            var thisInitialPosY = $thisTargetElement.offset().top;
            $thisTargetElement.data().props = {
                height: thisHeight,
                initialPosY: thisInitialPosY
            };
            if ($window.scrollTop() < thisInitialPosY && $window.height() > thisInitialPosY + 10) {
                $thisTargetElement.data().state = "in";
                $thisTargetElement.trigger("yoi-viewport:in");
            } else {
                $thisTargetElement.data().state = "out";
            }
        });
    }
    function observe($targetElements) {
        scrollTop = $window.scrollTop();
        scrollDirection = scrollTop >= lastScrollTop ? "down" : "up";
        $targetElements.each(function(index) {
            var $targetElement = $(this);
            var state = $targetElement.data().state;
            var initialPosY = $targetElement.data().props.initialPosY;
            var height = $targetElement.data().props.height;
            viewportIn = scrollTop + viewPortHeight > initialPosY + offset && scrollTop + offset < initialPosY + height;
            viewportCenter = scrollTop + viewPortHeight / 2 > initialPosY && scrollTop + viewPortHeight < initialPosY + height + viewPortHeight / 2;
            viewportOut = !viewportIn;
            if (viewportIn && state === "out") $targetElement.trigger("yoi-viewport:in");
            if (viewportCenter && state !== "center") $targetElement.trigger("yoi-viewport:center");
            if (viewportOut && state === "in" || viewportOut && state === "center") $targetElement.trigger("yoi-viewport:out");
            if (scrollDirection !== lastScrollDirection) {
                $targetElement.trigger("yoi-scrolldirection:" + scrollDirection);
            }
            lastScrollTop = scrollTop > 0 ? scrollTop : 0;
            lastScrollDirection = scrollDirection;
        });
    }
    function listen($targetElements) {
        $targetElements.each(function() {
            var $targetElement = $(this);
            $targetElement.on("yoi-viewport:in", function() {
                $targetElement.data().state = "in";
            });
            $targetElement.on("yoi-viewport:center", function() {
                $targetElement.data().state = "center";
            });
            $targetElement.on("yoi-viewport:out", function() {
                $targetElement.data().state = "out";
            });
        });
    }
    return {
        init: initialize
    };
}();

YOI.module.ScrollFx = function() {
    function initialize($targetElement, options) {
        var $targetElement = YOI.createCollection("scrollfx", $targetElement, options);
        if ($targetElement) $targetElement.each(function() {
            var $targetElement = $(this);
            YOI.module.ScrollAgent.init($targetElement, options);
            addTargetElementInitialCss($targetElement);
            listen($targetElement);
        });
    }
    function addTargetElementInitialCss($targetElement) {
        var options = $targetElement.data().options;
        var inFx = options.in === undefined ? false : options.in;
        var centerFx = options.center === undefined ? false : options.center;
        if (inFx) $targetElement.addClass("fx-" + inFx + "-initial");
        if (centerFx) $targetElement.addClass("fx-" + centerFx + "-initial");
        $targetElement.removeClass("fx-" + inFx);
        $targetElement.removeClass("fx-" + centerFx);
    }
    function listen($targetElements) {
        $targetElements.each(function() {
            var $targetElement = $(this);
            var options = $targetElement.data().options;
            var inFx = options.in !== undefined ? options.in : false;
            var centerFx = options.center !== undefined ? options.center : false;
            var speed = options.speed !== undefined ? options.speed : false;
            var repeat = options.repeat !== undefined ? options.repeat : true;
            $targetElement.on("yoi-viewport:in", function() {
                if (inFx) {
                    $targetElement.removeClass("fx-" + inFx + "-initial");
                    $targetElement.addClass("fx-" + inFx);
                }
                if (speed) {
                    $targetElement.addClass("fx-" + speed);
                }
            });
            $targetElement.on("yoi-viewport:center", function() {
                if (centerFx) {
                    $targetElement.removeClass("fx-" + centerFx + "-initial");
                    $targetElement.addClass("fx-" + centerFx);
                }
                if (speed) {
                    $targetElement.addClass("fx-" + speed);
                }
            });
            $targetElement.on("yoi-viewport:out", function() {
                addTargetElementInitialCss($targetElement);
                if (repeat !== true) $targetElement.addClass("fx-off");
            });
        });
    }
    return {
        init: initialize
    };
}();

YOI.module.ScrollTo = function() {
    var $document = $(document);
    function initialize($scrollToTrigger, options) {
        var $scrollToTrigger = YOI.createCollection("scrollto", $scrollToTrigger, options);
        if ($scrollToTrigger) $scrollToTrigger.each(function() {
            var $thisTrigger = $(this);
            var targetId = $thisTrigger[0].hash;
            $thisTrigger.on("click", function(e) {
                if ($(targetId).length) {
                    e.preventDefault();
                    scrollToTarget(targetId, $thisTrigger);
                }
            });
        });
    }
    function scrollToTarget(targetId, $thisTrigger, options) {
        var $target = $(targetId);
        var $scrollContext;
        var $scrollContainer = $target.closest(".scrl-y");
        var targetFound = $target.length > 0 ? true : false;
        var scrollContainerFound = $scrollContainer.length > 0 ? true : false;
        var scrollPosY;
        var options = options === undefined && $thisTrigger !== undefined ? $thisTrigger.data().options : options;
        var offset = $thisTrigger !== undefined && options.offset !== undefined ? options.offset : 20;
        var highlight = $thisTrigger !== undefined && options.highlight !== undefined ? options.highlight : false;
        if (!targetFound) return false;
        if ($target.hasClass("tabs__page") && YOI.foundElement("Tabs")) {
            YOI.element.Tabs.switchTo(targetId);
        }
        if (scrollContainerFound) {
            scrollPosY = "+=" + $target.position().top;
            $scrollContext = $target.closest(".scrl-y");
        } else {
            scrollPosY = $target.offset().top - offset;
            $scrollContext = $("body");
        }
        $document.trigger("yoi-scrollto:start");
        $.when($scrollContext.stop().animate({
            scrollTop: scrollPosY
        }, 500)).done(function() {
            if (highlight === "blink") YOI.blink($target);
            if (highlight === "pulse") YOI.pulse($target);
            $document.trigger("yoi-scrollto:end");
        });
    }
    return {
        init: initialize,
        target: scrollToTarget
    };
}();

YOI.module.Sticky = function() {
    var $body = $("body");
    var $window = $(window);
    function initialize($stickyElement, options) {
        var $stickyElement = YOI.createCollection("sticky", $stickyElement, options);
        if ($stickyElement) $stickyElement.each(function(index) {
            var $thisStickyElement = $(this);
            var $thisStickyElementClone = $thisStickyElement.clone().removeAttr("yoi-sticky").attr("id", "stickyClone-" + index);
            updateStickyElementProps($thisStickyElement);
            manipulateDom($thisStickyElement, $thisStickyElementClone);
        });
        if ($stickyElement) positionObserver($stickyElement);
        if ($stickyElement) stickObserver($stickyElement);
    }
    function manipulateDom($stickyElement, $stickyElementClone) {
        $stickyElementClone.css({
            position: "absolute",
            width: $stickyElement.outerWidth(),
            height: $stickyElement.outerHeight(),
            top: $stickyElement.offset().top,
            left: $stickyElement.offset().left,
            "-webkit-transform": "translate3d(0,0,0)"
        });
        $body.append($stickyElementClone);
        $stickyElement.css({
            width: $stickyElement.outerWidth(),
            height: $stickyElement.outerHeight(),
            visibility: "hidden"
        });
        $stickyElement.empty();
    }
    function updateStickyElementProps($stickyElement) {
        var options = $stickyElement.data().options;
        var $referenceElement = options.reference === "parent" ? $stickyElement.parent() : $(options.reference).first();
        var stickyElementheight = $stickyElement.outerHeight();
        var stickyElementInitialTopPos = $stickyElement.offset().top;
        var stickyElementInitialBottomPos = stickyElementInitialTopPos + stickyElementheight;
        var topOffset = options.start !== undefined ? parseInt(options.start) : 0;
        var topDistance = options.stop !== undefined ? parseInt(options.stop) : 0;
        var stickStart = options.start !== undefined ? stickyElementInitialTopPos - topOffset : stickyElementInitialTopPos;
        var stickStop = options.stop !== undefined ? stickyElementInitialTopPos + topDistance - topOffset : $body.height();
        var passedValidation = validInput($stickyElement);
        if ($referenceElement.length) {
            stickStart = $referenceElement.offset().top - topOffset;
            stickStop = stickStart + $referenceElement.outerHeight() - stickyElementheight - topDistance;
        }
        if ($referenceElement.length && options.reference === "parent") {
            stickStart = stickStart + parseInt($referenceElement.css("paddingTop"));
            stickStop = stickStop - parseInt($referenceElement.css("paddingBottom")) + topDistance;
        }
        $stickyElement.data().props = {
            passedValidation: passedValidation,
            height: stickyElementheight,
            initialTopPos: stickyElementInitialTopPos,
            initialBottomPos: stickyElementInitialBottomPos,
            topOffset: topOffset,
            topDistance: topDistance,
            stickStart: stickStart,
            stickStop: stickStop
        };
    }
    function validInput($stickyElement) {
        var props = $stickyElement.data().props;
        var stickStart = props.stickStart;
        var stickStop = props.stickStop;
        if (stickStop < 1 || stickStart > stickStop || stickStart > $stickyElement.offset().top) {
            return false;
        } else {
            return true;
        }
    }
    function positionObserver($stickyElements) {
        $window.on("resize", function() {
            $stickyElements.each(function(index) {
                var $stickyElement = $(this);
                var $stickyElementClone = $("#stickyClone-" + index);
                if (validInput($stickyElement)) {
                    updateStickyElementProps($stickyElement);
                    $stickyElementClone.css("left", Math.floor($stickyElement.offset().left));
                }
            });
        });
    }
    function stickObserver($stickyElements) {
        $window.on("scroll", function() {
            var scrollTop = $window.scrollTop();
            $stickyElements.each(function(index) {
                var $stickyElement = $(this);
                var $stickyElementClone = $("#stickyClone-" + index);
                var props = $stickyElement.data().props;
                var stickyElementInitialTopPos = props.initialTopPos;
                var stickStart = props.stickStart;
                var stickStop = props.stickStop;
                var topOffset = props.topOffset;
                var cssPositionValue;
                var cssTopValue;
                if (props.passedValidation) {
                    if (scrollTop < stickStart) {
                        cssPositionValue = "absolute";
                        cssTopValue = stickyElementInitialTopPos;
                    } else if (scrollTop > stickStop) {
                        cssPositionValue = "absolute";
                        cssTopValue = stickStop + topOffset;
                    } else {
                        cssPositionValue = "fixed";
                        cssTopValue = 0 + topOffset;
                    }
                    $stickyElementClone.css({
                        position: cssPositionValue,
                        top: cssTopValue
                    });
                }
            });
        });
    }
    return {
        init: initialize
    };
}();

YOI.module.ToggleGroup = function() {
    var toggleTargetGroupIteration;
    var resetToggleDelayTime = 300;
    function initialize($toggleGroup, options) {
        var $toggleGroup = YOI.createCollection("toggle", $toggleGroup, options);
        if ($toggleGroup) $toggleGroup.each(function(index) {
            var $thisTrigger = $(this);
            var options = $thisTrigger.data().options;
            var target = options.target;
            var group = options.group;
            var event = options.event !== undefined ? options.event : "mouseover";
            var activeClassName = options.activeClassName;
            var $thisFallBackElem = $('[yoi-toggle-fallback="' + group + '"]');
            $(target).addClass("toggleTargetGroup-" + group);
            $thisTrigger.addClass("toggleTriggerGroup-" + group);
            $thisTrigger.on(event, function(e) {
                e.preventDefault();
                toggle($thisTrigger);
            });
            if ($thisFallBackElem.length > 0 && event === "mouseover") {
                $(target).hide();
                $thisTrigger.on("mouseenter", function() {
                    YOI.clearDelay("resetToggleTimeout");
                }).on("mouseleave", function() {
                    YOI.setDelay("resetToggleTimeout", resetToggleDelayTime, function() {
                        reset($thisTrigger);
                    });
                });
            } else {
                if (toggleTargetGroupIteration !== group) {
                    toggleTargetGroupIteration = group;
                    if (activeClassName !== undefined) $thisTrigger.addClass(activeClassName);
                } else {
                    $(target).hide();
                }
            }
        });
    }
    function toggle($thisTrigger) {
        var options = $thisTrigger.data().options;
        var target = options.target;
        var group = options.group;
        var activeClassName = options.activeClassName;
        var $thisFallBackElem = $('[yoi-toggle-fallback="' + group + '"]');
        $(".toggleTargetGroup-" + group).hide();
        $(target).show();
        if (activeClassName !== undefined) {
            $(".toggleTriggerGroup-" + group).removeClass(activeClassName);
            $thisTrigger.addClass(activeClassName);
        }
        if ($thisFallBackElem !== undefined) $thisFallBackElem.hide();
        $thisTrigger.trigger("yoi-togglegroup:change");
    }
    function reset($thisTrigger) {
        var options = $thisTrigger.data().options;
        var group = options.group;
        var activeClassName = options.activeClassName;
        var $thisFallBackElem = $('[yoi-toggle-fallback="' + group + '"]');
        if (activeClassName !== undefined) $(".toggleTriggerGroup-" + group).removeClass(activeClassName);
        $(".toggleTargetGroup-" + group).hide();
        if ($thisFallBackElem.length > 0) $thisFallBackElem.fadeIn();
        $thisTrigger.trigger("yoi-togglegroup:reset");
    }
    return {
        init: initialize,
        reset: reset
    };
}();

YOI.module.Update = function() {
    var language = YOI.locale();
    var localization = {
        en: {
            errorTitle: "Fehler",
            errorMsg: "Leider konnte der angeforderte Inhalt nicht geladen werden. Unser Team wurde informiert. Tipp: Stellen Sie sicher, dass eine Internetverbindung besteht."
        },
        de: {
            errorTitle: "Error",
            errorMsg: "Could not load data. A notice was sent to our support team. Hint: Are you sure your internet connection is working?"
        }
    };
    var $errorMsg = $('        <div class="note note--error note--large">            <h3 class="note__headline">' + localization[language].errorTitle + '</h3>            <div class="note__body">                <p>' + localization[language].errorMsg + "</p>            </div>        </div>    ");
    function initialize($updateTrigger, options) {
        var $updateTrigger = YOI.createCollection("update", $updateTrigger, options);
        if ($updateTrigger) $updateTrigger.each(function() {
            var $thisTrigger = $(this);
            var options = $thisTrigger.data().options;
            var requestType = options.type !== undefined ? options.type : false;
            var requestUrl = options.url !== undefined ? options.url : false;
            var $target = options.target !== undefined ? $(options.target) : false;
            if (!requestType) {
                requestType = "GET";
            } else if (requestType.toLowerCase() === "get" || requestType.toLowerCase() === "post") {
                requestType = requestType.toUpperCase();
            }
            if (requestUrl || $target instanceof jQuery) {
                $thisTrigger.on("click", function(e) {
                    e.preventDefault();
                    $.ajax({
                        url: requestUrl,
                        cache: false,
                        type: requestType,
                        beforeSend: function() {
                            $target.addClass("loading");
                        },
                        error: function() {
                            $target.html($errorMsg.clone());
                        },
                        success: function(data) {
                            var $responseMarkup = $(data).filter("#ajaxContent");
                            $target.html($responseMarkup);
                        },
                        complete: function(response) {
                            $target.removeClass("loading");
                        }
                    });
                });
            }
        });
    }
    return {
        init: initialize
    };
}();