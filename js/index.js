var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38205696-1']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();



var gb = {
    showContent: false,
    loadedTime: new Date()
};

$(document).ready(function() {
    if (location.hash.slice(1) !== '' ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent)) {
        gb.showContent = true;
        $('#titleWords, #titleDiv').hide();
        $('#ovilia-home,#ovilia-footer').show();
        $('body').css('overflow', 'auto');
    }
    
    // window scroll
    $(window).mousemove(function(e) {
        // shadow moves with mouse
        var x = (0.5 - e.clientX / $(window).width()) * 2;
        var y = (0.5 - e.clientY / $(window).height()) * 2;
        
        if (!gb.showContent) {
            var r = Math.sqrt((x * x + y * y) / 2);
            var op = 1 - Math.sqrt(r);
            $('#titleCircle').css({
                'box-shadow': 300 * x + 'px ' + 300 * y + 'px '
                    + 300 * r + 'px #333',
                'opacity': op
            });
            $('#titleWords').css({
                'opacity': op
            });
        } else {
            $('.pageBack,.page').css({
                'box-shadow': x * 10 + 'px ' + y * 10 + 'px 10px 5px #666'
            })
        }
    });
    
    taoRotate();
    
    $('#titleCircle').click(function() {
        gb.showContent = true;
        $('#titleWords, #titleDiv').fadeOut(500, function() {
            $('#ovilia-home,#ovilia-footer').fadeIn(1000);
            $('body').css('overflow', 'auto');
        });
    });
});

function taoRotate() {
    var time = 0;
    var id = setInterval(function() {
        if (time <= 60) {
            $('#titleDiv').css('margin-top', $(window).height() / 2 - 200
                               + (time - 60))
                .css('opacity', time / 60);
            $('#titleTao').rotate(360 * Math.cos(Math.PI / 60 * time) + 'deg');
            time += 1;
        } else {
            $('#titleTao').rotate(0);
            $('#titleWords').css({
                'opacity': 1
            });
            if (id) clearInterval(id);
        }
    }, 50);    
}

WebFontConfig = {
    google: { families: [ 'Lato:400,900:latin' ] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
