new WOW().init();

function getNews(){
    $.ajax({
        url:'assets/common/news.json',
        type:'get',
        dataType:'json',
        success:function(json){
            let html = '';
            for(let i=0;i<json.length;i++){
                html += `
                 <li class="slider-2__card">
                <div class="slider-2__img-wrap">
                    <img data-lazy=${json[i].img} alt="picture" class="slider-2__img lazy"
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==">
                </div>   
                    <h4 class="slider-2__title">${json[i].title}</h4>
                    <p class="slider-2__descr descr-cmn">${json[i].text}</p>
                    <div class="slider-2__authors authors">
                        <img src=${json[i].avatar} alt="foto" class="authors__img">
                        <div class="authors__info">
                            <div class="authors__name">${json[i].name}</div>
                            <div class="authors__date">${json[i].date}</div>
                        </div>
                    </div>
                    <a class="slider-2__link" href="#"></a>
                </li>
            `;        
            }
            $("#slider-2").slick('slickAdd',html);           
        },
        error:function(){
            alert.danger('Can not losd news',true); 
        }
    });
}

function showGallery(){
    lightGallery(document.getElementById('animated-thumbnails-gallery'), {
        plugins: [lgZoom, lgThumbnail],
        thumbnail: true,
        zoom: true,
        actualSize: true,
        animateThumb: true,
        zoomFromOrigin: true,
    });
}


$(function(){
    getNews();
    showGallery()

    $('#slider-1').slick({
        slidesToShow: 1,
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        dots: true,
        lazyLoad: 'ondemand',
        
        responsive:[
            {
                breakpoint: 1000,
                settings: {
                    dots:false,
                    autoplay: true,
                    autoplaySpeed: 2000,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    swipe: false,
                    dots:false,
                    autoplay: true,
                }
            }
        ]
    });
    

    $('#slider-2').slick({
        slidesToShow: 3,
        dots: true,
        lazyLoad: 'ondemand',
        arrows: true,
        responsive:[              
                {
                breakpoint: 965,
                settings: {
                    slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                        }
                },
                {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,                       
                    }
                }
        ]
    });

    // hamburger

    $(".hamburger, #page-overlay").on("click", function () {
        $("#mobile-menu-wrap .hamburger").toggleClass("is-active");
        $("body").toggleClass("open");
    });
   
    $(".sidemenu__nav li a").on('click', function(){
        $('body').removeClass('open');
        $("#mobile-menu-wrap .hamburger").removeClass("is-active");
    })
    // scroll

    $(window).on('scroll', function(){
            if($(window).scrollTop()>0){
            if(!$("body").addClass("fixed_nav")){
            $("body").addClass("fixed_nav");
            }
        }
        else {
            if($("body").addClass("fixed_nav")){
            $("body").removeClass("fixed_nav");
        }
    }
    });

    $("#main_menu a").on('click', function(e){
        e.preventDefault();
        const top = $($(this).attr("href")).offset().top-60;
        $("html, body").animate({scrollTop:top+'px'},1000);
    })

    $(".header__button").on('click', function(){
      $('html,body').animate({
          scrollTop: $('.map').offset().top
      },2000);       
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
                shadowSize: [106, 106],
        });

        L.marker([40.851137941150604, -73.84834194992693], { icon: myIcon }).addTo(map)
            .bindPopup(`
        <div class="map__popup">
            <img src="assets/images/orang.jpg">
            <div class="map__info"><b>Welcome!</b></div>
            </div>
        `);
    });

    
    $(".nav__link").on('click', function(e){
        e.preventDefault();
        const top = $($(this).attr("href")).offset().top-58;
        $("html, body").animate({scrollTop:top+'px'},1000);
    });

    $("#contact_form").on('submit', function(e){
       
        e.preventDefault();

       let name = $("#form-name").val().trim();
       let email = $("#form-email").val();
       $("#form-name").removeClass("error");
       $("#form-email").removeClass("error");

       if (name.length<=1){
        $("#form-name").addClass("error");   
        alert.danger('Please, enter your name!', true);    
       }else if (email.length<=1) {
        $("#form-email").addClass("error");
        alert.danger('Please, enter your email!',true); 
       }
       else {
        sendData();
        $("#form-name").removeClass("error");
        $("#form-email").removeClass("error");
       }        
    });
});

function sendData(){
    const BOT_TOKEN = '5061961723:AAFyTzsk1BHKDdQfM55rCg4LIN4DH0cVSW0';
    const CHAT_ID = '-1001620060802';
    
    let text = encodeURI("<b>Name: </b>"+$("#form-name").val()+"\r\n<b>Email: </b>" +$("#form-email").val());

    $.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}&parse_mode=html`, (json)=>{
        console.log(json);
        if (json.ok) {
        $("#contact_form").trigger('reset');
        alert.success('Message sent!', true);
        } else {
            alert.danger(json.description, true);
        }
        });
}










