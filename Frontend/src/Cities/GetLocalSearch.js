var Cities;
var API = require('../API');
var Storage = require('../LocalStorage');
var trash = require('./AdditionalArrays').trash;
var wrong_symbols = require('./AdditionalArrays').wrong_symbols;
var stemmer = require('stemmer');

function getLocalComments(text) {
    API.getCitiesList(function (err, data) {
        if (!err) {
            var id = Storage.get('id');
            var city;
            var city_search;
            Cities = data;
            for (var i = 0; i < Cities.length; i++) {
                if (id == Cities[i].id) {
                    city = Cities[i];
                    break;
                }
            }
            city_search = {city: city.city};
            API.getComments(city_search, function (err, data) {
                if (!err) {
                    if (!data.emptyForm) {

                    }
                }
            })
        }
    });
}

exports.getLocalComments = getLocalComments;