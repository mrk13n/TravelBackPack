$(function () {
    var GetInfoCity = require('./Cities/GetInfoCity');
    GetInfoCity.showInfo();

    function allNotActive() {
        $("#filter-food").removeClass("active");
        $("#filter-house").removeClass("active");
        $("#filter-hitchhiking").removeClass("active");
        $("#filter-abandoned").removeClass("active");
    }

    $("#filter-food").click(function () {
        allNotActive();
        // filterComments("food"); TODO
        $("#filter-food").addClass("active");
    });

    $("#filter-house").click(function () {
        allNotActive();
        // filterComments("food"); TODO
        $("#filter-house").addClass("active");
    });

    $("#filter-hitchhiking").click(function () {
        allNotActive();
        // filterComments("food"); TODO
        $("#filter-hitchhiking").addClass("active");
    });

    $("#filter-abandoned").click(function () {
        allNotActive();
        // filterComments("food"); TODO
        $("#filter-abandoned").addClass("active");
    });

});

