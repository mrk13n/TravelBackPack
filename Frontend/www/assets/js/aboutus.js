(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    backendGet('/api/get-cities/', callback);
};

// exports.upload = function(callback){
//     backendPost('/api/upload/',callback)
// };

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
},{}],2:[function(require,module,exports){
var API = require('./API');
var $login = $('#inputLogin');
var $pass = $('#inputPassword');
var $newlogin = $('#inputNewLogin');
var $newemail = $('#inputNewEmail');
var $newpass = $('#inputNewPassword');
var username;
var email;
var password;
var user;
var valid;

function login(page) {
    username = $login.val();
    password = $pass.val();
    if(validLogin(username, password)) {
        user = {
          username: username,
          password: password
        };
        API.login(user, function (err, data) {
            if (!err) {
                if (data.success) {
                    $('.for-login.login-form.form-group').removeClass('has-error');
                    $('.for-login.password-form.form-group').removeClass('has-error');
                    $('#helpLogin').css('display', 'none');
                    $('#helpPassword').css('display', 'none');
                    switch (page) {
                        case 'home':
                            document.location.href = '/';
                            break;
                        case 'city':
                            document.location.href = '/city.html';
                            break;
                        case 'backpack':
                            document.location.href = '/backpack.html';
                            break;
                        case 'about':
                            document.location.href = '/about.html';
                            break;
                    }
                }
                if (data.incorrectPassword) {
                    $('.for-login.login-form.form-group').removeClass('has-error');
                    $('.for-login.password-form.form-group').addClass('has-error');
                    $('#helpLogin').css('display', 'none');
                    $('#helpPassword').css('display', 'block');
                }
                if (data.notFound) {
                    $('.for-login.login-form.form-group').addClass('has-error');
                    $('.for-login.password-form.form-group').addClass('has-error');
                    $('#helpLogin').css('display', 'block');
                    $('#helpPassword').css('display', 'none');
                }
            }
        });
    }
}

function registration(page) {
    username = $newlogin.val();
    email = $newemail.val();
    password = $newpass.val();
    user = {
      username: username,
      email: email,
      password: password
    };
    if (validRegister(username, email, password)) {
        API.registration(user, function (err, data) {
            if (!err) {
                if (data.newUser) {
                    $('.for-registration.login-form.form-group').removeClass('has-error');
                    $('.for-registration.email-form.form-group').removeClass('has-error');
                    $('.for-registration.password-form.form-group').removeClass('has-error');
                    $('#helpNewPassword').css('display', 'none');
                    $('#helpNewLogin').css('display', 'none');
                    switch (page) {
                        case 'home':
                            document.location.href = '/';
                            break;
                        case 'city':
                            document.location.href = '/city.html';
                            break;
                        case 'backpack':
                            document.location.href = '/backpack.html';
                            break;
                        case 'about':
                            document.location.href = '/about.html';
                            break;
                    }
                }
                if (data.isExist) {
                    $('.for-registration.login-form.form-group').addClass('has-error');
                    $('.for-registration.email-form.form-group').removeClass('has-error');
                    $('.for-registration.password-form.form-group').removeClass('has-error');
                    $('#helpNewPassword').css('display', 'none');
                    $('#helpNewLogin').css('display', 'block');
                }
            }
        });
    }
}

function logout(page) {
    API.logout(function (err, data) {
        if (!err) {
            if (data.end) {
                switch (page) {
                    case 'home':
                        document.location.href = '/';
                        break;
                    case 'city':
                        document.location.href = '/city.html';
                        break;
                    case 'backpack':
                        document.location.href = '/backpack.html';
                        break;
                    case 'about':
                        document.location.href = '/about.html';
                        break;
                }
            }
        }
    });
}

function validLogin(username, password) {
    valid = true;
    if (username.length === 0) {
        $('.for-login.login-form.form-group').addClass('has-error');
        $('#helpPassword').css('display', 'none');
        $('#helpLogin').css('display', 'none');
        valid = false;
    } else {
        $('.for-login.login-form.form-group').removeClass('has-error');
    }
    if (password.length === 0) {
        $('.for-login.password-form.form-group').addClass('has-error');
        $('#helpPassword').css('display', 'none');
        $('#helpLogin').css('display', 'none');
        valid = false;
    } else {
        $('.for-login.password-form.form-group').removeClass('has-error');
    }
    return valid;
}

function validRegister(username, email, password) {
    valid = true;
    if (username.length === 0) {
        $('.for-registration.login-form.form-group').addClass('has-error');
        $('#helpNewLogin').css('display', 'none');
        valid = false;
    } else {
        $('.for-registration.login-form.form-group').removeClass('has-error');
        $('#helpNewLogin').css('display', 'none');
    }
    if (password.length < 6) {
        $('.for-registration.password-form.form-group').addClass('has-error');
        $('#helpNewLogin').css('display', 'none');
        $('#helpNewPassword').css('display', 'block');
        valid = false;
    } else {
        $('.for-registration.password-form.form-group').removeClass('has-error');
        $('#helpNewLogin').css('display', 'none');
        $('#helpNewPassword').css('display', 'none');
    }
    if (email.length === 0) {
        $('.for-registration.email-form.form-group').addClass('has-error');
        $('#helpNewLogin').css('display', 'none');
        valid = false;
    } else {
        $('.for-registration.email-form.form-group').removeClass('has-error');
        $('#helpNewLogin').css('display', 'none');
    }
    return valid;
}

exports.login = login;
exports.registration = registration;
exports.logout = logout;
},{"./API":1}],3:[function(require,module,exports){
var API = require('./API');
var LogReg = require('./LogReg');
var page = 'about';

$(function() {
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
            $("#team-scroll").click(function () {
                scrollTo();
            });

            function scrollTo() {
                $('html, body').animate({scrollTop: $('.our-team').offset().top}, 'slow');
                return false;
            }

            $('.log').click(function () {
                LogReg.login(page);
            });

            $('.reg').click(function () {
                LogReg.registration(page);
            });

            $('.end').click(function () {
                LogReg.logout(page);
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
},{"./API":1,"./LogReg":2}]},{},[3]);
