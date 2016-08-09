/** shoppingList.js */

var ShoppingList = (function() {

    // private vars
    // ============

    var $listCounter = $('#listCounter');
    var $coin        = $('<i aria-hidden="true" class="icon--004-s"></i>');
    var listCounterValue;

    // private functions
    // =================

    function initializeShoppingList() {

        /**
         *  Initialize the shopping list (aka "Merkzettel").
         */

        $('[data-action="addToList"]').each(function() {

            var $thisBtn      = $(this);
            var thisCoinSound = new Audio('assets/audio/coin.wav');

            // Since we inject another icon, the width changes.
            // We need to fix it simply to make sure the button
            // keeps a square aspect ratio. Unfortunately, this
            // is rather ugly.

            var hasNoLabel = $thisBtn.has('.hidden').length > 0;

            if (hasNoLabel)                                     $thisBtn.css('width','2.5rem');
            if (hasNoLabel && $thisBtn.hasClass('btn--small'))  $thisBtn.css('width','2rem');
            if (hasNoLabel && $thisBtn.hasClass('btn--medium')) $thisBtn.css('width','3rem');
            if (hasNoLabel && $thisBtn.hasClass('btn--large'))  $thisBtn.css('width','4rem');

            // inject the coin

            $thisBtn.append($coin.clone());

            // attach event

            $thisBtn.on('click', function(e) {
                e.preventDefault();
                toggleAddToListBtn($thisBtn, thisCoinSound);
            });

        });

    }

    function toggleAddToListBtn($thisBtn, thisCoinSound) {

        /**
         *  Toggle the add-to-list button state.
         *
         *  @param {jQuery dom object} $thisBtn - the button
         *  @param {}  -
         */

        if ($thisBtn.hasClass('btn--success')) {

            thisCoinSound.pause();
            thisCoinSound.currentTime = 0;
            $thisBtn.removeClass('btn--success');
            decreaseListCounter();

        } else {

            thisCoinSound.play();
            $thisBtn.addClass('btn--success');
            increaseListCounter();

        }

    }

    function increaseListCounter() {

        /**
         *  Add 1 to item counter.
         */

        var amount = $listCounter.text() * 1;
        ++amount;

        setListCounter(amount);

    }

    function decreaseListCounter() {

        /**
         *  Substract 1 from item counter.
         */

        var amount = $listCounter.text() * 1;

        if (amount > 0) {
            --amount;
            setListCounter(amount);
        }

    }

    function setListCounter(amount) {

        /**
         *  Set the counter to a given amount.
         *
         *  @param {number}  amount - the amount
         */

        if (typeof amount === 'number' && (amount % 1) === 0) {

            $listCounter.text(amount)
            Helper.blink($listCounter);
            listCounterValue = $listCounter.text() * 1;

            if (listCounterValue > 0) {
                $listCounter.addClass('badge--dark');
            } else {
                $listCounter.removeClass('badge--dark');
            }

        }

    }

    // initialize
    // ==========

    initializeShoppingList();

    // public functions
    // ================

    return {
        init      : initializeShoppingList,
        setCount  : setListCounter,
        countUp   : increaseListCounter,
        countDown : decreaseListCounter
    }

})();
