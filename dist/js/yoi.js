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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy95b2kuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9kaXNtaXNzLmpzIiwic3JjL2pzL2JlaGF2aW91cnMvbGF6eWxvYWQuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9wYXJhbGxheC5qcyIsInNyYy9qcy9iZWhhdmlvdXJzL3Njcm9sbGZ4LmpzIiwic3JjL2pzL2JlaGF2aW91cnMvc3RpY2t5LmpzIiwic3JjL2pzL2FjdGlvbnMvYmxpbmsuanMiLCJzcmMvanMvYWN0aW9ucy9oaWRlLmpzIiwic3JjL2pzL2FjdGlvbnMvcHVsc2UuanMiLCJzcmMvanMvYWN0aW9ucy9zY3JvbGx0by5qcyIsInNyYy9qcy9hY3Rpb25zL3Nob3cuanMiLCJzcmMvanMvYWN0aW9ucy91cGRhdGUuanMiLCJzcmMvanMvbW9kdWxlcy9icm93c2VyaGlzdG9yeS5qcyIsInNyYy9qcy9tb2R1bGVzL2tleWJvYXJkYWdlbnQuanMiLCJzcmMvanMvbW9kdWxlcy9yZXNpemVhZ2VudC5qcyIsInNyYy9qcy9tb2R1bGVzL3Njcm9sbGFnZW50LmpzIiwic3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbi5qcyIsInNyYy9jb21wb25lbnRzL2NvZGUvY29kZS5qcyIsInNyYy9jb21wb25lbnRzL2NvdW50ZG93bi9jb3VudGRvd24uanMiLCJzcmMvY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXIuanMiLCJzcmMvY29tcG9uZW50cy9kb2NrL2RvY2suanMiLCJzcmMvY29tcG9uZW50cy9maWx0ZXJidG5zL2ZpbHRlcmJ0bnMuanMiLCJzcmMvY29tcG9uZW50cy9mbHlvdXQvZmx5b3V0LmpzIiwic3JjL2NvbXBvbmVudHMvZm9ybS9jdXN0b21mb3JtZWxlbWVudHMuanMiLCJzcmMvY29tcG9uZW50cy9pY29uL2ljb24uanMiLCJzcmMvY29tcG9uZW50cy9pbWdtYWduaWZpZXIvaW1nbWFnbmlmaWVyLmpzIiwic3JjL2NvbXBvbmVudHMvbG9nL2xvZy5qcyIsInNyYy9jb21wb25lbnRzL21heGNoYXJzL21heGNoYXJzLmpzIiwic3JjL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMiLCJzcmMvY29tcG9uZW50cy9wYWdlcmV3aW5kL3BhZ2VyZXdpbmQuanMiLCJzcmMvY29tcG9uZW50cy9waWNrYnRuL3BpY2tidG4uanMiLCJzcmMvY29tcG9uZW50cy9waWVjaGFydC9waWVjaGFydC5qcyIsInNyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5qcyIsInNyYy9jb21wb25lbnRzL3JhbmdlaW5wdXQvcmFuZ2VpbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL3JhdGluZ2lucHV0L3JhdGluZ2lucHV0LmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xsa2V5cy9zY3JvbGxrZXlzLmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xscHJvZ3Jlc3Mvc2Nyb2xscHJvZ3Jlc3MuanMiLCJzcmMvY29tcG9uZW50cy9zbGlkZXIvc2xpZGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3RlcHBlci9zdGVwcGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3dpdGNoL3N3aXRjaC5qcyIsInNyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmpzIiwic3JjL2NvbXBvbmVudHMvdGFicy90YWJzLmpzIiwic3JjL2NvbXBvbmVudHMvdG9nZ2xlZ3JvdXAvdG9nZ2xlZ3JvdXAuanMiLCJzcmMvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuanMiXSwibmFtZXMiOlsiWU9JIiwiY29sbGVjdGlvbiIsImFjdGlvbiIsImJlaGF2aW91ciIsImNvbXBvbmVudCIsIm1vZHVsZSIsInN0cmluZ0NvbnRhaW5zIiwiaW5wdXQiLCJzZWFyY2hTdHJpbmciLCJpbmRleE9mIiwiemVyb1BhZCIsIm51bSIsImRpZ2l0cyIsIk1hdGgiLCJhYnMiLCJpIiwibGVhZGluZ1plcm9zIiwic2xpY2UiLCJmb3VuZE1vZHVsZSIsIndpbmRvdyIsImZvdW5kQ29tcG9uZW50Iiwic2V0RGVsYXkiLCJkZWxheU5hbWUiLCJkZWxheVRpbWUiLCJkZWxheUZ1bmN0aW9uIiwidGhpcyIsImNsZWFyRGVsYXkiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwidW5kZWZpbmVkIiwic2V0SW50ZXJ2YWwiLCJpbnRlcnZhbE5hbWUiLCJpbnRlcnZhbFRpbWUiLCJpbnRlcnZhbEZ1bmN0aW9uIiwiY2xlYXJJbnRlcnZhbCIsImFmSW50ZXJ2YWwiLCJkYXRlTm93IiwiRGF0ZSIsIm5vdyIsInJlcXVlc3RBbmltYXRpb24iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzdGFydCIsInN0b3AiLCJ0aWNrIiwiY2xlYXIiLCJ0b09iamVjdCIsImtleVZhbHVlUGFpciIsInByb3Blck9iamVjdCIsInZhbHVlU3RhcnRNYXJrZXIiLCJrZXlWYWx1ZVBhaXJFbmRNYXJrZXIiLCJyZXBsYWNlIiwic3BsaXQiLCJsZW5ndGgiLCJ0cmltIiwidG9Cb29sZWFuIiwidG9Mb3dlckNhc2UiLCJnZXRBdHRyaWJ1dGUiLCIkZWxlbWVudCIsInlvaUF0dHJpYnV0ZVZhbHVlIiwiJCIsImVhY2giLCJhdHRyaWJ1dGVzIiwiaW5kZXgiLCJhdHRyaWJ1dGUiLCJuYW1lIiwibWF0Y2giLCJ2YWx1ZSIsImhpZGUiLCJpc2pRdWVyeSIsImhhc0NsYXNzIiwiZGF0YSIsInJlbW92ZUNsYXNzIiwic2hvdyIsImhhc093blByb3BlcnR5IiwiYWRkQ2xhc3MiLCJpc051bWJlciIsImlucHV0VmFsIiwicGF0dGVybiIsInRlc3RWYWwiLCJ0b1N0cmluZyIsInRlc3QiLCJub0ZvY3VzIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwidGFnTmFtZSIsInRocm90dGxlIiwidGFyZ2V0RnVuY3Rpb24iLCJkZWxheSIsInNuYXBzaG90IiwidmFsaWRCcmVha3BvaW50Iiwia2V5d29yZCIsInZhbGlkQnJlYWtQb2ludHMiLCJwb3NpdGlvbiIsImluQXJyYXkiLCJyZW1vdmVGeCIsImNsYXNzTmFtZSIsImpvaW4iLCJyZXZlcnNlRngiLCJmeCIsIm9wcG9zaXRlRngiLCJmYWRlLWluIiwiZmFkZS1vdXQiLCJzY2FsZS11cCIsInNjYWxlLWRvd24iLCJzY2FsZS11cC15Iiwic2NhbGUtZG93bi15Iiwic2xpZGUtaW4tdG9wIiwic2xpZGUtb3V0LXRvcCIsInNsaWRlLWluLWJvdHRvbSIsInNsaWRlLW91dC1ib3R0b20iLCJzbGlkZS1pbi1sZWZ0Iiwic2xpZGUtb3V0LWxlZnQiLCJzbGlkZS1pbi1yaWdodCIsInNsaWRlLW91dC1yaWdodCIsImpRdWVyeSIsImVudmlyb25tZW50IiwiZW52TmFtZSIsImRlZmF1bHRFbnZpcm9ubWVudCIsImN1cnJlbnRFbnZpcm9ubWVudCIsImF0dHIiLCJsb2NhbGUiLCJsYW5ndWFnZSIsImRlZmF1bHRMYW5ndWFnZSIsImN1cnJlbnRMYW5ndWFnZSIsImN1cnJlbnRCcmVha1BvaW50IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImJvZHkiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiYmxpbmsiLCJ0aW1lcyIsImFuaW1hdGUiLCJvcGFjaXR5IiwicHVsc2UiLCJzdGFydERvbU9ic2VydmVyIiwiJGRvY3VtZW50Iiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwiV2ViS2l0TXV0YXRpb25PYnNlcnZlciIsInRhcmdldCIsIm11dGF0aW9ucyIsImZvckVhY2giLCJtdXRhdGlvbiIsImFkZGVkTm9kZXMiLCJ0cmlnZ2VyIiwicmVtb3ZlZE5vZGVzIiwib2JzZXJ2ZSIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJjaGFyYWN0ZXJEYXRhIiwic3RvcERvbU9ic2VydmVyIiwiZGlzY29ubmVjdCIsInVwZGF0ZU9wdGlvbnMiLCJvcHRpb25zIiwia2V5IiwidXBkYXRlUHJvcHMiLCJwcm9wcyIsInVwZGF0ZVN0YXRlIiwic3RhdGUiLCJjcmVhdGVDb2xsZWN0aW9uIiwiaWRlbnRpZmllciIsIiR0aGlzIiwiYWRkIiwiZmlsdGVyQ29sbGVjdGlvbiIsImNvbGxlY3Rpb25JZGVudGlmaWVyIiwiZmlsdGVyUHJvcHMiLCIkY29sbGVjdGlvbiIsImZpbHRlciIsImRlc3Ryb3lDb2xsZWN0aW9uIiwiYmluZEFjdGlvbiIsInlvaUFjdGlvbiIsInBhcmFtcyIsIk9iamVjdCIsImtleXMiLCJob3N0T2JqZWN0IiwicHVibGljRnVuY3Rpb24iLCJldmVudCIsIm9uIiwiJHRhcmdldCIsIiR0cmlnZ2VyIiwicGFyZW50IiwibWFwIiwiZSIsInByZXZlbnREZWZhdWx0IiwibWFwQWN0aW9ucyIsImlzIiwic2V0UmVhZHkiLCJpbml0aWFsaXplZCIsImlzUmVhZHkiLCJpbml0aWFsaXplIiwiaW5pdCIsIkNvZGUiLCJEaXNtaXNzIiwibG9jYWxpemF0aW9uIiwiZW4iLCJidG5MYWJlbCIsImRlIiwiJGJ0bkRpc21pc3MiLCIkZGlzbWlzc2FibGVFbGVtZW50IiwiaXNEaXNtaXNzYWJsZSIsIiR0aGlzRGlzbWlzc2FibGVFbGVtZW50IiwicG9zaXRpb25TdGF0aWMiLCJjc3MiLCJjbG9uZSIsImRpc21pc3MiLCJhcHBlbmRUbyIsIiR0YXJnZXRFbGVtZW50IiwiZmFkZU91dCIsIkxhenlsb2FkIiwiJGxhenlsb2FkIiwiaXNMYXp5bG9hZGluZyIsIm1ha2VMYXp5bG9hZCIsIiRub3NjcmlwdEVsZW1lbnQiLCIkcGxhY2VIb2xkZXIiLCJkZWZhdWx0SW1hZ2UiLCJzcmMiLCJleHRyYWN0SW1nU3JjRnJvbVN0cmluZyIsImh0bWwiLCJ3aWR0aCIsImhlaWdodCIsImFsdCIsInRpdGxlIiwibG9uZ2Rlc2MiLCJjc3NDbGFzc2VzIiwiaW5zZXJ0QWZ0ZXIiLCJuZXh0IiwiU2Nyb2xsQWdlbnQiLCJvbmUiLCJpbWFnZVVybCIsImJyZWFrUG9pbnRTbWFsbCIsImJyZWFrUG9pbnRNZWRpdW0iLCJicmVha1BvaW50TGFyZ2UiLCJicmVha1BvaW50WGxhcmdlIiwic3JjU21hbGwiLCJzcmNNZWRpdW0iLCJzcmNMYXJnZSIsInNyY1hsYXJnZSIsIiRuZXdJbWFnZSIsImNvbXBsZXRlIiwib3V0cHV0IiwiUGFyYWxsYXgiLCIkd2luZG93IiwiY3VycmVudFNjcm9sbFRvcCIsInNjcm9sbFRvcCIsInZpZXdwb3J0SGVpZ2h0IiwiZGVmYXVsdEZhY3RvciIsIm9ic2VydmVySXNSdW5uaW5nIiwiJHBhcmFsbGF4RWxlbWVudCIsImlzUGFyYWxsYXgiLCJzdGFydFNjcm9sbEFnZW50Iiwic3RhcnRQYXJhbGxheE9ic2VydmVyIiwidXBkYXRlUGFyYWxsYXhFbnYiLCJ0cmFuc2Zvcm1QYXJhbGxheCIsInN0YXJ0c0luVmlld3BvcnQiLCJpbml0aWFsUG9zWSIsInJlc2V0UHJvcHMiLCJyZXNldFRyYW5zZm9ybXMiLCJyZXNldEFsbCIsInNjcm9sbE92ZXJzaG9vdCIsImFjdGl2ZUJyZWFrcG9pbnQiLCJmYWN0b3IiLCJub3QiLCJhbGxvd2VkT25DdXJyZW50QnJlYWtwb2ludCIsInNjcm9sbFRvcEluVmlld3BvcnQiLCJwYXJhbGxheE9mZnNldCIsInBhcnNlSW50IiwiZGVzdHJveSIsIm9mZiIsIlNjcm9sbEZ4IiwiJHRoaXNUYXJnZXRFbGVtZW50IiwiaGFzU2Nyb2xsRngiLCJyZXNldEZ4Q2xhc3NOYW1lcyIsInByZXBhcmUiLCJsaXN0ZW4iLCJzdGFydEJyZWFrcG9pbnRBZ2VudCIsImluRngiLCJpbiIsImJvdHRvbUZ4IiwiYm90dG9tIiwiY2VudGVyRngiLCJjZW50ZXIiLCJ0b3BGeCIsInRvcCIsInNwZWVkIiwicmVwZWF0IiwiYXBwbHlGeCIsImFsbG93ZWQiLCJyZXNldCIsIlN0aWNreSIsIiRib2R5IiwiJHN0aWNreUVsZW1lbnQiLCIkdGhpc1N0aWNreUVsZW1lbnQiLCJpc1N0aWNreSIsInRyYW5zZm9ybSIsInN0YXJ0UG9zaXRpb25PYnNlcnZlciIsInN0YXJ0U3RpY2tPYnNlcnZlciIsIiRzdGlja3lQbGFjZWhvbGRlciIsIiRzdGlja3lXcmFwcGVyIiwic3RpY2t5RWxlbWVudENzc1BvcyIsInN0aWNreUVsZW1lbnRDc3NMZWZ0Iiwic3RpY2t5RWxlbWVudENzc1RvcCIsInN0aWNreUVsZW1lbnRDU1NNYXJnaW4iLCJsZWZ0Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsIm1hcmdpbiIsIm91dGVyV2lkdGgiLCJvdXRlckhlaWdodCIsImRpc3BsYXkiLCJ3cmFwIiwicmVtb3ZlIiwicmVtb3ZlQXR0ciIsInVud3JhcCIsIiRyZWZlcmVuY2VFbGVtZW50IiwicmVmZXJlbmNlIiwiZmlyc3QiLCJzdGlja3lFbGVtZW50SGVpZ2h0Iiwic3RpY2t5RWxlbWVudFdpZHRoIiwic3RpY2t5RWxlbWVudEluaXRpYWxUb3BQb3MiLCJvZmZzZXQiLCJ0b3BPZmZzZXQiLCJ0b3BEaXN0YW5jZSIsInN0aWNrU3RhcnQiLCJzdGlja1N0b3AiLCJwYXNzZWRWYWxpZGF0aW9uIiwidmFsaWRJbnB1dCIsInZhbGlkSGVpZ2h0IiwiaW5pdGlhbFRvcFBvcyIsInBvc2l0aW9uT2JzZXJ2ZXIiLCJzdGlja09ic2VydmVyIiwiY3NzV2lkdGhWYWx1ZSIsImNzc1Bvc2l0aW9uVmFsdWUiLCJjc3NUb3BWYWx1ZSIsInN0aWNreVBsYWNlaG9sZGVyRGlzcGxheSIsImJhY2tmYWNlLXZpc2liaWxpdHkiLCJ6LWluZGV4IiwiQmxpbmsiLCJIaWRlIiwidG9nZ2xlIiwiU2hvdyIsInNlbGVjdG9ycyIsInRhcmdldFNlbGVjdG9yIiwiUHVsc2UiLCJTY3JvbGxUbyIsInNjcm9sbFJvb3QiLCJzY3JvbGxpbmdFbGVtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiJHNjcm9sbENvbnRleHQiLCIkc2Nyb2xsQ29udGFpbmVyIiwiY2xvc2VzdCIsImhpZ2hsaWdodCIsInNjcm9sbFBvc1kiLCJUYWJzIiwic3dpdGNoVG8iLCJ0YXJnZXRJZCIsIndoZW4iLCJkb25lIiwiVXBkYXRlIiwicmVxdWVzdFR5cGUiLCJ0eXBlIiwicmVxdWVzdFVybCIsInVybCIsImVycm9yVGl0bGUiLCJlcnJvck1zZyIsIiRlcnJvck1zZyIsIiRzcGlubmVyIiwidG9VcHBlckNhc2UiLCJhamF4IiwiY2FjaGUiLCJiZWZvcmVTZW5kIiwiYXBwZW5kIiwiZXJyb3IiLCJzdWNjZXNzIiwiJHJlc3BvbnNlIiwiQnJvd3Nlckhpc3RvcnkiLCJwdXNoSGFzaCIsImhhc2hTdHJpbmciLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInJlcGxhY2VIYXNoIiwicmVwbGFjZVN0YXRlIiwiY2xlYXJIYXNoIiwiS2V5Ym9hcmRBZ2VudCIsIjM4IiwiMzkiLCI0MCIsIjM3IiwiMTMiLCIzMiIsIjI3IiwiOSIsImtleUNvZGUiLCJ3aGljaCIsImFkZFRhYkZvY3VzIiwiJGVsZW1lbnRzIiwiJGFjdGl2ZUVsZW1lbnQiLCJSZXNpemVhZ2VudCIsImxhc3RCcmVha1BvaW50IiwiYWN0aXZlQnJlYWtQb2ludCIsImxhc3RQYWdlSGVpZ2h0IiwiY3VycmVudFBhZ2VIZWlnaHQiLCJyZXBvcnRSZXNpemVDaGFuZ2UiLCJyZXBvcnRCcmVha1BvaW50Q2hhbmdlIiwicmVhZHkiLCJvYnNlcnZlUGFnZUhlaWdodENoYW5nZSIsImxhc3RTY3JvbGxUb3AiLCJ1cGRhdGUiLCJicm9hZGNhc3QiLCJ0aGlzSGVpZ2h0IiwidGhpc0luaXRpYWxQb3NZIiwidHJhbnNmb3JtWSIsInBhcnNlRmxvYXQiLCJ2aWV3cG9ydEluIiwidmlld3BvcnRCb3R0b20iLCJ2aWV3cG9ydENlbnRlciIsInZpZXdwb3J0VG9wIiwidmlld3BvcnRPdXQiLCJpc1Njcm9sbGluZyIsInNsb3dEb3duIiwiQWNjb3JkaW9uIiwia2V5Ym9hcmRFdmVudHNBZGRlZCIsIiRhY2NvcmRpb24iLCIkdGhpc0FjY29yZGlvbiIsIiR0aGlzU2VjdGlvbnMiLCJmaW5kIiwiZXZlbnRUeXBlIiwiJHRoaXNTZWN0aW9uIiwiJHRoaXNIZWFkZXIiLCIkdGhpc0JvZHkiLCJzbGlkZVVwIiwidG9nZ2xlU2VjdGlvbiIsImFkZEtleWJvYXJkRXZlbnRzIiwiJHNlY3Rpb24iLCJsaW5rZWQiLCJjbG9zZUFsbFNlY3Rpb25zIiwib3BlblNlY3Rpb24iLCJjbG9zZVNlY3Rpb24iLCJzbGlkZURvd24iLCJwcm9taXNlIiwidGhlbiIsIiR0YXJnZXRzIiwib3BlbkFsbFNlY3Rpb25zIiwiY2xvc2UiLCJvcGVuIiwiY2xvc2VBbGwiLCJvcGVuQWxsIiwiJGNvZGVXcmFwcGVyIiwidGFiUGFnZUluZGV4IiwiJHRoaXNDb2RlV3JhcHBlciIsIiR0aGlzQ29kZSIsImV4YW1wbGVUYWciLCJleGFtcGxlVGFnVGFiYmVkIiwidGhpc0V4YW1wbGUiLCJ0ZXh0IiwidGhpc0V4YW1wbGVUYWJiZWQiLCJtYXJrdXAiLCJmaXJzdEluZGV4Iiwic2Vjb25kSW5kZXgiLCJhZGRDb3B5QnRuIiwicmVwbGFjZVdpdGgiLCJ0cnVuY2F0ZSIsImNvcHlUb0NsaXBib2FyZFN1cHBvcnRlZCIsInF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCIsIiRtYXJrdXAiLCIkY29weUJ0biIsIiRjb2RlU291cmNlIiwiY29kZUhhc1JlbmRlcmVkRXhhbXBsZSIsIiRjb2RlIiwiY29weVRvQ2xpcEJvYXJkIiwiJHNvdXJjZSIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsInJhbmdlIiwiY3JlYXRlUmFuZ2UiLCJzZWxlY3ROb2RlQ29udGVudHMiLCJhZGRSYW5nZSIsImV4ZWNDb21tYW5kIiwicmVtb3ZlQWxsUmFuZ2VzIiwiJHRoaXNDb2RlU291cmNlIiwiZXEiLCIkZXhwYW5kQnRuIiwiY29kZUhlaWdodCIsImxpbmVIZWlnaHQiLCJtYXhDb2RlSGVpZ2h0IiwiQ291bnRkb3duIiwiZGF5cyIsImhvdXJzIiwibWludXRlcyIsInNlY29uZHMiLCIkY291bnRkb3duQ2hhcmFjdGVyIiwiJGNvdW50ZG93bkNoYXJhY3RlckxhYmVsIiwiJGNvdW50ZG93bkNsb2NrIiwiJGNvdW50ZG93biIsIiR0aGlzQ291bnRkb3duIiwiZGVmYXVsdFllYXIiLCJnZXRGdWxsWWVhciIsImRlZmF1bHRNb250aCIsImRlZmF1bHREYXkiLCJkZWZhdWx0SG91ciIsImRlZmF1bHRNaW51dGUiLCJkZWZhdWx0U2Vjb25kIiwieWVhciIsIm1vbnRoIiwiZGF5IiwiaG91ciIsIm1pbnV0ZSIsInNlY29uZCIsImVuZFRpbWUiLCJnZXREYXRlU3RyaW5nIiwicmVuZGVyIiwidGltZVJlbWFpbmluZyIsImdldFRpbWVSZW1haW5pbmciLCJsY2RDaGFyYWN0ZXJzIiwiZ2V0TGNkQ2hhcmFjdGVyc0NTU0NsYXNzTmFtZXMiLCIkaGlkZGVuTGFiZWwiLCIkdGhpc0NvdW50ZG93bkNsb2NrIiwidW5pdCIsIiRjb3VudGRvd25DaGFycyIsIiRjb3VudGRvd25MYWJlbCIsImdldENoYXJhY3RlckxhYmVsIiwidG90YWwiLCJzZWxlY3RvciIsImxhYmVsVHh0IiwibW9udGhzIiwiZW5kVGltZUlzb1N0cmluZyIsInBhcnNlIiwiZmxvb3IiLCJjaGFyQXQiLCIkbGFiZWwiLCJEYXRlUGlja2VyIiwid2Vla0RheXMiLCJtb250aE5hbWVzIiwiJGRhdGVQaWNrZXIiLCIkd2Vla0RheXNIZWFkZXIiLCIkZGF0ZXBpY2tlciIsImdldEN1cnJlbnREYXRlIiwiJHRoaXNEYXRlSW5wdXQiLCJpbnB1dFllYXIiLCJpbnB1dE1vbnRoIiwiaW5wdXREYXkiLCJ1cGRhdGVEYXRlSW5wdXQiLCIkdGhpc0RhdGVQaWNrZXIiLCJyZW5kZXJEYXRlUGlja2VyIiwiJHRoaXNEYXRlSW5wdXRXcmFwcGVyIiwiYWZ0ZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJ0aGlzRGF0ZUlucHV0UHJvcHMiLCJyZW5kZXJNb250aFRhYmxlIiwic2VsZWN0ZWRZZWFyIiwic2VsZWN0ZWRNb250aCIsImhpZGVBbGxEYXRlUGlja2VycyIsInBsYWNlRGF0ZVBpY2tlciIsInVwZGF0ZURhdGVQaWNrZXIiLCJzZWxlY3RlZERheSIsImZvcm1hdHRlZFNlbGVjdGVkRGF0ZSIsInVwZGF0ZU1vbnRoVGFibGUiLCIkdGhpc01vbnRoVGFibGUiLCJmaXJzdERheUluc3RhbmNlIiwiZmlyc3REYXkiLCJnZXREYXkiLCJ0b3RhbERheXMiLCJnZXRUb3RhbERheXMiLCJmb3JtYXR0ZWREYXRlIiwidmFsIiwiJG1vbnRoVGFibGUiLCIkbW9udGhUYWJsZUJvZHkiLCJ0aGlzTW9udGhUYWJsZVByb3BzIiwidGhpc0RhdGVQaWNrZXJQcm9wcyIsImluZGV4Q2VsbCIsImluZGV4RGF5IiwiY2VpbCIsIiRyb3ciLCJqIiwiJGNlbGwiLCJwaWNrRGF0ZSIsIiR0aGlzTW9udGhCdXR0b24iLCIkdGhpc0RhdGVwaWNrZXIiLCJ0aGlzQWN0aW9uIiwicHJldiIsImZvY3VzIiwiJHRoaXNDZWxsIiwiY3VycmVudERhdGUiLCJ3ZWVrRGF5IiwiZ2V0RGF0ZSIsImdldE1vbnRoIiwiYWRqdXN0WWVhciIsImdldFllYXIiLCJkYXlzSW5Nb250aHMiLCIkZGF0ZUlucHV0IiwiZGF0ZUlucHV0T2Zmc2V0WSIsImRhdGVJbnB1dEhlaWdodCIsImRhdGVQaWNrZXJIZWlnaHQiLCJ2aWV3UG9ydEhlaWdodCIsInBsYWNlIiwiRG9jayIsIiRkb2NrIiwiJHRoaXNEb2NrIiwiYXV0b2hpZGUiLCJGaWx0ZXJCdG5zIiwiJGZpbHRlckJ0bnMiLCIkdGhpc0ZpbHRlckJ0bnMiLCIkdGhpc0J0biIsIkZseW91dCIsIiRmbHlvdXQiLCIkdGhpc0ZseW91dCIsImRldGFjaCIsIiRmbHlvdXRIYW5kbGUiLCJDdXN0b21Gb3JtRWxlbWVudHMiLCIkY2hlY2tCb3hXcmFwcGVyIiwiJHRoaXNJbnB1dCIsIiRyYWRpb0J0bldyYXBwZXIiLCIkc2VsZWN0V3JhcHBlciIsIiRzZWxlY3RJY29uIiwiJGNoZWNrRWxlbW5zIiwiJGNoZWNrQm94ZXMiLCIkcmFkaW9CdG5zIiwiJHNlbGVjdHMiLCIkdGhpc0NoZWNrYm94IiwiaXNXcmFwcGVkSW5MYWJlbCIsInBhcmVudHMiLCJibHVyIiwiY2hhbmdlIiwicHJvcCIsIiR0aGlzUmFkaW9CdG4iLCIkdGhpc1NlbGVjdCIsIiR0aGlzU2VsZWN0V3JhcHBlciIsIiR0aGlzU2VsZWN0SWNvbiIsInRoaXNXcmFwcGVyIiwiSWNvbiIsIiRpY29uIiwiJHRoaXNJY29uIiwiJGljb25TdmciLCJpY29uQ2xhc3NOYW1lcyIsInNvdXJjZSIsImRhdGFUeXBlIiwiSW1nTWFnbmlmaWVyIiwiJGN1cnNvciIsIiR2aWV3ZXIiLCJkZWZhdWx0U3RhcnRWaWV3ZXJEZWxheVRpbWUiLCIkaW1nTWFnbmlmaWVyIiwiJHRoaXNJbWdNYWduaWZpZXIiLCIkdGhpc0N1cnNvciIsIiR0aGlzVmlld2VyIiwic3RhcnRWaWV3ZXIiLCJzdG9wVmlld2VyIiwibW92ZU1hZ25pZmllciIsInNldFZpZXdlciIsInNldFpvb21JbWFnZSIsInlQb3MiLCJ4UG9zIiwidGhpc1pvb21JbWFnZVBhdGgiLCJ6b29tSW1hZ2UiLCIkdGhpc1ByZXZpZXdJbWFnZSIsInRoaXNab29tSW1hZ2UiLCJJbWFnZSIsIiR0aGlzWm9vbUltYWdlIiwieVJhdGlvIiwieFJhdGlvIiwic2V0Q3Vyc29yIiwidGhpc0N1cnNvcldpdGgiLCJ0aGlzQ3Vyc29ySGVpZ2h0IiwibWFyZ2luTGVmdCIsImZhZGVJbiIsImltZ01hZ25pZmllclByb3BzIiwiY3Vyc29yUHJvcHMiLCJwYWdlWSIsInBhZ2VYIiwibWluWSIsIm1heFkiLCJtaW5YIiwibWF4WCIsIkxvZyIsIndyaXRlIiwiJGxvZyIsImxvZ0lucHV0IiwibWVtb3J5IiwidW5zaGlmdCIsIiRsb2dCb2R5IiwibG9nTWVtb3J5IiwibG9nT3V0cHV0IiwiTWF4Q2hhcnMiLCJkZWZhdWx0TWF4TGVuZ3RoIiwiJGlucHV0RWxlbWVudCIsIiR0aGlzSW5wdXRFbGVtZW50IiwiZGlzcGxheUNoYXJzTGVmdCIsInVwZGF0ZUlucHV0RWxlbWVudCIsIm1heExlbmd0aCIsImVycm9yQ2xhc3NOYW1lcyIsImVycm9yQ2xhc3MiLCIkZGlzcGxheUVsZW1lbnQiLCJpbnB1dExlbmd0aCIsImNoYXJzTGVmdCIsIk1vZGFsIiwibW9kYWxBY3RpdmUiLCJsb2FkZWRNb2RhbHMiLCJidG5MYWJlbENsb3NlIiwiJG1vZGFsQ292ZXIiLCIkbW9kYWxDb250YWluZXIiLCIkbW9kYWxDbG9zZUJ0biIsIiRtb2RhbFRlbXBsYXRlIiwiJG1vZGFsVHJpZ2dlciIsInByZXBhcmVEb20iLCIkdGhpc01vZGFsVHJpZ2dlciIsInRoaXNNb2RhbEdlbmVyYXRlIiwiZ2VuZXJhdGUiLCJ0aGlzTW9kYWxUaXRsZSIsInRoaXNNb2RhbEJvZHkiLCJ0aGlzTW9kYWxJZCIsImlkIiwidGhpc01vZGFsTW9kaWZpZXJzIiwibW9kaWZpZXJzIiwidGhpc01vZGFsUGF0aCIsInBhdGgiLCJ0aGlzTW9kYWxDYWNoZSIsImxvYWQiLCJpbml0aWFsaXplQ2xvc2VUcmlnZ2VycyIsImRvbVByZXBhcmVkIiwiZm91bmRNb2RhbCIsIm1vZGFsSWQiLCJ0cmlnZ2VycyIsIiR0aGlzTW9kYWwiLCIkdGhpc01vZGFsVGl0bGUiLCIkdGhpc01vZGFsQm9keSIsInB1c2giLCJtb2RhbFBhdGgiLCJjYWxsYmFjayIsIiRsb2FkQmluIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJ4aHIiLCIkaW1hZ2VzIiwidG90YWxJbWFnZXMiLCJpbWFnZUNvdW50ZXIiLCJvcGVuRmFsbGJhY2tMaW5rIiwiJG1vZGFsIiwib2ZmU2V0WSIsIm1vZGFsRml0c0ludG9WaWV3cG9ydCIsIm1hcmdpblRvcCIsInByb3RvY29sIiwiaG9zdCIsIlBhZ2VSZXdpbmQiLCIkcGFnZVJld2luZCIsInRocmVzaG9sZCIsImVuYWJsZVBhZ2VSZXdpbmQiLCJydW4iLCJzY3JvbGwiLCJQaWNrQnRuIiwiJHBpY2tCdG4iLCIkdGhpc1BpY2tCdG4iLCJwcmVwZW5kIiwiYWN0aXZhdGUiLCIkcmFkaW9JbnB1dCIsImdyb3VwTmFtZSIsIlBpZUNoYXJ0IiwiJGNvbG9yRG90IiwiZml4ZWRQYWxldHRlIiwiJHBpZUNoYXJ0IiwiJHRoaXNQaWVDaGFydCIsIiR0aGlzUGllQ2hhcnRSZWNvcmRzIiwiJHRoaXNQaWVDaGFydFN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsInNpemUiLCJwYWxldHRlIiwicm90YXRpb24iLCJyZWNvcmRzIiwic2V0QXR0cmlidXRlIiwiJHRoaXNSZWNvcmQiLCJ0aGlzVmFsdWUiLCJhZGRDaGFydERhdGEiLCJoaWdobGlnaHRSZWNvcmQiLCJyZXNldEhpZ2hsaWdodFJlY29yZCIsImJsaW5rUmVjb3JkIiwic2V0Rml4ZWRTbGljZUNvbG9ycyIsInNldFJhbmRvbVNsaWNlQ29sb3JzIiwic2V0U2xpY2VTaGFkZXMiLCJzZXRVbmlxdWVTbGljZUNvbG9ycyIsIiR0aGlzUGF0aHMiLCIkdGhpc0NpcmNsZXMiLCIkdGhpc0RvdHMiLCJ0b3RhbFNsaWNlcyIsImJhc2VDb2xvciIsIkpTT04iLCJzdGFydFJhZGl1cyIsInN0YXJ0U2F0dXJhdGlvbiIsInN0YXJ0THVtaW5hbmNlIiwic3BsaXRSYWRpdXMiLCJyYWRpdXMiLCJyYW5kb21Db2xvciIsInJhbmRvbSIsInNwbGl0THVtaW5hbmNlIiwibHVtaW5hbmNlIiwiJHRoaXNQaWVTbGljZSIsIm1pbiIsIm1heCIsIngiLCJjb3MiLCJQSSIsInkiLCJzaW4iLCJsb25nQXJjIiwiZCIsInRoaXNJbmRleCIsIiRzbGljZXMiLCJzaWJsaW5ncyIsImZhZGVUbyIsIiR0aGlzUmVjb3JkcyIsIlBvcE92ZXIiLCIkcG9wT3ZlclRyaWdnZXIiLCIkdGhpc1BvcE92ZXJUcmlnZ2VyIiwiJHRoaXNQb3BPdmVyIiwidmFsaWRFdmVudHMiLCJwcmV2ZW50RGVmYXVsdENsaWNrIiwiZXZlbnRTaG93IiwiZXZlbnRIaWRlIiwiaGlkZUFsbCIsInJlbW92ZVRvZ2dsZUNsYXNzIiwidG9nZ2xlQ2xhc3MiLCJzZXRQb3NpdGlvbiIsImNzc0NsYXNzTmFtZSIsInBvcyIsInJlZiIsIlJhbmdlSW5wdXQiLCJrbm9iT2Zmc2V0IiwicmFuZ2VJbnB1dEtub2IiLCJyYW5nZUlucHV0TGFiZWwiLCJyYW5nZUlucHV0VHJhY2siLCIkcmFuZ2VJbnB1dCIsIiR0aGlzUmFuZ2VJbnB1dCIsIiR0aGlzTWluS25vYiIsIiR0aGlzTWF4S25vYiIsIiRzaW5nbGVMYWJlbCIsIiR0aGlzVHJhY2siLCIkdGhpc0tub2IiLCJzdG9yZUN1cnNvclBvcyIsIm1vdmVLbm9iIiwiYWJzTWluIiwiYWJzTWF4IiwibWluVmFsdWUiLCJtYXhWYWx1ZSIsIm9mZnNldFgiLCJtaW5Qb3NYIiwibWF4UG9zWCIsImN1cnNvclBvc1giLCJzZXQiLCJ0aGlzUHJvcHMiLCJ0aGlzQWJzTWluIiwidGhpc0Fic01heCIsImFkanVzdExhYmVscyIsIiR0aGlzTWluTGFiZWwiLCIkdGhpc01heExhYmVsIiwiJHRoaXNTaW5nbGVMYWJlbCIsIm1pbktub2JSaWdodEVkZ2UiLCJtYXhLbm9iTGVmdEVkZ2UiLCJtaW5MYWJlbFdpZHRoIiwibWF4TGFiZWxXaWR0aCIsInNpbmdsZUxhYmVsV2lkdGgiLCIka25vYiIsImVQb3NYIiwibmV3Q3Vyc29yUG9zIiwiJHRoaXNNaW5JbnB1dCIsIiR0aGlzTWF4SW5wdXQiLCJpc01pbktub2IiLCJpc01heEtub2IiLCJwb3NYIiwidGhpc0tub2JWYWx1ZSIsImlucHV0VmFsdWUiLCJjdXJzb3JPZmZzZXQiLCJSYXRpbmdJbnB1dCIsIiRyYXRpbmdTZWxlY3QiLCIkcmF0aW5nSW5wdXQiLCIkdGhpc1JhdGluZ0lucHV0IiwiJHRoaXNSYXRpbmdTZWxlY3QiLCIkdGhpc1JhdGluZ1N0YXJzIiwic2V0U2NvcmUiLCJzdWJtaXRTY29yZSIsImxvY2siLCJ1bmxvY2siLCJzY29yZSIsImdldFNjb3JlRnJvbU1vZGlmaWVyIiwiU2Nyb2xsS2V5cyIsImN1cnJlbnRIb29rIiwidG90YWxIb29rcyIsInNjcm9sbFNwZWVkIiwiJGhvb2tzIiwiJHNjcm9sbEJ1dHRvbnMiLCJlbmFibGVTY3JvbGxLZXlzIiwiaG9va3MiLCJkZXRlY3RDdXJyZW50SG9vayIsInNjcm9sbFRvSG9vayIsImRpcmVjdGlvbiIsInNldEN1cnJlbnRIb29rIiwiaGlnaGxpZ2h0QnRuIiwiYnRuSW5kZXgiLCIkYnRuIiwiU2Nyb2xsUHJvZ3Jlc3MiLCIkc2Nyb2xsUHJvZ3Jlc3NCYXIiLCJkb2N1bWVudEhlaWdodCIsIndpbmRvd0hlaWdodCIsInRvdGFsU2Nyb2xsIiwic2Nyb2xsUG9zaXRpb24iLCJzY3JvbGxQcm9ncmVzcyIsInZpc2libGVTY3JvbGxQcm9ncmVzcyIsImVuYWJsZVNjcm9sbFByb2dyZXNzIiwidmlzaWJsZSIsIlNsaWRlciIsImJ0bkxhYmVsTmV4dCIsImJ0bkxhYmVsUHJldiIsInNsaWRlQ29udHJvbHMiLCJwYWdlQnRucy0tdGwiLCJwYWdlQnRucy0tdHIiLCJwYWdlQnRucy0tYnIiLCJwYWdlQnRucy0tYmwiLCJmbGlwQnRucyIsImZsaXBCdG5zLS1pbnNldCIsInBhZ2VEb3RzIiwicGFnZURvdHMtLWRhcmsiLCJwYWdlRG90cy0tc3VidGxlIiwiJHNsaWRlciIsInNsaWRlckluZGV4IiwiJHRoaXNTbGlkZXIiLCIkdGhpc1NsaWRlcyIsInNsaWRlSW5kZXgiLCJ0b3RhbFNsaWRlcyIsInRyYW5zaXRpb24iLCJhZGp1c3RIZWlnaHQiLCJjb250cm9sIiwidGhpc0NvbnRyb2xzIiwic3RvcEF1dG9wbGF5Iiwic2hvd1NsaWRlIiwiaW5zZXJ0QmVmb3JlIiwicGFnaW5hdGlvbkxpbmtzIiwibGlua0luZGV4IiwiY2xpY2thYmxlIiwiYXV0b3BsYXkiLCJzdGFydEF1dG9wbGF5IiwiYXBwbHlUcmFuc2l0aW9uIiwidXBkYXRlUGFnaW5hdGlvbiIsIm5leHRTbGlkZUluZGV4IiwiY3VycmVudFNsaWRlSW5kZXgiLCJsZWZ0T2Zmc2V0IiwidGhpc1NsaWRlSW5kZXgiLCIkdGhpc1NsaWRlc1dyYXBwZXIiLCJzbGlkZUhlaWdodCIsInRoaXNTbGlkZUhlaWdodCIsIlN0ZXBwZXIiLCJidG5MYWJlbE1vcmUiLCJidG5MYWJlbExlc3MiLCIkc3RlcHBlckJ0bnMiLCIkc3RlcHBlciIsIiR0aGlzU3RlcHBlciIsImluY3JlYXNlSXRlbUNvdW50IiwiZGVjcmVhc2VJdGVtQ291bnQiLCJ2YWxpZGF0ZUlucHV0IiwiY3VycmVudFZhbHVlIiwicmVzZXRJdGVtQ291bnQiLCJzZXRJdGVtQ291bnQiLCJyZW1vdmVFcnJvckZvcm1hdHRpbmciLCJjbGVhckl0ZW1Db3VudCIsImFkZEVycm9yRm9ybWF0dGluZyIsIiR0eHRGaWVsZCIsImNvdW50VXAiLCJjb3VudERvd24iLCJzZXRUbyIsIlN3aXRjaCIsImxhYmVsT24iLCJsYWJlbE9mZiIsIiRsYWJlbE9uIiwiJGxhYmVsT2ZmIiwiJHN3aXRjaCIsIiR0aGlzU3dpdGNoIiwidGhpc0xhYmVsT25UZXh0IiwidGhpc0xhYmVsT2ZmVGV4dCIsInNob3dMYWJlbHMiLCJzZXRPbiIsInNldE9mZiIsInNldFRvZ2dsZSIsIlRhYmxlIiwiJHRhYmxlIiwiJHRoaXNUYWJsZSIsInNlbGVjdGFibGUiLCJiZWZvcmUiLCIkdGhpc1RyIiwic2VsZWN0Um93IiwicmVtb3ZlYWJsZSIsInJlbW92ZVJvdyIsIiR0aGlzQWxsVHIiLCJ1bnNlbGVjdFJvdyIsInRvdGFsVGRzIiwidGFibGVJc0VtcHR5Iiwic2VsZWN0IiwidW5zZWxlY3QiLCIkdGFic01lbnUiLCIkdGhpc1RhYnNNZW51IiwidXJsVGFiSWQiLCJoYXNoIiwiZmlyc3RUYWJJZCIsImhhc2hNYXRjaGVzVGFiIiwiaGFzQWN0aXZlVGFiIiwiaGFzIiwic3RhcnRUYWJJZCIsInRoaXNUYXJnZXRUYWJJZCIsIiR0aGlzVGFic01lbnVJdGVtIiwiJHRoaXNUYWJzTWVudUl0ZW1zIiwiJHRoaXNUYXJnZXRUYWIiLCIkdGhpc01lbnVJdGVtIiwidGFiSWQiLCJUb2dnbGVHcm91cCIsInRvZ2dsZVRhcmdldEdyb3VwSXRlcmF0aW9uIiwicmVzZXRUb2dnbGVEZWxheVRpbWUiLCIkdG9nZ2xlR3JvdXAiLCIkdGhpc1RyaWdnZXIiLCJncm91cCIsImFjdGl2ZUNsYXNzTmFtZSIsIiR0aGlzRmFsbEJhY2tFbGVtIiwiVG9vbHRpcCIsImRlZmF1bHRGYWRlRHVyYXRpb24iLCJkZWZhdWx0U2hvd0RlbGF5IiwiZGVmYXVsdEhpZGVEZWxheSIsIiR0b29sdGlwVHJpZ2dlciIsIiR0aGlzVG9vbHRpcFRyaWdnZXIiLCJzdGF0aWNQb3NpdGlvbiIsImhhc1N0YXRpY1Bvc2l0aW9uIiwiJHRoaXNUb29sdGlwIiwicHJlcGFyZVRvb2x0aXAiLCJzZXRTdGF0aWNQb3NpdGlvbiIsImhpZGVXaXRoRGVsYXkiLCJzaG93V2l0aERlbGF5Iiwic2NvcGUiLCJjcmVhdGVBbmRTaG93VG9vbHRpcCIsImNvbnRlbnQiLCJmYWRlRHVyYXRpb24iLCJ0b29sdGlwVHlwZSIsInRhcmdldEFscmVhZHlQcmVwYXJlZCIsImN1cnNvclkiLCJjdXJzb3JYIiwidG9vbHRpcFdpZHRoIiwidG9vbHRpcEhlaWdodCIsInZpZXdQb3J0V2lkdGgiLCJ0b29sdGlwTGVmdCIsInRvb2x0aXBUb3AiLCJzaG93RGVsYXlEdXJhdGlvbiIsInNob3dEZWxheSIsImhpZGVEZWxheUR1cmF0aW9uIiwiaGlkZURlbGF5IiwiY3JlYXRlIl0sIm1hcHBpbmdzIjoiQUFFQSxJQUFJQTtJQUtBQztJQUNBQztJQUNBQztJQUNBQztJQUNBQztJQUlBQyxnQkFBaUIsU0FBU0MsT0FBT0M7UUFhN0IsS0FBS0QsVUFBVUMsY0FBYyxPQUFPO1FBSXBDLElBQUlELE1BQU1FLFFBQVFELGlCQUFpQixHQUFHO1lBQ2xDLE9BQU87ZUFDSjtZQUNILE9BQU87OztJQUtmRSxTQUFVLFNBQVNDLEtBQUtDO1FBVXBCLElBQUlELE1BQU1FLEtBQUtDLElBQUlIO1FBQ25CLElBQUlDLFNBQVNBLFVBQVU7UUFDdkIsSUFBSUcsSUFBSTtRQUNSLElBQUlDLGVBQWU7UUFFbkIsT0FBT0QsSUFBSUgsUUFBUTtZQUNmRztZQUNBQyxnQkFBZ0I7O1FBR3BCLFFBQVFBLGVBQWVMLEtBQUtNLE9BQU9MLFNBQU87O0lBSTlDTSxhQUFjLFNBQVNiO1FBU25CLFdBQVdjLE9BQU9uQixJQUFJSyxPQUFPQSxZQUFZLFVBQVU7WUFDL0MsT0FBTztlQUNKO1lBQ0gsT0FBTzs7O0lBS2ZlLGdCQUFpQixTQUFTaEI7UUFTdEIsV0FBV2UsT0FBT25CLElBQUlJLFVBQVVBLGVBQWUsVUFBVTtZQUNyRCxPQUFPO2VBQ0o7WUFDSCxPQUFPOzs7SUFLZmlCLFVBQVcsU0FBU0MsV0FBV0MsV0FBV0M7UUFZdENDLEtBQUtDLFdBQVdKO1FBSWhCSCxPQUFPRyxhQUFhSCxPQUFPUSxXQUFXO1lBQ2xDO1dBQ0RKOztJQUlQRyxZQUFhLFNBQVNKO1FBU2xCLFdBQVdILE9BQU9HLGVBQWUsVUFBVTtZQUN2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QUFLO1lBQ0RpdEIsY0FBY25CLG9CQUFvQjlyQixTQUFTakIsT0FBTytzQixvQkFBb0Izc0IsZUFBZWE7WUFDckZrdEIsYUFBY3BCLG9CQUFvQjlyQixTQUFTckMsTUFBTW11QixvQkFBb0Ixc0IsZ0JBQWdCLElBQUk2c0IsYUFBYTdzQixnQkFBZ0I7WUFDdEg7O1VBQ0osS0FBSztZQUNENnRCLGNBQWNuQixvQkFBb0I5ckIsU0FBU2pCLE9BQU8rc0Isb0JBQW9CM3NCLGVBQWUsSUFBSThzQixhQUFhOXNCLGVBQWU7WUFDckgrdEIsYUFBY3BCLG9CQUFvQjlyQixTQUFTckMsTUFBTW11QixvQkFBb0Ixc0IsZ0JBQWdCWTtZQUNyRjs7VUFDSixLQUFLO1lBQ0RpdEIsY0FBY25CLG9CQUFvQjlyQixTQUFTakIsT0FBT2t0QixhQUFhOXNCLGVBQWVhO1lBQzlFa3RCLGFBQWNwQixvQkFBb0I5ckIsU0FBU3JDLE1BQU1tdUIsb0JBQW9CMXNCLGdCQUFnQixJQUFJNnNCLGFBQWE3c0IsZ0JBQWdCO1lBQ3RIOztRQU1SNnNCLGFBQ0t4NEIsS0FBSyxTQUFRLHNCQUFzQjNCLFVBQ25DNkc7WUFDRzdHLFVBQVk7WUFDWmlOLE1BQVFrdUI7WUFDUnR2QixLQUFPdXZCOzs7SUFLbkIsU0FBU2IsY0FBY1AscUJBQXFCRyxjQUFjNy9CO1FBU3RELElBQUlzSixVQUFvQm8yQixvQkFBb0J0N0IsT0FBT2tGO1FBQ25ELElBQUl5M0Isb0JBQW9CejNCLFFBQVEwM0IsYUFBYXpCO1FBRTdDLElBQUl2L0IsV0FBVyxTQUFTO1lBRXBCRixJQUFJcUIsU0FBUyxvQkFBb0I0L0IsbUJBQW1CO2dCQUNoRGxCLGFBQ0t4VyxPQUFPaVcscUJBQ1Bqa0IsVUFDQUMsS0FBSztvQkFDRnVrQixhQUFhaDNCLFFBQVE7OztlQUk5QixJQUFJN0ksV0FBVyxRQUFRO1lBRTFCRixJQUFJMEIsV0FBVzs7O0lBTXZCLFNBQVN3K0IsY0FBY04scUJBQXFCRyxjQUFjNy9CO1FBUXRELElBQUlzSixVQUFvQm8yQixvQkFBb0J0N0IsT0FBT2tGO1FBQ25ELElBQUkyM0Isb0JBQW9CMzNCLFFBQVE0M0IsYUFBYTFCO1FBRTdDLElBQUl4L0IsV0FBVyxTQUFTO1lBRXBCRixJQUFJcUIsU0FBUyxvQkFBb0I4L0IsbUJBQW1CO2dCQUNoRHg5QixFQUFFLFlBQVlRO2dCQUNkNDdCLGFBQWFoM0IsUUFBUTs7ZUFHdEIsSUFBSTdJLFdBQVcsUUFBUTtZQUUxQkYsSUFBSTBCLFdBQVc7OztJQVN2QjtRQUNJbUssTUFBVUQ7UUFDVnkxQixRQUFVaEI7UUFDVjc3QixNQUFVMjdCO1FBQ1ZoOEIsTUFBVSs3QjtRQUNWbk4sU0FBVUEiLCJmaWxlIjoiZGlzdC9qcy95b2kuanMifQ==