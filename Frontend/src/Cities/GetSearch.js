var Cities;
var API = require('../API');
var Storage = require('../LocalStorage');

function getId(text) {
    var one = '';
    var words = [];
    var wrong_symbols = [' ', ',', '.', '!', ';', ':', '?', '`', '<', '>', '/', '"', '\'', '\\', ']', '[', '}', '{', '=', '+', '-', '_', ')', '(', '*', '&', '^', '%', '$', '#', '№', '@', '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    var nameCity;
    var find = false;
    var id;
    for (var i = 0; i < text.length; i++) {
        for (var j = 0; j < wrong_symbols.length; j++) {
            if (text[i] === wrong_symbols[i]) {
                console.log("yes");
            }
        }
        // if () {
        //     one += text[i];
        // } else {
        //     if (one !== '') {
        //         words.push(one);
        //         one = '';
        //     }
        // }
    }
    API.getCitiesList(function (err, data) {
        if (!err) {
            Cities = data;
            for (var i = 0; i < Cities.length; i++) {
                if (text !== undefined) {
                    text = text.toLowerCase();
                    nameCity = Cities[i].city.toLowerCase();
                    if (text === nameCity) {
                        id = Cities[i].id;
                        Storage.set('id', id);
                        document.location.href = '/city.html';
                        find = true;
                    }
                }
            }
            if (!find) {
                for (var j = 0; j < Cities.length; j++) {
                    if (text !== undefined) {
                        text = text.toLowerCase();
                        var a = text.length;
                        var name = '';
                        nameCity = Cities[j].city.toLowerCase();
                        for (var k = 0; k < a; k++) {
                            name += nameCity[k];
                        }
                        if (text === name) {
                            id = Cities[j].id;
                            Storage.set('id', id);
                            document.location.href = '/city.html';
                            find = true;
                        }
                    }
                }
            }
            if (!find) {
                $('.search-box').addClass('has-error');
            }
        }
    });
}

exports.getId = getId;