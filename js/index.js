/*var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38205696-1']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();*/

var isMSIE = /*@cc_on!@*/0;
if (isMSIE) {
    location.href = 'no_ie.html';
}

var STATE = {
    HOME: 0,
    LANGUAGE: 1,
    TOPIC: 2,
    CONTENT: 3
};
state = STATE.HOME;

$(document).ready(function() {
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
    }).mousemove(function(e) {
        if (state != STATE.CONTENT) {
            // shadow moves with mouse
            var x = (0.5 - e.clientX / $(window).width()) * 2;
            var y = (0.5 - e.clientY / $(window).height()) * 2;
            var r = Math.sqrt((x * x + y * y) / 2);
            var op = 1 - Math.sqrt(r);
            $('#titleCircle').css({
                'box-shadow': 300 * x + 'px ' + 300 * y + 'px '
                    + 300 * r + 'px #333',
                'opacity': op
            });
            $('#titleLeft, #titleRight').css({
                'opacity': op
            });
        }
    });
    
    // randocy image
    $('#randocyImg').hover(function() {
        $('#randocyImg').hide().attr('src', 'image/randocy_color.png').show();
    }, function() {
        $('#randocyImg').hide().attr('src', 'image/randocy_gray.png').show();
    });
    // jWebAudio image
    $('#jWebAudioImg').hover(function() {
        $('#jWebAudioImg').hide().attr('src', 'image/jWebAudio_color.png').show();
    }, function() {
        $('#jWebAudioImg').hide().attr('src', 'image/jWebAudio_gray.png').show();
    });
    
    taoRotate();
});

function taoRotate() {
    var time = 0;
    var id = setInterval(function() {
        if (time <= 60) {
            $('#titleDiv').css('margin-top', $(window).height() / 2 - 300
                               + (time - 60))
                .css('opacity', time / 60);
            $('#titleTao').rotate(360 * Math.cos(Math.PI / 60 * time) + 'deg');
            time += 1;
        } else {
            $('#titleTao').rotate(0);
            clearInterval(id);
        }
    }, 50);    
}
