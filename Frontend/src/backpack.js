const API = require('./API');
const Templates = require('./Teamplates');
const Storage = require('./LocalStorage');
const common = require('./common');
const GetBackpack = require('./Cities/GetBackPack');
const page = 'backpack';
let login;
let user;

$(function () {
    API.checkLogin((err, data) => {
        if (err) throw new Error(err);
        login = data.login;
        user = data.user;
    }).then(async r => {
        await GetBackpack();
        // await API.getBackpack(function (err, data) {
        //     if (!err) {
        //         Backpack = data.backpack;
        //         if (Backpack.length !== 0) {
        //             initializeFavorites(Backpack);
        //         } else {
        //
        //         }
        //     }
        // });

        $("#favourites-scroll").click(function(){
            scrollTo();
        });

        common(login, user, page);
    });
});

function scrollTo() {
    $('html, body').animate({ scrollTop: $('.greetings-backpack').offset().top }, 'slow');
    return false;
}