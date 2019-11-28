const Templates = require('../Teamplates');
const $city = $('#info');
const $addinfo = $("#additional_info");
var getLocalComments = require('./GetLocalSearch');
var text;

function showInfo(city) {
    $city.html("");
    $addinfo.html("");

    const html_code = Templates.InfoCity({ city: city });
    const html_code2 = Templates.additionalInfo({ city:city });
    const $node = $(html_code);
    const $node2 = $(html_code2);

    // $node.find('#searchBox').keyup(function (e) {
    //     text = $('input.form-control').val();
    //     if (e.keyCode === 13) {
    //         getLocalComments.getLocalComments(text);
    //     }
    // });

    // $node.find('.search-button').click(function () {
    //     text = $('input.form-control').val();
    //     getLocalComments.getLocalComments(text);
    // });

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

async function initialiseCityInfo(city) {
    showInfo(city);
}

module.exports = initialiseCityInfo;