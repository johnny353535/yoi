var YOI = {
    elementCollection: {},
    action: {},
    behaviour: {},
    component: {},
    module: {},
    stringContains: function(input, searchString) {
        if (!input || !searchString) return false;
        if (input.indexOf(searchString) > -1) {
            return true;
        } else {
            return false;
        }
    },
    zeroPad: function(num, digits) {
        var num = Math.abs(num);
        var digits = digits || 1;
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
    foundComponent: function(component) {
        if (typeof window.YOI.component[component] === "object") {
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
        if (YOI.stringContains(input, ":") || YOI.stringContains(input, ";")) {
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
            for (var i = 0; i < input.length - 1; i++) {
                keyValuePair = input[i].split(valueStartMarker);
                if (keyValuePair.length === 1) {
                    properObject["action"] = input[0];
                } else if (keyValuePair.length === 2) {
                    properObject[keyValuePair[0].trim()] = keyValuePair[1].trim();
                }
            }
            return properObject;
        } else {
            return false;
        }
    },
    toBoolean: function(input) {
        if (!input) return true;
        switch (input.toLowerCase()) {
          case "false":
          case "no":
          case "0":
          case "":
            return false;

          default:
            return true;
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
        if ($target.hasClass("d-block")) {
            $target.data("displayUtilityClass", "d-block");
        } else if ($target.hasClass("d-inline")) {
            $target.data("displayUtilityClass", "d-inline");
        } else if ($target.hasClass("d-inlineblock")) {
            $target.data("displayUtilityClass", "d-inlineblock");
        }
        $target.removeClass("d-block d-inline d-inlineblock");
        $target.hide();
    },
    show: function($target) {
        if (!($target instanceof jQuery)) {
            return false;
        }
        if (!$target.data().hasOwnProperty("displayUtilityClass")) {
            $target.show();
        } else {
            $target.addClass($target.data("displayUtilityClass"));
        }
    },
    isNumber: function(inputVal) {
        var pattern = /^(0|([1-9]\d*))$/;
        var testVal;
        if (typeof inputVal !== "string") {
            testVal = inputVal.toString();
        } else {
            testVal = inputVal;
        }
        return pattern.test(testVal);
    },
    noFocus: function() {
        return document.activeElement.tagName === "BODY";
    },
    throttle: function(targetFunction, delay) {
        var snapshot = Date.now();
        return function() {
            if (snapshot + delay - Date.now() < 0) {
                targetFunction();
                snapshot = Date.now();
            }
        };
    },
    validBreakpoint: function(keyword) {
        var validBreakPoints = [ "small", "medium", "large", "xlarge" ];
        var position = $.inArray(keyword, validBreakPoints);
        return position >= 0;
    },
    environment: function(envName) {
        var defaultEnvironment = "desktop";
        var currentEnvironment = $("body").attr("yoi-environment") || defaultEnvironment;
        if (!envName) {
            return currentEnvironment;
        } else {
            return $("body").attr("yoi-environment") === envName;
        }
    },
    locale: function(language) {
        var defaultLanguage = "en";
        var currentLanguage = $("html").attr("lang") || defaultLanguage;
        if (!language) {
            return currentLanguage;
        } else {
            return $("html").attr("lang") === language;
        }
    },
    currentBreakPoint: function() {
        return window.getComputedStyle(document.body, ":after").getPropertyValue("content").replace(/\"/g, "");
    },
    blink: function($elem, times) {
        if (!($elem instanceof jQuery)) return false;
        var times = times || 2;
        $elem.stop(true, true);
        for (var i = 0; i < times; i++) {
            $elem.animate({
                opacity: 0
            }, 100).animate({
                opacity: 1
            }, 100);
        }
    },
    pulse: function($elem, times) {
        if (!($elem instanceof jQuery)) return false;
        var times = times || 2;
        $elem.stop(true, true);
        for (var i = 0; i < times; i++) {
            $elem.animate({
                opacity: .2
            }, 300).animate({
                opacity: 1
            }, 300);
        }
    },
    startDomObserver: function() {
        var $document = $(document);
        var observer = window.MutationObserver || window.WebKitMutationObserver;
        var target = document.body;
        YOI.observer = new observer(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    $document.trigger("yoi-dom-add");
                }
                if (mutation.removedNodes.length) {
                    $document.trigger("yoi-dom-remove");
                }
            });
        });
        YOI.observer.observe(target, {
            subtree: true,
            attributes: true,
            childList: true,
            characterData: true
        });
    },
    stopDomObserver: function() {
        if (YOI.hasOwnProperty("observer")) {
            YOI.observer.disconnect();
        }
    },
    updateOptions: function($element, options) {
        if (!$element.data().hasOwnProperty("options")) {
            $element.data().options = {};
        }
        if (!options) {
            var options = YOI.toObject(YOI.getAttribute($element));
        }
        if (typeof options === "object") {
            $.each(options, function(key, value) {
                $element.data().options[key] = value;
            });
        }
    },
    updateProps: function($element, props) {
        if (!$element.data().hasOwnProperty("props")) {
            $element.data().props = {};
        }
        if (typeof props === "object") {
            $.each(props, function(key, value) {
                $element.data().props[key] = value;
            });
        }
        return $element.data().props;
    },
    updateState: function($element, state) {
        if (!$element.data().hasOwnProperty("state")) {
            $element.data().state = "";
        }
        if (typeof state === "string") {
            $element.data().state = state;
        }
        return $element.data().state;
    },
    createCollection: function(identifier, $element, options, state, props) {
        if (!YOI.elementCollection[identifier]) {
            YOI.elementCollection[identifier] = $([]);
        }
        if (!($element instanceof jQuery)) {
            YOI.elementCollection[identifier] = $("[yoi-" + identifier + "]");
            if (!YOI.elementCollection[identifier].length) return false;
            YOI.elementCollection[identifier].each(function() {
                var $this = $(this);
                YOI.updateOptions($this, options);
                YOI.updateState($this, state);
                YOI.updateProps($this, props);
            });
        } else if ($element instanceof jQuery && $element.length) {
            YOI.updateOptions($element, options);
            YOI.updateState($element, state);
            YOI.updateProps($element, props);
            YOI.elementCollection[identifier] = YOI.elementCollection[identifier].add($element);
        } else {
            return false;
        }
        return YOI.elementCollection[identifier];
    },
    destroyCollection: function(identifier) {
        YOI.elementCollection[identifier] = undefined;
    },
    bindAction: function($element, yoiAction) {
        if ($element.data().props.hasOwnProperty(yoiAction)) return false;
        var params = YOI.toObject($element.attr(yoiAction));
        var action = params["action"] || Object.keys(params)[0] || "";
        var hostObject = action.split(".")[0] || false;
        var publicFunction = action.split(".")[1] || false;
        var event = params.on || "click";
        var options = {};
        var $target = $(params[action]);
        var $trigger = params.hasOwnProperty("trigger") ? $(params.trigger) : $element;
        switch (params[action]) {
          case "self":
            $target = $element;
            break;

          case "parent":
            $target = $element.parent();
            break;
        }
        if (typeof params === "object") {
            $.map(params, function(value, key) {
                if (key !== action && key !== "on") {
                    options[key] = value;
                }
            });
        }
        if (hostObject && publicFunction && typeof YOI["component"][hostObject][publicFunction] === "function") {
            $trigger.on(event, function(e) {
                e.preventDefault();
                YOI["component"][hostObject][publicFunction]($target);
            });
        }
        if (typeof YOI["action"][action] === "function") {
            $trigger.on(event, function(e) {
                e.preventDefault();
                YOI["action"][action]($trigger, $target, options);
            });
        }
        $element.data().props[yoiAction] = true;
    },
    mapActions: function() {
        $("[yoi-action], [yoi-action-1], [yoi-action-2], [yoi-action-3], [yoi-action-4]").each(function() {
            var $this = $(this);
            YOI.updateProps($this);
            if ($this.is("[yoi-action]")) YOI.bindAction($this, "yoi-action");
            if ($this.is("[yoi-action-1]")) YOI.bindAction($this, "yoi-action-1");
            if ($this.is("[yoi-action-2]")) YOI.bindAction($this, "yoi-action-2");
            if ($this.is("[yoi-action-3]")) YOI.bindAction($this, "yoi-action-3");
            if ($this.is("[yoi-action-4]")) YOI.bindAction($this, "yoi-action-4");
        });
    },
    setReady: function($element) {
        $element.data().initialized = true;
    },
    isReady: function($element) {
        var state;
        if ($element.data().initialized) {
            state = true;
        } else {
            state = false;
        }
        return state;
    },
    initialize: function() {
        $.each(YOI.component, function() {
            if (this.hasOwnProperty("init")) this.init();
        });
        $.each(YOI.action, function() {
            if (this.hasOwnProperty("init")) this.init();
        });
        $.each(YOI.behaviour, function() {
            if (this.hasOwnProperty("init")) this.init();
        });
        $.each(YOI.module, function() {
            if (this.hasOwnProperty("init")) this.init();
        });
        YOI.mapActions();
    }
};

$(function() {
    if (YOI.component.Code) YOI.component.Code.initialize();
    YOI.initialize();
});

YOI.behaviour.Dismiss = function() {
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
        var $dismissableElement = YOI.createCollection("dismiss", $dismissableElement, options);
        if ($dismissableElement) $dismissableElement.each(function() {
            if ($(this).data().props.isDismissable) return;
            var $thisDismissableElement = $(this);
            var positionStatic = $thisDismissableElement.css("position") === "static";
            var options = options || $thisDismissableElement.data().options;
            if (positionStatic) $thisDismissableElement.css("position", "relative");
            $btnDismiss.clone().on("click", function(e) {
                e.preventDefault();
                dismiss($(this).parent());
            }).appendTo($thisDismissableElement);
            $(this).data().props.isDismissable = true;
        });
    }
    function dismiss($targetElement) {
        if (!($targetElement instanceof jQuery)) return false;
        $targetElement.fadeOut(function() {
            $targetElement.trigger("yoi-dismiss");
        });
    }
    return {
        init: initialize
    };
}();

YOI.behaviour.Lazyload = function() {
    function initialize($lazyload, options) {
        var $lazyload = YOI.createCollection("lazyload", $lazyload, options);
        if ($lazyload) $lazyload.each(function() {
            if ($(this).data().props.isLazyloading) return;
            makeLazyload($(this));
            $(this).data().props.isLazyloading = true;
        });
    }
    function makeLazyload($noscriptElement) {
        var $placeHolder = $('<img class="lazyLoadPlaceHolder" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />');
        var options = $noscriptElement.data().options;
        var defaultImage = options.src || extractImgSrcFromString($noscriptElement.html()) || false;
        var width = options.width || false;
        var height = options.height || false;
        var alt = options.alt || false;
        var title = options.title || false;
        var longdesc = options.longdesc || false;
        var cssClasses = options.cssClasses || false;
        if (!defaultImage || !YOI.foundModule("ScrollAgent")) {
            return false;
        }
        $placeHolder.insertAfter($noscriptElement);
        $placeHolder = $noscriptElement.next(".lazyLoadPlaceHolder");
        YOI.module.ScrollAgent.init($placeHolder);
        if (width) $placeHolder.attr("width", width);
        if (height) $placeHolder.attr("height", height);
        if (cssClasses) $placeHolder.addClass(cssClasses);
        $placeHolder.one("yoi-viewport-in.lazyLoad", function() {
            var imageUrl;
            var currentBreakPoint = YOI.currentBreakPoint();
            var breakPointSmall = YOI.stringContains(currentBreakPoint, "small");
            var breakPointMedium = YOI.stringContains(currentBreakPoint, "medium");
            var breakPointLarge = YOI.stringContains(currentBreakPoint, "large");
            var breakPointXlarge = YOI.stringContains(currentBreakPoint, "xlarge");
            if (breakPointSmall) imageUrl = options.srcSmall;
            if (breakPointMedium) imageUrl = options.srcMedium;
            if (breakPointLarge) imageUrl = options.srcLarge;
            if (breakPointXlarge) imageUrl = options.srcXlarge;
            imageUrl = imageUrl || defaultImage;
            var $newImage = $("<img />");
            if (width) $newImage.attr("width", width);
            if (height) $newImage.attr("height", height);
            if (alt) $newImage.attr("alt", alt);
            if (title) $newImage.attr("title", title);
            if (longdesc) $newImage.attr("longdesc", longdesc);
            if (cssClasses) $newImage.addClass(cssClasses);
            $newImage.on("load.yoi-lazyLoad", function() {
                $(this).addClass("fx-fade-in");
            }).attr("src", imageUrl).addClass("fx-fade-in-initial").insertAfter($noscriptElement);
            if ($newImage[0].complete) {
                $newImage.trigger("load");
            }
            $placeHolder.removeClass(cssClasses).css({
                width: 0,
                height: 0
            });
        });
    }
    function extractImgSrcFromString(input) {
        var output = input.split('src="')[1].split('"')[0];
        return output;
    }
    return {
        init: initialize
    };
}();

YOI.behaviour.Parallax = function() {
    var $window = $(window);
    var $activeParallaxElements = $();
    var currentScrollTop = 0;
    var defaultFactor = 8;
    var initialized = false;
    function initialize($parallaxElement, options) {
        var $parallaxElement = YOI.createCollection("parallax", $parallaxElement, options);
        if ($parallaxElement) {
            $parallaxElement.each(function() {
                var $this = $(this);
                if ($this.data().props.isParallax) return;
                $activeParallaxElements = $activeParallaxElements.add($this);
                update($this);
                $this.data().props.isParallax = true;
            });
            resetScroll();
            if (initialized) return;
            $window.on("yoi-pageheight-change.parallax", function() {
                updateParallaxEnv();
                updateAll();
            }).on("yoi-scroll.parallax", function() {
                updateParallaxEnv();
                scrollParallax();
            });
            initialized = true;
        }
    }
    function update($parallaxElement) {
        var data = $parallaxElement.data();
        if (!data.props.isParallax) {
            YOI.module.ScrollAgent.init($parallaxElement);
        }
        if (data.state !== "out") {
            $parallaxElement.data().props.startsInViewport = true;
        }
    }
    function reset($parallaxElement) {
        $parallaxElement.data().props = {};
    }
    function updateAll() {
        YOI.elementCollection["parallax"].each(function() {
            update($(this));
        });
    }
    function scrollParallax() {
        if (scrollOvershoot()) return;
        window.requestAnimationFrame(function() {
            $activeParallaxElements.each(function() {
                var $this = $(this);
                var data = $this.data();
                var state = data.state;
                var initialPosY = data.props.initialPosY;
                var factor = data.options.factor || defaultFactor;
                var scrollTopInViewport = initialPosY - (currentScrollTop + viewportHeight);
                var parallaxOffset = data.props.startsInViewport ? parseInt(currentScrollTop / factor, 10) : parseInt(scrollTopInViewport / factor, 10);
                if (state !== "out") {
                    $this.css("transform", "translate3d(0, " + parallaxOffset + "px, 1px)");
                }
            });
        });
    }
    function resetScroll() {
        $("body").scrollTop(0);
        $window.on("unload.yoi-parallax", function() {
            $window.scrollTop(0);
        });
    }
    function updateParallaxEnv() {
        currentScrollTop = $window.scrollTop();
        viewportHeight = $window.height();
    }
    function scrollOvershoot() {
        return $window.scrollTop() + $window.height() > $(document).height() || $window.scrollTop() < 0;
    }
    function destroy() {
        $window.off("yoi-pageheight-change.parallax yoi-scroll.parallax");
    }
    return {
        init: initialize
    };
}();

YOI.behaviour.ScrollFx = function() {
    function initialize($targetElement, options) {
        var $targetElement = YOI.createCollection("scrollfx", $targetElement, options);
        if ($targetElement) $targetElement.each(function() {
            var $thisTargetElement = $(this);
            if ($thisTargetElement.data().props.hasScrollFx) return;
            prepare($thisTargetElement);
            listen($thisTargetElement);
            $thisTargetElement.data().props.hasScrollFx = true;
        });
        YOI.module.ScrollAgent.init($targetElement, options);
    }
    function prepare($targetElement) {
        var options = $targetElement.data().options;
        var inFx = options.in || false;
        var bottomFx = options.bottom || false;
        var centerFx = options.center || false;
        var topFx = options.top || false;
        if (inFx) $targetElement.addClass("fx-" + inFx + "-initial");
        if (bottomFx) $targetElement.addClass("fx-" + bottomFx + "-initial");
        if (centerFx) $targetElement.addClass("fx-" + centerFx + "-initial");
        if (topFx) $targetElement.addClass("fx-" + topFx + "-initial");
        $targetElement.removeClass("fx-" + inFx);
        $targetElement.removeClass("fx-" + bottomFx);
        $targetElement.removeClass("fx-" + centerFx);
        $targetElement.removeClass("fx-" + topFx);
    }
    function listen($targetElement) {
        var options = $targetElement.data().options;
        var inFx = options.in || false;
        var bottomFx = options.bottom || false;
        var centerFx = options.center || false;
        var topFx = options.top || false;
        var speed = options.speed || false;
        var repeat = options.repeat || true;
        if (repeat !== "false") {
            $targetElement.on("yoi-viewport-in.scrollFx", function() {
                applyFx($targetElement, inFx, speed);
            });
            $targetElement.on("yoi-viewport-bottom.scrollFx", function() {
                applyFx($targetElement, bottomFx, speed);
            });
            $targetElement.on("yoi-viewport-center.scrollFx", function() {
                applyFx($targetElement, centerFx, speed);
            });
            $targetElement.on("yoi-viewport-top.scrollFx", function() {
                applyFx($targetElement, topFx, speed);
            });
            $targetElement.on("yoi-viewport-out.scrollFx", function() {
                prepare($targetElement);
            });
        } else {
            $targetElement.one("yoi-viewport-in.scrollFx", function() {
                applyFx($targetElement, inFx, speed);
            });
            $targetElement.one("yoi-viewport-bottom.scrollFx", function() {
                applyFx($targetElement, bottomFx, speed);
            });
            $targetElement.one("yoi-viewport-center.scrollFx", function() {
                applyFx($targetElement, centerFx, speed);
            });
            $targetElement.one("yoi-viewport-top.scrollFx", function() {
                applyFx($targetElement, topFx, speed);
            });
        }
    }
    function applyFx($targetElement, fx, speed) {
        if (fx) {
            $targetElement.removeClass("fx-" + fx + "-initial");
            $targetElement.addClass("fx-" + fx);
        }
        if (speed) {
            $targetElement.addClass("fx-" + speed);
        }
    }
    return {
        init: initialize
    };
}();

YOI.behaviour.Sticky = function() {
    var $body = $("body");
    var $window = $(window);
    function initialize($stickyElement, options) {
        var $stickyElement = YOI.createCollection("sticky", $stickyElement, options);
        if ($stickyElement) $stickyElement.each(function(index) {
            var $thisStickyElement = $(this);
            if ($thisStickyElement.data().props.isSticky) return;
            if ($thisStickyElement.css("position") === "fixed" || $stickyElement.css("transform") !== "none") return;
            transformStickyElement($thisStickyElement, index);
            updateStickyElementProps($thisStickyElement);
            $thisStickyElement.data().props.isSticky = true;
        });
        if ($stickyElement) startPositionObserver();
        if ($stickyElement) startStickObserver();
    }
    function transformStickyElement($stickyElement, index) {
        var $stickyPlaceholder = $('<div id="stickyPlaceholder-' + index + '"></div>');
        var $stickyWrapper = $('<div class="stickyWrapper"></div>');
        var stickyElementCssPos = $stickyElement.css("position");
        var stickyElementCssLeft = $stickyElement.css("left");
        var stickyElementCssTop = $stickyElement.css("top");
        var stickyElementCSSMargin = $stickyElement.css("margin");
        if (stickyElementCssPos !== "static") {
            $stickyWrapper.css({
                position: stickyElementCssPos,
                top: stickyElementCssTop,
                left: stickyElementCssLeft
            });
            $stickyElement[0].style.setProperty("position", "static", "important");
        } else {
            $stickyWrapper.css({
                position: "relative"
            });
        }
        $stickyPlaceholder.css({
            margin: stickyElementCSSMargin,
            width: $stickyElement.outerWidth(),
            height: $stickyElement.outerHeight(),
            display: "none"
        });
        $($stickyElement).wrap($stickyWrapper);
        $stickyPlaceholder.insertAfter($stickyElement);
    }
    function resetStickyElement($stickyElement, index) {
        $("#stickyPlaceholder-" + index).remove();
        $stickyElement.data().props = {};
        $stickyElement.removeAttr("style");
        $stickyElement.unwrap(".stickyWrapper");
    }
    function updateStickyElementProps($stickyElement) {
        var activeBreakpoint = YOI.currentBreakPoint();
        var data = $stickyElement.data();
        var options = data.options;
        var $referenceElement = options.reference === "parent" ? $stickyElement.parent().parent() : $(options.reference).first();
        var stickyElementHeight = $stickyElement.outerHeight();
        var stickyElementWidth = $stickyElement.outerWidth();
        var stickyElementInitialTopPos = $stickyElement.offset().top;
        var topOffset = options.start !== undefined ? parseInt(options.start) : 0;
        var topDistance = options.stop !== undefined ? parseInt(options.stop) : 0;
        var stickStart = options.start !== undefined ? stickyElementInitialTopPos - topOffset : stickyElementInitialTopPos;
        var stickStop = options.stop !== undefined ? stickyElementInitialTopPos + topDistance - topOffset : $body.height();
        var not = options.not !== undefined ? options.not.split(",") : false;
        var allowedOnCurrentBreakpoint = $.inArray(activeBreakpoint, not) === -1;
        var passedValidation = validInput($stickyElement) && validHeight($stickyElement) && allowedOnCurrentBreakpoint;
        if ($referenceElement.length) {
            stickStart = $referenceElement.offset().top - topOffset;
            stickStop = stickStart + $referenceElement.outerHeight() - stickyElementHeight - topDistance;
        }
        if ($referenceElement.length && options.reference === "parent") {
            stickStart = stickStart + parseInt($referenceElement.css("paddingTop"));
            stickStop = stickStop - parseInt($referenceElement.css("paddingBottom")) + topDistance;
        }
        data.props.passedValidation = passedValidation;
        data.props.height = stickyElementHeight;
        data.props.width = stickyElementWidth;
        data.props.initialTopPos = stickyElementInitialTopPos;
        data.props.topOffset = topOffset;
        data.props.topDistance = topDistance;
        data.props.stickStart = stickStart;
        data.props.stickStop = stickStop;
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
    function validHeight($stickyElement) {
        if ($stickyElement.outerHeight() > $window.height()) {
            return false;
        } else {
            return true;
        }
    }
    function positionObserver() {
        YOI.elementCollection["sticky"].each(function(index) {
            var $stickyElement = $(this);
            var passedValidation = validInput($stickyElement) && validHeight($stickyElement);
            resetStickyElement($stickyElement, index);
            if (passedValidation) transformStickyElement($stickyElement, index);
            updateStickyElementProps($stickyElement);
            $window.trigger("yoi-scroll.sticky");
        });
    }
    function startPositionObserver() {
        $window.on("yoi-breakpoint-change.sticky yoi-pageheight-change.sticky", function() {
            positionObserver();
        });
    }
    function stickObserver() {
        var scrollTop = $window.scrollTop();
        YOI.elementCollection["sticky"].each(function(index) {
            var $stickyElement = $(this);
            var $stickyPlaceholder = $("#stickyPlaceholder-" + index);
            var props = $stickyElement.data().props;
            var stickyElementInitialTopPos = props.initialTopPos;
            var stickStart = props.stickStart;
            var stickStop = props.stickStop;
            var topOffset = props.topOffset;
            var passedValidation = props.passedValidation;
            var cssPositionValue;
            var cssTopValue;
            var stickyPlaceholderDisplay;
            if (passedValidation) {
                if (scrollTop < stickStart) {
                    cssPositionValue = "static";
                    cssTopValue = 0;
                    stickyPlaceholderDisplay = "none";
                    $stickyElement.trigger("yoi-stick-stop");
                } else if (scrollTop > stickStop) {
                    cssPositionValue = "absolute";
                    cssTopValue = stickStop - stickyElementInitialTopPos + topOffset;
                    stickyPlaceholderDisplay = "block";
                    $stickyElement.trigger("yoi-stick-stop");
                } else {
                    cssPositionValue = "fixed";
                    cssTopValue = 0 + topOffset;
                    stickyPlaceholderDisplay = "block";
                    $stickyElement.trigger("yoi-stick-start");
                }
                $stickyElement[0].style.setProperty("position", cssPositionValue, "important");
                $stickyElement.css({
                    top: cssTopValue,
                    "backface-visibility": "hidden",
                    "z-index": 1001
                });
                $stickyPlaceholder.css({
                    display: stickyPlaceholderDisplay
                });
            }
        });
    }
    function startStickObserver() {
        $window.on("yoi-scroll.sticky", function() {
            stickObserver();
        });
    }
    function destroy() {
        $window.off("yoi-scroll.sticky yoi-breakpoint-change.sticky yoi-pageheight-change.sticky");
        YOI.elementCollection["sticky"].each(function() {
            resetStickyElement($(this));
        });
        YOI.destroyCollection("sticky");
    }
    return {
        init: initialize,
        destroy: destroy
    };
}();

YOI.action.Blink = function($trigger, $target, options) {
    if ($target instanceof jQuery) {
        YOI.blink($target, options.times);
    }
};

YOI.action.Hide = function($trigger, $target, options) {
    if ($target instanceof jQuery) {
        var fx = options.fx || false;
        var speed = options.speed || false;
        var remove = options.remove || false;
        if (fx && speed) $target.addClass("fx-" + speed);
        if (remove === "true") {
            if (fx) {
                $target.addClass("fx-" + fx).on("animationend", function() {
                    $target.remove().trigger("yoi-remove");
                });
            } else {
                $target.remove().trigger("yoi-remove");
            }
        } else {
            if (fx) {
                $target.addClass("fx-" + fx).on("animationend", function() {
                    $target.hide().trigger("yoi-hide");
                });
            } else {
                $target.hide().trigger("yoi-hide");
            }
        }
    }
};

YOI.action.Hide.init = function() {
    var selectors = '        [yoi-action*="Hide"],        [yoi-action-1*="Hide"],        [yoi-action-2*="Hide"],        [yoi-action-3*="Hide"],        [yoi-action-4*="Hide"]    ';
    $(selectors).each(function() {
        YOI.updateOptions($(this));
        var $this = $(this);
        var options = $this.data().options;
        var targetSelector = options.Hide;
        var fx = options.fx || false;
        var $target;
        switch (targetSelector) {
          case "self":
            $target = $this;
            break;

          case "parent":
            $target = $this.parent();
            break;

          default:
            $target = $(targetSelector);
        }
        if ($target instanceof jQuery) {
            $target.removeClass(function(index, className) {
                return (className.match(/(^|\s)fx-\S+/g) || []).join(" ");
            });
            if (fx) {
                $target.addClass("fx-" + fx + "-initial").removeClass("fx-" + fx);
            }
            $target.show();
        }
    });
};

YOI.action.Pulse = function($trigger, $target, options) {
    if ($target instanceof jQuery) {
        YOI.pulse($target, options.times);
    }
};

YOI.action.ScrollTo = function($trigger, $target, options) {
    if ($target instanceof jQuery) {
        var $document = $(document);
        var scrollRoot = document.scrollingElement || document.documentElement;
        var $scrollContext;
        var $scrollContainer = $target.closest(".scr-y") || false;
        var offset = options.offset || 20;
        var highlight = options.highlight || false;
        var scrollPosY;
        if ($target.hasClass("tabs__page") && YOI.foundComponent("Tabs")) {
            YOI.component.Tabs.switchTo(targetId);
        }
        if ($scrollContainer.length) {
            scrollPosY = "+=" + $target.position().top;
            $scrollContext = $target.closest(".scr-y");
        } else {
            scrollPosY = $target.offset().top - offset;
            $scrollContext = $(scrollRoot);
        }
        $document.trigger("yoi-scrollto-start");
        $.when($scrollContext.stop().animate({
            scrollTop: scrollPosY
        }, 500)).done(function() {
            if (highlight === "blink") YOI.blink($target);
            if (highlight === "pulse") YOI.pulse($target);
            $document.trigger("yoi-scrollto-end");
        });
    }
};

YOI.action.Show = function($trigger, $target, options) {
    if ($target instanceof jQuery) {
        var fx = options.fx || false;
        var speed = options.speed || false;
        if (fx) $target.addClass("fx-" + fx);
        if (fx && speed) $target.addClass("fx-" + speed);
        $target.show().trigger("yoi-show");
    }
};

YOI.action.Show.init = function() {
    var selectors = '        [yoi-action*="Show"],        [yoi-action-1*="Show"],        [yoi-action-2*="Show"],        [yoi-action-3*="Show"],        [yoi-action-4*="Show"]    ';
    $(selectors).each(function() {
        YOI.updateOptions($(this));
        var $this = $(this);
        var options = $this.data().options;
        var targetSelector = options.Show;
        var fx = options.fx || false;
        var $target;
        switch (targetSelector) {
          case "self":
            $target = $this;
            break;

          case "parent":
            $target = $this.parent();
            break;

          default:
            $target = $(targetSelector);
        }
        if ($target instanceof jQuery) {
            $target.removeClass(function(index, className) {
                return (className.match(/(^|\s)fx-\S+/g) || []).join(" ");
            });
            if (fx) {
                $target.addClass("fx-" + fx + "-initial").removeClass("fx-" + fx);
            }
            $target.hide();
        }
    });
};

YOI.action.Update = function($trigger, $target, options) {
    if ($target instanceof jQuery) {
        var requestType = options.type || false;
        var requestUrl = options.url || false;
        var filter = options.filter || "#yoi-update-src";
        var language = YOI.locale();
        var localization = {
            en: {
                errorTitle: "Error",
                errorMsg: "Could not load the requested data."
            },
            de: {
                errorTitle: "Fehler",
                errorMsg: "Leider konnte der angeforderte Inhalt nicht geladen werden."
            }
        };
        var $errorMsg = $('            <div class="note note--negative note--large b-0 p-4">                <p class="note__body"><b>' + localization[language].errorTitle + ":</b> " + localization[language].errorMsg + "</p>            </div>        ");
        var $spinner = $('<span class="spinner"></span>');
        if (requestType && (requestType.toLowerCase() === "get" || requestType.toLowerCase() === "post")) {
            requestType = requestType.toUpperCase();
        } else {
            requestType = "GET";
        }
        if (requestUrl) {
            $.ajax({
                url: requestUrl,
                cache: false,
                type: requestType,
                beforeSend: function() {
                    $target.append($spinner.clone()).trigger("yoi-update-before");
                },
                error: function() {
                    $target.html($errorMsg.clone()).trigger("yoi-update-error");
                },
                success: function(data) {
                    var $response = $(data).filter(filter);
                    $target.html($response).trigger("yoi-update-success");
                }
            });
        }
    }
};

YOI.module.BrowserHistory = function() {
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

YOI.module.KeyboardAgent = function() {
    var $document = $(document);
    var initialized = false;
    var keys = {
        38: "arrowup",
        39: "arrowright",
        40: "arrowdown",
        37: "arrowleft",
        13: "enter",
        32: "space",
        27: "escape",
        9: "tab"
    };
    function initialize() {
        if (!initialized) $document.on("keyup.yoi-keyboardAgent", function(e) {
            var keyCode = e.which;
            if (keys[keyCode] !== undefined) $document.trigger("yoi-keypressed-" + keys[keyCode]);
        });
        $document.on("focusin.yoi-keyboardAgent focusout.yoi-keyboardAgent", function() {
            $document.trigger("yoi-focus-change");
        });
        initialized = true;
    }
    function addTabFocus($elements) {
        $elements.attr("tabindex", "0");
        $document.on("yoi-keypressed-tab.keyboardAgent", function() {
            var $activeElement = $(document.activeElement);
            $elements.removeClass("tabFocus");
            if ($activeElement.is($elements)) {
                $activeElement.addClass("tabFocus").on("blur.yoi-keyboardAgent", function() {
                    $activeElement.removeClass("tabFocus");
                });
            }
        });
    }
    initialize();
    return {
        init: initialize,
        addTabFocus: addTabFocus
    };
}();

YOI.module.Resizeagent = function() {
    var $document = $(document);
    var $window = $(window);
    var $body = $("body");
    var initialized = false;
    var lastBreakPoint;
    var activeBreakPoint;
    var lastPageHeight;
    var currentPageHeight;
    function initialize() {
        if (initialized) return false;
        $window.on("resize.yoi-resizeAgent", function() {
            reportResizeChange();
            reportBreakPointChange();
        });
        $document.ready(function() {
            observePageHeightChange();
        });
        initialized = true;
    }
    function reportResizeChange() {
        YOI.clearDelay("reportResizeChangeDelay");
        YOI.setDelay("reportResizeChangeDelay", 250, function() {
            $window.trigger("yoi-resize");
        });
    }
    function reportBreakPointChange() {
        activeBreakPoint = YOI.currentBreakPoint();
        if (activeBreakPoint !== lastBreakPoint) {
            YOI.clearDelay("reportBreakPointChangeDelay");
            YOI.setDelay("reportBreakPointChangeDelay", 250, function() {
                $window.trigger("yoi-breakpoint-change");
                $window.trigger("yoi-breakpoint-" + activeBreakPoint);
            });
            lastBreakPoint = activeBreakPoint;
        }
    }
    function observePageHeightChange() {
        lastPageHeight = $body.height();
        YOI.setInterval("reportPageHeightChangeInterval", 1e3, function() {
            currentPageHeight = $body.height();
            if (currentPageHeight !== lastPageHeight) {
                $window.trigger("yoi-pageheight-change");
                lastPageHeight = $body.height();
            }
        });
    }
    return {
        init: initialize
    };
}();

YOI.module.ScrollAgent = function() {
    var $window = $(window);
    var $activeTargetElements;
    var viewportHeight = $window.height();
    var currentScrollTop;
    var lastScrollTop = 0;
    var initialized = false;
    function initialize($targetElement) {
        var $targetElement = YOI.createCollection("scrollagent", $targetElement);
        if ($targetElement) {
            $activeTargetElements = $targetElement;
            update();
            if (!initialized) {
                $window.on("load.yoi-scrollAgent resize.yoi-scrollAgent yoi-pageheight-change.scrollAgent", function() {
                    update();
                }).on("yoi-scroll.scrollAgent", function() {
                    observe();
                });
                initialized = true;
            }
        }
        $window.off("scroll.yoi-scrollAgent").on("scroll.yoi-scrollAgent", function() {
            broadcast();
        });
    }
    function update() {
        viewportHeight = $window.height();
        $activeTargetElements.each(function() {
            var $thisTargetElement = $(this);
            var thisHeight = $thisTargetElement.outerHeight();
            var thisInitialPosY = $thisTargetElement.offset().top;
            var props = $thisTargetElement.data().props;
            props.height = thisHeight;
            props.initialPosY = thisInitialPosY;
            if ($window.scrollTop() < thisInitialPosY && $window.height() > thisInitialPosY + 10) {
                $thisTargetElement.data().state = "in";
                $thisTargetElement.trigger("yoi-viewport-in");
            } else {
                $thisTargetElement.data().state = "out";
            }
        });
    }
    function observe() {
        currentScrollTop = $window.scrollTop();
        $activeTargetElements.each(function(index) {
            var $targetElement = $(this);
            var state = $targetElement.data().state;
            var initialPosY = $targetElement.data().props.initialPosY;
            var height = $targetElement.data().props.height;
            var transformY = parseFloat($targetElement.css("transform").split(",")[13], 10) || 0;
            var viewportIn;
            var viewportBottom;
            var viewportCenter;
            var viewportTop;
            var viewportOut;
            viewportIn = currentScrollTop + viewportHeight > initialPosY + transformY && currentScrollTop < initialPosY + height + transformY;
            viewportBottom = currentScrollTop + viewportHeight > initialPosY + height + transformY;
            viewportCenter = currentScrollTop + viewportHeight / 2 > initialPosY + transformY && currentScrollTop + viewportHeight < initialPosY + height + transformY + viewportHeight / 2;
            viewportTop = currentScrollTop >= initialPosY;
            viewportOut = !viewportIn;
            if (viewportIn && state === "out") {
                $targetElement.trigger("yoi-viewport-in");
                $targetElement.data().state = "in";
            }
            if (viewportBottom && state === "in") {
                $targetElement.trigger("yoi-viewport-bottom");
                $targetElement.data().state = "bottom";
            }
            if (viewportCenter && (state === "top" || state === "bottom")) {
                $targetElement.trigger("yoi-viewport-center");
                $targetElement.data().state = "center";
            }
            if (viewportTop && (state === "in" || state === "center")) {
                $targetElement.trigger("yoi-viewport-top");
                $targetElement.data().state = "top";
            }
            if (viewportOut && !(state === "out")) {
                $targetElement.trigger("yoi-viewport-out");
                $targetElement.data().state = "out";
            }
        });
    }
    function broadcast() {
        var isScrolling = false;
        if (typeof window["scrollObserverInterval"] !== "number") {
            YOI.setInterval("scrollObserverInterval", 10, function() {
                $window.trigger("yoi-scroll");
                if (!isScrolling) {
                    $window.trigger("yoi-scroll-start");
                    isScrolling = true;
                }
                var currentScrollTop = $window.scrollTop();
                if (currentScrollTop < lastScrollTop) $window.trigger("yoi-scroll-up");
                if (currentScrollTop > lastScrollTop) $window.trigger("yoi-scroll-down");
                lastScrollTop = currentScrollTop;
            });
        }
        YOI.clearDelay("scrollObserverDelay");
        YOI.setDelay("scrollObserverDelay", 250, function() {
            $window.trigger("yoi-scroll-stop");
            YOI.clearInterval("scrollObserverInterval");
            isScrolling = false;
        });
    }
    function ignore($targetElement) {
        YOI.elementCollection["scrollagent"].each(function() {
            var $this = $(this);
            if ($this.is($targetElement)) {}
        });
    }
    return {
        init: initialize
    };
}();

YOI.component.Accordion = function() {
    var keyboardEventsAdded = false;
    function initialize($accordion, options) {
        var $accordion = YOI.createCollection("accordion", $accordion, options);
        if ($accordion) $accordion.each(function() {
            if (YOI.isReady($(this))) return false;
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
            YOI.setReady($(this));
        });
        if (!keyboardEventsAdded) addKeyboardEvents();
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
            $thisSection.trigger("yoi-accordion-done");
        });
        $thisSection.trigger("yoi-accordion-open");
        $thisSection.data().state = "open";
    }
    function closeSection($section) {
        var $thisSection = $section;
        var $thisBody = $section.find(".accordion__body");
        $thisSection.removeClass("is--open").addClass("is--closed").promise().then(function() {
            $thisSection.trigger("yoi-accordion-done");
        });
        $thisBody.stop().slideUp("fast");
        $thisSection.trigger("yoi-accordion-close");
        $thisSection.data().state = "closed";
    }
    function closeAllSections($accordion) {
        var $targets;
        if ($accordion === undefined) {
            $targets = $("[yoi-accordion] .accordion__section");
        } else {
            $targets = $(".accordion__section");
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
            $targets = $(".accordion__section");
        }
        $targets.each(function() {
            openSection($(this));
        });
    }
    function addKeyboardEvents() {
        if (YOI.foundModule("KeyboardAgent") && !keyboardEventsAdded) {
            YOI.module.KeyboardAgent.addTabFocus($(".accordion__header"));
            $document.on("yoi-keypressed-enter", function() {
                var $activeElement = $(document.activeElement);
                if ($activeElement.is(".accordion__header")) {
                    toggleSection($activeElement.closest(".accordion__section"));
                }
            });
        }
        keyboardEventsAdded = true;
    }
    return {
        init: initialize,
        close: closeSection,
        open: openSection,
        closeAll: closeAllSections,
        openAll: openAllSections,
        toggle: toggleSection
    };
}();

YOI.component.Code = function() {
    function initialize() {
        var $codeWrapper = $('div[class*="highlighter"]');
        var tabPageIndex = 0;
        if ($codeWrapper) $codeWrapper.each(function(index) {
            if (YOI.isReady($(this))) return false;
            var $thisCodeWrapper = $(this);
            var $thisCode = $thisCodeWrapper.find("code");
            var exampleTag = "\x3c!-- example --\x3e";
            var exampleTagTabbed = "\x3c!-- example:tabs --\x3e";
            var thisExample = $thisCode.text().split(exampleTag).length > 1 ? $thisCode.text().split(exampleTag)[1] : false;
            var thisExampleTabbed = $thisCode.text().split(exampleTagTabbed).length > 1 ? $thisCode.text().split(exampleTagTabbed)[1] : false;
            var markup;
            if (thisExampleTabbed) {
                var firstIndex = ++tabPageIndex;
                var secondIndex = ++tabPageIndex;
            }
            if (thisExample) {
                $thisCode.find('.c:contains("' + exampleTag + '")').remove();
                markup = '<div class="code__example">';
                markup += '<div class="code__result">';
                markup += thisExample;
                markup += "</div>";
                markup += '<div class="code__source">';
                markup += $thisCodeWrapper.html();
                markup += "</div>";
                markup += "</div>";
            }
            if (thisExampleTabbed) {
                $thisCode.find('.c:contains("' + exampleTagTabbed + '")').remove();
                markup = '<div class="code__example tabs">';
                markup += '<div class="tabs__menu tabs__menu--loose" yoi-tabs>';
                markup += '<ul class="tabs__items">';
                markup += '<li class="tabs__item">';
                markup += '<a class="tabs__link" href="#exampleTab-' + firstIndex + '">Example</a>';
                markup += "</li>";
                markup += '<li class="tabs__item">';
                markup += '<a class="tabs__link" href="#exampleTab-' + secondIndex + '">Code</a>';
                markup += "</li>";
                markup += "</ul>";
                markup += "</div>";
                markup += '<div id="exampleTab-' + firstIndex + '" class="tabs__page code__result">';
                markup += thisExampleTabbed;
                markup += "</div>";
                markup += '<div id="exampleTab-' + secondIndex + '" class="tabs__page code__source">';
                markup += $thisCodeWrapper.html();
                markup += "</div>";
                markup += "</div>";
            }
            if (thisExample || thisExampleTabbed) {
                markup = addCopyBtn(markup);
            } else {
                markup = addCopyBtn($thisCodeWrapper);
            }
            if (thisExample || thisExampleTabbed) {
                $thisCodeWrapper.replaceWith(markup);
            }
            truncate(index);
            YOI.setReady($(this));
        });
    }
    function addCopyBtn(markup) {
        var copyToClipboardSupported = document.queryCommandSupported && document.queryCommandSupported("copy");
        if (!copyToClipboardSupported) return markup;
        var $markup = markup instanceof jQuery ? markup : $(markup);
        var $copyBtn = $('<button class="code__copyBtn btn btn--subtle">Copy</button>');
        var $codeSource = $markup.find(".code__source");
        var codeHasRenderedExample = $codeSource.length ? true : false;
        $copyBtn.on("click", function() {
            var $code = $copyBtn.parent().find("code").first();
            copyToClipBoard($code);
            YOI.blink($copyBtn);
        });
        if (codeHasRenderedExample) {
            $markup.find(".code__source").append($copyBtn);
        } else {
            $markup.append($copyBtn);
        }
        return $markup;
    }
    function copyToClipBoard($source) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents($source[0]);
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
    }
    function truncate(index) {
        var $thisCodeSource = $(".code__source").eq(index);
        var $thisCode = $thisCodeSource.find("code");
        if ($thisCodeSource.hasClass("tabs__page")) return false;
        var $expandBtn = $('<button class="code__expandBtn btn btn--subtle">Expand</button>');
        var codeHeight = $thisCode.height();
        var lineHeight = $thisCode.css("line-height");
        var maxCodeHeight = parseInt(lineHeight) * 5;
        $expandBtn.on("click", function(e) {
            e.preventDefault();
            var $this = $(this);
            if ($thisCode.is(".code__source--truncated")) {
                $thisCode.animate({
                    height: codeHeight
                }, 200, function() {
                    $thisCode.removeClass("code__source--truncated");
                    $this.text("Collapse");
                });
            } else {
                $thisCode.animate({
                    height: maxCodeHeight
                }, 200, function() {
                    $thisCode.addClass("code__source--truncated");
                    $this.text("Expand");
                });
            }
        });
        if (codeHeight > maxCodeHeight) {
            $thisCode.height(maxCodeHeight);
            $thisCode.addClass("code__source--truncated");
            $thisCodeSource.append($expandBtn);
        }
    }
    return {
        initialize: initialize
    };
}();

YOI.component.Countdown = function() {
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
            if (YOI.isReady($(this))) return false;
            var $thisCountdown = $(this);
            var options = $thisCountdown.data().options;
            var defaultYear = new Date().getFullYear();
            var defaultMonth = 1;
            var defaultDay = 1;
            var defaultHour = 12;
            var defaultMinute = 0;
            var defaultSecond = 0;
            var year = options.year === undefined ? defaultYear : parseInt(options.year);
            var month = options.month === undefined || parseInt(options.month) > 12 || parseInt(options.month) < 1 ? defaultMonth : parseInt(options.month);
            var day = options.day === undefined || parseInt(options.day) > 31 || parseInt(options.day) < 1 ? defaultDay : parseInt(options.day);
            var hour = options.hour === undefined || parseInt(options.hour) > 12 || parseInt(options.hour) < 1 ? defaultHour : parseInt(options.hour);
            var minute = options.minute === undefined || parseInt(options.minute) > 60 || parseInt(options.minute) < 1 ? defaultMinute : parseInt(options.minute);
            var second = options.second === undefined || parseInt(options.second) > 60 || parseInt(options.second) < 1 ? defaultSecond : parseInt(options.second);
            $thisCountdown.data().props = {
                endTime: getDateString(month, day, year, hour, minute, second),
                index: index
            };
            render($thisCountdown);
            YOI.setInterval("countdownTimer-" + index, 1e3, function() {
                update($thisCountdown);
            });
            YOI.setReady($(this));
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
            $thisCountdown.trigger("yoi-countdown-expire");
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
    function getDateString(month, day, year, hour, minute, second) {
        var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var endTimeIsoString = months[month - 1] + " " + day + " " + year + " " + hour + ":" + minute + ":" + second;
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

YOI.component.DatePicker = function() {
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
            if (YOI.isReady($(this))) return false;
            var $thisDateInput = $(this);
            var options = $thisDateInput.data().options;
            var inputYear = options.year === undefined ? now.year : parseInt(options.year);
            var inputMonth = options.month === undefined ? now.month : parseInt(options.month - 1);
            var inputDay = options.day === undefined ? now.day : parseInt(options.day);
            updateDateInput($thisDateInput, inputYear, inputMonth, inputDay);
            var $thisDatePicker = renderDatePicker(inputYear, inputMonth, inputDay);
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
                    $document.trigger("yoi-datepicker-hide");
                });
            }).on("focus", function(e) {
                YOI.clearDelay("datePickerHideTimeout-" + index);
                hideAllDatePickers();
                var $thisDatePicker = placeDatePicker($thisDateInput.next(".datePicker"));
                $thisDatePicker.show();
                $document.trigger("yoi-datepicker-show");
            });
            YOI.setReady($(this));
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
        $document.trigger("yoi-datepicker-hide");
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

YOI.component.Dock = function() {
    function initialize($dock, options) {
        var $dock = YOI.createCollection("dock", $dock, options);
        if ($dock) $dock.each(function() {
            if (YOI.isReady($(this))) return false;
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
            YOI.setReady($(this));
        });
    }
    function hide($thisDock) {
        $thisDock.addClass("is--hidden");
        $thisDock.trigger("yoi-dock-hide");
        $thisDock.data().state = "hidden";
    }
    function show($thisDock) {
        $thisDock.removeClass("is--hidden");
        $thisDock.trigger("yoi-dock-show");
        $thisDock.data().state = "visible";
    }
    return {
        init: initialize,
        hide: hide,
        show: show
    };
}();

YOI.component.FilterBtns = function() {
    function initialize($filterBtns, options) {
        var $filterBtns = YOI.createCollection("filterbtns", $filterBtns, options);
        if ($filterBtns) $filterBtns.each(function() {
            if (YOI.isReady($(this))) return false;
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
            YOI.setReady($(this));
        });
    }
    function toggle($thisBtn) {
        var state = $thisBtn.data().state;
        if (state === "on") {
            $thisBtn.removeClass("is--active");
            $thisBtn.removeClass("filterBtns__btn--debounce");
            $thisBtn.trigger("yoi-filterbtn-on");
            $thisBtn.data().state = "off";
        }
        if (state === "off") {
            $thisBtn.addClass("is--active");
            $thisBtn.addClass("filterBtns__btn--debounce");
            $thisBtn.trigger("yoi-filterbtn-off");
            $thisBtn.data().state = "on";
        }
    }
    function remove($thisBtn) {
        $thisBtn.fadeOut("fast");
        $thisBtn.trigger("yoi-filterbtn-remove");
    }
    return {
        init: initialize
    };
}();

YOI.component.Flyout = function() {
    function initialize($flyout, options) {
        var $flyout = YOI.createCollection("flyout", $flyout, options);
        if ($flyout) $flyout.each(function() {
            if (YOI.isReady($(this))) return false;
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
            YOI.setReady($(this));
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
        $thisFlyout.removeClass("flyout--hidden").addClass("flyout--visible").trigger("yoi-flyout-visible");
        $thisFlyout.data().state = "visible";
    }
    function hide($thisFlyout) {
        $thisFlyout.removeClass("flyout--visible").addClass("flyout--hidden").trigger("yoi-flyout-hidden");
        $thisFlyout.data().state = "hidden";
    }
    return {
        init: initialize,
        toggle: toggle,
        show: show,
        hide: hide
    };
}();

YOI.component.CustomFormElements = function() {
    var $checkBoxWrapper = $('<span class="checkbox"></span>').on("click", function() {
        $(this).find("input").trigger("change");
    });
    var $radioBtnWrapper = $('<span class="radio"></span>').on("click", function() {
        $(this).find("input").trigger("change");
    });
    var $selectWrapper = $('<span class="select"></span>');
    var $selectIcon = $('<span class="select__icon"></span>');
    function initialize() {
        var $checkElemns = $('input[type="checkbox"]:not(.js-fallback, .switch *), input[type="radio"]:not(.js-fallback, .switch *, .pickBtn *)');
        var $checkBoxes = $('input[type="checkbox"]:not(.js-fallback, .switch *)');
        var $radioBtns = $('input[type="radio"]:not(.js-fallback, .switch *, .pickBtn *)');
        var $selects = $("select:not(.js-fallback)");
        $checkBoxes.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisCheckbox = $(this);
            var isWrappedInLabel = $thisCheckbox.parents().index("label");
            if (isWrappedInLabel === -1) {
                $thisCheckbox.wrap($checkBoxWrapper.clone(true));
            } else {
                $thisCheckbox.wrap($checkBoxWrapper.clone());
            }
            $thisCheckbox.on({
                focus: function() {
                    $thisCheckbox.parent().addClass("input--focus");
                    $thisCheckbox.trigger("yoi-input-focus");
                },
                blur: function() {
                    $thisCheckbox.parent().removeClass("input--focus");
                    $thisCheckbox.trigger("yoi-input-blur");
                },
                change: function(e) {
                    $thisCheckbox.parent().toggleClass("input--checked");
                    $thisCheckbox.trigger("yoi-input-change");
                }
            });
            YOI.setReady($(this));
        });
        $radioBtns.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisRadioBtn = $(this);
            var isWrappedInLabel = $thisRadioBtn.parents().index("label");
            if (isWrappedInLabel === -1) {
                $thisRadioBtn.wrap($radioBtnWrapper.clone(true));
            } else {
                $thisRadioBtn.wrap($radioBtnWrapper.clone());
            }
            $thisRadioBtn.on({
                focus: function() {
                    $thisRadioBtn.parent().addClass("input--focus");
                    $thisRadioBtn.trigger("yoi-input-focus");
                },
                blur: function() {
                    $thisRadioBtn.parent().removeClass("input--focus");
                    $thisRadioBtn.trigger("yoi-input-blur");
                },
                change: function(e) {
                    var groupName = $thisRadioBtn.attr("name");
                    var $groupedBtns = $('[name="' + groupName + '"]');
                    $groupedBtns.parent().removeClass("input--checked");
                    $thisRadioBtn.parent().addClass("input--checked");
                    $thisRadioBtn.trigger("yoi-input-change");
                }
            });
            YOI.setReady($(this));
        });
        $selects.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisSelect = $(this);
            var $thisSelectWrapper = $selectWrapper.clone();
            var $thisSelectIcon = $selectIcon.clone();
            $thisSelectWrapper.addClass($thisSelect.attr("class"));
            $thisSelect.wrap($thisSelectWrapper);
            $thisSelect.parent().append($thisSelectIcon);
            $thisSelect.removeAttr("class");
            $thisSelect.on({
                focus: function() {
                    $thisSelect.parent().addClass("input--focus");
                    $thisSelect.trigger("yoi-input-focus");
                },
                blur: function() {
                    $thisSelect.parent().removeClass("input--focus");
                    $thisSelect.trigger("yoi-input-blur");
                },
                change: function() {
                    $thisSelect.trigger("yoi-input-change");
                }
            });
            YOI.setReady($(this));
        });
        $checkElemns.each(function() {
            var thisWrapper = $(this).parent();
            thisWrapper.addClass($(this).attr("class"));
            $(this).removeAttr("class");
            if ($(this).is(":checked")) {
                thisWrapper.addClass("input--checked");
            }
            YOI.setReady($(this));
        });
    }
    return {
        init: initialize
    };
}();

YOI.component.Icon = function() {
    function initialize($icon) {
        var $icon = YOI.createCollection("icon", $icon);
        if ($icon) $icon.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisIcon = $(this);
            replace($thisIcon);
            YOI.setReady($(this));
        });
    }
    function replace($icon) {
        var $iconSvg;
        var iconClassNames = $icon.attr("class");
        var source = $icon.attr("data") || $icon.attr("src");
        if (source !== undefined) {
            $.ajax({
                url: source,
                dataType: "text",
                success: function(data) {
                    $iconSvg = $(data).addClass(iconClassNames);
                    $icon.replaceWith($iconSvg);
                }
            });
        }
    }
    return {
        init: initialize,
        replace: replace
    };
}();

YOI.component.ImgMagnifier = function() {
    var $window = $(window);
    var $cursor = $('<div class="imgMagnifier__cursor"></div>');
    var $viewer = $('<div class="imgMagnifier__viewer"></div>');
    var defaultStartViewerDelayTime = 250;
    function initialize($imgMagnifier, options) {
        var $imgMagnifier = YOI.createCollection("imgmagnifier", $imgMagnifier, options);
        if ($imgMagnifier) $imgMagnifier.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisImgMagnifier = $(this);
            var $thisCursor = $cursor.clone().fadeOut(0);
            var $thisViewer = $viewer.clone().fadeOut(0);
            $thisImgMagnifier.append($thisCursor);
            $thisImgMagnifier.append($thisViewer);
            $thisImgMagnifier.find("a").on("click", function(e) {
                e.preventDefault();
            });
            $window.on("load", function() {
                $thisImgMagnifier.on("mouseenter", function() {
                    startViewer($thisImgMagnifier);
                }).on("mouseleave", function() {
                    stopViewer($thisImgMagnifier);
                }).on("mousemove", function(e) {
                    moveMagnifier($thisImgMagnifier, e);
                });
                $window.on("resize", function() {
                    YOI.clearDelay("imgMagnifierResetDelay");
                    YOI.setDelay("imgMagnifierResetDelay", 500, function() {
                        reset();
                    });
                });
                setViewer($thisImgMagnifier);
                setZoomImage($thisImgMagnifier);
            });
            YOI.setReady($(this));
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
    }
    function setZoomImage($thisImgMagnifier) {
        var options = $thisImgMagnifier.data().options;
        var thisZoomImagePath = options.zoomImage || $thisImgMagnifier.find("a").attr("href");
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
        var delay = options.delay || parseInt(options.delay) || defaultStartViewerDelayTime;
        YOI.setDelay("imgMagnifierDelay", delay, function() {
            $thisViewer.fadeIn(250);
            $thisCursor.fadeIn(100);
            $thisViewer.trigger("yoi-imgmagnifier-start");
        });
    }
    function stopViewer($thisImgMagnifier) {
        YOI.clearDelay("imgMagnifierDelay");
        var $thisViewer = $thisImgMagnifier.find(".imgMagnifier__viewer");
        var $thisCursor = $thisImgMagnifier.find(".imgMagnifier__cursor");
        $thisViewer.fadeOut(50);
        $thisCursor.fadeOut(150);
        $thisViewer.trigger("yoi-imgmagnifier-stop");
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
        init: initialize
    };
}();

YOI.component.Log = function() {
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

YOI.component.MaxChars = function() {
    var defaultMaxLength = 200;
    function initialize($inputElement, options) {
        var $inputElement = YOI.createCollection("maxchars", $inputElement, options);
        if ($inputElement) $inputElement.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisInputElement = $(this);
            updateProps($thisInputElement);
            displayCharsLeft($thisInputElement);
            $thisInputElement.on("input", function() {
                updateInputElement($thisInputElement);
            });
            YOI.setReady($(this));
        });
    }
    function updateProps($inputElement) {
        var options = $inputElement.data().options;
        $inputElement.data().props = {
            maxLength: parseInt($inputElement.attr("maxlength")) || parseInt(options.maxLength) || defaultMaxLength,
            display: options.display || false,
            errorClassNames: options.errorClass || false
        };
    }
    function updateInputElement($inputElement) {
        var props = $inputElement.data().props;
        var $displayElement = $(props.display);
        var inputLength = $inputElement[0].value.length;
        if (inputLength > props.maxLength) {
            $inputElement.val($inputElement.val().slice(0, -1));
        }
        if ($displayElement.length) {
            if (inputLength >= props.maxLength) {
                $displayElement.addClass(props.errorClassNames);
                $inputElement.trigger("yoi-maxchars-reset");
            } else {
                $displayElement.removeClass(props.errorClassNames);
            }
            displayCharsLeft($inputElement);
        }
    }
    function displayCharsLeft($inputElement) {
        var props = $inputElement.data().props;
        var $displayElement = $(props.display);
        var charsLeft = props.maxLength - $inputElement[0].value.length;
        if ($displayElement.length) $displayElement.text(charsLeft);
    }
    function reset($inputElement) {
        var props = $inputElement.data().props;
        var $displayElement = $(props.display);
        $inputElement.val("");
        $displayElement.text(props.maxLength);
        $displayElement.removeClass(props.errorClassNames);
        $inputElement.trigger("yoi-maxchars-reset");
    }
    return {
        init: initialize,
        reset: reset
    };
}();

YOI.component.Modal = function() {
    var $body = $(document.body);
    var $document = $(document);
    var $window = $(window);
    var modalActive = false;
    var loadedModals = [];
    var scrollTop = false;
    var initialized = false;
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
        if ($modalTrigger && !initialized) {
            prepareDom();
        }
        if ($modalTrigger) $modalTrigger.each(function(index) {
            if (YOI.isReady($(this))) return false;
            var $thisModalTrigger = $(this);
            var options = $thisModalTrigger.data().options;
            var thisModalGenerate = options.generate || false;
            var thisModalTitle = options.title || "";
            var thisModalBody = options.body || "";
            var thisModalId = options.id || "#modal-" + index;
            var thisModalModifiers = options.modifiers || false;
            var thisModalPath = options.path || $thisModalTrigger.attr("href");
            var thisModalCache = options.cache || false;
            if (thisModalCache) load(thisModalId, thisModalPath);
            $thisModalTrigger.on("click", function(e) {
                e.preventDefault();
                if (thisModalGenerate === "true") {
                    generate(thisModalTitle, thisModalBody, thisModalId, thisModalModifiers);
                } else {
                    show(thisModalId, thisModalPath);
                }
            });
            YOI.setReady($(this));
        });
        if (!initialized) initializeCloseTriggers();
        initialized = true;
    }
    function prepareDom() {
        $body.append($modalCover.clone().hide());
        $body.append($modalContainer.clone().hide());
        domPrepared = true;
    }
    function foundModal(modalId) {
        return loadedModals.indexOf(modalId) === -1 ? false : true;
    }
    function initializeCloseTriggers(modalId) {
        var triggers;
        if (modalId) {
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
        if (!title) {
            $thisModal.addClass("modal--simple");
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
                    var $thisModal = $(this).find(".modal").first();
                    var $images = $(this).find("img");
                    var totalImages = $images.length;
                    var imageCounter = 0;
                    if ($thisModal.length) {
                        loadedModals.push(modalId);
                        $thisModal.attr("id", modalId.split("#")[1]);
                        $thisModal.find(".modal__header").append($modalCloseBtn.clone());
                        $("#modalContainer").append($thisModal);
                        $(modalId).hide();
                        initializeCloseTriggers(modalId);
                        if (typeof callback === "function") {
                            callback();
                        }
                        $document.trigger("yoi-modal-load");
                        $images.on("load", function() {
                            ++imageCounter;
                            if (imageCounter === totalImages) {
                                $window.trigger("load");
                            }
                        });
                    } else {
                        openFallbackLink(modalPath);
                    }
                }
                if (status === "error") {
                    $window.trigger("yoi-modal-error");
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
            $document.trigger("yoi-modal-show");
            YOI.initialize();
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
        $document.trigger("yoi-modal-hide");
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

YOI.component.PageRewind = function() {
    var $pageRewind;
    var $window = $(window);
    var $body = $("body");
    var threshold = 500;
    var initialized = false;
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
        var enablePageRewind = $body.is("[yoi-pagerewind]");
        if (enablePageRewind && !initialized) {
            $pageRewind = $('<a class="pageRewind" href="#">                    <span class="hidden">' + localization[language]["labelTxt"] + "</span>                </a>");
            $pageRewind.addClass("is--hidden").on("click", function(e) {
                e.preventDefault();
                run();
            }).appendTo($body);
            $window.scroll(function() {
                toggle();
            });
            initialized = true;
        }
    }
    function run() {
        $pageRewind.trigger("yoi-pagerewind-start");
        $("html,body").animate({
            scrollTop: 0
        }, 500).promise().then(function() {
            $pageRewind.trigger("yoi-pagerewind-stop");
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

YOI.component.PickBtn = function() {
    var $icon = $('<span class="pickBtn__icon"></span>');
    function initialize($pickBtn) {
        var $pickBtn = YOI.createCollection("pickBtn", $pickBtn);
        if ($pickBtn) $pickBtn.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisPickBtn = $(this);
            $thisPickBtn.find('input[type="radio"]').hide();
            $thisPickBtn.prepend($icon.clone());
            $thisPickBtn.find("label").on("click", function(e) {
                e.preventDefault();
            });
            $thisPickBtn.on("click", function(e) {
                e.preventDefault();
                activate($thisPickBtn);
                $thisPickBtn.trigger("yoi-pickbtn-change");
            });
            YOI.setReady($(this));
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

YOI.component.PieChart = function() {
    var $colorDot = $('<span class="pieChart__dot"></span>');
    var fixedPalette = [ "#ff9269", "#df3d00", "#5d4a97", "#417db3", "#629278", "#e4dea0", "#89c5fb", "#676665" ];
    function initialize($pieChart, options) {
        var $pieChart = YOI.createCollection("piechart", $pieChart, options);
        if ($pieChart) $pieChart.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisPieChart = $(this);
            var $thisPieChartRecords = $thisPieChart.find(".pieChart__record");
            var $thisPieChartSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            var options = $thisPieChart.data().options;
            var size = options.size !== undefined ? options.size : 200;
            var highlight = options.highlight !== undefined ? options.highlight === true : true;
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
            YOI.setReady($(this));
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

YOI.component.PopOver = function() {
    $document = $(document);
    function initialize($popOverTrigger, options) {
        var $popOverTrigger = YOI.createCollection("popover", $popOverTrigger, options);
        if ($popOverTrigger) $popOverTrigger.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisPopOverTrigger = $(this);
            var options = $thisPopOverTrigger.data().options;
            if (options.target === undefined || $(options.target).length < 1) return false;
            var $thisPopOver = $(options.target).detach();
            $("body").append($thisPopOver);
            var validEvents = [ "click", "dblclick", "contextmenu", "mouseover", "mouseout", "mousedown", "mouseup", "mouseenter", "mouseleave" ];
            var preventDefaultClick = options.preventDefaultClick || true;
            var eventShow = $.inArray(options.on, validEvents) > -1 ? options.on : "mouseenter";
            var eventHide = "mouseleave";
            if (preventDefaultClick === true || preventDefaultClick === "true") {
                $thisPopOverTrigger.on("click", function(e) {
                    e.preventDefault();
                });
            }
            $thisPopOverTrigger.on(eventShow, function(e) {
                hideAll();
                removeToggleClass();
                show($thisPopOverTrigger, $thisPopOver);
            }).on(eventHide, function(e) {
                YOI.clearInterval("popOverShowTimeout");
                hide($thisPopOverTrigger, $thisPopOver);
            });
            $thisPopOver.on("mouseenter", function() {
                YOI.clearInterval("popOverHideTimeout");
            }).on("mouseleave", function() {
                hide($thisPopOverTrigger, $thisPopOver);
            });
            YOI.setReady($(this));
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
            $thisPopOverTrigger.trigger("yoi-popover-show");
        });
    }
    function hide($thisPopOverTrigger, $thisPopOver) {
        YOI.setDelay("popOverHideTimeout", 500, function() {
            $thisPopOver.hide();
            removeToggleClass();
            $thisPopOverTrigger.trigger("yoi-popover-hide");
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

YOI.component.RangeInput = function() {
    var knobOffset;
    var $document = $(document);
    var $body = $("body");
    var rangeInputKnob = $('        <div class="rangeInput__knob"></div>    ');
    var rangeInputLabel = $('        <span class="rangeInput__label"></span>    ');
    var rangeInputTrack = $('        <div class="rangeInput__track">            <div class="rangeInput__range"></div>        </div>    ');
    function initialize($rangeInput, options) {
        var $rangeInput = YOI.createCollection("rangeinput", $rangeInput, options);
        if ($rangeInput) $rangeInput.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisRangeInput = $(this);
            var options = $thisRangeInput.data().options;
            var $thisMinKnob;
            var $thisMaxKnob;
            var $singleLabel;
            var $thisTrack;
            rangeInputKnob.on("mousedown", function(e) {
                var $thisKnob = $(this);
                var $thisRangeInput = $(this).closest(".rangeInput");
                storeCursorPos($thisRangeInput, $thisKnob, e.pageX);
                $document.on("mousemove", function(e) {
                    $body.addClass("noSelect");
                    $thisKnob.addClass("rangeInput__knob--active");
                    $thisRangeInput.addClass("is--active");
                    moveKnob($thisRangeInput, $thisKnob, e);
                }).on("mouseup", function(e) {
                    $body.removeClass("noSelect");
                    $thisKnob.removeClass("rangeInput__knob--active");
                    $thisRangeInput.removeClass("is--active");
                    $document.off("mousemove mouseup");
                });
            }).on("mouseover", function() {
                var $thisKnob = $(this);
                $thisKnob.siblings(".rangeInput__knob").removeClass("rangeInput__knob--topMost");
                $thisKnob.addClass("rangeInput__knob--topMost");
            });
            $thisMinKnob = rangeInputKnob.clone("true").addClass("rangeInput__knob--min").append(rangeInputLabel.clone());
            $thisMaxKnob = rangeInputKnob.clone("true").addClass("rangeInput__knob--max").append(rangeInputLabel.clone());
            $singleLabel = rangeInputLabel.clone().addClass("rangeInput__label--single");
            $thisTrack = rangeInputTrack.clone();
            $thisRangeInput.append($thisMinKnob, $thisMaxKnob, $singleLabel, $thisTrack);
            $thisRangeInput.data().props = {
                absMin: options.absMin || 0,
                absMax: options.absMax || 100,
                min: options.min || options.absMin || 0,
                max: options.max || options.absMax || 100,
                minValue: null,
                maxValue: null,
                unit: options.unit || "",
                offsetX: Math.floor($thisTrack.offset().left),
                minPosX: null,
                maxPosX: null,
                cursorPosX: 0,
                width: $thisTrack.width()
            };
            knobOffset = $thisRangeInput.find(".rangeInput__knob").first().outerWidth() / 2;
            set($thisRangeInput, $thisRangeInput.data().props.absMin, $thisRangeInput.data().props.absMax, $thisRangeInput.data().props.min, $thisRangeInput.data().props.max);
            YOI.setReady($(this));
        });
    }
    function set($rangeInput, absMin, absMax, min, max) {
        var $thisRangeInput = $rangeInput;
        var $thisMinKnob = $thisRangeInput.find(".rangeInput__knob--min");
        var $thisMaxKnob = $thisRangeInput.find(".rangeInput__knob--max");
        var thisProps = $thisRangeInput.data().props;
        thisProps.absMin = absMin;
        thisProps.absMax = absMax;
        thisProps.min = min;
        thisProps.max = max;
        moveKnob($thisRangeInput, $thisMinKnob);
        moveKnob($thisRangeInput, $thisMaxKnob);
        $rangeInput.trigger("yoi-rangeinput-change");
    }
    function reset($rangeInput) {
        var $thisRangeInput = $rangeInput;
        var thisProps = $thisRangeInput.data().props;
        var $thisMinKnob = $thisRangeInput.find(".rangeInput__knob--min");
        var $thisMaxKnob = $thisRangeInput.find(".rangeInput__knob--max");
        var thisAbsMin = props.absMin;
        var thisAbsMax = props.absMax;
        thisProps.min = thisAbsMin;
        thisProps.max = thisAbsMax;
        moveKnob($thisRangeInput, $thisMinKnob);
        moveKnob($thisRangeInput, $thisMaxKnob);
        $rangeInput.trigger("yoi-rangeinput-reset");
    }
    function adjustLabels($rangeInput) {
        var $thisRangeInput = $rangeInput;
        var $thisMinLabel = $thisRangeInput.find(".rangeInput__knob--min .rangeInput__label");
        var $thisMaxLabel = $thisRangeInput.find(".rangeInput__knob--max .rangeInput__label");
        var $thisSingleLabel = $thisRangeInput.find(".rangeInput__label--single");
        var props = $thisRangeInput.data().props;
        var minKnobRightEdge;
        var maxKnobLeftEdge;
        $thisMinLabel.text(props.min + " " + props.unit);
        $thisMaxLabel.text(props.max + " " + props.unit);
        $thisSingleLabel.text(props.minValue + props.unit + " – " + props.maxValue + " " + props.unit);
        var minLabelWidth = $thisMinLabel.outerWidth();
        var maxLabelWidth = $thisMaxLabel.outerWidth();
        var singleLabelWidth = $thisSingleLabel.outerWidth();
        $thisMinLabel.css("left", minLabelWidth / -2 + knobOffset);
        $thisMaxLabel.css("left", maxLabelWidth / -2 + knobOffset);
        $thisSingleLabel.css("left", props.minPosX + (props.maxPosX - props.minPosX) / 2 - singleLabelWidth / 2);
        if (props.minPosX === null || props.maxPosX === null) return;
        minKnobRightEdge = props.minPosX + minLabelWidth / 2;
        maxKnobLeftEdge = props.maxPosX - maxLabelWidth / 2;
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
        var factor;
        var inputValue;
        var range;
        if (e !== undefined) {
            if (props.cursorOffset > 0) e.pageX = e.pageX - props.cursorOffset;
            if (props.cursorOffset < 0) e.pageX = e.pageX + props.cursorOffset * -1;
            posX = Math.floor(Math.min(Math.max(0, e.pageX - props.offsetX), props.width));
            factor = Math.floor(posX / props.width * 100);
            thisKnobValue = Math.floor((props.absMax - props.absMin) / 100 * factor + props.absMin * 1);
            $thisRangeInput.trigger("yoi-rangeinput-change");
        } else {
            if (isMinKnob) inputValue = props.min;
            if (isMaxKnob) inputValue = props.max;
            range = props.absMax - props.absMin;
            factor = Math.ceil(props.width / range);
            posX = factor * (inputValue - props.absMin);
            thisKnobValue = inputValue;
        }
        if (isMinKnob) {
            if (e !== undefined) props.min = thisKnobValue;
            if (props.min < props.max) {
                $thisRangeInput.find(".rangeInput__range").css("left", posX);
                $thisMinInput.val(thisKnobValue);
                props.minPosX = posX;
                props.minValue = thisKnobValue;
            }
        }
        if (isMaxKnob) {
            if (e !== undefined) props.max = thisKnobValue;
            if (props.min < props.max) {
                $thisRangeInput.find(".rangeInput__range").css("right", props.width - posX);
                $thisMaxInput.val(thisKnobValue);
                props.maxPosX = posX;
                props.maxValue = thisKnobValue;
            }
        }
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

YOI.component.RatingInput = function() {
    var $ratingSelect = $('        <span class="ratingInput__select">            <span class="ratingInput__star"></span>            <span class="ratingInput__star"></span>            <span class="ratingInput__star"></span>            <span class="ratingInput__star"></span>            <span class="ratingInput__star"></span>        </span>    ');
    function initialize($ratingInput, options) {
        var $ratingInput = YOI.createCollection("ratinginput", $ratingInput, options);
        if ($ratingInput) $ratingInput.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisRatingInput = $(this);
            var $thisRatingSelect = $ratingSelect.clone();
            var $thisRatingStars = $thisRatingSelect.find(".ratingInput__star");
            setScore($thisRatingInput);
            if ($thisRatingInput.hasClass("ratingInput--locked")) {
                $thisRatingInput.data().state = "locked";
            }
            $thisRatingStars.on("mouseover", function() {
                setScore($thisRatingInput, $(this).index() + 1);
            }).on("click", function() {
                submitScore($thisRatingInput);
                lock($thisRatingInput);
            });
            $thisRatingInput.append($thisRatingSelect);
            YOI.setReady($(this));
        });
    }
    function lock($ratingInput) {
        $ratingInput.addClass("ratingInput--locked");
        $ratingInput.data().state = "locked";
        $ratingInput.trigger("yoi-rating-lock");
    }
    function unlock($ratingInput) {
        $ratingInput.removeClass("ratingInput--locked");
        $ratingInput.data().state = "unlocked";
        $ratingInput.trigger("yoi-rating-unlock");
    }
    function setScore($ratingInput, score) {
        var options = $ratingInput.data().options;
        var state = $ratingInput.data().state;
        var score = score || options.score || getScoreFromModifier($ratingInput) || 0;
        if (state !== "locked") {
            $ratingInput.data().options.score = score;
            $ratingInput.removeClass("ratingInput--rated-1 ratingInput--rated-2 ratingInput--rated-3 ratingInput--rated-4 ratingInput--rated-5");
            $ratingInput.addClass("ratingInput--rated-" + score);
            $ratingInput.trigger("yoi-rating-change");
        }
    }
    function getScoreFromModifier($ratingInput) {
        var score = null;
        if ($ratingInput.hasClass("ratingInput--rated-1")) score = 1;
        if ($ratingInput.hasClass("ratingInput--rated-2")) score = 2;
        if ($ratingInput.hasClass("ratingInput--rated-3")) score = 3;
        if ($ratingInput.hasClass("ratingInput--rated-4")) score = 4;
        if ($ratingInput.hasClass("ratingInput--rated-5")) score = 5;
        return score;
    }
    function submitScore($ratingInput) {
        $ratingInput.trigger("yoi-rating-submit");
    }
    return {
        init: initialize,
        lock: lock,
        unlock: unlock,
        set: setScore
    };
}();

YOI.component.ScrollKeys = function() {
    var initialized = false;
    var keyboardEventsAdded = false;
    var $window = $(window);
    var $body = $("body");
    var currentHook = -1;
    var totalHooks;
    var scrollSpeed = 200;
    var offset = 20;
    var $hooks = $("h1, h2, h3, h4, h5, h6");
    var language = YOI.locale();
    var localization = {
        en: {
            prev: "jump to previous mark",
            next: "jump to next mark"
        },
        de: {
            prev: "zur letzten Sprungmarke",
            next: "zum nächsten Sprungmarke"
        }
    };
    var $scrollButtons = $('        <div id="scrollButtons" class="btns sh-4 m-4">            <button class="btn btn--large">                <span class="hidden">' + localization[language].prev + '</span>                <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-008-s" yoi-icon />            </button>            <button class="btn btn--large">                <span class="hidden">' + localization[language].next + '</span>                <img class="icon" src="http://cdn.yoshino.digital/svg.php?id=icon-007-s" yoi-icon />            </button>        </div>    ');
    function initialize() {
        var enableScrollKeys = $body.is("[yoi-scrollkeys]");
        if (enableScrollKeys && !initialized) {
            var options = YOI.toObject($body.attr("yoi-scrollkeys"));
            var position = options.position || "br";
            offset = options.offset || offset;
            $hooks = $(options.hooks).length ? $(options.hooks) : $hooks;
            totalHooks = $hooks.length;
            detectCurrentHook();
            addKeyboardEvents();
            $scrollButtons.addClass("pos-fixed-" + position);
            $body.append($scrollButtons);
            YOI.component.Icon.init();
            $("#scrollButtons").find(".btn").eq(0).on("click", function(e) {
                e.preventDefault();
                scrollToHook("prev");
            });
            $("#scrollButtons").find(".btn").eq(1).on("click", function(e) {
                e.preventDefault();
                scrollToHook("next");
            });
            initialized = true;
        }
    }
    function scrollToHook(direction) {
        if (!$hooks) return false;
        setCurrentHook(direction);
        $.when($body.stop().animate({
            scrollTop: $hooks.eq(currentHook).offset().top - offset
        }, scrollSpeed)).done(function() {
            $document.trigger("yoi-scrollKeys-" + direction);
        });
    }
    function addKeyboardEvents() {
        if (YOI.foundModule("KeyboardAgent") && !keyboardEventsAdded) {
            $document.on("yoi-keypressed-arrowleft", function() {
                if (YOI.noFocus()) {
                    scrollToHook("prev");
                    highlightBtn("prev");
                }
            }).on("yoi-keypressed-arrowright", function() {
                if (YOI.noFocus()) {
                    scrollToHook("next");
                    highlightBtn("next");
                }
            }).on("yoi-focus-change", function() {
                if (YOI.noFocus()) {
                    $scrollButtons.stop().fadeIn();
                } else {
                    $scrollButtons.stop().fadeOut();
                }
            });
        }
        keyboardEventsAdded = true;
    }
    function highlightBtn(direction) {
        if (!direction) return false;
        var btnIndex;
        if (direction === "prev") btnIndex = 0;
        if (direction === "next") btnIndex = 1;
        var $btn = $("#scrollButtons").find(".btn").eq(btnIndex);
        $btn.addClass("is--active");
        YOI.setDelay("highlightScrollKeyDelay", 200, function() {
            $btn.removeClass("is--active");
        });
    }
    function setCurrentHook(direction) {
        if (direction === "prev") {
            --currentHook;
            if (currentHook < 0) currentHook = 0;
        }
        if (direction === "next") {
            ++currentHook;
            if (currentHook === totalHooks) currentHook = totalHooks - 1;
        }
    }
    function detectCurrentHook() {
        if (!$hooks) return false;
        $window.on("yoi-scroll-stop", function() {
            $hooks.each(function(index) {
                if ($(this).offset().top + offset > $body.scrollTop()) {
                    currentHook = index;
                    return false;
                }
            });
            if ($body.scrollTop() < $hooks.eq(0).offset().top - offset) {
                currentHook = -1;
            }
        });
    }
    return {
        init: initialize
    };
}();

YOI.component.ScrollProgress = function() {
    var $window = $(window);
    var $document = $(document);
    var $body = $("body");
    var initialized = false;
    var $scrollProgressBar;
    var documentHeight;
    var windowHeight;
    var totalScroll;
    var scrollPosition;
    var scrollProgress;
    var visibleScrollProgress;
    function initialize() {
        var enableScrollProgress = $body.is("[yoi-scrollprogress]");
        if (enableScrollProgress && !initialized) {
            var options = YOI.toObject($body.attr("yoi-scrollprogress"));
            visibleScrollProgress = YOI.toBoolean(options.visible);
            if (visibleScrollProgress) {
                $scrollProgressBar = $('                    <div class="scrollProgress">                        <div class="scrollProgress__track"></div>                    </div>                ');
                $body.append($scrollProgressBar);
                $scrollProgressBar = $(".scrollProgress__track").first();
            }
            $window.on("load.yoi yoi-scroll yoi-resize", function() {
                update();
            });
            initialized = true;
        }
    }
    function update() {
        documentHeight = $document.height();
        windowHeight = $window.height();
        totalScroll = documentHeight - windowHeight;
        scrollPosition = $("body").scrollTop();
        scrollProgress = scrollPosition / (totalScroll / 100);
        if (scrollProgress > 100 && windowHeight > documentHeight) {
            scrollProgress = 100;
        } else if (scrollProgress < 0) {
            scrollProgress = 0;
        }
        if (visibleScrollProgress) $scrollProgressBar.css("width", scrollProgress + "%");
        if (scrollProgress === 0) $window.trigger("yoi-scroll-0");
        if (scrollProgress > 24 && scrollProgress < 30) $window.trigger("yoi-scroll-25");
        if (scrollProgress > 49 && scrollProgress < 55) $window.trigger("yoi-scroll-50");
        if (scrollProgress > 74 && scrollProgress < 80) $window.trigger("yoi-scroll-75");
        if (scrollProgress > 99) $window.trigger("yoi-scroll-100");
    }
    return {
        init: initialize
    };
}();

YOI.component.Slider = function() {
    var $document = $(document);
    var $window = $(window);
    var keyboardEventsAdded = false;
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
            if (YOI.isReady($(this))) return false;
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
                $window.on("load resize", function() {
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
            if (options.autoplay !== undefined) {
                startAutoplay($thisSlider);
            }
            YOI.setReady($(this));
        });
        if (!keyboardEventsAdded) addKeyboardEvents();
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
        $thisSlider.trigger("yoi-slider-change");
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
                }).stop().animate({
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
            $thisSlides.eq(currentSlideIndex).stop().fadeOut(100, function() {
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
        $slider.trigger("yoi-slider-autoplaystart");
    }
    function stopAutoplay($slider) {
        var sliderIndex = $slider.data().props.index;
        var intervalName = "slideAutoplay-" + sliderIndex;
        YOI.clearInterval(intervalName);
        $slider.trigger("yoi-slider-autoplaystop");
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
    function addKeyboardEvents() {
        if (YOI.foundModule("KeyboardAgent") && !keyboardEventsAdded) {
            YOI.module.KeyboardAgent.addTabFocus($("[yoi-slider]"));
            $document.on("yoi-keypressed-arrowleft", function() {
                var $activeElement = $(document.activeElement);
                if ($activeElement.is("[yoi-slider]")) {
                    showSlide($activeElement, "prev");
                    stopAutoplay($activeElement);
                }
            });
            $document.on("yoi-keypressed-arrowright", function() {
                var $activeElement = $(document.activeElement);
                if ($activeElement.is("[yoi-slider]")) {
                    showSlide($activeElement, "next");
                    stopAutoplay($activeElement);
                }
            });
        }
        keyboardEventsAdded = true;
    }
    return {
        init: initialize,
        show: showSlide,
        start: startAutoplay,
        stop: stopAutoplay
    };
}();

YOI.component.Stepper = function() {
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
            if (YOI.isReady($(this))) return false;
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
                validateInput($thisStepper);
            });
            YOI.setReady($(this));
        });
    }
    function increaseItemCount($stepper) {
        validateInput($stepper);
        if ($stepper.data().state === "error") return false;
        var currentValue = $stepper.find(".stepper__input")[0].value;
        if (currentValue >= 0) {
            currentValue++;
            $stepper.find("input")[0].value = currentValue;
        }
        $stepper.trigger("yoi-stepper-up");
    }
    function decreaseItemCount($stepper) {
        validateInput($stepper);
        if ($stepper.data().state === "error") return false;
        var currentValue = $stepper.find(".stepper__input")[0].value;
        if (currentValue > 1) {
            currentValue--;
            $stepper.find("input")[0].value = currentValue;
        }
        $stepper.trigger("yoi-stepper-down");
    }
    function resetItemCount($stepper) {
        setItemCount($stepper, 1);
        removeErrorFormatting($stepper);
        $stepper.trigger("yoi-stepper-reset");
    }
    function clearItemCount($stepper) {
        setItemCount($stepper, 0);
        removeErrorFormatting($stepper);
        $stepper.trigger("yoi-stepper-clear");
    }
    function setItemCount($stepper, val) {
        if (YOI.isNumber(val)) {
            removeErrorFormatting($stepper);
            $stepper.find(".stepper__input")[0].value = val;
            $stepper.trigger("yoi-stepper-change");
        }
    }
    function validateInput($stepper) {
        var inputVal = $stepper.find(".stepper__input")[0].value;
        if (YOI.isNumber(inputVal)) {
            removeErrorFormatting($stepper);
            $stepper.trigger("yoi-stepper-valid");
        } else {
            addErrorFormatting($stepper);
            $stepper.trigger("yoi-stepper-invalid");
        }
    }
    function addErrorFormatting($stepper) {
        var $txtField = $stepper.find(".stepper__input");
        $txtField.addClass("input--negative");
        $stepper.data().state = "error";
    }
    function removeErrorFormatting($stepper) {
        var $txtField = $stepper.find(".stepper__input");
        $txtField.removeClass("input--negative");
        $stepper.data().state = "";
    }
    return {
        init: initialize,
        countUp: increaseItemCount,
        countDown: decreaseItemCount,
        reset: resetItemCount,
        clear: clearItemCount,
        setTo: setItemCount
    };
}();

YOI.component.Switch = function() {
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
            if (YOI.isReady($(this))) return false;
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
            YOI.setReady($(this));
        });
    }
    function setOn($switch) {
        $switch.removeClass("switch--off").addClass("switch--on");
        $switch.find('input[type="checkbox"]').first().attr("checked", true);
        $switch.trigger("yoi-switch-on");
    }
    function setOff($switch) {
        $switch.removeClass("switch--on").addClass("switch--off");
        $switch.find('input[type="checkbox"]').first().attr("checked", false);
        $switch.trigger("yoi-switch-off");
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

YOI.component.Table = function() {
    function initialize($table, options) {
        var $table = YOI.createCollection("table", $table, options);
        if ($table) $table.each(function() {
            if (YOI.isReady($(this))) return false;
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
            YOI.setReady($(this));
        });
    }
    function selectRow($thisTr) {
        var $thisTable = $thisTr.closest("table");
        var $thisAllTr = $thisTable.find("tr");
        var options = $thisTable.data().options;
        if (options.selectable === "multi") {
            $thisTr.toggleClass("is--active");
        } else {
            $thisAllTr.removeClass("is--active");
            $thisTr.addClass("is--active");
        }
        $thisTable.trigger("yoi-table-select");
    }
    function unselectRow($thisTr) {
        var $thisTable = $thisTr.closest("table");
        var $thisAllTr = $thisTable.find("tr");
        $thisAllTr.removeClass("is--active");
        $thisTable.trigger("yoi-table-unselect");
    }
    function removeRow($thisTr) {
        var $thisTable = $thisTr.closest("table");
        var totalTds = $thisTable.find("td").length;
        var tableIsEmpty = totalTds - $thisTr.find("td").length === 0 ? true : false;
        $thisTr.fadeOut("slow", function() {
            $thisTr.remove();
            if (tableIsEmpty) $thisTable.trigger("yoi-table-empty");
        });
        $thisTable.trigger("yoi-table-remove");
    }
    return {
        init: initialize,
        select: selectRow,
        unselect: unselectRow,
        remove: removeRow
    };
}();

YOI.component.Tabs = function() {
    function initialize($tabsMenu, options) {
        var $tabsMenu = YOI.createCollection("tabs", $tabsMenu, options);
        if ($tabsMenu) $tabsMenu.each(function() {
            if (YOI.isReady($(this))) return false;
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
            YOI.setReady($(this));
        });
    }
    function switchTo(thisTargetTabId) {
        var $thisTabsMenuItem = $('a[href="' + thisTargetTabId + '"]').parent("li");
        var $thisTabsMenu = $thisTabsMenuItem.closest(".tabs__menu");
        var $thisTabsMenuItems = $thisTabsMenu.find("li");
        var $thisTargetTab = $(thisTargetTabId);
        $thisTabsMenuItems.each(function() {
            var $thisMenuItem = $(this);
            var tabId = $thisMenuItem.find("a")[0].hash;
            $thisMenuItem.removeClass("is--active");
            $(tabId).hide();
        });
        $thisTabsMenuItem.addClass("is--active");
        $thisTargetTab.show();
        $thisTabsMenu.trigger("yoi-tabs-change");
    }
    return {
        init: initialize,
        switchTo: switchTo
    };
}();

YOI.component.ToggleGroup = function() {
    var toggleTargetGroupIteration;
    var resetToggleDelayTime = 300;
    function initialize($toggleGroup, options) {
        var $toggleGroup = YOI.createCollection("toggle", $toggleGroup, options);
        if ($toggleGroup) $toggleGroup.each(function(index) {
            if (YOI.isReady($(this))) return false;
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
            YOI.setReady($(this));
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
        $thisTrigger.trigger("yoi-togglegroup-change");
    }
    function reset($thisTrigger) {
        var options = $thisTrigger.data().options;
        var group = options.group;
        var activeClassName = options.activeClassName;
        var $thisFallBackElem = $('[yoi-toggle-fallback="' + group + '"]');
        if (activeClassName !== undefined) $(".toggleTriggerGroup-" + group).removeClass(activeClassName);
        $(".toggleTargetGroup-" + group).hide();
        if ($thisFallBackElem.length > 0) $thisFallBackElem.fadeIn();
        $thisTrigger.trigger("yoi-togglegroup-reset");
    }
    return {
        init: initialize,
        reset: reset
    };
}();

YOI.component.Tooltip = function() {
    var defaultFadeDuration = 200;
    var defaultShowDelay = 300;
    var defaultHideDelay = 200;
    function initialize($tooltipTrigger, options) {
        var $tooltipTrigger = YOI.createCollection("tooltip", $tooltipTrigger, options);
        if ($tooltipTrigger) $tooltipTrigger.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisTooltipTrigger = $(this);
            var options = $thisTooltipTrigger.data().options;
            var staticPosition = options.staticPosition || false;
            var hasStaticPosition = staticPosition === "top" || staticPosition === "right" || staticPosition === "bottom" || staticPosition === "left";
            var $thisTooltip = prepareTooltip($(options.target));
            $thisTooltipTrigger.on("mouseenter", function(e) {
                if (hasStaticPosition) {
                    setStaticPosition($thisTooltipTrigger, $thisTooltip);
                } else {
                    setPosition($thisTooltip, e);
                }
                hideAll();
                hideWithDelay($thisTooltipTrigger, $thisTooltip, "stop");
                showWithDelay($thisTooltipTrigger, $thisTooltip, "start");
            });
            $thisTooltipTrigger.on("mouseleave", function() {
                hideWithDelay($thisTooltipTrigger, $thisTooltip, "start");
                showWithDelay($thisTooltipTrigger, $thisTooltip, "stop");
            });
            if (staticPosition === false) {
                $thisTooltipTrigger.on("mousemove", function(e) {
                    setPosition($thisTooltip, e);
                });
            }
            YOI.setReady($(this));
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
    function createAndShowTooltip(id, xPos, yPos, content, fadeDuration) {
        if (!id || !xPos || !yPos || !content) return false;
        if ($("#" + id).length && $("#" + id).is(".toolTip")) return false;
        var fadeDuration = fadeDuration || defaultFadeDuration;
        $('<div id="' + id + '" class="tooltip">' + content + "</div>").appendTo($(document.body)).hide();
        var $thisTooltip = $("#" + id);
        $thisTooltip.css({
            position: "absolute",
            left: xPos,
            top: yPos
        }).fadeIn(fadeDuration).promise().then(function() {
            $thisTooltip.trigger("yoi-tooltip-show");
        });
    }
    function prepareTooltip($thisTargetElement, tooltipType) {
        var targetId = $thisTargetElement.attr("id");
        var targetAlreadyPrepared = $("#" + targetId + ".tooltip").length;
        if (!targetAlreadyPrepared) {
            $thisTargetElement.detach();
            $('<div id="' + targetId + '" class="tooltip">' + $thisTargetElement.html() + "</div>").appendTo($(document.body)).hide();
        }
        return $("#" + targetId);
    }
    function setPosition($thisTooltip, e) {
        var offset = 20;
        var cursorY = e.pageY;
        var cursorX = e.pageX;
        var tooltipWidth = $thisTooltip.width();
        var tooltipHeight = $thisTooltip.height();
        var viewPortWidth = $(window).width();
        var viewPortHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var tooltipLeft = cursorX + tooltipWidth > viewPortWidth ? cursorX - tooltipWidth - offset + "px" : cursorX + "px";
        var tooltipTop = cursorY + tooltipHeight + offset * 3 > scrollTop + viewPortHeight ? cursorY - tooltipHeight - offset * 2 + "px" : cursorY + offset + "px";
        $thisTooltip.css({
            position: "absolute",
            left: tooltipLeft,
            top: tooltipTop
        });
    }
    function setStaticPosition($thisTooltipTrigger, $thisTooltip) {
        var offset = 15;
        var options = $thisTooltipTrigger.data().options;
        var position = options.staticPosition;
        var tooltipLeft;
        var tooltipTop;
        switch (position) {
          case "top":
            tooltipLeft = $thisTooltipTrigger.offset().left + $thisTooltipTrigger.outerWidth() / 2 - $thisTooltip.outerWidth() / 2;
            tooltipTop = $thisTooltipTrigger.offset().top - $thisTooltip.outerHeight() - offset;
            break;

          case "right":
            tooltipLeft = $thisTooltipTrigger.offset().left + $thisTooltipTrigger.outerWidth() + offset;
            tooltipTop = $thisTooltipTrigger.offset().top + $thisTooltipTrigger.outerHeight() / 2 - $thisTooltip.outerHeight() / 2;
            break;

          case "bottom":
            tooltipLeft = $thisTooltipTrigger.offset().left + $thisTooltipTrigger.outerWidth() / 2 - $thisTooltip.outerWidth() / 2;
            tooltipTop = $thisTooltipTrigger.offset().top + $thisTooltipTrigger.outerHeight() + offset;
            break;

          case "left":
            tooltipLeft = $thisTooltipTrigger.offset().left - $thisTooltip.outerWidth() - offset;
            tooltipTop = $thisTooltipTrigger.offset().top + $thisTooltipTrigger.outerHeight() / 2 - $thisTooltip.outerHeight() / 2;
            break;
        }
        $thisTooltip.attr("class", "tooltip tooltip--" + position).css({
            position: "absolute",
            left: tooltipLeft,
            top: tooltipTop
        });
    }
    function showWithDelay($thisTooltipTrigger, $thisTooltip, action) {
        var options = $thisTooltipTrigger.data().options;
        var showDelayDuration = options.showDelay || defaultShowDelay;
        if (action === "start") {
            YOI.setDelay("tooltipShowDelay", showDelayDuration, function() {
                $thisTooltip.fadeIn(defaultFadeDuration).promise().then(function() {
                    $thisTooltip.trigger("yoi-tooltip-show");
                });
            });
        } else if (action === "stop") {
            YOI.clearDelay("tooltipShowDelay");
        }
    }
    function hideWithDelay($thisTooltipTrigger, $thisTooltip, action) {
        var options = $thisTooltipTrigger.data().options;
        var hideDelayDuration = options.hideDelay || defaultHideDelay;
        if (action === "start") {
            YOI.setDelay("tooltipHideDelay", hideDelayDuration, function() {
                $(".tooltip").hide();
                $thisTooltip.trigger("yoi-tooltip-hide");
            });
        } else if (action === "stop") {
            YOI.clearDelay("tooltipHideDelay");
        }
    }
    return {
        init: initialize,
        create: createAndShowTooltip,
        show: showWithDelay,
        hide: hideWithDelay,
        hideAll: hideAll
    };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy95b2kuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9kaXNtaXNzLmpzIiwic3JjL2pzL2JlaGF2aW91cnMvbGF6eWxvYWQuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9wYXJhbGxheC5qcyIsInNyYy9qcy9iZWhhdmlvdXJzL3Njcm9sbGZ4LmpzIiwic3JjL2pzL2JlaGF2aW91cnMvc3RpY2t5LmpzIiwic3JjL2pzL2FjdGlvbnMvYmxpbmsuanMiLCJzcmMvanMvYWN0aW9ucy9oaWRlLmpzIiwic3JjL2pzL2FjdGlvbnMvcHVsc2UuanMiLCJzcmMvanMvYWN0aW9ucy9zY3JvbGx0by5qcyIsInNyYy9qcy9hY3Rpb25zL3Nob3cuanMiLCJzcmMvanMvYWN0aW9ucy91cGRhdGUuanMiLCJzcmMvanMvbW9kdWxlcy9icm93c2VyaGlzdG9yeS5qcyIsInNyYy9qcy9tb2R1bGVzL2tleWJvYXJkYWdlbnQuanMiLCJzcmMvanMvbW9kdWxlcy9yZXNpemVhZ2VudC5qcyIsInNyYy9qcy9tb2R1bGVzL3Njcm9sbGFnZW50LmpzIiwic3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbi5qcyIsInNyYy9jb21wb25lbnRzL2NvZGUvY29kZS5qcyIsInNyYy9jb21wb25lbnRzL2NvdW50ZG93bi9jb3VudGRvd24uanMiLCJzcmMvY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXIuanMiLCJzcmMvY29tcG9uZW50cy9kb2NrL2RvY2suanMiLCJzcmMvY29tcG9uZW50cy9maWx0ZXJidG5zL2ZpbHRlcmJ0bnMuanMiLCJzcmMvY29tcG9uZW50cy9mbHlvdXQvZmx5b3V0LmpzIiwic3JjL2NvbXBvbmVudHMvZm9ybS9jdXN0b21mb3JtZWxlbWVudHMuanMiLCJzcmMvY29tcG9uZW50cy9pY29uL2ljb24uanMiLCJzcmMvY29tcG9uZW50cy9pbWdtYWduaWZpZXIvaW1nbWFnbmlmaWVyLmpzIiwic3JjL2NvbXBvbmVudHMvbG9nL2xvZy5qcyIsInNyYy9jb21wb25lbnRzL21heGNoYXJzL21heGNoYXJzLmpzIiwic3JjL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMiLCJzcmMvY29tcG9uZW50cy9wYWdlcmV3aW5kL3BhZ2VyZXdpbmQuanMiLCJzcmMvY29tcG9uZW50cy9waWNrYnRuL3BpY2tidG4uanMiLCJzcmMvY29tcG9uZW50cy9waWVjaGFydC9waWVjaGFydC5qcyIsInNyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5qcyIsInNyYy9jb21wb25lbnRzL3JhbmdlaW5wdXQvcmFuZ2VpbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL3JhdGluZ2lucHV0L3JhdGluZ2lucHV0LmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xsa2V5cy9zY3JvbGxrZXlzLmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xscHJvZ3Jlc3Mvc2Nyb2xscHJvZ3Jlc3MuanMiLCJzcmMvY29tcG9uZW50cy9zbGlkZXIvc2xpZGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3RlcHBlci9zdGVwcGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3dpdGNoL3N3aXRjaC5qcyIsInNyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmpzIiwic3JjL2NvbXBvbmVudHMvdGFicy90YWJzLmpzIiwic3JjL2NvbXBvbmVudHMvdG9nZ2xlZ3JvdXAvdG9nZ2xlZ3JvdXAuanMiLCJzcmMvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuanMiXSwibmFtZXMiOlsiWU9JIiwiZWxlbWVudENvbGxlY3Rpb24iLCJhY3Rpb24iLCJiZWhhdmlvdXIiLCJjb21wb25lbnQiLCJtb2R1bGUiLCJzdHJpbmdDb250YWlucyIsImlucHV0Iiwic2VhcmNoU3RyaW5nIiwiaW5kZXhPZiIsInplcm9QYWQiLCJudW0iLCJkaWdpdHMiLCJNYXRoIiwiYWJzIiwiaSIsImxlYWRpbmdaZXJvcyIsInNsaWNlIiwiZm91bmRNb2R1bGUiLCJ3aW5kb3ciLCJmb3VuZENvbXBvbmVudCIsInNldERlbGF5IiwiZGVsYXlOYW1lIiwiZGVsYXlUaW1lIiwiZGVsYXlGdW5jdGlvbiIsInRoaXMiLCJjbGVhckRlbGF5Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInVuZGVmaW5lZCIsInNldEludGVydmFsIiwiaW50ZXJ2YWxOYW1lIiwiaW50ZXJ2YWxUaW1lIiwiaW50ZXJ2YWxGdW5jdGlvbiIsImNsZWFySW50ZXJ2YWwiLCJ0b09iamVjdCIsImtleVZhbHVlUGFpciIsInByb3Blck9iamVjdCIsInZhbHVlU3RhcnRNYXJrZXIiLCJrZXlWYWx1ZVBhaXJFbmRNYXJrZXIiLCJyZXBsYWNlIiwic3BsaXQiLCJsZW5ndGgiLCJ0cmltIiwidG9Cb29sZWFuIiwidG9Mb3dlckNhc2UiLCJnZXRBdHRyaWJ1dGUiLCIkZWxlbWVudCIsInlvaUF0dHJpYnV0ZVZhbHVlIiwiJCIsImVhY2giLCJhdHRyaWJ1dGVzIiwiaW5kZXgiLCJhdHRyaWJ1dGUiLCJuYW1lIiwibWF0Y2giLCJ2YWx1ZSIsImhpZGUiLCIkdGFyZ2V0IiwialF1ZXJ5IiwiaGFzQ2xhc3MiLCJkYXRhIiwicmVtb3ZlQ2xhc3MiLCJzaG93IiwiaGFzT3duUHJvcGVydHkiLCJhZGRDbGFzcyIsImlzTnVtYmVyIiwiaW5wdXRWYWwiLCJwYXR0ZXJuIiwidGVzdFZhbCIsInRvU3RyaW5nIiwidGVzdCIsIm5vRm9jdXMiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJ0YWdOYW1lIiwidGhyb3R0bGUiLCJ0YXJnZXRGdW5jdGlvbiIsImRlbGF5Iiwic25hcHNob3QiLCJEYXRlIiwibm93IiwidmFsaWRCcmVha3BvaW50Iiwia2V5d29yZCIsInZhbGlkQnJlYWtQb2ludHMiLCJwb3NpdGlvbiIsImluQXJyYXkiLCJlbnZpcm9ubWVudCIsImVudk5hbWUiLCJkZWZhdWx0RW52aXJvbm1lbnQiLCJjdXJyZW50RW52aXJvbm1lbnQiLCJhdHRyIiwibG9jYWxlIiwibGFuZ3VhZ2UiLCJkZWZhdWx0TGFuZ3VhZ2UiLCJjdXJyZW50TGFuZ3VhZ2UiLCJjdXJyZW50QnJlYWtQb2ludCIsImdldENvbXB1dGVkU3R5bGUiLCJib2R5IiwiZ2V0UHJvcGVydHlWYWx1ZSIsImJsaW5rIiwiJGVsZW0iLCJ0aW1lcyIsInN0b3AiLCJhbmltYXRlIiwib3BhY2l0eSIsInB1bHNlIiwic3RhcnREb21PYnNlcnZlciIsIiRkb2N1bWVudCIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIldlYktpdE11dGF0aW9uT2JzZXJ2ZXIiLCJ0YXJnZXQiLCJtdXRhdGlvbnMiLCJmb3JFYWNoIiwibXV0YXRpb24iLCJhZGRlZE5vZGVzIiwidHJpZ2dlciIsInJlbW92ZWROb2RlcyIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiY2hhcmFjdGVyRGF0YSIsInN0b3BEb21PYnNlcnZlciIsImRpc2Nvbm5lY3QiLCJ1cGRhdGVPcHRpb25zIiwib3B0aW9ucyIsImtleSIsInVwZGF0ZVByb3BzIiwicHJvcHMiLCJ1cGRhdGVTdGF0ZSIsInN0YXRlIiwiY3JlYXRlQ29sbGVjdGlvbiIsImlkZW50aWZpZXIiLCIkdGhpcyIsImFkZCIsImRlc3Ryb3lDb2xsZWN0aW9uIiwiYmluZEFjdGlvbiIsInlvaUFjdGlvbiIsInBhcmFtcyIsIk9iamVjdCIsImtleXMiLCJob3N0T2JqZWN0IiwicHVibGljRnVuY3Rpb24iLCJldmVudCIsIm9uIiwiJHRyaWdnZXIiLCJwYXJlbnQiLCJtYXAiLCJlIiwicHJldmVudERlZmF1bHQiLCJtYXBBY3Rpb25zIiwiaXMiLCJzZXRSZWFkeSIsImluaXRpYWxpemVkIiwiaXNSZWFkeSIsImluaXRpYWxpemUiLCJpbml0IiwiQ29kZSIsIkRpc21pc3MiLCJsb2NhbGl6YXRpb24iLCJlbiIsImJ0bkxhYmVsIiwiZGUiLCIkYnRuRGlzbWlzcyIsIiRkaXNtaXNzYWJsZUVsZW1lbnQiLCJpc0Rpc21pc3NhYmxlIiwiJHRoaXNEaXNtaXNzYWJsZUVsZW1lbnQiLCJwb3NpdGlvblN0YXRpYyIsImNzcyIsImNsb25lIiwiZGlzbWlzcyIsImFwcGVuZFRvIiwiJHRhcmdldEVsZW1lbnQiLCJmYWRlT3V0IiwiTGF6eWxvYWQiLCIkbGF6eWxvYWQiLCJpc0xhenlsb2FkaW5nIiwibWFrZUxhenlsb2FkIiwiJG5vc2NyaXB0RWxlbWVudCIsIiRwbGFjZUhvbGRlciIsImRlZmF1bHRJbWFnZSIsInNyYyIsImV4dHJhY3RJbWdTcmNGcm9tU3RyaW5nIiwiaHRtbCIsIndpZHRoIiwiaGVpZ2h0IiwiYWx0IiwidGl0bGUiLCJsb25nZGVzYyIsImNzc0NsYXNzZXMiLCJpbnNlcnRBZnRlciIsIm5leHQiLCJTY3JvbGxBZ2VudCIsIm9uZSIsImltYWdlVXJsIiwiYnJlYWtQb2ludFNtYWxsIiwiYnJlYWtQb2ludE1lZGl1bSIsImJyZWFrUG9pbnRMYXJnZSIsImJyZWFrUG9pbnRYbGFyZ2UiLCJzcmNTbWFsbCIsInNyY01lZGl1bSIsInNyY0xhcmdlIiwic3JjWGxhcmdlIiwiJG5ld0ltYWdlIiwiY29tcGxldGUiLCJvdXRwdXQiLCJQYXJhbGxheCIsIiR3aW5kb3ciLCIkYWN0aXZlUGFyYWxsYXhFbGVtZW50cyIsImN1cnJlbnRTY3JvbGxUb3AiLCJkZWZhdWx0RmFjdG9yIiwiJHBhcmFsbGF4RWxlbWVudCIsImlzUGFyYWxsYXgiLCJ1cGRhdGUiLCJyZXNldFNjcm9sbCIsInVwZGF0ZVBhcmFsbGF4RW52IiwidXBkYXRlQWxsIiwic2Nyb2xsUGFyYWxsYXgiLCJzdGFydHNJblZpZXdwb3J0IiwicmVzZXQiLCJzY3JvbGxPdmVyc2hvb3QiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJpbml0aWFsUG9zWSIsImZhY3RvciIsInNjcm9sbFRvcEluVmlld3BvcnQiLCJ2aWV3cG9ydEhlaWdodCIsInBhcmFsbGF4T2Zmc2V0IiwicGFyc2VJbnQiLCJzY3JvbGxUb3AiLCJkZXN0cm95Iiwib2ZmIiwiU2Nyb2xsRngiLCIkdGhpc1RhcmdldEVsZW1lbnQiLCJoYXNTY3JvbGxGeCIsInByZXBhcmUiLCJsaXN0ZW4iLCJpbkZ4IiwiaW4iLCJib3R0b21GeCIsImJvdHRvbSIsImNlbnRlckZ4IiwiY2VudGVyIiwidG9wRngiLCJ0b3AiLCJzcGVlZCIsInJlcGVhdCIsImFwcGx5RngiLCJmeCIsIlN0aWNreSIsIiRib2R5IiwiJHN0aWNreUVsZW1lbnQiLCIkdGhpc1N0aWNreUVsZW1lbnQiLCJpc1N0aWNreSIsInRyYW5zZm9ybVN0aWNreUVsZW1lbnQiLCJ1cGRhdGVTdGlja3lFbGVtZW50UHJvcHMiLCJzdGFydFBvc2l0aW9uT2JzZXJ2ZXIiLCJzdGFydFN0aWNrT2JzZXJ2ZXIiLCIkc3RpY2t5UGxhY2Vob2xkZXIiLCIkc3RpY2t5V3JhcHBlciIsInN0aWNreUVsZW1lbnRDc3NQb3MiLCJzdGlja3lFbGVtZW50Q3NzTGVmdCIsInN0aWNreUVsZW1lbnRDc3NUb3AiLCJzdGlja3lFbGVtZW50Q1NTTWFyZ2luIiwibGVmdCIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJtYXJnaW4iLCJvdXRlcldpZHRoIiwib3V0ZXJIZWlnaHQiLCJkaXNwbGF5Iiwid3JhcCIsInJlc2V0U3RpY2t5RWxlbWVudCIsInJlbW92ZSIsInJlbW92ZUF0dHIiLCJ1bndyYXAiLCJhY3RpdmVCcmVha3BvaW50IiwiJHJlZmVyZW5jZUVsZW1lbnQiLCJyZWZlcmVuY2UiLCJmaXJzdCIsInN0aWNreUVsZW1lbnRIZWlnaHQiLCJzdGlja3lFbGVtZW50V2lkdGgiLCJzdGlja3lFbGVtZW50SW5pdGlhbFRvcFBvcyIsIm9mZnNldCIsInRvcE9mZnNldCIsInN0YXJ0IiwidG9wRGlzdGFuY2UiLCJzdGlja1N0YXJ0Iiwic3RpY2tTdG9wIiwibm90IiwiYWxsb3dlZE9uQ3VycmVudEJyZWFrcG9pbnQiLCJwYXNzZWRWYWxpZGF0aW9uIiwidmFsaWRJbnB1dCIsInZhbGlkSGVpZ2h0IiwiaW5pdGlhbFRvcFBvcyIsInBvc2l0aW9uT2JzZXJ2ZXIiLCJzdGlja09ic2VydmVyIiwiY3NzUG9zaXRpb25WYWx1ZSIsImNzc1RvcFZhbHVlIiwic3RpY2t5UGxhY2Vob2xkZXJEaXNwbGF5IiwiYmFja2ZhY2UtdmlzaWJpbGl0eSIsInotaW5kZXgiLCJCbGluayIsIkhpZGUiLCJzZWxlY3RvcnMiLCJ0YXJnZXRTZWxlY3RvciIsImNsYXNzTmFtZSIsImpvaW4iLCJQdWxzZSIsIlNjcm9sbFRvIiwic2Nyb2xsUm9vdCIsInNjcm9sbGluZ0VsZW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCIkc2Nyb2xsQ29udGV4dCIsIiRzY3JvbGxDb250YWluZXIiLCJjbG9zZXN0IiwiaGlnaGxpZ2h0Iiwic2Nyb2xsUG9zWSIsIlRhYnMiLCJzd2l0Y2hUbyIsInRhcmdldElkIiwid2hlbiIsImRvbmUiLCJTaG93IiwiVXBkYXRlIiwicmVxdWVzdFR5cGUiLCJ0eXBlIiwicmVxdWVzdFVybCIsInVybCIsImZpbHRlciIsImVycm9yVGl0bGUiLCJlcnJvck1zZyIsIiRlcnJvck1zZyIsIiRzcGlubmVyIiwidG9VcHBlckNhc2UiLCJhamF4IiwiY2FjaGUiLCJiZWZvcmVTZW5kIiwiYXBwZW5kIiwiZXJyb3IiLCJzdWNjZXNzIiwiJHJlc3BvbnNlIiwiQnJvd3Nlckhpc3RvcnkiLCJwdXNoSGFzaCIsImhhc2hTdHJpbmciLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInJlcGxhY2VIYXNoIiwicmVwbGFjZVN0YXRlIiwiY2xlYXJIYXNoIiwiS2V5Ym9hcmRBZ2VudCIsIjM4IiwiMzkiLCI0MCIsIjM3IiwiMTMiLCIzMiIsIjI3IiwiOSIsImtleUNvZGUiLCJ3aGljaCIsImFkZFRhYkZvY3VzIiwiJGVsZW1lbnRzIiwiJGFjdGl2ZUVsZW1lbnQiLCJSZXNpemVhZ2VudCIsImxhc3RCcmVha1BvaW50IiwiYWN0aXZlQnJlYWtQb2ludCIsImxhc3RQYWdlSGVpZ2h0IiwiY3VycmVudFBhZ2VIZWlnaHQiLCJyZXBvcnRSZXNpemVDaGFuZ2UiLCJyZXBvcnRCcmVha1BvaW50Q2hhbmdlIiwicmVhZHkiLCJvYnNlcnZlUGFnZUhlaWdodENoYW5nZSIsIiRhY3RpdmVUYXJnZXRFbGVtZW50cyIsImxhc3RTY3JvbGxUb3AiLCJicm9hZGNhc3QiLCJ0aGlzSGVpZ2h0IiwidGhpc0luaXRpYWxQb3NZIiwidHJhbnNmb3JtWSIsInBhcnNlRmxvYXQiLCJ2aWV3cG9ydEluIiwidmlld3BvcnRCb3R0b20iLCJ2aWV3cG9ydENlbnRlciIsInZpZXdwb3J0VG9wIiwidmlld3BvcnRPdXQiLCJpc1Njcm9sbGluZyIsImlnbm9yZSIsIkFjY29yZGlvbiIsImtleWJvYXJkRXZlbnRzQWRkZWQiLCIkYWNjb3JkaW9uIiwiJHRoaXNBY2NvcmRpb24iLCIkdGhpc1NlY3Rpb25zIiwiZmluZCIsImV2ZW50VHlwZSIsIiR0aGlzU2VjdGlvbiIsIiR0aGlzSGVhZGVyIiwiJHRoaXNCb2R5Iiwic2xpZGVVcCIsInRvZ2dsZVNlY3Rpb24iLCJhZGRLZXlib2FyZEV2ZW50cyIsIiRzZWN0aW9uIiwibGlua2VkIiwiY2xvc2VBbGxTZWN0aW9ucyIsIm9wZW5TZWN0aW9uIiwiY2xvc2VTZWN0aW9uIiwic2xpZGVEb3duIiwicHJvbWlzZSIsInRoZW4iLCIkdGFyZ2V0cyIsIm9wZW5BbGxTZWN0aW9ucyIsImNsb3NlIiwib3BlbiIsImNsb3NlQWxsIiwib3BlbkFsbCIsInRvZ2dsZSIsIiRjb2RlV3JhcHBlciIsInRhYlBhZ2VJbmRleCIsIiR0aGlzQ29kZVdyYXBwZXIiLCIkdGhpc0NvZGUiLCJleGFtcGxlVGFnIiwiZXhhbXBsZVRhZ1RhYmJlZCIsInRoaXNFeGFtcGxlIiwidGV4dCIsInRoaXNFeGFtcGxlVGFiYmVkIiwibWFya3VwIiwiZmlyc3RJbmRleCIsInNlY29uZEluZGV4IiwiYWRkQ29weUJ0biIsInJlcGxhY2VXaXRoIiwidHJ1bmNhdGUiLCJjb3B5VG9DbGlwYm9hcmRTdXBwb3J0ZWQiLCJxdWVyeUNvbW1hbmRTdXBwb3J0ZWQiLCIkbWFya3VwIiwiJGNvcHlCdG4iLCIkY29kZVNvdXJjZSIsImNvZGVIYXNSZW5kZXJlZEV4YW1wbGUiLCIkY29kZSIsImNvcHlUb0NsaXBCb2FyZCIsIiRzb3VyY2UiLCJzZWxlY3Rpb24iLCJnZXRTZWxlY3Rpb24iLCJyYW5nZSIsImNyZWF0ZVJhbmdlIiwic2VsZWN0Tm9kZUNvbnRlbnRzIiwiYWRkUmFuZ2UiLCJleGVjQ29tbWFuZCIsInJlbW92ZUFsbFJhbmdlcyIsIiR0aGlzQ29kZVNvdXJjZSIsImVxIiwiJGV4cGFuZEJ0biIsImNvZGVIZWlnaHQiLCJsaW5lSGVpZ2h0IiwibWF4Q29kZUhlaWdodCIsIkNvdW50ZG93biIsImRheXMiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiJGNvdW50ZG93bkNoYXJhY3RlciIsIiRjb3VudGRvd25DaGFyYWN0ZXJMYWJlbCIsIiRjb3VudGRvd25DbG9jayIsIiRjb3VudGRvd24iLCIkdGhpc0NvdW50ZG93biIsImRlZmF1bHRZZWFyIiwiZ2V0RnVsbFllYXIiLCJkZWZhdWx0TW9udGgiLCJkZWZhdWx0RGF5IiwiZGVmYXVsdEhvdXIiLCJkZWZhdWx0TWludXRlIiwiZGVmYXVsdFNlY29uZCIsInllYXIiLCJtb250aCIsImRheSIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJlbmRUaW1lIiwiZ2V0RGF0ZVN0cmluZyIsInJlbmRlciIsInRpbWVSZW1haW5pbmciLCJnZXRUaW1lUmVtYWluaW5nIiwibGNkQ2hhcmFjdGVycyIsImdldExjZENoYXJhY3RlcnNDU1NDbGFzc05hbWVzIiwiJGhpZGRlbkxhYmVsIiwiJHRoaXNDb3VudGRvd25DbG9jayIsInVuaXQiLCIkY291bnRkb3duQ2hhcnMiLCIkY291bnRkb3duTGFiZWwiLCJnZXRDaGFyYWN0ZXJMYWJlbCIsInRvdGFsIiwic2VsZWN0b3IiLCJsYWJlbFR4dCIsIm1vbnRocyIsImVuZFRpbWVJc29TdHJpbmciLCJwYXJzZSIsImZsb29yIiwiY2hhckF0IiwiJGxhYmVsIiwiRGF0ZVBpY2tlciIsIndlZWtEYXlzIiwibW9udGhOYW1lcyIsIiRkYXRlUGlja2VyIiwiJHdlZWtEYXlzSGVhZGVyIiwiJGRhdGVwaWNrZXIiLCJnZXRDdXJyZW50RGF0ZSIsIiR0aGlzRGF0ZUlucHV0IiwiaW5wdXRZZWFyIiwiaW5wdXRNb250aCIsImlucHV0RGF5IiwidXBkYXRlRGF0ZUlucHV0IiwiJHRoaXNEYXRlUGlja2VyIiwicmVuZGVyRGF0ZVBpY2tlciIsIiR0aGlzRGF0ZUlucHV0V3JhcHBlciIsImFmdGVyIiwic3RvcFByb3BhZ2F0aW9uIiwidGhpc0RhdGVJbnB1dFByb3BzIiwicmVuZGVyTW9udGhUYWJsZSIsInNlbGVjdGVkWWVhciIsInNlbGVjdGVkTW9udGgiLCJoaWRlQWxsRGF0ZVBpY2tlcnMiLCJwbGFjZURhdGVQaWNrZXIiLCJ1cGRhdGVEYXRlUGlja2VyIiwic2VsZWN0ZWREYXkiLCJmb3JtYXR0ZWRTZWxlY3RlZERhdGUiLCJ1cGRhdGVNb250aFRhYmxlIiwiJHRoaXNNb250aFRhYmxlIiwiZmlyc3REYXlJbnN0YW5jZSIsImZpcnN0RGF5IiwiZ2V0RGF5IiwidG90YWxEYXlzIiwiZ2V0VG90YWxEYXlzIiwiZm9ybWF0dGVkRGF0ZSIsInZhbCIsIiRtb250aFRhYmxlIiwiJG1vbnRoVGFibGVCb2R5IiwidGhpc01vbnRoVGFibGVQcm9wcyIsInRoaXNEYXRlUGlja2VyUHJvcHMiLCJpbmRleENlbGwiLCJpbmRleERheSIsImNlaWwiLCIkcm93IiwiaiIsIiRjZWxsIiwicGlja0RhdGUiLCIkdGhpc01vbnRoQnV0dG9uIiwiJHRoaXNEYXRlcGlja2VyIiwidGhpc0FjdGlvbiIsInByZXYiLCJmb2N1cyIsIiR0aGlzQ2VsbCIsImN1cnJlbnREYXRlIiwid2Vla0RheSIsImdldERhdGUiLCJnZXRNb250aCIsImFkanVzdFllYXIiLCJnZXRZZWFyIiwiZGF5c0luTW9udGhzIiwiJGRhdGVJbnB1dCIsImRhdGVJbnB1dE9mZnNldFkiLCJkYXRlSW5wdXRIZWlnaHQiLCJkYXRlUGlja2VySGVpZ2h0Iiwidmlld1BvcnRIZWlnaHQiLCJwbGFjZSIsIkRvY2siLCIkZG9jayIsIiR0aGlzRG9jayIsImF1dG9oaWRlIiwiRmlsdGVyQnRucyIsIiRmaWx0ZXJCdG5zIiwiJHRoaXNGaWx0ZXJCdG5zIiwiJHRoaXNCdG4iLCJGbHlvdXQiLCIkZmx5b3V0IiwiJHRoaXNGbHlvdXQiLCJkZXRhY2giLCIkZmx5b3V0SGFuZGxlIiwiQ3VzdG9tRm9ybUVsZW1lbnRzIiwiJGNoZWNrQm94V3JhcHBlciIsIiRyYWRpb0J0bldyYXBwZXIiLCIkc2VsZWN0V3JhcHBlciIsIiRzZWxlY3RJY29uIiwiJGNoZWNrRWxlbW5zIiwiJGNoZWNrQm94ZXMiLCIkcmFkaW9CdG5zIiwiJHNlbGVjdHMiLCIkdGhpc0NoZWNrYm94IiwiaXNXcmFwcGVkSW5MYWJlbCIsInBhcmVudHMiLCJibHVyIiwiY2hhbmdlIiwidG9nZ2xlQ2xhc3MiLCIkdGhpc1JhZGlvQnRuIiwiZ3JvdXBOYW1lIiwiJGdyb3VwZWRCdG5zIiwiJHRoaXNTZWxlY3QiLCIkdGhpc1NlbGVjdFdyYXBwZXIiLCIkdGhpc1NlbGVjdEljb24iLCJ0aGlzV3JhcHBlciIsIkljb24iLCIkaWNvbiIsIiR0aGlzSWNvbiIsIiRpY29uU3ZnIiwiaWNvbkNsYXNzTmFtZXMiLCJzb3VyY2UiLCJkYXRhVHlwZSIsIkltZ01hZ25pZmllciIsIiRjdXJzb3IiLCIkdmlld2VyIiwiZGVmYXVsdFN0YXJ0Vmlld2VyRGVsYXlUaW1lIiwiJGltZ01hZ25pZmllciIsIiR0aGlzSW1nTWFnbmlmaWVyIiwiJHRoaXNDdXJzb3IiLCIkdGhpc1ZpZXdlciIsInN0YXJ0Vmlld2VyIiwic3RvcFZpZXdlciIsIm1vdmVNYWduaWZpZXIiLCJzZXRWaWV3ZXIiLCJzZXRab29tSW1hZ2UiLCJ5UG9zIiwieFBvcyIsInRoaXNab29tSW1hZ2VQYXRoIiwiem9vbUltYWdlIiwiJHRoaXNQcmV2aWV3SW1hZ2UiLCJ0aGlzWm9vbUltYWdlIiwiSW1hZ2UiLCIkdGhpc1pvb21JbWFnZSIsInlSYXRpbyIsInhSYXRpbyIsInNldEN1cnNvciIsInRoaXNDdXJzb3JXaXRoIiwidGhpc0N1cnNvckhlaWdodCIsIm1hcmdpbkxlZnQiLCJmYWRlSW4iLCJpbWdNYWduaWZpZXJQcm9wcyIsImN1cnNvclByb3BzIiwicGFnZVkiLCJwYWdlWCIsIm1pblkiLCJtYXhZIiwibWluWCIsIm1heFgiLCJMb2ciLCJ3cml0ZSIsIiRsb2ciLCJsb2dJbnB1dCIsIm1lbW9yeSIsInVuc2hpZnQiLCIkbG9nQm9keSIsImxvZ01lbW9yeSIsImxvZ091dHB1dCIsImNsZWFyIiwiTWF4Q2hhcnMiLCJkZWZhdWx0TWF4TGVuZ3RoIiwiJGlucHV0RWxlbWVudCIsIiR0aGlzSW5wdXRFbGVtZW50IiwiZGlzcGxheUNoYXJzTGVmdCIsInVwZGF0ZUlucHV0RWxlbWVudCIsIm1heExlbmd0aCIsImVycm9yQ2xhc3NOYW1lcyIsImVycm9yQ2xhc3MiLCIkZGlzcGxheUVsZW1lbnQiLCJpbnB1dExlbmd0aCIsImNoYXJzTGVmdCIsIk1vZGFsIiwibW9kYWxBY3RpdmUiLCJsb2FkZWRNb2RhbHMiLCJidG5MYWJlbENsb3NlIiwiJG1vZGFsQ292ZXIiLCIkbW9kYWxDb250YWluZXIiLCIkbW9kYWxDbG9zZUJ0biIsIiRtb2RhbFRlbXBsYXRlIiwiJG1vZGFsVHJpZ2dlciIsInByZXBhcmVEb20iLCIkdGhpc01vZGFsVHJpZ2dlciIsInRoaXNNb2RhbEdlbmVyYXRlIiwiZ2VuZXJhdGUiLCJ0aGlzTW9kYWxUaXRsZSIsInRoaXNNb2RhbEJvZHkiLCJ0aGlzTW9kYWxJZCIsImlkIiwidGhpc01vZGFsTW9kaWZpZXJzIiwibW9kaWZpZXJzIiwidGhpc01vZGFsUGF0aCIsInBhdGgiLCJ0aGlzTW9kYWxDYWNoZSIsImxvYWQiLCJpbml0aWFsaXplQ2xvc2VUcmlnZ2VycyIsImRvbVByZXBhcmVkIiwiZm91bmRNb2RhbCIsIm1vZGFsSWQiLCJ0cmlnZ2VycyIsIiR0aGlzTW9kYWwiLCIkdGhpc01vZGFsVGl0bGUiLCIkdGhpc01vZGFsQm9keSIsInB1c2giLCJtb2RhbFBhdGgiLCJjYWxsYmFjayIsIiRsb2FkQmluIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJ4aHIiLCIkaW1hZ2VzIiwidG90YWxJbWFnZXMiLCJpbWFnZUNvdW50ZXIiLCJvcGVuRmFsbGJhY2tMaW5rIiwiJG1vZGFsIiwib2ZmU2V0WSIsIm1vZGFsRml0c0ludG9WaWV3cG9ydCIsIm1hcmdpblRvcCIsInByb3RvY29sIiwiaG9zdCIsIlBhZ2VSZXdpbmQiLCIkcGFnZVJld2luZCIsInRocmVzaG9sZCIsImVuYWJsZVBhZ2VSZXdpbmQiLCJydW4iLCJzY3JvbGwiLCJQaWNrQnRuIiwiJHBpY2tCdG4iLCIkdGhpc1BpY2tCdG4iLCJwcmVwZW5kIiwiYWN0aXZhdGUiLCIkcmFkaW9JbnB1dCIsInByb3AiLCJQaWVDaGFydCIsIiRjb2xvckRvdCIsImZpeGVkUGFsZXR0ZSIsIiRwaWVDaGFydCIsIiR0aGlzUGllQ2hhcnQiLCIkdGhpc1BpZUNoYXJ0UmVjb3JkcyIsIiR0aGlzUGllQ2hhcnRTdmciLCJjcmVhdGVFbGVtZW50TlMiLCJzaXplIiwicGFsZXR0ZSIsInJvdGF0aW9uIiwicmVjb3JkcyIsInNldEF0dHJpYnV0ZSIsIiR0aGlzUmVjb3JkIiwidGhpc1ZhbHVlIiwiYWRkQ2hhcnREYXRhIiwiaGlnaGxpZ2h0UmVjb3JkIiwicmVzZXRIaWdobGlnaHRSZWNvcmQiLCJibGlua1JlY29yZCIsInNldEZpeGVkU2xpY2VDb2xvcnMiLCJzZXRSYW5kb21TbGljZUNvbG9ycyIsInNldFNsaWNlU2hhZGVzIiwic2V0VW5pcXVlU2xpY2VDb2xvcnMiLCIkdGhpc1BhdGhzIiwiJHRoaXNDaXJjbGVzIiwiJHRoaXNEb3RzIiwidG90YWxTbGljZXMiLCJiYXNlQ29sb3IiLCJKU09OIiwic3RhcnRSYWRpdXMiLCJzdGFydFNhdHVyYXRpb24iLCJzdGFydEx1bWluYW5jZSIsInNwbGl0UmFkaXVzIiwicmFkaXVzIiwicmFuZG9tQ29sb3IiLCJyYW5kb20iLCJzcGxpdEx1bWluYW5jZSIsImx1bWluYW5jZSIsIiR0aGlzUGllU2xpY2UiLCJtaW4iLCJtYXgiLCJ4IiwiY29zIiwiUEkiLCJ5Iiwic2luIiwibG9uZ0FyYyIsImQiLCJ0aGlzSW5kZXgiLCIkc2xpY2VzIiwic2libGluZ3MiLCJmYWRlVG8iLCIkdGhpc1JlY29yZHMiLCJQb3BPdmVyIiwiJHBvcE92ZXJUcmlnZ2VyIiwiJHRoaXNQb3BPdmVyVHJpZ2dlciIsIiR0aGlzUG9wT3ZlciIsInZhbGlkRXZlbnRzIiwicHJldmVudERlZmF1bHRDbGljayIsImV2ZW50U2hvdyIsImV2ZW50SGlkZSIsImhpZGVBbGwiLCJyZW1vdmVUb2dnbGVDbGFzcyIsInNldFBvc2l0aW9uIiwiY3NzQ2xhc3NOYW1lIiwicG9zIiwicmVmIiwiUmFuZ2VJbnB1dCIsImtub2JPZmZzZXQiLCJyYW5nZUlucHV0S25vYiIsInJhbmdlSW5wdXRMYWJlbCIsInJhbmdlSW5wdXRUcmFjayIsIiRyYW5nZUlucHV0IiwiJHRoaXNSYW5nZUlucHV0IiwiJHRoaXNNaW5Lbm9iIiwiJHRoaXNNYXhLbm9iIiwiJHNpbmdsZUxhYmVsIiwiJHRoaXNUcmFjayIsIiR0aGlzS25vYiIsInN0b3JlQ3Vyc29yUG9zIiwibW92ZUtub2IiLCJhYnNNaW4iLCJhYnNNYXgiLCJtaW5WYWx1ZSIsIm1heFZhbHVlIiwib2Zmc2V0WCIsIm1pblBvc1giLCJtYXhQb3NYIiwiY3Vyc29yUG9zWCIsInNldCIsInRoaXNQcm9wcyIsInRoaXNBYnNNaW4iLCJ0aGlzQWJzTWF4IiwiYWRqdXN0TGFiZWxzIiwiJHRoaXNNaW5MYWJlbCIsIiR0aGlzTWF4TGFiZWwiLCIkdGhpc1NpbmdsZUxhYmVsIiwibWluS25vYlJpZ2h0RWRnZSIsIm1heEtub2JMZWZ0RWRnZSIsIm1pbkxhYmVsV2lkdGgiLCJtYXhMYWJlbFdpZHRoIiwic2luZ2xlTGFiZWxXaWR0aCIsIiRrbm9iIiwiZVBvc1giLCJuZXdDdXJzb3JQb3MiLCIkdGhpc01pbklucHV0IiwiJHRoaXNNYXhJbnB1dCIsImlzTWluS25vYiIsImlzTWF4S25vYiIsInBvc1giLCJ0aGlzS25vYlZhbHVlIiwiaW5wdXRWYWx1ZSIsImN1cnNvck9mZnNldCIsIlJhdGluZ0lucHV0IiwiJHJhdGluZ1NlbGVjdCIsIiRyYXRpbmdJbnB1dCIsIiR0aGlzUmF0aW5nSW5wdXQiLCIkdGhpc1JhdGluZ1NlbGVjdCIsIiR0aGlzUmF0aW5nU3RhcnMiLCJzZXRTY29yZSIsInN1Ym1pdFNjb3JlIiwibG9jayIsInVubG9jayIsInNjb3JlIiwiZ2V0U2NvcmVGcm9tTW9kaWZpZXIiLCJTY3JvbGxLZXlzIiwiY3VycmVudEhvb2siLCJ0b3RhbEhvb2tzIiwic2Nyb2xsU3BlZWQiLCIkaG9va3MiLCIkc2Nyb2xsQnV0dG9ucyIsImVuYWJsZVNjcm9sbEtleXMiLCJob29rcyIsImRldGVjdEN1cnJlbnRIb29rIiwic2Nyb2xsVG9Ib29rIiwiZGlyZWN0aW9uIiwic2V0Q3VycmVudEhvb2siLCJoaWdobGlnaHRCdG4iLCJidG5JbmRleCIsIiRidG4iLCJTY3JvbGxQcm9ncmVzcyIsIiRzY3JvbGxQcm9ncmVzc0JhciIsImRvY3VtZW50SGVpZ2h0Iiwid2luZG93SGVpZ2h0IiwidG90YWxTY3JvbGwiLCJzY3JvbGxQb3NpdGlvbiIsInNjcm9sbFByb2dyZXNzIiwidmlzaWJsZVNjcm9sbFByb2dyZXNzIiwiZW5hYmxlU2Nyb2xsUHJvZ3Jlc3MiLCJ2aXNpYmxlIiwiU2xpZGVyIiwiYnRuTGFiZWxOZXh0IiwiYnRuTGFiZWxQcmV2Iiwic2xpZGVDb250cm9scyIsInBhZ2VCdG5zLS10bCIsInBhZ2VCdG5zLS10ciIsInBhZ2VCdG5zLS1iciIsInBhZ2VCdG5zLS1ibCIsImZsaXBCdG5zIiwiZmxpcEJ0bnMtLWluc2V0IiwicGFnZURvdHMiLCJwYWdlRG90cy0tZGFyayIsInBhZ2VEb3RzLS1zdWJ0bGUiLCIkc2xpZGVyIiwic2xpZGVySW5kZXgiLCIkdGhpc1NsaWRlciIsIiR0aGlzU2xpZGVzIiwic2xpZGVJbmRleCIsInRvdGFsU2xpZGVzIiwidHJhbnNpdGlvbiIsImFkanVzdEhlaWdodCIsImNvbnRyb2wiLCJ0aGlzQ29udHJvbHMiLCJzdG9wQXV0b3BsYXkiLCJzaG93U2xpZGUiLCJpbnNlcnRCZWZvcmUiLCJwYWdpbmF0aW9uTGlua3MiLCJsaW5rSW5kZXgiLCJjbGlja2FibGUiLCJhdXRvcGxheSIsInN0YXJ0QXV0b3BsYXkiLCJhcHBseVRyYW5zaXRpb24iLCJ1cGRhdGVQYWdpbmF0aW9uIiwibmV4dFNsaWRlSW5kZXgiLCJjdXJyZW50U2xpZGVJbmRleCIsImxlZnRPZmZzZXQiLCJ0aGlzU2xpZGVJbmRleCIsIiR0aGlzU2xpZGVzV3JhcHBlciIsInNsaWRlSGVpZ2h0IiwidGhpc1NsaWRlSGVpZ2h0IiwiU3RlcHBlciIsImJ0bkxhYmVsTW9yZSIsImJ0bkxhYmVsTGVzcyIsIiRzdGVwcGVyQnRucyIsIiRzdGVwcGVyIiwiJHRoaXNTdGVwcGVyIiwiaW5jcmVhc2VJdGVtQ291bnQiLCJkZWNyZWFzZUl0ZW1Db3VudCIsInZhbGlkYXRlSW5wdXQiLCJjdXJyZW50VmFsdWUiLCJyZXNldEl0ZW1Db3VudCIsInNldEl0ZW1Db3VudCIsInJlbW92ZUVycm9yRm9ybWF0dGluZyIsImNsZWFySXRlbUNvdW50IiwiYWRkRXJyb3JGb3JtYXR0aW5nIiwiJHR4dEZpZWxkIiwiY291bnRVcCIsImNvdW50RG93biIsInNldFRvIiwiU3dpdGNoIiwibGFiZWxPbiIsImxhYmVsT2ZmIiwiJGxhYmVsT24iLCIkbGFiZWxPZmYiLCIkc3dpdGNoIiwiJHRoaXNTd2l0Y2giLCJ0aGlzTGFiZWxPblRleHQiLCJ0aGlzTGFiZWxPZmZUZXh0Iiwic2hvd0xhYmVscyIsInNldE9uIiwic2V0T2ZmIiwic2V0VG9nZ2xlIiwiVGFibGUiLCIkdGFibGUiLCIkdGhpc1RhYmxlIiwic2VsZWN0YWJsZSIsImJlZm9yZSIsIiR0aGlzVHIiLCJzZWxlY3RSb3ciLCJyZW1vdmVhYmxlIiwicmVtb3ZlUm93IiwiJHRoaXNBbGxUciIsInVuc2VsZWN0Um93IiwidG90YWxUZHMiLCJ0YWJsZUlzRW1wdHkiLCJzZWxlY3QiLCJ1bnNlbGVjdCIsIiR0YWJzTWVudSIsIiR0aGlzVGFic01lbnUiLCJ1cmxUYWJJZCIsImhhc2giLCJmaXJzdFRhYklkIiwiaGFzaE1hdGNoZXNUYWIiLCJoYXNBY3RpdmVUYWIiLCJoYXMiLCJzdGFydFRhYklkIiwidGhpc1RhcmdldFRhYklkIiwiJHRoaXNUYWJzTWVudUl0ZW0iLCIkdGhpc1RhYnNNZW51SXRlbXMiLCIkdGhpc1RhcmdldFRhYiIsIiR0aGlzTWVudUl0ZW0iLCJ0YWJJZCIsIlRvZ2dsZUdyb3VwIiwidG9nZ2xlVGFyZ2V0R3JvdXBJdGVyYXRpb24iLCJyZXNldFRvZ2dsZURlbGF5VGltZSIsIiR0b2dnbGVHcm91cCIsIiR0aGlzVHJpZ2dlciIsImdyb3VwIiwiYWN0aXZlQ2xhc3NOYW1lIiwiJHRoaXNGYWxsQmFja0VsZW0iLCJUb29sdGlwIiwiZGVmYXVsdEZhZGVEdXJhdGlvbiIsImRlZmF1bHRTaG93RGVsYXkiLCJkZWZhdWx0SGlkZURlbGF5IiwiJHRvb2x0aXBUcmlnZ2VyIiwiJHRoaXNUb29sdGlwVHJpZ2dlciIsInN0YXRpY1Bvc2l0aW9uIiwiaGFzU3RhdGljUG9zaXRpb24iLCIkdGhpc1Rvb2x0aXAiLCJwcmVwYXJlVG9vbHRpcCIsInNldFN0YXRpY1Bvc2l0aW9uIiwiaGlkZVdpdGhEZWxheSIsInNob3dXaXRoRGVsYXkiLCJzY29wZSIsImNyZWF0ZUFuZFNob3dUb29sdGlwIiwiY29udGVudCIsImZhZGVEdXJhdGlvbiIsInRvb2x0aXBUeXBlIiwidGFyZ2V0QWxyZWFkeVByZXBhcmVkIiwiY3Vyc29yWSIsImN1cnNvclgiLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0Iiwidmlld1BvcnRXaWR0aCIsInRvb2x0aXBMZWZ0IiwidG9vbHRpcFRvcCIsInNob3dEZWxheUR1cmF0aW9uIiwic2hvd0RlbGF5IiwiaGlkZURlbGF5RHVyYXRpb24iLCJoaWRlRGVsYXkiLCJjcmVhdGUiXSwibWFwcGluZ3MiOiJBQUVBLElBQUlBO0lBS0FDO0lBQ0FDO0lBQ0FDO0lBQ0FDO0lBQ0FDO0lBSUFDLGdCQUFpQixTQUFTQyxPQUFPQztRQWE3QixLQUFLRCxVQUFVQyxjQUFjLE9BQU87UUFJcEMsSUFBSUQsTUFBTUUsUUFBUUQsaUJBQWlCLEdBQUc7WUFDbEMsT0FBTztlQUNKO1lBQ0gsT0FBTzs7O0lBS2ZF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