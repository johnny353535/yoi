// ===========================================================
//
//        File:    js/suggestedBundle.js
//        Descr.:    Toggle elements in .suggestedBundle.
//
// ===========================================================

$('.suggestedBundle').each(function() {

    $(this).find('input[type="checkbox"]').change(function() {

        // manipulate list

        $(this).closest('label')
            .find('span').eq(1)
            .toggleClass('inactive');

        $(this).closest('label')
            .find('span').eq(2)
            .toggleClass('inactive');

        // manipulate packshots

        var itemIndex = $(this).parent().parent().index();
        $('.packshots li').eq(itemIndex).fadeToggle();

    })

});
