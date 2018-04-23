var API = require('./API');
var LogReg = require('./LogReg');
var GetCities = require('./Cities/GetCities');
var getComments = require('./Cities/GetSearch');
var text;
var page = 'home';

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
            GetCities.initialiseCities();

            $("#city-scroll").click(function(){
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

            $('.search-button').click(function () {
                text = $('.search-text').val();
                getComments.getComments(text);
            });

            $('#searchBox').keyup(function (e) {
                text = $('.search-text').val();
                if (e.keyCode === 13) {
                    getComments.getComments(text);
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
        }
    });
});

function scrollTo() {
    $('html, body').animate({ scrollTop: $('.greetings').offset().top }, 'slow');
    return false;
}