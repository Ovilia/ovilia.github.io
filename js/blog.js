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
    $('.more').click(function() {
        $(this).next('div').slideToggle();
    });
});
