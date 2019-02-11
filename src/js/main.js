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

// ----- bg img video -----
$(document).on('click', '.img-video', function() {
    var $video = $(this).next(),
        src = $video.attr('data-src');
    $video.attr('src', src + '&autoplay=1');
    $video.addClass('d-block');
    var _self = this;
    $(_self).addClass('d-none');
    var _btn = $(this).next().next();
    $(_btn).addClass('d-none');

    if ($video.attr('src', src + '&autoplay=1')) {
        $('.img-video, .play-video').click(function () {
            ($video.attr('src', src + '&autoplay=0'))
        })
    }

});
$(document).on('click', '.play-video', function() {
    var $video = $(this).prev(),
        src = $video.attr('data-src');
    $video.attr('src', src + '&autoplay=1');
    $video.addClass('d-block');
    var _self = this;
    $(_self).addClass('d-none');
    var _btn = $(this).prev().prev();
    $(_btn).addClass('d-none');

    if ($video.attr('src', src + '&autoplay=1')) {
        $('.play-video, .img-video').click(function () {
            ($video.attr('src', src + '&autoplay=0'))
        })
    }
})