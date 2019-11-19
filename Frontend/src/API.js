// const API_URL = '127.0.0.1:4040';
async function backendGet(API_URL, callback) {
    await $.ajax({
        url: API_URL,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

async function backendPost(API_URL, data, callback) {
    await $.ajax({
        url: API_URL,
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

exports.checkLogin = async function (callback) {
    await backendGet('/api/check-login/', callback);
};

exports.getCitiesList = async function(callback) {
    await backendGet('/api/get-cities/', callback);
};

exports.registration = async function (user, callback) {
    await backendPost('/api/registration/', user, callback);
};

exports.login = async function (user, callback) {
    await backendPost('/api/login/', user, callback);
};

exports.logout = async function (callback) {
    await backendGet('/api/logout/', callback);
};

exports.getComments = function (city, callback) {
  backendPost('/api/get-comments/', city, callback);
};

exports.writeComment = function (comment, callback) {
  backendPost('/api/write-comments/', comment, callback);
};

exports.getBackpack = function (callback) {
    backendGet('/api/get-backpack/', callback);
};

exports.setBackpack = function (backpack, callback) {
    backendPost('/api/set-backpack/', backpack, callback);
};