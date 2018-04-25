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
var avatar;
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
    avatar = randomAvatar();
    user = {
        username: username,
        email: email,
        password: password,
        avatar: avatar
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

function randomAvatar(){
    var rand;
    rand = Math.floor((Math.random() * 20) + 1);
    return rand;
}

exports.login = login;
exports.registration = registration;
exports.logout = logout;