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

// get parameter in url, code from 
// http://stackoverflow.com/questions/1403888/get-url-parameter-with-jquery#answer-1404100
function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

// entries[index] is one element in the manifest.json, 
// which contains url, title, series and etc.
function loadEntry(entries, index) {
    var entry = entries[index];
    $.ajax({
        url: entry.url,
        success: function(data) {
            var headCode = $('<div class="rotLeft rotTop pageBack"></div>'
                    + '<div class="rotRight rotTop pageBack"></div>');
            var footCode = $('<div class="rotLeft rotBottom pageBack"></div>'
                    + '<div class="rotRight rotBottom pageBack"></div>');
            
            var content = $('<div class="pageCnt"></div>');
            // title
            if (entry.title) {
                content.append('<div class="pageTitle">' + entry.title + '</div>');
                document.title = entry.title + ' - Blog of Wenli Zhang';
            }
            // time
            if (entry.time) {
                content.append('<div class="blogTime">' + entry.time + '</div>');
            }
            // series
            if (entry.series) {
                var series = $('<div></div>');
                // series entries
                var seriesCnt = 0;
                for (var i = 0; i < entries.length; ++i) {
                    if (i != index && entries[i] !== undefined 
                            && entry.series === entries[i].series) {
                        series.append('<a class="moreHref" href="entry.html?id=' + i
                                + '">' + entries[i].title + '</a>');
                        ++seriesCnt;
                    }
                }
                if (seriesCnt > 0) {
                    content.append('<div class="more">Series: ' + entry.series + '</div>');
                    content.append(series);
                }
            }
            // entry content
            content.append(data);
            
            var bodyCode = $('<div class="page"></div>').append(content);
            $('#content').append(headCode).append(bodyCode).append(footCode);
            
            SyntaxHighlighter.all();
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
    
    $.ajax({
        url: '../blog/entries/manifest.json',
        dataType: 'json',
        success: function(data) {
            // load entry with id defined in url
            var id = getURLParameter('id');
            if (data.entries[id]) {
                loadEntry(data.entries, id);
            } else {
                alert('Illegal id!');
                location.href = 'index.html';
            }
        },
        error: function(a, b, error) {
            console.log(error);
        }
    });
});
