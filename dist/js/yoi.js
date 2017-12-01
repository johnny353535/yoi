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
        } else if ($element instanceof jQuery) {
            YOI.updateOptions($element, options);
            YOI.updateState($element, state);
            YOI.updateProps($element, props);
            YOI.elementCollection[identifier] = YOI.elementCollection[identifier].add($element);
        }
        return YOI.elementCollection[identifier];
    },
    bindAction: function($element, hook) {
        if ($element.data().props.hasOwnProperty(hook)) return false;
        var params = YOI.toObject($element.attr(hook));
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
        $element.data().props[hook] = true;
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
            if ($(this).data().props.isDismissable) return false;
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
            if ($(this).data().props.isLazyloading) return false;
            var $this = $(this);
            var options = $this.data().options;
            var defaultImage = options.src || extractImgSrcFromString($this.html()) || false;
            var width = options.width || false;
            var height = options.height || false;
            var alt = options.alt || false;
            var title = options.title || false;
            var longdesc = options.longdesc || false;
            var cssClasses = options.cssClasses || false;
            if (!defaultImage || !YOI.foundModule("ScrollAgent")) {
                return false;
            }
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
            var newImage = $('<img src="' + imageUrl + '"></img>');
            if (width) newImage.attr("width", width);
            if (height) newImage.attr("height", height);
            if (alt) newImage.attr("alt", alt);
            if (title) newImage.attr("title", title);
            if (longdesc) newImage.attr("longdesc", longdesc);
            if (cssClasses) newImage.addClass(cssClasses);
            newImage.addClass("fx-fade-in-initial").insertAfter($this).promise().then(function() {
                YOI.module.ScrollAgent.init(newImage);
            });
            newImage.on("load", function() {
                var $this = $(this);
                $this.one("yoi-viewport-in", function() {
                    $this.addClass("fx-fade-in");
                });
            });
            if (newImage[0].complete) {
                newImage.trigger("load");
            }
            $this.data().props.isLazyloading = true;
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
                if ($this.data().props.isParallax) return false;
                $activeParallaxElements = $activeParallaxElements.add($this);
                updateParallaxElement($this);
                $this.data().props.isParallax = true;
            });
            resetScroll();
            if (initialized) return;
            $window.on("resize yoi-scroll", function() {
                updateParallaxEnv();
                scrollParallax();
            });
            initialized = true;
        }
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
                if (state === "in" || state === "center") {
                    $this.css("transform", "translate3d(0, " + parallaxOffset + "px, 1px)");
                }
            });
        });
    }
    function updateParallaxElement($parallaxElement) {
        var data = $parallaxElement.data();
        if (!data.props.isParallax) {
            YOI.module.ScrollAgent.init($parallaxElement);
        }
        if (data.state === "in" || data.state === "center") {
            $parallaxElement.data().props.startsInViewport = true;
        }
        if ($parallaxElement.is("img")) {
            $parallaxElement.on("load", function() {
                updateParallaxElement($parallaxElement);
                updateParallaxEnv();
            });
        }
    }
    function resetScroll() {
        $("body").scrollTop(0);
        $window.on("unload", function() {
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
    return {
        init: initialize
    };
}();

YOI.behaviour.ScrollFx = function() {
    function initialize($targetElement, options) {
        var $targetElement = YOI.createCollection("scrollfx", $targetElement, options);
        if ($targetElement) $targetElement.each(function() {
            var $thisTargetElement = $(this);
            if ($thisTargetElement.data().props.hasScrollFx) return false;
            prepare($thisTargetElement);
            listen($thisTargetElement);
            $thisTargetElement.data().props.hasScrollFx = true;
        });
        YOI.module.ScrollAgent.init($targetElement, options);
    }
    function prepare($targetElement) {
        var options = $targetElement.data().options;
        var inFx = options.in || false;
        var centerFx = options.center || false;
        if (inFx) $targetElement.addClass("fx-" + inFx + "-initial");
        if (centerFx) $targetElement.addClass("fx-" + centerFx + "-initial");
        $targetElement.removeClass("fx-" + inFx);
        $targetElement.removeClass("fx-" + centerFx);
    }
    function listen($targetElement) {
        var options = $targetElement.data().options;
        var inFx = options.in || false;
        var centerFx = options.center || false;
        var speed = options.speed || false;
        var repeat = options.repeat || true;
        if (repeat !== "false") {
            $targetElement.on("yoi-viewport-in", function() {
                applyFx($targetElement, inFx, speed);
            });
            $targetElement.on("yoi-viewport-center", function() {
                applyFx($targetElement, centerFx, speed);
            });
            $targetElement.on("yoi-viewport-out", function() {
                prepare($targetElement);
            });
        } else {
            $targetElement.one("yoi-viewport-in", function() {
                applyFx($targetElement, inFx, speed);
            });
            $targetElement.one("yoi-viewport-center", function() {
                applyFx($targetElement, centerFx, speed);
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
            if ($thisStickyElement.css("position") === "fixed" || $stickyElement.css("transform") !== "none") return;
            $window.on("load", function() {
                manipulateDom($thisStickyElement, index);
                updateStickyElementProps($thisStickyElement);
            });
        });
        if ($stickyElement) positionObserver($stickyElement);
        if ($stickyElement) stickObserver($stickyElement);
    }
    function manipulateDom($stickyElement, index) {
        var $stickyPlaceholder = $('<div id="stickyPlaceholder-' + index + '"></div>');
        var $stickyWrapper = $('<div class="stickyWrapper"></div>');
        var stickyElementCssPos = $stickyElement.css("position");
        var stickyElementCssLeft = $stickyElement.css("left");
        var stickyElementCssTop = $stickyElement.css("top");
        if (stickyElementCssPos !== "static") {
            $stickyElement.css({
                position: "static"
            });
            $stickyWrapper.css({
                position: stickyElementCssPos,
                top: stickyElementCssTop,
                left: stickyElementCssLeft
            });
        } else {
            $stickyWrapper.css({
                position: "relative"
            });
        }
        $stickyPlaceholder.css({
            width: $stickyElement.outerWidth(),
            height: $stickyElement.outerHeight(),
            display: "none"
        });
        $($stickyElement).wrap($stickyWrapper);
        $stickyPlaceholder.insertAfter($stickyElement);
    }
    function updateStickyElementProps($stickyElement) {
        var data = $stickyElement.data();
        var options = data.options;
        var props = data.props;
        var $referenceElement = options.reference === "parent" ? $stickyElement.parent().parent() : $(options.reference).first();
        var stickyElementHeight = $stickyElement.outerHeight();
        var stickyElementWidth = $stickyElement.outerWidth();
        var stickyElementInitialTopPos = $stickyElement.offset().top;
        var topOffset = options.start !== undefined ? parseInt(options.start) : 0;
        var topDistance = options.stop !== undefined ? parseInt(options.stop) : 0;
        var stickStart = options.start !== undefined ? stickyElementInitialTopPos - topOffset : stickyElementInitialTopPos;
        var stickStop = options.stop !== undefined ? stickyElementInitialTopPos + topDistance - topOffset : $body.height();
        var passedValidation = validInput($stickyElement);
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
    function positionObserver($stickyElements) {
        $window.on("resize", function() {
            $stickyElements.each(function(index) {
                var $stickyElement = $(this);
                if (validInput($stickyElement)) {
                    updateStickyElementProps($stickyElement);
                }
            });
        });
    }
    function stickObserver($stickyElements) {
        $window.on("yoi-scroll", function() {
            var scrollTop = $window.scrollTop();
            $stickyElements.each(function(index) {
                var $stickyElement = $(this);
                var $stickyPlaceholder = $("#stickyPlaceholder-" + index);
                var props = $stickyElement.data().props;
                var stickyElementInitialTopPos = props.initialTopPos;
                var stickStart = props.stickStart;
                var stickStop = props.stickStop;
                var topOffset = props.topOffset;
                var cssPositionValue;
                var cssTopValue;
                var stickyPlaceholderDisplay;
                if (props.passedValidation) {
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
                    $stickyElement.css({
                        position: cssPositionValue,
                        top: cssTopValue,
                        "backface-visibility": "hidden",
                        "z-index": 1001
                    });
                    $stickyPlaceholder.css({
                        display: stickyPlaceholderDisplay
                    });
                }
            });
        });
    }
    return {
        init: initialize
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
            $scrollContext = $("body");
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
        if (!initialized) $document.on("keyup", function(e) {
            var keyCode = e.which;
            if (keys[keyCode] !== undefined) $document.trigger("yoi-keypressed-" + keys[keyCode]);
        });
        $document.on("focusin focusout", function() {
            $document.trigger("yoi-focus-change");
        });
        initialized = true;
    }
    function addTabFocus($elements) {
        $elements.attr("tabindex", "0");
        $document.on("yoi-keypressed-tab", function() {
            var $activeElement = $(document.activeElement);
            $elements.removeClass("tabFocus");
            if ($activeElement.is($elements)) {
                $activeElement.addClass("tabFocus").on("blur", function() {
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
    var initialized = false;
    var lastBreakPoint;
    var activeBreakPoint;
    function initialize() {
        if (initialized) return false;
        $window.on("resize", function() {
            observe();
        });
        $document.ready(function() {
            observe();
        });
        initialized = true;
    }
    function observe() {
        activeBreakPoint = YOI.currentBreakPoint();
        if (activeBreakPoint !== lastBreakPoint) {
            YOI.clearDelay("resizeObserverDelay");
            YOI.setDelay("resizeObserverDelay", 250, function() {
                $window.trigger("yoi-breakpoint-change");
                $window.trigger("yoi-breakpoint-" + activeBreakPoint);
            });
            lastBreakPoint = activeBreakPoint;
        }
    }
    return {
        init: initialize
    };
}();

YOI.module.ScrollAgent = function() {
    var $window = $(window);
    var $activeTargetElements;
    var viewportHeight = $window.height();
    var lastScrollTop = 0;
    var viewportIn;
    var viewportOut;
    var viewportCenter;
    var initialized = false;
    function initialize($targetElement) {
        var $targetElement = YOI.createCollection("scrollagent", $targetElement);
        if ($targetElement) {
            $activeTargetElements = $targetElement;
            update();
            observe();
            listen();
            if (!initialized) {
                $window.on("load resize", function() {
                    update();
                    observe();
                }).on("scroll", function() {
                    broadcast();
                    observe();
                });
                initialized = true;
            }
        } else {
            $window.on("scroll", function() {
                broadcast();
            });
        }
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
        var currentScrollTop = $window.scrollTop();
        $activeTargetElements.each(function(index) {
            var $targetElement = $(this);
            var state = $targetElement.data().state;
            var initialPosY = $targetElement.data().props.initialPosY;
            var height = $targetElement.data().props.height;
            var transformY = parseFloat($targetElement.css("transform").split(",")[13], 10) || 0;
            viewportIn = currentScrollTop + viewportHeight > initialPosY + transformY && currentScrollTop < initialPosY + height + transformY;
            viewportCenter = currentScrollTop + viewportHeight / 2 > initialPosY + transformY && currentScrollTop + viewportHeight < initialPosY + height + transformY + viewportHeight / 2;
            viewportOut = !viewportIn;
            if (viewportIn && state === "out") $targetElement.trigger("yoi-viewport-in");
            if (viewportCenter && state !== "center") $targetElement.trigger("yoi-viewport-center");
            if (viewportOut && state === "in" || viewportOut && state === "center") $targetElement.trigger("yoi-viewport-out");
        });
    }
    function broadcast() {
        if (typeof window["scrollObserverInterval"] !== "number") {
            YOI.setInterval("scrollObserverInterval", 10, function() {
                $window.trigger("yoi-scroll");
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
        });
    }
    function listen() {
        $activeTargetElements.each(function() {
            var $targetElement = $(this);
            $targetElement.on("yoi-viewport-in", function() {
                $targetElement.data().state = "in";
            });
            $targetElement.on("yoi-viewport-center", function() {
                $targetElement.data().state = "center";
            });
            $targetElement.on("yoi-viewport-out", function() {
                $targetElement.data().state = "out";
            });
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
            YOI.setReady($(this));
        });
    }
    function addCopyBtn(markup) {
        var copyToClipboardSupported = document.queryCommandSupported && document.queryCommandSupported("copy");
        if (!copyToClipboardSupported) return markup;
        var $markup = markup instanceof jQuery ? markup : $(markup);
        var $copyBtn = $('<button class="code__copyBtn btn btn--flat btn--light">Copy</button>');
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

YOI.component.Filters = function() {
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
            if (YOI.isReady($(this))) return false;
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
            $thisFilters.on("yoi-filters-reset", function() {
                reset($thisFilters);
                removeResetBtn($thisFilters);
            });
            $thisFilters.on("yoi-filters-update", function() {
                addResetBtn($thisFilters);
            });
            $thisFilters.on("yoi-rangeinput-change", function() {
                addResetBtn($thisFilters);
            });
            YOI.setReady($(this));
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
            if (props.isCollapsed) {
                collapseFilterGroup($thisFilterGroup);
            }
        });
        $thisFilters.find(".rangeInput").trigger("yoi-rangeinput-reset");
        $thisFilters.trigger("yoi-filters-update");
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
        $thisFilter.trigger("yoi-filters-change");
        YOI.setDelay("toggleFilterTimeout", 750, function() {
            if (props.isCollapsed && props.hasActiveFilters) collapseFilterGroup($thisFilterGroup);
            updateAllFilterGroups($thisFilters);
            $thisFilters.trigger("yoi-filters-update");
        });
    }
    function addResetBtn($thisFilters) {
        var hasResetBtn = $thisFilters.find(".filters__resetBtn").length > 0;
        if (!hasResetBtn) {
            $resetBtn.clone().prependTo($thisFilters).on("click", function(e) {
                e.preventDefault();
                $thisFilters.trigger("yoi-filters-reset");
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
                    $(this).parent().addClass("input--focus");
                    $(this).trigger("yoi-input-focus");
                },
                blur: function() {
                    $(this).parent().removeClass("input--focus");
                    $(this).trigger("yoi-input-blur");
                },
                change: function() {
                    $(this).trigger("yoi-input-change");
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
            $window.on("load scroll resize", function() {
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
            $thisTr.toggleClass("tr--active");
        } else {
            $thisAllTr.removeClass("tr--active");
            $thisTr.addClass("tr--active");
        }
        $thisTable.trigger("yoi-table-select");
    }
    function unselectRow($thisTr) {
        var $thisTable = $thisTr.closest("table");
        var $thisAllTr = $thisTable.find("tr");
        $thisAllTr.removeClass("tr--active");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy95b2kuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9kaXNtaXNzLmpzIiwic3JjL2pzL2JlaGF2aW91cnMvbGF6eWxvYWQuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9wYXJhbGxheC5qcyIsInNyYy9qcy9iZWhhdmlvdXJzL3Njcm9sbGZ4LmpzIiwic3JjL2pzL2JlaGF2aW91cnMvc3RpY2t5LmpzIiwic3JjL2pzL2FjdGlvbnMvYmxpbmsuanMiLCJzcmMvanMvYWN0aW9ucy9oaWRlLmpzIiwic3JjL2pzL2FjdGlvbnMvcHVsc2UuanMiLCJzcmMvanMvYWN0aW9ucy9zY3JvbGx0by5qcyIsInNyYy9qcy9hY3Rpb25zL3Nob3cuanMiLCJzcmMvanMvYWN0aW9ucy91cGRhdGUuanMiLCJzcmMvanMvbW9kdWxlcy9icm93c2VyaGlzdG9yeS5qcyIsInNyYy9qcy9tb2R1bGVzL2tleWJvYXJkYWdlbnQuanMiLCJzcmMvanMvbW9kdWxlcy9yZXNpemVhZ2VudC5qcyIsInNyYy9qcy9tb2R1bGVzL3Njcm9sbGFnZW50LmpzIiwic3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbi5qcyIsInNyYy9jb21wb25lbnRzL2NvZGUvY29kZS5qcyIsInNyYy9jb21wb25lbnRzL2NvdW50ZG93bi9jb3VudGRvd24uanMiLCJzcmMvY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXIuanMiLCJzcmMvY29tcG9uZW50cy9kb2NrL2RvY2suanMiLCJzcmMvY29tcG9uZW50cy9maWx0ZXJidG5zL2ZpbHRlcmJ0bnMuanMiLCJzcmMvY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlcnMuanMiLCJzcmMvY29tcG9uZW50cy9mbHlvdXQvZmx5b3V0LmpzIiwic3JjL2NvbXBvbmVudHMvZm9ybS9jdXN0b21mb3JtZWxlbWVudHMuanMiLCJzcmMvY29tcG9uZW50cy9pY29uL2ljb24uanMiLCJzcmMvY29tcG9uZW50cy9pbWdtYWduaWZpZXIvaW1nbWFnbmlmaWVyLmpzIiwic3JjL2NvbXBvbmVudHMvbG9nL2xvZy5qcyIsInNyYy9jb21wb25lbnRzL21heGNoYXJzL21heGNoYXJzLmpzIiwic3JjL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMiLCJzcmMvY29tcG9uZW50cy9wYWdlcmV3aW5kL3BhZ2VyZXdpbmQuanMiLCJzcmMvY29tcG9uZW50cy9waWNrYnRuL3BpY2tidG4uanMiLCJzcmMvY29tcG9uZW50cy9waWVjaGFydC9waWVjaGFydC5qcyIsInNyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5qcyIsInNyYy9jb21wb25lbnRzL3JhbmdlaW5wdXQvcmFuZ2VpbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL3JhdGluZ2lucHV0L3JhdGluZ2lucHV0LmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xsa2V5cy9zY3JvbGxrZXlzLmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xscHJvZ3Jlc3Mvc2Nyb2xscHJvZ3Jlc3MuanMiLCJzcmMvY29tcG9uZW50cy9zbGlkZXIvc2xpZGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3RlcHBlci9zdGVwcGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3dpdGNoL3N3aXRjaC5qcyIsInNyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmpzIiwic3JjL2NvbXBvbmVudHMvdGFicy90YWJzLmpzIiwic3JjL2NvbXBvbmVudHMvdG9nZ2xlZ3JvdXAvdG9nZ2xlZ3JvdXAuanMiLCJzcmMvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuanMiXSwibmFtZXMiOlsiWU9JIiwiZWxlbWVudENvbGxlY3Rpb24iLCJhY3Rpb24iLCJiZWhhdmlvdXIiLCJjb21wb25lbnQiLCJtb2R1bGUiLCJzdHJpbmdDb250YWlucyIsImlucHV0Iiwic2VhcmNoU3RyaW5nIiwiaW5kZXhPZiIsInplcm9QYWQiLCJudW0iLCJkaWdpdHMiLCJNYXRoIiwiYWJzIiwiaSIsImxlYWRpbmdaZXJvcyIsInNsaWNlIiwiZm91bmRNb2R1bGUiLCJ3aW5kb3ciLCJmb3VuZENvbXBvbmVudCIsInNldERlbGF5IiwiZGVsYXlOYW1lIiwiZGVsYXlUaW1lIiwiZGVsYXlGdW5jdGlvbiIsInRoaXMiLCJjbGVhckRlbGF5Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInVuZGVmaW5lZCIsInNldEludGVydmFsIiwiaW50ZXJ2YWxOYW1lIiwiaW50ZXJ2YWxUaW1lIiwiaW50ZXJ2YWxGdW5jdGlvbiIsImNsZWFySW50ZXJ2YWwiLCJ0b09iamVjdCIsImtleVZhbHVlUGFpciIsInByb3Blck9iamVjdCIsInZhbHVlU3RhcnRNYXJrZXIiLCJrZXlWYWx1ZVBhaXJFbmRNYXJrZXIiLCJyZXBsYWNlIiwic3BsaXQiLCJsZW5ndGgiLCJ0cmltIiwidG9Cb29sZWFuIiwidG9Mb3dlckNhc2UiLCJnZXRBdHRyaWJ1dGUiLCIkZWxlbWVudCIsInlvaUF0dHJpYnV0ZVZhbHVlIiwiJCIsImVhY2giLCJhdHRyaWJ1dGVzIiwiaW5kZXgiLCJhdHRyaWJ1dGUiLCJuYW1lIiwibWF0Y2giLCJ2YWx1ZSIsImhpZGUiLCIkdGFyZ2V0IiwialF1ZXJ5IiwiaGFzQ2xhc3MiLCJkYXRhIiwicmVtb3ZlQ2xhc3MiLCJzaG93IiwiaGFzT3duUHJvcGVydHkiLCJhZGRDbGFzcyIsImlzTnVtYmVyIiwiaW5wdXRWYWwiLCJwYXR0ZXJuIiwidGVzdFZhbCIsInRvU3RyaW5nIiwidGVzdCIsIm5vRm9jdXMiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJ0YWdOYW1lIiwidGhyb3R0bGUiLCJ0YXJnZXRGdW5jdGlvbiIsImRlbGF5Iiwic25hcHNob3QiLCJEYXRlIiwibm93IiwidmFsaWRCcmVha3BvaW50Iiwia2V5d29yZCIsInZhbGlkQnJlYWtQb2ludHMiLCJwb3NpdGlvbiIsImluQXJyYXkiLCJlbnZpcm9ubWVudCIsImVudk5hbWUiLCJkZWZhdWx0RW52aXJvbm1lbnQiLCJjdXJyZW50RW52aXJvbm1lbnQiLCJhdHRyIiwibG9jYWxlIiwibGFuZ3VhZ2UiLCJkZWZhdWx0TGFuZ3VhZ2UiLCJjdXJyZW50TGFuZ3VhZ2UiLCJjdXJyZW50QnJlYWtQb2ludCIsImdldENvbXB1dGVkU3R5bGUiLCJib2R5IiwiZ2V0UHJvcGVydHlWYWx1ZSIsImJsaW5rIiwiJGVsZW0iLCJ0aW1lcyIsInN0b3AiLCJhbmltYXRlIiwib3BhY2l0eSIsInB1bHNlIiwic3RhcnREb21PYnNlcnZlciIsIiRkb2N1bWVudCIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIldlYktpdE11dGF0aW9uT2JzZXJ2ZXIiLCJ0YXJnZXQiLCJtdXRhdGlvbnMiLCJmb3JFYWNoIiwibXV0YXRpb24iLCJhZGRlZE5vZGVzIiwidHJpZ2dlciIsInJlbW92ZWROb2RlcyIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiY2hhcmFjdGVyRGF0YSIsInN0b3BEb21PYnNlcnZlciIsImRpc2Nvbm5lY3QiLCJ1cGRhdGVPcHRpb25zIiwib3B0aW9ucyIsImtleSIsInVwZGF0ZVByb3BzIiwicHJvcHMiLCJ1cGRhdGVTdGF0ZSIsInN0YXRlIiwiY3JlYXRlQ29sbGVjdGlvbiIsImlkZW50aWZpZXIiLCIkdGhpcyIsImFkZCIsImJpbmRBY3Rpb24iLCJob29rIiwicGFyYW1zIiwiT2JqZWN0Iiwia2V5cyIsImhvc3RPYmplY3QiLCJwdWJsaWNGdW5jdGlvbiIsImV2ZW50Iiwib24iLCIkdHJpZ2dlciIsInBhcmVudCIsIm1hcCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm1hcEFjdGlvbnMiLCJpcyIsInNldFJlYWR5IiwiaW5pdGlhbGl6ZWQiLCJpc1JlYWR5IiwiaW5pdGlhbGl6ZSIsImluaXQiLCJDb2RlIiwiRGlzbWlzcyIsImxvY2FsaXphdGlvbiIsImVuIiwiYnRuTGFiZWwiLCJkZSIsIiRidG5EaXNtaXNzIiwiJGRpc21pc3NhYmxlRWxlbWVudCIsImlzRGlzbWlzc2FibGUiLCIkdGhpc0Rpc21pc3NhYmxlRWxlbWVudCIsInBvc2l0aW9uU3RhdGljIiwiY3NzIiwiY2xvbmUiLCJkaXNtaXNzIiwiYXBwZW5kVG8iLCIkdGFyZ2V0RWxlbWVudCIsImZhZGVPdXQiLCJMYXp5bG9hZCIsIiRsYXp5bG9hZCIsImlzTGF6eWxvYWRpbmciLCJkZWZhdWx0SW1hZ2UiLCJzcmMiLCJleHRyYWN0SW1nU3JjRnJvbVN0cmluZyIsImh0bWwiLCJ3aWR0aCIsImhlaWdodCIsImFsdCIsInRpdGxlIiwibG9uZ2Rlc2MiLCJjc3NDbGFzc2VzIiwiaW1hZ2VVcmwiLCJicmVha1BvaW50U21hbGwiLCJicmVha1BvaW50TWVkaXVtIiwiYnJlYWtQb2ludExhcmdlIiwiYnJlYWtQb2ludFhsYXJnZSIsInNyY1NtYWxsIiwic3JjTWVkaXVtIiwic3JjTGFyZ2UiLCJzcmNYbGFyZ2UiLCJuZXdJbWFnZSIsImluc2VydEFmdGVyIiwicHJvbWlzZSIsInRoZW4iLCJTY3JvbGxBZ2VudCIsIm9uZSIsImNvbXBsZXRlIiwib3V0cHV0IiwiUGFyYWxsYXgiLCIkd2luZG93IiwiJGFjdGl2ZVBhcmFsbGF4RWxlbWVudHMiLCJjdXJyZW50U2Nyb2xsVG9wIiwiZGVmYXVsdEZhY3RvciIsIiRwYXJhbGxheEVsZW1lbnQiLCJpc1BhcmFsbGF4IiwidXBkYXRlUGFyYWxsYXhFbGVtZW50IiwicmVzZXRTY3JvbGwiLCJ1cGRhdGVQYXJhbGxheEVudiIsInNjcm9sbFBhcmFsbGF4Iiwic2Nyb2xsT3ZlcnNob290IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaW5pdGlhbFBvc1kiLCJmYWN0b3IiLCJzY3JvbGxUb3BJblZpZXdwb3J0Iiwidmlld3BvcnRIZWlnaHQiLCJwYXJhbGxheE9mZnNldCIsInN0YXJ0c0luVmlld3BvcnQiLCJwYXJzZUludCIsInNjcm9sbFRvcCIsIlNjcm9sbEZ4IiwiJHRoaXNUYXJnZXRFbGVtZW50IiwiaGFzU2Nyb2xsRngiLCJwcmVwYXJlIiwibGlzdGVuIiwiaW5GeCIsImluIiwiY2VudGVyRngiLCJjZW50ZXIiLCJzcGVlZCIsInJlcGVhdCIsImFwcGx5RngiLCJmeCIsIlN0aWNreSIsIiRib2R5IiwiJHN0aWNreUVsZW1lbnQiLCIkdGhpc1N0aWNreUVsZW1lbnQiLCJtYW5pcHVsYXRlRG9tIiwidXBkYXRlU3RpY2t5RWxlbWVudFByb3BzIiwicG9zaXRpb25PYnNlcnZlciIsInN0aWNrT2JzZXJ2ZXIiLCIkc3RpY2t5UGxhY2Vob2xkZXIiLCIkc3RpY2t5V3JhcHBlciIsInN0aWNreUVsZW1lbnRDc3NQb3MiLCJzdGlja3lFbGVtZW50Q3NzTGVmdCIsInN0aWNreUVsZW1lbnRDc3NUb3AiLCJ0b3AiLCJsZWZ0Iiwib3V0ZXJXaWR0aCIsIm91dGVySGVpZ2h0IiwiZGlzcGxheSIsIndyYXAiLCIkcmVmZXJlbmNlRWxlbWVudCIsInJlZmVyZW5jZSIsImZpcnN0Iiwic3RpY2t5RWxlbWVudEhlaWdodCIsInN0aWNreUVsZW1lbnRXaWR0aCIsInN0aWNreUVsZW1lbnRJbml0aWFsVG9wUG9zIiwib2Zmc2V0IiwidG9wT2Zmc2V0Iiwic3RhcnQiLCJ0b3BEaXN0YW5jZSIsInN0aWNrU3RhcnQiLCJzdGlja1N0b3AiLCJwYXNzZWRWYWxpZGF0aW9uIiwidmFsaWRJbnB1dCIsImluaXRpYWxUb3BQb3MiLCIkc3RpY2t5RWxlbWVudHMiLCJjc3NQb3NpdGlvblZhbHVlIiwiY3NzVG9wVmFsdWUiLCJzdGlja3lQbGFjZWhvbGRlckRpc3BsYXkiLCJiYWNrZmFjZS12aXNpYmlsaXR5Iiwiei1pbmRleCIsIkJsaW5rIiwiSGlkZSIsInJlbW92ZSIsInNlbGVjdG9ycyIsInRhcmdldFNlbGVjdG9yIiwiY2xhc3NOYW1lIiwiam9pbiIsIlB1bHNlIiwiU2Nyb2xsVG8iLCIkc2Nyb2xsQ29udGV4dCIsIiRzY3JvbGxDb250YWluZXIiLCJjbG9zZXN0IiwiaGlnaGxpZ2h0Iiwic2Nyb2xsUG9zWSIsIlRhYnMiLCJzd2l0Y2hUbyIsInRhcmdldElkIiwid2hlbiIsImRvbmUiLCJTaG93IiwiVXBkYXRlIiwicmVxdWVzdFR5cGUiLCJ0eXBlIiwicmVxdWVzdFVybCIsInVybCIsImZpbHRlciIsImVycm9yVGl0bGUiLCJlcnJvck1zZyIsIiRlcnJvck1zZyIsIiRzcGlubmVyIiwidG9VcHBlckNhc2UiLCJhamF4IiwiY2FjaGUiLCJiZWZvcmVTZW5kIiwiYXBwZW5kIiwiZXJyb3IiLCJzdWNjZXNzIiwiJHJlc3BvbnNlIiwiQnJvd3Nlckhpc3RvcnkiLCJwdXNoSGFzaCIsImhhc2hTdHJpbmciLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInJlcGxhY2VIYXNoIiwicmVwbGFjZVN0YXRlIiwiY2xlYXJIYXNoIiwiS2V5Ym9hcmRBZ2VudCIsIjM4IiwiMzkiLCI0MCIsIjM3IiwiMTMiLCIzMiIsIjI3IiwiOSIsImtleUNvZGUiLCJ3aGljaCIsImFkZFRhYkZvY3VzIiwiJGVsZW1lbnRzIiwiJGFjdGl2ZUVsZW1lbnQiLCJSZXNpemVhZ2VudCIsImxhc3RCcmVha1BvaW50IiwiYWN0aXZlQnJlYWtQb2ludCIsInJlYWR5IiwiJGFjdGl2ZVRhcmdldEVsZW1lbnRzIiwibGFzdFNjcm9sbFRvcCIsInZpZXdwb3J0SW4iLCJ2aWV3cG9ydE91dCIsInZpZXdwb3J0Q2VudGVyIiwidXBkYXRlIiwiYnJvYWRjYXN0IiwidGhpc0hlaWdodCIsInRoaXNJbml0aWFsUG9zWSIsInRyYW5zZm9ybVkiLCJwYXJzZUZsb2F0IiwiQWNjb3JkaW9uIiwia2V5Ym9hcmRFdmVudHNBZGRlZCIsIiRhY2NvcmRpb24iLCIkdGhpc0FjY29yZGlvbiIsIiR0aGlzU2VjdGlvbnMiLCJmaW5kIiwiZXZlbnRUeXBlIiwiJHRoaXNTZWN0aW9uIiwiJHRoaXNIZWFkZXIiLCIkdGhpc0JvZHkiLCJzbGlkZVVwIiwidG9nZ2xlU2VjdGlvbiIsImFkZEtleWJvYXJkRXZlbnRzIiwiJHNlY3Rpb24iLCJsaW5rZWQiLCJjbG9zZUFsbFNlY3Rpb25zIiwib3BlblNlY3Rpb24iLCJjbG9zZVNlY3Rpb24iLCJzbGlkZURvd24iLCIkdGFyZ2V0cyIsIm9wZW5BbGxTZWN0aW9ucyIsImNsb3NlIiwib3BlbiIsImNsb3NlQWxsIiwib3BlbkFsbCIsInRvZ2dsZSIsIiRjb2RlV3JhcHBlciIsInRhYlBhZ2VJbmRleCIsIiR0aGlzQ29kZVdyYXBwZXIiLCIkdGhpc0NvZGUiLCJleGFtcGxlVGFnIiwiZXhhbXBsZVRhZ1RhYmJlZCIsInRoaXNFeGFtcGxlIiwidGV4dCIsInRoaXNFeGFtcGxlVGFiYmVkIiwibWFya3VwIiwiZmlyc3RJbmRleCIsInNlY29uZEluZGV4IiwiYWRkQ29weUJ0biIsInJlcGxhY2VXaXRoIiwiY29weVRvQ2xpcGJvYXJkU3VwcG9ydGVkIiwicXVlcnlDb21tYW5kU3VwcG9ydGVkIiwiJG1hcmt1cCIsIiRjb3B5QnRuIiwiJGNvZGVTb3VyY2UiLCJjb2RlSGFzUmVuZGVyZWRFeGFtcGxlIiwiJGNvZGUiLCJjb3B5VG9DbGlwQm9hcmQiLCIkc291cmNlIiwic2VsZWN0aW9uIiwiZ2V0U2VsZWN0aW9uIiwicmFuZ2UiLCJjcmVhdGVSYW5nZSIsInNlbGVjdE5vZGVDb250ZW50cyIsImFkZFJhbmdlIiwiZXhlY0NvbW1hbmQiLCJyZW1vdmVBbGxSYW5nZXMiLCJDb3VudGRvd24iLCJkYXlzIiwiaG91cnMiLCJtaW51dGVzIiwic2Vjb25kcyIsIiRjb3VudGRvd25DaGFyYWN0ZXIiLCIkY291bnRkb3duQ2hhcmFjdGVyTGFiZWwiLCIkY291bnRkb3duQ2xvY2siLCIkY291bnRkb3duIiwiJHRoaXNDb3VudGRvd24iLCJkZWZhdWx0WWVhciIsImdldEZ1bGxZZWFyIiwiZGVmYXVsdE1vbnRoIiwiZGVmYXVsdERheSIsImRlZmF1bHRIb3VyIiwiZGVmYXVsdE1pbnV0ZSIsImRlZmF1bHRTZWNvbmQiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwiZW5kVGltZSIsImdldERhdGVTdHJpbmciLCJyZW5kZXIiLCJ0aW1lUmVtYWluaW5nIiwiZ2V0VGltZVJlbWFpbmluZyIsImxjZENoYXJhY3RlcnMiLCJnZXRMY2RDaGFyYWN0ZXJzQ1NTQ2xhc3NOYW1lcyIsIiRoaWRkZW5MYWJlbCIsIiR0aGlzQ291bnRkb3duQ2xvY2siLCJ1bml0IiwiJGNvdW50ZG93bkNoYXJzIiwiJGNvdW50ZG93bkxhYmVsIiwiZ2V0Q2hhcmFjdGVyTGFiZWwiLCJ0b3RhbCIsInNlbGVjdG9yIiwiZXEiLCJsYWJlbFR4dCIsIm1vbnRocyIsImVuZFRpbWVJc29TdHJpbmciLCJwYXJzZSIsImZsb29yIiwiY2hhckF0IiwiJGxhYmVsIiwiRGF0ZVBpY2tlciIsIndlZWtEYXlzIiwibW9udGhOYW1lcyIsIiRkYXRlUGlja2VyIiwiJHdlZWtEYXlzSGVhZGVyIiwiJGRhdGVwaWNrZXIiLCJnZXRDdXJyZW50RGF0ZSIsIiR0aGlzRGF0ZUlucHV0IiwiaW5wdXRZZWFyIiwiaW5wdXRNb250aCIsImlucHV0RGF5IiwidXBkYXRlRGF0ZUlucHV0IiwiJHRoaXNEYXRlUGlja2VyIiwicmVuZGVyRGF0ZVBpY2tlciIsIiR0aGlzRGF0ZUlucHV0V3JhcHBlciIsImFmdGVyIiwic3RvcFByb3BhZ2F0aW9uIiwidGhpc0RhdGVJbnB1dFByb3BzIiwibmV4dCIsInJlbmRlck1vbnRoVGFibGUiLCJzZWxlY3RlZFllYXIiLCJzZWxlY3RlZE1vbnRoIiwiaGlkZUFsbERhdGVQaWNrZXJzIiwicGxhY2VEYXRlUGlja2VyIiwidXBkYXRlRGF0ZVBpY2tlciIsInNlbGVjdGVkRGF5IiwiZm9ybWF0dGVkU2VsZWN0ZWREYXRlIiwidXBkYXRlTW9udGhUYWJsZSIsIiR0aGlzTW9udGhUYWJsZSIsImZpcnN0RGF5SW5zdGFuY2UiLCJmaXJzdERheSIsImdldERheSIsInRvdGFsRGF5cyIsImdldFRvdGFsRGF5cyIsImZvcm1hdHRlZERhdGUiLCJ2YWwiLCIkbW9udGhUYWJsZSIsIiRtb250aFRhYmxlQm9keSIsInRoaXNNb250aFRhYmxlUHJvcHMiLCJ0aGlzRGF0ZVBpY2tlclByb3BzIiwiaW5kZXhDZWxsIiwiaW5kZXhEYXkiLCJjZWlsIiwiJHJvdyIsImoiLCIkY2VsbCIsInBpY2tEYXRlIiwiJHRoaXNNb250aEJ1dHRvbiIsIiR0aGlzRGF0ZXBpY2tlciIsInRoaXNBY3Rpb24iLCJwcmV2IiwiZm9jdXMiLCIkdGhpc0NlbGwiLCJjdXJyZW50RGF0ZSIsIndlZWtEYXkiLCJnZXREYXRlIiwiZ2V0TW9udGgiLCJhZGp1c3RZZWFyIiwiZ2V0WWVhciIsImRheXNJbk1vbnRocyIsIiRkYXRlSW5wdXQiLCJkYXRlSW5wdXRPZmZzZXRZIiwiZGF0ZUlucHV0SGVpZ2h0IiwiZGF0ZVBpY2tlckhlaWdodCIsInZpZXdQb3J0SGVpZ2h0IiwicGxhY2UiLCJEb2NrIiwiJGRvY2siLCIkdGhpc0RvY2siLCJhdXRvaGlkZSIsIkZpbHRlckJ0bnMiLCIkZmlsdGVyQnRucyIsIiR0aGlzRmlsdGVyQnRucyIsIiR0aGlzQnRuIiwiRmlsdGVycyIsImZpbHRlckdyb3VwTWF4SGVpZ2h0IiwiYnRuTGFiZWxSZXNldCIsIiRyZXNldEJ0biIsIiRmaWx0ZXJzIiwiJHRoaXNGaWx0ZXJzIiwiJHRoaXNGaWx0ZXJHcm91cHMiLCIkdGhpc0ZpbHRlckdyb3VwSGVhZGVycyIsIiR0aGlzRmlsdGVyc011bHRpIiwiJHRoaXNGaWx0ZXJzU2luZ2xlIiwidXBkYXRlQWxsRmlsdGVyR3JvdXBzIiwiJHRoaXNGaWx0ZXJHcm91cCIsImFib3ZlTWF4SGVpZ2h0IiwiaXNTY3JvbGwiLCJpc0NvbGxhcHNlZCIsImNvbGxhcHNlRmlsdGVyR3JvdXAiLCJ0b2dnbGVGaWx0ZXJHcm91cCIsIiR0aGlzRmlsdGVyIiwidG9nZ2xlRmlsdGVyIiwicmVzZXQiLCJyZW1vdmVSZXNldEJ0biIsImFkZFJlc2V0QnRuIiwiJHRoaXNGaWx0ZXJzRmlsdGVycyIsIiR0aGlzRmlsdGVyR3JvdXBCb2R5IiwiZXhwYW5kRmlsdGVyR3JvdXAiLCJ0b2dnbGVDbGFzcyIsImhhc0FjdGl2ZUZpbHRlcnMiLCJoYXNSZXNldEJ0biIsInByZXBlbmRUbyIsImRldGFjaCIsImhhc1NoYWRvdyIsIkZseW91dCIsIiRmbHlvdXQiLCIkdGhpc0ZseW91dCIsIiRmbHlvdXRIYW5kbGUiLCJDdXN0b21Gb3JtRWxlbWVudHMiLCIkY2hlY2tCb3hXcmFwcGVyIiwiJHJhZGlvQnRuV3JhcHBlciIsIiRzZWxlY3RXcmFwcGVyIiwiJHNlbGVjdEljb24iLCIkY2hlY2tFbGVtbnMiLCIkY2hlY2tCb3hlcyIsIiRyYWRpb0J0bnMiLCIkc2VsZWN0cyIsIiR0aGlzQ2hlY2tib3giLCJpc1dyYXBwZWRJbkxhYmVsIiwicGFyZW50cyIsImJsdXIiLCJjaGFuZ2UiLCIkdGhpc1JhZGlvQnRuIiwiZ3JvdXBOYW1lIiwiJGdyb3VwZWRCdG5zIiwiJHRoaXNTZWxlY3QiLCIkdGhpc1NlbGVjdFdyYXBwZXIiLCIkdGhpc1NlbGVjdEljb24iLCJyZW1vdmVBdHRyIiwidGhpc1dyYXBwZXIiLCJJY29uIiwiJGljb24iLCIkdGhpc0ljb24iLCIkaWNvblN2ZyIsImljb25DbGFzc05hbWVzIiwic291cmNlIiwiZGF0YVR5cGUiLCJJbWdNYWduaWZpZXIiLCIkY3Vyc29yIiwiJHZpZXdlciIsImRlZmF1bHRTdGFydFZpZXdlckRlbGF5VGltZSIsIiRpbWdNYWduaWZpZXIiLCIkdGhpc0ltZ01hZ25pZmllciIsIiR0aGlzQ3Vyc29yIiwiJHRoaXNWaWV3ZXIiLCJzdGFydFZpZXdlciIsInN0b3BWaWV3ZXIiLCJtb3ZlTWFnbmlmaWVyIiwic2V0Vmlld2VyIiwic2V0Wm9vbUltYWdlIiwieVBvcyIsInhQb3MiLCJkZXN0cm95Iiwib2ZmIiwidGhpc1pvb21JbWFnZVBhdGgiLCJ6b29tSW1hZ2UiLCIkdGhpc1ByZXZpZXdJbWFnZSIsInRoaXNab29tSW1hZ2UiLCJJbWFnZSIsIiR0aGlzWm9vbUltYWdlIiwieVJhdGlvIiwieFJhdGlvIiwic2V0Q3Vyc29yIiwidGhpc0N1cnNvcldpdGgiLCJ0aGlzQ3Vyc29ySGVpZ2h0IiwibWFyZ2luTGVmdCIsImZhZGVJbiIsImltZ01hZ25pZmllclByb3BzIiwiY3Vyc29yUHJvcHMiLCJwYWdlWSIsInBhZ2VYIiwibWluWSIsIm1heFkiLCJtaW5YIiwibWF4WCIsIkxvZyIsIndyaXRlIiwiJGxvZyIsImxvZ0lucHV0IiwibWVtb3J5IiwidW5zaGlmdCIsIiRsb2dCb2R5IiwibG9nTWVtb3J5IiwibG9nT3V0cHV0IiwiY2xlYXIiLCJNYXhDaGFycyIsImRlZmF1bHRNYXhMZW5ndGgiLCIkaW5wdXRFbGVtZW50IiwiJHRoaXNJbnB1dEVsZW1lbnQiLCJkaXNwbGF5Q2hhcnNMZWZ0IiwidXBkYXRlSW5wdXRFbGVtZW50IiwibWF4TGVuZ3RoIiwiZXJyb3JDbGFzc05hbWVzIiwiZXJyb3JDbGFzcyIsIiRkaXNwbGF5RWxlbWVudCIsImlucHV0TGVuZ3RoIiwiY2hhcnNMZWZ0IiwiTW9kYWwiLCJtb2RhbEFjdGl2ZSIsImxvYWRlZE1vZGFscyIsImJ0bkxhYmVsQ2xvc2UiLCIkbW9kYWxDb3ZlciIsIiRtb2RhbENvbnRhaW5lciIsIiRtb2RhbENsb3NlQnRuIiwiJG1vZGFsVGVtcGxhdGUiLCIkbW9kYWxUcmlnZ2VyIiwicHJlcGFyZURvbSIsIiR0aGlzTW9kYWxUcmlnZ2VyIiwidGhpc01vZGFsR2VuZXJhdGUiLCJnZW5lcmF0ZSIsInRoaXNNb2RhbFRpdGxlIiwidGhpc01vZGFsQm9keSIsInRoaXNNb2RhbElkIiwiaWQiLCJ0aGlzTW9kYWxNb2RpZmllcnMiLCJtb2RpZmllcnMiLCJ0aGlzTW9kYWxQYXRoIiwicGF0aCIsInRoaXNNb2RhbENhY2hlIiwibG9hZCIsImluaXRpYWxpemVDbG9zZVRyaWdnZXJzIiwiZG9tUHJlcGFyZWQiLCJmb3VuZE1vZGFsIiwibW9kYWxJZCIsInRyaWdnZXJzIiwiJHRoaXNNb2RhbCIsIiR0aGlzTW9kYWxUaXRsZSIsIiR0aGlzTW9kYWxCb2R5IiwicHVzaCIsIm1vZGFsUGF0aCIsImNhbGxiYWNrIiwiJGxvYWRCaW4iLCJyZXNwb25zZSIsInN0YXR1cyIsInhociIsIiRpbWFnZXMiLCJ0b3RhbEltYWdlcyIsImltYWdlQ291bnRlciIsIm9wZW5GYWxsYmFja0xpbmsiLCIkbW9kYWwiLCJvZmZTZXRZIiwibW9kYWxGaXRzSW50b1ZpZXdwb3J0IiwibWFyZ2luVG9wIiwicHJvdG9jb2wiLCJob3N0IiwiUGFnZVJld2luZCIsIiRwYWdlUmV3aW5kIiwidGhyZXNob2xkIiwiZW5hYmxlUGFnZVJld2luZCIsInJ1biIsInNjcm9sbCIsIlBpY2tCdG4iLCIkcGlja0J0biIsIiR0aGlzUGlja0J0biIsInByZXBlbmQiLCJhY3RpdmF0ZSIsIiRyYWRpb0lucHV0IiwicHJvcCIsIlBpZUNoYXJ0IiwiJGNvbG9yRG90IiwiZml4ZWRQYWxldHRlIiwiJHBpZUNoYXJ0IiwiJHRoaXNQaWVDaGFydCIsIiR0aGlzUGllQ2hhcnRSZWNvcmRzIiwiJHRoaXNQaWVDaGFydFN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsInNpemUiLCJwYWxldHRlIiwicm90YXRpb24iLCJyZWNvcmRzIiwic2V0QXR0cmlidXRlIiwiJHRoaXNSZWNvcmQiLCJ0aGlzVmFsdWUiLCJhZGRDaGFydERhdGEiLCJoaWdobGlnaHRSZWNvcmQiLCJyZXNldEhpZ2hsaWdodFJlY29yZCIsImJsaW5rUmVjb3JkIiwic2V0Rml4ZWRTbGljZUNvbG9ycyIsInNldFJhbmRvbVNsaWNlQ29sb3JzIiwic2V0U2xpY2VTaGFkZXMiLCJzZXRVbmlxdWVTbGljZUNvbG9ycyIsIiR0aGlzUGF0aHMiLCIkdGhpc0NpcmNsZXMiLCIkdGhpc0RvdHMiLCJ0b3RhbFNsaWNlcyIsImJhc2VDb2xvciIsIkpTT04iLCJzdGFydFJhZGl1cyIsInN0YXJ0U2F0dXJhdGlvbiIsInN0YXJ0THVtaW5hbmNlIiwic3BsaXRSYWRpdXMiLCJyYWRpdXMiLCJyYW5kb21Db2xvciIsInJhbmRvbSIsInNwbGl0THVtaW5hbmNlIiwibHVtaW5hbmNlIiwiJHRoaXNQaWVTbGljZSIsIm1pbiIsIm1heCIsIngiLCJjb3MiLCJQSSIsInkiLCJzaW4iLCJsb25nQXJjIiwiZCIsInRoaXNJbmRleCIsIiRzbGljZXMiLCJzaWJsaW5ncyIsImZhZGVUbyIsIiR0aGlzUmVjb3JkcyIsIlBvcE92ZXIiLCIkcG9wT3ZlclRyaWdnZXIiLCIkdGhpc1BvcE92ZXJUcmlnZ2VyIiwiJHRoaXNQb3BPdmVyIiwidmFsaWRFdmVudHMiLCJwcmV2ZW50RGVmYXVsdENsaWNrIiwiZXZlbnRTaG93IiwiZXZlbnRIaWRlIiwiaGlkZUFsbCIsInJlbW92ZVRvZ2dsZUNsYXNzIiwic2V0UG9zaXRpb24iLCJjc3NDbGFzc05hbWUiLCJwb3MiLCJyZWYiLCJSYW5nZUlucHV0Iiwia25vYk9mZnNldCIsInJhbmdlSW5wdXRLbm9iIiwicmFuZ2VJbnB1dExhYmVsIiwicmFuZ2VJbnB1dFRyYWNrIiwiJHJhbmdlSW5wdXQiLCIkdGhpc1JhbmdlSW5wdXQiLCIkdGhpc01pbktub2IiLCIkdGhpc01heEtub2IiLCIkc2luZ2xlTGFiZWwiLCIkdGhpc1RyYWNrIiwiJHRoaXNLbm9iIiwic3RvcmVDdXJzb3JQb3MiLCJtb3ZlS25vYiIsImFic01pbiIsImFic01heCIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJvZmZzZXRYIiwibWluUG9zWCIsIm1heFBvc1giLCJjdXJzb3JQb3NYIiwic2V0IiwidGhpc1Byb3BzIiwidGhpc0Fic01pbiIsInRoaXNBYnNNYXgiLCJhZGp1c3RMYWJlbHMiLCIkdGhpc01pbkxhYmVsIiwiJHRoaXNNYXhMYWJlbCIsIiR0aGlzU2luZ2xlTGFiZWwiLCJtaW5Lbm9iUmlnaHRFZGdlIiwibWF4S25vYkxlZnRFZGdlIiwibWluTGFiZWxXaWR0aCIsIm1heExhYmVsV2lkdGgiLCJzaW5nbGVMYWJlbFdpZHRoIiwiJGtub2IiLCJlUG9zWCIsIm5ld0N1cnNvclBvcyIsIiR0aGlzTWluSW5wdXQiLCIkdGhpc01heElucHV0IiwiaXNNaW5Lbm9iIiwiaXNNYXhLbm9iIiwicG9zWCIsInRoaXNLbm9iVmFsdWUiLCJpbnB1dFZhbHVlIiwiY3Vyc29yT2Zmc2V0IiwiUmF0aW5nSW5wdXQiLCIkcmF0aW5nU2VsZWN0IiwiJHJhdGluZ0lucHV0IiwiJHRoaXNSYXRpbmdJbnB1dCIsIiR0aGlzUmF0aW5nU2VsZWN0IiwiJHRoaXNSYXRpbmdTdGFycyIsInNldFNjb3JlIiwic3VibWl0U2NvcmUiLCJsb2NrIiwidW5sb2NrIiwic2NvcmUiLCJnZXRTY29yZUZyb21Nb2RpZmllciIsIlNjcm9sbEtleXMiLCJjdXJyZW50SG9vayIsInRvdGFsSG9va3MiLCJzY3JvbGxTcGVlZCIsIiRob29rcyIsIiRzY3JvbGxCdXR0b25zIiwiZW5hYmxlU2Nyb2xsS2V5cyIsImhvb2tzIiwiZGV0ZWN0Q3VycmVudEhvb2siLCJzY3JvbGxUb0hvb2siLCJkaXJlY3Rpb24iLCJzZXRDdXJyZW50SG9vayIsImhpZ2hsaWdodEJ0biIsImJ0bkluZGV4IiwiJGJ0biIsIlNjcm9sbFByb2dyZXNzIiwiJHNjcm9sbFByb2dyZXNzQmFyIiwiZG9jdW1lbnRIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJ0b3RhbFNjcm9sbCIsInNjcm9sbFBvc2l0aW9uIiwic2Nyb2xsUHJvZ3Jlc3MiLCJ2aXNpYmxlU2Nyb2xsUHJvZ3Jlc3MiLCJlbmFibGVTY3JvbGxQcm9ncmVzcyIsInZpc2libGUiLCJTbGlkZXIiLCJidG5MYWJlbE5leHQiLCJidG5MYWJlbFByZXYiLCJzbGlkZUNvbnRyb2xzIiwicGFnZUJ0bnMtLXRsIiwicGFnZUJ0bnMtLXRyIiwicGFnZUJ0bnMtLWJyIiwicGFnZUJ0bnMtLWJsIiwiZmxpcEJ0bnMiLCJmbGlwQnRucy0taW5zZXQiLCJwYWdlRG90cyIsInBhZ2VEb3RzLS1kYXJrIiwicGFnZURvdHMtLXN1YnRsZSIsIiRzbGlkZXIiLCJzbGlkZXJJbmRleCIsIiR0aGlzU2xpZGVyIiwiJHRoaXNTbGlkZXMiLCJzbGlkZUluZGV4IiwidG90YWxTbGlkZXMiLCJ0cmFuc2l0aW9uIiwiYWRqdXN0SGVpZ2h0IiwiY29udHJvbCIsInRoaXNDb250cm9scyIsInN0b3BBdXRvcGxheSIsInNob3dTbGlkZSIsImluc2VydEJlZm9yZSIsInBhZ2luYXRpb25MaW5rcyIsImxpbmtJbmRleCIsImNsaWNrYWJsZSIsIm5vdCIsImF1dG9wbGF5Iiwic3RhcnRBdXRvcGxheSIsImFwcGx5VHJhbnNpdGlvbiIsInVwZGF0ZVBhZ2luYXRpb24iLCJuZXh0U2xpZGVJbmRleCIsImN1cnJlbnRTbGlkZUluZGV4IiwibGVmdE9mZnNldCIsInRoaXNTbGlkZUluZGV4IiwiJHRoaXNTbGlkZXNXcmFwcGVyIiwic2xpZGVIZWlnaHQiLCJ0aGlzU2xpZGVIZWlnaHQiLCJTdGVwcGVyIiwiYnRuTGFiZWxNb3JlIiwiYnRuTGFiZWxMZXNzIiwiJHN0ZXBwZXJCdG5zIiwiJHN0ZXBwZXIiLCIkdGhpc1N0ZXBwZXIiLCJpbmNyZWFzZUl0ZW1Db3VudCIsImRlY3JlYXNlSXRlbUNvdW50IiwidmFsaWRhdGVJbnB1dCIsImN1cnJlbnRWYWx1ZSIsInJlc2V0SXRlbUNvdW50Iiwic2V0SXRlbUNvdW50IiwicmVtb3ZlRXJyb3JGb3JtYXR0aW5nIiwiY2xlYXJJdGVtQ291bnQiLCJhZGRFcnJvckZvcm1hdHRpbmciLCIkdHh0RmllbGQiLCJjb3VudFVwIiwiY291bnREb3duIiwic2V0VG8iLCJTd2l0Y2giLCJsYWJlbE9uIiwibGFiZWxPZmYiLCIkbGFiZWxPbiIsIiRsYWJlbE9mZiIsIiRzd2l0Y2giLCIkdGhpc1N3aXRjaCIsInRoaXNMYWJlbE9uVGV4dCIsInRoaXNMYWJlbE9mZlRleHQiLCJzaG93TGFiZWxzIiwic2V0T24iLCJzZXRPZmYiLCJzZXRUb2dnbGUiLCJUYWJsZSIsIiR0YWJsZSIsIiR0aGlzVGFibGUiLCJzZWxlY3RhYmxlIiwiYmVmb3JlIiwiJHRoaXNUciIsInNlbGVjdFJvdyIsInJlbW92ZWFibGUiLCJyZW1vdmVSb3ciLCIkdGhpc0FsbFRyIiwidW5zZWxlY3RSb3ciLCJ0b3RhbFRkcyIsInRhYmxlSXNFbXB0eSIsInNlbGVjdCIsInVuc2VsZWN0IiwiJHRhYnNNZW51IiwiJHRoaXNUYWJzTWVudSIsInVybFRhYklkIiwiaGFzaCIsImZpcnN0VGFiSWQiLCJoYXNoTWF0Y2hlc1RhYiIsImhhc0FjdGl2ZVRhYiIsImhhcyIsInN0YXJ0VGFiSWQiLCJ0aGlzVGFyZ2V0VGFiSWQiLCIkdGhpc1RhYnNNZW51SXRlbSIsIiR0aGlzVGFic01lbnVJdGVtcyIsIiR0aGlzVGFyZ2V0VGFiIiwiJHRoaXNNZW51SXRlbSIsInRhYklkIiwiVG9nZ2xlR3JvdXAiLCJ0b2dnbGVUYXJnZXRHcm91cEl0ZXJhdGlvbiIsInJlc2V0VG9nZ2xlRGVsYXlUaW1lIiwiJHRvZ2dsZUdyb3VwIiwiJHRoaXNUcmlnZ2VyIiwiZ3JvdXAiLCJhY3RpdmVDbGFzc05hbWUiLCIkdGhpc0ZhbGxCYWNrRWxlbSIsIlRvb2x0aXAiLCJkZWZhdWx0RmFkZUR1cmF0aW9uIiwiZGVmYXVsdFNob3dEZWxheSIsImRlZmF1bHRIaWRlRGVsYXkiLCIkdG9vbHRpcFRyaWdnZXIiLCIkdGhpc1Rvb2x0aXBUcmlnZ2VyIiwic3RhdGljUG9zaXRpb24iLCJoYXNTdGF0aWNQb3NpdGlvbiIsIiR0aGlzVG9vbHRpcCIsInByZXBhcmVUb29sdGlwIiwic2V0U3RhdGljUG9zaXRpb24iLCJoaWRlV2l0aERlbGF5Iiwic2hvd1dpdGhEZWxheSIsInNjb3BlIiwiY3JlYXRlQW5kU2hvd1Rvb2x0aXAiLCJjb250ZW50IiwiZmFkZUR1cmF0aW9uIiwidG9vbHRpcFR5cGUiLCJ0YXJnZXRBbHJlYWR5UHJlcGFyZWQiLCJjdXJzb3JZIiwiY3Vyc29yWCIsInRvb2x0aXBXaWR0aCIsInRvb2x0aXBIZWlnaHQiLCJ2aWV3UG9ydFdpZHRoIiwidG9vbHRpcExlZnQiLCJ0b29sdGlwVG9wIiwic2hvd0RlbGF5RHVyYXRpb24iLCJzaG93RGVsYXkiLCJoaWRlRGVsYXlEdXJhdGlvbiIsImhpZGVEZWxheSIsImNyZWF0ZSJdLCJtYXBwaW5ncyI6IkFBRUEsSUFBSUE7SUFLQUM7SUFDQUM7SUFDQUM7SUFDQUM7SUFDQUM7SUFJQUMsZ0JBQWlCLFNBQVNDLE9BQU9DO1FBYTdCLEtBQUtELFVBQVVDLGNBQWMsT0FBTztRQUlwQyxJQUFJRCxNQUFNRSxRQUFRRCxpQkFBaUIsR0FBRztZQUNsQyxPQUFPO2VBQ0o7WUFDSCxPQUFPOzs7SUFLZkUsU0FBVSxTQUFTQyxLQUFLQztRQVVwQixJQUFJRCxNQUFNRSxLQUFLQyxJQUFJSDtRQUNuQixJQUFJQyxTQUFT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