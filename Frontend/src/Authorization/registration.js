const API = require('../API');
const $newlogin = $('#inputNewLogin');
const $newemail = $('#inputNewEmail');
const $newpass = $('#inputNewPassword');
const $newconfirmpass = $('#inputNewConfirmPassword');
let username;
let email;
let password;
let confirmPassword;
let user;
let avatar;

async function registration(page) {
    username = $newlogin.val();
    email = $newemail.val();
    password = $newpass.val();
    confirmPassword = $newconfirmpass.val();
    avatar = randomAvatar();
    user = {
        username: username,
        email: email,
        password: password,
        avatar: avatar
    };
    if (validRegister(username, email, password, confirmPassword)) {
        await API.registration(user, async function (err, data) {
           if (err) throw new Error(err);

            if (data.isExist) {
                $('.for-registration.login-form.form-group').addClass('has-error');
                $('#helpNewLogin').css('display', 'block');
            } else {
                $('.for-registration.login-form.form-group').removeClass('has-error');
                $('#helpNewLogin').css('display', 'none');
            }

           if (data.newUser) {
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

function validRegister(username, email, password, confirmPassword) {
    let valid = true;
    if (username.length === 0) {
        $('.for-registration.login-form.form-group').addClass('has-error');
        $('#helpNewLoginInvalid').css('display', 'block');
        valid = false;
    } else {
        $('.for-registration.login-form.form-group').removeClass('has-error');
        $('#helpNewLoginInvalid').css('display', 'none');
    }
    if (email.length === 0) {
        $('.for-registration.email-form.form-group').addClass('has-error');
        $('#helpNewEmailInvalid').css('display', 'block');
        valid = false;
    } else {
        $('.for-registration.email-form.form-group').removeClass('has-error');
        $('#helpNewEmailInvalid').css('display', 'none');
    }
    if (password.length < 6) {
        $('.for-registration.password-form.form-group').addClass('has-error');
        $('#helpNewPassword').css('display', 'block');
        valid = false;
    } else {
        $('.for-registration.password-form.form-group').removeClass('has-error');
        $('#helpNewPassword').css('display', 'none');
    }
    if (confirmPassword !== password) {
        $('.for-registration.confirm-password-form.form-group').addClass('has-error');
        $('#helpNewConfirmPassword').css('display', 'block');
        valid = false;
    } else {
        $('.for-registration.confirm-password-form.form-group').removeClass('has-error');
        $('#helpNewConfirmPassword').css('display', 'none');
    }
    if (confirmPassword.length < 6) {
        $('.for-registration.confirm-password-form.form-group').addClass('has-error');
        $('#helpNewConfirmPasswordInvalid').css('display', 'block');
        valid = false;
    } else {
        $('.for-registration.confirm-password-form.form-group').removeClass('has-error');
        $('#helpNewConfirmPasswordInvalid').css('display', 'none');
    }
    return valid;
}

function randomAvatar(){
    return Math.floor((Math.random() * 20) + 1);
}

module.exports = registration;