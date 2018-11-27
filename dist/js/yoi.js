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
        $window.off("load.sticky yoi-resize.sticky yoi-scroll.sticky yoi-breakpoint-change.sticky yoi-pageheight-change.sticky");
        YOI.collection["sticky"].each(function() {
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
        var $thisInput = $(this).find("input");
        if ($thisInput.is(":disabled")) return false;
        $thisInput.trigger("change");
    });
    var $radioBtnWrapper = $('<span class="radio"></span>').on("click", function() {
        var $thisInput = $(this).find("input");
        if ($thisInput.is(":disabled")) return false;
        $thisInput.trigger("change");
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
                change: function() {
                    if ($thisCheckbox.is(":checked")) {
                        $thisCheckbox.prop("checked", false);
                        $thisCheckbox.parent().removeClass("input--checked");
                    } else if (!$thisCheckbox.is(":checked")) {
                        $thisCheckbox.prop("checked", true);
                        $thisCheckbox.parent().addClass("input--checked");
                    }
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
                change: function() {
                    $('[name="' + $thisRadioBtn.attr("name") + '"]').parent().removeClass("input--checked");
                    if ($thisRadioBtn.is(":checked")) {
                        $thisRadioBtn.parent().addClass("input--checked");
                    }
                    if (!$thisRadioBtn.is(":checked")) {
                        $thisRadioBtn.prop("checked", true);
                        $thisRadioBtn.parent().addClass("input--checked");
                    }
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
            if ($(this).is(":disabled")) {
                thisWrapper.addClass("input--disabled");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy95b2kuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9kaXNtaXNzLmpzIiwic3JjL2pzL2JlaGF2aW91cnMvbGF6eWxvYWQuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9wYXJhbGxheC5qcyIsInNyYy9qcy9iZWhhdmlvdXJzL3Njcm9sbGZ4LmpzIiwic3JjL2pzL2JlaGF2aW91cnMvc3RpY2t5LmpzIiwic3JjL2pzL2FjdGlvbnMvYmxpbmsuanMiLCJzcmMvanMvYWN0aW9ucy9oaWRlLmpzIiwic3JjL2pzL2FjdGlvbnMvcHVsc2UuanMiLCJzcmMvanMvYWN0aW9ucy9zY3JvbGx0by5qcyIsInNyYy9qcy9hY3Rpb25zL3Nob3cuanMiLCJzcmMvanMvYWN0aW9ucy91cGRhdGUuanMiLCJzcmMvanMvbW9kdWxlcy9icm93c2VyaGlzdG9yeS5qcyIsInNyYy9qcy9tb2R1bGVzL2tleWJvYXJkYWdlbnQuanMiLCJzcmMvanMvbW9kdWxlcy9yZXNpemVhZ2VudC5qcyIsInNyYy9qcy9tb2R1bGVzL3Njcm9sbGFnZW50LmpzIiwic3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbi5qcyIsInNyYy9jb21wb25lbnRzL2NvZGUvY29kZS5qcyIsInNyYy9jb21wb25lbnRzL2NvdW50ZG93bi9jb3VudGRvd24uanMiLCJzcmMvY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXIuanMiLCJzcmMvY29tcG9uZW50cy9kb2NrL2RvY2suanMiLCJzcmMvY29tcG9uZW50cy9maWx0ZXJidG5zL2ZpbHRlcmJ0bnMuanMiLCJzcmMvY29tcG9uZW50cy9mbHlvdXQvZmx5b3V0LmpzIiwic3JjL2NvbXBvbmVudHMvZm9ybS9jdXN0b21mb3JtZWxlbWVudHMuanMiLCJzcmMvY29tcG9uZW50cy9pY29uL2ljb24uanMiLCJzcmMvY29tcG9uZW50cy9pbWdtYWduaWZpZXIvaW1nbWFnbmlmaWVyLmpzIiwic3JjL2NvbXBvbmVudHMvbG9nL2xvZy5qcyIsInNyYy9jb21wb25lbnRzL21heGNoYXJzL21heGNoYXJzLmpzIiwic3JjL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMiLCJzcmMvY29tcG9uZW50cy9wYWdlcmV3aW5kL3BhZ2VyZXdpbmQuanMiLCJzcmMvY29tcG9uZW50cy9waWNrYnRuL3BpY2tidG4uanMiLCJzcmMvY29tcG9uZW50cy9waWVjaGFydC9waWVjaGFydC5qcyIsInNyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5qcyIsInNyYy9jb21wb25lbnRzL3JhbmdlaW5wdXQvcmFuZ2VpbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL3JhdGluZ2lucHV0L3JhdGluZ2lucHV0LmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xsa2V5cy9zY3JvbGxrZXlzLmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xscHJvZ3Jlc3Mvc2Nyb2xscHJvZ3Jlc3MuanMiLCJzcmMvY29tcG9uZW50cy9zbGlkZXIvc2xpZGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3RlcHBlci9zdGVwcGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3dpdGNoL3N3aXRjaC5qcyIsInNyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmpzIiwic3JjL2NvbXBvbmVudHMvdGFicy90YWJzLmpzIiwic3JjL2NvbXBvbmVudHMvdG9nZ2xlZ3JvdXAvdG9nZ2xlZ3JvdXAuanMiLCJzcmMvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuanMiXSwibmFtZXMiOlsiWU9JIiwiY29sbGVjdGlvbiIsImFjdGlvbiIsImJlaGF2aW91ciIsImNvbXBvbmVudCIsIm1vZHVsZSIsInN0cmluZ0NvbnRhaW5zIiwiaW5wdXQiLCJzZWFyY2hTdHJpbmciLCJpbmRleE9mIiwiemVyb1BhZCIsIm51bSIsImRpZ2l0cyIsIk1hdGgiLCJhYnMiLCJpIiwibGVhZGluZ1plcm9zIiwic2xpY2UiLCJmb3VuZE1vZHVsZSIsIndpbmRvdyIsImZvdW5kQ29tcG9uZW50Iiwic2V0RGVsYXkiLCJkZWxheU5hbWUiLCJkZWxheVRpbWUiLCJkZWxheUZ1bmN0aW9uIiwidGhpcyIsImNsZWFyRGVsYXkiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwidW5kZWZpbmVkIiwic2V0SW50ZXJ2YWwiLCJpbnRlcnZhbE5hbWUiLCJpbnRlcnZhbFRpbWUiLCJpbnRlcnZhbEZ1bmN0aW9uIiwiY2xlYXJJbnRlcnZhbCIsImFmSW50ZXJ2YWwiLCJkYXRlTm93IiwiRGF0ZSIsIm5vdyIsInJlcXVlc3RBbmltYXRpb24iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzdGFydCIsInN0b3AiLCJ0aWNrIiwiY2xlYXIiLCJ0b09iamVjdCIsImtleVZhbHVlUGFpciIsInByb3Blck9iamVjdCIsInZhbHVlU3RhcnRNYXJrZXIiLCJrZXlWYWx1ZVBhaXJFbmRNYXJrZXIiLCJyZXBsYWNlIiwic3BsaXQiLCJsZW5ndGgiLCJ0cmltIiwidG9Cb29sZWFuIiwidG9Mb3dlckNhc2UiLCJnZXRBdHRyaWJ1dGUiLCIkZWxlbWVudCIsInlvaUF0dHJpYnV0ZVZhbHVlIiwiJCIsImVhY2giLCJhdHRyaWJ1dGVzIiwiaW5kZXgiLCJhdHRyaWJ1dGUiLCJuYW1lIiwibWF0Y2giLCJ2YWx1ZSIsImhpZGUiLCJpc2pRdWVyeSIsImhhc0NsYXNzIiwiZGF0YSIsInJlbW92ZUNsYXNzIiwic2hvdyIsImhhc093blByb3BlcnR5IiwiYWRkQ2xhc3MiLCJpc051bWJlciIsImlucHV0VmFsIiwicGF0dGVybiIsInRlc3RWYWwiLCJ0b1N0cmluZyIsInRlc3QiLCJub0ZvY3VzIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwidGFnTmFtZSIsInRocm90dGxlIiwidGFyZ2V0RnVuY3Rpb24iLCJkZWxheSIsInNuYXBzaG90IiwidmFsaWRCcmVha3BvaW50Iiwia2V5d29yZCIsInZhbGlkQnJlYWtQb2ludHMiLCJwb3NpdGlvbiIsImluQXJyYXkiLCJyZW1vdmVGeCIsImNsYXNzTmFtZSIsImpvaW4iLCJyZXZlcnNlRngiLCJmeCIsIm9wcG9zaXRlRngiLCJmYWRlLWluIiwiZmFkZS1vdXQiLCJzY2FsZS11cCIsInNjYWxlLWRvd24iLCJzY2FsZS11cC15Iiwic2NhbGUtZG93bi15Iiwic2xpZGUtaW4tdG9wIiwic2xpZGUtb3V0LXRvcCIsInNsaWRlLWluLWJvdHRvbSIsInNsaWRlLW91dC1ib3R0b20iLCJzbGlkZS1pbi1sZWZ0Iiwic2xpZGUtb3V0LWxlZnQiLCJzbGlkZS1pbi1yaWdodCIsInNsaWRlLW91dC1yaWdodCIsImpRdWVyeSIsImVudmlyb25tZW50IiwiZW52TmFtZSIsImRlZmF1bHRFbnZpcm9ubWVudCIsImN1cnJlbnRFbnZpcm9ubWVudCIsImF0dHIiLCJsb2NhbGUiLCJsYW5ndWFnZSIsImRlZmF1bHRMYW5ndWFnZSIsImN1cnJlbnRMYW5ndWFnZSIsImN1cnJlbnRCcmVha1BvaW50IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImJvZHkiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiYmxpbmsiLCJ0aW1lcyIsImFuaW1hdGUiLCJvcGFjaXR5IiwicHVsc2UiLCJzdGFydERvbU9ic2VydmVyIiwiJGRvY3VtZW50Iiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwiV2ViS2l0TXV0YXRpb25PYnNlcnZlciIsInRhcmdldCIsIm11dGF0aW9ucyIsImZvckVhY2giLCJtdXRhdGlvbiIsImFkZGVkTm9kZXMiLCJ0cmlnZ2VyIiwicmVtb3ZlZE5vZGVzIiwib2JzZXJ2ZSIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJjaGFyYWN0ZXJEYXRhIiwic3RvcERvbU9ic2VydmVyIiwiZGlzY29ubmVjdCIsInVwZGF0ZU9wdGlvbnMiLCJvcHRpb25zIiwia2V5IiwidXBkYXRlUHJvcHMiLCJwcm9wcyIsInVwZGF0ZVN0YXRlIiwic3RhdGUiLCJjcmVhdGVDb2xsZWN0aW9uIiwiaWRlbnRpZmllciIsIiR0aGlzIiwiYWRkIiwiZmlsdGVyQ29sbGVjdGlvbiIsImNvbGxlY3Rpb25JZGVudGlmaWVyIiwiZmlsdGVyUHJvcHMiLCIkY29sbGVjdGlvbiIsImZpbHRlciIsImRlc3Ryb3lDb2xsZWN0aW9uIiwicmVtb3ZlRGF0YSIsImJpbmRBY3Rpb24iLCJ5b2lBY3Rpb24iLCJwYXJhbXMiLCJPYmplY3QiLCJrZXlzIiwiaG9zdE9iamVjdCIsInB1YmxpY0Z1bmN0aW9uIiwiZXZlbnQiLCJvbiIsIiR0YXJnZXQiLCIkdHJpZ2dlciIsInBhcmVudCIsIm1hcCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm1hcEFjdGlvbnMiLCJpcyIsInNldFJlYWR5IiwiaW5pdGlhbGl6ZWQiLCJpc1JlYWR5IiwiaW5pdGlhbGl6ZSIsImluaXQiLCJDb2RlIiwiRGlzbWlzcyIsImxvY2FsaXphdGlvbiIsImVuIiwiYnRuTGFiZWwiLCJkZSIsIiRidG5EaXNtaXNzIiwiJGRpc21pc3NhYmxlRWxlbWVudCIsImlzRGlzbWlzc2FibGUiLCIkdGhpc0Rpc21pc3NhYmxlRWxlbWVudCIsInBvc2l0aW9uU3RhdGljIiwiY3NzIiwiY2xvbmUiLCJkaXNtaXNzIiwiYXBwZW5kVG8iLCIkdGFyZ2V0RWxlbWVudCIsImZhZGVPdXQiLCJMYXp5bG9hZCIsIiRsYXp5bG9hZCIsImlzTGF6eWxvYWRpbmciLCJtYWtlTGF6eWxvYWQiLCIkbm9zY3JpcHRFbGVtZW50IiwiJHBsYWNlSG9sZGVyIiwiZGVmYXVsdEltYWdlIiwic3JjIiwiZXh0cmFjdEltZ1NyY0Zyb21TdHJpbmciLCJodG1sIiwid2lkdGgiLCJoZWlnaHQiLCJhbHQiLCJ0aXRsZSIsImxvbmdkZXNjIiwiY3NzQ2xhc3NlcyIsImluc2VydEFmdGVyIiwibmV4dCIsIlNjcm9sbEFnZW50Iiwib25lIiwiaW1hZ2VVcmwiLCJicmVha1BvaW50U21hbGwiLCJicmVha1BvaW50TWVkaXVtIiwiYnJlYWtQb2ludExhcmdlIiwiYnJlYWtQb2ludFhsYXJnZSIsInNyY1NtYWxsIiwic3JjTWVkaXVtIiwic3JjTGFyZ2UiLCJzcmNYbGFyZ2UiLCIkbmV3SW1hZ2UiLCJjb21wbGV0ZSIsIm91dHB1dCIsIlBhcmFsbGF4IiwiJHdpbmRvdyIsImN1cnJlbnRTY3JvbGxUb3AiLCJzY3JvbGxUb3AiLCJ2aWV3cG9ydEhlaWdodCIsImRlZmF1bHRGYWN0b3IiLCJvYnNlcnZlcklzUnVubmluZyIsIiRwYXJhbGxheEVsZW1lbnQiLCJpc1BhcmFsbGF4Iiwic3RhcnRTY3JvbGxBZ2VudCIsInN0YXJ0UGFyYWxsYXhPYnNlcnZlciIsInVwZGF0ZVBhcmFsbGF4RW52IiwidHJhbnNmb3JtUGFyYWxsYXgiLCJzdGFydHNJblZpZXdwb3J0IiwiaW5pdGlhbFBvc1kiLCJyZXNldFByb3BzIiwicmVzZXRUcmFuc2Zvcm1zIiwicmVzZXRBbGwiLCJzY3JvbGxPdmVyc2hvb3QiLCJhY3RpdmVCcmVha3BvaW50IiwiZmFjdG9yIiwibm90IiwiYWxsb3dlZE9uQ3VycmVudEJyZWFrcG9pbnQiLCJzY3JvbGxUb3BJblZpZXdwb3J0IiwicGFyYWxsYXhPZmZzZXQiLCJwYXJzZUludCIsImRlc3Ryb3kiLCJvZmYiLCJTY3JvbGxGeCIsIiR0aGlzVGFyZ2V0RWxlbWVudCIsImhhc1Njcm9sbEZ4IiwicmVzZXRGeENsYXNzTmFtZXMiLCJwcmVwYXJlIiwibGlzdGVuIiwic3RhcnRCcmVha3BvaW50QWdlbnQiLCJpbkZ4IiwiaW4iLCJib3R0b21GeCIsImJvdHRvbSIsImNlbnRlckZ4IiwiY2VudGVyIiwidG9wRngiLCJ0b3AiLCJzcGVlZCIsInJlcGVhdCIsImFwcGx5RngiLCJhbGxvd2VkIiwicmVzZXQiLCJTdGlja3kiLCIkYm9keSIsIiRzdGlja3lFbGVtZW50IiwiJHRoaXNTdGlja3lFbGVtZW50IiwiaXNTdGlja3kiLCJ0cmFuc2Zvcm0iLCJzdGFydFBvc2l0aW9uT2JzZXJ2ZXIiLCJzdGFydFN0aWNrT2JzZXJ2ZXIiLCIkc3RpY2t5UGxhY2Vob2xkZXIiLCIkc3RpY2t5V3JhcHBlciIsInN0aWNreUVsZW1lbnRDc3NQb3MiLCJzdGlja3lFbGVtZW50Q3NzTGVmdCIsInN0aWNreUVsZW1lbnRDc3NUb3AiLCJzdGlja3lFbGVtZW50Q1NTTWFyZ2luIiwibGVmdCIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJtYXJnaW4iLCJvdXRlcldpZHRoIiwib3V0ZXJIZWlnaHQiLCJkaXNwbGF5Iiwid3JhcCIsInJlbW92ZSIsInJlbW92ZUF0dHIiLCJ1bndyYXAiLCIkcmVmZXJlbmNlRWxlbWVudCIsInJlZmVyZW5jZSIsImZpcnN0Iiwic3RpY2t5RWxlbWVudEhlaWdodCIsInN0aWNreUVsZW1lbnRXaWR0aCIsInN0aWNreUVsZW1lbnRJbml0aWFsVG9wUG9zIiwib2Zmc2V0IiwidG9wT2Zmc2V0IiwidG9wRGlzdGFuY2UiLCJzdGlja1N0YXJ0Iiwic3RpY2tTdG9wIiwicGFzc2VkVmFsaWRhdGlvbiIsInZhbGlkSW5wdXQiLCJ2YWxpZEhlaWdodCIsImluaXRpYWxUb3BQb3MiLCJwb3NpdGlvbk9ic2VydmVyIiwic3RpY2tPYnNlcnZlciIsImNzc1dpZHRoVmFsdWUiLCJjc3NQb3NpdGlvblZhbHVlIiwiY3NzVG9wVmFsdWUiLCJzdGlja3lQbGFjZWhvbGRlckRpc3BsYXkiLCJiYWNrZmFjZS12aXNpYmlsaXR5Iiwiei1pbmRleCIsIkJsaW5rIiwiSGlkZSIsInRvZ2dsZSIsIlNob3ciLCJzZWxlY3RvcnMiLCJ0YXJnZXRTZWxlY3RvciIsIlB1bHNlIiwiU2Nyb2xsVG8iLCJzY3JvbGxSb290Iiwic2Nyb2xsaW5nRWxlbWVudCIsImRvY3VtZW50RWxlbWVudCIsIiRzY3JvbGxDb250ZXh0IiwiJHNjcm9sbENvbnRhaW5lciIsImNsb3Nlc3QiLCJoaWdobGlnaHQiLCJzY3JvbGxQb3NZIiwiVGFicyIsInN3aXRjaFRvIiwidGFyZ2V0SWQiLCJ3aGVuIiwiZG9uZSIsIlVwZGF0ZSIsInJlcXVlc3RUeXBlIiwidHlwZSIsInJlcXVlc3RVcmwiLCJ1cmwiLCJlcnJvclRpdGxlIiwiZXJyb3JNc2ciLCIkZXJyb3JNc2ciLCIkc3Bpbm5lciIsInRvVXBwZXJDYXNlIiwiYWpheCIsImNhY2hlIiwiYmVmb3JlU2VuZCIsImFwcGVuZCIsImVycm9yIiwic3VjY2VzcyIsIiRyZXNwb25zZSIsIkJyb3dzZXJIaXN0b3J5IiwicHVzaEhhc2giLCJoYXNoU3RyaW5nIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJyZXBsYWNlSGFzaCIsInJlcGxhY2VTdGF0ZSIsImNsZWFySGFzaCIsIktleWJvYXJkQWdlbnQiLCIzOCIsIjM5IiwiNDAiLCIzNyIsIjEzIiwiMzIiLCIyNyIsIjkiLCJrZXlDb2RlIiwid2hpY2giLCJhZGRUYWJGb2N1cyIsIiRlbGVtZW50cyIsIiRhY3RpdmVFbGVtZW50IiwiUmVzaXplYWdlbnQiLCJsYXN0QnJlYWtQb2ludCIsImFjdGl2ZUJyZWFrUG9pbnQiLCJsYXN0UGFnZUhlaWdodCIsImN1cnJlbnRQYWdlSGVpZ2h0IiwicmVwb3J0UmVzaXplQ2hhbmdlIiwicmVwb3J0QnJlYWtQb2ludENoYW5nZSIsInJlYWR5Iiwib2JzZXJ2ZVBhZ2VIZWlnaHRDaGFuZ2UiLCJsYXN0U2Nyb2xsVG9wIiwidXBkYXRlIiwiYnJvYWRjYXN0IiwidGhpc0hlaWdodCIsInRoaXNJbml0aWFsUG9zWSIsInRyYW5zZm9ybVkiLCJwYXJzZUZsb2F0Iiwidmlld3BvcnRJbiIsInZpZXdwb3J0Qm90dG9tIiwidmlld3BvcnRDZW50ZXIiLCJ2aWV3cG9ydFRvcCIsInZpZXdwb3J0T3V0IiwiaXNTY3JvbGxpbmciLCJzbG93RG93biIsIkFjY29yZGlvbiIsImtleWJvYXJkRXZlbnRzQWRkZWQiLCIkYWNjb3JkaW9uIiwiJHRoaXNBY2NvcmRpb24iLCIkdGhpc1NlY3Rpb25zIiwiZmluZCIsImV2ZW50VHlwZSIsIiR0aGlzU2VjdGlvbiIsIiR0aGlzSGVhZGVyIiwiJHRoaXNCb2R5Iiwic2xpZGVVcCIsInRvZ2dsZVNlY3Rpb24iLCJhZGRLZXlib2FyZEV2ZW50cyIsIiRzZWN0aW9uIiwibGlua2VkIiwiY2xvc2VBbGxTZWN0aW9ucyIsIm9wZW5TZWN0aW9uIiwiY2xvc2VTZWN0aW9uIiwic2xpZGVEb3duIiwicHJvbWlzZSIsInRoZW4iLCIkdGFyZ2V0cyIsIm9wZW5BbGxTZWN0aW9ucyIsImNsb3NlIiwib3BlbiIsImNsb3NlQWxsIiwib3BlbkFsbCIsIiRjb2RlV3JhcHBlciIsInRhYlBhZ2VJbmRleCIsIiR0aGlzQ29kZVdyYXBwZXIiLCIkdGhpc0NvZGUiLCJleGFtcGxlVGFnIiwiZXhhbXBsZVRhZ1RhYmJlZCIsInRoaXNFeGFtcGxlIiwidGV4dCIsInRoaXNFeGFtcGxlVGFiYmVkIiwibWFya3VwIiwiZmlyc3RJbmRleCIsInNlY29uZEluZGV4IiwiYWRkQ29weUJ0biIsInJlcGxhY2VXaXRoIiwidHJ1bmNhdGUiLCJjb3B5VG9DbGlwYm9hcmRTdXBwb3J0ZWQiLCJxdWVyeUNvbW1hbmRTdXBwb3J0ZWQiLCIkbWFya3VwIiwiJGNvcHlCdG4iLCIkY29kZVNvdXJjZSIsImNvZGVIYXNSZW5kZXJlZEV4YW1wbGUiLCIkY29kZSIsImNvcHlUb0NsaXBCb2FyZCIsIiRzb3VyY2UiLCJzZWxlY3Rpb24iLCJnZXRTZWxlY3Rpb24iLCJyYW5nZSIsImNyZWF0ZVJhbmdlIiwic2VsZWN0Tm9kZUNvbnRlbnRzIiwiYWRkUmFuZ2UiLCJleGVjQ29tbWFuZCIsInJlbW92ZUFsbFJhbmdlcyIsIiR0aGlzQ29kZVNvdXJjZSIsImVxIiwiJGV4cGFuZEJ0biIsImNvZGVIZWlnaHQiLCJsaW5lSGVpZ2h0IiwibWF4Q29kZUhlaWdodCIsIkNvdW50ZG93biIsImRheXMiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiJGNvdW50ZG93bkNoYXJhY3RlciIsIiRjb3VudGRvd25DaGFyYWN0ZXJMYWJlbCIsIiRjb3VudGRvd25DbG9jayIsIiRjb3VudGRvd24iLCIkdGhpc0NvdW50ZG93biIsImRlZmF1bHRZZWFyIiwiZ2V0RnVsbFllYXIiLCJkZWZhdWx0TW9udGgiLCJkZWZhdWx0RGF5IiwiZGVmYXVsdEhvdXIiLCJkZWZhdWx0TWludXRlIiwiZGVmYXVsdFNlY29uZCIsInllYXIiLCJtb250aCIsImRheSIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJlbmRUaW1lIiwiZ2V0RGF0ZVN0cmluZyIsInJlbmRlciIsInRpbWVSZW1haW5pbmciLCJnZXRUaW1lUmVtYWluaW5nIiwibGNkQ2hhcmFjdGVycyIsImdldExjZENoYXJhY3RlcnNDU1NDbGFzc05hbWVzIiwiJGhpZGRlbkxhYmVsIiwiJHRoaXNDb3VudGRvd25DbG9jayIsInVuaXQiLCIkY291bnRkb3duQ2hhcnMiLCIkY291bnRkb3duTGFiZWwiLCJnZXRDaGFyYWN0ZXJMYWJlbCIsInRvdGFsIiwic2VsZWN0b3IiLCJsYWJlbFR4dCIsIm1vbnRocyIsImVuZFRpbWVJc29TdHJpbmciLCJwYXJzZSIsImZsb29yIiwiY2hhckF0IiwiJGxhYmVsIiwiRGF0ZVBpY2tlciIsIndlZWtEYXlzIiwibW9udGhOYW1lcyIsIiRkYXRlUGlja2VyIiwiJHdlZWtEYXlzSGVhZGVyIiwiJGRhdGVwaWNrZXIiLCJnZXRDdXJyZW50RGF0ZSIsIiR0aGlzRGF0ZUlucHV0IiwiaW5wdXRZZWFyIiwiaW5wdXRNb250aCIsImlucHV0RGF5IiwidXBkYXRlRGF0ZUlucHV0IiwiJHRoaXNEYXRlUGlja2VyIiwicmVuZGVyRGF0ZVBpY2tlciIsIiR0aGlzRGF0ZUlucHV0V3JhcHBlciIsImFmdGVyIiwic3RvcFByb3BhZ2F0aW9uIiwidGhpc0RhdGVJbnB1dFByb3BzIiwicmVuZGVyTW9udGhUYWJsZSIsInNlbGVjdGVkWWVhciIsInNlbGVjdGVkTW9udGgiLCJoaWRlQWxsRGF0ZVBpY2tlcnMiLCJwbGFjZURhdGVQaWNrZXIiLCJ1cGRhdGVEYXRlUGlja2VyIiwic2VsZWN0ZWREYXkiLCJmb3JtYXR0ZWRTZWxlY3RlZERhdGUiLCJ1cGRhdGVNb250aFRhYmxlIiwiJHRoaXNNb250aFRhYmxlIiwiZmlyc3REYXlJbnN0YW5jZSIsImZpcnN0RGF5IiwiZ2V0RGF5IiwidG90YWxEYXlzIiwiZ2V0VG90YWxEYXlzIiwiZm9ybWF0dGVkRGF0ZSIsInZhbCIsIiRtb250aFRhYmxlIiwiJG1vbnRoVGFibGVCb2R5IiwidGhpc01vbnRoVGFibGVQcm9wcyIsInRoaXNEYXRlUGlja2VyUHJvcHMiLCJpbmRleENlbGwiLCJpbmRleERheSIsImNlaWwiLCIkcm93IiwiaiIsIiRjZWxsIiwicGlja0RhdGUiLCIkdGhpc01vbnRoQnV0dG9uIiwiJHRoaXNEYXRlcGlja2VyIiwidGhpc0FjdGlvbiIsInByZXYiLCJmb2N1cyIsIiR0aGlzQ2VsbCIsImN1cnJlbnREYXRlIiwid2Vla0RheSIsImdldERhdGUiLCJnZXRNb250aCIsImFkanVzdFllYXIiLCJnZXRZZWFyIiwiZGF5c0luTW9udGhzIiwiJGRhdGVJbnB1dCIsImRhdGVJbnB1dE9mZnNldFkiLCJkYXRlSW5wdXRIZWlnaHQiLCJkYXRlUGlja2VySGVpZ2h0Iiwidmlld1BvcnRIZWlnaHQiLCJwbGFjZSIsIkRvY2siLCIkZG9jayIsIiR0aGlzRG9jayIsImF1dG9oaWRlIiwiRmlsdGVyQnRucyIsIiRmaWx0ZXJCdG5zIiwiJHRoaXNGaWx0ZXJCdG5zIiwiJHRoaXNCdG4iLCJGbHlvdXQiLCIkZmx5b3V0IiwiJHRoaXNGbHlvdXQiLCJkZXRhY2giLCIkZmx5b3V0SGFuZGxlIiwiQ3VzdG9tRm9ybUVsZW1lbnRzIiwiJGNoZWNrQm94V3JhcHBlciIsIiR0aGlzSW5wdXQiLCIkcmFkaW9CdG5XcmFwcGVyIiwiJHNlbGVjdFdyYXBwZXIiLCIkc2VsZWN0SWNvbiIsIiRjaGVja0VsZW1ucyIsIiRjaGVja0JveGVzIiwiJHJhZGlvQnRucyIsIiRzZWxlY3RzIiwiJHRoaXNDaGVja2JveCIsImlzV3JhcHBlZEluTGFiZWwiLCJwYXJlbnRzIiwiYmx1ciIsImNoYW5nZSIsInByb3AiLCIkdGhpc1JhZGlvQnRuIiwiJHRoaXNTZWxlY3QiLCIkdGhpc1NlbGVjdFdyYXBwZXIiLCIkdGhpc1NlbGVjdEljb24iLCJ0aGlzV3JhcHBlciIsIkljb24iLCIkaWNvbiIsIiR0aGlzSWNvbiIsIiRpY29uU3ZnIiwiaWNvbkNsYXNzTmFtZXMiLCJzb3VyY2UiLCJkYXRhVHlwZSIsIkltZ01hZ25pZmllciIsIiRjdXJzb3IiLCIkdmlld2VyIiwiZGVmYXVsdFN0YXJ0Vmlld2VyRGVsYXlUaW1lIiwiJGltZ01hZ25pZmllciIsIiR0aGlzSW1nTWFnbmlmaWVyIiwiJHRoaXNDdXJzb3IiLCIkdGhpc1ZpZXdlciIsInN0YXJ0Vmlld2VyIiwic3RvcFZpZXdlciIsIm1vdmVNYWduaWZpZXIiLCJzZXRWaWV3ZXIiLCJzZXRab29tSW1hZ2UiLCJ5UG9zIiwieFBvcyIsInRoaXNab29tSW1hZ2VQYXRoIiwiem9vbUltYWdlIiwiJHRoaXNQcmV2aWV3SW1hZ2UiLCJ0aGlzWm9vbUltYWdlIiwiSW1hZ2UiLCIkdGhpc1pvb21JbWFnZSIsInlSYXRpbyIsInhSYXRpbyIsInNldEN1cnNvciIsInRoaXNDdXJzb3JXaXRoIiwidGhpc0N1cnNvckhlaWdodCIsIm1hcmdpbkxlZnQiLCJmYWRlSW4iLCJpbWdNYWduaWZpZXJQcm9wcyIsImN1cnNvclByb3BzIiwicGFnZVkiLCJwYWdlWCIsIm1pblkiLCJtYXhZIiwibWluWCIsIm1heFgiLCJMb2ciLCJ3cml0ZSIsIiRsb2ciLCJsb2dJbnB1dCIsIm1lbW9yeSIsInVuc2hpZnQiLCIkbG9nQm9keSIsImxvZ01lbW9yeSIsImxvZ091dHB1dCIsIk1heENoYXJzIiwiZGVmYXVsdE1heExlbmd0aCIsIiRpbnB1dEVsZW1lbnQiLCIkdGhpc0lucHV0RWxlbWVudCIsImRpc3BsYXlDaGFyc0xlZnQiLCJ1cGRhdGVJbnB1dEVsZW1lbnQiLCJtYXhMZW5ndGgiLCJlcnJvckNsYXNzTmFtZXMiLCJlcnJvckNsYXNzIiwiJGRpc3BsYXlFbGVtZW50IiwiaW5wdXRMZW5ndGgiLCJjaGFyc0xlZnQiLCJNb2RhbCIsIm1vZGFsQWN0aXZlIiwibG9hZGVkTW9kYWxzIiwiYnRuTGFiZWxDbG9zZSIsIiRtb2RhbENvdmVyIiwiJG1vZGFsQ29udGFpbmVyIiwiJG1vZGFsQ2xvc2VCdG4iLCIkbW9kYWxUZW1wbGF0ZSIsIiRtb2RhbFRyaWdnZXIiLCJwcmVwYXJlRG9tIiwiJHRoaXNNb2RhbFRyaWdnZXIiLCJ0aGlzTW9kYWxHZW5lcmF0ZSIsImdlbmVyYXRlIiwidGhpc01vZGFsVGl0bGUiLCJ0aGlzTW9kYWxCb2R5IiwidGhpc01vZGFsSWQiLCJpZCIsInRoaXNNb2RhbE1vZGlmaWVycyIsIm1vZGlmaWVycyIsInRoaXNNb2RhbFBhdGgiLCJwYXRoIiwidGhpc01vZGFsQ2FjaGUiLCJsb2FkIiwiaW5pdGlhbGl6ZUNsb3NlVHJpZ2dlcnMiLCJkb21QcmVwYXJlZCIsImZvdW5kTW9kYWwiLCJtb2RhbElkIiwidHJpZ2dlcnMiLCIkdGhpc01vZGFsIiwiJHRoaXNNb2RhbFRpdGxlIiwiJHRoaXNNb2RhbEJvZHkiLCJwdXNoIiwibW9kYWxQYXRoIiwiY2FsbGJhY2siLCIkbG9hZEJpbiIsInJlc3BvbnNlIiwic3RhdHVzIiwieGhyIiwiJGltYWdlcyIsInRvdGFsSW1hZ2VzIiwiaW1hZ2VDb3VudGVyIiwib3BlbkZhbGxiYWNrTGluayIsIiRtb2RhbCIsIm9mZlNldFkiLCJtb2RhbEZpdHNJbnRvVmlld3BvcnQiLCJtYXJnaW5Ub3AiLCJwcm90b2NvbCIsImhvc3QiLCJQYWdlUmV3aW5kIiwiJHBhZ2VSZXdpbmQiLCJ0aHJlc2hvbGQiLCJlbmFibGVQYWdlUmV3aW5kIiwicnVuIiwic2Nyb2xsIiwiUGlja0J0biIsIiRwaWNrQnRuIiwiJHRoaXNQaWNrQnRuIiwicHJlcGVuZCIsImFjdGl2YXRlIiwiJHJhZGlvSW5wdXQiLCJncm91cE5hbWUiLCJQaWVDaGFydCIsIiRjb2xvckRvdCIsImZpeGVkUGFsZXR0ZSIsIiRwaWVDaGFydCIsIiR0aGlzUGllQ2hhcnQiLCIkdGhpc1BpZUNoYXJ0UmVjb3JkcyIsIiR0aGlzUGllQ2hhcnRTdmciLCJjcmVhdGVFbGVtZW50TlMiLCJzaXplIiwicGFsZXR0ZSIsInJvdGF0aW9uIiwicmVjb3JkcyIsInNldEF0dHJpYnV0ZSIsIiR0aGlzUmVjb3JkIiwidGhpc1ZhbHVlIiwiYWRkQ2hhcnREYXRhIiwiaGlnaGxpZ2h0UmVjb3JkIiwicmVzZXRIaWdobGlnaHRSZWNvcmQiLCJibGlua1JlY29yZCIsInNldEZpeGVkU2xpY2VDb2xvcnMiLCJzZXRSYW5kb21TbGljZUNvbG9ycyIsInNldFNsaWNlU2hhZGVzIiwic2V0VW5pcXVlU2xpY2VDb2xvcnMiLCIkdGhpc1BhdGhzIiwiJHRoaXNDaXJjbGVzIiwiJHRoaXNEb3RzIiwidG90YWxTbGljZXMiLCJiYXNlQ29sb3IiLCJKU09OIiwic3RhcnRSYWRpdXMiLCJzdGFydFNhdHVyYXRpb24iLCJzdGFydEx1bWluYW5jZSIsInNwbGl0UmFkaXVzIiwicmFkaXVzIiwicmFuZG9tQ29sb3IiLCJyYW5kb20iLCJzcGxpdEx1bWluYW5jZSIsImx1bWluYW5jZSIsIiR0aGlzUGllU2xpY2UiLCJtaW4iLCJtYXgiLCJ4IiwiY29zIiwiUEkiLCJ5Iiwic2luIiwibG9uZ0FyYyIsImQiLCJ0aGlzSW5kZXgiLCIkc2xpY2VzIiwic2libGluZ3MiLCJmYWRlVG8iLCIkdGhpc1JlY29yZHMiLCJQb3BPdmVyIiwiJHBvcE92ZXJUcmlnZ2VyIiwiJHRoaXNQb3BPdmVyVHJpZ2dlciIsIiR0aGlzUG9wT3ZlciIsInZhbGlkRXZlbnRzIiwicHJldmVudERlZmF1bHRDbGljayIsImV2ZW50U2hvdyIsImV2ZW50SGlkZSIsImhpZGVBbGwiLCJyZW1vdmVUb2dnbGVDbGFzcyIsInRvZ2dsZUNsYXNzIiwic2V0UG9zaXRpb24iLCJjc3NDbGFzc05hbWUiLCJwb3MiLCJyZWYiLCJSYW5nZUlucHV0Iiwia25vYk9mZnNldCIsInJhbmdlSW5wdXRLbm9iIiwicmFuZ2VJbnB1dExhYmVsIiwicmFuZ2VJbnB1dFRyYWNrIiwiJHJhbmdlSW5wdXQiLCIkdGhpc1JhbmdlSW5wdXQiLCIkdGhpc01pbktub2IiLCIkdGhpc01heEtub2IiLCIkc2luZ2xlTGFiZWwiLCIkdGhpc1RyYWNrIiwiJHRoaXNLbm9iIiwic3RvcmVDdXJzb3JQb3MiLCJtb3ZlS25vYiIsImFic01pbiIsImFic01heCIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJvZmZzZXRYIiwibWluUG9zWCIsIm1heFBvc1giLCJjdXJzb3JQb3NYIiwic2V0IiwidGhpc1Byb3BzIiwidGhpc0Fic01pbiIsInRoaXNBYnNNYXgiLCJhZGp1c3RMYWJlbHMiLCIkdGhpc01pbkxhYmVsIiwiJHRoaXNNYXhMYWJlbCIsIiR0aGlzU2luZ2xlTGFiZWwiLCJtaW5Lbm9iUmlnaHRFZGdlIiwibWF4S25vYkxlZnRFZGdlIiwibWluTGFiZWxXaWR0aCIsIm1heExhYmVsV2lkdGgiLCJzaW5nbGVMYWJlbFdpZHRoIiwiJGtub2IiLCJlUG9zWCIsIm5ld0N1cnNvclBvcyIsIiR0aGlzTWluSW5wdXQiLCIkdGhpc01heElucHV0IiwiaXNNaW5Lbm9iIiwiaXNNYXhLbm9iIiwicG9zWCIsInRoaXNLbm9iVmFsdWUiLCJpbnB1dFZhbHVlIiwiY3Vyc29yT2Zmc2V0IiwiUmF0aW5nSW5wdXQiLCIkcmF0aW5nU2VsZWN0IiwiJHJhdGluZ0lucHV0IiwiJHRoaXNSYXRpbmdJbnB1dCIsIiR0aGlzUmF0aW5nU2VsZWN0IiwiJHRoaXNSYXRpbmdTdGFycyIsInNldFNjb3JlIiwic3VibWl0U2NvcmUiLCJsb2NrIiwidW5sb2NrIiwic2NvcmUiLCJnZXRTY29yZUZyb21Nb2RpZmllciIsIlNjcm9sbEtleXMiLCJjdXJyZW50SG9vayIsInRvdGFsSG9va3MiLCJzY3JvbGxTcGVlZCIsIiRob29rcyIsIiRzY3JvbGxCdXR0b25zIiwiZW5hYmxlU2Nyb2xsS2V5cyIsImhvb2tzIiwiZGV0ZWN0Q3VycmVudEhvb2siLCJzY3JvbGxUb0hvb2siLCJkaXJlY3Rpb24iLCJzZXRDdXJyZW50SG9vayIsImhpZ2hsaWdodEJ0biIsImJ0bkluZGV4IiwiJGJ0biIsIlNjcm9sbFByb2dyZXNzIiwiJHNjcm9sbFByb2dyZXNzQmFyIiwiZG9jdW1lbnRIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJ0b3RhbFNjcm9sbCIsInNjcm9sbFBvc2l0aW9uIiwic2Nyb2xsUHJvZ3Jlc3MiLCJ2aXNpYmxlU2Nyb2xsUHJvZ3Jlc3MiLCJlbmFibGVTY3JvbGxQcm9ncmVzcyIsInZpc2libGUiLCJTbGlkZXIiLCJidG5MYWJlbE5leHQiLCJidG5MYWJlbFByZXYiLCJzbGlkZUNvbnRyb2xzIiwicGFnZUJ0bnMtLXRsIiwicGFnZUJ0bnMtLXRyIiwicGFnZUJ0bnMtLWJyIiwicGFnZUJ0bnMtLWJsIiwiZmxpcEJ0bnMiLCJmbGlwQnRucy0taW5zZXQiLCJwYWdlRG90cyIsInBhZ2VEb3RzLS1kYXJrIiwicGFnZURvdHMtLXN1YnRsZSIsIiRzbGlkZXIiLCJzbGlkZXJJbmRleCIsIiR0aGlzU2xpZGVyIiwiJHRoaXNTbGlkZXMiLCJzbGlkZUluZGV4IiwidG90YWxTbGlkZXMiLCJ0cmFuc2l0aW9uIiwiYWRqdXN0SGVpZ2h0IiwiY29udHJvbCIsInRoaXNDb250cm9scyIsInN0b3BBdXRvcGxheSIsInNob3dTbGlkZSIsImluc2VydEJlZm9yZSIsInBhZ2luYXRpb25MaW5rcyIsImxpbmtJbmRleCIsImNsaWNrYWJsZSIsImF1dG9wbGF5Iiwic3RhcnRBdXRvcGxheSIsImFwcGx5VHJhbnNpdGlvbiIsInVwZGF0ZVBhZ2luYXRpb24iLCJuZXh0U2xpZGVJbmRleCIsImN1cnJlbnRTbGlkZUluZGV4IiwibGVmdE9mZnNldCIsInRoaXNTbGlkZUluZGV4IiwiJHRoaXNTbGlkZXNXcmFwcGVyIiwic2xpZGVIZWlnaHQiLCJ0aGlzU2xpZGVIZWlnaHQiLCJTdGVwcGVyIiwiYnRuTGFiZWxNb3JlIiwiYnRuTGFiZWxMZXNzIiwiJHN0ZXBwZXJCdG5zIiwiJHN0ZXBwZXIiLCIkdGhpc1N0ZXBwZXIiLCJpbmNyZWFzZUl0ZW1Db3VudCIsImRlY3JlYXNlSXRlbUNvdW50IiwidmFsaWRhdGVJbnB1dCIsImN1cnJlbnRWYWx1ZSIsInJlc2V0SXRlbUNvdW50Iiwic2V0SXRlbUNvdW50IiwicmVtb3ZlRXJyb3JGb3JtYXR0aW5nIiwiY2xlYXJJdGVtQ291bnQiLCJhZGRFcnJvckZvcm1hdHRpbmciLCIkdHh0RmllbGQiLCJjb3VudFVwIiwiY291bnREb3duIiwic2V0VG8iLCJTd2l0Y2giLCJsYWJlbE9uIiwibGFiZWxPZmYiLCIkbGFiZWxPbiIsIiRsYWJlbE9mZiIsIiRzd2l0Y2giLCIkdGhpc1N3aXRjaCIsInRoaXNMYWJlbE9uVGV4dCIsInRoaXNMYWJlbE9mZlRleHQiLCJzaG93TGFiZWxzIiwic2V0T24iLCJzZXRPZmYiLCJzZXRUb2dnbGUiLCJwcmV2ZW50RXZlbnRzIiwiVGFibGUiLCIkdGFibGUiLCIkdGhpc1RhYmxlIiwic2VsZWN0YWJsZSIsImJlZm9yZSIsIiR0aGlzVHIiLCJzZWxlY3RSb3ciLCJyZW1vdmVhYmxlIiwicmVtb3ZlUm93IiwiJHRoaXNBbGxUciIsInVuc2VsZWN0Um93IiwidG90YWxUZHMiLCJ0YWJsZUlzRW1wdHkiLCJzZWxlY3QiLCJ1bnNlbGVjdCIsIiR0YWJzTWVudSIsIiR0aGlzVGFic01lbnUiLCJ1cmxUYWJJZCIsImhhc2giLCJmaXJzdFRhYklkIiwiaGFzaE1hdGNoZXNUYWIiLCJoYXNBY3RpdmVUYWIiLCJoYXMiLCJzdGFydFRhYklkIiwidGhpc1RhcmdldFRhYklkIiwiJHRoaXNUYWJzTWVudUl0ZW0iLCIkdGhpc1RhYnNNZW51SXRlbXMiLCIkdGhpc1RhcmdldFRhYiIsIiR0aGlzTWVudUl0ZW0iLCJ0YWJJZCIsIlRvZ2dsZUdyb3VwIiwidG9nZ2xlVGFyZ2V0R3JvdXBJdGVyYXRpb24iLCJyZXNldFRvZ2dsZURlbGF5VGltZSIsIiR0b2dnbGVHcm91cCIsIiR0aGlzVHJpZ2dlciIsImdyb3VwIiwiYWN0aXZlQ2xhc3NOYW1lIiwiJHRoaXNGYWxsQmFja0VsZW0iLCJUb29sdGlwIiwiZGVmYXVsdEZhZGVEdXJhdGlvbiIsImRlZmF1bHRTaG93RGVsYXkiLCJkZWZhdWx0SGlkZURlbGF5IiwiJHRvb2x0aXBUcmlnZ2VyIiwiJHRoaXNUb29sdGlwVHJpZ2dlciIsInN0YXRpY1Bvc2l0aW9uIiwiaGFzU3RhdGljUG9zaXRpb24iLCIkdGhpc1Rvb2x0aXAiLCJwcmVwYXJlVG9vbHRpcCIsInNldFN0YXRpY1Bvc2l0aW9uIiwiaGlkZVdpdGhEZWxheSIsInNob3dXaXRoRGVsYXkiLCJzY29wZSIsImNyZWF0ZUFuZFNob3dUb29sdGlwIiwiY29udGVudCIsImZhZGVEdXJhdGlvbiIsInRvb2x0aXBUeXBlIiwidGFyZ2V0QWxyZWFkeVByZXBhcmVkIiwiY3Vyc29yWSIsImN1cnNvclgiLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0Iiwidmlld1BvcnRXaWR0aCIsInRvb2x0aXBMZWZ0IiwidG9vbHRpcFRvcCIsInNob3dEZWxheUR1cmF0aW9uIiwic2hvd0RlbGF5IiwiaGlkZURlbGF5RHVyYXRpb24iLCJoaWRlRGVsYXkiLCJjcmVhdGUiXSwibWFwcGluZ3MiOiJBQUVBLElBQUlBO0lBS0FDO0lBQ0FDO0lBQ0FDO0lBQ0FDO0lBQ0FDO0lBSUFDLGdCQUFpQixTQUFTQyxPQUFPQztRQWE3QixLQUFLRCxVQUFVQyxjQUFjLE9BQU87UUFJcEMsSUFBSUQsTUFBTUUsUUFBUUQsaUJBQWlCLEdBQUc7WUFDbEMsT0FBTztlQUNKO1lBQ0gsT0FBTzs7O0lBS2ZFLFNBQVUsU0FBU0MsS0FBS0M7UUFVcEIsSUFBSUQsTUFBTUUsS0FBS0MsSUFBSUg7UUFDbkIsSUFBSUMsU0FBU0EsVUFBVTtRQUN2QixJQUFJRyxJQUFJO1FBQ1IsSUFBSUMsZUFBZTtRQUVuQixPQUFPRCxJQUFJSCxRQUFRO1lBQ2ZHO1lBQ0FDLGdCQUFnQjs7UUFHcEIsUUFBUUEsZUFBZUwsS0FBS00sT0FBT0wsU0FBTzs7SUFJOUNNLGFBQWMsU0FBU2I7UUFTbkIsV0FBV2MsT0FBT25CLElBQUlLLE9BQU9BLFlBQVksVUFBVTtZQUMvQyxPQUFPO2VBQ0o7WUFDSCxPQUFPOzs7SUFLZmUsZ0JBQWlCLFNBQVNoQjtRQVN0QixXQUFXZSxPQUFPbkIsSUFBSUksVUFBVUEsZUFBZSxVQUFVO1lBQ3JELE9BQU87ZUFDSjtZQUNILE9BQU87OztJQUtmaUIsVUFBVyxTQUFTQyxXQUFXQyxXQUFXQztRQVl0Q0MsS0FBS0MsV0FBV0o7UUFJaEJILE9BQU9HLGFBQWFILE9BQU9RLFdBQVc7WUFDbEM7V0FDREo7O0lBSVBHLFlBQWEsU0FBU0o7UUFT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