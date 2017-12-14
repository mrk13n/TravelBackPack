var Storage = require('./LocalStorage');
var Templates = require('./Teamplates');
var $cities = $('#city-favourite-comments-container');

$(function () {
    $(".city-favourite-comments-panel").click(function(){
        $(this).addClass("open-window");
    });

    $("#city-scroll").click(function(){
        scrollTo();
        // randomAvatar();
    });

    function scrollTo() {
        $('html, body').animate({ scrollTop: $('.greetings-backpack').offset().top }, 'slow');
        return false;
    }

    initializeFavorites();
});

function randomAvatar(){
    var rand;
    rand = Math.floor((Math.random() * 20) + 1);
    var img_src = "logo.png";
    var image = document.createElement("img");
    var imageParent = document.getElementById("lol");
    image.className = "img-responsive user-photo";
    image.src = "assets/images/" + img_src;
    imageParent.appendChild(image);
}


// function showComments(list) {
//     $com.html("");
//
//     function showOneComment(comment) {
//         var Backpack = getBackpack();
//         var html_code = Templates.Comment_OneItem({comment: comment});
//
//         var $node = $(html_code);
//
//         $com.append($node);
//
//         $node.find('.favorite').click(function () {
//             for (var i = 0; i < Backpack.length; i++) {
//                 if (comment.comment._id == Backpack[i].comment._id) {
//                     removeFromStorrage(Backpack, i);
//                     initializeFavorites();
//                 }
//             }
//         });
//     }
//
//     list.forEach(showOneComment);
// }

function showCities(list) {
    $cities.html("");

    function showOne(city) {
        var Backpack = getBackpack();
        var html_code = Templates.FavouriteCityComments({city: city});

        var $node = $(html_code);

        $cities.append($node);

        if (Backpack !== null) {
            for (var i = 0; i < Backpack.length; i++) {
                if (city.city == Backpack[i].city) {
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

function initializeFavorites() {
    var Backpack = getBackpack();
    var cities = getCities(Backpack);
    showCities(cities);
    // showComments(Backpack);
}

function getBackpack() {
    return Storage.get('backpack');
}

function removeFromStorrage(back, i) {
    back.splice(i, 1);
    Storage.set('backpack', back);
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