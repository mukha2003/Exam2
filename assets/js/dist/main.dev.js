"use strict";

function getNews() {
  $.ajax({
    url: 'assets/common/news.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var html = '';

      for (var i = 0; i < json.length; i++) {
        html += "\n                 <li class=\"slider-2__card\">\n                    <img data-lazy=".concat(json[i].img, " alt=\"picture\" class=\"slider-2__img\">\n                    <h4 class=\"slider-2__title\">").concat(json[i].title, "</h4>\n                    <p class=\"slider-2__descr descr-cmn\">").concat(json[i].text, "</p>\n                    <div class=\"slider-2__authors authors\">\n                        <img src=").concat(json[i].avatar, " alt=\"foto\" class=\"authors__img\">\n                        <div class=\"authors__info\">\n                            <div class=\"authors__name\">").concat(json[i].name, "</div>\n                            <div class=\"authors__date\">").concat(json[i].date, "</div>\n                        </div>\n                    </div>\n                    <a class=\"slider-2__link\" href=\"#\"></a>\n                </li>\n            ");
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
      breakpoint: 1180,
      settings: {
        dots: false
      }
    }]
  });
  $('#slider-2').slick({
    slidesToShow: 3,
    dots: true,
    lazyLoad: 'ondemand',
    arrows: true
  });
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
    var marker = L.marker([40.851137941150604, -73.84834194992693], {
      icon: myIcon
    }).addTo(map).bindPopup("\n        <div class=\"map__popup\">\n            <img src=\"assets/images/orang.jpg\">\n            <div class=\"map__info\"><b>Welcome!</b></div>\n            </div>\n        ");
    marker.on('click', function () {
      document.getElementById("to_google_map").click(); // window.location.href = "https://www.google.com.ua/maps/place/@50.4265986,30.4947427,18z"
    });
  });
  $(".nav__link").on('click', function (e) {
    e.preventDefault();
    var top = $($(this).attr("href")).offset().top - 58;
    $("html, body").animate({
      scrollTop: top + 'px'
    }, 1000);
  });
});