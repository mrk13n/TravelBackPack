var Storage = require('./LocalStorage');
var Templates = require('./Teamplates');
var $cities = $('#city-favourite-comments-container');
var Backpack = getBackpack();

$(function () {

    var pack = getBackpack();

    if (pack !== null) {
        if(pack.length === 0){
            document.getElementById("footer").style.marginTop = "100px";
        }
    }

    $(".city-favourite-comments-panel").click(function(){
        $(this).addClass("open-window");
    });

    $("#favourites-scroll").click(function(){
        scrollTo();
    });

    function scrollTo() {
        $('html, body').animate({ scrollTop: $('.greetings-backpack').offset().top }, 'slow');
        return false;
    }

    $('#staff').click(function () {
        $('.niceStaff').css('display', 'block');
        $('.niceStaff').animate({'bottom':'0'}, 500);
        setTimeout(function () {
            $('.niceStaff').animate({'bottom':'-200px'}, 500);
        }, 1600);
        setTimeout(function () {
            $('.niceStaff').css('display', 'none');
        }, 2200);
    });

    initializeFavorites();
});

function initializeFavorites() {
    var cities = getCities(Backpack);
    showCities(cities);
}

function showCities(list) {
    $cities.html("");

    function showOne(city) {
        var html_code = Templates.FavouriteCityComments({city: city});

        var $node = $(html_code);

        $cities.append($node);

        if (Backpack !== null) {
            for (var i = 0; i < Backpack.length; i++) {
                if (city.city === Backpack[i].city) {
                    var html_code2 = Templates.OneFavouriteComment({comment: Backpack[i]});
                    var $node2 = $(html_code2);
                    $node.find('.backpack-comments').append($node2);
                    var k = i;
                    $node2.find('.favorite').click(function () {
                        removeFromStorrage(Backpack, k);
                        initializeFavorites();
                    });
                }
            }
        }
    }

    list.forEach(showOne);
}

function getCities(back) {
    var cities = [];
    if (back !== null) {
        for (var i = 0; i < back.length; i++) {
            if (cities.length === 0) {
                cities.push({city: back[i].city});
            } else {
                for (var j = 0; j < cities.length; j++) {
                    var similar = false;
                    if (cities[j].city == back[i].city ) {
                        similar = true;
                        break;
                    }
                }
                if (!similar) {
                    cities.push({city: back[i].city});
                }
            }
        }
    }
    return cities;
}

function getBackpack() {
    var back = Storage.get('backpack');
    if (back === null) {
        back = [];
    }
    return back;
}

function removeFromStorrage(back, i) {
    back.splice(i, 1);
    Storage.set('backpack', back);
}