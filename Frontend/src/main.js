const API = require('./API');
const Storage = require('./LocalStorage');
const GetCities = require('./Cities/GetCities');
const common = require('./common');
const page = 'home';
let login;
let user;
let text;
let comment_list = [];


$(function () {
    API.checkLogin((err, data) => {
        if (err) throw new Error(err);
        login = data.login;
        user = data.user;
    }).then( async r => {
        //wait for show cities
        await GetCities();

        // $('#searchBox').keyup(function (e) {
        //     text = $('input.form-control').val();
        //     if (e.keyCode === 13) {
        //         getComments.getComments(text);
        //         comment_list = getComments.getComments(text);
        //     }
        // });
        //
        // $('.search-button').click(function () {
        //     text = $('.search-text').val();
        //     getComments.getComments(text);
        // });
        //
        // $('#searchBox').keyup(function (e) {
        //     text = $('.search-text').val();
        //     if (e.keyCode === 13) {
        //         getComments.getComments(text);
        //     }
        // });

        $("#city-scroll").click(() => {
            scrollTo();
        });

        await common(login, user, page);
    });
});

function scrollTo() {
    $('html, body').animate({ scrollTop: $('.greetings').offset().top }, 'slow');
    return false;
}