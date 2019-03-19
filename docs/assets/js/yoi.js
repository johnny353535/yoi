var YOI = {
    collection: {},
    action: {},
    behavior: {},
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
    afInterval: function(intervalTime, intervalFunction) {
        var dateNow = Date.now;
        var requestAnimation = window.requestAnimationFrame;
        var start = dateNow();
        var stop;
        var tick = function() {
            dateNow() - start < intervalTime || (start += intervalTime, intervalFunction());
            stop || requestAnimation(tick);
        };
        requestAnimation(tick);
        return {
            clear: function() {
                stop = 1;
            }
        };
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
    hide: function($element) {
        if (!YOI.isjQuery($element)) {
            return false;
        }
        if ($element.hasClass("d-block")) {
            $element.data("displayUtilityClass", "d-block");
        } else if ($element.hasClass("d-inline")) {
            $element.data("displayUtilityClass", "d-inline");
        } else if ($element.hasClass("d-inlineblock")) {
            $element.data("displayUtilityClass", "d-inlineblock");
        }
        $element.removeClass("d-block d-inline d-inlineblock");
        $element.hide();
    },
    show: function($element) {
        if (!YOI.isjQuery($element)) return false;
        if (!$element.data().hasOwnProperty("displayUtilityClass")) {
            $element.show();
        } else {
            $element.addClass($element.data("displayUtilityClass"));
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
    removeFx: function($element) {
        $element.removeClass(function(index, className) {
            return (className.match(/(^|\s)fx-\S+/g) || []).join(" ");
        });
    },
    reverseFx: function(fx) {
        var oppositeFx = {
            "fade-in": "fade-out",
            "fade-out": "fade-in",
            "scale-up": "scale-down",
            "scale-down": "scale-up",
            "scale-up-y": "scale-down-y",
            "scale-down-y": "scale-up-y",
            "slide-in-top": "slide-out-top",
            "slide-out-top": "slide-in-top",
            "slide-in-bottom": "slide-out-bottom",
            "slide-out-bottom": "slide-in-bottom",
            "slide-in-left": "slide-out-left",
            "slide-out-left": "slide-in-left",
            "slide-in-right": "slide-out-right",
            "slide-out-right": "slide-in-right"
        };
        return oppositeFx[fx];
    },
    isjQuery: function($element) {
        return $element instanceof jQuery;
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
    blink: function($element, times) {
        if (!YOI.isjQuery($element)) return false;
        var times = times || 2;
        $element.stop(true, true);
        for (var i = 0; i < times; i++) {
            $element.animate({
                opacity: 0
            }, 100).animate({
                opacity: 1
            }, 100);
        }
    },
    pulse: function($element, times) {
        if (!YOI.isjQuery($element)) return false;
        var times = times || 2;
        $element.stop(true, true);
        for (var i = 0; i < times; i++) {
            $element.animate({
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
        if (!YOI.collection[identifier]) {
            YOI.collection[identifier] = $([]);
        }
        if (!YOI.isjQuery($element)) {
            YOI.collection[identifier] = $("[yoi-" + identifier + "]");
            if (!YOI.collection[identifier].length) return false;
            YOI.collection[identifier].each(function() {
                var $this = $(this);
                YOI.updateOptions($this, options);
                YOI.updateState($this, state);
                YOI.updateProps($this, props);
            });
        } else if (YOI.isjQuery($element) && $element.length) {
            YOI.updateOptions($element, options);
            YOI.updateState($element, state);
            YOI.updateProps($element, props);
            YOI.collection[identifier] = YOI.collection[identifier].add($element);
        }
        return YOI.collection[identifier];
    },
    filterCollection: function(collectionIdentifier, filterProps) {
        var $collection = YOI.collection[collectionIdentifier];
        if (YOI.collection[collectionIdentifier] === undefined) return;
        YOI.collection[collectionIdentifier] = $collection.filter(function() {
            if ($(this).data().props.hasOwnProperty(filterProps)) {
                return false;
            } else {
                return true;
            }
        });
    },
    destroyCollection: function(identifier) {
        YOI.collection[identifier].each(function() {
            $(this).removeData();
        });
        YOI.collection[identifier] = undefined;
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
        $.each(YOI.action, function() {
            if (this.hasOwnProperty("init")) this.init();
        });
        $.each(YOI.behavior, function() {
            if (this.hasOwnProperty("init")) this.init();
        });
        $.each(YOI.module, function() {
            if (this.hasOwnProperty("init")) this.init();
        });
        $.each(YOI.component, function() {
            if (this.hasOwnProperty("init")) this.init();
        });
        YOI.mapActions();
    }
};

$(function() {
    if (YOI.component.Code) YOI.component.Code.initialize();
    YOI.initialize();
});

YOI.behavior.Dismiss = function() {
    var language = YOI.locale();
    var localization = {
        en: {
            buttonLabel: "close"
        },
        de: {
            buttonLabel: "schliessen"
        }
    };
    var $buttonDismiss = $('        <span class="buttonDismiss">' + localization[language]["buttonLabel"] + "</span>    ");
    function initialize($dismissableElement, options) {
        var $dismissableElement = YOI.createCollection("dismiss", $dismissableElement, options);
        if ($dismissableElement) $dismissableElement.each(function() {
            if ($(this).data().props.isDismissable) return;
            var $thisDismissableElement = $(this);
            var positionStatic = $thisDismissableElement.css("position") === "static";
            var options = options || $thisDismissableElement.data().options;
            if (positionStatic) $thisDismissableElement.css("position", "relative");
            $buttonDismiss.clone().on("click", function(e) {
                e.preventDefault();
                dismiss($(this).parent());
            }).appendTo($thisDismissableElement);
            $(this).data().props.isDismissable = true;
        });
    }
    function dismiss($targetElement) {
        if (!YOI.isjQuery($targetElement)) return false;
        $targetElement.fadeOut(function() {
            $targetElement.trigger("yoi-dismiss");
        });
    }
    return {
        init: initialize
    };
}();

YOI.behavior.Lazyload = function() {
    function initialize($lazyload, options) {
        var $lazyload = YOI.createCollection("lazyload", $lazyload, options);
        if ($lazyload) $lazyload.each(function() {
            if ($(this).data().props.isLazyloading) return;
            prepareLazyload($(this));
            $(this).data().props.isLazyloading = true;
        });
    }
    function prepareLazyload($noscriptElement) {
        var $placeHolder = $('<img class="lazyLoadPlaceHolder" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />');
        var options = $noscriptElement.data().options;
        var defaultImage = options.src || extractImgSrcFromString($noscriptElement.html()) || false;
        var width = options.width || false;
        var height = options.height || false;
        var cssClasses = options.cssClasses || false;
        var instant = options.instant || false;
        if (!defaultImage || !YOI.foundModule("ScrollAgent")) {
            return false;
        }
        $placeHolder.insertAfter($noscriptElement);
        $placeHolder = $noscriptElement.next(".lazyLoadPlaceHolder");
        YOI.module.ScrollAgent.init($placeHolder);
        if (width) $placeHolder.attr("width", width);
        if (height) $placeHolder.attr("height", height);
        if (cssClasses) $placeHolder.addClass(cssClasses);
        if (instant === "true") {
            lazyLoad($placeHolder, $noscriptElement);
        } else {
            $placeHolder.one("yoi-viewport-in.lazyLoad", function() {
                lazyLoad($(this), $noscriptElement);
            });
        }
    }
    function lazyLoad($placeHolder, $noscriptElement) {
        var options = $noscriptElement.data().options;
        var defaultImage = options.src || extractImgSrcFromString($noscriptElement.html()) || false;
        var width = options.width || false;
        var height = options.height || false;
        var alt = options.alt || false;
        var title = options.title || false;
        var longdesc = options.longdesc || false;
        var cssClasses = options.cssClasses || false;
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
            $(this).addClass("fx-fade-in").removeClass("fx-fade-in-initial");
        }).attr("src", imageUrl).addClass("fx-fade-in-initial").insertAfter($noscriptElement);
        if ($newImage[0].complete) {
            $newImage.trigger("load");
        }
        $placeHolder.removeClass(cssClasses).css({
            width: 0,
            height: 0
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

YOI.behavior.Parallax = function() {
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
        YOI.module.ScrollAgent.init(YOI.collection["parallax"]);
    }
    function updateProps() {
        YOI.collection["parallax"].each(function() {
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
        YOI.collection["parallax"].each(function() {
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
            YOI.collection["parallax"].each(function() {
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

YOI.behavior.ScrollFx = function() {
    var fxClassNames = [ "fade-in", "fade-out", "scale-up", "scale-down", "slide-in-top", "slide-out-top", "slide-in-bottom", "slide-out-bottom", "slide-in-left", "slide-out-left", "slide-in-right", "slide-out-right", "shake" ];
    function initialize($targetElement, options) {
        var $targetElement = YOI.createCollection("scrollfx", $targetElement, options);
        if ($targetElement) $targetElement.each(function() {
            var $thisTargetElement = $(this);
            if ($thisTargetElement.data().props.hasScrollFx) return;
            resetFxClassNames($thisTargetElement);
            resetCustomClassName($thisTargetElement);
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
            YOI.collection["scrollfx"].each(function() {
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
        if (validateFxClassName(inFx)) {
            $targetElement.addClass("fx-" + inFx + "-initial");
            $targetElement.removeClass("fx-" + inFx);
        } else {
            $targetElement.removeClass(inFx);
        }
        if (validateFxClassName(bottomFx)) {
            $targetElement.addClass("fx-" + bottomFx + "-initial");
            $targetElement.removeClass("fx-" + bottomFx);
        } else {
            $targetElement.removeClass(bottomFx);
        }
        if (validateFxClassName(centerFx)) {
            $targetElement.addClass("fx-" + centerFx + "-initial");
            $targetElement.removeClass("fx-" + centerFx);
        } else {
            $targetElement.removeClass(centerFx);
        }
        if (validateFxClassName(topFx)) {
            $targetElement.addClass("fx-" + topFx + "-initial");
            $targetElement.removeClass("fx-" + topFx);
        } else {
            $targetElement.removeClass(topFx);
        }
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
                if (validateFxClassName(inFx)) {
                    applyFx($targetElement, inFx, speed);
                } else {
                    applyCustomClassName($targetElement, inFx);
                }
            });
            $targetElement.on("yoi-viewport-bottom.scrollFx", function() {
                if (validateFxClassName(bottomFx)) {
                    applyFx($targetElement, bottomFx, speed);
                } else {
                    applyCustomClassName($targetElement, bottomFx);
                }
            });
            $targetElement.on("yoi-viewport-center.scrollFx", function() {
                if (validateFxClassName(centerFx)) {
                    applyFx($targetElement, centerFx, speed);
                } else {
                    applyCustomClassName($targetElement, centerFx);
                }
            });
            $targetElement.on("yoi-viewport-top.scrollFx", function() {
                if (validateFxClassName(topFx)) {
                    applyFx($targetElement, topFx, speed);
                } else {
                    applyCustomClassName($targetElement, topFx);
                }
            });
            $targetElement.on("yoi-viewport-out.scrollFx", function() {
                prepare($targetElement);
            });
        } else {
            $targetElement.one("yoi-viewport-in.scrollFx", function() {
                if (validateFxClassName(inFx)) {
                    applyFx($targetElement, inFx, speed);
                } else {
                    applyCustomClassName($targetElement, inFx);
                }
            });
            $targetElement.one("yoi-viewport-bottom.scrollFx", function() {
                if (validateFxClassName(bottomFx)) {
                    applyFx($targetElement, bottomFx, speed);
                } else {
                    applyCustomClassName($targetElement, bottomFx);
                }
            });
            $targetElement.one("yoi-viewport-center.scrollFx", function() {
                if (validateFxClassName(centerFx)) {
                    applyFx($targetElement, centerFx, speed);
                } else {
                    applyCustomClassName($targetElement, centerFx);
                }
            });
            $targetElement.one("yoi-viewport-top.scrollFx", function() {
                if (validateFxClassName(topFx)) {
                    applyFx($targetElement, topFx, speed);
                } else {
                    applyCustomClassName($targetElement, topFx);
                }
            });
        }
    }
    function validateFxClassName(className) {
        return fxClassNames.includes(className);
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
    function applyCustomClassName($targetElement, customClassName) {
        var props = $targetElement.data().props;
        var allowed = props.allowedOnCurrentBreakpoint;
        if (!allowed) return;
        if (customClassName) {
            $targetElement.removeClass(customClassName);
            $targetElement.addClass(customClassName);
        }
    }
    function resetCustomClassName($targetElement) {
        var options = $targetElement.data().options;
        var inFx = options.in || false;
        var bottomFx = options.bottom || false;
        var centerFx = options.center || false;
        var topFx = options.top || false;
        console.log("resetCustomClassName()");
        if (inFx) $targetElement.removeClass(inFx);
        if (bottomFx) $targetElement.removeClass(bottomFx);
        if (centerFx) $targetElement.removeClass(centerFx);
        if (topFx) $targetElement.removeClass(topFx);
    }
    function reset($targetElement) {
        $targetElement.data().props = {};
        $targetElement.data().options = {};
        resetFxClassNames($targetElement);
        resetCustomClassName($targetElement);
    }
    function destroy() {
        reset(YOI.collection["scrollfx"]);
        YOI.filterCollection("scrollagent", "hasScrollFx");
        YOI.destroyCollection("scrollfx");
        $(window).off("yoi-breakpoint-change.scrollfx");
    }
    return {
        init: initialize,
        destroy: destroy
    };
}();

YOI.behavior.Sticky = function() {
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
        var includePadding = options.includePadding || true;
        var referenceElementHeight = includePadding !== "false" ? $referenceElement.outerHeight() : $referenceElement.outerHeight() + parseInt($referenceElement.css("padding-bottom"));
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
            stickStop = stickStart + referenceElementHeight - stickyElementHeight - topDistance;
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
        data.props.status = "unknown";
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
        YOI.collection["sticky"].each(function(index) {
            var $stickyElement = $(this);
            var passedValidation = validInput($stickyElement) && validHeight($stickyElement);
            reset($stickyElement, index);
            if (passedValidation) transform($stickyElement, index);
            updateProps($stickyElement);
        });
        $window.trigger("yoi-scroll");
    }
    function startPositionObserver() {
        $window.on("load.sticky yoi-resize.sticky yoi-breakpoint-change.sticky yoi-pageheight-change.sticky", function() {
            positionObserver();
        });
    }
    function stickObserver() {
        var scrollTop = $window.scrollTop();
        YOI.collection["sticky"].each(function(index) {
            var $stickyElement = $(this);
            var $stickyPlaceholder = $("#stickyPlaceholder-" + index);
            var state = $stickyElement.data().state;
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
                    if (props.status === "sticky") {
                        $stickyElement.trigger("yoi-stick-stop");
                    }
                    props.status = "not_sticky";
                } else if (scrollTop > stickStop) {
                    cssPositionValue = "absolute";
                    cssTopValue = stickStop - stickyElementInitialTopPos + topOffset;
                    stickyPlaceholderDisplay = "block";
                    if (props.status === "sticky") {
                        $stickyElement.trigger("yoi-stick-stop");
                    }
                    props.status = "not_sticky";
                } else {
                    cssPositionValue = "fixed";
                    cssTopValue = 0 + topOffset;
                    stickyPlaceholderDisplay = "block";
                    if (props.status !== "sticky") {
                        $stickyElement.trigger("yoi-stick-start");
                    }
                    props.status = "sticky";
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
        $window.off("load.sticky yoi-resize.sticky yoi-scroll.sticky yoi-breakpoint-change.sticky yoi-pageheight-change.sticky");
        YOI.collection["sticky"].each(function() {
            reset($(this));
        });
        YOI.destroyCollection("sticky");
    }
    return {
        init: initialize,
        update: updateProps,
        destroy: destroy
    };
}();

YOI.action.Blink = function($trigger, $target, options) {
    if (YOI.isjQuery($target)) {
        YOI.blink($target, options.times);
    }
};

YOI.action.Hide = function($trigger, $target, options) {
    if (YOI.isjQuery($target)) {
        var fx = options.fx || false;
        var toggle = options.toggle === "true" ? true : false;
        var speed = options.speed || false;
        var remove = options.remove === "true" ? true : false;
        if (toggle && $target.is(":hidden")) {
            YOI.removeFx($target);
            YOI.action.Show(false, $target, {
                fx: YOI.reverseFx(fx),
                speed: speed
            });
            return;
        }
        if (fx) {
            if (speed) $target.addClass("fx-" + speed);
            $target.addClass("fx-" + fx + "-initial");
            $target.addClass("fx-" + fx);
            $target.on("animationend", function() {
                YOI.hide($target);
                YOI.removeFx($target);
                $target.trigger("yoi-hide");
                $target.off("animationend");
                if (remove) $target.remove().trigger("yoi-remove");
            });
            return;
        }
        YOI.hide($target);
        $target.trigger("yoi-hide");
        if (remove) $target.remove().trigger("yoi-remove");
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
        if (YOI.isjQuery($target)) {
            YOI.removeFx($target);
            if (fx) {
                $target.addClass("fx-" + fx + "-initial").removeClass("fx-" + fx);
            }
            YOI.show($target);
        }
    });
};

YOI.action.Pulse = function($trigger, $target, options) {
    if (YOI.isjQuery($target)) {
        YOI.pulse($target, options.times);
    }
};

YOI.action.ScrollTo = function($trigger, $target, options) {
    if (YOI.isjQuery($target)) {
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
    if (YOI.isjQuery($target)) {
        var fx = options.fx || false;
        var toggle = options.toggle === "true" ? true : false;
        var speed = options.speed || false;
        if (toggle && $target.is(":visible")) {
            YOI.removeFx($target);
            YOI.action.Hide(false, $target, {
                fx: YOI.reverseFx(fx),
                speed: speed
            });
            return;
        }
        if (fx) {
            if (speed) $target.addClass("fx-" + speed);
            YOI.show($target);
            $target.addClass("fx-" + fx + "-initial");
            $target.addClass("fx-" + fx);
            $target.on("animationend", function() {
                YOI.removeFx($target);
                $target.trigger("yoi-show");
                $target.off("animationend");
            });
            return;
        }
        YOI.show($target);
        $target.trigger("yoi-show");
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
        if (YOI.isjQuery($target)) {
            if (fx) {
                YOI.removeFx($target);
                $target.addClass("fx-" + fx + "-initial");
            }
            YOI.hide($target);
        }
    });
};

YOI.action.Update = function($trigger, $target, options) {
    if (YOI.isjQuery($target)) {
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
        if (YOI.isjQuery($targetElement)) YOI.createCollection("scrollagent", $targetElement);
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
        var $collection = YOI.collection["scrollagent"] || false;
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
        var $collection = YOI.collection["scrollagent"] || false;
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
        var slowDown = 1;
        var currentScrollTop = 0;
        if (typeof window["scrollObserverInterval"] !== "number") {
            YOI.setInterval("scrollObserverInterval", 10, function() {
                currentScrollTop = $window.scrollTop();
                $window.trigger("yoi-scroll");
                if (!isScrolling) {
                    $window.trigger("yoi-scroll-start");
                    isScrolling = true;
                }
                if (currentScrollTop < lastScrollTop) $window.trigger("yoi-scroll-up");
                if (currentScrollTop > lastScrollTop) $window.trigger("yoi-scroll-down");
                if (Math.abs(lastScrollTop - currentScrollTop) === 0) ++slowDown;
                if (slowDown > 15) $window.trigger("yoi-scroll-slowdown");
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
        if (options.linked) {
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
            $thisSection.trigger("yoi-accordion-open");
            $thisSection.data().state = "open";
        });
    }
    function closeSection($section) {
        var $thisSection = $section;
        var $thisBody = $section.find(".accordion__body");
        $thisSection.removeClass("is--open").addClass("is--closed");
        $thisBody.stop().slideUp("fast").promise().then(function() {
            $thisSection.trigger("yoi-accordion-closed");
            $thisSection.data().state = "closed";
        });
    }
    function closeAllSections($accordion) {
        var $targets;
        if (YOI.isjQuery($accordion)) {
            $targets = $accordion.find(".accordion__section");
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

YOI.component.Checkbox = function() {
    var $checkBoxWrapper = $('<span class="checkbox"></span>').on("click", function() {
        var $thisInput = $(this).find("input");
        if ($thisInput.is(":disabled")) return false;
        $thisInput.trigger("change");
    });
    function initialize($checkBox, options) {
        var $checkBox = YOI.createCollection("checkbox", $checkBox, options);
        if ($checkBox) $checkBox.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisCheckbox = $(this);
            var isWrappedInLabel = $thisCheckbox.parents().index("label");
            if (isWrappedInLabel === -1) {
                $thisCheckbox.wrap($checkBoxWrapper.clone(true));
            } else {
                $thisCheckbox.wrap($checkBoxWrapper.clone());
            }
            var thisWrapper = $(this).parent();
            thisWrapper.addClass($(this).attr("class"));
            $(this).removeAttr("class");
            if ($(this).is(":checked")) {
                thisWrapper.addClass("is--checked");
            }
            if ($(this).is(":disabled")) {
                thisWrapper.addClass("is--disabled");
            }
            $thisCheckbox.on({
                focus: function() {
                    $thisCheckbox.parent().addClass("is--focus");
                    $thisCheckbox.trigger("yoi-input-focus");
                },
                blur: function() {
                    $thisCheckbox.parent().removeClass("is--focus");
                    $thisCheckbox.trigger("yoi-input-blur");
                },
                change: function() {
                    if ($thisCheckbox.is(":checked")) {
                        $thisCheckbox.prop("checked", false);
                        $thisCheckbox.parent().removeClass("is--checked");
                    } else if (!$thisCheckbox.is(":checked")) {
                        $thisCheckbox.prop("checked", true);
                        $thisCheckbox.parent().addClass("is--checked");
                    }
                    $thisCheckbox.trigger("yoi-input-change");
                }
            });
            YOI.setReady($(this));
        });
    }
    return {
        init: initialize
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
                markup = addCopyButton(markup);
            } else {
                markup = addCopyButton($thisCodeWrapper);
            }
            if (thisExample || thisExampleTabbed) {
                $thisCodeWrapper.replaceWith(markup);
            }
            truncate(index);
            YOI.setReady($(this));
        });
    }
    function addCopyButton(markup) {
        var copyToClipboardSupported = document.queryCommandSupported && document.queryCommandSupported("copy");
        if (!copyToClipboardSupported) return markup;
        var $markup = markup instanceof jQuery ? markup : $(markup);
        var $copyButton = $('<button class="code__copyButton button button--subtle">Copy</button>');
        var $codeSource = $markup.find(".code__source");
        var codeHasRenderedExample = $codeSource.length ? true : false;
        $copyButton.on("click", function() {
            var $code = $copyButton.parent().find("code").first();
            copyToClipBoard($code);
            YOI.blink($copyButton);
        });
        if (codeHasRenderedExample) {
            $markup.find(".code__source").append($copyButton);
        } else {
            $markup.append($copyButton);
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
        var $expandButton = $('<button class="code__expandButton button button--subtle">Expand</button>');
        var codeHeight = $thisCode.height();
        var lineHeight = $thisCode.css("line-height");
        var maxCodeHeight = parseInt(lineHeight) * 5;
        $expandButton.on("click", function(e) {
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
            $thisCodeSource.append($expandButton);
        }
    }
    return {
        initialize: initialize
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
            buttonLabelClose: "Close"
        },
        de: {
            buttonLabelClose: "Schließen"
        }
    };
    var $modalCover = $('        <div class="modal__cover" id="modalCover" yoi-action="closeModal"></div>    ');
    var $modalContainer = $('        <div class="modal__container" id="modalContainer"></div>    ');
    var $modalCloseButton = $('        <button class="buttonDismiss" yoi-action="closeModal">            <span class="hidden">' + localization[language]["buttonLabelClose"] + "</span>        </button>    ");
    var $modalTemplate = $('        <div class="modal">            <button class="buttonDismiss" yoi-action="closeModal">                <span class="hidden">' + localization[language]["buttonLabelClose"] + '</span>            </button>            <div class="modal__header"></div>            <div class="modal__body"></div>        </div>    ');
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
        var $thisModalHeader = $thisModal.find(".modal__header");
        var $thisModalBody = $thisModal.find(".modal__body");
        var thisModalId = modalId.split("#")[1];
        $thisModalHeader.text(title);
        $thisModalBody.html("<p>" + body + "</p>");
        $thisModal.attr("id", thisModalId);
        if (modifiers) {
            $thisModal.addClass(modifiers);
        }
        if (!title) {
            $thisModal.find(".modal__header").remove();
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
                        $thisModal.append($modalCloseButton.clone());
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

YOI.component.ScrollProgress = function() {
    var $window = $(window);
    var $document = $(document);
    var $body = $("body");
    var initialized = false;
    var $pageProgressBar;
    var documentHeight;
    var windowHeight;
    var totalScroll;
    var scrollPosition;
    var pageProgress;
    var visibleScrollProgress;
    function initialize() {
        var enableScrollProgress = $body.is("[yoi-pageprogress]");
        if (enableScrollProgress && !initialized) {
            var options = YOI.toObject($body.attr("yoi-pageprogress"));
            visibleScrollProgress = YOI.toBoolean(options.visible);
            if (visibleScrollProgress) {
                $pageProgressBar = $('                    <div class="pageProgress">                        <div class="pageProgress__track"></div>                    </div>                ');
                $body.append($pageProgressBar);
                $pageProgressBar = $(".pageProgress__track").first();
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
        pageProgress = scrollPosition / (totalScroll / 100);
        if (pageProgress > 100 && windowHeight > documentHeight) {
            pageProgress = 100;
        } else if (pageProgress < 0) {
            pageProgress = 0;
        }
        if (visibleScrollProgress) $pageProgressBar.css("width", pageProgress + "%");
        if (pageProgress === 0) $window.trigger("yoi-scroll-0");
        if (pageProgress > 24 && pageProgress < 30) $window.trigger("yoi-scroll-25");
        if (pageProgress > 49 && pageProgress < 55) $window.trigger("yoi-scroll-50");
        if (pageProgress > 74 && pageProgress < 80) $window.trigger("yoi-scroll-75");
        if (pageProgress > 99) $window.trigger("yoi-scroll-100");
    }
    return {
        init: initialize
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

YOI.component.PageSkim = function() {
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
    var $pageSkim = $('        <div id="pageSkim" class="pageSkim">            <a class="pageSkim__btnPrev">                <span class="hidden">' + localization[language].prev + '</span>            </a>            <a class="pageSkim__btnNext">                <span class="hidden">' + localization[language].next + "</span>            </a>        </div>    ");
    function initialize() {
        var enablePageSkim = $body.is("[yoi-pageskim]");
        if (enablePageSkim && !initialized) {
            var options = YOI.toObject($body.attr("yoi-pageskim"));
            var position = options.position || "br";
            offset = options.offset || offset;
            $hooks = $(options.hooks).length ? $(options.hooks) : $hooks;
            totalHooks = $hooks.length;
            detectCurrentHook();
            addKeyboardEvents();
            $pageSkim.addClass("pos-fixed-" + position);
            $body.append($pageSkim);
            YOI.component.Icon.init();
            $("#pageSkim").find(".pageSkim__btnPrev").on("click", function(e) {
                e.preventDefault();
                scrollToHook("prev");
            });
            $("#pageSkim").find(".pageSkim__btnNext").on("click", function(e) {
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
            $document.trigger("yoi-pageskim-" + direction);
        });
    }
    function addKeyboardEvents() {
        if (YOI.foundModule("KeyboardAgent") && !keyboardEventsAdded) {
            $document.on("keydown", function(e) {
                if ([ 32, 37, 38, 39, 40 ].indexOf(e.keyCode) > -1) {
                    e.preventDefault();
                }
            });
            $document.on("yoi-keypressed-arrowup yoi-keypressed-arrowleft", function() {
                if (YOI.noFocus()) {
                    scrollToHook("prev");
                    highlightButton("prev");
                }
            }).on("yoi-keypressed-arrowdown yoi-keypressed-arrowright yoi-keypressed-space", function() {
                if (YOI.noFocus()) {
                    scrollToHook("next");
                    highlightButton("next");
                }
            }).on("yoi-focus-change", function() {
                if (YOI.noFocus()) {
                    $pageSkim.stop().fadeIn();
                } else {
                    $pageSkim.stop().fadeOut();
                }
            });
        }
        keyboardEventsAdded = true;
    }
    function highlightButton(direction) {
        if (!direction) return false;
        var $button;
        if (direction === "prev") $button = $("#pageSkim").find(".pageSkim__btnPrev");
        if (direction === "next") $button = $("#pageSkim").find(".pageSkim__btnNext");
        $button.addClass("is--active");
        YOI.setDelay("highlightScrollKeyDelay", 200, function() {
            $button.removeClass("is--active");
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

YOI.component.RadioButton = function() {
    var $radioBtnWrapper = $('<span class="radioButton"></span>').on("click", function() {
        var $thisInput = $(this).find("input");
        if ($thisInput.is(":disabled")) return false;
        $thisInput.trigger("change");
    });
    function initialize($radioBtn, options) {
        var $radioBtn = YOI.createCollection("radiobutton", $radioBtn, options);
        if ($radioBtn) $radioBtn.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisRadioBtn = $(this);
            var isWrappedInLabel = $thisRadioBtn.parents().index("label");
            if (isWrappedInLabel === -1) {
                $thisRadioBtn.wrap($radioBtnWrapper.clone(true));
            } else {
                $thisRadioBtn.wrap($radioBtnWrapper.clone());
            }
            var thisWrapper = $(this).parent();
            thisWrapper.addClass($(this).attr("class"));
            $(this).removeAttr("class");
            if ($(this).is(":checked")) {
                thisWrapper.addClass("is--checked");
            }
            if ($(this).is(":disabled")) {
                thisWrapper.addClass("is--disabled");
            }
            $thisRadioBtn.on({
                focus: function() {
                    $thisRadioBtn.parent().addClass("is--focus");
                    $thisRadioBtn.trigger("yoi-input-focus");
                },
                blur: function() {
                    $thisRadioBtn.parent().removeClass("is--focus");
                    $thisRadioBtn.trigger("yoi-input-blur");
                },
                change: function() {
                    $('[name="' + $thisRadioBtn.attr("name") + '"]').parent().removeClass("is--checked");
                    if ($thisRadioBtn.is(":checked")) {
                        $thisRadioBtn.parent().addClass("is--checked");
                    }
                    if (!$thisRadioBtn.is(":checked")) {
                        $thisRadioBtn.prop("checked", true);
                        $thisRadioBtn.parent().addClass("is--checked");
                    }
                    $thisRadioBtn.trigger("yoi-input-change");
                }
            });
            YOI.setReady($(this));
        });
    }
    return {
        init: initialize
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

YOI.component.SearchInput = function() {
    var $searchInputWrapper = $('<span class="searchInput"></span>');
    function initialize($searchInput, options) {
        var $searchInput = YOI.createCollection("searchinput", $searchInput, options);
        if ($searchInput) $searchInput.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisSearchInput = $(this);
            var $thisSearchInputWrapper = $searchInputWrapper.clone();
            var options = $thisSearchInput.data().options;
            var cssClasses = options.cssClasses || false;
            $thisSearchInputWrapper.addClass($thisSearchInput.attr("class"));
            if (cssClasses) {
                $thisSearchInputWrapper.addClass(cssClasses);
            }
            $thisSearchInput.wrap($thisSearchInputWrapper);
            $thisSearchInput.removeAttr("class");
            $thisSearchInput.on({
                focus: function() {
                    $thisSearchInput.parent().addClass("is--focus");
                    $thisSearchInput.trigger("yoi-input-focus");
                },
                blur: function() {
                    $thisSearchInput.parent().removeClass("is--focus");
                    $thisSearchInput.trigger("yoi-input-blur");
                },
                change: function() {
                    $thisSearchInput.trigger("yoi-input-change");
                }
            });
            YOI.setReady($(this));
        });
    }
    return {
        init: initialize
    };
}();

YOI.component.Select = function() {
    var $selectWrapper = $('<span class="select"></span>');
    var $selectIcon = $('<span class="select__icon"></span>');
    function initialize($select, options) {
        var $select = YOI.createCollection("select", $select, options);
        if ($select) $select.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisSelect = $(this);
            var $thisSelectWrapper = $selectWrapper.clone();
            var $thisSelectIcon = $selectIcon.clone();
            var options = $thisSelect.data().options;
            var cssClasses = options.cssClasses || false;
            $thisSelectWrapper.addClass($thisSelect.attr("class"));
            if (cssClasses) {
                $thisSelectWrapper.addClass(cssClasses);
            }
            $thisSelect.wrap($thisSelectWrapper);
            $thisSelect.parent().append($thisSelectIcon);
            $thisSelect.removeAttr("class");
            $thisSelect.on({
                focus: function() {
                    $thisSelect.parent().addClass("is--focus");
                    $thisSelect.trigger("yoi-input-focus");
                },
                blur: function() {
                    $thisSelect.parent().removeClass("is--focus");
                    $thisSelect.trigger("yoi-input-blur");
                },
                change: function() {
                    $thisSelect.trigger("yoi-input-change");
                }
            });
            YOI.setReady($(this));
        });
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
            buttonLabelNext: "next",
            buttonLabelPrev: "previous"
        },
        de: {
            buttonLabelNext: "weiter",
            buttonLabelPrev: "zurück"
        }
    };
    var slideControls = {
        "pageButtons--tl": $('            <div class="pageButtons pageButtons--tl">                <button class="pageButtons__buttonPrev">                    <span class="hidden">' + localization[language]["buttonLabelPrev"] + '</span>                </button>                <span class="pageButtons__indicator">                    <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">1</span>                </span>                <button class="pageButtons__buttonNext">                    <span class="hidden">' + localization[language]["buttonLabelNext"] + "</span>                </button>            </div>        "),
        "pageButtons--tr": $('            <div class="pageButtons pageButtons--tr">                <button class="pageButtons__buttonPrev">                    <span class="hidden">' + localization[language]["buttonLabelPrev"] + '</span>                </button>                <span class="pageButtons__indicator">                    <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">1</span>                </span>                <button class="pageButtons__buttonNext">                    <span class="hidden">' + localization[language]["buttonLabelNext"] + "</span>                </button>            </div>        "),
        "pageButtons--br": $('            <div class="pageButtons pageButtons--br">                <button class="pageButtons__buttonPrev">                    <span class="hidden">' + localization[language]["buttonLabelPrev"] + '</span>                </button>                <span class="pageButtons__indicator">                    <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">1</span>                </span>                <button class="pageButtons__buttonNext">                    <span class="hidden">' + localization[language]["buttonLabelNext"] + "</span>                </button>            </div>        "),
        "pageButtons--bl": $('            <div class="pageButtons pageButtons--bl">                <button class="pageButtons__buttonPrev">                    <span class="hidden">' + localization[language]["buttonLabelPrev"] + '</span>                </button>                <span class="pageButtons__indicator">                    <span class="pageButtons__currentPage">1</span> / <span class="pageButtons__totalPages">1</span>                </span>                <button class="pageButtons__buttonNext">                    <span class="hidden">' + localization[language]["buttonLabelNext"] + "</span>                </button>            </div>        "),
        flipButtons: $('            <div class="flipButtons">                <a class="flipButtons__buttonPrev">                    <span class="hidden">' + localization[language]["buttonLabelPrev"] + '</span>                </a>                <a class="flipButtons__buttonNext">                    <span class="hidden">' + localization[language]["buttonLabelNext"] + "</span>                </a>            </div>        "),
        "flipButtons--inset": $('            <div class="flipButtons flipButtons--inset">                <a class="flipButtons__buttonPrev">                    <span class="hidden">' + localization[language]["buttonLabelPrev"] + '</span>                </a>                <a class="flipButtons__buttonNext">                    <span class="hidden">' + localization[language]["buttonLabelNext"] + "</span>                </a>            </div>        "),
        pageDots: $('            <div class="pageDots">                <a class="pageDots__buttonPrev">                    <span class="hidden">' + localization[language]["buttonLabelPrev"] + '</span>                </a>                <a class="pageDots__buttonNext">                    <span class="hidden">' + localization[language]["buttonLabelNext"] + "</span>                </a>            </div>        "),
        "pageDots--dark": $('            <div class="pageDots pageDots--dark">                <a class="pageDots__buttonPrev">                    <span class="hidden">' + localization[language]["buttonLabelPrev"] + '</span>                </a>                <a class="pageDots__buttonNext">                    <span class="hidden">' + localization[language]["buttonLabelNext"] + "</span>                </a>            </div>        "),
        "pageDots--subtle": $('            <div class="pageDots pageDots--subtle">                <a class="pageDots__buttonPrev">                    <span class="hidden">' + localization[language]["buttonLabelPrev"] + '</span>                </a>                <a class="pageDots__buttonNext">                    <span class="hidden">' + localization[language]["buttonLabelNext"] + "</span>                </a>            </div>        ")
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
                $thisSlider.find('[class*="buttonNext"]').on("click", function(e) {
                    e.preventDefault();
                    stopAutoplay($thisSlider);
                    showSlide($thisSlider, "next");
                });
                $thisSlider.find('[class*="buttonPrev"]').on("click", function(e) {
                    e.preventDefault();
                    stopAutoplay($thisSlider);
                    showSlide($thisSlider, "prev");
                });
                $thisSlider.find(".pageButtons__totalPages").text(totalSlides);
                if (options.control.indexOf("pageDots") !== -1) {
                    for (var i = 0; i < totalSlides; i++) {
                        $('<a class="pageDots__dot"><span class="hidden">' + (i + 1) + "</span></a>").insertBefore($(this).find(".pageDots__buttonNext"));
                    }
                    paginationLinks = $thisSlider.find('.pageDots a:not([class*="button"])');
                    paginationLinks.first().addClass("is--active");
                    paginationLinks.on("click", function(e) {
                        e.preventDefault();
                        stopAutoplay($thisSlider);
                        var linkIndex;
                        if ($thisSlider.parent().find(".pageDots__buttonPrev").length) {
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
        paginationLinks = $thisSlider.find('.pageDots a:not([class*="button"])');
        paginationLinks.removeClass("is--active");
        paginationLinks.eq(thisSlideIndex).addClass("is--active");
        $thisSlider.find(".pageButtons__currentPage").text(thisSlideIndex + 1);
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
            buttonLabelMore: "more",
            buttonLabelLess: "less"
        },
        de: {
            buttonLabelMore: "mehr",
            buttonLabelLess: "weniger"
        }
    };
    var $stepperButtons = $('        <div class="stepper__buttonUp">            <span class="stepper__iconUp"></span>            <span class="hidden">' + localization[language]["buttonLabelMore"] + '</span>        </div>        <div class="stepper__buttonDown">            <span class="stepper__iconDown"></span>            <span class="hidden">' + localization[language]["buttonLabelLess"] + "</span>        </div>    ");
    function initialize($stepper, options) {
        var $stepper = YOI.createCollection("stepper", $stepper, options);
        if ($stepper) $stepper.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisStepper = $(this);
            $thisStepper.data().props.initialValue = $thisStepper.find(".stepper__input")[0].value || 1;
            $thisStepper.prepend($stepperButtons.clone());
            var eventType = YOI.environment("mobile") ? "tap" : "click";
            $thisStepper.find(".stepper__buttonUp").on(eventType, function(e) {
                e.preventDefault();
                increaseItemCount($thisStepper);
            });
            $thisStepper.find(".stepper__buttonDown").on(eventType, function(e) {
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
        setItemCount($stepper, $stepper.data().props.initialValue);
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
        clear: clearItemCount
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
    function setOn($switch, preventEvents) {
        var preventEvents = preventEvents === undefined ? false : true;
        $switch.removeClass("switch--off").addClass("switch--on");
        $switch.find('input[type="checkbox"]').first().attr("checked", true);
        if (!preventEvents) {
            $switch.trigger("yoi-switch-on");
            $switch.trigger("yoi-switch-change");
        }
    }
    function setOff($switch, preventEvents) {
        var preventEvents = preventEvents === undefined ? false : true;
        $switch.removeClass("switch--on").addClass("switch--off");
        $switch.find('input[type="checkbox"]').first().attr("checked", false);
        if (!preventEvents) {
            $switch.trigger("yoi-switch-off");
            $switch.trigger("yoi-switch-change");
        }
    }
    function setToggle($switch, preventEvents) {
        if ($switch.hasClass("switch--off")) {
            setOn($switch, preventEvents);
        } else if ($switch.hasClass("switch--on")) {
            setOff($switch, preventEvents);
        }
    }
    return {
        init: initialize,
        on: setOn,
        off: setOff,
        toggle: setToggle
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

YOI.component.Tooltip = function() {
    var defaultFadeDuration = 200;
    var defaultShowDelay = 500;
    var defaultHideDelay = 500;
    var generatedToolTipId = 1;
    function initialize($tooltipTrigger, options) {
        var $tooltipTrigger = YOI.createCollection("tooltip", $tooltipTrigger, options);
        if ($tooltipTrigger) $tooltipTrigger.each(function() {
            if (YOI.isReady($(this))) return false;
            var $thisTooltipTrigger = $(this);
            var options = $thisTooltipTrigger.data().options;
            var staticPosition = options.staticPosition || false;
            var content = options.content || false;
            var target = options.target || false;
            var hasStaticPosition = staticPosition === "top" || staticPosition === "right" || staticPosition === "bottom" || staticPosition === "left";
            if (!target && content !== false) {
                var $thisTooltip = generateTooltip($thisTooltipTrigger, content);
            } else if (target) {
                var $thisTooltip = prepareTooltip($thisTooltipTrigger, $(options.target));
            } else {
                return false;
            }
            $thisTooltipTrigger.on("mouseenter", function(e) {
                if (hasStaticPosition) {
                    setStaticPosition($thisTooltipTrigger, $thisTooltip);
                } else {
                    setPosition($thisTooltipTrigger, $thisTooltip, e);
                }
                hideAll();
                hideWithDelay($thisTooltipTrigger, $thisTooltip, "stop");
                showWithDelay($thisTooltipTrigger, $thisTooltip, "start");
            });
            $thisTooltipTrigger.on("mouseleave", function() {
                hideWithDelay($thisTooltipTrigger, $thisTooltip, "start");
                showWithDelay($thisTooltipTrigger, $thisTooltip, "stop");
            });
            if (!staticPosition) {
                $thisTooltipTrigger.on("mousemove", function(e) {
                    setPosition($thisTooltipTrigger, $thisTooltip, e);
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
    function generateTooltip($thisTooltipTrigger, content) {
        var tooltipId = "yoi-tooltip-" + generatedToolTipId++;
        var targetAlreadyPrepared = $("#" + tooltipId).length;
        var content = content || "lorem ipsum";
        if (!targetAlreadyPrepared) {
            $('<div id="' + tooltipId + '" class="tooltip">' + content + "</div>").appendTo($(document.body)).hide();
            YOI.updateProps($thisTooltipTrigger, {
                tooltipId: tooltipId
            });
        }
        return $("#" + tooltipId);
    }
    function changeTooltipContent($thisTooltipTrigger, content) {
        var $thisToolTip = $("#" + $thisTooltipTrigger.data().props.tooltipId);
        if (!$thisToolTip.length) return false;
        $thisToolTip.html(content);
    }
    function prepareTooltip($thisTooltipTrigger, $thisTargetElement) {
        var targetId = $thisTargetElement.attr("id");
        var targetAlreadyPrepared = $("#" + targetId + ".tooltip").length;
        if (!targetAlreadyPrepared) {
            $thisTargetElement.detach();
            $('<div id="' + targetId + '" class="tooltip">' + $thisTargetElement.text() + "</div>").appendTo($(document.body)).hide();
            YOI.updateProps($thisTooltipTrigger, {
                tooltipId: targetId
            });
        }
        return $("#" + targetId);
    }
    function setPosition($thisTooltipTrigger, $thisTooltip, e) {
        var offset = 20;
        var cursorY = e.pageY;
        var cursorX = e.pageX;
        var tooltipWidth = $thisTooltip.width();
        var tooltipHeight = $thisTooltip.height();
        var viewPortWidth = $(window).width();
        var viewPortHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var fixed = $thisTooltipTrigger.data().options.fixed || false;
        var positionType = fixed ? "fixed" : "absolute";
        var scrollOffset = fixed ? $(window).scrollTop() : 0;
        var tooltipLeft = cursorX + tooltipWidth > viewPortWidth ? cursorX - tooltipWidth - offset + "px" : cursorX + "px";
        var tooltipTop = cursorY + tooltipHeight + offset * 3 > scrollTop + viewPortHeight ? cursorY - tooltipHeight - scrollOffset - offset * 2 + "px" : cursorY + offset - scrollOffset + "px";
        $thisTooltip.css({
            position: positionType,
            left: tooltipLeft,
            top: tooltipTop
        });
    }
    function setStaticPosition($thisTooltipTrigger, $thisTooltip) {
        var offset = 10;
        var options = $thisTooltipTrigger.data().options;
        var position = options.staticPosition;
        var fixed = options.fixed || false;
        var positionType = fixed ? "fixed" : "absolute";
        var scrollOffset = fixed ? $(window).scrollTop() : 0;
        var tooltipLeft;
        var tooltipTop;
        switch (position) {
          case "top":
            tooltipLeft = $thisTooltipTrigger.offset().left + $thisTooltipTrigger.outerWidth() / 2 - $thisTooltip.outerWidth() / 2;
            tooltipTop = $thisTooltipTrigger.offset().top - scrollOffset - $thisTooltip.outerHeight() - offset;
            break;

          case "right":
            tooltipLeft = $thisTooltipTrigger.offset().left + $thisTooltipTrigger.outerWidth() + offset;
            tooltipTop = $thisTooltipTrigger.offset().top - scrollOffset + $thisTooltipTrigger.outerHeight() / 2 - $thisTooltip.outerHeight() / 2;
            break;

          case "bottom":
            tooltipLeft = $thisTooltipTrigger.offset().left + $thisTooltipTrigger.outerWidth() / 2 - $thisTooltip.outerWidth() / 2;
            tooltipTop = $thisTooltipTrigger.offset().top - scrollOffset + $thisTooltipTrigger.outerHeight() + offset;
            break;

          case "left":
            tooltipLeft = $thisTooltipTrigger.offset().left - $thisTooltip.outerWidth() - offset;
            tooltipTop = $thisTooltipTrigger.offset().top - scrollOffset + $thisTooltipTrigger.outerHeight() / 2 - $thisTooltip.outerHeight() / 2;
            break;
        }
        $thisTooltip.attr("class", "tooltip tooltip--" + position).css({
            position: positionType,
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
        change: changeTooltipContent,
        show: showWithDelay,
        hide: hideWithDelay,
        hideAll: hideAll
    };
}();