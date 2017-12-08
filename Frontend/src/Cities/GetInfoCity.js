var Templates = require('../Teamplates');
var Cities;
var API = require('../API');
var Storage = require('../LocalStorage');
var $city = $('#info');

function showInfo() {
    $city.html("");
    var id = Storage.get('id');
    var city;
    API.getCitiesList(function (err, data) {
        if (!err) {
            Cities = data;
            for (var i = 0; i < Cities.length; i++) {
                if (id == Cities[i].id) {
                    city = Cities[i];
                    Storage.set('city', city.city);
                    break;
                }
            }
            var html_code = Templates.InfoCity({city: city});
            var $node = $(html_code);
            $city.append($node);
        }
    });
}

exports.showInfo = showInfo;