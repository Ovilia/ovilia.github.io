var isMSIE = /*@cc_on!@*/0;
if (isMSIE) {
    location.href = 'no_ie.html';
}

$(document).ready(function() {
    // font related
    $('#areMy').fitText(0.92).shuffleLetters({
        fps: 20,
        steps: 16
    });
    $('#inTao').fitText(0.5).hide().fadeIn(2000);
    
    // window scroll
    $(window).scroll(function() {
        if (window.innerWidth > 600) {
            var winTop = $(this).scrollTop();
            if (winTop >= $('#generalPage').offset().top) {
                $('#navContent').slideDown();
                
                if (winTop >= $('#taoPage').offset().top - 200 &&
                    winTop < $('#taoPage').offset().top + $('#taoPage').height()) {
                    $('.navCnt').removeClass('navFocus');
                    $('#taoNav').addClass('navFocus');
                } else if (winTop >= $('#codePage').offset().top - 200 &&
                    winTop < $('#codePage').offset().top + $('#codePage').height()) {
                    $('.navCnt').removeClass('navFocus');
                    $('#codeNav').addClass('navFocus');
                } else if (winTop >= $('#sketchPage').offset().top - 200) {
                    $('.navCnt').removeClass('navFocus');
                    $('#sketchNav').addClass('navFocus');
                } else if (winTop < $('#taoPage').offset().top - 200) {
                    $('.navCnt').removeClass('navFocus');
                }
            } else {
                $('#navContent').slideUp();
            }
        }
    });
    
    $('.navCnt').click(function() {
        var id = '#' + $(this).attr('id').slice(0, -3) + 'Page';
        $('body').animate({
            scrollTop: $(id).offset().top - 150
        });
    });
    
    // randocy image
    $('#randocyImg').hover(function() {
        $('#randocyImg').hide().attr('src', 'image/randocy_color.png').show();
    }, function() {
        $('#randocyImg').hide().attr('src', 'image/randocy_gray.png').show();
    });
});
