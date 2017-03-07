/** tables.js */

YOI.Table = (function() {

    // private functions
    // =================

    function initialize($table, options) {

        /**
         *  Initialize the script.
         *
         *  @param {jQuery dom object} $table
         *  @param {object}            options
         *
         *  Available options:
         *
         *  @option {boolean} removeable - removeable table rows
         *  @option {boolean} selectable - if set to true, single table rows can be selected, if set to "multi", multiple table rows can be selected
         */
        
        var $table = YOI.createCollection('table', $table, options);
        
        if ($table) $table.each(function() {

            var $thisTable = $(this);
            var options    = $thisTable.data().options;

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

                // Inserts a col at the end of the table
                // and puts a delete-icon inside. On click, the
                // parent table row is removed.

                // adjust table markup

                $thisTable.find('tr th:last-child').after('<th></th>');
                $thisTable.find('tr td:last-child').after('<td class="table__removeBtn"></td>');

                // attach events to cells

                $thisTable.find('.table__removeBtn').on('click', function(e) {

                    // prevent default & call remove row

                    e.preventDefault();

                    var $thisTr = $(this).closest('tr');
                    removeRow($thisTr);

                });

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
        var options    = $thisTable.data().options;

        // select rows, either multiple or single

        if (options.selectable === 'multi') {
            $thisTr.toggleClass('tr--active');
        } else {
            $thisAllTr.removeClass('tr--active');
            $thisTr.addClass('tr--active');
        }
        
        // trigger custom event
        
        $thisTable.trigger('yoi-table:select');

    }

    function removeRow($thisTr) {

        /**
         *  Remove a given table row.
         *
         *  @param  {jQuery dom object} $thisTr - the table row
         */

        var $thisTable   = $thisTr.closest('table');
        var totalTds     = $thisTable.find('td').length;
        var tableIsEmpty = (totalTds - $thisTr.find('td').length) === 0 ? true : false;

        $thisTr.fadeOut('slow', function() {

            $thisTr.remove();

            // custom event other scripts can subscribe to:
            // the last row got removed, table is empty

            if (tableIsEmpty) $thisTable.trigger('yoi-table:empty');

        });
        
        // trigger custom event
        
        $thisTable.trigger('yoi-table:remove');

    }

    // initialize
    // ==========

    initialize();

    // public functions
    // ================

    return {
        init      : initialize,
        selectRow : selectRow,
        removeRow : removeRow
    };

})();
