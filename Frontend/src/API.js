var API_URL = "http://localhost:4040";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
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
        url: API_URL + url,
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
    backendGet("/api/get-cities/", callback);
};

exports.getComments = function (city, callback) {
  backendPost("/api/get-comments/", city, callback);
};

exports.writeComment = function (comment, callback) {
  backendPost("/api/write-comments/", comment, callback);
};