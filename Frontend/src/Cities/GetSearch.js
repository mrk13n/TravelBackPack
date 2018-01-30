var Cities;
var API = require('../API');
var Storage = require('../LocalStorage');

function getId(text) {
    var nameCity;
    var find = false;
    var id;
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