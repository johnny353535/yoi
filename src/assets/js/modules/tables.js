/** tables.js */

var Table = (function() {

    // private vars
    // ============

    var btnLabelRemove = Helper.locale === 'de' ? 'Entfernen' : 'Remove';

    var $removeBtn = $('\
        <button class="btn btn--subtle btn--rounded">\
            <span class="hidden">' + btnLabelRemove + '</span>\
            <i class="icon--006-s" aria-hidden="true"></i>\
        </button>\
    ');

    // private functions
    // =================

    function initializeTables() {

        /**
         *  Get all tables with custom data-attribute and
         *  enhance functionality.
         */

        $('[data-table]').each(function(){

            var $thisTable = $(this);
            var options    = Helper.toObject($thisTable.data('table'));

            /**
             *  Available options:
             *
             *  @param {bool}           removeable   - removeable table rows
             *  @param {bool || string} selectable   - if set to true – single table rows can be selected, if set to "multi" – multiple table rows can be selected
             */

            if (options.selectable || options.selectable === 'multi') {

                // makes table rows selectable on click:

                // adjust table markup

                $thisTable.find('tr th:first-child').before('<th></th>');
                $thisTable.find('tr td:first-child').before('<td class="table__checkbox"></td>');

                // attach events

                $thisTable.find('td').on('click', function(e) {

                    e.preventDefault();

                    var $thisTr = $(this).closest('tr');
                    selectRow($thisTr);

                });

            }

            if (options.removeable) {

                // Inserts a col at the end of the table,
                // and puts a delete-button inside which removes
                // it's parent table row.

                var $thisRemoveBtn = $removeBtn.clone();

                // attach events to button

                $thisRemoveBtn.on('click', function(e) {

                    // prevent default & call remove row

                    e.preventDefault();

                    var $thisTr = $(this).closest('tr');
                    removeRow($thisTr);

                });

                // adjust table markup

                $thisTable.find('tr th:last-child').after('<th></th>');
                $thisTable.find('tr td:last-child').after('<td class="table__controls"></td>');

                // insert remove button

                $('.table__controls').append($thisRemoveBtn);

            }

        });

    }

    function selectRow($thisTr) {

        /**
         *  Select a given table row.
         *
         *  @param {jQuery dom object} $thisTr - the table row
         */

        var $thisTable = $thisTr.closest('table');
        var $thisAllTd = $thisTable.find('td');
        var $thisAllTr = $thisTable.find('tr');

        var options    = Helper.toObject($thisTable.data('table'));

        // select rows, either multiple or single

        if (options.selectable === 'multi') {

            $thisTr.toggleClass('tr--active');

        } else {

            $thisAllTr.removeClass('tr--active');
            $thisTr.addClass('tr--active');

        }

    }

    function removeRow($thisTr) {

        /**
         *  Remove a given table row.
         *
         *  @param  {jQuery dom object} $thisTr - the table row
         */

        var $thisTable   = $thisTr.closest('table');
        var thisData     = $thisTr.data();
        var totalTds     = $thisTable.find('td').length;
        var tableIsEmpty = (totalTds - $thisTr.find('td').length) === 0 ? true : false;

        $thisTr.fadeOut('slow', function() {

            $thisTr.remove();

            // custom event other scripts can subscribe to:
            // the last row got removed, table is empty

            if (tableIsEmpty) $thisTable.trigger('tables:empty');

        });

    }

    // initialize
    // ==========

    initializeTables();

    // public functions
    // ================

    return {
        init      : initializeTables,
        selectRow : selectRow,
        removeRow : removeRow
    };

})();
