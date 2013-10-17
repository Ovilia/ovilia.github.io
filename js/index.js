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



var gb = {
    STATE: {
        HOME: 0,
        LANGUAGE: 1,
        CONTENT: 2
    },
    state: 0,
    
    LANGUAGE: {
        ENGLISH: 0,
        CHINESE: 1
    },
    language: 0
};


$(document).ready(function() {
    // window scroll
    $(window).mousemove(function(e) {
        if (gb.state != gb.STATE.CONTENT) {
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
    
    $('#titleLeft,#titleRight').click(function() {
        ++gb.state;
        $('#titleWords').fadeOut(500, function() {
            if ($(this) == $('#titleLeft')) {
                // Chinese
                gb.language = gb.LANGUAGE;
            }
            $('#titleDiv').fadeOut(500, function() {
                $('#contentDiv,#footerDiv').fadeIn(1000);
                $('body').css('overflow', 'auto');
            });
        });
    });
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
            gb.state = gb.STATE.LANGUAGE;
            $('#titleTao').rotate(0);
            $('#titleLeft, #titleRight').css({
                'opacity': 1
            });
            clearInterval(id);
        }
    }, 50);    
}
