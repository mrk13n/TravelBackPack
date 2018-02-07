var Cities;
var API = require('../API');
var Storage = require('../LocalStorage');
var trash = require('./AdditionalArrays').trash;
var wrong_symbols = require('./AdditionalArrays').wrong_symbols;
//нашо нам цей масив? var cities = ['paris','barcelona','budapest','amsterdam','london','berlin'];

function getId(text) {
    var city_name;
    var city_search;
    var find = false;
    var id;
    var search_words = [];
    var n = 0;
    search_words = keyWordsArray(text);
    API.getCitiesList(function (err, data) {
        if (!err) {
            Cities = data;
            if (search_words.length === 1) {
                for (var i = 0; i < Cities.length; i++) {
                    city_name = Cities[i].city.toLowerCase();
                    if (search_words[0] === city_name) {
                        id = Cities[i].id;
                        Storage.set('id', id);
                        document.location.href = '/city.html';
                        find = true;
                    }
                }
                if (!find) {
                    var a = search_words[0].length;
                    var name;
                    for (var j = 0; j < Cities.length; j++) {
                        name ='';
                        city_name = Cities[j].city.toLowerCase();
                        for (var k = 0; k < a; k++) {
                            name += city_name[k];
                        }
                        if (search_words[0] === name) {
                            id = Cities[j].id;
                            Storage.set('id', id);
                            document.location.href = '/city.html';
                            find = true;
                        }
                    }
                }
                if (!find) {
                    $('.search-box').addClass('has-error');
                    return(search_words[0]);
                }
            }

            for(var i = 0;i < search_words.length;i++) {
                for (var j = 0; j < Cities.length; j++) {
                    if (search_words[i] === Cities[j].city.toLowerCase()) {
                        city_name = Cities[j];
                        search_words.splice(i,1);
                        break;
                    }
                }
            }
            city_search = {city: city_name.city};
            API.getComments(city_search, function (err, data) {
                if (!err) {
                    var gt = true;
                    var word_gt = false;
                    for (i = 0; i < data.length; i++) {
                        var comment_words = keyWordsArray(data[i].comment);
                        for (var j = 0; j < search_words.length; j++){
                            for (var k = 0; k < comment_words.length; k++){
                                if (search_words[j] === comment_words[k]){
                                    word_gt = true;
                                    break;
                                }
                            }
                            if (!word_gt){
                                gt = false;
                                break;
                            }
                            word_gt = false;
                        }
                        if(gt){
                            console.log(data[i].comment)
                        }
                        gt = true;
                        word_gt = false;
                    }
                }
            });
        }
    });
}

function keyWordsArray(text) {
    var word = '';
    var words = [];
    text = text.toLowerCase();
    for (var i = 0; i < text.length; i++) {
        for (var j = 0; j < wrong_symbols.length; j++) {
            if (text[i] === wrong_symbols[j]) {
                text = text.replace(text[i], '');
                i--;
                break;
            }
        }
    }
    for (var i = 0; i < text.length; i++) {
        if (text[i] !== ' ') {
            word += text[i];
        } else {
            words.push(word);
            word = '';
        }
    }
    words.push(word);
    for (var i = 0; i < words.length; i++) {
        for (var j = 0; j < trash.length; j++) {
            if (words[i] === trash[j]) {
                words.splice(i, 1);
                break;
            }
        }
    }
    return words;
}

exports.getId = getId;