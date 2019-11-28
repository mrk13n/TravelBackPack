const API = require('./API');
const Templates = require('./Teamplates');
const Storage = require('./LocalStorage');
const common = require('./common');
const GetCity = require('./Cities/GetCity');
const GetInfoCity = require('./Cities/GetInfoCity');
const GetComments = require('./Cities/GetComments');
const GetSendForm = require('./Cities/SendForm');
const page = 'city';
let type = getType();
let login;
let user;
let city;

$(function () {
    API.checkLogin((err, data) => {
        if (err) throw new Error(err);
        login = data.login;
        user = data.user;
    }).then(async r => {
        let filter = '#filter-' + type;
        $(filter).addClass('active');
        city = await GetCity();
        await GetInfoCity(city);

        await GetComments(type, city);
        await GetSendForm(user, city, type);

        $("#comments-scroll").click(() => {
            scrollTo();
        });

        $("#filter-food").click(async () => {
            $('.preloader').fadeIn('slow', () => {});
            allNotActive();
            $('#filter-food').addClass("active");
            type = 'food';
            Storage.set('type', type);
            await GetComments(type, city);
            await GetSendForm(user, city, type);
            $('.preloader').fadeOut('slow', () => {});
        });

        $("#filter-house").click(async () => {
            $('.preloader').fadeIn('slow', () => {});
            allNotActive();
            $('#filter-house').addClass("active");
            type = 'house';
            Storage.set('type', type);
            await GetComments(type, city);
            await GetSendForm(user, city, type);
            $('.preloader').fadeOut('slow', () => {});
        });

        $('#filter-hitchhiking').click(async () => {
            $('.preloader').fadeIn('slow', () => {});
            allNotActive();
            $('#filter-hitchhiking').addClass('active');
            type = 'hitchhiking';
            Storage.set('type', type);
            await GetComments(type, city);
            await GetSendForm(user, city, type);
            $('.preloader').fadeOut('slow', () => {});
        });

        $('#filter-abandoned').click(async () => {
            $('.preloader').fadeIn('slow', () => {});
            allNotActive();
            $('#filter-abandoned').addClass('active');
            type = 'abandoned';
            Storage.set('type', type);
            await GetComments(type, city);
            await GetSendForm(user, city, type);
            $('.preloader').fadeOut('slow', () => {});
        });

        $('#filter-transport').click(async () => {
            $('.preloader').fadeIn('slow', () => {});
            allNotActive();
            $('#filter-transport').addClass('active');
            type = 'transport';
            Storage.set('type', type);
            await GetComments(type, city);
            await GetSendForm(user, city, type);
            $('.preloader').fadeOut('slow', () => {});
        });

        common(login, user, page);
    });
});

function allNotActive() {
    $("#filter-food").removeClass("active");
    $("#filter-house").removeClass("active");
    $("#filter-hitchhiking").removeClass("active");
    $("#filter-abandoned").removeClass("active");
    $("#filter-transport").removeClass("active");
}

function getType() {
    let type = Storage.get('type');
    let types = ['food', 'house', 'hitchhiking', 'abandoned', 'transport'];
    if (!type) type = types[randomType(types)];
    Storage.set('type', type);
    return type;
}

function randomType(types) {
    return Math.floor((Math.random() * types.length));
}

function scrollTo() {
    $('html, body').animate({ scrollTop: $('#city-filter').offset().top }, 'slow');
    return false;
}