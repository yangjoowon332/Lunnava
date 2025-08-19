$(document).ready(function () {

    $('header').load('include/header.html', function(){

         $('.hamburger').click(function(){
            $(this).toggleClass('on');
            $('.mo_nav').fadeToggle().toggleClass('on');
            
            bodyNoScroll()
        });

        function bodyNoScroll(){
            if($('.hamburger').hasClass('on') == true){
                $('body').css({height:'100vh', overflow:'hidden'})
                } else {
                    $('body').css({height:'', overflow:''})
                };
                
        }

        
        let pcNav = $('.pc_nav').html();
        $('.mo_nav').html(pcNav);

        $('.pc_nav li').mouseenter(function(){
            $(this).find('.lnb').fadeIn(100);
        })
        $('.pc_nav li').mouseleave(function(){
            $(this).find('.lnb').fadeOut(100);
        
        })
        $('.pc_nav').mouseenter(function(){
            $('.pc_nav_bg').stop().fadeIn(100)
        })
        $('.pc_nav').mouseleave(function(){
            $('.pc_nav_bg').stop().fadeOut(100)
        });

         
        
        $('.mo_nav .gnb > li > a').click(function(){
            $('.mo_nav .gnb .lnb').slideUp();
            $(this).siblings('.lnb').stop().slideToggle();
            
            return false
        });


       
       
        $(window).resize(function(){
            let winW = $(window).width();
            if(winW < 880){
                $('#section3 .name').each(function(){ 
                    $(this).appendTo($(this).siblings('.cont')) 
                })
            } else {
                $('#section3 .name').each(function(){
                    $(this).appendTo($(this).parents('a'))
                });

                $('.mo_nav').removeClass('on').hide();
                $('.hamberger').removeClass('on');
                bodyNoScroll()
            }

             

        });


    });


    $('.smallimg li').mouseenter(function () {
        liNum = $(this).index();

        sImgActive()//매개변수

        clearInterval(rolling)

    });

    $('.smallimg li').mouseleave(function () {
        rolling = setInterval(rollingImg, 2000)
    });

    let rolling = setInterval(rollingImg, 2000);

    let liNum = 0;
    let sLength = $('.smallimg li').length;

    function rollingImg() {
        liNum++;
        if (liNum >= sLength) {
            liNum = 0;
        };

        sImgActive()

    }

    function sImgActive() {//아무거나쓰기,
        let sImg = $('.smallimg li').eq(liNum).find('img').attr('src');
        let sText = $('.smallimg li').eq(liNum).find('.title').text();

        $('.bigimg img').attr('src', sImg);
        $('.bigimg .title').text(sText);

        $('.smallimg li').eq(liNum).addClass('on').siblings().removeClass('on');
    }


    let sImg0 = $('.smallimg li').eq(0).find('.img').attr('src');
    let sText0 = $('.smallimg li').eq(0).find('.title').text();

    $('.bigimg img').attr('src', sImg0);
    $('.bigimg .title').text(sText0)

    $('#section3 .content .cont .text').each(function () {
        let dot = 40;
        let text = $(this).text().trim();


        if (text.length > dot) {
            let realText = text.substring(0, dot)
            $(this).text(realText + '...');
        }


    });



    $(window).scroll(function () {
        let scrT = $(window).scrollTop();
        let winH = $(window).height();

        if ($('#hero').length >= 1){
        let sec1Top = $('#section1').offset().top;
        let sec2Top = $('#section2').offset().top;
        let sec3Top = $('#section3').offset().top;
        
        
            if (scrT > 0) {
                $('#hero').addClass('on');
            } else {
                $('#hero').removeClass('on');

            }

            if (scrT > sec1Top - winH/2) {
                $('#section1 .imgbox').addClass('on');
            } else {
                $('#section1 .imgbox').removeClass('on');
            }

            if(scrT > sec2Top - winH/2){
                $('#section2 .contentbox').addClass('on');
            } else {
                $('#section2 .contentbox').removeClass('on');            
            } 

            if(scrT > sec3Top - winH/2){
                $('#section3 .content').addClass('on');
            } else {
                $('#section3 .content').removeClass('on');
            }

        }

    });



// ▼ 추가: 탭 비활성/활성 대응
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            // 비활성화: 롤링 정지
            if (rolling) {
                clearInterval(rolling);
                rolling = null;
            }
        } else {
            // 활성화: 중복 방지 후 재시작
            if (!rolling) {
                rolling = setInterval(rollingImg, 2000);
            }
        }
    });

    // ▼ 선택 추가: 창 포커스 기준으로도 안전하게 (원치 않으면 생략)
    window.addEventListener('blur', function () {
        if (rolling) {
            clearInterval(rolling);
            rolling = null;
        }
    });

    window.addEventListener('focus', function () {
        if (!rolling) {
            rolling = setInterval(rollingImg, 2000);
        }
    });

    $('.star').click(function(e){
        e.stopPropagation(); // a로 이벤트 전달 방지
        e.preventDefault(); 
    })
    $('.star span').click(function(e){
        e.stopPropagation(); // a로 이벤트 전달 방지
        e.preventDefault();  // # 이동 방지

        let idx = $(this).index();

        $(this).parent().find('span').removeClass('on');

        $(this).parent().find('span').each(function(i){
            if(i <= idx){
                $(this).addClass('on');
            }
        });
    });

    $('.fa-eye-slash').click(function(){
        $(this).siblings('input[type="password"]').attr('type', 'text');
        
        $('.fa-eye').show();
        $(this).hide();
    });
    $('.fa-eye').click(function(){
        $(this).siblings('input[type="text"]').attr('type', 'password');
        
        $('.fa-eye-slash').show();
        $(this).hide();

    });

});


