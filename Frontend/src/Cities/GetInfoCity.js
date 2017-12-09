var Templates = require('../Teamplates');
var Cities;
var API = require('../API');
var Storage = require('../LocalStorage');
var $city = $('#info');
var $comments = $("#comments");
var current_city;

function showInfo() {
    $city.html("");
    var id = Storage.get('id');
    var city;
    API.getCitiesList(function (err, data) {
        if (!err) {
            Cities = data;
            for (var i = 0; i < Cities.length; i++) {
                if (id == Cities[i].id) {
                    city = Cities[i];
                    break;
                }
            }
            var html_code = Templates.InfoCity({city: city});
            var $node = $(html_code);
            $city.append($node);
            current_city = {city: city.city};
            var html_code2 = Templates.SendForm();
            var $node2 = $(html_code2);
            API.getComments(current_city, function (err, data) {
                if (!err) {
                    if (!data.emptyForm) {
                        showComments(data);
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
                    minutes: mn
                };
                if (comment.length !== 0) {
                    API.writeComment(send_comment, function (err, data) {
                        if (data.success) {
                            document.location.href = '/city.html'
                        }
                    })
                }
            });
            var a = true;
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
        }
    });
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

exports.showInfo = showInfo;