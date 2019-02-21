// ---- preloader ----
$(window).on('load', function () {
    var preloader = $('.loaderArea')
    var loader = preloader.find('.loader');
    loader.fadeOut();
    preloader.delay(10).fadeOut('slow');
});
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

$("#load, #load-video").change(function (){
    if ($(this).val()){
        $(this).next().next().slideDown();
        $(this).next().next().next().css('display','flex');
        $(".edit-h").attr("checked", "checked");
        $(this).parent().next().css('display','flex');
    }
});

$("#load-t").change(function (){
    if ($(this).val()){
        $(this).next().next().slideDown();
        $(this).next().next().next().css('display','flex');
        $(".edit-hor").attr("checked", "checked");
        $(this).parents(" div.step-box ").next().children().addClass("act_btn")
    }
});

$("#load-video-t").change(function (){
    if ($(this).val()){
        $(this).next().next().slideDown();
        $(this).parents(" div.step-box ").next().children().addClass("act_btn")
    }
});

$('.horizontal').click(function () {
   $(".cropit-preview").addClass('cropit-preview__hor');
    if($(".cropit-preview").hasClass('cropit-preview__ver')){
        $(".cropit-preview").removeClass('cropit-preview__ver')
    }
});
$('.vertical').click(function () {
    $(".cropit-preview").addClass('cropit-preview__ver');
    if($(".cropit-preview").hasClass('cropit-preview__hor')){
        $(".cropit-preview").removeClass('cropit-preview__hor')
    }
});

// ---- user account ----

$('#all-movie').click(function () {
    $('#paids, #not-paids').show();
    $('#users-data').hide();
    $('#names').text("Все ролики");

});
$('#paid').click(function () {
    $('#paids').show();
    $('#not-paids, #users-data').hide();
    $('#names').text("Оплаченные");
});
$('#not-paid').click(function () {
    $('#not-paids').show();
    $('#paids, #users-data').hide();
    $('#names').text("Не оплаченные");
});
$('#user-data').click(function () {
    $('#users-data').show();
    $('#not-paids, #paids').hide();
    $('#names').text("Личные данные");
});

$(".change-pass").click(function () {
    $(".change-pass-box").slideDown()
});
$(".form-user input").focus(function () {
    $(this).next().css("opacity","1")
});

// --- lists ----

$(".elem").click(function () {

    var data = $(this).attr("id");
    var elem = $(this);

    elem.parent(" ul ").prev(" input ").val(elem.text()).attr("data-id", data);
    elem.parent(" ul ").prev(" p ").text(elem.text()).attr("data-id", data);

    setInterval(function () {
        if (($("#name-box").attr("data-id")) !== '') {
            $(elem).parents(" div.step-box ").next().children().addClass("act_btn")
        }
        else if (($(".words-list__title").attr("data-id")) !== '') {
            $(elem).parents(" div.step-box ").next().children().addClass("act_btn")
        }
    },10);

});

// ------- steps ----
$( document ).ready( function () {
    $(".word").parents(" div.step-box ").next().children().addClass("act_btn")
});

$(".btn__next").click(function () {
        $(this).parent().parent().hide();
        $(this).parents().next().show()
});
$(".btn__prev").click(function () {
    $(this).parent().parent().hide();
    $(this).parents().prev().show()
});
