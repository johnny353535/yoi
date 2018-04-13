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
        }
        return YOI.elementCollection[identifier];
    },
    filterCollection: function(collectionIdentifier, filterProps) {
        var $collection = YOI.elementCollection[collectionIdentifier];
        if (YOI.elementCollection[collectionIdentifier] === undefined) return;
        YOI.elementCollection[collectionIdentifier] = $collection.filter(function() {
            if ($(this).data().props.hasOwnProperty(filterProps)) {
                return false;
            } else {
                return true;
            }
        });
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
    var currentScrollTop = $window.scrollTop();
    var viewportHeight = $window.height();
    var defaultFactor = 8;
    var observerIsRunning = false;
    function initialize($parallaxElement, options) {
        var $parallaxElement = YOI.createCollection("parallax", $parallaxElement, options);
        if ($parallaxElement) {
            $parallaxElement.each(function() {
                $(this).data().props.isParallax = true;
            });
            startScrollAgent();
            startParallaxObserver();
            updateProps();
            $window.trigger("yoi-scroll");
            $window.one("yoi-scroll", function() {
                updateProps();
                updateParallaxEnv();
                transformParallax();
            });
        }
    }
    function startScrollAgent() {
        YOI.module.ScrollAgent.init(YOI.elementCollection["parallax"]);
    }
    function updateProps() {
        YOI.elementCollection["parallax"].each(function() {
            var $this = $(this);
            var data = $this.data();
            $this.data().props.startsInViewport = data.props.initialPosY < viewportHeight;
        });
    }
    function resetProps($parallaxElement) {
        $parallaxElement.data().props = {};
    }
    function resetTransforms($parallaxElement) {
        $parallaxElement.css("transform", "none");
    }
    function resetAll() {
        YOI.elementCollection["parallax"].each(function() {
            var $this = $(this);
            resetProps($this);
            resetTransforms($this);
        });
    }
    function startParallaxObserver() {
        if (observerIsRunning) return;
        $window.on("yoi-breakpoint-change.parallax yoi-pageheight-change.parallax", function() {
            updateParallaxEnv();
            updateProps();
            transformParallax();
        }).on("yoi-scroll.parallax", function() {
            updateParallaxEnv();
            transformParallax();
        });
        observerIsRunning = true;
    }
    function transformParallax() {
        if (scrollOvershoot()) return;
        window.requestAnimationFrame(function() {
            YOI.elementCollection["parallax"].each(function() {
                var activeBreakpoint = YOI.currentBreakPoint();
                var $this = $(this);
                var data = $this.data();
                var options = $this.data().options;
                var state = data.state;
                var initialPosY = data.props.initialPosY;
                var factor = data.options.factor || defaultFactor;
                var not = options.not !== undefined ? options.not.split(",") : false;
                var allowedOnCurrentBreakpoint = $.inArray(activeBreakpoint, not) === -1;
                var scrollTopInViewport = initialPosY - (currentScrollTop + viewportHeight);
                var parallaxOffset = data.props.startsInViewport ? parseInt(currentScrollTop / factor, 10) * -1 : parseInt(scrollTopInViewport / factor, 10);
                if (state !== "out" && allowedOnCurrentBreakpoint) {
                    $this.css("transform", "translate3d(0, " + parallaxOffset + "px, 1px)");
                }
                if (!allowedOnCurrentBreakpoint) {
                    resetTransforms($this);
                }
            });
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
        $window.off("yoi-breakpoint-change.parallax yoi-pageheight-change.parallax yoi-scroll.parallax");
        YOI.filterCollection("scrollagent", "isParallax");
        resetAll();
        YOI.destroyCollection("parallax");
        observerIsRunning = false;
    }
    return {
        init: initialize,
        destroy: destroy
    };
}();

YOI.behaviour.ScrollFx = function() {
    function initialize($targetElement, options) {
        var $targetElement = YOI.createCollection("scrollfx", $targetElement, options);
        if ($targetElement) $targetElement.each(function() {
            var $thisTargetElement = $(this);
            if ($thisTargetElement.data().props.hasScrollFx) return;
            resetFxClassNames($thisTargetElement);
            prepare($thisTargetElement);
            listen($thisTargetElement);
            $thisTargetElement.data().props.hasScrollFx = true;
        });
        startBreakpointAgent();
        YOI.module.ScrollAgent.init($targetElement, options);
    }
    function startBreakpointAgent() {
        var $window = $(window);
        $window.on("yoi-breakpoint-change.scrollfx", function() {
            YOI.elementCollection["scrollfx"].each(function() {
                var $this = $(this);
                var options = $this.data().options;
                var activeBreakpoint = YOI.currentBreakPoint();
                var not = options.not !== undefined ? options.not.split(",") : false;
                $this.data().props.allowedOnCurrentBreakpoint = $.inArray(activeBreakpoint, not) === -1;
            });
        });
        $window.trigger("yoi-breakpoint-change");
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
        var props = $targetElement.data().props;
        var allowed = props.allowedOnCurrentBreakpoint;
        if (!allowed) return;
        if (fx) {
            $targetElement.removeClass("fx-" + fx + "-initial");
            $targetElement.addClass("fx-" + fx);
        }
        if (speed) {
            $targetElement.addClass("fx-" + speed);
        }
    }
    function resetFxClassNames($targetElement) {
        $targetElement.removeClass(function(index, className) {
            return (className.match(/(^|\s)fx-\S+/g) || []).join(" ");
        });
    }
    function reset($targetElement) {
        $targetElement.data().props = {};
        $targetElement.data().options = {};
        resetFxClassNames($targetElement);
    }
    function destroy() {
        reset(YOI.elementCollection["scrollfx"]);
        YOI.filterCollection("scrollagent", "hasScrollFx");
        YOI.destroyCollection("scrollfx");
        $(window).off("yoi-breakpoint-change.scrollfx");
    }
    return {
        init: initialize,
        destroy: destroy
    };
}();

YOI.behaviour.Sticky = function() {
    var $body = $("body");
    var $window = $(window);
    function initialize($stickyElement, options) {
        var $stickyElement = YOI.createCollection("sticky", $stickyElement, options);
        if ($stickyElement) {
            $stickyElement.each(function(index) {
                var $thisStickyElement = $(this);
                if ($thisStickyElement.data().props.isSticky) return;
                if ($thisStickyElement.css("position") === "fixed" || $stickyElement.css("transform") !== "none") return;
                transform($thisStickyElement, index);
                updateProps($thisStickyElement);
                $thisStickyElement.data().props.isSticky = true;
            });
            startPositionObserver();
            startStickObserver();
        }
    }
    function transform($stickyElement, index) {
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
    function reset($stickyElement, index) {
        $("#stickyPlaceholder-" + index).remove();
        $stickyElement.data().props = {};
        $stickyElement.removeAttr("style");
        $stickyElement.unwrap(".stickyWrapper");
    }
    function updateProps($stickyElement) {
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
            reset($stickyElement, index);
            if (passedValidation) transform($stickyElement, index);
            updateProps($stickyElement);
        });
        $window.trigger("yoi-scroll");
    }
    function startPositionObserver() {
        $window.on("load.sticky yoi-breakpoint-change.sticky yoi-pageheight-change.sticky", function() {
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
            var cssWidthValue = props.width;
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
                    width: cssWidthValue,
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
            reset($(this));
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
    var initialized = false;
    var $window = $(window);
    var viewportHeight = $window.height();
    var lastScrollTop = 0;
    var currentScrollTop = 0;
    function initialize($targetElement) {
        if ($targetElement instanceof jQuery) YOI.createCollection("scrollagent", $targetElement);
        if (!initialized) {
            $window.on("load.yoi-scrollAgent resize.yoi-scrollAgent yoi-pageheight-change.scrollAgent", function() {
                update();
            }).on("yoi-scroll.scrollAgent", function() {
                observe();
            });
            initialized = true;
        }
        update();
        $window.off("scroll.yoi-scrollAgent").on("scroll.yoi-scrollAgent", function() {
            broadcast();
        });
    }
    function update() {
        viewportHeight = $window.height();
        var $collection = YOI.elementCollection["scrollagent"] || false;
        if ($collection) $collection.each(function() {
            var $targetElement = $(this);
            var thisHeight = $targetElement.outerHeight();
            var thisInitialPosY = $targetElement.offset().top;
            var props = $targetElement.data().props;
            props.height = thisHeight;
            props.initialPosY = thisInitialPosY;
            if ($window.scrollTop() < thisInitialPosY && $window.height() > thisInitialPosY + 10) {
                $targetElement.data().state = "in";
                $targetElement.trigger("yoi-viewport-in");
            } else {
                $targetElement.data().state = "out";
            }
        });
    }
    function observe() {
        currentScrollTop = $window.scrollTop();
        var $collection = YOI.elementCollection["scrollagent"] || false;
        if ($collection) $collection.each(function(index) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy95b2kuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9kaXNtaXNzLmpzIiwic3JjL2pzL2JlaGF2aW91cnMvbGF6eWxvYWQuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9wYXJhbGxheC5qcyIsInNyYy9qcy9iZWhhdmlvdXJzL3Njcm9sbGZ4LmpzIiwic3JjL2pzL2JlaGF2aW91cnMvc3RpY2t5LmpzIiwic3JjL2pzL2FjdGlvbnMvYmxpbmsuanMiLCJzcmMvanMvYWN0aW9ucy9oaWRlLmpzIiwic3JjL2pzL2FjdGlvbnMvcHVsc2UuanMiLCJzcmMvanMvYWN0aW9ucy9zY3JvbGx0by5qcyIsInNyYy9qcy9hY3Rpb25zL3Nob3cuanMiLCJzcmMvanMvYWN0aW9ucy91cGRhdGUuanMiLCJzcmMvanMvbW9kdWxlcy9icm93c2VyaGlzdG9yeS5qcyIsInNyYy9qcy9tb2R1bGVzL2tleWJvYXJkYWdlbnQuanMiLCJzcmMvanMvbW9kdWxlcy9yZXNpemVhZ2VudC5qcyIsInNyYy9qcy9tb2R1bGVzL3Njcm9sbGFnZW50LmpzIiwic3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbi5qcyIsInNyYy9jb21wb25lbnRzL2NvZGUvY29kZS5qcyIsInNyYy9jb21wb25lbnRzL2NvdW50ZG93bi9jb3VudGRvd24uanMiLCJzcmMvY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXIuanMiLCJzcmMvY29tcG9uZW50cy9kb2NrL2RvY2suanMiLCJzcmMvY29tcG9uZW50cy9maWx0ZXJidG5zL2ZpbHRlcmJ0bnMuanMiLCJzcmMvY29tcG9uZW50cy9mbHlvdXQvZmx5b3V0LmpzIiwic3JjL2NvbXBvbmVudHMvZm9ybS9jdXN0b21mb3JtZWxlbWVudHMuanMiLCJzcmMvY29tcG9uZW50cy9pY29uL2ljb24uanMiLCJzcmMvY29tcG9uZW50cy9pbWdtYWduaWZpZXIvaW1nbWFnbmlmaWVyLmpzIiwic3JjL2NvbXBvbmVudHMvbG9nL2xvZy5qcyIsInNyYy9jb21wb25lbnRzL21heGNoYXJzL21heGNoYXJzLmpzIiwic3JjL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMiLCJzcmMvY29tcG9uZW50cy9wYWdlcmV3aW5kL3BhZ2VyZXdpbmQuanMiLCJzcmMvY29tcG9uZW50cy9waWNrYnRuL3BpY2tidG4uanMiLCJzcmMvY29tcG9uZW50cy9waWVjaGFydC9waWVjaGFydC5qcyIsInNyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5qcyIsInNyYy9jb21wb25lbnRzL3JhbmdlaW5wdXQvcmFuZ2VpbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL3JhdGluZ2lucHV0L3JhdGluZ2lucHV0LmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xsa2V5cy9zY3JvbGxrZXlzLmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xscHJvZ3Jlc3Mvc2Nyb2xscHJvZ3Jlc3MuanMiLCJzcmMvY29tcG9uZW50cy9zbGlkZXIvc2xpZGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3RlcHBlci9zdGVwcGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3dpdGNoL3N3aXRjaC5qcyIsInNyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmpzIiwic3JjL2NvbXBvbmVudHMvdGFicy90YWJzLmpzIiwic3JjL2NvbXBvbmVudHMvdG9nZ2xlZ3JvdXAvdG9nZ2xlZ3JvdXAuanMiLCJzcmMvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuanMiXSwibmFtZXMiOlsiWU9JIiwiZWxlbWVudENvbGxlY3Rpb24iLCJhY3Rpb24iLCJiZWhhdmlvdXIiLCJjb21wb25lbnQiLCJtb2R1bGUiLCJzdHJpbmdDb250YWlucyIsImlucHV0Iiwic2VhcmNoU3RyaW5nIiwiaW5kZXhPZiIsInplcm9QYWQiLCJudW0iLCJkaWdpdHMiLCJNYXRoIiwiYWJzIiwiaSIsImxlYWRpbmdaZXJvcyIsInNsaWNlIiwiZm91bmRNb2R1bGUiLCJ3aW5kb3ciLCJmb3VuZENvbXBvbmVudCIsInNldERlbGF5IiwiZGVsYXlOYW1lIiwiZGVsYXlUaW1lIiwiZGVsYXlGdW5jdGlvbiIsInRoaXMiLCJjbGVhckRlbGF5Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInVuZGVmaW5lZCIsInNldEludGVydmFsIiwiaW50ZXJ2YWxOYW1lIiwiaW50ZXJ2YWxUaW1lIiwiaW50ZXJ2YWxGdW5jdGlvbiIsImNsZWFySW50ZXJ2YWwiLCJ0b09iamVjdCIsImtleVZhbHVlUGFpciIsInByb3Blck9iamVjdCIsInZhbHVlU3RhcnRNYXJrZXIiLCJrZXlWYWx1ZVBhaXJFbmRNYXJrZXIiLCJyZXBsYWNlIiwic3BsaXQiLCJsZW5ndGgiLCJ0cmltIiwidG9Cb29sZWFuIiwidG9Mb3dlckNhc2UiLCJnZXRBdHRyaWJ1dGUiLCIkZWxlbWVudCIsInlvaUF0dHJpYnV0ZVZhbHVlIiwiJCIsImVhY2giLCJhdHRyaWJ1dGVzIiwiaW5kZXgiLCJhdHRyaWJ1dGUiLCJuYW1lIiwibWF0Y2giLCJ2YWx1ZSIsImhpZGUiLCIkdGFyZ2V0IiwialF1ZXJ5IiwiaGFzQ2xhc3MiLCJkYXRhIiwicmVtb3ZlQ2xhc3MiLCJzaG93IiwiaGFzT3duUHJvcGVydHkiLCJhZGRDbGFzcyIsImlzTnVtYmVyIiwiaW5wdXRWYWwiLCJwYXR0ZXJuIiwidGVzdFZhbCIsInRvU3RyaW5nIiwidGVzdCIsIm5vRm9jdXMiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJ0YWdOYW1lIiwidGhyb3R0bGUiLCJ0YXJnZXRGdW5jdGlvbiIsImRlbGF5Iiwic25hcHNob3QiLCJEYXRlIiwibm93IiwidmFsaWRCcmVha3BvaW50Iiwia2V5d29yZCIsInZhbGlkQnJlYWtQb2ludHMiLCJwb3NpdGlvbiIsImluQXJyYXkiLCJlbnZpcm9ubWVudCIsImVudk5hbWUiLCJkZWZhdWx0RW52aXJvbm1lbnQiLCJjdXJyZW50RW52aXJvbm1lbnQiLCJhdHRyIiwibG9jYWxlIiwibGFuZ3VhZ2UiLCJkZWZhdWx0TGFuZ3VhZ2UiLCJjdXJyZW50TGFuZ3VhZ2UiLCJjdXJyZW50QnJlYWtQb2ludCIsImdldENvbXB1dGVkU3R5bGUiLCJib2R5IiwiZ2V0UHJvcGVydHlWYWx1ZSIsImJsaW5rIiwiJGVsZW0iLCJ0aW1lcyIsInN0b3AiLCJhbmltYXRlIiwib3BhY2l0eSIsInB1bHNlIiwic3RhcnREb21PYnNlcnZlciIsIiRkb2N1bWVudCIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIldlYktpdE11dGF0aW9uT2JzZXJ2ZXIiLCJ0YXJnZXQiLCJtdXRhdGlvbnMiLCJmb3JFYWNoIiwibXV0YXRpb24iLCJhZGRlZE5vZGVzIiwidHJpZ2dlciIsInJlbW92ZWROb2RlcyIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiY2hhcmFjdGVyRGF0YSIsInN0b3BEb21PYnNlcnZlciIsImRpc2Nvbm5lY3QiLCJ1cGRhdGVPcHRpb25zIiwib3B0aW9ucyIsImtleSIsInVwZGF0ZVByb3BzIiwicHJvcHMiLCJ1cGRhdGVTdGF0ZSIsInN0YXRlIiwiY3JlYXRlQ29sbGVjdGlvbiIsImlkZW50aWZpZXIiLCIkdGhpcyIsImFkZCIsImZpbHRlckNvbGxlY3Rpb24iLCJjb2xsZWN0aW9uSWRlbnRpZmllciIsImZpbHRlclByb3BzIiwiJGNvbGxlY3Rpb24iLCJmaWx0ZXIiLCJkZXN0cm95Q29sbGVjdGlvbiIsImJpbmRBY3Rpb24iLCJ5b2lBY3Rpb24iLCJwYXJhbXMiLCJPYmplY3QiLCJrZXlzIiwiaG9zdE9iamVjdCIsInB1YmxpY0Z1bmN0aW9uIiwiZXZlbnQiLCJvbiIsIiR0cmlnZ2VyIiwicGFyZW50IiwibWFwIiwiZSIsInByZXZlbnREZWZhdWx0IiwibWFwQWN0aW9ucyIsImlzIiwic2V0UmVhZHkiLCJpbml0aWFsaXplZCIsImlzUmVhZHkiLCJpbml0aWFsaXplIiwiaW5pdCIsIkNvZGUiLCJEaXNtaXNzIiwibG9jYWxpemF0aW9uIiwiZW4iLCJidG5MYWJlbCIsImRlIiwiJGJ0bkRpc21pc3MiLCIkZGlzbWlzc2FibGVFbGVtZW50IiwiaXNEaXNtaXNzYWJsZSIsIiR0aGlzRGlzbWlzc2FibGVFbGVtZW50IiwicG9zaXRpb25TdGF0aWMiLCJjc3MiLCJjbG9uZSIsImRpc21pc3MiLCJhcHBlbmRUbyIsIiR0YXJnZXRFbGVtZW50IiwiZmFkZU91dCIsIkxhenlsb2FkIiwiJGxhenlsb2FkIiwiaXNMYXp5bG9hZGluZyIsIm1ha2VMYXp5bG9hZCIsIiRub3NjcmlwdEVsZW1lbnQiLCIkcGxhY2VIb2xkZXIiLCJkZWZhdWx0SW1hZ2UiLCJzcmMiLCJleHRyYWN0SW1nU3JjRnJvbVN0cmluZyIsImh0bWwiLCJ3aWR0aCIsImhlaWdodCIsImFsdCIsInRpdGxlIiwibG9uZ2Rlc2MiLCJjc3NDbGFzc2VzIiwiaW5zZXJ0QWZ0ZXIiLCJuZXh0IiwiU2Nyb2xsQWdlbnQiLCJvbmUiLCJpbWFnZVVybCIsImJyZWFrUG9pbnRTbWFsbCIsImJyZWFrUG9pbnRNZWRpdW0iLCJicmVha1BvaW50TGFyZ2UiLCJicmVha1BvaW50WGxhcmdlIiwic3JjU21hbGwiLCJzcmNNZWRpdW0iLCJzcmNMYXJnZSIsInNyY1hsYXJnZSIsIiRuZXdJbWFnZSIsImNvbXBsZXRlIiwib3V0cHV0IiwiUGFyYWxsYXgiLCIkd2luZG93IiwiY3VycmVudFNjcm9sbFRvcCIsInNjcm9sbFRvcCIsInZpZXdwb3J0SGVpZ2h0IiwiZGVmYXVsdEZhY3RvciIsIm9ic2VydmVySXNSdW5uaW5nIiwiJHBhcmFsbGF4RWxlbWVudCIsImlzUGFyYWxsYXgiLCJzdGFydFNjcm9sbEFnZW50Iiwic3RhcnRQYXJhbGxheE9ic2VydmVyIiwidXBkYXRlUGFyYWxsYXhFbnYiLCJ0cmFuc2Zvcm1QYXJhbGxheCIsInN0YXJ0c0luVmlld3BvcnQiLCJpbml0aWFsUG9zWSIsInJlc2V0UHJvcHMiLCJyZXNldFRyYW5zZm9ybXMiLCJyZXNldEFsbCIsInNjcm9sbE92ZXJzaG9vdCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImFjdGl2ZUJyZWFrcG9pbnQiLCJmYWN0b3IiLCJub3QiLCJhbGxvd2VkT25DdXJyZW50QnJlYWtwb2ludCIsInNjcm9sbFRvcEluVmlld3BvcnQiLCJwYXJhbGxheE9mZnNldCIsInBhcnNlSW50IiwiZGVzdHJveSIsIm9mZiIsIlNjcm9sbEZ4IiwiJHRoaXNUYXJnZXRFbGVtZW50IiwiaGFzU2Nyb2xsRngiLCJyZXNldEZ4Q2xhc3NOYW1lcyIsInByZXBhcmUiLCJsaXN0ZW4iLCJzdGFydEJyZWFrcG9pbnRBZ2VudCIsImluRngiLCJpbiIsImJvdHRvbUZ4IiwiYm90dG9tIiwiY2VudGVyRngiLCJjZW50ZXIiLCJ0b3BGeCIsInRvcCIsInNwZWVkIiwicmVwZWF0IiwiYXBwbHlGeCIsImZ4IiwiYWxsb3dlZCIsImNsYXNzTmFtZSIsImpvaW4iLCJyZXNldCIsIlN0aWNreSIsIiRib2R5IiwiJHN0aWNreUVsZW1lbnQiLCIkdGhpc1N0aWNreUVsZW1lbnQiLCJpc1N0aWNreSIsInRyYW5zZm9ybSIsInN0YXJ0UG9zaXRpb25PYnNlcnZlciIsInN0YXJ0U3RpY2tPYnNlcnZlciIsIiRzdGlja3lQbGFjZWhvbGRlciIsIiRzdGlja3lXcmFwcGVyIiwic3RpY2t5RWxlbWVudENzc1BvcyIsInN0aWNreUVsZW1lbnRDc3NMZWZ0Iiwic3RpY2t5RWxlbWVudENzc1RvcCIsInN0aWNreUVsZW1lbnRDU1NNYXJnaW4iLCJsZWZ0Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsIm1hcmdpbiIsIm91dGVyV2lkdGgiLCJvdXRlckhlaWdodCIsImRpc3BsYXkiLCJ3cmFwIiwicmVtb3ZlIiwicmVtb3ZlQXR0ciIsInVud3JhcCIsIiRyZWZlcmVuY2VFbGVtZW50IiwicmVmZXJlbmNlIiwiZmlyc3QiLCJzdGlja3lFbGVtZW50SGVpZ2h0Iiwic3RpY2t5RWxlbWVudFdpZHRoIiwic3RpY2t5RWxlbWVudEluaXRpYWxUb3BQb3MiLCJvZmZzZXQiLCJ0b3BPZmZzZXQiLCJzdGFydCIsInRvcERpc3RhbmNlIiwic3RpY2tTdGFydCIsInN0aWNrU3RvcCIsInBhc3NlZFZhbGlkYXRpb24iLCJ2YWxpZElucHV0IiwidmFsaWRIZWlnaHQiLCJpbml0aWFsVG9wUG9zIiwicG9zaXRpb25PYnNlcnZlciIsInN0aWNrT2JzZXJ2ZXIiLCJjc3NXaWR0aFZhbHVlIiwiY3NzUG9zaXRpb25WYWx1ZSIsImNzc1RvcFZhbHVlIiwic3RpY2t5UGxhY2Vob2xkZXJEaXNwbGF5IiwiYmFja2ZhY2UtdmlzaWJpbGl0eSIsInotaW5kZXgiLCJCbGluayIsIkhpZGUiLCJzZWxlY3RvcnMiLCJ0YXJnZXRTZWxlY3RvciIsIlB1bHNlIiwiU2Nyb2xsVG8iLCJzY3JvbGxSb290Iiwic2Nyb2xsaW5nRWxlbWVudCIsImRvY3VtZW50RWxlbWVudCIsIiRzY3JvbGxDb250ZXh0IiwiJHNjcm9sbENvbnRhaW5lciIsImNsb3Nlc3QiLCJoaWdobGlnaHQiLCJzY3JvbGxQb3NZIiwiVGFicyIsInN3aXRjaFRvIiwidGFyZ2V0SWQiLCJ3aGVuIiwiZG9uZSIsIlNob3ciLCJVcGRhdGUiLCJyZXF1ZXN0VHlwZSIsInR5cGUiLCJyZXF1ZXN0VXJsIiwidXJsIiwiZXJyb3JUaXRsZSIsImVycm9yTXNnIiwiJGVycm9yTXNnIiwiJHNwaW5uZXIiLCJ0b1VwcGVyQ2FzZSIsImFqYXgiLCJjYWNoZSIsImJlZm9yZVNlbmQiLCJhcHBlbmQiLCJlcnJvciIsInN1Y2Nlc3MiLCIkcmVzcG9uc2UiLCJCcm93c2VySGlzdG9yeSIsInB1c2hIYXNoIiwiaGFzaFN0cmluZyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicmVwbGFjZUhhc2giLCJyZXBsYWNlU3RhdGUiLCJjbGVhckhhc2giLCJLZXlib2FyZEFnZW50IiwiMzgiLCIzOSIsIjQwIiwiMzciLCIxMyIsIjMyIiwiMjciLCI5Iiwia2V5Q29kZSIsIndoaWNoIiwiYWRkVGFiRm9jdXMiLCIkZWxlbWVudHMiLCIkYWN0aXZlRWxlbWVudCIsIlJlc2l6ZWFnZW50IiwibGFzdEJyZWFrUG9pbnQiLCJhY3RpdmVCcmVha1BvaW50IiwibGFzdFBhZ2VIZWlnaHQiLCJjdXJyZW50UGFnZUhlaWdodCIsInJlcG9ydFJlc2l6ZUNoYW5nZSIsInJlcG9ydEJyZWFrUG9pbnRDaGFuZ2UiLCJyZWFkeSIsIm9ic2VydmVQYWdlSGVpZ2h0Q2hhbmdlIiwibGFzdFNjcm9sbFRvcCIsInVwZGF0ZSIsImJyb2FkY2FzdCIsInRoaXNIZWlnaHQiLCJ0aGlzSW5pdGlhbFBvc1kiLCJ0cmFuc2Zvcm1ZIiwicGFyc2VGbG9hdCIsInZpZXdwb3J0SW4iLCJ2aWV3cG9ydEJvdHRvbSIsInZpZXdwb3J0Q2VudGVyIiwidmlld3BvcnRUb3AiLCJ2aWV3cG9ydE91dCIsImlzU2Nyb2xsaW5nIiwiQWNjb3JkaW9uIiwia2V5Ym9hcmRFdmVudHNBZGRlZCIsIiRhY2NvcmRpb24iLCIkdGhpc0FjY29yZGlvbiIsIiR0aGlzU2VjdGlvbnMiLCJmaW5kIiwiZXZlbnRUeXBlIiwiJHRoaXNTZWN0aW9uIiwiJHRoaXNIZWFkZXIiLCIkdGhpc0JvZHkiLCJzbGlkZVVwIiwidG9nZ2xlU2VjdGlvbiIsImFkZEtleWJvYXJkRXZlbnRzIiwiJHNlY3Rpb24iLCJsaW5rZWQiLCJjbG9zZUFsbFNlY3Rpb25zIiwib3BlblNlY3Rpb24iLCJjbG9zZVNlY3Rpb24iLCJzbGlkZURvd24iLCJwcm9taXNlIiwidGhlbiIsIiR0YXJnZXRzIiwib3BlbkFsbFNlY3Rpb25zIiwiY2xvc2UiLCJvcGVuIiwiY2xvc2VBbGwiLCJvcGVuQWxsIiwidG9nZ2xlIiwiJGNvZGVXcmFwcGVyIiwidGFiUGFnZUluZGV4IiwiJHRoaXNDb2RlV3JhcHBlciIsIiR0aGlzQ29kZSIsImV4YW1wbGVUYWciLCJleGFtcGxlVGFnVGFiYmVkIiwidGhpc0V4YW1wbGUiLCJ0ZXh0IiwidGhpc0V4YW1wbGVUYWJiZWQiLCJtYXJrdXAiLCJmaXJzdEluZGV4Iiwic2Vjb25kSW5kZXgiLCJhZGRDb3B5QnRuIiwicmVwbGFjZVdpdGgiLCJ0cnVuY2F0ZSIsImNvcHlUb0NsaXBib2FyZFN1cHBvcnRlZCIsInF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCIsIiRtYXJrdXAiLCIkY29weUJ0biIsIiRjb2RlU291cmNlIiwiY29kZUhhc1JlbmRlcmVkRXhhbXBsZSIsIiRjb2RlIiwiY29weVRvQ2xpcEJvYXJkIiwiJHNvdXJjZSIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsInJhbmdlIiwiY3JlYXRlUmFuZ2UiLCJzZWxlY3ROb2RlQ29udGVudHMiLCJhZGRSYW5nZSIsImV4ZWNDb21tYW5kIiwicmVtb3ZlQWxsUmFuZ2VzIiwiJHRoaXNDb2RlU291cmNlIiwiZXEiLCIkZXhwYW5kQnRuIiwiY29kZUhlaWdodCIsImxpbmVIZWlnaHQiLCJtYXhDb2RlSGVpZ2h0IiwiQ291bnRkb3duIiwiZGF5cyIsImhvdXJzIiwibWludXRlcyIsInNlY29uZHMiLCIkY291bnRkb3duQ2hhcmFjdGVyIiwiJGNvdW50ZG93bkNoYXJhY3RlckxhYmVsIiwiJGNvdW50ZG93bkNsb2NrIiwiJGNvdW50ZG93biIsIiR0aGlzQ291bnRkb3duIiwiZGVmYXVsdFllYXIiLCJnZXRGdWxsWWVhciIsImRlZmF1bHRNb250aCIsImRlZmF1bHREYXkiLCJkZWZhdWx0SG91ciIsImRlZmF1bHRNaW51dGUiLCJkZWZhdWx0U2Vjb25kIiwieWVhciIsIm1vbnRoIiwiZGF5IiwiaG91ciIsIm1pbnV0ZSIsInNlY29uZCIsImVuZFRpbWUiLCJnZXREYXRlU3RyaW5nIiwicmVuZGVyIiwidGltZVJlbWFpbmluZyIsImdldFRpbWVSZW1haW5pbmciLCJsY2RDaGFyYWN0ZXJzIiwiZ2V0TGNkQ2hhcmFjdGVyc0NTU0NsYXNzTmFtZXMiLCIkaGlkZGVuTGFiZWwiLCIkdGhpc0NvdW50ZG93bkNsb2NrIiwidW5pdCIsIiRjb3VudGRvd25DaGFycyIsIiRjb3VudGRvd25MYWJlbCIsImdldENoYXJhY3RlckxhYmVsIiwidG90YWwiLCJzZWxlY3RvciIsImxhYmVsVHh0IiwibW9udGhzIiwiZW5kVGltZUlzb1N0cmluZyIsInBhcnNlIiwiZmxvb3IiLCJjaGFyQXQiLCIkbGFiZWwiLCJEYXRlUGlja2VyIiwid2Vla0RheXMiLCJtb250aE5hbWVzIiwiJGRhdGVQaWNrZXIiLCIkd2Vla0RheXNIZWFkZXIiLCIkZGF0ZXBpY2tlciIsImdldEN1cnJlbnREYXRlIiwiJHRoaXNEYXRlSW5wdXQiLCJpbnB1dFllYXIiLCJpbnB1dE1vbnRoIiwiaW5wdXREYXkiLCJ1cGRhdGVEYXRlSW5wdXQiLCIkdGhpc0RhdGVQaWNrZXIiLCJyZW5kZXJEYXRlUGlja2VyIiwiJHRoaXNEYXRlSW5wdXRXcmFwcGVyIiwiYWZ0ZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJ0aGlzRGF0ZUlucHV0UHJvcHMiLCJyZW5kZXJNb250aFRhYmxlIiwic2VsZWN0ZWRZZWFyIiwic2VsZWN0ZWRNb250aCIsImhpZGVBbGxEYXRlUGlja2VycyIsInBsYWNlRGF0ZVBpY2tlciIsInVwZGF0ZURhdGVQaWNrZXIiLCJzZWxlY3RlZERheSIsImZvcm1hdHRlZFNlbGVjdGVkRGF0ZSIsInVwZGF0ZU1vbnRoVGFibGUiLCIkdGhpc01vbnRoVGFibGUiLCJmaXJzdERheUluc3RhbmNlIiwiZmlyc3REYXkiLCJnZXREYXkiLCJ0b3RhbERheXMiLCJnZXRUb3RhbERheXMiLCJmb3JtYXR0ZWREYXRlIiwidmFsIiwiJG1vbnRoVGFibGUiLCIkbW9udGhUYWJsZUJvZHkiLCJ0aGlzTW9udGhUYWJsZVByb3BzIiwidGhpc0RhdGVQaWNrZXJQcm9wcyIsImluZGV4Q2VsbCIsImluZGV4RGF5IiwiY2VpbCIsIiRyb3ciLCJqIiwiJGNlbGwiLCJwaWNrRGF0ZSIsIiR0aGlzTW9udGhCdXR0b24iLCIkdGhpc0RhdGVwaWNrZXIiLCJ0aGlzQWN0aW9uIiwicHJldiIsImZvY3VzIiwiJHRoaXNDZWxsIiwiY3VycmVudERhdGUiLCJ3ZWVrRGF5IiwiZ2V0RGF0ZSIsImdldE1vbnRoIiwiYWRqdXN0WWVhciIsImdldFllYXIiLCJkYXlzSW5Nb250aHMiLCIkZGF0ZUlucHV0IiwiZGF0ZUlucHV0T2Zmc2V0WSIsImRhdGVJbnB1dEhlaWdodCIsImRhdGVQaWNrZXJIZWlnaHQiLCJ2aWV3UG9ydEhlaWdodCIsInBsYWNlIiwiRG9jayIsIiRkb2NrIiwiJHRoaXNEb2NrIiwiYXV0b2hpZGUiLCJGaWx0ZXJCdG5zIiwiJGZpbHRlckJ0bnMiLCIkdGhpc0ZpbHRlckJ0bnMiLCIkdGhpc0J0biIsIkZseW91dCIsIiRmbHlvdXQiLCIkdGhpc0ZseW91dCIsImRldGFjaCIsIiRmbHlvdXRIYW5kbGUiLCJDdXN0b21Gb3JtRWxlbWVudHMiLCIkY2hlY2tCb3hXcmFwcGVyIiwiJHJhZGlvQnRuV3JhcHBlciIsIiRzZWxlY3RXcmFwcGVyIiwiJHNlbGVjdEljb24iLCIkY2hlY2tFbGVtbnMiLCIkY2hlY2tCb3hlcyIsIiRyYWRpb0J0bnMiLCIkc2VsZWN0cyIsIiR0aGlzQ2hlY2tib3giLCJpc1dyYXBwZWRJbkxhYmVsIiwicGFyZW50cyIsImJsdXIiLCJjaGFuZ2UiLCJ0b2dnbGVDbGFzcyIsIiR0aGlzUmFkaW9CdG4iLCJncm91cE5hbWUiLCIkZ3JvdXBlZEJ0bnMiLCIkdGhpc1NlbGVjdCIsIiR0aGlzU2VsZWN0V3JhcHBlciIsIiR0aGlzU2VsZWN0SWNvbiIsInRoaXNXcmFwcGVyIiwiSWNvbiIsIiRpY29uIiwiJHRoaXNJY29uIiwiJGljb25TdmciLCJpY29uQ2xhc3NOYW1lcyIsInNvdXJjZSIsImRhdGFUeXBlIiwiSW1nTWFnbmlmaWVyIiwiJGN1cnNvciIsIiR2aWV3ZXIiLCJkZWZhdWx0U3RhcnRWaWV3ZXJEZWxheVRpbWUiLCIkaW1nTWFnbmlmaWVyIiwiJHRoaXNJbWdNYWduaWZpZXIiLCIkdGhpc0N1cnNvciIsIiR0aGlzVmlld2VyIiwic3RhcnRWaWV3ZXIiLCJzdG9wVmlld2VyIiwibW92ZU1hZ25pZmllciIsInNldFZpZXdlciIsInNldFpvb21JbWFnZSIsInlQb3MiLCJ4UG9zIiwidGhpc1pvb21JbWFnZVBhdGgiLCJ6b29tSW1hZ2UiLCIkdGhpc1ByZXZpZXdJbWFnZSIsInRoaXNab29tSW1hZ2UiLCJJbWFnZSIsIiR0aGlzWm9vbUltYWdlIiwieVJhdGlvIiwieFJhdGlvIiwic2V0Q3Vyc29yIiwidGhpc0N1cnNvcldpdGgiLCJ0aGlzQ3Vyc29ySGVpZ2h0IiwibWFyZ2luTGVmdCIsImZhZGVJbiIsImltZ01hZ25pZmllclByb3BzIiwiY3Vyc29yUHJvcHMiLCJwYWdlWSIsInBhZ2VYIiwibWluWSIsIm1heFkiLCJtaW5YIiwibWF4WCIsIkxvZyIsIndyaXRlIiwiJGxvZyIsImxvZ0lucHV0IiwibWVtb3J5IiwidW5zaGlmdCIsIiRsb2dCb2R5IiwibG9nTWVtb3J5IiwibG9nT3V0cHV0IiwiY2xlYXIiLCJNYXhDaGFycyIsImRlZmF1bHRNYXhMZW5ndGgiLCIkaW5wdXRFbGVtZW50IiwiJHRoaXNJbnB1dEVsZW1lbnQiLCJkaXNwbGF5Q2hhcnNMZWZ0IiwidXBkYXRlSW5wdXRFbGVtZW50IiwibWF4TGVuZ3RoIiwiZXJyb3JDbGFzc05hbWVzIiwiZXJyb3JDbGFzcyIsIiRkaXNwbGF5RWxlbWVudCIsImlucHV0TGVuZ3RoIiwiY2hhcnNMZWZ0IiwiTW9kYWwiLCJtb2RhbEFjdGl2ZSIsImxvYWRlZE1vZGFscyIsImJ0bkxhYmVsQ2xvc2UiLCIkbW9kYWxDb3ZlciIsIiRtb2RhbENvbnRhaW5lciIsIiRtb2RhbENsb3NlQnRuIiwiJG1vZGFsVGVtcGxhdGUiLCIkbW9kYWxUcmlnZ2VyIiwicHJlcGFyZURvbSIsIiR0aGlzTW9kYWxUcmlnZ2VyIiwidGhpc01vZGFsR2VuZXJhdGUiLCJnZW5lcmF0ZSIsInRoaXNNb2RhbFRpdGxlIiwidGhpc01vZGFsQm9keSIsInRoaXNNb2RhbElkIiwiaWQiLCJ0aGlzTW9kYWxNb2RpZmllcnMiLCJtb2RpZmllcnMiLCJ0aGlzTW9kYWxQYXRoIiwicGF0aCIsInRoaXNNb2RhbENhY2hlIiwibG9hZCIsImluaXRpYWxpemVDbG9zZVRyaWdnZXJzIiwiZG9tUHJlcGFyZWQiLCJmb3VuZE1vZGFsIiwibW9kYWxJZCIsInRyaWdnZXJzIiwiJHRoaXNNb2RhbCIsIiR0aGlzTW9kYWxUaXRsZSIsIiR0aGlzTW9kYWxCb2R5IiwicHVzaCIsIm1vZGFsUGF0aCIsImNhbGxiYWNrIiwiJGxvYWRCaW4iLCJyZXNwb25zZSIsInN0YXR1cyIsInhociIsIiRpbWFnZXMiLCJ0b3RhbEltYWdlcyIsImltYWdlQ291bnRlciIsIm9wZW5GYWxsYmFja0xpbmsiLCIkbW9kYWwiLCJvZmZTZXRZIiwibW9kYWxGaXRzSW50b1ZpZXdwb3J0IiwibWFyZ2luVG9wIiwicHJvdG9jb2wiLCJob3N0IiwiUGFnZVJld2luZCIsIiRwYWdlUmV3aW5kIiwidGhyZXNob2xkIiwiZW5hYmxlUGFnZVJld2luZCIsInJ1biIsInNjcm9sbCIsIlBpY2tCdG4iLCIkcGlja0J0biIsIiR0aGlzUGlja0J0biIsInByZXBlbmQiLCJhY3RpdmF0ZSIsIiRyYWRpb0lucHV0IiwicHJvcCIsIlBpZUNoYXJ0IiwiJGNvbG9yRG90IiwiZml4ZWRQYWxldHRlIiwiJHBpZUNoYXJ0IiwiJHRoaXNQaWVDaGFydCIsIiR0aGlzUGllQ2hhcnRSZWNvcmRzIiwiJHRoaXNQaWVDaGFydFN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsInNpemUiLCJwYWxldHRlIiwicm90YXRpb24iLCJyZWNvcmRzIiwic2V0QXR0cmlidXRlIiwiJHRoaXNSZWNvcmQiLCJ0aGlzVmFsdWUiLCJhZGRDaGFydERhdGEiLCJoaWdobGlnaHRSZWNvcmQiLCJyZXNldEhpZ2hsaWdodFJlY29yZCIsImJsaW5rUmVjb3JkIiwic2V0Rml4ZWRTbGljZUNvbG9ycyIsInNldFJhbmRvbVNsaWNlQ29sb3JzIiwic2V0U2xpY2VTaGFkZXMiLCJzZXRVbmlxdWVTbGljZUNvbG9ycyIsIiR0aGlzUGF0aHMiLCIkdGhpc0NpcmNsZXMiLCIkdGhpc0RvdHMiLCJ0b3RhbFNsaWNlcyIsImJhc2VDb2xvciIsIkpTT04iLCJzdGFydFJhZGl1cyIsInN0YXJ0U2F0dXJhdGlvbiIsInN0YXJ0THVtaW5hbmNlIiwic3BsaXRSYWRpdXMiLCJyYWRpdXMiLCJyYW5kb21Db2xvciIsInJhbmRvbSIsInNwbGl0THVtaW5hbmNlIiwibHVtaW5hbmNlIiwiJHRoaXNQaWVTbGljZSIsIm1pbiIsIm1heCIsIngiLCJjb3MiLCJQSSIsInkiLCJzaW4iLCJsb25nQXJjIiwiZCIsInRoaXNJbmRleCIsIiRzbGljZXMiLCJzaWJsaW5ncyIsImZhZGVUbyIsIiR0aGlzUmVjb3JkcyIsIlBvcE92ZXIiLCIkcG9wT3ZlclRyaWdnZXIiLCIkdGhpc1BvcE92ZXJUcmlnZ2VyIiwiJHRoaXNQb3BPdmVyIiwidmFsaWRFdmVudHMiLCJwcmV2ZW50RGVmYXVsdENsaWNrIiwiZXZlbnRTaG93IiwiZXZlbnRIaWRlIiwiaGlkZUFsbCIsInJlbW92ZVRvZ2dsZUNsYXNzIiwic2V0UG9zaXRpb24iLCJjc3NDbGFzc05hbWUiLCJwb3MiLCJyZWYiLCJSYW5nZUlucHV0Iiwia25vYk9mZnNldCIsInJhbmdlSW5wdXRLbm9iIiwicmFuZ2VJbnB1dExhYmVsIiwicmFuZ2VJbnB1dFRyYWNrIiwiJHJhbmdlSW5wdXQiLCIkdGhpc1JhbmdlSW5wdXQiLCIkdGhpc01pbktub2IiLCIkdGhpc01heEtub2IiLCIkc2luZ2xlTGFiZWwiLCIkdGhpc1RyYWNrIiwiJHRoaXNLbm9iIiwic3RvcmVDdXJzb3JQb3MiLCJtb3ZlS25vYiIsImFic01pbiIsImFic01heCIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJvZmZzZXRYIiwibWluUG9zWCIsIm1heFBvc1giLCJjdXJzb3JQb3NYIiwic2V0IiwidGhpc1Byb3BzIiwidGhpc0Fic01pbiIsInRoaXNBYnNNYXgiLCJhZGp1c3RMYWJlbHMiLCIkdGhpc01pbkxhYmVsIiwiJHRoaXNNYXhMYWJlbCIsIiR0aGlzU2luZ2xlTGFiZWwiLCJtaW5Lbm9iUmlnaHRFZGdlIiwibWF4S25vYkxlZnRFZGdlIiwibWluTGFiZWxXaWR0aCIsIm1heExhYmVsV2lkdGgiLCJzaW5nbGVMYWJlbFdpZHRoIiwiJGtub2IiLCJlUG9zWCIsIm5ld0N1cnNvclBvcyIsIiR0aGlzTWluSW5wdXQiLCIkdGhpc01heElucHV0IiwiaXNNaW5Lbm9iIiwiaXNNYXhLbm9iIiwicG9zWCIsInRoaXNLbm9iVmFsdWUiLCJpbnB1dFZhbHVlIiwiY3Vyc29yT2Zmc2V0IiwiUmF0aW5nSW5wdXQiLCIkcmF0aW5nU2VsZWN0IiwiJHJhdGluZ0lucHV0IiwiJHRoaXNSYXRpbmdJbnB1dCIsIiR0aGlzUmF0aW5nU2VsZWN0IiwiJHRoaXNSYXRpbmdTdGFycyIsInNldFNjb3JlIiwic3VibWl0U2NvcmUiLCJsb2NrIiwidW5sb2NrIiwic2NvcmUiLCJnZXRTY29yZUZyb21Nb2RpZmllciIsIlNjcm9sbEtleXMiLCJjdXJyZW50SG9vayIsInRvdGFsSG9va3MiLCJzY3JvbGxTcGVlZCIsIiRob29rcyIsIiRzY3JvbGxCdXR0b25zIiwiZW5hYmxlU2Nyb2xsS2V5cyIsImhvb2tzIiwiZGV0ZWN0Q3VycmVudEhvb2siLCJzY3JvbGxUb0hvb2siLCJkaXJlY3Rpb24iLCJzZXRDdXJyZW50SG9vayIsImhpZ2hsaWdodEJ0biIsImJ0bkluZGV4IiwiJGJ0biIsIlNjcm9sbFByb2dyZXNzIiwiJHNjcm9sbFByb2dyZXNzQmFyIiwiZG9jdW1lbnRIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJ0b3RhbFNjcm9sbCIsInNjcm9sbFBvc2l0aW9uIiwic2Nyb2xsUHJvZ3Jlc3MiLCJ2aXNpYmxlU2Nyb2xsUHJvZ3Jlc3MiLCJlbmFibGVTY3JvbGxQcm9ncmVzcyIsInZpc2libGUiLCJTbGlkZXIiLCJidG5MYWJlbE5leHQiLCJidG5MYWJlbFByZXYiLCJzbGlkZUNvbnRyb2xzIiwicGFnZUJ0bnMtLXRsIiwicGFnZUJ0bnMtLXRyIiwicGFnZUJ0bnMtLWJyIiwicGFnZUJ0bnMtLWJsIiwiZmxpcEJ0bnMiLCJmbGlwQnRucy0taW5zZXQiLCJwYWdlRG90cyIsInBhZ2VEb3RzLS1kYXJrIiwicGFnZURvdHMtLXN1YnRsZSIsIiRzbGlkZXIiLCJzbGlkZXJJbmRleCIsIiR0aGlzU2xpZGVyIiwiJHRoaXNTbGlkZXMiLCJzbGlkZUluZGV4IiwidG90YWxTbGlkZXMiLCJ0cmFuc2l0aW9uIiwiYWRqdXN0SGVpZ2h0IiwiY29udHJvbCIsInRoaXNDb250cm9scyIsInN0b3BBdXRvcGxheSIsInNob3dTbGlkZSIsImluc2VydEJlZm9yZSIsInBhZ2luYXRpb25MaW5rcyIsImxpbmtJbmRleCIsImNsaWNrYWJsZSIsImF1dG9wbGF5Iiwic3RhcnRBdXRvcGxheSIsImFwcGx5VHJhbnNpdGlvbiIsInVwZGF0ZVBhZ2luYXRpb24iLCJuZXh0U2xpZGVJbmRleCIsImN1cnJlbnRTbGlkZUluZGV4IiwibGVmdE9mZnNldCIsInRoaXNTbGlkZUluZGV4IiwiJHRoaXNTbGlkZXNXcmFwcGVyIiwic2xpZGVIZWlnaHQiLCJ0aGlzU2xpZGVIZWlnaHQiLCJTdGVwcGVyIiwiYnRuTGFiZWxNb3JlIiwiYnRuTGFiZWxMZXNzIiwiJHN0ZXBwZXJCdG5zIiwiJHN0ZXBwZXIiLCIkdGhpc1N0ZXBwZXIiLCJpbmNyZWFzZUl0ZW1Db3VudCIsImRlY3JlYXNlSXRlbUNvdW50IiwidmFsaWRhdGVJbnB1dCIsImN1cnJlbnRWYWx1ZSIsInJlc2V0SXRlbUNvdW50Iiwic2V0SXRlbUNvdW50IiwicmVtb3ZlRXJyb3JGb3JtYXR0aW5nIiwiY2xlYXJJdGVtQ291bnQiLCJhZGRFcnJvckZvcm1hdHRpbmciLCIkdHh0RmllbGQiLCJjb3VudFVwIiwiY291bnREb3duIiwic2V0VG8iLCJTd2l0Y2giLCJsYWJlbE9uIiwibGFiZWxPZmYiLCIkbGFiZWxPbiIsIiRsYWJlbE9mZiIsIiRzd2l0Y2giLCIkdGhpc1N3aXRjaCIsInRoaXNMYWJlbE9uVGV4dCIsInRoaXNMYWJlbE9mZlRleHQiLCJzaG93TGFiZWxzIiwic2V0T24iLCJzZXRPZmYiLCJzZXRUb2dnbGUiLCJUYWJsZSIsIiR0YWJsZSIsIiR0aGlzVGFibGUiLCJzZWxlY3RhYmxlIiwiYmVmb3JlIiwiJHRoaXNUciIsInNlbGVjdFJvdyIsInJlbW92ZWFibGUiLCJyZW1vdmVSb3ciLCIkdGhpc0FsbFRyIiwidW5zZWxlY3RSb3ciLCJ0b3RhbFRkcyIsInRhYmxlSXNFbXB0eSIsInNlbGVjdCIsInVuc2VsZWN0IiwiJHRhYnNNZW51IiwiJHRoaXNUYWJzTWVudSIsInVybFRhYklkIiwiaGFzaCIsImZpcnN0VGFiSWQiLCJoYXNoTWF0Y2hlc1RhYiIsImhhc0FjdGl2ZVRhYiIsImhhcyIsInN0YXJ0VGFiSWQiLCJ0aGlzVGFyZ2V0VGFiSWQiLCIkdGhpc1RhYnNNZW51SXRlbSIsIiR0aGlzVGFic01lbnVJdGVtcyIsIiR0aGlzVGFyZ2V0VGFiIiwiJHRoaXNNZW51SXRlbSIsInRhYklkIiwiVG9nZ2xlR3JvdXAiLCJ0b2dnbGVUYXJnZXRHcm91cEl0ZXJhdGlvbiIsInJlc2V0VG9nZ2xlRGVsYXlUaW1lIiwiJHRvZ2dsZUdyb3VwIiwiJHRoaXNUcmlnZ2VyIiwiZ3JvdXAiLCJhY3RpdmVDbGFzc05hbWUiLCIkdGhpc0ZhbGxCYWNrRWxlbSIsIlRvb2x0aXAiLCJkZWZhdWx0RmFkZUR1cmF0aW9uIiwiZGVmYXVsdFNob3dEZWxheSIsImRlZmF1bHRIaWRlRGVsYXkiLCIkdG9vbHRpcFRyaWdnZXIiLCIkdGhpc1Rvb2x0aXBUcmlnZ2VyIiwic3RhdGljUG9zaXRpb24iLCJoYXNTdGF0aWNQb3NpdGlvbiIsIiR0aGlzVG9vbHRpcCIsInByZXBhcmVUb29sdGlwIiwic2V0U3RhdGljUG9zaXRpb24iLCJoaWRlV2l0aERlbGF5Iiwic2hvd1dpdGhEZWxheSIsInNjb3BlIiwiY3JlYXRlQW5kU2hvd1Rvb2x0aXAiLCJjb250ZW50IiwiZmFkZUR1cmF0aW9uIiwidG9vbHRpcFR5cGUiLCJ0YXJnZXRBbHJlYWR5UHJlcGFyZWQiLCJjdXJzb3JZIiwiY3Vyc29yWCIsInRvb2x0aXBXaWR0aCIsInRvb2x0aXBIZWlnaHQiLCJ2aWV3UG9ydFdpZHRoIiwidG9vbHRpcExlZnQiLCJ0b29sdGlwVG9wIiwic2hvd0RlbGF5RHVyYXRpb24iLCJzaG93RGVsYXkiLCJoaWRlRGVsYXlEdXJhdGlvbiIsImhpZGVEZWxheSIsImNyZWF0ZSJdLCJtYXBwaW5ncyI6IkFBRUEsSUFBSUE7SUFLQUM7SUFDQUM7SUFDQUM7SUFDQUM7SUFDQUM7SUFJQUMsZ0JBQWlCLFNBQVNDLE9B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QUFJOHNCLGFBQWE5c0IsZ0JBQWdCO1lBQ3RIOztVQUNKLEtBQUs7WUFDRDh0QixjQUFjbkIsb0JBQW9CL3JCLFNBQVNqQixPQUFPZ3RCLG9CQUFvQjVzQixlQUFlLElBQUkrc0IsYUFBYS9zQixlQUFlO1lBQ3JIZ3VCLGFBQWNwQixvQkFBb0IvckIsU0FBU3hDLE1BQU11dUIsb0JBQW9CM3NCLGdCQUFnQlk7WUFDckY7O1VBQ0osS0FBSztZQUNEa3RCLGNBQWNuQixvQkFBb0IvckIsU0FBU2pCLE9BQU9tdEIsYUFBYS9zQixlQUFlYTtZQUM5RW10QixhQUFjcEIsb0JBQW9CL3JCLFNBQVN4QyxNQUFNdXVCLG9CQUFvQjNzQixnQkFBZ0IsSUFBSThzQixhQUFhOXNCLGdCQUFnQjtZQUN0SDs7UUFNUjhzQixhQUNLOTRCLEtBQUssU0FBUSxzQkFBc0JOLFVBQ25DeUY7WUFDR3pGLFVBQVk7WUFDWmlNLE1BQVFtdUI7WUFDUjF2QixLQUFPMnZCOzs7SUFLbkIsU0FBU2IsY0FBY1AscUJBQXFCRyxjQUFjditCO1FBU3RELElBQUk0SCxVQUFvQncyQixvQkFBb0J6NkIsT0FBT2lFO1FBQ25ELElBQUk2M0Isb0JBQW9CNzNCLFFBQVE4M0IsYUFBYXpCO1FBRTdDLElBQUlqK0IsV0FBVyxTQUFTO1lBRXBCRixJQUFJcUIsU0FBUyxvQkFBb0JzK0IsbUJBQW1CO2dCQUNoRGxCLGFBQ0t4VyxPQUFPaVcscUJBQ1Bua0IsVUFDQUMsS0FBSztvQkFDRnlrQixhQUFhcDNCLFFBQVE7OztlQUk5QixJQUFJbkgsV0FBVyxRQUFRO1lBRTFCRixJQUFJMEIsV0FBVzs7O0lBTXZCLFNBQVNrOUIsY0FBY04scUJBQXFCRyxjQUFjditCO1FBUXRELElBQUk0SCxVQUFvQncyQixvQkFBb0J6NkIsT0FBT2lFO1FBQ25ELElBQUkrM0Isb0JBQW9CLzNCLFFBQVFnNEIsYUFBYTFCO1FBRTdDLElBQUlsK0IsV0FBVyxTQUFTO1lBRXBCRixJQUFJcUIsU0FBUyxvQkFBb0J3K0IsbUJBQW1CO2dCQUNoRDU4QixFQUFFLFlBQVlRO2dCQUNkZzdCLGFBQWFwM0IsUUFBUTs7ZUFHdEIsSUFBSW5ILFdBQVcsUUFBUTtZQUUxQkYsSUFBSTBCLFdBQVc7OztJQVN2QjtRQUNJd0ksTUFBVUQ7UUFDVjgxQixRQUFVaEI7UUFDVmg3QixNQUFVODZCO1FBQ1ZwN0IsTUFBVW03QjtRQUNWbE4sU0FBVUEiLCJmaWxlIjoiZGlzdC9qcy95b2kuanMifQ==