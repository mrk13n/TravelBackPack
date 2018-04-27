var Storage = require('./LocalStorage');
var Templates = require('./Teamplates');
var API = require('./API');
var GetInfoCity = require('./Cities/GetInfoCity');
var getLocalComments = require('./Cities/GetLocalSearch');
var LogReg = require('./LogReg');
var page = 'city';
var Cities;
var icon_position;
var type;
var text;
var files;
var img1 = '';
var img2 = '';
var $comments = $("#comments");
var Backpack = [];
// Full size img variables
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

           $('.log').click(function () {
               LogReg.login(page);
           });

           $('.reg').click(function () {
               LogReg.registration(page);
           });

           $('.end').click(function () {
               LogReg.logout(page);
           });

           GetInfoCity.showInfo();
           icon_position = true;
           $( ".user-photo" ).click(function() {
               this.append();
           });
           initializeComments('food', data.user);
           $("#comments-scroll").click(function() {
               scrollTo();
           });

           $(".scroll-page").click(function () {
               scrollDown();
           });

           $("#filter-food").click(function () {
               //$('.preloader').fadeIn('slow', function () {});
               allNotActive();
               $("#filter-food").addClass("active");
               type = 'food';
               initializeComments(type, data.user);
               $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
               $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
           });

           $("#filter-house").click(function () {
               //$('.preloader').fadeIn('slow', function () {});
               allNotActive();
               $("#filter-house").addClass("active");
               type = 'house';
               initializeComments(type, data.user);
               $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
               $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
           });

           $("#filter-hitchhiking").click(function () {
               //$('.preloader').fadeIn('slow', function () {});
               allNotActive();
               $("#filter-hitchhiking").addClass("active");
               type = 'hitchhiking';
               initializeComments(type, data.user);
               $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
               $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
           });

           $("#filter-abandoned").click(function () {
              // $('.preloader').fadeIn('slow', function () {});
               allNotActive();
               $("#filter-abandoned").addClass("active");
               type = 'abandoned';
               initializeComments(type, data.user);
               $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
               $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
           });

           $("#filter-transport").click(function () {
               // $('.preloader').fadeIn('slow', function () {});
               allNotActive();
               $("#filter-transport").addClass("active");
               type = 'transport';
               initializeComments(type, data.user);
               $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
               $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
           });


           if (data.login) {
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
           } else {
               $('.btn-add').css('cursor', 'not-allowed');
               //$('.btn-add').css('pointer-events', 'none');
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

           $('#img-1').on('change', readFile1);
           $('#img-2').on('change', readFile2);
       }
    });
});

function allNotActive() {
    $("#filter-food").removeClass("active");
    $("#filter-house").removeClass("active");
    $("#filter-hitchhiking").removeClass("active");
    $("#filter-abandoned").removeClass("active");
    $("#filter-transport").removeClass("active");
}

function scrollTo() {
    $('html, body').animate({ scrollTop: $('#city-filter').offset().top }, 'slow');
    return false;
}

function scrollDown() {
    $('html, body').animate({ scrollTop: $(document).height() }, 1000);
    return false;
}

function initializeComments(type, username) {
    $comments.html('');
    var html_code2 = Templates.SendForm();
    var $node2 = $(html_code2);
    $node2.find('.nickname').html(username);
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
            current_city = {icon: city.icon, city: city.city};
            API.getComments(current_city, function (err, data) {
                if (!err) {
                    if (!data.emptyForm) {
                        for (i = 0; i < data.length; i++) {
                            if (data[i].type == type) {
                                comments.push(data[i]);
                            }
                        }
                        var additional_comments = [];
                        API.getBackpack(function (err, data) {
                            if (!err) {
                                Backpack = data.backpack;
                                for (i = 0; i < comments.length; i++) {
                                    var one;
                                    var fav = false;
                                    if (Backpack !== null) {
                                        for (var j = 0; j < Backpack.length; j++) {
                                            if (comments[i]._id == Backpack[j].comment._id) {
                                                fav = true;
                                            }
                                        }
                                    }
                                    one = {
                                        icon: current_city.icon,
                                        city: current_city.city,
                                        favorite: fav,
                                        comment: comments[i]
                                    };
                                    additional_comments.push(one);
                                }
                                comments = additional_comments;
                                showComments(comments);
                                setTimeout(function () {
                                    $('.preloader').fadeOut('slow', function () {});
                                    $('body').css('overflow-y', 'visible');
                                }, 1500);
                            }
                        });
                    } else {
                        comments = [];
                        showComments(comments);
                        setTimeout(function () {
                            $('.preloader').fadeOut('slow', function () {});
                            $('body').css('overflow-y', 'visible');
                        }, 1500);
                    }
                }
            });
            $node2.find('.btn-send').click(function () {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1;
                var yyyy = today.getFullYear();
                if(dd<10) {
                    dd = '0'+dd;
                }
                if(mm<10) {
                    mm = '0'+mm;
                }
                var comment = $('#comment').val();
                var nickname = username;
                var location_name = $('.location-name').val();
                var address = $('.location-address').val();
                var location;
                if (img1 == ""){
                    img1 = "assets/images/preview_beautiful-nature-view.jpg";
                }
                if (img2 == ""){
                    img2 = "assets/images/preview_beautiful-nature-view.jpg";
                }
                var img_1 = img1;
                var img_2 = img2;
                var fav_count = 0;
                geocoder = new google.maps.Geocoder();
                geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == 'OK') {
                        location = results[0].geometry.location.lat().toString();
                        location = location+','+ results[0].geometry.location.lng().toString();
                    } else {
                        location = "fail";
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                    var send_comment = {
                        nickname: nickname,
                        comment: comment,
                        location_name: location_name,
                        location: location,
                        city: current_city.city,
                        year: yyyy,
                        day: dd,
                        month: mm,
                        type: type,
                        count: fav_count,
                        img_1: img_1,
                        img_2: img_2
                    };
                    if (comment.length !== 0) {
                        $('.preloader').css('opacity', '0.75').fadeIn('slow', function () {});
                        API.writeComment(send_comment, function (err, data) {
                            var one = {
                                icon: current_city.icon,
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
                            $node2.find('#comment').val('');
                            $node2.find('.location-name').val('');
                            $node2.find('.location-address').val('');
                            $node2.find('#img-1').val('');
                            $node2.find('#img-2').val('');
                            img1 = '';
                            img2 = '';
                            icon_position = true;
                            $('#right').removeClass('glyphicon glyphicon-chevron-up img-circle');
                            $('#right').addClass('glyphicon glyphicon-chevron-right img-circle');
                        });
                    } else {
                        //Empty comment
                    }
                });
            });
        }
    });
}

function showComments(list) {
    list.forEach(addOneComment);
}

function addOneComment(comment) {
    API.getBackpack(function (err, data) {
        if (!err) {
            var html_code = Templates.Comment_OneItem({comment: comment});
            var $node = $(html_code);
            Backpack = data.backpack;
            var backpack;
            $node.hide();
            $node.insertBefore('#form');
            $node.slideToggle(300);

            if (data.auth) {
                $node.find('.favourite-btn').click(function () {
                    if (comment.favorite) {
                        for (var i = 0; i < Backpack.length; i++) {
                            if (comment.comment._id == Backpack[i].comment._id) {
                                comment.favorite =!comment.favorite;
                                Backpack.splice(i, 1);
                                backpack = {
                                    backpack: Backpack,
                                    city: comment.city
                                };
                                API.setBackpack(backpack, function (err, data) {});
                                this.src = "assets/images/icons/icons8-add-to-favorites-96.png";
                            }
                        }
                    } else {
                        comment.favorite =!comment.favorite;
                        Backpack.push(comment);
                        backpack = {
                            backpack: Backpack,
                            city: comment.city,
                            add: true
                        };
                        API.setBackpack(backpack, function (err, data) {});
                        this.src = "assets/images/icons/icons8-star-filled-96.png";
                    }
                });
            } else {
                $node.find('.favourite-btn').css('cursor', 'not-allowed');
            }
            //  Full size image viewer
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
    });
}

function readFile1() {
    if (this.files && this.files[0]) {
        var fr = new FileReader();
        fr.addEventListener('load', function (ev) {
            img1 = ev.target.result;
        });
        fr.readAsDataURL(this.files[0]);
    }
}

function readFile2() {
    if (this.files && this.files[0]) {
        var fr = new FileReader();
        fr.addEventListener('load', function (ev) {
            img2 = ev.target.result;
        });
        fr.readAsDataURL(this.files[0]);
    }
}
