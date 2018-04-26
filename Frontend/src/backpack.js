var Storage = require('./LocalStorage');
var Templates = require('./Teamplates');
var API = require('./API');
var LogReg = require('./LogReg');
var page = 'backpack';
var $cities = $('#city-favourite-comments-container');
var Backpack;
var imageViewer = document.getElementById('fs-img-panel');
var largeImg = document.getElementById("fs-img-block");
var captionText = document.getElementById("fs-img-caption");

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
                    $('.preloader').fadeOut('slow', function () {});
                    $('body').css('overflow-y', 'visible');
                }, 1500);
            });

            if (data.login) {
                API.getBackpack(function (err, data) {
                   if (!err) {
                       Backpack = data.backpack;
                       if (Backpack.length !== 0) {
                           initializeFavorites(Backpack);
                       } else {
                           //Empty backpack
                       }
                   }
                });
            } else {
                //Not login
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
        }
    });
});

function initializeFavorites(Backpack) {
    var cities = getCities(Backpack);
    showCities(cities, Backpack);
}

function showCities(list, Backpack) {
    $cities.html("");

    function showOne(city, Backpack) {
        var html_code = Templates.FavouriteCityComments({city: city});

        var $node = $(html_code);

        $cities.append($node);

        $node.find(".city-backpack-card").click(function() {
            $(this).addClass('zoomOut');
            $('.preloader').css('opacity', '0.75').fadeIn('slow', function () {});
            $('.city-backpack-card').css('visibility', 'hidden');
            setTimeout(function () {
                //Кнопка появилась
                initializeComments(city, Backpack);
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

    for (var i = 0; i < list.length; i++) {
        showOne(list[i], Backpack);
    }
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

function initializeComments(city, Backpack) {
    var comments = [];
    $cities.html("");
    //Назад і кнопка зникає
    for (var i = 0; i < Backpack.length; i++) {
        if (city.city === Backpack[i].city) {
            comments.push(Backpack[i]);
        }
    }
    if (comments.length !== 0) {
        for (var j = 0; j < comments.length; j++) {
            var n = j;
            console.log(comments);
            var html_code2 = Templates.Comment_v2({comment: comments[j]});
            var $node2 = $(html_code2);
            $cities.append($node2);
            $node2.find('.favourite-btn').click(function () {
                for (var k = 0; k < Backpack.length; k++) {
                    if (comments[n].comment._id == Backpack[k].comment._id) {
                        comments[n].favorite =!comments[n].favorite;
                        Backpack.splice(k, 1);
                        var backpack = {
                            backpack: Backpack,
                            city: comments[n].city
                        };
                        API.setBackpack(backpack, function (err, data) {
                            if (!err) {
                                if (data.success) {
                                    initializeComments(city, Backpack);
                                }
                            }
                        });
                        this.src = "assets/images/icons/icons8-add-to-favorites-96.png";
                    }
                }
            });
            $node2.find('.uploaded-img').click(function () {
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
    } else {
        initializeFavorites(Backpack);
    }
}