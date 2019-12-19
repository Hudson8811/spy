$(document).ready(function() {
    $("input[name='phone']").mask(" +7 (999) 999-99-99");


    $('.photos-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });

    $('.js-form-show').click(function () {
        $('.take-part').slideToggle({
            start: function () {
                $(this).css({
                    display: "flex"
                })
            }
        });
    });

});
