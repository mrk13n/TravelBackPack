var Templates = require('../Teamplates');
var Cities;
var API = require('../API');
var $cities = $("#cities");

function showCities(list) {
    $cities.html("");

    function showOneCity(city) {
        var html_code = Templates.City_OneItem({city: city});

        var $node = $(html_code);

        $cities.append($node);
    }

    list.forEach(showOneCity);
}

function initialiseCities() {
    API.getCitiesList(function (err, data) {
       if (!err) {
           Cities = data;
           showCities(Cities);
       }
    });
}

exports.initialiseCities = initialiseCities;