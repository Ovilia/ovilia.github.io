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

function loadEntry(fileName) {
    $.ajax({
        url: fileName,  
        success: function(data) { 
            var htmlCode = $(data).html();
            $('#content').append(data);
        }
    });
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
    
    // load first few entries
    var firstCnt = 5; // default count of entries to be loaded if not set in json file
    var moreCnt = 3; // count of entries to be loaded more if not set in json file
    var loadedCnt = 0;
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
                    var fileName = entry.url;
                    loadEntry(fileName);
                    ++loadedCnt;
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
