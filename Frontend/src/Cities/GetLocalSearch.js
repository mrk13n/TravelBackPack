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
            var search_words = [];
            var search_rate;
            var i, j;
            Cities = data;
            if (text.length !== 0) {
                search_words = keyWordsArray(text, Cities);
            } else {
                search_words = [];
            }
            console.log(search_words);
            if (search_words[0] === '') search_words = [];
            if (search_words.length === 0) {
                $('.search-box').addClass('has-error');
            }
            for (i = 0; i < Cities.length; i++) {
                if (id == Cities[i].id) {
                    city = Cities[i];
                    break;
                }
            }
            city_search = {city: city.city};
            API.getComments(city_search, function (err, data) {
                if (!err) {
                    if (!data.emptyForm) {
                        search_rate = 0;
                        for (i = 0; i < data.length; i++) {
                            var comment_words = keyWordsArray(data[i].comment, Cities);
                            for (j = 0; j < search_words.length; j++){
                                for (var k = 0; k < comment_words.length; k++){
                                    if (search_words[j] === comment_words[k]){
                                        search_rate += 1;
                                        break;
                                    }
                                }
                            }
                            if (Math.abs(search_rate-search_words.length) < 2 && search_rate > 0){
                                search_rate = 0;
                                console.log(data[i].comment)
                            }
                        }
                    }
                }
            })
        }
    });
}

function keyWordsArray(text, cities) {
    var word = '';
    var words = [];
    var help_arr;
    var find = false;
    text = text.toLowerCase();
    var i, j;
    for (i = 0; i < text.length; i++) {
        for (j = 0; j < wrong_symbols.length; j++) {
            if (text[i] === wrong_symbols[j]) {
                text = text.replace(text[i], '');
                i--;
                break;
            }
        }
    }
    for (i = 0; i < text.length; i++) {
        if (text[i] !== ' ') {
            word += text[i];
        } else {
            if (word !== '') words.push(word);
            word = '';
        }
    }
    if (word !== '') words.push(word);
    for (i = 0; i < words.length; i++) {
        for (j = 0; j < trash.length; j++) {
            if (words[i] === trash[j]) {
                words.splice(i, 1);
                i--;
                break;
            }
        }
    }
    for (i = 0; i < words.length; i++) {
        for (j = 0; j < cities.length; j++) {
            if (words[i] === cities[j].city.toLowerCase()) {
                find = true;
                break;
            }
        }
        if (!find) words[i] = stemmer(words[i]);
        find = false;
    }
    find = false;
    help_arr = words;
    words = [];
    for (i = 0; i < help_arr.length; i++) {
        for (j = 0; j < words.length; j++) {
            if (help_arr[i] === words[j]) {
                find = true;
                break;
            }
        }
        if (!find) words.push(help_arr[i]);
        find = false;
    }
    return words;
}

exports.getLocalComments = getLocalComments;