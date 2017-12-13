var Templates = require('../Teamplates');
var Cities;
var API = require('../API');
var Storage = require('../LocalStorage');
var $city = $('#info');
var $addinfo = $("#additional_info");

function showInfo() {
    $city.html("");
    $addinfo.html("");
    var id = Storage.get('id');
    var city;
    API.getCitiesList(function (err, data) {
        if (!err) {
            Cities = data;
            for (var i = 0; i < Cities.length; i++) {
                if (id == Cities[i].id) {
                    city = Cities[i];
                    break;
                }
            }
            var html_code = Templates.InfoCity({city: city});
            var html_code2 = Templates.additionalInfo({city:city});
            var $node = $(html_code);
            var $node2 = $(html_code2);
            $city.append($node);
            $addinfo.append($node2);
        }
    });
}

exports.showInfo = showInfo;