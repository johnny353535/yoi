/** datePicker.js */

YOI.DatePicker = (function() {

    // private vars
    // ============

    // get the document language, fall back to english
    // note: only german and english supported at this moment

    var language = typeof YOI.locale() !== 'object' || YOI.locale() === undefined || YOI.locale() === '' ? 'en' : YOI.locale();

    // object to save the current date

    var now = {};

    // templates

    var $datePicker = $('\
        <div class="datePicker">\
            <span class="datePicker__btnPrev" data-action="prevMonth"></span>\
            <span class="datePicker__btnNext" data-action="nextMonth"></span>\
            <h3 class="datePicker__header"></h3>\
        </div>\
    ');

    var $weekDaysHeader_en = $('\
        <tr>\
            <th>Mon</th>\
            <th>Tue</th>\
            <th>Wed</th>\
            <th>Thu</th>\
            <th>Fri</th>\
            <th>Sat</th>\
            <th>Sun</th>\
        </tr>\
    ');

    var $weekDaysHeader_de = $('\
        <tr>\
            <th>Mo</th>\
            <th>Di</th>\
            <th>Mi</th>\
            <th>Do</th>\
            <th>Fr</th>\
            <th>Sa</th>\
            <th>So</th>\
        </tr>\
    ');

    // private functions
    // =================

    function initializeDatePicker($datepicker, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $datepicker
         *  @param {object}            options
         */
        
        // update the current date

        getCurrentDate();
        
        // initialize the datepickers
        
        var $datepicker = YOI.createCollection('datepicker', $datepicker, options);

        if ($datepicker) $datepicker.each(function(index) {

            // get date input & date input data

            var $thisDateInput = $(this);

            // if the date input already has data (from markup), use it

            // if (!$.isEmptyObject($thisDateInput.data('datepicker'))) {

                // get and format date input data

                var options = $thisDateInput.data().options;

                // if a field is undefined, fall back to the current time value for the field,
                // eg. if year is undefined, use the current year

                var inputYear  = options.year  === undefined ? now.year  : parseInt(options.year);
                var inputMonth = options.month === undefined ? now.month : parseInt(options.month - 1);
                var inputDay   = options.day   === undefined ? now.day   : parseInt(options.day);

                updateDateInput(
                    $thisDateInput,
                    inputYear,
                    inputMonth,
                    inputDay
                );

                // render date picker with year and date from date input data

                var $thisDatePicker = renderDatePicker(inputYear, inputMonth, inputDay);

            // } else {

                updateDateInput(
                    $thisDateInput,
                    now.year,
                    now.month
                );

                // render date picker with current date

                var $thisDatePicker = $thisDatePicker = renderDatePicker();

            // }

            // get month table and month table data

            var $thisMonthTable    = $thisDatePicker.find('.datePicker__days');
            var thisMonthTableData = $thisMonthTable.data();

            // add a wrapper to aid positioning

            $thisDateInput.wrap('<div class="datePicker__wrapper"></div>');
            var $thisDateInputWrapper = $thisDateInput.closest('.datePicker__wrapper');

            // inject elements

            $thisDateInput.after($thisDatePicker);
            $thisDatePicker.hide();

            // attach events to wrapper

            $thisDateInputWrapper.on('click', function(e) {
                $thisDateInput.trigger('focus');
            });

            // attach events to date input field

            $thisDateInput
                .on('click', function(e) {

                    // prevent the click event on the date input field
                    // to bubble up, so that 'focus' won't get triggered
                    // on the wrapper

                    e.stopPropagation();

                })
                .on('blur', function() {

                    YOI.setDelay('datePickerHideTimeout-' + index, 500, function() {

                        // get the date input data

                        var thisDateInputData = $thisDateInput.data();

                        // hide this date picker after a short delay

                        $thisDateInput.next('.datePicker').fadeOut('fast', function() {

                            // reset the month table to the selected date

                            $thisDatePicker.find('.datePicker__days').replaceWith(renderMonthTable($thisDatePicker, thisDateInputData.selectedYear, thisDateInputData.selectedMonth));
                            $thisDatePicker.find('.datePicker__header').text(getMonthName(thisDateInputData.selectedMonth) + ' ' + thisDateInputData.selectedYear);

                        });

                    });

                })
                .on('focus', function(e) {

                    YOI.clearDelay('datePickerHideTimeout-' + index);

                    // hide all other date pickers first

                    hideAllDatePickers();

                    // get the date picker and decide weather
                    // to put it above or below the input field

                    var $thisDatePicker = placeDatePicker($thisDateInput.next('.datePicker'));

                    // show the date picker

                    $thisDatePicker.show();

                });

        });

    }

    function updateDatePicker($thisDatePicker, selectedYear, selectedMonth, selectedDay) {

        /**
         *  Attach a data object to the date picker with updated values.
         *
         *  @param {jQuery dom object} $thisDatePicker - the date picker
         *  @param {number}            selectedYear    - the selected year
         *  @param {number}            selectedMonth   - the selected month
         *  @param {number}            selectedDay     - the selected day
         */

        // format the date

        var formattedSelectedDate = YOI.zeroPad(selectedDay, 1) + '.' + YOI.zeroPad(selectedMonth, 1) + '.' + selectedYear;

        // write data

        $thisDatePicker.data().options = {
            'selectedYear'          : selectedYear,
            'selectedMonth'         : selectedMonth,
            'selectedDay'           : selectedDay,
            'formattedSelectedDate' : formattedSelectedDate
        };

    }

    function updateMonthTable($thisMonthTable, year, month) {

        /**
         *  Attach a data object to the month table with updated values.
         *
         *  @param {jQuery dom object} $thisMonthTable - the month table
         *  @param {number}            year            - the optional year, falls back to current year
         *  @param {number}            month           - the optional month, falls back to current month
         */

        // read the current date and time,
        // saved as object named "now"

        getCurrentDate();

        // default value for month and year

        if (month === undefined || year === undefined) {

            // if month or year are undefined,
            // use the current date

            var year  = now.year;
            var month = now.month;

        }

        // get the month name

        var monthName = getMonthName(month);

        // get the first day of the month

        var firstDayInstance = new Date(year, month, 1);
        var firstDay         = firstDayInstance.getDay();
        firstDayInstance     = null;

        // number of days in current month

        var totalDays = getTotalDays(year, month);

        // get the selected day

        var selectedDay = $thisMonthTable.find('.datePicker--selectedDay').text();

        // format the date

        var formattedDate = YOI.zeroPad(selectedDay, 1) + '.' + YOI.zeroPad(month + 1, 1) + '.' + year;

        // write data to month table

        $thisMonthTable.data({
            'firstDay'       : firstDay,     // week day of the first day of the given month
            'totalDays'      : totalDays,    // total days of the given month
            'year'           : year,         // the given year of the month table
            'month'          : month,        // the given month of the month table
            'formattedDate'  : formattedDate // the formatted date
        });

    }

    function updateDateInput($thisDateInput, year, month, day) {

        /**
         *  Attach a data object to the date input field with updated values and write
         *  the formatted date into the date input field.
         *
         *  @param {jQuery dom object} $thisDateInput - the corrensponding input field
         *  @param {number}            year           - the given year
         *  @param {number}            month          - the given month
         *  @param {number}            day            - the given day
         */

        // format the date

        var formattedDate;

        if (!day || !month || !year) {
            formattedDate = '';
        } else {
            if (language === 'de') formattedDate = YOI.zeroPad(day, 1) + '.' + YOI.zeroPad(month + 1, 1) + '.' + year;
            if (language === 'en') formattedDate = YOI.zeroPad(month + 1, 1) + '.' + YOI.zeroPad(day, 1) + '.' + year;
        }

        // write data

        $thisDateInput.data({
            'selectedYear'  : year,
            'selectedMonth' : month,
            'selectedDay'   : day,
            'formattedDate' : formattedDate
        });

        // write the selected date to the date input field

        $thisDateInput.val(formattedDate);

    }

    function renderMonthTable($thisDatePicker, year, month) {

        /**
         *  Renders a new month table with optional parameters for year and month.
         *  If year or month are undefined, the current year or month will be used.
         *
         *  @param  {jQuery dom object} $thisDatePicker - the corresponding date picker
         *  @param  {number}            year            - the optional year
         *  @param  {number}            month           - the optional month
         *  @return {jQuery dom object} $monthTable     - the month table
         */

        // create the month table

        var $monthTable     = $('<table class="datePicker__days"><tbody></tbody></table>');
        var $monthTableBody = $monthTable.find('tbody').first();

        // update the month table

        updateMonthTable($monthTable, year, month);

        // access the month table data

        var thisMonthTableData = $monthTable.data();

        // access the date picker data

        var thisDatePickerData = $thisDatePicker.data();

        // create the table header

        if (YOI.locale() === 'en' || YOI.locale === undefined) {

            $monthTableBody.append($weekDaysHeader_en.clone());

        } else if (YOI.locale() === 'de') {

            $monthTableBody.append($weekDaysHeader_de.clone());

        }

        // create the table rows

        var indexCell = 1;
        var indexDay  = 1;

        for (var i = 0; i < Math.ceil((thisMonthTableData.totalDays + thisMonthTableData.firstDay - 1) / 7); i++) {

            var $row = $('<tr>');

            // create the table cells

            for (var j = 0; j < 7; j++) {

                if (indexCell < thisMonthTableData.firstDay || indexDay > thisMonthTableData.totalDays) {

                    // empty cells

                    $row.append('<td class="datePicker--emptyDay"></td>');

                } else if (thisMonthTableData.month === thisDatePickerData.selectedMonth && thisMonthTableData.year === thisDatePickerData.selectedYear && indexDay === thisDatePickerData.selectedDay) {

                    // selected day

                    $row.append('<td class="datePicker--selectedDay">' + indexDay + '</td>');
                    indexDay++;

                } else if (thisMonthTableData.month === now.month && thisMonthTableData.year === now.year && indexDay === now.day) {

                    // today

                    $row.append('<td class="datePicker--today">' + indexDay + '</td>');
                    indexDay++;

                } else {

                    // any other cell

                    $row.append('<td>' + indexDay + '</td>');
                    indexDay++;

                }

                indexCell++;

            }

            // append the table row

            $monthTableBody.append($row);

        }

        // attach events to date picker cells

        $monthTable.find('td:not(.datePicker--emptyDay)').on('mousedown', function() {

            var selectedDay = parseInt($(this).text());

            pickDate($monthTable, thisMonthTableData.year, thisMonthTableData.month, selectedDay);

        });

        // return month table

        return $monthTable;

    }

    function renderDatePicker(year, month, selectedDay) {

        /**
         *  Render a date picker with optional initial parameters for year, month and
         *  selected day. If no parameters are given, the current date will be used.
         *  The render function will only be called once per date picker on page load.
         *  For further manipulation (eg. changing the month), only the month table
         *  gets re-rendered.
         *
         *  @param  {number}            year            - the optional year
         *  @param  {number}            month           - the optional month
         *  @param  {number}            selectedDay     - the optional selected day
         *  @return {jQuery dom object} $thisDatePicker - the date picker
         */

        // get date picker and write date picker data

        var $thisDatePicker = $datePicker.clone();

        updateDatePicker(
            $thisDatePicker,
            year,
            month,
            selectedDay
        );

        // render month table

        var $thisMonthTable = renderMonthTable($thisDatePicker, year, month);

        // inject elements

        $thisDatePicker.append($thisMonthTable);

        // get month table data

        var thisMonthTableData = $thisMonthTable.data();

        // set year and month

        if (month === undefined) month = now.month;
        if (year  === undefined) year  = now.year;

        // write the date picker header

        $thisDatePicker.find('.datePicker__header').text(getMonthName(month) + ' ' + year);

        // attach events to date picker buttons

        $thisDatePicker.find('[yoi-action*="Month"]').on('click', function(e) {

            e.preventDefault();

            // important: get updated month table data on each click

            var $thisDatepicker    = $(this).closest('.datePicker');
            var $thisMonthTable    = $thisDatepicker.find('.datePicker__days');
            var thisMonthTableData = $thisMonthTable.data();
            var month              = thisMonthTableData.month;
            var year               = thisMonthTableData.year;

            // get the action (prevMonth or nextMonth)

            var thisAction = $(this).data('action');

            // action = show previous month

            if (thisAction === 'prevMonth') {

                if (month > 0) {

                    --month;

                } else {

                    month = 11;
                    --year;

                }

            }

            // action = show next month

            if (thisAction === 'nextMonth') {

                if (month < 11) {

                    ++month;

                } else {

                    month = 0;
                    ++year;

                }

            }

            // render new month table and
            // write date picker header

            $thisDatePicker.find('.datePicker__days').replaceWith(renderMonthTable($thisDatePicker, year, month));
            $thisDatePicker.find('.datePicker__header').text(getMonthName(month) + ' ' + year);

            // update month table data

            updateMonthTable($thisMonthTable, year, month);

        });

        // attach events to date picker

        $thisDatePicker.on('mousedown', function() {

            // for unknow reasons, focus gets fired *before* blur if we don't
            // use a short delay for debounce

            YOI.setDelay('datePickerFocusDelay', 50, function() {
                $thisDatePicker.prev('input[yoi-datepicker]').focus();
            });

        });

        // return the date picker

        return $thisDatePicker;

    }

    function pickDate($thisMonthTable, selectedYear, selectedMonth, selectedDay) {

        /**
         *  Set a date for a month table and update all associated data objects.
         *
         *  @param {jQuery dom object} $thisMonthTable - the corresponding month table
         *  @param {number}            selectedYear    - the selected year
         *  @param {number}            selectedMonth   - the selected month
         *  @param {number}            selectedDay     - the selected day
         */

        var $thisDatePicker = $thisMonthTable.closest('.datePicker');
        var $thisDateInput  = $thisDatePicker.prev('input[yoi-datepicker]');

        // access the month table data

        var thisMonthTableData = $thisMonthTable.data();

        // add a class to the day cell to visualize selection

        $thisMonthTable.find('td').each(function() {

            var $thisCell = $(this);

            $thisCell.removeClass('datePicker--selectedDay');

            if (parseInt($thisCell.text()) === selectedDay) {
                $thisCell.addClass('datePicker--selectedDay');
            }

        });

        // update month table

        updateMonthTable(
            $thisMonthTable,
            selectedYear,
            selectedMonth
        );

        // update date picker

        updateDatePicker(
            $thisDatePicker,
            selectedYear,
            selectedMonth,
            selectedDay
        );

        // update date input

        updateDateInput(
            $thisDateInput,
            selectedYear,
            selectedMonth,
            selectedDay
        );

    }

    function hideAllDatePickers() {

        /**
         *  Hide all visible date pickers.
         */

        $('.datePicker__wrapper .datePicker').hide();
    }

    function getCurrentDate() {

        /**
         *  Get the current date and return an object with well fomatted
         *  values for easy use and access.
         *
         *  @return {object} - formatted date object
         */

        // create a new date instance

        var currentDate = new Date();

        // save the date

        now = {
            'weekDay' : currentDate.getDay(),             // the current day of the week
            'day'     : currentDate.getDate(),            // the current day of the month
            'month'   : currentDate.getMonth(),           // the current month
            'year'    : adjustYear(currentDate.getYear()) // the current year
        }

    }

    function getTotalDays(year, month) {

        /**
         *  Returns the number of days of a given month of a given year.
         *
         *  @param  {number}  month - the month, starting at 0, eg. 5 for june
         *  @param  {number}  year  - the year, eg. 2016
         *  @return {number}        - the number of days of the given month
         */

        var daysInMonths = [
            31, // jan
            28, // feb
            31, // mar
            30, // apr
            31, // may
            30, // jun
            31, // jul
            31, // aug
            30, // sep
            31, // oct
            30, // nov
            31  // dec
        ];

        // february in leap year has 29 days

        if (year % 4 === 0)
            daysInMonths[1] = 29;

        // return the total days

        return daysInMonths[month];

    }

    function getMonthName(month) {

        /**
         *  Return the name of a given month. Very basic localisation,
         *  only English and German so far.
         *
         *  @param  {number}  month - the month, eg. 5
         *  @return {string}        - the name of the month in English (default) or German
         */

        var monthNames;

        if (language === 'en' || language === undefined) {

            monthNames = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]

        } else if (language === 'de') {

            monthNames = [
                'Januar',
                'Februar',
                'März',
                'April',
                'Mai',
                'Juni',
                'Juli',
                'August',
                'September',
                'Oktober',
                'November',
                'Dezember'
            ]

        }

        return monthNames[month];

    }

    function adjustYear(year) {

        /**
         *  Take any year and prefix it with '19' if the year is below 1000.
         *
         *  @param  {number}  year - the input year
         *  @return {number}  year - the well formatted output year
         */

        if (year < 1000) {
            year += 1900;
        }

        return year;

    }

    function placeDatePicker($thisDatePicker) {

        /**
         *  By default, date pickers are placed below the date input field.
         *  This function calculates the available space in the viewport below
         *  the input field. If the space is too low, the date picker will be
         *  placed above the date input field.
         *
         *  @param  {jQuery dom object} $thisDatePicker - the date picker
         *  @return {jQuery dom object} $thisDatePicker - the date picker plus positioning
         */

        // get the date input field

        var $dateInput       = $thisDatePicker.prev('input[yoi-datepicker]');

        // get some data about dimensions and positioning

        var dateInputOffsetY = $dateInput.offset().top;
        var dateInputHeight  = $dateInput.outerHeight();
        var datePickerHeight = $thisDatePicker.outerHeight();
        var viewPortHeight   = $(window).height();
        var scrollTop        = $(window).scrollTop();

        // calculate the available space below the date input field

        var place = viewPortHeight - ((dateInputOffsetY + dateInputHeight) - scrollTop) < datePickerHeight ? 'above' : 'below';

        // place the date picker below or above the date input field?

        if (place === 'above') {
            $thisDatePicker.css('top', -1 * datePickerHeight - 10 + 'px');
        } else if (place === 'below') {
            $thisDatePicker.css('top', dateInputHeight + 10 + 'px');
        }

        // return the date picker - with positioning

        return $thisDatePicker;

    }

    // initialize
    // ==========

    initializeDatePicker();

    // public functions
    // ================

    return {
        init   : initializeDatePicker,
        render : renderDatePicker,
        hide   : hideAllDatePickers
    }

})();
