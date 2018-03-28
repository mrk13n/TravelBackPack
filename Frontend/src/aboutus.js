$(function() {
    $(window).load(function () {
        setTimeout(function () {
            $('.preloader').fadeOut('slow', function () {});
            $('body').css('overflow-y', 'visible');
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
        $('body').css('overflow-y', 'hidden');
        $('.niceStaff').css('display', 'block');
        $('.niceStaff').animate({'bottom':'0'}, 500);
        setTimeout(function () {
            $('.niceStaff').animate({'bottom':'-200px'}, 500);
        }, 1600);
        setTimeout(function () {
            $('.niceStaff').css('display', 'none');
            $('body').css('overflow-y', 'visible');
        }, 2200);
    });
});