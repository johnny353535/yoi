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
        s;
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
            observe();
            listen();
            if (!initialized) {
                $window.on("load resize scroll yoi-pageheight-change", function() {
                    update();
                    observe();
                    listen();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy95b2kuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9kaXNtaXNzLmpzIiwic3JjL2pzL2JlaGF2aW91cnMvbGF6eWxvYWQuanMiLCJzcmMvanMvYmVoYXZpb3Vycy9wYXJhbGxheC5qcyIsInNyYy9qcy9iZWhhdmlvdXJzL3Njcm9sbGZ4LmpzIiwic3JjL2pzL2JlaGF2aW91cnMvc3RpY2t5LmpzIiwic3JjL2pzL2FjdGlvbnMvYmxpbmsuanMiLCJzcmMvanMvYWN0aW9ucy9oaWRlLmpzIiwic3JjL2pzL2FjdGlvbnMvcHVsc2UuanMiLCJzcmMvanMvYWN0aW9ucy9zY3JvbGx0by5qcyIsInNyYy9qcy9hY3Rpb25zL3Nob3cuanMiLCJzcmMvanMvYWN0aW9ucy91cGRhdGUuanMiLCJzcmMvanMvbW9kdWxlcy9icm93c2VyaGlzdG9yeS5qcyIsInNyYy9qcy9tb2R1bGVzL2tleWJvYXJkYWdlbnQuanMiLCJzcmMvanMvbW9kdWxlcy9yZXNpemVhZ2VudC5qcyIsInNyYy9qcy9tb2R1bGVzL3Njcm9sbGFnZW50LmpzIiwic3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbi5qcyIsInNyYy9jb21wb25lbnRzL2NvZGUvY29kZS5qcyIsInNyYy9jb21wb25lbnRzL2NvdW50ZG93bi9jb3VudGRvd24uanMiLCJzcmMvY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGVwaWNrZXIuanMiLCJzcmMvY29tcG9uZW50cy9kb2NrL2RvY2suanMiLCJzcmMvY29tcG9uZW50cy9maWx0ZXJidG5zL2ZpbHRlcmJ0bnMuanMiLCJzcmMvY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlcnMuanMiLCJzcmMvY29tcG9uZW50cy9mbHlvdXQvZmx5b3V0LmpzIiwic3JjL2NvbXBvbmVudHMvZm9ybS9jdXN0b21mb3JtZWxlbWVudHMuanMiLCJzcmMvY29tcG9uZW50cy9pY29uL2ljb24uanMiLCJzcmMvY29tcG9uZW50cy9pbWdtYWduaWZpZXIvaW1nbWFnbmlmaWVyLmpzIiwic3JjL2NvbXBvbmVudHMvbG9nL2xvZy5qcyIsInNyYy9jb21wb25lbnRzL21heGNoYXJzL21heGNoYXJzLmpzIiwic3JjL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMiLCJzcmMvY29tcG9uZW50cy9wYWdlcmV3aW5kL3BhZ2VyZXdpbmQuanMiLCJzcmMvY29tcG9uZW50cy9waWNrYnRuL3BpY2tidG4uanMiLCJzcmMvY29tcG9uZW50cy9waWVjaGFydC9waWVjaGFydC5qcyIsInNyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5qcyIsInNyYy9jb21wb25lbnRzL3JhbmdlaW5wdXQvcmFuZ2VpbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL3JhdGluZ2lucHV0L3JhdGluZ2lucHV0LmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xsa2V5cy9zY3JvbGxrZXlzLmpzIiwic3JjL2NvbXBvbmVudHMvc2Nyb2xscHJvZ3Jlc3Mvc2Nyb2xscHJvZ3Jlc3MuanMiLCJzcmMvY29tcG9uZW50cy9zbGlkZXIvc2xpZGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3RlcHBlci9zdGVwcGVyLmpzIiwic3JjL2NvbXBvbmVudHMvc3dpdGNoL3N3aXRjaC5qcyIsInNyYy9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmpzIiwic3JjL2NvbXBvbmVudHMvdGFicy90YWJzLmpzIiwic3JjL2NvbXBvbmVudHMvdG9nZ2xlZ3JvdXAvdG9nZ2xlZ3JvdXAuanMiLCJzcmMvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAuanMiXSwibmFtZXMiOlsiWU9JIiwiZWxlbWVudENvbGxlY3Rpb24iLCJhY3Rpb24iLCJiZWhhdmlvdXIiLCJjb21wb25lbnQiLCJtb2R1bGUiLCJzdHJpbmdDb250YWlucyIsImlucHV0Iiwic2VhcmNoU3RyaW5nIiwiaW5kZXhPZiIsInplcm9QYWQiLCJudW0iLCJkaWdpdHMiLCJNYXRoIiwiYWJzIiwiaSIsImxlYWRpbmdaZXJvcyIsInNsaWNlIiwiZm91bmRNb2R1bGUiLCJ3aW5kb3ciLCJmb3VuZENvbXBvbmVudCIsInNldERlbGF5IiwiZGVsYXlOYW1lIiwiZGVsYXlUaW1lIiwiZGVsYXlGdW5jdGlvbiIsInRoaXMiLCJjbGVhckRlbGF5Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInVuZGVmaW5lZCIsInNldEludGVydmFsIiwiaW50ZXJ2YWxOYW1lIiwiaW50ZXJ2YWxUaW1lIiwiaW50ZXJ2YWxGdW5jdGlvbiIsImNsZWFySW50ZXJ2YWwiLCJ0b09iamVjdCIsImtleVZhbHVlUGFpciIsInByb3Blck9iamVjdCIsInZhbHVlU3RhcnRNYXJrZXIiLCJrZXlWYWx1ZVBhaXJFbmRNYXJrZXIiLCJyZXBsYWNlIiwic3BsaXQiLCJsZW5ndGgiLCJ0cmltIiwidG9Cb29sZWFuIiwidG9Mb3dlckNhc2UiLCJnZXRBdHRyaWJ1dGUiLCIkZWxlbWVudCIsInlvaUF0dHJpYnV0ZVZhbHVlIiwiJCIsImVhY2giLCJhdHRyaWJ1dGVzIiwiaW5kZXgiLCJhdHRyaWJ1dGUiLCJuYW1lIiwibWF0Y2giLCJ2YWx1ZSIsImhpZGUiLCIkdGFyZ2V0IiwialF1ZXJ5IiwiaGFzQ2xhc3MiLCJkYXRhIiwicmVtb3ZlQ2xhc3MiLCJzaG93IiwiaGFzT3duUHJvcGVydHkiLCJhZGRDbGFzcyIsImlzTnVtYmVyIiwiaW5wdXRWYWwiLCJwYXR0ZXJuIiwidGVzdFZhbCIsInRvU3RyaW5nIiwidGVzdCIsIm5vRm9jdXMiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJ0YWdOYW1lIiwidGhyb3R0bGUiLCJ0YXJnZXRGdW5jdGlvbiIsImRlbGF5Iiwic25hcHNob3QiLCJEYXRlIiwibm93IiwidmFsaWRCcmVha3BvaW50Iiwia2V5d29yZCIsInZhbGlkQnJlYWtQb2ludHMiLCJwb3NpdGlvbiIsImluQXJyYXkiLCJlbnZpcm9ubWVudCIsImVudk5hbWUiLCJkZWZhdWx0RW52aXJvbm1lbnQiLCJjdXJyZW50RW52aXJvbm1lbnQiLCJhdHRyIiwibG9jYWxlIiwibGFuZ3VhZ2UiLCJkZWZhdWx0TGFuZ3VhZ2UiLCJjdXJyZW50TGFuZ3VhZ2UiLCJjdXJyZW50QnJlYWtQb2ludCIsImdldENvbXB1dGVkU3R5bGUiLCJib2R5IiwiZ2V0UHJvcGVydHlWYWx1ZSIsImJsaW5rIiwiJGVsZW0iLCJ0aW1lcyIsInN0b3AiLCJhbmltYXRlIiwib3BhY2l0eSIsInB1bHNlIiwic3RhcnREb21PYnNlcnZlciIsIiRkb2N1bWVudCIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIldlYktpdE11dGF0aW9uT2JzZXJ2ZXIiLCJ0YXJnZXQiLCJtdXRhdGlvbnMiLCJmb3JFYWNoIiwibXV0YXRpb24iLCJhZGRlZE5vZGVzIiwidHJpZ2dlciIsInJlbW92ZWROb2RlcyIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiY2hhcmFjdGVyRGF0YSIsInN0b3BEb21PYnNlcnZlciIsImRpc2Nvbm5lY3QiLCJ1cGRhdGVPcHRpb25zIiwib3B0aW9ucyIsImtleSIsInVwZGF0ZVByb3BzIiwicHJvcHMiLCJ1cGRhdGVTdGF0ZSIsInN0YXRlIiwiY3JlYXRlQ29sbGVjdGlvbiIsImlkZW50aWZpZXIiLCIkdGhpcyIsImFkZCIsImJpbmRBY3Rpb24iLCJob29rIiwicGFyYW1zIiwiT2JqZWN0Iiwia2V5cyIsImhvc3RPYmplY3QiLCJwdWJsaWNGdW5jdGlvbiIsImV2ZW50Iiwib24iLCIkdHJpZ2dlciIsInBhcmVudCIsIm1hcCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm1hcEFjdGlvbnMiLCJpcyIsInNldFJlYWR5IiwiaW5pdGlhbGl6ZWQiLCJpc1JlYWR5IiwiaW5pdGlhbGl6ZSIsImluaXQiLCJDb2RlIiwiRGlzbWlzcyIsImxvY2FsaXphdGlvbiIsImVuIiwiYnRuTGFiZWwiLCJkZSIsIiRidG5EaXNtaXNzIiwiJGRpc21pc3NhYmxlRWxlbWVudCIsImlzRGlzbWlzc2FibGUiLCIkdGhpc0Rpc21pc3NhYmxlRWxlbWVudCIsInBvc2l0aW9uU3RhdGljIiwiY3NzIiwiY2xvbmUiLCJkaXNtaXNzIiwiYXBwZW5kVG8iLCIkdGFyZ2V0RWxlbWVudCIsImZhZGVPdXQiLCJMYXp5bG9hZCIsIiRsYXp5bG9hZCIsImlzTGF6eWxvYWRpbmciLCJtYWtlTGF6eWxvYWQiLCIkbm9zY3JpcHRFbGVtZW50IiwiJHBsYWNlSG9sZGVyIiwiZGVmYXVsdEltYWdlIiwic3JjIiwiZXh0cmFjdEltZ1NyY0Zyb21TdHJpbmciLCJodG1sIiwid2lkdGgiLCJoZWlnaHQiLCJhbHQiLCJ0aXRsZSIsImxvbmdkZXNjIiwiY3NzQ2xhc3NlcyIsImluc2VydEFmdGVyIiwibmV4dCIsIlNjcm9sbEFnZW50IiwicyIsIm9uZSIsImltYWdlVXJsIiwiYnJlYWtQb2ludFNtYWxsIiwiYnJlYWtQb2ludE1lZGl1bSIsImJyZWFrUG9pbnRMYXJnZSIsImJyZWFrUG9pbnRYbGFyZ2UiLCJzcmNTbWFsbCIsInNyY01lZGl1bSIsInNyY0xhcmdlIiwic3JjWGxhcmdlIiwiJG5ld0ltYWdlIiwiY29tcGxldGUiLCJvdXRwdXQiLCJQYXJhbGxheCIsIiR3aW5kb3ciLCIkYWN0aXZlUGFyYWxsYXhFbGVtZW50cyIsImN1cnJlbnRTY3JvbGxUb3AiLCJkZWZhdWx0RmFjdG9yIiwiJHBhcmFsbGF4RWxlbWVudCIsImlzUGFyYWxsYXgiLCJ1cGRhdGVQYXJhbGxheEVsZW1lbnQiLCJyZXNldFNjcm9sbCIsInVwZGF0ZVBhcmFsbGF4RW52IiwidXBkYXRlUGFyYWxsYXhFbGVtZW50cyIsInNjcm9sbFBhcmFsbGF4Iiwic2Nyb2xsT3ZlcnNob290IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaW5pdGlhbFBvc1kiLCJmYWN0b3IiLCJzY3JvbGxUb3BJblZpZXdwb3J0Iiwidmlld3BvcnRIZWlnaHQiLCJwYXJhbGxheE9mZnNldCIsInN0YXJ0c0luVmlld3BvcnQiLCJwYXJzZUludCIsInNjcm9sbFRvcCIsIlNjcm9sbEZ4IiwiJHRoaXNUYXJnZXRFbGVtZW50IiwiaGFzU2Nyb2xsRngiLCJwcmVwYXJlIiwibGlzdGVuIiwiaW5GeCIsImluIiwiY2VudGVyRngiLCJjZW50ZXIiLCJzcGVlZCIsInJlcGVhdCIsImFwcGx5RngiLCJmeCIsIlN0aWNreSIsIiRib2R5IiwiJHN0aWNreUVsZW1lbnQiLCIkdGhpc1N0aWNreUVsZW1lbnQiLCJtYW5pcHVsYXRlRG9tIiwidXBkYXRlU3RpY2t5RWxlbWVudFByb3BzIiwicG9zaXRpb25PYnNlcnZlciIsInN0aWNrT2JzZXJ2ZXIiLCIkc3RpY2t5UGxhY2Vob2xkZXIiLCIkc3RpY2t5V3JhcHBlciIsInN0aWNreUVsZW1lbnRDc3NQb3MiLCJzdGlja3lFbGVtZW50Q3NzTGVmdCIsInN0aWNreUVsZW1lbnRDc3NUb3AiLCJ0b3AiLCJsZWZ0Iiwib3V0ZXJXaWR0aCIsIm91dGVySGVpZ2h0IiwiZGlzcGxheSIsIndyYXAiLCIkcmVmZXJlbmNlRWxlbWVudCIsInJlZmVyZW5jZSIsImZpcnN0Iiwic3RpY2t5RWxlbWVudEhlaWdodCIsInN0aWNreUVsZW1lbnRXaWR0aCIsInN0aWNreUVsZW1lbnRJbml0aWFsVG9wUG9zIiwib2Zmc2V0IiwidG9wT2Zmc2V0Iiwic3RhcnQiLCJ0b3BEaXN0YW5jZSIsInN0aWNrU3RhcnQiLCJzdGlja1N0b3AiLCJwYXNzZWRWYWxpZGF0aW9uIiwidmFsaWRJbnB1dCIsImluaXRpYWxUb3BQb3MiLCIkc3RpY2t5RWxlbWVudHMiLCJjc3NQb3NpdGlvblZhbHVlIiwiY3NzVG9wVmFsdWUiLCJzdGlja3lQbGFjZWhvbGRlckRpc3BsYXkiLCJiYWNrZmFjZS12aXNpYmlsaXR5Iiwiei1pbmRleCIsIkJsaW5rIiwiSGlkZSIsInJlbW92ZSIsInNlbGVjdG9ycyIsInRhcmdldFNlbGVjdG9yIiwiY2xhc3NOYW1lIiwiam9pbiIsIlB1bHNlIiwiU2Nyb2xsVG8iLCJzY3JvbGxSb290Iiwic2Nyb2xsaW5nRWxlbWVudCIsImRvY3VtZW50RWxlbWVudCIsIiRzY3JvbGxDb250ZXh0IiwiJHNjcm9sbENvbnRhaW5lciIsImNsb3Nlc3QiLCJoaWdobGlnaHQiLCJzY3JvbGxQb3NZIiwiVGFicyIsInN3aXRjaFRvIiwidGFyZ2V0SWQiLCJ3aGVuIiwiZG9uZSIsIlNob3ciLCJVcGRhdGUiLCJyZXF1ZXN0VHlwZSIsInR5cGUiLCJyZXF1ZXN0VXJsIiwidXJsIiwiZmlsdGVyIiwiZXJyb3JUaXRsZSIsImVycm9yTXNnIiwiJGVycm9yTXNnIiwiJHNwaW5uZXIiLCJ0b1VwcGVyQ2FzZSIsImFqYXgiLCJjYWNoZSIsImJlZm9yZVNlbmQiLCJhcHBlbmQiLCJlcnJvciIsInN1Y2Nlc3MiLCIkcmVzcG9uc2UiLCJCcm93c2VySGlzdG9yeSIsInB1c2hIYXNoIiwiaGFzaFN0cmluZyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicmVwbGFjZUhhc2giLCJyZXBsYWNlU3RhdGUiLCJjbGVhckhhc2giLCJLZXlib2FyZEFnZW50IiwiMzgiLCIzOSIsIjQwIiwiMzciLCIxMyIsIjMyIiwiMjciLCI5Iiwia2V5Q29kZSIsIndoaWNoIiwiYWRkVGFiRm9jdXMiLCIkZWxlbWVudHMiLCIkYWN0aXZlRWxlbWVudCIsIlJlc2l6ZWFnZW50IiwibGFzdEJyZWFrUG9pbnQiLCJhY3RpdmVCcmVha1BvaW50IiwibGFzdFBhZ2VIZWlnaHQiLCJjdXJyZW50UGFnZUhlaWdodCIsInJlcG9ydEJyZWFrUG9pbnRDaGFuZ2UiLCJyZWFkeSIsInJlcG9ydFBhZ2VIZWlnaHRDaGFuZ2UiLCIkYWN0aXZlVGFyZ2V0RWxlbWVudHMiLCJsYXN0U2Nyb2xsVG9wIiwidmlld3BvcnRJbiIsInZpZXdwb3J0T3V0Iiwidmlld3BvcnRDZW50ZXIiLCJ1cGRhdGUiLCJicm9hZGNhc3QiLCJ0aGlzSGVpZ2h0IiwidGhpc0luaXRpYWxQb3NZIiwidHJhbnNmb3JtWSIsInBhcnNlRmxvYXQiLCJBY2NvcmRpb24iLCJrZXlib2FyZEV2ZW50c0FkZGVkIiwiJGFjY29yZGlvbiIsIiR0aGlzQWNjb3JkaW9uIiwiJHRoaXNTZWN0aW9ucyIsImZpbmQiLCJldmVudFR5cGUiLCIkdGhpc1NlY3Rpb24iLCIkdGhpc0hlYWRlciIsIiR0aGlzQm9keSIsInNsaWRlVXAiLCJ0b2dnbGVTZWN0aW9uIiwiYWRkS2V5Ym9hcmRFdmVudHMiLCIkc2VjdGlvbiIsImxpbmtlZCIsImNsb3NlQWxsU2VjdGlvbnMiLCJvcGVuU2VjdGlvbiIsImNsb3NlU2VjdGlvbiIsInNsaWRlRG93biIsInByb21pc2UiLCJ0aGVuIiwiJHRhcmdldHMiLCJvcGVuQWxsU2VjdGlvbnMiLCJjbG9zZSIsIm9wZW4iLCJjbG9zZUFsbCIsIm9wZW5BbGwiLCJ0b2dnbGUiLCIkY29kZVdyYXBwZXIiLCJ0YWJQYWdlSW5kZXgiLCIkdGhpc0NvZGVXcmFwcGVyIiwiJHRoaXNDb2RlIiwiZXhhbXBsZVRhZyIsImV4YW1wbGVUYWdUYWJiZWQiLCJ0aGlzRXhhbXBsZSIsInRleHQiLCJ0aGlzRXhhbXBsZVRhYmJlZCIsIm1hcmt1cCIsImZpcnN0SW5kZXgiLCJzZWNvbmRJbmRleCIsImFkZENvcHlCdG4iLCJyZXBsYWNlV2l0aCIsImNvcHlUb0NsaXBib2FyZFN1cHBvcnRlZCIsInF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCIsIiRtYXJrdXAiLCIkY29weUJ0biIsIiRjb2RlU291cmNlIiwiY29kZUhhc1JlbmRlcmVkRXhhbXBsZSIsIiRjb2RlIiwiY29weVRvQ2xpcEJvYXJkIiwiJHNvdXJjZSIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsInJhbmdlIiwiY3JlYXRlUmFuZ2UiLCJzZWxlY3ROb2RlQ29udGVudHMiLCJhZGRSYW5nZSIsImV4ZWNDb21tYW5kIiwicmVtb3ZlQWxsUmFuZ2VzIiwiQ291bnRkb3duIiwiZGF5cyIsImhvdXJzIiwibWludXRlcyIsInNlY29uZHMiLCIkY291bnRkb3duQ2hhcmFjdGVyIiwiJGNvdW50ZG93bkNoYXJhY3RlckxhYmVsIiwiJGNvdW50ZG93bkNsb2NrIiwiJGNvdW50ZG93biIsIiR0aGlzQ291bnRkb3duIiwiZGVmYXVsdFllYXIiLCJnZXRGdWxsWWVhciIsImRlZmF1bHRNb250aCIsImRlZmF1bHREYXkiLCJkZWZhdWx0SG91ciIsImRlZmF1bHRNaW51dGUiLCJkZWZhdWx0U2Vjb25kIiwieWVhciIsIm1vbnRoIiwiZGF5IiwiaG91ciIsIm1pbnV0ZSIsInNlY29uZCIsImVuZFRpbWUiLCJnZXREYXRlU3RyaW5nIiwicmVuZGVyIiwidGltZVJlbWFpbmluZyIsImdldFRpbWVSZW1haW5pbmciLCJsY2RDaGFyYWN0ZXJzIiwiZ2V0TGNkQ2hhcmFjdGVyc0NTU0NsYXNzTmFtZXMiLCIkaGlkZGVuTGFiZWwiLCIkdGhpc0NvdW50ZG93bkNsb2NrIiwidW5pdCIsIiRjb3VudGRvd25DaGFycyIsIiRjb3VudGRvd25MYWJlbCIsImdldENoYXJhY3RlckxhYmVsIiwidG90YWwiLCJzZWxlY3RvciIsImVxIiwibGFiZWxUeHQiLCJtb250aHMiLCJlbmRUaW1lSXNvU3RyaW5nIiwicGFyc2UiLCJmbG9vciIsImNoYXJBdCIsIiRsYWJlbCIsIkRhdGVQaWNrZXIiLCJ3ZWVrRGF5cyIsIm1vbnRoTmFtZXMiLCIkZGF0ZVBpY2tlciIsIiR3ZWVrRGF5c0hlYWRlciIsIiRkYXRlcGlja2VyIiwiZ2V0Q3VycmVudERhdGUiLCIkdGhpc0RhdGVJbnB1dCIsImlucHV0WWVhciIsImlucHV0TW9udGgiLCJpbnB1dERheSIsInVwZGF0ZURhdGVJbnB1dCIsIiR0aGlzRGF0ZVBpY2tlciIsInJlbmRlckRhdGVQaWNrZXIiLCIkdGhpc0RhdGVJbnB1dFdyYXBwZXIiLCJhZnRlciIsInN0b3BQcm9wYWdhdGlvbiIsInRoaXNEYXRlSW5wdXRQcm9wcyIsInJlbmRlck1vbnRoVGFibGUiLCJzZWxlY3RlZFllYXIiLCJzZWxlY3RlZE1vbnRoIiwiaGlkZUFsbERhdGVQaWNrZXJzIiwicGxhY2VEYXRlUGlja2VyIiwidXBkYXRlRGF0ZVBpY2tlciIsInNlbGVjdGVkRGF5IiwiZm9ybWF0dGVkU2VsZWN0ZWREYXRlIiwidXBkYXRlTW9udGhUYWJsZSIsIiR0aGlzTW9udGhUYWJsZSIsImZpcnN0RGF5SW5zdGFuY2UiLCJmaXJzdERheSIsImdldERheSIsInRvdGFsRGF5cyIsImdldFRvdGFsRGF5cyIsImZvcm1hdHRlZERhdGUiLCJ2YWwiLCIkbW9udGhUYWJsZSIsIiRtb250aFRhYmxlQm9keSIsInRoaXNNb250aFRhYmxlUHJvcHMiLCJ0aGlzRGF0ZVBpY2tlclByb3BzIiwiaW5kZXhDZWxsIiwiaW5kZXhEYXkiLCJjZWlsIiwiJHJvdyIsImoiLCIkY2VsbCIsInBpY2tEYXRlIiwiJHRoaXNNb250aEJ1dHRvbiIsIiR0aGlzRGF0ZXBpY2tlciIsInRoaXNBY3Rpb24iLCJwcmV2IiwiZm9jdXMiLCIkdGhpc0NlbGwiLCJjdXJyZW50RGF0ZSIsIndlZWtEYXkiLCJnZXREYXRlIiwiZ2V0TW9udGgiLCJhZGp1c3RZZWFyIiwiZ2V0WWVhciIsImRheXNJbk1vbnRocyIsIiRkYXRlSW5wdXQiLCJkYXRlSW5wdXRPZmZzZXRZIiwiZGF0ZUlucHV0SGVpZ2h0IiwiZGF0ZVBpY2tlckhlaWdodCIsInZpZXdQb3J0SGVpZ2h0IiwicGxhY2UiLCJEb2NrIiwiJGRvY2siLCIkdGhpc0RvY2siLCJhdXRvaGlkZSIsIkZpbHRlckJ0bnMiLCIkZmlsdGVyQnRucyIsIiR0aGlzRmlsdGVyQnRucyIsIiR0aGlzQnRuIiwiRmlsdGVycyIsImZpbHRlckdyb3VwTWF4SGVpZ2h0IiwiYnRuTGFiZWxSZXNldCIsIiRyZXNldEJ0biIsIiRmaWx0ZXJzIiwiJHRoaXNGaWx0ZXJzIiwiJHRoaXNGaWx0ZXJHcm91cHMiLCIkdGhpc0ZpbHRlckdyb3VwSGVhZGVycyIsIiR0aGlzRmlsdGVyc011bHRpIiwiJHRoaXNGaWx0ZXJzU2luZ2xlIiwidXBkYXRlQWxsRmlsdGVyR3JvdXBzIiwiJHRoaXNGaWx0ZXJHcm91cCIsImFib3ZlTWF4SGVpZ2h0IiwiaXNTY3JvbGwiLCJpc0NvbGxhcHNlZCIsImNvbGxhcHNlRmlsdGVyR3JvdXAiLCJ0b2dnbGVGaWx0ZXJHcm91cCIsIiR0aGlzRmlsdGVyIiwidG9nZ2xlRmlsdGVyIiwicmVzZXQiLCJyZW1vdmVSZXNldEJ0biIsImFkZFJlc2V0QnRuIiwiJHRoaXNGaWx0ZXJzRmlsdGVycyIsIiR0aGlzRmlsdGVyR3JvdXBCb2R5IiwiZXhwYW5kRmlsdGVyR3JvdXAiLCJ0b2dnbGVDbGFzcyIsImhhc0FjdGl2ZUZpbHRlcnMiLCJoYXNSZXNldEJ0biIsInByZXBlbmRUbyIsImRldGFjaCIsImhhc1NoYWRvdyIsIkZseW91dCIsIiRmbHlvdXQiLCIkdGhpc0ZseW91dCIsIiRmbHlvdXRIYW5kbGUiLCJDdXN0b21Gb3JtRWxlbWVudHMiLCIkY2hlY2tCb3hXcmFwcGVyIiwiJHJhZGlvQnRuV3JhcHBlciIsIiRzZWxlY3RXcmFwcGVyIiwiJHNlbGVjdEljb24iLCIkY2hlY2tFbGVtbnMiLCIkY2hlY2tCb3hlcyIsIiRyYWRpb0J0bnMiLCIkc2VsZWN0cyIsIiR0aGlzQ2hlY2tib3giLCJpc1dyYXBwZWRJbkxhYmVsIiwicGFyZW50cyIsImJsdXIiLCJjaGFuZ2UiLCIkdGhpc1JhZGlvQnRuIiwiZ3JvdXBOYW1lIiwiJGdyb3VwZWRCdG5zIiwiJHRoaXNTZWxlY3QiLCIkdGhpc1NlbGVjdFdyYXBwZXIiLCIkdGhpc1NlbGVjdEljb24iLCJyZW1vdmVBdHRyIiwidGhpc1dyYXBwZXIiLCJJY29uIiwiJGljb24iLCIkdGhpc0ljb24iLCIkaWNvblN2ZyIsImljb25DbGFzc05hbWVzIiwic291cmNlIiwiZGF0YVR5cGUiLCJJbWdNYWduaWZpZXIiLCIkY3Vyc29yIiwiJHZpZXdlciIsImRlZmF1bHRTdGFydFZpZXdlckRlbGF5VGltZSIsIiRpbWdNYWduaWZpZXIiLCIkdGhpc0ltZ01hZ25pZmllciIsIiR0aGlzQ3Vyc29yIiwiJHRoaXNWaWV3ZXIiLCJzdGFydFZpZXdlciIsInN0b3BWaWV3ZXIiLCJtb3ZlTWFnbmlmaWVyIiwic2V0Vmlld2VyIiwic2V0Wm9vbUltYWdlIiwieVBvcyIsInhQb3MiLCJkZXN0cm95Iiwib2ZmIiwidGhpc1pvb21JbWFnZVBhdGgiLCJ6b29tSW1hZ2UiLCIkdGhpc1ByZXZpZXdJbWFnZSIsInRoaXNab29tSW1hZ2UiLCJJbWFnZSIsIiR0aGlzWm9vbUltYWdlIiwieVJhdGlvIiwieFJhdGlvIiwic2V0Q3Vyc29yIiwidGhpc0N1cnNvcldpdGgiLCJ0aGlzQ3Vyc29ySGVpZ2h0IiwibWFyZ2luTGVmdCIsImZhZGVJbiIsImltZ01hZ25pZmllclByb3BzIiwiY3Vyc29yUHJvcHMiLCJwYWdlWSIsInBhZ2VYIiwibWluWSIsIm1heFkiLCJtaW5YIiwibWF4WCIsIkxvZyIsIndyaXRlIiwiJGxvZyIsImxvZ0lucHV0IiwibWVtb3J5IiwidW5zaGlmdCIsIiRsb2dCb2R5IiwibG9nTWVtb3J5IiwibG9nT3V0cHV0IiwiY2xlYXIiLCJNYXhDaGFycyIsImRlZmF1bHRNYXhMZW5ndGgiLCIkaW5wdXRFbGVtZW50IiwiJHRoaXNJbnB1dEVsZW1lbnQiLCJkaXNwbGF5Q2hhcnNMZWZ0IiwidXBkYXRlSW5wdXRFbGVtZW50IiwibWF4TGVuZ3RoIiwiZXJyb3JDbGFzc05hbWVzIiwiZXJyb3JDbGFzcyIsIiRkaXNwbGF5RWxlbWVudCIsImlucHV0TGVuZ3RoIiwiY2hhcnNMZWZ0IiwiTW9kYWwiLCJtb2RhbEFjdGl2ZSIsImxvYWRlZE1vZGFscyIsImJ0bkxhYmVsQ2xvc2UiLCIkbW9kYWxDb3ZlciIsIiRtb2RhbENvbnRhaW5lciIsIiRtb2RhbENsb3NlQnRuIiwiJG1vZGFsVGVtcGxhdGUiLCIkbW9kYWxUcmlnZ2VyIiwicHJlcGFyZURvbSIsIiR0aGlzTW9kYWxUcmlnZ2VyIiwidGhpc01vZGFsR2VuZXJhdGUiLCJnZW5lcmF0ZSIsInRoaXNNb2RhbFRpdGxlIiwidGhpc01vZGFsQm9keSIsInRoaXNNb2RhbElkIiwiaWQiLCJ0aGlzTW9kYWxNb2RpZmllcnMiLCJtb2RpZmllcnMiLCJ0aGlzTW9kYWxQYXRoIiwicGF0aCIsInRoaXNNb2RhbENhY2hlIiwibG9hZCIsImluaXRpYWxpemVDbG9zZVRyaWdnZXJzIiwiZG9tUHJlcGFyZWQiLCJmb3VuZE1vZGFsIiwibW9kYWxJZCIsInRyaWdnZXJzIiwiJHRoaXNNb2RhbCIsIiR0aGlzTW9kYWxUaXRsZSIsIiR0aGlzTW9kYWxCb2R5IiwicHVzaCIsIm1vZGFsUGF0aCIsImNhbGxiYWNrIiwiJGxvYWRCaW4iLCJyZXNwb25zZSIsInN0YXR1cyIsInhociIsIiRpbWFnZXMiLCJ0b3RhbEltYWdlcyIsImltYWdlQ291bnRlciIsIm9wZW5GYWxsYmFja0xpbmsiLCIkbW9kYWwiLCJvZmZTZXRZIiwibW9kYWxGaXRzSW50b1ZpZXdwb3J0IiwibWFyZ2luVG9wIiwicHJvdG9jb2wiLCJob3N0IiwiUGFnZVJld2luZCIsIiRwYWdlUmV3aW5kIiwidGhyZXNob2xkIiwiZW5hYmxlUGFnZVJld2luZCIsInJ1biIsInNjcm9sbCIsIlBpY2tCdG4iLCIkcGlja0J0biIsIiR0aGlzUGlja0J0biIsInByZXBlbmQiLCJhY3RpdmF0ZSIsIiRyYWRpb0lucHV0IiwicHJvcCIsIlBpZUNoYXJ0IiwiJGNvbG9yRG90IiwiZml4ZWRQYWxldHRlIiwiJHBpZUNoYXJ0IiwiJHRoaXNQaWVDaGFydCIsIiR0aGlzUGllQ2hhcnRSZWNvcmRzIiwiJHRoaXNQaWVDaGFydFN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsInNpemUiLCJwYWxldHRlIiwicm90YXRpb24iLCJyZWNvcmRzIiwic2V0QXR0cmlidXRlIiwiJHRoaXNSZWNvcmQiLCJ0aGlzVmFsdWUiLCJhZGRDaGFydERhdGEiLCJoaWdobGlnaHRSZWNvcmQiLCJyZXNldEhpZ2hsaWdodFJlY29yZCIsImJsaW5rUmVjb3JkIiwic2V0Rml4ZWRTbGljZUNvbG9ycyIsInNldFJhbmRvbVNsaWNlQ29sb3JzIiwic2V0U2xpY2VTaGFkZXMiLCJzZXRVbmlxdWVTbGljZUNvbG9ycyIsIiR0aGlzUGF0aHMiLCIkdGhpc0NpcmNsZXMiLCIkdGhpc0RvdHMiLCJ0b3RhbFNsaWNlcyIsImJhc2VDb2xvciIsIkpTT04iLCJzdGFydFJhZGl1cyIsInN0YXJ0U2F0dXJhdGlvbiIsInN0YXJ0THVtaW5hbmNlIiwic3BsaXRSYWRpdXMiLCJyYWRpdXMiLCJyYW5kb21Db2xvciIsInJhbmRvbSIsInNwbGl0THVtaW5hbmNlIiwibHVtaW5hbmNlIiwiJHRoaXNQaWVTbGljZSIsIm1pbiIsIm1heCIsIngiLCJjb3MiLCJQSSIsInkiLCJzaW4iLCJsb25nQXJjIiwiZCIsInRoaXNJbmRleCIsIiRzbGljZXMiLCJzaWJsaW5ncyIsImZhZGVUbyIsIiR0aGlzUmVjb3JkcyIsIlBvcE92ZXIiLCIkcG9wT3ZlclRyaWdnZXIiLCIkdGhpc1BvcE92ZXJUcmlnZ2VyIiwiJHRoaXNQb3BPdmVyIiwidmFsaWRFdmVudHMiLCJwcmV2ZW50RGVmYXVsdENsaWNrIiwiZXZlbnRTaG93IiwiZXZlbnRIaWRlIiwiaGlkZUFsbCIsInJlbW92ZVRvZ2dsZUNsYXNzIiwic2V0UG9zaXRpb24iLCJjc3NDbGFzc05hbWUiLCJwb3MiLCJyZWYiLCJSYW5nZUlucHV0Iiwia25vYk9mZnNldCIsInJhbmdlSW5wdXRLbm9iIiwicmFuZ2VJbnB1dExhYmVsIiwicmFuZ2VJbnB1dFRyYWNrIiwiJHJhbmdlSW5wdXQiLCIkdGhpc1JhbmdlSW5wdXQiLCIkdGhpc01pbktub2IiLCIkdGhpc01heEtub2IiLCIkc2luZ2xlTGFiZWwiLCIkdGhpc1RyYWNrIiwiJHRoaXNLbm9iIiwic3RvcmVDdXJzb3JQb3MiLCJtb3ZlS25vYiIsImFic01pbiIsImFic01heCIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJvZmZzZXRYIiwibWluUG9zWCIsIm1heFBvc1giLCJjdXJzb3JQb3NYIiwic2V0IiwidGhpc1Byb3BzIiwidGhpc0Fic01pbiIsInRoaXNBYnNNYXgiLCJhZGp1c3RMYWJlbHMiLCIkdGhpc01pbkxhYmVsIiwiJHRoaXNNYXhMYWJlbCIsIiR0aGlzU2luZ2xlTGFiZWwiLCJtaW5Lbm9iUmlnaHRFZGdlIiwibWF4S25vYkxlZnRFZGdlIiwibWluTGFiZWxXaWR0aCIsIm1heExhYmVsV2lkdGgiLCJzaW5nbGVMYWJlbFdpZHRoIiwiJGtub2IiLCJlUG9zWCIsIm5ld0N1cnNvclBvcyIsIiR0aGlzTWluSW5wdXQiLCIkdGhpc01heElucHV0IiwiaXNNaW5Lbm9iIiwiaXNNYXhLbm9iIiwicG9zWCIsInRoaXNLbm9iVmFsdWUiLCJpbnB1dFZhbHVlIiwiY3Vyc29yT2Zmc2V0IiwiUmF0aW5nSW5wdXQiLCIkcmF0aW5nU2VsZWN0IiwiJHJhdGluZ0lucHV0IiwiJHRoaXNSYXRpbmdJbnB1dCIsIiR0aGlzUmF0aW5nU2VsZWN0IiwiJHRoaXNSYXRpbmdTdGFycyIsInNldFNjb3JlIiwic3VibWl0U2NvcmUiLCJsb2NrIiwidW5sb2NrIiwic2NvcmUiLCJnZXRTY29yZUZyb21Nb2RpZmllciIsIlNjcm9sbEtleXMiLCJjdXJyZW50SG9vayIsInRvdGFsSG9va3MiLCJzY3JvbGxTcGVlZCIsIiRob29rcyIsIiRzY3JvbGxCdXR0b25zIiwiZW5hYmxlU2Nyb2xsS2V5cyIsImhvb2tzIiwiZGV0ZWN0Q3VycmVudEhvb2siLCJzY3JvbGxUb0hvb2siLCJkaXJlY3Rpb24iLCJzZXRDdXJyZW50SG9vayIsImhpZ2hsaWdodEJ0biIsImJ0bkluZGV4IiwiJGJ0biIsIlNjcm9sbFByb2dyZXNzIiwiJHNjcm9sbFByb2dyZXNzQmFyIiwiZG9jdW1lbnRIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJ0b3RhbFNjcm9sbCIsInNjcm9sbFBvc2l0aW9uIiwic2Nyb2xsUHJvZ3Jlc3MiLCJ2aXNpYmxlU2Nyb2xsUHJvZ3Jlc3MiLCJlbmFibGVTY3JvbGxQcm9ncmVzcyIsInZpc2libGUiLCJTbGlkZXIiLCJidG5MYWJlbE5leHQiLCJidG5MYWJlbFByZXYiLCJzbGlkZUNvbnRyb2xzIiwicGFnZUJ0bnMtLXRsIiwicGFnZUJ0bnMtLXRyIiwicGFnZUJ0bnMtLWJyIiwicGFnZUJ0bnMtLWJsIiwiZmxpcEJ0bnMiLCJmbGlwQnRucy0taW5zZXQiLCJwYWdlRG90cyIsInBhZ2VEb3RzLS1kYXJrIiwicGFnZURvdHMtLXN1YnRsZSIsIiRzbGlkZXIiLCJzbGlkZXJJbmRleCIsIiR0aGlzU2xpZGVyIiwiJHRoaXNTbGlkZXMiLCJzbGlkZUluZGV4IiwidG90YWxTbGlkZXMiLCJ0cmFuc2l0aW9uIiwiYWRqdXN0SGVpZ2h0IiwiY29udHJvbCIsInRoaXNDb250cm9scyIsInN0b3BBdXRvcGxheSIsInNob3dTbGlkZSIsImluc2VydEJlZm9yZSIsInBhZ2luYXRpb25MaW5rcyIsImxpbmtJbmRleCIsImNsaWNrYWJsZSIsIm5vdCIsImF1dG9wbGF5Iiwic3RhcnRBdXRvcGxheSIsImFwcGx5VHJhbnNpdGlvbiIsInVwZGF0ZVBhZ2luYXRpb24iLCJuZXh0U2xpZGVJbmRleCIsImN1cnJlbnRTbGlkZUluZGV4IiwibGVmdE9mZnNldCIsInRoaXNTbGlkZUluZGV4IiwiJHRoaXNTbGlkZXNXcmFwcGVyIiwic2xpZGVIZWlnaHQiLCJ0aGlzU2xpZGVIZWlnaHQiLCJTdGVwcGVyIiwiYnRuTGFiZWxNb3JlIiwiYnRuTGFiZWxMZXNzIiwiJHN0ZXBwZXJCdG5zIiwiJHN0ZXBwZXIiLCIkdGhpc1N0ZXBwZXIiLCJpbmNyZWFzZUl0ZW1Db3VudCIsImRlY3JlYXNlSXRlbUNvdW50IiwidmFsaWRhdGVJbnB1dCIsImN1cnJlbnRWYWx1ZSIsInJlc2V0SXRlbUNvdW50Iiwic2V0SXRlbUNvdW50IiwicmVtb3ZlRXJyb3JGb3JtYXR0aW5nIiwiY2xlYXJJdGVtQ291bnQiLCJhZGRFcnJvckZvcm1hdHRpbmciLCIkdHh0RmllbGQiLCJjb3VudFVwIiwiY291bnREb3duIiwic2V0VG8iLCJTd2l0Y2giLCJsYWJlbE9uIiwibGFiZWxPZmYiLCIkbGFiZWxPbiIsIiRsYWJlbE9mZiIsIiRzd2l0Y2giLCIkdGhpc1N3aXRjaCIsInRoaXNMYWJlbE9uVGV4dCIsInRoaXNMYWJlbE9mZlRleHQiLCJzaG93TGFiZWxzIiwic2V0T24iLCJzZXRPZmYiLCJzZXRUb2dnbGUiLCJUYWJsZSIsIiR0YWJsZSIsIiR0aGlzVGFibGUiLCJzZWxlY3RhYmxlIiwiYmVmb3JlIiwiJHRoaXNUciIsInNlbGVjdFJvdyIsInJlbW92ZWFibGUiLCJyZW1vdmVSb3ciLCIkdGhpc0FsbFRyIiwidW5zZWxlY3RSb3ciLCJ0b3RhbFRkcyIsInRhYmxlSXNFbXB0eSIsInNlbGVjdCIsInVuc2VsZWN0IiwiJHRhYnNNZW51IiwiJHRoaXNUYWJzTWVudSIsInVybFRhYklkIiwiaGFzaCIsImZpcnN0VGFiSWQiLCJoYXNoTWF0Y2hlc1RhYiIsImhhc0FjdGl2ZVRhYiIsImhhcyIsInN0YXJ0VGFiSWQiLCJ0aGlzVGFyZ2V0VGFiSWQiLCIkdGhpc1RhYnNNZW51SXRlbSIsIiR0aGlzVGFic01lbnVJdGVtcyIsIiR0aGlzVGFyZ2V0VGFiIiwiJHRoaXNNZW51SXRlbSIsInRhYklkIiwiVG9nZ2xlR3JvdXAiLCJ0b2dnbGVUYXJnZXRHcm91cEl0ZXJhdGlvbiIsInJlc2V0VG9nZ2xlRGVsYXlUaW1lIiwiJHRvZ2dsZUdyb3VwIiwiJHRoaXNUcmlnZ2VyIiwiZ3JvdXAiLCJhY3RpdmVDbGFzc05hbWUiLCIkdGhpc0ZhbGxCYWNrRWxlbSIsIlRvb2x0aXAiLCJkZWZhdWx0RmFkZUR1cmF0aW9uIiwiZGVmYXVsdFNob3dEZWxheSIsImRlZmF1bHRIaWRlRGVsYXkiLCIkdG9vbHRpcFRyaWdnZXIiLCIkdGhpc1Rvb2x0aXBUcmlnZ2VyIiwic3RhdGljUG9zaXRpb24iLCJoYXNTdGF0aWNQb3NpdGlvbiIsIiR0aGlzVG9vbHRpcCIsInByZXBhcmVUb29sdGlwIiwic2V0U3RhdGljUG9zaXRpb24iLCJoaWRlV2l0aERlbGF5Iiwic2hvd1dpdGhEZWxheSIsInNjb3BlIiwiY3JlYXRlQW5kU2hvd1Rvb2x0aXAiLCJjb250ZW50IiwiZmFkZUR1cmF0aW9uIiwidG9vbHRpcFR5cGUiLCJ0YXJnZXRBbHJlYWR5UHJlcGFyZWQiLCJjdXJzb3JZIiwiY3Vyc29yWCIsInRvb2x0aXBXaWR0aCIsInRvb2x0aXBIZWlnaHQiLCJ2aWV3UG9ydFdpZHRoIiwidG9vbHRpcExlZnQiLCJ0b29sdGlwVG9wIiwic2hvd0RlbGF5RHVyYXRpb24iLCJzaG93RGVsYXkiLCJoaWRlRGVsYXlEdXJhdGlvbiIsImhpZGVEZWxheSIsImNyZWF0ZSJdLCJtYXBwaW5ncyI6IkFBRUEsSUFBSUE7SUFLQUM7SUFDQUM7SUFDQUM7SUFDQUM7SUFDQUM7SUFJQUMsZ0JBQWlCLFNBQVNDLE9BQU9DO1FBYTdCLEtBQUtELFVBQVVDLGNBQWMsT0FBTztRQUlwQyxJQUFJRCxNQUFNRSxRQUFRRCxpQkFBaUIsR0FBRztZQUNsQyxPQUFPO2VBQ0o7WUFDSCxPQUFPOzs7SUFLZkUsU0FBVSxTQUFTQyxLQUFLQztRQVVwQixJQUFJRCxNQUFNRSxLQUFLQyxJQUFJSDtRQUNuQixJQUFJQyxTQUFTQSxVQUFVO1FBQ3ZCLElBQUlHLElBQUk7UUFDUixJQUFJQyxlQUFlO1FBRW5CLE9BQU9ELElBQUlILFFBQVE7WUFDZkc7WUFDQUMsZ0JBQWdCOztRQUdwQixRQUFRQSxlQUFlTCxLQUFLTSxPQUFPTCxTQUFPOztJQUk5Q00sYUFBYyxTQUFTYjtRQVNuQixXQUFXYyxPQUFPbkIsSUFBSUssT0FBT0EsWUFBWSxVQUFVO1lBQy9DLE9BQU87ZUFDSjtZQUNILE9BQU87OztJQUtmZSxnQkFBaUIsU0FBU2hCO1FBU3RCLFdBQVdlLE9BQU9uQixJQUFJSSxVQUFVQSxlQUFlLFVBQVU7WUFDckQsT0FBTztlQUNKO1lBQ0gsT0FBTzs7O0lBS2ZpQixVQUFXLFNBQVNDLFdBQVdDLFdBQVdDO1FBWXRDQyxLQUFLQyxXQUFXSjtRQUloQkgsT0FBT0csYUFBYUgsT0FBT1EsV0FBVztZQUNsQztXQUNESjs7SUFJUEcsWUFBYSxTQUFTSjtRQVNsQixXQUFXSCxPQUFPRyxlQUFlLFVBQVU7WUFDdkNILE9BQU9TLGFBQWFULE9BQU9HO1lBQzNCSCxPQUFPRyxhQUFhTzs7O0lBSzVCQyxhQUFjLFNBQVNDLGNBQWNDLGNBQWNDO1FBWS9DUixLQUFLUyxjQUFjSDtRQUluQlosT0FBT1ksZ0JBQWdCWixPQUFPVyxZQUFZO1lBQ3RDO1dBQ0RFOztJQUlQRSxlQUFnQixTQUFTSDtRQVFyQixXQUFXWixPQUFPWSxrQkFBa0IsVUFBVTtZQUMxQ1osT0FBT2UsY0FBY2YsT0FBT1k7WUFDNUJaLE9BQU9ZLGdCQUFnQkY7OztJQUsvQk0sVUFBVyxTQUFTNUI7UUEyQmhCLElBQUk2QjtRQUNKLElBQUlDO1FBRUosSUFBSXJDLElBQUlNLGVBQWVDLE9BQU8sUUFBUVAsSUFBSU0sZUFBZUMsT0FBTyxNQUFNO1lBSWxFLElBQUkrQjtZQUNKLElBQUlDO1lBRUosSUFBSXZDLElBQUlNLGVBQWVDLE9BQU8sUUFBUVAsSUFBSU0sZUFBZUMsT0FBTyxNQUFNO2dCQUtsRStCLG1CQUF3QjtnQkFDeEJDLHdCQUF3QjttQkFFckI7Z0JBSUhELG1CQUF3QjtnQkFDeEJDLHdCQUF3Qjs7WUFPNUJoQyxTQUFTQSxTQUFTLElBQUlpQyxRQUFRLFFBQU8sS0FBS0MsTUFBTUY7WUFLaEQsS0FBSyxJQUFJeEIsSUFBSSxHQUFHQSxJQUFJUixNQUFNbUMsU0FBUyxHQUFHM0IsS0FBSztnQkFJdkNxQixlQUFlN0IsTUFBTVEsR0FBRzBCLE1BQU1IO2dCQUU5QixJQUFJRixhQUFhTSxXQUFXLEdBQUc7b0JBSzNCTCxhQUFhLFlBQVk5QixNQUFNO3VCQUU1QixJQUFJNkIsYUFBYU0sV0FBVyxHQUFHO29CQUlsQ0wsYUFBYUQsYUFBYSxHQUFHTyxVQUFVUCxhQUFhLEdBQUdPOzs7WUFNL0QsT0FBT047ZUFFSjtZQUVILE9BQU87OztJQU1mTyxXQUFZLFNBQVNyQztRQVdqQixLQUFLQSxPQUFPLE9BQU87UUFFbkIsUUFBUUEsTUFBTXNDO1VBQ1YsS0FBSztVQUNMLEtBQUs7VUFDTCxLQUFLO1VBQ0wsS0FBSztZQUNELE9BQU87O1VBQ1g7WUFDSSxPQUFPOzs7SUFLbkJDLGNBQWUsU0FBU0M7UUFVcEIsSUFBSUM7UUFFSkMsRUFBRUMsS0FBS0gsU0FBUyxHQUFHSSxZQUFZLFNBQVNDLE9BQU9DO1lBQzNDLElBQUlBLFVBQVVDLEtBQUtDLE1BQU0sVUFBVTtnQkFDL0JQLG9CQUFvQkssVUFBVUc7Z0JBQzlCLE9BQU87OztRQUlmLE9BQU9SOztJQUlYUyxNQUFPLFNBQVNDO1FBWVosTUFBTUEsbUJBQW1CQyxTQUFTO1lBQzlCLE9BQU87O1FBS1gsSUFBSUQsUUFBUUUsU0FBUyxZQUFZO1lBQzdCRixRQUFRRyxLQUFLLHVCQUF1QjtlQUNqQyxJQUFJSCxRQUFRRSxTQUFTLGFBQWE7WUFDckNGLFFBQVFHLEtBQUssdUJBQXVCO2VBQ2pDLElBQUlILFFBQVFFLFNBQVMsa0JBQWtCO1lBQzFDRixRQUFRRyxLQUFLLHVCQUF1Qjs7UUFLeENILFFBQVFJLFlBQVk7UUFJcEJKLFFBQVFEOztJQUlaTSxNQUFPLFNBQVNMO1FBV1osTUFBTUEsbUJBQW1CQyxTQUFTO1lBQzlCLE9BQU87O1FBR1gsS0FBS0QsUUFBUUcsT0FBT0csZUFBZSx3QkFBd0I7WUFLdkROLFFBQVFLO2VBRUw7WUFLSEwsUUFBUU8sU0FBU1AsUUFBUUcsS0FBSzs7O0lBTXRDSyxVQUFXLFNBQVNDO1FBUWhCLElBQUlDLFVBQVU7UUFDZCxJQUFJQztRQUlKLFdBQVdGLGFBQWEsVUFBVTtZQUM5QkUsVUFBVUYsU0FBU0c7ZUFDaEI7WUFDSEQsVUFBVUY7O1FBS2QsT0FBT0MsUUFBUUcsS0FBS0Y7O0lBSXhCRyxTQUFVO1FBU04sT0FBT0MsU0FBU0MsY0FBY0MsWUFBWTs7SUFJOUNDLFVBQVcsU0FBU0MsZ0JBQWdCQztRQVdoQyxJQUFJQyxXQUFXQyxLQUFLQztRQUVwQixPQUFPO1lBQ0gsSUFBS0YsV0FBV0QsUUFBUUUsS0FBS0MsUUFBUyxHQUFHO2dCQUNyQ0o7Z0JBQ0FFLFdBQVdDLEtBQUtDOzs7O0lBTTVCQyxpQkFBa0IsU0FBU0M7UUFVdkIsSUFBSUMscUJBQ0EsU0FDQSxVQUNBLFNBQ0E7UUFHSixJQUFJQyxXQUFXcEMsRUFBRXFDLFFBQVFILFNBQVNDO1FBRWxDLE9BQVFDLFlBQVk7O0lBTXhCRSxhQUFjLFNBQVNDO1FBWW5CLElBQUlDLHFCQUFxQjtRQUN6QixJQUFJQyxxQkFBcUJ6QyxFQUFFLFFBQVEwQyxLQUFLLHNCQUFzQkY7UUFFOUQsS0FBS0QsU0FBUztZQUNWLE9BQU9FO2VBQ0o7WUFDSCxPQUFPekMsRUFBRSxRQUFRMEMsS0FBSyx1QkFBdUJIOzs7SUFLckRJLFFBQVMsU0FBU0M7UUFZZCxJQUFJQyxrQkFBa0I7UUFDdEIsSUFBSUMsa0JBQWtCOUMsRUFBRSxRQUFRMEMsS0FBSyxXQUFXRztRQUVoRCxLQUFLRCxVQUFVO1lBQ1gsT0FBT0U7ZUFDSjtZQUNILE9BQU85QyxFQUFFLFFBQVEwQyxLQUFLLFlBQVlFOzs7SUFLMUNHLG1CQUFvQjtRQVFoQixPQUFPN0UsT0FBTzhFLGlCQUFpQnhCLFNBQVN5QixNQUFLLFVBQVVDLGlCQUFpQixXQUFXM0QsUUFBUSxPQUFPOztJQU10RzRELE9BQVEsU0FBU0MsT0FBT0M7UUFZcEIsTUFBTUQsaUJBQWlCMUMsU0FBUyxPQUFPO1FBSXZDLElBQUkyQyxRQUFRQSxTQUFTO1FBSXJCRCxNQUFNRSxLQUFLLE1BQU07UUFJakIsS0FBSyxJQUFJeEYsSUFBSSxHQUFHQSxJQUFJdUYsT0FBT3ZGLEtBQUs7WUFDNUJzRixNQUNLRztnQkFBVUMsU0FBUztlQUFLLEtBQ3hCRDtnQkFBVUMsU0FBUztlQUFLOzs7SUFLckNDLE9BQVEsU0FBU0wsT0FBT0M7UUFZcEIsTUFBTUQsaUJBQWlCMUMsU0FBUyxPQUFPO1FBSXZDLElBQUkyQyxRQUFRQSxTQUFTO1FBSXJCRCxNQUFNRSxLQUFLLE1BQU07UUFJakIsS0FBSyxJQUFJeEYsSUFBSSxHQUFHQSxJQUFJdUYsT0FBT3ZGLEtBQUs7WUFDNUJzRixNQUNLRztnQkFBVUMsU0FBUztlQUFNLEtBQ3pCRDtnQkFBVUMsU0FBVTtlQUFLOzs7SUFPdENFLGtCQUFtQjtRQU1mLElBQUlDLFlBQVkzRCxFQUFFd0I7UUFDbEIsSUFBSW9DLFdBQVkxRixPQUFPMkYsb0JBQW9CM0YsT0FBTzRGO1FBQ2xELElBQUlDLFNBQVl2QyxTQUFTeUI7UUFFekJsRyxJQUFJNkcsV0FBVyxJQUFJQSxTQUFTLFNBQVNJO1lBQ2pDQSxVQUFVQyxRQUFRLFNBQVNDO2dCQUV2QixJQUFJQSxTQUFTQyxXQUFXMUUsUUFBUTtvQkFDNUJrRSxVQUFVUyxRQUFROztnQkFLdEIsSUFBSUYsU0FBU0csYUFBYTVFLFFBQVE7b0JBQzlCa0UsVUFBVVMsUUFBUTs7OztRQVE5QnJILElBQUk2RyxTQUFTVSxRQUFRUDtZQUNqQlEsU0FBZ0I7WUFDaEJyRSxZQUFnQjtZQUNoQnNFLFdBQWdCO1lBQ2hCQyxlQUFnQjs7O0lBS3hCQyxpQkFBa0I7UUFNZCxJQUFJM0gsSUFBSWdFLGVBQWUsYUFBYTtZQUNoQ2hFLElBQUk2RyxTQUFTZTs7O0lBT3JCQyxlQUFnQixTQUFTOUUsVUFBVStFO1FBYS9CLEtBQUsvRSxTQUFTYyxPQUFPRyxlQUFlLFlBQVk7WUFDNUNqQixTQUFTYyxPQUFPaUU7O1FBTXBCLEtBQUtBLFNBQVM7WUFDVixJQUFJQSxVQUFVOUgsSUFBSW1DLFNBQVNuQyxJQUFJOEMsYUFBYUM7O1FBTWhELFdBQVcrRSxZQUFZLFVBQVU7WUFDN0I3RSxFQUFFQyxLQUFLNEUsU0FBUyxTQUFTQyxLQUFLdkU7Z0JBQzFCVCxTQUFTYyxPQUFPaUUsUUFBUUMsT0FBT3ZFOzs7O0lBTTNDd0UsYUFBYyxTQUFTakYsVUFBVWtGO1FBYzdCLEtBQUtsRixTQUFTYyxPQUFPRyxlQUFlLFVBQVU7WUFDMUNqQixTQUFTYyxPQUFPb0U7O1FBTXBCLFdBQVdBLFVBQVUsVUFBVTtZQUMzQmhGLEVBQUVDLEtBQUsrRSxPQUFPLFNBQVNGLEtBQUt2RTtnQkFDeEJULFNBQVNjLE9BQU9vRSxNQUFNRixPQUFPdkU7OztRQUlyQyxPQUFPVCxTQUFTYyxPQUFPb0U7O0lBSTNCQyxhQUFjLFNBQVNuRixVQUFVb0Y7UUFhN0IsS0FBS3BGLFNBQVNjLE9BQU9HLGVBQWUsVUFBVTtZQUMxQ2pCLFNBQVNjLE9BQU9zRSxRQUFROztRQU01QixXQUFXQSxVQUFVLFVBQVU7WUFDM0JwRixTQUFTYyxPQUFPc0UsUUFBUUE7O1FBRzVCLE9BQU9wRixTQUFTYyxPQUFPc0U7O0lBSTNCQyxrQkFBbUIsU0FBU0MsWUFBWXRGLFVBQVUrRSxTQUFTSyxPQUFPRjtRQWU5RCxLQUFLakksSUFBSUMsa0JBQWtCb0ksYUFBYTtZQUNwQ3JJLElBQUlDLGtCQUFrQm9JLGNBQWNwRjs7UUFHeEMsTUFBTUYsb0JBQW9CWSxTQUFTO1lBSy9CM0QsSUFBSUMsa0JBQWtCb0ksY0FBY3BGLEVBQUUsVUFBVW9GLGFBQWE7WUFJN0QsS0FBS3JJLElBQUlDLGtCQUFrQm9JLFlBQVkzRixRQUFRLE9BQU87WUFJdEQxQyxJQUFJQyxrQkFBa0JvSSxZQUFZbkYsS0FBSztnQkFFbkMsSUFBSW9GLFFBQVFyRixFQUFFeEI7Z0JBRWR6QixJQUFJNkgsY0FBY1MsT0FBT1I7Z0JBQ3pCOUgsSUFBSWtJLFlBQVlJLE9BQU9IO2dCQUN2Qm5JLElBQUlnSSxZQUFZTSxPQUFPTDs7ZUFJeEIsSUFBSWxGLG9CQUFvQlksUUFBUTtZQUtuQzNELElBQUk2SCxjQUFjOUUsVUFBVStFO1lBQzVCOUgsSUFBSWtJLFlBQVluRixVQUFVb0Y7WUFDMUJuSSxJQUFJZ0ksWUFBWWpGLFVBQVVrRjtZQUUxQmpJLElBQUlDLGtCQUFrQm9JLGNBQWNySSxJQUFJQyxrQkFBa0JvSSxZQUFZRSxJQUFJeEY7O1FBSTlFLE9BQU8vQyxJQUFJQyxrQkFBa0JvSTs7SUFNakNHLFlBQVksU0FBU3pGLFVBQVUwRjtRQVkzQixJQUFJMUYsU0FBU2MsT0FBT29FLE1BQU1qRSxlQUFleUUsT0FBTyxPQUFPO1FBTXZELElBQUlDLFNBQWlCMUksSUFBSW1DLFNBQVNZLFNBQVM0QyxLQUFLOEM7UUFDaEQsSUFBSXZJLFNBQWlCd0ksT0FBTyxhQUFhQyxPQUFPQyxLQUFLRixRQUFRLE1BQU07UUFDbkUsSUFBSUcsYUFBaUIzSSxPQUFPdUMsTUFBTSxLQUFLLE1BQU07UUFDN0MsSUFBSXFHLGlCQUFpQjVJLE9BQU91QyxNQUFNLEtBQUssTUFBTTtRQUM3QyxJQUFJc0csUUFBaUJMLE9BQU9NLE1BQU07UUFDbEMsSUFBSWxCO1FBQ0osSUFBSXBFLFVBQWlCVCxFQUFFeUYsT0FBT3hJO1FBQzlCLElBQUkrSSxXQUFpQlAsT0FBTzFFLGVBQWUsYUFBYWYsRUFBRXlGLE9BQU9yQixXQUFXdEU7UUFJNUUsUUFBUTJGLE9BQU94STtVQUtYLEtBQUs7WUFDRHdELFVBQVVYO1lBQ1Y7O1VBS0osS0FBSztZQUNEVyxVQUFVWCxTQUFTbUc7WUFDbkI7O1FBTVIsV0FBV1IsV0FBVyxVQUFVO1lBQzVCekYsRUFBRWtHLElBQUlULFFBQVEsU0FBU2xGLE9BQU91RTtnQkFDMUIsSUFBSUEsUUFBUTdILFVBQVU2SCxRQUFRLE1BQU07b0JBQ2hDRCxRQUFRQyxPQUFPdkU7Ozs7UUFPM0IsSUFBS3FGLGNBQWNDLHlCQUEwQjlJLElBQUksYUFBYTZJLFlBQVlDLG9CQUFvQixZQUFZO1lBQ3RHRyxTQUFTRCxHQUFHRCxPQUFPLFNBQVNLO2dCQUN4QkEsRUFBRUM7Z0JBQ0ZySixJQUFJLGFBQWE2SSxZQUFZQyxnQkFBZ0JwRjs7O1FBTXJELFdBQVcxRCxJQUFJLFVBQVVFLFlBQVksWUFBWTtZQUM3QytJLFNBQVNELEdBQUdELE9BQU8sU0FBU0s7Z0JBQ3hCQSxFQUFFQztnQkFDRnJKLElBQUksVUFBVUUsUUFBUStJLFVBQVV2RixTQUFTb0U7OztRQU1qRC9FLFNBQVNjLE9BQU9vRSxNQUFNUSxRQUFROztJQUlsQ2EsWUFBYTtRQU9UckcsRUFBRSxnRkFBZ0ZDLEtBQUs7WUFFbkYsSUFBSW9GLFFBQVFyRixFQUFFeEI7WUFJZHpCLElBQUlnSSxZQUFZTTtZQUloQixJQUFJQSxNQUFNaUIsR0FBRyxpQkFBbUJ2SixJQUFJd0ksV0FBV0YsT0FBTztZQUN0RCxJQUFJQSxNQUFNaUIsR0FBRyxtQkFBbUJ2SixJQUFJd0ksV0FBV0YsT0FBTztZQUN0RCxJQUFJQSxNQUFNaUIsR0FBRyxtQkFBbUJ2SixJQUFJd0ksV0FBV0YsT0FBTztZQUN0RCxJQUFJQSxNQUFNaUIsR0FBRyxtQkFBbUJ2SixJQUFJd0ksV0FBV0YsT0FBTztZQUN0RCxJQUFJQSxNQUFNaUIsR0FBRyxtQkFBbUJ2SixJQUFJd0ksV0FBV0YsT0FBTzs7O0lBUTlEa0IsVUFBVyxTQUFTekc7UUFRaEJBLFNBQVNjLE9BQU80RixjQUFjOztJQUlsQ0MsU0FBVSxTQUFTM0c7UUFTZixJQUFJb0Y7UUFFSixJQUFJcEYsU0FBU2MsT0FBTzRGLGFBQWE7WUFDN0J0QixRQUFRO2VBQ0w7WUFDSEEsUUFBUTs7UUFHWixPQUFPQTs7SUFJWHdCLFlBQWE7UUFRVDFHLEVBQUVDLEtBQUtsRCxJQUFJSSxXQUFXO1lBQ2xCLElBQUlxQixLQUFLdUMsZUFBZSxTQUFTdkMsS0FBS21JOztRQUsxQzNHLEVBQUVDLEtBQUtsRCxJQUFJRSxRQUFRO1lBQ2YsSUFBSXVCLEtBQUt1QyxlQUFlLFNBQVN2QyxLQUFLbUk7O1FBSzFDM0csRUFBRUMsS0FBS2xELElBQUlHLFdBQVc7WUFDbEIsSUFBSXNCLEtBQUt1QyxlQUFlLFNBQVN2QyxLQUFLbUk7O1FBSzFDM0csRUFBRUMsS0FBS2xELElBQUlLLFFBQVE7WUFDZixJQUFJb0IsS0FBS3VDLGVBQWUsU0FBU3ZDLEtBQUttSTs7UUFLMUM1SixJQUFJc0o7Ozs7QUFXWnJHLEVBQUU7SUFPRSxJQUFJakQsSUFBSUksVUFBVXlKLE1BQU03SixJQUFJSSxVQUFVeUosS0FBS0Y7SUFJM0MzSixJQUFJMko7OztBQ3IrQlIzSixJQUFJRyxVQUFVMkosVUFBVTtJQU9wQixJQUFJakUsV0FBVzdGLElBQUk0RjtJQUVuQixJQUFJbUU7UUFDQUM7WUFDSUMsVUFBYTs7UUFFakJDO1lBQ0lELFVBQWE7OztJQU1yQixJQUFJRSxjQUFjbEgsRUFBRSxzQ0FDYThHLGFBQWFsRSxVQUFVLGNBQWM7SUFNdEUsU0FBUzhELFdBQVdTLHFCQUFxQnRDO1FBU3JDLElBQUlzQyxzQkFBc0JwSyxJQUFJb0ksaUJBQWlCLFdBQVdnQyxxQkFBcUJ0QztRQUUvRSxJQUFJc0MscUJBQXFCQSxvQkFBb0JsSCxLQUFLO1lBSTlDLElBQUlELEVBQUV4QixNQUFNb0MsT0FBT29FLE1BQU1vQyxlQUFlLE9BQU87WUFJL0MsSUFBSUMsMEJBQTBCckgsRUFBRXhCO1lBQ2hDLElBQUk4SSxpQkFBMEJELHdCQUF3QkUsSUFBSSxnQkFBZ0I7WUFDMUUsSUFBSTFDLFVBQTBCQSxXQUFXd0Msd0JBQXdCekcsT0FBT2lFO1lBS3hFLElBQUl5QyxnQkFBZ0JELHdCQUF3QkUsSUFBSSxZQUFXO1lBSTNETCxZQUNLTSxRQUNBekIsR0FBRyxTQUFTLFNBQVNJO2dCQUNsQkEsRUFBRUM7Z0JBQ0ZxQixRQUFRekgsRUFBRXhCLE1BQU15SDtlQUVuQnlCLFNBQVNMO1lBSWRySCxFQUFFeEIsTUFBTW9DLE9BQU9vRSxNQUFNb0MsZ0JBQWdCOzs7SUFNN0MsU0FBU0ssUUFBUUU7UUFRYixNQUFNQSwwQkFBMEJqSCxTQUFTLE9BQU87UUFFaERpSCxlQUFlQyxRQUFRO1lBQ25CRCxlQUFldkQsUUFBUTs7O0lBUS9CO1FBQ0l1QyxNQUFPRDs7OztBQzdGZjNKLElBQUlHLFVBQVUySyxXQUFXO0lBUXJCLFNBQVNuQixXQUFXb0IsV0FBV2pEO1FBdUIzQixJQUFJaUQsWUFBWS9LLElBQUlvSSxpQkFBaUIsWUFBWTJDLFdBQVdqRDtRQUU1RCxJQUFJaUQsV0FBV0EsVUFBVTdILEtBQUs7WUFJMUIsSUFBSUQsRUFBRXhCLE1BQU1vQyxPQUFPb0UsTUFBTStDLGVBQWUsT0FBTztZQUkvQ0MsYUFBYWhJLEVBQUV4QjtZQUlmd0IsRUFBRXhCLE1BQU1vQyxPQUFPb0UsTUFBTStDLGdCQUFnQjs7O0lBTTdDLFNBQVNDLGFBQWFDO1FBUWxCLElBQUlDLGVBQWdCbEksRUFBRTtRQUN0QixJQUFJNkUsVUFBZ0JvRCxpQkFBaUJySCxPQUFPaUU7UUFDNUMsSUFBSXNELGVBQWdCdEQsUUFBUXVELE9BQU9DLHdCQUF3QkosaUJBQWlCSyxXQUFXO1FBQ3ZGLElBQUlDLFFBQWdCMUQsUUFBUTBELFNBQVM7UUFDckMsSUFBSUMsU0FBZ0IzRCxRQUFRMkQsVUFBVTtRQUN0QyxJQUFJQyxNQUFnQjVELFFBQVE0RCxPQUFPO1FBQ25DLElBQUlDLFFBQWdCN0QsUUFBUTZELFNBQVM7UUFDckMsSUFBSUMsV0FBZ0I5RCxRQUFROEQsWUFBWTtRQUN4QyxJQUFJQyxhQUFnQi9ELFFBQVErRCxjQUFjO1FBTTFDLEtBQUtULGlCQUFpQnBMLElBQUlrQixZQUFZLGdCQUFnQjtZQUNsRCxPQUFPOztRQU1YaUssYUFBYVcsWUFBWVo7UUFDekJDLGVBQWVELGlCQUFpQmEsS0FBSztRQUNyQy9MLElBQUlLLE9BQU8yTCxZQUFZcEMsS0FBS3VCO1FBSzVCLElBQUlLLE9BQVlMLGFBQWF4RixLQUFLLFNBQVM2RjtRQUMzQyxJQUFJQyxRQUFZTixhQUFheEYsS0FBSyxVQUFVOEY7UUFDNUMsSUFBSUksWUFBWVYsYUFBYWxILFNBQVM0SDtRQUM5Q0k7UUFHUWQsYUFBYWUsSUFBSSxtQkFBbUI7WUFJaEMsSUFBSUM7WUFFSixJQUFJbkcsb0JBQW9CaEcsSUFBSWdHO1lBQzVCLElBQUlvRyxrQkFBb0JwTSxJQUFJTSxlQUFlMEYsbUJBQW1CO1lBQzlELElBQUlxRyxtQkFBb0JyTSxJQUFJTSxlQUFlMEYsbUJBQW1CO1lBQzlELElBQUlzRyxrQkFBb0J0TSxJQUFJTSxlQUFlMEYsbUJBQW1CO1lBQzlELElBQUl1RyxtQkFBb0J2TSxJQUFJTSxlQUFlMEYsbUJBQW1CO1lBRTlELElBQUlvRyxpQkFBa0JELFdBQVdyRSxRQUFRMEU7WUFDekMsSUFBSUgsa0JBQWtCRixXQUFXckUsUUFBUTJFO1lBQ3pDLElBQUlILGlCQUFrQkgsV0FBV3JFLFFBQVE0RTtZQUN6QyxJQUFJSCxrQkFBa0JKLFdBQVdyRSxRQUFRNkU7WUFJekNSLFdBQVdBLFlBQVlmO1lBSXZCLElBQUl3QixZQUFZM0osRUFBRTtZQUlsQixJQUFJdUksT0FBWW9CLFVBQVVqSCxLQUFLLFNBQVM2RjtZQUN4QyxJQUFJQyxRQUFZbUIsVUFBVWpILEtBQUssVUFBVThGO1lBQ3pDLElBQUlDLEtBQVlrQixVQUFVakgsS0FBSyxPQUFPK0Y7WUFDdEMsSUFBSUMsT0FBWWlCLFVBQVVqSCxLQUFLLFNBQVNnRztZQUN4QyxJQUFJQyxVQUFZZ0IsVUFBVWpILEtBQUssWUFBWWlHO1lBQzNDLElBQUlDLFlBQVllLFVBQVUzSSxTQUFTNEg7WUFJbkNlLFVBQ0s1RCxHQUFHLFFBQVE7Z0JBQWEvRixFQUFFeEIsTUFBTXdDLFNBQVM7ZUFDekMwQixLQUFLLE9BQU93RyxVQUNabEksU0FBUyxzQkFDVDZILFlBQVlaO1lBS2pCLElBQUkwQixVQUFVLEdBQUdDLFVBQVU7Z0JBQ3ZCRCxVQUFVdkYsUUFBUTs7WUFLdEI4RCxhQUNLckgsWUFBWStILFlBQ1pyQjtnQkFDR2dCLE9BQVU7Z0JBQ1ZDLFFBQVc7Ozs7SUFPM0IsU0FBU0gsd0JBQXdCL0s7UUFTN0IsSUFBSXVNLFNBQVN2TSxNQUFNa0MsTUFBTSxTQUFTLEdBQUdBLE1BQU0sS0FBSztRQUVoRCxPQUFPcUs7O0lBT1g7UUFDSWxELE1BQU1EOzs7O0FDOUtkM0osSUFBSUcsVUFBVTRNLFdBQVc7SUFLckIsSUFBSUMsVUFBMEIvSixFQUFFOUI7SUFDaEMsSUFBSThMLDBCQUEwQmhLO0lBQzlCLElBQUlpSyxtQkFBMEI7SUFDOUIsSUFBSUMsZ0JBQTBCO0lBQzlCLElBQUkxRCxjQUEwQjtJQUs5QixTQUFTRSxXQUFXeUQsa0JBQWtCdEY7UUFTbEMsSUFBSXNGLG1CQUFtQnBOLElBQUlvSSxpQkFBaUIsWUFBWWdGLGtCQUFrQnRGO1FBRTFFLElBQUlzRixrQkFBa0I7WUFJbEJBLGlCQUFpQmxLLEtBQUs7Z0JBRWxCLElBQUlvRixRQUFRckYsRUFBRXhCO2dCQUlkLElBQUk2RyxNQUFNekUsT0FBT29FLE1BQU1vRixZQUFZLE9BQU87Z0JBSTFDSiwwQkFBMEJBLHdCQUF3QjFFLElBQUlEO2dCQUl0RGdGLHNCQUFzQmhGO2dCQUl0QkEsTUFBTXpFLE9BQU9vRSxNQUFNb0YsYUFBYTs7WUFPcENFO1lBSUEsSUFBSTlELGFBQWE7WUFJakJ1RCxRQUNLaEUsR0FBRyx5QkFBeUI7Z0JBQ3pCd0U7Z0JBQ0FDLHVCQUF1Qkw7ZUFFMUJwRSxHQUFHLGNBQWM7Z0JBQ2R3RTtnQkFDQUU7O1lBS1JqRSxjQUFjOzs7SUFNdEIsU0FBU2lFO1FBU0wsSUFBSUMsbUJBQW1CO1FBS3ZCeE0sT0FBT3lNLHNCQUFzQjtZQUV6Qlgsd0JBQXdCL0osS0FBSztnQkFFekIsSUFBSW9GLFFBQXNCckYsRUFBRXhCO2dCQUM1QixJQUFJb0MsT0FBc0J5RSxNQUFNekU7Z0JBQ2hDLElBQUlzRSxRQUFzQnRFLEtBQUtzRTtnQkFDL0IsSUFBSTBGLGNBQXNCaEssS0FBS29FLE1BQU00RjtnQkFDckMsSUFBSUMsU0FBc0JqSyxLQUFLaUUsUUFBUWdHLFVBQVVYO2dCQUNqRCxJQUFJWSxzQkFBc0JGLGVBQWVYLG1CQUFtQmM7Z0JBQzVELElBQUlDLGlCQUFzQnBLLEtBQUtvRSxNQUFNaUcsbUJBQW1CQyxTQUFTakIsbUJBQW1CWSxRQUFRLE1BQU1LLFNBQVNKLHNCQUFzQkQsUUFBUTtnQkFFekksSUFBSTNGLFVBQVUsUUFBUUEsVUFBVSxVQUFVO29CQUN0Q0csTUFBTWtDLElBQUksYUFBYSxvQkFBb0J5RCxpQkFBaUI7Ozs7O0lBUzVFLFNBQVNYLHNCQUFzQkY7UUFTM0IsSUFBSXZKLE9BQU91SixpQkFBaUJ2SjtRQUk1QixLQUFLQSxLQUFLb0UsTUFBTW9GLFlBQVk7WUFDeEJyTixJQUFJSyxPQUFPMkwsWUFBWXBDLEtBQUt3RDs7UUFNaEMsSUFBS3ZKLEtBQUtzRSxVQUFVLFFBQVF0RSxLQUFLc0UsVUFBVSxVQUFXO1lBQ2xEaUYsaUJBQWlCdkosT0FBT29FLE1BQU1pRyxtQkFBbUI7OztJQUt6RCxTQUFTVCx1QkFBdUJMO1FBUzVCQSxpQkFBaUJsSyxLQUFLO1lBQ2xCb0ssc0JBQXNCckssRUFBRXhCOzs7SUFLaEMsU0FBUzhMO1FBT0x0SyxFQUFFLFFBQVFtTCxVQUFVO1FBRXBCcEIsUUFBUWhFLEdBQUcsVUFBVTtZQUNqQmdFLFFBQVFvQixVQUFVOzs7SUFLMUIsU0FBU1o7UUFNTE4sbUJBQW1CRixRQUFRb0I7UUFDM0JKLGlCQUFtQmhCLFFBQVF2Qjs7SUFJL0IsU0FBU2tDO1FBU0wsT0FBT1gsUUFBUW9CLGNBQWNwQixRQUFRdkIsV0FBV3hJLEVBQUV3QixVQUFVZ0gsWUFBWXVCLFFBQVFvQixjQUFjOztJQU9sRztRQUNJeEUsTUFBT0Q7Ozs7QUN4TWYzSixJQUFJRyxVQUFVa08sV0FBVztJQUtyQixTQUFTMUUsV0FBV2lCLGdCQUFnQjlDO1FBaUJoQyxJQUFJOEMsaUJBQWlCNUssSUFBSW9JLGlCQUFpQixZQUFZd0MsZ0JBQWdCOUM7UUFFdEUsSUFBSThDLGdCQUFnQkEsZUFBZTFILEtBQUs7WUFFcEMsSUFBSW9MLHFCQUFxQnJMLEVBQUV4QjtZQUkzQixJQUFJNk0sbUJBQW1CekssT0FBT29FLE1BQU1zRyxhQUFhLE9BQU87WUFJeERDLFFBQVFGO1lBQ1JHLE9BQU9IO1lBSVBBLG1CQUFtQnpLLE9BQU9vRSxNQUFNc0csY0FBYzs7UUFNbER2TyxJQUFJSyxPQUFPMkwsWUFBWXBDLEtBQUtnQixnQkFBZ0I5Qzs7SUFJaEQsU0FBUzBHLFFBQVE1RDtRQVNiLElBQUk5QyxVQUFXOEMsZUFBZS9HLE9BQU9pRTtRQUNyQyxJQUFJNEcsT0FBVzVHLFFBQVE2RyxNQUFNO1FBQzdCLElBQUlDLFdBQVc5RyxRQUFRK0csVUFBVTtRQUVqQyxJQUFJSCxNQUFVOUQsZUFBZTNHLFNBQVMsUUFBUXlLLE9BQU87UUFDckQsSUFBSUUsVUFBVWhFLGVBQWUzRyxTQUFTLFFBQVEySyxXQUFXO1FBRXpEaEUsZUFBZTlHLFlBQVksUUFBUTRLO1FBQ25DOUQsZUFBZTlHLFlBQVksUUFBUThLOztJQUl2QyxTQUFTSCxPQUFPN0Q7UUFTWixJQUFJOUMsVUFBVzhDLGVBQWUvRyxPQUFPaUU7UUFDckMsSUFBSTRHLE9BQVc1RyxRQUFRNkcsTUFBTTtRQUM3QixJQUFJQyxXQUFXOUcsUUFBUStHLFVBQVU7UUFDakMsSUFBSUMsUUFBV2hILFFBQVFnSCxTQUFTO1FBQ2hDLElBQUlDLFNBQVdqSCxRQUFRaUgsVUFBVTtRQUVqQyxJQUFJQSxXQUFXLFNBQVM7WUFFcEJuRSxlQUFlNUIsR0FBRyxtQkFBbUI7Z0JBQ2pDZ0csUUFBUXBFLGdCQUFnQjhELE1BQU1JOztZQUdsQ2xFLGVBQWU1QixHQUFHLHVCQUF1QjtnQkFDckNnRyxRQUFRcEUsZ0JBQWdCZ0UsVUFBVUU7O1lBR3RDbEUsZUFBZTVCLEdBQUcsb0JBQW9CO2dCQUNsQ3dGLFFBQVE1RDs7ZUFHVDtZQUVIQSxlQUFlc0IsSUFBSSxtQkFBbUI7Z0JBQ2xDOEMsUUFBUXBFLGdCQUFnQjhELE1BQU1JOztZQUdsQ2xFLGVBQWVzQixJQUFJLHVCQUF1QjtnQkFDdEM4QyxRQUFRcEUsZ0JBQWdCZ0UsVUFBVUU7Ozs7SUFPOUMsU0FBU0UsUUFBUXBFLGdCQUFnQnFFLElBQUlIO1FBVWpDLElBQUlHLElBQUk7WUFDSnJFLGVBQWU5RyxZQUFZLFFBQVFtTCxLQUFLO1lBQ3hDckUsZUFBZTNHLFNBQVMsUUFBUWdMOztRQUdwQyxJQUFJSCxPQUFPO1lBQ1BsRSxlQUFlM0csU0FBUyxRQUFRNks7OztJQVF4QztRQUNJbEYsTUFBTUQ7Ozs7QUMxSWQzSixJQUFJRyxVQUFVK08sU0FBUztJQUtuQixJQUFJQyxRQUFVbE0sRUFBRTtJQUNoQixJQUFJK0osVUFBVS9KLEVBQUU5QjtJQUtoQixTQUFTd0ksV0FBV3lGLGdCQUFnQnRIO1FBMkJoQyxJQUFJc0gsaUJBQWlCcFAsSUFBSW9JLGlCQUFpQixVQUFVZ0gsZ0JBQWdCdEg7UUFFcEUsSUFBSXNILGdCQUFnQkEsZUFBZWxNLEtBQUssU0FBU0U7WUFFN0MsSUFBSWlNLHFCQUFxQnBNLEVBQUV4QjtZQUszQixJQUFJNE4sbUJBQW1CN0UsSUFBSSxnQkFBZ0IsV0FBVzRFLGVBQWU1RSxJQUFJLGlCQUFpQixRQUFRO1lBS2xHd0MsUUFBUWhFLEdBQUcsUUFBUTtnQkFDZnNHLGNBQWNELG9CQUFvQmpNO2dCQUNsQ21NLHlCQUF5QkY7OztRQU9qQyxJQUFJRCxnQkFBZ0JJLGlCQUFpQko7UUFDckMsSUFBSUEsZ0JBQWdCSyxjQUFjTDs7SUFJdEMsU0FBU0UsY0FBY0YsZ0JBQWdCaE07UUFTbkMsSUFBSXNNLHFCQUE0QnpNLEVBQUUsZ0NBQWdDRyxRQUFRO1FBQzFFLElBQUl1TSxpQkFBNEIxTSxFQUFFO1FBQ2xDLElBQUkyTSxzQkFBNEJSLGVBQWU1RSxJQUFJO1FBQ25ELElBQUlxRix1QkFBNEJULGVBQWU1RSxJQUFJO1FBQ25ELElBQUlzRixzQkFBNEJWLGVBQWU1RSxJQUFJO1FBSW5ELElBQUlvRix3QkFBd0IsVUFBVTtZQUtsQ1IsZUFBZTVFO2dCQUNYbkYsVUFBWTs7WUFHaEJzSyxlQUFlbkY7Z0JBQ1huRixVQUFZdUs7Z0JBQ1pHLEtBQU9EO2dCQUNQRSxNQUFRSDs7ZUFHVDtZQUlIRixlQUFlbkY7Z0JBQ1huRixVQUFZOzs7UUFPcEJxSyxtQkFBbUJsRjtZQUNmZ0IsT0FBWTRELGVBQWVhO1lBQzNCeEUsUUFBWTJELGVBQWVjO1lBQzNCQyxTQUFZOztRQUtoQmxOLEVBQUVtTSxnQkFBZ0JnQixLQUFLVDtRQUN2QkQsbUJBQW1CNUQsWUFBWXNEOztJQUluQyxTQUFTRyx5QkFBeUJIO1FBVTlCLElBQUl2TCxPQUFnQ3VMLGVBQWV2TDtRQUNuRCxJQUFJaUUsVUFBZ0NqRSxLQUFLaUU7UUFDekMsSUFBSXVJLG9CQUFnQ3ZJLFFBQVF3SSxjQUFjLFdBQVdsQixlQUFlbEcsU0FBU0EsV0FBV2pHLEVBQUU2RSxRQUFRd0ksV0FBV0M7UUFDN0gsSUFBSUMsc0JBQWdDcEIsZUFBZWM7UUFDbkQsSUFBSU8scUJBQWdDckIsZUFBZWE7UUFDbkQsSUFBSVMsNkJBQWdDdEIsZUFBZXVCLFNBQVNaO1FBQzVELElBQUlhLFlBQWdDOUksUUFBUStJLFVBQVVoUCxZQUFZc00sU0FBU3JHLFFBQVErSSxTQUFTO1FBQzVGLElBQUlDLGNBQWdDaEosUUFBUXZCLFNBQVMxRSxZQUFZc00sU0FBU3JHLFFBQVF2QixRQUFRO1FBQzFGLElBQUl3SyxhQUFnQ2pKLFFBQVErSSxVQUFVaFAsWUFBWTZPLDZCQUE2QkUsWUFBWUY7UUFDM0csSUFBSU0sWUFBZ0NsSixRQUFRdkIsU0FBUzFFLFlBQVk2Tyw2QkFBNkJJLGNBQWNGLFlBQVl6QixNQUFNMUQ7UUFDOUgsSUFBSXdGLG1CQUFnQ0MsV0FBVzlCO1FBSS9DLElBQUlpQixrQkFBa0IzTixRQUFRO1lBQzFCcU8sYUFBYVYsa0JBQWtCTSxTQUFTWixNQUFNYTtZQUM5Q0ksWUFBYUQsYUFBYVYsa0JBQWtCSCxnQkFBZ0JNLHNCQUFzQk07O1FBTXRGLElBQUlULGtCQUFrQjNOLFVBQVVvRixRQUFRd0ksY0FBYyxVQUFVO1lBQzVEUyxhQUFhQSxhQUFhNUMsU0FBU2tDLGtCQUFrQjdGLElBQUk7WUFDekR3RyxZQUFhQSxZQUFZN0MsU0FBU2tDLGtCQUFrQjdGLElBQUksb0JBQW9Cc0c7O1FBS2hGak4sS0FBS29FLE1BQU1nSixtQkFBbUJBO1FBQzlCcE4sS0FBS29FLE1BQU13RCxTQUFtQitFO1FBQzlCM00sS0FBS29FLE1BQU11RCxRQUFtQmlGO1FBQzlCNU0sS0FBS29FLE1BQU1rSixnQkFBbUJUO1FBQzlCN00sS0FBS29FLE1BQU0ySSxZQUFtQkE7UUFDOUIvTSxLQUFLb0UsTUFBTTZJLGNBQW1CQTtRQUM5QmpOLEtBQUtvRSxNQUFNOEksYUFBbUJBO1FBQzlCbE4sS0FBS29FLE1BQU0rSSxZQUFtQkE7O0lBSWxDLFNBQVNFLFdBQVc5QjtRQVloQixJQUFJbkgsUUFBYW1ILGVBQWV2TCxPQUFPb0U7UUFDdkMsSUFBSThJLGFBQWE5SSxNQUFNOEk7UUFDdkIsSUFBSUMsWUFBYS9JLE1BQU0rSTtRQUV2QixJQUFJQSxZQUFZLEtBQUtELGFBQWFDLGFBQWFELGFBQWEzQixlQUFldUIsU0FBU1osS0FBSztZQUNyRixPQUFPO2VBQ0o7WUFDSCxPQUFPOzs7SUFLZixTQUFTUCxpQkFBaUI0QjtRQVN0QnBFLFFBQVFoRSxHQUFHLFVBQVU7WUFFakJvSSxnQkFBZ0JsTyxLQUFLLFNBQVNFO2dCQUUxQixJQUFJZ00saUJBQWlCbk0sRUFBRXhCO2dCQUt2QixJQUFJeVAsV0FBVzlCLGlCQUFpQjtvQkFDNUJHLHlCQUF5Qkg7Ozs7O0lBU3pDLFNBQVNLLGNBQWMyQjtRQVVuQnBFLFFBQVFoRSxHQUFHLGNBQWM7WUFJckIsSUFBSW9GLFlBQVlwQixRQUFRb0I7WUFJeEJnRCxnQkFBZ0JsTyxLQUFLLFNBQVNFO2dCQUUxQixJQUFJZ00saUJBQTZCbk0sRUFBRXhCO2dCQUNuQyxJQUFJaU8scUJBQTZCek0sRUFBRSx3QkFBd0JHO2dCQUMzRCxJQUFJNkUsUUFBNkJtSCxlQUFldkwsT0FBT29FO2dCQUN2RCxJQUFJeUksNkJBQTZCekksTUFBTWtKO2dCQUN2QyxJQUFJSixhQUE2QjlJLE1BQU04STtnQkFDdkMsSUFBSUMsWUFBNkIvSSxNQUFNK0k7Z0JBQ3ZDLElBQUlKLFlBQTZCM0ksTUFBTTJJO2dCQUV2QyxJQUFJUztnQkFDSixJQUFJQztnQkFDSixJQUFJQztnQkFJSixJQUFJdEosTUFBTWdKLGtCQUFrQjtvQkFJeEIsSUFBSTdDLFlBQVkyQyxZQUFZO3dCQUl4Qk0sbUJBQTJCO3dCQUMzQkMsY0FBMkI7d0JBQzNCQywyQkFBMkI7d0JBSTNCbkMsZUFBZS9ILFFBQVE7MkJBR3BCLElBQUkrRyxZQUFZNEMsV0FBVzt3QkFJOUJLLG1CQUEyQjt3QkFDM0JDLGNBQTJCTixZQUFZTiw2QkFBNkJFO3dCQUNwRVcsMkJBQTJCO3dCQUkzQm5DLGVBQWUvSCxRQUFROzJCQUVwQjt3QkFJSGdLLG1CQUEyQjt3QkFDM0JDLGNBQTJCLElBQUlWO3dCQUMvQlcsMkJBQTJCO3dCQUkzQm5DLGVBQWUvSCxRQUFROztvQkFNM0IrSCxlQUFlNUU7d0JBQ1huRixVQUFZZ007d0JBQ1p0QixLQUFPdUI7d0JBQ1BFLHVCQUF1Qjt3QkFDdkJDLFdBQVc7O29CQUdmL0IsbUJBQW1CbEY7d0JBQ2YyRixTQUFZb0I7Ozs7OztJQWNoQztRQUNJM0gsTUFBTUQ7Ozs7QUN2VWQzSixJQUFJRSxPQUFPd1IsUUFBUSxTQUFTekksVUFBVXZGLFNBQVNvRTtJQVUzQyxJQUFJcEUsbUJBQW1CQyxRQUFRO1FBQzNCM0QsSUFBSW9HLE1BQU0xQyxTQUFTb0UsUUFBUXhCOzs7O0FDWG5DdEcsSUFBSUUsT0FBT3lSLE9BQU8sU0FBUzFJLFVBQVV2RixTQUFTb0U7SUFjMUMsSUFBSXBFLG1CQUFtQkMsUUFBUTtRQUUzQixJQUFJc0wsS0FBU25ILFFBQVFtSCxNQUFNO1FBQzNCLElBQUlILFFBQVNoSCxRQUFRZ0gsU0FBUztRQUM5QixJQUFJOEMsU0FBUzlKLFFBQVE4SixVQUFVO1FBSS9CLElBQUkzQyxNQUFNSCxPQUFPcEwsUUFBUU8sU0FBUyxRQUFRNks7UUFFMUMsSUFBSThDLFdBQVcsUUFBUTtZQUNuQixJQUFJM0MsSUFBSTtnQkFDSnZMLFFBQ0tPLFNBQVMsUUFBUWdMLElBQ2pCakcsR0FBRyxnQkFBZ0I7b0JBQ2hCdEYsUUFBUWtPLFNBQVN2SyxRQUFROzttQkFFOUI7Z0JBQ0gzRCxRQUFRa08sU0FBU3ZLLFFBQVE7O2VBRTFCO1lBQ0gsSUFBSTRILElBQUk7Z0JBQ0p2TCxRQUNLTyxTQUFTLFFBQVFnTCxJQUNqQmpHLEdBQUcsZ0JBQWdCO29CQUNoQnRGLFFBQVFELE9BQU80RCxRQUFROzttQkFFNUI7Z0JBQ0gzRCxRQUFRRCxPQUFPNEQsUUFBUTs7Ozs7O0FBUXZDckgsSUFBSUUsT0FBT3lSLEtBQUsvSCxPQUFPO0lBT25CLElBQUlpSSxZQUFZO0lBUWhCNU8sRUFBRTRPLFdBQVczTyxLQUFLO1FBSWRsRCxJQUFJNkgsY0FBYzVFLEVBQUV4QjtRQUlwQixJQUFJNkcsUUFBaUJyRixFQUFFeEI7UUFDdkIsSUFBSXFHLFVBQWlCUSxNQUFNekUsT0FBT2lFO1FBQ2xDLElBQUlnSyxpQkFBaUJoSyxRQUFRNko7UUFDN0IsSUFBSTFDLEtBQWlCbkgsUUFBUW1ILE1BQU07UUFDbkMsSUFBSXZMO1FBSUosUUFBUW9PO1VBQ0osS0FBSztZQUNEcE8sVUFBVTRFO1lBQ1Y7O1VBQ0osS0FBSztZQUNENUUsVUFBVTRFLE1BQU1ZO1lBQ2hCOztVQUNKO1lBQ0l4RixVQUFVVCxFQUFFNk87O1FBS3BCLElBQUlwTyxtQkFBbUJDLFFBQVE7WUFJM0JELFFBQVFJLFlBQVksU0FBVVYsT0FBTzJPO2dCQUNqQyxRQUFRQSxVQUFVeE8sTUFBTyx3QkFBd0J5TyxLQUFLOztZQUsxRCxJQUFJL0MsSUFBSTtnQkFDSnZMLFFBQVFPLFNBQVMsUUFBUWdMLEtBQUssWUFBWW5MLFlBQVksUUFBUW1MOztZQUtsRXZMLFFBQVFLOzs7OztBQzlHcEIvRCxJQUFJRSxPQUFPK1IsUUFBUSxTQUFTaEosVUFBVXZGLFNBQVNvRTtJQVUzQyxJQUFJcEUsbUJBQW1CQyxRQUFRO1FBQzNCM0QsSUFBSTBHLE1BQU1oRCxTQUFTb0UsUUFBUXhCOzs7O0FDWG5DdEcsSUFBSUUsT0FBT2dTLFdBQVcsU0FBU2pKLFVBQVV2RixTQUFTb0U7SUFtQjlDLElBQUlwRSxtQkFBbUJDLFFBQVE7UUFFM0IsSUFBSWlELFlBQXVCM0QsRUFBRXdCO1FBQzdCLElBQUkwTixhQUF1QjFOLFNBQVMyTixvQkFBb0IzTixTQUFTNE47UUFDakUsSUFBSUM7UUFDSixJQUFJQyxtQkFBdUI3TyxRQUFROE8sUUFBUSxhQUFhO1FBQ3hELElBQUk3QixTQUF1QjdJLFFBQVE2SSxVQUFVO1FBQzdDLElBQUk4QixZQUF1QjNLLFFBQVEySyxhQUFhO1FBQ2hELElBQUlDO1FBSUosSUFBSWhQLFFBQVFFLFNBQVMsaUJBQWlCNUQsSUFBSW9CLGVBQWUsU0FBUztZQUM5RHBCLElBQUlJLFVBQVV1UyxLQUFLQyxTQUFTQzs7UUFPaEMsSUFBSU4saUJBQWlCN1AsUUFBUTtZQUN6QmdRLGFBQWlCLE9BQU9oUCxRQUFRMkIsV0FBVzBLO1lBQzNDdUMsaUJBQWlCNU8sUUFBUThPLFFBQVE7ZUFDOUI7WUFDSEUsYUFBaUJoUCxRQUFRaU4sU0FBU1osTUFBTVk7WUFDeEMyQixpQkFBaUJyUCxFQUFFa1A7O1FBTXZCdkwsVUFBVVMsUUFBUTtRQUVsQnBFLEVBQUU2UCxLQUNFUixlQUFlL0wsT0FBT0M7WUFDbEI0SCxXQUFXc0U7V0FDWixNQUNMSyxLQUFLO1lBQ0gsSUFBSU4sY0FBYyxTQUFTelMsSUFBSW9HLE1BQU0xQztZQUNyQyxJQUFJK08sY0FBYyxTQUFTelMsSUFBSTBHLE1BQU1oRDtZQUNyQ2tELFVBQVVTLFFBQVE7Ozs7O0FDM0Q5QnJILElBQUlFLE9BQU84UyxPQUFPLFNBQVMvSixVQUFVdkYsU0FBU29FO0lBYzFDLElBQUlwRSxtQkFBbUJDLFFBQVE7UUFFM0IsSUFBSXNMLEtBQVFuSCxRQUFRbUgsTUFBTTtRQUMxQixJQUFJSCxRQUFRaEgsUUFBUWdILFNBQVM7UUFJN0IsSUFBSUcsSUFBSXZMLFFBQVFPLFNBQVMsUUFBUWdMO1FBQ2pDLElBQUlBLE1BQU1ILE9BQU9wTCxRQUFRTyxTQUFTLFFBQVE2SztRQUkxQ3BMLFFBQVFLLE9BQU9zRCxRQUFROzs7O0FBTS9CckgsSUFBSUUsT0FBTzhTLEtBQUtwSixPQUFPO0lBT25CLElBQUlpSSxZQUFZO0lBUWhCNU8sRUFBRTRPLFdBQVczTyxLQUFLO1FBSWRsRCxJQUFJNkgsY0FBYzVFLEVBQUV4QjtRQUlwQixJQUFJNkcsUUFBaUJyRixFQUFFeEI7UUFDdkIsSUFBSXFHLFVBQWlCUSxNQUFNekUsT0FBT2lFO1FBQ2xDLElBQUlnSyxpQkFBaUJoSyxRQUFRa0w7UUFDN0IsSUFBSS9ELEtBQWlCbkgsUUFBUW1ILE1BQU07UUFDbkMsSUFBSXZMO1FBSUosUUFBUW9PO1VBQ0osS0FBSztZQUNEcE8sVUFBVTRFO1lBQ1Y7O1VBQ0osS0FBSztZQUNENUUsVUFBVTRFLE1BQU1ZO1lBQ2hCOztVQUNKO1lBQ0l4RixVQUFVVCxFQUFFNk87O1FBS3BCLElBQUlwTyxtQkFBbUJDLFFBQVE7WUFJM0JELFFBQVFJLFlBQVksU0FBVVYsT0FBTzJPO2dCQUNqQyxRQUFRQSxVQUFVeE8sTUFBTyx3QkFBd0J5TyxLQUFLOztZQUsxRCxJQUFJL0MsSUFBSTtnQkFDSnZMLFFBQVFPLFNBQVMsUUFBUWdMLEtBQUssWUFBWW5MLFlBQVksUUFBUW1MOztZQUtsRXZMLFFBQVFEOzs7OztBQzVGcEJ6RCxJQUFJRSxPQUFPK1MsU0FBUyxTQUFTaEssVUFBVXZGLFNBQVNvRTtJQWlCNUMsSUFBSXBFLG1CQUFtQkMsUUFBUTtRQUUzQixJQUFJdVAsY0FBY3BMLFFBQVFxTCxRQUFRO1FBQ2xDLElBQUlDLGFBQWN0TCxRQUFRdUwsT0FBTztRQUNqQyxJQUFJQyxTQUFjeEwsUUFBUXdMLFVBQVU7UUFJcEMsSUFBSXpOLFdBQVc3RixJQUFJNEY7UUFFbkIsSUFBSW1FO1lBQ0FDO2dCQUNJdUosWUFBZTtnQkFDZkMsVUFBYTs7WUFFakJ0SjtnQkFDSXFKLFlBQWU7Z0JBQ2ZDLFVBQWE7OztRQU1yQixJQUFJQyxZQUFZeFEsRUFBRSwrR0FFbUI4RyxhQUFhbEUsVUFBVTBOLGFBQWEsV0FBV3hKLGFBQWFsRSxVQUFVMk4sV0FBVztRQUl0SCxJQUFJRSxXQUFXelEsRUFBRTtRQUlqQixJQUFJaVEsZ0JBQWdCQSxZQUFZclEsa0JBQWtCLFNBQVNxUSxZQUFZclEsa0JBQWtCLFNBQVM7WUFDOUZxUSxjQUFjQSxZQUFZUztlQUN2QjtZQUNIVCxjQUFjOztRQUtsQixJQUFJRSxZQUFZO1lBQ1puUSxFQUFFMlE7Z0JBRUVQLEtBQVFEO2dCQUNSUyxPQUFRO2dCQUNSVixNQUFRRDtnQkFFUlksWUFBWTtvQkFDUnBRLFFBQ0txUSxPQUFPTCxTQUFTakosU0FDaEJwRCxRQUFROztnQkFHakIyTSxPQUFPO29CQUNIdFEsUUFDSzZILEtBQUtrSSxVQUFVaEosU0FDZnBELFFBQVE7O2dCQUdqQjRNLFNBQVMsU0FBU3BRO29CQUNkLElBQUlxUSxZQUFZalIsRUFBRVksTUFBTXlQLE9BQU9BO29CQUMvQjVQLFFBQ0s2SCxLQUFLMkksV0FDTDdNLFFBQVE7Ozs7Ozs7QUNqRmpDckgsSUFBSUssT0FBTzhULGlCQUFpQjtJQVN4QixTQUFTQyxTQUFTQztRQUNkQyxRQUFRQyxVQUFVLE1BQU0sTUFBTXBULE9BQU9xVCxTQUFTQyxXQUFXSjs7SUFHN0QsU0FBU0ssWUFBWUw7UUFDakJDLFFBQVFLLGFBQWEsTUFBTSxNQUFNeFQsT0FBT3FULFNBQVNDLFdBQVdKOztJQUdoRSxTQUFTTztRQUNMTixRQUFRSyxhQUFhLElBQUlsUSxTQUFTa0gsT0FBT3hLLE9BQU9xVCxTQUFTQzs7SUFNN0Q7UUFDSUwsVUFBY0E7UUFDZE0sYUFBY0E7UUFDZEUsV0FBY0E7Ozs7QUMzQnRCNVUsSUFBSUssT0FBT3dVLGdCQUFnQjtJQVV2QixJQUFJak8sWUFBYzNELEVBQUV3QjtJQUNwQixJQUFJZ0YsY0FBYztJQUlsQixJQUFJYjtRQUNBa00sSUFBSztRQUNMQyxJQUFLO1FBQ0xDLElBQUs7UUFDTEMsSUFBSztRQUNMQyxJQUFLO1FBQ0xDLElBQUs7UUFDTEMsSUFBSztRQUNMQyxHQUFLOztJQU1ULFNBQVMxTDtRQU9MLEtBQUtGLGFBQWE3QyxVQUFVb0MsR0FBRyxTQUFTLFNBQVNJO1lBSTdDLElBQUlrTSxVQUFVbE0sRUFBRW1NO1lBQ2hCLElBQUkzTSxLQUFLME0sYUFBYXpULFdBQVcrRSxVQUFVUyxRQUFRLG9CQUFvQnVCLEtBQUswTTs7UUFNaEYxTyxVQUFVb0MsR0FBRyxvQkFBb0I7WUFDN0JwQyxVQUFVUyxRQUFROztRQUt0Qm9DLGNBQWM7O0lBSWxCLFNBQVMrTCxZQUFZQztRQVdqQkEsVUFBVTlQLEtBQUssWUFBVztRQUkxQmlCLFVBQVVvQyxHQUFHLHNCQUFzQjtZQUUvQixJQUFJME0saUJBQWlCelMsRUFBRXdCLFNBQVNDO1lBRWhDK1EsVUFBVTNSLFlBQVk7WUFFdEIsSUFBSTRSLGVBQWVuTSxHQUFHa00sWUFBWTtnQkFDOUJDLGVBQ0t6UixTQUFTLFlBQ1QrRSxHQUFHLFFBQVE7b0JBQ1IwTSxlQUFlNVIsWUFBWTs7Ozs7SUFXL0M2RjtJQUtBO1FBQ0lDLE1BQWNEO1FBQ2Q2TCxhQUFjQTs7OztBQ3BHdEJ4VixJQUFJSyxPQUFPc1YsY0FBYztJQUtyQixJQUFJL08sWUFBYzNELEVBQUV3QjtJQUNwQixJQUFJdUksVUFBYy9KLEVBQUU5QjtJQUNwQixJQUFJZ08sUUFBY2xNLEVBQUU7SUFDcEIsSUFBSXdHLGNBQWM7SUFFbEIsSUFBSW1NO0lBQ0osSUFBSUM7SUFFSixJQUFJQztJQUNKLElBQUlDO0lBS0osU0FBU3BNO1FBU0wsSUFBSUYsYUFBYSxPQUFPO1FBSXhCdUQsUUFBUWhFLEdBQUcsVUFBVTtZQUNqQmdOOztRQUdKcFAsVUFBVXFQLE1BQU07WUFDWkQ7WUFDQUU7O1FBS0p6TSxjQUFjOztJQUlsQixTQUFTdU07UUFPTEgsbUJBQW1CN1YsSUFBSWdHO1FBSXZCLElBQUk2UCxxQkFBcUJELGdCQUFnQjtZQUVyQzVWLElBQUkwQixXQUFXO1lBRWYxQixJQUFJcUIsU0FBUywrQkFBK0IsS0FBSztnQkFDN0MyTCxRQUFRM0YsUUFBUTtnQkFDaEIyRixRQUFRM0YsUUFBUSxvQkFBb0J3Tzs7WUFLeENELGlCQUFpQkM7OztJQU16QixTQUFTSztRQVFMSixpQkFBaUIzRyxNQUFNMUQ7UUFFdkJ6TCxJQUFJOEIsWUFBWSxrQ0FBa0MsS0FBTTtZQUVwRGlVLG9CQUFvQjVHLE1BQU0xRDtZQUUxQixJQUFJc0ssc0JBQXNCRCxnQkFBZ0I7Z0JBQ3RDOUksUUFBUTNGLFFBQVE7Z0JBQ2hCeU8saUJBQWlCM0csTUFBTTFEOzs7O0lBVW5DO1FBQ0k3QixNQUFPRDs7OztBQ3RHZjNKLElBQUlLLE9BQU8yTCxjQUFjO0lBWXJCLElBQUlnQixVQUFpQi9KLEVBQUU5QjtJQUN2QixJQUFJZ1Y7SUFDSixJQUFJbkksaUJBQWlCaEIsUUFBUXZCO0lBQzdCLElBQUkySyxnQkFBaUI7SUFDckIsSUFBSUM7SUFDSixJQUFJQztJQUNKLElBQUlDO0lBQ0osSUFBSTlNLGNBQWM7SUFLbEIsU0FBU0UsV0FBV2lCO1FBUWhCLElBQUlBLGlCQUFpQjVLLElBQUlvSSxpQkFBaUIsZUFBZXdDO1FBRXpELElBQUlBLGdCQUFnQjtZQUloQnVMLHdCQUF3QnZMO1lBSXhCNEw7WUFDQWpQO1lBQ0FrSDtZQUlBLEtBQUtoRixhQUFhO2dCQUVkdUQsUUFBUWhFLEdBQUcsNENBQTRDO29CQUNuRHdOO29CQUNBalA7b0JBQ0FrSDs7Z0JBS0poRixjQUFjOztlQUlmO1lBS0h1RCxRQUFRaEUsR0FBRyxVQUFVO2dCQUNqQnlOOzs7O0lBT1osU0FBU0Q7UUFTTHhJLGlCQUFpQmhCLFFBQVF2QjtRQUl6QjBLLHNCQUFzQmpULEtBQUs7WUFFdkIsSUFBSW9MLHFCQUFxQnJMLEVBQUV4QjtZQUMzQixJQUFJaVYsYUFBcUJwSSxtQkFBbUI0QjtZQUM1QyxJQUFJeUcsa0JBQXFCckksbUJBQW1CcUMsU0FBU1o7WUFDckQsSUFBSTlILFFBQXFCcUcsbUJBQW1CekssT0FBT29FO1lBSW5EQSxNQUFNd0QsU0FBY2lMO1lBQ3BCek8sTUFBTTRGLGNBQWM4STtZQUlwQixJQUFJM0osUUFBUW9CLGNBQWN1SSxtQkFBbUIzSixRQUFRdkIsV0FBV2tMLGtCQUFrQixJQUFJO2dCQUNsRnJJLG1CQUFtQnpLLE9BQU9zRSxRQUFRO2dCQUNsQ21HLG1CQUFtQmpILFFBQVE7bUJBQ3hCO2dCQUNIaUgsbUJBQW1CekssT0FBT3NFLFFBQVE7Ozs7SUFPOUMsU0FBU1o7UUFTTCxJQUFJMkYsbUJBQW1CRixRQUFRb0I7UUFJL0IrSCxzQkFBc0JqVCxLQUFLLFNBQVNFO1lBSWhDLElBQUl3SCxpQkFBaUIzSCxFQUFFeEI7WUFDdkIsSUFBSTBHLFFBQWlCeUMsZUFBZS9HLE9BQU9zRTtZQUMzQyxJQUFJMEYsY0FBaUJqRCxlQUFlL0csT0FBT29FLE1BQU00RjtZQUNqRCxJQUFJcEMsU0FBaUJiLGVBQWUvRyxPQUFPb0UsTUFBTXdEO1lBQ2pELElBQUltTCxhQUFpQkMsV0FBV2pNLGVBQWVKLElBQUksYUFBYS9ILE1BQU0sS0FBSyxLQUFLLE9BQU87WUFJdkY0VCxhQUFrQm5KLG1CQUFtQmMsaUJBQW1CSCxjQUFjK0ksY0FBZTFKLG1CQUFvQlcsY0FBY3BDLFNBQVNtTDtZQUNoSUwsaUJBQWtCckosbUJBQW1CYyxpQkFBaUIsSUFBS0gsY0FBYytJLGNBQWUxSixtQkFBbUJjLGlCQUFtQkgsY0FBY3BDLFNBQVNtTCxhQUFhNUksaUJBQWlCO1lBQ25Mc0ksZUFBa0JEO1lBSWxCLElBQUlBLGNBQWNsTyxVQUFVLE9BQU95QyxlQUFldkQsUUFBUTtZQUMxRCxJQUFJa1Asa0JBQWtCcE8sVUFBVSxVQUFVeUMsZUFBZXZELFFBQVE7WUFDakUsSUFBSWlQLGVBQWVuTyxVQUFVLFFBQVFtTyxlQUFlbk8sVUFBVSxVQUFVeUMsZUFBZXZELFFBQVE7OztJQU12RyxTQUFTb1A7UUFnQkwsV0FBV3RWLE9BQU8sOEJBQThCLFVBQVU7WUFFdERuQixJQUFJOEIsWUFBWSwwQkFBMEIsSUFBSTtnQkFJMUNrTCxRQUFRM0YsUUFBUTtnQkFJaEIsSUFBSTZGLG1CQUFtQkYsUUFBUW9CO2dCQUUvQixJQUFJbEIsbUJBQW1Ca0osZUFBZXBKLFFBQVEzRixRQUFRO2dCQUN0RCxJQUFJNkYsbUJBQW1Ca0osZUFBZXBKLFFBQVEzRixRQUFRO2dCQUV0RCtPLGdCQUFnQmxKOzs7UUFReEJsTixJQUFJMEIsV0FBVztRQUVmMUIsSUFBSXFCLFNBQVMsdUJBQXVCLEtBQUs7WUFDckMyTCxRQUFRM0YsUUFBUTtZQUNoQnJILElBQUlrQyxjQUFjOzs7SUFLMUIsU0FBU3VNO1FBT0wwSCxzQkFBc0JqVCxLQUFLO1lBRXZCLElBQUkwSCxpQkFBaUIzSCxFQUFFeEI7WUFFdkJtSixlQUFlNUIsR0FBRyxtQkFBbUI7Z0JBQ2pDNEIsZUFBZS9HLE9BQU9zRSxRQUFROztZQUdsQ3lDLGVBQWU1QixHQUFHLHVCQUF1QjtnQkFDckM0QixlQUFlL0csT0FBT3NFLFFBQVE7O1lBR2xDeUMsZUFBZTVCLEdBQUcsb0JBQW9CO2dCQUNsQzRCLGVBQWUvRyxPQUFPc0UsUUFBUTs7OztJQVUxQztRQUNJeUIsTUFBT0Q7Ozs7QUN2T2YzSixJQUFJSSxVQUFVMFcsWUFBWTtJQUt0QixJQUFJQyxzQkFBc0I7SUFLMUIsU0FBU3BOLFdBQVdxTixZQUFZbFA7UUFjNUIsSUFBSWtQLGFBQWFoWCxJQUFJb0ksaUJBQWlCLGFBQWE0TyxZQUFZbFA7UUFJL0QsSUFBSWtQLFlBQVlBLFdBQVc5VCxLQUFLO1lBSTVCLElBQUlsRCxJQUFJMEosUUFBUXpHLEVBQUV4QixRQUFRLE9BQU87WUFJakMsSUFBSXdWLGlCQUFpQmhVLEVBQUV4QjtZQUN2QixJQUFJeVYsZ0JBQWlCRCxlQUFlRSxLQUFLO1lBSXpDLElBQUlDLFlBQVlwWCxJQUFJdUYsWUFBWSxZQUFZLFFBQVE7WUFFcEQyUixjQUFjaFUsS0FBSztnQkFFZixJQUFJbVUsZUFBZXBVLEVBQUV4QjtnQkFDckIsSUFBSTZWLGNBQWVELGFBQWFGLEtBQUs7Z0JBQ3JDLElBQUlJLFlBQWVGLGFBQWFGLEtBQUs7Z0JBS3JDLEtBQUtFLGFBQWF6VCxTQUFTLGdCQUFnQnlULGFBQWF6VCxTQUFTLGVBQWU7b0JBQzVFeVQsYUFBYXBULFNBQVM7b0JBQ3RCb1QsYUFBYXhULE9BQU9zRSxRQUFRO29CQUM1Qm9QLFVBQVVDLFFBQVE7O2dCQUd0QixJQUFJSCxhQUFhelQsU0FBUyxhQUFhO29CQUNuQ3lULGFBQWF4VCxPQUFPc0UsUUFBUTs7Z0JBS2hDbVAsWUFBWXRPLEdBQUdvTyxXQUFXLFNBQVNoTztvQkFDL0JBLEVBQUVDO29CQUNGb08sY0FBY0o7OztZQU90QnJYLElBQUl3SixTQUFTdkcsRUFBRXhCOztRQU1uQixLQUFLc1YscUJBQXFCVzs7SUFJOUIsU0FBU0QsY0FBY0U7UUFVbkIsSUFBSVYsaUJBQWlCVSxTQUFTbkYsUUFBUTtRQUN0QyxJQUFJNkUsZUFBaUJNO1FBQ3JCLElBQUk3UCxVQUFpQm1QLGVBQWVwVCxPQUFPaUU7UUFDM0MsSUFBSUssUUFBaUJrUCxhQUFheFQsT0FBT3NFO1FBRXpDLElBQUlBLFVBQVUsWUFBWUwsUUFBUThQLFFBQVE7WUFDdENDLGlCQUFpQlo7O1FBR3JCLElBQUk5TyxVQUFVLFVBQVU7WUFDcEIyUCxZQUFZVDs7UUFHaEIsSUFBSWxQLFVBQVUsV0FBV0wsUUFBUThQLFFBQVE7WUFDckNHLGFBQWFWOzs7SUFLckIsU0FBU1MsWUFBWUg7UUFRakIsSUFBSU4sZUFBZU07UUFDbkIsSUFBSUosWUFBZUksU0FBU1IsS0FBSztRQUVqQ0UsYUFDS3ZULFlBQVksY0FDWkcsU0FBUztRQUVkc1QsVUFDS2hSLE9BQ0F5UixVQUFVLFFBQ1ZDLFVBQ0FDLEtBQUs7WUFBYWIsYUFBYWhRLFFBQVE7O1FBRTVDZ1EsYUFBYWhRLFFBQVE7UUFDckJnUSxhQUFheFQsT0FBT3NFLFFBQVE7O0lBSWhDLFNBQVM0UCxhQUFhSjtRQVFsQixJQUFJTixlQUFlTTtRQUNuQixJQUFJSixZQUFlSSxTQUFTUixLQUFLO1FBRWpDRSxhQUNLdlQsWUFBWSxZQUNaRyxTQUFTLGNBQ1RnVSxVQUNBQyxLQUFLO1lBQWFiLGFBQWFoUSxRQUFROztRQUU1Q2tRLFVBQ0toUixPQUNBaVIsUUFBUTtRQUViSCxhQUFhaFEsUUFBUTtRQUNyQmdRLGFBQWF4VCxPQUFPc0UsUUFBUTs7SUFJaEMsU0FBUzBQLGlCQUFpQmI7UUFTdEIsSUFBSW1CO1FBRUosSUFBSW5CLGVBQWVuVixXQUFXO1lBQzFCc1csV0FBV2xWLEVBQUU7ZUFDVjtZQUNIa1YsV0FBV2xWLEVBQUU7O1FBR2pCa1YsU0FBU2pWLEtBQUs7WUFDVjZVLGFBQWE5VSxFQUFFeEI7OztJQUt2QixTQUFTMlcsZ0JBQWdCcEI7UUFTckIsSUFBSW1CO1FBRUosSUFBSW5CLGVBQWVuVixXQUFXO1lBQzFCc1csV0FBV2xWLEVBQUU7ZUFDVjtZQUNIa1YsV0FBV2xWLEVBQUU7O1FBR2pCa1YsU0FBU2pWLEtBQUs7WUFDVjRVLFlBQVk3VSxFQUFFeEI7OztJQUt0QixTQUFTaVc7UUFNTCxJQUFJMVgsSUFBSWtCLFlBQVkscUJBQXFCNlYscUJBQXFCO1lBSTFEL1csSUFBSUssT0FBT3dVLGNBQWNXLFlBQVl2UyxFQUFFO1lBSXZDMkQsVUFBVW9DLEdBQUcsd0JBQXdCO2dCQUVqQyxJQUFJME0saUJBQWlCelMsRUFBRXdCLFNBQVNDO2dCQUVoQyxJQUFJZ1IsZUFBZW5NLEdBQUcsdUJBQXVCO29CQUN6Q2tPLGNBQWMvQixlQUFlbEQsUUFBUTs7OztRQVNqRHVFLHNCQUFzQjs7SUFPMUI7UUFDSW5OLE1BQVdEO1FBQ1gwTyxPQUFXTjtRQUNYTyxNQUFXUjtRQUNYUyxVQUFXVjtRQUNYVyxTQUFXSjtRQUNYSyxRQUFXaEI7Ozs7QUMzUG5CelgsSUFBSUksVUFBVXlKLE9BQU87SUFLakIsU0FBU0Y7UUFTTCxJQUFJK08sZUFBZXpWLEVBQUU7UUFDckIsSUFBSTBWLGVBQWU7UUFFbkIsSUFBSUQsY0FBY0EsYUFBYXhWLEtBQUssU0FBU0U7WUFJekMsSUFBSXBELElBQUkwSixRQUFRekcsRUFBRXhCLFFBQVEsT0FBTztZQUlqQyxJQUFJbVgsbUJBQXNCM1YsRUFBRXhCO1lBQzVCLElBQUlvWCxZQUFzQkQsaUJBQWlCekIsS0FBSztZQUNoRCxJQUFJMkIsYUFBc0I7WUFDMUIsSUFBSUMsbUJBQXNCO1lBQzFCLElBQUlDLGNBQXNCSCxVQUFVSSxPQUFPeFcsTUFBTXFXLFlBQVlwVyxTQUFTLElBQUltVyxVQUFVSSxPQUFPeFcsTUFBTXFXLFlBQVksS0FBSztZQUNsSCxJQUFJSSxvQkFBc0JMLFVBQVVJLE9BQU94VyxNQUFNc1csa0JBQWtCclcsU0FBUyxJQUFJbVcsVUFBVUksT0FBT3hXLE1BQU1zVyxrQkFBa0IsS0FBSztZQUM5SCxJQUFJSTtZQUVKLElBQUlELG1CQUFtQjtnQkFLbkIsSUFBSUUsZUFBZ0JUO2dCQUNwQixJQUFJVSxnQkFBZ0JWOztZQUl4QixJQUFJSyxhQUFhO2dCQUliSCxVQUFVMUIsS0FBSyxrQkFBa0IyQixhQUFhLE1BQU1sSDtnQkFJcER1SCxTQUFVO2dCQUNWQSxVQUFjO2dCQUNkQSxVQUFrQkg7Z0JBQ2xCRyxVQUFjO2dCQUNkQSxVQUFjO2dCQUNkQSxVQUFrQlAsaUJBQWlCck47Z0JBQ25DNE4sVUFBYztnQkFDZEEsVUFBVTs7WUFJZCxJQUFJRCxtQkFBbUI7Z0JBSW5CTCxVQUFVMUIsS0FBSyxrQkFBa0I0QixtQkFBbUIsTUFBTW5IO2dCQUkxRHVILFNBQVU7Z0JBQ1ZBLFVBQWM7Z0JBQ2RBLFVBQWtCO2dCQUNsQkEsVUFBc0I7Z0JBQ3RCQSxVQUEwQiw2Q0FBNkNDLGFBQWE7Z0JBQ3BGRCxVQUFzQjtnQkFDdEJBLFVBQXNCO2dCQUN0QkEsVUFBMEIsNkNBQTZDRSxjQUFjO2dCQUNyRkYsVUFBc0I7Z0JBQ3RCQSxVQUFrQjtnQkFDbEJBLFVBQWM7Z0JBQ2RBLFVBQWMseUJBQXlCQyxhQUFhO2dCQUNwREQsVUFBa0JEO2dCQUNsQkMsVUFBYztnQkFDZEEsVUFBYyx5QkFBeUJFLGNBQWM7Z0JBQ3JERixVQUFrQlAsaUJBQWlCck47Z0JBQ25DNE4sVUFBYztnQkFDZEEsVUFBVTs7WUFNZCxJQUFJSCxlQUFlRSxtQkFBbUI7Z0JBQ2xDQyxTQUFTRyxXQUFXSDttQkFDakI7Z0JBQ0hBLFNBQVNHLFdBQVdWOztZQUt4QixJQUFJSSxlQUFlRSxtQkFBbUI7Z0JBQ2xDTixpQkFBaUJXLFlBQVlKOztZQUtqQ25aLElBQUl3SixTQUFTdkcsRUFBRXhCOzs7SUFNdkIsU0FBUzZYLFdBQVdIO1FBU2hCLElBQUlLLDJCQUEyQi9VLFNBQVNnVix5QkFBeUJoVixTQUFTZ1Ysc0JBQXNCO1FBS2hHLEtBQUtELDBCQUEwQixPQUFPTDtRQUl0QyxJQUFJTyxVQUF5QlAsa0JBQWtCeFYsU0FBU3dWLFNBQVNsVyxFQUFFa1c7UUFDbkUsSUFBSVEsV0FBeUIxVyxFQUFFO1FBQy9CLElBQUkyVyxjQUF5QkYsUUFBUXZDLEtBQUs7UUFDMUMsSUFBSTBDLHlCQUF5QkQsWUFBWWxYLFNBQVMsT0FBTztRQUl6RGlYLFNBQVMzUSxHQUFHLFNBQVM7WUFJakIsSUFBSThRLFFBQVFILFNBQVN6USxTQUFTaU8sS0FBSyxRQUFRNUc7WUFJM0N3SixnQkFBZ0JEO1lBSWhCOVosSUFBSW9HLE1BQU11VDs7UUFNZCxJQUFJRSx3QkFBd0I7WUFDeEJILFFBQVF2QyxLQUFLLGlCQUFpQnBELE9BQU80RjtlQUNsQztZQUNIRCxRQUFRM0YsT0FBTzRGOztRQUtuQixPQUFPRDs7SUFJWCxTQUFTSyxnQkFBZ0JDO1FBUXJCLElBQUlDLFlBQVk5WSxPQUFPK1k7UUFDdkIsSUFBSUMsUUFBWTFWLFNBQVMyVjtRQUV6QkQsTUFBTUUsbUJBQW1CTCxRQUFRO1FBQ2pDQyxVQUFVSyxTQUFTSDtRQUVuQjFWLFNBQVM4VixZQUFZO1FBRXJCTixVQUFVTzs7SUFPZDtRQUNJN1EsWUFBYUE7Ozs7QUNoTXJCM0osSUFBSUksVUFBVXFhLFlBQVk7SUFJdEIsSUFBSTVVLFdBQVc3RixJQUFJNEY7SUFFbkIsSUFBSW1FO1FBQ0FDO1lBQ0kwUSxNQUFZO1lBQ1pDLE9BQVk7WUFDWkMsU0FBWTtZQUNaQyxTQUFZOztRQUVoQjNRO1lBQ0l3USxNQUFZO1lBQ1pDLE9BQVk7WUFDWkMsU0FBWTtZQUNaQyxTQUFZOzs7SUFNcEIsSUFBSUMsc0JBQXNCN1gsRUFBRTtJQWU1QixJQUFJOFgsMkJBQTJCOVgsRUFBRTtJQUNqQyxJQUFJK1gsa0JBQTJCL1gsRUFBRTtJQUtqQyxTQUFTMEcsV0FBV3NSLFlBQVluVDtRQWtCNUIsSUFBSW1ULGFBQWFqYixJQUFJb0ksaUJBQWlCLGFBQWE2UyxZQUFZblQ7UUFFL0QsSUFBSW1ULFlBQVlBLFdBQVcvWCxLQUFLLFNBQVNFO1lBSXJDLElBQUlwRCxJQUFJMEosUUFBUXpHLEVBQUV4QixRQUFRLE9BQU87WUFJakMsSUFBSXlaLGlCQUFrQmpZLEVBQUV4QjtZQUN4QixJQUFJcUcsVUFBa0JvVCxlQUFlclgsT0FBT2lFO1lBQzVDLElBQUlxVCxjQUFrQixJQUFJblcsT0FBT29XO1lBQ2pDLElBQUlDLGVBQWtCO1lBQ3RCLElBQUlDLGFBQWtCO1lBQ3RCLElBQUlDLGNBQWtCO1lBQ3RCLElBQUlDLGdCQUFrQjtZQUN0QixJQUFJQyxnQkFBa0I7WUFDdEIsSUFBSUMsT0FBa0I1VCxRQUFRNFQsU0FBUzdaLFlBQVlzWixjQUFjaE4sU0FBU3JHLFFBQVE0VDtZQUNsRixJQUFJQyxRQUFrQjdULFFBQVE2VCxVQUFVOVosYUFBYXNNLFNBQVNyRyxRQUFRNlQsU0FBUyxNQUFNeE4sU0FBU3JHLFFBQVE2VCxTQUFTLElBQUlOLGVBQWVsTixTQUFTckcsUUFBUTZUO1lBQ25KLElBQUlDLE1BQWtCOVQsUUFBUThULFFBQVEvWixhQUFhc00sU0FBU3JHLFFBQVE4VCxPQUFPLE1BQU16TixTQUFTckcsUUFBUThULE9BQU8sSUFBSU4sYUFBYW5OLFNBQVNyRyxRQUFROFQ7WUFDM0ksSUFBSUMsT0FBa0IvVCxRQUFRK1QsU0FBU2hhLGFBQWFzTSxTQUFTckcsUUFBUStULFFBQVEsTUFBTTFOLFNBQVNyRyxRQUFRK1QsUUFBUSxJQUFJTixjQUFjcE4sU0FBU3JHLFFBQVErVDtZQUMvSSxJQUFJQyxTQUFrQmhVLFFBQVFnVSxXQUFXamEsYUFBYXNNLFNBQVNyRyxRQUFRZ1UsVUFBVSxNQUFNM04sU0FBU3JHLFFBQVFnVSxVQUFVLElBQUlOLGdCQUFnQnJOLFNBQVNyRyxRQUFRZ1U7WUFDdkosSUFBSUMsU0FBa0JqVSxRQUFRaVUsV0FBV2xhLGFBQWFzTSxTQUFTckcsUUFBUWlVLFVBQVUsTUFBTTVOLFNBQVNyRyxRQUFRaVUsVUFBVSxJQUFJTixnQkFBZ0J0TixTQUFTckcsUUFBUWlVO1lBSXZKYixlQUFlclgsT0FBT29FO2dCQUNsQitULFNBQVlDLGNBQWNOLE9BQU9DLEtBQUtGLE1BQU1HLE1BQU1DLFFBQVFDO2dCQUMxRDNZLE9BQVlBOztZQUtoQjhZLE9BQU9oQjtZQUlQbGIsSUFBSThCLFlBQVksb0JBQW9Cc0IsT0FBTyxLQUFNO2dCQUM3Q29ULE9BQU8wRTs7WUFLWGxiLElBQUl3SixTQUFTdkcsRUFBRXhCOzs7SUFNdkIsU0FBU3lhLE9BQU9oQjtRQVFaLElBQUljLFVBQXNCZCxlQUFlclgsT0FBT29FLE1BQU0rVDtRQUN0RCxJQUFJRyxnQkFBc0JDLGlCQUFpQko7UUFDM0MsSUFBSUssZ0JBQXNCQyw4QkFBOEJIO1FBQ3hELElBQUlJLGVBQXNCckIsZUFBZS9ELEtBQUs7UUFDOUMsSUFBSXFGLHNCQUFzQnhCLGdCQUFnQnZRO1FBSTFDLEtBQUssSUFBSTFKLElBQUksR0FBR0EsSUFBSTRILE9BQU9DLEtBQUt5VCxlQUFlM1osUUFBUTNCLEtBQUs7WUFFeEQsSUFBSTBiLE9BQWtCOVQsT0FBT0MsS0FBS3lULGVBQWV0YjtZQUNqRCxJQUFJMmIsa0JBQWtCelosRUFBRSxlQUFlZ0IsU0FBUyxnQkFBZ0J3WTtZQUNoRSxJQUFJRSxrQkFBa0JDLGtCQUFrQkg7WUFFeEMsSUFBSU4sY0FBY1UsUUFBUSxHQUFHO2dCQUN6QkgsZ0JBQWdCM0ksT0FBTytHLG9CQUFvQnJRLFFBQVF4RyxTQUFTb1ksY0FBY0ksTUFBTTtnQkFDaEZDLGdCQUFnQjNJLE9BQU8rRyxvQkFBb0JyUSxRQUFReEcsU0FBU29ZLGNBQWNJLE1BQU07bUJBQzdFO2dCQUNIQyxnQkFBZ0IzSSxPQUFPK0csb0JBQW9CclEsUUFBUXhHLFNBQVM7Z0JBQzVEeVksZ0JBQWdCM0ksT0FBTytHLG9CQUFvQnJRLFFBQVF4RyxTQUFTOztZQUdoRXlZLGdCQUFnQjNJLE9BQU80STtZQUN2Qkgsb0JBQW9CekksT0FBTzJJOztRQU0vQnhCLGVBQWVuSCxPQUFPeUk7UUFLdEIsSUFBSUQsYUFBYTdaLFdBQVcsR0FBRztZQUMzQndZLGVBQWVuSCxPQUFPOVEsRUFBRTs7O0lBS2hDLFNBQVN1VCxPQUFPMEU7UUFRWixJQUFJYyxVQUFnQmQsZUFBZXJYLE9BQU9vRSxNQUFNK1Q7UUFDaEQsSUFBSTVZLFFBQWdCOFgsZUFBZXJYLE9BQU9vRSxNQUFNN0U7UUFDaEQsSUFBSStZLGdCQUFnQkMsaUJBQWlCSjtRQUNyQyxJQUFJblcsV0FBZ0I3RixJQUFJNEY7UUFDeEIsSUFBSTJXLGVBQWdCckIsZUFBZS9ELEtBQUs7UUFJeEMsSUFBSWdGLGNBQWNVLFNBQVMsR0FBRztZQUMxQjdjLElBQUlrQyxjQUFjLG9CQUFvQmtCO1lBQ3RDOFgsZUFBZTdULFFBQVE7O1FBSzNCLElBQUlnVixnQkFBZ0JDLDhCQUE4Qkg7UUFJbEQsS0FBSyxJQUFJcGIsSUFBSSxHQUFHQSxJQUFJNEgsT0FBT0MsS0FBS3lULGVBQWUzWixRQUFRM0IsS0FBSztZQUV4RCxJQUFJMGIsT0FBVzlULE9BQU9DLEtBQUt5VCxlQUFldGI7WUFDMUMsSUFBSStiLFdBQVcsaUJBQWlCTCxPQUFPO1lBRXZDLElBQUlOLGNBQWNVLFFBQVEsR0FBRztnQkFDekIzQixlQUFlL0QsS0FBSzJGLFVBQVVDLEdBQUcsR0FBR3BYLEtBQUssU0FBUywwQkFBMEIwVyxjQUFjSSxNQUFNO2dCQUNoR3ZCLGVBQWUvRCxLQUFLMkYsVUFBVUMsR0FBRyxHQUFHcFgsS0FBSyxTQUFTLDBCQUEwQjBXLGNBQWNJLE1BQU07bUJBQzdGO2dCQUNIdkIsZUFBZS9ELEtBQUsyRixVQUFVQyxHQUFHLEdBQUdwWCxLQUFLLFNBQVM7Z0JBQ2xEdVYsZUFBZS9ELEtBQUsyRixVQUFVQyxHQUFHLEdBQUdwWCxLQUFLLFNBQVM7OztRQU8xRCxJQUFJcVg7WUFDQWhULElBQU9tUyxjQUFjekIsT0FBTyxZQUFZeUIsY0FBY3hCLFFBQVEsYUFBYXdCLGNBQWN2QixVQUFVLGtCQUFrQnVCLGNBQWN0QixVQUFVO1lBQzdJM1EsSUFBTyxVQUFVaVMsY0FBY3pCLE9BQU8sWUFBWXlCLGNBQWN4QixRQUFRLGVBQWV3QixjQUFjdkIsVUFBVSxrQkFBa0J1QixjQUFjdEIsVUFBVTs7UUFHN0owQixhQUFhdEQsS0FBSytELFNBQVNuWDs7SUFJL0IsU0FBU29XLGNBQWNOLE9BQU9DLEtBQUtGLE1BQU1HLE1BQU1DLFFBQVFDO1FBU25ELElBQUlrQixXQUNBLFdBQ0EsWUFDQSxTQUNBLFNBQ0EsT0FDQSxRQUNBLFFBQ0EsVUFDQSxhQUNBLFdBQ0EsWUFDQTtRQUdKLElBQUlDLG1CQUFtQkQsT0FBT3RCLFFBQVEsS0FBSyxNQUFNQyxNQUFNLE1BQU1GLE9BQU8sTUFBTUcsT0FBTyxNQUFNQyxTQUFTLE1BQU1DO1FBRXRHLE9BQU9tQjs7SUFJWCxTQUFTZCxpQkFBaUJKO1FBV3RCLElBQUlhLFFBQVU3WCxLQUFLbVksTUFBTW5CLFdBQVdoWCxLQUFLbVksTUFBTSxJQUFJblk7UUFDbkQsSUFBSTZWLFVBQVU3YSxJQUFJVSxRQUFRRyxLQUFLdWMsTUFBT1AsUUFBUSxNQUFRLEtBQU12WTtRQUM1RCxJQUFJc1csVUFBVTVhLElBQUlVLFFBQVFHLEtBQUt1YyxNQUFPUCxRQUFRLE1BQU8sS0FBTSxLQUFNdlk7UUFDakUsSUFBSXFXLFFBQVUzYSxJQUFJVSxRQUFRRyxLQUFLdWMsTUFBT1AsU0FBUyxNQUFPLEtBQUssTUFBTyxLQUFNdlk7UUFDeEUsSUFBSW9XLE9BQVUxYSxJQUFJVSxRQUFRRyxLQUFLdWMsTUFBTVAsU0FBUyxNQUFPLEtBQUssS0FBSyxNQUFNdlk7UUFJckU7WUFDSXVZLE9BQVlBO1lBQ1puQyxNQUFZQTtZQUNaQyxPQUFZQTtZQUNaQyxTQUFZQTtZQUNaQyxTQUFZQTs7O0lBS3BCLFNBQVN5Qiw4QkFBOEJIO1FBU25DO1lBQ0l6QixRQUNJLGdCQUFnQnlCLGNBQWN6QixLQUFLMkMsT0FBTyxJQUMxQyxnQkFBZ0JsQixjQUFjekIsS0FBSzJDLE9BQU87WUFFOUMxQyxTQUNJLGdCQUFnQndCLGNBQWN4QixNQUFNMEMsT0FBTyxJQUMzQyxnQkFBZ0JsQixjQUFjeEIsTUFBTTBDLE9BQU87WUFFL0N6QyxXQUNJLGdCQUFnQnVCLGNBQWN2QixRQUFReUMsT0FBTyxJQUM3QyxnQkFBZ0JsQixjQUFjdkIsUUFBUXlDLE9BQU87WUFFakR4QyxXQUNJLGdCQUFnQnNCLGNBQWN0QixRQUFRd0MsT0FBTyxJQUM3QyxnQkFBZ0JsQixjQUFjdEIsUUFBUXdDLE9BQU87OztJQU16RCxTQUFTVCxrQkFBa0JIO1FBU3ZCLElBQUlhLFNBQVd2Qyx5QkFBeUJ0UTtRQUV4QzZTLE9BQU9yRSxLQUFLbFAsYUFBYWxFLFVBQVU0VztRQUVuQyxPQUFPYTs7SUFPWDtRQUNJMVQsTUFBT0Q7Ozs7QUNuVWYzSixJQUFJSSxVQUFVbWQsYUFBYTtJQUt2QixJQUFJM1csWUFBWTNELEVBQUV3QjtJQUlsQixJQUFJb0IsV0FBVzdGLElBQUk0RjtJQUVuQixJQUFJbUU7UUFDQUM7WUFDSXdULFlBQ0ksT0FDQSxPQUNBLE9BQ0EsT0FDQSxPQUNBLE9BQ0E7WUFFSkMsY0FDSSxXQUNBLFlBQ0EsU0FDQSxTQUNBLE9BQ0EsUUFDQSxRQUNBLFVBQ0EsYUFDQSxXQUNBLFlBQ0E7O1FBR1J2VDtZQUNJc1QsWUFDSSxNQUNBLE1BQ0EsTUFDQSxNQUNBLE1BQ0EsTUFDQTtZQUVKQyxjQUNJLFVBQ0EsV0FDQSxRQUNBLFNBQ0EsT0FDQSxRQUNBLFFBQ0EsVUFDQSxhQUNBLFdBQ0EsWUFDQTs7O0lBUVosSUFBSTVYLGtCQUFrQjdGLElBQUk0RixhQUFhLFlBQVk1RixJQUFJNEYsYUFBYS9ELGFBQWE3QixJQUFJNEYsYUFBYSxLQUFLLE9BQU81RixJQUFJNEY7SUFJbEgsSUFBSVg7SUFJSixJQUFJeVksY0FBY3phLEVBQUU7SUFRcEIsSUFBSTBhLGtCQUFrQjFhLEVBQUUsaUNBRVI4RyxhQUFhbEUsVUFBVSxZQUFZLEtBQUssMEJBQ3hDa0UsYUFBYWxFLFVBQVUsWUFBWSxLQUFLLDBCQUN4Q2tFLGFBQWFsRSxVQUFVLFlBQVksS0FBSywwQkFDeENrRSxhQUFhbEUsVUFBVSxZQUFZLEtBQUssMEJBQ3hDa0UsYUFBYWxFLFVBQVUsWUFBWSxLQUFLLDBCQUN4Q2tFLGFBQWFsRSxVQUFVLFlBQVksS0FBSywwQkFDeENrRSxhQUFhbEUsVUFBVSxZQUFZLEtBQUs7SUFPeEQsU0FBUzhELFdBQVdpVSxhQUFhOVY7UUFpQjdCK1Y7UUFJQSxJQUFJRCxjQUFjNWQsSUFBSW9JLGlCQUFpQixjQUFjd1YsYUFBYTlWO1FBRWxFLElBQUk4VixhQUFhQSxZQUFZMWEsS0FBSyxTQUFTRTtZQUl2QyxJQUFJcEQsSUFBSTBKLFFBQVF6RyxFQUFFeEIsUUFBUSxPQUFPO1lBSWpDLElBQUlxYyxpQkFBaUI3YSxFQUFFeEI7WUFJdkIsSUFBSXFHLFVBQVVnVyxlQUFlamEsT0FBT2lFO1lBS3BDLElBQUlpVyxZQUFhalcsUUFBUTRULFNBQVU3WixZQUFZb0QsSUFBSXlXLE9BQVF2TixTQUFTckcsUUFBUTRUO1lBQzVFLElBQUlzQyxhQUFhbFcsUUFBUTZULFVBQVU5WixZQUFZb0QsSUFBSTBXLFFBQVF4TixTQUFTckcsUUFBUTZULFFBQVE7WUFDcEYsSUFBSXNDLFdBQWFuVyxRQUFROFQsUUFBVS9aLFlBQVlvRCxJQUFJMlcsTUFBUXpOLFNBQVNyRyxRQUFROFQ7WUFFNUVzQyxnQkFDSUosZ0JBQ0FDLFdBQ0FDLFlBQ0FDO1lBS0osSUFBSUUsa0JBQWtCQyxpQkFBaUJMLFdBQVdDLFlBQVlDO1lBSTlESCxlQUFlMU4sS0FBSztZQUNwQixJQUFJaU8sd0JBQXdCUCxlQUFldEwsUUFBUTtZQUluRHNMLGVBQWVRLE1BQU1IO1lBQ3JCQSxnQkFBZ0IxYTtZQUloQjRhLHNCQUFzQnJWLEdBQUcsU0FBUyxTQUFTSTtnQkFDdkMwVSxlQUFlelcsUUFBUTs7WUFLM0J5VyxlQUNLOVUsR0FBRyxTQUFTLFNBQVNJO2dCQU1sQkEsRUFBRW1WO2VBR0x2VixHQUFHLFFBQVE7Z0JBRVJoSixJQUFJcUIsU0FBUywyQkFBMkIrQixPQUFPLEtBQUs7b0JBSWhELElBQUlvYixxQkFBcUJWLGVBQWVqYSxPQUFPb0U7b0JBSS9DNlYsZUFBZS9SLEtBQUssZUFBZWxCLFFBQVEsUUFBUTt3QkFJL0NzVCxnQkFBZ0JoSCxLQUFLLHFCQUFxQm9DLFlBQVlrRixpQkFBaUJOLGlCQUFpQkssbUJBQW1CRSxjQUFjRixtQkFBbUJHO3dCQUM1SVIsZ0JBQWdCaEgsS0FBSyx1QkFBdUI4QixLQUFLbFAsYUFBYWxFLFVBQVUsY0FBYzJZLG1CQUFtQkcsaUJBQWlCLE1BQU1ILG1CQUFtQkU7O29CQU12SjlYLFVBQVVTLFFBQVE7O2VBS3pCMkIsR0FBRyxTQUFTLFNBQVNJO2dCQUVsQnBKLElBQUkwQixXQUFXLDJCQUEyQjBCO2dCQUkxQ3diO2dCQUtBLElBQUlULGtCQUFrQlUsZ0JBQWdCZixlQUFlL1IsS0FBSztnQkFJMURvUyxnQkFBZ0JwYTtnQkFJaEI2QyxVQUFVUyxRQUFROztZQU0xQnJILElBQUl3SixTQUFTdkcsRUFBRXhCOzs7SUFNdkIsU0FBU3FkLGlCQUFpQlgsaUJBQWlCTyxjQUFjQyxlQUFlSTtRQWFwRSxJQUFJQyx3QkFBd0JoZixJQUFJVSxRQUFRcWUsYUFBYSxLQUFLLE1BQU0vZSxJQUFJVSxRQUFRaWUsZUFBZSxLQUFLLE1BQU1EO1FBSXRHUCxnQkFBZ0J0YSxPQUFPb0U7WUFDbkJ5VyxjQUEwQkE7WUFDMUJDLGVBQTBCQTtZQUMxQkksYUFBMEJBO1lBQzFCQyx1QkFBMEJBOzs7SUFLbEMsU0FBU0MsaUJBQWlCQyxpQkFBaUJ4RCxNQUFNQztRQWE3Q2tDO1FBSUEsSUFBSWxDLFVBQVU5WixhQUFhNlosU0FBUzdaLFdBQVc7WUFLM0MsSUFBSTZaLE9BQVF6VyxJQUFJeVc7WUFDaEIsSUFBSUMsUUFBUTFXLElBQUkwVzs7UUFNcEIsSUFBSXdELG1CQUFtQixJQUFJbmEsS0FBSzBXLE1BQU1DLE9BQU87UUFDN0MsSUFBSXlELFdBQW1CRCxpQkFBaUJFO1FBQ3hDRixtQkFBdUI7UUFJdkIsSUFBSUcsWUFBWUMsYUFBYTdELE1BQU1DO1FBSW5DLElBQUlvRCxjQUFjRyxnQkFBZ0IvSCxLQUFLLDRCQUE0QjhCO1FBSW5FLElBQUl1RyxnQkFBZ0J4ZixJQUFJVSxRQUFRcWUsYUFBYSxLQUFLLE1BQU0vZSxJQUFJVSxRQUFRaWIsUUFBUSxHQUFHLEtBQUssTUFBTUQ7UUFJMUZ3RCxnQkFBZ0JyYixPQUFPb0U7WUFDbkJtWCxVQUFtQkE7WUFDbkJFLFdBQW1CQTtZQUNuQjVELE1BQW1CQTtZQUNuQkMsT0FBbUJBO1lBQ25CNkQsZUFBbUJBOzs7SUFLM0IsU0FBU3RCLGdCQUFnQkosZ0JBQWdCcEMsTUFBTUMsT0FBT0M7UUFjbEQsSUFBSTREO1FBRUosS0FBSzVELFFBQVFELFVBQVVELE1BQU07WUFDekI4RCxnQkFBZ0I7ZUFDYjtZQUNILElBQUkzWixhQUFhLE1BQU0yWixnQkFBZ0J4ZixJQUFJVSxRQUFRa2IsS0FBSyxLQUFLLE1BQU01YixJQUFJVSxRQUFRaWIsUUFBUSxHQUFHLEtBQUssTUFBTUQ7WUFDckcsSUFBSTdWLGFBQWEsTUFBTTJaLGdCQUFnQnhmLElBQUlVLFFBQVFpYixRQUFRLEdBQUcsS0FBSyxNQUFNM2IsSUFBSVUsUUFBUWtiLEtBQUssS0FBSyxNQUFNRjs7UUFLekdvQyxlQUFlamEsT0FBT29FO1lBQ2xCeVcsY0FBa0JoRDtZQUNsQmlELGVBQWtCaEQ7WUFDbEJvRCxhQUFrQm5EO1lBQ2xCNEQsZUFBa0JBOztRQUt0QjFCLGVBQWUyQixJQUFJRDs7SUFJdkIsU0FBU2YsaUJBQWlCTixpQkFBaUJ6QyxNQUFNQztRQWM3QyxJQUFJK0QsY0FBa0J6YyxFQUFFO1FBQ3hCLElBQUkwYyxrQkFBa0JELFlBQVl2SSxLQUFLLFNBQVM1RztRQUloRDBPLGlCQUFpQlMsYUFBYWhFLE1BQU1DO1FBSXBDLElBQUlpRSxzQkFBc0JGLFlBQVk3YixPQUFPb0U7UUFJN0MsSUFBSTRYLHNCQUFzQjFCLGdCQUFnQnRhLE9BQU9vRTtRQUlqRDBYLGdCQUFnQjVMLE9BQU80SixnQkFBZ0JsVDtRQUl2QyxJQUFJcVYsWUFBWTtRQUNoQixJQUFJQyxXQUFZO1FBSWhCLEtBQUssSUFBSWhmLElBQUksR0FBR0EsSUFBSUYsS0FBS21mLE1BQU1KLG9CQUFvQk4sWUFBWU0sb0JBQW9CUixXQUFXLEtBQUssSUFBSXJlLEtBQUs7WUFJeEcsSUFBSWtmLE9BQU9oZCxFQUFFO1lBSWIsS0FBSyxJQUFJaWQsSUFBSSxHQUFHQSxJQUFJLEdBQUdBLEtBQUs7Z0JBRXhCLElBQUlDLFFBQVFsZCxFQUFFO2dCQUlkLElBQUk2YyxZQUFZRixvQkFBb0JSLFlBQVlXLFdBQVdILG9CQUFvQk4sV0FBVztvQkFDdEZhLE1BQU1sYyxTQUFTO3VCQUtkO29CQUNEa2MsTUFBTWxILEtBQUs4RztvQkFDWEE7O2dCQUtKLElBQUlILG9CQUFvQmpFLFVBQVVrRSxvQkFBb0JsQixpQkFBaUJpQixvQkFBb0JsRSxTQUFTbUUsb0JBQW9CbkIsZ0JBQWdCcUIsV0FBVyxNQUFNRixvQkFBb0JkLGFBQWE7b0JBQ3RMb0IsTUFBTWxjLFNBQVM7O2dCQUtuQixJQUFJMmIsb0JBQW9CakUsVUFBVTFXLElBQUkwVyxTQUFTaUUsb0JBQW9CbEUsU0FBU3pXLElBQUl5VyxRQUFRcUUsV0FBVyxNQUFNOWEsSUFBSTJXLEtBQUs7b0JBQzlHdUUsTUFBTWxjLFNBQVM7O2dCQUtuQmdjLEtBQUtsTSxPQUFPb007Z0JBSVpMOztZQU1KSCxnQkFBZ0I1TCxPQUFPa007O1FBTTNCUCxZQUFZdkksS0FBSyxpQ0FBaUNuTyxHQUFHLGFBQWE7WUFFOUQsSUFBSStWLGNBQWM1USxTQUFTbEwsRUFBRXhCLE1BQU13WDtZQUVuQ21ILFNBQVNWLGFBQWFFLG9CQUFvQmxFLE1BQU1rRSxvQkFBb0JqRSxPQUFPb0Q7O1FBTS9FLE9BQU9XOztJQUlYLFNBQVN0QixpQkFBaUIxQyxNQUFNQyxPQUFPb0Q7UUFpQm5DLElBQUlaLGtCQUFrQlQsWUFBWWpUO1FBRWxDcVUsaUJBQ0lYLGlCQUNBekMsTUFDQUMsT0FDQW9EO1FBS0osSUFBSUcsa0JBQWtCVCxpQkFBaUJOLGlCQUFpQnpDLE1BQU1DO1FBSTlEd0MsZ0JBQWdCcEssT0FBT21MO1FBSXZCLElBQUl2RCxVQUFVOVosV0FBVzhaLFFBQVExVyxJQUFJMFc7UUFDckMsSUFBSUQsU0FBVTdaLFdBQVc2WixPQUFRelcsSUFBSXlXO1FBSXJDeUMsZ0JBQWdCaEgsS0FBSyx1QkFBdUI4QixLQUFLbFAsYUFBYWxFLFVBQVUsY0FBYzhWLFNBQVMsTUFBTUQ7UUFJckd5QyxnQkFBZ0JoSCxLQUFLLHlCQUF5Qm5PLEdBQUcsU0FBUyxTQUFTSTtZQUUvREEsRUFBRUM7WUFJRixJQUFJZ1gsbUJBQXNCcGQsRUFBRXhCO1lBQzVCLElBQUk2ZSxrQkFBc0JELGlCQUFpQjdOLFFBQVE7WUFDbkQsSUFBSTBNLGtCQUFzQm9CLGdCQUFnQm5KLEtBQUs7WUFDL0MsSUFBSXlJLHNCQUFzQlYsZ0JBQWdCcmIsT0FBT29FO1lBQ2pELElBQUkwVCxRQUFzQmlFLG9CQUFvQmpFO1lBQzlDLElBQUlELE9BQXNCa0Usb0JBQW9CbEU7WUFJOUMsSUFBSTZFLGFBQWFGLGlCQUFpQjFhLEtBQUs7WUFJdkMsSUFBSTRhLGVBQWUsYUFBYTtnQkFDNUIsSUFBSTVFLFFBQVEsR0FBRztzQkFDVEE7dUJBQ0M7b0JBQ0hBLFFBQVE7c0JBQ05EOzs7WUFNVixJQUFJNkUsZUFBZSxhQUFhO2dCQUM1QixJQUFJNUUsUUFBUSxJQUFJO3NCQUNWQTt1QkFDQztvQkFDSEEsUUFBUTtzQkFDTkQ7OztZQU9WeUMsZ0JBQWdCaEgsS0FBSyxxQkFBcUJvQyxZQUFZa0YsaUJBQWlCTixpQkFBaUJ6QyxNQUFNQztZQUM5RndDLGdCQUFnQmhILEtBQUssdUJBQXVCOEIsS0FBS2xQLGFBQWFsRSxVQUFVLGNBQWM4VixTQUFTLE1BQU1EO1lBSXJHdUQsaUJBQWlCQyxpQkFBaUJ4RCxNQUFNQzs7UUFNNUN3QyxnQkFBZ0JuVixHQUFHLGFBQWE7WUFLNUJoSixJQUFJcUIsU0FBUyx3QkFBd0IsSUFBSTtnQkFDckM4YyxnQkFBZ0JxQyxLQUFLLHlCQUF5QkM7OztRQU90RCxPQUFPdEM7O0lBSVgsU0FBU2lDLFNBQVNsQixpQkFBaUJSLGNBQWNDLGVBQWVJO1FBVzVELElBQUlaLGtCQUFrQmUsZ0JBQWdCMU0sUUFBUTtRQUM5QyxJQUFJc0wsaUJBQWtCSyxnQkFBZ0JxQyxLQUFLO1FBSTNDdEIsZ0JBQWdCL0gsS0FBSyxNQUFNalUsS0FBSztZQUU1QixJQUFJd2QsWUFBWXpkLEVBQUV4QjtZQUVsQmlmLFVBQVU1YyxZQUFZO1lBRXRCLElBQUlxSyxTQUFTdVMsVUFBVXpILFlBQVk4RixhQUFhO2dCQUM1QzJCLFVBQVV6YyxTQUFTOzs7UUFPM0JnYixpQkFDSUMsaUJBQ0FSLGNBQ0FDO1FBS0pHLGlCQUNJWCxpQkFDQU8sY0FDQUMsZUFDQUk7UUFLSmIsZ0JBQ0lKLGdCQUNBWSxjQUNBQyxlQUNBSTs7SUFLUixTQUFTSDtRQU1MM2IsRUFBRSxvQ0FBb0NRO1FBQ3RDbUQsVUFBVVMsUUFBUTs7SUFJdEIsU0FBU3dXO1FBV0wsSUFBSThDLGNBQWMsSUFBSTNiO1FBSXRCQztZQUNJMmIsU0FBWUQsWUFBWXRCO1lBQ3hCekQsS0FBWStFLFlBQVlFO1lBQ3hCbEYsT0FBWWdGLFlBQVlHO1lBQ3hCcEYsTUFBWXFGLFdBQVdKLFlBQVlLOzs7SUFLM0MsU0FBU3pCLGFBQWE3RCxNQUFNQztRQVV4QixJQUFJc0YsaUJBQ0EsSUFDQSxJQUNBLElBQ0EsSUFDQSxJQUNBLElBQ0EsSUFDQSxJQUNBLElBQ0EsSUFDQSxJQUNBO1FBS0osSUFBSXZGLE9BQU8sTUFBTSxHQUNidUYsYUFBYSxLQUFLO1FBSXRCLE9BQU9BLGFBQWF0Rjs7SUFJeEIsU0FBU29GLFdBQVdyRjtRQVNoQixJQUFJQSxPQUFPLEtBQU07WUFDYkEsUUFBUTs7UUFHWixPQUFPQTs7SUFJWCxTQUFTbUQsZ0JBQWdCVjtRQWNyQixJQUFJK0MsYUFBbUIvQyxnQkFBZ0JxQyxLQUFLO1FBSTVDLElBQUlXLG1CQUFtQkQsV0FBV3ZRLFNBQVNaO1FBQzNDLElBQUlxUixrQkFBbUJGLFdBQVdoUjtRQUNsQyxJQUFJbVIsbUJBQW1CbEQsZ0JBQWdCak87UUFDdkMsSUFBSW9SLGlCQUFtQnJlLEVBQUU5QixRQUFRc0s7UUFDakMsSUFBSTJDLFlBQW1CbkwsRUFBRTlCLFFBQVFpTjtRQUlqQyxJQUFJbVQsUUFBUUQsa0JBQW1CSCxtQkFBbUJDLGtCQUFtQmhULGFBQWFpVCxtQkFBbUIsVUFBVTtRQUkvRyxJQUFJRSxVQUFVLFNBQVM7WUFDbkJwRCxnQkFBZ0IzVCxJQUFJLFFBQVEsSUFBSTZXLG1CQUFtQixLQUFLO2VBQ3JELElBQUlFLFVBQVUsU0FBUztZQUMxQnBELGdCQUFnQjNULElBQUksT0FBTzRXLGtCQUFrQixLQUFLOztRQUt0RCxPQUFPakQ7O0lBT1g7UUFDSXZVLE1BQU9EO1FBQ1BsRyxNQUFPbWI7Ozs7QUN0d0JmNWUsSUFBSUksVUFBVW9oQixPQUFPO0lBS2pCLFNBQVM3WCxXQUFXOFgsT0FBTzNaO1FBY3ZCLElBQUkyWixRQUFRemhCLElBQUlvSSxpQkFBaUIsUUFBUXFaLE9BQU8zWjtRQUVoRCxJQUFJMlosT0FBT0EsTUFBTXZlLEtBQUs7WUFJbEIsSUFBSWxELElBQUkwSixRQUFRekcsRUFBRXhCLFFBQVEsT0FBTztZQUlqQyxJQUFJaWdCLFlBQVl6ZSxFQUFFeEI7WUFDbEIsSUFBSXFHLFVBQVk0WixVQUFVN2QsT0FBT2lFO1lBSWpDLElBQUlBLFFBQVE2WixVQUFVO2dCQUVsQmxlLEtBQUtpZTtnQkFFTEEsVUFDSzFZLEdBQUcsYUFBYTtvQkFDYmhKLElBQUkwQixXQUFXO29CQUNmcUMsS0FBSzJkO21CQUVSMVksR0FBRyxZQUFZO29CQUNaaEosSUFBSXFCLFNBQVMsZUFBZSxLQUFLO3dCQUM3Qm9DLEtBQUtpZTs7OztZQVFyQjFoQixJQUFJd0osU0FBU3ZHLEVBQUV4Qjs7O0lBTXZCLFNBQVNnQyxLQUFLaWU7UUFRVkEsVUFBVXpkLFNBQVM7UUFDbkJ5ZCxVQUFVcmEsUUFBUTtRQUNsQnFhLFVBQVU3ZCxPQUFPc0UsUUFBUTs7SUFJN0IsU0FBU3BFLEtBQUsyZDtRQVFWQSxVQUFVNWQsWUFBWTtRQUN0QjRkLFVBQVVyYSxRQUFRO1FBQ2xCcWEsVUFBVTdkLE9BQU9zRSxRQUFROztJQU83QjtRQUNJeUIsTUFBT0Q7UUFDUGxHLE1BQU9BO1FBQ1BNLE1BQU9BOzs7O0FDN0ZmL0QsSUFBSUksVUFBVXdoQixhQUFhO0lBS3ZCLFNBQVNqWSxXQUFXa1ksYUFBYS9aO1FBUzdCLElBQUkrWixjQUFjN2hCLElBQUlvSSxpQkFBaUIsY0FBY3laLGFBQWEvWjtRQUVsRSxJQUFJK1osYUFBYUEsWUFBWTNlLEtBQUs7WUFJOUIsSUFBSWxELElBQUkwSixRQUFRekcsRUFBRXhCLFFBQVEsT0FBTztZQUlqQyxJQUFJcWdCLGtCQUFrQjdlLEVBQUV4QjtZQUV4QixJQUFJcWdCLGdCQUFnQmxlLFNBQVMsMkJBQTJCO2dCQUlwRGtlLGdCQUFnQjNLLEtBQUssb0JBQW9CalUsS0FBSztvQkFFMUMsSUFBSTZlLFdBQVc5ZSxFQUFFeEI7b0JBRWpCc2dCLFNBQVMvWSxHQUFHLFNBQVMsU0FBU0k7d0JBQzFCQSxFQUFFQzt3QkFDRnVJLE9BQU9tUTs7O21CQUtaO2dCQUlIRCxnQkFBZ0IzSyxLQUFLLG9CQUFvQmpVLEtBQUs7b0JBRTFDLElBQUk2ZSxXQUFXOWUsRUFBRXhCO29CQUlqQixJQUFJc2dCLFNBQVNuZSxTQUFTLGVBQWU7d0JBQ2pDbWUsU0FBU2xlLE9BQU9zRSxRQUFROzJCQUNyQjt3QkFDSDRaLFNBQVNsZSxPQUFPc0UsUUFBUTs7b0JBSzVCNFosU0FBUy9ZLEdBQUcsU0FBUyxTQUFTSTt3QkFDMUJBLEVBQUVDO3dCQUNGb1AsT0FBT3NKOztvQkFHWEEsU0FBUy9ZLEdBQUcsWUFBWSxTQUFTSTt3QkFVN0JBLEVBQUVDO3dCQUNGMFksU0FBU2plLFlBQVk7Ozs7WUFVakM5RCxJQUFJd0osU0FBU3ZHLEVBQUV4Qjs7O0lBTXZCLFNBQVNnWCxPQUFPc0o7UUFTWixJQUFJNVosUUFBUTRaLFNBQVNsZSxPQUFPc0U7UUFFNUIsSUFBSUEsVUFBVSxNQUFNO1lBQ2hCNFosU0FBU2plLFlBQVk7WUFDckJpZSxTQUFTamUsWUFBWTtZQUNyQmllLFNBQVMxYSxRQUFRO1lBQ2pCMGEsU0FBU2xlLE9BQU9zRSxRQUFROztRQUc1QixJQUFJQSxVQUFVLE9BQU87WUFDakI0WixTQUFTOWQsU0FBUztZQUNsQjhkLFNBQVM5ZCxTQUFTO1lBQ2xCOGQsU0FBUzFhLFFBQVE7WUFDakIwYSxTQUFTbGUsT0FBT3NFLFFBQVE7OztJQUtoQyxTQUFTeUosT0FBT21RO1FBUVpBLFNBQVNsWCxRQUFRO1FBQ2pCa1gsU0FBUzFhLFFBQVE7O0lBT3JCO1FBQ0l1QyxNQUFPRDs7OztBQ3ZJZjNKLElBQUlJLFVBQVU0aEIsVUFBVTtJQUtwQixJQUFJQyx1QkFBdUI7SUFJM0IsSUFBSXBjLFdBQVc3RixJQUFJNEY7SUFFbkIsSUFBSW1FO1FBQ0FDO1lBQ0lrWSxlQUFrQjs7UUFFdEJoWTtZQUNJZ1ksZUFBa0I7OztJQU0xQixJQUFJQyxZQUFZbGYsRUFBRSxtREFDNEI4RyxhQUFhbEUsVUFBVSxtQkFBbUI7SUFNeEYsU0FBUzhELFdBQVd5WSxVQUFVdGE7UUFTMUIsSUFBSXNhLFdBQVdwaUIsSUFBSW9JLGlCQUFpQixXQUFXZ2EsVUFBVXRhO1FBRXpELElBQUlzYSxVQUFVQSxTQUFTbGYsS0FBSztZQUl4QixJQUFJbEQsSUFBSTBKLFFBQVF6RyxFQUFFeEIsUUFBUSxPQUFPO1lBSWpDLElBQUk0Z0IsZUFBMEJwZixFQUFFeEI7WUFDaEMsSUFBSTZnQixvQkFBMEJELGFBQWFsTCxLQUFLO1lBQ2hELElBQUlvTCwwQkFBMEJGLGFBQWFsTCxLQUFLO1lBQ2hELElBQUlxTCxvQkFBMEJILGFBQWFsTCxLQUFLO1lBQ2hELElBQUlzTCxxQkFBMEJKLGFBQWFsTCxLQUFLO1lBSWhEdUwsc0JBQXNCTDtZQUV0QkMsa0JBQWtCcGYsS0FBSztnQkFFbkIsSUFBSXlmLG1CQUFtQjFmLEVBQUV4QjtnQkFDekIsSUFBSXdHLFFBQW1CMGEsaUJBQWlCOWUsT0FBT29FO2dCQUsvQyxJQUFJMmEsaUJBQWlCRCxpQkFBaUJsWCxXQUFXd1c7Z0JBRWpELElBQUlXLGdCQUFnQjtvQkFDaEIzYSxNQUFNNGEsV0FBVztvQkFDakJGLGlCQUFpQjFlLFNBQVM7dUJBQ3ZCO29CQUNIZ0UsTUFBTTRhLFdBQVc7O2dCQU1yQixJQUFJNWEsTUFBTTZhLGFBQ05DLG9CQUFvQko7O1lBTTVCSix3QkFBd0J2WixHQUFHLFNBQVM7Z0JBQ2hDLElBQUkyWixtQkFBbUIxZixFQUFFeEIsTUFBTStRLFFBQVE7Z0JBQ3ZDd1Esa0JBQWtCTDs7WUFHdEJILGtCQUFrQnhaLEdBQUcsU0FBUyxTQUFTSTtnQkFDbkNBLEVBQUVDO2dCQUNGLElBQUk0WixjQUFjaGdCLEVBQUV4QjtnQkFDcEJ5aEIsYUFBYUQ7O1lBR2pCUixtQkFBbUJ6WixHQUFHLFNBQVMsU0FBU0k7Z0JBQ3BDQSxFQUFFQztnQkFDRixJQUFJNFosY0FBY2hnQixFQUFFeEI7Z0JBQ3BCeWhCLGFBQWFEOztZQUdqQlosYUFBYXJaLEdBQUcscUJBQXFCO2dCQUNqQ21hLE1BQU1kO2dCQUNOZSxlQUFlZjs7WUFHbkJBLGFBQWFyWixHQUFHLHNCQUFzQjtnQkFDbENxYSxZQUFZaEI7O1lBR2hCQSxhQUFhclosR0FBRyx5QkFBeUI7Z0JBQ3JDcWEsWUFBWWhCOztZQUtoQnJpQixJQUFJd0osU0FBU3ZHLEVBQUV4Qjs7O0lBTXZCLFNBQVMwaEIsTUFBTWY7UUFVWCxJQUFJQyxlQUFzQkQ7UUFDMUIsSUFBSUUsb0JBQXNCRCxhQUFhbEwsS0FBSztRQUM1QyxJQUFJbU0sc0JBQXNCakIsYUFBYWxMLEtBQUs7UUFJNUNtTSxvQkFBb0J4ZixZQUFZO1FBSWhDd2Usa0JBQWtCcGYsS0FBSztZQUVuQixJQUFJeWYsbUJBQW1CMWYsRUFBRXhCO1lBQ3pCLElBQUl3RyxRQUFtQjBhLGlCQUFpQjllLE9BQU9vRTtZQUUvQyxJQUFJQSxNQUFNNmEsYUFBYTtnQkFDbkJDLG9CQUFvQko7OztRQU81Qk4sYUFBYWxMLEtBQUssZUFBZTlQLFFBQVE7UUFJekNnYixhQUFhaGIsUUFBUTs7SUFJekIsU0FBUzBiLG9CQUFvQko7UUFTekIsSUFBSU4sZUFBdUJNLGlCQUFpQm5RLFFBQVE7UUFDcEQsSUFBSStRLHVCQUF1QlosaUJBQWlCeEwsS0FBSztRQUVqRCxJQUFJd0wsaUJBQWlCL2UsU0FBUywwQkFBMEI7WUFDcEQyZixxQkFBcUIvYztnQkFBVTRILFdBQVc7ZUFBSzs7UUFHbkR1VSxpQkFBaUIxZSxTQUFTO1FBRTFCaEIsRUFBRTZQLEtBQUs2UCxpQkFBaUJ4TCxLQUFLLDRCQUE0QkssUUFBUSxNQUFNVSxLQUFLO1lBQ3hFd0ssc0JBQXNCTDs7O0lBSzlCLFNBQVNtQixrQkFBa0JiO1FBU3ZCLElBQUlOLGVBQW1CTSxpQkFBaUJuUSxRQUFRO1FBRWhEbVEsaUJBQWlCN2UsWUFBWTtRQUU3QmIsRUFBRTZQLEtBQUs2UCxpQkFBaUJ4TCxLQUFLLDRCQUE0QmEsVUFBVSxNQUFNRSxLQUFLO1lBQzFFd0ssc0JBQXNCTDs7O0lBSzlCLFNBQVNXLGtCQUFrQkw7UUFTdkIsSUFBSTFhLFFBQVEwYSxpQkFBaUI5ZSxPQUFPb0U7UUFFcEMsSUFBSUEsTUFBTTZhLGFBQWE7WUFDbkJVLGtCQUFrQmI7ZUFDZjtZQUNISSxvQkFBb0JKOzs7SUFLNUIsU0FBU08sYUFBYUQ7UUFVbEIsSUFBSU4sbUJBQW1CTSxZQUFZelEsUUFBUTtRQUMzQyxJQUFJdkssUUFBbUIwYSxpQkFBaUI5ZSxPQUFPb0U7UUFDL0MsSUFBSW9hLGVBQW1CWSxZQUFZelEsUUFBUTtRQUUzQyxJQUFJeVEsWUFBWXJmLFNBQVMsa0JBQWtCO1lBQ3ZDcWYsWUFBWVEsWUFBWTtlQUNyQixJQUFJUixZQUFZcmYsU0FBUyxtQkFBbUI7WUFDL0MrZSxpQkFBaUJ4TCxLQUFLLG1CQUFtQnJULFlBQVk7WUFDckRtZixZQUFZaGYsU0FBUzs7UUFLekJnZixZQUFZNWIsUUFBUTtRQUlwQnJILElBQUlxQixTQUFTLHVCQUF1QixLQUFLO1lBSXJDLElBQUk0RyxNQUFNNmEsZUFBZTdhLE1BQU15YixrQkFDM0JYLG9CQUFvQko7WUFJeEJELHNCQUFzQkw7WUFJdEJBLGFBQWFoYixRQUFROzs7SUFNN0IsU0FBU2djLFlBQVloQjtRQVNqQixJQUFJc0IsY0FBY3RCLGFBQWFsTCxLQUFLLHNCQUFzQnpVLFNBQVM7UUFFbkUsS0FBS2loQixhQUFhO1lBQ2R4QixVQUNLMVgsUUFDQW1aLFVBQVV2QixjQUNWclosR0FBRyxTQUFTLFNBQVNJO2dCQUNsQkEsRUFBRUM7Z0JBQ0ZnWixhQUFhaGIsUUFBUTs7OztJQU1yQyxTQUFTK2IsZUFBZWY7UUFRcEJBLGFBQWFsTCxLQUFLLHNCQUFzQjBNOztJQUk1QyxTQUFTbkIsc0JBQXNCTDtRQVUzQixJQUFJQyxvQkFBb0JELGFBQWFsTCxLQUFLO1FBRTFDbUwsa0JBQWtCcGYsS0FBSztZQUVuQixJQUFJeWYsbUJBQW1CMWYsRUFBRXhCO1lBQ3pCLElBQUl3RyxRQUFtQmpJLElBQUlnSSxZQUFZMmE7WUFJdkMxYSxNQUFNNmEsY0FBbUJILGlCQUFpQi9lLFNBQVM7WUFDbkRxRSxNQUFNeWIsbUJBQW1CZixpQkFBaUJ4TCxLQUFLLGVBQWV6VSxTQUFTO1lBQ3ZFdUYsTUFBTTZiLFlBQW9CN2IsTUFBTTRhLGFBQWE1YSxNQUFNNmEsZUFBaUI3YSxNQUFNNmEsZUFBZUgsaUJBQWlCbFgsV0FBV3dXO1lBSXJILElBQUloYSxNQUFNeWIsa0JBQWtCO2dCQUN4QmYsaUJBQWlCMWUsU0FBUzttQkFDdkI7Z0JBQ0gwZSxpQkFBaUI3ZSxZQUFZOztZQUdqQyxJQUFJbUUsTUFBTTZiLFdBQVc7Z0JBQ2pCbkIsaUJBQWlCMWUsU0FBUzttQkFDdkI7Z0JBQ0gwZSxpQkFBaUI3ZSxZQUFZOzs7O0lBVXpDO1FBQ0k4RixNQUFTRDtRQUNUOE8sUUFBU3lLO1FBQ1RDLE9BQVNBOzs7O0FDbFdqQm5qQixJQUFJSSxVQUFVMmpCLFNBQVM7SUFLbkIsU0FBU3BhLFdBQVdxYSxTQUFTbGM7UUFTekIsSUFBSWtjLFVBQVVoa0IsSUFBSW9JLGlCQUFpQixVQUFVNGIsU0FBU2xjO1FBRXRELElBQUlrYyxTQUFTQSxRQUFROWdCLEtBQUs7WUFJdEIsSUFBSWxELElBQUkwSixRQUFRekcsRUFBRXhCLFFBQVEsT0FBTztZQUlqQyxJQUFJd2lCLGNBQWdCaGhCLEVBQUV4QixNQUFNb2lCO1lBQzVCLElBQUlLLGdCQUFnQkQsWUFBWTlNLEtBQUs7WUFLckMsS0FBSzhNLFlBQVlyZ0IsU0FBUyxvQkFBb0JxZ0IsWUFBWXJnQixTQUFTLGtCQUFrQjtnQkFDakZxZ0IsWUFBWWhnQixTQUFTOztZQUt6QlIsS0FBS3dnQjtZQUlMQyxjQUFjbGIsR0FBRyxTQUFTO2dCQUN0QnlQLE9BQU93TDs7WUFNWGhoQixFQUFFLFFBQVE4USxPQUFPa1E7WUFJakJqa0IsSUFBSXdKLFNBQVN2RyxFQUFFeEI7OztJQU12QixTQUFTZ1gsT0FBT3dMO1FBUVosSUFBSUEsWUFBWXBnQixPQUFPc0UsU0FBUyxXQUFXO1lBQ3ZDMUUsS0FBS3dnQjtlQUNGO1lBQ0hsZ0IsS0FBS2tnQjs7O0lBS2IsU0FBU2xnQixLQUFLa2dCO1FBUVZBLFlBQ0tuZ0IsWUFBWSxrQkFDWkcsU0FBUyxtQkFDVG9ELFFBQVE7UUFFYjRjLFlBQVlwZ0IsT0FBT3NFLFFBQVE7O0lBSS9CLFNBQVMxRSxLQUFLd2dCO1FBUVZBLFlBQ0tuZ0IsWUFBWSxtQkFDWkcsU0FBUyxrQkFDVG9ELFFBQVE7UUFFYjRjLFlBQVlwZ0IsT0FBT3NFLFFBQVE7O0lBTy9CO1FBQ0l5QixNQUFTRDtRQUNUOE8sUUFBU0E7UUFDVDFVLE1BQVNBO1FBQ1ROLE1BQVNBOzs7O0FDbEhqQnpELElBQUlJLFVBQVUrakIscUJBQXFCO0lBSy9CLElBQUlDLG1CQUFtQm5oQixFQUFFLGtDQUNwQitGLEdBQUcsU0FBUztRQUNUL0YsRUFBRXhCLE1BQU0wVixLQUFLLFNBQVM5UCxRQUFROztJQUd0QyxJQUFJZ2QsbUJBQW1CcGhCLEVBQUUsK0JBQ3BCK0YsR0FBRyxTQUFTO1FBQ1QvRixFQUFFeEIsTUFBTTBWLEtBQUssU0FBUzlQLFFBQVE7O0lBR3RDLElBQUlpZCxpQkFBaUJyaEIsRUFBRTtJQUN2QixJQUFJc2hCLGNBQWlCdGhCLEVBQUU7SUFLdkIsU0FBUzBHO1FBUUwsSUFBSTZhLGVBQWV2aEIsRUFBRTtRQUNyQixJQUFJd2hCLGNBQWV4aEIsRUFBRTtRQUNyQixJQUFJeWhCLGFBQWV6aEIsRUFBRTtRQUNyQixJQUFJMGhCLFdBQWUxaEIsRUFBRTtRQUlyQndoQixZQUFZdmhCLEtBQUs7WUFJYixJQUFJbEQsSUFBSTBKLFFBQVF6RyxFQUFFeEIsUUFBUSxPQUFPO1lBSWpDLElBQUltakIsZ0JBQW1CM2hCLEVBQUV4QjtZQUN6QixJQUFJb2pCLG1CQUFtQkQsY0FBY0UsVUFBVTFoQixNQUFNO1lBRXJELElBQUl5aEIsc0JBQXNCLEdBQUc7Z0JBQ3pCRCxjQUFjeFUsS0FBS2dVLGlCQUFpQjNaLE1BQU07bUJBQ3ZDO2dCQUNIbWEsY0FBY3hVLEtBQUtnVSxpQkFBaUIzWjs7WUFLeENtYSxjQUFjNWI7Z0JBQ1Z5WCxPQUFTO29CQUNMbUUsY0FBYzFiLFNBQVNqRixTQUFTO29CQUNoQzJnQixjQUFjdmQsUUFBUTs7Z0JBRTFCMGQsTUFBUTtvQkFDSkgsY0FBYzFiLFNBQVNwRixZQUFZO29CQUNuQzhnQixjQUFjdmQsUUFBUTs7Z0JBRTFCMmQsUUFBVSxTQUFTNWI7b0JBQ2Z3YixjQUFjMWIsU0FBU3VhLFlBQVk7b0JBQ25DbUIsY0FBY3ZkLFFBQVE7OztZQU05QnJILElBQUl3SixTQUFTdkcsRUFBRXhCOztRQU1uQmlqQixXQUFXeGhCLEtBQUs7WUFJWixJQUFJbEQsSUFBSTBKLFFBQVF6RyxFQUFFeEIsUUFBUSxPQUFPO1lBSWpDLElBQUl3akIsZ0JBQW1CaGlCLEVBQUV4QjtZQUN6QixJQUFJb2pCLG1CQUFtQkksY0FBY0gsVUFBVTFoQixNQUFNO1lBRXJELElBQUl5aEIsc0JBQXNCLEdBQUc7Z0JBQ3pCSSxjQUFjN1UsS0FBS2lVLGlCQUFpQjVaLE1BQU07bUJBQ3ZDO2dCQUNId2EsY0FBYzdVLEtBQUtpVSxpQkFBaUI1Wjs7WUFLeEN3YSxjQUFjamM7Z0JBQ1Z5WCxPQUFTO29CQUNMd0UsY0FBYy9iLFNBQVNqRixTQUFTO29CQUNoQ2doQixjQUFjNWQsUUFBUTs7Z0JBRTFCMGQsTUFBUTtvQkFDSkUsY0FBYy9iLFNBQVNwRixZQUFZO29CQUNuQ21oQixjQUFjNWQsUUFBUTs7Z0JBRTFCMmQsUUFBVSxTQUFTNWI7b0JBRWYsSUFBSThiLFlBQWVELGNBQWN0ZixLQUFLO29CQUN0QyxJQUFJd2YsZUFBZWxpQixFQUFFLFlBQVlpaUIsWUFBWTtvQkFFN0NDLGFBQWFqYyxTQUFTcEYsWUFBWTtvQkFDbENtaEIsY0FBYy9iLFNBQVNqRixTQUFTO29CQUNoQ2doQixjQUFjNWQsUUFBUTs7O1lBTzlCckgsSUFBSXdKLFNBQVN2RyxFQUFFeEI7O1FBTW5Ca2pCLFNBQVN6aEIsS0FBSztZQUlWLElBQUlsRCxJQUFJMEosUUFBUXpHLEVBQUV4QixRQUFRLE9BQU87WUFJakMsSUFBSTJqQixjQUFxQm5pQixFQUFFeEI7WUFDM0IsSUFBSTRqQixxQkFBcUJmLGVBQWU3WjtZQUN4QyxJQUFJNmEsa0JBQXFCZixZQUFZOVo7WUFJckM0YSxtQkFBbUJwaEIsU0FBU21oQixZQUFZemYsS0FBSztZQUk3Q3lmLFlBQVloVixLQUFLaVY7WUFDakJELFlBQVlsYyxTQUFTNkssT0FBT3VSO1lBSTVCRixZQUFZRyxXQUFXO1lBSXZCSCxZQUFZcGM7Z0JBQ1J5WCxPQUFTO29CQUNMeGQsRUFBRXhCLE1BQU15SCxTQUFTakYsU0FBUztvQkFDMUJoQixFQUFFeEIsTUFBTTRGLFFBQVE7O2dCQUVwQjBkLE1BQVE7b0JBQ0o5aEIsRUFBRXhCLE1BQU15SCxTQUFTcEYsWUFBWTtvQkFDN0JiLEVBQUV4QixNQUFNNEYsUUFBUTs7Z0JBRXBCMmQsUUFBVTtvQkFDTi9oQixFQUFFeEIsTUFBTTRGLFFBQVE7OztZQU14QnJILElBQUl3SixTQUFTdkcsRUFBRXhCOztRQU1uQitpQixhQUFhdGhCLEtBQUs7WUFFZCxJQUFJc2lCLGNBQWN2aUIsRUFBRXhCLE1BQU15SDtZQUsxQnNjLFlBQVl2aEIsU0FBU2hCLEVBQUV4QixNQUFNa0UsS0FBSztZQUNsQzFDLEVBQUV4QixNQUFNOGpCLFdBQVc7WUFLbkIsSUFBSXRpQixFQUFFeEIsTUFBTThILEdBQUcsYUFBYTtnQkFDeEJpYyxZQUFZdmhCLFNBQVM7O1lBS3pCakUsSUFBSXdKLFNBQVN2RyxFQUFFeEI7OztJQVN2QjtRQUNJbUksTUFBT0Q7Ozs7QUM1TWYzSixJQUFJSSxVQUFVcWxCLE9BQU87SUFLakIsU0FBUzliLFdBQVcrYjtRQVFoQixJQUFJQSxRQUFRMWxCLElBQUlvSSxpQkFBaUIsUUFBUXNkO1FBRXpDLElBQUlBLE9BQU9BLE1BQU14aUIsS0FBSztZQUlsQixJQUFJbEQsSUFBSTBKLFFBQVF6RyxFQUFFeEIsUUFBUSxPQUFPO1lBSWpDLElBQUlra0IsWUFBWTFpQixFQUFFeEI7WUFDbEJlLFFBQVFtakI7WUFJUjNsQixJQUFJd0osU0FBU3ZHLEVBQUV4Qjs7O0lBU3ZCLFNBQVNlLFFBQVFrakI7UUFTYixJQUFJRTtRQUNKLElBQUlDLGlCQUFpQkgsTUFBTS9mLEtBQUs7UUFDaEMsSUFBSW1nQixTQUFpQkosTUFBTS9mLEtBQUssV0FBVytmLE1BQU0vZixLQUFLO1FBRXRELElBQUltZ0IsV0FBV2prQixXQUFXO1lBRXRCb0IsRUFBRTJRO2dCQUNFUCxLQUFLeVM7Z0JBQ0xDLFVBQVU7Z0JBQ1Y5UixTQUFTLFNBQVNwUTtvQkFDZCtoQixXQUFXM2lCLEVBQUVZLE1BQU1JLFNBQVM0aEI7b0JBQzVCSCxNQUFNbk0sWUFBWXFNOzs7OztJQVFsQztRQUNJaGMsTUFBVUQ7UUFDVm5ILFNBQVVBOzs7O0FDbkVsQnhDLElBQUlJLFVBQVU0bEIsZUFBZTtJQUt6QixJQUFJaFosVUFBVS9KLEVBQUU5QjtJQUNoQixJQUFJOGtCLFVBQVVoakIsRUFBRTtJQUNoQixJQUFJaWpCLFVBQVVqakIsRUFBRTtJQUNoQixJQUFJa2pCLDhCQUE4QjtJQUlsQyxTQUFTeGMsV0FBV3ljLGVBQWV0ZTtRQWUvQixJQUFJc2UsZ0JBQWdCcG1CLElBQUlvSSxpQkFBaUIsZ0JBQWdCZ2UsZUFBZXRlO1FBRXhFLElBQUlzZSxlQUFlQSxjQUFjbGpCLEtBQUs7WUFJbEMsSUFBSWxELElBQUkwSixRQUFRekcsRUFBRXhCLFFBQVEsT0FBTztZQUlqQyxJQUFJNGtCLG9CQUFvQnBqQixFQUFFeEI7WUFDMUIsSUFBSTZrQixjQUFvQkwsUUFBUXhiLFFBQVFJLFFBQVE7WUFDaEQsSUFBSTBiLGNBQW9CTCxRQUFRemIsUUFBUUksUUFBUTtZQUloRHdiLGtCQUFrQnRTLE9BQU91UztZQUN6QkQsa0JBQWtCdFMsT0FBT3dTO1lBTXpCRixrQkFBa0JsUCxLQUFLLEtBQUtuTyxHQUFHLFNBQVMsU0FBU0k7Z0JBQzdDQSxFQUFFQzs7WUFHTjJELFFBQVFoRSxHQUFHLFFBQVE7Z0JBSWZxZCxrQkFDS3JkLEdBQUcsY0FBYztvQkFDZHdkLFlBQVlIO21CQUVmcmQsR0FBRyxjQUFjO29CQUNkeWQsV0FBV0o7bUJBRWRyZCxHQUFHLGFBQWEsU0FBU0k7b0JBQ3RCc2QsY0FBY0wsbUJBQW1CamQ7O2dCQUt6QzRELFFBQVFoRSxHQUFHLFVBQVU7b0JBQ2pCaEosSUFBSTBCLFdBQVc7b0JBQ2YxQixJQUFJcUIsU0FBUywwQkFBMEIsS0FBSzt3QkFDeEM4aEI7OztnQkFNUndELFVBQVVOO2dCQUNWTyxhQUFhUDs7WUFNakJybUIsSUFBSXdKLFNBQVN2RyxFQUFFeEI7OztJQU12QixTQUFTMGhCLE1BQU1pRDtRQVFYLE1BQU1BLHlCQUF5QnppQixTQUFTO1lBQ3BDeWlCLGdCQUFnQm5qQixFQUFFOztRQUd0Qm1qQixjQUFjbGpCLEtBQUs7WUFFZixJQUFJbWpCLG9CQUFvQnBqQixFQUFFeEI7WUFFMUI0a0Isa0JBQWtCeGlCLE9BQU9vRTtnQkFDckI0ZSxNQUFTUixrQkFBa0IxVixTQUFTWjtnQkFDcEMrVyxNQUFTVCxrQkFBa0IxVixTQUFTWDs7OztJQU9oRCxTQUFTK1csUUFBUVg7UUFRYixNQUFNQSx5QkFBeUJ6aUIsU0FBUztZQUNwQ3lpQixnQkFBZ0JuakIsRUFBRTs7UUFHdEJtakIsY0FBY2xqQixLQUFLO1lBRWYsSUFBSW1qQixvQkFBb0JwakIsRUFBRXhCO1lBRTFCNGtCLGtCQUFrQmxQLEtBQUsseUJBQXlCdkY7WUFDaER5VSxrQkFBa0JsUCxLQUFLLHlCQUF5QnZGO1lBQ2hEeVUsa0JBQWtCVztZQUNsQlgsa0JBQWtCbFAsS0FBSyxLQUFLNlA7OztJQU1wQyxTQUFTSixhQUFhUDtRQVNsQixJQUFJdmUsVUFBdUJ1ZSxrQkFBa0J4aUIsT0FBT2lFO1FBQ3BELElBQUltZixvQkFBdUJuZixRQUFRb2YsYUFBYWIsa0JBQWtCbFAsS0FBSyxLQUFLeFIsS0FBSztRQUNqRixJQUFJNGdCLGNBQXVCRixrQkFBa0JsUCxLQUFLO1FBQ2xELElBQUlnUSxvQkFBdUJkLGtCQUFrQmxQLEtBQUs7UUFJbEQsSUFBSWlRLGdCQUFzQixJQUFJQztRQUM5QkQsY0FBYy9iLE1BQVk0YjtRQUMxQkcsY0FBY3JWLFlBQVk7UUFDMUIsSUFBSXVWLGlCQUFzQnJrQixFQUFFbWtCO1FBRTVCRSxlQUNLdGUsR0FBRyxTQUFTO1lBS1QrZCxRQUFRVjtXQUdYcmQsR0FBRyxRQUFRO1lBRVJ1ZCxZQUFZeFMsT0FBT3VUO1lBRW5CakIsa0JBQWtCeGlCLE9BQU9vRTtnQkFDckJ1RCxPQUFXNmEsa0JBQWtCN2E7Z0JBQzdCQyxRQUFXNGEsa0JBQWtCNWE7Z0JBQzdCb2IsTUFBV1Isa0JBQWtCMVYsU0FBU1o7Z0JBQ3RDK1csTUFBV1Qsa0JBQWtCMVYsU0FBU1g7Z0JBQ3RDdVgsUUFBV0osa0JBQWtCMWIsV0FBVzJiLGNBQWMzYjtnQkFDdEQrYixRQUFXTCxrQkFBa0IzYixVQUFVNGIsY0FBYzViOztZQUd6RGljLFVBQVVwQjtZQUtWLElBQUlBLGtCQUFrQnhpQixPQUFPb0UsTUFBTXNmLFVBQVUsS0FBS2xCLGtCQUFrQnhpQixPQUFPb0UsTUFBTXNmLFVBQVUsR0FBRztnQkFDMUZSLFFBQVFWOzs7O0lBT3hCLFNBQVNvQixVQUFVcEI7UUFVZixJQUFJQyxjQUFtQkQsa0JBQWtCbFAsS0FBSztRQUM5QyxJQUFJb1AsY0FBbUJGLGtCQUFrQmxQLEtBQUs7UUFDOUMsSUFBSXVRLGlCQUFtQnJCLGtCQUFrQjdhLFVBQVU2YSxrQkFBa0J4aUIsT0FBT29FLE1BQU11ZjtRQUNsRixJQUFJRyxtQkFBbUJ0QixrQkFBa0I1YSxXQUFXNGEsa0JBQWtCeGlCLE9BQU9vRSxNQUFNc2Y7UUFFbkZqQixZQUFZOWI7WUFDUmdCLE9BQU9rYztZQUNQamMsUUFBUWtjOztRQUdackIsWUFBWXppQixPQUFPb0U7WUFDZnVELE9BQVdrYztZQUNYamMsUUFBV2tjO1lBQ1hKLFFBQVdoQixZQUFZOWEsV0FBV2tjO1lBQ2xDSCxRQUFXakIsWUFBWS9hLFVBQVVrYzs7O0lBS3pDLFNBQVNmLFVBQVVOO1FBU2YsSUFBSUUsY0FBY0Ysa0JBQWtCbFAsS0FBSztRQUV6Q29QLFlBQVkvYjtZQUNSZ0IsT0FBYTZhLGtCQUFrQjdhO1lBQy9CQyxRQUFhNGEsa0JBQWtCNWE7WUFDL0J1RSxNQUFhcVcsa0JBQWtCN2E7WUFDL0JvYyxZQUFhOzs7SUFLckIsU0FBU3BCLFlBQVlIO1FBUWpCLElBQUlFLGNBQWNGLGtCQUFrQmxQLEtBQUs7UUFDekMsSUFBSW1QLGNBQWNELGtCQUFrQmxQLEtBQUs7UUFDekMsSUFBSXJQLFVBQWN1ZSxrQkFBa0J4aUIsT0FBT2lFO1FBQzNDLElBQUloRCxRQUFjZ0QsUUFBUWhELFNBQVNxSixTQUFTckcsUUFBUWhELFVBQVVxaEI7UUFFOURubUIsSUFBSXFCLFNBQVMscUJBQXFCeUQsT0FBTztZQUNyQ3loQixZQUFZc0IsT0FBTztZQUNuQnZCLFlBQVl1QixPQUFPO1lBQ25CdEIsWUFBWWxmLFFBQVE7OztJQUs1QixTQUFTb2YsV0FBV0o7UUFRaEJybUIsSUFBSTBCLFdBQVc7UUFFZixJQUFJNmtCLGNBQWNGLGtCQUFrQmxQLEtBQUs7UUFDekMsSUFBSW1QLGNBQWNELGtCQUFrQmxQLEtBQUs7UUFFekNvUCxZQUFZMWIsUUFBUTtRQUNwQnliLFlBQVl6YixRQUFRO1FBRXBCMGIsWUFBWWxmLFFBQVE7O0lBSXhCLFNBQVNxZixjQUFjTCxtQkFBbUJqZDtRQVV0QyxJQUFJa2QsY0FBb0JELGtCQUFrQmxQLEtBQUs7UUFDL0MsSUFBSW1RLGlCQUFvQmpCLGtCQUFrQmxQLEtBQUs7UUFDL0MsSUFBSTJRLG9CQUFvQnpCLGtCQUFrQnhpQixPQUFPb0U7UUFDakQsSUFBSThmLGNBQW9CekIsWUFBWXppQixPQUFPb0U7UUFJM0MsSUFBSTRlLE9BQVF6ZCxFQUFFNGUsUUFBUUYsa0JBQWtCakIsT0FBT2tCLFlBQVl0YyxTQUFTO1FBQ3BFLElBQUlxYixPQUFRMWQsRUFBRTZlLFFBQVFILGtCQUFrQmhCLE9BQU9pQixZQUFZdmMsUUFBUTtRQUluRSxJQUFJMGMsT0FBT3JCLE9BQU8sSUFBSSxPQUFPO1FBQzdCLElBQUlzQixPQUFPdEIsT0FBT2lCLGtCQUFrQnJjLFNBQVNzYyxZQUFZdGMsU0FBUyxPQUFPO1FBQ3pFLElBQUkyYyxPQUFPdEIsT0FBTyxJQUFJLE9BQU87UUFDN0IsSUFBSXVCLE9BQU92QixPQUFPZ0Isa0JBQWtCdGMsUUFBUXVjLFlBQVl2YyxRQUFRLE9BQU87UUFJdkUsSUFBSTBjLFFBQVFDLE1BQU03QixZQUFZOWIsSUFBSSxPQUFPcWM7UUFDekMsSUFBSXVCLFFBQVFDLE1BQU0vQixZQUFZOWIsSUFBSSxRQUFRc2M7UUFJMUMsSUFBSW9CLFFBQVFDLE1BQU1iLGVBQWU5YyxJQUFJLE9BQU9xYyxPQUFPa0IsWUFBWVIsVUFBVTtRQUN6RSxJQUFJYSxRQUFRQyxNQUFNZixlQUFlOWMsSUFBSSxRQUFRc2MsT0FBT2lCLFlBQVlQLFVBQVU7O0lBTzlFO1FBQ0k1ZCxNQUFPRDs7OztBQzVVZjNKLElBQUlJLFVBQVVrb0IsTUFBTTtJQUtoQixTQUFTQyxNQUFNQyxNQUFNQztRQVdqQixJQUFJRCxTQUFTM21CLGFBQWEybUIsS0FBSzlsQixTQUFTLEdBQUcsT0FBTztRQUlsRCxJQUFJOGxCLEtBQUsza0IsT0FBTzZrQixXQUFXN21CLFdBQVcybUIsS0FBSzNrQixPQUFPNmtCO1FBSWxERixLQUFLM2tCLE9BQU82a0IsT0FBT0MsUUFBUUY7UUFJM0IsSUFBSUcsV0FBWUosS0FBS3JSLEtBQUssY0FBYzVHO1FBQ3hDLElBQUlzWSxZQUFZTCxLQUFLM2tCLE9BQU82a0I7UUFDNUIsSUFBSUksWUFBWTtRQUloQjdsQixFQUFFQyxLQUFLMmxCLFdBQVcsU0FBU3psQixPQUFPMkU7WUFDOUIrZ0IsYUFBYSxpQ0FBaUM5b0IsSUFBSVUsUUFBUW1vQixVQUFVbm1CLFNBQVNVLE9BQU8sS0FBSyxZQUFZeWxCLFVBQVV6bEIsU0FBUztZQUN4SHdsQixTQUFTcmQsS0FBS3VkOzs7SUFLdEIsU0FBU0MsTUFBTVA7UUFVWCxJQUFJQSxTQUFTM21CLGFBQWEybUIsS0FBSzlsQixTQUFTLEdBQUcsT0FBTztRQUlsRDhsQixLQUFLM2tCLE9BQU82a0I7UUFDWkYsS0FBS3JSLEtBQUssY0FBYzVHLFFBQVFoRixLQUFLOztJQU96QztRQUNJZ2QsT0FBUUE7UUFDUlEsT0FBUUE7Ozs7QUNqRWhCL29CLElBQUlJLFVBQVU0b0IsV0FBVztJQUtyQixJQUFJQyxtQkFBbUI7SUFLdkIsU0FBU3RmLFdBQVd1ZixlQUFlcGhCO1FBZS9CLElBQUlvaEIsZ0JBQWdCbHBCLElBQUlvSSxpQkFBaUIsWUFBWThnQixlQUFlcGhCO1FBRXBFLElBQUlvaEIsZUFBZUEsY0FBY2htQixLQUFLO1lBSWxDLElBQUlsRCxJQUFJMEosUUFBUXpHLEVBQUV4QixRQUFRLE9BQU87WUFJakMsSUFBSTBuQixvQkFBb0JsbUIsRUFBRXhCO1lBSTFCdUcsWUFBWW1oQjtZQUlaQyxpQkFBaUJEO1lBSWpCQSxrQkFBa0JuZ0IsR0FBRyxTQUFTO2dCQUMxQnFnQixtQkFBbUJGOztZQUt2Qm5wQixJQUFJd0osU0FBU3ZHLEVBQUV4Qjs7O0lBTXZCLFNBQVN1RyxZQUFZa2hCO1FBU2pCLElBQUlwaEIsVUFBVW9oQixjQUFjcmxCLE9BQU9pRTtRQUVuQ29oQixjQUFjcmxCLE9BQU9vRTtZQUNqQnFoQixXQUFrQm5iLFNBQVMrYSxjQUFjdmpCLEtBQUssaUJBQWlCd0ksU0FBU3JHLFFBQVF3aEIsY0FBY0w7WUFDOUY5WSxTQUFrQnJJLFFBQVFxSSxXQUFXO1lBQ3JDb1osaUJBQWtCemhCLFFBQVEwaEIsY0FBYzs7O0lBS2hELFNBQVNILG1CQUFtQkg7UUFTeEIsSUFBSWpoQixRQUFrQmloQixjQUFjcmxCLE9BQU9vRTtRQUMzQyxJQUFJd2hCLGtCQUFrQnhtQixFQUFFZ0YsTUFBTWtJO1FBQzlCLElBQUl1WixjQUFrQlIsY0FBYyxHQUFHMWxCLE1BQU1kO1FBSTdDLElBQUlnbkIsY0FBY3poQixNQUFNcWhCLFdBQVc7WUFDL0JKLGNBQWN6SixJQUFJeUosY0FBY3pKLE1BQU14ZSxNQUFNLElBQUk7O1FBR3BELElBQUl3b0IsZ0JBQWdCL21CLFFBQVE7WUFFeEIsSUFBSWduQixlQUFlemhCLE1BQU1xaEIsV0FBVztnQkFJaENHLGdCQUFnQnhsQixTQUFTZ0UsTUFBTXNoQjtnQkFDL0JMLGNBQWM3aEIsUUFBUTttQkFFbkI7Z0JBSUhvaUIsZ0JBQWdCM2xCLFlBQVltRSxNQUFNc2hCOztZQU10Q0gsaUJBQWlCRjs7O0lBTXpCLFNBQVNFLGlCQUFpQkY7UUFRdEIsSUFBSWpoQixRQUFrQmloQixjQUFjcmxCLE9BQU9vRTtRQUMzQyxJQUFJd2hCLGtCQUFrQnhtQixFQUFFZ0YsTUFBTWtJO1FBQzlCLElBQUl3WixZQUFrQjFoQixNQUFNcWhCLFlBQVlKLGNBQWMsR0FBRzFsQixNQUFNZDtRQUkvRCxJQUFJK21CLGdCQUFnQi9tQixRQUFRK21CLGdCQUFnQnhRLEtBQUswUTs7SUFLckQsU0FBU3hHLE1BQU0rRjtRQVFYLElBQUlqaEIsUUFBa0JpaEIsY0FBY3JsQixPQUFPb0U7UUFDM0MsSUFBSXdoQixrQkFBa0J4bUIsRUFBRWdGLE1BQU1rSTtRQUU5QitZLGNBQWN6SixJQUFJO1FBQ2xCZ0ssZ0JBQWdCeFEsS0FBS2hSLE1BQU1xaEI7UUFDM0JHLGdCQUFnQjNsQixZQUFZbUUsTUFBTXNoQjtRQUlsQ0wsY0FBYzdoQixRQUFROztJQU8xQjtRQUNJdUMsTUFBUUQ7UUFDUndaLE9BQVFBOzs7O0FDdktoQm5qQixJQUFJSSxVQUFVd3BCLFFBQVE7SUFLbEIsSUFBSXphLFFBQWVsTSxFQUFFd0IsU0FBU3lCO0lBQzlCLElBQUlVLFlBQWUzRCxFQUFFd0I7SUFDckIsSUFBSXVJLFVBQWUvSixFQUFFOUI7SUFDckIsSUFBSTBvQixjQUFlO0lBQ25CLElBQUlDO0lBQ0osSUFBSTFiLFlBQWU7SUFDbkIsSUFBSTNFLGNBQWU7SUFJbkIsSUFBSTVELFdBQVc3RixJQUFJNEY7SUFFbkIsSUFBSW1FO1FBQ0FDO1lBQ0krZixlQUFrQjs7UUFFdEI3ZjtZQUNJNmYsZUFBa0I7OztJQU0xQixJQUFJQyxjQUFjL21CLEVBQUU7SUFJcEIsSUFBSWduQixrQkFBa0JobkIsRUFBRTtJQUl4QixJQUFJaW5CLGlCQUFpQmpuQixFQUFFLGlHQUVVOEcsYUFBYWxFLFVBQVUsbUJBQW1CO0lBSTNFLElBQUlza0IsaUJBQWlCbG5CLEVBQUUsaU9BS2tCOEcsYUFBYWxFLFVBQVUsbUJBQW1CO0lBU25GLFNBQVM4RCxXQUFXeWdCLGVBQWV0aUI7UUFzQi9CLElBQUlzaUIsZ0JBQWdCcHFCLElBQUlvSSxpQkFBaUIsU0FBU2dpQixlQUFldGlCO1FBSWpFLElBQUlzaUIsa0JBQWtCM2dCLGFBQWE7WUFDL0I0Z0I7O1FBS0osSUFBSUQsZUFBZUEsY0FBY2xuQixLQUFLLFNBQVNFO1lBSTNDLElBQUlwRCxJQUFJMEosUUFBUXpHLEVBQUV4QixRQUFRLE9BQU87WUFJakMsSUFBSTZvQixvQkFBcUJybkIsRUFBRXhCO1lBQzNCLElBQUlxRyxVQUFxQndpQixrQkFBa0J6bUIsT0FBT2lFO1lBQ2xELElBQUl5aUIsb0JBQXFCemlCLFFBQVEwaUIsWUFBWTtZQUM3QyxJQUFJQyxpQkFBcUIzaUIsUUFBUTZELFNBQVM7WUFDMUMsSUFBSStlLGdCQUFxQjVpQixRQUFRNUIsUUFBUTtZQUN6QyxJQUFJeWtCLGNBQXFCN2lCLFFBQVE4aUIsTUFBTSxZQUFZeG5CO1lBQ25ELElBQUl5bkIscUJBQXFCL2lCLFFBQVFnakIsYUFBYTtZQUM5QyxJQUFJQyxnQkFBcUJqakIsUUFBUWtqQixRQUFRVixrQkFBa0Iza0IsS0FBSztZQUNoRSxJQUFJc2xCLGlCQUFxQm5qQixRQUFRK0wsU0FBUztZQUkxQyxJQUFJb1gsZ0JBQWdCQyxLQUFLUCxhQUFhSTtZQUl0Q1Qsa0JBQWtCdGhCLEdBQUcsU0FBUyxTQUFTSTtnQkFFbkNBLEVBQUVDO2dCQUVGLElBQUlraEIsc0JBQXNCLFFBQVE7b0JBQzlCQyxTQUFTQyxnQkFBZ0JDLGVBQWVDLGFBQWFFO3VCQUNsRDtvQkFDSDltQixLQUFLNG1CLGFBQWFJOzs7WUFPMUIvcUIsSUFBSXdKLFNBQVN2RyxFQUFFeEI7O1FBTW5CLEtBQUtnSSxhQUFhMGhCO1FBSWxCMWhCLGNBQWM7O0lBSWxCLFNBQVM0Z0I7UUFPTGxiLE1BQU00RSxPQUFPaVcsWUFBWXZmLFFBQVFoSDtRQUNqQzBMLE1BQU00RSxPQUFPa1csZ0JBQWdCeGYsUUFBUWhIO1FBRXJDMm5CLGNBQWM7O0lBSWxCLFNBQVNDLFdBQVdDO1FBU2hCLE9BQU94QixhQUFhcnBCLFFBQVE2cUIsY0FBYyxJQUFJLFFBQVE7O0lBSTFELFNBQVNILHdCQUF3Qkc7UUFhN0IsSUFBSUM7UUFFSixJQUFJRCxTQUFTO1lBQ1RDLFdBQVd0b0IsRUFBRXFvQixTQUFTblUsS0FBSztlQUN4QjtZQUNIb1UsV0FBV3RvQixFQUFFOztRQUdqQnNvQixTQUFTdmlCLEdBQUcsU0FBUztZQUNqQnVQOzs7SUFLUixTQUFTaVMsU0FBUzdlLE9BQU96RixNQUFNb2xCLFNBQVNSO1FBWXBDLElBQUlVLGFBQWtCckIsZUFBZTFmO1FBQ3JDLElBQUlnaEIsa0JBQWtCRCxXQUFXclUsS0FBSztRQUN0QyxJQUFJdVUsaUJBQWtCRixXQUFXclUsS0FBSztRQUN0QyxJQUFJd1QsY0FBa0JXLFFBQVE3b0IsTUFBTSxLQUFLO1FBSXpDZ3BCLGdCQUFnQnhTLEtBQUt0TjtRQUNyQitmLGVBQWVuZ0IsS0FBSyxRQUFRckYsT0FBTztRQUNuQ3NsQixXQUFXN2xCLEtBQUssTUFBTWdsQjtRQUl0QixJQUFJRyxXQUFXO1lBQ1hVLFdBQVd2bkIsU0FBUzZtQjs7UUFHeEIsS0FBS25mLE9BQU87WUFDUjZmLFdBQVd2bkIsU0FBUzs7UUFLeEIsS0FBS29uQixXQUFXQyxVQUFVO1lBQ3RCcm9CLEVBQUUsbUJBQW1COFEsT0FBT3lYO1lBQzVCMUIsYUFBYTZCLEtBQUtMOztRQU10Qkgsd0JBQXdCRztRQUN4QnZuQixLQUFLdW5COztJQUlULFNBQVNKLEtBQUtJLFNBQVNNLFdBQVdDO1FBVzlCLEtBQUtSLFdBQVdDLFVBQVU7WUFFdEIsSUFBSVEsV0FBVzdvQixFQUFFO1lBSWpCNm9CLFNBQVNaLEtBQUtVLFdBQVcsU0FBU0csVUFBVUMsUUFBUUM7Z0JBRWhELElBQUlELFdBQVcsV0FBVztvQkFFdEIsSUFBSVIsYUFBZXZvQixFQUFFeEIsTUFBTTBWLEtBQUssVUFBVTVHO29CQUMxQyxJQUFJMmIsVUFBZWpwQixFQUFFeEIsTUFBTTBWLEtBQUs7b0JBQ2hDLElBQUlnVixjQUFlRCxRQUFReHBCO29CQUMzQixJQUFJMHBCLGVBQWU7b0JBSW5CLElBQUlaLFdBQVc5b0IsUUFBUTt3QkFJbkJvbkIsYUFBYTZCLEtBQUtMO3dCQUlsQkUsV0FBVzdsQixLQUFLLE1BQU0ybEIsUUFBUTdvQixNQUFNLEtBQUs7d0JBQ3pDK29CLFdBQVdyVSxLQUFLLGtCQUFrQnBELE9BQU9tVyxlQUFlemY7d0JBSXhEeEgsRUFBRSxtQkFBbUI4USxPQUFPeVg7d0JBQzVCdm9CLEVBQUVxb0IsU0FBUzduQjt3QkFJWDBuQix3QkFBd0JHO3dCQUl4QixXQUFXTyxhQUFhLFlBQVk7NEJBQ2hDQTs7d0JBS0pqbEIsVUFBVVMsUUFBUTt3QkFJbEI2a0IsUUFBUWxqQixHQUFHLFFBQVE7OEJBRWJvakI7NEJBRUYsSUFBSUEsaUJBQWlCRCxhQUFhO2dDQUM5Qm5mLFFBQVEzRixRQUFROzs7MkJBS3JCO3dCQUlIZ2xCLGlCQUFpQlQ7OztnQkFNekIsSUFBSUksV0FBVyxTQUFTO29CQUlwQmhmLFFBQVEzRixRQUFROzs7OztJQVVoQyxTQUFTdEQsS0FBS3VuQixTQUFTTTtRQVNuQixJQUFJUCxXQUFXQyxVQUFVO1lBSXJCcm9CLEVBQUUsZUFBZTRrQixPQUFPO1lBQ3hCNWtCLEVBQUUsbUJBQW1CYztZQUNyQmQsRUFBRXFvQixTQUFTdm5CO1lBRVg4bEIsY0FBYztZQUlkaGIsT0FBT3ljO1lBTVAsSUFBSXRyQixJQUFJdUYsWUFBWSxXQUFXO2dCQUMzQjZJLFlBQVluTCxFQUFFLFFBQVFtTDtnQkFDdEJuTCxFQUFFLFFBQVFtTCxVQUFVOztZQUd4QnhILFVBQVVTLFFBQVE7WUFJbEJySCxJQUFJMko7ZUFFRDtZQUlIdWhCLEtBQUtJLFNBQVNNLFdBQVc7Z0JBQ3JCN25CLEtBQUt1bkIsU0FBU007Ozs7SUFPMUIsU0FBUy9jLE9BQU95YztRQVFaLElBQUlnQixTQUFVcnBCLEVBQUVxb0I7UUFDaEIsSUFBSWlCLFVBQVVELE9BQU83Z0IsV0FBVyxLQUFLLElBQUk7UUFLekMsSUFBSStnQix3QkFBeUJ2cEIsRUFBRTlCLFFBQVFzSyxXQUFXLEtBQU02Z0IsT0FBTzdnQjtRQUUvRCxJQUFJK2dCLHVCQUF1QjtZQUN2QkYsT0FBTzloQjtnQkFBS3VGLEtBQU87Z0JBQVEwYyxXQUFhO2dCQUFLcG5CLFVBQVk7O1lBQ3pEcEMsRUFBRSxhQUFhdUQ7Z0JBQVM0SCxXQUFXO2VBQUk7ZUFDcEM7WUFDSGtlLE9BQU85aEI7Z0JBQUt1RixLQUFPO2dCQUFPMGMsV0FBYUY7Z0JBQVNsbkIsVUFBWTs7OztJQUtwRSxTQUFTa1Q7UUFNTHRWLEVBQUUsZUFBZTRILFFBQVE7UUFDekI1SCxFQUFFLDJDQUEyQ1E7UUFFN0MsSUFBSTJLLFlBQVksR0FBRztZQUNmbkwsRUFBRSxRQUFRbUwsVUFBVUE7O1FBR3hCeWIsY0FBYztRQUVkLElBQUk3cEIsSUFBSWtCLFlBQVksbUJBQW1CO1lBQ25DbEIsSUFBSUssT0FBTzhULGVBQWVTOztRQUc5QmhPLFVBQVVTLFFBQVE7O0lBSXRCLFNBQVNnbEIsaUJBQWlCVDtRQVN0QnpxQixPQUFPcVQsV0FBV3JULE9BQU9xVCxTQUFTa1ksV0FBVyxPQUFPdnJCLE9BQU9xVCxTQUFTbVksT0FBTyxNQUFNZjs7SUFPckY7UUFDSWhpQixNQUFRRDtRQUNSNUYsTUFBUUE7UUFDUnNVLE9BQVFFOzs7O0FDcmNoQnZZLElBQUlJLFVBQVV3c0IsYUFBYTtJQUt2QixJQUFJQztJQUNKLElBQUk3ZixVQUFjL0osRUFBRTlCO0lBQ3BCLElBQUlnTyxRQUFjbE0sRUFBRTtJQUNwQixJQUFJNnBCLFlBQWM7SUFDbEIsSUFBSXJqQixjQUFjO0lBSWxCLElBQUk1RCxXQUFXN0YsSUFBSTRGO0lBRW5CLElBQUltRTtRQUNBQztZQUNJZ1QsVUFBYTs7UUFFakI5UztZQUNJOFMsVUFBYTs7O0lBT3JCLFNBQVNyVDtRQVFMLElBQUlvakIsbUJBQW1CNWQsTUFBTTVGLEdBQUc7UUFFaEMsSUFBSXdqQixxQkFBcUJ0akIsYUFBYTtZQUVsQ29qQixjQUFjNXBCLEVBQ1YsNkVBQzZCOEcsYUFBYWxFLFVBQVUsY0FBYztZQUl0RWduQixZQUNLNW9CLFNBQVMsY0FDVCtFLEdBQUcsU0FBUyxTQUFTSTtnQkFDbEJBLEVBQUVDO2dCQUNGMmpCO2VBRUhyaUIsU0FBU3dFO1lBRWRuQyxRQUNLaWdCLE9BQU87Z0JBQ0p4VTs7WUFLUmhQLGNBQWM7OztJQU10QixTQUFTdWpCO1FBUUxILFlBQVl4bEIsUUFBUTtRQUtwQnBFLEVBQUUsYUFBYXVEO1lBQ1g0SCxXQUFXO1dBQ1osS0FDRjZKLFVBQ0FDLEtBQUs7WUFDRjJVLFlBQVl4bEIsUUFBUTs7O0lBSzVCLFNBQVNvUjtRQU1MLElBQUl0SixNQUFNZixlQUFlMGUsV0FBVztZQUNoQ0QsWUFBWS9vQixZQUFZO2VBQ3JCO1lBQ0grb0IsWUFBWTVvQixTQUFTOzs7SUFRN0I7UUFDSTJGLE1BQU9EO1FBQ1BxakIsS0FBT0E7Ozs7QUM1R2ZodEIsSUFBSUksVUFBVThzQixVQUFVO0lBS3BCLElBQUl4SCxRQUFRemlCLEVBQUU7SUFLZCxTQUFTMEcsV0FBV3dqQjtRQVNoQixJQUFJQSxXQUFXbnRCLElBQUlvSSxpQkFBaUIsV0FBVytrQjtRQUUvQyxJQUFJQSxVQUFVQSxTQUFTanFCLEtBQUs7WUFJeEIsSUFBSWxELElBQUkwSixRQUFRekcsRUFBRXhCLFFBQVEsT0FBTztZQUlqQyxJQUFJMnJCLGVBQWVucUIsRUFBRXhCO1lBRXJCMnJCLGFBQWFqVyxLQUFLLHVCQUF1QjFUO1lBQ3pDMnBCLGFBQWFDLFFBQVEzSCxNQUFNamI7WUFJM0IyaUIsYUFBYWpXLEtBQUssU0FBU25PLEdBQUcsU0FBUyxTQUFTSTtnQkFDNUNBLEVBQUVDOztZQUtOK2pCLGFBQWFwa0IsR0FBRyxTQUFTLFNBQVNJO2dCQUM5QkEsRUFBRUM7Z0JBQ0Zpa0IsU0FBU0Y7Z0JBQ1RBLGFBQWEvbEIsUUFBUTs7WUFLekJySCxJQUFJd0osU0FBU3ZHLEVBQUV4Qjs7O0lBTXZCLFNBQVM2ckIsU0FBU0Y7UUFRZCxJQUFJMUgsUUFBYzBILGFBQWFqVyxLQUFLO1FBQ3BDLElBQUlvVyxjQUFjSCxhQUFhalcsS0FBSztRQUNwQyxJQUFJK04sWUFBY3FJLFlBQVk1bkIsS0FBSztRQUluQzFDLEVBQUUsaUJBQWlCaWlCLFlBQVksTUFBTTFTLFFBQVEsWUFBWTFPLFlBQVk7UUFDckViLEVBQUUsaUJBQWlCaWlCLFlBQVksTUFBTUssV0FBVztRQUNoRHRpQixFQUFFLGlCQUFpQmlpQixZQUFZLE1BQU1zSSxLQUFLLFdBQVc7UUFJckRELFlBQVlDLEtBQUssV0FBVztRQUM1QkQsWUFBWTVuQixLQUFLLFdBQVc7UUFDNUJ5bkIsYUFBYW5wQixTQUFTO1FBSXRCakUsSUFBSW9HLE1BQU1zZjs7SUFPZDtRQUNJOWIsTUFBT0Q7Ozs7QUMxRmYzSixJQUFJSSxVQUFVcXRCLFdBQVc7SUFLckIsSUFBSUMsWUFBWXpxQixFQUFFO0lBRWxCLElBQUkwcUIsaUJBQ0EsV0FDQSxXQUNBLFdBQ0EsV0FDQSxXQUNBLFdBQ0EsV0FDQTtJQU1KLFNBQVNoa0IsV0FBV2lrQixXQUFXOWxCO1FBcUIzQixJQUFJOGxCLFlBQVk1dEIsSUFBSW9JLGlCQUFpQixZQUFZd2xCLFdBQVc5bEI7UUFFNUQsSUFBSThsQixXQUFXQSxVQUFVMXFCLEtBQUs7WUFJMUIsSUFBSWxELElBQUkwSixRQUFRekcsRUFBRXhCLFFBQVEsT0FBTztZQUlqQyxJQUFJb3NCLGdCQUF1QjVxQixFQUFFeEI7WUFDN0IsSUFBSXFzQix1QkFBdUJELGNBQWMxVyxLQUFLO1lBQzlDLElBQUk0VyxtQkFBdUJ0cEIsU0FBU3VwQixnQkFBZ0IsOEJBQThCO1lBQ2xGLElBQUlsbUIsVUFBdUIrbEIsY0FBY2hxQixPQUFPaUU7WUFDaEQsSUFBSW1tQixPQUF1Qm5tQixRQUFRbW1CLFNBQVNwc0IsWUFBWWlHLFFBQVFtbUIsT0FBTztZQUN2RSxJQUFJeGIsWUFBdUIzSyxRQUFRMkssY0FBYzVRLFlBQWFpRyxRQUFRMkssY0FBYyxPQUFRO1lBQzVGLElBQUl5YixVQUF1QnBtQixRQUFRb21CLFlBQVlyc0IsWUFBWWlHLFFBQVFvbUIsVUFBVTtZQUk3RUwsY0FBY2hxQixPQUFPb0U7Z0JBQ2pCa21CLFVBQVk7Z0JBQ1ovcUIsT0FBWTtnQkFDWmdyQixTQUFZTixxQkFBcUJwckI7Z0JBQ2pDdXJCLE1BQVlBOztZQUdoQixJQUFJQSxPQUFTSixjQUFjaHFCLE9BQU9vRSxNQUFNZ21CO1lBRXhDRixpQkFBaUJNLGFBQWEsV0FBVyxTQUFTSixPQUFPLE1BQU1BO1lBRS9EaHJCLEVBQUU4cUIsa0JBQWtCdmpCO2dCQUNoQmdCLE9BQVN5aUI7Z0JBQ1R4aUIsUUFBU3dpQjs7WUFLYkosY0FBY1IsUUFBUVU7WUFJdEJELHFCQUFxQjVxQixLQUFLLFNBQVNFO2dCQUUvQixJQUFJa3JCLGNBQWNyckIsRUFBRXhCO2dCQUNwQixJQUFJOHNCLFlBQWNELFlBQVluWCxLQUFLLG9CQUFvQjhCO2dCQUl2RHVWLGFBQWFYLGVBQWVVO2dCQUk1QkQsWUFBWWpCLFFBQVFLLFVBQVVqakI7Z0JBSTlCLElBQUlnSSxXQUFXO29CQUNYNmIsWUFDS3RsQixHQUFHLGFBQWE7d0JBQ2JoSixJQUFJMEIsV0FBVzt3QkFDZitzQixnQkFBZ0JIO3VCQUVuQnRsQixHQUFHLGNBQWM7d0JBQ2RoSixJQUFJcUIsU0FBUywyQkFBMkIsS0FBSzs0QkFDekNxdEIscUJBQXFCYjs7dUJBRzVCN2tCLEdBQUcsU0FBUzt3QkFDVDJsQixZQUFZTDs7OztZQVE1QixJQUFJSixZQUFZLFNBQVVVLG9CQUFvQmY7WUFDOUMsSUFBSUssWUFBWSxVQUFVVyxxQkFBcUJoQjtZQUMvQyxJQUFJSyxZQUFZLFVBQVVZLGVBQWVqQjtZQUN6QyxJQUFJSyxZQUFZLFVBQVVhLHFCQUFxQmxCO1lBSS9DN3RCLElBQUl3SixTQUFTdkcsRUFBRXhCOzs7SUFNdkIsU0FBU3N0QixxQkFBcUJsQjtRQVExQixJQUFJbUIsYUFBa0JuQixjQUFjMVcsS0FBSztRQUN6QyxJQUFJOFgsZUFBa0JwQixjQUFjMVcsS0FBSztRQUN6QyxJQUFJK1gsWUFBa0JyQixjQUFjMVcsS0FBSztRQUN6QyxJQUFJclAsVUFBa0IrbEIsY0FBY2hxQixPQUFPaUU7UUFDM0MsSUFBSUcsUUFBa0I0bEIsY0FBY2hxQixPQUFPb0U7UUFDM0MsSUFBSWtuQixjQUFrQmxuQixNQUFNbW1CO1FBQzVCLElBQUlnQixtQkFBeUJ0bkIsUUFBUXNuQixjQUFjLFVBQVVDLEtBQUtsUyxNQUFNclYsUUFBUXNuQixlQUFjLEtBQUksSUFBRztRQUNyRyxJQUFJRSxjQUFrQkYsVUFBVTtRQUNoQyxJQUFJRyxrQkFBa0JILFVBQVUsS0FBSztRQUNyQyxJQUFJSSxpQkFBa0JKLFVBQVUsS0FBSztRQUVyQyxLQUFLLElBQUlydUIsSUFBSSxHQUFHQSxJQUFJb3VCLGFBQWFwdUIsS0FBSztZQUVsQyxJQUFJMHVCLGNBQWUsTUFBTU4sY0FBZXB1QjtZQUN4QyxJQUFJMnVCLFNBQVNELGNBQWNILGNBQWMsTUFBTUcsY0FBY0gsY0FBYyxNQUFNRyxjQUFjSDtZQUkvRixJQUFJTixXQUFXanVCLE9BQU9jLFdBQVdtdEIsV0FBV2p1QixHQUFHc3RCLGFBQWEsUUFBUSxTQUFTcUIsU0FBUyxNQUFNSCxrQkFBa0IsTUFBTUMsaUJBQWlCO1lBQ3JJLElBQUlQLGFBQWFsdUIsT0FBT2MsV0FBV290QixhQUFhbHVCLEdBQUdzdEIsYUFBYSxRQUFRLFNBQVNxQixTQUFTLE1BQU1ILGtCQUFrQixNQUFNQyxpQkFBaUI7WUFFeklOLFVBQVVuUyxHQUFHaGMsR0FBR3lKLElBQUksY0FBYSxTQUFTa2xCLFNBQVMsTUFBTUgsa0JBQWtCLE1BQU1DLGlCQUFpQjs7O0lBTTFHLFNBQVNYLHFCQUFxQmhCO1FBUTFCLElBQUltQixhQUFlbkIsY0FBYzFXLEtBQUs7UUFDdEMsSUFBSThYLGVBQWVwQixjQUFjMVcsS0FBSztRQUN0QyxJQUFJK1gsWUFBZXJCLGNBQWMxVyxLQUFLO1FBQ3RDLElBQUlnWSxjQUFldEIsY0FBY2hxQixPQUFPb0UsTUFBTW1tQjtRQUU5QyxLQUFLLElBQUlydEIsSUFBSSxHQUFHQSxJQUFJb3VCLGFBQWFwdUIsS0FBSztZQUVsQyxJQUFJNHVCLGNBQWMsT0FBTyxXQUFXOXVCLEtBQUsrdUIsWUFBWSxLQUFHLE1BQUksR0FBR3RyQixTQUFTLEtBQUtyRCxPQUFPO1lBSXBGLElBQUkrdEIsV0FBV2p1QixPQUFPYyxXQUFhbXRCLFdBQVdqdUIsR0FBR3N0QixhQUFhLFFBQVFzQjtZQUN0RSxJQUFJVixhQUFhbHVCLE9BQU9jLFdBQVdvdEIsYUFBYWx1QixHQUFHc3RCLGFBQWEsUUFBUXNCO1lBRXhFVCxVQUFVblMsR0FBR2hjLEdBQUd5SixJQUFJLGNBQWNtbEI7OztJQU0xQyxTQUFTZixvQkFBb0JmO1FBUXpCLElBQUltQixhQUFlbkIsY0FBYzFXLEtBQUs7UUFDdEMsSUFBSThYLGVBQWVwQixjQUFjMVcsS0FBSztRQUN0QyxJQUFJK1gsWUFBZXJCLGNBQWMxVyxLQUFLO1FBQ3RDLElBQUlnWSxjQUFldEIsY0FBY2hxQixPQUFPb0UsTUFBTW1tQjtRQUU5QyxLQUFLLElBQUlydEIsSUFBSSxHQUFHQSxJQUFJb3VCLGFBQWFwdUIsS0FBSztZQUVsQyxJQUFJbWYsSUFBSW5mO1lBS1IsSUFBSW1mLElBQUl5TixhQUFhanJCLFNBQVMsR0FBR3dkLElBQUk7WUFJckMsSUFBSThPLFdBQVdqdUIsT0FBT2MsV0FBYW10QixXQUFXanVCLEdBQUdzdEIsYUFBYSxRQUFRVixhQUFhek47WUFDbkYsSUFBSStPLGFBQWFsdUIsT0FBT2MsV0FBV290QixhQUFhbHVCLEdBQUdzdEIsYUFBYSxRQUFRVixhQUFhek47WUFFckZnUCxVQUFVblMsR0FBR2hjLEdBQUd5SixJQUFJLGNBQWNtakIsYUFBYXpOOzs7SUFNdkQsU0FBUzRPLGVBQWVqQjtRQVFwQixJQUFJbUIsYUFBa0JuQixjQUFjMVcsS0FBSztRQUN6QyxJQUFJOFgsZUFBa0JwQixjQUFjMVcsS0FBSztRQUN6QyxJQUFJK1gsWUFBa0JyQixjQUFjMVcsS0FBSztRQUN6QyxJQUFJclAsVUFBa0IrbEIsY0FBY2hxQixPQUFPaUU7UUFDM0MsSUFBSXFuQixjQUFrQnRCLGNBQWNocUIsT0FBT29FLE1BQU1tbUI7UUFDakQsSUFBSWdCLG1CQUF5QnRuQixRQUFRc25CLGNBQWMsV0FBV0MsS0FBS2xTLE1BQU1yVixRQUFRc25CLGVBQWMsS0FBSSxJQUFHO1FBQ3RHLElBQUlFLGNBQWtCRixVQUFVO1FBQ2hDLElBQUlHLGtCQUFrQkgsVUFBVSxLQUFLO1FBQ3JDLElBQUlJLGlCQUFrQkosVUFBVSxLQUFLO1FBQ3JDLElBQUlTLGtCQUFtQixNQUFNMWhCLFNBQVNxaEIsbUJBQW1CTDtRQUV6RCxLQUFLLElBQUlwdUIsSUFBSSxHQUFHQSxJQUFJb3VCLGFBQWFwdUIsS0FBSztZQUVsQyxJQUFJK3VCLFlBQVkzaEIsU0FBU3FoQixrQkFBa0JLLGlCQUFpQjl1QjtZQUk1RCxJQUFJaXVCLFdBQVdqdUIsT0FBT2MsV0FBYW10QixXQUFXanVCLEdBQUdzdEIsYUFBYSxRQUFRLFNBQVNpQixjQUFjLE1BQU1DLGtCQUFrQixNQUFNTyxZQUFZO1lBQ3ZJLElBQUliLGFBQWFsdUIsT0FBT2MsV0FBV290QixhQUFhbHVCLEdBQUdzdEIsYUFBYSxRQUFRLFNBQVNpQixjQUFjLE1BQU1DLGtCQUFrQixNQUFNTyxZQUFZO1lBRXpJWixVQUFVblMsR0FBR2hjLEdBQUd5SixJQUFJLGNBQWEsU0FBUzhrQixjQUFjLE1BQU1DLGtCQUFrQixNQUFNTyxZQUFZOzs7SUFNMUcsU0FBU3RCLGFBQWFYLGVBQWVVO1FBWWpDLElBQUlOLE9BQW1COWYsU0FBUzBmLGNBQWNocUIsT0FBT29FLE1BQU1nbUI7UUFDM0QsSUFBSXlCLFNBQW1CekIsT0FBTztRQUM5QixJQUFJRSxXQUFtQk4sY0FBY2hxQixPQUFPb0UsTUFBTWttQjtRQUNsRCxJQUFJSixtQkFBbUJGLGNBQWMxVyxLQUFLO1FBQzFDLElBQUk0WTtRQUlKeEIsWUFBWXBnQixTQUFTb2dCO1FBQ3JCQSxZQUFZMXRCLEtBQUttdkIsSUFBSW52QixLQUFLb3ZCLElBQUkxQixXQUFXLElBQUk7UUFLN0MsSUFBSUEsYUFBYSxLQUFLO1lBRWxCd0IsZ0JBQWdCdHJCLFNBQVN1cEIsZ0JBQWdCLDhCQUE4QjtZQUN2RStCLGNBQWMxQixhQUFhLEtBQU1xQjtZQUNqQ0ssY0FBYzFCLGFBQWEsTUFBTXFCO1lBQ2pDSyxjQUFjMUIsYUFBYSxNQUFNcUI7ZUFFOUI7WUFFSEssZ0JBQWdCdHJCLFNBQVN1cEIsZ0JBQWdCLDhCQUE4QjtZQUl2RSxJQUFJa0MsSUFBSXJ2QixLQUFLc3ZCLElBQUssSUFBSXR2QixLQUFLdXZCLE1BQU8sTUFBTTdCO1lBQ3hDLElBQUk4QixJQUFJeHZCLEtBQUt5dkIsSUFBSyxJQUFJenZCLEtBQUt1dkIsTUFBTyxNQUFNN0I7WUFJeEMsSUFBSWdDLFVBQVdoQyxhQUFhLEtBQU0sSUFBSTtZQUt0QyxJQUFJaUMsSUFBSSxNQUFNZCxTQUFTLE1BQU1BLFNBQVMsT0FBT0EsU0FBUyxNQUFNLElBQUksUUFBUUEsU0FBUyxNQUFNQSxTQUFTLFFBQVFhLFVBQVUsU0FBU2IsU0FBU1csSUFBSVgsVUFBVSxPQUFPQSxTQUFTUSxJQUFJUixVQUFVO1lBQ2hMSyxjQUFjMUIsYUFBYSxLQUFLbUM7WUFJaENULGNBQWMxQixhQUFhLGFBQWEsWUFBWSxPQUFPLE1BQU1GLFlBQVksTUFBTXVCLFNBQVMsTUFBTUEsU0FBUztZQUkzRzdCLGNBQWNocUIsT0FBT29FLE1BQU1rbUIsWUFBYUk7WUFDeENWLGNBQWNocUIsT0FBT29FLE1BQU03RSxTQUFVOztRQU16QzJxQixpQkFBaUJoYSxPQUFPZ2M7O0lBSTVCLFNBQVN0QixnQkFBZ0JIO1FBUXJCLElBQUltQyxZQUFZbkMsWUFBWWxyQjtRQUM1QixJQUFJc3RCLFVBQVlwQyxZQUFZOWIsUUFBUSxhQUFhMkUsS0FBSztRQUl0RG1YLFlBQVlxQyxXQUFXQyxPQUFPLEdBQUc7UUFDakN0QyxZQUFZc0MsT0FBTyxHQUFHO1FBSXRCRixRQUFRRSxPQUFPLEdBQUc7UUFDbEJGLFFBQVEzVCxHQUFHMFQsV0FBV0csT0FBTyxHQUFHOztJQUlwQyxTQUFTakMsWUFBWUw7UUFRakIsSUFBSW1DLFlBQVluQyxZQUFZbHJCO1FBQzVCLElBQUlzdEIsVUFBWXBDLFlBQVk5YixRQUFRLGFBQWEyRSxLQUFLO1FBSXREblgsSUFBSW9HLE1BQU1zcUIsUUFBUTNULEdBQUcwVDs7SUFJekIsU0FBUy9CLHFCQUFxQmI7UUFRMUIsSUFBSTZDLFVBQWU3QyxjQUFjMVcsS0FBSztRQUN0QyxJQUFJMFosZUFBZWhELGNBQWMxVyxLQUFLO1FBRXRDdVosUUFBUUUsT0FBTyxLQUFLO1FBQ3BCQyxhQUFhRCxPQUFPLEtBQUs7O0lBTzdCO1FBQ0lobkIsTUFBdUJEO1FBQ3ZCOGtCLGlCQUF1QkE7UUFDdkJFLGFBQXVCQTtRQUN2QkQsc0JBQXVCQTs7OztBQzFZL0IxdUIsSUFBSUksVUFBVTB3QixVQUFVO0lBS3BCbHFCLFlBQVkzRCxFQUFFd0I7SUFLZCxTQUFTa0YsV0FBV29uQixpQkFBaUJqcEI7UUFrQmpDLElBQUlpcEIsa0JBQWtCL3dCLElBQUlvSSxpQkFBaUIsV0FBVzJvQixpQkFBaUJqcEI7UUFFdkUsSUFBSWlwQixpQkFBaUJBLGdCQUFnQjd0QixLQUFLO1lBSXRDLElBQUlsRCxJQUFJMEosUUFBUXpHLEVBQUV4QixRQUFRLE9BQU87WUFJakMsSUFBSXV2QixzQkFBc0IvdEIsRUFBRXhCO1lBSTVCLElBQUlxRyxVQUFVa3BCLG9CQUFvQm50QixPQUFPaUU7WUFJekMsSUFBSUEsUUFBUWQsV0FBV25GLGFBQWFvQixFQUFFNkUsUUFBUWQsUUFBUXRFLFNBQVMsR0FBRyxPQUFPO1lBS3pFLElBQUl1dUIsZUFBZWh1QixFQUFFNkUsUUFBUWQsUUFBUTZjO1lBQ3JDNWdCLEVBQUUsUUFBUThRLE9BQU9rZDtZQUlqQixJQUFJQyxnQkFDQSxTQUNBLFlBQ0EsZUFDQSxhQUNBLFlBQ0EsYUFDQSxXQUNBLGNBQ0E7WUFNSixJQUFJQyxzQkFBc0JycEIsUUFBUXFwQix1QkFBdUI7WUFLekQsSUFBSUMsWUFBWW51QixFQUFFcUMsUUFBUXdDLFFBQVFrQixJQUFJa29CLGdCQUFnQixJQUFJcHBCLFFBQVFrQixLQUFLO1lBQ3ZFLElBQUlxb0IsWUFBWTtZQUloQixJQUFJRix3QkFBd0IsUUFBUUEsd0JBQXdCLFFBQVE7Z0JBQ2hFSCxvQkFBb0Job0IsR0FBRyxTQUFTLFNBQVNJO29CQUNyQ0EsRUFBRUM7OztZQU1WMm5CLG9CQUNLaG9CLEdBQUdvb0IsV0FBVyxTQUFTaG9CO2dCQUNwQmtvQjtnQkFDQUM7Z0JBQ0F4dEIsS0FBS2l0QixxQkFBcUJDO2VBRzdCam9CLEdBQUdxb0IsV0FBVyxTQUFTam9CO2dCQUNwQnBKLElBQUlrQyxjQUFjO2dCQUNsQnVCLEtBQUt1dEIscUJBQXFCQzs7WUFLbENBLGFBQ0tqb0IsR0FBRyxjQUFjO2dCQUNkaEosSUFBSWtDLGNBQWM7ZUFFckI4RyxHQUFHLGNBQWM7Z0JBQ2R2RixLQUFLdXRCLHFCQUFxQkM7O1lBS2xDanhCLElBQUl3SixTQUFTdkcsRUFBRXhCOztRQUluQndCLEVBQUUsWUFBWUMsS0FBSztZQUVmLElBQUkrdEIsZUFBZWh1QixFQUFFeEI7WUFJckJ3dkIsYUFDS3B0QjtnQkFDRzJILE9BQVF5bEIsYUFBYWhoQjtnQkFDckJ4RSxRQUFRd2xCLGFBQWEvZ0I7ZUFFeEJ6TTs7O0lBTWIsU0FBU00sS0FBS2l0QixxQkFBcUJDO1FBUy9CanhCLElBQUlxQixTQUFTLHNCQUFzQixLQUFLO1lBS3BDLElBQUl5RyxVQUFVa3BCLG9CQUFvQm50QixPQUFPaUU7WUFFekMsSUFBSUEsUUFBUTJiLGdCQUFnQjVoQixXQUFXO2dCQUNuQ212QixvQkFBb0Ivc0IsU0FBUzZELFFBQVEyYjs7WUFLekMrTixZQUFZUixxQkFBcUJDO1lBQ2pDQSxhQUFhcEosT0FBTztZQUlwQm1KLG9CQUFvQjNwQixRQUFROzs7SUFNcEMsU0FBUzVELEtBQUt1dEIscUJBQXFCQztRQVMvQmp4QixJQUFJcUIsU0FBUyxzQkFBc0IsS0FBSztZQUVwQzR2QixhQUFheHRCO1lBQ2I4dEI7WUFJQVAsb0JBQW9CM3BCLFFBQVE7OztJQU1wQyxTQUFTaXFCO1FBVUxydUIsRUFBRSxpQkFBaUJDLEtBQUs7WUFFcEIsSUFBSTh0QixzQkFBc0IvdEIsRUFBRXhCO1lBQzVCLElBQUlxRyxVQUFzQmtwQixvQkFBb0JudEIsT0FBT2lFO1lBRXJELElBQUlBLFFBQVEyYixnQkFBZ0I1aEIsV0FBVztnQkFDbkMsSUFBSTR2QixlQUFlM3BCLFFBQVEyYjtnQkFDM0J1TixvQkFBb0JsdEIsWUFBWTJ0Qjs7O1FBUXhDenhCLElBQUlrQyxjQUFjO1FBQ2xCZSxFQUFFLFlBQVlROztJQUlsQixTQUFTK3RCLFlBQVlSLHFCQUFxQkM7UUFXdEMsSUFBSW5wQixVQUFVa3BCLG9CQUFvQm50QixPQUFPaUU7UUFJekMsSUFBSTRwQixNQUFNNXBCLFFBQVE0cEIsUUFBUTd2QixZQUFZaUcsUUFBUTRwQixNQUFNO1FBQ3BELElBQUlDLE1BQU03cEIsUUFBUTZwQixRQUFROXZCLFlBQVlpRyxRQUFRNnBCLE1BQU07UUFJcEQsUUFBUUQ7VUFDUixLQUFLO1lBQ0RULGFBQWF6bUI7Z0JBQ1R3RixNQUFRZ2hCLG9CQUFvQnJnQixTQUFTWCxPQUFPO2dCQUM1Q0QsS0FBUWloQixvQkFBb0JyZ0IsU0FBU1osTUFBTzs7WUFFaEQ7O1VBQ0osS0FBSztZQUNEa2hCLGFBQWF6bUI7Z0JBQ1R3RixNQUFRZ2hCLG9CQUFvQnJnQixTQUFTWCxPQUFPZ2hCLG9CQUFvQi9nQixlQUFlO2dCQUMvRUYsS0FBUWloQixvQkFBb0JyZ0IsU0FBU1osTUFBTzs7WUFFaEQ7O1VBQ0osS0FBSztZQUNEa2hCLGFBQWF6bUI7Z0JBQ1R3RixNQUFRZ2hCLG9CQUFvQnJnQixTQUFTWCxPQUFPZ2hCLG9CQUFvQi9nQixlQUFnQjtnQkFDaEZGLEtBQVFpaEIsb0JBQW9CcmdCLFNBQVNaLE1BQU9paEIsb0JBQW9COWdCLGdCQUFnQjs7WUFFcEY7O1VBQ0osS0FBSztZQUNEK2dCLGFBQWF6bUI7Z0JBQ1R3RixNQUFRZ2hCLG9CQUFvQnJnQixTQUFTWCxPQUFPO2dCQUM1Q0QsS0FBUWloQixvQkFBb0JyZ0IsU0FBU1osTUFBT2loQixvQkFBb0I5Z0IsZ0JBQWdCOztZQUVwRjs7UUFLSixRQUFReWhCO1VBQ1IsS0FBSztZQUNEVixhQUFhem1CO2dCQUNUb2QsWUFBYztnQkFDZDZFLFdBQWE7O1lBRWpCOztVQUNKLEtBQUs7WUFDRHdFLGFBQWF6bUI7Z0JBQ1RvZCxZQUFjcUosYUFBYXB0QixPQUFPMkgsU0FBUyxJQUFJO2dCQUMvQ2loQixXQUFjOztZQUVsQjs7VUFDSixLQUFLO1lBQ0R3RSxhQUFhem1CO2dCQUNUb2QsWUFBY3FKLGFBQWFwdEIsT0FBTzJILFNBQVUsSUFBSTtnQkFDaERpaEIsV0FBY3dFLGFBQWFwdEIsT0FBTzRILFVBQVUsSUFBSTs7WUFFcEQ7O1VBQ0osS0FBSztZQUNEd2xCLGFBQWF6bUI7Z0JBQ1RvZCxZQUFjO2dCQUNkNkUsV0FBY3dFLGFBQWFwdEIsT0FBTzRILFVBQVUsSUFBSTs7WUFFcEQ7OztJQUtSLFNBQVM4bEIsa0JBQWtCUjtRQVV2QixNQUFNQSwyQkFBMkJwdEIsU0FBUztZQUN0Q290QixrQkFBa0I5dEIsRUFBRTs7UUFHeEI4dEIsZ0JBQWdCN3RCLEtBQUs7WUFFakIsSUFBSTh0QixzQkFBc0IvdEIsRUFBRXhCO1lBQzVCLElBQUlxRyxVQUFzQmtwQixvQkFBb0JudEIsT0FBT2lFO1lBS3JELElBQUlBLFFBQVEyYixnQkFBZ0I1aEIsV0FBVztnQkFDbkNtdkIsb0JBQW9CbHRCLFlBQVlnRSxRQUFRMmI7Ozs7SUFVcEQ7UUFDSTdaLE1BQVVEO1FBQ1YybkIsU0FBVUE7Ozs7QUM1VWxCdHhCLElBQUlJLFVBQVV3eEIsYUFBYTtJQUt2QixJQUFJQztJQUNKLElBQUlqckIsWUFBWTNELEVBQUV3QjtJQUNsQixJQUFJMEssUUFBWWxNLEVBQUU7SUFFbEIsSUFBSTZ1QixpQkFBaUI3dUIsRUFBRTtJQUl2QixJQUFJOHVCLGtCQUFrQjl1QixFQUFFO0lBSXhCLElBQUkrdUIsa0JBQWtCL3VCLEVBQUU7SUFTeEIsU0FBUzBHLFdBQVdzb0IsYUFBYW5xQjtRQWlCN0IsSUFBSW1xQixjQUFjanlCLElBQUlvSSxpQkFBaUIsY0FBYzZwQixhQUFhbnFCO1FBRWxFLElBQUltcUIsYUFBYUEsWUFBWS91QixLQUFLO1lBSTlCLElBQUlsRCxJQUFJMEosUUFBUXpHLEVBQUV4QixRQUFRLE9BQU87WUFJakMsSUFBSXl3QixrQkFBa0JqdkIsRUFBRXhCO1lBQ3hCLElBQUlxRyxVQUFrQm9xQixnQkFBZ0JydUIsT0FBT2lFO1lBRTdDLElBQUlxcUI7WUFDSixJQUFJQztZQUNKLElBQUlDO1lBQ0osSUFBSUM7WUFJSlIsZUFDSzlvQixHQUFHLGFBQWEsU0FBU0k7Z0JBSXRCLElBQUltcEIsWUFBa0J0dkIsRUFBRXhCO2dCQUN4QixJQUFJeXdCLGtCQUFrQmp2QixFQUFFeEIsTUFBTStRLFFBQVE7Z0JBSXRDZ2dCLGVBQWVOLGlCQUFpQkssV0FBV25wQixFQUFFNmU7Z0JBSTdDcmhCLFVBQ0tvQyxHQUFHLGFBQWEsU0FBU0k7b0JBQ3RCK0YsTUFBTWxMLFNBQVM7b0JBQ2ZzdUIsVUFBVXR1QixTQUFTO29CQUNuQml1QixnQkFBZ0JqdUIsU0FBUztvQkFDekJ3dUIsU0FBU1AsaUJBQWlCSyxXQUFXbnBCO21CQUV4Q0osR0FBRyxXQUFXLFNBQVNJO29CQUNwQitGLE1BQU1yTCxZQUFZO29CQUNsQnl1QixVQUFVenVCLFlBQVk7b0JBQ3RCb3VCLGdCQUFnQnB1QixZQUFZO29CQUM1QjhDLFVBQVVvZ0IsSUFBSTs7ZUFJekJoZSxHQUFHLGFBQWE7Z0JBRWIsSUFBSXVwQixZQUFZdHZCLEVBQUV4QjtnQkFFbEI4d0IsVUFBVTVCLFNBQVMscUJBQXFCN3NCLFlBQVk7Z0JBQ3BEeXVCLFVBQVV0dUIsU0FBUzs7WUFNM0JrdUIsZUFBZUwsZUFBZXJuQixNQUFNLFFBQVF4RyxTQUFTLHlCQUF5QjhQLE9BQU9nZSxnQkFBZ0J0bkI7WUFDckcybkIsZUFBZU4sZUFBZXJuQixNQUFNLFFBQVF4RyxTQUFTLHlCQUF5QjhQLE9BQU9nZSxnQkFBZ0J0bkI7WUFDckc0bkIsZUFBZU4sZ0JBQWdCdG5CLFFBQVF4RyxTQUFTO1lBQ2hEcXVCLGFBQWVOLGdCQUFnQnZuQjtZQUUvQnluQixnQkFBZ0JuZSxPQUFPb2UsY0FBY0MsY0FBY0MsY0FBY0M7WUFLakVKLGdCQUFnQnJ1QixPQUFPb0U7Z0JBQ25CeXFCLFFBQWM1cUIsUUFBUTRxQixVQUFVO2dCQUNoQ0MsUUFBYzdxQixRQUFRNnFCLFVBQVU7Z0JBQ2hDM0MsS0FBY2xvQixRQUFRa29CLE9BQU9sb0IsUUFBUTRxQixVQUFVO2dCQUMvQ3pDLEtBQWNub0IsUUFBUW1vQixPQUFPbm9CLFFBQVE2cUIsVUFBVTtnQkFDL0NDLFVBQWE7Z0JBQ2JDLFVBQWE7Z0JBQ2JwVyxNQUFjM1UsUUFBUTJVLFFBQVE7Z0JBQzlCcVcsU0FBYWp5QixLQUFLdWMsTUFBTWtWLFdBQVczaEIsU0FBU1g7Z0JBQzVDK2lCLFNBQWE7Z0JBQ2JDLFNBQWE7Z0JBQ2JDLFlBQWE7Z0JBQ2J6bkIsT0FBYThtQixXQUFXOW1COztZQUs1QnFtQixhQUFhSyxnQkFBZ0IvYSxLQUFLLHFCQUFxQjVHLFFBQVFOLGVBQWU7WUFJOUVpakIsSUFDSWhCLGlCQUNBQSxnQkFBZ0JydUIsT0FBT29FLE1BQU15cUIsUUFDN0JSLGdCQUFnQnJ1QixPQUFPb0UsTUFBTTBxQixRQUM3QlQsZ0JBQWdCcnVCLE9BQU9vRSxNQUFNK25CLEtBQzdCa0MsZ0JBQWdCcnVCLE9BQU9vRSxNQUFNZ29CO1lBS2pDandCLElBQUl3SixTQUFTdkcsRUFBRXhCOzs7SUFNdkIsU0FBU3l4QixJQUFJakIsYUFBYVMsUUFBUUMsUUFBUTNDLEtBQUtDO1FBWTNDLElBQUlpQyxrQkFBa0JEO1FBQ3RCLElBQUlFLGVBQWtCRCxnQkFBZ0IvYSxLQUFLO1FBQzNDLElBQUlpYixlQUFrQkYsZ0JBQWdCL2EsS0FBSztRQUMzQyxJQUFJZ2MsWUFBa0JqQixnQkFBZ0JydUIsT0FBT29FO1FBSTdDa3JCLFVBQVVULFNBQVlBO1FBQ3RCUyxVQUFVUixTQUFZQTtRQUN0QlEsVUFBVW5ELE1BQVlBO1FBQ3RCbUQsVUFBVWxELE1BQVlBO1FBSXRCd0MsU0FBU1AsaUJBQWlCQztRQUMxQk0sU0FBU1AsaUJBQWlCRTtRQUkxQkgsWUFBWTVxQixRQUFROztJQUl4QixTQUFTOGIsTUFBTThPO1FBU1gsSUFBSUMsa0JBQWtCRDtRQUN0QixJQUFJa0IsWUFBa0JqQixnQkFBZ0JydUIsT0FBT29FO1FBQzdDLElBQUlrcUIsZUFBa0JELGdCQUFnQi9hLEtBQUs7UUFDM0MsSUFBSWliLGVBQWtCRixnQkFBZ0IvYSxLQUFLO1FBQzNDLElBQUlpYyxhQUFrQm5yQixNQUFNeXFCO1FBQzVCLElBQUlXLGFBQWtCcHJCLE1BQU0wcUI7UUFFNUJRLFVBQVVuRCxNQUFNb0Q7UUFDaEJELFVBQVVsRCxNQUFNb0Q7UUFFaEJaLFNBQVNQLGlCQUFpQkM7UUFDMUJNLFNBQVNQLGlCQUFpQkU7UUFJMUJILFlBQVk1cUIsUUFBUTs7SUFJeEIsU0FBU2lzQixhQUFhckI7UUFVbEIsSUFBSUMsa0JBQW1CRDtRQUN2QixJQUFJc0IsZ0JBQW1CckIsZ0JBQWdCL2EsS0FBSztRQUM1QyxJQUFJcWMsZ0JBQW1CdEIsZ0JBQWdCL2EsS0FBSztRQUM1QyxJQUFJc2MsbUJBQW1CdkIsZ0JBQWdCL2EsS0FBSztRQUM1QyxJQUFJbFAsUUFBbUJpcUIsZ0JBQWdCcnVCLE9BQU9vRTtRQUU5QyxJQUFJeXJCO1FBQ0osSUFBSUM7UUFJSkosY0FBY3RhLEtBQUtoUixNQUFNK25CLE1BQU0sTUFBTS9uQixNQUFNd1U7UUFDM0MrVyxjQUFjdmEsS0FBS2hSLE1BQU1nb0IsTUFBTSxNQUFNaG9CLE1BQU13VTtRQUMzQ2dYLGlCQUFpQnhhLEtBQUtoUixNQUFNMnFCLFdBQVczcUIsTUFBTXdVLE9BQU8sUUFBUXhVLE1BQU00cUIsV0FBVyxNQUFNNXFCLE1BQU13VTtRQUl6RixJQUFJbVgsZ0JBQW1CTCxjQUFjdGpCO1FBQ3JDLElBQUk0akIsZ0JBQW1CTCxjQUFjdmpCO1FBQ3JDLElBQUk2akIsbUJBQW1CTCxpQkFBaUJ4akI7UUFFeENzakIsY0FBYy9vQixJQUFJLFFBQVVvcEIsaUJBQWlCLElBQUsvQjtRQUNsRDJCLGNBQWNocEIsSUFBSSxRQUFVcXBCLGlCQUFpQixJQUFLaEM7UUFDbEQ0QixpQkFBaUJqcEIsSUFBSSxRQUFTdkMsTUFBTThxQixXQUFXOXFCLE1BQU0rcUIsVUFBVS9xQixNQUFNOHFCLFdBQVcsSUFBTWUsbUJBQW1CO1FBS3pHLElBQUk3ckIsTUFBTThxQixZQUFZLFFBQVE5cUIsTUFBTStxQixZQUFZLE1BQU07UUFFdERVLG1CQUFtQnpyQixNQUFNOHFCLFVBQVVhLGdCQUFnQjtRQUNuREQsa0JBQW1CMXJCLE1BQU0rcUIsVUFBVWEsZ0JBQWdCO1FBRW5ELElBQUlILG9CQUFvQkMsaUJBQWlCO1lBQ3JDekIsZ0JBQWdCanVCLFNBQVM7ZUFDdEI7WUFDSGl1QixnQkFBZ0JwdUIsWUFBWTs7O0lBS3BDLFNBQVMwdUIsZUFBZVAsYUFBYThCLE9BQU9DO1FBYXhDLElBQUkvckIsUUFBUWdxQixZQUFZcHVCLE9BQU9vRTtRQUMvQixJQUFJZ3NCO1FBRUosSUFBSUYsTUFBTW53QixTQUFTLDBCQUEwQjtZQUN6Q3F3QixlQUFlcHpCLEtBQUt1YyxNQUFNNFcsUUFBUS9yQixNQUFNNnFCLFdBQVc3cUIsTUFBTThxQjs7UUFHN0QsSUFBSWdCLE1BQU1ud0IsU0FBUywwQkFBMEI7WUFDekNxd0IsZUFBZXB6QixLQUFLdWMsTUFBTTRXLFFBQVEvckIsTUFBTTZxQixXQUFXN3FCLE1BQU0rcUI7OztJQUtqRSxTQUFTUCxTQUFTUixhQUFhOEIsT0FBTzNxQjtRQWNsQyxJQUFJNm9CLFlBQVlwdUIsT0FBT29FLE1BQU15cUIsVUFBVVQsWUFBWXB1QixPQUFPb0UsTUFBTTBxQixRQUFRLE9BQU87UUFJL0UsSUFBSVQsa0JBQWtCRDtRQUN0QixJQUFJTSxZQUFrQndCO1FBQ3RCLElBQUlHLGdCQUFrQmhDLGdCQUFnQi9hLEtBQUs7UUFDM0MsSUFBSWdkLGdCQUFrQmpDLGdCQUFnQi9hLEtBQUs7UUFDM0MsSUFBSWxQLFFBQWtCaXFCLGdCQUFnQnJ1QixPQUFPb0U7UUFDN0MsSUFBSW1zQixZQUFrQjdCLFVBQVUzdUIsU0FBUztRQUN6QyxJQUFJeXdCLFlBQWtCOUIsVUFBVTN1QixTQUFTO1FBQ3pDLElBQUkwd0IsT0FBa0I7UUFDdEIsSUFBSUMsZ0JBQWtCO1FBQ3RCLElBQUl6bUI7UUFDSixJQUFJMG1CO1FBQ0osSUFBSXJhO1FBRUosSUFBSS9RLE1BQU12SCxXQUFXO1lBS2pCLElBQUlvRyxNQUFNd3NCLGVBQWUsR0FBR3JyQixFQUFFNmUsUUFBUTdlLEVBQUU2ZSxRQUFRaGdCLE1BQU13c0I7WUFDdEQsSUFBSXhzQixNQUFNd3NCLGVBQWUsR0FBR3JyQixFQUFFNmUsUUFBUTdlLEVBQUU2ZSxRQUFTaGdCLE1BQU13c0IsZ0JBQWdCO1lBSXZFSCxPQUFnQnp6QixLQUFLdWMsTUFBTXZjLEtBQUttdkIsSUFBSW52QixLQUFLb3ZCLElBQUksR0FBSTdtQixFQUFFNmUsUUFBUWhnQixNQUFNNnFCLFVBQVc3cUIsTUFBTXVEO1lBQ2xGc0MsU0FBZ0JqTixLQUFLdWMsTUFBT2tYLE9BQU9yc0IsTUFBTXVELFFBQVM7WUFDbEQrb0IsZ0JBQWdCMXpCLEtBQUt1YyxPQUFRblYsTUFBTTBxQixTQUFTMXFCLE1BQU15cUIsVUFBVSxNQUFPNWtCLFNBQVU3RixNQUFNeXFCLFNBQVM7WUFJNUZSLGdCQUFnQjdxQixRQUFRO2VBRXJCO1lBSUgsSUFBSStzQixXQUFXSSxhQUFhdnNCLE1BQU0rbkI7WUFDbEMsSUFBSXFFLFdBQVdHLGFBQWF2c0IsTUFBTWdvQjtZQUVsQzlWLFFBQWdCbFMsTUFBTTBxQixTQUFTMXFCLE1BQU15cUI7WUFDckM1a0IsU0FBZ0JqTixLQUFLbWYsS0FBSy9YLE1BQU11RCxRQUFRMk87WUFDeENtYSxPQUFnQnhtQixVQUFVMG1CLGFBQWF2c0IsTUFBTXlxQjtZQUM3QzZCLGdCQUFnQkM7O1FBTXBCLElBQUlKLFdBQVc7WUFFWCxJQUFJaHJCLE1BQU12SCxXQUFXb0csTUFBTStuQixNQUFNdUU7WUFFakMsSUFBSXRzQixNQUFNK25CLE1BQU0vbkIsTUFBTWdvQixLQUFLO2dCQUV2QmlDLGdCQUFnQi9hLEtBQUssc0JBQXNCM00sSUFBSSxRQUFROHBCO2dCQUN2REosY0FBY3pVLElBQUk4VTtnQkFFbEJ0c0IsTUFBTThxQixVQUFXdUI7Z0JBQ2pCcnNCLE1BQU0ycUIsV0FBVzJCOzs7UUFRekIsSUFBSUYsV0FBVztZQUVYLElBQUlqckIsTUFBTXZILFdBQVdvRyxNQUFNZ29CLE1BQU1zRTtZQUVqQyxJQUFJdHNCLE1BQU0rbkIsTUFBTS9uQixNQUFNZ29CLEtBQUs7Z0JBRXZCaUMsZ0JBQWdCL2EsS0FBSyxzQkFBc0IzTSxJQUFJLFNBQVN2QyxNQUFNdUQsUUFBUThvQjtnQkFDdEVILGNBQWMxVSxJQUFJOFU7Z0JBRWxCdHNCLE1BQU0rcUIsVUFBV3NCO2dCQUNqQnJzQixNQUFNNHFCLFdBQVcwQjs7O1FBUXpCLElBQUl0c0IsTUFBTStuQixNQUFNL25CLE1BQU1nb0IsS0FBSztZQUN2QnNDLFVBQVUvbkIsSUFBSSxRQUFROHBCLE9BQU96QztZQUM3QnlCLGFBQWFwQjs7O0lBT3JCO1FBQ0l0b0IsTUFBUUQ7UUFDUnVwQixLQUFRQTtRQUNSL1AsT0FBUUE7Ozs7QUNuWmhCbmpCLElBQUlJLFVBQVVzMEIsY0FBYztJQUt4QixJQUFJQyxnQkFBZ0IxeEIsRUFBRTtJQWF0QixTQUFTMEcsV0FBV2lyQixjQUFjOXNCO1FBZ0I5QixJQUFJOHNCLGVBQWU1MEIsSUFBSW9JLGlCQUFpQixlQUFld3NCLGNBQWM5c0I7UUFFckUsSUFBSThzQixjQUFjQSxhQUFhMXhCLEtBQUs7WUFJaEMsSUFBSWxELElBQUkwSixRQUFRekcsRUFBRXhCLFFBQVEsT0FBTztZQUlqQyxJQUFJb3pCLG1CQUFvQjV4QixFQUFFeEI7WUFDMUIsSUFBSXF6QixvQkFBb0JILGNBQWNscUI7WUFDdEMsSUFBSXNxQixtQkFBb0JELGtCQUFrQjNkLEtBQUs7WUFJL0M2ZCxTQUFTSDtZQUlULElBQUlBLGlCQUFpQmp4QixTQUFTLHdCQUF3QjtnQkFDbERpeEIsaUJBQWlCaHhCLE9BQU9zRSxRQUFROztZQUtwQzRzQixpQkFDSy9yQixHQUFHLGFBQWE7Z0JBQ2Jnc0IsU0FBU0gsa0JBQWtCNXhCLEVBQUV4QixNQUFNMkIsVUFBVTtlQUVoRDRGLEdBQUcsU0FBUztnQkFDVGlzQixZQUFZSjtnQkFDWkssS0FBS0w7O1lBTWJBLGlCQUFpQjlnQixPQUFPK2dCO1lBSXhCOTBCLElBQUl3SixTQUFTdkcsRUFBRXhCOzs7SUFNdkIsU0FBU3l6QixLQUFLTjtRQVFWQSxhQUFhM3dCLFNBQVM7UUFDdEIyd0IsYUFBYS93QixPQUFPc0UsUUFBUTtRQUk1QnlzQixhQUFhdnRCLFFBQVE7O0lBSXpCLFNBQVM4dEIsT0FBT1A7UUFRWkEsYUFBYTl3QixZQUFZO1FBQ3pCOHdCLGFBQWEvd0IsT0FBT3NFLFFBQVE7UUFJNUJ5c0IsYUFBYXZ0QixRQUFROztJQUl6QixTQUFTMnRCLFNBQVNKLGNBQWNRO1FBVzVCLElBQUl0dEIsVUFBVThzQixhQUFhL3dCLE9BQU9pRTtRQUNsQyxJQUFJSyxRQUFVeXNCLGFBQWEvd0IsT0FBT3NFO1FBQ2xDLElBQUlpdEIsUUFBVUEsU0FBU3R0QixRQUFRc3RCLFNBQVNDLHFCQUFxQlQsaUJBQWlCO1FBRTlFLElBQUl6c0IsVUFBVSxVQUFVO1lBSXBCeXNCLGFBQWEvd0IsT0FBT2lFLFFBQVFzdEIsUUFBUUE7WUFJcENSLGFBQWE5d0IsWUFBWTtZQUN6Qjh3QixhQUFhM3dCLFNBQVMsd0JBQXdCbXhCO1lBSTlDUixhQUFhdnRCLFFBQVE7OztJQU03QixTQUFTZ3VCLHFCQUFxQlQ7UUFTMUIsSUFBSVEsUUFBUTtRQUVaLElBQUlSLGFBQWFoeEIsU0FBUyx5QkFBeUJ3eEIsUUFBUTtRQUMzRCxJQUFJUixhQUFhaHhCLFNBQVMseUJBQXlCd3hCLFFBQVE7UUFDM0QsSUFBSVIsYUFBYWh4QixTQUFTLHlCQUF5Qnd4QixRQUFRO1FBQzNELElBQUlSLGFBQWFoeEIsU0FBUyx5QkFBeUJ3eEIsUUFBUTtRQUMzRCxJQUFJUixhQUFhaHhCLFNBQVMseUJBQXlCd3hCLFFBQVE7UUFFM0QsT0FBT0E7O0lBSVgsU0FBU0gsWUFBWUw7UUFXakJBLGFBQWF2dEIsUUFBUTs7SUFPekI7UUFDSXVDLE1BQVNEO1FBQ1R1ckIsTUFBU0E7UUFDVEMsUUFBU0E7UUFDVGpDLEtBQVM4Qjs7OztBQ2pNakJoMUIsSUFBSUksVUFBVWsxQixhQUFhO0lBS3ZCLElBQUk3ckIsY0FBc0I7SUFDMUIsSUFBSXNOLHNCQUFzQjtJQUMxQixJQUFJL0osVUFBc0IvSixFQUFFOUI7SUFDNUIsSUFBSWdPLFFBQXNCbE0sRUFBRTtJQUM1QixJQUFJc3lCLGVBQXVCO0lBQzNCLElBQUlDO0lBSUosSUFBSUMsY0FBYztJQUNsQixJQUFJOWtCLFNBQWM7SUFDbEIsSUFBSStrQixTQUFjenlCLEVBQUU7SUFJcEIsSUFBSTRDLFdBQVc3RixJQUFJNEY7SUFFbkIsSUFBSW1FO1FBQ0FDO1lBQ0l3VyxNQUFTO1lBQ1R6VSxNQUFTOztRQUViN0I7WUFDSXNXLE1BQVM7WUFDVHpVLE1BQVM7OztJQU1qQixJQUFJNHBCLGlCQUFpQjF5QixFQUFFLDJJQUdjOEcsYUFBYWxFLFVBQVUyYSxPQUFPLHFOQUk5QnpXLGFBQWFsRSxVQUFVa0csT0FBTztJQVNuRSxTQUFTcEM7UUFNTCxJQUFJaXNCLG1CQUFtQnptQixNQUFNNUYsR0FBRztRQUVoQyxJQUFJcXNCLHFCQUFxQm5zQixhQUFhO1lBRWxDLElBQUkzQixVQUFXOUgsSUFBSW1DLFNBQVNnTixNQUFNeEosS0FBSztZQUN2QyxJQUFJTixXQUFXeUMsUUFBUXpDLFlBQVk7WUFDbkNzTCxTQUFlN0ksUUFBUTZJLFVBQVVBO1lBQ2pDK2tCLFNBQWV6eUIsRUFBRTZFLFFBQVErdEIsT0FBT256QixTQUFTTyxFQUFFNkUsUUFBUSt0QixTQUFTSDtZQUM1REYsYUFBZUUsT0FBT2h6QjtZQUl0Qm96QjtZQUlBcGU7WUFJQWllLGVBQWUxeEIsU0FBUyxlQUFlb0I7WUFDdkM4SixNQUFNNEUsT0FBTzRoQjtZQUliMzFCLElBQUlJLFVBQVVxbEIsS0FBSzdiO1lBSW5CM0csRUFBRSxrQkFBa0JrVSxLQUFLLFFBQVE0RixHQUFHLEdBQUcvVCxHQUFHLFNBQVMsU0FBU0k7Z0JBQ3hEQSxFQUFFQztnQkFDRjBzQixhQUFhOztZQUdqQjl5QixFQUFFLGtCQUFrQmtVLEtBQUssUUFBUTRGLEdBQUcsR0FBRy9ULEdBQUcsU0FBUyxTQUFTSTtnQkFDeERBLEVBQUVDO2dCQUNGMHNCLGFBQWE7O1lBS2pCdHNCLGNBQWM7OztJQU10QixTQUFTc3NCLGFBQWFDO1FBVWxCLEtBQUtOLFFBQVEsT0FBTztRQUlwQk8sZUFBZUQ7UUFJZi95QixFQUFFNlAsS0FDRTNELE1BQU01SSxPQUFPQztZQUNUNEgsV0FBWXNuQixPQUFPM1ksR0FBR3dZLGFBQWE1a0IsU0FBU1osTUFBTVk7V0FDbkQ4a0IsY0FDTDFpQixLQUFLO1lBQ0huTSxVQUFVUyxRQUFRLG9CQUFvQjJ1Qjs7O0lBSzlDLFNBQVN0ZTtRQU1MLElBQUkxWCxJQUFJa0IsWUFBWSxxQkFBcUI2VixxQkFBcUI7WUFDMURuUSxVQUNLb0MsR0FBRyw0QkFBNEI7Z0JBQzVCLElBQUloSixJQUFJd0UsV0FBVztvQkFDZnV4QixhQUFhO29CQUNiRyxhQUFhOztlQUdwQmx0QixHQUFHLDZCQUE2QjtnQkFDN0IsSUFBSWhKLElBQUl3RSxXQUFXO29CQUNmdXhCLGFBQWE7b0JBQ2JHLGFBQWE7O2VBR3BCbHRCLEdBQUcsb0JBQW9CO2dCQUNwQixJQUFJaEosSUFBSXdFLFdBQVc7b0JBQ2ZteEIsZUFBZXB2QixPQUFPc2hCO3VCQUNuQjtvQkFDSDhOLGVBQWVwdkIsT0FBT3NFOzs7O1FBT3RDa00sc0JBQXNCOztJQUkxQixTQUFTbWYsYUFBYUY7UUFVbEIsS0FBS0EsV0FBVyxPQUFPO1FBSXZCLElBQUlHO1FBRUosSUFBSUgsY0FBYyxRQUFRRyxXQUFXO1FBQ3JDLElBQUlILGNBQWMsUUFBUUcsV0FBVztRQUVyQyxJQUFJQyxPQUFPbnpCLEVBQUUsa0JBQWtCa1UsS0FBSyxRQUFRNEYsR0FBR29aO1FBRS9DQyxLQUFLbnlCLFNBQVM7UUFFZGpFLElBQUlxQixTQUFTLDJCQUEyQixLQUFLO1lBQ3pDKzBCLEtBQUt0eUIsWUFBWTs7O0lBS3pCLFNBQVNteUIsZUFBZUQ7UUFRcEIsSUFBSUEsY0FBYyxRQUFRO2NBQ3BCVDtZQUNGLElBQUlBLGNBQWMsR0FBR0EsY0FBYzs7UUFHdkMsSUFBSVMsY0FBYyxRQUFRO2NBQ3BCVDtZQUNGLElBQUlBLGdCQUFnQkMsWUFBWUQsY0FBY0MsYUFBYTs7O0lBS25FLFNBQVNNO1FBVUwsS0FBS0osUUFBUSxPQUFPO1FBSXBCMW9CLFFBQVFoRSxHQUFHLG1CQUFtQjtZQUsxQjBzQixPQUFPeHlCLEtBQUssU0FBU0U7Z0JBQ2pCLElBQUlILEVBQUV4QixNQUFNa1AsU0FBU1osTUFBTVksU0FBU3hCLE1BQU1mLGFBQWE7b0JBQ25EbW5CLGNBQWNueUI7b0JBQ2QsT0FBTzs7O1lBT2YsSUFBSStMLE1BQU1mLGNBQWNzbkIsT0FBTzNZLEdBQUcsR0FBR3BNLFNBQVNaLE1BQU1ZLFFBQVE7Z0JBQ3hENGtCLGVBQWU7Ozs7SUFVM0I7UUFDSTNyQixNQUFPRDs7OztBQ2pRZjNKLElBQUlJLFVBQVVpMkIsaUJBQWlCO0lBSzNCLElBQUlycEIsVUFBc0IvSixFQUFFOUI7SUFDNUIsSUFBSXlGLFlBQXNCM0QsRUFBRXdCO0lBQzVCLElBQUkwSyxRQUFzQmxNLEVBQUU7SUFDNUIsSUFBSXdHLGNBQXNCO0lBQzFCLElBQUk2c0I7SUFDSixJQUFJQztJQUNKLElBQUlDO0lBQ0osSUFBSUM7SUFDSixJQUFJQztJQUNKLElBQUlDO0lBQ0osSUFBSUM7SUFLSixTQUFTanRCO1FBTUwsSUFBSWt0Qix1QkFBdUIxbkIsTUFBTTVGLEdBQUc7UUFFcEMsSUFBSXN0Qix5QkFBeUJwdEIsYUFBYTtZQUl0QyxJQUFJM0IsVUFBb0I5SCxJQUFJbUMsU0FBU2dOLE1BQU14SixLQUFLO1lBQ2hEaXhCLHdCQUF3QjUyQixJQUFJNEMsVUFBVWtGLFFBQVFndkI7WUFFOUMsSUFBSUYsdUJBQXVCO2dCQUt2Qk4scUJBQXFCcnpCLEVBQUU7Z0JBTXZCa00sTUFBTTRFLE9BQU91aUI7Z0JBQ2JBLHFCQUFxQnJ6QixFQUFFLDBCQUEwQnNOOztZQU1yRHZELFFBQVFoRSxHQUFHLHNCQUFzQjtnQkFDN0J3Tjs7WUFLSi9NLGNBQWM7OztJQU10QixTQUFTK007UUFPTCtmLGlCQUFpQjN2QixVQUFVNkU7UUFDM0IrcUIsZUFBaUJ4cEIsUUFBUXZCO1FBQ3pCZ3JCLGNBQWlCRixpQkFBaUJDO1FBQ2xDRSxpQkFBaUJ6ekIsRUFBRSxRQUFRbUw7UUFDM0J1b0IsaUJBQWlCRCxrQkFBa0JELGNBQWM7UUFJakQsSUFBSUUsaUJBQWlCLE9BQU9ILGVBQWVELGdCQUFnQjtZQUN2REksaUJBQWlCO2VBQ2QsSUFBSUEsaUJBQWlCLEdBQUc7WUFDM0JBLGlCQUFpQjs7UUFLckIsSUFBSUMsdUJBQXVCTixtQkFBbUI5ckIsSUFBSSxTQUFTbXNCLGlCQUFpQjtRQUk1RSxJQUFJQSxtQkFBbUIsR0FBMEIzcEIsUUFBUTNGLFFBQVE7UUFDakUsSUFBSXN2QixpQkFBaUIsTUFBTUEsaUJBQWlCLElBQUszcEIsUUFBUTNGLFFBQVE7UUFDakUsSUFBSXN2QixpQkFBaUIsTUFBTUEsaUJBQWlCLElBQUszcEIsUUFBUTNGLFFBQVE7UUFDakUsSUFBSXN2QixpQkFBaUIsTUFBTUEsaUJBQWlCLElBQUszcEIsUUFBUTNGLFFBQVE7UUFDakUsSUFBSXN2QixpQkFBaUIsSUFBNEIzcEIsUUFBUTNGLFFBQVE7O0lBT3JFO1FBQ0l1QyxNQUFPRDs7OztBQ3hHZjNKLElBQUlJLFVBQVUyMkIsU0FBUztJQUtuQixJQUFJbndCLFlBQXNCM0QsRUFBRXdCO0lBQzVCLElBQUl1SSxVQUFzQi9KLEVBQUU5QjtJQUM1QixJQUFJNFYsc0JBQXNCO0lBSTFCLElBQUlsUixXQUFXN0YsSUFBSTRGO0lBRW5CLElBQUltRTtRQUNBQztZQUNJZ3RCLGNBQWlCO1lBQ2pCQyxjQUFpQjs7UUFFckIvc0I7WUFDSThzQixjQUFpQjtZQUNqQkMsY0FBaUI7OztJQU16QixJQUFJQztRQUlBQyxnQkFBZ0JsMEIsRUFBRSwrSUFHbUI4RyxhQUFhbEUsVUFBVSxrQkFBa0IsdVRBTXpDa0UsYUFBYWxFLFVBQVUsa0JBQWtCO1FBSzlFdXhCLGdCQUFnQm4wQixFQUFFLCtJQUdtQjhHLGFBQWFsRSxVQUFVLGtCQUFrQix1VEFNekNrRSxhQUFhbEUsVUFBVSxrQkFBa0I7UUFLOUV3eEIsZ0JBQWdCcDBCLEVBQUUsK0lBR21COEcsYUFBYWxFLFVBQVUsa0JBQWtCLHVUQU16Q2tFLGFBQWFsRSxVQUFVLGtCQUFrQjtRQUs5RXl4QixnQkFBZ0JyMEIsRUFBRSwrSUFHbUI4RyxhQUFhbEUsVUFBVSxrQkFBa0IsdVRBTXpDa0UsYUFBYWxFLFVBQVUsa0JBQWtCO1FBTzlFMHhCLFVBQVl0MEIsRUFBRSw2SEFHdUI4RyxhQUFhbEUsVUFBVSxrQkFBa0Isc0hBR3pDa0UsYUFBYWxFLFVBQVUsa0JBQWtCO1FBSzlFMnhCLG1CQUFtQnYwQixFQUFFLDZJQUdnQjhHLGFBQWFsRSxVQUFVLGtCQUFrQixzSEFHekNrRSxhQUFhbEUsVUFBVSxrQkFBa0I7UUFPOUU0eEIsVUFBWXgwQixFQUFFLDZIQUd1QjhHLGFBQWFsRSxVQUFVLGtCQUFrQixzSEFHekNrRSxhQUFhbEUsVUFBVSxrQkFBa0I7UUFLOUU2eEIsa0JBQWtCejBCLEVBQUUsNElBR2lCOEcsYUFBYWxFLFVBQVUsa0JBQWtCLHNIQUd6Q2tFLGFBQWFsRSxVQUFVLGtCQUFrQjtRQUs5RTh4QixvQkFBb0IxMEIsRUFBRSw4SUFHZThHLGFBQWFsRSxVQUFVLGtCQUFrQixzSEFHekNrRSxhQUFhbEUsVUFBVSxrQkFBa0I7O0lBVWxGLFNBQVM4RCxXQUFXaXVCLFNBQVM5dkI7UUFpQnpCLElBQUk4dkIsVUFBVTUzQixJQUFJb0ksaUJBQWlCLFVBQVV3dkIsU0FBUzl2QjtRQUV0RCxJQUFJOHZCLFNBQVNBLFFBQVExMEIsS0FBSyxTQUFTMjBCO1lBSS9CLElBQUk3M0IsSUFBSTBKLFFBQVF6RyxFQUFFeEIsUUFBUSxPQUFPO1lBT2pDLElBQUlxMkIsY0FBYzcwQixFQUFFeEI7WUFDcEIsSUFBSXMyQixjQUFjRCxZQUFZM2dCLEtBQUs7WUFJbkMyZ0IsWUFBWWowQixPQUFPb0U7Z0JBQ2Y3RSxPQUFjeTBCO2dCQUNkRyxZQUFjO2dCQUNkQyxhQUFjRixZQUFZcjFCOztZQUs5QixJQUFJdTFCLGNBQWNILFlBQVlqMEIsT0FBT29FLE1BQU1nd0I7WUFDM0MsSUFBSW53QixVQUFjZ3dCLFlBQVlqMEIsT0FBT2lFO1lBSXJDLElBQUlBLFFBQVFvd0IsZUFBZXIyQixXQUFXO2dCQUNsQ21MLFFBQVFoRSxHQUFHLGVBQWU7b0JBQ3RCbXZCLGFBQWFMOzs7WUFNckJDLFlBQVl0MEIsT0FBTzhNLFFBQVF4TTtZQUkzQixJQUFJK0QsUUFBUXN3QixZQUFZdjJCLFdBQVc7Z0JBSS9CLElBQUl3MkIsZUFBZXAxQixFQUFFaTBCLGNBQWNwdkIsUUFBUXN3QixVQUFVM3RCO2dCQUNyRHF0QixZQUFZL2pCLE9BQU9za0I7Z0JBSW5CUCxZQUFZM2dCLEtBQUssc0JBQXNCbk8sR0FBRyxTQUFTLFNBQVNJO29CQUN4REEsRUFBRUM7b0JBQ0ZpdkIsYUFBYVI7b0JBQ2JTLFVBQVVULGFBQWE7O2dCQUczQkEsWUFBWTNnQixLQUFLLHNCQUFzQm5PLEdBQUcsU0FBUyxTQUFTSTtvQkFDeERBLEVBQUVDO29CQUNGaXZCLGFBQWFSO29CQUNiUyxVQUFVVCxhQUFhOztnQkFLM0JBLFlBQVkzZ0IsS0FBSyx5QkFBeUI4QixLQUFLZ2Y7Z0JBSS9DLElBQUlud0IsUUFBUXN3QixRQUFRMzNCLFFBQVEsaUJBQWlCLEdBQUc7b0JBSTVDLEtBQUssSUFBSU0sSUFBSSxHQUFHQSxJQUFJazNCLGFBQWFsM0IsS0FBSzt3QkFDbENrQyxFQUFFLG9EQUFvRGxDLElBQUksS0FBSyxlQUFleTNCLGFBQWF2MUIsRUFBRXhCLE1BQU0wVixLQUFLOztvQkFLNUdzaEIsa0JBQWtCWCxZQUFZM2dCLEtBQUs7b0JBQ25Dc2hCLGdCQUFnQmxvQixRQUFRdE0sU0FBUztvQkFFakN3MEIsZ0JBQWdCenZCLEdBQUcsU0FBUyxTQUFTSTt3QkFFakNBLEVBQUVDO3dCQUNGaXZCLGFBQWFSO3dCQUViLElBQUlZO3dCQUVKLElBQUlaLFlBQVk1dUIsU0FBU2lPLEtBQUssc0JBQXNCelUsUUFBUTs0QkFDeERnMkIsWUFBWVosWUFBWTEwQixVQUFTOytCQUM5Qjs0QkFDSHMxQixZQUFZWixZQUFZMTBCOzt3QkFHNUJtMUIsVUFBVVQsYUFBYVk7Ozs7WUFVbkMsSUFBSTV3QixRQUFRNndCLFdBQVc7Z0JBQ25CWixZQUFZYSxJQUFJLEtBQUs1dkIsR0FBRyxPQUFPLFNBQVNJO29CQUNwQ0EsRUFBRUM7b0JBQ0ZpdkIsYUFBYVI7b0JBQ2JTLFVBQVVULGFBQWE7OztZQU0vQixJQUFJaHdCLFFBQVErd0IsYUFBYWgzQixXQUFXO2dCQUNoQ2kzQixjQUFjaEI7O1lBS2xCOTNCLElBQUl3SixTQUFTdkcsRUFBRXhCOztRQU1uQixLQUFLc1YscUJBQXFCVzs7SUFJOUIsU0FBUzZnQixVQUFVVCxhQUFhOXdCO1FBUzVCLElBQUkrd0IsY0FBcUJELFlBQVkzZ0IsS0FBSztRQUMxQyxJQUFJbFAsUUFBcUI2dkIsWUFBWWowQixPQUFPb0U7UUFDNUMsSUFBSUgsVUFBcUJnd0IsWUFBWWowQixPQUFPaUU7UUFDNUMsSUFBSW13QixjQUFxQmh3QixNQUFNZ3dCO1FBQy9CLElBQUlELGFBQXFCL3ZCLE1BQU0rdkI7UUFDL0IsSUFBSWhDLFlBQXFCO1FBRXpCLElBQUlodkIsV0FBVyxVQUFVQSxXQUFXbkYsV0FBVztZQUkzQ20yQixhQUFhQSxlQUFlQyxjQUFjLElBQUlELGFBQWEsSUFBSTtZQUMvRGhDLFlBQVk7ZUFFVCxJQUFJaHZCLFdBQVcsUUFBUTtZQUkxQmd4QixhQUFhQSxlQUFlLElBQUlDLGNBQWMsSUFBSUQsYUFBYTtZQUMvRGhDLFlBQVk7ZUFFVCxXQUFXaHZCLFdBQVcsVUFBVTtZQUluQ2d4QixhQUFhaHhCOztRQU1qQixJQUFJYyxRQUFRb3dCLGVBQWVyMkIsV0FBVztZQUVsQ2szQixnQkFBZ0JqQixhQUFhRSxZQUFZaEM7ZUFFdEM7WUFFSCtCLFlBQVl0MEI7WUFDWnMwQixZQUFZaGIsR0FBR2liLFlBQVlqMEI7O1FBTS9CaTFCLGlCQUFpQmxCLGFBQWFFO1FBSTlCRixZQUFZajBCLE9BQU9vRSxNQUFNK3ZCLGFBQWFBO1FBSXRDRixZQUFZendCLFFBQVE7O0lBSXhCLFNBQVMweEIsZ0JBQWdCakIsYUFBYW1CLGdCQUFnQmpEO1FBVWxELElBQUkrQixjQUFvQkQsWUFBWTNnQixLQUFLO1FBQ3pDLElBQUlyUCxVQUFvQmd3QixZQUFZajBCLE9BQU9pRTtRQUMzQyxJQUFJb3hCLG9CQUFvQnBCLFlBQVlqMEIsT0FBT29FLE1BQU0rdkI7UUFDakQsSUFBSW1CO1FBRUosUUFBUW5EO1VBQ1IsS0FBSztZQUNEbUQsYUFBYTtZQUNiOztVQUNKLEtBQUs7WUFDREEsYUFBYTtZQUNiOztRQUdKLElBQUlyeEIsUUFBUW93QixlQUFlLFdBQVc7WUFJbEMsS0FBS0gsWUFBWXh1QixHQUFHLGNBQWM7Z0JBSTlCd3VCLFlBQ0toYixHQUFHbWMsbUJBQ0gxdUI7b0JBQ0dpSCxXQUFXO21CQUVkbEwsT0FDQUM7b0JBQ0d3SixNQUFRbXBCO21CQUNULEtBQUs7b0JBQ0psMkIsRUFBRXhCLE1BQU0rSTt3QkFDSndGLE1BQVE7d0JBQ1J2SixTQUFXO3dCQUNYZ0wsV0FBVzs7O2dCQU12QnNtQixZQUNLaGIsR0FBR2tjLGdCQUNIenVCO29CQUNHL0QsU0FBVztvQkFDWGdMLFdBQVc7bUJBRWQxTjs7ZUFJTixJQUFJK0QsUUFBUW93QixlQUFlLFFBQVE7WUFJdENILFlBQ0toYixHQUFHbWMsbUJBQ0gzeUIsT0FDQXNFLFFBQVEsS0FBSztnQkFDVmt0QixZQUFZaGIsR0FBR2tjLGdCQUFnQnBSLE9BQU87Ozs7SUFPdEQsU0FBU2lSLGNBQWNsQjtRQVFuQixJQUFJOXZCLFVBQWU4dkIsUUFBUS96QixPQUFPaUU7UUFDbEMsSUFBSSt2QixjQUFlRCxRQUFRL3pCLE9BQU9vRSxNQUFNN0U7UUFDeEMsSUFBSXJCLGVBQWUsbUJBQW1CODFCO1FBRXRDNzNCLElBQUk4QixZQUFZQyxjQUFjK0YsUUFBUSt3QixVQUFVO1lBQzVDTixVQUFVWDs7UUFLZEEsUUFBUXZ3QixRQUFROztJQUlwQixTQUFTaXhCLGFBQWFWO1FBUWxCLElBQUlDLGNBQWVELFFBQVEvekIsT0FBT29FLE1BQU03RTtRQUN4QyxJQUFJckIsZUFBZSxtQkFBbUI4MUI7UUFFdEM3M0IsSUFBSWtDLGNBQWNIO1FBSWxCNjFCLFFBQVF2d0IsUUFBUTs7SUFJcEIsU0FBUzJ4QixpQkFBaUJsQixhQUFhc0I7UUFXbkNYLGtCQUFrQlgsWUFBWTNnQixLQUFLO1FBQ25Dc2hCLGdCQUFnQjMwQixZQUFZO1FBQzVCMjBCLGdCQUFnQjFiLEdBQUdxYyxnQkFBZ0JuMUIsU0FBUztRQUk1QzZ6QixZQUFZM2dCLEtBQUssMEJBQTBCOEIsS0FBS21nQixpQkFBaUI7O0lBSXJFLFNBQVNqQixhQUFhTDtRQVFsQixJQUFJQyxjQUFxQkQsWUFBWTNnQixLQUFLO1FBQzFDLElBQUlraUIscUJBQXFCdkIsWUFBWTNnQixLQUFLO1FBQzFDLElBQUltaUIsY0FBcUI7UUFFekIsS0FBSyxJQUFJdjRCLElBQUksR0FBR0EsSUFBSWczQixZQUFZcjFCLFFBQVEzQixLQUFLO1lBQ3pDLElBQUl3NEIsa0JBQWtCeEIsWUFBWWhiLEdBQUdoYyxHQUFHbVA7WUFDeENvcEIsY0FBY0Msa0JBQWtCRCxjQUFjQyxrQkFBa0JEO1lBQ2hFRCxtQkFBbUI3dUI7Z0JBQU1pQixRQUFVNnRCOzs7UUFHdkNELG1CQUFtQjd1QjtZQUFNaUIsUUFBVTZ0Qjs7O0lBSXZDLFNBQVM1aEI7UUFNTCxJQUFJMVgsSUFBSWtCLFlBQVkscUJBQXFCNlYscUJBQXFCO1lBSTFEL1csSUFBSUssT0FBT3dVLGNBQWNXLFlBQVl2UyxFQUFFO1lBSXZDMkQsVUFBVW9DLEdBQUcsNEJBQTRCO2dCQUVyQyxJQUFJME0saUJBQWlCelMsRUFBRXdCLFNBQVNDO2dCQUVoQyxJQUFJZ1IsZUFBZW5NLEdBQUcsaUJBQWlCO29CQUNuQ2d2QixVQUFVN2lCLGdCQUFnQjtvQkFDMUI0aUIsYUFBYTVpQjs7O1lBT3JCOU8sVUFBVW9DLEdBQUcsNkJBQTZCO2dCQUV0QyxJQUFJME0saUJBQWlCelMsRUFBRXdCLFNBQVNDO2dCQUVoQyxJQUFJZ1IsZUFBZW5NLEdBQUcsaUJBQWlCO29CQUNuQ2d2QixVQUFVN2lCLGdCQUFnQjtvQkFDMUI0aUIsYUFBYTVpQjs7OztRQVN6QnFCLHNCQUFzQjs7SUFPMUI7UUFDSW5OLE1BQVFEO1FBQ1I1RixNQUFRdzBCO1FBQ1IxbkIsT0FBUWlvQjtRQUNSdnlCLE1BQVEreEI7Ozs7QUNoa0JoQnQ0QixJQUFJSSxVQUFVbzVCLFVBQVU7SUFPcEIsSUFBSTN6QixXQUFXN0YsSUFBSTRGO0lBRW5CLElBQUltRTtRQUNBQztZQUNJeXZCLGNBQWlCO1lBQ2pCQyxjQUFpQjs7UUFFckJ4dkI7WUFDSXV2QixjQUFpQjtZQUNqQkMsY0FBaUI7OztJQU16QixJQUFJQyxlQUFlMTJCLEVBQUUsK0hBR1k4RyxhQUFhbEUsVUFBVSxrQkFBa0Isc0pBSXpDa0UsYUFBYWxFLFVBQVUsa0JBQWtCO0lBTzFFLFNBQVM4RCxXQUFXaXdCLFVBQVU5eEI7UUFTMUIsSUFBSTh4QixXQUFXNTVCLElBQUlvSSxpQkFBaUIsV0FBV3d4QixVQUFVOXhCO1FBRXpELElBQUk4eEIsVUFBVUEsU0FBUzEyQixLQUFLO1lBSXhCLElBQUlsRCxJQUFJMEosUUFBUXpHLEVBQUV4QixRQUFRLE9BQU87WUFJakMsSUFBSW80QixlQUFlNTJCLEVBQUV4QjtZQUVyQm80QixhQUFheE0sUUFBUXNNLGFBQWFsdkI7WUFJbEMsSUFBSTJNLFlBQVlwWCxJQUFJdUYsWUFBWSxZQUFZLFFBQVE7WUFFcERzMEIsYUFBYTFpQixLQUFLLHFCQUFxQm5PLEdBQUdvTyxXQUFXLFNBQVNoTztnQkFDMURBLEVBQUVDO2dCQUNGeXdCLGtCQUFrQkQ7O1lBR3RCQSxhQUFhMWlCLEtBQUssc0JBQXNCbk8sR0FBR29PLFdBQVcsU0FBU2hPO2dCQUMzREEsRUFBRUM7Z0JBQ0Ywd0Isa0JBQWtCRjs7WUFHdEJBLGFBQWExaUIsS0FBSyxtQkFBbUI0TixLQUFLO2dCQUN0Q2lWLGNBQWNIOztZQUtsQjc1QixJQUFJd0osU0FBU3ZHLEVBQUV4Qjs7O0lBTXZCLFNBQVNxNEIsa0JBQWtCRjtRQVF2QkksY0FBY0o7UUFFZCxJQUFJQSxTQUFTLzFCLE9BQU9zRSxVQUFVLFNBQVMsT0FBTztRQUU5QyxJQUFJOHhCLGVBQWVMLFNBQVN6aUIsS0FBSyxtQkFBbUIsR0FBRzNUO1FBRXZELElBQUl5MkIsZ0JBQWdCLEdBQUc7WUFDbkJBO1lBQ0FMLFNBQVN6aUIsS0FBSyxTQUFTLEdBQUczVCxRQUFReTJCOztRQUt0Q0wsU0FBU3Z5QixRQUFROztJQUlyQixTQUFTMHlCLGtCQUFrQkg7UUFRdkJJLGNBQWNKO1FBRWQsSUFBSUEsU0FBUy8xQixPQUFPc0UsVUFBVSxTQUFTLE9BQU87UUFFOUMsSUFBSTh4QixlQUFlTCxTQUFTemlCLEtBQUssbUJBQW1CLEdBQUczVDtRQUV2RCxJQUFJeTJCLGVBQWUsR0FBRztZQUNsQkE7WUFDQUwsU0FBU3ppQixLQUFLLFNBQVMsR0FBRzNULFFBQVF5MkI7O1FBS3RDTCxTQUFTdnlCLFFBQVE7O0lBSXJCLFNBQVM2eUIsZUFBZU47UUFRcEJPLGFBQWFQLFVBQVU7UUFJdkJRLHNCQUFzQlI7UUFJdEJBLFNBQVN2eUIsUUFBUTs7SUFJckIsU0FBU2d6QixlQUFlVDtRQVFwQk8sYUFBYVAsVUFBVTtRQUl2QlEsc0JBQXNCUjtRQUl0QkEsU0FBU3Z5QixRQUFROztJQUlyQixTQUFTOHlCLGFBQWFQLFVBQVVuYTtRQVM1QixJQUFJemYsSUFBSWtFLFNBQVN1YixNQUFNO1lBSW5CMmEsc0JBQXNCUjtZQUl0QkEsU0FBU3ppQixLQUFLLG1CQUFtQixHQUFHM1QsUUFBUWljO1lBQzVDbWEsU0FBU3Z5QixRQUFROzs7SUFNekIsU0FBUzJ5QixjQUFjSjtRQVFuQixJQUFJejFCLFdBQVl5MUIsU0FBU3ppQixLQUFLLG1CQUFtQixHQUFHM1Q7UUFFcEQsSUFBSXhELElBQUlrRSxTQUFTQyxXQUFXO1lBSXhCaTJCLHNCQUFzQlI7WUFJdEJBLFNBQVN2eUIsUUFBUTtlQUVkO1lBSUhpekIsbUJBQW1CVjtZQUluQkEsU0FBU3Z5QixRQUFROzs7SUFNekIsU0FBU2l6QixtQkFBbUJWO1FBUXhCLElBQUlXLFlBQVlYLFNBQVN6aUIsS0FBSztRQUU5Qm9qQixVQUFVdDJCLFNBQVM7UUFDbkIyMUIsU0FBUy8xQixPQUFPc0UsUUFBUTs7SUFJNUIsU0FBU2l5QixzQkFBc0JSO1FBUTNCLElBQUlXLFlBQVlYLFNBQVN6aUIsS0FBSztRQUU5Qm9qQixVQUFVejJCLFlBQVk7UUFDdEI4MUIsU0FBUy8xQixPQUFPc0UsUUFBUTs7SUFPNUI7UUFDSXlCLE1BQVlEO1FBQ1o2d0IsU0FBWVY7UUFDWlcsV0FBWVY7UUFDWjVXLE9BQVkrVztRQUNablIsT0FBWXNSO1FBQ1pLLE9BQVlQOzs7O0FDaFJwQm42QixJQUFJSSxVQUFVdTZCLFNBQVM7SUFPbkIsSUFBSTkwQixXQUFXN0YsSUFBSTRGO0lBRW5CLElBQUltRTtRQUNBQztZQUNJNHdCLFNBQWE7WUFDYkMsVUFBYTs7UUFFakIzd0I7WUFDSTB3QixTQUFhO1lBQ2JDLFVBQWE7OztJQU1yQixJQUFJQyxXQUFZNzNCLEVBQUU7SUFDbEIsSUFBSTgzQixZQUFZOTNCLEVBQUU7SUFDbEIsSUFBSTh3QixRQUFZOXdCLEVBQUU7SUFLbEIsU0FBUzBHLFdBQVdxeEIsU0FBU2x6QjtRQWdCekIsSUFBSWt6QixVQUFVaDdCLElBQUlvSSxpQkFBaUIsVUFBVTR5QixTQUFTbHpCO1FBRXRELElBQUlrekIsU0FBU0EsUUFBUTkzQixLQUFLO1lBSXRCLElBQUlsRCxJQUFJMEosUUFBUXpHLEVBQUV4QixRQUFRLE9BQU87WUFJakMsSUFBSXc1QixjQUFjaDRCLEVBQUV4QjtZQUNwQixJQUFJcUcsVUFBY216QixZQUFZcDNCLE9BQU9pRTtZQUNyQyxJQUFJSyxRQUFjTCxRQUFRSyxVQUFVdEcsWUFBWWlHLFFBQVFLLFFBQVE7WUFJaEUreUIsa0JBQW1CcHpCLFFBQVE4eUIsWUFBWS80QixZQUFZaUcsUUFBUTh5QixVQUFVN3dCLGFBQWFsRSxVQUFVO1lBQzVGczFCLG1CQUFtQnJ6QixRQUFRK3lCLGFBQWFoNUIsWUFBWWlHLFFBQVEreUIsV0FBVzl3QixhQUFhbEUsVUFBVTtZQUk5Rm8xQixZQUFZbG5CLE9BQ1JnZ0IsTUFBTXRwQjtZQUdWLElBQUkzQyxRQUFRc3pCLFlBQVk7Z0JBQ3BCSCxZQUFZbG5CLE9BQ1IrbUIsU0FBU3J3QixRQUFRd08sS0FBS2lpQixrQkFDdEJILFVBQVV0d0IsUUFBUXdPLEtBQUtraUI7Z0JBRTNCRixZQUFZaDNCLFNBQVM7O1lBS3pCLElBQUlrRSxVQUFVLE1BQU1rekIsTUFBTUo7WUFDMUIsSUFBSTl5QixVQUFVLE9BQU9tekIsT0FBT0w7WUFJNUJBLFlBQVlqeUIsR0FBRyxTQUFTLFNBQVNJO2dCQUM3Qm15QixVQUFVTjs7WUFLZGo3QixJQUFJd0osU0FBU3ZHLEVBQUV4Qjs7O0lBTXZCLFNBQVM0NUIsTUFBTUw7UUFVWEEsUUFBUWwzQixZQUFZLGVBQWVHLFNBQVM7UUFDNUMrMkIsUUFBUTdqQixLQUFLLDBCQUEwQjVHLFFBQVE1SyxLQUFLLFdBQVc7UUFJL0RxMUIsUUFBUTN6QixRQUFROztJQUlwQixTQUFTaTBCLE9BQU9OO1FBVVpBLFFBQVFsM0IsWUFBWSxjQUFjRyxTQUFTO1FBQzNDKzJCLFFBQVE3akIsS0FBSywwQkFBMEI1RyxRQUFRNUssS0FBSyxXQUFXO1FBSS9EcTFCLFFBQVEzekIsUUFBUTs7SUFJcEIsU0FBU2swQixVQUFVUDtRQVNmLElBQUlBLFFBQVFwM0IsU0FBUyxnQkFBZ0I7WUFDakN5M0IsTUFBTUw7ZUFDSCxJQUFJQSxRQUFRcDNCLFNBQVMsZUFBZTtZQUN2QzAzQixPQUFPTjs7O0lBUWY7UUFDSXB4QixNQUFTRDtRQUNUWCxJQUFTcXlCO1FBQ1RyVSxLQUFTc1U7UUFDVDdpQixRQUFTOGlCOzs7O0FDL0pqQnY3QixJQUFJSSxVQUFVbzdCLFFBQVE7SUFLbEIsU0FBUzd4QixXQUFXOHhCLFFBQVEzekI7UUFjeEIsSUFBSTJ6QixTQUFTejdCLElBQUlvSSxpQkFBaUIsU0FBU3F6QixRQUFRM3pCO1FBRW5ELElBQUkyekIsUUFBUUEsT0FBT3Y0QixLQUFLO1lBSXBCLElBQUlsRCxJQUFJMEosUUFBUXpHLEVBQUV4QixRQUFRLE9BQU87WUFJakMsSUFBSWk2QixhQUFhejRCLEVBQUV4QjtZQUNuQixJQUFJcUcsVUFBYTR6QixXQUFXNzNCLE9BQU9pRTtZQUVuQyxJQUFJQSxRQUFRNnpCLGNBQWM3ekIsUUFBUTZ6QixlQUFlLFNBQVM7Z0JBTXRERCxXQUFXdmtCLEtBQUsscUJBQXFCeWtCLE9BQU87Z0JBQzVDRixXQUFXdmtCLEtBQUsscUJBQXFCeWtCLE9BQU87Z0JBSTVDRixXQUFXdmtCLEtBQUssTUFBTW5PLEdBQUcsU0FBUyxTQUFTSTtvQkFFdkNBLEVBQUVDO29CQUVGLElBQUl3eUIsVUFBVTU0QixFQUFFeEIsTUFBTStRLFFBQVE7b0JBQzlCc3BCLFVBQVVEOzs7WUFNbEIsSUFBSS96QixRQUFRaTBCLFlBQVk7Z0JBUXBCTCxXQUFXdmtCLEtBQUssb0JBQW9CbUgsTUFBTTtnQkFDMUNvZCxXQUFXdmtCLEtBQUssb0JBQW9CbUgsTUFBTTtnQkFJMUNvZCxXQUFXdmtCLEtBQUsscUJBQXFCbk8sR0FBRyxTQUFTLFNBQVNJO29CQUl0REEsRUFBRUM7b0JBRUYsSUFBSXd5QixVQUFVNTRCLEVBQUV4QixNQUFNK1EsUUFBUTtvQkFDOUJ3cEIsVUFBVUg7OztZQVFsQjc3QixJQUFJd0osU0FBU3ZHLEVBQUV4Qjs7O0lBTXZCLFNBQVNxNkIsVUFBVUQ7UUFRZixJQUFJSCxhQUFhRyxRQUFRcnBCLFFBQVE7UUFDakMsSUFBSXlwQixhQUFhUCxXQUFXdmtCLEtBQUs7UUFDakMsSUFBSXJQLFVBQWE0ekIsV0FBVzczQixPQUFPaUU7UUFJbkMsSUFBSUEsUUFBUTZ6QixlQUFlLFNBQVM7WUFDaENFLFFBQVFwWSxZQUFZO2VBQ2pCO1lBQ0h3WSxXQUFXbjRCLFlBQVk7WUFDdkIrM0IsUUFBUTUzQixTQUFTOztRQUtyQnkzQixXQUFXcjBCLFFBQVE7O0lBSXZCLFNBQVM2MEIsWUFBWUw7UUFRakIsSUFBSUgsYUFBYUcsUUFBUXJwQixRQUFRO1FBQ2pDLElBQUl5cEIsYUFBYVAsV0FBV3ZrQixLQUFLO1FBSWpDOGtCLFdBQVduNEIsWUFBWTtRQUl2QjQzQixXQUFXcjBCLFFBQVE7O0lBSXZCLFNBQVMyMEIsVUFBVUg7UUFRZixJQUFJSCxhQUFlRyxRQUFRcnBCLFFBQVE7UUFDbkMsSUFBSTJwQixXQUFlVCxXQUFXdmtCLEtBQUssTUFBTXpVO1FBQ3pDLElBQUkwNUIsZUFBZ0JELFdBQVdOLFFBQVExa0IsS0FBSyxNQUFNelUsV0FBWSxJQUFJLE9BQU87UUFFekVtNUIsUUFBUWh4QixRQUFRLFFBQVE7WUFFcEJneEIsUUFBUWpxQjtZQUtSLElBQUl3cUIsY0FBY1YsV0FBV3IwQixRQUFROztRQU16Q3EwQixXQUFXcjBCLFFBQVE7O0lBT3ZCO1FBQ0l1QyxNQUFXRDtRQUNYMHlCLFFBQVdQO1FBQ1hRLFVBQVdKO1FBQ1h0cUIsUUFBV29xQjs7OztBQzVLbkJoOEIsSUFBSUksVUFBVXVTLE9BQU87SUFLakIsU0FBU2hKLFdBQVc0eUIsV0FBV3owQjtRQTBCM0IsSUFBSXkwQixZQUFZdjhCLElBQUlvSSxpQkFBaUIsUUFBUW0wQixXQUFXejBCO1FBRXhELElBQUl5MEIsV0FBV0EsVUFBVXI1QixLQUFLO1lBSTFCLElBQUlsRCxJQUFJMEosUUFBUXpHLEVBQUV4QixRQUFRLE9BQU87WUFJakMsSUFBSSs2QixnQkFBZ0J2NUIsRUFBRXhCO1lBSXRCLElBQUlnN0IsV0FBaUJ0N0IsT0FBT3FULFNBQVNrb0I7WUFDckMsSUFBSUMsYUFBaUJILGNBQWNybEIsS0FBSyxLQUFLNUcsUUFBUSxHQUFHbXNCO1lBQ3hELElBQUlFLGlCQUFpQkosY0FBY3JsQixLQUFLLGFBQWFzbEIsV0FBVyxNQUFNLzVCO1lBQ3RFLElBQUltNkIsZUFBaUJMLGNBQWNNLElBQUksMEJBQTBCcDZCO1lBQ2pFLElBQUlxNkIsYUFBaUJILGlCQUFpQkgsV0FBV0U7WUFNakQsSUFBSUUsaUJBQWlCRCxnQkFBZ0I7Z0JBQ2pDRyxhQUFhUCxjQUFjcmxCLEtBQUssNEJBQTRCNUcsUUFBUSxHQUFHbXNCOztZQUszRTlwQixTQUFTbXFCO1lBSVRQLGNBQWNybEIsS0FBSyxLQUFLbk8sR0FBRyxTQUFTLFNBQVNJO2dCQUN6Q0EsRUFBRUM7Z0JBQ0Z1SixTQUFTblIsS0FBS2k3Qjs7WUFLbEIxOEIsSUFBSXdKLFNBQVN2RyxFQUFFeEI7OztJQU12QixTQUFTbVIsU0FBU29xQjtRQVFkLElBQUlDLG9CQUFxQmg2QixFQUFFLGFBQWErNUIsa0JBQWtCLE1BQU05ekIsT0FBTztRQUN2RSxJQUFJc3pCLGdCQUFxQlMsa0JBQWtCenFCLFFBQVE7UUFDbkQsSUFBSTBxQixxQkFBcUJWLGNBQWNybEIsS0FBSztRQUM1QyxJQUFJZ21CLGlCQUFxQmw2QixFQUFFKzVCO1FBSzNCRSxtQkFBbUJoNkIsS0FBSztZQUVwQixJQUFJazZCLGdCQUFnQm42QixFQUFFeEI7WUFDdEIsSUFBSTQ3QixRQUFnQkQsY0FBY2ptQixLQUFLLEtBQUssR0FBR3VsQjtZQUUvQ1UsY0FBY3Q1QixZQUFZO1lBQzFCYixFQUFFbzZCLE9BQU81NUI7O1FBTWJ3NUIsa0JBQWtCaDVCLFNBQVM7UUFDM0JrNUIsZUFBZXA1QjtRQUlmeTRCLGNBQWNuMUIsUUFBUTs7SUFPMUI7UUFDSXVDLE1BQVdEO1FBQ1hpSixVQUFXQTs7OztBQ3hIbkI1UyxJQUFJSSxVQUFVazlCLGNBQWM7SUFLeEIsSUFBSUM7SUFDSixJQUFJQyx1QkFBdUI7SUFLM0IsU0FBUzd6QixXQUFXOHpCLGNBQWMzMUI7UUFnQjlCLElBQUkyMUIsZUFBZXo5QixJQUFJb0ksaUJBQWlCLFVBQVVxMUIsY0FBYzMxQjtRQUVoRSxJQUFJMjFCLGNBQWNBLGFBQWF2NkIsS0FBSyxTQUFTRTtZQUl6QyxJQUFJcEQsSUFBSTBKLFFBQVF6RyxFQUFFeEIsUUFBUSxPQUFPO1lBSWpDLElBQUlpOEIsZUFBb0J6NkIsRUFBRXhCO1lBQzFCLElBQUlxRyxVQUFvQjQxQixhQUFhNzVCLE9BQU9pRTtZQUM1QyxJQUFJZCxTQUFvQmMsUUFBUWQ7WUFDaEMsSUFBSTIyQixRQUFvQjcxQixRQUFRNjFCO1lBQ2hDLElBQUk1MEIsUUFBb0JqQixRQUFRaUIsVUFBVWxILFlBQVlpRyxRQUFRaUIsUUFBUTtZQUN0RSxJQUFJNjBCLGtCQUFvQjkxQixRQUFRODFCO1lBQ2hDLElBQUlDLG9CQUFvQjU2QixFQUFFLDJCQUEyQjA2QixRQUFRO1lBSTdEMTZCLEVBQUUrRCxRQUFRL0MsU0FBUyx1QkFBdUIwNUI7WUFDMUNELGFBQWF6NUIsU0FBUyx3QkFBd0IwNUI7WUFJOUNELGFBQWExMEIsR0FBR0QsT0FBTyxTQUFTSztnQkFDNUJBLEVBQUVDO2dCQUNGb1AsT0FBT2lsQjs7WUFHWCxJQUFJRyxrQkFBa0JuN0IsU0FBUyxLQUFLcUcsVUFBVSxhQUFhO2dCQU92RDlGLEVBQUUrRCxRQUFRdkQ7Z0JBS1ZpNkIsYUFDSzEwQixHQUFHLGNBQWM7b0JBQ2RoSixJQUFJMEIsV0FBVzttQkFFbEJzSCxHQUFHLGNBQWM7b0JBQ2RoSixJQUFJcUIsU0FBUyxzQkFBc0JtOEIsc0JBQXNCO3dCQUNyRHJhLE1BQU11YTs7O21CQUlmO2dCQUVILElBQUlILCtCQUErQkksT0FBTztvQkFNdENKLDZCQUE2Qkk7b0JBSzdCLElBQUlDLG9CQUFvQi83QixXQUNwQjY3QixhQUFhejVCLFNBQVMyNUI7dUJBRXZCO29CQU1IMzZCLEVBQUUrRCxRQUFRdkQ7OztZQU9sQnpELElBQUl3SixTQUFTdkcsRUFBRXhCOzs7SUFNdkIsU0FBU2dYLE9BQU9pbEI7UUFRWixJQUFJNTFCLFVBQW9CNDFCLGFBQWE3NUIsT0FBT2lFO1FBQzVDLElBQUlkLFNBQW9CYyxRQUFRZDtRQUNoQyxJQUFJMjJCLFFBQW9CNzFCLFFBQVE2MUI7UUFDaEMsSUFBSUMsa0JBQW9COTFCLFFBQVE4MUI7UUFFaEMsSUFBSUMsb0JBQW9CNTZCLEVBQUUsMkJBQTJCMDZCLFFBQVE7UUFLN0QxNkIsRUFBRSx3QkFBd0IwNkIsT0FBT2w2QjtRQUNqQ1IsRUFBRStELFFBQVFqRDtRQUVWLElBQUk2NUIsb0JBQW9CLzdCLFdBQVc7WUFDL0JvQixFQUFFLHlCQUF5QjA2QixPQUFPNzVCLFlBQVk4NUI7WUFDOUNGLGFBQWF6NUIsU0FBUzI1Qjs7UUFLMUIsSUFBSUMsc0JBQXNCaDhCLFdBQ3RCZzhCLGtCQUFrQnA2QjtRQUl0Qmk2QixhQUFhcjJCLFFBQVE7O0lBSXpCLFNBQVM4YixNQUFNdWE7UUFRWCxJQUFJNTFCLFVBQW9CNDFCLGFBQWE3NUIsT0FBT2lFO1FBQzVDLElBQUk2MUIsUUFBb0I3MUIsUUFBUTYxQjtRQUNoQyxJQUFJQyxrQkFBb0I5MUIsUUFBUTgxQjtRQUVoQyxJQUFJQyxvQkFBb0I1NkIsRUFBRSwyQkFBMkIwNkIsUUFBUTtRQUk3RCxJQUFJQyxvQkFBb0IvN0IsV0FDcEJvQixFQUFFLHlCQUF5QjA2QixPQUFPNzVCLFlBQVk4NUI7UUFJbEQzNkIsRUFBRSx3QkFBd0IwNkIsT0FBT2w2QjtRQUlqQyxJQUFJbzZCLGtCQUFrQm43QixTQUFTLEdBQzNCbTdCLGtCQUFrQmhXO1FBSXRCNlYsYUFBYXIyQixRQUFROztJQU96QjtRQUNJdUMsTUFBUUQ7UUFDUndaLE9BQVFBOzs7O0FDOUxoQm5qQixJQUFJSSxVQUFVMDlCLFVBQVU7SUFLcEIsSUFBSUMsc0JBQXNCO0lBQzFCLElBQUlDLG1CQUFzQjtJQUMxQixJQUFJQyxtQkFBc0I7SUFLMUIsU0FBU3QwQixXQUFXdTBCLGlCQUFpQnAyQjtRQWtCakMsSUFBSW8yQixrQkFBa0JsK0IsSUFBSW9JLGlCQUFpQixXQUFXODFCLGlCQUFpQnAyQjtRQUV2RSxJQUFJbzJCLGlCQUFpQkEsZ0JBQWdCaDdCLEtBQUs7WUFJdEMsSUFBSWxELElBQUkwSixRQUFRekcsRUFBRXhCLFFBQVEsT0FBTztZQUlqQyxJQUFJMDhCLHNCQUFzQmw3QixFQUFFeEI7WUFDNUIsSUFBSXFHLFVBQXNCcTJCLG9CQUFvQnQ2QixPQUFPaUU7WUFDckQsSUFBSXMyQixpQkFBc0J0MkIsUUFBUXMyQixrQkFBa0I7WUFDcEQsSUFBSUMsb0JBQXNCRCxtQkFBbUIsU0FBU0EsbUJBQW1CLFdBQVdBLG1CQUFtQixZQUFZQSxtQkFBbUI7WUFJdEksSUFBSUUsZUFBZUMsZUFBZXQ3QixFQUFFNkUsUUFBUWQ7WUFFNUNtM0Isb0JBQW9CbjFCLEdBQUcsY0FBYyxTQUFTSTtnQkFDMUMsSUFBSWkxQixtQkFBbUI7b0JBQ25CRyxrQkFBa0JMLHFCQUFxQkc7dUJBQ3BDO29CQUNIOU0sWUFBWThNLGNBQWNsMUI7O2dCQUU5QmtvQjtnQkFDQW1OLGNBQWNOLHFCQUFxQkcsY0FBYztnQkFDakRJLGNBQWNQLHFCQUFxQkcsY0FBYzs7WUFLckRILG9CQUFvQm4xQixHQUFHLGNBQWM7Z0JBQ2pDeTFCLGNBQWNOLHFCQUFxQkcsY0FBYztnQkFDakRJLGNBQWNQLHFCQUFxQkcsY0FBYzs7WUFLckQsSUFBSUYsbUJBQW1CLE9BQU87Z0JBQzFCRCxvQkFBb0JuMUIsR0FBRyxhQUFhLFNBQVNJO29CQUN6Q29vQixZQUFZOE0sY0FBY2wxQjs7O1lBTWxDcEosSUFBSXdKLFNBQVN2RyxFQUFFeEI7OztJQU12QixTQUFTNnZCLFFBQVFxTjtRQWFiLElBQUlBLFVBQVU5OEIsV0FBVztZQUNyQjg4QixRQUFRO2VBQ0w7WUFDSEEsU0FBUzs7UUFLYjE3QixFQUFFMDdCLFFBQVEsWUFBWWw3Qjs7SUFJMUIsU0FBU203QixxQkFBcUJoVSxJQUFJOUQsTUFBTUQsTUFBTWdZLFNBQVNDO1FBZ0JuRCxLQUFLbFUsT0FBTzlELFNBQVNELFNBQVNnWSxTQUFTLE9BQU87UUFJOUMsSUFBSTU3QixFQUFFLE1BQU0ybkIsSUFBSWxvQixVQUFVTyxFQUFFLE1BQU0ybkIsSUFBSXJoQixHQUFHLGFBQWEsT0FBTztRQUk3RCxJQUFJdTFCLGVBQWVBLGdCQUFnQmY7UUFJbkM5NkIsRUFBRSxjQUFjMm5CLEtBQUssdUJBQXVCaVUsVUFBUyxVQUFVbDBCLFNBQVMxSCxFQUFFd0IsU0FBU3lCLE9BQU96QztRQUUxRixJQUFJNjZCLGVBQWVyN0IsRUFBRSxNQUFNMm5CO1FBSTNCMFQsYUFDSzl6QjtZQUNHbkYsVUFBWTtZQUNaMkssTUFBUThXO1lBQ1IvVyxLQUFPOFc7V0FFVmdCLE9BQU9pWCxjQUNQN21CLFVBQ0FDLEtBQUs7WUFDRm9tQixhQUFhajNCLFFBQVE7OztJQUtqQyxTQUFTazNCLGVBQWVqd0Isb0JBQW9CeXdCO1FBWXhDLElBQUlsc0IsV0FBd0J2RSxtQkFBbUIzSSxLQUFLO1FBQ3BELElBQUlxNUIsd0JBQXdCLzdCLEVBQUUsTUFBTTRQLFdBQVcsWUFBWW5RO1FBRTNELEtBQUtzOEIsdUJBQXVCO1lBTXhCMXdCLG1CQUFtQnVWO1lBQ25CNWdCLEVBQUUsY0FBYzRQLFdBQVcsdUJBQXVCdkUsbUJBQW1CL0MsU0FBUSxVQUFVWixTQUFTMUgsRUFBRXdCLFNBQVN5QixPQUFPekM7O1FBSXRILE9BQU9SLEVBQUUsTUFBTTRQOztJQUluQixTQUFTMmUsWUFBWThNLGNBQWNsMUI7UUFXL0IsSUFBSXVILFNBQWlCO1FBQ3JCLElBQUlzdUIsVUFBaUI3MUIsRUFBRTRlO1FBQ3ZCLElBQUlrWCxVQUFpQjkxQixFQUFFNmU7UUFDdkIsSUFBSWtYLGVBQWlCYixhQUFhOXlCO1FBQ2xDLElBQUk0ekIsZ0JBQWlCZCxhQUFhN3lCO1FBQ2xDLElBQUk0ekIsZ0JBQWlCcDhCLEVBQUU5QixRQUFRcUs7UUFDL0IsSUFBSThWLGlCQUFpQnJlLEVBQUU5QixRQUFRc0s7UUFDL0IsSUFBSTJDLFlBQWlCbkwsRUFBRTlCLFFBQVFpTjtRQUkvQixJQUFJa3hCLGNBQWNKLFVBQVVDLGVBQWVFLGdCQUFnQkgsVUFBVUMsZUFBZXh1QixTQUFTLE9BQU91dUIsVUFBVztRQUMvRyxJQUFJSyxhQUFjTixVQUFVRyxnQkFBZ0J6dUIsU0FBUyxJQUFJdkMsWUFBWWtULGlCQUFpQjJkLFVBQVVHLGdCQUFnQnp1QixTQUFTLElBQUksT0FBT3N1QixVQUFVdHVCLFNBQVM7UUFJdkoydEIsYUFDSzl6QjtZQUNHbkYsVUFBWTtZQUNaMkssTUFBUXN2QjtZQUNSdnZCLEtBQU93dkI7OztJQUtuQixTQUFTZixrQkFBa0JMLHFCQUFxQkc7UUFXNUMsSUFBSTN0QixTQUFXO1FBQ2YsSUFBSTdJLFVBQVdxMkIsb0JBQW9CdDZCLE9BQU9pRTtRQUMxQyxJQUFJekMsV0FBV3lDLFFBQVFzMkI7UUFDdkIsSUFBSWtCO1FBQ0osSUFBSUM7UUFFSixRQUFRbDZCO1VBQ0osS0FBSztZQUNEaTZCLGNBQWNuQixvQkFBb0J4dEIsU0FBU1gsT0FBT211QixvQkFBb0JsdUIsZUFBZSxJQUFJcXVCLGFBQWFydUIsZUFBZTtZQUNySHN2QixhQUFjcEIsb0JBQW9CeHRCLFNBQVNaLE1BQU11dUIsYUFBYXB1QixnQkFBZ0JTO1lBQzlFOztVQUNKLEtBQUs7WUFDRDJ1QixjQUFjbkIsb0JBQW9CeHRCLFNBQVNYLE9BQU9tdUIsb0JBQW9CbHVCLGVBQWVVO1lBQ3JGNHVCLGFBQWNwQixvQkFBb0J4dEIsU0FBU1osTUFBTW91QixvQkFBb0JqdUIsZ0JBQWdCLElBQUlvdUIsYUFBYXB1QixnQkFBZ0I7WUFDdEg7O1VBQ0osS0FBSztZQUNEb3ZCLGNBQWNuQixvQkFBb0J4dEIsU0FBU1gsT0FBT211QixvQkFBb0JsdUIsZUFBZSxJQUFJcXVCLGFBQWFydUIsZUFBZTtZQUNySHN2QixhQUFjcEIsb0JBQW9CeHRCLFNBQVNaLE1BQU1vdUIsb0JBQW9CanVCLGdCQUFnQlM7WUFDckY7O1VBQ0osS0FBSztZQUNEMnVCLGNBQWNuQixvQkFBb0J4dEIsU0FBU1gsT0FBT3N1QixhQUFhcnVCLGVBQWVVO1lBQzlFNHVCLGFBQWNwQixvQkFBb0J4dEIsU0FBU1osTUFBTW91QixvQkFBb0JqdUIsZ0JBQWdCLElBQUlvdUIsYUFBYXB1QixnQkFBZ0I7WUFDdEg7O1FBTVJvdUIsYUFDSzM0QixLQUFLLFNBQVEsc0JBQXNCTixVQUNuQ21GO1lBQ0duRixVQUFZO1lBQ1oySyxNQUFRc3ZCO1lBQ1J2dkIsS0FBT3d2Qjs7O0lBS25CLFNBQVNiLGNBQWNQLHFCQUFxQkcsY0FBY3ArQjtRQVN0RCxJQUFJNEgsVUFBb0JxMkIsb0JBQW9CdDZCLE9BQU9pRTtRQUNuRCxJQUFJMDNCLG9CQUFvQjEzQixRQUFRMjNCLGFBQWF6QjtRQUU3QyxJQUFJOTlCLFdBQVcsU0FBUztZQUVwQkYsSUFBSXFCLFNBQVMsb0JBQW9CbStCLG1CQUFtQjtnQkFDaERsQixhQUNLelcsT0FBT2tXLHFCQUNQOWxCLFVBQ0FDLEtBQUs7b0JBQ0ZvbUIsYUFBYWozQixRQUFROzs7ZUFJOUIsSUFBSW5ILFdBQVcsUUFBUTtZQUUxQkYsSUFBSTBCLFdBQVc7OztJQU12QixTQUFTKzhCLGNBQWNOLHFCQUFxQkcsY0FBY3ArQjtRQVF0RCxJQUFJNEgsVUFBb0JxMkIsb0JBQW9CdDZCLE9BQU9pRTtRQUNuRCxJQUFJNDNCLG9CQUFvQjUzQixRQUFRNjNCLGFBQWExQjtRQUU3QyxJQUFJLzlCLFdBQVcsU0FBUztZQUVwQkYsSUFBSXFCLFNBQVMsb0JBQW9CcStCLG1CQUFtQjtnQkFDaER6OEIsRUFBRSxZQUFZUTtnQkFDZDY2QixhQUFhajNCLFFBQVE7O2VBR3RCLElBQUluSCxXQUFXLFFBQVE7WUFFMUJGLElBQUkwQixXQUFXOzs7SUFTdkI7UUFDSWtJLE1BQVVEO1FBQ1ZpMkIsUUFBVWhCO1FBQ1Y3NkIsTUFBVTI2QjtRQUNWajdCLE1BQVVnN0I7UUFDVm5OLFNBQVVBIiwiZmlsZSI6ImRpc3QvanMveW9pLmpzIn0=