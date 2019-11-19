const API = require('../API');
const $login = $('#inputLogin');
const $pass = $('#inputPassword');
let username;
let password;
let user;

async function login(page) {
    username = $login.val();
    password = $pass.val();
    user = {
        username: username,
        password: password
    };
    if(validLogin(username, password)) {
        await API.login(user, function (err, data) {
            if (err) throw new Error(err);

            if (data.notFound) {
                $('.for-login.login-form.form-group').addClass('has-error');
                $('#helpLogin').css('display', 'block');
            } else {
                $('.for-login.login-form.form-group').removeClass('has-error');
                $('#helpLogin').css('display', 'none');
            }

            if (data.incorrectPassword) {
                $('.for-login.password-form.form-group').addClass('has-error');
                $('#helpPassword').css('display', 'block');
            } else {
                $('.for-login.password-form.form-group').removeClass('has-error');
                $('#helpPassword').css('display', 'none');
            }

            if (data.success) {
                switch (page) {
                    case 'home':
                        document.location.href = '/';
                        break;
                    case 'city':
                        document.location.href = '/city';
                        break;
                    case 'backpack':
                        document.location.href = '/backpack';
                        break;
                    case 'about':
                        document.location.href = '/about';
                        break;
                }
            }
        });
    }
}

function validLogin(username, password) {
    let valid = true;
    if (username.length === 0) {
        $('.for-login.login-form.form-group').addClass('has-error');
        $('#helpLoginInvalid').css('display', 'block');
        valid = false;
    } else {
        $('.for-login.login-form.form-group').removeClass('has-error');
        $('#helpLoginInvalid').css('display', 'none');
    }
    if (password.length < 6 ) {
        $('.for-login.password-form.form-group').addClass('has-error');
        $('#helpPasswordInvalid').css('display', 'block');
        valid = false;
    } else {
        $('.for-login.password-form.form-group').removeClass('has-error');
        $('#helpPasswordInvalid').css('display', 'none');
    }
    return valid;
}

module.exports = login;