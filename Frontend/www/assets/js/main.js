(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//var API_URL = 'http://localhost:4040';

function backendGet(url, callback) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.getCitiesList = function(callback) {
    backendGet('/api/get-cities/', callback);
};

exports.getComments = function (city, callback) {
  backendPost('/api/get-comments/', city, callback);
};

exports.writeComment = function (comment, callback) {
  backendPost('/api/write-comments/', comment, callback);
};

exports.login = function (user, callback) {
  backendPost('/api/login/', user, callback);
};

exports.registration = function (user, callback) {
  backendPost('/api/registration/', user, callback);
};

exports.logout = function (callback) {
    backendGet('/api/logout/', callback);
};

exports.checkLogin = function (callback) {
  backendGet('/api/check-login/', callback);
};

exports.getBackpack = function (callback) {
    backendGet('/api/get-backpack/', callback);
};

exports.setBackpack = function (backpack, callback) {
    backendPost('/api/set-backpack/', backpack, callback);
};
},{}],2:[function(require,module,exports){
var trash = [
    'a',
    'able',
    'about',
    'above',
    'abroad',
    'according',
    'accordingly',
    'across',
    'actually',
    'adj', 'after',
    'afterwards',
    'again',
    'against',
    'ago',
    'ahead',
    'aint',
    'all',
    'allow',
    'allows',
    'almost',
    'alone',
    'along',
    'alongside',
    'already',
    'also',
    'although',
    'always',
    'am',
    'amid',
    'amidst',
    'among',
    'amongst',
    'an',
    'and',
    'another',
    'any',
    'anybody',
    'anyhow',
    'anyone',
    'anything',
    'anyway',
    'anyways',
    'anywhere',
    'apart',
    'appear',
    'appreciate',
    'appropriate',
    'are',
    'arent',
    'around',
    'as',
    'as',
    'aside',
    'ask',
    'asking',
    'associated',
    'at',
    'available',
    'away',
    'awfully',
    'b',
    'back',
    'backward',
    'backwards',
    'be',
    'became',
    'because',
    'become',
    'becomes',
    'becoming',
    'been',
    'before',
    'beforehand',
    'begin',
    'behind',
    'being',
    'believe',
    'below',
    'beside',
    'besides',
    'best',
    'better',
    'between',
    'beyond',
    'both',
    'brief',
    'but',
    'by',
    'c',
    'came',
    'can',
    'cannot',
    'cant',
    'caption',
    'cause',
    'causes',
    'certain',
    'certainly',
    'changes',
    'clearly',
    'cmon',
    'co',
    'com',
    'come',
    'comes',
    'concerning',
    'consequently',
    'consider',
    'considering',
    'contain',
    'containing',
    'contains',
    'corresponding',
    'could',
    'couldnt',
    'course',
    'cs',
    'currently',
    'd',
    'dare',
    'darent',
    'definitely',
    'described',
    'despite',
    'did',
    'didnt',
    'different',
    'directly',
    'do',
    'does',
    'doesnt',
    'doing',
    'done',
    'dont',
    'down',
    'downwards',
    'during',
    'e',
    'each',
    'edu',
    'eg',
    'eight',
    'eighty',
    'either',
    'else',
    'elsewhere',
    'end',
    'ending',
    'enough',
    'entirely',
    'especially',
    'et',
    'etc',
    'even',
    'ever',
    'evermore',
    'every',
    'everybody',
    'everyone',
    'everything',
    'everywhere',
    'ex',
    'exactly',
    'example',
    'except',
    'f',
    'fairly',
    'far',
    'farther',
    'few',
    'fewer',
    'fifth',
    'first',
    'five',
    'followed',
    'following',
    'follows',
    'for',
    'forever',
    'former',
    'formerly',
    'forth',
    'forward',
    'found',
    'four',
    'from',
    'further',
    'furthermore',
    'g',
    'get',
    'gets',
    'getting',
    'given',
    'gives',
    'go',
    'goes',
    'going',
    'gone',
    'got',
    'gotten',
    'greetings',
    'h',
    'had',
    'hadnt',
    'half',
    'happens',
    'hardly',
    'has',
    'hasnt',
    'have',
    'havent',
    'having',
    'he',
    'hed',
    'hell',
    'hello',
    'help',
    'hence',
    'her',
    'here',
    'hereafter',
    'hereby',
    'herein',
    'heres',
    'hereupon',
    'hers',
    'herself',
    'hes',
    'hi',
    'him',
    'himself',
    'his',
    'hither',
    'hopefully',
    'how',
    'howbeit',
    'however',
    'hundred',
    'i',
    'id',
    'ie',
    'if',
    'ignored',
    'ill',
    'im',
    'immediate',
    'in',
    'inasmuch',
    'inc',
    'indeed',
    'indicate',
    'indicated',
    'indicates',
    'inner',
    'inside',
    'insofar',
    'instead',
    'into',
    'inward',
    'is',
    'isnt',
    'it',
    'itd',
    'itll',
    'its',
    'itʼs',
    'it\'s',
    'itself',
    'ive',
    'j',
    'just',
    'k',
    'keep',
    'keeps',
    'kept',
    'know',
    'known',
    'knows',
    'l',
    'last',
    'lately',
    'later',
    'latter',
    'latterly',
    'least',
    'less',
    'lest',
    'let',
    'lets',
    'like',
    'liked',
    'likely',
    'likewise',
    'little',
    'look',
    'looking',
    'looks',
    'low',
    'lower',
    'ltd',
    'm',
    'made',
    'mainly',
    'make',
    'makes',
    'many',
    'may',
    'maybe',
    'maynt',
    'me',
    'mean',
    'meantime',
    'meanwhile',
    'merely',
    'might',
    'mightnt',
    'mine',
    'minus',
    'miss',
    'more',
    'moreover',
    'most',
    'mostly',
    'mr',
    'mrs',
    'much',
    'must',
    'mustnt',
    'my',
    'myself',
    'n',
    'name',
    'namely',
    'nd',
    'near',
    'nearly',
    'necessary',
    'need',
    'neednt',
    'needs',
    'neither',
    'never',
    'neverf',
    'neverless',
    'nevertheless',
    'next',
    'nine',
    'ninety',
    'no',
    'nobody',
    'non',
    'none',
    'nonetheless',
    'noone',
    'no-one',
    'nor',
    'normally',
    'not',
    'nothing',
    'notwithstanding',
    'novel',
    'now',
    'nowhere',
    'o',
    'obviously',
    'of',
    'off',
    'often',
    'oh',
    'ok',
    'okay',
    'old',
    'on',
    'once',
    'one',
    'ones',
    'ones',
    'only',
    'onto',
    'opposite',
    'or',
    'other',
    'others',
    'otherwise',
    'ought',
    'oughtnt',
    'our',
    'ours',
    'ourselves',
    'out',
    'outside',
    'over',
    'overall',
    'own',
    'p',
    'particular',
    'particularly',
    'past',
    'per',
    'perhaps',
    'placed',
    'please',
    'plus',
    'possible',
    'presumably',
    'probably',
    'provided',
    'provides',
    'q',
    'que',
    'quite',
    'qv',
    'r',
    'rather',
    'rd',
    're',
    'really',
    'reasonably',
    'recent',
    'recently',
    'regarding',
    'regardless',
    'regards',
    'relatively',
    'respectively',
    'right',
    'round',
    's',
    'said',
    'same',
    'saw',
    'say',
    'saying',
    'says',
    'second',
    'secondly',
    'see',
    'seeing',
    'seem',
    'seemed',
    'seeming',
    'seems',
    'seen',
    'self',
    'selves',
    'sensible',
    'sent',
    'serious',
    'seriously',
    'seven',
    'several',
    'shall',
    'shant',
    'she',
    'shed',
    'shell',
    'shes',
    'should',
    'shouldnt',
    'since',
    'six',
    'so',
    'some',
    'somebody',
    'someday',
    'somehow',
    'someone',
    'something',
    'sometime',
    'sometimes',
    'somewhat',
    'somewhere',
    'soon',
    'sorry',
    'specified',
    'specify',
    'specifying',
    'still',
    'sub',
    'such',
    'sup',
    'sure',
    't',
    'take',
    'taken',
    'taking',
    'tell',
    'tends',
    'th',
    'than',
    'thank',
    'thanks',
    'thanx',
    'that',
    'thatll',
    'thats',
    'thats',
    'thatve',
    'the',
    'their',
    'theirs',
    'them',
    'themselves',
    'then',
    'thence',
    'there',
    'thereafter',
    'thereby',
    'thered',
    'therefore',
    'therein',
    'therell',
    'therere',
    'theres',
    'theres',
    'thereupon',
    'thereve',
    'these',
    'they',
    'theyd',
    'theyll',
    'theyre',
    'theyve',
    'thing',
    'things',
    'think',
    'third',
    'thirty',
    'this',
    'thorough',
    'thoroughly',
    'those',
    'though',
    'three',
    'through',
    'throughout',
    'thru',
    'thus',
    'till',
    'to',
    'together',
    'too',
    'took',
    'toward',
    'towards',
    'tried',
    'tries',
    'truly',
    'try',
    'trying',
    'ts',
    'twice',
    'two',
    'u',
    'un',
    'under',
    'underneath',
    'undoing',
    'unfortunately',
    'unless',
    'unlike',
    'unlikely',
    'until',
    'unto',
    'up',
    'upon',
    'upwards',
    'us',
    'use',
    'used',
    'useful',
    'uses',
    'using',
    'usually',
    'v',
    'value',
    'various',
    'versus',
    'very',
    'via',
    'viz',
    'vs',
    'w',
    'want',
    'wants',
    'was',
    'wasnt',
    'way',
    'we',
    'wed',
    'welcome',
    'well',
    'well',
    'went',
    'were',
    'were',
    'werent',
    'weve',
    'what',
    'whatever',
    'whatll',
    'whats',
    'whatve',
    'when',
    'whence',
    'whenever',
    'where',
    'whereafter',
    'whereas',
    'whereby',
    'wherein',
    'wheres',
    'whereupon',
    'wherever',
    'whether',
    'which',
    'whichever',
    'while',
    'whilst',
    'whither',
    'who',
    'whod',
    'whoever',
    'whole',
    'wholl',
    'whom',
    'whomever',
    'whos',
    'whose',
    'why',
    'will',
    'willing',
    'wish',
    'with',
    'within',
    'without',
    'wonder',
    'wont',
    'would',
    'wouldnt',
    'x',
    'y',
    'yes',
    'yet',
    'you',
    'youd',
    'youll',
    'your',
    'youre',
    'yours',
    'yourself',
    'yourselves',
    'youve',
    'z',
    'zero'
];

var wrong_symbols = [
    ',',
    '.',
    '!',
    ';',
    ':',
    '?',
    '`',
    '<',
    '>',
    '/',
    '"',
    '\'',
    '\\',
    ']',
    '[',
    '}',
    '{',
    '=',
    '+',
    '-',
    '_',
    ')',
    '(',
    '*',
    '&',
    '^',
    '%',
    '$',
    '#',
    '№',
    '@',
    '~',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0'
];

exports.trash = trash;
exports.wrong_symbols = wrong_symbols;
},{}],3:[function(require,module,exports){
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
            Storage.set('id', id);
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
},{"../API":1,"../LocalStorage":5,"../Teamplates":7}],4:[function(require,module,exports){
var Cities;
var API = require('../API');
var Storage = require('../LocalStorage');
var Templates = require('../Teamplates');
var trash = require('./AdditionalArrays').trash;
var wrong_symbols = require('./AdditionalArrays').wrong_symbols;
var stemmer = require('stemmer');
var $comments = $('#comments');
var imageViewer = document.getElementById('fs-img-panel');
var largeImg = document.getElementById("fs-img-block");
var captionText = document.getElementById("fs-img-caption");

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
            if (search_words.length === 0) {
                final_result(comment_list);
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
                    final_result(comment_list);
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
                            if (search_words.length === 2) {
                                id = Cities[i].id;
                                Storage.set('id', id);
                                document.location.href = '/city.html';
                                find = true;
                            } else {
                                city_name = Cities[j];
                                search_words.splice(i,2);
                                break;
                            }
                        }
                        if (three_words === Cities[j].city.toLowerCase()) {
                            if (search_words.length === 3) {
                                id = Cities[i].id;
                                Storage.set('id', id);
                                document.location.href = '/city.html';
                                find = true;
                            } else {
                                city_name = Cities[j];
                                search_words.slice(i, 3);
                                break;
                            }
                        }
                    }
                }
                city_search = {city: city_name.city};
                API.getComments(city_search, function (err, data) {
                    if (!err) {
                        if (!data.emptyForm) {
                            console.log("lol");
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
                                console.log(comment_words , search_rate);
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
                            final_result(comment_list);
                        } else {
                            final_result(comment_list);
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
    list.forEach(showOneComment);
}

function scrollToResults() {
    $('html, body').animate({ scrollTop: $('.found').offset().top }, 'slow');
    return false;
}

function showOneComment(comment) {
    var html_code = Templates.Comment_v2({comment: comment});
    var $node = $(html_code);
    var Backpack = getBackpack();
    $comments.append($node);

    $node.find('.favourite-btn').click(function () {
        if (comment.favorite) {
            for (var i = 0; i < Backpack.length; i++) {
                if (comment.comment._id == Backpack[i].comment._id) {
                    removeFromStorrage(Backpack, i);
                    $(this).context.src = "assets/images/icons/icons8-add-to-favorites-96.png";
                }
            }
        } else {
            Backpack.push(comment);
            saveComment(Backpack);
            $(this).context.src = "assets/images/icons/icons8-star-filled-96.png";
        }
        comment.favorite =!comment.favorite;
    });

    $node.find('.uploaded-img').click(function () {
        imageViewer.style.display = "block";
        $('body').css('overflow-y', 'hidden');
        largeImg.src = this.src;
        captionText.innerHTML = this.alt;
        var spanClose = document.getElementById('img-panel-close');
        spanClose.onclick = function() {
            imageViewer.style.display = "none";
            $('body').css('overflow-y', 'visible');
        }
    });

}

function saveComment(back) {
    Storage.set('backpack', back);
}

function removeFromStorrage(back, i) {
    back.splice(i, 1);
    Storage.set('backpack', back);
}

function final_result(list) {
    $comments.html('');
    if (list.length === 0) {
        $('#for-comments').css('display', 'block');
        scrollToResults();
        //$('.preloader').css('opacity', '0.75').fadeIn('slow', function () {});
        $('.not_found').css('display', 'block');
        // setTimeout(function () {
        //     $('.preloader').fadeOut('slow', function () {});
        //     $('body').css('overflow-y', 'visible');
        // }, 1500);
    } else {
        $('#for-comments').css('display', 'block');
        $('.not_found').css('display', 'none');
        scrollToResults();
       // $('.preloader').css('opacity', '0.75').fadeIn('slow', function () {});
        showResults(list);
        // setTimeout(function () {
        //     $('.preloader').fadeOut('slow', function () {});
        //     $('body').css('overflow-y', 'visible');
        // }, 1500);
    }
}

exports.getComments = getComments;
},{"../API":1,"../LocalStorage":5,"../Teamplates":7,"./AdditionalArrays":2,"stemmer":16}],5:[function(require,module,exports){
var basil = require('basil.js');
basil = new basil();

exports.get = function (key) {
    return basil.get(key);
};
exports.set = function (key, value) {
    return basil.set(key, value);
};
},{"basil.js":9}],6:[function(require,module,exports){
var API = require('./API');
var $login = $('#inputLogin');
var $pass = $('#inputPassword');
var $newlogin = $('#inputNewLogin');
var $newemail = $('#inputNewEmail');
var $newpass = $('#inputNewPassword');
var username;
var email;
var password;
var user;
var avatar;
var valid;

function login(page) {
    username = $login.val();
    password = $pass.val();
    if(validLogin(username, password)) {
        user = {
          username: username,
          password: password
        };
        API.login(user, function (err, data) {
            if (!err) {
                if (data.success) {
                    $('.for-login.login-form.form-group').removeClass('has-error');
                    $('.for-login.password-form.form-group').removeClass('has-error');
                    $('#helpLogin').css('display', 'none');
                    $('#helpPassword').css('display', 'none');
                    switch (page) {
                        case 'home':
                            document.location.href = '/';
                            break;
                        case 'city':
                            document.location.href = '/city.html';
                            break;
                        case 'backpack':
                            document.location.href = '/backpack.html';
                            break;
                        case 'about':
                            document.location.href = '/about.html';
                            break;
                    }
                }
                if (data.incorrectPassword) {
                    $('.for-login.login-form.form-group').removeClass('has-error');
                    $('.for-login.password-form.form-group').addClass('has-error');
                    $('#helpLogin').css('display', 'none');
                    $('#helpPassword').css('display', 'block');
                }
                if (data.notFound) {
                    $('.for-login.login-form.form-group').addClass('has-error');
                    $('.for-login.password-form.form-group').addClass('has-error');
                    $('#helpLogin').css('display', 'block');
                    $('#helpPassword').css('display', 'none');
                }
            }
        });
    }
}

function registration(page) {
    username = $newlogin.val();
    email = $newemail.val();
    password = $newpass.val();
    avatar = randomAvatar();
    user = {
        username: username,
        email: email,
        password: password,
        avatar: avatar
    };
    if (validRegister(username, email, password)) {
        API.registration(user, function (err, data) {
            if (!err) {
                if (data.newUser) {
                    $('.for-registration.login-form.form-group').removeClass('has-error');
                    $('.for-registration.email-form.form-group').removeClass('has-error');
                    $('.for-registration.password-form.form-group').removeClass('has-error');
                    $('#helpNewPassword').css('display', 'none');
                    $('#helpNewLogin').css('display', 'none');
                    switch (page) {
                        case 'home':
                            document.location.href = '/';
                            break;
                        case 'city':
                            document.location.href = '/city.html';
                            break;
                        case 'backpack':
                            document.location.href = '/backpack.html';
                            break;
                        case 'about':
                            document.location.href = '/about.html';
                            break;
                    }
                }
                if (data.isExist) {
                    $('.for-registration.login-form.form-group').addClass('has-error');
                    $('.for-registration.email-form.form-group').removeClass('has-error');
                    $('.for-registration.password-form.form-group').removeClass('has-error');
                    $('#helpNewPassword').css('display', 'none');
                    $('#helpNewLogin').css('display', 'block');
                }
            }
        });
    }
}

function logout(page) {
    API.logout(function (err, data) {
        if (!err) {
            if (data.end) {
                switch (page) {
                    case 'home':
                        document.location.href = '/';
                        break;
                    case 'city':
                        document.location.href = '/city.html';
                        break;
                    case 'backpack':
                        document.location.href = '/backpack.html';
                        break;
                    case 'about':
                        document.location.href = '/about.html';
                        break;
                }
            }
        }
    });
}

function validLogin(username, password) {
    valid = true;
    if (username.length === 0) {
        $('.for-login.login-form.form-group').addClass('has-error');
        $('#helpPassword').css('display', 'none');
        $('#helpLogin').css('display', 'none');
        valid = false;
    } else {
        $('.for-login.login-form.form-group').removeClass('has-error');
    }
    if (password.length === 0) {
        $('.for-login.password-form.form-group').addClass('has-error');
        $('#helpPassword').css('display', 'none');
        $('#helpLogin').css('display', 'none');
        valid = false;
    } else {
        $('.for-login.password-form.form-group').removeClass('has-error');
    }
    return valid;
}

function validRegister(username, email, password) {
    valid = true;
    if (username.length === 0) {
        $('.for-registration.login-form.form-group').addClass('has-error');
        $('#helpNewLogin').css('display', 'none');
        valid = false;
    } else {
        $('.for-registration.login-form.form-group').removeClass('has-error');
        $('#helpNewLogin').css('display', 'none');
    }
    if (password.length < 6) {
        $('.for-registration.password-form.form-group').addClass('has-error');
        $('#helpNewLogin').css('display', 'none');
        $('#helpNewPassword').css('display', 'block');
        valid = false;
    } else {
        $('.for-registration.password-form.form-group').removeClass('has-error');
        $('#helpNewLogin').css('display', 'none');
        $('#helpNewPassword').css('display', 'none');
    }
    if (email.length === 0) {
        $('.for-registration.email-form.form-group').addClass('has-error');
        $('#helpNewLogin').css('display', 'none');
        valid = false;
    } else {
        $('.for-registration.email-form.form-group').removeClass('has-error');
        $('#helpNewLogin').css('display', 'none');
    }
    return valid;
}

function randomAvatar(){
    var rand;
    rand = Math.floor((Math.random() * 20) + 1);
    return rand;
}

exports.login = login;
exports.registration = registration;
exports.logout = logout;
},{"./API":1}],7:[function(require,module,exports){

var ejs = require('ejs');


exports.City_OneItem = ejs.compile("<div class=\"col-sm-6 col-md-4 card\">\n    <div class=\"thumbnail city-card\" id=\"<%= city.id%>\" style=\"background-image: url(<%= city.icon%>)\">\n        <h2 class=\"thumb-name\"><%= city.city%></h2>\n    </div>\n</div>");
exports.Comment_OneItem = ejs.compile("<div class=\"comment col-md-6 clo-xs-12\">\n    <div class=\"comment-info-block row\">\n        <div class=\"user-photo col-xs-2\">\n            <img class=\"img-responsive user-photo\" src=\"assets/images/avatars/<%= comment.comment.avatar%>.png\">\n        </div>\n        <div class=\"comment-body col-xs-6\">\n            <div class=\"comment-place-name\">\n                <strong><%= comment.comment.location_name%></strong>\n            </div>\n            <div class=\"comment-author-info\">\n                <%= comment.comment.nickname%> <span class=\"text-muted\">commented <%= comment.comment.day%>-<%= comment.comment.month%>-<%= comment.comment.year%></span>\n            </div>\n        </div>\n        <div class=\"buttons-bar col-xs-4\">\n            <div class=\"fav-count\"><%= comment.comment.count%></div>\n            <img class=\"favourite-btn\" src=\" <% if (comment.favorite) { %> assets/images/icons/icons8-star-filled-96.png <% } else { %> assets/images/icons/icons8-add-to-favorites-96.png <% } %>\">\n        </div>\n    </div>\n    <div class=\"row\"></div>\n    <div class=\"comment-text-body row\">\n        <%= comment.comment.comment%>\n    </div>\n    <div class=\"media-bar row\">\n        <img class=\"uploaded-img\" alt=\"<%= comment.comment.location_name%>\" src=\"https://maps.googleapis.com/maps/api/staticmap?center=<%= comment.comment.location%>&zoom=17&size=640x425&markers=color:red%7C<%= comment.comment.location%>&path=weight:3%7Ccolor:blue%7Cenc:{coaHnetiVjM??_SkM??~R&key=AIzaSyBLsX-VTDp7C82k5Jaw5HnPHxRcCuX9OMQ\">\n        <img class=\"uploaded-img\" alt=\"<%= comment.comment.location_name%>\" src=\"<%= comment.comment.img_1%>\">\n        <img class=\"uploaded-img\" alt=\"<%= comment.comment.location_name%>\" src=\"<%= comment.comment.img_2%>\">\n    </div>\n</div>");
exports.InfoCity = ejs.compile("<div class=\"new-city-hero container\" style=\"background-image: url(<%= city.icon%>)\">\n    <div class=\"title-box\">\n        <p>experience</p>\n        <h1 class=\"city-name\"><%= city.city%></h1>\n        <p>like a local</p>\n    </div>\n    <div class=\"local-search-container\">\n        <div class=\"search-box\">\n            <input type=\"text\" class=\"form-control\" id=\"searchBox\" placeholder=\"\">\n        </div>\n        <div class=\"btn search-button\">\n            <p class=\"search-icon\">Search</p>\n        </div>\n    </div>\n</div>");
exports.SendForm = ejs.compile("<div class=\"col-md-6 col-xs-12\" id=\"form\">\n    <div class=\"col-xs-10 full-width\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                <span class=\"nickname\"></span>\n            </div>\n            <div class=\"panel-heading\">\n                <input type=\"text\" class=\"form-control location-name\" placeholder=\"Enter location name\">\n                <span id=\"helpLocationName\" class=\"help-block\">Please write location name</span>\n                <br>\n                <input type=\"text\" class=\"form-control location-address\" placeholder=\"Enter location coordinates\">\n            </div>\n            <div class=\"panel-body\">\n                <textarea class=\"form-control\" rows=\"5\" id=\"comment\" maxlength=\"400\"></textarea>\n                <form enctype=\"multipart/form-data\">\n                    <input id=\"img-1\" type=\"file\" name=\"photo\" accept=\".png, .jpg, jpeg\" multiple />\n                    <input id=\"img-2\" type=\"file\" name=\"photo\" accept=\".png, .jpg, jpeg\" multiple />\n                    <span class=\"btn btn-send\">\n                        Send <span class=\"glyphicon glyphicon-send\"></span>\n                    </span>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>");
exports.weatherBlock = ejs.compile(" <div class=\"weather\">\n                <div class=\"info\">\n                    <div class=\"temp\">\n                        <small>TEMPERATURE: </small><%= weather.main.temp %>°C\n                    </div>\n                    <div class=\"wind\">\n                        <small>WIND SPEED: </small> <%= weather.wind.speed %>m/s\n                    </div>\n                    <div class=\"description\">\n                        <%= weather.weather[0].description %>\n                    </div>\n                </div>\n                </div>\n");
exports.additionalInfo = ejs.compile("\n    <div class=\"weather\">\n        <div class=\"info\">\n            <div class=\"temp\">\n                <small>COUNTRY: </small><%= city.country %>\n            </div>\n            <div class=\"wind\">\n                <small>CURRENCY: </small> <%= city.currency %>\n            </div>\n            <div class=\"description\">\n                <small>POPULATION: </small><%= city.population %>\n            </div>\n        </div>\n    </div>");
exports.FavouriteCityComments = ejs.compile("<div class=\"col-sm-6 col-md-4 backpack-card\">\n    <div class=\"animated thumbnail city-backpack-card\">\n        <h2 class=\"back-name\"><%= city.city%></h2>\n    </div>\n</div>");
exports.OneFavouriteComment = ejs.compile("<div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n        <strong><%= comment.comment.nickname%></strong> <span class=\"text-muted\">commented <%= comment.comment.day%>-<%= comment.comment.month%>-<%= comment.comment.year%></span><span class=\"favorite glyphicon glyphicon-star\"></span>\n    </div>\n    <div class=\"panel-body\">\n        <%= comment.comment.comment%>\n    </div>\n</div>");
exports.Comment_v2 = ejs.compile("<div class=\"comment col-md-6 clo-xs-12\">\n    <div class=\"comment-info-block row\">\n        <div class=\"user-photo col-xs-2\">\n            <img class=\"img-responsive user-photo\" src=\"assets/images/avatars/<%= comment.comment.avatar%>.png\">\n        </div>\n        <div class=\"comment-body col-xs-6\">\n            <div class=\"comment-place-name\">\n                <strong><%= comment.comment.location_name%></strong>\n            </div>\n            <div class=\"comment-author-info\">\n                <%= comment.comment.nickname%> <span class=\"text-muted\">commented <%= comment.comment.day%>-<%= comment.comment.month%>-<%= comment.comment.year%></span>\n            </div>\n        </div>\n        <div class=\"buttons-bar col-xs-4\">\n            <img class=\"favourite-btn\" src=\" <% if (comment.favorite) { %> assets/images/icons/icons8-star-filled-96.png <% } else { %> assets/images/icons/icons8-add-to-favorites-96.png <% } %>\">\n        </div>\n    </div>\n    <div class=\"row\"></div>\n    <div class=\"comment-text-body row\">\n        <%= comment.comment.comment%>\n    </div>\n    <div class=\"media-bar row\">\n        <img class=\"uploaded-img\" alt=\"<%= comment.comment.location_name%>\" src=\"https://maps.googleapis.com/maps/api/staticmap?center=<%= comment.comment.location%>&zoom=17&size=640x425&markers=color:red%7C<%= comment.comment.location%>&path=weight:3%7Ccolor:blue%7Cenc:{coaHnetiVjM??_SkM??~R&key=AIzaSyBLsX-VTDp7C82k5Jaw5HnPHxRcCuX9OMQ\">\n        <img class=\"uploaded-img\" id=\"img1\" alt=\"<%= comment.comment.location_name%>\" src=\"<%= comment.comment.img_1%>\">\n        <img class=\"uploaded-img\" id=\"img2\" alt=\"<%= comment.comment.location_name%>\" src=\"<%= comment.comment.img_2%>\">\n    </div>\n</div>");
},{"ejs":11}],8:[function(require,module,exports){
var API = require('./API');
var LogReg = require('./LogReg');
var GetCities = require('./Cities/GetCities');
var getComments = require('./Cities/GetSearch');
var text;
var Templates = require('./Teamplates');
var Storage = require('./LocalStorage');
var text;
var comment_list = [];
var page = 'home';

$(function () {
    API.checkLogin(function (err, data) {
        if (!err) {
            if (data.login) {
                $('.logined').css('display', 'block');
                $('.name').html(data.user);
            } else {
                $('.glyphicon-user').css('display', 'block');
            }
            $(window).load(function () {
                setTimeout(function () {
                    $('.preloader').fadeOut('slow');
                    $('body').css('overflow-y', 'visible');
                }, 1500);
            });
            GetCities.initialiseCities();
            $('#searchBox').keyup(function (e) {
                text = $('input.form-control').val();
                if (e.keyCode === 13) {
                    getComments.getComments(text);
                    comment_list = getComments.getComments(text);
                }
            });
            $("#city-scroll").click(function(){
                scrollTo();
            });

            $('.log').click(function () {
                LogReg.login(page);
            });

            $('.reg').click(function () {
                LogReg.registration(page);
            });

            $('.end').click(function () {
                LogReg.logout(page);
            });

            $('.search-button').click(function () {
                text = $('.search-text').val();
                getComments.getComments(text);
            });

            $('#searchBox').keyup(function (e) {
                text = $('.search-text').val();
                if (e.keyCode === 13) {
                    getComments.getComments(text);
                }
            });

            $('#staff').click(function () {
                $('body').css('overflow-y', 'hidden');
                $('.niceStaff').css('display', 'block');
                $('.niceStaff').animate({'bottom':'0'}, 500);
                setTimeout(function () {
                    $('.niceStaff').animate({'bottom':'-200px'}, 500);
                }, 1600);
                setTimeout(function () {
                    $('.niceStaff').css('display', 'none');
                    $('body').css('overflow-y', 'visible');
                }, 2200);
            });
        }
    });
});

function scrollTo() {
    $('html, body').animate({ scrollTop: $('.greetings').offset().top }, 'slow');
    return false;
}
},{"./API":1,"./Cities/GetCities":3,"./Cities/GetSearch":4,"./LocalStorage":5,"./LogReg":6,"./Teamplates":7}],9:[function(require,module,exports){
(function () {
	// Basil
	var Basil = function (options) {
		return Basil.utils.extend({}, Basil.plugins, new Basil.Storage().init(options));
	};

	// Version
	Basil.version = '0.4.4';

	// Utils
	Basil.utils = {
		extend: function () {
			var destination = typeof arguments[0] === 'object' ? arguments[0] : {};
			for (var i = 1; i < arguments.length; i++) {
				if (arguments[i] && typeof arguments[i] === 'object')
					for (var property in arguments[i])
						destination[property] = arguments[i][property];
			}
			return destination;
		},
		each: function (obj, fnIterator, context) {
			if (this.isArray(obj)) {
				for (var i = 0; i < obj.length; i++)
					if (fnIterator.call(context, obj[i], i) === false) return;
			} else if (obj) {
				for (var key in obj)
					if (fnIterator.call(context, obj[key], key) === false) return;
			}
		},
		tryEach: function (obj, fnIterator, fnError, context) {
			this.each(obj, function (value, key) {
				try {
					return fnIterator.call(context, value, key);
				} catch (error) {
					if (this.isFunction(fnError)) {
						try {
							fnError.call(context, value, key, error);
						} catch (error) {}
					}
				}
			}, this);
		},
		registerPlugin: function (methods) {
			Basil.plugins = this.extend(methods, Basil.plugins);
		},
		getTypeOf: function (obj) {
			if (typeof obj === 'undefined' || obj === null)
				return '' + obj;
			return Object.prototype.toString.call(obj).replace(/^\[object\s(.*)\]$/, function ($0, $1) { return $1.toLowerCase(); });
		}
	};
  	// Add some isType methods: isArguments, isBoolean, isFunction, isString, isArray, isNumber, isDate, isRegExp, isUndefined, isNull.
	var types = ['Arguments', 'Boolean', 'Function', 'String', 'Array', 'Number', 'Date', 'RegExp', 'Undefined', 'Null'];
	for (var i = 0; i < types.length; i++) {
		Basil.utils['is' + types[i]] = (function (type) {
			return function (obj) {
				return Basil.utils.getTypeOf(obj) === type.toLowerCase();
			};
		})(types[i]);
	}

	// Plugins
	Basil.plugins = {};

	// Options
	Basil.options = Basil.utils.extend({
		namespace: 'b45i1',
		storages: ['local', 'cookie', 'session', 'memory'],
		expireDays: 365
	}, window.Basil ? window.Basil.options : {});

	// Storage
	Basil.Storage = function () {
		var _salt = 'b45i1' + (Math.random() + 1)
				.toString(36)
				.substring(7),
			_storages = {},
			_isValidKey = function (key) {
				var type = Basil.utils.getTypeOf(key);
				return (type === 'string' && key) || type === 'number' || type === 'boolean';
			},
			_toStoragesArray = function (storages) {
				if (Basil.utils.isArray(storages))
					return storages;
				return Basil.utils.isString(storages) ? [storages] : [];
			},
			_toStoredKey = function (namespace, path) {
				var key = '';
				if (_isValidKey(path)) {
					key += path;
				} else if (Basil.utils.isArray(path)) {
					path = Basil.utils.isFunction(path.filter) ? path.filter(_isValidKey) : path;
					key = path.join('.');
				}
				return key && _isValidKey(namespace) ? namespace + '.' + key : key;
 			},
			_toKeyName = function (namespace, key) {
				if (!_isValidKey(namespace))
					return key;
				return key.replace(new RegExp('^' + namespace + '.'), '');
			},
			_toStoredValue = function (value) {
				return JSON.stringify(value);
			},
			_fromStoredValue = function (value) {
				return value ? JSON.parse(value) : null;
			};

		// HTML5 web storage interface
		var webStorageInterface = {
			engine: null,
			check: function () {
				try {
					window[this.engine].setItem(_salt, true);
					window[this.engine].removeItem(_salt);
				} catch (e) {
					return false;
				}
				return true;
			},
			set: function (key, value, options) {
				if (!key)
					throw Error('invalid key');
				window[this.engine].setItem(key, value);
			},
			get: function (key) {
				return window[this.engine].getItem(key);
			},
			remove: function (key) {
				window[this.engine].removeItem(key);
			},
			reset: function (namespace) {
				for (var i = 0, key; i < window[this.engine].length; i++) {
					key = window[this.engine].key(i);
					if (!namespace || key.indexOf(namespace) === 0) {
						this.remove(key);
						i--;
					}
				}
			},
			keys: function (namespace) {
				var keys = [];
				for (var i = 0, key; i < window[this.engine].length; i++) {
					key = window[this.engine].key(i);
					if (!namespace || key.indexOf(namespace) === 0)
						keys.push(_toKeyName(namespace, key));
				}
				return keys;
			}
		};

		// local storage
		_storages.local = Basil.utils.extend({}, webStorageInterface, {
			engine: 'localStorage'
		});
		// session storage
		_storages.session = Basil.utils.extend({}, webStorageInterface, {
			engine: 'sessionStorage'
		});

		// memory storage
		_storages.memory = {
			_hash: {},
			check: function () {
				return true;
			},
			set: function (key, value, options) {
				if (!key)
					throw Error('invalid key');
				this._hash[key] = value;
			},
			get: function (key) {
				return this._hash[key] || null;
			},
			remove: function (key) {
				delete this._hash[key];
			},
			reset: function (namespace) {
				for (var key in this._hash) {
					if (!namespace || key.indexOf(namespace) === 0)
						this.remove(key);
				}
			},
			keys: function (namespace) {
				var keys = [];
				for (var key in this._hash)
					if (!namespace || key.indexOf(namespace) === 0)
						keys.push(_toKeyName(namespace, key));
				return keys;
			}
		};

		// cookie storage
		_storages.cookie = {
			check: function () {
				if (!navigator.cookieEnabled)
					return false;
				if (window.self !== window.top) {
					// we need to check third-party cookies;
					var cookie = 'thirdparty.check=' + Math.round(Math.random() * 1000);
					document.cookie = cookie + '; path=/';
					return document.cookie.indexOf(cookie) !== -1;
				}
				return true;
			},
			set: function (key, value, options) {
				if (!this.check())
					throw Error('cookies are disabled');
				options = options || {};
				if (!key)
					throw Error('invalid key');
				var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
				// handle expiration days
				if (options.expireDays) {
					var date = new Date();
					date.setTime(date.getTime() + (options.expireDays * 24 * 60 * 60 * 1000));
					cookie += '; expires=' + date.toGMTString();
				}
				// handle domain
				if (options.domain && options.domain !== document.domain) {
					var _domain = options.domain.replace(/^\./, '');
					if (document.domain.indexOf(_domain) === -1 || _domain.split('.').length <= 1)
						throw Error('invalid domain');
					cookie += '; domain=' + options.domain;
				}
				// handle secure
				if (options.secure === true) {
					cookie += '; secure';
				}
				document.cookie = cookie + '; path=/';
			},
			get: function (key) {
				if (!this.check())
					throw Error('cookies are disabled');
				var encodedKey = encodeURIComponent(key);
				var cookies = document.cookie ? document.cookie.split(';') : [];
				// retrieve last updated cookie first
				for (var i = cookies.length - 1, cookie; i >= 0; i--) {
					cookie = cookies[i].replace(/^\s*/, '');
					if (cookie.indexOf(encodedKey + '=') === 0)
						return decodeURIComponent(cookie.substring(encodedKey.length + 1, cookie.length));
				}
				return null;
			},
			remove: function (key) {
				// remove cookie from main domain
				this.set(key, '', { expireDays: -1 });
				// remove cookie from upper domains
				var domainParts = document.domain.split('.');
				for (var i = domainParts.length; i >= 0; i--) {
					this.set(key, '', { expireDays: -1, domain: '.' + domainParts.slice(- i).join('.') });
				}
			},
			reset: function (namespace) {
				var cookies = document.cookie ? document.cookie.split(';') : [];
				for (var i = 0, cookie, key; i < cookies.length; i++) {
					cookie = cookies[i].replace(/^\s*/, '');
					key = cookie.substr(0, cookie.indexOf('='));
					if (!namespace || key.indexOf(namespace) === 0)
						this.remove(key);
				}
			},
			keys: function (namespace) {
				if (!this.check())
					throw Error('cookies are disabled');
				var keys = [],
					cookies = document.cookie ? document.cookie.split(';') : [];
				for (var i = 0, cookie, key; i < cookies.length; i++) {
					cookie = cookies[i].replace(/^\s*/, '');
					key = decodeURIComponent(cookie.substr(0, cookie.indexOf('=')));
					if (!namespace || key.indexOf(namespace) === 0)
						keys.push(_toKeyName(namespace, key));
				}
				return keys;
			}
		};

		return {
			init: function (options) {
				this.setOptions(options);
				return this;
			},
			setOptions: function (options) {
				this.options = Basil.utils.extend({}, this.options || Basil.options, options);
			},
			support: function (storage) {
				return _storages.hasOwnProperty(storage);
			},
			check: function (storage) {
				if (this.support(storage))
					return _storages[storage].check();
				return false;
			},
			set: function (key, value, options) {
				options = Basil.utils.extend({}, this.options, options);
				if (!(key = _toStoredKey(options.namespace, key)))
					return false;
				value = options.raw === true ? value : _toStoredValue(value);
				var where = null;
				// try to set key/value in first available storage
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage, index) {
					_storages[storage].set(key, value, options);
					where = storage;
					return false; // break;
				}, null, this);
				if (!where) {
					// key has not been set anywhere
					return false;
				}
				// remove key from all other storages
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage, index) {
					if (storage !== where)
						_storages[storage].remove(key);
				}, null, this);
				return true;
			},
			get: function (key, options) {
				options = Basil.utils.extend({}, this.options, options);
				if (!(key = _toStoredKey(options.namespace, key)))
					return null;
				var value = null;
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage, index) {
					if (value !== null)
						return false; // break if a value has already been found.
					value = _storages[storage].get(key, options) || null;
					value = options.raw === true ? value : _fromStoredValue(value);
				}, function (storage, index, error) {
					value = null;
				}, this);
				return value;
			},
			remove: function (key, options) {
				options = Basil.utils.extend({}, this.options, options);
				if (!(key = _toStoredKey(options.namespace, key)))
					return;
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage) {
					_storages[storage].remove(key);
				}, null, this);
			},
			reset: function (options) {
				options = Basil.utils.extend({}, this.options, options);
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage) {
					_storages[storage].reset(options.namespace);
				}, null, this);
			},
			keys: function (options) {
				options = options || {};
				var keys = [];
				for (var key in this.keysMap(options))
					keys.push(key);
				return keys;
			},
			keysMap: function (options) {
				options = Basil.utils.extend({}, this.options, options);
				var map = {};
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage) {
					Basil.utils.each(_storages[storage].keys(options.namespace), function (key) {
						map[key] = Basil.utils.isArray(map[key]) ? map[key] : [];
						map[key].push(storage);
					}, this);
				}, null, this);
				return map;
			}
		};
	};

	// Access to native storages, without namespace or basil value decoration
	Basil.memory = new Basil.Storage().init({ storages: 'memory', namespace: null, raw: true });
	Basil.cookie = new Basil.Storage().init({ storages: 'cookie', namespace: null, raw: true });
	Basil.localStorage = new Basil.Storage().init({ storages: 'local', namespace: null, raw: true });
	Basil.sessionStorage = new Basil.Storage().init({ storages: 'session', namespace: null, raw: true });

	// browser export
	window.Basil = Basil;

	// AMD export
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return Basil;
		});
	// commonjs export
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = Basil;
	}

})();

},{}],10:[function(require,module,exports){

},{}],11:[function(require,module,exports){
/*
 * EJS Embedded JavaScript templates
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

'use strict';

/**
 * @file Embedded JavaScript templating engine. {@link http://ejs.co}
 * @author Matthew Eernisse <mde@fleegix.org>
 * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
 * @project EJS
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
 */

/**
 * EJS internal functions.
 *
 * Technically this "module" lies in the same file as {@link module:ejs}, for
 * the sake of organization all the private functions re grouped into this
 * module.
 *
 * @module ejs-internal
 * @private
 */

/**
 * Embedded JavaScript templating engine.
 *
 * @module ejs
 * @public
 */

var fs = require('fs');
var path = require('path');
var utils = require('./utils');

var scopeOptionWarned = false;
var _VERSION_STRING = require('../package.json').version;
var _DEFAULT_DELIMITER = '%';
var _DEFAULT_LOCALS_NAME = 'locals';
var _NAME = 'ejs';
var _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
var _OPTS_PASSABLE_WITH_DATA = ['delimiter', 'scope', 'context', 'debug', 'compileDebug',
  'client', '_with', 'rmWhitespace', 'strict', 'filename'];
// We don't allow 'cache' option to be passed in the data obj for
// the normal `render` call, but this is where Express 2 & 3 put it
// so we make an exception for `renderFile`
var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat('cache');
var _BOM = /^\uFEFF/;

/**
 * EJS template function cache. This can be a LRU object from lru-cache NPM
 * module. By default, it is {@link module:utils.cache}, a simple in-process
 * cache that grows continuously.
 *
 * @type {Cache}
 */

exports.cache = utils.cache;

/**
 * Custom file loader. Useful for template preprocessing or restricting access
 * to a certain part of the filesystem.
 *
 * @type {fileLoader}
 */

exports.fileLoader = fs.readFileSync;

/**
 * Name of the object containing the locals.
 *
 * This variable is overridden by {@link Options}`.localsName` if it is not
 * `undefined`.
 *
 * @type {String}
 * @public
 */

exports.localsName = _DEFAULT_LOCALS_NAME;

/**
 * Promise implementation -- defaults to the native implementation if available
 * This is mostly just for testability
 *
 * @type {Function}
 * @public
 */

exports.promiseImpl = (new Function('return this;'))().Promise;

/**
 * Get the path to the included file from the parent file path and the
 * specified path.
 *
 * @param {String}  name     specified path
 * @param {String}  filename parent file path
 * @param {Boolean} isDir    parent file path whether is directory
 * @return {String}
 */
exports.resolveInclude = function(name, filename, isDir) {
  var dirname = path.dirname;
  var extname = path.extname;
  var resolve = path.resolve;
  var includePath = resolve(isDir ? filename : dirname(filename), name);
  var ext = extname(name);
  if (!ext) {
    includePath += '.ejs';
  }
  return includePath;
};

/**
 * Get the path to the included file by Options
 *
 * @param  {String}  path    specified path
 * @param  {Options} options compilation options
 * @return {String}
 */
function getIncludePath(path, options) {
  var includePath;
  var filePath;
  var views = options.views;

  // Abs path
  if (path.charAt(0) == '/') {
    includePath = exports.resolveInclude(path.replace(/^\/*/,''), options.root || '/', true);
  }
  // Relative paths
  else {
    // Look relative to a passed filename first
    if (options.filename) {
      filePath = exports.resolveInclude(path, options.filename);
      if (fs.existsSync(filePath)) {
        includePath = filePath;
      }
    }
    // Then look in any views directories
    if (!includePath) {
      if (Array.isArray(views) && views.some(function (v) {
        filePath = exports.resolveInclude(path, v, true);
        return fs.existsSync(filePath);
      })) {
        includePath = filePath;
      }
    }
    if (!includePath) {
      throw new Error('Could not find the include file "' +
          options.escapeFunction(path) + '"');
    }
  }
  return includePath;
}

/**
 * Get the template from a string or a file, either compiled on-the-fly or
 * read from cache (if enabled), and cache the template if needed.
 *
 * If `template` is not set, the file specified in `options.filename` will be
 * read.
 *
 * If `options.cache` is true, this function reads the file from
 * `options.filename` so it must be set prior to calling this function.
 *
 * @memberof module:ejs-internal
 * @param {Options} options   compilation options
 * @param {String} [template] template source
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `options.client`, either type might be returned.
 * @static
 */

function handleCache(options, template) {
  var func;
  var filename = options.filename;
  var hasTemplate = arguments.length > 1;

  if (options.cache) {
    if (!filename) {
      throw new Error('cache option requires a filename');
    }
    func = exports.cache.get(filename);
    if (func) {
      return func;
    }
    if (!hasTemplate) {
      template = fileLoader(filename).toString().replace(_BOM, '');
    }
  }
  else if (!hasTemplate) {
    // istanbul ignore if: should not happen at all
    if (!filename) {
      throw new Error('Internal EJS error: no file name or template '
                    + 'provided');
    }
    template = fileLoader(filename).toString().replace(_BOM, '');
  }
  func = exports.compile(template, options);
  if (options.cache) {
    exports.cache.set(filename, func);
  }
  return func;
}

/**
 * Try calling handleCache with the given options and data and call the
 * callback with the result. If an error occurs, call the callback with
 * the error. Used by renderFile().
 *
 * @memberof module:ejs-internal
 * @param {Options} options    compilation options
 * @param {Object} data        template data
 * @param {RenderFileCallback} cb callback
 * @static
 */

function tryHandleCache(options, data, cb) {
  var result;
  if (!cb) {
    if (typeof exports.promiseImpl == 'function') {
      return new exports.promiseImpl(function (resolve, reject) {
        try {
          result = handleCache(options)(data);
          resolve(result);
        }
        catch (err) {
          reject(err);
        }
      });
    }
    else {
      throw new Error('Please provide a callback function');
    }
  }
  else {
    try {
      result = handleCache(options)(data);
    }
    catch (err) {
      return cb(err);
    }

    cb(null, result);
  }
}

/**
 * fileLoader is independent
 *
 * @param {String} filePath ejs file path.
 * @return {String} The contents of the specified file.
 * @static
 */

function fileLoader(filePath){
  return exports.fileLoader(filePath);
}

/**
 * Get the template function.
 *
 * If `options.cache` is `true`, then the template is cached.
 *
 * @memberof module:ejs-internal
 * @param {String}  path    path for the specified file
 * @param {Options} options compilation options
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `options.client`, either type might be returned
 * @static
 */

function includeFile(path, options) {
  var opts = utils.shallowCopy({}, options);
  opts.filename = getIncludePath(path, opts);
  return handleCache(opts);
}

/**
 * Get the JavaScript source of an included file.
 *
 * @memberof module:ejs-internal
 * @param {String}  path    path for the specified file
 * @param {Options} options compilation options
 * @return {Object}
 * @static
 */

function includeSource(path, options) {
  var opts = utils.shallowCopy({}, options);
  var includePath;
  var template;
  includePath = getIncludePath(path, opts);
  template = fileLoader(includePath).toString().replace(_BOM, '');
  opts.filename = includePath;
  var templ = new Template(template, opts);
  templ.generateSource();
  return {
    source: templ.source,
    filename: includePath,
    template: template
  };
}

/**
 * Re-throw the given `err` in context to the `str` of ejs, `filename`, and
 * `lineno`.
 *
 * @implements RethrowCallback
 * @memberof module:ejs-internal
 * @param {Error}  err      Error object
 * @param {String} str      EJS source
 * @param {String} filename file name of the EJS file
 * @param {String} lineno   line number of the error
 * @static
 */

function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
}

function stripSemi(str){
  return str.replace(/;(\s*$)/, '$1');
}

/**
 * Compile the given `str` of ejs into a template function.
 *
 * @param {String}  template EJS template
 *
 * @param {Options} opts     compilation options
 *
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `opts.client`, either type might be returned.
 * @public
 */

exports.compile = function compile(template, opts) {
  var templ;

  // v1 compat
  // 'scope' is 'context'
  // FIXME: Remove this in a future version
  if (opts && opts.scope) {
    if (!scopeOptionWarned){
      console.warn('`scope` option is deprecated and will be removed in EJS 3');
      scopeOptionWarned = true;
    }
    if (!opts.context) {
      opts.context = opts.scope;
    }
    delete opts.scope;
  }
  templ = new Template(template, opts);
  return templ.compile();
};

/**
 * Render the given `template` of ejs.
 *
 * If you would like to include options but not data, you need to explicitly
 * call this function with `data` being an empty object or `null`.
 *
 * @param {String}   template EJS template
 * @param {Object}  [data={}] template data
 * @param {Options} [opts={}] compilation and rendering options
 * @return {String}
 * @public
 */

exports.render = function (template, d, o) {
  var data = d || {};
  var opts = o || {};

  // No options object -- if there are optiony names
  // in the data, copy them to options
  if (arguments.length == 2) {
    utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
  }

  return handleCache(opts, template)(data);
};

/**
 * Render an EJS file at the given `path` and callback `cb(err, str)`.
 *
 * If you would like to include options but not data, you need to explicitly
 * call this function with `data` being an empty object or `null`.
 *
 * @param {String}             path     path to the EJS file
 * @param {Object}            [data={}] template data
 * @param {Options}           [opts={}] compilation and rendering options
 * @param {RenderFileCallback} cb callback
 * @public
 */

exports.renderFile = function () {
  var args = Array.prototype.slice.call(arguments);
  var filename = args.shift();
  var cb;
  var opts = {filename: filename};
  var data;
  var viewOpts;

  // Do we have a callback?
  if (typeof arguments[arguments.length - 1] == 'function') {
    cb = args.pop();
  }
  // Do we have data/opts?
  if (args.length) {
    // Should always have data obj
    data = args.shift();
    // Normal passed opts (data obj + opts obj)
    if (args.length) {
      // Use shallowCopy so we don't pollute passed in opts obj with new vals
      utils.shallowCopy(opts, args.pop());
    }
    // Special casing for Express (settings + opts-in-data)
    else {
      // Express 3 and 4
      if (data.settings) {
        // Pull a few things from known locations
        if (data.settings.views) {
          opts.views = data.settings.views;
        }
        if (data.settings['view cache']) {
          opts.cache = true;
        }
        // Undocumented after Express 2, but still usable, esp. for
        // items that are unsafe to be passed along with data, like `root`
        viewOpts = data.settings['view options'];
        if (viewOpts) {
          utils.shallowCopy(opts, viewOpts);
        }
      }
      // Express 2 and lower, values set in app.locals, or people who just
      // want to pass options in their data. NOTE: These values will override
      // anything previously set in settings  or settings['view options']
      utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
    }
    opts.filename = filename;
  }
  else {
    data = {};
  }

  return tryHandleCache(opts, data, cb);
};

/**
 * Clear intermediate JavaScript cache. Calls {@link Cache#reset}.
 * @public
 */

exports.clearCache = function () {
  exports.cache.reset();
};

function Template(text, opts) {
  opts = opts || {};
  var options = {};
  this.templateText = text;
  this.mode = null;
  this.truncate = false;
  this.currentLine = 1;
  this.source = '';
  this.dependencies = [];
  options.client = opts.client || false;
  options.escapeFunction = opts.escape || utils.escapeXML;
  options.compileDebug = opts.compileDebug !== false;
  options.debug = !!opts.debug;
  options.filename = opts.filename;
  options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
  options.strict = opts.strict || false;
  options.context = opts.context;
  options.cache = opts.cache || false;
  options.rmWhitespace = opts.rmWhitespace;
  options.root = opts.root;
  options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
  options.views = opts.views;

  if (options.strict) {
    options._with = false;
  }
  else {
    options._with = typeof opts._with != 'undefined' ? opts._with : true;
  }

  this.opts = options;

  this.regex = this.createRegex();
}

Template.modes = {
  EVAL: 'eval',
  ESCAPED: 'escaped',
  RAW: 'raw',
  COMMENT: 'comment',
  LITERAL: 'literal'
};

Template.prototype = {
  createRegex: function () {
    var str = _REGEX_STRING;
    var delim = utils.escapeRegExpChars(this.opts.delimiter);
    str = str.replace(/%/g, delim);
    return new RegExp(str);
  },

  compile: function () {
    var src;
    var fn;
    var opts = this.opts;
    var prepended = '';
    var appended = '';
    var escapeFn = opts.escapeFunction;

    if (!this.source) {
      this.generateSource();
      prepended += '  var __output = [], __append = __output.push.bind(__output);' + '\n';
      if (opts._with !== false) {
        prepended +=  '  with (' + opts.localsName + ' || {}) {' + '\n';
        appended += '  }' + '\n';
      }
      appended += '  return __output.join("");' + '\n';
      this.source = prepended + this.source + appended;
    }

    if (opts.compileDebug) {
      src = 'var __line = 1' + '\n'
        + '  , __lines = ' + JSON.stringify(this.templateText) + '\n'
        + '  , __filename = ' + (opts.filename ?
        JSON.stringify(opts.filename) : 'undefined') + ';' + '\n'
        + 'try {' + '\n'
        + this.source
        + '} catch (e) {' + '\n'
        + '  rethrow(e, __lines, __filename, __line, escapeFn);' + '\n'
        + '}' + '\n';
    }
    else {
      src = this.source;
    }

    if (opts.client) {
      src = 'escapeFn = escapeFn || ' + escapeFn.toString() + ';' + '\n' + src;
      if (opts.compileDebug) {
        src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
      }
    }

    if (opts.strict) {
      src = '"use strict";\n' + src;
    }
    if (opts.debug) {
      console.log(src);
    }

    try {
      fn = new Function(opts.localsName + ', escapeFn, include, rethrow', src);
    }
    catch(e) {
      // istanbul ignore else
      if (e instanceof SyntaxError) {
        if (opts.filename) {
          e.message += ' in ' + opts.filename;
        }
        e.message += ' while compiling ejs\n\n';
        e.message += 'If the above error is not helpful, you may want to try EJS-Lint:\n';
        e.message += 'https://github.com/RyanZim/EJS-Lint';
      }
      throw e;
    }

    if (opts.client) {
      fn.dependencies = this.dependencies;
      return fn;
    }

    // Return a callable function which will execute the function
    // created by the source-code, with the passed data as locals
    // Adds a local `include` function which allows full recursive include
    var returnedFn = function (data) {
      var include = function (path, includeData) {
        var d = utils.shallowCopy({}, data);
        if (includeData) {
          d = utils.shallowCopy(d, includeData);
        }
        return includeFile(path, opts)(d);
      };
      return fn.apply(opts.context, [data || {}, escapeFn, include, rethrow]);
    };
    returnedFn.dependencies = this.dependencies;
    return returnedFn;
  },

  generateSource: function () {
    var opts = this.opts;

    if (opts.rmWhitespace) {
      // Have to use two separate replace here as `^` and `$` operators don't
      // work well with `\r`.
      this.templateText =
        this.templateText.replace(/\r/g, '').replace(/^\s+|\s+$/gm, '');
    }

    // Slurp spaces and tabs before <%_ and after _%>
    this.templateText =
      this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');

    var self = this;
    var matches = this.parseTemplateText();
    var d = this.opts.delimiter;

    if (matches && matches.length) {
      matches.forEach(function (line, index) {
        var opening;
        var closing;
        var include;
        var includeOpts;
        var includeObj;
        var includeSrc;
        // If this is an opening tag, check for closing tags
        // FIXME: May end up with some false positives here
        // Better to store modes as k/v with '<' + delimiter as key
        // Then this can simply check against the map
        if ( line.indexOf('<' + d) === 0        // If it is a tag
          && line.indexOf('<' + d + d) !== 0) { // and is not escaped
          closing = matches[index + 2];
          if (!(closing == d + '>' || closing == '-' + d + '>' || closing == '_' + d + '>')) {
            throw new Error('Could not find matching close tag for "' + line + '".');
          }
        }
        // HACK: backward-compat `include` preprocessor directives
        if ((include = line.match(/^\s*include\s+(\S+)/))) {
          opening = matches[index - 1];
          // Must be in EVAL or RAW mode
          if (opening && (opening == '<' + d || opening == '<' + d + '-' || opening == '<' + d + '_')) {
            includeOpts = utils.shallowCopy({}, self.opts);
            includeObj = includeSource(include[1], includeOpts);
            if (self.opts.compileDebug) {
              includeSrc =
                  '    ; (function(){' + '\n'
                  + '      var __line = 1' + '\n'
                  + '      , __lines = ' + JSON.stringify(includeObj.template) + '\n'
                  + '      , __filename = ' + JSON.stringify(includeObj.filename) + ';' + '\n'
                  + '      try {' + '\n'
                  + includeObj.source
                  + '      } catch (e) {' + '\n'
                  + '        rethrow(e, __lines, __filename, __line, escapeFn);' + '\n'
                  + '      }' + '\n'
                  + '    ; }).call(this)' + '\n';
            }else{
              includeSrc = '    ; (function(){' + '\n' + includeObj.source +
                  '    ; }).call(this)' + '\n';
            }
            self.source += includeSrc;
            self.dependencies.push(exports.resolveInclude(include[1],
              includeOpts.filename));
            return;
          }
        }
        self.scanLine(line);
      });
    }

  },

  parseTemplateText: function () {
    var str = this.templateText;
    var pat = this.regex;
    var result = pat.exec(str);
    var arr = [];
    var firstPos;

    while (result) {
      firstPos = result.index;

      if (firstPos !== 0) {
        arr.push(str.substring(0, firstPos));
        str = str.slice(firstPos);
      }

      arr.push(result[0]);
      str = str.slice(result[0].length);
      result = pat.exec(str);
    }

    if (str) {
      arr.push(str);
    }

    return arr;
  },

  _addOutput: function (line) {
    if (this.truncate) {
      // Only replace single leading linebreak in the line after
      // -%> tag -- this is the single, trailing linebreak
      // after the tag that the truncation mode replaces
      // Handle Win / Unix / old Mac linebreaks -- do the \r\n
      // combo first in the regex-or
      line = line.replace(/^(?:\r\n|\r|\n)/, '');
      this.truncate = false;
    }
    else if (this.opts.rmWhitespace) {
      // rmWhitespace has already removed trailing spaces, just need
      // to remove linebreaks
      line = line.replace(/^\n/, '');
    }
    if (!line) {
      return line;
    }

    // Preserve literal slashes
    line = line.replace(/\\/g, '\\\\');

    // Convert linebreaks
    line = line.replace(/\n/g, '\\n');
    line = line.replace(/\r/g, '\\r');

    // Escape double-quotes
    // - this will be the delimiter during execution
    line = line.replace(/"/g, '\\"');
    this.source += '    ; __append("' + line + '")' + '\n';
  },

  scanLine: function (line) {
    var self = this;
    var d = this.opts.delimiter;
    var newLineCount = 0;

    newLineCount = (line.split('\n').length - 1);

    switch (line) {
    case '<' + d:
    case '<' + d + '_':
      this.mode = Template.modes.EVAL;
      break;
    case '<' + d + '=':
      this.mode = Template.modes.ESCAPED;
      break;
    case '<' + d + '-':
      this.mode = Template.modes.RAW;
      break;
    case '<' + d + '#':
      this.mode = Template.modes.COMMENT;
      break;
    case '<' + d + d:
      this.mode = Template.modes.LITERAL;
      this.source += '    ; __append("' + line.replace('<' + d + d, '<' + d) + '")' + '\n';
      break;
    case d + d + '>':
      this.mode = Template.modes.LITERAL;
      this.source += '    ; __append("' + line.replace(d + d + '>', d + '>') + '")' + '\n';
      break;
    case d + '>':
    case '-' + d + '>':
    case '_' + d + '>':
      if (this.mode == Template.modes.LITERAL) {
        this._addOutput(line);
      }

      this.mode = null;
      this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
      break;
    default:
      // In script mode, depends on type of tag
      if (this.mode) {
        // If '//' is found without a line break, add a line break.
        switch (this.mode) {
        case Template.modes.EVAL:
        case Template.modes.ESCAPED:
        case Template.modes.RAW:
          if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
            line += '\n';
          }
        }
        switch (this.mode) {
        // Just executing code
        case Template.modes.EVAL:
          this.source += '    ; ' + line + '\n';
          break;
          // Exec, esc, and output
        case Template.modes.ESCAPED:
          this.source += '    ; __append(escapeFn(' + stripSemi(line) + '))' + '\n';
          break;
          // Exec and output
        case Template.modes.RAW:
          this.source += '    ; __append(' + stripSemi(line) + ')' + '\n';
          break;
        case Template.modes.COMMENT:
          // Do nothing
          break;
          // Literal <%% mode, append as raw output
        case Template.modes.LITERAL:
          this._addOutput(line);
          break;
        }
      }
      // In string mode, just add the output
      else {
        this._addOutput(line);
      }
    }

    if (self.opts.compileDebug && newLineCount) {
      this.currentLine += newLineCount;
      this.source += '    ; __line = ' + this.currentLine + '\n';
    }
  }
};

/**
 * Escape characters reserved in XML.
 *
 * This is simply an export of {@link module:utils.escapeXML}.
 *
 * If `markup` is `undefined` or `null`, the empty string is returned.
 *
 * @param {String} markup Input string
 * @return {String} Escaped string
 * @public
 * @func
 * */
exports.escapeXML = utils.escapeXML;

/**
 * Express.js support.
 *
 * This is an alias for {@link module:ejs.renderFile}, in order to support
 * Express.js out-of-the-box.
 *
 * @func
 */

exports.__express = exports.renderFile;

// Add require support
/* istanbul ignore else */
if (require.extensions) {
  require.extensions['.ejs'] = function (module, flnm) {
    var filename = flnm || /* istanbul ignore next */ module.filename;
    var options = {
      filename: filename,
      client: true
    };
    var template = fileLoader(filename).toString();
    var fn = exports.compile(template, options);
    module._compile('module.exports = ' + fn.toString() + ';', filename);
  };
}

/**
 * Version of EJS.
 *
 * @readonly
 * @type {String}
 * @public
 */

exports.VERSION = _VERSION_STRING;

/**
 * Name for detection of EJS.
 *
 * @readonly
 * @type {String}
 * @public
 */

exports.name = _NAME;

/* istanbul ignore if */
if (typeof window != 'undefined') {
  window.ejs = exports;
}

},{"../package.json":13,"./utils":12,"fs":10,"path":14}],12:[function(require,module,exports){
/*
 * EJS Embedded JavaScript templates
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

/**
 * Private utility functions
 * @module utils
 * @private
 */

'use strict';

var regExpChars = /[|\\{}()[\]^$+*?.]/g;

/**
 * Escape characters reserved in regular expressions.
 *
 * If `string` is `undefined` or `null`, the empty string is returned.
 *
 * @param {String} string Input string
 * @return {String} Escaped string
 * @static
 * @private
 */
exports.escapeRegExpChars = function (string) {
  // istanbul ignore if
  if (!string) {
    return '';
  }
  return String(string).replace(regExpChars, '\\$&');
};

var _ENCODE_HTML_RULES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&#34;',
  "'": '&#39;'
};
var _MATCH_HTML = /[&<>'"]/g;

function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
}

/**
 * Stringified version of constants used by {@link module:utils.escapeXML}.
 *
 * It is used in the process of generating {@link ClientFunction}s.
 *
 * @readonly
 * @type {String}
 */

var escapeFuncStr =
  'var _ENCODE_HTML_RULES = {\n'
+ '      "&": "&amp;"\n'
+ '    , "<": "&lt;"\n'
+ '    , ">": "&gt;"\n'
+ '    , \'"\': "&#34;"\n'
+ '    , "\'": "&#39;"\n'
+ '    }\n'
+ '  , _MATCH_HTML = /[&<>\'"]/g;\n'
+ 'function encode_char(c) {\n'
+ '  return _ENCODE_HTML_RULES[c] || c;\n'
+ '};\n';

/**
 * Escape characters reserved in XML.
 *
 * If `markup` is `undefined` or `null`, the empty string is returned.
 *
 * @implements {EscapeCallback}
 * @param {String} markup Input string
 * @return {String} Escaped string
 * @static
 * @private
 */

exports.escapeXML = function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
exports.escapeXML.toString = function () {
  return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr;
};

/**
 * Naive copy of properties from one object to another.
 * Does not recurse into non-scalar properties
 * Does not check to see if the property has a value before copying
 *
 * @param  {Object} to   Destination object
 * @param  {Object} from Source object
 * @return {Object}      Destination object
 * @static
 * @private
 */
exports.shallowCopy = function (to, from) {
  from = from || {};
  for (var p in from) {
    to[p] = from[p];
  }
  return to;
};

/**
 * Naive copy of a list of key names, from one object to another.
 * Only copies property if it is actually defined
 * Does not recurse into non-scalar properties
 *
 * @param  {Object} to   Destination object
 * @param  {Object} from Source object
 * @param  {Array} list List of properties to copy
 * @return {Object}      Destination object
 * @static
 * @private
 */
exports.shallowCopyFromList = function (to, from, list) {
  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    if (typeof from[p] != 'undefined') {
      to[p] = from[p];
    }
  }
  return to;
};

/**
 * Simple in-process cache implementation. Does not implement limits of any
 * sort.
 *
 * @implements Cache
 * @static
 * @private
 */
exports.cache = {
  _data: {},
  set: function (key, val) {
    this._data[key] = val;
  },
  get: function (key) {
    return this._data[key];
  },
  reset: function () {
    this._data = {};
  }
};

},{}],13:[function(require,module,exports){
module.exports={
  "_from": "ejs@^2.5.9",
  "_id": "ejs@2.5.9",
  "_inBundle": false,
  "_integrity": "sha512-GJCAeDBKfREgkBtgrYSf9hQy9kTb3helv0zGdzqhM7iAkW8FA/ZF97VQDbwFiwIT8MQLLOe5VlPZOEvZAqtUAQ==",
  "_location": "/ejs",
  "_phantomChildren": {},
  "_requested": {
    "type": "range",
    "registry": true,
    "raw": "ejs@^2.5.9",
    "name": "ejs",
    "escapedName": "ejs",
    "rawSpec": "^2.5.9",
    "saveSpec": null,
    "fetchSpec": "^2.5.9"
  },
  "_requiredBy": [
    "/"
  ],
  "_resolved": "https://registry.npmjs.org/ejs/-/ejs-2.5.9.tgz",
  "_shasum": "7ba254582a560d267437109a68354112475b0ce5",
  "_spec": "ejs@^2.5.9",
  "_where": "/home/mrk13/Documents/GitHub/TravelBackPack",
  "author": {
    "name": "Matthew Eernisse",
    "email": "mde@fleegix.org",
    "url": "http://fleegix.org"
  },
  "bugs": {
    "url": "https://github.com/mde/ejs/issues"
  },
  "bundleDependencies": false,
  "contributors": [
    {
      "name": "Timothy Gu",
      "email": "timothygu99@gmail.com",
      "url": "https://timothygu.github.io"
    }
  ],
  "dependencies": {},
  "deprecated": false,
  "description": "Embedded JavaScript templates",
  "devDependencies": {
    "browserify": "^13.1.1",
    "eslint": "^4.14.0",
    "git-directory-deploy": "^1.5.1",
    "istanbul": "~0.4.3",
    "jake": "^8.0.16",
    "jsdoc": "^3.4.0",
    "lru-cache": "^4.0.1",
    "mocha": "^5.0.5",
    "uglify-js": "^3.3.16"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "homepage": "https://github.com/mde/ejs",
  "keywords": [
    "template",
    "engine",
    "ejs"
  ],
  "license": "Apache-2.0",
  "main": "./lib/ejs.js",
  "name": "ejs",
  "repository": {
    "type": "git",
    "url": "git://github.com/mde/ejs.git"
  },
  "scripts": {
    "coverage": "istanbul cover node_modules/mocha/bin/_mocha",
    "devdoc": "jake doc[dev]",
    "doc": "jake doc",
    "lint": "eslint \"**/*.js\" Jakefile",
    "test": "jake test"
  },
  "version": "2.5.9"
}

},{}],14:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":15}],15:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],16:[function(require,module,exports){
'use strict';

module.exports = stemmer;

/* Character code for `y`. */
var CC_Y = 'y'.charCodeAt(0);

/* Standard suffix manipulations. */
var step2list = {
  ational: 'ate',
  tional: 'tion',
  enci: 'ence',
  anci: 'ance',
  izer: 'ize',
  bli: 'ble',
  alli: 'al',
  entli: 'ent',
  eli: 'e',
  ousli: 'ous',
  ization: 'ize',
  ation: 'ate',
  ator: 'ate',
  alism: 'al',
  iveness: 'ive',
  fulness: 'ful',
  ousness: 'ous',
  aliti: 'al',
  iviti: 'ive',
  biliti: 'ble',
  logi: 'log'
};

var step3list = {
  icate: 'ic',
  ative: '',
  alize: 'al',
  iciti: 'ic',
  ical: 'ic',
  ful: '',
  ness: ''
};

/* Consonant-vowel sequences. */
var consonant = '[^aeiou]';
var vowel = '[aeiouy]';
var consonantSequence = '(' + consonant + '[^aeiouy]*)';
var vowelSequence = '(' + vowel + '[aeiou]*)';

var MEASURE_GT_0 = new RegExp(
  '^' + consonantSequence + '?' + vowelSequence + consonantSequence
);

var MEASURE_EQ_1 = new RegExp(
  '^' + consonantSequence + '?' + vowelSequence + consonantSequence +
  vowelSequence + '?$'
);

var MEASURE_GT_1 = new RegExp(
  '^' + consonantSequence + '?' +
  '(' + vowelSequence + consonantSequence + '){2,}'
);

var VOWEL_IN_STEM = new RegExp(
  '^' + consonantSequence + '?' + vowel
);

var CONSONANT_LIKE = new RegExp(
  '^' + consonantSequence + vowel + '[^aeiouwxy]$'
);

/* Exception expressions. */
var SUFFIX_LL = /ll$/;
var SUFFIX_E = /^(.+?)e$/;
var SUFFIX_Y = /^(.+?)y$/;
var SUFFIX_ION = /^(.+?(s|t))(ion)$/;
var SUFFIX_ED_OR_ING = /^(.+?)(ed|ing)$/;
var SUFFIX_AT_OR_BL_OR_IZ = /(at|bl|iz)$/;
var SUFFIX_EED = /^(.+?)eed$/;
var SUFFIX_S = /^.+?[^s]s$/;
var SUFFIX_SSES_OR_IES = /^.+?(ss|i)es$/;
var SUFFIX_MULTI_CONSONANT_LIKE = /([^aeiouylsz])\1$/;
var STEP_2 = new RegExp(
  '^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|' +
  'ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|' +
  'biliti|logi)$'
);
var STEP_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
var STEP_4 = new RegExp(
  '^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|' +
  'iti|ous|ive|ize)$'
);

/* Stem `value`. */
function stemmer(value) {
  var firstCharacterWasLowerCaseY;
  var match;

  value = String(value).toLowerCase();

  /* Exit early. */
  if (value.length < 3) {
    return value;
  }

  /* Detect initial `y`, make sure it never matches. */
  if (value.charCodeAt(0) === CC_Y) {
    firstCharacterWasLowerCaseY = true;
    value = 'Y' + value.substr(1);
  }

  /* Step 1a. */
  if (SUFFIX_SSES_OR_IES.test(value)) {
    /* Remove last two characters. */
    value = value.substr(0, value.length - 2);
  } else if (SUFFIX_S.test(value)) {
    /* Remove last character. */
    value = value.substr(0, value.length - 1);
  }

  /* Step 1b. */
  if (match = SUFFIX_EED.exec(value)) {
    if (MEASURE_GT_0.test(match[1])) {
      /* Remove last character. */
      value = value.substr(0, value.length - 1);
    }
  } else if ((match = SUFFIX_ED_OR_ING.exec(value)) && VOWEL_IN_STEM.test(match[1])) {
    value = match[1];

    if (SUFFIX_AT_OR_BL_OR_IZ.test(value)) {
      /* Append `e`. */
      value += 'e';
    } else if (SUFFIX_MULTI_CONSONANT_LIKE.test(value)) {
      /* Remove last character. */
      value = value.substr(0, value.length - 1);
    } else if (CONSONANT_LIKE.test(value)) {
      /* Append `e`. */
      value += 'e';
    }
  }

  /* Step 1c. */
  if ((match = SUFFIX_Y.exec(value)) && VOWEL_IN_STEM.test(match[1])) {
    /* Remove suffixing `y` and append `i`. */
    value = match[1] + 'i';
  }

  /* Step 2. */
  if ((match = STEP_2.exec(value)) && MEASURE_GT_0.test(match[1])) {
    value = match[1] + step2list[match[2]];
  }

  /* Step 3. */
  if ((match = STEP_3.exec(value)) && MEASURE_GT_0.test(match[1])) {
    value = match[1] + step3list[match[2]];
  }

  /* Step 4. */
  if (match = STEP_4.exec(value)) {
    if (MEASURE_GT_1.test(match[1])) {
      value = match[1];
    }
  } else if ((match = SUFFIX_ION.exec(value)) && MEASURE_GT_1.test(match[1])) {
    value = match[1];
  }

  /* Step 5. */
  if (
    (match = SUFFIX_E.exec(value)) &&
    (MEASURE_GT_1.test(match[1]) || (MEASURE_EQ_1.test(match[1]) && !CONSONANT_LIKE.test(match[1])))
  ) {
    value = match[1];
  }

  if (SUFFIX_LL.test(value) && MEASURE_GT_1.test(value)) {
    value = value.substr(0, value.length - 1);
  }

  /* Turn initial `Y` back to `y`. */
  if (firstCharacterWasLowerCaseY) {
    value = 'y' + value.substr(1);
  }

  return value;
}

},{}]},{},[8]);
