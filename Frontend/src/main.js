$(function () {
    var GetCities = require('./Cities/GetCities');
    GetCities.initialiseCities();

    $(".city-scroll").click(function() {
        $('html,body').animate({
                scrollTop: $(".heading").offset().top},
            'slow');
    });

});