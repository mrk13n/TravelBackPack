var Storage = require('./LocalStorage');
var Templates = require('./Teamplates');
var API = require('./API');
var Cities;
var $comments = $("#comments");
var a;

$(function () {
    var GetInfoCity = require('./Cities/GetInfoCity');
    GetInfoCity.showInfo();
    var type;
    a = true;
    initializeComments('food');

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
        $('#form').slideToggle(400);
        if (a) {
            $('#right').removeClass('glyphicon glyphicon-chevron-right img-circle');
            $('#right').addClass('glyphicon glyphicon-chevron-up img-circle');
            a = !a;
        } else {
            $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
            $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
            a = !a;
        }
    });

});

function allNotActive() {
    $("#filter-food").removeClass("active");
    $("#filter-house").removeClass("active");
    $("#filter-hitchhiking").removeClass("active");
    $("#filter-abandoned").removeClass("active");
}

function showComments(list) {
    $comments.html("");

    function showOneComment(comment) {
        var html_code = Templates.Comment_OneItem({comment: comment});

        var $node = $(html_code);

        $comments.append($node);
    }

    list.forEach(showOneComment);
}

function initializeComments(type) {
    $comments.html('');
    var html_code2 = Templates.SendForm();
    var $node2 = $(html_code2);
    var comments = [];
    var id = Storage.get('id');
    var city;
    var current_city;
    API.getCitiesList(function (err, data) {
        if (!err) {
            Cities = data;
            for (var i = 0; i < Cities.length; i++) {
                if (id == Cities[i].id) {
                    city = Cities[i];
                    break;
                }
            }
            current_city = {city: city.city};
            API.getComments(current_city, function (err, data) {
                if (!err) {
                    if (!data.emptyForm) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].type == type) {
                                comments.push(data[i]);
                            }
                        }
                        showComments(comments);
                    }
                    $comments.append($node2);
                }
            });

            $node2.find('.btn-send').click(function () {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1;
                var yyyy = today.getFullYear();
                var hh = today.getHours();
                var mn = today.getMinutes();
                if(dd<10) {
                    dd = '0'+dd;
                }

                if(mm<10) {
                    mm = '0'+mm;
                }
                if (hh<10) {
                    hh = '0'+hh;
                }
                if (mn<10) {
                    mn = '0'+mn;
                }
                var comment = $('.form-control').val();
                var send_comment = {
                    nickname: 'username',
                    comment: comment,
                    city: current_city.city,
                    year: yyyy,
                    day: dd,
                    month: mm,
                    hours: hh,
                    minutes: mn,
                    type: type
                };
                if (comment.length !== 0) {
                    API.writeComment(send_comment, function (err, data) {
                        if (data.success) {
                            initializeComments(type);
                            a = true;
                            $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
                            $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
                        }
                    });
                }
            });
        }
    });
}