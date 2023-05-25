$(document).ready(function () {
    if ($('.pdp-slider-content').length > 0) {
        $('.pdp-slider-content').slick({
            slidesToScroll: 1,
            slidesToShow: 1,
            arrows: false,
            dots: false,
            asNavFor: '.slider-nav-thumbnails',
        });

        $('.slider-nav-thumbnails').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.pdp-slider-content',
            dots: false,
            arrows: false,
            focusOnSelect: true
        });
    }
});