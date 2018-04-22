var Storage = require('./LocalStorage');
var Templates = require('./Teamplates');
var API = require('./API');
var LogReg = require('./LogReg');
var page = 'backpack';
var $cities = $('#city-favourite-comments-container');
var Backpack = getBackpack();

$(function () {
    API.checkLogin(function (err, data) {
        if (!err) {
            if (data.login) {
                $('.logined').css('display', 'block');
                $('.name').html(data.user);
            } else {
                $('.glyphicon-user').css('display', 'block');
            }
            setTimeout(function () {
                $('.preloader').fadeOut('slow', function () {});
                $('body').css('overflow-y', 'visible');
            }, 1500);

            var pack = getBackpack();
            if (pack !== null) {
                if(pack.length === 0){
                    document.getElementById("footer").style.marginTop = "100px";
                }
            }

            $("#favourites-scroll").click(function(){
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

            function scrollTo() {
                $('html, body').animate({ scrollTop: $('.greetings-backpack').offset().top }, 'slow');
                return false;
            }

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

            initializeFavorites();
        }
    });
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

        $node.find(".city-card").click(function() {
            $(this).addClass('zoomOut');
            $('.preloader').css('opacity', '0.75').fadeIn('slow', function () {});
            $('.city-card').css('visibility', 'hidden');
            setTimeout(function () {
                initializeComments(city);
                $cities.addClass('animated fadeInDown');
                $('.loader').fadeOut('slow', function () {});
                setTimeout(function () {
                    $('.preloader').fadeOut('slow', function () {});
                    $cities.fadeIn();
                }, 750);
                setTimeout(function () {
                    $('.preloader').css('opacity', '1');
                    $('.loader').show();
                    $('.success').hide();
                }, 1500);
            }, 1000);
        });
    }

    list.forEach(showOne);
}

function getCities(back) {
    var cities = [];
    if (back !== null) {
        for (var i = 0; i < back.length; i++) {
            if (cities.length === 0) {
                cities.push({icon: back[i].icon, city: back[i].city});
            } else {
                for (var j = 0; j < cities.length; j++) {
                    var similar = false;
                    if (cities[j].city == back[i].city ) {
                        similar = true;
                        break;
                    }
                }
                if (!similar) {
                    cities.push({icon: back[i].icon, city: back[i].city});
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

function initializeComments(city) {
    var comments = [];
    $cities.html("");
    if (Backpack !== null) {
        for (var i = 0; i < Backpack.length; i++) {
            if (city.city === Backpack[i].city) {
                comments.push(Backpack[i]);
            }
        }
    }
    if (comments.length !== 0) {
        for (var i = 0; i < comments.length; i++) {
            var html_code2 = Templates.Comment_OneItem({comment: comments[i]});
            var $node2 = $(html_code2);
            $cities.append($node2);
            var k = i;
            $node2.find('.favorite').click(function () {
                removeFromStorrage(Backpack, k);
                initializeComments(city);
            });
        }
    } else {
        initializeFavorites();
    }
}

function removeFromStorrage(back, i) {
    back.splice(i, 1);
    Storage.set('backpack', back);
}