$(document).ready(function(){
    var $navbar = $('.navbar-list .nav'), $sec = $('section'), $window = $(window);

    (function(window) {
        var theUA = window.navigator.userAgent.toLowerCase();
        if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
            var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
            if (ieVersion < 9) {
                $('.preloader').hide();
                var str = "你的浏览器版本太low了,已经和时代脱轨了 :(";
                var str2 = "推荐使用:<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:blue;'>谷歌</a>,"
                    + "<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E7%81%AB%E7%8B%90%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:blue;'>火狐</a>,"
                    + "其他双核极速模式";
                document.writeln("<pre style='text-align:center;color:#fff;background-color:#0cc; height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234'>" +
                    "<h2 style='padding-top:200px;margin:0'><strong>" + str + "<br/></strong></h2><h2>" +
                    str2 + "</h2><h2 style='margin:0'><strong>如果你的使用的是双核浏览器,请切换到极速模式访问<br/></strong></h2></pre>");
                document.execCommand("Stop");
            };
        }
    })(window);

    /* rem.js */
    ;(function (win,doc){
        function changeSize(){
            doc.documentElement.style.fontSize=100*doc.documentElement.clientWidth/375+'px';
        }
        changeSize();
        win.addEventListener('resize',changeSize,false);
    })(window,document);

    /* navbar滚动 */
    function scroll () {
        for(var i=0; i < $sec.length; i++){
            (function () {
                var offsetTop1 = Math.floor($sec.eq(i).offset().top);
                for(var j=0; j<$sec.length; j++){
                    $navbar.eq(i).removeClass('active');
                }
                if( i < $sec.length-1){
                    var offsetTop2 = Math.floor($sec.eq(i+1).offset().top);
                    if(offsetTop1　<= $window.scrollTop() + $('.navbar').height() && offsetTop2 > $window.scrollTop() + $('.navbar').height()){
                        $navbar.eq(i).addClass('active');
                    }
                }else if(i === $sec.length-1 && offsetTop1 <= $window.scrollTop()+ $('.navbar').height() ){
                    $navbar.eq(i).addClass('active');
                }
            })(i);
        }
    }
    $navbar.on('click',function () {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });
    $window.on('scroll resize',function(){
        scroll();
        if($window.width() <= 768){
            $('.swiper-button-next').hide();
            $('.swiper-button-prev').hide();
        } else {
            $('.swiper-button-next').show();
            $('.swiper-button-prev').show();
        }
    });

    /* 手机端导航 */
    function scrollRight () {
        $('.navbar-mobile').animate({left:-2.3+'rem'});
        $('.right-inner').animate({left:0});
        $('body').css('overflow','visible');
        $('html').css('overflow','visible');
        $('.mask').hide();
    }
    function scrollLeft () {
        $('.navbar-mobile').animate({left:0});
        $('.right-inner').animate({left:2.3+'rem'});
        $('body').css({'overflow':'hidden'});
        $('html').css({'overflow':'hidden'});
        $('.mask').show();
    }
    $('.close').click(function () {
        scrollRight();
    });
    $('.nav-mobile a').click(function () {
        scrollRight();
    });
    $('.nav-menu').click(function(){
        scrollLeft ();
    });
    $(document).swipeleft(function () {
        if($window.width() <= 768){
            scrollRight();
        }
    });
    $(document).swiperight(function () {
        if($window.width() <= 768){
            scrollLeft();
        }
    });

    (function(){
        window.scrollReveal = new scrollReveal();
    })();

    /* navbar背景色 */
    function navbar() {
        if($(window).scrollTop() > 0)  {
            $('.navbar').addClass('navbar-scroll');
        } else {
            $('.navbar').removeClass('navbar-scroll');
        }
    }
    navbar();

    /* 数字滚动 */
    var flag = false;
    $window.on('scroll',function () {
        navbar();
        var numTop = $('.number').offset().top, numHeight = $('.number').parent().height(), windowHeight = $window.height(), scrollTop = $window.scrollTop();
        if(numTop - scrollTop + numHeight/2 <= windowHeight && !flag){
            // custom formatting example
            $('.number').data('countToOptions', {
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                }
            });
            // start all the timers
            $('.number').each(count);
            flag = true;
        }

    });

    /* 加载动画 */
    document.onreadystatechange = function () {
        if(document.readyState=="complete") {
            $('.status').animate({'opacity':'0'},function(){
                $('.preloader').animate({'opacity':'0'},function(){
                    $('.status').hide().parent().hide();
                });
            });
        }
    }

    /* slide滚动 */
    var mySwiper = new Swiper('.swiper-container',{
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        loop: true,
        autoplay: 5000,
    });
});

