$(function () {
    var GetCities = require('./Cities/GetCities');
    GetCities.initialiseCities();

    $("#city-scroll").click(function(){
        scrollTo();
    })

    function scrollTo() {
        $('html, body').animate({ scrollTop: $('.greetings').offset().top }, 'slow');
        return false;
    }

});

