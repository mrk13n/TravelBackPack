var API = require('./API');
var LogReg = require('./LogReg');
var page = 'about';

$(function() {
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

            $("#team-scroll").click(function () {
                scrollTo();
            });

            function scrollTo() {
                $('html, body').animate({scrollTop: $('.our-team').offset().top}, 'slow');
                return false;
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