var YOI = {
    collection: {},
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
        $.each(YOI.behaviour, function() {
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

YOI.behaviour.Dismiss = function() {
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

YOI.behaviour.Lazyload = function() {
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

YOI.behaviour.ScrollFx = function() {
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
    var $modalTemplate = $('        <div class="modal">            <div class="modal__header">                <h3 class="modal__title"></h3>                <button class="buttonDismiss" yoi-action="closeModal">                    <span class="hidden">' + localization[language]["buttonLabelClose"] + '</span>                </button>            </div>            <div class="modal__body"></div>        </div>    ');
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
                        $thisModal.find(".modal__header").append($modalCloseButton.clone());
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
    var $scrollButtons = $('        <div id="scrollButtons" class="buttons sh-4 m-4">            <button class="button button--large">                <span class="hidden">' + localization[language].prev + '</span>                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="15 18 9 12 15 6"></polyline></svg>            </button>            <button class="button button--large">                <span class="hidden">' + localization[language].next + '</span>                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke="#000000" stroke-width="2px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"><polyline points="9 18 15 12 9 6"></polyline></svg>            </button>        </div>    ');
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
            $("#scrollButtons").find(".button").eq(0).on("click", function(e) {
                e.preventDefault();
                scrollToHook("prev");
            });
            $("#scrollButtons").find(".button").eq(1).on("click", function(e) {
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
                    highlightButton("prev");
                }
            }).on("yoi-keypressed-arrowright", function() {
                if (YOI.noFocus()) {
                    scrollToHook("next");
                    highlightButton("next");
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
    function highlightButton(direction) {
        if (!direction) return false;
        var buttonIndex;
        if (direction === "prev") buttonIndex = 0;
        if (direction === "next") buttonIndex = 1;
        var $button = $("#scrollButtons").find(".button").eq(buttonIndex);
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
                $thisTable.find("tr td:last-child").after('<td class="table__removeButton"></td>');
                $thisTable.find(".table__removeButton").on("click", function(e) {
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
            $('<div id="' + targetId + '" class="tooltip">' + $thisTargetElement.html() + "</div>").appendTo($(document.body)).hide();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy95b2kuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9kaXNtaXNzLmpzIiwic3JjL2pzL2JlaGF2aW91cnMvbGF6eWxvYWQuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9wYXJhbGxheC5qcyIsInNyYy9qcy9iZWhhdmlvdXJzL3Njcm9sbGZ4LmpzIiwic3JjL2pzL2JlaGF2aW91cnMvc3RpY2t5LmpzIiwic3JjL2pzL2FjdGlvbnMvYmxpbmsuanMiLCJzcmMvanMvYWN0aW9ucy9oaWRlLmpzIiwic3JjL2pzL2FjdGlvbnMvcHVsc2UuanMiLCJzcmMvanMvYWN0aW9ucy9zY3JvbGx0by5qcyIsInNyYy9qcy9hY3Rpb25zL3Nob3cuanMiLCJzcmMvanMvYWN0aW9ucy91cGRhdGUuanMiLCJzcmMvanMvbW9kdWxlcy9icm93c2VyaGlzdG9yeS5qcyIsInNyYy9qcy9tb2R1bGVzL2tleWJvYXJkYWdlbnQuanMiLCJzcmMvanMvbW9kdWxlcy9yZXNpemVhZ2VudC5qcyIsInNyYy9qcy9tb2R1bGVzL3Njcm9sbGFnZW50LmpzIiwic3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbi5qcyIsInNyYy9jb21wb25lbnRzL2NoZWNrYm94L2NoZWNrYm94LmpzIiwic3JjL2NvbXBvbmVudHMvY29kZS9jb2RlLmpzIiwic3JjL2NvbXBvbmVudHMvaWNvbi9pY29uLmpzIiwic3JjL2NvbXBvbmVudHMvaW1nbWFnbmlmaWVyL2ltZ21hZ25pZmllci5qcyIsInNyYy9jb21wb25lbnRzL21heGNoYXJzL21heGNoYXJzLmpzIiwic3JjL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMiLCJzcmMvY29tcG9uZW50cy9wYWdlcmV3aW5kL3BhZ2VyZXdpbmQuanMiLCJzcmMvY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuanMiLCJzcmMvY29tcG9uZW50cy9yYWRpb2J1dHRvbi9yYWRpb2J1dHRvbi5qcyIsInNyYy9jb21wb25lbnRzL3JhbmdlaW5wdXQvcmFuZ2VpbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL3Njcm9sbGtleXMvc2Nyb2xsa2V5cy5qcyIsInNyYy9jb21wb25lbnRzL3Njcm9sbHByb2dyZXNzL3Njcm9sbHByb2dyZXNzLmpzIiwic3JjL2NvbXBvbmVudHMvc2VhcmNoaW5wdXQvc2VhcmNoaW5wdXQuanMiLCJzcmMvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmpzIiwic3JjL2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlci5qcyIsInNyYy9jb21wb25lbnRzL3N0ZXBwZXIvc3RlcHBlci5qcyIsInNyYy9jb21wb25lbnRzL3N3aXRjaC9zd2l0Y2guanMiLCJzcmMvY29tcG9uZW50cy90YWJsZS90YWJsZS5qcyIsInNyYy9jb21wb25lbnRzL3RhYnMvdGFicy5qcyIsInNyYy9jb21wb25lbnRzL3Rvb2x0aXAvdG9vbHRpcC5qcyJdLCJuYW1lcyI6WyJZT0kiLCJjb2xsZWN0aW9uIiwiYWN0aW9uIiwiYmVoYXZpb3VyIiwiY29tcG9uZW50IiwibW9kdWxlIiwic3RyaW5nQ29udGFpbnMiLCJpbnB1dCIsInNlYXJjaFN0cmluZyIsImluZGV4T2YiLCJ6ZXJvUGFkIiwibnVtIiwiZGlnaXRzIiwiTWF0aCIsImFicyIsImkiLCJsZWFkaW5nWmVyb3MiLCJzbGljZSIsImZvdW5kTW9kdWxlIiwid2luZG93IiwiZm91bmRDb21wb25lbnQiLCJzZXREZWxheSIsImRlbGF5TmFtZSIsImRlbGF5VGltZSIsImRlbGF5RnVuY3Rpb24iLCJ0aGlzIiwiY2xlYXJEZWxheSIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJ1bmRlZmluZWQiLCJzZXRJbnRlcnZhbCIsImludGVydmFsTmFtZSIsImludGVydmFsVGltZSIsImludGVydmFsRnVuY3Rpb24iLCJjbGVhckludGVydmFsIiwiYWZJbnRlcnZhbCIsImRhdGVOb3ciLCJEYXRlIiwibm93IiwicmVxdWVzdEFuaW1hdGlvbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInN0YXJ0Iiwic3RvcCIsInRpY2siLCJjbGVhciIsInRvT2JqZWN0Iiwia2V5VmFsdWVQYWlyIiwicHJvcGVyT2JqZWN0IiwidmFsdWVTdGFydE1hcmtlciIsImtleVZhbHVlUGFpckVuZE1hcmtlciIsInJlcGxhY2UiLCJzcGxpdCIsImxlbmd0aCIsInRyaW0iLCJ0b0Jvb2xlYW4iLCJ0b0xvd2VyQ2FzZSIsImdldEF0dHJpYnV0ZSIsIiRlbGVtZW50IiwieW9pQXR0cmlidXRlVmFsdWUiLCIkIiwiZWFjaCIsImF0dHJpYnV0ZXMiLCJpbmRleCIsImF0dHJpYnV0ZSIsIm5hbWUiLCJtYXRjaCIsInZhbHVlIiwiaGlkZSIsImlzalF1ZXJ5IiwiaGFzQ2xhc3MiLCJkYXRhIiwicmVtb3ZlQ2xhc3MiLCJzaG93IiwiaGFzT3duUHJvcGVydHkiLCJhZGRDbGFzcyIsImlzTnVtYmVyIiwiaW5wdXRWYWwiLCJwYXR0ZXJuIiwidGVzdFZhbCIsInRvU3RyaW5nIiwidGVzdCIsIm5vRm9jdXMiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJ0YWdOYW1lIiwidGhyb3R0bGUiLCJ0YXJnZXRGdW5jdGlvbiIsImRlbGF5Iiwic25hcHNob3QiLCJ2YWxpZEJyZWFrcG9pbnQiLCJrZXl3b3JkIiwidmFsaWRCcmVha1BvaW50cyIsInBvc2l0aW9uIiwiaW5BcnJheSIsInJlbW92ZUZ4IiwiY2xhc3NOYW1lIiwiam9pbiIsInJldmVyc2VGeCIsImZ4Iiwib3Bwb3NpdGVGeCIsImZhZGUtaW4iLCJmYWRlLW91dCIsInNjYWxlLXVwIiwic2NhbGUtZG93biIsInNjYWxlLXVwLXkiLCJzY2FsZS1kb3duLXkiLCJzbGlkZS1pbi10b3AiLCJzbGlkZS1vdXQtdG9wIiwic2xpZGUtaW4tYm90dG9tIiwic2xpZGUtb3V0LWJvdHRvbSIsInNsaWRlLWluLWxlZnQiLCJzbGlkZS1vdXQtbGVmdCIsInNsaWRlLWluLXJpZ2h0Iiwic2xpZGUtb3V0LXJpZ2h0IiwialF1ZXJ5IiwiZW52aXJvbm1lbnQiLCJlbnZOYW1lIiwiZGVmYXVsdEVudmlyb25tZW50IiwiY3VycmVudEVudmlyb25tZW50IiwiYXR0ciIsImxvY2FsZSIsImxhbmd1YWdlIiwiZGVmYXVsdExhbmd1YWdlIiwiY3VycmVudExhbmd1YWdlIiwiY3VycmVudEJyZWFrUG9pbnQiLCJnZXRDb21wdXRlZFN0eWxlIiwiYm9keSIsImdldFByb3BlcnR5VmFsdWUiLCJibGluayIsInRpbWVzIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJwdWxzZSIsInN0YXJ0RG9tT2JzZXJ2ZXIiLCIkZG9jdW1lbnQiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJXZWJLaXRNdXRhdGlvbk9ic2VydmVyIiwidGFyZ2V0IiwibXV0YXRpb25zIiwiZm9yRWFjaCIsIm11dGF0aW9uIiwiYWRkZWROb2RlcyIsInRyaWdnZXIiLCJyZW1vdmVkTm9kZXMiLCJvYnNlcnZlIiwic3VidHJlZSIsImNoaWxkTGlzdCIsImNoYXJhY3RlckRhdGEiLCJzdG9wRG9tT2JzZXJ2ZXIiLCJkaXNjb25uZWN0IiwidXBkYXRlT3B0aW9ucyIsIm9wdGlvbnMiLCJrZXkiLCJ1cGRhdGVQcm9wcyIsInByb3BzIiwidXBkYXRlU3RhdGUiLCJzdGF0ZSIsImNyZWF0ZUNvbGxlY3Rpb24iLCJpZGVudGlmaWVyIiwiJHRoaXMiLCJhZGQiLCJmaWx0ZXJDb2xsZWN0aW9uIiwiY29sbGVjdGlvbklkZW50aWZpZXIiLCJmaWx0ZXJQcm9wcyIsIiRjb2xsZWN0aW9uIiwiZmlsdGVyIiwiZGVzdHJveUNvbGxlY3Rpb24iLCJyZW1vdmVEYXRhIiwiYmluZEFjdGlvbiIsInlvaUFjdGlvbiIsInBhcmFtcyIsIk9iamVjdCIsImtleXMiLCJob3N0T2JqZWN0IiwicHVibGljRnVuY3Rpb24iLCJldmVudCIsIm9uIiwiJHRhcmdldCIsIiR0cmlnZ2VyIiwicGFyZW50IiwibWFwIiwiZSIsInByZXZlbnREZWZhdWx0IiwibWFwQWN0aW9ucyIsImlzIiwic2V0UmVhZHkiLCJpbml0aWFsaXplZCIsImlzUmVhZHkiLCJpbml0aWFsaXplIiwiaW5pdCIsIkNvZGUiLCJEaXNtaXNzIiwibG9jYWxpemF0aW9uIiwiZW4iLCJidXR0b25MYWJlbCIsImRlIiwiJGJ1dHRvbkRpc21pc3MiLCIkZGlzbWlzc2FibGVFbGVtZW50IiwiaXNEaXNtaXNzYWJsZSIsIiR0aGlzRGlzbWlzc2FibGVFbGVtZW50IiwicG9zaXRpb25TdGF0aWMiLCJjc3MiLCJjbG9uZSIsImRpc21pc3MiLCJhcHBlbmRUbyIsIiR0YXJnZXRFbGVtZW50IiwiZmFkZU91dCIsIkxhenlsb2FkIiwiJGxhenlsb2FkIiwiaXNMYXp5bG9hZGluZyIsInByZXBhcmVMYXp5bG9hZCIsIiRub3NjcmlwdEVsZW1lbnQiLCIkcGxhY2VIb2xkZXIiLCJkZWZhdWx0SW1hZ2UiLCJzcmMiLCJleHRyYWN0SW1nU3JjRnJvbVN0cmluZyIsImh0bWwiLCJ3aWR0aCIsImhlaWdodCIsImNzc0NsYXNzZXMiLCJpbnN0YW50IiwiaW5zZXJ0QWZ0ZXIiLCJuZXh0IiwiU2Nyb2xsQWdlbnQiLCJsYXp5TG9hZCIsIm9uZSIsImFsdCIsInRpdGxlIiwibG9uZ2Rlc2MiLCJpbWFnZVVybCIsImJyZWFrUG9pbnRTbWFsbCIsImJyZWFrUG9pbnRNZWRpdW0iLCJicmVha1BvaW50TGFyZ2UiLCJicmVha1BvaW50WGxhcmdlIiwic3JjU21hbGwiLCJzcmNNZWRpdW0iLCJzcmNMYXJnZSIsInNyY1hsYXJnZSIsIiRuZXdJbWFnZSIsImNvbXBsZXRlIiwib3V0cHV0IiwiUGFyYWxsYXgiLCIkd2luZG93IiwiY3VycmVudFNjcm9sbFRvcCIsInNjcm9sbFRvcCIsInZpZXdwb3J0SGVpZ2h0IiwiZGVmYXVsdEZhY3RvciIsIm9ic2VydmVySXNSdW5uaW5nIiwiJHBhcmFsbGF4RWxlbWVudCIsImlzUGFyYWxsYXgiLCJzdGFydFNjcm9sbEFnZW50Iiwic3RhcnRQYXJhbGxheE9ic2VydmVyIiwidXBkYXRlUGFyYWxsYXhFbnYiLCJ0cmFuc2Zvcm1QYXJhbGxheCIsInN0YXJ0c0luVmlld3BvcnQiLCJpbml0aWFsUG9zWSIsInJlc2V0UHJvcHMiLCJyZXNldFRyYW5zZm9ybXMiLCJyZXNldEFsbCIsInNjcm9sbE92ZXJzaG9vdCIsImFjdGl2ZUJyZWFrcG9pbnQiLCJmYWN0b3IiLCJub3QiLCJhbGxvd2VkT25DdXJyZW50QnJlYWtwb2ludCIsInNjcm9sbFRvcEluVmlld3BvcnQiLCJwYXJhbGxheE9mZnNldCIsInBhcnNlSW50IiwiZGVzdHJveSIsIm9mZiIsIlNjcm9sbEZ4IiwiZnhDbGFzc05hbWVzIiwiJHRoaXNUYXJnZXRFbGVtZW50IiwiaGFzU2Nyb2xsRngiLCJyZXNldEZ4Q2xhc3NOYW1lcyIsInJlc2V0Q3VzdG9tQ2xhc3NOYW1lIiwicHJlcGFyZSIsImxpc3RlbiIsInN0YXJ0QnJlYWtwb2ludEFnZW50IiwiaW5GeCIsImluIiwiYm90dG9tRngiLCJib3R0b20iLCJjZW50ZXJGeCIsImNlbnRlciIsInRvcEZ4IiwidG9wIiwidmFsaWRhdGVGeENsYXNzTmFtZSIsInNwZWVkIiwicmVwZWF0IiwiYXBwbHlGeCIsImFwcGx5Q3VzdG9tQ2xhc3NOYW1lIiwiaW5jbHVkZXMiLCJhbGxvd2VkIiwiY3VzdG9tQ2xhc3NOYW1lIiwiY29uc29sZSIsImxvZyIsInJlc2V0IiwiU3RpY2t5IiwiJGJvZHkiLCIkc3RpY2t5RWxlbWVudCIsIiR0aGlzU3RpY2t5RWxlbWVudCIsImlzU3RpY2t5IiwidHJhbnNmb3JtIiwic3RhcnRQb3NpdGlvbk9ic2VydmVyIiwic3RhcnRTdGlja09ic2VydmVyIiwiJHN0aWNreVBsYWNlaG9sZGVyIiwiJHN0aWNreVdyYXBwZXIiLCJzdGlja3lFbGVtZW50Q3NzUG9zIiwic3RpY2t5RWxlbWVudENzc0xlZnQiLCJzdGlja3lFbGVtZW50Q3NzVG9wIiwic3RpY2t5RWxlbWVudENTU01hcmdpbiIsImxlZnQiLCJzdHlsZSIsInNldFByb3BlcnR5IiwibWFyZ2luIiwib3V0ZXJXaWR0aCIsIm91dGVySGVpZ2h0IiwiZGlzcGxheSIsIndyYXAiLCJyZW1vdmUiLCJyZW1vdmVBdHRyIiwidW53cmFwIiwiJHJlZmVyZW5jZUVsZW1lbnQiLCJyZWZlcmVuY2UiLCJmaXJzdCIsImluY2x1ZGVQYWRkaW5nIiwicmVmZXJlbmNlRWxlbWVudEhlaWdodCIsInN0aWNreUVsZW1lbnRIZWlnaHQiLCJzdGlja3lFbGVtZW50V2lkdGgiLCJzdGlja3lFbGVtZW50SW5pdGlhbFRvcFBvcyIsIm9mZnNldCIsInRvcE9mZnNldCIsInRvcERpc3RhbmNlIiwic3RpY2tTdGFydCIsInN0aWNrU3RvcCIsInBhc3NlZFZhbGlkYXRpb24iLCJ2YWxpZElucHV0IiwidmFsaWRIZWlnaHQiLCJpbml0aWFsVG9wUG9zIiwic3RhdHVzIiwicG9zaXRpb25PYnNlcnZlciIsInN0aWNrT2JzZXJ2ZXIiLCJjc3NXaWR0aFZhbHVlIiwiY3NzUG9zaXRpb25WYWx1ZSIsImNzc1RvcFZhbHVlIiwic3RpY2t5UGxhY2Vob2xkZXJEaXNwbGF5IiwiYmFja2ZhY2UtdmlzaWJpbGl0eSIsInotaW5kZXgiLCJ1cGRhdGUiLCJCbGluayIsIkhpZGUiLCJ0b2dnbGUiLCJTaG93Iiwic2VsZWN0b3JzIiwidGFyZ2V0U2VsZWN0b3IiLCJQdWxzZSIsIlNjcm9sbFRvIiwic2Nyb2xsUm9vdCIsInNjcm9sbGluZ0VsZW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCIkc2Nyb2xsQ29udGV4dCIsIiRzY3JvbGxDb250YWluZXIiLCJjbG9zZXN0IiwiaGlnaGxpZ2h0Iiwic2Nyb2xsUG9zWSIsIlRhYnMiLCJzd2l0Y2hUbyIsInRhcmdldElkIiwid2hlbiIsImRvbmUiLCJVcGRhdGUiLCJyZXF1ZXN0VHlwZSIsInR5cGUiLCJyZXF1ZXN0VXJsIiwidXJsIiwiZXJyb3JUaXRsZSIsImVycm9yTXNnIiwiJGVycm9yTXNnIiwiJHNwaW5uZXIiLCJ0b1VwcGVyQ2FzZSIsImFqYXgiLCJjYWNoZSIsImJlZm9yZVNlbmQiLCJhcHBlbmQiLCJlcnJvciIsInN1Y2Nlc3MiLCIkcmVzcG9uc2UiLCJCcm93c2VySGlzdG9yeSIsInB1c2hIYXNoIiwiaGFzaFN0cmluZyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicmVwbGFjZUhhc2giLCJyZXBsYWNlU3RhdGUiLCJjbGVhckhhc2giLCJLZXlib2FyZEFnZW50IiwiMzgiLCIzOSIsIjQwIiwiMzciLCIxMyIsIjMyIiwiMjciLCI5Iiwia2V5Q29kZSIsIndoaWNoIiwiYWRkVGFiRm9jdXMiLCIkZWxlbWVudHMiLCIkYWN0aXZlRWxlbWVudCIsIlJlc2l6ZWFnZW50IiwibGFzdEJyZWFrUG9pbnQiLCJhY3RpdmVCcmVha1BvaW50IiwibGFzdFBhZ2VIZWlnaHQiLCJjdXJyZW50UGFnZUhlaWdodCIsInJlcG9ydFJlc2l6ZUNoYW5nZSIsInJlcG9ydEJyZWFrUG9pbnRDaGFuZ2UiLCJyZWFkeSIsIm9ic2VydmVQYWdlSGVpZ2h0Q2hhbmdlIiwibGFzdFNjcm9sbFRvcCIsImJyb2FkY2FzdCIsInRoaXNIZWlnaHQiLCJ0aGlzSW5pdGlhbFBvc1kiLCJ0cmFuc2Zvcm1ZIiwicGFyc2VGbG9hdCIsInZpZXdwb3J0SW4iLCJ2aWV3cG9ydEJvdHRvbSIsInZpZXdwb3J0Q2VudGVyIiwidmlld3BvcnRUb3AiLCJ2aWV3cG9ydE91dCIsImlzU2Nyb2xsaW5nIiwic2xvd0Rvd24iLCJBY2NvcmRpb24iLCJrZXlib2FyZEV2ZW50c0FkZGVkIiwiJGFjY29yZGlvbiIsIiR0aGlzQWNjb3JkaW9uIiwiJHRoaXNTZWN0aW9ucyIsImZpbmQiLCJldmVudFR5cGUiLCIkdGhpc1NlY3Rpb24iLCIkdGhpc0hlYWRlciIsIiR0aGlzQm9keSIsInNsaWRlVXAiLCJ0b2dnbGVTZWN0aW9uIiwiYWRkS2V5Ym9hcmRFdmVudHMiLCIkc2VjdGlvbiIsImxpbmtlZCIsImNsb3NlQWxsU2VjdGlvbnMiLCJvcGVuU2VjdGlvbiIsImNsb3NlU2VjdGlvbiIsInNsaWRlRG93biIsInByb21pc2UiLCJ0aGVuIiwiJHRhcmdldHMiLCJvcGVuQWxsU2VjdGlvbnMiLCJjbG9zZSIsIm9wZW4iLCJjbG9zZUFsbCIsIm9wZW5BbGwiLCJDaGVja2JveCIsIiRjaGVja0JveFdyYXBwZXIiLCIkdGhpc0lucHV0IiwiJGNoZWNrQm94IiwiJHRoaXNDaGVja2JveCIsImlzV3JhcHBlZEluTGFiZWwiLCJwYXJlbnRzIiwidGhpc1dyYXBwZXIiLCJmb2N1cyIsImJsdXIiLCJjaGFuZ2UiLCJwcm9wIiwiJGNvZGVXcmFwcGVyIiwidGFiUGFnZUluZGV4IiwiJHRoaXNDb2RlV3JhcHBlciIsIiR0aGlzQ29kZSIsImV4YW1wbGVUYWciLCJleGFtcGxlVGFnVGFiYmVkIiwidGhpc0V4YW1wbGUiLCJ0ZXh0IiwidGhpc0V4YW1wbGVUYWJiZWQiLCJtYXJrdXAiLCJmaXJzdEluZGV4Iiwic2Vjb25kSW5kZXgiLCJhZGRDb3B5QnV0dG9uIiwicmVwbGFjZVdpdGgiLCJ0cnVuY2F0ZSIsImNvcHlUb0NsaXBib2FyZFN1cHBvcnRlZCIsInF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCIsIiRtYXJrdXAiLCIkY29weUJ1dHRvbiIsIiRjb2RlU291cmNlIiwiY29kZUhhc1JlbmRlcmVkRXhhbXBsZSIsIiRjb2RlIiwiY29weVRvQ2xpcEJvYXJkIiwiJHNvdXJjZSIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsInJhbmdlIiwiY3JlYXRlUmFuZ2UiLCJzZWxlY3ROb2RlQ29udGVudHMiLCJhZGRSYW5nZSIsImV4ZWNDb21tYW5kIiwicmVtb3ZlQWxsUmFuZ2VzIiwiJHRoaXNDb2RlU291cmNlIiwiZXEiLCIkZXhwYW5kQnV0dG9uIiwiY29kZUhlaWdodCIsImxpbmVIZWlnaHQiLCJtYXhDb2RlSGVpZ2h0IiwiSWNvbiIsIiRpY29uIiwiJHRoaXNJY29uIiwiJGljb25TdmciLCJpY29uQ2xhc3NOYW1lcyIsInNvdXJjZSIsImRhdGFUeXBlIiwiSW1nTWFnbmlmaWVyIiwiJGN1cnNvciIsIiR2aWV3ZXIiLCJkZWZhdWx0U3RhcnRWaWV3ZXJEZWxheVRpbWUiLCIkaW1nTWFnbmlmaWVyIiwiJHRoaXNJbWdNYWduaWZpZXIiLCIkdGhpc0N1cnNvciIsIiR0aGlzVmlld2VyIiwic3RhcnRWaWV3ZXIiLCJzdG9wVmlld2VyIiwibW92ZU1hZ25pZmllciIsInNldFZpZXdlciIsInNldFpvb21JbWFnZSIsInlQb3MiLCJ4UG9zIiwidGhpc1pvb21JbWFnZVBhdGgiLCJ6b29tSW1hZ2UiLCIkdGhpc1ByZXZpZXdJbWFnZSIsInRoaXNab29tSW1hZ2UiLCJJbWFnZSIsIiR0aGlzWm9vbUltYWdlIiwieVJhdGlvIiwieFJhdGlvIiwic2V0Q3Vyc29yIiwidGhpc0N1cnNvcldpdGgiLCJ0aGlzQ3Vyc29ySGVpZ2h0IiwibWFyZ2luTGVmdCIsImZhZGVJbiIsImltZ01hZ25pZmllclByb3BzIiwiY3Vyc29yUHJvcHMiLCJwYWdlWSIsInBhZ2VYIiwibWluWSIsIm1heFkiLCJtaW5YIiwibWF4WCIsIk1heENoYXJzIiwiZGVmYXVsdE1heExlbmd0aCIsIiRpbnB1dEVsZW1lbnQiLCIkdGhpc0lucHV0RWxlbWVudCIsImRpc3BsYXlDaGFyc0xlZnQiLCJ1cGRhdGVJbnB1dEVsZW1lbnQiLCJtYXhMZW5ndGgiLCJlcnJvckNsYXNzTmFtZXMiLCJlcnJvckNsYXNzIiwiJGRpc3BsYXlFbGVtZW50IiwiaW5wdXRMZW5ndGgiLCJ2YWwiLCJjaGFyc0xlZnQiLCJNb2RhbCIsIm1vZGFsQWN0aXZlIiwibG9hZGVkTW9kYWxzIiwiYnV0dG9uTGFiZWxDbG9zZSIsIiRtb2RhbENvdmVyIiwiJG1vZGFsQ29udGFpbmVyIiwiJG1vZGFsQ2xvc2VCdXR0b24iLCIkbW9kYWxUZW1wbGF0ZSIsIiRtb2RhbFRyaWdnZXIiLCJwcmVwYXJlRG9tIiwiJHRoaXNNb2RhbFRyaWdnZXIiLCJ0aGlzTW9kYWxHZW5lcmF0ZSIsImdlbmVyYXRlIiwidGhpc01vZGFsVGl0bGUiLCJ0aGlzTW9kYWxCb2R5IiwidGhpc01vZGFsSWQiLCJpZCIsInRoaXNNb2RhbE1vZGlmaWVycyIsIm1vZGlmaWVycyIsInRoaXNNb2RhbFBhdGgiLCJwYXRoIiwidGhpc01vZGFsQ2FjaGUiLCJsb2FkIiwiaW5pdGlhbGl6ZUNsb3NlVHJpZ2dlcnMiLCJkb21QcmVwYXJlZCIsImZvdW5kTW9kYWwiLCJtb2RhbElkIiwidHJpZ2dlcnMiLCIkdGhpc01vZGFsIiwiJHRoaXNNb2RhbFRpdGxlIiwiJHRoaXNNb2RhbEJvZHkiLCJwdXNoIiwibW9kYWxQYXRoIiwiY2FsbGJhY2siLCIkbG9hZEJpbiIsInJlc3BvbnNlIiwieGhyIiwiJGltYWdlcyIsInRvdGFsSW1hZ2VzIiwiaW1hZ2VDb3VudGVyIiwib3BlbkZhbGxiYWNrTGluayIsIiRtb2RhbCIsIm9mZlNldFkiLCJtb2RhbEZpdHNJbnRvVmlld3BvcnQiLCJtYXJnaW5Ub3AiLCJwcm90b2NvbCIsImhvc3QiLCJQYWdlUmV3aW5kIiwiJHBhZ2VSZXdpbmQiLCJ0aHJlc2hvbGQiLCJsYWJlbFR4dCIsImVuYWJsZVBhZ2VSZXdpbmQiLCJydW4iLCJzY3JvbGwiLCJQb3BPdmVyIiwiJHBvcE92ZXJUcmlnZ2VyIiwiJHRoaXNQb3BPdmVyVHJpZ2dlciIsIiR0aGlzUG9wT3ZlciIsImRldGFjaCIsInZhbGlkRXZlbnRzIiwicHJldmVudERlZmF1bHRDbGljayIsImV2ZW50U2hvdyIsImV2ZW50SGlkZSIsImhpZGVBbGwiLCJyZW1vdmVUb2dnbGVDbGFzcyIsInRvZ2dsZUNsYXNzIiwic2V0UG9zaXRpb24iLCJjc3NDbGFzc05hbWUiLCJwb3MiLCJyZWYiLCJSYWRpb0J1dHRvbiIsIiRyYWRpb0J0bldyYXBwZXIiLCIkcmFkaW9CdG4iLCIkdGhpc1JhZGlvQnRuIiwiUmFuZ2VJbnB1dCIsImtub2JPZmZzZXQiLCJyYW5nZUlucHV0S25vYiIsInJhbmdlSW5wdXRMYWJlbCIsInJhbmdlSW5wdXRUcmFjayIsIiRyYW5nZUlucHV0IiwiJHRoaXNSYW5nZUlucHV0IiwiJHRoaXNNaW5Lbm9iIiwiJHRoaXNNYXhLbm9iIiwiJHNpbmdsZUxhYmVsIiwiJHRoaXNUcmFjayIsIiR0aGlzS25vYiIsInN0b3JlQ3Vyc29yUG9zIiwibW92ZUtub2IiLCJzaWJsaW5ncyIsImFic01pbiIsImFic01heCIsIm1pbiIsIm1heCIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJ1bml0Iiwib2Zmc2V0WCIsImZsb29yIiwibWluUG9zWCIsIm1heFBvc1giLCJjdXJzb3JQb3NYIiwic2V0IiwidGhpc1Byb3BzIiwidGhpc0Fic01pbiIsInRoaXNBYnNNYXgiLCJhZGp1c3RMYWJlbHMiLCIkdGhpc01pbkxhYmVsIiwiJHRoaXNNYXhMYWJlbCIsIiR0aGlzU2luZ2xlTGFiZWwiLCJtaW5Lbm9iUmlnaHRFZGdlIiwibWF4S25vYkxlZnRFZGdlIiwibWluTGFiZWxXaWR0aCIsIm1heExhYmVsV2lkdGgiLCJzaW5nbGVMYWJlbFdpZHRoIiwiJGtub2IiLCJlUG9zWCIsIm5ld0N1cnNvclBvcyIsIiR0aGlzTWluSW5wdXQiLCIkdGhpc01heElucHV0IiwiaXNNaW5Lbm9iIiwiaXNNYXhLbm9iIiwicG9zWCIsInRoaXNLbm9iVmFsdWUiLCJpbnB1dFZhbHVlIiwiY3Vyc29yT2Zmc2V0IiwiY2VpbCIsIlNjcm9sbEtleXMiLCJjdXJyZW50SG9vayIsInRvdGFsSG9va3MiLCJzY3JvbGxTcGVlZCIsIiRob29rcyIsInByZXYiLCIkc2Nyb2xsQnV0dG9ucyIsImVuYWJsZVNjcm9sbEtleXMiLCJob29rcyIsImRldGVjdEN1cnJlbnRIb29rIiwic2Nyb2xsVG9Ib29rIiwiZGlyZWN0aW9uIiwic2V0Q3VycmVudEhvb2siLCJoaWdobGlnaHRCdXR0b24iLCJidXR0b25JbmRleCIsIiRidXR0b24iLCJTY3JvbGxQcm9ncmVzcyIsIiRzY3JvbGxQcm9ncmVzc0JhciIsImRvY3VtZW50SGVpZ2h0Iiwid2luZG93SGVpZ2h0IiwidG90YWxTY3JvbGwiLCJzY3JvbGxQb3NpdGlvbiIsInNjcm9sbFByb2dyZXNzIiwidmlzaWJsZVNjcm9sbFByb2dyZXNzIiwiZW5hYmxlU2Nyb2xsUHJvZ3Jlc3MiLCJ2aXNpYmxlIiwiU2VhcmNoSW5wdXQiLCIkc2VhcmNoSW5wdXRXcmFwcGVyIiwiJHNlYXJjaElucHV0IiwiJHRoaXNTZWFyY2hJbnB1dCIsIiR0aGlzU2VhcmNoSW5wdXRXcmFwcGVyIiwiU2VsZWN0IiwiJHNlbGVjdFdyYXBwZXIiLCIkc2VsZWN0SWNvbiIsIiRzZWxlY3QiLCIkdGhpc1NlbGVjdCIsIiR0aGlzU2VsZWN0V3JhcHBlciIsIiR0aGlzU2VsZWN0SWNvbiIsIlNsaWRlciIsImJ1dHRvbkxhYmVsTmV4dCIsImJ1dHRvbkxhYmVsUHJldiIsInNsaWRlQ29udHJvbHMiLCJwYWdlQnV0dG9ucy0tdGwiLCJwYWdlQnV0dG9ucy0tdHIiLCJwYWdlQnV0dG9ucy0tYnIiLCJwYWdlQnV0dG9ucy0tYmwiLCJmbGlwQnV0dG9ucyIsImZsaXBCdXR0b25zLS1pbnNldCIsInBhZ2VEb3RzIiwicGFnZURvdHMtLWRhcmsiLCJwYWdlRG90cy0tc3VidGxlIiwiJHNsaWRlciIsInNsaWRlckluZGV4IiwiJHRoaXNTbGlkZXIiLCIkdGhpc1NsaWRlcyIsInNsaWRlSW5kZXgiLCJ0b3RhbFNsaWRlcyIsInRyYW5zaXRpb24iLCJhZGp1c3RIZWlnaHQiLCJjb250cm9sIiwidGhpc0NvbnRyb2xzIiwic3RvcEF1dG9wbGF5Iiwic2hvd1NsaWRlIiwiaW5zZXJ0QmVmb3JlIiwicGFnaW5hdGlvbkxpbmtzIiwibGlua0luZGV4IiwiY2xpY2thYmxlIiwiYXV0b3BsYXkiLCJzdGFydEF1dG9wbGF5IiwiYXBwbHlUcmFuc2l0aW9uIiwidXBkYXRlUGFnaW5hdGlvbiIsIm5leHRTbGlkZUluZGV4IiwiY3VycmVudFNsaWRlSW5kZXgiLCJsZWZ0T2Zmc2V0IiwidGhpc1NsaWRlSW5kZXgiLCIkdGhpc1NsaWRlc1dyYXBwZXIiLCJzbGlkZUhlaWdodCIsInRoaXNTbGlkZUhlaWdodCIsIlN0ZXBwZXIiLCJidXR0b25MYWJlbE1vcmUiLCJidXR0b25MYWJlbExlc3MiLCIkc3RlcHBlckJ1dHRvbnMiLCIkc3RlcHBlciIsIiR0aGlzU3RlcHBlciIsImluaXRpYWxWYWx1ZSIsInByZXBlbmQiLCJpbmNyZWFzZUl0ZW1Db3VudCIsImRlY3JlYXNlSXRlbUNvdW50IiwidmFsaWRhdGVJbnB1dCIsImN1cnJlbnRWYWx1ZSIsInJlc2V0SXRlbUNvdW50Iiwic2V0SXRlbUNvdW50IiwicmVtb3ZlRXJyb3JGb3JtYXR0aW5nIiwiY2xlYXJJdGVtQ291bnQiLCJhZGRFcnJvckZvcm1hdHRpbmciLCIkdHh0RmllbGQiLCJjb3VudFVwIiwiY291bnREb3duIiwiU3dpdGNoIiwibGFiZWxPbiIsImxhYmVsT2ZmIiwiJGxhYmVsT24iLCIkbGFiZWxPZmYiLCIkc3dpdGNoIiwiJHRoaXNTd2l0Y2giLCJ0aGlzTGFiZWxPblRleHQiLCJ0aGlzTGFiZWxPZmZUZXh0Iiwic2hvd0xhYmVscyIsInNldE9uIiwic2V0T2ZmIiwic2V0VG9nZ2xlIiwicHJldmVudEV2ZW50cyIsIlRhYmxlIiwiJHRhYmxlIiwiJHRoaXNUYWJsZSIsInNlbGVjdGFibGUiLCJiZWZvcmUiLCIkdGhpc1RyIiwic2VsZWN0Um93IiwicmVtb3ZlYWJsZSIsImFmdGVyIiwicmVtb3ZlUm93IiwiJHRoaXNBbGxUciIsInVuc2VsZWN0Um93IiwidG90YWxUZHMiLCJ0YWJsZUlzRW1wdHkiLCJzZWxlY3QiLCJ1bnNlbGVjdCIsIiR0YWJzTWVudSIsIiR0aGlzVGFic01lbnUiLCJ1cmxUYWJJZCIsImhhc2giLCJmaXJzdFRhYklkIiwiaGFzaE1hdGNoZXNUYWIiLCJoYXNBY3RpdmVUYWIiLCJoYXMiLCJzdGFydFRhYklkIiwidGhpc1RhcmdldFRhYklkIiwiJHRoaXNUYWJzTWVudUl0ZW0iLCIkdGhpc1RhYnNNZW51SXRlbXMiLCIkdGhpc1RhcmdldFRhYiIsIiR0aGlzTWVudUl0ZW0iLCJ0YWJJZCIsIlRvb2x0aXAiLCJkZWZhdWx0RmFkZUR1cmF0aW9uIiwiZGVmYXVsdFNob3dEZWxheSIsImRlZmF1bHRIaWRlRGVsYXkiLCJnZW5lcmF0ZWRUb29sVGlwSWQiLCIkdG9vbHRpcFRyaWdnZXIiLCIkdGhpc1Rvb2x0aXBUcmlnZ2VyIiwic3RhdGljUG9zaXRpb24iLCJjb250ZW50IiwiaGFzU3RhdGljUG9zaXRpb24iLCIkdGhpc1Rvb2x0aXAiLCJnZW5lcmF0ZVRvb2x0aXAiLCJwcmVwYXJlVG9vbHRpcCIsInNldFN0YXRpY1Bvc2l0aW9uIiwiaGlkZVdpdGhEZWxheSIsInNob3dXaXRoRGVsYXkiLCJzY29wZSIsInRvb2x0aXBJZCIsInRhcmdldEFscmVhZHlQcmVwYXJlZCIsImNoYW5nZVRvb2x0aXBDb250ZW50IiwiJHRoaXNUb29sVGlwIiwiY3Vyc29yWSIsImN1cnNvclgiLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0Iiwidmlld1BvcnRXaWR0aCIsInZpZXdQb3J0SGVpZ2h0IiwiZml4ZWQiLCJwb3NpdGlvblR5cGUiLCJzY3JvbGxPZmZzZXQiLCJ0b29sdGlwTGVmdCIsInRvb2x0aXBUb3AiLCJzaG93RGVsYXlEdXJhdGlvbiIsInNob3dEZWxheSIsImhpZGVEZWxheUR1cmF0aW9uIiwiaGlkZURlbGF5Il0sIm1hcHBpbmdzIjoiQUFFQSxJQUFJQTtJQUtBQztJQUNBQztJQUNBQztJQUNBQztJQUNBQztJQUlBQyxnQkFBaUIsU0FBU0MsT0FBT0M7UUFhN0IsS0FBS0QsVUFBVUMsY0FBYyxPQUFPO1FBSXBDLElBQUlELE1BQU1FLFFBQVFELGlCQUFpQixHQUFHO1lBQ2xDLE9BQU87ZUFDSjtZQUNILE9BQU87OztJQUtmRSxTQUFVLFNBQVNDLEtBQUtDO1FBVXBCLElBQUlELE1BQU1FLEtBQUtDLElBQUlIO1FBQ25CLElBQUlDLFNBQVNBLFVBQVU7UUFDdkIsSUFBSUcsSUFBSTtRQUNSLElBQUlDLGVBQWU7UUFFbkIsT0FBT0QsSUFBSUgsUUFBUTtZQUNmRztZQUNBQyxnQkFBZ0I7O1FBR3BCLFFBQVFBLGVBQWVMLEtBQUtNLE9BQU9MLFNBQU87O0lBSTlDTSxhQUFjLFNBQVNiO1FBU25CLFdBQVdjLE9BQU9uQixJQUFJSyxPQUFPQSxZQUFZLFVBQVU7WUFDL0MsT0FBTztlQUNKO1lBQ0gsT0FBTzs7O0lBS2ZlLGdCQUFpQixTQUFTaEI7UUFTdEIsV0FBV2UsT0FBT25CLElBQUlJLFVBQVVBLGVBQWUsVUFBVTtZQUNyRCxPQUFPO2VBQ0o7WUFDSCxP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