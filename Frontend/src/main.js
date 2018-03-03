var GetCities = require('./Cities/GetCities');
var getComments = require('./Cities/GetSearch');
var text;

$(function () {
    $(window).load(function () {
        setTimeout(function () {
            $('.preloader').fadeOut('slow', function () {});
            $('body').css('overflow-y', 'visible');
        }, 1500);
    });
    GetCities.initialiseCities();

    $("#city-scroll").click(function(){
        scrollTo();
    });

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

    $('#searchBox').keyup(function (e) {
        text = $('input.form-control').val();
        if (e.keyCode === 13) {
            getComments.getComments(text);
        }
    });

    $('.search-button').click(function () {
        text = $('input.form-control').val();
        getComments.getComments(text);
    });
});

function scrollTo() {
    $('html, body').animate({ scrollTop: $('.greetings').offset().top }, 'slow');
    return false;
}