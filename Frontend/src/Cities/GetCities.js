var Templates = require('../Teamplates');
var Cities;
var API = require('../API');
var $cities = $("#cities");
var Storage = require('../LocalStorage');

function showCities(list) {
    $cities.html("");

    function showOneCity(city) {
        var html_code = Templates.City_OneItem({city: city});

        var $node = $(html_code);

        $node.find('.city-card').click(function () {
            var id = this.id;
            Storage.set('id', id);11111111111
            document.location.href = '/city.html'
        });

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