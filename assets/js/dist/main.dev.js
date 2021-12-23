"use strict";

new WOW().init();

function getNews() {
  $.ajax({
    url: 'assets/common/news.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var html = '';

      for (var i = 0; i < json.length; i++) {
        html += "\n                 <li class=\"slider-2__card\">\n \n                    <img data-lazy=".concat(json[i].img, " alt=\"picture\" class=\"slider-2__img\"\n                    src=\"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==\">\n                   \n                    <h4 class=\"slider-2__title\">").concat(json[i].title, "</h4>\n                    <p class=\"slider-2__descr descr-cmn\">").concat(json[i].text, "</p>\n                    <div class=\"slider-2__authors authors\">\n                        <img src=").concat(json[i].avatar, " alt=\"foto\" class=\"authors__img\">\n                        <div class=\"authors__info\">\n                            <div class=\"authors__name\">").concat(json[i].name, "</div>\n                            <div class=\"authors__date\">").concat(json[i].date, "</div>\n                        </div>\n                    </div>\n                    <a class=\"slider-2__link\" href=\"#\"></a>\n                </li>\n            ");
      }

      $("#slider-2").slick('slickAdd', html);
    },
    error: function error() {
      alert("Menu JSON not found");
    }
  });
}

function showGallery() {
  lightGallery(document.getElementById('animated-thumbnails-gallery'), {
    plugins: [lgZoom, lgThumbnail],
    thumbnail: true,
    zoom: true,
    actualSize: true,
    animateThumb: true,
    zoomFromOrigin: true
  });
}

$(function () {
  getNews();
  showGallery();
  $('#slider-1').slick({
    slidesToShow: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    dots: true,
    lazyLoad: 'ondemand',
    responsive: [{
      breakpoint: 1000,
      settings: {
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000
      }
    }]
  });
  $('#slider-2').slick({
    slidesToShow: 3,
    dots: true,
    lazyLoad: 'ondemand',
    arrows: true,
    responsive: [{
      breakpoint: 965,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        arrows: false
      }
    }]
  }); // hamburger

  $(".hamburger, #page-overlay").on("click", function () {
    $("#mobile-menu-wrap .hamburger").toggleClass("is-active");
    $("body").toggleClass("open");
  });
  $(".sidemenu__nav li a").on('click', function () {
    $('body').removeClass('open');
  }); // scroll

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 0) {
      if (!$("body").addClass("fixed_nav")) {
        $("body").addClass("fixed_nav");
      }
    } else {
      if ($("body").addClass("fixed_nav")) {
        $("body").removeClass("fixed_nav");
      }
    }
  });
  $("#main_menu a").on('click', function (e) {
    e.preventDefault();
    var top = $($(this).attr("href")).offset().top - 60;
    $("html, body").animate({
      scrollTop: top + 'px'
    }, 1000);
  });
  $(".header__button").on('click', function () {
    $('html,body').animate({
      scrollTop: $('.map').offset().top
    }, 2000);
  });
  $("#init_map").on('click', function () {
    $(this).remove();
    var map = L.map('my_map').setView([40.851137941150604, -73.84834194992693], 17);
    L.tileLayer('	https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var myIcon = L.icon({
      iconUrl: 'assets/icons/pin.png',
      iconSize: [106, 106],
      iconAnchor: [106, 106],
      popupAnchor: [-53, -90],
      shadowUrl: 'assets/icons/pin.png',
      shadowSize: [106, 106]
    });
    L.marker([40.851137941150604, -73.84834194992693], {
      icon: myIcon
    }).addTo(map).bindPopup("\n        <div class=\"map__popup\">\n            <img src=\"assets/images/orang.jpg\">\n            <div class=\"map__info\"><b>Welcome!</b></div>\n            </div>\n        ");
  });
  $(".nav__link").on('click', function (e) {
    e.preventDefault();
    var top = $($(this).attr("href")).offset().top - 58;
    $("html, body").animate({
      scrollTop: top + 'px'
    }, 1000);
  });
  $("#contact_form").on('submit', function (e) {
    e.preventDefault();
    var name = $("#form-name").val();
    var email = $("#form-email").val();
    $("#form-name").removeClass("error");
    $("#form-email").removeClass("error");

    if (name.length <= 1) {
      $("#form-name").addClass("error");
      toastr.error('Please enter your name');
    } else if (email.length <= 1) {
      $("#form-email").addClass("error");
      toastr.error('Please enter your email');
    } else {
      sendData();
      $("#form-name").removeClass("error");
      $("#form-email").removeClass("error");
    }
  });
  toastr.options = {
    "positionClass": "toast-bottom-center"
  };
});

function sendData() {
  // const BOT_TOKEN = '5080323427:AAHPqhWaRnkikDCjJcMOPiYDNmWLfBqPE3c';
  // const CHAT_ID = '-1001616535193';
  var BOT_TOKEN = '5061961723:AAFyTzsk1BHKDdQfM55rCg4LIN4DH0cVSW0';
  var CHAT_ID = '-1001620060802';
  var text = encodeURI("<b>Name: </b>" + $("#form-name").val() + "\r\n<b>Email: </b>" + $("#form-email").val());
  $.get("https://api.telegram.org/bot".concat(BOT_TOKEN, "/sendMessage?chat_id=").concat(CHAT_ID, "&text=").concat(text, "&parse_mode=html"), function (json) {
    console.log(json);

    if (json.ok) {
      $("#contact_form").trigger('reset');
      toastr.success('We will contact you ASAP', 'Message sent');
    } else {
      alert(json.description);
    }
  });
}