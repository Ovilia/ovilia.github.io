var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38205696-1']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var isMSIE = /*@cc_on!@*/0;
if (isMSIE) {
    location.href = 'no_ie.html';
}

$(document).ready(function() {
    // nav transparent
    $(window).scroll(function() {
        if ($(this).scrollTop() > $('#contentDiv').offset().top) {
            $('#nav').addClass('transparent');
        } else {
            $('#nav').removeClass('transparent');
        }
    });
    
    // more click
    $('#content').delegate('.more', 'click', function() {
        $(this).next('div').slideToggle();
    });
    
    $.ajax({
        url: '../blog/entries/manifest.json',
        dataType: 'json',
        success: function(data) {
            if (typeof data.firstCnt === 'number') {
                firstCnt = data.firstCnt;
            }
            if (typeof data.moreCnt === 'number') {
                moreCnt = data.moreCnt;
            }
            // load entries
            for (var i = 0; i < firstCnt; ++i) {
                if (i < data.entries.length) {
                    var entry = data.entries[i];
                    var title = entry.title;
                    if (entry.series) {
                        title += ' <span class="titleSmall">[ ' 
                                + entry.series + ' ]</span>';
                    }
                    $('#pageCnt').append('<a href="entry.html?id=' + i
                            + '" class="blogLink"><p class="title">'
                            + title + '</p>');
                    if (entry.time) {
                        $('#pageCnt').append('<p class="allBlogTime">'
                                + entry.time + '</p>');
                    }
                } else {
                    break;
                }
            }
        },
        error: function(a, b, error) {
            console.log(error);
        }
    });
});
