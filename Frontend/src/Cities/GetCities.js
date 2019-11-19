const API = require('../API');
const Templates = require('../Teamplates');
const Storage = require('../LocalStorage');
const $cities = $("#cities");

function showCities(list) {
    $cities.html("");

    function showOneCity(city) {
        const html_code = Templates.City_OneItem({city: city});

        const $node = $(html_code);

        $node.find('.city-card').click(function () {
            const id = this.id;
            Storage.set('id', id);
            document.location.href = '/city';
        });

        $cities.append($node);
    }

    list.forEach(showOneCity);
}

async function initialiseCities() {
    await API.getCitiesList(function (err, data) {
        if (err) throw new Error(err);
        showCities(data);
    });
}

exports.initialiseCities = initialiseCities;