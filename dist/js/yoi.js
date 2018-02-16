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
        $placeHolder.one("yoi-viewport-in", function() {
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
            $newImage.on("load", function() {
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
                if ($this.data().props.isParallax) return false;
                $activeParallaxElements = $activeParallaxElements.add($this);
                updateParallaxElement($this);
                $this.data().props.isParallax = true;
            });
            resetScroll();
            if (initialized) return;
            $window.on("yoi-pageheight-change", function() {
                updateParallaxEnv();
                updateParallaxElements($parallaxElement);
            }).on("yoi-scroll", function() {
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
    }
    function updateParallaxElements($parallaxElement) {
        $parallaxElement.each(function() {
            updateParallaxElement($(this));
        });
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
    var $body = $("body");
    var initialized = false;
    var lastBreakPoint;
    var activeBreakPoint;
    var lastPageHeight;
    var currentPageHeight;
    function initialize() {
        if (initialized) return false;
        $window.on("resize", function() {
            reportBreakPointChange();
        });
        $document.ready(function() {
            reportBreakPointChange();
            reportPageHeightChange();
        });
        initialized = true;
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
    function reportPageHeightChange() {
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
            listen();
            if (!initialized) {
                $window.on("load resize yoi-pageheight-change", function() {
                    update();
                });
                $window.on("scroll", function() {
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
            truncate(index);
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
    function truncate(index) {
        var $thisCodeSource = $(".code__source").eq(index);
        var $thisCode = $thisCodeSource.find("code");
        if ($thisCodeSource.hasClass("tabs__page")) return false;
        var $expandBtn = $('<button class="code__expandBtn btn btn--flat btn--light">Expand</button>');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy95b2kuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9kaXNtaXNzLmpzIiwic3JjL2pzL2JlaGF2aW91cnMvbGF6eWxvYWQuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9wYXJhbGxheC5qcyIsInNyYy9qcy9iZWhhdmlvdXJzL3Njcm9sbGZ4LmpzIiwic3JjL2pzL2JlaGF2aW91cnMvc3RpY2t5LmpzIiwic3JjL2pzL2FjdGlvbnMvYmxpbmsuanMiLCJzcmMvanMvYWN0aW9ucy9oaWRlLmpzIiwic3JjL2pzL2FjdGlvbnMvcHVsc2UuanMiLCJzcmMvanMvYWN0aW9ucy9zY3JvbGx0by5qcyIsInNyYy9qcy9hY3Rpb25zL3Nob3cuanMiLCJzcmMvanMvYWN0aW9ucy91cGRhdGUuanMiLCJzcmMvanMvbW9kdWxlcy9icm93c2VyaGlzdG9yeS5qcyIsInNyYy9qcy9tb2R1bGVzL2tleWJvYXJkYWdlbnQuanMiLCJzcmMvanMvbW9kdWxlcy9yZXNpemVhZ2VudC5qcyIsInNyYy9qcy9tb2R1bGVzL3Njcm9sbGFnZW50LmpzIiwic3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbi5qcyIsInNyYy9jb21wb25lbnRzL2NvZGUvY29kZS5qcyIsInNyYy9jb21wb25lbnRzL2NvdW50ZG93bi9jb3VudGRvd24uanMiLCJzcmMvY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXIuanMiLCJzcmMvY29tcG9uZW50cy9kb2NrL2RvY2suanMiLCJzcmMvY29tcG9uZW50cy9maWx0ZXJidG5zL2ZpbHRlcmJ0bnMuanMiLCJzcmMvY29tcG9uZW50cy9mbHlvdXQvZmx5b3V0LmpzIiwic3JjL2NvbXBvbmVudHMvZm9ybS9jdXN0b21mb3JtZWxlbWVudHMuanMiLCJzcmMvY29tcG9uZW50cy9pY29uL2ljb24uanMiLCJzcmMvY29tcG9uZW50cy9pbWdtYWduaWZpZXIvaW1nbWFnbmlmaWVyLmpzIiwic3JjL2NvbXBvbmVudHMvbG9nL2xvZy5qcyIsInNyYy9jb21wb25lbnRzL21heGNoYXJzL21heGNoYXJzLmpzIiwic3JjL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMiLCJzcmMvY29tcG9uZW50cy9wYWdlcmV3aW5kL3BhZ2VyZXdpbmQuanMiLCJzcmMvY29tcG9uZW50cy9waWNrYnRuL3BpY2tidG4uanMiLCJzcmMvY29tcG9uZW50cy9waWVjaGFydC9waWVjaGFydC5qcyIsInNyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5qcyIsInNyYy9jb21wb25lbnRzL3JhbmdlaW5wdXQvcmFuZ2VpbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL3JhdGluZ2lucHV0L3JhdGluZ2lucHV0LmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xsa2V5cy9zY3JvbGxrZXlzLmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xscHJvZ3Jlc3Mvc2Nyb2xscHJvZ3Jlc3MuanMiLCJzcmMvY29tcG9uZW50cy9zbGlkZXIvc2xpZGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3RlcHBlci9zdGVwcGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3dpdGNoL3N3aXRjaC5qcyIsInNyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmpzIiwic3JjL2NvbXBvbmVudHMvdGFicy90YWJzLmpzIiwic3JjL2NvbXBvbmVudHMvdG9nZ2xlZ3JvdXAvdG9nZ2xlZ3JvdXAuanMiLCJzcmMvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuanMiXSwibmFtZXMiOlsiWU9JIiwiZWxlbWVudENvbGxlY3Rpb24iLCJhY3Rpb24iLCJiZWhhdmlvdXIiLCJjb21wb25lbnQiLCJtb2R1bGUiLCJzdHJpbmdDb250YWlucyIsImlucHV0Iiwic2VhcmNoU3RyaW5nIiwiaW5kZXhPZiIsInplcm9QYWQiLCJudW0iLCJkaWdpdHMiLCJNYXRoIiwiYWJzIiwiaSIsImxlYWRpbmdaZXJvcyIsInNsaWNlIiwiZm91bmRNb2R1bGUiLCJ3aW5kb3ciLCJmb3VuZENvbXBvbmVudCIsInNldERlbGF5IiwiZGVsYXlOYW1lIiwiZGVsYXlUaW1lIiwiZGVsYXlGdW5jdGlvbiIsInRoaXMiLCJjbGVhckRlbGF5Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInVuZGVmaW5lZCIsInNldEludGVydmFsIiwiaW50ZXJ2YWxOYW1lIiwiaW50ZXJ2YWxUaW1lIiwiaW50ZXJ2YWxGdW5jdGlvbiIsImNsZWFySW50ZXJ2YWwiLCJ0b09iamVjdCIsImtleVZhbHVlUGFpciIsInByb3Blck9iamVjdCIsInZhbHVlU3RhcnRNYXJrZXIiLCJrZXlWYWx1ZVBhaXJFbmRNYXJrZXIiLCJyZXBsYWNlIiwic3BsaXQiLCJsZW5ndGgiLCJ0cmltIiwidG9Cb29sZWFuIiwidG9Mb3dlckNhc2UiLCJnZXRBdHRyaWJ1dGUiLCIkZWxlbWVudCIsInlvaUF0dHJpYnV0ZVZhbHVlIiwiJCIsImVhY2giLCJhdHRyaWJ1dGVzIiwiaW5kZXgiLCJhdHRyaWJ1dGUiLCJuYW1lIiwibWF0Y2giLCJ2YWx1ZSIsImhpZGUiLCIkdGFyZ2V0IiwialF1ZXJ5IiwiaGFzQ2xhc3MiLCJkYXRhIiwicmVtb3ZlQ2xhc3MiLCJzaG93IiwiaGFzT3duUHJvcGVydHkiLCJhZGRDbGFzcyIsImlzTnVtYmVyIiwiaW5wdXRWYWwiLCJwYXR0ZXJuIiwidGVzdFZhbCIsInRvU3RyaW5nIiwidGVzdCIsIm5vRm9jdXMiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJ0YWdOYW1lIiwidGhyb3R0bGUiLCJ0YXJnZXRGdW5jdGlvbiIsImRlbGF5Iiwic25hcHNob3QiLCJEYXRlIiwibm93IiwidmFsaWRCcmVha3BvaW50Iiwia2V5d29yZCIsInZhbGlkQnJlYWtQb2ludHMiLCJwb3NpdGlvbiIsImluQXJyYXkiLCJlbnZpcm9ubWVudCIsImVudk5hbWUiLCJkZWZhdWx0RW52aXJvbm1lbnQiLCJjdXJyZW50RW52aXJvbm1lbnQiLCJhdHRyIiwibG9jYWxlIiwibGFuZ3VhZ2UiLCJkZWZhdWx0TGFuZ3VhZ2UiLCJjdXJyZW50TGFuZ3VhZ2UiLCJjdXJyZW50QnJlYWtQb2ludCIsImdldENvbXB1dGVkU3R5bGUiLCJib2R5IiwiZ2V0UHJvcGVydHlWYWx1ZSIsImJsaW5rIiwiJGVsZW0iLCJ0aW1lcyIsInN0b3AiLCJhbmltYXRlIiwib3BhY2l0eSIsInB1bHNlIiwic3RhcnREb21PYnNlcnZlciIsIiRkb2N1bWVudCIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIldlYktpdE11dGF0aW9uT2JzZXJ2ZXIiLCJ0YXJnZXQiLCJtdXRhdGlvbnMiLCJmb3JFYWNoIiwibXV0YXRpb24iLCJhZGRlZE5vZGVzIiwidHJpZ2dlciIsInJlbW92ZWROb2RlcyIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiY2hhcmFjdGVyRGF0YSIsInN0b3BEb21PYnNlcnZlciIsImRpc2Nvbm5lY3QiLCJ1cGRhdGVPcHRpb25zIiwib3B0aW9ucyIsImtleSIsInVwZGF0ZVByb3BzIiwicHJvcHMiLCJ1cGRhdGVTdGF0ZSIsInN0YXRlIiwiY3JlYXRlQ29sbGVjdGlvbiIsImlkZW50aWZpZXIiLCIkdGhpcyIsImFkZCIsImJpbmRBY3Rpb24iLCJob29rIiwicGFyYW1zIiwiT2JqZWN0Iiwia2V5cyIsImhvc3RPYmplY3QiLCJwdWJsaWNGdW5jdGlvbiIsImV2ZW50Iiwib24iLCIkdHJpZ2dlciIsInBhcmVudCIsIm1hcCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm1hcEFjdGlvbnMiLCJpcyIsInNldFJlYWR5IiwiaW5pdGlhbGl6ZWQiLCJpc1JlYWR5IiwiaW5pdGlhbGl6ZSIsImluaXQiLCJDb2RlIiwiRGlzbWlzcyIsImxvY2FsaXphdGlvbiIsImVuIiwiYnRuTGFiZWwiLCJkZSIsIiRidG5EaXNtaXNzIiwiJGRpc21pc3NhYmxlRWxlbWVudCIsImlzRGlzbWlzc2FibGUiLCIkdGhpc0Rpc21pc3NhYmxlRWxlbWVudCIsInBvc2l0aW9uU3RhdGljIiwiY3NzIiwiY2xvbmUiLCJkaXNtaXNzIiwiYXBwZW5kVG8iLCIkdGFyZ2V0RWxlbWVudCIsImZhZGVPdXQiLCJMYXp5bG9hZCIsIiRsYXp5bG9hZCIsImlzTGF6eWxvYWRpbmciLCJtYWtlTGF6eWxvYWQiLCIkbm9zY3JpcHRFbGVtZW50IiwiJHBsYWNlSG9sZGVyIiwiZGVmYXVsdEltYWdlIiwic3JjIiwiZXh0cmFjdEltZ1NyY0Zyb21TdHJpbmciLCJodG1sIiwid2lkdGgiLCJoZWlnaHQiLCJhbHQiLCJ0aXRsZSIsImxvbmdkZXNjIiwiY3NzQ2xhc3NlcyIsImluc2VydEFmdGVyIiwibmV4dCIsIlNjcm9sbEFnZW50Iiwib25lIiwiaW1hZ2VVcmwiLCJicmVha1BvaW50U21hbGwiLCJicmVha1BvaW50TWVkaXVtIiwiYnJlYWtQb2ludExhcmdlIiwiYnJlYWtQb2ludFhsYXJnZSIsInNyY1NtYWxsIiwic3JjTWVkaXVtIiwic3JjTGFyZ2UiLCJzcmNYbGFyZ2UiLCIkbmV3SW1hZ2UiLCJjb21wbGV0ZSIsIm91dHB1dCIsIlBhcmFsbGF4IiwiJHdpbmRvdyIsIiRhY3RpdmVQYXJhbGxheEVsZW1lbnRzIiwiY3VycmVudFNjcm9sbFRvcCIsImRlZmF1bHRGYWN0b3IiLCIkcGFyYWxsYXhFbGVtZW50IiwiaXNQYXJhbGxheCIsInVwZGF0ZVBhcmFsbGF4RWxlbWVudCIsInJlc2V0U2Nyb2xsIiwidXBkYXRlUGFyYWxsYXhFbnYiLCJ1cGRhdGVQYXJhbGxheEVsZW1lbnRzIiwic2Nyb2xsUGFyYWxsYXgiLCJzY3JvbGxPdmVyc2hvb3QiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJpbml0aWFsUG9zWSIsImZhY3RvciIsInNjcm9sbFRvcEluVmlld3BvcnQiLCJ2aWV3cG9ydEhlaWdodCIsInBhcmFsbGF4T2Zmc2V0Iiwic3RhcnRzSW5WaWV3cG9ydCIsInBhcnNlSW50Iiwic2Nyb2xsVG9wIiwiU2Nyb2xsRngiLCIkdGhpc1RhcmdldEVsZW1lbnQiLCJoYXNTY3JvbGxGeCIsInByZXBhcmUiLCJsaXN0ZW4iLCJpbkZ4IiwiaW4iLCJjZW50ZXJGeCIsImNlbnRlciIsInNwZWVkIiwicmVwZWF0IiwiYXBwbHlGeCIsImZ4IiwiU3RpY2t5IiwiJGJvZHkiLCIkc3RpY2t5RWxlbWVudCIsIiR0aGlzU3RpY2t5RWxlbWVudCIsIm1hbmlwdWxhdGVEb20iLCJ1cGRhdGVTdGlja3lFbGVtZW50UHJvcHMiLCJwb3NpdGlvbk9ic2VydmVyIiwic3RpY2tPYnNlcnZlciIsIiRzdGlja3lQbGFjZWhvbGRlciIsIiRzdGlja3lXcmFwcGVyIiwic3RpY2t5RWxlbWVudENzc1BvcyIsInN0aWNreUVsZW1lbnRDc3NMZWZ0Iiwic3RpY2t5RWxlbWVudENzc1RvcCIsInRvcCIsImxlZnQiLCJvdXRlcldpZHRoIiwib3V0ZXJIZWlnaHQiLCJkaXNwbGF5Iiwid3JhcCIsIiRyZWZlcmVuY2VFbGVtZW50IiwicmVmZXJlbmNlIiwiZmlyc3QiLCJzdGlja3lFbGVtZW50SGVpZ2h0Iiwic3RpY2t5RWxlbWVudFdpZHRoIiwic3RpY2t5RWxlbWVudEluaXRpYWxUb3BQb3MiLCJvZmZzZXQiLCJ0b3BPZmZzZXQiLCJzdGFydCIsInRvcERpc3RhbmNlIiwic3RpY2tTdGFydCIsInN0aWNrU3RvcCIsInBhc3NlZFZhbGlkYXRpb24iLCJ2YWxpZElucHV0IiwiaW5pdGlhbFRvcFBvcyIsIiRzdGlja3lFbGVtZW50cyIsImNzc1Bvc2l0aW9uVmFsdWUiLCJjc3NUb3BWYWx1ZSIsInN0aWNreVBsYWNlaG9sZGVyRGlzcGxheSIsImJhY2tmYWNlLXZpc2liaWxpdHkiLCJ6LWluZGV4IiwiQmxpbmsiLCJIaWRlIiwicmVtb3ZlIiwic2VsZWN0b3JzIiwidGFyZ2V0U2VsZWN0b3IiLCJjbGFzc05hbWUiLCJqb2luIiwiUHVsc2UiLCJTY3JvbGxUbyIsInNjcm9sbFJvb3QiLCJzY3JvbGxpbmdFbGVtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiJHNjcm9sbENvbnRleHQiLCIkc2Nyb2xsQ29udGFpbmVyIiwiY2xvc2VzdCIsImhpZ2hsaWdodCIsInNjcm9sbFBvc1kiLCJUYWJzIiwic3dpdGNoVG8iLCJ0YXJnZXRJZCIsIndoZW4iLCJkb25lIiwiU2hvdyIsIlVwZGF0ZSIsInJlcXVlc3RUeXBlIiwidHlwZSIsInJlcXVlc3RVcmwiLCJ1cmwiLCJmaWx0ZXIiLCJlcnJvclRpdGxlIiwiZXJyb3JNc2ciLCIkZXJyb3JNc2ciLCIkc3Bpbm5lciIsInRvVXBwZXJDYXNlIiwiYWpheCIsImNhY2hlIiwiYmVmb3JlU2VuZCIsImFwcGVuZCIsImVycm9yIiwic3VjY2VzcyIsIiRyZXNwb25zZSIsIkJyb3dzZXJIaXN0b3J5IiwicHVzaEhhc2giLCJoYXNoU3RyaW5nIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJyZXBsYWNlSGFzaCIsInJlcGxhY2VTdGF0ZSIsImNsZWFySGFzaCIsIktleWJvYXJkQWdlbnQiLCIzOCIsIjM5IiwiNDAiLCIzNyIsIjEzIiwiMzIiLCIyNyIsIjkiLCJrZXlDb2RlIiwid2hpY2giLCJhZGRUYWJGb2N1cyIsIiRlbGVtZW50cyIsIiRhY3RpdmVFbGVtZW50IiwiUmVzaXplYWdlbnQiLCJsYXN0QnJlYWtQb2ludCIsImFjdGl2ZUJyZWFrUG9pbnQiLCJsYXN0UGFnZUhlaWdodCIsImN1cnJlbnRQYWdlSGVpZ2h0IiwicmVwb3J0QnJlYWtQb2ludENoYW5nZSIsInJlYWR5IiwicmVwb3J0UGFnZUhlaWdodENoYW5nZSIsIiRhY3RpdmVUYXJnZXRFbGVtZW50cyIsImxhc3RTY3JvbGxUb3AiLCJ2aWV3cG9ydEluIiwidmlld3BvcnRPdXQiLCJ2aWV3cG9ydENlbnRlciIsInVwZGF0ZSIsImJyb2FkY2FzdCIsInRoaXNIZWlnaHQiLCJ0aGlzSW5pdGlhbFBvc1kiLCJ0cmFuc2Zvcm1ZIiwicGFyc2VGbG9hdCIsIkFjY29yZGlvbiIsImtleWJvYXJkRXZlbnRzQWRkZWQiLCIkYWNjb3JkaW9uIiwiJHRoaXNBY2NvcmRpb24iLCIkdGhpc1NlY3Rpb25zIiwiZmluZCIsImV2ZW50VHlwZSIsIiR0aGlzU2VjdGlvbiIsIiR0aGlzSGVhZGVyIiwiJHRoaXNCb2R5Iiwic2xpZGVVcCIsInRvZ2dsZVNlY3Rpb24iLCJhZGRLZXlib2FyZEV2ZW50cyIsIiRzZWN0aW9uIiwibGlua2VkIiwiY2xvc2VBbGxTZWN0aW9ucyIsIm9wZW5TZWN0aW9uIiwiY2xvc2VTZWN0aW9uIiwic2xpZGVEb3duIiwicHJvbWlzZSIsInRoZW4iLCIkdGFyZ2V0cyIsIm9wZW5BbGxTZWN0aW9ucyIsImNsb3NlIiwib3BlbiIsImNsb3NlQWxsIiwib3BlbkFsbCIsInRvZ2dsZSIsIiRjb2RlV3JhcHBlciIsInRhYlBhZ2VJbmRleCIsIiR0aGlzQ29kZVdyYXBwZXIiLCIkdGhpc0NvZGUiLCJleGFtcGxlVGFnIiwiZXhhbXBsZVRhZ1RhYmJlZCIsInRoaXNFeGFtcGxlIiwidGV4dCIsInRoaXNFeGFtcGxlVGFiYmVkIiwibWFya3VwIiwiZmlyc3RJbmRleCIsInNlY29uZEluZGV4IiwiYWRkQ29weUJ0biIsInJlcGxhY2VXaXRoIiwidHJ1bmNhdGUiLCJjb3B5VG9DbGlwYm9hcmRTdXBwb3J0ZWQiLCJxdWVyeUNvbW1hbmRTdXBwb3J0ZWQiLCIkbWFya3VwIiwiJGNvcHlCdG4iLCIkY29kZVNvdXJjZSIsImNvZGVIYXNSZW5kZXJlZEV4YW1wbGUiLCIkY29kZSIsImNvcHlUb0NsaXBCb2FyZCIsIiRzb3VyY2UiLCJzZWxlY3Rpb24iLCJnZXRTZWxlY3Rpb24iLCJyYW5nZSIsImNyZWF0ZVJhbmdlIiwic2VsZWN0Tm9kZUNvbnRlbnRzIiwiYWRkUmFuZ2UiLCJleGVjQ29tbWFuZCIsInJlbW92ZUFsbFJhbmdlcyIsIiR0aGlzQ29kZVNvdXJjZSIsImVxIiwiJGV4cGFuZEJ0biIsImNvZGVIZWlnaHQiLCJsaW5lSGVpZ2h0IiwibWF4Q29kZUhlaWdodCIsIkNvdW50ZG93biIsImRheXMiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiJGNvdW50ZG93bkNoYXJhY3RlciIsIiRjb3VudGRvd25DaGFyYWN0ZXJMYWJlbCIsIiRjb3VudGRvd25DbG9jayIsIiRjb3VudGRvd24iLCIkdGhpc0NvdW50ZG93biIsImRlZmF1bHRZZWFyIiwiZ2V0RnVsbFllYXIiLCJkZWZhdWx0TW9udGgiLCJkZWZhdWx0RGF5IiwiZGVmYXVsdEhvdXIiLCJkZWZhdWx0TWludXRlIiwiZGVmYXVsdFNlY29uZCIsInllYXIiLCJtb250aCIsImRheSIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJlbmRUaW1lIiwiZ2V0RGF0ZVN0cmluZyIsInJlbmRlciIsInRpbWVSZW1haW5pbmciLCJnZXRUaW1lUmVtYWluaW5nIiwibGNkQ2hhcmFjdGVycyIsImdldExjZENoYXJhY3RlcnNDU1NDbGFzc05hbWVzIiwiJGhpZGRlbkxhYmVsIiwiJHRoaXNDb3VudGRvd25DbG9jayIsInVuaXQiLCIkY291bnRkb3duQ2hhcnMiLCIkY291bnRkb3duTGFiZWwiLCJnZXRDaGFyYWN0ZXJMYWJlbCIsInRvdGFsIiwic2VsZWN0b3IiLCJsYWJlbFR4dCIsIm1vbnRocyIsImVuZFRpbWVJc29TdHJpbmciLCJwYXJzZSIsImZsb29yIiwiY2hhckF0IiwiJGxhYmVsIiwiRGF0ZVBpY2tlciIsIndlZWtEYXlzIiwibW9udGhOYW1lcyIsIiRkYXRlUGlja2VyIiwiJHdlZWtEYXlzSGVhZGVyIiwiJGRhdGVwaWNrZXIiLCJnZXRDdXJyZW50RGF0ZSIsIiR0aGlzRGF0ZUlucHV0IiwiaW5wdXRZZWFyIiwiaW5wdXRNb250aCIsImlucHV0RGF5IiwidXBkYXRlRGF0ZUlucHV0IiwiJHRoaXNEYXRlUGlja2VyIiwicmVuZGVyRGF0ZVBpY2tlciIsIiR0aGlzRGF0ZUlucHV0V3JhcHBlciIsImFmdGVyIiwic3RvcFByb3BhZ2F0aW9uIiwidGhpc0RhdGVJbnB1dFByb3BzIiwicmVuZGVyTW9udGhUYWJsZSIsInNlbGVjdGVkWWVhciIsInNlbGVjdGVkTW9udGgiLCJoaWRlQWxsRGF0ZVBpY2tlcnMiLCJwbGFjZURhdGVQaWNrZXIiLCJ1cGRhdGVEYXRlUGlja2VyIiwic2VsZWN0ZWREYXkiLCJmb3JtYXR0ZWRTZWxlY3RlZERhdGUiLCJ1cGRhdGVNb250aFRhYmxlIiwiJHRoaXNNb250aFRhYmxlIiwiZmlyc3REYXlJbnN0YW5jZSIsImZpcnN0RGF5IiwiZ2V0RGF5IiwidG90YWxEYXlzIiwiZ2V0VG90YWxEYXlzIiwiZm9ybWF0dGVkRGF0ZSIsInZhbCIsIiRtb250aFRhYmxlIiwiJG1vbnRoVGFibGVCb2R5IiwidGhpc01vbnRoVGFibGVQcm9wcyIsInRoaXNEYXRlUGlja2VyUHJvcHMiLCJpbmRleENlbGwiLCJpbmRleERheSIsImNlaWwiLCIkcm93IiwiaiIsIiRjZWxsIiwicGlja0RhdGUiLCIkdGhpc01vbnRoQnV0dG9uIiwiJHRoaXNEYXRlcGlja2VyIiwidGhpc0FjdGlvbiIsInByZXYiLCJmb2N1cyIsIiR0aGlzQ2VsbCIsImN1cnJlbnREYXRlIiwid2Vla0RheSIsImdldERhdGUiLCJnZXRNb250aCIsImFkanVzdFllYXIiLCJnZXRZZWFyIiwiZGF5c0luTW9udGhzIiwiJGRhdGVJbnB1dCIsImRhdGVJbnB1dE9mZnNldFkiLCJkYXRlSW5wdXRIZWlnaHQiLCJkYXRlUGlja2VySGVpZ2h0Iiwidmlld1BvcnRIZWlnaHQiLCJwbGFjZSIsIkRvY2siLCIkZG9jayIsIiR0aGlzRG9jayIsImF1dG9oaWRlIiwiRmlsdGVyQnRucyIsIiRmaWx0ZXJCdG5zIiwiJHRoaXNGaWx0ZXJCdG5zIiwiJHRoaXNCdG4iLCJGbHlvdXQiLCIkZmx5b3V0IiwiJHRoaXNGbHlvdXQiLCJkZXRhY2giLCIkZmx5b3V0SGFuZGxlIiwiQ3VzdG9tRm9ybUVsZW1lbnRzIiwiJGNoZWNrQm94V3JhcHBlciIsIiRyYWRpb0J0bldyYXBwZXIiLCIkc2VsZWN0V3JhcHBlciIsIiRzZWxlY3RJY29uIiwiJGNoZWNrRWxlbW5zIiwiJGNoZWNrQm94ZXMiLCIkcmFkaW9CdG5zIiwiJHNlbGVjdHMiLCIkdGhpc0NoZWNrYm94IiwiaXNXcmFwcGVkSW5MYWJlbCIsInBhcmVudHMiLCJibHVyIiwiY2hhbmdlIiwidG9nZ2xlQ2xhc3MiLCIkdGhpc1JhZGlvQnRuIiwiZ3JvdXBOYW1lIiwiJGdyb3VwZWRCdG5zIiwiJHRoaXNTZWxlY3QiLCIkdGhpc1NlbGVjdFdyYXBwZXIiLCIkdGhpc1NlbGVjdEljb24iLCJyZW1vdmVBdHRyIiwidGhpc1dyYXBwZXIiLCJJY29uIiwiJGljb24iLCIkdGhpc0ljb24iLCIkaWNvblN2ZyIsImljb25DbGFzc05hbWVzIiwic291cmNlIiwiZGF0YVR5cGUiLCJJbWdNYWduaWZpZXIiLCIkY3Vyc29yIiwiJHZpZXdlciIsImRlZmF1bHRTdGFydFZpZXdlckRlbGF5VGltZSIsIiRpbWdNYWduaWZpZXIiLCIkdGhpc0ltZ01hZ25pZmllciIsIiR0aGlzQ3Vyc29yIiwiJHRoaXNWaWV3ZXIiLCJzdGFydFZpZXdlciIsInN0b3BWaWV3ZXIiLCJtb3ZlTWFnbmlmaWVyIiwicmVzZXQiLCJzZXRWaWV3ZXIiLCJzZXRab29tSW1hZ2UiLCJ5UG9zIiwieFBvcyIsImRlc3Ryb3kiLCJvZmYiLCJ0aGlzWm9vbUltYWdlUGF0aCIsInpvb21JbWFnZSIsIiR0aGlzUHJldmlld0ltYWdlIiwidGhpc1pvb21JbWFnZSIsIkltYWdlIiwiJHRoaXNab29tSW1hZ2UiLCJ5UmF0aW8iLCJ4UmF0aW8iLCJzZXRDdXJzb3IiLCJ0aGlzQ3Vyc29yV2l0aCIsInRoaXNDdXJzb3JIZWlnaHQiLCJtYXJnaW5MZWZ0IiwiZmFkZUluIiwiaW1nTWFnbmlmaWVyUHJvcHMiLCJjdXJzb3JQcm9wcyIsInBhZ2VZIiwicGFnZVgiLCJtaW5ZIiwibWF4WSIsIm1pblgiLCJtYXhYIiwiTG9nIiwid3JpdGUiLCIkbG9nIiwibG9nSW5wdXQiLCJtZW1vcnkiLCJ1bnNoaWZ0IiwiJGxvZ0JvZHkiLCJsb2dNZW1vcnkiLCJsb2dPdXRwdXQiLCJjbGVhciIsIk1heENoYXJzIiwiZGVmYXVsdE1heExlbmd0aCIsIiRpbnB1dEVsZW1lbnQiLCIkdGhpc0lucHV0RWxlbWVudCIsImRpc3BsYXlDaGFyc0xlZnQiLCJ1cGRhdGVJbnB1dEVsZW1lbnQiLCJtYXhMZW5ndGgiLCJlcnJvckNsYXNzTmFtZXMiLCJlcnJvckNsYXNzIiwiJGRpc3BsYXlFbGVtZW50IiwiaW5wdXRMZW5ndGgiLCJjaGFyc0xlZnQiLCJNb2RhbCIsIm1vZGFsQWN0aXZlIiwibG9hZGVkTW9kYWxzIiwiYnRuTGFiZWxDbG9zZSIsIiRtb2RhbENvdmVyIiwiJG1vZGFsQ29udGFpbmVyIiwiJG1vZGFsQ2xvc2VCdG4iLCIkbW9kYWxUZW1wbGF0ZSIsIiRtb2RhbFRyaWdnZXIiLCJwcmVwYXJlRG9tIiwiJHRoaXNNb2RhbFRyaWdnZXIiLCJ0aGlzTW9kYWxHZW5lcmF0ZSIsImdlbmVyYXRlIiwidGhpc01vZGFsVGl0bGUiLCJ0aGlzTW9kYWxCb2R5IiwidGhpc01vZGFsSWQiLCJpZCIsInRoaXNNb2RhbE1vZGlmaWVycyIsIm1vZGlmaWVycyIsInRoaXNNb2RhbFBhdGgiLCJwYXRoIiwidGhpc01vZGFsQ2FjaGUiLCJsb2FkIiwiaW5pdGlhbGl6ZUNsb3NlVHJpZ2dlcnMiLCJkb21QcmVwYXJlZCIsImZvdW5kTW9kYWwiLCJtb2RhbElkIiwidHJpZ2dlcnMiLCIkdGhpc01vZGFsIiwiJHRoaXNNb2RhbFRpdGxlIiwiJHRoaXNNb2RhbEJvZHkiLCJwdXNoIiwibW9kYWxQYXRoIiwiY2FsbGJhY2siLCIkbG9hZEJpbiIsInJlc3BvbnNlIiwic3RhdHVzIiwieGhyIiwiJGltYWdlcyIsInRvdGFsSW1hZ2VzIiwiaW1hZ2VDb3VudGVyIiwib3BlbkZhbGxiYWNrTGluayIsIiRtb2RhbCIsIm9mZlNldFkiLCJtb2RhbEZpdHNJbnRvVmlld3BvcnQiLCJtYXJnaW5Ub3AiLCJwcm90b2NvbCIsImhvc3QiLCJQYWdlUmV3aW5kIiwiJHBhZ2VSZXdpbmQiLCJ0aHJlc2hvbGQiLCJlbmFibGVQYWdlUmV3aW5kIiwicnVuIiwic2Nyb2xsIiwiUGlja0J0biIsIiRwaWNrQnRuIiwiJHRoaXNQaWNrQnRuIiwicHJlcGVuZCIsImFjdGl2YXRlIiwiJHJhZGlvSW5wdXQiLCJwcm9wIiwiUGllQ2hhcnQiLCIkY29sb3JEb3QiLCJmaXhlZFBhbGV0dGUiLCIkcGllQ2hhcnQiLCIkdGhpc1BpZUNoYXJ0IiwiJHRoaXNQaWVDaGFydFJlY29yZHMiLCIkdGhpc1BpZUNoYXJ0U3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwic2l6ZSIsInBhbGV0dGUiLCJyb3RhdGlvbiIsInJlY29yZHMiLCJzZXRBdHRyaWJ1dGUiLCIkdGhpc1JlY29yZCIsInRoaXNWYWx1ZSIsImFkZENoYXJ0RGF0YSIsImhpZ2hsaWdodFJlY29yZCIsInJlc2V0SGlnaGxpZ2h0UmVjb3JkIiwiYmxpbmtSZWNvcmQiLCJzZXRGaXhlZFNsaWNlQ29sb3JzIiwic2V0UmFuZG9tU2xpY2VDb2xvcnMiLCJzZXRTbGljZVNoYWRlcyIsInNldFVuaXF1ZVNsaWNlQ29sb3JzIiwiJHRoaXNQYXRocyIsIiR0aGlzQ2lyY2xlcyIsIiR0aGlzRG90cyIsInRvdGFsU2xpY2VzIiwiYmFzZUNvbG9yIiwiSlNPTiIsInN0YXJ0UmFkaXVzIiwic3RhcnRTYXR1cmF0aW9uIiwic3RhcnRMdW1pbmFuY2UiLCJzcGxpdFJhZGl1cyIsInJhZGl1cyIsInJhbmRvbUNvbG9yIiwicmFuZG9tIiwic3BsaXRMdW1pbmFuY2UiLCJsdW1pbmFuY2UiLCIkdGhpc1BpZVNsaWNlIiwibWluIiwibWF4IiwieCIsImNvcyIsIlBJIiwieSIsInNpbiIsImxvbmdBcmMiLCJkIiwidGhpc0luZGV4IiwiJHNsaWNlcyIsInNpYmxpbmdzIiwiZmFkZVRvIiwiJHRoaXNSZWNvcmRzIiwiUG9wT3ZlciIsIiRwb3BPdmVyVHJpZ2dlciIsIiR0aGlzUG9wT3ZlclRyaWdnZXIiLCIkdGhpc1BvcE92ZXIiLCJ2YWxpZEV2ZW50cyIsInByZXZlbnREZWZhdWx0Q2xpY2siLCJldmVudFNob3ciLCJldmVudEhpZGUiLCJoaWRlQWxsIiwicmVtb3ZlVG9nZ2xlQ2xhc3MiLCJzZXRQb3NpdGlvbiIsImNzc0NsYXNzTmFtZSIsInBvcyIsInJlZiIsIlJhbmdlSW5wdXQiLCJrbm9iT2Zmc2V0IiwicmFuZ2VJbnB1dEtub2IiLCJyYW5nZUlucHV0TGFiZWwiLCJyYW5nZUlucHV0VHJhY2siLCIkcmFuZ2VJbnB1dCIsIiR0aGlzUmFuZ2VJbnB1dCIsIiR0aGlzTWluS25vYiIsIiR0aGlzTWF4S25vYiIsIiRzaW5nbGVMYWJlbCIsIiR0aGlzVHJhY2siLCIkdGhpc0tub2IiLCJzdG9yZUN1cnNvclBvcyIsIm1vdmVLbm9iIiwiYWJzTWluIiwiYWJzTWF4IiwibWluVmFsdWUiLCJtYXhWYWx1ZSIsIm9mZnNldFgiLCJtaW5Qb3NYIiwibWF4UG9zWCIsImN1cnNvclBvc1giLCJzZXQiLCJ0aGlzUHJvcHMiLCJ0aGlzQWJzTWluIiwidGhpc0Fic01heCIsImFkanVzdExhYmVscyIsIiR0aGlzTWluTGFiZWwiLCIkdGhpc01heExhYmVsIiwiJHRoaXNTaW5nbGVMYWJlbCIsIm1pbktub2JSaWdodEVkZ2UiLCJtYXhLbm9iTGVmdEVkZ2UiLCJtaW5MYWJlbFdpZHRoIiwibWF4TGFiZWxXaWR0aCIsInNpbmdsZUxhYmVsV2lkdGgiLCIka25vYiIsImVQb3NYIiwibmV3Q3Vyc29yUG9zIiwiJHRoaXNNaW5JbnB1dCIsIiR0aGlzTWF4SW5wdXQiLCJpc01pbktub2IiLCJpc01heEtub2IiLCJwb3NYIiwidGhpc0tub2JWYWx1ZSIsImlucHV0VmFsdWUiLCJjdXJzb3JPZmZzZXQiLCJSYXRpbmdJbnB1dCIsIiRyYXRpbmdTZWxlY3QiLCIkcmF0aW5nSW5wdXQiLCIkdGhpc1JhdGluZ0lucHV0IiwiJHRoaXNSYXRpbmdTZWxlY3QiLCIkdGhpc1JhdGluZ1N0YXJzIiwic2V0U2NvcmUiLCJzdWJtaXRTY29yZSIsImxvY2siLCJ1bmxvY2siLCJzY29yZSIsImdldFNjb3JlRnJvbU1vZGlmaWVyIiwiU2Nyb2xsS2V5cyIsImN1cnJlbnRIb29rIiwidG90YWxIb29rcyIsInNjcm9sbFNwZWVkIiwiJGhvb2tzIiwiJHNjcm9sbEJ1dHRvbnMiLCJlbmFibGVTY3JvbGxLZXlzIiwiaG9va3MiLCJkZXRlY3RDdXJyZW50SG9vayIsInNjcm9sbFRvSG9vayIsImRpcmVjdGlvbiIsInNldEN1cnJlbnRIb29rIiwiaGlnaGxpZ2h0QnRuIiwiYnRuSW5kZXgiLCIkYnRuIiwiU2Nyb2xsUHJvZ3Jlc3MiLCIkc2Nyb2xsUHJvZ3Jlc3NCYXIiLCJkb2N1bWVudEhlaWdodCIsIndpbmRvd0hlaWdodCIsInRvdGFsU2Nyb2xsIiwic2Nyb2xsUG9zaXRpb24iLCJzY3JvbGxQcm9ncmVzcyIsInZpc2libGVTY3JvbGxQcm9ncmVzcyIsImVuYWJsZVNjcm9sbFByb2dyZXNzIiwidmlzaWJsZSIsIlNsaWRlciIsImJ0bkxhYmVsTmV4dCIsImJ0bkxhYmVsUHJldiIsInNsaWRlQ29udHJvbHMiLCJwYWdlQnRucy0tdGwiLCJwYWdlQnRucy0tdHIiLCJwYWdlQnRucy0tYnIiLCJwYWdlQnRucy0tYmwiLCJmbGlwQnRucyIsImZsaXBCdG5zLS1pbnNldCIsInBhZ2VEb3RzIiwicGFnZURvdHMtLWRhcmsiLCJwYWdlRG90cy0tc3VidGxlIiwiJHNsaWRlciIsInNsaWRlckluZGV4IiwiJHRoaXNTbGlkZXIiLCIkdGhpc1NsaWRlcyIsInNsaWRlSW5kZXgiLCJ0b3RhbFNsaWRlcyIsInRyYW5zaXRpb24iLCJhZGp1c3RIZWlnaHQiLCJjb250cm9sIiwidGhpc0NvbnRyb2xzIiwic3RvcEF1dG9wbGF5Iiwic2hvd1NsaWRlIiwiaW5zZXJ0QmVmb3JlIiwicGFnaW5hdGlvbkxpbmtzIiwibGlua0luZGV4IiwiY2xpY2thYmxlIiwibm90IiwiYXV0b3BsYXkiLCJzdGFydEF1dG9wbGF5IiwiYXBwbHlUcmFuc2l0aW9uIiwidXBkYXRlUGFnaW5hdGlvbiIsIm5leHRTbGlkZUluZGV4IiwiY3VycmVudFNsaWRlSW5kZXgiLCJsZWZ0T2Zmc2V0IiwidGhpc1NsaWRlSW5kZXgiLCIkdGhpc1NsaWRlc1dyYXBwZXIiLCJzbGlkZUhlaWdodCIsInRoaXNTbGlkZUhlaWdodCIsIlN0ZXBwZXIiLCJidG5MYWJlbE1vcmUiLCJidG5MYWJlbExlc3MiLCIkc3RlcHBlckJ0bnMiLCIkc3RlcHBlciIsIiR0aGlzU3RlcHBlciIsImluY3JlYXNlSXRlbUNvdW50IiwiZGVjcmVhc2VJdGVtQ291bnQiLCJ2YWxpZGF0ZUlucHV0IiwiY3VycmVudFZhbHVlIiwicmVzZXRJdGVtQ291bnQiLCJzZXRJdGVtQ291bnQiLCJyZW1vdmVFcnJvckZvcm1hdHRpbmciLCJjbGVhckl0ZW1Db3VudCIsImFkZEVycm9yRm9ybWF0dGluZyIsIiR0eHRGaWVsZCIsImNvdW50VXAiLCJjb3VudERvd24iLCJzZXRUbyIsIlN3aXRjaCIsImxhYmVsT24iLCJsYWJlbE9mZiIsIiRsYWJlbE9uIiwiJGxhYmVsT2ZmIiwiJHN3aXRjaCIsIiR0aGlzU3dpdGNoIiwidGhpc0xhYmVsT25UZXh0IiwidGhpc0xhYmVsT2ZmVGV4dCIsInNob3dMYWJlbHMiLCJzZXRPbiIsInNldE9mZiIsInNldFRvZ2dsZSIsIlRhYmxlIiwiJHRhYmxlIiwiJHRoaXNUYWJsZSIsInNlbGVjdGFibGUiLCJiZWZvcmUiLCIkdGhpc1RyIiwic2VsZWN0Um93IiwicmVtb3ZlYWJsZSIsInJlbW92ZVJvdyIsIiR0aGlzQWxsVHIiLCJ1bnNlbGVjdFJvdyIsInRvdGFsVGRzIiwidGFibGVJc0VtcHR5Iiwic2VsZWN0IiwidW5zZWxlY3QiLCIkdGFic01lbnUiLCIkdGhpc1RhYnNNZW51IiwidXJsVGFiSWQiLCJoYXNoIiwiZmlyc3RUYWJJZCIsImhhc2hNYXRjaGVzVGFiIiwiaGFzQWN0aXZlVGFiIiwiaGFzIiwic3RhcnRUYWJJZCIsInRoaXNUYXJnZXRUYWJJZCIsIiR0aGlzVGFic01lbnVJdGVtIiwiJHRoaXNUYWJzTWVudUl0ZW1zIiwiJHRoaXNUYXJnZXRUYWIiLCIkdGhpc01lbnVJdGVtIiwidGFiSWQiLCJUb2dnbGVHcm91cCIsInRvZ2dsZVRhcmdldEdyb3VwSXRlcmF0aW9uIiwicmVzZXRUb2dnbGVEZWxheVRpbWUiLCIkdG9nZ2xlR3JvdXAiLCIkdGhpc1RyaWdnZXIiLCJncm91cCIsImFjdGl2ZUNsYXNzTmFtZSIsIiR0aGlzRmFsbEJhY2tFbGVtIiwiVG9vbHRpcCIsImRlZmF1bHRGYWRlRHVyYXRpb24iLCJkZWZhdWx0U2hvd0RlbGF5IiwiZGVmYXVsdEhpZGVEZWxheSIsIiR0b29sdGlwVHJpZ2dlciIsIiR0aGlzVG9vbHRpcFRyaWdnZXIiLCJzdGF0aWNQb3NpdGlvbiIsImhhc1N0YXRpY1Bvc2l0aW9uIiwiJHRoaXNUb29sdGlwIiwicHJlcGFyZVRvb2x0aXAiLCJzZXRTdGF0aWNQb3NpdGlvbiIsImhpZGVXaXRoRGVsYXkiLCJzaG93V2l0aERlbGF5Iiwic2NvcGUiLCJjcmVhdGVBbmRTaG93VG9vbHRpcCIsImNvbnRlbnQiLCJmYWRlRHVyYXRpb24iLCJ0b29sdGlwVHlwZSIsInRhcmdldEFscmVhZHlQcmVwYXJlZCIsImN1cnNvclkiLCJjdXJzb3JYIiwidG9vbHRpcFdpZHRoIiwidG9vbHRpcEhlaWdodCIsInZpZXdQb3J0V2lkdGgiLCJ0b29sdGlwTGVmdCIsInRvb2x0aXBUb3AiLCJzaG93RGVsYXlEdXJhdGlvbiIsInNob3dEZWxheSIsImhpZGVEZWxheUR1cmF0aW9uIiwiaGlkZURlbGF5IiwiY3JlYXRlIl0sIm1hcHBpbmdzIjoiQUFFQSxJQUFJQTtJQUtBQztJQUNBQztJQUNBQztJQUNBQztJQUNBQztJQUlBQyxnQkFBaUIsU0FBU0MsT0FBT0M7UUFhN0IsS0FBS0QsVUFBVUMsY0FBYyxPQUFPO1FBSXBDLElBQUlELE1BQU1FLFFBQVFELGlCQUFpQixHQUFHO1lBQ2xDLE9BQU87ZUFDSjtZQUNILE9BQU87OztJQUtmRSxTQUFVLFNBQVNDLEtBQUtDO1FBVXBCLElBQUlELE1BQU1FLEtBQUtDLElBQUlIO1FBQ25CLElBQUlDLFNBQVNBLFVBQVU7UUFDdkIsSUFBSUcsSUFBSTtRQUNSLElBQUlDLGVBQWU7UUFFbkIsT0FBT0QsSUFBSUgsUUFBUTtZQUNmRztZQUNBQyxnQkFBZ0I7O1FBR3BCLFFBQVFBLGVBQWVMLEtBQUtNLE9BQU9MLFNBQU87O0lBSTlDTSxhQUFjLFNBQVNiO1FBU25CLFdBQVdjLE9BQU9uQixJQUFJSyxPQUFPQSxZQUFZLFVBQVU7WUFDL0MsT0FBTztlQUNKO1lBQ0gsT0FBTzs7O0lBS2ZlLGdCQUFpQixTQUFT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