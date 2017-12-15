$(function () {
    var GetCities = require('./Cities/GetCities');
    GetCities.initialiseCities();

    $("#city-scroll").click(function(){
        scrollTo();
    });

    function scrollTo() {
        $('html, body').animate({ scrollTop: $('.greetings').offset().top }, 'slow');
        return false;
    }
    $(function() {
        $('a[href*=#]').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
        });
    });

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

