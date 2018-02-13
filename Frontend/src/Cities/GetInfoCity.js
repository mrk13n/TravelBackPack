var Templates = require('../Teamplates');
var API = require('../API');
var Storage = require('../LocalStorage');
var getLocalComments = require('./GetLocalSearch');
var $city = $('#info');
var $addinfo = $("#additional_info");
var Cities;
var text;

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
            $node.find('#searchBox').keyup(function (e) {
                text = $('input.form-control').val();
                if (e.keyCode === 13) {
                    getLocalComments.getLocalComments(text);
                }
            });
            $node.find('.search-button').click(function () {
                text = $('input.form-control').val();
                getLocalComments.getLocalComments(text);
            });
            // $node.find('#search-box').focus(function () {
            //     $('#searchBox').keyup(function (e) {
            //         if (e.keyCode === 13) {
            //             getLocalComments.getLocalComments(text);
            //         }
            //     });
            //     $('input.form-control').keyup(function (e) {
            //         if (e.keyCode === 13) {
            //             getLocalComments.getLocalComments(text);
            //         }
            //     });
            // });
            $city.append($node);
            $addinfo.append($node2);
        }
    });
}

exports.showInfo = showInfo;