//---------slider----------

$('.top-slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoPlay: true
});
$('.multiple-items').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
});
$('.testimonials-slider').slick({
    infinite: true,
    dots: true,
    autoPlay: true
});

//--------pop-up------
$('.btn__auth').click( function () {
    $('.aunt').show()
});
$('.close').click( function () {
    $('.aunt').hide()
});
