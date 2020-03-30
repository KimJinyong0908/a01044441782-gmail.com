function TabBox__init() {
    $('.tab-box').each(function (index, node) {
        var $tabBox = $(node);

        if ($tabBox.find(' > .head > ul > li.active').length == 0) {
            $tabBox.find(' > .head > ul > li:first-child').addClass('active');
        }

        var activedIndex = $tabBox.find(' > .head > ul > li.active').index();

        $tabBox.find(' > .body > ul > li.active').removeClass('active');
        $tabBox.find(' > .body > ul > li').eq(activedIndex).addClass('active');
    });

    $('.tab-box > .head > ul > li').click(function () {
        var $clicked = $(this);
        var $tabBox = $clicked.closest('.tab-box');

        $clicked.siblings('.active').removeClass('active');
        $clicked.addClass('active');

        var activedIndex = $clicked.index();

        $tabBox.find(' > .body > ul > li.active').removeClass('active');
        $tabBox.find(' > .body > ul > li').eq(activedIndex).addClass('active');
    })
}

TabBox__init();



/* 팝업 설정 */
lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    disableScrolling: false,
    fitImagesInViewport:false
})