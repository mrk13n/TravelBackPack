const API_URL = '127.0.0.1';

function backendGet(API_URL, callback) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.getCitiesList = function(callback) {
    backendGet('/api/get-cities/', callback);
};

exports.getComments = function (city, callback) {
  backendPost('/api/get-comments/', city, callback);
};

exports.writeComment = function (comment, callback) {
  backendPost('/api/write-comments/', comment, callback);
};

exports.login = function (user, callback) {
  backendPost('/api/login/', user, callback);
};

exports.registration = function (user, callback) {
  backendPost('/api/registration/', user, callback);
};

exports.logout = function (callback) {
    backendGet('/api/logout/', callback);
};

exports.checkLogin = function (callback) {
  backendGet('/api/check-login/', callback);
};

exports.getBackpack = function (callback) {
    backendGet('/api/get-backpack/', callback);
};

exports.setBackpack = function (backpack, callback) {
    backendPost('/api/set-backpack/', backpack, callback);
};