var Cities;
var API = require('../API');
var Storage = require('../LocalStorage');
var Templates = require('../Teamplates');
var trash = require('./AdditionalArrays').trash;
var wrong_symbols = require('./AdditionalArrays').wrong_symbols;
var stemmer = require('stemmer');
var $comments = $('#comments');

function getComments(text) {
    API.getCitiesList(function (err, data) {
        if (!err) {
            var city_name;
            var city_search;
            var find = false;
            var id;
            var search_words = [];
            var search_rate;
            var i, j, k;
            var length;
            var name;
            var comment_list = [];
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
            if (search_words.length === 1) {
                for (i = 0; i < Cities.length; i++) {
                    city_name = Cities[i].city.toLowerCase();
                    if (search_words[0] === city_name) {
                        id = Cities[i].id;
                        Storage.set('id', id);
                        document.location.href = '/city.html';
                        find = true;
                    }
                }
                if (!find) {
                    length = search_words[0].length;
                    for (i = 0; i < Cities.length; i++) {
                        name ='';
                        city_name = Cities[i].city.toLowerCase();
                        for (k = 0; k < length; k++) {
                            name += city_name[k];
                        }
                        if (search_words[0] === name) {
                            id = Cities[i].id;
                            Storage.set('id', id);
                            document.location.href = '/city.html';
                            find = true;
                        }
                    }
                }
                if (!find) {
                    $('.search-box').addClass('has-error');
                }
            }
            if (search_words.length > 1) {
                for(i = 0; i < search_words.length; i++) {
                    for (j = 0; j < Cities.length; j++) {
                        city_name = Cities[i].city.toLowerCase();
                        if (i !== search_words.length-1) var two_words = search_words[i] + " " + search_words[i+1];
                        if (i !== search_words.length-2) var three_words = search_words[i] + " " + search_words[i-1] + " " + search_words[i-2];
                        if (search_words[i] === Cities[j].city.toLowerCase()) {
                            city_name = Cities[j];
                            search_words.splice(i,1);
                            break;
                        }
                        if (two_words === Cities[j].city.toLowerCase()) {
                            city_name = Cities[j];
                            search_words.splice(i,2);
                            break;
                        }
                        if (three_words === Cities[j].city.toLowerCase()) {
                            city_name = Cities[j];
                            search_words.slice(i, 3);
                            break;
                        }

                    }
                }
                city_search = {city: city_name.city};
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
                                    comment_list.push(data[i]);
                                }
                            }
                            var additional_comments = [];
                            for (i = 0; i < comment_list.length; i++) {
                                var one;
                                var fav = false;
                                var Backpack = getBackpack();
                                if (Backpack !== null) {
                                    for (var j = 0; j < Backpack.length; j++) {
                                        if (comment_list[i]._id == Backpack[j].comment._id) {
                                            fav = true;
                                        }
                                    }
                                }
                                one = {
                                    city: city_name.city,
                                    favorite: fav,
                                    comment: comment_list[i]
                                };
                                additional_comments.push(one);
                            }
                            comment_list = additional_comments;
                            console.log(comment_list);
                            showResults(comment_list);
                        }
                    }
                });
            }
        }
    });
}

function getBackpack() {
    var back = Storage.get('backpack');
    if (back === null) {
        back = [];
    }
    return back;
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

function showResults(list) {
    $comments.html('');
    list.forEach(showOneComment);
    scrollToResults();
}

function scrollToResults() {
    $('html, body').animate({ scrollTop: $('.greetings').offset().top }, 'slow');
    return false;
}

function showOneComment(comment) {
    var html_code = Templates.Comment_OneItem({comment: comment});
    var $node = $(html_code);
    var Backpack = getBackpack();
    $comments.append($node);

    $node.find ('.favorite').mouseover(function () {
        if (!comment.favorite) {
            $(this).removeClass('glyphicon glyphicon-star-empty');
            $(this).addClass('glyphicon glyphicon-star');
        }
    });

    $node.find ('.favorite').mouseout(function () {
        if (!comment.favorite) {
            $(this).removeClass('glyphicon glyphicon-star');
            $(this).addClass('glyphicon glyphicon-star-empty');
        }
    });

    $node.find('.favorite').click(function () {
        if (comment.favorite) {
            for (var i = 0; i < Backpack.length; i++) {
                if (comment.comment._id == Backpack[i].comment._id) {
                    removeFromStorrage(Backpack, i);
                    $(this).removeClass('glyphicon glyphicon-star');
                    $(this).addClass('glyphicon glyphicon-star-empty');
                }
            }
        } else {
            Backpack.push(comment);
            saveComment(Backpack);
            $(this).removeClass('glyphicon glyphicon-star-empty');
            $(this).addClass('glyphicon glyphicon-star');
        }
        comment.favorite =!comment.favorite;
    });
}

function saveComment(back) {
    Storage.set('backpack', back);
}

function removeFromStorrage(back, i) {
    back.splice(i, 1);
    Storage.set('backpack', back);
}

exports.getComments = getComments;
