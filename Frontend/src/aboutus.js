$(document).ready(function() {
    $("#city-scroll").click(function () {
        scrollTo();
    });

    function scrollTo() {
        $('html, body').animate({scrollTop: $('.our-team').offset().top}, 'slow');
        return false;
    };

    $('#staff').click(function () {
        $('.niceStaff').css('display', 'block');
        $('.niceStaff').animate({'bottom':'0'}, 500);
        setTimeout(function () {
            $('.niceStaff').animate({'bottom':'-150px'}, 500);
        }, 1600);
        setTimeout(function () {
            $('.niceStaff').css('display', 'none');
        }, 2100);
    });
});