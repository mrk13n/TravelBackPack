const API = require('./API');
const Templates = require('./Teamplates');
const Storage = require('./LocalStorage');
const GetCities = require('./Cities/GetCities');
const getComments = require('./Cities/GetSearch');
const signUp = require('./Authorization/registration');
const signIn = require('./Authorization/login');
const logOut = require('./Authorization/logout');
const page = 'home';
let login;
let user;
let text;
var comment_list = [];


$(function () {
    API.checkLogin(async function (err, data) {
        if (err) throw new Error(err);
        login = data.login;
        user = data.user;
    }).then( async r => {
        //wait for show cities
        await GetCities.initialiseCities();

        // Frontend displays
        if (login) {
            $('.logined').css('display', 'block');
            $('.name').html(user);
        } else {
            $('.glyphicon-user').css('display', 'block');
        }

        $('.glyphicon-user').click(function () {
            $('#log-menu').css('display', 'block');
        });

        $('.glyphicon-remove').click(function () {
            $('#log-menu').css('display', 'none');
        });

        $('.glyphicon-off').click(function () {
            $('#exit-menu').css('display', 'block');
        });

        $('.not-end').click(function () {
            $('#exit-menu').css('display', 'none');
        });

        $('.to-reg').click(function () {
            $('#login').css('display', 'none');
            $('#registration').css('display', 'block');
        });

        $('.back').click(function () {
            $('#registration').css('display', 'none');
            $('#login').css('display', 'block');
        });

        // $('#searchBox').keyup(function (e) {
        //     text = $('input.form-control').val();
        //     if (e.keyCode === 13) {
        //         getComments.getComments(text);
        //         comment_list = getComments.getComments(text);
        //     }
        // });


        // Actions
        $('.reg').click(function () {
            signUp(page);
        });

        $('.log').click(function () {
            signIn(page);
        });

        $('.end').click(function () {
            logOut(page);
        });

        $("#city-scroll").click(function(){
            scrollTo();
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

        $('.preloader').fadeOut('slow');
        $('body').css('overflow-y', 'visible');
    });
    // API.checkLogin(async function (err, data) {
    //
    //
    //
    //
    //     $('.search-button').click(function () {
    //         text = $('.search-text').val();
    //         getComments.getComments(text);
    //     });
    //
    //     $('#searchBox').keyup(function (e) {
    //         text = $('.search-text').val();
    //         if (e.keyCode === 13) {
    //             getComments.getComments(text);
    //         }
    //     });
    // });
});

function scrollTo() {
    $('html, body').animate({ scrollTop: $('.greetings').offset().top }, 'slow');
    return false;
}