$(function() {
    $(window).load(function () {
        setTimeout(function () {
            $('.preloader').fadeOut('slow', function () {});
        }, 1500);
    });
    $("#team-scroll").click(function () {
        scrollTo();
    });

    function scrollTo() {
        $('html, body').animate({scrollTop: $('.our-team').offset().top}, 'slow');
        return false;
    }

    $('#staff').click(function () {
        $('.niceStaff').css('display', 'block');
        $('.niceStaff').animate({'bottom':'0'}, 500);
        setTimeout(function () {
            $('.niceStaff').animate({'bottom':'-200px'}, 500);
        }, 1600);
        setTimeout(function () {
            $('.niceStaff').css('display', 'none');
        }, 2200);
    });
});