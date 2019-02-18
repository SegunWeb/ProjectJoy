//---------slider----------
$('.top-slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 10000,
});
$('.multiple-items').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
    ]
});
$('.testimonials-slider').slick({
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 7000,
    fade: true,
    cssEase: 'linear',
});

//--------pop-up------

$('.btn__auth').click( function () {
    $('.filter').show(),
    $('.header-nav-box').removeClass("d-flex"),
    $('.btn__hamburger').removeClass("is-active")
});
$('.close').click( function () {
    $('.filter').hide()
});
$('.btn__hamburger').click( function () {
    $('.header-nav-box').toggleClass("d-flex");
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
});

// ---- button burger -----
(function() {
    var toggles = document.querySelectorAll(".toggle-hamburger");

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    };

    function toggleHandler(toggle) {
        toggle.addEventListener( "click", function(e) {
            e.preventDefault();
            (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
        });
    }
})();

// ----- price ------
$( document ).ready( function () {
   if($(".price-box__discount").hasClass("d-none")) {
       $(".price-box__main p").toggleClass("price-text__discount")
   }
});


// ----- cropit -------

$(function() {
    $('.rotate-cw').click(function() {
        $('.image-editor').cropit('rotateCW');
    });
    $('.rotate-ccw').click(function() {
        $('.image-editor').cropit('rotateCCW');
    });

    $('.export').click(function() {
        var imageData = $('.image-editor').cropit('export');
        window.open(imageData);
    });
});

$("input:file").change(function (){
    if ($(this).val()){
        $('.cropit-preview').slideDown();
        $('.image-editor__box').css('display','flex');
    }
});

$('.horizontal').click(function () {
   $(".cropit-preview").css({"width":"100%", "height":"20rem"})
});
$('.vertical').click(function () {
    $(".cropit-preview").css({"width":"80%","height":"25rem"})
});
