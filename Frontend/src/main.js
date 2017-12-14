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

});

