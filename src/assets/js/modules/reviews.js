// ===========================================================
//
//		File:	js/reviews.js
//		Descr.:	-
//
// ===========================================================

// close all reviews

$('.review.closed > blockquote').slideUp(0);

// open/close individual reviews

$('.review .meta').each(function() {

    $(this).on('tap', function(e) {

        e.preventDefault();

        var parentReview = $(this).parent('.review');

        if (parentReview.hasClass('closed')) {
            parentReview.removeClass('closed').addClass('open');
            parentReview.find('> blockquote').slideDown('fast');
            return;
        }

        if (parentReview.hasClass('open')) {
            parentReview.removeClass('open').addClass('closed');
            parentReview.find('> blockquote').slideUp('fast');
            return;
        }

    });

});

// option to hide review items after defined max. item number

$('.reviews-s').each(function() {

    var options = $(this).data('options');

    if (options === undefined) {

        return;

    } else {

        // read threshold

        var threshold = options.maxItems,
            reviews = $(this).find('.review'),
            totalReviews = reviews.length;

        // if .reviews has more .review items than threshold,
        // cut off remaining items

        if (totalReviews > threshold) {

            reviews.slice(threshold).hide();

            // create and insert load-button

            var btnLoad = $('<button class="btnLoad">Alle <b>' + totalReviews + '</b> Bewertungen anzeigen</button>')
                .on('tap', function() {
                    $(this).parent().find('.review').show();
                    $(this).remove();
                    NavBar.showMsg();
                })
                .insertAfter($(this).find('.review').eq(threshold));

        }

    }

});
