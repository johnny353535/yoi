/** forms.js */

var CustomFormElements = (function() {

    // private vars
    // ============

    var    $checkBoxWrapper = $('<span class="checkbox"></span>')
        .on('click', function() {
            $(this).find('input').trigger('change');
        });

    var $radioBtnWrapper = $('<span class="radio"></span>')
        .on('click', function() {
            $(this).find('input').trigger('change');
        });

    var $ratingSelect = $('\
        <span class="ratingSelect">\
            <i aria-hidden="true" class="icon--039-s"></i>\
            <i aria-hidden="true" class="icon--039-s"></i>\
            <i aria-hidden="true" class="icon--039-s"></i>\
            <i aria-hidden="true" class="icon--039-s"></i>\
            <i aria-hidden="true" class="icon--039-s"></i>\
        </span>\
    ');

    // private functions
    // =================

    function initializeCustomFormElements(scope) {

        /**
         *  Set css-selector to either target all custom form elements
         *  or only the ones in a specified scope (e.g. #myContainer input[type="checkbox"]).
         *
         *  @param  {string} scope - a jQuery selector to define the scope
         */

        // set css-selector to either target all custom form elements
        // or only the ones in a specified scope (e.g. #myContainer input[type="checkbox"])

        if (scope === undefined) {
            scope = '';
        } else {
            scope += ' ';
        }

        // select custom checkboxes and radio buttons

        var checkElemns = $(scope + 'input[type="checkbox"]:not(.js-fallback, .switch *), input[type="radio"]:not(.js-fallback, .switch *, .radioBtn *)');
        var checkBoxes  = $(scope + 'input[type="checkbox"]:not(.js-fallback, .switch *)');
        var radioBtns   = $(scope + 'input[type="radio"]:not(.js-fallback, .switch *, .radioBtn *)');
        var selects     = $(scope + 'select:not(.js-fallback)');

        // prepare custom form elements

        checkBoxes.each(function() {

            var isWrappedInLabel = $(this).parents().index('label');

            if (isWrappedInLabel === -1) {
                $(this).wrap($checkBoxWrapper.clone(true)); // clone with events
            } else {
                $(this).wrap($checkBoxWrapper.clone());     // clone without events
            }

        });

        radioBtns.each(function() {

            var isWrappedInLabel = $(this).parents().index('label');

            if (isWrappedInLabel === -1) {
                $(this).wrap($radioBtnWrapper.clone(true)); // clone with events
            } else {
                $(this).wrap($radioBtnWrapper.clone());     // clone without events
            }

        });

        checkElemns.each(function() {

            var thisWrapper = $(this).parent();

            // move class names from checkbox/radio-button
            // to the wrapper

            thisWrapper.addClass($(this).attr('class'));
            $(this).removeAttr('class');

            // checked?

            if ($(this).is(':checked')) {
                thisWrapper.addClass('input--checked');
            }

        });

        selects.each(function() {

            var $thisSelect    = $(this);
            var $selectWrapper = $('<span></span>');
            var $icon          = $('<i class="icon--009-s" aria-hidden="true"></i>');

            // prepare wrapper, keep modifiers
            $selectWrapper.addClass('btn ' + $thisSelect.attr('class'));
            $selectWrapper.attr('role','customSelect');

            // inject elements
            $thisSelect.wrap($selectWrapper);
            $thisSelect.parent().append($icon);

            // remove classNames (modifiers) from select element
            $thisSelect.removeAttr('class');

        });

        checkElemns.on({
            'focus' : function() {
                $(this).parent().addClass('input--focus');
            },
            'blur' : function() {
                $(this).parent().removeClass('input--focus');
            },
            'change' : function(e) {
                $(this).parent().toggleClass('input--checked');
            }
        });

        // switches

        $(scope + '.switch').each(function() {

            var $thisSwitch = $(this);

            var options     = Helper.toObject($thisSwitch.data('switch'));
            var    labelOnTxt  = options.labelOn !== undefined ? options.labelOn : 'Ein';
            var labelOffTxt = options.labelOff !== undefined ? options.labelOff : 'Aus';

            var $labelOn    = $('<span class="switch__labelOn">' + labelOnTxt + '</span>');
            var $labelOff   = $('<span class="switch__labelOff">' + labelOffTxt + '</span>');
            var $knob       = $('<span class="switch__knob">');

            $thisSwitch.append($knob, $labelOn, $labelOff);

            $thisSwitch.on('click', function(e) {

                if ($thisSwitch.hasClass('switch--on')) {

                    $thisSwitch.removeClass('switch--on').addClass('switch--off');
                    $thisSwitch.find('input[type="checkbox"]').attr('checked', false);

                } else if ($thisSwitch.hasClass('switch--off')) {

                    $thisSwitch.removeClass('switch--off').addClass('switch--on');
                    $thisSwitch.find('input[type="checkbox"]').attr('checked', true);

                }

            });

        });

        // textareas with max-chars

        $(scope + '[data-maxchars]').each(function() {

            var maxCharacters    = $(this).data('maxchars');
            var characterCount   = $(this).next('[data-characterCount]').html('Noch <b>' + maxCharacters + '</b> Zeichen möglich.');
            var characterCounter = $(this).next('[data-characterCount]').find('b');

            $(this).on('keydown', function(e) {

                var inputLenght = $(this)[0].value.length;

                if(inputLenght >= maxCharacters) {
                    characterCounter.addClass('error');
                    characterCounter.text('0');
                } else {
                    characterCounter.removeClass('error');
                    characterCounter.text(maxCharacters - inputLenght);
                }

            });

        });

        // special rating input element

        $ratingSelect.on('click', function() {
            $(this).toggleClass('locked');
        });

        $ratingSelect.find('i').each(function(index) {

            $(this).on('mouseover', function() {

                var rating = index + 1;
                var ratingSelectElem = $(this).parent();
                var ratingInput = $(this).parent().prev('.ratingInput');

                if (ratingSelectElem.hasClass('locked')) return false;

                ratingSelectElem.attr('class','ratingSelect rated--' + rating);
                ratingInput.val(rating);

            });

        });

        $(scope + '.ratingInput').after($ratingSelect.clone(true));

    }

    // initialize
    // ==========

    initializeCustomFormElements();

    // public functions
    // ================

    return {
        init : initializeCustomFormElements
    }

})();
