$(function () {
    var GetInfoCity = require('./Cities/GetInfoCity');
    var GetComments = require('./Cities/GetComments');
    GetInfoCity.showInfo();
    GetComments.initialiseComments();
});