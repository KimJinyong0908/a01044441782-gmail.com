console.clear();


/* 우측에 따라다니는 메뉴 */
$(window).scroll(function() {
    var scrollTop = $(this).scrollTop();
    
    if ( scrollTop < 100 ) {
        scrollTop = 100;
    }
    else if ( scrollTop > 3400 ) {
        scrollTop = 3400;
    }
    
    var duration = 1000;
    $('.fly').stop().animate({top:scrollTop}, duration);
    
    console.log(scrollTop);
});


/* 스크롤시 헤더 변화 */
function NotScrollTop0__init() {
    var scrollTop = $(window).scrollTop();
    
    if ( scrollTop > 0 ) {
        $('html').addClass('not-scroll-top-0');
    }
    else {
        $('html').removeClass('not-scroll-top-0');
    }
}

$(window).scroll(NotScrollTop0__init);
NotScrollTop0__init();


/* 부드럽게 탑으로 이동 */
$(document).ready(function() {
    $(".top-ico").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});



AOS.init();

/* 토글 사이드 바 버튼 관련 */
$('.toggle-side-bar-btn').click(function(){
    //console.log("토글 사이드바 버튼클릭");
    var $clicked = $(this);
    
    /* 만약 클릭된 버튼에 active 클래스가 있다면 */
    if ( $clicked.hasClass('active') ){
        /* 사이드바를 없앤다 */
        hideRightSideBar();
    }
    else {
        /* active 클래스가 없으면 나타나게 한다 */
        showRightSideBar();
    }

    /* 아이콘에 active 클래스가 없으면 active 클래스를 넣어주고 있으면 빼줌 */
    $clicked.toggleClass('active');

});

/* 왼쪽 사이드바 함수 */
function showRightSideBar(){
    /* 메뉴바가 나올때 안에 펼쳐져 있는 메뉴들을 다 접기위해 엑티브를 없앤다 */
    $('.right-side-bar > .menu-1 li.active').removeClass('active');
    $('.right-side-bar-box').addClass('active');
};
function hideRightSideBar(){
    $('.right-side-bar-box').removeClass('active');
};


/* 좌측 사이드바 배경을 클릭했을때 */
$('.right-side-bar-box').click(function(){
    //console.log('배경클릭');

    /* 토글 사이드바 버튼을 클릭한 효과를 만듬 */
    $('.toggle-side-bar-btn').click();
});

/* 사이드바를 클릭할때 상위요소인 배경이 같이 클릭되어서 사이드바가 들어가버리기 때문에 그것을 막음 */
$('.right-side-bar').click(function(e){
    e.stopPropagation();
});

$('.right-side-bar > .menu-1 > ul > li').click(function() {
    var duration = 800;
    if ( $(this).hasClass('active') ) {
        $(this).removeClass('active')
        $(this).find(' > .sec-menu-box').slideUp(duration, "easeInOutSine");
    }
    else {
        // 기존에 활성화된 녀석들 정리
        $(this).siblings('.active').find(' > .sec-menu-box').slideUp(duration, "easeInOutSine");
        $(this).siblings('.active').removeClass('active');

        // 현재 활성화 시켜야 하는 녀석 활성화
        $(this).addClass('active');
        $(this).find(' > .sec-menu-box').slideDown(duration, "easeInOutSine");
    }
})