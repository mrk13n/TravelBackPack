var Storage = require('./LocalStorage');
var Templates = require('./Teamplates');
var API = require('./API');
var GetInfoCity = require('./Cities/GetInfoCity');
var getLocalComments = require('./Cities/GetLocalSearch');
var Cities;
var icon_position;
var type;
var text;
var $comments = $("#comments");
var Backpack = getBackpack();

$(function () {
    $(window).load(function () {
        // setTimeout(function () {
        //     $('.preloader').fadeOut('slow', function () {});
        //     $('body').css('overflow-y', 'visible');
        // }, 1500);
    });
    GetInfoCity.showInfo();
    icon_position = true;
    $( ".show-weather" ).click(function() {
        $( "#weather-div" ).show( "slow" );
    });
    initializeComments('food');
    $("#comments-scroll").click(function() {
        scrollTo();
    });

    $(".scroll-page").click(function () {
        scrollDown();
    });

    $("#filter-food").click(function () {
        allNotActive();
        $("#filter-food").addClass("active");
        type = 'food';
        initializeComments(type);
        $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
        $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
    });

    $("#filter-house").click(function () {
        allNotActive();
        $("#filter-house").addClass("active");
        type = 'house';
        initializeComments(type);
        $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
        $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
    });

    $("#filter-hitchhiking").click(function () {
        allNotActive();
        $("#filter-hitchhiking").addClass("active");
        type = 'hitchhiking';
        initializeComments(type);
        $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
        $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
    });

    $("#filter-abandoned").click(function () {
        allNotActive();
        $("#filter-abandoned").addClass("active");
        type = 'abandoned';
        initializeComments(type);
        $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
        $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
    });

    $('.btn-add').click(function () {
        scrollDown();
        $('#form').slideToggle(400);
        if (icon_position) {
            $('#right').removeClass('glyphicon glyphicon-chevron-right img-circle');
            $('#right').addClass('glyphicon glyphicon-chevron-up img-circle');
            icon_position = !icon_position;
        } else {
            $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
            $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
            icon_position = !icon_position;
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
});

function allNotActive() {
    $("#filter-food").removeClass("active");
    $("#filter-house").removeClass("active");
    $("#filter-hitchhiking").removeClass("active");
    $("#filter-abandoned").removeClass("active");
}

function scrollTo() {
    $('html, body').animate({ scrollTop: $('#city-filter').offset().top }, 'slow');
    return false;
}

function scrollDown() {
    $('html, body').animate({ scrollTop: $(document).height() }, 1000);
    return false;
}

function initializeComments(type) {
    $comments.html('');
    var html_code2 = Templates.SendForm();
    var $node2 = $(html_code2);
    var comments = [];
    var id = Storage.get('id');
    var city;
    var current_city;
    var i;
    $comments.append($node2);
    API.getCitiesList(function (err, data) {
        if (!err) {
            Cities = data;
            for (i = 0; i < Cities.length; i++) {
                if (id == Cities[i].id) {
                    city = Cities[i];
                    break;
                }
            }
            current_city = {city: city.city};
            API.getComments(current_city, function (err, data) {
                if (!err) {
                    if (!data.emptyForm) {
                        for (i = 0; i < data.length; i++) {
                            if (data[i].type == type) {
                                comments.push(data[i]);
                            }
                        }
                        var additional_comments = [];
                        for (i = 0; i < comments.length; i++) {
                            var one;
                            var fav = false;
                            Backpack = getBackpack();
                            if (Backpack !== null) {
                                for (var j = 0; j < Backpack.length; j++) {
                                    if (comments[i]._id == Backpack[j].comment._id) {
                                        fav = true;
                                    }
                                }
                            }
                            one = {
                                city: current_city.city,
                                favorite: fav,
                                comment: comments[i]
                            };
                            additional_comments.push(one);
                        }
                        comments = additional_comments;
                        showComments(comments);
                    }
                }
                setTimeout(function () {
                    $('.preloader').fadeOut('slow', function () {});
                    $('body').css('overflow-y', 'visible');
                }, 1500);
            });

            $node2.find('.btn-send').click(function () {
                $('.preloader').css('opacity', '0.75').fadeIn('slow', function () {});
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1;
                var yyyy = today.getFullYear();
                var avatar = randomAvatar();
                if(dd<10) {
                    dd = '0'+dd;
                }
                if(mm<10) {
                    mm = '0'+mm;
                }
                var comment = $('#comment').val();
                var nickname = $('.username').val();
                var send_comment = {
                    nickname: nickname,
                    comment: comment,
                    city: current_city.city,
                    year: yyyy,
                    day: dd,
                    month: mm,
                    type: type,
                    avatar: avatar
                };
                if (comment.length !== 0 && nickname.length !== 0) {
                    API.writeComment(send_comment, function (err, data) {
                        var one = {
                            city: current_city.city,
                            favorite: false,
                            comment: data
                        };
                        $node2.slideToggle(400);
                        setTimeout(function () {
                            addOneComment(one);
                            $('.loader').fadeOut('slow', function () {});
                            $('.success').fadeIn('slow', function () {});
                            setTimeout(function () {
                                $('.preloader').fadeOut('slow', function () {});
                            }, 750);
                            setTimeout(function () {
                                $('.preloader').css('opacity', '1');
                                $('.loader').show();
                                $('.success').hide();
                            }, 1500);
                        }, 500);
                        $node2.find('.username').val('');
                        $node2.find('#comment').val('');
                        icon_position = true;
                        $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
                        $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
                    });
                }
            });
        }
    });
}

function showComments(list) {
    list.forEach(addOneComment);
}

function addOneComment(comment) {
    var html_code = Templates.Comment_OneItem({comment: comment});
    var $node = $(html_code);
    Backpack = getBackpack();
    $node.hide();
    $node.insertBefore('#form');
    $node.slideToggle(300);

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

function clearBackPack(back) {
    back = [];
    Storage.set('backpack', back);
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

function randomAvatar(){
    var rand;
    rand = Math.floor((Math.random() * 20) + 1);
    return rand;
}